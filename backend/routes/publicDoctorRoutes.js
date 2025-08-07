// backend/routes/publicDoctorRoutes.js
import express from "express";
import doctorModel from "../models/doctorModel.js";

const router = express.Router();

// Get all public doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await doctorModel.find({ isPublic: true });
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
