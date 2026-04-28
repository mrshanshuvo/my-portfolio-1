"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  FaHome,
  FaProjectDiagram,
  FaBriefcase,
  FaUser,
  FaSignOutAlt,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: MdDashboard },
  { href: "/admin/hero", label: "Hero", icon: FaHome },
  { href: "/admin/about", label: "About", icon: FaUser },
  { href: "/admin/projects", label: "Projects", icon: FaProjectDiagram },
  { href: "/admin/experience", label: "Experience", icon: FaBriefcase },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0">
      {/* Brand */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-emerald-600/20 border border-emerald-500/30 rounded-lg flex items-center justify-center">
            <span className="text-emerald-400 font-bold text-sm">A</span>
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Portfolio Admin</p>
            <p className="text-slate-500 text-xs">Content Manager</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <item.icon className="text-base shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <FaExternalLinkAlt className="text-sm shrink-0" />
          View Portfolio
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-red-400 hover:bg-red-900/20 transition-all"
        >
          <FaSignOutAlt className="text-sm shrink-0" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
