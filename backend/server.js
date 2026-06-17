require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const app = express();

// ================= MIDDLEWARE =================

app.use(
  cors({
    origin: [
      "https://mohit-portfolio-black.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

// ================= DATABASE =================

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

// ================= MODEL =================

const MessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    address: String,
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Message =
  mongoose.models.Message ||
  mongoose.model("Message", MessageSchema);

// ================= EMAIL =================

let transporter = null;

if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  transporter.verify((err) => {
    if (err) {
      console.error("❌ Email Error:", err.message);
    } else {
      console.log("✅ Email Ready");
    }
  });
}

// ================= ROUTES =================

app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// ---------- TEST DB ----------

app.get("/test-db", async (req, res) => {
  const connected = await connectDB();

  return res.json({
    mongo: connected ? "CONNECTED" : "FAILED",
    gmail: process.env.GMAIL_USER ? "FOUND" : "MISSING",
    notifyEmail: process.env.NOTIFY_EMAIL ? "FOUND" : "MISSING",
  });
});

// ---------- TEST EMAIL ----------

app.get("/test-email", async (req, res) => {
  try {
    if (!transporter) {
      return res.status(500).send("❌ Email not configured");
    }

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.NOTIFY_EMAIL,
      subject: "Test Email ✅",
      text: "Email is working successfully",
    });

    res.send("✅ Email Sent");
  } catch (err) {
    console.error("TEST EMAIL ERROR:", err);
    res.status(500).send(err.message);
  }
});

// ---------- VIEW LAST 10 MESSAGES ----------

app.get("/messages", async (req, res) => {
  try {
    await connectDB();

    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(messages);
  } catch (err) {
    console.error("MESSAGES ERROR:", err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// ---------- CONTACT FORM ----------

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, address, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Required fields missing",
      });
    }

    const dbConnected = await connectDB();

    if (!dbConnected) {
      return res.status(500).json({
        success: false,
        error: "MongoDB connection failed",
      });
    }

    const savedMessage = await Message.create({
      name,
      email,
      phone,
      address,
      message,
    });

    console.log("✅ Saved to DB");
    console.log(savedMessage);

    if (transporter && process.env.NOTIFY_EMAIL) {
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: process.env.NOTIFY_EMAIL,
        subject: `New Message from ${name}`,
        html: `
          <h3>New Contact Message</h3>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone || "-"}</p>
          <p><b>Address:</b> ${address || "-"}</p>
          <p><b>Message:</b> ${message}</p>
        `,
      });

      console.log("✅ Email Sent");
    }

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
      data: savedMessage,
    });
  } catch (err) {
    console.error("========== CONTACT ERROR ==========");
    console.error(err);
    console.error("===================================");

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// ================= START =================

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports = app;