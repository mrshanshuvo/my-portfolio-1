"use client";
import { motion } from "framer-motion";
import { Certification } from "../../../types";
import { FaAward, FaExternalLinkAlt, FaCalendarAlt } from "react-icons/fa";

interface CertificationsViewProps {
  certifications: Certification[];
}

export default function CertificationsView({
  certifications,
}: CertificationsViewProps) {
  return (
    <section
      id="certifications"
      className="py-24 relative overflow-hidden bg-slate-900/10"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight"
          >
            Academic &{" "}
            <span className="text-amber-500">Professional Credentials</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            A validation of my continuous commitment to learning and staying at
            the forefront of technology.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert._id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-6 p-6 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-white/5 hover:border-amber-500/30 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                <FaAward size={32} />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold mb-1 group-hover:text-amber-400 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-slate-400 text-sm mb-2 font-medium">
                  {cert.issuer}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                    <FaCalendarAlt size={10} />
                    {cert.date}
                  </div>
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[10px] text-amber-500 hover:text-amber-400 font-bold uppercase tracking-widest transition-colors"
                    >
                      Verify <FaExternalLinkAlt size={10} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
