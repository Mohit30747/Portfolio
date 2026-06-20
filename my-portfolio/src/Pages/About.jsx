import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

export default function About() {
return ( <section
   id="about"
   className="relative min-h-screen overflow-hidden px-6 py-24 text-white"
 >
{/* Background Glow */} <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-[180px] animate-pulse" />

  <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-[180px] animate-pulse" />

  <div className="relative z-10 max-w-7xl mx-auto">

    {/* Heading */}
    <motion.h1
      initial={{ opacity: 0, y: -80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="
      text-center
      text-5xl md:text-7xl
      font-black
      mb-16
      bg-gradient-to-r
      from-cyan-400
      via-purple-500
      to-pink-500
      bg-clip-text
      text-transparent
      "
    >
      ABOUT ME
    </motion.h1>

    {/* Stats Cards */}
    <div className="grid md:grid-cols-3 gap-8">

      {/* Projects */}
      <Tilt>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="
          group relative overflow-hidden
          rounded-3xl p-8
          bg-white/5 backdrop-blur-xl
          border border-white/10
          shadow-[0_0_40px_rgba(59,130,246,0.4)]
          hover:border-cyan-400
          transition-all duration-500
          "
        >
          <div
            className="
            absolute left-0 top-0 h-full w-1
            bg-white
            opacity-0
            group-hover:opacity-100
            transition-all duration-300
            "
          />

          <h2 className="text-6xl font-bold text-cyan-400">
            15+
          </h2>

          <p className="text-gray-300 mt-2">
            Projects
          </p>
        </motion.div>
      </Tilt>

      {/* Experience */}
      <Tilt>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="
          group relative overflow-hidden
          rounded-3xl p-8
          bg-white/5 backdrop-blur-xl
          border border-white/10
          shadow-[0_0_40px_rgba(168,85,247,0.4)]
          hover:border-purple-400
          transition-all duration-500
          "
        >
          <div
            className="
            absolute left-0 top-0 h-full w-1
            bg-white
            opacity-0
            group-hover:opacity-100
            transition-all duration-300
            "
          />

          <h2 className="text-6xl font-bold text-purple-400">
            2+
          </h2>

          <p className="text-gray-300 mt-2">
            Years Experience
          </p>
        </motion.div>
      </Tilt>

      {/* Passion */}
      <Tilt>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="
          group relative overflow-hidden
          rounded-3xl p-8
          bg-white/5 backdrop-blur-xl
          border border-white/10
          shadow-[0_0_40px_rgba(236,72,153,0.4)]
          hover:border-pink-400
          transition-all duration-500
          "
        >
          <div
            className="
            absolute left-0 top-0 h-full w-1
            bg-white
            opacity-0
            group-hover:opacity-100
            transition-all duration-300
            "
          />

          <h2 className="text-6xl font-bold text-pink-400">
            100%
          </h2>

          <p className="text-gray-300 mt-2">
            Passion
          </p>
        </motion.div>
      </Tilt>

    </div>

    {/* Main About Card */}
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.2}
      className="mt-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="
        rounded-[40px]
        p-10
        bg-white/5
        backdrop-blur-2xl
        border border-white/10
        shadow-[0_0_80px_rgba(59,130,246,0.2)]
        "
      >
        <h2 className="text-4xl font-bold mb-6 text-cyan-400">
          My Journey
        </h2>

        <p className="text-lg text-gray-300 leading-9">
          Started with HTML, CSS and JavaScript, then moved into
          React, Tailwind CSS, Node.js, Express.js and MongoDB.

          I love building modern full stack applications with
          beautiful UI, smooth animations and powerful backend
          functionality.
        </p>
      </motion.div>
    </Tilt>

  </div>
</section>

);
}
