import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Hero from "@/models/Hero";
import About from "@/models/About";
import SocialLink from "@/models/SocialLink";
import Skill from "@/models/Skill";
import Stat from "@/models/Stat";

export async function GET() {
  await connectDB();
  
  const [hero, about, socialLinks, skills, stats] = await Promise.all([
    Hero.findOne().lean(),
    About.findOne().lean(),
    SocialLink.find().sort({ order: 1 }).lean(),
    Skill.find().sort({ order: 1 }).lean(),
    Stat.find().sort({ order: 1 }).lean(),
  ]);

  const profile = {
    ...(hero || {}),
    ...(about || {}),
    socialLinks: socialLinks || [],
    skills: skills || [],
    stats: stats || [],
  };

  return NextResponse.json(profile, {
    headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
  });
}
