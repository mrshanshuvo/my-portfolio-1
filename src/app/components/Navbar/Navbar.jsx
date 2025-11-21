"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = ["home", "about", "experience", "projects", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-50px 0px -50px 0px" }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const smoothScroll = (sectionId) => {
    setIsOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });

      // Update URL without page reload
      if (window.history.pushState) {
        window.history.pushState(null, "", `#${sectionId}`);
      }
    }
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed w-full top-0 z-50"
    >
      <div
        className={`transition-all duration-300 ${scrolled ? "py-3" : "py-6"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div
            className={`relative transition-all duration-300 ${
              scrolled
                ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl shadow-lg shadow-black/5 dark:shadow-black/20 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl"
                : "bg-transparent"
            }`}
          >
            <div className="flex justify-between items-center px-6 py-4">
              {/* Logo */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => smoothScroll("home")}
                className="flex items-center gap-3 group relative z-10"
                aria-label="Scroll to home"
              >
                <div className="relative">
                  <Image
                    src="/favicons/android-chrome-512x512.png"
                    alt="Logo"
                    width={36}
                    height={36}
                    className="rounded-lg ring-2 ring-emerald-500/20 dark:ring-emerald-400/20"
                    priority
                  />
                </div>
              </motion.button>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                <div className="flex items-center gap-1">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => smoothScroll(item.id)}
                      className="relative px-4 py-2 group"
                      aria-current={
                        activeSection === item.id ? "page" : undefined
                      }
                    >
                      <span
                        className={`relative z-10 text-sm font-medium transition-colors ${
                          activeSection === item.id
                            ? scrolled
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-white"
                            : scrolled
                            ? "text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200"
                            : "text-white/70 group-hover:text-white"
                        }`}
                      >
                        {item.label}
                      </span>
                      {activeSection === item.id && (
                        <motion.div
                          layoutId="navIndicator"
                          className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                            scrolled
                              ? "bg-emerald-600 dark:bg-emerald-400"
                              : "bg-white"
                          }`}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Resume Button */}
                <motion.a
                  href="/shovu_resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                    scrolled
                      ? "bg-emerald-600 dark:bg-emerald-500 text-white hover:bg-emerald-700 dark:hover:bg-emerald-600"
                      : "bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20"
                  }`}
                >
                  Resume
                </motion.a>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`md:hidden p-2 rounded-lg transition-colors ${
                  scrolled
                    ? "text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
                    : "text-white hover:bg-white/10"
                }`}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`md:hidden mt-3 rounded-2xl overflow-hidden ${
                  scrolled
                    ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl shadow-lg border border-slate-200/50 dark:border-slate-700/50"
                    : "bg-slate-950/95 backdrop-blur-2xl border border-white/10"
                }`}
              >
                <div className="p-3">
                  {navItems.map((item, i) => (
                    <button
                      key={item.id}
                      onClick={() => smoothScroll(item.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                        activeSection === item.id
                          ? scrolled
                            ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                            : "bg-white/10 text-white"
                          : scrolled
                          ? "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                          : "text-white/80 hover:bg-white/5"
                      }`}
                      aria-current={
                        activeSection === item.id ? "page" : undefined
                      }
                    >
                      {item.label}
                    </button>
                  ))}
                  <a
                    href="/shovu_resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block mt-3 px-4 py-3 rounded-lg text-base font-medium text-center transition-colors ${
                      scrolled
                        ? "bg-emerald-600 dark:bg-emerald-500 text-white hover:bg-emerald-700 dark:hover:bg-emerald-600"
                        : "bg-white/90 text-slate-900"
                    }`}
                  >
                    Download Resume
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}
