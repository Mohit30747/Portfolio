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
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[220px] rounded-full animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 blur-[220px] rounded-full animate-pulse" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2
            className="
            text-5xl md:text-7xl
            font-black

            bg-gradient-to-r
            from-cyan-400
            via-purple-500
            to-pink-500

            bg-clip-text
            text-transparent
            "
          >
            MY PROJECTS
          </h2>

          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Some of my best work built using modern technologies,
            beautiful user interfaces and full stack development.
          </p>
        </motion.div>

        {/* Project Cards */}
        <div className="grid lg:grid-cols-3 gap-8">

          {projects.map((project, index) => (
            <Tilt
              key={project.title}
              tiltMaxAngleX={12}
              tiltMaxAngleY={12}
              glareEnable={true}
              glareMaxOpacity={0.25}
              scale={1.02}
            >
              <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.2,
                }}
                whileHover={{
                  y: -15,
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.96,
                  rotateX: 5,
                  rotateY: -5,
                }}
                className="
                group
                relative
                overflow-hidden

                h-full

                rounded-[32px]
                p-8

                bg-white/5
                backdrop-blur-2xl

                border border-white/10

                shadow-[0_0_40px_rgba(59,130,246,0.2)]

                hover:border-cyan-400/60
                active:border-cyan-400

                hover:shadow-[0_0_80px_rgba(34,211,238,0.4)]
                active:shadow-[0_0_100px_rgba(34,211,238,0.8)]

                transition-all
                duration-500
                "
              >
                {/* White Side Line */}
                <div
                  className="
                  absolute
                  left-0
                  top-0
                  h-full
                  w-1

                  bg-white

                  opacity-0
                  group-hover:opacity-100
                  group-active:opacity-100

                  transition-all
                  duration-500
                  "
                />

                {/* Glow Layer */}
                <div
                  className="
                  absolute
                  inset-0

                  bg-gradient-to-br
                  from-cyan-500/5
                  via-transparent
                  to-purple-500/5

                  opacity-0
                  group-hover:opacity-100

                  transition-all
                  duration-500
                  "
                />

                {/* Content */}
                <div className="relative z-10">

                  <h3
                    className="
                    text-3xl
                    font-black

                    bg-gradient-to-r
                    from-cyan-400
                    to-purple-400

                    bg-clip-text
                    text-transparent
                    "
                  >
                    {project.title}
                  </h3>

                  <p className="text-gray-300 mt-4 leading-7">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="
                        px-3 py-1

                        rounded-full

                        bg-cyan-500/10
                        border border-cyan-400/30

                        text-cyan-300
                        text-sm

                        hover:bg-cyan-500/20
                        hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]

                        transition-all
                        duration-300
                        "
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 mt-8">

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="
                      flex items-center gap-2

                      px-5 py-3
                      rounded-xl

                      bg-white/10
                      border border-white/10

                      hover:bg-white/20
                      hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]

                      active:scale-95

                      transition-all
                      duration-300
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

                      px-5 py-3
                      rounded-xl

                      bg-cyan-500
                      text-black
                      font-bold

                      hover:scale-105
                      hover:shadow-[0_0_30px_rgba(34,211,238,0.8)]

                      active:scale-95

                      transition-all
                      duration-300
                      "
                    >
                      <FaExternalLinkAlt />
                      Live
                    </a>

                  </div>

                </div>
              </motion.div>
            </Tilt>
          ))}

        </div>
      </div>
    </section>
  );
}