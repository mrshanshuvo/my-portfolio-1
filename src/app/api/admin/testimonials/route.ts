import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

export async function GET() {
  try {
    await connectDB();
    const data = await Testimonial.find().sort({ order: 1 });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const testimonials = await req.json();

    // Bulk replace
    await Testimonial.deleteMany({});
    if (testimonials.length > 0) {
      await Testimonial.insertMany(
        testimonials.map((t: any, i: number) => ({
          ...t,
          order: i,
          _id: undefined, // Let MongoDB generate new IDs for simplicity in bulk replace
        }))
      );
    }

    return NextResponse.json({ message: "Saved" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
