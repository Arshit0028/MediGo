import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    console.log("✅ Loaded MONGODB_URI:", process.env.MONGODB_URI);
    const uri = `${process.env.MONGODB_URI}/HealNow`;

    console.log("🔌 Connecting to MongoDB:", uri);
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
