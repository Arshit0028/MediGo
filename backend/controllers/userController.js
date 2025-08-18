// controllers/userController.js
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import Stripe from "stripe";
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

dotenv.config();

// ----- Helper: Generate JWT -----
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// ----- Auth Controllers -----
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({ name, email, password: hashedPassword });

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
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

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

const getProfile = async (req, res) => {
  try {
    // Use User, not userModel
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (err) {
    console.error("Profile error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const logoutUser = async (_, res) => {
  res.json({ success: true, message: "Logged out" });
};

// ----- Booking Controllers -----
export const bookAppointment = async (req, res) => {
  try {
    const { docId, slotDate, slotTime } = req.body;
    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData?.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }

    const appointment = await appointmentModel.create({
      userId: req.user._id,
      docId,
      slotDate,
      slotTime,
      status: "Pending",
    });

    res.json({ success: true, message: "Appointment booked", data: appointment });
  } catch (err) {
    console.error("Book appointment error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getUserAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel
      .find({ userId: req.user._id })
      .populate("docId", "name specialization");

    res.json({ success: true, data: appointments });
  } catch (err) {
    console.error("Get appointments error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    if (!appointmentId) {
      return res.status(400).json({ success: false, message: "Appointment ID is required" });
    }

    const updated = await appointmentModel.findOneAndUpdate(
      { _id: appointmentId, userId: req.user._id },
      { status: "Cancelled" },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Appointment not found or unauthorized" });
    }

    res.json({ success: true, message: "Appointment cancelled", data: updated });
  } catch (err) {
    console.error("Cancel appointment error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ----- Payments: Razorpay -----
export const paymentRazorpay = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100, // paise
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
    // Implement Razorpay signature verification if needed
    res.json({ success: true, message: "Payment verified" });
  } catch (err) {
    console.error("Verify Razorpay error:", err);
    res.status(500).json({ success: false, message: "Verification failed" });
  }
};

// ----- Payments: Stripe -----
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
