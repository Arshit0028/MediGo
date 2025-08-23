// seedDoctors.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Doctor from "./models/doctorModel.js"; 
import { doctors } from "./data/doctors.js";

dotenv.config();

const seedDoctors = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected ✅");

    // Clear old doctors
    await Doctor.deleteMany();
    console.log("Old doctors cleared ✅");

    // Add unique email and availability
    const cleanedDoctors = doctors.map((doc, index) => ({
      ...doc,
      email: `doctor${index + 1}@medigo.com`, // unique email
      available: true, // set default availability
    }));

    // Insert doctors into DB
    await Doctor.insertMany(cleanedDoctors);
    console.log("Doctors seeded successfully ✅");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding doctors ❌:", error);
    process.exit(1);
  }
};

seedDoctors();
