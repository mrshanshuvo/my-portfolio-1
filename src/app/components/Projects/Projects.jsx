"use client";
import { motion } from "framer-motion";

const projects = [
  { title: "MCMS", desc: "Medical Camp Management System", link: "#" },
  { title: "ProFast", desc: "Parcel Delivery Service", link: "#" },
  { title: "WhereIsIt", desc: "Lost & Found Platform", link: "#" },
];

export default function Projects() {
  return (
    <section id="projects" className="py-16 px-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            className="p-6 bg-white shadow rounded-lg hover:shadow-lg transition"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold">{p.title}</h3>
            <p className="text-gray-600">{p.desc}</p>
            <a href={p.link} className="text-blue-600 mt-2 inline-block">
              View Project →
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
