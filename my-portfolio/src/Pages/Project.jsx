import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    title: "Portfolio Website",
    description:
      "Modern animated portfolio built with React, Tailwind CSS, Framer Motion and Node.js backend.",
    tags: ["React", "Tailwind", "MongoDB"],
    github: "https://github.com/Mohit30747",
    demo: "#",
  },
  {
    title: "Admin Dashboard",
    description:
      "Professional dashboard with charts, analytics, authentication and responsive design.",
    tags: ["React", "Chart.js", "Node.js"],
    github: "#",
    demo: "#",
  },
  {
    title: "E-Commerce Store",
    description:
      "Full responsive online store with cart, payment flow and product management.",
    tags: ["React", "Express", "MongoDB"],
    github: "#",
    demo: "#",
  },
];

export default function Project() {
  return (
    <section
      id="project"
      className="relative min-h-screen py-24 px-6 text-white overflow-hidden"
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
            className="text-6xl font-black bg-gradient-to-r
            from-cyan-400 via-purple-500 to-pink-500
            bg-clip-text text-transparent"
          >
            MY PROJECTS
          </h2>

          <p className="text-gray-400 mt-5 max-w-2xl mx-auto">
            Some of my best work built using modern technologies and
            beautiful user interfaces.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-8">

          {projects.map((project, index) => (
            <Tilt
              key={project.title}
              tiltMaxAngleX={12}
              tiltMaxAngleY={12}
              glareEnable={true}
              glareMaxOpacity={0.2}
            >
              <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.2,
                }}
                whileHover={{
                  y: -10,
                }}
                className="
                h-full
                rounded-[30px]
                p-8
                bg-white/5
                backdrop-blur-xl
                border border-white/10
                shadow-[0_0_40px_rgba(59,130,246,0.2)]
                "
              >
                <h3 className="text-3xl font-bold text-cyan-400">
                  {project.title}
                </h3>

                <p className="text-gray-300 mt-4 leading-7">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="
                      px-3 py-1
                      rounded-full
                      bg-cyan-500/10
                      border border-cyan-500/20
                      text-cyan-300
                      text-sm
                      "
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 mt-8">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="
                    flex items-center gap-2
                    px-4 py-2
                    rounded-xl
                    bg-white/10
                    hover:bg-white/20
                    transition
                    "
                  >
                    <FaGithub />
                    Code
                  </a>

                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="
                    flex items-center gap-2
                    px-4 py-2
                    rounded-xl
                    bg-cyan-500
                    text-black
                    font-semibold
                    hover:scale-105
                    transition
                    "
                  >
                    <FaExternalLinkAlt />
                    Live
                  </a>
                </div>
              </motion.div>
            </Tilt>
          ))}

        </div>
      </div>
    </section>
  );
}