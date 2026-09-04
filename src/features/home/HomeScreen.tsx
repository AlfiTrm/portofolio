"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import SmoothScroll from "@/shared/components/motion/SmoothScroll";
import Navbar from "@/shared/components/layout/Navbar";
import MobileNavbar from "@/shared/components/layout/MobileNavbar";
import HeroAboutTransition from "./hero/components/HeroAboutTransition";

type EntranceState = "checking" | "playing" | "ready";
const entranceStorageKey = "tsan-portfolio-entrance-seen";

/*
const AboutSection = dynamic(
  () => import("@/features/home/about/components/AboutSection")
);
*/
const ProjectsSection = dynamic(
  () => import("@/features/home/projects/components/ProjectsSection")
);
const ContactSection = dynamic(
  () => import("@/features/home/contact/components/ContactSection")
);
const ExploringSection = dynamic(
  () => import("@/features/home/exploring/components/ExploringSection")
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
  const [entranceState, setEntranceState] = useState<EntranceState>("checking");
  const [resumeOpen, setResumeOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "auto";
    }

    const frame = window.requestAnimationFrame(() => {
      const seen = window.localStorage.getItem(entranceStorageKey) === "true";

      if (seen) {
        setEntranceState("ready");
        return;
      }

      window.localStorage.setItem(entranceStorageKey, "true");
      setEntranceState("playing");
    });

    return () => window.cancelAnimationFrame(frame);
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

  useEffect(() => {
    const toggleChat = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== "k") return;

      event.preventDefault();
      if (pageReady && entranceState === "ready") {
        setChatOpen((current) => !current);
      }
    };

    window.addEventListener("keydown", toggleChat);
    return () => window.removeEventListener("keydown", toggleChat);
  }, [entranceState, pageReady]);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen overflow-x-clip bg-stage">
        <Navbar
          className={`mix-blend-difference transition-opacity duration-700 ${
            entranceState === "ready" ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />
        <MobileNavbar
          className={`mix-blend-difference transition-opacity duration-700 ${
            entranceState === "ready" ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />
        <div className="relative">
          <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none" />

          <main id="main-content">
            <HeroAboutTransition
              isReady={pageReady}
              entranceState={entranceState}
              onEntranceComplete={() => setEntranceState("ready")}
              onOpenResume={() => setResumeOpen(true)}
            />
            {/*
            <AboutSection />
            <TechStackTransition />
            <SkillsSection />
            */}
            <ProjectsSection />
            <ExploringSection />
            <ContactSection />
          </main>
        </div>

        {/*
        <div>
          <Footer />
        </div>
        */}

        <button
          type="button"
          aria-label={chatOpen ? "Close chat" : "Open chat"}
          aria-expanded={chatOpen}
          onClick={() => setChatOpen((current) => !current)}
          className={`group fixed bottom-6 right-6 z-[62] hidden cursor-pointer items-center uppercase text-[0.72rem] tracking-[0.24em] text-white/46 transition-[color,opacity,transform] duration-700 hover:text-white/78 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black md:flex ${
            pageReady && entranceState === "ready"
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-2 opacity-0"
          }`}
        >
          <kbd className="pointer-events-none absolute right-0 bottom-full mb-2 whitespace-nowrap font-mono text-[0.62rem] tracking-[0.08em] text-white/38 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
            ctrl k
          </kbd>
          <span>ask me</span>
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
