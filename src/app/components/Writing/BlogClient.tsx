"use client";
import { motion } from "framer-motion";
import { Blog } from "@/types";
import { FaPenNib, FaArrowRight, FaCalendarAlt } from "react-icons/fa";

interface BlogClientProps {
  blogs: Blog[];
}

export default function BlogClient({ blogs }: BlogClientProps) {
  return (
    <section id="blog" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 rounded-3xl bg-blue-500/10 flex items-center justify-center text-blue-400 mx-auto mb-6"
          >
            <FaPenNib size={24} />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight"
          >
            Latest <span className="text-blue-500">Writing</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Sharing my thoughts on software engineering, machine learning, and the future of technology.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, idx) => (
            <motion.a
              key={blog._id}
              href={blog.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group block p-8 rounded-[2.5rem] bg-slate-900/40 backdrop-blur-xl border border-white/5 hover:border-blue-500/30 transition-all duration-500"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2">
                  {blog.tags.slice(0, 2).map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-black text-blue-400 uppercase tracking-widest px-3 py-1 rounded-full bg-blue-400/10">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                  <FaCalendarAlt size={12} />
                  {blog.date}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3">
                {blog.description}
              </p>

              <div className="flex items-center gap-2 text-blue-500 font-bold text-sm">
                Read Article <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
