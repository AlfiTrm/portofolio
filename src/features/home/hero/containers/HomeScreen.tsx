"use client";

import { useState, useCallback, useEffect } from "react";
import Navbar from "@/shared/components/Navbar";
import MobileNavbar from "@/shared/components/MobileNavbar";
import SmoothScroll from "@/shared/components/SmoothScroll";
import Footer from "@/shared/components/Footer";
import Spotlight from "@/shared/components/Spotlight";
import ResumeModal from "@/shared/components/ResumeModal";
import TechStackTransition from "@/shared/components/TechStackTransition";
import HeroContent from "../components/HeroContent";
import AboutSection from "@/features/home/about/containers/AboutSection";
import SkillsSection from "@/features/home/skills/containers/SkillsSection";
import ProjectsSection from "@/features/home/projects/containers/ProjectsSection";
import ContactSection from "@/features/home/contact/containers/ContactSection";

import EntranceLoader from "@/shared/components/EntranceLoader";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    document.body.dataset.shellReady = "false";
    document.body.style.overflow = "hidden";
    window.scrollTo({ top: 0, behavior: "auto" });

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";
  }, [isLoading]);

  const handleLoadComplete = useCallback(() => {
    document.body.dataset.shellReady = "true";
    document.body.style.overflow = "";
    setIsLoading(false);
  }, []);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-black overflow-hidden">
        {isLoading && <EntranceLoader onComplete={handleLoadComplete} />}

        <div
          className={`relative transition-opacity duration-500 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          aria-hidden={isLoading}
        >
          <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none" />
          <Spotlight />

          <Navbar onOpenResume={() => setResumeOpen(true)} />
          <MobileNavbar onOpenResume={() => setResumeOpen(true)} />

          <main id="main-content">
            <HeroContent />
            <TechStackTransition />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
          </main>
        </div>

        <div
          className={`transition-opacity duration-500 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          aria-hidden={isLoading}
        >
          <Footer />
        </div>
        <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      </div>
    </SmoothScroll>
  );
}
