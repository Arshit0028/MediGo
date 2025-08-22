import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  slotDate: { type: Date, required: true },
  slotTime: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Appointment", appointmentSchema);
