"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ExperienceTimeline from "../components/ExperienceTimeline";
import AboutAsymmetricScene from "../components/AboutAsymmetricScene";
import "../styles/about.css";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "end 0.22"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.22, 1], [0, 0.68, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [92, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.955, 1]);
  const veilOpacity = useTransform(scrollYProgress, [0, 0.35, 1], [0, 0.74, 0.18]);
  const veilScaleY = useTransform(scrollYProgress, [0, 1], [0.78, 1]);
  const dividerOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.8, 1]);

  return (
    <motion.section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-black pb-28 md:pb-28"
      style={{ opacity, y, scale }}
    >
      <motion.div
        className="pointer-events-none absolute inset-x-[18%] top-0 h-[34rem] bg-[radial-gradient(circle_at_50%_0%,rgba(240,231,212,0.12),rgba(240,231,212,0.04)_28%,transparent_70%)] blur-3xl"
        style={{ opacity: veilOpacity, scaleY: veilScaleY }}
      />
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 h-[16rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.015)_28%,transparent_100%)]"
        style={{ opacity: veilOpacity }}
      />

      <div className="relative z-10 w-full">
        <AboutAsymmetricScene />

        <div className="mt-8">
          <ExperienceTimeline />
        </div>
      </div>

      <motion.div
        className="section-divider absolute bottom-0 left-0 right-0"
        style={{ opacity: dividerOpacity }}
      />
    </motion.section>
  );
}
