import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./db.js"; // Aapki dynamic database connection wali db.js file

// Load all system environment variables
dotenv.config();

const app = express();

/* ================= 1. EXTRA-SOLID CORS & BODY PARSER ================= */
app.use(express.json()); // Incoming JSON payloads ko parse karne ke liye

// Vercel Serverless environment ke liye customized manual CORS middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  // Pre-flight OPTIONS request ko instant status 200 dekar return karein
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

/* ================= 2. DATABASE MODEL DEFINITION ================= */
const MessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true, default: "" },
    address: { type: String, trim: true, default: "" },
    message: { type: String, required: true, trim: true },
  },
  { 
    timestamps: true // Auto generate 'createdAt' aur 'updatedAt' fields
  }
);

// Model Caching: Serverless environment mein overwrite error ko rokta hai
const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema);

/* ================= 3. UTILS & COMMUNICATION LOGIC ================= */
// Gmail SMTP Server Config via Nodemailer Secure Layer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS, // 16-Digit App Password from .env
  },
});

/* ================= 4. MAIN ROUTE CONTROLLER (POST Only) ================= */
// vercel.json ne /api/contact ki request ko yahan bhej diya hai, isliye root '/' par handle hoga
app.post("/", async (req, res) => {
  try {
    const { name, email, phone, address, message } = req.body;

    console.log("📩 Payload Ingested Successfully at Vercel Core:", req.body);

    // A. Field Validation Strategy
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: "Validation Failure: 'name', 'email', and 'message' fields are strictly required." 
      });
    }

    // B. Database Connection Management
    const isDbConnected = await connectDB();
    if (!isDbConnected) {
      return res.status(500).json({ 
        success: false, 
        error: "Database Connectivity Failure: Could not connect to MongoDB Atlas Cluster." 
      });
    }

    // C. Write Document to MongoDB Atlas Cloud
    const savedDocument = await Message.create({ name, email, phone, address, message });
    console.log("💾 MongoDB Cluster Write Operation Completed ID:", savedDocument._id);

    /* ================= 5. LINEAR NOTIFICATION DISPATCH (Vercel Serverless Sync) ================= */
    
    // Notification Phase A: Email Pipeline Execution
    try {
      const mailOptions = {
        from: process.env.SENDING_EMAIL,
        to: process.env.NOTIFY_EMAIL,
        subject: `🔥 Portfolio Inquiry Alert from ${name}`,
        text: `Naam: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nAddress: ${address || "N/A"}\n\nMessage:\n${message}`,
      };
      
      const emailInfo = await transporter.sendMail(mailOptions);
      console.log("📧 Serverless Email Transport System Cleared:", emailInfo.messageId);
    } catch (mailErr) {
      console.error("❌ Non-Fatal Notification Error (Email):", mailErr.message);
      // Main operation ko block nahi karega agar notification glitch kare toh
    }

    /* ================= 6. FINAL SUCCESS RESOLUTION ================= */
    return res.status(201).json({
      success: true,
      message: "Data securely integrated into MongoDB Atlas cloud and email alert triggered.",
      data: savedDocument,
    });

  } catch (error) {
    console.error("💥 Critical Server Core Exception Event caught:", error);
    return res.status(500).json({ 
      success: false, 
      error: "Internal Serverless Engine Error", 
      details: error.message 
    });
  }
});

// Non-POST requests fallback barrier handler (Method Safety Guard)
app.use((req, res) => {
  res.status(405).json({ 
    success: false, 
    error: `System Policy Violation: Method '${req.method}' absolutely forbidden on this router engine.` 
  });
});

/* ================= 7. ENVIRONMENT-BASED LOCALHOST FALLBACK ================= */
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Node Engine booting locally at: http://localhost:${PORT}`);
  });
}

export default app;
