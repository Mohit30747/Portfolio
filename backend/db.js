import mongoose from "mongoose";

let isConnected = false; // Connection leakage rokne ke liye status check

const connectDB = async () => {
  if (isConnected) {
    console.log("=> Using existing database connection");
    return true;
  }

  if (!process.env.MONGO_URL) {
    console.error("❌ MONGO_URL environment variable is missing!");
    return false;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URL, {
      bufferCommands: false, // Serverless environments ke liye recommended config
    });
    
    isConnected = db.connections.readyState === 1;
    console.log("✅ MongoDB Connected Successfully");
    return true;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    return false;
  }
};

export default connectDB; // require ki jagah export default use karein
