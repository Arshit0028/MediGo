// src/routes/doctorRoutes.js
import express from "express";
import { listDoctors } from "../controllers/doctorController.js";

const router = express.Router();

router.get("/list", listDoctors);

export default router;
