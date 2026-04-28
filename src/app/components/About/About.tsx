import { connectDB } from "@/lib/mongodb";
import AboutModel from "@/models/About";
import type { About } from "@/types";
import AboutClient from "./AboutClient";

const DEFAULT_ABOUT: About = {
  bio1: "I'm a passionate Computer Science & Engineering student at Green University of Bangladesh, specializing in full-stack development and machine learning.",
  bio2: "With over 2 years of experience, I've mastered technologies like React, Node.js, Django, TensorFlow, and more.",
  highlights: [
    "Building scalable full-stack applications",
    "Machine Learning & AI integration",
    "Clean code & best practices advocate",
    "Continuous learner & tech enthusiast",
  ],
  stats: [
    { number: "20+", label: "Projects Completed" },
    { number: "2+", label: "Years Experience" },
    { number: "10+", label: "Technologies" },
    { number: "5", label: "Certifications" },
  ],
  skills: [
    { name: "Frontend", tech: "React, Next.js, JavaScript", level: 90, iconName: "SiReact" },
    { name: "Backend", tech: "Node.js, Express, Django", level: 85, iconName: "SiNodedotjs" },
    { name: "Database", tech: "MongoDB, MySQL, Firebase", level: 80, iconName: "FaDatabase" },
    { name: "DevOps", tech: "Netlify, Docker, Vercel", level: 75, iconName: "FaCloud" },
    { name: "ML/AI", tech: "TensorFlow, PyTorch, Scikit-learn", level: 70, iconName: "SiTensorflow" },
    { name: "Other", tech: "Python, Java, C++", level: 85, iconName: "FaRobot" },
  ],
  techList: [
    "React", "Next.js", "Node.js", "Express", "MongoDB", "Python",
    "Django", "TensorFlow", "Git", "Tailwind CSS", "TypeScript", "PostgreSQL", "AWS", "Docker",
  ],
  education: [
    {
      degree: "BSc in Computer Science & Engineering",
      institution: "Green University of Bangladesh",
      period: "2021 - 2024",
      details: "Specialized in Software Engineering & Machine Learning",
    },
  ],
};

async function getAbout(): Promise<About> {
  await connectDB();
  const rawDoc = await AboutModel.findOne().lean();
  if (!rawDoc) return DEFAULT_ABOUT;
  const raw = JSON.parse(JSON.stringify(rawDoc));
  return {
    _id: raw._id?.toString(),
    bio1: raw.bio1 ?? DEFAULT_ABOUT.bio1,
    bio2: raw.bio2 ?? DEFAULT_ABOUT.bio2,
    highlights: raw.highlights?.length ? raw.highlights : DEFAULT_ABOUT.highlights,
    stats: raw.stats?.length ? raw.stats : DEFAULT_ABOUT.stats,
    skills: raw.skills?.length ? raw.skills : DEFAULT_ABOUT.skills,
    techList: raw.techList?.length ? raw.techList : DEFAULT_ABOUT.techList,
    education: raw.education?.length ? raw.education : DEFAULT_ABOUT.education,
  };
}

export default async function About() {
  const about = await getAbout();
  return <AboutClient about={about} />;
}
