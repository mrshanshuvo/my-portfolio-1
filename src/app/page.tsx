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

export default function Home() {
  return (
    <>
      <VisitorTracker />
      <Navbar />
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
      <Contact />
      <Footer />
    </>
  );
}
