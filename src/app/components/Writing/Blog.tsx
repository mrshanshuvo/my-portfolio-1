import { connectDB } from "@/lib/mongodb";
import BlogModel from "@/models/Blog";
import BlogClient from "./BlogClient";

async function getBlogs() {
  await connectDB();
  const blogs = await BlogModel.find().sort({ order: 1 }).lean();
  return JSON.parse(JSON.stringify(blogs));
}

export default async function Blog() {
  const blogs = await getBlogs();
  if (!blogs || blogs.length === 0) return null;
  return <BlogClient blogs={blogs} />;
}
