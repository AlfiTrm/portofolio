"use client";

import { Icon } from "@iconify/react";
import { useState, useCallback, useEffect } from "react";
import Navbar from "@/shared/components/Navbar";
import MobileNavbar from "@/shared/components/MobileNavbar";
import SmoothScroll from "@/shared/components/SmoothScroll";
import Footer from "@/shared/components/Footer";
import Spotlight from "@/shared/components/Spotlight";
import ResumeModal from "@/shared/components/ResumeModal";
import FloatingChatSheet from "@/shared/components/FloatingChatSheet";
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
  const [chatOpen, setChatOpen] = useState(false);

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
            <HeroContent onOpenResume={() => setResumeOpen(true)} />
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

        <button
          type="button"
          aria-label="Open chat"
          onClick={() => setChatOpen((current) => !current)}
          className={`fixed bottom-6 right-6 z-[62] hidden items-center gap-2 uppercase text-[0.68rem] tracking-[0.24em] text-white/46 transition-colors duration-300 hover:text-white/78 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black md:flex ${
            isLoading ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <Icon icon="iconoir:spark-solid" className="text-[0.82rem]" />
          <span>ask</span>
        </button>

        <FloatingChatSheet
          isOpen={!isLoading && chatOpen}
          onClose={() => setChatOpen(false)}
        />

        <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      </div>
    </SmoothScroll>
  );
}
