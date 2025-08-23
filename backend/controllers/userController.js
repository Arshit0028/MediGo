// controllers/authUser.js
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import Stripe from "stripe";
import multer from "multer";
import path from "path";
import fs from "fs";
import Razorpay from "razorpay";
import crypto from "crypto";

import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

dotenv.config();

// ================== Helpers ==================
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

// ================== Auth Controllers ==================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check if user exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash password & create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json({
      success: true,
      message: "User registered",
      token: generateToken(user._id),
      user,
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email & password required" });
    }

    // Validate user
    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    res.json({
      success: true,
      message: "Login successful",
      token: generateToken(user._id),
      user,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const user = await userModel.findById(req.user.id).select("-password");
    res.json({ success: true, user });
  } catch (err) {
    console.error("Profile error:", err.message);
    res
      .status(500)
      .json({ success: false, message: "Server error fetching profile" });
  }
};

// ================== Multer Setup for Profile Image ==================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), "uploads/profile");
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
export const uploadProfileImage = multer({ storage });

// ================== Profile Update Controller ==================
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    const { name, phone, address, gender, dob } = req.body;

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (address) user.address = JSON.parse(address); // frontend sends JSON string
    if (gender) user.gender = gender;
    if (dob) user.dob = dob;

    if (req.file) {
      // delete old image if exists
      if (user.image) {
        const oldImagePath = path.join(process.cwd(), user.image);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }
      user.image = `/uploads/profile/${req.file.filename}`; // save relative path
    }

    await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (err) {
    console.error("Update profile error:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error updating profile" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Logout failed" });
  }
};

// ================== Appointment Controllers =================
// Book appointment
export const bookAppointment = async (req, res) => {
  try {
    const { docId, slotDate, slotTime } = req.body;
    const userId = req.userId; // ✅ use correct field from auth middleware

    // Check doctor exists
    const doctor = await doctorModel.findById(docId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    // Check if slot already booked
    const existing = await appointmentModel.findOne({ docId, slotDate, slotTime });
    if (existing) {
      return res.status(400).json({ success: false, message: "Slot already booked" });
    }

    // Create appointment
    const appointment = await appointmentModel.create({
      userId,
      docId,
      slotDate,
      slotTime,
      status: "Pending",
    });

    res.json({
      success: true,
      message: "Appointment booked",
      data: appointment,
    });
  } catch (err) {
    console.error("❌ Book appointment error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get user's appointments
export const getUserAppointments = async (req, res) => {
  try {
    const userId = req.userId; // ✅ correct field
    const appointments = await appointmentModel
      .find({ userId })
      .populate("docId", "name speciality image"); // ✅ populate useful fields

    res.json({ success: true, data: appointments });
  } catch (err) {
    console.error("❌ Get appointments error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Cancel appointment
export const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    if (!appointmentId) {
      return res
        .status(400)
        .json({ success: false, message: "Appointment ID is required" });
    }

    // Find and cancel appointment
    const updated = await appointmentModel.findOneAndUpdate(
      { _id: appointmentId, userId: req.user.id },
      { status: "Cancelled" },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found or unauthorized",
      });
    }

    // Optional: Restore doctor availability if needed
    const doctor = await doctorModel.findById(updated.docId);
    if (doctor) {
      doctor.available = true;
      await doctor.save();
    }

    res.json({
      success: true,
      message: "Appointment cancelled",
      data: updated,
    });
  } catch (err) {
    console.error("Cancel appointment error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ================== Payments: Razorpay ==================

export const paymentRazorpay = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100, // INR → paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({ success: true, order });
  } catch (err) {
    console.error("Razorpay order error:", err);
    res.status(500).json({ success: false, message: "Payment initiation failed" });
  }
};

export const verifyRazorpay = async (req, res) => {
  try {
    const {
      appointmentId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // ✅ Update appointment payment
      await Appointment.findByIdAndUpdate(appointmentId, {
        paymentStatus: "Paid",
        transactionId: razorpay_payment_id,
      });

      return res.json({ success: true, message: "Payment verified" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (err) {
    console.error("Verify Razorpay error:", err);
    res.status(500).json({ success: false, message: "Verification failed" });
  }
};

// ================== Payments: Stripe ==================
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const paymentStripe = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: req.body.productName || "Doctor Appointment" },
            unit_amount: req.body.amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/payment-success`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-failed`,
    });

    res.json({ success: true, id: session.id });
  } catch (err) {
    console.error("Stripe payment error:", err);
    res.status(500).json({ success: false, message: "Stripe payment failed" });
  }
};

export const stripeSuccess = async (_, res) => {
  res.json({ success: true, message: "Payment successful" });
};
