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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} ${geistMono.className} antialiased bg-white text-gray-900`}
      >
        <RecaptchaProvider>{children}</RecaptchaProvider>
      </body>
    </html>
  );
}
