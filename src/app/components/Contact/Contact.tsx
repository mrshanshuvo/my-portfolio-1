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
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import type { ContactInfo, Status } from "@/types";
import type { IconType } from "react-icons";
import type { FormEvent } from "react";

interface ContactSocialLink {
  icon: IconType;
  label: string;
  href: string;
  color: string;
}

const platformIconMap: Record<string, IconType> = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedin,
  LeetCode: FaGithub, // Fallback or add SiLeetcode if needed
  Email: FaEnvelope,
  Twitter: FaTwitter,
};

interface Props {
  socialLinks: import("@/types").SocialLink[];
  contactEmail: string;
}

export default function Contact({ socialLinks: rawSocialLinks, contactEmail }: Props) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [status, setStatus] = useState<Status>({ message: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const contactInfo: ContactInfo[] = [
    {
      icon: FaEnvelope,
      label: "Email",
      value: contactEmail,
      link: `mailto:${contactEmail}`,
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

  const socialLinks: ContactSocialLink[] = rawSocialLinks.map((s) => ({
    icon: platformIconMap[s.platform] || FaEnvelope,
    label: s.platform,
    href: s.href,
    color:
      s.platform === "GitHub"
        ? "hover:text-slate-900 dark:hover:text-white"
        : s.platform === "LinkedIn"
        ? "hover:text-blue-600 dark:hover:text-blue-400"
        : "hover:text-emerald-500",
  }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ message: "Sending your message...", type: "loading" });

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    if (!data.name || !data.email || !data.message) {
      setStatus({
        message: "Please fill in all required fields.",
        type: "error",
      });
      setIsSubmitting(false);
      return;
    }

    if (!executeRecaptcha) {
      setStatus({
        message: "reCAPTCHA not ready. Please try again.",
        type: "error",
      });
      setIsSubmitting(false);
      return;
    }

    const recaptchaToken = await executeRecaptcha("contact_form");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, recaptchaToken }),
      });

      const result = (await res.json()) as { success: boolean; error?: string };

      if (result.success) {
        setStatus({
          message: "Message sent successfully! ✅",
          type: "success",
        });
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setStatus({ message: "", type: "" }), 5000);
      } else {
        throw new Error(result.error ?? "Failed to send message");
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
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 bg-slate-50 dark:bg-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Get In{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              Touch
            </span>
          </h2>
          <div className="w-20 h-1 bg-emerald-600 dark:bg-emerald-400 mx-auto mb-4"></div>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? I&apos;d
            love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h3
              variants={itemVariants}
              className="text-2xl font-semibold text-slate-900 dark:text-white mb-6"
            >
              Let&apos;s talk!
            </motion.h3>
            <motion.div variants={itemVariants} className="space-y-6 mb-10">
              {contactInfo.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center shrink-0">
                    <item.icon className="text-emerald-600 dark:text-emerald-400 text-xl" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white mb-1">
                      {item.label}
                    </p>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
            <motion.div variants={itemVariants}>
              <p className="font-medium text-slate-900 dark:text-white mb-4">
                Follow me on
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-11 h-11 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-400 transition-all duration-200 hover:border-emerald-500 dark:hover:border-emerald-400 ${social.color} hover:scale-110 hover:shadow-lg`}
                    aria-label={social.label}
                  >
                    {(() => { const Icon = social.icon; return <Icon className="text-lg" />; })()}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 space-y-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Shahid Hasan Shovu"
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 transition-all"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="shahid@example.com"
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 transition-all"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Hello! I'd like to discuss a project collaboration or a web development task."
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 resize-none transition-all"
                ></textarea>
              </div>

              {/* reCAPTCHA v3 – invisible, no widget needed */}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 text-white shadow-lg transition-all ${isSubmitting ? "bg-slate-400 cursor-not-allowed" : "bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-700 dark:hover:bg-emerald-600 shadow-emerald-600/20"}`}
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
                  className={`p-4 rounded-lg ${status.type === "success" ? "bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800" : status.type === "error" ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800" : "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"}`}
                >
                  <div className="flex items-center gap-3">
                    {status.type === "success" ? (
                      <FaCheckCircle className="text-emerald-600 dark:text-emerald-400 text-lg" />
                    ) : status.type === "error" ? (
                      <FaExclamationTriangle className="text-red-600 dark:text-red-400 text-lg" />
                    ) : (
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    )}
                    <p
                      className={`text-sm font-medium ${status.type === "success" ? "text-emerald-800 dark:text-emerald-300" : status.type === "error" ? "text-red-800 dark:text-red-300" : "text-blue-800 dark:text-blue-300"}`}
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
