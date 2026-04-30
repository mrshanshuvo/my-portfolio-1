import { connectDB } from "@/lib/mongodb";
import HeroModel from "@/models/Hero";
import SocialLinkModel from "@/models/SocialLink";
import type { Hero } from "@/types";
import HeroClient from "./HeroClient";

const DEFAULT_HERO: Hero = {
  name: "Shahid Hasan",
  lastName: "Shuvo",
  typeSequences: [
    { text: "Full-Stack Web Developer", delay: 2000 },
    { text: "Computer Engineer", delay: 2000 },
    { text: "ML Enthusiast", delay: 2000 },
    { text: "Problem Solver", delay: 2000 },
  ],
  bio: "Crafting exceptional digital experiences with clean code and modern technologies. Specialized in building scalable web applications that make an impact.",
  profileImage: "/PP1.jpeg",
  resumeUrl: "/Resume_of_Shahid_Hasan_Shuvo.pdf",
  socialLinks: [
    { platform: "GitHub", href: "https://github.com/mrshanshuvo", label: "GitHub" },
    { platform: "LinkedIn", href: "https://linkedin.com/in/shahidhasanshovu", label: "LinkedIn" },
    { platform: "LeetCode", href: "https://leetcode.com/yourusername", label: "LeetCode" },
    { platform: "Email", href: "mailto:mrshanshuvo@gmail.com", label: "Email" },
  ],
};

async function getHero(): Promise<Hero> {
  await connectDB();
  const [heroDoc, socialDocs] = await Promise.all([
    HeroModel.findOne().lean(),
    SocialLinkModel.find().sort({ order: 1 }).lean(),
  ]);

  if (!heroDoc) return DEFAULT_HERO;
  
  const raw = JSON.parse(JSON.stringify(heroDoc));
  const socials = JSON.parse(JSON.stringify(socialDocs));

  return {
    _id: raw._id?.toString(),
    name: raw.name ?? DEFAULT_HERO.name,
    lastName: raw.lastName ?? DEFAULT_HERO.lastName,
    typeSequences: raw.typeSequences?.length ? raw.typeSequences : DEFAULT_HERO.typeSequences,
    bio: raw.heroBio ?? raw.bio ?? DEFAULT_HERO.bio, // support both just in case
    profileImage: raw.profileImage ?? DEFAULT_HERO.profileImage,
    resumeUrl: raw.resumeUrl ?? DEFAULT_HERO.resumeUrl,
    socialLinks: socials.length ? socials : DEFAULT_HERO.socialLinks,
  };
}

export default async function Hero() {
  const hero = await getHero();
  return <HeroClient hero={hero} />;
}
