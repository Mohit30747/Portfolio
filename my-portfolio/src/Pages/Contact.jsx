import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaInstagram,
  FaGithub,
  FaWhatsapp,
  FaLinkedin,
} from "react-icons/fa";

export default function Contact() {
  const instagram =
    "https://www.instagram.com/pandat_.mohit.47";
  const github =
    "https://github.com/Mohit30747";
  const linkedin =
    "https://www.linkedin.com/in/mohit-sharma-127a87359";
  const whatsapp =
    "https://wa.me/919306429693";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, address, message } = form;

    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !message.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
  "https://portfolio-backend-ochre-six-41.vercel.app/api/contact",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      message: message.trim(),
    }),
  }
);

const text = await response.text();
console.log("Response:", text);

      if (!response.ok) {
        throw new Error(
          text || "Something went wrong"
        );
      }

      alert("✅ Message Sent Successfully");

      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
  id="contact"
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.8 }}
  className="relative min-h-screen overflow-hidden text-white p-10 bg-gradient-to-br from-gray-950 via-slate-900 to-black"
>
      <div className="max-w-5xl mx-auto">

        <h2 className="text-5xl md:text-6xl text-center font-bold mb-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
  Contact Me
</h2>

        <form
          onSubmit={handleSubmit}
className="max-w-xl mx-auto space-y-5 p-8 rounded-[32px]
    bg-white/5 backdrop-blur-2xl
    border border-white/10
    shadow-[0_20px_80px_rgba(0,0,0,0.6)]
    hover:shadow-[0_30px_100px_rgba(59,130,246,0.35)]
    transition-all duration-700"
    >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-700 transition-all duration-300 outline-none focus:border-blue-500 focus:shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:border-white/50"          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-700 transition-all duration-300 outline-none focus:border-blue-500 focus:shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:border-white/50"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Your Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-700 transition-all duration-300 outline-none focus:border-blue-500 focus:shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:border-white/50"
          />

          <input
            type="text"
            name="address"
            placeholder="Your Address"
            value={form.address}
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-700 transition-all duration-300 outline-none focus:border-blue-500 focus:shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:border-white/50"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="w-full h-32 p-4 rounded-2xl bg-slate-950 border border-slate-700 transition-all duration-300 outline-none focus:border-blue-500 focus:shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:border-white/50"
          />

          <button
            type="submit"
            disabled={loading}
className={`w-full py-4 rounded-full font-bold transition-all duration-500 ${
  loading
    ? "bg-gray-700 cursor-not-allowed"
    : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:scale-105 hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]"
}`}          >
            {loading ? "Sending...📩" : "Send Message"}
          </button>
        </form>

        <div className="mt-12 grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">

  <motion.button
    whileHover={{ scale: 1.05, y: -5 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => window.open(whatsapp, "_blank")}
    className="group relative overflow-hidden flex items-center justify-center gap-3 p-5 rounded-3xl bg-green-500/10 border border-green-500 backdrop-blur-md transition-all duration-500 hover:shadow-[0_0_40px_rgba(34,197,94,0.7)]"
  >
    <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-10 transition-all duration-500" />
    <FaWhatsapp
      size={30}
      className="group-hover:rotate-12 transition-all duration-500"
    />
    <span className="font-semibold text-lg">
      WhatsApp
    </span>
  </motion.button>

  <motion.button
    whileHover={{ scale: 1.05, y: -5 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => window.open(linkedin, "_blank")}
    className="group relative overflow-hidden flex items-center justify-center gap-3 p-5 rounded-3xl bg-blue-500/10 border border-blue-500 backdrop-blur-md transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.7)]"
  >
    <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 transition-all duration-500" />
    <FaLinkedin
      size={30}
      className="group-hover:rotate-12 transition-all duration-500"
    />
    <span className="font-semibold text-lg">
      LinkedIn
    </span>
  </motion.button>

  <motion.button
    whileHover={{ scale: 1.05, y: -5 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => window.open(instagram, "_blank")}
    className="group relative overflow-hidden flex items-center justify-center gap-3 p-5 rounded-3xl bg-pink-500/10 border border-pink-500 backdrop-blur-md transition-all duration-500 hover:shadow-[0_0_40px_rgba(236,72,153,0.7)]"
  >
    <div className="absolute inset-0 bg-pink-500 opacity-0 group-hover:opacity-10 transition-all duration-500" />
    <FaInstagram
      size={30}
      className="group-hover:rotate-12 transition-all duration-500"
    />
    <span className="font-semibold text-lg">
      Instagram
    </span>
  </motion.button>

  <motion.button
    whileHover={{ scale: 1.05, y: -5 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => window.open(github, "_blank")}
    className="group relative overflow-hidden flex items-center justify-center gap-3 p-5 rounded-3xl bg-sky-500/10 border border-sky-500 backdrop-blur-md transition-all duration-500 hover:shadow-[0_0_40px_rgba(14,165,233,0.7)]"
  >
    <div className="absolute inset-0 bg-sky-500 opacity-0 group-hover:opacity-10 transition-all duration-500" />
    <FaGithub
      size={30}
      className="group-hover:rotate-12 transition-all duration-500"
    />
    <span className="font-semibold text-lg">
      GitHub
    </span>
  </motion.button>

</div>
      </div>
    </motion.section>
  );
}