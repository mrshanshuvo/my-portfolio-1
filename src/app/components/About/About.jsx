"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      id="about"
      className="py-16 px-6 text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold mb-4">About Me</h2>
      <p className="max-w-2xl mx-auto text-gray-600">
        I'm a Computer Engineer & CSE student at Green University of Bangladesh.
        Skilled in MERN, Django, TensorFlow, and passionate about building
        scalable apps.
      </p>
    </motion.section>
  );
}
