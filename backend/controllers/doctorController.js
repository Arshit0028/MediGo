// src/controllers/doctorController.js
import Doctor from "../models/doctorModel.js";

export const listDoctors = async (_req, res) => {
  try {
    const doctors = await Doctor.find().select("-__v");
    res.json({ success: true, doctors });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};
