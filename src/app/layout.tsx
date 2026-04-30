import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RecaptchaProvider from "./components/RecaptchaProvider";
import type { Metadata } from "next";
import type { ReactNode } from "react";

const geistSans = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

import { connectDB } from "@/lib/mongodb";
import Setting from "@/models/Setting";

export async function generateMetadata(): Promise<Metadata> {
  await connectDB();
  const settings = await Setting.findOne().lean();

  return {
    title: settings?.siteName || "Shahid Hasan Shuvo – Portfolio",
    description:
      settings?.siteDescription || "Full-Stack Developer & ML Enthusiast",
    openGraph: {
      title: settings?.siteName,
      description: settings?.siteDescription,
      images: settings?.ogImage ? [settings.ogImage] : [],
    },
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  await connectDB();
  const settings = await Setting.findOne().lean();
  const accentColor = settings?.accentColor || "#10b981";

  return (
    <html lang="en">
      <body
        className={`${geistSans.className} ${geistMono.className} antialiased bg-white text-gray-900`}
        style={{ "--dynamic-accent": accentColor } as any}
      >
        <RecaptchaProvider>{children}</RecaptchaProvider>
      </body>
    </html>
  );
}
