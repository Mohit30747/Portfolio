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

      const response = await fetch("https://portfolio-backend-ochre-six-41.vercel.app/api/contact", {
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="min-h-screen px-6 py-20 text-white"
    >
      <div className="max-w-5xl mx-auto">

        <h2 className="text-center text-5xl font-bold mb-10">
          Contact Me
        </h2>

        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto space-y-4 bg-gray-900 border border-gray-700 rounded-3xl p-8"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-slate-950 border border-slate-700 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-slate-950 border border-slate-700 outline-none"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Your Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-slate-950 border border-slate-700 outline-none"
          />

          <input
            type="text"
            name="address"
            placeholder="Your Address"
            value={form.address}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-slate-950 border border-slate-700 outline-none"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="w-full h-32 p-4 rounded-xl bg-slate-950 border border-slate-700 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-blue-600 font-bold"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        <div className="mt-10 flex flex-col gap-4 max-w-xl mx-auto">

          <button
            onClick={() => window.open(whatsapp, "_blank")}
            className="flex items-center justify-center gap-3 p-5 rounded-2xl bg-green-500/10 border border-green-500"
          >
            <FaWhatsapp size={28} />
            WhatsApp
          </button>

          <button
            onClick={() => window.open(linkedin, "_blank")}
            className="flex items-center justify-center gap-3 p-5 rounded-2xl bg-blue-500/10 border border-blue-500"
          >
            <FaLinkedin size={28} />
            LinkedIn
          </button>

          <button
            onClick={() => window.open(instagram, "_blank")}
            className="flex items-center justify-center gap-3 p-5 rounded-2xl bg-pink-500/10 border border-pink-500"
          >
            <FaInstagram size={28} />
            Instagram
          </button>

          <button
            onClick={() => window.open(github, "_blank")}
            className="flex items-center justify-center gap-3 p-5 rounded-2xl bg-sky-500/10 border border-sky-500"
          >
            <FaGithub size={28} />
            GitHub
          </button>

        </div>
      </div>
    </motion.section>
  );
}