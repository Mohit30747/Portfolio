import { motion } from "framer-motion";
import { useState } from "react";
import { LiaLinkedin } from "react-icons/lia";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";

export default function Contact() {

  // ✅ LINKS YAHAA (TOP PE)
  const instagram = "https://www.instagram.com/pandat_.mohit.47?igsh=aDR3d29jZmY1bWdu";
  const facebook = "https://www.facebook.com/share/1DjaL1RRUY/";
  const linkedin = "https://www.linkedin.com/in/mohit-sharma-127a87359";
  const whatsapp = "https://wa.me/919306429693";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();

    const { name, email, phone, address, message } = form;

    if (!name || !email) {
      alert("Please fill your all required fields");
      return;
    }

    const finalMessage = message || "Hello, I want to contact you";

    const text = encodeURIComponent(
      `Name: ${name}
Email: ${email}
Phone: ${phone}
Address: ${address}
Message: ${finalMessage}`
    );

    const url = `https://wa.me/919306429693?text=${text}`;

    window.open(url, "_blank");

    setForm({
      name: "",
      email: "",
      phone: "",
      address: "",
      message: "",
    });
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65 }}
      className="min-h-screen bg-black text-white p-10"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl text-center font-bold mb-5">
          Contact Me
        </h2>

        <form className="max-w-xl mx-auto space-y-4 bg-gray-900 p-6 rounded-xl border border-gray-700">
          <h1 className="text-center">Enter Your Info</h1>

          <input type="text" name="name" autoComplete="name" placeholder="Your name"
            value={form.name} onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 border border-gray-600"
          />

          <input type="email" name="email" autoComplete="email" placeholder="Your email"
            value={form.email} onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 border border-gray-600"
          />

          <input type="tel" name="phone" autoComplete="tel" placeholder="Your phone"
            value={form.phone} onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 border border-gray-600"
          />

          <input type="text" name="address" autoComplete="address" placeholder="Your address"
            value={form.address} onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 border border-gray-600"
          />

          <textarea name="message" autoComplete="message" placeholder="Your message"
            value={form.message} onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 border border-gray-600 h-28"
          />

          <button
            onClick={handleWhatsApp}
            className="w-full bg-blue-500 px-5 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* ✅ SOCIAL BUTTONS */}
      <div className="flex flex-wrap font-extrabold justify-center gap-6 mt-6">

        <button
          type="button"
          onClick={() => window.open(linkedin, "_blank")}
          className="bg-blue-600 hover:bg-blue-800 hover:scale-110 px-4 py-2 rounded-lg hover:animate-bounce"
        >
          <LiaLinkedin size={24} />
        <i className="fa-brands fa-linkedin"></i>
        </button>

        <button
          type="button"
          onClick={() => window.open(instagram, "_blank")}
          className="bg-pink-500 hover:bg-pink-400 hover:text-red-700 hover:scale-110 transition-all duration-300 px-4 py-2 rounded-lg hover:animate-bounce"
        >
          <FaInstagram size={24} />
         <i className="fa-brands fa-instagram"></i>
        </button>

        <button
          type="button"
          onClick={() => window.open(facebook, "_blank")}
          className="bg-blue-500   hover:bg-blue-900 hover:scale-110 px-4 py-2 rounded-lg  transition-all duration-300 hover:animate-bounce"
        >
          <FaFacebook size={24} />
          <i className="fa-brands fa-facebook"></i>
          
        </button>

        <button
          type="button"
          onClick={() => window.open(whatsapp, "_blank")}
          className="text-white-600 bg-green-500 hover:text-green-900 hover:scale-110 px-4 py-2 rounded-lg transition-all duration-300 hover:animate-bounce"
        >
          <FaWhatsapp size={24} />
        <i className="fa-brands fa-whatsapp"></i>
        </button>

      </div>
    </motion.section>
  );
}