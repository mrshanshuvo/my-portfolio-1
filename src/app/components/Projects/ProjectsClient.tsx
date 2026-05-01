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
          <h2 className="font-display text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-500 to-blue-500">
              Projects
            </span>
          </h2>
          <div className="w-20 h-1 bg-emerald-600 dark:bg-emerald-400 mx-auto mb-4" />
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A selection of projects that showcase my skills and passion for
            building
          </p>
        </motion.div>

        {/* Featured grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featured.map((project, i) => (
            <ProjectCard
              key={project._id ?? project.slug}
              project={project}
              index={i}
            />
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
                <ProjectCard
                  key={project._id ?? project.slug}
                  project={project}
                  index={i}
                />
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

import { useMotionValue, useTransform, useSpring } from "framer-motion";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ perspective: 1000 }}
      className="group relative"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-[2rem] border border-slate-200/50 dark:border-white/10 transition-colors duration-300 overflow-hidden flex flex-col h-full shadow-xl hover:shadow-2xl hover:border-emerald-500/50 dark:hover:border-emerald-500/50"
      >
        {/* Image */}
        <div
          className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-800"
          style={{ transform: "translateZ(30px)" }}
        >
          <Image
            src={project.image || "/images/placeholder.png"}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {project.featured && (
            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/90 text-white text-xs font-bold tracking-widest uppercase rounded-full backdrop-blur-sm shadow-lg">
              <FaStar className="text-xs" /> Featured
            </div>
          )}
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-slate-900/80 text-white font-bold text-xs rounded-full backdrop-blur-sm tracking-widest uppercase border border-white/10 shadow-lg">
            {project.category}
          </div>
        </div>

        {/* Content */}
        <div
          className="p-6 flex flex-col flex-1"
          style={{ transform: "translateZ(40px)" }}
        >
          <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-1 group-hover:text-emerald-500 transition-colors">
            {project.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2 flex-1 font-medium">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techNames.slice(0, 5).map((name) => {
              const Icon = getIcon(name);
              return (
                <span
                  key={name}
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold shadow-sm"
                  title={name}
                >
                  <Icon className="text-emerald-500" />
                  {name}
                </span>
              );
            })}
          </div>

          {/* Actions */}
          <div
            className="flex items-center gap-3 mt-auto"
            style={{ transform: "translateZ(50px)" }}
          >
            <Link
              href={`/projects/${project.slug}`}
              className="flex-1 text-center px-4 py-3 bg-slate-900 dark:bg-white hover:bg-emerald-600 dark:hover:bg-emerald-500 text-white dark:text-slate-900 dark:hover:text-white text-sm font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1"
            >
              Explore Project
            </Link>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-slate-600 dark:text-slate-400 hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-900 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md"
                title="GitHub"
              >
                <FaGithub size={18} />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-emerald-600 dark:text-emerald-400 hover:text-white bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-600 border border-emerald-200 dark:border-emerald-800/50 rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md"
                title="Live Demo"
              >
                <FaExternalLinkAlt size={16} />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
