"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/shared/components/ScrollReveal";
import ProjectCard from "../components/ProjectCard";
import { projectsData } from "../data/projectsData";
import "../styles/projects.css";

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);

  const filteredProjects =
    activeCategory === "All"
      ? projectsData.projects
      : projectsData.projects.filter((p) => p.category === activeCategory);

  const toggleProject = (id: number) => {
    setActiveProjectId(activeProjectId === id ? null : id);
  };

  return (
    <section
      id="projects"
      className="relative py-32 px-4 md:px-8 overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-white/[0.02] rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/40 text-sm mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-white/40" />
            {projectsData.subtitle}
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="mb-20">
          <div className="flex flex-wrap justify-center gap-4 p-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full w-fit mx-auto">
            {projectsData.categories.map((category) => (
              <div key={category} className="relative">
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <button
                  onClick={() => setActiveCategory(category)}
                  className={`
                    relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 z-10
                    ${
                      activeCategory === category
                        ? "text-white"
                        : "text-white/60 hover:text-white"
                    }
                  `}
                >
                  {category}
                </button>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  image={project.image}
                  liveUrl={project.liveUrl}
                  index={index}
                  isActive={activeProjectId === project.id}
                  onToggle={() => toggleProject(project.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}
