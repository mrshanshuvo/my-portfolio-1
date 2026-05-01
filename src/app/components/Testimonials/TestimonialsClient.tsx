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
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight"
          >
            Client <span className="text-blue-500">Testimonials</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Don't just take my word for it. Here's what my clients and colleagues have to say.
          </motion.p>
        </div>

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
