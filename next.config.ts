import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Unsplash
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "unsplash.com" },
      // Cloudinary
      { protocol: "https", hostname: "res.cloudinary.com" },
      // GitHub
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      // Google APIs / Drive
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "storage.googleapis.com" },
      // Imgur
      { protocol: "https", hostname: "i.imgur.com" },
      // Pexels
      { protocol: "https", hostname: "images.pexels.com" },
      // ibb / imgbb (common free image hosts)
      { protocol: "https", hostname: "i.ibb.co" },
      // Placeholder services
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "i.pravatar.cc" },
    ],
  },
};

export default nextConfig;
