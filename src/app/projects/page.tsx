import { connectDB } from "@/lib/mongodb";
import ProjectModel from "@/models/Project";
import type { Project } from "@/types";
import ProjectsArchiveClient from "./ProjectsArchiveClient";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import HeroModel from "@/models/Hero";
import SocialLinkModel from "@/models/SocialLink";

async function getProjects(): Promise<Project[]> {
  await connectDB();
  const raw = await ProjectModel.find().sort({ order: 1, createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(raw));
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  
  // Need these for Navbar and Footer consistency
  const [heroDoc, socialDocs] = await Promise.all([
    HeroModel.findOne().lean(),
    SocialLinkModel.find().sort({ order: 1 }).lean(),
  ]);

  const resumeUrl = heroDoc?.resumeUrl || "/Resume_of_Shahid_Hasan_Shuvo.pdf";
  const socialLinks = JSON.parse(JSON.stringify(socialDocs));

  return (
    <>
      <Navbar resumeUrl={resumeUrl} />
      <ProjectsArchiveClient projects={projects} />
      <Footer socialLinks={socialLinks} />
    </>
  );
}
