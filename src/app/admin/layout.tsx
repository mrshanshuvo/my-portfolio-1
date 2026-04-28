import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import AdminSidebar from "./components/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin · Portfolio",
  robots: "noindex",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="flex min-h-screen bg-slate-950 text-white">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}
