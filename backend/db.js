import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

const connectDB = async () => {
  try {
    if (cached.conn) {
      return cached.conn;
    }

    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is missing in environment variables");
    }

    if (!cached.promise) {
      cached.promise = mongoose.connect(process.env.MONGO_URL, {
        bufferCommands: false,
      });
    }

    cached.conn = await cached.promise;

    console.log("✅ MongoDB Connected Successfully");

    return cached.conn;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    return null;
  }
};

export default connectDB;