"use client";

import { motion, type MotionValue } from "framer-motion";

type CinematicTimelinePathProps = {
  className?: string;
  pathDefinition: string;
  progress: MotionValue<number>;
  viewBox: string;
};

export default function CinematicTimelinePath({
  className,
  pathDefinition,
  progress,
  viewBox,
}: CinematicTimelinePathProps) {
  return (
    <svg
      viewBox={viewBox}
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d={pathDefinition}
        fill="none"
        stroke="rgba(240,231,212,0.08)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <motion.path
        d={pathDefinition}
        fill="none"
        stroke="rgba(240,231,212,0)"
        strokeWidth="9"
        strokeLinecap="round"
        style={{
          pathLength: progress,
          filter: "blur(8px)",
        }}
      />
      <motion.path
        d={pathDefinition}
        fill="none"
        stroke="rgba(240,231,212,0.92)"
        strokeWidth="3.4"
        strokeLinecap="round"
        style={{ pathLength: progress }}
      />
    </svg>
  );
}
