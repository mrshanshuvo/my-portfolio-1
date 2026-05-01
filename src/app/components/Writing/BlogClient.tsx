"use client";
import { motion } from "framer-motion";
import { Blog } from "@/types";
import Link from "next/link";
import { FaPenNib, FaArrowRight, FaCalendarAlt } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import BlogCard from "./BlogCard";
import { Button } from "@/components/ui/button";

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
            Sharing my thoughts on software engineering, machine learning, and
            the future of technology.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogs.map((blog, idx) => (
            <BlogCard key={blog._id} blog={blog} index={idx} />
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
            href="/blog"
            className="group px-8 py-4 bg-slate-900/50 dark:bg-white text-white dark:text-slate-950 rounded-2xl text-lg font-black transition-all hover:scale-105 shadow-xl hover:shadow-blue-500/20 border border-white/10 dark:border-none flex items-center gap-3"
          >
            Read All Articles 
            <FaArrowRight className="group-hover:translate-x-2 transition-transform" size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
