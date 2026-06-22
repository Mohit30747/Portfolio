import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./db.js";

dotenv.config();

const app = express();

/* ================= 1. CORS & PARSER ================= */
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

/* ================= 2. MODEL ================= */
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

/* ================= 3. EMAIL ================= */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

/* ================= 4. CONTROLLER (FIXED ROUTE SYNTAX) ================= */
// Purane app.all(*) ko hata kar seedhe use standard callback router engine par map kiya hai
app.use(async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: `Method ${req.method} not allowed.` });
  }

  try {
    const { name, email, phone, address, message } = req.body;
    console.log("📩 Payload Ingested:", req.body);

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: "Validation Failure: Name, email, and message are required." });
    }

    const isDbConnected = await connectDB();
    if (!isDbConnected) {
      return res.status(500).json({ success: false, error: "Database handshakes failed." });
    }

    const savedDocument = await Message.create({ name, email, phone, address, message });
    console.log("💾 Storage Complete. ID:", savedDocument._id);

    try {
      const mailOptions = {
        from: process.env.SENDING_EMAIL,
        to: process.env.NOTIFY_EMAIL,
        subject: `🔥 Portfolio Inquiry Alert from ${name}`,
        text: `Naam: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nAddress: ${address || "N/A"}\n\nMessage:\n${message}`,
      };
      await transporter.sendMail(mailOptions);
      console.log("📧 Email Transport Complete.");
    } catch (mailErr) {
      console.error("❌ Email Failure:", mailErr.message);
    }

    return res.status(201).json({
      success: true,
      message: "Data securely integrated into MongoDB and alerts initialized.",
      data: savedDocument,
    });

  } catch (error) {
    console.error("💥 Core Engine Error:", error);
    return res.status(500).json({ success: false, error: "Internal Serverless Engine Error", details: error.message });
  }
});

/* ================= 5. LOCAL BOOTSTRAP ================= */
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Node Server booted successfully at: http://localhost:${PORT}`);
  });
}

export default app;
