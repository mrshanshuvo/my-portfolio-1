import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import Experience from "@/models/Experience";
import Link from "next/link";
import {
  FaProjectDiagram,
  FaBriefcase,
  FaUser,
  FaHome,
  FaArrowRight,
} from "react-icons/fa";

async function getStats() {
  await connectDB();
  const [projectCount, expCount] = await Promise.all([
    Project.countDocuments(),
    Experience.countDocuments(),
  ]);
  return { projectCount, expCount };
}

const sections = [
  {
    href: "/admin/hero",
    label: "Hero Section",
    desc: "Update your name, bio, typing sequences & social links",
    icon: FaHome,
    color: "from-blue-500/20 to-blue-600/5 border-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    href: "/admin/about",
    label: "About Section",
    desc: "Edit bio, skills, stats, tech list & education",
    icon: FaUser,
    color: "from-purple-500/20 to-purple-600/5 border-purple-500/20",
    iconColor: "text-purple-400",
  },
  {
    href: "/admin/projects",
    label: "Projects",
    desc: "Add, edit, or delete portfolio projects",
    icon: FaProjectDiagram,
    color: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    href: "/admin/experience",
    label: "Experience & Education",
    desc: "Manage work experience, education & certifications",
    icon: FaBriefcase,
    color: "from-amber-500/20 to-amber-600/5 border-amber-500/20",
    iconColor: "text-amber-400",
  },
];

export default async function AdminDashboard() {
  const { projectCount, expCount } = await getStats();

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400">
          Manage all content of your portfolio from here.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Projects", value: projectCount, color: "text-emerald-400" },
          {
            label: "Experience Entries",
            value: expCount,
            color: "text-amber-400",
          },
          { label: "Sections", value: 4, color: "text-blue-400" },
          { label: "Status", value: "Live", color: "text-green-400" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5"
          >
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-slate-400 text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Section cards */}
      <h2 className="text-lg font-semibold text-slate-300 mb-4">
        Content Sections
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className={`group flex items-start gap-4 bg-linear-to-br ${section.color} border rounded-xl p-6 hover:scale-[1.02] transition-transform`}
          >
            <div className={`${section.iconColor} text-2xl mt-0.5 shrink-0`}>
              <section.icon />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-1">{section.label}</h3>
              <p className="text-slate-400 text-sm">{section.desc}</p>
            </div>
            <FaArrowRight className="text-slate-600 group-hover:text-slate-400 transition-colors shrink-0 mt-1" />
          </Link>
        ))}
      </div>
    </div>
  );
}
