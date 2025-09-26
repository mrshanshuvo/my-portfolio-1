"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
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
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="about" ref={ref} className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About <span className="text-blue-600">Me</span>
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Passionate developer crafting digital experiences that make a
            difference
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Introduction */}
            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Hello! I'm Shuvo 👋
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                I'm a passionate{" "}
                <span className="text-blue-600 font-semibold">
                  Computer Science & Engineering
                </span>{" "}
                student at Green University of Bangladesh, specializing in
                full-stack development and machine learning.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                With over{" "}
                <span className="text-blue-600 font-semibold">2 years</span> of
                experience, I've mastered technologies like
                <span className="text-blue-600 font-semibold">
                  {" "}
                  React, Node.js, Django, TensorFlow
                </span>
                , and more. I love transforming complex problems into simple,
                beautiful, and intuitive solutions.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge with
                the developer community.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
                >
                  <div className="text-2xl font-bold text-blue-600">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Education */}
            <motion.div variants={itemVariants}>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FaGraduationCap className="text-blue-600" />
                Education
              </h4>
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
                >
                  <h5 className="font-semibold text-gray-900 dark:text-white">
                    {edu.degree}
                  </h5>
                  <p className="text-blue-600 mb-2">{edu.institution}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <FaCalendarAlt />
                    <span>{edu.period}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
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
            <motion.div variants={itemVariants} className="mb-8">
              <h4 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center lg:text-left">
                Technical Skills
              </h4>

              {/* Skills Grid */}
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    className="skill-item"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-3">
                        <skill.icon className="text-blue-600 text-xl" />
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {skill.name}
                          </span>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {skill.tech}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={
                          isInView ? { width: `${skill.level}%` } : { width: 0 }
                        }
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              variants={itemVariants}
              className="text-center lg:text-left"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
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
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
              Technologies I Work With
            </h4>
          </div>
          <div className="flex overflow-hidden space-x-12 py-4">
            <motion.div
              animate={{
                x: [0, -1000],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
              className="flex space-x-12"
            >
              {[
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "Express",
                "MongoDB",
                "PostgreSQL",
                "Python",
                "Django",
                "TensorFlow",
                "Docker",
                "AWS",
                "Git",
                "Tailwind CSS",
              ].map((tech, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-gray-600 dark:text-gray-300 font-medium"
                >
                  <FaCode className="text-blue-600" />
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
