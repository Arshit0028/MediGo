// models/doctorModel.js
import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    speciality: { type: String },
    degree: { type: String },
    experience: { type: String },
    about: { type: String },
    fees: { type: Number },
    available: { type: Boolean, default: true }, // default availability
    email: { type: String, unique: true, required: true },
    address: {
      line1: { type: String },
      line2: { type: String },
    },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
