// import { motion } from "framer-motion";
import { useState } from "react";
import { FaInstagram, FaGithub, FaWhatsapp ,FaLinkedin } from "react-icons/fa";

export default function Contact() {
  
  const API_URL = "https://portfolio-backend-ochre-six-41.vercel.app/";

  // ✅ LINKS YAHAA (TOP PE)
  const instagram = "https://www.instagram.com/pandat_.mohit.47?igsh=aDR3d29jZmY1bWdu";
  const github = "https://github.com/Mohit30747";
  const linkedin = "https://www.linkedin.com/in/mohit-sharma-127a87359";
  const whatsapp = "https://wa.me/919306429693";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const API_URL = "https://portfolio-backend-ochre-six-41.vercel.app";

    const { name, email, phone, address, message } = form;

    // Validation - only require name, email, and message
    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim() || !message.trim()) {
      alert("Please fill in your all required fields (name, email, phone, address, message)");
      setLoading(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      setLoading(false);
      return;
    }

    const requestData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      message: message.trim(),
    };

    try {
      console.log("========== NETWORK DEBUG START ==========");
      console.log("📤 REQUEST DETAILS:");
      console.log("  URL: https://portfolio-backend-ochre-six-41.vercel.app/api/contact");
      console.log("  Method: POST");
      console.log("  Headers: Content-Type: application/json");
      console.log("  Body:", JSON.stringify(requestData, null, 2));
      console.log("  Timestamp:", new Date().toISOString());
      
      const startTime = performance.now();
      
const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const endTime = performance.now();
      const responseTime = (endTime - startTime).toFixed(2);

      console.log("📨 RESPONSE DETAILS:");
      console.log("  Status Code:", response.status);
      console.log("  Status Text:", response.statusText);
      console.log("  Response Time:", responseTime + "ms");
      console.log("  Headers:", {
        "Content-Type": response.headers.get("Content-Type"),
        "Content-Length": response.headers.get("Content-Length"),
      });
      
      const data = await response.json();
      console.log("  Body:", data);
      console.log("========== NETWORK DEBUG END ==========\n");

      if (response.ok) {
        console.log("✅ SUCCESS: Message sent!");
        alert( data.message || "Your message has been sent successfully! ✅");
        setForm({
          name: "",
          email: "",
          phone: "",
          address: "",
          message: "",
        });
      } else {
        console.log("❌ FAILED: Server returned error");
        alert("❌ Error: " + (data.error || "Something went wrong"));
      }
    } catch (error) {
      console.log("========== NETWORK DEBUG END ==========\n");
      console.error("❌ NETWORK ERROR:", {
        message: error.message,
        type: error.name,
        stack: error.stack,
        timestamp: new Date().toISOString(),
      });
      
      console.log("\n🔍 TROUBLESHOOTING STEPS:");
      console.log("1. Check if backend server is running: cd c:\\Users\\leovo\\Desktop\\protfoliyo\\backend\\backend && node server.js");
      console.log("2. Check if MongoDB is running: mongod");
      console.log("3. Check if port 5000 is available: netstat -ano | findstr :5000");
      console.log("4. Check firewall settings");
      console.log("5. Try refreshing the page and submitting again");
      
      alert("❌ Failed to send message.\n\nMake sure:\n1. Backend server is running\n2. MongoDB is running\n3. Port 5000 is not blocked\n\nCheck browser DevTools Console for detailed network logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65 }}
      className="min-h-screen text-white p-10 page-panel"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl text-center font-bold mb-5">
          Contact Me
        </h2>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 bg-gray-900 p-6 rounded-3xl border border-gray-700 shadow-xl shadow-slate-900/40 page-card">
          <h1 className="text-center text-2xl font-semibold text-white">Send me a message</h1>

          <input type="text" name="name" autoComplete="name" placeholder="Your name"
            value={form.name} onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-700 text-white focus:border-blue-400 focus:outline-none"
          />

          <input type="email" name="email" autoComplete="email" placeholder="Your email"
            value={form.email} onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-700 text-white focus:border-blue-400 focus:outline-none"
          />

          <input type="tel" name="phone" autoComplete="tel" placeholder="Your phone"
            value={form.phone} onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-700 text-white focus:border-blue-400 focus:outline-none"
          />

          <input type="text" name="address" autoComplete="address" placeholder="Your address"
            value={form.address} onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-700 text-white focus:border-blue-400 focus:outline-none"
          />

          <textarea name="message" autoComplete="message" placeholder="Your message"
            value={form.message} onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-700 text-white focus:border-blue-400 focus:outline-none h-32"
          />

          <button
            type="submit"
            disabled={loading}
            className={`btn-glow w-full px-5 py-3 rounded-full text-white font-semibold transition ${
              loading 
                ? "bg-gray-600 cursor-not-allowed opacity-75" 
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Sending... ⏳" : "Send Message ✉️"}
          </button>
        </form>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <button
          type="button"
          onClick={() => window.open(whatsapp, "_blank")}
          className="btn-glow flex items-center gap-3 rounded-2xl border-2 border-green-500/50 bg-green-500/15 px-6 py-5 text-white font-semibold hover:bg-green-500/25 shadow-lg hover:shadow-green-500/40 transition-all"
        >
          <FaWhatsapp size={28} className="text-green-400" />
          Chat on WhatsApp
        </button>

        <button
          type="button"
          onClick={() => window.open(linkedin, "_blank")}
          className="btn-glow flex items-center gap-3 rounded-2xl border-2 border-blue-500/50 bg-blue-500/15 px-6 py-5 text-white font-semibold hover:bg-blue-500/25 shadow-lg hover:shadow-blue-500/40 transition-all"
        >
          <FaLinkedin size={28} className="text-blue-400" />
          Connect on LinkedIn
        </button>

        <button
          type="button"
          onClick={() => window.open(instagram, "_blank")}
          className="btn-glow flex items-center gap-3 rounded-2xl border-2 border-pink-500/50 bg-pink-500/15 px-6 py-5 text-white font-semibold hover:bg-pink-500/25 shadow-lg hover:shadow-pink-500/40 transition-all"
        >
          <FaInstagram size={28} className="text-pink-400" />
          Follow on Instagram
        </button>

        <button
          type="button"
          onClick={() => window.open(github, "_blank")}
          className="btn-glow flex items-center gap-3 rounded-2xl border-2 border-blue-400/50 bg-sky-500/15 px-6 py-5 text-white font-semibold hover:bg-sky-500/25 shadow-lg hover:shadow-sky-500/40 transition-all"
        >
          <FaGithub size={28} className="text-blue-300" />
          Visit GitHub
        </button>
     </div>
    </motion.section>
  );
}