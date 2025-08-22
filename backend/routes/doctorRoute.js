import express from "express";
import { getAllDoctors , getDoctorById } from "../controllers/doctorController.js";

const router = express.Router();

// GET all doctors
router.get("/", getAllDoctors);
router.get("/:id", getDoctorById);   // new route ✅

export default router;
