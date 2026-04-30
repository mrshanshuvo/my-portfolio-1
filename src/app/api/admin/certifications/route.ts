import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Certification from "@/models/Certification";

export async function GET() {
  try {
    await connectDB();
    const data = await Certification.find().sort({ order: 1 });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const certifications = await req.json();

    await Certification.deleteMany({});
    if (certifications.length > 0) {
      await Certification.insertMany(
        certifications.map((c: any, i: number) => ({
          ...c,
          order: i,
          _id: undefined,
        }))
      );
    }

    return NextResponse.json({ message: "Saved" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
