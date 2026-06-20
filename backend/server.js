require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const app = express();

/* ================= CORS FIX ================= */

app.use(
  cors({
    origin: "*", // 🔥 simplest & BEST for portfolio (fix all CORS issues)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// IMPORTANT: preflight fix
app.options("*", cors());

app.use(express.json());

/* ================= DB ================= */

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URL);
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("DB Error:", err.message);
  }
};

/* ================= MODEL ================= */

const Message =
  mongoose.models.Message ||
  mongoose.model(
    "Message",
    new mongoose.Schema(
      {
        name: String,
        email: String,
        phone: String,
        address: String,
        message: String,
      },
      { timestamps: true }
    )
  );

/* ================= ROUTE ================= */

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, address, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing fields" });
    }

    await connectDB();

    const data = await Message.create({
      name,
      email,
      phone,
      address,
      message,
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
      data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

/* ================= EXPORT (VERY IMPORTANT FOR VERCEL) ================= */

module.exports = app;