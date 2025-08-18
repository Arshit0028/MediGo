// src/models/appointmentModel.js
import mongoose from "mongoose";


const appointmentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    docId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    slotDate: { type: String, required: true }, // "14_8_2025"
    slotTime: { type: String, required: true }, // "10:30 AM"

    amount: { type: Number, default: 0 }, // ₹
    payment: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
    cancelled: { type: Boolean, default: false },

    provider: { type: String, enum: ["razorpay", "stripe", null], default: null },
    orderId: { type: String, default: null }, // Razorpay order id or Stripe session id
    receipt: { type: String, default: null },
    paymentDetails: { type: Object, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
