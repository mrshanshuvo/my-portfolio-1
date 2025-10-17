"use client";
import { FaBriefcase, FaGraduationCap, FaAward } from "react-icons/fa";
import { motion } from "framer-motion";

const experiences = [
  {
    title: "Full-Stack Web Developer",
    org: "ZenSoftLab",
    duration: "Jan 2024 - Present",
    details: [
      "Built full-stack web applications with React, Node.js, MongoDB.",
      "Implemented REST APIs & JWT authentication.",
      "Optimized frontend performance using Tailwind CSS & React hooks.",
    ],
    icon: <FaBriefcase className="text-blue-600 text-2xl" />,
  },
  {
    title: "B.Sc. in CSE",
    org: "Green University of Bangladesh",
    duration: "2022 - 2026 (Expected)",
    details: [
      "Maintained CGPA 3.76/4.00",
      "Completed multiple web development & ML projects.",
      "Active in programming clubs and hackathons.",
    ],
    icon: <FaGraduationCap className="text-purple-600 text-2xl" />,
  },
  {
    title: "Programming Hero Bootcamp",
    org: "Web Development Training",
    duration: "2023",
    details: [
      "Completed 45+ full-stack projects in React, Node.js, Django.",
      "Hands-on experience with MERN stack & Firebase integration.",
    ],
    icon: <FaAward className="text-yellow-500 text-2xl" />,
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Experience & Education
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            My professional, academic, and training journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                {exp.icon}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {exp.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-300 text-sm">
                    {exp.org} • {exp.duration}
                  </p>
                </div>
              </div>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                {exp.details.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
