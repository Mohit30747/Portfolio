import { motion } from "framer-motion";
import { FaLinkedin,FaWhatsapp,FaInstagram,FaGithub } from "react-icons/fa";
import About from "./About";
import Skills from "./Skills";
import Contact from "./Contact";
import Project from "./Project";
import bgVideo from "../assets/video.mp4";
import profileImage from "../assets/image1.jpg";

export default function Home() {
  const instagram = "https://www.instagram.com/pandat_.mohit.47?igsh=aDR3d29jZmY1bWdu";
  const github = "https://github.com/Mohit30747";
  const linkedin = "https://www.linkedin.com/in/mohit-sharma-127a87359";
  const whatsapp = "https://wa.me/919306429693";

  return (
    
    <div>

      {/* HERO SECTION */}
      <section id="home" className="relative h-auto overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={bgVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 h-full flex items-center justify-center px-6 md:px-12">
          <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <motion.p
                initial={{ opacity:0, y:20 }}
                animate={{ opacity:1, y:0 }}
                transition={{ duration:0.5 }}
                className="animate___animated animate-pulse animate_infinite  text-lg font-bold uppercase tracking-[0.35em] text-blue-300 mb-4"
              >
                Full Stack Developer
              </motion.p>

              <motion.h1
                initial={{ opacity:0, y:20 }}
                animate={{ opacity:1, y:0 }}
                transition={{ duration:0.6 }}
                className="text-2xl md:text-4xl lg:text-6xl font-bold leading-tight"
              >
                Hi, I'm <span className="animate-pulse text-blue-400">Mohit Sharma</span>,  
                crafting modern web experiences.
              </motion.h1>

              <motion.p
                initial={{ opacity:0, y:60 }}
                animate={{ opacity:1, y:0 }}
                transition={{ duration:0.7, delay:0.1 }}
                className="animate-pulse mt-4 text-gray-300 max-w-xl"
              >
                I build fast, responsive, and animated web apps with React, Tailwind and modern UI design principles.
              </motion.p>
              <div className="mt-10 flex flex-wrap gap-3 items-center">
                <a
                  href="#contact"
                  className="relative group px-8 py-4 bg-blue-500/70 rounded-full font-bold text-lg overflow-hidden  transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg shadow-blue-500/30"
                >
                  {/* 🔥 Animated Background */}
                  <span className="absolute inset-0 bg-blue-600 scale-0 group-hover:scale-100 transition-transform duration-500 origin-bottom-left rounded-full"></span>

                  {/* ✨ Glow Effect */}
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-blue-400 blur-xl"></span>

                  {/* 🔥 Text */}
                  <span className="relative z-10 text-white tracking-wide flex items-center gap-2">💬 Let&apos;s Talk</span>
                </a>

                <a
                  href="#project"
                  className="btn-glow inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-blue-400 text-blue-100 font-bold text-lg bg-white/5 backdrop-blur hover:bg-blue-500/15 shadow-lg"
                >
                  🚀 View Projects
                </a>

                <a
                  href="#about"
                  className="btn-glow inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-cyan-400 text-cyan-100 font-bold text-lg bg-white/5 backdrop-blur hover:bg-cyan-500/15 shadow-lg"
                >
                  👨‍💻 About Me
                </a>
              </div>

              {/* media wala icon */}
              <div className="mt-8 flex flex-wrap gap-3 items-center">
                <button
                  type="button"
                  onClick={() => window.open(linkedin, "_blank")}
                  className="btn-glow inline-flex items-center justify-center gap-2 rounded-full border-2 border-blue-500/60 bg-blue-500/15 px-5 py-4 text-white font-semibold hover:bg-blue-600/25 shadow-lg transition-all"
                  title="LinkedIn"
                >
                  <FaLinkedin size={22} />
                  <span className="hidden sm:inline text-sm">LinkedIn</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.open(whatsapp, "_blank")}
                  className="btn-glow inline-flex items-center justify-center gap-2 rounded-full border-2 border-green-500/60 bg-green-500/15 px-5 py-4 text-white font-semibold hover:bg-green-600/25 shadow-lg transition-all"
                  title="WhatsApp"
                >
                  <FaWhatsapp size={22} />
                  <span className="hidden sm:inline text-sm">WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.open(instagram, "_blank")}
                  className="btn-glow inline-flex items-center justify-center gap-2 rounded-full border-2 border-pink-500/60 bg-pink-500/15 px-5 py-4 text-white font-semibold hover:bg-pink-600/25 shadow-lg transition-all"
                  title="Instagram"
                >
                  <FaInstagram size={22} />
                  <span className="hidden sm:inline text-sm">Instagram</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.open(github, "_blank")}
                  className="btn-glow inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/60 bg-white/15 px-5 py-4 text-white font-semibold hover:bg-white/25 shadow-lg transition-all"
                  title="GitHub"
                >
                  <FaGithub size={22} />
                  <span className="hidden sm:inline text-sm">GitHub</span>
                </button>
              </div>

              <div className="mt-10 grid grid-cols-2 hover:underline transition-all duration-300 gap-3 max-w-md text-center text-white">
                <div className="bg-white/10 border  border-white/20 rounded-xl p-3">
                  <p className="text-2xl font-semibold">10+</p>
                  <p className="text-sm text-gray-300">Projects</p>
                </div>
                <div className="bg-white/10 border overflow-hidden border-white/20 rounded-xl p-3">
                  <p className="text-2xl font-semibold">1+</p>
                  <p className="text-sm text-gray-300">Years Experience</p>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity:0, scale:0.95 }}
              animate={{ opacity:1, scale:1 }}
              transition={{ duration:0.6, delay:0.2 }}
              className="flex justify-center">
                
              <div className="bg-linear-to-br from-blue-500/30 via-purple-500/20 to-cyan-500/20 rounded-full  p-1 shadow-2xl h-full flex flex-wrap backdrop-blur ">
                <div className="absolute inset-0 rounded-full animate-spin-slow bg-linear-to-r from-blue-500 via-purple-500 to-cyan-500 text-red-700 blur-md"></div>
                 <div className="absolute inset-2 rounded-full bg-black"></div>
                <img src={profileImage} loading="lazy" alt="Mohit Sharma" className="w-64 h-64 hover:scale-110 transition-all duration-500  md:w-80 md:h-80 border border-white/30 rounded-full object-cover relative z-10" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ABOUT */}
      <About />


      {/* PROJECT SECTION WITH VIDEO + SMALL CARDS */}
      <Project />

      {/* SKILLS */}
      <Skills />

      {/* CONTACT */}
      <Contact />

    </div>
  );
}