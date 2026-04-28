import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Experience from "@/models/Experience";

export async function GET() {
  await connectDB();
  const experiences = await Experience.find().sort({ order: 1 }).lean();
  return NextResponse.json(experiences, {
    headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
  });
}
