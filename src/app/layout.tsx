import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RecaptchaProvider from "./components/RecaptchaProvider";
import type { Metadata } from "next";
import type { ReactNode } from "react";

const geistSans = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shahid Hasan Shuvo – Portfolio",
  description: "Portfolio of Shuvo, Full-Stack Developer & ML Enthusiast",
};

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
