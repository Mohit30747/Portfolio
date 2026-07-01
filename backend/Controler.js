// import Contact from "../models/contactModel.js";
// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// console.log("🔥 CONTROLLER HIT");

// dotenv.config();

// // 📩 Send Message + Save to DB
// export const sendMessage = async (req, res) => {
//   console.log("🔥 Controller hit hua");

//   try {
//     const { name, email, phone, address, message } = req.body;

//     // ✅ Validation
//     if (!name || !email || !message) {
//       return res.status(400).json({
//         success: false,
//         message: "All required fields missing",
//       });
//     }

//     ///time starp
//     const timestamp = new Date().toLocaleString("en-IN",{
//       timeZone: "Asia/Kolkata",
//       hour12: true,
//       dateStyle: "full",
//       timeStyle: "medium",
//     })

//     // ✅ Save to MongoDB
//     const savedData = await Contact.create({
//       name,
//       email,
//       phone,
//       address,
//       message,
//       // timestamp,
//     });

//     console.log("✅ Saved to MongoDB");

//     // ❌ Agar email config nahi hai to skip
//     if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
//       console.log("⚠️ Email config missing");
//       return res.status(200).json({
//         success: true,
//         message: "Saved to DB (email skipped)",
//         data: savedData,
//       });
//     }

//     // ✅ Email Transporter (BEST CONFIG)
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false,
//       auth: {
//         user: process.env.GMAIL_USER,
//         pass: process.env.GMAIL_PASS,
//       },
//     });

//     console.log("📧 Sending email...");

//     // ✅ Send Email
//     await transporter.sendMail({
//       from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
//       to: process.env.GMAIL_USER,
//       replyTo: email,
//       subject: `🚀 New Message from ${name}`,
//       html: `
//         <h2>New Contact Message</h2>
//         <p><b>Name:</b> ${name}</p>
//         <p><b>Email:</b> ${email}</p>
//         <p><b>Phone:</b> ${phone}</p>
//         <p><b>Address:</b> ${address}</p>
//         <p><b>Message:</b> ${message}</p>
//         <hr />
//         <p><b>Date & Time:</b> ${timestamp}</p>
//       `,
//     });

//     console.log("✅ Email sent successfully");

//     // ✅ Final Response
//     res.status(200).json({
//       success: true,
//       message: "Message saved + email sent",
//       data: savedData,
//     });

//   } catch (error) {
//     console.log("❌ FULL ERROR:", error);

//     res.status(500).json({
//       success: false,
//       message: "Error sending message",
//     });
//   }
// };