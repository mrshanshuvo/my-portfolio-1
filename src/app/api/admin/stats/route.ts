import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Stat from "@/models/Stat";

export async function GET() {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const stats = await Stat.find().sort({ order: 1 }).lean();
  return NextResponse.json(stats);
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const items: any[] = await req.json();

  await Stat.deleteMany({});
  if (items.length > 0) {
    await Stat.insertMany(
      items.map((s, i) => ({
        number: s.number,
        label: s.label,
        order: i,
        _id: undefined,
      })),
    );
  }

  return NextResponse.json({ message: "Stats saved" });
}
