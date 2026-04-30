import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import About from "@/models/About";
import Skill from "@/models/Skill";
import Stat from "@/models/Stat";
import Experience from "@/models/Experience";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const about = await About.findOne().lean();
  const [skills, stats, education] = await Promise.all([
    Skill.find().sort({ order: 1 }).lean(),
    Stat.find().sort({ order: 1 }).lean(),
    Experience.find({ type: "education" }).sort({ order: 1 }).lean(),
  ]);

  return NextResponse.json({
    ...(about ?? {}),
    bio1: (about?.aboutBio || "").split("\n\n")[0] || "",
    bio2: (about?.aboutBio || "").split("\n\n").slice(1).join("\n\n") || "",
    skills: skills || [],
    stats: stats || [],
    education: education.map((edu: any) => ({
      degree: edu.title,
      institution: edu.org,
      period: edu.duration,
      details: Array.isArray(edu.details) ? edu.details[0] : edu.details,
    })),
  });
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await request.json();

  // 1. Update About
  const aboutData = {
    aboutBio: `${body.bio1 || ""}\n\n${body.bio2 || ""}`.trim(),
    highlights: body.highlights || [],
    techList: body.techList || [],
  };
  const about = await About.findOneAndUpdate({}, aboutData, {
    new: true,
    upsert: true,
    runValidators: true,
  });

  // 2. Update Skills
  if (Array.isArray(body.skills)) {
    await Skill.deleteMany({});
    if (body.skills.length > 0) {
      await Skill.insertMany(body.skills.map((s: any) => ({
        name: s.name,
        tech: s.tech,
        level: s.level,
        iconName: s.iconName,
        order: s.order || 0
      })));
    }
  }

  // 3. Update Stats
  if (Array.isArray(body.stats)) {
    await Stat.deleteMany({});
    if (body.stats.length > 0) {
      await Stat.insertMany(body.stats.map((s: any) => ({
        number: s.number,
        label: s.label,
        order: s.order || 0
      })));
    }
  }

  // 4. Update Education
  if (Array.isArray(body.education)) {
    await Experience.deleteMany({ type: "education" });
    for (const edu of body.education) {
      await Experience.create({
        title: edu.degree,
        org: edu.institution,
        duration: edu.period,
        details: [edu.details],
        type: "education",
        color: "blue",
        order: 0,
      });
    }
  }

  return NextResponse.json({ success: true, about });
}
