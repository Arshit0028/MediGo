import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
import userRoutes from "./routes/userRoute.js";
import doctorRoutes from "./routes/doctorRoute.js";

const app = express();

// Middleware
app.use(express.json());

// ✅ CORS setup

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"] // ✅ No "token" needed
}));



app.options("*", cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/doctor", doctorRoutes);

// ✅ Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ MongoDB connected");
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch((err) => {
  console.error("❌ MongoDB connection failed:", err);
});
