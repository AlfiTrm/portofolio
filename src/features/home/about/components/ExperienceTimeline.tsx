"use client";

import { useMemo, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { timelineMilestones } from "../data/timelineData";
import CinematicTimelinePath from "./timeline/CinematicTimelinePath";
import CinematicTimelineMilestone from "./timeline/CinematicTimelineMilestone";

const mobilePathDefinition =
  "M 84 30 C 98 120 102 250 80 390 C 58 535 64 695 86 860 C 108 1030 108 1180 82 1345 C 58 1510 62 1695 92 1860 C 114 2028 114 2140 94 2250";

const desktopPathDefinition =
  "M 500 36 C 705 150 712 276 498 398 C 288 520 286 664 502 820 C 712 970 718 1124 500 1290 C 284 1452 288 1634 504 1810 C 710 1980 712 2130 500 2280";

const teaserHeightRem = 49;
const milestoneSpacingRem = 20;
const timelineTailRem = 18;

export default function ExperienceTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "end 0.12"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.8,
  });

  const milestones = useMemo(
    () =>
      timelineMilestones.map((entry, index, collection) => {
        const start = Math.max(index / collection.length - 0.035, 0);
        const end = Math.min(start + 0.18, 1);

        return {
          entry,
          top: `${teaserHeightRem + index * milestoneSpacingRem}rem`,
          progressRange: [start, end] as [number, number],
          side: (index % 2 === 0 ? "left" : "right") as "left" | "right",
        };
      }),
    []
  );

  const timelineHeightRem =
    teaserHeightRem + timelineMilestones.length * milestoneSpacingRem + timelineTailRem;

  return (
    <section
      ref={sectionRef}
      className="relative -mt-[12rem] overflow-visible pb-14"
    >
      <div className="pointer-events-none absolute inset-x-[14%] top-[1rem] h-[26rem] bg-[radial-gradient(circle_at_50%_0%,rgba(240,231,212,0.11),rgba(240,231,212,0.03)_34%,transparent_74%)] blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-0 md:px-8">
        <div className="relative" style={{ minHeight: `${timelineHeightRem}rem` }}>
          <CinematicTimelinePath
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible md:hidden"
            pathDefinition={mobilePathDefinition}
            progress={progress}
            viewBox="0 0 420 2300"
          />
          <CinematicTimelinePath
            className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible md:block"
            pathDefinition={desktopPathDefinition}
            progress={progress}
            viewBox="0 0 1000 2300"
          />

          <motion.div
            className="pointer-events-none absolute left-[5.35rem] top-0 h-full w-px bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.08)_14%,rgba(255,255,255,0.05)_82%,rgba(255,255,255,0)_100%)] md:left-1/2 md:-translate-x-1/2"
            style={{ opacity: progress }}
          />

          {milestones.map(({ entry, top, progressRange, side }) => (
            <CinematicTimelineMilestone
              key={`${entry.title}-${entry.timeLabel}`}
              entry={entry}
              progress={progress}
              progressRange={progressRange}
              side={side}
              top={top}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
