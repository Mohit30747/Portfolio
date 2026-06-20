import mongoose from "mongoose";

/* ================= DATABASE CONNECTION ================= */
let isConnected = false;

const connectDB = async () => {
  // Agar pehle se connected hai toh dubara connect nahi karega
  if (isConnected) {
    console.log("=> Using existing database connection");
    return;
  }

  // Check karein ki environment variable set hai ya nahi
  if (!process.env.MONGO_URL) {
    throw new Error("Missing MONGO_URL environment variable inside .env file");
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URL, {
      bufferCommands: false, // Turant error throw karega agar connection lost ho jaye
    });
    
    isConnected = db.connections[0].readyState === 1;
    console.log("=> New database connection established successfully");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    throw error;
  }
};

/* ================= MONGOOSE MODEL ================= */
// Yeh schema ensure karega ki data sahi format mein save ho
const MessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true, default: "" },
    address: { type: String, trim: true, default: "" },
    message: { type: String, required: true, trim: true },
  },
  { 
    timestamps: true // Yeh automatically 'createdAt' aur 'updatedAt' fields bana dega
  }
);

// Puraane model ko reuse karein ya naya banayein
const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema);

/* ================= MAIN HANDLER FUNCTION ================= */
export default async function handler(req, res) {
  /* 1. CORS FIX FOR CROSS-ORIGIN REQUESTS */
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Pre-flight request handled
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Strict check for POST method only
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: `Method ${req.method} Not Allowed` });
  }

  try {
    /* 2. BODY PARSING CHECK */
    // Agar frontend se string aayi hai toh use object mein convert karein
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).json({ success: false, error: "Invalid JSON format in request body" });
      }
    }

    // Destructure properties from safely parsed body
    const { name, email, phone, address, message } = body || {};

    console.log("📩 Received Payload:", { name, email, phone, address, message });

    /* 3. VALIDATION */
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: "Validation Failed. 'name', 'email', and 'message' fields are required." 
      });
    }

    /* 4. CONNECT TO DATABASE */
    await connectDB();

    /* 5. CREATE AND SAVE DOCUMENT */
    const newMessage = await Message.create({
      name,
      email,
      phone,
      address,
      message,
    });

    console.log("💾 Document Saved in MongoDB:", newMessage);

    // Success Response to Frontend
    return res.status(201).json({
      success: true,
      message: "Message sent and stored successfully!",
      data: newMessage,
    });

  } catch (err) {
    console.error("💥 Server Error details:", err);
    return res.status(500).json({ 
      success: false, 
      error: "Internal Server Error", 
      details: err.message 
    });
  }
}
