"use client";
import { FaBriefcase, FaGraduationCap, FaAward } from "react-icons/fa";
import { motion } from "framer-motion";

const experiences = [
  {
    title: "Frontend Web Developer",
    org: "ZenSoftLab",
    duration: "Sep 2025 - Present",
    details: [
      "Built full-stack web applications with React, Node.js, MongoDB.",
      "Implemented REST APIs & JWT authentication.",
      "Optimized frontend performance using Tailwind CSS & React hooks.",
    ],
    icon: FaBriefcase,
    color: "emerald",
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
    icon: FaGraduationCap,
    color: "blue",
  },
  {
    title: "Programming Hero Bootcamp",
    org: "Web Development Training",
    duration: "2023",
    details: [
      "Completed 45+ full-stack projects in React, Node.js, Django.",
      "Hands-on experience with MERN stack & Firebase integration.",
    ],
    icon: FaAward,
    color: "amber",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Experience &{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              Education
            </span>
          </h2>
          <div className="w-20 h-1 bg-emerald-600 dark:bg-emerald-400 mx-auto mb-4"></div>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            My professional, academic, and training journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 dark:hover:border-emerald-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5"
            >
              {/* Icon */}
              <div
                className={`inline-flex p-3 rounded-lg mb-4 ${
                  exp.color === "emerald"
                    ? "bg-emerald-50 dark:bg-emerald-900/20"
                    : exp.color === "blue"
                    ? "bg-blue-50 dark:bg-blue-900/20"
                    : "bg-amber-50 dark:bg-amber-900/20"
                }`}
              >
                <exp.icon
                  className={`text-2xl ${
                    exp.color === "emerald"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : exp.color === "blue"
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-amber-600 dark:text-amber-400"
                  }`}
                />
              </div>

              {/* Content */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {exp.title}
                </h3>
                <p className="text-emerald-600 dark:text-emerald-400 font-medium text-sm mb-1">
                  {exp.org}
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  {exp.duration}
                </p>
              </div>

              {/* Details */}
              <ul className="space-y-2">
                {exp.details.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-slate-600 dark:text-slate-400 text-sm"
                  >
                    <span className="text-emerald-600 dark:text-emerald-400 mt-1">
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
