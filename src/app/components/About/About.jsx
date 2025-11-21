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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="about" ref={ref} className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            About{" "}
            <span className="text-emerald-600 dark:text-emerald-400">Me</span>
          </h2>
          <div className="w-20 h-1 bg-emerald-600 dark:bg-emerald-400 mx-auto mb-4"></div>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Passionate developer crafting digital experiences that make a
            difference
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Introduction */}
            <motion.div variants={itemVariants} className="mb-10">
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                Hello! I'm Shuvo 👋
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                I'm a passionate{" "}
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  Computer Science & Engineering
                </span>{" "}
                student at Green University of Bangladesh, specializing in
                full-stack development and machine learning.
              </p>
              <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
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

            {/* Personal Journey */}
            <motion.div variants={itemVariants} className="mb-10">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                My Journey
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                I started my programming journey in high school, experimenting
                with Python and building small apps for fun. Over time, I
                discovered a passion for full-stack development and machine
                learning, which led me to work on projects like MCMS, ProFast,
                and WhereIsIt.
              </p>
              <p className="text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                I enjoy creating intuitive web applications that solve real
                problems and learning new technologies that push my limits.
                Every project is a chance to grow and challenge myself.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Outside coding, I love reading tech blogs, exploring AI
                innovations, playing badminton, and traveling to discover new
                cultures.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 mb-10"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 dark:hover:border-emerald-400/30 transition-colors"
                >
                  <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Education */}
            <motion.div variants={itemVariants}>
              <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <FaGraduationCap className="text-emerald-600 dark:text-emerald-400" />
                Education
              </h4>
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800"
                >
                  <h5 className="font-semibold text-slate-900 dark:text-white mb-1">
                    {edu.degree}
                  </h5>
                  <p className="text-emerald-600 dark:text-emerald-400 mb-2 font-medium">
                    {edu.institution}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
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
            <motion.div variants={itemVariants} className="mb-10">
              <h4 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
                Technical Skills
              </h4>

              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    className="skill-item"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                          <skill.icon
                            className="text-emerald-600 dark:text-emerald-400 text-xl"
                            aria-label={skill.name}
                          />
                        </div>
                        <div>
                          <span className="font-medium text-slate-900 dark:text-white block">
                            {skill.name}
                          </span>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {skill.tech}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                        {skill.level}%
                      </span>
                    </div>

                    <div
                      className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden"
                      role="progressbar"
                      aria-valuenow={skill.level}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={
                          isInView ? { width: `${skill.level}%` } : { width: 0 }
                        }
                        transition={{
                          duration: 1,
                          delay: index * 0.1,
                          ease: "easeOut",
                        }}
                        className="bg-linear-to-r from-emerald-500 to-emerald-600 dark:from-emerald-400 dark:to-emerald-500 h-2 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="text-center lg:text-left"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 dark:bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors duration-200 shadow-lg shadow-emerald-600/20"
              >
                <FaAward />
                Let's Work Together
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Technologies Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-20"
        >
          <div className="text-center mb-8">
            <h4 className="text-xl font-semibold text-slate-900 dark:text-white">
              Technologies I Work With
            </h4>
          </div>
          <div className="overflow-hidden relative bg-slate-50 dark:bg-slate-900 rounded-xl py-6 border border-slate-200 dark:border-slate-800">
            <motion.div
              className="flex space-x-12 px-6"
              animate={{ x: [0, -1000] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
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
              ].map((tech, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium whitespace-nowrap"
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
