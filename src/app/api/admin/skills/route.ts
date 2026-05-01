import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Skill from "@/models/Skill";

export async function GET() {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const skills = await Skill.find().sort({ order: 1 }).lean();
  return NextResponse.json(skills);
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const items: any[] = await req.json();

  await Skill.deleteMany({});
  if (items.length > 0) {
    await Skill.insertMany(
      items.map((s, i) => ({
        name: s.name,
        tech: s.tech,
        level: s.level,
        iconName: s.iconName,
        order: i,
        _id: undefined,
      })),
    );
  }

  return NextResponse.json({ message: "Skills saved" });
}
