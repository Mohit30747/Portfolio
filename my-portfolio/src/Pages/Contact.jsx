import { motion } from "framer-motion";
import { useState } from "react";
import { FaInstagram, FaGithub, FaWhatsapp, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  const API_URL = "https://portfolio-backend-ochre-six-41.vercel.app";

  const instagram =
    "https://www.instagram.com/pandat_.mohit.47?igsh=aDR3d29jZmY1bWdu";
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
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
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
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Message sent successfully ✅");

        setForm({
          name: "",
          email: "",
          phone: "",
          address: "",
          message: "",
        });
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to connect to server");
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

        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto space-y-4 bg-gray-900 p-6 rounded-3xl border border-gray-700 shadow-xl"
        >
          <h1 className="text-center text-2xl font-semibold">
            Send me a message
          </h1>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-700"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-700"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Your Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-700"
          />

          <input
            type="text"
            name="address"
            placeholder="Your Address"
            value={form.address}
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-700"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-700 h-32"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-full font-semibold ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Sending..." : "Send Message ✉️"}
          </button>
        </form>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <button
  onClick={() => window.open(whatsapp, "_blank")}
  className="group flex items-center justify-center gap-3 rounded-2xl border-2 border-green-500/50 bg-green-500/10 px-6 py-5 text-white font-semibold transition-all duration-300 hover:scale-105 hover:bg-green-500/20 hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] active:scale-95"
>
  <FaWhatsapp
    size={28}
    className="text-green-400 transition-transform duration-300 group-hover:rotate-12"
  />
  Chat on WhatsApp
</button>

        <button
  onClick={() => window.open(linkedin, "_blank")}
  className="group flex items-center justify-center gap-3 rounded-2xl border-2 border-blue-500/50 bg-blue-500/10 px-6 py-5 text-white font-semibold transition-all duration-300 hover:scale-105 hover:bg-blue-500/20 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] active:scale-95"
>
  <FaLinkedin
    size={28}
    className="text-blue-400 transition-transform duration-300 group-hover:rotate-12"
  />
  Connect on LinkedIn
</button>

        <button
  onClick={() => window.open(instagram, "_blank")}
  className="group flex items-center justify-center gap-3 rounded-2xl border-2 border-pink-500/50 bg-pink-500/10 px-6 py-5 text-white font-semibold transition-all duration-300 hover:scale-105 hover:bg-pink-500/20 hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] active:scale-95"
>
  <FaInstagram
    size={28}
    className="text-pink-400 transition-transform duration-300 group-hover:rotate-12"
  />
  Follow on Instagram
</button>

        <button
          onClick={() => window.open(github, "_blank")}
          className="flex items-center gap-3 rounded-2xl border border-sky-500 px-6 py-5"
        >
          <FaInstagram size={28} />
          Follow on Instagram
        </button>

        <button
          onClick={() => window.open(github, "_blank")}
          className="group flex items-center justify-center gap-3 rounded-2xl border-2 border-sky-500/50 bg-sky-500/10 px-6 py-5 text-white font-semibold transition-all duration-300 hover:scale-105 hover:bg-sky-500/20 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] active:scale-95"
        >
          <FaGithub
            size={28}
            className="text-sky-400 transition-transform duration-300 group-hover:rotate-12"
          />
          Visit GitHub
        </button>
      </div>
    </motion.section>
  );
}