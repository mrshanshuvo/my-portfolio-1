"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt, FaStar } from "react-icons/fa";
import type { Project } from "@/types";
import { getIcon } from "@/lib/techIconMap";

interface Props {
  projects: Project[];
}

export default function ProjectsClient({ projects }: Props) {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Featured{" "}
            <span className="text-emerald-600 dark:text-emerald-400">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-emerald-600 dark:bg-emerald-400 mx-auto mb-4" />
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A selection of projects that showcase my skills and passion for building
          </p>
        </motion.div>

        {/* Featured grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featured.map((project, i) => (
            <ProjectCard key={project._id ?? project.slug} project={project} index={i} />
          ))}
        </div>

        {/* Other projects */}
        {others.length > 0 && (
          <>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-slate-900 dark:text-white mb-6"
            >
              Other Projects
            </motion.h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {others.map((project, i) => (
                <ProjectCard key={project._id ?? project.slug} project={project} index={i} />
              ))}
            </div>
          </>
        )}

        {projects.length === 0 && (
          <p className="text-center text-slate-400 py-20">No projects yet.</p>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 dark:hover:border-emerald-400/30 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-emerald-500/5 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={project.image || "/images/placeholder.png"}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {project.featured && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
            <FaStar className="text-xs" /> Featured
          </div>
        )}
        <div className="absolute top-3 left-3 px-2.5 py-1 bg-slate-900/80 text-slate-300 text-xs rounded-full backdrop-blur-sm">
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 line-clamp-1">
          {project.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techNames.slice(0, 5).map((name) => {
            const Icon = getIcon(name);
            return (
              <span
                key={name}
                className="flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md text-xs"
                title={name}
              >
                <Icon className="text-emerald-600 dark:text-emerald-400" />
                {name}
              </span>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-auto">
          <Link
            href={`/projects/${project.slug}`}
            className="flex-1 text-center px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            View Details
          </Link>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              title="GitHub"
            >
              <FaGithub />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors"
              title="Live Demo"
            >
              <FaExternalLinkAlt />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
