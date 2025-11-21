"use client";
import { projects } from "@/app/projects/projectsData";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { FaGithub, FaExternalLinkAlt, FaStar } from "react-icons/fa";

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

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
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-24 bg-white dark:bg-slate-950 overflow-hidden"
    >
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-4 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-full border border-emerald-200 dark:border-emerald-800"
          >
            <span className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold tracking-wide uppercase">
              Portfolio
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            Featured{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              Projects
            </span>
          </h2>

          <div className="w-20 h-1 bg-emerald-600 dark:bg-emerald-400 mx-auto mb-6"></div>

          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Explore a curated selection of projects showcasing full-stack
            development, innovative solutions, and cutting-edge technologies
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                activeCategory === category
                  ? "bg-emerald-600 dark:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.slug}
                variants={cardVariants}
                layout
                className="group relative"
              >
                <div className="relative bg-white dark:bg-slate-900 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 dark:hover:border-emerald-400/30 h-full flex flex-col">
                  {/* Image Container */}
                  <div className="relative overflow-hidden h-56">
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-slate-900/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={500}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
                      {project.featured && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                          className="flex items-center gap-1 bg-amber-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg"
                        >
                          <FaStar className="text-xs" />
                          Featured
                        </motion.div>
                      )}
                      <div className="bg-emerald-600 dark:bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg ml-auto">
                        {project.category}
                      </div>
                    </div>

                    {/* Quick Links Overlay */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/95 dark:bg-slate-900/95 rounded-full hover:scale-110 transition-transform duration-200 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaGithub className="text-slate-900 dark:text-white text-xl" />
                      </a>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-emerald-600 rounded-full hover:scale-110 transition-transform duration-200 shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaExternalLinkAlt className="text-white text-lg" />
                      </a>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col grow">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300 line-clamp-1">
                      {project.title}
                    </h3>

                    <p className="text-slate-600 dark:text-slate-400 mb-5 line-clamp-2 leading-relaxed grow">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.technologies
                        .slice(0, 4)
                        .map((TechIcon, techIndex) => (
                          <div
                            key={techIndex}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 border border-slate-200 dark:border-slate-700"
                          >
                            <TechIcon className="text-emerald-600 dark:text-emerald-400 text-sm" />
                            <span className="text-slate-700 dark:text-slate-300">
                              {project.techNames[techIndex]}
                            </span>
                          </div>
                        ))}
                      {project.technologies.length > 4 && (
                        <div className="flex items-center px-3 py-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg text-xs font-medium">
                          <span className="text-slate-600 dark:text-slate-400">
                            +{project.technologies.length - 4}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Improvements / Lessons Preview */}
                    {project.improvements &&
                      project.improvements.length > 0 && (
                        <div className="mb-3 text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                          <strong>Lessons:</strong> {project.improvements[0]}
                          {project.improvements.length > 1 && (
                            <span className="ml-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                              +{project.improvements.length - 1} more
                            </span>
                          )}
                        </div>
                      )}

                    {/* CTA Button */}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group/btn relative inline-flex items-center justify-center px-6 py-3 bg-emerald-600 dark:bg-emerald-500 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:bg-emerald-700 dark:hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-[1.02]"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        View Details
                        <svg
                          className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
              No projects found
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Try selecting a different category
            </p>
          </motion.div>
        )}

        {/* View All Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <a
            href="https://github.com/mrshanshuvo"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:border-emerald-600 dark:hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-105"
          >
            <FaGithub className="text-2xl group-hover:rotate-12 transition-transform duration-300" />
            <span>View All Projects on GitHub</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
