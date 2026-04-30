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
  FaRocket,
  FaChartLine,
  FaEnvelope,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Message from "@/models/Message";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

async function getStats() {
  await connectDB();
  const [projectCount, expCount, msgCount] = await Promise.all([
    Project.countDocuments(),
    Experience.countDocuments(),
    Message.countDocuments({ status: "unread" }),
  ]);
  return { projectCount, expCount, msgCount };
}

const sections = [
  {
    href: "/admin/messages",
    label: "Messages",
    desc: "View and manage incoming contact form submissions",
    icon: FaEnvelope,
    color: "blue",
    gradient: "from-blue-500/20 to-blue-600/5 border-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    href: "/admin/hero",
    label: "Identity",
    desc: "Update your name, profile picture, resume & typing sequences",
    icon: FaHome,
    color: "emerald",
    gradient: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    href: "/admin/socials",
    label: "Social Links",
    desc: "Manage your GitHub, LinkedIn, and other professional links",
    icon: FaRocket,
    color: "blue",
    gradient: "from-blue-500/20 to-blue-600/5 border-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    href: "/admin/about",
    label: "Biography",
    desc: "Edit your professional bio, highlights & tech list",
    icon: FaUser,
    color: "purple",
    gradient: "from-purple-500/20 to-purple-600/5 border-purple-500/20",
    iconColor: "text-purple-400",
  },
  {
    href: "/admin/skills",
    label: "Skills & Tech",
    desc: "Manage your technical expertise and proficiency levels",
    icon: FaRocket,
    color: "pink",
    gradient: "from-pink-500/20 to-pink-600/5 border-pink-500/20",
    iconColor: "text-pink-400",
  },
  {
    href: "/admin/stats",
    label: "Stats",
    desc: "Update your achievement numbers and milestones",
    icon: FaChartLine,
    color: "amber",
    gradient: "from-amber-500/20 to-amber-600/5 border-amber-500/20",
    iconColor: "text-amber-400",
  },
  {
    href: "/admin/projects",
    label: "Projects",
    desc: "Add, edit, or delete portfolio projects",
    icon: FaProjectDiagram,
    color: "blue",
    gradient: "from-blue-500/20 to-blue-600/5 border-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    href: "/admin/experience",
    label: "Experience",
    desc: "Manage work experience and professional timeline",
    icon: FaBriefcase,
    color: "amber",
    gradient: "from-amber-500/20 to-amber-600/5 border-amber-500/20",
    iconColor: "text-amber-400",
  },
  {
    href: "/admin/education",
    label: "Education",
    desc: "Manage academic qualifications and certifications",
    icon: FaRocket,
    color: "emerald",
    gradient: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/20",
    iconColor: "text-emerald-400",
  },
];

export default async function AdminDashboard() {
  const { projectCount, expCount, msgCount } = await getStats();

  const stats = [
    {
      label: "New Messages",
      value: msgCount,
      icon: FaEnvelope,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      label: "Total Projects",
      value: projectCount,
      icon: FaProjectDiagram,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Experience Entries",
      value: expCount,
      icon: FaBriefcase,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      label: "Active Sections",
      value: 4,
      icon: FaRocket,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      label: "Site Status",
      value: "Live",
      icon: FaChartLine,
      color: "text-pink-400",
      bg: "bg-pink-500/10",
    },
  ];

  return (
    <div className="p-4 md:p-10 max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <div className="relative">
        <div className="absolute -left-4 top-0 w-1 h-12 bg-emerald-500 rounded-full blur-sm" />
        <h1 className="text-4xl font-black text-white tracking-tight mb-2">
          Dashboard
        </h1>
        <p className="text-slate-400 font-medium">
          Control center for your premium portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => (
          <Card
            key={s.label}
            className="bg-slate-900/40 border-white/5 backdrop-blur-xl rounded-3xl overflow-hidden group hover:border-white/10 transition-all"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${s.bg} ${s.color}`}>
                  <s.icon size={20} />
                </div>
                <Badge
                  variant="outline"
                  className="bg-white/5 border-white/10 text-[10px] uppercase tracking-wider text-slate-500"
                >
                  Overview
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-black text-white group-hover:scale-110 origin-left transition-transform duration-500">
                  {s.value}
                </p>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                  {s.label}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Sections */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Content Management
          </h2>
          <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">
            {sections.length} Sections Total
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sections.map((section, idx) => (
            <Link key={section.href} href={section.href} className="group">
              <Card
                className={`h-full bg-slate-900/40 border-white/5 backdrop-blur-xl rounded-[2rem] overflow-hidden hover:border-${section.color}-500/30 transition-all duration-500`}
              >
                <CardContent className="p-8 flex items-start gap-6">
                  <div
                    className={`p-4 rounded-2xl bg-slate-950 border border-white/5 ${section.iconColor} group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                  >
                    <section.icon size={28} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {section.label}
                      </h3>
                      <FaArrowRight className="text-slate-700 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                      {section.desc}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Tips / Footer */}
      <Card className="bg-emerald-500/5 border-emerald-500/20 rounded-[2.5rem] p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 shrink-0">
            <FaRocket size={32} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-lg font-bold text-white mb-1">
              Ready to showcase your work?
            </h3>
            <p className="text-emerald-400/60 text-sm">
              Your changes are reflected instantly on the live site. Keep your
              portfolio up-to-date to attract more opportunities!
            </p>
          </div>
          <Link href="/" target="_blank">
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl px-8 h-12 font-bold shadow-lg shadow-emerald-600/20">
              Live Preview
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
