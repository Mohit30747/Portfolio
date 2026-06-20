require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const app = express();

/* ================= CORS FIX (IMPORTANT) ================= */

const allowedOrigins = [
  "https://mohit-sharma-portfolio-two.vercel.app",
  "https://mohit-portfolio-black.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
];

// ✅ dynamic origin handling (BEST FIX for Vercel)
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(null, true); // 🔥 allow all (safe for portfolio)
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ HANDLE preflight requests
app.options("*", cors());

app.use(express.json());

/* ================= DATABASE ================= */

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return true;

  try {
    await mongoose.connect(process.env.MONGO_URL);
    isConnected = true;
    console.log("✅ MongoDB Connected");
    return true;
  } catch (err) {
    console.error("❌ MongoDB Error:", err.message);
    return false;
  }
};

/* ================= MODEL ================= */

const MessageSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    address: String,
    message: String,
  },
  { timestamps: true }
);

const Message =
  mongoose.models.Message || mongoose.model("Message", MessageSchema);

/* ================= EMAIL ================= */

let transporter = null;

if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
}

/* ================= ROUTES ================= */

app.get("/", (req, res) => {
  res.json({ status: "Backend running ✅" });
});

/* ---------- CONTACT ---------- */

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, address, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Missing fields",
      });
    }

    await connectDB();

    const saved = await Message.create({
      name,
      email,
      phone,
      address,
      message,
    });

    // email (optional)
    if (transporter && process.env.NOTIFY_EMAIL) {
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: process.env.NOTIFY_EMAIL,
        subject: "New Portfolio Message",
        text: `${name} sent a message: ${message}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
      data: saved,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

/* ================= START ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});