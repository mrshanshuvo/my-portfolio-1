"use client";
import { useState, useEffect } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaWhatsapp,
  FaArrowUp,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const [showTopButton, setShowTopButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show button after scrolling 300px
  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socialLinks = [
    {
      icon: FaGithub,
      href: "https://github.com/mrshanshuvo",
      label: "GitHub",
      color: "hover:text-slate-900 dark:hover:text-white",
    },
    {
      icon: FaLinkedin,
      href: "https://linkedin.com/in/mrshanshuvo",
      label: "LinkedIn",
      color: "hover:text-blue-600 dark:hover:text-blue-400",
    },
    {
      icon: FaEnvelope,
      href: "mailto:mrshanshuvo@gmail.com",
      label: "Email",
      color: "hover:text-red-500 dark:hover:text-red-400",
    },
    {
      icon: FaWhatsapp,
      href: "https://wa.me/8801929346733",
      label: "WhatsApp",
      color: "hover:text-green-500 dark:hover:text-green-400",
    },
  ];

  return (
    <>
      {/* Animated Back to Top Button */}
      <AnimatePresence>
        {showTopButton && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-8 right-8 bg-emerald-600 dark:bg-emerald-500 text-white p-3.5 rounded-full shadow-lg hover:shadow-xl hover:shadow-emerald-600/30 z-50"
            aria-label="Scroll to top"
          >
            <FaArrowUp className="text-lg" />
          </motion.button>
        )}
      </AnimatePresence>

      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-slate-900 dark:text-white mb-6"
            >
              Connect with{" "}
              <span className="text-emerald-600 dark:text-emerald-400">Me</span>
            </motion.h2>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex justify-center gap-4 mb-8"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  className={`w-12 h-12 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-400 transition-all duration-200 hover:border-emerald-500 dark:hover:border-emerald-400 hover:shadow-lg ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon className="text-xl" />
                </motion.a>
              ))}
            </motion.div>

            {/* Divider */}
            <div className="w-20 h-0.5 bg-emerald-600 dark:bg-emerald-400 mx-auto mb-6"></div>

            {/* Copyright */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-slate-600 dark:text-slate-400 text-sm"
            >
              &copy; {new Date().getFullYear()} Shahid Hasan Shuvo. All rights
              reserved.
            </motion.p>

            {/* Optional: Built with love message */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-slate-500 dark:text-slate-500 text-xs mt-2"
            >
              Built with{" "}
              <span className="text-emerald-600 dark:text-emerald-400">❤</span>{" "}
              using Next.js & Tailwind CSS
            </motion.p>
          </div>
        </div>
      </footer>
    </>
  );
}
