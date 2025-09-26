"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        setStatus("Message sent! ✅");
        e.target.reset();
      } else {
        setStatus("Failed to send message. ❌");
      }
    } catch (err) {
      setStatus("Error sending message ❌");
    }
  };

  return (
    <motion.section
      id="contact"
      className="py-16 px-6 text-center bg-gray-50"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
      <p className="text-gray-600 mb-6">
        Have a project or just want to say hi? 🚀
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto flex flex-col gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          required
          rows="5"
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <button
          type="submit"
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Send Message
        </button>
      </form>

      {status && <p className="mt-4 text-gray-700">{status}</p>}
    </motion.section>
  );
}
