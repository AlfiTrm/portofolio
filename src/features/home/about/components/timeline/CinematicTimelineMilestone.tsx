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
  const opacity = useTransform(activeProgress, [0, 1], [0.34, 1]);
  const y = useTransform(activeProgress, [0, 1], [24, 0]);
  const scale = useTransform(activeProgress, [0, 1], [0.97, 1]);
  const titleColor = useTransform(
    activeProgress,
    [0, 1],
    ["rgba(240,231,212,0.36)", "rgba(240,231,212,0.96)"]
  );
  const noteOpacity = useTransform(activeProgress, [0, 0.72, 1], [0, 0.18, 1]);
  const noteY = useTransform(activeProgress, [0, 1], [14, 0]);
  const railOpacity = useTransform(activeProgress, [0, 1], [0.18, 0.86]);
  const spotlightOpacity = useTransform(activeProgress, [0, 0.55, 1], [0, 0.08, 0.24]);
  const proofOpacity = useTransform(activeProgress, [0, 0.66, 1], [0, 0, 1]);
  const proofX = useTransform(activeProgress, [0, 1], [side === "left" ? 12 : -12, 0]);
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
          "relative ml-12 pl-7 text-left md:ml-0 md:pl-0",
          side === "left" ? "md:text-right" : "md:text-left",
        ].join(" ")}
      >
        <motion.span
          className={[
            "pointer-events-none absolute top-[-3.5rem] h-44 w-80 bg-[radial-gradient(circle_at_50%_50%,rgba(240,231,212,0.24),rgba(240,231,212,0.06)_36%,transparent_72%)] blur-2xl",
            side === "left" ? "right-[-3rem]" : "left-[-3rem]",
          ].join(" ")}
          style={{ opacity: spotlightOpacity }}
          aria-hidden="true"
        />
        <motion.span
          className={[
            "absolute left-0 top-0 h-full w-px -translate-x-1/2 bg-[linear-gradient(180deg,transparent,rgba(240,231,212,0.62)_18%,rgba(240,231,212,0.24)_74%,transparent)] md:hidden",
          ].join(" ")}
          style={{ opacity: railOpacity }}
          aria-hidden="true"
        />
        <motion.span
          className={[
            "absolute left-0 top-3 h-[0.9rem] w-[0.9rem] -translate-x-1/2 rounded-full bg-[#050505] shadow-[inset_0_0_0_1px_rgba(240,231,212,0.24)]",
            side === "left"
              ? "md:left-auto md:right-[-3.7rem] md:translate-x-1/2"
              : "md:left-[-3.7rem] md:right-auto",
          ].join(" ")}
          style={{ boxShadow: nodeGlow }}
        />
        <span
          className={[
            "absolute left-0 top-[1rem] h-px w-8 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(240,231,212,0.76))]",
            side === "left"
              ? "hidden md:block md:left-auto md:right-[-0.65rem] md:w-12 md:translate-x-full md:bg-[linear-gradient(90deg,rgba(240,231,212,0.7),transparent)]"
              : "md:w-12",
          ].join(" ")}
        />
        <motion.div className="relative" style={{ textShadow: textGlow }}>
          <span
            className={[
              "mb-4 inline-flex text-[0.72rem] leading-none tracking-[0.18em] text-[#f0e7d4]/50",
              side === "left" ? "md:justify-end" : "",
            ].join(" ")}
          >
            {categoryLabel[entry.category]}
          </span>
          <motion.h3
            className="max-w-[18rem] text-xl leading-[0.92] tracking-[-0.01em] md:max-w-none md:text-3xl [font-family:var(--font-akira)]"
            style={{ color: titleColor }}
          >
            {entry.title}
          </motion.h3>
          <p className="mt-2 text-[0.72rem] tracking-[0.18em] text-white/44">
            {entry.timeLabel}
          </p>
          <motion.p
            className={[
              "mt-4 max-w-[22rem] text-base leading-[1.7] text-[#f0e7d4]/62",
              side === "left" ? "md:ml-auto" : "",
            ].join(" ")}
            style={{ opacity: noteOpacity, y: noteY }}
          >
            {entry.note}
          </motion.p>
          <motion.div
            className={[
              "mt-5 flex items-center gap-3",
              side === "left" ? "md:justify-end" : "",
            ].join(" ")}
            style={{ opacity: proofOpacity, x: proofX }}
          >
            <span className="h-px w-8 bg-[#f0e7d4]/28" aria-hidden="true" />
            <span className="text-[0.72rem] tracking-[0.18em] text-[#f0e7d4]/72">
              {entry.proof}
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}
