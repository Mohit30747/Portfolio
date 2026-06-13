require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const twilio = require("twilio");

const app = express();

// ================= MIDDLEWARE =================
// ================= MIDDLEWARE =================
app.use(
  cors({
    origin: [
      "https://mohit-portfolio-black.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());
// ================= DB =================
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URL);
    isConnected = true;
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.log("❌ DB Error:", err.message);
  }
};

// ================= MODEL =================
const MessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  message: String,
}, { timestamps: true });

const Message = mongoose.model("Message", MessageSchema);

// ================= EMAIL =================
let transporter = null;

if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  transporter.verify((err) => {
    if (err) {
      console.log("❌ Email Error:", err.message);
    } else {
      console.log("✅ Email Ready");
    }
  });
}

// ================= TWILIO =================
let twilioClient = null;

if (
  process.env.TWILIO_ACCOUNT_SID &&
  process.env.TWILIO_ACCOUNT_SID.startsWith("AC") &&
  process.env.TWILIO_AUTH_TOKEN
) {
  try {
    twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    console.log("✅ SMS Ready");
  } catch (err) {
    console.log("❌ Twilio Error:", err.message);
  }
}

// ================= ROUTES =================

// 🔥 TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend is running✅");
});

// 🔥 TEST EMAIL
app.get("/test-email", async (req, res) => {
  try {
    if (!transporter) return res.send("❌ Email not configured");

    await transporter.sendMail({
      from: process.env.SENDING_EMAIL,
      to: process.env.NOTIFY_EMAIL,
      subject: "Test Email ✅",
      text: "Email is working",
    });

    res.send("✅ Email Sent");
  } catch (err) {
    console.log(err);
    res.send("❌ Email Failed");
  }
});

// 🔥 CONTACT API
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, address, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    // Save DB
    await connectDB();
    await Message.create({ name, email, phone, address, message });
    console.log("✅ Saved to DB");

    // EMAIL SEND
    if (transporter) {
      await transporter.sendMail({
        from: process.env.SENDING_EMAIL,
        to: process.env.NOTIFY_EMAIL,
        subject: `New Message from ${name}`,
        html: `
          <h3>New Contact Message</h3>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Address:</b> ${address}</p>
          <p><b>Message:</b> ${message}</p>
        `,
      });

      console.log("✅ Email Sent");
    }

    // SMS SEND
    if (twilioClient) {
      await twilioClient.messages.create({
        body: `New message from ${name}: ${message}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: process.env.YOUR_PHONE_NUMBER,
      });

      console.log("✅ SMS Sent");
    }

    res.json({ success: true });

  } catch (err) {
    console.log("❌ Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ================= START =================
module.exports = app;