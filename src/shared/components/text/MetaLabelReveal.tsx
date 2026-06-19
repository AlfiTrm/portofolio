"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface MetaLabelRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "span" | "div";
  isActive?: boolean;
}

export default function MetaLabelReveal({
  children,
  className = "",
  delay = 0,
  as = "span",
  isActive = true,
}: MetaLabelRevealProps) {
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={{
        opacity: 0,
        y: 8,
        filter: "blur(6px)",
        letterSpacing: "0.34em",
      }}
      animate={
        isActive
          ? {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              letterSpacing: "0.28em",
            }
          : {
              opacity: 0,
              y: 8,
              filter: "blur(6px)",
              letterSpacing: "0.34em",
            }
      }
      transition={{
        delay,
        duration: 0.88,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Component>
  );
}
