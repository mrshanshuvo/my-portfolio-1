import { connectDB } from "@/lib/mongodb";
import BlogModel from "@/models/Blog";
import BlogClient from "./BlogClient";

async function getBlogs(): Promise<any[]> {
  await connectDB();
  const raw = await BlogModel.find().sort({ createdAt: -1 }).limit(3).lean();
  return JSON.parse(JSON.stringify(raw));
}

export default async function Blog() {
  const blogs = await getBlogs();
  if (!blogs || blogs.length === 0) return null;
  return <BlogClient blogs={blogs} />;
}
