import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

const skills = [
  { name: "HTML", level: 95, color: "from-orange-500 to-yellow-400" },
  { name: "CSS", level: 90, color: "from-blue-500 to-cyan-400" },
  { name: "JavaScript", level: 88, color: "from-yellow-400 to-orange-500" },
  { name: "React", level: 92, color: "from-cyan-400 to-blue-500" },
  { name: "Tailwind CSS", level: 90, color: "from-sky-400 to-cyan-500" },
  { name: "Node.js", level: 85, color: "from-green-400 to-green-600" },
  { name: "MongoDB", level: 80, color: "from-green-500 to-emerald-400" },
  { name: "Git & GitHub", level: 85, color: "from-red-500 to-orange-500" },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative min-h-screen py-24 px-6 overflow-hidden text-white"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-[180px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-[180px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2
            className="
            text-6xl font-black
            bg-gradient-to-r
            from-cyan-400
            via-purple-500
            to-pink-500
            bg-clip-text
            text-transparent
          "
          >
            MY SKILLS
          </h2>

          <p className="text-gray-400 mt-5">
            Technologies I use to build modern web applications.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">

          {skills.map((skill, index) => (
            <Tilt
              key={skill.name}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              glareEnable={true}
              glareMaxOpacity={0.15}
            >
              <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className="
                rounded-[30px]
                p-6
                bg-white/5
                backdrop-blur-xl
                border border-white/10
                shadow-[0_0_30px_rgba(59,130,246,0.15)]
                "
              >
                <div className="flex justify-between mb-4">
                  <h3 className="text-xl font-bold">
                    {skill.name}
                  </h3>

                  <span className="text-cyan-300 font-semibold">
                    {skill.level}%
                  </span>
                </div>

                {/* Progress */}
                <div className="h-4 bg-white/10 rounded-full overflow-hidden">

                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{
                      width: `${skill.level}%`,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.8,
                      delay: index * 0.15,
                    }}
                    className={`h-full bg-gradient-to-r ${skill.color}`}
                  />

                </div>
              </motion.div>
            </Tilt>
          ))}

        </div>

        {/* Bottom Card */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="
          mt-16
          rounded-[35px]
          p-10
          text-center
          bg-white/5
          backdrop-blur-xl
          border border-white/10
          shadow-[0_0_40px_rgba(59,130,246,0.15)]
          "
        >
          <h3 className="text-3xl font-bold mb-4 text-cyan-400">
            Always Learning 🚀
          </h3>

          <p className="text-gray-300 max-w-3xl mx-auto">
            Currently focusing on Full Stack Development,
            Backend Architecture, APIs, MongoDB, Express,
            Node.js and advanced React ecosystem.
          </p>
        </motion.div>

      </div>
    </section>
  );
}