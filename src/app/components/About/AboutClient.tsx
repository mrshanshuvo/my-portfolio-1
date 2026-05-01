"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  FaCode,
  FaDatabase,
  FaCloud,
  FaRobot,
  FaGraduationCap,
  FaCheckCircle,
} from "react-icons/fa";
import { SiTensorflow, SiReact, SiNodedotjs } from "react-icons/si";
import type { IconType } from "react-icons";
import type { About } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Props {
  about: About;
}

const iconMap: Record<string, IconType> = {
  SiReact,
  SiNodedotjs,
  FaDatabase,
  FaCloud,
  SiTensorflow,
  FaRobot,
};

function getSkillIcon(iconName: string): IconType {
  return iconMap[iconName] ?? FaDatabase;
}

export default function AboutClient({ about }: Props) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
      <div className="absolute top-20 right-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20"
        >
          <div className="text-left">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-3 text-emerald-500 font-black uppercase tracking-[0.3em] text-sm mb-4"
            >
              <FaRobot /> The Identity
            </motion.div>
            <h2 className="font-display text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight whitespace-nowrap">
              Cinematic{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-500">
                Profile
              </span>
            </h2>
          </div>
          <p className="text-md md:text-lg text-slate-600 dark:text-slate-400 max-w-xl md:text-right font-medium leading-relaxed line-clamp-2">
            Architecting high-performance digital experiences through the lens
            of modern software engineering and machine intelligence.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
        >
          {about.stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group h-full"
            >
              <Card className="h-full text-center p-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-[2rem] border border-slate-200/50 dark:border-white/10 hover:border-emerald-500/50 transition-all duration-300 shadow-xl overflow-hidden">
                <div className="font-display text-5xl font-black bg-linear-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-500 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-sm font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400">
                  {stat.label}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mb-16">
          {/* Bio - Spans 2 columns */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="md:col-span-2 h-full"
          >
            <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-[2rem] p-10 border border-slate-200/50 dark:border-white/10 shadow-xl hover:shadow-2xl transition-shadow h-full overflow-hidden">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-linear-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg shadow-emerald-500/20">
                  👋
                </div>
                <CardTitle className="font-display text-3xl font-bold text-slate-900 dark:text-white">
                  Hello! I&apos;m Shuvo
                </CardTitle>
              </div>
              <CardContent className="p-0">
                {about.bio1 && (
                  <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed font-medium">
                    {about.bio1}
                  </p>
                )}
                {about.bio2 && (
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    {about.bio2}
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <div className="flex flex-col gap-6 md:col-span-1 h-full">
            {/* Highlights */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex-1"
            >
              <Card className="bg-linear-to-br from-emerald-500/10 to-blue-500/10 backdrop-blur-xl rounded-[2rem] p-8 border border-emerald-500/20 shadow-xl h-full overflow-hidden">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <FaCheckCircle className="text-emerald-500" /> What I Bring
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  {about.highlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={
                        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                      }
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                      <span className="text-slate-700 dark:text-slate-300 font-medium text-sm lg:text-base">
                        {highlight}
                      </span>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Education */}
            {about.education.map((edu, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex-1"
              >
                <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-[2rem] p-8 border border-slate-200/50 dark:border-white/10 shadow-xl h-full overflow-hidden">
                  <CardHeader className="p-0 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                        <FaGraduationCap className="text-blue-500 text-2xl" />
                      </div>
                      <CardTitle className="font-display text-xl font-bold text-slate-900 dark:text-white">
                        Education
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <h5 className="font-bold text-slate-900 dark:text-white mb-1 leading-snug">
                      {edu.degree}
                    </h5>
                    <p className="text-blue-600 dark:text-blue-400 mb-4 font-semibold text-sm">
                      {edu.institution}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {edu.details}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Skills - Spans full width below the bento row */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="md:col-span-3"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-[2rem] p-10 border border-slate-200/50 dark:border-white/10 shadow-xl"
            >
              <h4 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-10">
                Technical Mastery
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                {about.skills.map((skill, index) => {
                  const Icon = getSkillIcon(skill.iconName);
                  return (
                    <motion.div key={skill.name} variants={itemVariants}>
                      <div className="flex items-start gap-5">
                        <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-md group-hover:scale-110 transition-transform">
                          <Icon
                            className="text-emerald-500 text-3xl"
                            aria-label={skill.name}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-lg text-slate-900 dark:text-white">
                              {skill.name}
                            </span>
                            <span className="font-mono text-sm font-bold text-emerald-500">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400 mb-3 font-medium">
                            {skill.tech}
                          </div>
                          <div
                            className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden"
                            role="progressbar"
                          >
                            <motion.div
                              initial={{ width: 0 }}
                              animate={
                                isInView
                                  ? { width: `${skill.level}%` }
                                  : { width: 0 }
                              }
                              transition={{
                                duration: 1.5,
                                delay: index * 0.15,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              className="bg-emerald-500 h-full rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Tech banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <div className="text-center mb-8">
            <h4 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
              Technologies I Work With
            </h4>
          </div>
          <div className="overflow-hidden relative bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-[2rem] py-8 border border-slate-200/50 dark:border-white/10 shadow-xl">
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
              {about.techList.map((tech, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap"
                >
                  <FaCode className="text-emerald-600 dark:text-emerald-400" />
                  <span>{tech}</span>
                </Badge>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
