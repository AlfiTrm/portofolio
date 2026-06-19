"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";

const storyText = `I'm a passionate Junior Frontend Developer based in Indonesia, specializing in creating beautiful and interactive web experiences. My journey started in my 4th semester when I discovered the magic of building user interfaces. I love turning complex problems into simple, beautiful, and intuitive designs. When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or enjoying a good cup of coffee.`;

export default function AboutStoryText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.35"],
  });

  const words = useMemo(() => storyText.split(" "), []);

  return (
    <div ref={containerRef} className="max-w-[36rem]">
      <p className="flex flex-wrap justify-end gap-x-2 gap-y-1 text-justify text-[0.92rem] leading-[1.9] md:text-[1rem]">
        {words.map((word, index) => {
          const start = index / words.length;
          const end = Math.min(start + 0.12, 1);
          const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
          const color = useTransform(scrollYProgress, [start, end], [
            "rgb(255 255 255 / 0.24)",
            "rgb(255 255 255 / 0.74)",
          ]);

          return (
            <motion.span key={`${word}-${index}`} style={{ opacity, color }}>
              {word}
            </motion.span>
          );
        })}
      </p>
    </div>
  );
}
