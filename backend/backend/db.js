const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/portfolio");
    console.log("MongoDB Connected 🔥");
    return true;
  } catch (error) {
    console.log("⚠️  MongoDB Connection Error - Using JSON file storage instead");
    console.log("Error details:", error.message);
    return false;
  }
};

module.exports = connectDB;