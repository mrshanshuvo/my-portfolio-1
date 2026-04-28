import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Hero from "@/models/Hero";

export async function GET() {
  await connectDB();
  const hero = await Hero.findOne().lean();
  return NextResponse.json(hero ?? {}, {
    headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
  });
}
