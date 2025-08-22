// seedDoctors.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import doctorModel from "./models/doctorModel.js"; // adjust path if needed
import { doctors } from "./data/doctors.js"; // your static doctors array

dotenv.config();

const seedDoctors = async () => {
  try {
    // connect to MongoDB Atlas
    await mongoose.connect(process.env.MONGO_URI);

    // clear old doctors
    await doctorModel.deleteMany();

    // remove _id and add unique emails
    const cleanedDoctors = doctors.map(({ _id, ...rest }, index) => ({
      ...rest,
      email: `doctor${index + 1}@medigo.com` // ✅ unique email
    }));

    // insert data
    await doctorModel.insertMany(cleanedDoctors);

    console.log("✅ Doctors seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding doctors:", error);
    process.exit(1);
  }
};

seedDoctors();
