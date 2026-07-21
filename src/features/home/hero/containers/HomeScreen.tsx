"use client";

import dynamic from "next/dynamic";
import { useState, useCallback, useEffect } from "react";
import Navbar from "@/shared/components/Navbar";
import MobileNavbar from "@/shared/components/MobileNavbar";
import SmoothScroll from "@/shared/components/SmoothScroll";
import Spotlight from "@/shared/components/Spotlight";
import HeroContent from "../components/HeroContent";
import EntranceLoader from "@/shared/components/EntranceLoader";

const TechStackTransition = dynamic(
  () => import("@/shared/components/TechStackTransition")
);
const AboutSection = dynamic(
  () => import("@/features/home/about/containers/AboutSection")
);
const SkillsSection = dynamic(
  () => import("@/features/home/skills/containers/SkillsSection")
);
const ProjectsSection = dynamic(
  () => import("@/features/home/projects/containers/ProjectsSection")
);
const ContactSection = dynamic(
  () => import("@/features/home/contact/containers/ContactSection")
);
const Footer = dynamic(() => import("@/shared/components/Footer"));
const ResumeModal = dynamic(() => import("@/shared/components/ResumeModal"), {
  ssr: false,
});
const FloatingChatSheet = dynamic(
  () => import("@/shared/components/FloatingChatSheet"),
  { ssr: false }
);

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [heroReady, setHeroReady] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    document.body.dataset.shellReady = "false";
    document.body.style.overflow = "hidden";
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "auto";
    }

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
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setHeroReady(true);
      });
    });
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
            <HeroContent
              onOpenResume={() => setResumeOpen(true)}
              isActive={heroReady}
            />
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
          className={`fixed bottom-6 right-6 z-[62] hidden items-center gap-2 uppercase text-[0.72rem] tracking-[0.24em] text-white/46 transition-colors duration-300 hover:text-white/78 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black md:flex ${
            isLoading ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-current" />
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
