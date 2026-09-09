import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { AskPortfolio } from "@/components/AskPortfolio";
import { GitHubActivity } from "@/components/GitHubActivity";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  const { hash } = useLocation();

  // Arriving from another route (e.g. /#projects) lands at the top otherwise.
  useEffect(() => {
    if (!hash) return;
    const target = document.querySelector(hash);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  }, [hash]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <AskPortfolio />
        <Skills />
        <GitHubActivity />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
