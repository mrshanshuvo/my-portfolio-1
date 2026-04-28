"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { getIcon } from "@/lib/techIconMap";
import type { Project } from "@/types";

interface Props {
  project: Project;
}

export default function ProjectDetailClient({ project }: Props) {
  return (
    <section className="max-w-5xl mx-auto py-20 px-4">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 text-sm mb-8 transition-colors"
      >
        <FaArrowLeft className="text-xs" /> Back to Projects
      </Link>

      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{project.title}</h1>
      <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-6">{project.category}</p>

      <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-8 bg-slate-100 dark:bg-slate-800">
        <Image
          src={project.image || "/images/placeholder.png"}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 80vw"
          priority
        />
      </div>

      <p className="text-slate-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {project.techNames.map((name) => {
          const Icon = getIcon(name);
          return (
            <div
              key={name}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm text-slate-700 dark:text-slate-300"
            >
              <Icon className="text-emerald-600 dark:text-emerald-400" />
              <span>{name}</span>
            </div>
          );
        })}
      </div>

      {project.improvements && project.improvements.length > 0 && (
        <motion.div
          className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl mb-8 border border-slate-200 dark:border-slate-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">
            Challenges &amp; Lessons Learned
          </h2>
          <ul className="space-y-2">
            {project.improvements.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-slate-700 dark:text-slate-300"
              >
                <span className="text-emerald-500 mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      <div className="flex gap-4">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <FaGithub /> View Code
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <FaExternalLinkAlt /> Live Demo
          </a>
        )}
      </div>
    </section>
  );
}
