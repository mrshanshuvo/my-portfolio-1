import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Hero from "@/models/Hero";
import SocialLink from "@/models/SocialLink";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const hero = await Hero.findOne().lean();
  const socialLinks = await SocialLink.find().sort({ order: 1 }).lean();
  
  return NextResponse.json({
    ...(hero ?? {}),
    socialLinks: socialLinks || [],
  });
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await request.json();
  
  const heroData = { ...body };
  const socialLinks = body.socialLinks;
  
  delete heroData._id;
  delete heroData.socialLinks;

  // 1. Update Hero
  const hero = await Hero.findOneAndUpdate({}, heroData, {
    returnDocument: "after",
    upsert: true,
    runValidators: true,
  });

  // 2. Update SocialLinks (Bulk replace for this UI)
  if (Array.isArray(socialLinks)) {
    await SocialLink.deleteMany({});
    if (socialLinks.length > 0) {
      await SocialLink.insertMany(socialLinks.map((s: any) => ({
        platform: s.platform,
        href: s.href,
        label: s.label,
        order: s.order || 0
      })));
    }
  }

  return NextResponse.json({ ...hero.toObject(), socialLinks });
}
