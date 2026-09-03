"use client";

import dynamic from "next/dynamic";
import { useState, useCallback, useEffect } from "react";
import SmoothScroll from "@/shared/components/SmoothScroll";
import HeroAboutTransition from "../components/HeroAboutTransition";
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
  const [showLoader, setShowLoader] = useState(true);
  const [heroImageReady, setHeroImageReady] = useState(false);
  const [minLoaderElapsed, setMinLoaderElapsed] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "auto";
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMinLoaderElapsed(true);
    }, 650);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fallback = window.setTimeout(() => {
      setHeroImageReady(true);
    }, 2800);

    return () => window.clearTimeout(fallback);
  }, []);

  const handleLoadComplete = useCallback(() => {
    setShowLoader(false);
  }, []);

  const handleHeroImageReady = useCallback(() => {
    setHeroImageReady(true);
  }, []);

  const canDismissLoader = minLoaderElapsed && heroImageReady;

  return (
    <SmoothScroll>
      <div className="relative min-h-screen overflow-x-clip bg-stage">
        {showLoader && (
          <EntranceLoader
            shouldExit={canDismissLoader}
            onComplete={handleLoadComplete}
          />
        )}

        <div className="relative">
          <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none" />

          <main id="main-content">
            <HeroAboutTransition
              onOpenResume={() => setResumeOpen(true)}
              onHeroImageReady={handleHeroImageReady}
            />
            <AboutSection />
            {/*
            <TechStackTransition />
            <SkillsSection />
            */}
            <ProjectsSection />
            {/*
            <ContactSection />
            */}
          </main>
        </div>

        {/*
        <div>
          <Footer />
        </div>
        */}

        <button
          type="button"
          aria-label="Open chat"
          onClick={() => setChatOpen((current) => !current)}
          className={`fixed bottom-6 right-6 z-[62] hidden items-center gap-2 uppercase text-[0.72rem] tracking-[0.24em] text-white/46 transition-colors duration-300 hover:text-white/78 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black md:flex ${
            showLoader ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-current" />
          <span>ask</span>
        </button>

        <FloatingChatSheet
          isOpen={!showLoader && chatOpen}
          onClose={() => setChatOpen(false)}
        />

        <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      </div>
    </SmoothScroll>
  );
}
