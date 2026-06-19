"use client";

import { motion } from "framer-motion";

interface BodyLineRevealProps {
  lines: string[];
  className?: string;
  delay?: number;
  lineClassName?: string;
  isActive?: boolean;
}

export default function BodyLineReveal({
  lines,
  className = "",
  delay = 0,
  lineClassName = "",
  isActive = true,
}: BodyLineRevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.12,
            delayChildren: delay,
          },
        },
      }}
    >
      {lines.map((line, index) => (
        <span key={`${line}-${index}`} className="block overflow-hidden">
          <motion.span
            className={`block will-change-transform ${lineClassName}`}
            variants={{
              hidden: {
                opacity: 0,
                y: 18,
                filter: "blur(8px)",
              },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}
