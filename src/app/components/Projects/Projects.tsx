import { connectDB } from "@/lib/mongodb";
import ProjectModel from "@/models/Project";
import type { Project } from "@/types";
import ProjectsClient from "./ProjectsClient";

async function getProjects(): Promise<Project[]> {
  await connectDB();
  const raw = await ProjectModel.find().sort({ order: 1, createdAt: -1 }).lean();
  return raw.map((p) => ({
    _id: p._id.toString(),
    title: p.title,
    slug: p.slug,
    description: p.description,
    image: p.image,
    techNames: p.techNames,
    github: p.github,
    live: p.live,
    featured: p.featured,
    category: p.category,
    improvements: p.improvements,
    order: p.order,
  }));
}

export default async function Projects() {
  const projects = await getProjects();
  return <ProjectsClient projects={projects} />;
}
