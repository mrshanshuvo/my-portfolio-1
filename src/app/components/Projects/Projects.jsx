"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import React, { useRef } from "react";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaReact,
  FaNodeJs,
  FaPython,
  FaDatabase,
  FaMobileAlt,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiMongodb,
  SiTensorflow,
  SiDjango,
  SiTailwindcss,
  SiExpress,
  SiDocker,
} from "react-icons/si";

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const projects = [
    {
      title: "Medical Camp Management System (MCMS)",
      description:
        "A comprehensive platform for organizing and managing medical camps with patient registration, doctor scheduling, and real-time analytics. Reduced administrative workload by 60% and improved patient flow management.",
      image: "/images/mcms.jpg", // Replace with actual images
      technologies: [FaReact, SiNextdotjs, FaNodeJs, SiMongodb, SiTailwindcss],
      techNames: ["React", "Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
      github: "https://github.com/yourusername/mcms",
      live: "https://mcms-demo.vercel.app",
      featured: true,
      category: "Full Stack",
    },
    {
      title: "ProFast - Parcel Delivery Service",
      description:
        "Modern logistics platform enabling real-time parcel tracking, automated dispatch, and route optimization. Handled 10,000+ deliveries with 99.8% accuracy rate.",
      image: "/images/profast.jpg",
      technologies: [SiDjango, FaPython, FaDatabase, SiDocker],
      techNames: ["Django", "Python", "PostgreSQL", "Docker"],
      github: "https://github.com/yourusername/profast",
      live: "https://profast-delivery.com",
      featured: true,
      category: "Backend",
    },
    {
      title: "WhereIsIt - Lost & Found Platform",
      description:
        "AI-powered platform using computer vision to match lost items with found reports. Achieved 85% matching accuracy using TensorFlow image recognition.",
      image: "/images/whereisit.jpg",
      technologies: [SiTensorflow, FaPython, FaReact, FaMobileAlt],
      techNames: ["TensorFlow", "Python", "React Native", "Firebase"],
      github: "https://github.com/yourusername/whereisit",
      live: "https://whereisit-app.com",
      featured: true,
      category: "ML/AI",
    },
    {
      title: "E-Commerce Analytics Dashboard",
      description:
        "Real-time analytics dashboard for e-commerce businesses with predictive sales forecasting and customer behavior insights.",
      image: "/images/dashboard.jpg",
      technologies: [SiNextdotjs, SiExpress, FaDatabase, FaPython],
      techNames: ["Next.js", "Express.js", "MySQL", "Python"],
      github: "https://github.com/yourusername/ecommerce-dashboard",
      live: "https://dashboard-demo.vercel.app",
      featured: false,
      category: "Full Stack",
    },
    {
      title: "TaskFlow - Project Management Tool",
      description:
        "Collaborative project management tool with Kanban boards, time tracking, and team collaboration features.",
      image: "/images/taskflow.jpg",
      technologies: [FaReact, SiExpress, FaDatabase, SiDocker],
      techNames: ["React", "Express.js", "MongoDB", "Docker"],
      github: "https://github.com/yourusername/taskflow",
      live: "https://taskflow-app.com",
      featured: false,
      category: "Full Stack",
    },
    {
      title: "HealthTrack - Fitness App",
      description:
        "Mobile fitness application with workout planning, progress tracking, and AI-powered personal trainer.",
      image: "/images/healthtrack.jpg",
      technologies: [FaMobileAlt, FaReact, FaNodeJs, SiTensorflow],
      techNames: ["React Native", "Node.js", "TensorFlow", "Firebase"],
      github: "https://github.com/yourusername/healthtrack",
      live: "https://healthtrack-app.com",
      featured: false,
      category: "Mobile",
    },
  ];

  const categories = ["All", "Full Stack", "Backend", "ML/AI", "Mobile"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="projects"
      ref={ref}
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured <span className="text-blue-600">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Here are some of my recent projects that showcase my skills and
            experience in full-stack development
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                activeCategory === category
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden h-48 bg-gradient-to-br from-blue-500 to-purple-600">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center text-white text-6xl font-bold">
                  {project.title.charAt(0)}
                </div>
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                )}
                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {project.category}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((TechIcon, techIndex) => (
                    <div
                      key={techIndex}
                      className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-xs"
                    >
                      <TechIcon className="text-blue-600" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {project.techNames[techIndex]}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors duration-200"
                  >
                    <FaGithub />
                    <span className="text-sm">Code</span>
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <FaExternalLinkAlt className="text-xs" />
                    <span className="text-sm">Live Demo</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200"
          >
            <FaGithub />
            View All Projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function useState(initialValue) {
  const [state, setState] = React.useState(initialValue);
  return [state, setState];
}
