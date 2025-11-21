"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  FaCode,
  FaDatabase,
  FaCloud,
  FaRobot,
  FaGraduationCap,
  FaAward,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { SiTensorflow, SiDjango, SiReact, SiNodedotjs } from "react-icons/si";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    {
      icon: SiReact,
      name: "Frontend",
      tech: "React, Next.js, TypeScript",
      level: 90,
    },
    {
      icon: SiNodedotjs,
      name: "Backend",
      tech: "Node.js, Express, Django",
      level: 85,
    },
    {
      icon: FaDatabase,
      name: "Database",
      tech: "MongoDB, PostgreSQL, Firebase",
      level: 80,
    },
    { icon: FaCloud, name: "DevOps", tech: "AWS, Docker, Vercel", level: 75 },
    {
      icon: SiTensorflow,
      name: "ML/AI",
      tech: "TensorFlow, PyTorch, Scikit-learn",
      level: 70,
    },
    { icon: FaRobot, name: "Other", tech: "Python, Java, C++", level: 85 },
  ];

  const education = [
    {
      degree: "BSc in Computer Science & Engineering",
      institution: "Green University of Bangladesh",
      period: "2021 - 2024",
      details: "Specialized in Software Engineering & Machine Learning",
    },
  ];

  const stats = [
    { number: "20+", label: "Projects Completed" },
    { number: "2+", label: "Years Experience" },
    { number: "10+", label: "Technologies" },
    { number: "5", label: "Certifications" },
  ];

  const highlights = [
    "Building scalable full-stack applications",
    "Machine Learning & AI integration",
    "Clean code & best practices advocate",
    "Continuous learner & tech enthusiast",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 bg-linear-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-4 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-full border border-emerald-200 dark:border-emerald-800"
          >
            <span className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold tracking-wide uppercase">
              Get to Know Me
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            About{" "}
            <span className="text-emerald-600 dark:text-emerald-400">Me</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Passionate developer crafting digital experiences that make a
            difference
          </p>
        </motion.div>

        {/* Stats Cards - Top */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group"
            >
              <div className="text-center p-6 bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-400 transition-all duration-300 shadow-sm hover:shadow-xl">
                <div className="text-4xl font-bold bg-linear-to-r from-emerald-600 to-emerald-500 dark:from-emerald-400 dark:to-emerald-500 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Left Column - About & Education */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {/* Introduction Card */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
                  👋
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Hello! I'm Shuvo
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                I'm a passionate{" "}
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  Computer Science & Engineering
                </span>{" "}
                student at Green University of Bangladesh, specializing in
                full-stack development and machine learning.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                With over{" "}
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  2 years
                </span>{" "}
                of experience, I've mastered technologies like
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  {" "}
                  React, Node.js, Django, TensorFlow
                </span>
                , and more. I love transforming complex problems into simple,
                beautiful, and intuitive solutions.
              </p>
            </motion.div>

            {/* Highlights */}
            <motion.div
              variants={itemVariants}
              className="bg-linear-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-2xl p-8 border border-emerald-200 dark:border-emerald-800"
            >
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <FaCheckCircle className="text-emerald-600 dark:text-emerald-400" />
                What I Bring to the Table
              </h4>
              <div className="space-y-3">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                    }
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-2 h-2 bg-emerald-600 dark:bg-emerald-400 rounded-full mt-2 shrink-0"></div>
                    <span className="text-slate-700 dark:text-slate-300">
                      {highlight}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Education Card */}
            <motion.div variants={itemVariants}>
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center">
                      <FaGraduationCap className="text-emerald-600 dark:text-emerald-400 text-2xl" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                        Education
                      </h4>
                    </div>
                  </div>
                  <h5 className="font-semibold text-slate-900 dark:text-white mb-2">
                    {edu.degree}
                  </h5>
                  <p className="text-emerald-600 dark:text-emerald-400 mb-3 font-medium">
                    {edu.institution}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-3">
                    <FaCalendarAlt />
                    <span>{edu.period}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {edu.details}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Skills */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-shadow"
            >
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
                Technical Skills
              </h4>

              <div className="space-y-8">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    className="skill-item"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative">
                        <div className="w-14 h-14 bg-linear-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30 rounded-xl flex items-center justify-center border border-emerald-200 dark:border-emerald-700">
                          <skill.icon
                            className="text-emerald-600 dark:text-emerald-400 text-2xl"
                            aria-label={skill.name}
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold text-slate-900 dark:text-white">
                            {skill.name}
                          </span>
                          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                          {skill.tech}
                        </div>
                        <div
                          className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden"
                          role="progressbar"
                          aria-valuenow={skill.level}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            animate={
                              isInView
                                ? { width: `${skill.level}%` }
                                : { width: 0 }
                            }
                            transition={{
                              duration: 1.2,
                              delay: index * 0.15,
                              ease: "easeOut",
                            }}
                            className="bg-linear-to-r from-emerald-500 to-emerald-600 dark:from-emerald-400 dark:to-emerald-500 h-2.5 rounded-full shadow-lg shadow-emerald-500/50"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={itemVariants} className="mt-10">
                <a
                  href="#contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40 hover:scale-[1.02]"
                >
                  <FaAward className="text-xl" />
                  Let's Work Together
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Technologies Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <div className="text-center mb-8">
            <h4 className="text-xl font-semibold text-slate-900 dark:text-white">
              Technologies I Work With
            </h4>
          </div>
          <div className="overflow-hidden relative bg-white dark:bg-slate-900 rounded-2xl py-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <motion.div
              className="flex space-x-12 px-6"
              animate={{ x: [0, -1000] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
            >
              {[
                "React",
                "Next.js",
                "Node.js",
                "Express",
                "MongoDB",
                "Python",
                "Django",
                "TensorFlow",
                "Git",
                "Tailwind CSS",
                "TypeScript",
                "PostgreSQL",
                "AWS",
                "Docker",
              ].map((tech, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap"
                >
                  <FaCode className="text-emerald-600 dark:text-emerald-400" />
                  <span>{tech}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
