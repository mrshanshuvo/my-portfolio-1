import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import SocialLink from "@/models/SocialLink";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const socials = await SocialLink.find().sort({ order: 1 }).lean();
  return NextResponse.json(socials);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await request.json();
  const social = await SocialLink.create(body);
  return NextResponse.json(social);
}

// Bulk update for simplicity in current UI
export async function PUT(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await request.json(); // Array of socials
  
  if (Array.isArray(body)) {
    await SocialLink.deleteMany({});
    const socials = await SocialLink.insertMany(body);
    return NextResponse.json(socials);
  }
  
  return NextResponse.json({ error: "Invalid data" }, { status: 400 });
}
