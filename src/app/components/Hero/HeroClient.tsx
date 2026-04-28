"use client";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import Image from "next/image";
import type { Hero } from "@/types";
import type { IconType } from "react-icons";

interface Props {
  hero: Hero;
}

const platformIconMap: Record<string, IconType> = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedin,
  LeetCode: SiLeetcode,
  Email: FaEnvelope,
  Twitter: FaTwitter,
  Instagram: FaInstagram,
};

export default function HeroClient({ hero }: Props) {
  const scrollToProjects = (): void => {
    const element = document.getElementById("projects");
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Build type animation sequence array: ["text", delay, "text", delay, ...]
  const typeSequence = hero.typeSequences.flatMap((s) => [s.text, s.delay]);

  return (
    <section
      id="home"
      className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-950"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" />
        <div
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Profile image */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative inline-block mb-8"
          >
            <div className="relative w-40 h-40 md:w-48 md:h-48">
              <div className="absolute inset-0 bg-linear-to-r from-emerald-500 to-blue-500 rounded-full animate-spin-slow" />
              <div className="absolute inset-1 bg-slate-950 rounded-full" />
              <div className="absolute inset-2 rounded-full overflow-hidden border-2 border-emerald-500/20">
                <Image
                  src={hero.profileImage}
                  alt={`${hero.name} ${hero.lastName} - Full Stack Developer`}
                  width={192}
                  height={192}
                  className="object-cover"
                  sizes="(max-width: 768px) 10rem, 12rem"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-3 tracking-tight">
              {hero.name}{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-blue-500">
                {hero.lastName}
              </span>
            </h1>
          </motion.div>

          {/* Type animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl text-slate-400 mb-6 h-8 font-medium min-h-8"
          >
            {typeSequence.length > 0 && (
              <TypeAnimation
                sequence={typeSequence}
                wrapper="span"
                speed={50}
                deletionSpeed={65}
                repeat={Infinity}
              />
            )}
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {hero.bio}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToProjects}
              className="group px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg shadow-emerald-600/20"
            >
              View My Work
              <motion.span
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="group-hover:translate-y-1 transition-transform"
              >
                ↓
              </motion.span>
            </motion.button>
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              href={hero.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-600 font-medium rounded-lg transition-all duration-200 hover:bg-slate-800/50"
            >
              Download Resume
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex justify-center gap-4"
          >
            {hero.socialLinks.map((social, index) => {
              const Icon = platformIconMap[social.platform] ?? FaEnvelope;
              const href = social.platform === "Email" && !social.href.startsWith("mailto:")
                ? `mailto:${social.href}`
                : social.href;
              return (
                <motion.a
                  key={social.label}
                  href={href}
                  target={social.platform === "Email" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="p-3 text-slate-400 hover:text-emerald-400 transition-colors duration-200 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-emerald-500/30"
                  aria-label={social.label}
                >
                  <Icon size={20} />
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center p-2"
          >
            <div className="w-1 h-2 bg-emerald-400 rounded-full" />
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      `}</style>
    </section>
  );
}
