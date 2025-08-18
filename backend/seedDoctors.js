import mongoose from "mongoose";
import doctorModel from "./models/doctorModel.js"; // adjust path if needed
import dotenv from "dotenv";
dotenv.config();

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/your-db-name";

const seedDoctors = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected");

    const doctors = [];

    for (let i = 1; i <= 15; i++) {
      doctors.push({
        name: `Doctor ${i}`,
        email: `doctor${i}@mail.com`,
        phone: `900000000${i}`,
        specialization: "General",
        available: true,
        fees: 500,
        docCode: `doc${i}`
      });
    }

    await doctorModel.insertMany(doctors);
    console.log("Doctors seeded");
    process.exit();
  } catch (err) {
    console.error("Seeding error:", err.message);
    process.exit(1);
  }
};

seedDoctors();
