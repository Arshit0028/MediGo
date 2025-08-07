import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("✅ MongoDB Connected")
    );

    mongoose.connection.on("error", (err) =>
      console.error("❌ MongoDB connection error:", err)
    );

    await mongoose.connect(`${process.env.MONGO_URI}MediGo`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error("❌ Failed to connect MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
