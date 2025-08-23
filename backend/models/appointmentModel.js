// models/appointmentModel.js
import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // must match your User model name
      required: true,
    },
    docId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor", // must match your Doctor model name
      required: true,
    },
    slotDate: {
      type: Date, // better than String (easier to sort/filter)
      required: true,
    },
    slotTime: {
      type: String, // keep time as string (e.g., "10:30 AM")
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"], // keep lowercase for consistency
      default: "pending",
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
