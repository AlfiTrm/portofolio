"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import type {
  TimelineCategory,
  TimelineMilestone,
} from "../../data/timelineData";

type CinematicTimelineMilestoneProps = {
  entry: TimelineMilestone;
  progress: MotionValue<number>;
  progressRange: [number, number];
  side: "left" | "right";
  top: string;
};

const categoryLabel: Record<TimelineCategory, string> = {
  education: "education",
  organization: "organization",
  hackathon: "hackathon",
  contract: "contract",
  internship: "internship",
  personal: "personal",
};

export default function CinematicTimelineMilestone({
  entry,
  progress,
  progressRange,
  side,
  top,
}: CinematicTimelineMilestoneProps) {
  const activeProgress = useTransform(progress, progressRange, [0, 1]);
  const opacity = useTransform(activeProgress, [0, 1], [0.24, 1]);
  const y = useTransform(activeProgress, [0, 1], [34, 0]);
  const scale = useTransform(activeProgress, [0, 1], [0.985, 1]);
  const textGlow = useTransform(
    activeProgress,
    [0, 1],
    [
      "0 0 0 rgba(240,231,212,0)",
      "0 0 22px rgba(240,231,212,0.16)",
    ]
  );
  const nodeGlow = useTransform(
    activeProgress,
    [0, 1],
    [
      "0 0 0 rgba(240,231,212,0)",
      "0 0 30px rgba(240,231,212,0.42)",
    ]
  );

  return (
    <motion.article
      className={[
        "absolute left-0 right-0 px-5 md:w-[41%] md:px-0",
        side === "left" ? "md:left-0 md:right-auto md:pr-14" : "md:right-0 md:left-auto md:pl-14",
      ].join(" ")}
      style={{ top, opacity, y, scale }}
    >
      <motion.div
        className={[
          "relative ml-12 border-l border-white/8 pl-7 text-left md:ml-0 md:border-l-0 md:pl-0",
          side === "left" ? "md:text-right" : "md:text-left",
        ].join(" ")}
      >
        <motion.span
          className={[
            "absolute left-0 top-3 h-[0.9rem] w-[0.9rem] -translate-x-1/2 rounded-full border border-[#f0e7d4]/28 bg-black",
            side === "left"
              ? "md:left-auto md:right-[-3.7rem] md:translate-x-1/2"
              : "md:left-[-3.7rem] md:right-auto",
          ].join(" ")}
          style={{ boxShadow: nodeGlow }}
        />
        <span
          className={[
            "absolute left-0 top-[1rem] h-px w-8 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(240,231,212,0.7))]",
            side === "left"
              ? "hidden md:block md:left-auto md:right-[-0.65rem] md:w-12 md:translate-x-full md:bg-[linear-gradient(90deg,rgba(240,231,212,0.7),transparent)]"
              : "md:w-12",
          ].join(" ")}
        />
        <motion.div style={{ textShadow: textGlow }}>
          <h3 className="max-w-[17rem] text-[1.15rem] leading-[0.92] tracking-[0.02em] text-[#f0e7d4] md:max-w-none md:text-[1.95rem] [font-family:var(--font-akira)]">
            {entry.title}
          </h3>
          <p className="mt-2 text-[0.7rem] tracking-[0.22em] text-white/42 md:text-[0.74rem]">
            {entry.timeLabel} - {categoryLabel[entry.category]}
          </p>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}
