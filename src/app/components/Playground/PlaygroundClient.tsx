"use client";
import { motion } from "framer-motion";
import { Demo } from "@/types";
import { FaFlask, FaExternalLinkAlt, FaCode } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";

interface PlaygroundClientProps {
  demos: Demo[];
}

export default function PlaygroundClient({ demos }: PlaygroundClientProps) {
  return (
    <section id="playground" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-purple-500 font-black uppercase tracking-[0.3em] text-sm mb-4"
            >
              <FaFlask /> Lab Experiments
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-white tracking-tight"
            >
              Interactive <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500">Playground</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-400 max-w-md text-lg leading-relaxed"
          >
            A collection of experimental features, ML models, and interactive tools built during my technical exploration.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {demos.map((demo, idx) => (
            <motion.div
              key={demo._id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative p-8 rounded-[3rem] bg-slate-900/40 backdrop-blur-xl border border-white/5 hover:border-purple-500/30 transition-all duration-500 overflow-hidden"
            >
              {/* Decorative Glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-[60px] group-hover:bg-purple-500/20 transition-all duration-500" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform duration-500">
                    <FaCode size={24} />
                  </div>
                  <a
                    href={demo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-purple-500 transition-all"
                  >
                    <FaExternalLinkAlt size={16} />
                  </a>
                </div>

                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-purple-400 transition-colors">
                  {demo.title}
                </h3>
                <p className="text-slate-400 leading-relaxed mb-8 flex-1">
                  {demo.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {demo.tech.map((t, tIdx) => (
                    <Badge
                      key={tIdx}
                      variant="outline"
                      className="bg-white/5 border-white/10 text-slate-300 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
