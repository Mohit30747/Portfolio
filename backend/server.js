import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import twilio from "twilio";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./db.js"; // Aapki dynamic connection wali db.js file

// Load all system environment variables
dotenv.config();

const app = express();

/* ================= 1. GLOBAL MIDDLEWARES ================= */
app.use(cors({ origin: "*" })); // Kisi bhi domain se query access allow karne ke liye
app.use(express.json()); // Incoming JSON payloads ko auto parse karne ke liye

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

// Model Caching: Next.js/Vercel serverless functions mein dynamic compilation error ko rokta hai
const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema);

/* ================= 3. UTILS & COMMUNICATION LOGIC ================= */
// Twilio Integration Validation Check
const twilioClient =
  process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
    ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    : null;

// Gmail SMTP Server Config via Nodemailer Secure Connection Layer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS, // 16-Digit App Password (.env file format parsed)
  },
});

/* ================= 4. MAIN ROUTE CONTROLLER (POST Only) ================= */
// Aapne vercel.json mein routing engine setup kiya hai, isliye root '/' hit par capture hoga
app.post("/", async (req, res) => {
  try {
    const { name, email, phone, address, message } = req.body;

    console.log("📩 Payload Ingested Successfully at Vercel Core:", req.body);

    // A. Validation Strategy
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: "Validation Failure: 'name', 'email', and 'message' fields are strictly required." 
      });
    }

    // B. Database Operation
    const isDbConnected = await connectDB();
    if (!isDbConnected) {
      return res.status(500).json({ 
        success: false, 
        error: "Database Connectivity Failure: Could not build handshakes with MongoDB Atlas." 
      });
    }

    // Live Insertion
    const savedDocument = await Message.create({ name, email, phone, address, message });
    console.log("💾 MongoDB Cluster Write Operation Completed:", savedDocument._id);

    /* ================= 5. LINEAR NOTIFICATION DISPATCH (Vercel Core Compatible) ================= */
    
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
      // Agar email delivery fail bhi ho jaye, toh main response block nahi hoga aur user ko success dikhega
    }

    // Notification Phase B: SMS Pipeline Execution (via Twilio Node Core)
    if (twilioClient && process.env.TWILIO_PHONE_NUMBER && !process.env.TWILIO_PHONE_NUMBER.includes("your_")) {
      try {
        const smsResponse = await twilioClient.messages.create({
          body: `Portfolio Alert: New message from ${name} - "${message.substring(0, 45)}..."`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: process.env.YOUR_PHONE_NUMBER,
        });
        console.log("💬 Serverless SMS System Dispatched. SID:", smsResponse.sid);
      } catch (smsErr) {
        console.error("❌ Non-Fatal Notification Error (SMS):", smsErr.message);
      }
    } else {
      console.log("⚠️ Twilio Module Skipped: Active credentials missing or placeholder found inside config.");
    }

    /* ================= 6. FINAL SUCCESS RESOLUTION ================= */
    return res.status(201).json({
      success: true,
      message: "Data securely integrated into MongoDB Atlas cloud and system alert matrices triggered.",
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
    error: `System Policy Violation: Method '${req.method}' absolute forbidden on this router engine.` 
  });
});

/* ================= 7. ENVIRONMENT-BASED LOCALHOST FALLBACK ================= */
// Vercel serverless layer dynamically scale ho jata hai bina app.listen ke,
// Par local development computer par check karne ke liye is wrapper ka use karein:
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Node Engine booting locally at: http://localhost:${PORT}`);
  });
}

export default app; // Vercel builder handles execution from default app exports
