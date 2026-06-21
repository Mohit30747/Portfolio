import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return true;
  if (!process.env.MONGO_URL) return false;

  try {
    const db = await mongoose.connect(process.env.MONGO_URL, {
      bufferCommands: false,
    });
    isConnected = db.connections.readyState === 1;
    console.log("✅ MongoDB Connected Successfully");
    return true;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    return false;
  }
};

export default connectDB;
