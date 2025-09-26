"use client";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export default function Hero() {
  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const socialLinks = [
    {
      icon: FaGithub,
      href: "https://github.com/yourusername",
      label: "GitHub",
    },
    {
      icon: FaLinkedin,
      href: "https://linkedin.com/in/yourusername",
      label: "LinkedIn",
    },
    {
      icon: SiLeetcode,
      href: "https://leetcode.com/yourusername",
      label: "LeetCode",
    },
    {
      icon: FaEnvelope,
      href: "mailto:your.email@domain.com",
      label: "Email",
    },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          {/* Profile Image */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative inline-block mb-8"
          >
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
              <div className="w-full h-full rounded-full bg-gray-800 overflow-hidden border-4 border-gray-900">
                {/* Replace with your actual image */}
                <div className="w-full h-full bg-gray-700 flex items-center justify-center text-white text-4xl font-bold">
                  S
                </div>
              </div>
            </div>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full border-2 border-blue-400"
            />
          </motion.div>

          {/* Greeting Text */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
          >
            Hi, I'm{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Shuvo
            </span>
          </motion.h1>

          {/* Typewriter Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-6 h-12"
          >
            <TypeAnimation
              sequence={[
                "Full-Stack Developer",
                2000,
                "Computer Engineer",
                2000,
                "ML Enthusiast",
                2000,
                "Problem Solver",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="font-semibold"
            />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            I build exceptional digital experiences that are fast, accessible,
            visually appealing, and responsive. Let's bring your ideas to life!
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px -10px rgba(59, 130, 246, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToProjects}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              View My Work
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ↓
              </motion.span>
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
            >
              Download Resume
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex justify-center space-x-6"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.2,
                  y: -5,
                }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                className="p-3 text-gray-400 hover:text-white transition-colors duration-200 rounded-full bg-white/5 backdrop-blur-sm hover:bg-white/10"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/50 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
