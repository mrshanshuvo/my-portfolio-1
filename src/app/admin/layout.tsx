import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import AdminSidebar from "./components/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin · Portfolio",
  robots: "noindex",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <div className="dark flex min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30 selection:text-emerald-200">
        {/* Ambient Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.05),transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.05),transparent_50%)]" />
        </div>

        <AdminSidebar />
        <main className="flex-1 relative z-10 overflow-auto custom-scrollbar" data-lenis-prevent>
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}
