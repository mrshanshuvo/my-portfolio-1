"use client";
import { motion } from "framer-motion";
import { WorkflowStep } from "@/types";
import * as Icons from "react-icons/fa";

interface WorkflowClientProps {
  workflow: WorkflowStep[];
}

export default function WorkflowClient({ workflow }: WorkflowClientProps) {
  return (
    <section id="workflow" className="py-24 bg-slate-950/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight"
          >
            My <span className="text-emerald-500">Methodology</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            A systematic approach to engineering excellence, ensuring every project is delivered with precision and quality.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-emerald-500/20 to-transparent hidden lg:block -translate-y-1/2" />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
            {workflow.map((step, idx) => {
              const Icon = (Icons as any)[step.icon] || Icons.FaProjectDiagram;
              return (
                <motion.div
                  key={step._id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative flex flex-col items-center text-center group"
                >
                  <div className="relative z-10 w-24 h-24 rounded-full bg-slate-900 border-4 border-slate-950 shadow-[0_0_50px_rgba(16,185,129,0.1)] flex items-center justify-center text-emerald-400 mb-8 group-hover:scale-110 group-hover:border-emerald-500/30 transition-all duration-500">
                    <Icon size={32} />
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-emerald-500 text-slate-950 text-xs font-black flex items-center justify-center border-4 border-slate-950">
                      0{idx + 1}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-black text-white mb-4 group-hover:text-emerald-400 transition-colors uppercase tracking-wider">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-[250px]">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
