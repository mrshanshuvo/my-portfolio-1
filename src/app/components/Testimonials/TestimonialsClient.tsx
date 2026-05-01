"use client";
import { motion } from "framer-motion";
import { Testimonial } from "@/types";
import { FaQuoteLeft, FaUserCircle } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialsClientProps {
  testimonials: Testimonial[];
}

export default function TestimonialsClient({ testimonials }: TestimonialsClientProps) {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-slate-900/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20"
        >
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-blue-500 font-black uppercase tracking-[0.3em] text-sm mb-4"
            >
              <FaQuoteLeft /> The Feedback
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight whitespace-nowrap">
              Client <span className="text-blue-500">Testimonials</span>
            </h2>
          </div>
          <p className="text-slate-400 max-w-xl md:text-right text-md md:text-lg font-medium leading-relaxed line-clamp-2">
            Don't just take my word for it. Here's what my clients and
            colleagues have to say about our collaboration.
          </p>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="break-inside-avoid"
            >
              <Card className="relative p-8 rounded-[2rem] bg-slate-900/40 backdrop-blur-xl border border-white/5 hover:border-blue-500/30 transition-all duration-500 group shadow-none">
                <FaQuoteLeft className="text-blue-500/20 mb-6 group-hover:text-blue-500/40 transition-colors" size={40} />
                
                <CardContent className="p-0">
                  <p className="text-slate-200 text-lg leading-relaxed mb-8 italic">
                    "{item.content}"
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 overflow-hidden border border-white/10">
                      {item.avatar ? (
                        <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <FaUserCircle size={24} />
                      )}
                    </div>
                    <div>
                      <h4 className="text-white font-bold">{item.name}</h4>
                      <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">
                        {item.role} {item.company && `@ ${item.company}`}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
