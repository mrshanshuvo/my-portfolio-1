"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaFlask, FaArrowRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import type { Demo } from "@/types";
import PlaygroundCard from "./PlaygroundCard";

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
            A selection of experimental features and interactive tools built during my technical exploration.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {demos.map((demo, idx) => (
            <PlaygroundCard key={demo._id} demo={demo} index={idx} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Link
            href="/playground"
            className="group px-8 py-4 bg-slate-900/50 dark:bg-white text-white dark:text-slate-950 rounded-3xl text-lg font-black transition-all hover:scale-105 shadow-xl hover:shadow-purple-500/20 border border-white/10 dark:border-none flex items-center gap-3"
          >
            Explore Full Lab 
            <FaArrowRight className="group-hover:translate-x-2 transition-transform" size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
