const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("✅ MongoDB Already Connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URL);

    isConnected = db.connections[0].readyState === 1;

    console.log("✅ MongoDB Connected 🔥");
  } catch (error) {
    console.log("❌ MongoDB Connection Error");
    console.log(error.message);
    throw error;
  }
};

module.exports = connectDB;