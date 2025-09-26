import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Projects from "./components/Projects/Projects";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
    </>
  );
}
