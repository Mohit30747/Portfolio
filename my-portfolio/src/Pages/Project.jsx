import { motion } from "framer-motion";

const projects = [
  {
    title: "Portfolio and Website",
    description: "Modern personal portfolio with React, Tailwind, and animations.",
    tags: ["React", "Tailwind", "Framer Motion"],
    
    link: "#",
  },
  {
    title: "E-commerce UI",
    description: "Responsive product listing and checkout design with smooth interactions.",
    tags: ["React", "CSS", "UI"],
    link: "#",
  },
  {
    title: "Admin Dashboard",
    description: "Analytics dashboard with charts, cards, and filters.",
    tags: ["React", "Chart.js", "Responsive"],
    link: "#",
  },
];

export default function Project() {
  return (
    <motion.section
      id="project"
      initial={{ opacity:0, y:40 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, amount:0.2 }}
      transition={{ duration:0.65 }}
      className="min-h-screen text-white py-16 px-6 page-panel">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-blue-400">Projects</p>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">Featured Work</h2>
          <p className="text-gray-300 mt-3 max-w-2xl mx-auto">
            Some of the web apps I built recently. Click to view details and source.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <article key={project.title} className="bg-gray-800/80 border border-gray-700 rounded-2xl p-5 hover:-translate-y-1 transition page-card">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-gray-300 mt-2 text-sm">{project.description}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md border border-blue-500/30">
                    #{tag}
                  </span>
                ))}
              </div>
              <a href={project.link} className="inline-block mt-5 text-blue-300 hover:text-blue-400 text-sm font-medium">
                {/* View Project → */}
              </a>
            </article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}