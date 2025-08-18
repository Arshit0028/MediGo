// src/models/doctorModel.js
import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    line1: { type: String, default: "Clinic Address Line 1" },
    line2: { type: String, default: "City, State" },
  },
  { _id: false }
);

const doctorSchema = new mongoose.Schema(
  {
    name: String,
    degree: String,
    speciality: String,
    experience: String,
    about: String,
    fees: Number,
    image: String,
    available: { type: Boolean, default: true },
    address: { type: addressSchema, default: () => ({}) },
    // { '14_8_2025': ['10:30 AM', ...] }
    slots_booked: { type: Object, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);
