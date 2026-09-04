"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { techStack } from "@/features/home/data/techStack";
import React, { useEffect, useRef, useState } from "react";
import useShouldSkipInitialEntrance from "@/features/home/hooks/useShouldSkipInitialEntrance";
import {
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiFigma,
  SiGithub,
  SiVercel,
  SiHtml5,
  SiCss3,
  SiSupabase,
  SiLaravel,
} from "react-icons/si";
import { FaReact } from "react-icons/fa";

const TechIcon = ({ name }: { name: string }) => {
  const configs: Record<
    string,
    { icon: React.ReactNode; color: string; hoverColor: string }
  > = {
    nextjs: {
      color: "#FFFFFF",
      hoverColor: "#FFFFFF",
      icon: <SiNextdotjs className="w-10 h-10" />,
    },
    typescript: {
      color: "#3178C6",
      hoverColor: "#3178C6",
      icon: <SiTypescript className="w-10 h-10" />,
    },
    react: {
      color: "#61DAFB",
      hoverColor: "#61DAFB",
      icon: <FaReact className="w-10 h-10" />,
    },
    javascript: {
      color: "#F7DF1E",
      hoverColor: "#F7DF1E",
      icon: <SiJavascript className="w-10 h-10" />,
    },
    tailwind: {
      color: "#06B6D4",
      hoverColor: "#06B6D4",
      icon: <SiTailwindcss className="w-10 h-10" />,
    },
    figma: {
      color: "#F24E1E",
      hoverColor: "#F24E1E",
      icon: <SiFigma className="w-10 h-10" />,
    },
    github: {
      color: "#FFFFFF",
      hoverColor: "#FFFFFF",
      icon: <SiGithub className="w-10 h-10" />,
    },
    vercel: {
      color: "#FFFFFF",
      hoverColor: "#FFFFFF",
      icon: <SiVercel className="w-10 h-10" />,
    },
    html: {
      color: "#E34F26",
      hoverColor: "#E34F26",
      icon: <SiHtml5 className="w-10 h-10" />,
    },
    css: {
      color: "#1572B6",
      hoverColor: "#1572B6",
      icon: <SiCss3 className="w-10 h-10" />,
    },
    supabase: {
      color: "#3ECF8E",
      hoverColor: "#3ECF8E",
      icon: <SiSupabase className="w-10 h-10" />,
    },
    laravel: {
      color: "#FF2D20",
      hoverColor: "#FF2D20",
      icon: <SiLaravel className="w-10 h-10" />,
    },
  };

  const config = configs[name] || configs.nextjs;

  return (
    <div className="relative w-20 h-20 flex items-center justify-center rounded-xl group overflow-hidden  hover:scale-105 transition-all duration-300">
      <div
        className="relative z-10 text-white/20 group-hover:text-[var(--hover-color)] transition-colors duration-300"
        style={{ "--hover-color": config.color } as React.CSSProperties}
      >
        {config.icon}
      </div>  
    </div>
  );
};

export default function TechStackTransition() {
  const [isHovered, setIsHovered] = useState(false);
  const shouldSkipEntrance = useShouldSkipInitialEntrance();
  const x = useMotionValue(0);
  const targetSpeed = useMotionValue(84);
  const smoothSpeed = useSpring(targetSpeed, {
    stiffness: 120,
    damping: 28,
    mass: 0.9,
  });
  const laneRef = useRef<HTMLDivElement>(null);
  const loopWidthRef = useRef(0);
  const marqueeStack = [
    ...techStack,
    { name: "Figma", icon: "figma", category: "design" },
    { name: "GitHub", icon: "github", category: "platform" },
    { name: "Vercel", icon: "vercel", category: "deployment" },
    { name: "HTML", icon: "html", category: "markup" },
    { name: "CSS", icon: "css", category: "styling" },
    { name: "Supabase", icon: "supabase", category: "backend" },
    { name: "Laravel", icon: "laravel", category: "backend" },
  ];
  const doubledStack = [...marqueeStack, ...marqueeStack];

  useEffect(() => {
    targetSpeed.set(isHovered ? 0 : 84);
  }, [isHovered, targetSpeed]);

  useEffect(() => {
    const measure = () => {
      if (!laneRef.current) return;
      loopWidthRef.current = laneRef.current.scrollWidth / 2;
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (laneRef.current) observer.observe(laneRef.current);

    return () => observer.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    const loopWidth = loopWidthRef.current;
    if (!loopWidth) return;

    const distance = (smoothSpeed.get() * delta) / 1000;
    let nextX = x.get() - distance;

    if (nextX <= -loopWidth) {
      nextX += loopWidth;
    }

    x.set(nextX);
  });

  return (
    <section className="relative overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 bg-black" />
      <div className="pointer-events-none absolute inset-x-[14%] top-0 h-full bg-[radial-gradient(circle_at_50%_0%,rgba(244,238,220,0.12),rgba(244,238,220,0.03)_32%,transparent_72%)] blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(240,231,212,0.28),transparent)]" />

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          ref={laneRef}
          className="flex items-center gap-20"
          style={{ x, width: "max-content", willChange: "transform" }}
        >
          {doubledStack.map((tech, index) => (
            <motion.div
              key={`${tech.name}-${index}`}
              className="flex-shrink-0"
              initial={
                shouldSkipEntrance ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                delay: shouldSkipEntrance
                  ? 0
                  : (index % marqueeStack.length) * 0.045,
                duration: 0.78,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <TechIcon name={tech.icon} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
