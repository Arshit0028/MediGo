// backend/routes/paymentRoutes.js
import express from "express";
import razorpayInstance from "../config/razorpay.js";
import crypto from "crypto";
import Appointment from "../models/appointmentModel.js"; // adjust path to your model

const router = express.Router();

// ✅ Create Razorpay Order
router.post("/razorpay", async (req, res) => {
  try {
    const { amount, currency = "INR", receipt = "receipt#1" } = req.body;

    const options = {
      amount: amount * 100, // Razorpay expects paise
      currency,
      receipt,
      payment_capture: 1,
    };

    const order = await razorpayInstance.orders.create(options);

    // ✅ Return full order object
    res.json({ success: true, order });
  } catch (error) {
    console.error("Razorpay order error:", error);
    res.status(500).json({ success: false, message: "Payment initiation failed" });
  }
});

// ✅ Verify Razorpay Payment

// Skip signature verification → directly update appointment
router.post("/verify", async (req, res) => {
  try {
    const { razorpay_payment_id, appointmentId } = req.body;

    if (!razorpay_payment_id || !appointmentId) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    // ✅ Mark as paid directly
    await Appointment.findByIdAndUpdate(appointmentId, {
      paymentStatus: "Paid",
      transactionId: razorpay_payment_id,
      status: "Confirmed", // optional: auto-confirm appointment
    });

    return res.json({ success: true, message: "Payment marked as successful" });
  } catch (error) {
    console.error("Payment update error:", error);
    res.status(500).json({ success: false, message: "Payment update failed" });
  }
});

export default router;
