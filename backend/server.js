import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./db.js";

dotenv.config();

const app = express();

/* ================= MIDDLEWARE ================= */

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

/* ================= DATABASE MODEL ================= */

const MessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message =
  mongoose.models.Message ||
  mongoose.model("Message", MessageSchema);

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

/* ================= TEST ROUTE ================= */

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Backend Running 🚀",
  });
});

app.get("/api/contact", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Contact API Ready 🚀",
  });
});

/* ================= CONTACT ================= */

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, address, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Name, Email and Message are required",
      });
    }

    const dbConnected = await connectDB();

    if (!dbConnected) {
      return res.status(500).json({
        success: false,
        error: "MongoDB Connection Failed",
      });
    }

    const savedMessage = await Message.create({
      name,
      email,
      phone,
      address,
      message,
    });

    if (transporter && process.env.NOTIFY_EMAIL) {
      try {
        await transporter.sendMail({
          from: process.env.GMAIL_USER,
          to: process.env.NOTIFY_EMAIL,
          subject: `New Portfolio Message - ${name}`,
          html: `
            <h2>New Contact Message</h2>

            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Phone:</b> ${phone || "-"}</p>
            <p><b>Address:</b> ${address || "-"}</p>

            <hr/>

            <p>${message}</p>
          `,
        });
      } catch (mailError) {
        console.error(mailError);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Message Sent Successfully",
      data: savedMessage,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/* ================= LOCAL ================= */

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server Running On Port ${PORT}`);
  });
}

export default app;