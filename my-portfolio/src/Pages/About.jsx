import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      id="about"
      initial={{ opacity:0, y:40 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, amount:0.2 }}
      transition={{ duration:0.7 }}
      className="min-h-screen pt-28 pb-20 text-white px-6 page-panel">
      <div className="max-w-5xl mx-auto text-center">

        {/* HEADING */}

        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold mb-6"
        >
          About
        </motion.h1>

        {/* TEXT */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          I'm Mohit, a passionate fullstack developer who loves building modern,
          responsive and animated web applications using React and Tailwind CSS.
        </motion.p>

        {/* CARDS */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">

          <div className="bg-gray-800 p-6 rounded-xl hover:scale-105 transition page-card">
            <h2 className="text-blue-500 text-2xl font-bold">10+</h2>
            <p className="text-gray-400 text-sm">Projects</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl hover:scale-105 transition page-card">
            <h2 className="text-blue-500 text-2xl font-bold">1+</h2>
            <p className="text-gray-400 text-sm">Experience</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl hover:scale-105 transition page-card">
            <h2 className="text-blue-500 text-2xl font-bold">100%</h2>
            <p className="text-gray-400 text-sm">Passion</p>
          </div>

        </div>

      </div>
    </motion.section>
  );
}