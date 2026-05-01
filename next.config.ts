import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Keep true to prevent local dev timeouts/500 errors on Windows
    remotePatterns: [
      { protocol: "https", hostname: "**" }, // Securely allows all https sources
    ],
  },
};

export default nextConfig;
