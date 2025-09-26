"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.section
      className="h-screen flex flex-col justify-center items-center text-center bg-gray-50"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-5xl md:text-6xl font-bold mb-4">Hi, I'm Shuvo 👋</h1>
      <p className="text-lg text-gray-600 mb-6">
        Computer Engineer | Full-Stack Developer | ML Enthusiast
      </p>
      <a
        href="#projects"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        View My Work
      </a>
    </motion.section>
  );
}
