"use client";

import { motion } from "framer-motion";

interface HeadlineRevealProps {
  text: string;
  className?: string;
  delay?: number;
  isActive?: boolean;
}

export default function HeadlineReveal({
  text,
  className = "",
  delay = 0,
  isActive = true,
}: HeadlineRevealProps) {
  const letters = Array.from(text);

  return (
    <motion.span
      className={`inline-flex overflow-hidden ${className}`}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.045,
            delayChildren: delay,
          },
        },
      }}
      aria-label={text}
    >
      {letters.map((letter, index) => (
        <span key={`${letter}-${index}`} className="overflow-hidden">
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: {
                opacity: 0,
                y: "108%",
                filter: "blur(12px)",
                scaleY: 1.18,
              },
              visible: {
                opacity: 1,
                y: "0%",
                filter: "blur(0px)",
                scaleY: 1,
                transition: {
                  duration: 1.05,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
