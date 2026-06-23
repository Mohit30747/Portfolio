import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./db.js";

dotenv.config();

const app = express();

/* ================= 1. GLOBAL MIDDLEWARES ================= */
app.use(express.json());
app.use(cors({ origin: "*" })); // Complete CORS security bypass for browser

/* ================= 2. DATABASE MODEL ================= */
const MessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true, default: "" },
    address: { type: String, trim: true, default: "" },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema);

/* ================= 3. NOTIFICATION SYSTEM ================= */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

/* ================= 4. DYNAMIC CATCH-ALL ROUTER ENGINE ================= */
// Hum kisi path ko fix nahi karenge, jo bhi traffic vercel.json yahan bhejega use handle karenge
app.use(async (req, res) => {
  // CORS Response Headers explicitly declared for safety
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: `Method ${req.method} not allowed.` });
  }

  try {
    const { name, email, phone, address, message } = req.body;
    console.log("📩 Core Engine Payload Recieved:", req.body);

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "Validation Failure: Required fields missing." });
    }

    const isDbConnected = await connectDB();
    if (!isDbConnected) {
      return res.status(500).json({ success: false, error: "Database engine layer connectivity failure." });
    }

    // Insert data to live MongoDB Atlas
    const savedDocument = await Message.create({ name, email, phone, address, message });
    console.log("💾 MongoDB Cluster Write Success ID:", savedDocument._id);
    console.log("💾 DATA SAVED:", savedDocument._id);///new

    // Live Email Trigger Pipeline
    try {
      const mailOptions = {
        from: process.env.SENDING_EMAIL,
        to: process.env.NOTIFY_EMAIL,
        subject: `🔥 Portfolio Inquiry Alert from ${name}`,
        text: `Naam: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nAddress: ${address || "N/A"}\n\nMessage:\n${message}`,
      };
      await transporter.sendMail(mailOptions);
      console.log("📧 Serverless Email Transport Complete.");
    } catch (mailErr) {
      console.error("❌ Non-fatal Notification Delivery Failure:", mailErr.message);
    }

    return res.status(201).json({
      success: true,
      message: "Data securely integrated into MongoDB Atlas cloud and email alerts initialized.",
      data: savedDocument,
    });

  } catch (error) {
    console.error("💥 Critical Server Core Exception caught:", error);
    return res.status(500).json({ success: false, error: "Internal Serverless Engine Error", details: error.message });
  }
});

/* ================= 5. LOCAL BOOTSTRAP WRAPPER ================= */
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Node Server booted successfully at: http://localhost:${PORT}`);
  });
}

export default app;
