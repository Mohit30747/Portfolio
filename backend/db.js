import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoUri =
  process.env.MONGO_URL ||
  process.env.MONGODB_URI ||
  process.env.MONGO_URI;

const normalizeMongoUri = (uri) => {
  try {
    const parsed = new URL(uri);
    const dbName = parsed.pathname.replace(/^\/+/, "");

    if (dbName) {
      parsed.pathname = `/${dbName.toLowerCase()}`;
      return parsed.toString();
    }
  } catch (error) {
    console.warn("⚠️ Unable to normalize MongoDB URI:", error.message);
  }

  return uri;
};

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

    if (!mongoUri) {
      throw new Error(
        "MongoDB connection string is missing. Set MONGO_URL (or MONGODB_URI/MONGO_URI) in your environment."
      );
    }

    const resolvedMongoUri = normalizeMongoUri(mongoUri);

    if (!cached.promise) {
      cached.promise = mongoose.connect(resolvedMongoUri, {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
        bufferCommands: false,
      });
    }

    cached.conn = await cached.promise;

    console.log("✅ MongoDB Connected Successfully");
    console.log("📍 Database:", mongoose.connection.name);

    return cached.conn;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    return null;
  }
};

export default connectDB;