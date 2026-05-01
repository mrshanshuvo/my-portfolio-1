import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Experience from "@/models/Experience";

export async function GET() {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const entries = await Experience.find({ type: "education" })
    .sort({ order: 1 })
    .lean();

  const education = entries.map((e: any) => ({
    degree: e.title,
    institution: e.org,
    period: e.duration,
    details: Array.isArray(e.details) ? e.details[0] ?? "" : e.details ?? "",
  }));

  return NextResponse.json(education);
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const items: any[] = await req.json();

  await Experience.deleteMany({ type: "education" });
  for (let i = 0; i < items.length; i++) {
    const edu = items[i];
    await Experience.create({
      title: edu.degree,
      org: edu.institution,
      duration: edu.period,
      details: edu.details ? [edu.details] : [],
      type: "education",
      color: "blue",
      order: i,
    });
  }

  return NextResponse.json({ message: "Education saved" });
}
