import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoute.js";
import doctorRoutes from "./routes/doctorRoute.js";
import paymentRoutes from "./routes/paymentRoutes.js"; 

dotenv.config();
const app = express();

// middleware
app.use(cors({
  origin: ["http://localhost:5173", "https://medigoo.netlify.app"], 
  credentials: true
}));
app.use(express.json());

// routes
app.use("/api/user", userRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/payment", paymentRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// connect to DB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
