import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";

// Load .env variables
dotenv.config();

// Initialize express app
const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB Atlas
connectDB();

// Connect to Cloudinary
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API routes
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

// Root endpoint
app.get("/", (req, res) => {
  res.send("API is working!");
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server started on PORT: ${port}`);
});
