// src/routes/userRoutes.js
import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
  bookAppointment,
  getUserAppointments,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorpay,
  paymentStripe,
  stripeSuccess,
} from "../controllers/userController.js";
import { authUser } from "../middleware/authUser.js";

const router = express.Router();

// auth
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authUser, getProfile);
router.post("/logout", authUser, logoutUser);

// booking
router.post("/book-appointment", authUser, bookAppointment);
router.get("/appointments", authUser, getUserAppointments);
router.post("/cancel-appointment", authUser, cancelAppointment);

// payments
router.post("/payment-razorpay", authUser, paymentRazorpay);
router.post("/verifyRazorpay", authUser, verifyRazorpay);
router.post("/payment-stripe", authUser, paymentStripe);
router.get("/stripe/success", stripeSuccess);

export default router;
