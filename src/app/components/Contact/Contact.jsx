"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaPaperPlane,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const recaptchaRef = useRef(null);

  const [status, setStatus] = useState({ message: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: "Email",
      value: "mrshanshuvo@gmail.com",
      link: "mailto:mrshanshuvo@gmail.com",
    },
    {
      icon: FaPhone,
      label: "Phone",
      value: "+88017 94280136",
      link: "tel:+8801794280136",
    },
    {
      icon: FaMapMarkerAlt,
      label: "Location",
      value: "12/C/1, Girza Road, Borobagh, Mirpur, Dhaka, Bangladesh",
      link: null,
    },
  ];

  const socialLinks = [
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      url: "https://linkedin.com/in/shahidhasanshovu",
      color: "hover:text-blue-600",
    },
    {
      icon: FaGithub,
      label: "GitHub",
      url: "https://github.com/mrshanshuvo",
      color: "hover:text-gray-900 dark:hover:text-white",
    },
    {
      icon: FaTwitter,
      label: "Twitter",
      url: "https://twitter.com/mrshanshuvo",
      color: "hover:text-blue-400",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ message: "Sending your message...", type: "loading" });

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (!data.name || !data.email || !data.message) {
      setStatus({
        message: "Please fill in all required fields.",
        type: "error",
      });
      setIsSubmitting(false);
      return;
    }

    if (!recaptchaToken) {
      setStatus({ message: "Please verify the reCAPTCHA.", type: "error" });
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, recaptchaToken }),
      });

      const result = await res.json();

      if (result.success) {
        setStatus({
          message: "Message sent successfully! ✅",
          type: "success",
        });
        e.target.reset();
        recaptchaRef.current.reset();
        setRecaptchaToken("");

        setTimeout(() => setStatus({ message: "", type: "" }), 5000);
      } else {
        throw new Error(result.error || "Failed to send message");
      }
    } catch (err) {
      setStatus({
        message: "Sorry, there was an error sending your message. ❌",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Get In <span className="text-blue-600">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? I'd love to
            hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info + Socials */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Let's talk!
            </motion.h3>
            <motion.div variants={itemVariants} className="space-y-6 mb-8">
              {contactInfo.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <item.icon className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {item.label}
                    </p>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-300">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
            <motion.div variants={itemVariants}>
              <p className="font-medium text-gray-900 dark:text-white mb-4">
                Follow me on
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 transition-all duration-200 hover:border-blue-500 ${social.color} hover:scale-110`}
                    aria-label={social.label}
                  >
                    <social.icon className="text-lg" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Shahid Hasan Shovu"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="shahid@example.com"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  placeholder="Hello! I’d like to discuss a project collaboration or a web development task."
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none transition-all"
                ></textarea>
              </div>

              {/* reCAPTCHA */}
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onChange={(token) => setRecaptchaToken(token)}
                ref={recaptchaRef}
              />

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 text-white shadow-lg ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                }`}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <FaPaperPlane /> Send Message
                  </>
                )}
              </motion.button>

              {status.message && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg ${
                    status.type === "success"
                      ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                      : status.type === "error"
                      ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                      : "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {status.type === "success" ? (
                      <FaCheckCircle className="text-green-600 text-lg" />
                    ) : status.type === "error" ? (
                      <FaExclamationTriangle className="text-red-600 text-lg" />
                    ) : (
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    )}
                    <p
                      className={`text-sm font-medium ${
                        status.type === "success"
                          ? "text-green-800 dark:text-green-300"
                          : status.type === "error"
                          ? "text-red-800 dark:text-red-300"
                          : "text-blue-800 dark:text-blue-300"
                      }`}
                    >
                      {status.message}
                    </p>
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
