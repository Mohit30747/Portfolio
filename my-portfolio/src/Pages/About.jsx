import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden px-6 py-24 text-white"
    >
      {/* Animated Background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[180px] animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-[180px] animate-pulse" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-7xl font-black mb-16
          bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500
          bg-clip-text text-transparent"
        >
          ABOUT ME
        </motion.h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-8">

          <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-3xl p-8 bg-white/5 backdrop-blur-xl
              border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.4)]"
            >
              <h2 className="text-6xl font-bold text-cyan-400">15+</h2>
              <p className="text-gray-300 mt-2">Projects</p>
            </motion.div>
          </Tilt>

          <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-3xl p-8 bg-white/5 backdrop-blur-xl
              border border-white/10 shadow-[0_0_40px_rgba(168,85,247,0.4)]"
            >
              <h2 className="text-6xl font-bold text-purple-400">
                2+
              </h2>
              <p className="text-gray-300 mt-2">Years Experience</p>
            </motion.div>
          </Tilt>

          <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-3xl p-8 bg-white/5 backdrop-blur-xl
              border border-white/10 shadow-[0_0_40px_rgba(236,72,153,0.4)]"
            >
              <h2 className="text-6xl font-bold text-pink-400">100%</h2>
              <p className="text-gray-300 mt-2">Passion</p>
            </motion.div>
          </Tilt>

        </div>

        {/* Main 3D Card */}
        <Tilt
          tiltMaxAngleX={12}
          tiltMaxAngleY={12}
          glareEnable={true}
          glareMaxOpacity={0.3}
          className="mt-14"
        >
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="rounded-[40px] p-12 bg-white/5
            backdrop-blur-2xl border border-white/10
            shadow-[0_0_80px_rgba(59,130,246,0.2)]"
          >
            <h2 className="text-4xl font-bold mb-8 text-cyan-400">
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