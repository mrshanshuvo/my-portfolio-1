import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Demo from "@/models/Demo";

export async function GET() {
  try {
    await connectDB();
    const data = await Demo.find().sort({ order: 1 });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const items = await req.json();
    await Demo.deleteMany({});
    if (items.length > 0) {
      await Demo.insertMany(
        items.map((it: any, i: number) => ({
          ...it,
          order: i,
          _id: undefined,
        })),
      );
    }
    return NextResponse.json({ message: "Saved" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
