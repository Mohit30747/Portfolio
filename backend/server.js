import mongoose from "mongoose";

/* ================= DB ================= */

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGO_URL);
  isConnected = true;
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

/* ================= MAIN HANDLER ================= */

export default async function handler(req, res) {
  /* ✅ CORS FIX (MOST IMPORTANT) */
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

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
}