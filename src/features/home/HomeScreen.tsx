"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import SmoothScroll from "@/shared/components/motion/SmoothScroll";
import Navbar from "@/shared/components/layout/Navbar";
import MobileNavbar from "@/shared/components/layout/MobileNavbar";
import HeroAboutTransition from "./hero/components/HeroAboutTransition";

/*
const AboutSection = dynamic(
  () => import("@/features/home/about/components/AboutSection")
);
*/
const ProjectsSection = dynamic(
  () => import("@/features/home/projects/components/ProjectsSection")
);
const ResumeModal = dynamic(
  () => import("@/features/resume/components/ResumeModal"),
  { ssr: false }
);
const FloatingChatSheet = dynamic(
  () => import("@/features/chat/components/FloatingChatSheet"),
  { ssr: false }
);

export default function HomeScreen() {
  const [pageReady, setPageReady] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "auto";
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    let firstFrame = 0;
    let secondFrame = 0;

    const revealPage = () => {
      void document.fonts.ready.then(() => {
        if (cancelled) return;

        firstFrame = window.requestAnimationFrame(() => {
          secondFrame = window.requestAnimationFrame(() => {
            if (!cancelled) setPageReady(true);
          });
        });
      });
    };

    if (document.readyState === "complete") revealPage();
    else window.addEventListener("load", revealPage, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", revealPage);
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, []);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen overflow-x-clip bg-stage">
        <Navbar className="mix-blend-difference" />
        <MobileNavbar className="mix-blend-difference" />
        <div className="relative">
          <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none" />

          <main id="main-content">
            <HeroAboutTransition
              isReady={pageReady}
              onOpenResume={() => setResumeOpen(true)}
            />
            {/*
            <AboutSection />
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
          className={`fixed bottom-6 right-6 z-[62] hidden items-center gap-2 uppercase text-[0.72rem] tracking-[0.24em] text-white/46 transition-[color,opacity,transform] duration-700 hover:text-white/78 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black md:flex ${
            pageReady
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-2 opacity-0"
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-current" />
          <span>ask</span>
        </button>

        <FloatingChatSheet
          isOpen={chatOpen}
          onClose={() => setChatOpen(false)}
        />

        <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      </div>
    </SmoothScroll>
  );
}
