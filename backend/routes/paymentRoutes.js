// backend/routes/paymentRoutes.js
import express from "express";
import razorpayInstance from "../config/razorpay.js";

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

export default router;
