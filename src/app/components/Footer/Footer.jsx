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

  return (
    <>
      {/* Animated Back to Top Button with Hover Pulse */}
      <AnimatePresence>
        {showTopButton && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.15 }} // subtle pulse on hover
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50"
            aria-label="Scroll to top"
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>

      <footer className="bg-gray-100 dark:bg-gray-800 py-12 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Connect with me
          </h2>
          <div className="flex justify-center gap-6 mb-6 text-gray-700 dark:text-gray-300">
            <a
              href="https://github.com/mrshanshuvo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="text-2xl hover:text-blue-600 transition-colors" />
            </a>
            <a
              href="https://linkedin.com/in/mrshanshuvo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-2xl hover:text-blue-700 transition-colors" />
            </a>
            <a href="mailto:mrshanshuvo@gmail.com">
              <FaEnvelope className="text-2xl hover:text-red-500 transition-colors" />
            </a>
            <a
              href="https://wa.me/8801929346733"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="text-2xl hover:text-green-500 transition-colors" />
            </a>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Shahid Hasan Shuvo. All rights
            reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
