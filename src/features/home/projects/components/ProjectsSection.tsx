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
  const curtainY = useTransform(scrollYProgress, [0.3, 0.72], ["100%", "0%"]);
  const firstLineX = useTransform(scrollYProgress, [0, 0.28], ["-12vw", "0vw"]);
  const secondLineX = useTransform(scrollYProgress, [0, 0.28], ["12vw", "0vw"]);
  const titleY = useTransform(scrollYProgress, [0.72, 0.92], ["0vh", "-24vh"]);
  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.035, 0.72, 0.92, 1],
    [0, 1, 1, 0.45, 0.12],
  );

  return (
    <section
      className="relative bg-black"
    >
      <div className="sticky top-0 z-30 h-screen pointer-events-none">
        <motion.h2
          className="relative z-10 flex h-full flex-col justify-center px-5 text-[#f2ede6] [-webkit-text-stroke:clamp(2px,0.22vw,4px)_#111111] [paint-order:stroke_fill] md:px-10"
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
        <div ref={chapterRef} className="relative h-[220vh] bg-[#f2ede6]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-black"
            style={{ y: reduceMotion ? 0 : curtainY }}
            aria-hidden="true"
          />
        </div>
        </div>

        <div id="projects" className="relative z-40 -mt-[60vh]">
          <div className="mx-auto max-w-6xl px-4 py-28 md:px-8 md:py-40">
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
