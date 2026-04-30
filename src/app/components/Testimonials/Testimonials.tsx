import { connectDB } from "@/lib/mongodb";
import TestimonialModel from "@/models/Testimonial";
import TestimonialsClient from "./TestimonialsClient";

async function getTestimonials() {
  await connectDB();
  const testimonials = await TestimonialModel.find().sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(testimonials));
}

export default async function Testimonials() {
  const testimonials = await getTestimonials();
  if (!testimonials || testimonials.length === 0) return null;
  return <TestimonialsClient testimonials={testimonials} />;
}
