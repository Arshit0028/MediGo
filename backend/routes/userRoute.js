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
  updateProfile, 
  uploadProfileImage,
} from "../controllers/userController.js";
import { authUser } from "../middleware/authUser.js";

const router = express.Router();

// Auth
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authUser, logoutUser);

router.get("/profile", authUser, getProfile);
router.put("/profile", authUser, uploadProfileImage.single("image"), updateProfile);

// Booking
router.post("/book-appointment", authUser, bookAppointment);
router.get("/appointments", authUser, getUserAppointments);
router.post("/cancel-appointment", authUser, cancelAppointment);

// Payments
router.post("/razorpay", authUser, paymentRazorpay);
router.post("/verify", authUser, verifyRazorpay);
router.post("/payment-stripe", authUser, paymentStripe);
router.get("/stripe/success", stripeSuccess);

export default router;