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

// Auth
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authUser, getProfile);
router.post("/logout", authUser, logoutUser);

// Booking
router.post("/book-appointment", authUser, bookAppointment);
router.get("/appointments", authUser, getUserAppointments);
router.post("/cancel-appointment", authUser, cancelAppointment);

// Payments
router.post("/payment-razorpay", authUser, paymentRazorpay);
router.post("/verify-razorpay", authUser, verifyRazorpay);
router.post("/payment-stripe", authUser, paymentStripe);
router.get("/stripe/success", stripeSuccess);

export default router;