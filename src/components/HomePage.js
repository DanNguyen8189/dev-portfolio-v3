import Header from "./Hero";
import About from "./About";
import Experience from "./Experience";
import Projects from "./Projects";
import Contact from "./Contact";
import Footer from "./Footer";

export default function HomePage({ color }) {
  return (
    <>
      <Header color={color} />
      <About color={color} />
      <Experience color={color} />
      <Projects color={color} />
      <Contact color={color} />
      <Footer />
    </>
  );
}