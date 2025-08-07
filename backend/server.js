// server.js

import express from "express";
import cors from "cors";
import 'dotenv/config'; // Auto-load .env
import connectDB from "./config/mongodb.js";
import userRouter from './routes/userRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import publicDoctorRoutes from "./routes/publicDoctorRoutes.js";


// App setup
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/public-doctors", publicDoctorRoutes);


// Connect to MongoDB
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("✅ API is running");
});

// Mount user routes
app.use('/api/user', userRouter);
app.use('/api/doctor', doctorRouter);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
