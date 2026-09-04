"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import ProjectCard from "./ProjectCard";
import { projectsData } from "../data/projectsData";

export default function ProjectsSection() {
  const chapterRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: chapterRef,
    offset: ["start start", "end end"],
  });
  const leftPanelY = useTransform(scrollYProgress, [0.24, 0.7], ["0%", "-110%"]);
  const rightPanelY = useTransform(scrollYProgress, [0.3, 0.76], ["0%", "-110%"]);
  const firstLineX = useTransform(scrollYProgress, [0, 0.38], ["-100vw", "0vw"]);
  const secondLineX = useTransform(scrollYProgress, [0, 0.38], ["100vw", "0vw"]);
  const titleY = useTransform(scrollYProgress, [0.72, 0.92], ["0vh", "-24vh"]);
  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.035, 0.72, 0.92, 1],
    [0, 1, 1, 0.45, 0.12],
  );

  return (
    <section id="projects" className="relative -mt-[6vh] bg-black">
      <div className="sticky top-0 z-30 h-screen pointer-events-none">
        <motion.h2
          className="relative z-10 flex h-full flex-col justify-center px-5 text-[#f2ede6] [text-shadow:0.06em_0.06em_0_#111111] md:px-10"
          style={{
            opacity: reduceMotion ? 1 : titleOpacity,
            y: reduceMotion ? 0 : titleY,
          }}
        >
          <motion.span
            className="whitespace-nowrap text-[clamp(2.5rem,9.4vw,11rem)] leading-[0.8] tracking-[-0.045em] [font-family:var(--font-akira)]"
            style={{ x: reduceMotion ? 0 : firstLineX }}
          >
            WHAT I&apos;VE
          </motion.span>
          <motion.span
            className="ml-auto mt-5 block whitespace-nowrap text-right text-[clamp(2.5rem,9.4vw,11rem)] leading-[0.8] tracking-[-0.045em] [font-family:var(--font-akira)]"
            style={{ x: reduceMotion ? 0 : secondLineX }}
          >
            BEEN BUILDING
          </motion.span>
        </motion.h2>
      </div>

      <div className="-mt-[100vh]">
        <div ref={chapterRef} className="relative h-[220vh] bg-black">
          <div className="sticky top-0 h-screen overflow-hidden">
            <motion.div
              className="absolute -inset-[12%] right-[45%] w-[68%] rotate-[-4deg] bg-[#f2ede6]"
              style={{ y: reduceMotion ? 0 : leftPanelY }}
              aria-hidden="true"
            />
            <motion.div
              className="absolute -inset-[12%] left-[45%] w-[68%] rotate-[4deg] bg-[#f2ede6]"
              style={{ y: reduceMotion ? 0 : rightPanelY }}
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="relative z-40 -mt-[60vh]">
          <div className="mx-auto max-w-6xl px-4 pb-12 pt-28 md:px-8 md:pb-16 md:pt-40">
            <div className="space-y-24 md:space-y-36">
              {projectsData.projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  focus={project.focus}
                  image={project.image}
                  liveUrl={project.liveUrl}
                  index={index}
                  align={index % 2 === 0 ? "left" : "right"}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
