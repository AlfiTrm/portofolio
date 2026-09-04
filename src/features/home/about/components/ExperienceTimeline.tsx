"use client";

import { useMemo, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { timelineMilestones } from "../data/timelineData";
import CinematicTimelinePath from "./timeline/CinematicTimelinePath";
import CinematicTimelineMilestone from "./timeline/CinematicTimelineMilestone";

const mobilePathDefinition =
  "M 84 0 C 84 76 84 112 84 148 C 104 238 100 328 80 448 C 58 590 64 745 86 910 C 108 1080 108 1228 82 1390 C 58 1550 62 1730 92 1890 C 114 2058 114 2160 94 2250";

const desktopPathDefinition =
  "M 500 0 C 500 82 500 122 500 164 C 704 230 708 318 498 438 C 288 560 286 704 502 860 C 712 1010 718 1164 500 1330 C 284 1492 288 1674 504 1850 C 710 2020 712 2150 500 2280";

const teaserHeightRem = 28;
const milestoneSpacingRem = 24;
const timelineTailRem = 24;

export default function ExperienceTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.88", "end 0.34"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 190,
    damping: 24,
    mass: 0.5,
  });

  const milestones = useMemo(
    () =>
      timelineMilestones.map((entry, index, collection) => {
        const start = Math.max(index / collection.length - 0.08, 0);
        const end = Math.min(start + 0.16, 1);

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
      className="relative overflow-visible pb-14"
    >
      <div className="pointer-events-none absolute inset-x-[14%] top-4 h-104 bg-[radial-gradient(circle_at_50%_0%,rgba(240,231,212,0.11),rgba(240,231,212,0.03)_34%,transparent_74%)] blur-3xl" />

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
