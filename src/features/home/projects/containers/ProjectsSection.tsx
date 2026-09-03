"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/shared/components/ScrollReveal";
import ProjectCard from "../components/ProjectCard";
import { projectsData } from "../data/projectsData";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative overflow-visible bg-black px-4 py-32 md:px-8 md:py-40"
    >
      <div className="absolute left-1/2 top-[-12rem] h-[46rem] w-[64rem] -translate-x-1/2 rounded-full bg-[#f0e7d4]/[0.045] blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(240,231,212,0.05),transparent)]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <ScrollReveal className="mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="grid gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(16rem,0.42fr)] md:items-end"
          >
            <h2 className="max-w-3xl text-balance text-[clamp(3rem,8vw,7rem)] leading-[0.82] tracking-[-0.03em] text-[#f0e7d4] [font-family:var(--font-akira)]">
              Work that survived the handoff.
            </h2>
            <p className="max-w-[24rem] text-pretty text-base leading-[1.75] text-[#f0e7d4]/56 md:justify-self-end">
              {projectsData.subtitle}
            </p>
          </motion.div>
        </ScrollReveal>

        <div className="space-y-24 md:space-y-36">
          {projectsData.projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              period={project.period}
              focus={project.focus}
              description={project.description}
              tags={project.tags}
              image={project.image}
              liveUrl={project.liveUrl}
              index={index}
              align={index % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}
