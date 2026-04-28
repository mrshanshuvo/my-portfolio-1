/**
 * Seed script — populates MongoDB with existing portfolio data.
 * Run once after setting up your MongoDB Atlas connection:
 *
 *   npx tsx scripts/seed.ts
 *
 * It will also output the bcrypt hash you need to put in ADMIN_PASSWORD_HASH.
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import "dotenv/config";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

// --- Models (inline to avoid Next.js module issues) ---
const ProjectSchema = new mongoose.Schema({
  title: String, slug: String, description: String, image: String,
  techNames: [String], github: String, live: String, featured: Boolean,
  category: String, improvements: [String], order: Number,
}, { timestamps: true });

const ExperienceSchema = new mongoose.Schema({
  title: String, org: String, duration: String, details: [String],
  color: String, type: String, order: Number,
}, { timestamps: true });

const AboutSchema = new mongoose.Schema({
  bio1: String, bio2: String, highlights: [String],
  stats: [{ number: String, label: String }],
  skills: [{ name: String, tech: String, level: Number, iconName: String }],
  techList: [String],
  education: [{ degree: String, institution: String, period: String, details: String }],
}, { timestamps: true });

const HeroSchema = new mongoose.Schema({
  name: String, lastName: String,
  typeSequences: [{ text: String, delay: Number }],
  bio: String, profileImage: String, resumeUrl: String,
  socialLinks: [{ platform: String, href: String, label: String }],
}, { timestamps: true });

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI not set in .env.local");

  await mongoose.connect(uri);
  console.log("✅ Connected to MongoDB");

  const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);
  const Experience = mongoose.models.Experience || mongoose.model("Experience", ExperienceSchema);
  const About = mongoose.models.About || mongoose.model("About", AboutSchema);
  const Hero = mongoose.models.Hero || mongoose.model("Hero", HeroSchema);

  // --- 1. Generate & print admin password hash ---
  const ADMIN_PASSWORD = "admin123"; // ← change this to your desired password
  const hash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  console.log("\n🔑 Admin Password Hash (copy to .env.local → ADMIN_PASSWORD_HASH):");
  console.log(hash);
  console.log(`   Password to use for login: "${ADMIN_PASSWORD}"\n`);

  // --- 2. Seed Projects ---
  await Project.deleteMany({});
  await Project.insertMany([
    {
      title: "Medical Camp Management System (MCMS)",
      slug: "mcms",
      description: "Full MERN stack system for managing medical camps with organizer & participant roles. Firebase Admin setup, Stripe payment, JWT authentication.",
      image: "/images/mcms.png",
      techNames: ["React", "Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
      github: "https://github.com/mrshanshuvo/mcms",
      live: "https://mcms-auth.web.app/",
      featured: true,
      category: "Full Stack",
      improvements: [
        "Implemented JWT authentication and Firebase security rules for multi-role access.",
        "Optimized database queries to reduce load times by 40%.",
        "Handled responsive design for multiple devices.",
        "Integrated Stripe payments securely.",
        "Enhanced collaboration between frontend and backend using RESTful APIs.",
      ],
      order: 0,
    },
    {
      title: "WhereIsIt",
      slug: "whereisit",
      description: "Lost & found portal for posting and recovering items. Backend API, JWT & Firebase Auth, stats tracking.",
      image: "/images/whereisit.png",
      techNames: ["React", "Node.js", "Express.js", "MongoDB", "Firebase"],
      github: "https://github.com/mrshanshuvo/whereisit",
      live: "https://simple-firebase-auth-9089a.web.app/",
      featured: true,
      category: "Full Stack",
      improvements: [
        "Developed a real-time matching system using TensorFlow.",
        "Implemented JWT auth with Firebase for secure logins.",
        "Built mobile-first responsive UI for all devices.",
        "Tracked user interactions and improved search accuracy.",
        "Learned performance optimization techniques for ML models.",
      ],
      order: 1,
    },
    {
      title: "Parcel Delivery System (ProFast)",
      slug: "profast",
      description: "Parcel tracking website with live map integration and responsive UI. Leaflet map, tracking dashboard, role-based UI.",
      image: "/images/profast.png",
      techNames: ["React", "Node.js", "Express.js", "MongoDB", "Leaflet", "Tailwind CSS"],
      github: "https://github.com/mrshanshuvo/zap-shift-client",
      live: "https://profast-94805.web.app/",
      featured: true,
      category: "Full Stack",
      improvements: [
        "Integrated Leaflet maps for real-time tracking.",
        "Optimized dashboard performance for large datasets.",
        "Implemented role-based UI for admins and users.",
        "Responsive mobile design with touch gestures.",
        "Improved delivery route calculations using geolocation APIs.",
      ],
      order: 2,
    },
    {
      title: "Car Doctor Next.js",
      slug: "car-doctor-nextjs",
      description: "Car repair booking platform with real-time scheduling and responsive UI.",
      image: "/images/car-doctor.png",
      techNames: ["Next.js", "React", "Tailwind CSS", "Node.js"],
      github: "https://github.com/mrshanshuvo/car-doctor",
      live: "https://car-doctor-nextjs-ten.vercel.app/",
      featured: false,
      category: "Full Stack",
      improvements: [
        "Implemented a real-time booking scheduler.",
        "Improved UI accessibility with ARIA attributes.",
        "Optimized API calls for faster page loads.",
        "Responsive design across desktop and mobile.",
      ],
      order: 3,
    },
    {
      title: "My Personal Portfolio",
      slug: "my-portfolio",
      description: "Explore my full-stack projects, UI/UX designs, and professional journey in one interactive place.",
      image: "/images/portfolio.png",
      techNames: ["Next.js", "React", "Tailwind CSS", "Node.js"],
      github: "https://github.com/mrshanshuvo/my-portfolio-1",
      live: "https://my-portfolio-1-five-tawny.vercel.app/",
      featured: false,
      category: "Full Stack",
      improvements: [
        "Implemented smooth animations with Framer Motion.",
        "Ensured accessibility and contrast for dark mode.",
        "Optimized image loading for faster performance.",
        "Responsive layout for mobile, tablet, and desktop.",
      ],
      order: 4,
    },
  ]);
  console.log("✅ Projects seeded");

  // --- 3. Seed Experience ---
  await Experience.deleteMany({});
  await Experience.insertMany([
    {
      title: "Frontend Web Developer",
      org: "ZenSoftLab",
      duration: "Sep 2025 - Present",
      details: [
        "Built full-stack web applications with React, Node.js, MongoDB.",
        "Implemented REST APIs & JWT authentication.",
        "Optimized frontend performance using Tailwind CSS & React hooks.",
      ],
      color: "emerald",
      type: "work",
      order: 0,
    },
    {
      title: "B.Sc. in CSE",
      org: "Green University of Bangladesh",
      duration: "2022 - 2026 (Expected)",
      details: [
        "Maintained CGPA 3.76/4.00",
        "Completed multiple web development & ML projects.",
        "Active in programming clubs and hackathons.",
      ],
      color: "blue",
      type: "education",
      order: 1,
    },
    {
      title: "Programming Hero Bootcamp",
      org: "Web Development Training",
      duration: "2023",
      details: [
        "Completed 45+ full-stack projects in React, Node.js, Django.",
        "Hands-on experience with MERN stack & Firebase integration.",
      ],
      color: "amber",
      type: "certification",
      order: 2,
    },
  ]);
  console.log("✅ Experience seeded");

  // --- 4. Seed About ---
  await About.deleteMany({});
  await About.create({
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
    techList: ["React", "Next.js", "Node.js", "Express", "MongoDB", "Python", "Django", "TensorFlow", "Git", "Tailwind CSS", "TypeScript", "PostgreSQL", "AWS", "Docker"],
    education: [
      {
        degree: "BSc in Computer Science & Engineering",
        institution: "Green University of Bangladesh",
        period: "2021 - 2024",
        details: "Specialized in Software Engineering & Machine Learning",
      },
    ],
  });
  console.log("✅ About seeded");

  // --- 5. Seed Hero ---
  await Hero.deleteMany({});
  await Hero.create({
    name: "Shahid Hasan",
    lastName: "Shuvo",
    typeSequences: [
      { text: "Full-Stack Web Developer", delay: 2000 },
      { text: "Computer Engineer", delay: 2000 },
      { text: "ML Enthusiast", delay: 2000 },
      { text: "Problem Solver", delay: 2000 },
    ],
    bio: "Crafting exceptional digital experiences with clean code and modern technologies. Specialized in building scalable web applications that make an impact.",
    profileImage: "/PP1.jpeg",
    resumeUrl: "/Resume_of_Shahid_Hasan_Shuvo.pdf",
    socialLinks: [
      { platform: "GitHub", href: "https://github.com/mrshanshuvo", label: "GitHub" },
      { platform: "LinkedIn", href: "https://linkedin.com/in/shahidhasanshovu", label: "LinkedIn" },
      { platform: "LeetCode", href: "https://leetcode.com/yourusername", label: "LeetCode" },
      { platform: "Email", href: "mailto:mrshanshuvo@gmail.com", label: "Email" },
    ],
  });
  console.log("✅ Hero seeded");

  console.log("\n🎉 All done! Your database is ready.");
  console.log("👉 Copy the ADMIN_PASSWORD_HASH above into your .env.local");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
