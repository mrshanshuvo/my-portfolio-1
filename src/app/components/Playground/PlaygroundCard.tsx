"use client";
import { motion } from "framer-motion";
import { Demo } from "@/types";
import { FaExternalLinkAlt, FaCode } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PlaygroundCardProps {
  demo: Demo;
  index: number;
}

export default function PlaygroundCard({ demo, index }: PlaygroundCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="group relative h-full p-8 rounded-[3rem] bg-slate-900/40 backdrop-blur-xl border border-white/5 hover:border-purple-500/30 transition-all duration-500 overflow-hidden shadow-none">
        {/* Decorative Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-[60px] group-hover:bg-purple-500/20 transition-all duration-500" />

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-start justify-between mb-8">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform duration-500">
              <FaCode size={24} />
            </div>
            <Button
              variant="ghost"
              size="icon"
              nativeButton={false}
              render={
                <a href={demo.url} target="_blank" rel="noopener noreferrer" />
              }
              className="p-3 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-purple-500 transition-all"
            >
              <FaExternalLinkAlt size={16} />
            </Button>
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
      </Card>
    </motion.div>
  );
}
