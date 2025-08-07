import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  specialization: String,
  available: { type: Boolean, default: true },
  slots_booked: { type: Object, default: {} },
  fees: { type: Number, required: true },
  docCode: { type: String, unique: true }, // ← Add this field: e.g., "doc1"
}, {
  timestamps: true
});

const doctorModel = mongoose.models.doctor || mongoose.model("doctor", doctorSchema);
export default doctorModel;
