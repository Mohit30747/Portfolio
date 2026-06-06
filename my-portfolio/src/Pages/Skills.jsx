import { motion } from "framer-motion";

const skillCards = [
  { name: "HTML", level: 95 },
  { name: "CSS", level: 90 },
  { name: "JavaScript", level: 88 },
  { name: "React", level: 92 },
  { name: "Tailwind", level: 85 },
  { name: "Git", level: 80 },
];

export default function Skills() {

  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="min-h-screen text-white px-6 py-16 page-panel"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-400">
            What I Do
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">
            My Skills
          </h2>
        </div>

        <div className="grid gap-4">
          {skillCards.map((skill, index) => (
            
            // 🔥 LINE BY LINE ANIMATION
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.2, // 👈 line by line delay
              }}
              className="bg-gray-800/70 border border-gray-700 rounded-xl p-4 page-card"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold">{skill.name}</p>
                <p className="text-sm text-gray-300">
                  {skill.level}%
                </p>
              </div>

              {/* 🔥 PROGRESS BAR ANIMATION */}
              <div className="h-2 w-full rounded-full bg-gray-700 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-linear-to-r from-blue-500 to-cyan-400"
                  initial={{ width: "0%" }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.5,
                    delay: index * 0.3, // 👈 bar bhi delay se fill hogi
                    ease: "easeOut",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}