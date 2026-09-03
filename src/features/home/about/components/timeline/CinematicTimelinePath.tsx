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
        stroke="rgba(216,176,140,0.18)"
        strokeWidth="14"
        strokeLinecap="round"
        style={{
          pathLength: progress,
          filter: "blur(12px)",
        }}
      />
      <motion.path
        d={pathDefinition}
        fill="none"
        stroke="rgba(240,231,212,0.22)"
        strokeWidth="7"
        strokeLinecap="round"
        style={{
          pathLength: progress,
          filter: "blur(3px)",
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
