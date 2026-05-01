import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Projects from "./components/Projects/Projects";
import Experience from "./components/Experience/Experience";
import Footer from "./components/Footer/Footer";
import Services from "./components/Services/Services";
import Workflow from "./components/Workflow/Workflow";
import Playground from "./components/Playground/Playground";
import Blog from "./components/Writing/Blog";
import Certifications from "./components/Education/Certifications";
import Testimonials from "./components/Testimonials/Testimonials";
import VisitorTracker from "./components/Analytics/VisitorTracker";

import { connectDB } from "@/lib/mongodb";
import SocialLinkModel from "@/models/SocialLink";
import SettingModel from "@/models/Setting";
import HeroModel from "@/models/Hero";
import type { SocialLink } from "@/types";

export default async function Home() {
  await connectDB();
  const [socialDocs, settingDoc, heroDoc] = await Promise.all([
    SocialLinkModel.find().sort({ order: 1 }).lean(),
    SettingModel.findOne().lean(),
    HeroModel.findOne().lean(),
  ]);

  const socialLinks = JSON.parse(JSON.stringify(socialDocs)) as SocialLink[];
  const contactEmail = settingDoc?.contactEmail || "mrshanshuvo@gmail.com";
  const resumeUrl = heroDoc?.resumeUrl || "/Resume_of_Shahid_Hasan_Shuvo.pdf";

  return (
    <>
      <VisitorTracker />
      <Navbar resumeUrl={resumeUrl} />
      <Hero />
      <About />
      <Services />
      <Workflow />
      <Experience />
      <Projects />
      <Playground />
      <Blog />
      <Certifications />
      <Testimonials />
      <Contact socialLinks={socialLinks} contactEmail={contactEmail} />
      <Footer socialLinks={socialLinks} />
    </>
  );
}
