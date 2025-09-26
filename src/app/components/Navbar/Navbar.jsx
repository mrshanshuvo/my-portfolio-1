"use client";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="p-4 bg-gray-900 text-white flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-xl font-bold">Shuvo</h1>
      <div className="hidden md:flex space-x-4">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </div>
      {/* Mobile Menu */}
      <button className="md:hidden" onClick={() => setOpen(!open)}>
        {open ? "✖" : "☰"}
      </button>
      {open && (
        <div className="absolute top-full left-0 w-full bg-gray-900 flex flex-col text-center md:hidden">
          <a href="#about" className="py-2">
            About
          </a>
          <a href="#projects" className="py-2">
            Projects
          </a>
          <a href="#contact" className="py-2">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}
