import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import About from "@/models/About";

export async function GET() {
  await connectDB();
  const about = await About.findOne().lean();
  return NextResponse.json(about ?? {}, {
    headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
  });
}
