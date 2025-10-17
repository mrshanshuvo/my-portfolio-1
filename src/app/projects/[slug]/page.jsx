"use client";

import { projects } from "@/app/projects/projectsData";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ProjectPage({ params }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) return <p className="text-center mt-20">Project not found</p>;

  return (
    <section className="max-w-5xl mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold mb-6">{project.title}</h1>

      {/* Project Image */}
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-auto object-contain rounded-lg mb-6"
      />

      {/* Description */}
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {project.description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.technologies.map((TechIcon, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded"
          >
            <TechIcon className="text-blue-600" />
            <span className="text-gray-800 dark:text-gray-200">
              {project.techNames[i]}
            </span>
          </div>
        ))}
      </div>

      {/* Challenges / Improvements */}
      {project.improvements && project.improvements.length > 0 && (
        <motion.div
          className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6 shadow-inner"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Challenges & Lessons Learned
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
            {project.improvements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Links */}
      <div className="flex gap-4">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          <FaGithub /> Code
        </a>
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <FaExternalLinkAlt /> Live Demo
        </a>
      </div>
    </section>
  );
}
