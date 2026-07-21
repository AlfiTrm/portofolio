"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/shared/components/ScrollReveal";
import ProjectCard from "../components/ProjectCard";
import { projectsData } from "../data/projectsData";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden px-4 py-32 md:px-8"
    >
      <div className="absolute left-1/2 top-0 h-[42rem] w-[52rem] -translate-x-1/2 rounded-full bg-white/[0.03] blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <ScrollReveal className="mb-18 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(16rem,0.42fr)] md:items-end"
          >
            <h2 className="max-w-3xl text-balance text-5xl font-semibold leading-[0.9] text-white md:text-7xl">
              Work
            </h2>
            <p className="max-w-[28rem] text-pretty text-sm leading-relaxed text-white/52 md:justify-self-end md:text-[0.98rem]">
              {projectsData.subtitle}
            </p>
          </motion.div>
        </ScrollReveal>

        <div className="space-y-20 md:space-y-28">
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
