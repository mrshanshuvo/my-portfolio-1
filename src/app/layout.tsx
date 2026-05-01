import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import RecaptchaProvider from "./components/RecaptchaProvider";
import { ThemeProvider } from "./components/ThemeProvider";
import { SmoothScroll } from "./components/SmoothScroll";
import CustomCursor from "./components/CustomCursor";
import type { Metadata } from "next";
import type { ReactNode } from "react";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-display" });

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

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  await connectDB();
  const settings = await Setting.findOne().lean();
  const accentColor = settings?.accentColor || "#10b981";

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300 font-sans`}
        style={{ "--dynamic-accent": accentColor } as any}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <CustomCursor />
          <SmoothScroll>
            <RecaptchaProvider>{children}</RecaptchaProvider>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
