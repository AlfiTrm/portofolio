"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import HeadlineReveal from "@/shared/components/text/HeadlineReveal";
import BodyLineReveal from "@/shared/components/text/BodyLineReveal";
import useShouldSkipInitialEntrance from "@/features/home/hooks/useShouldSkipInitialEntrance";
import AboutLanyardCard from "./AboutLanyardCard";
import AboutStoryText from "./AboutStoryText";

export default function AboutAsymmetricScene() {
  const storyRef = useRef<HTMLDivElement>(null);
  const shouldSkipEntrance = useShouldSkipInitialEntrance();

  return (
    <motion.div
      initial={
        shouldSkipEntrance
          ? { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" }
          : { opacity: 0, y: 72, clipPath: "inset(18% 0% 0% 0%)" }
      }
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-16% 0px" }}
      transition={{
        delay: shouldSkipEntrance ? 0 : 0.08,
        duration: 1.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative min-h-[52rem] overflow-hidden border border-white/8 bg-[#090908] px-5 md:px-8"
    >
      <motion.div
        className="pointer-events-none absolute inset-x-[14%] top-0 h-[22rem] bg-[radial-gradient(circle_at_50%_0%,rgba(240,231,212,0.14),rgba(240,231,212,0.04)_34%,transparent_74%)] blur-3xl"
        initial={shouldSkipEntrance ? { opacity: 0.2, y: 0 } : { opacity: 0, y: -20 }}
        whileInView={{ opacity: 0.4, y: 0 }}
        viewport={{ once: true, margin: "-16% 0px" }}
        transition={{ delay: shouldSkipEntrance ? 0 : 0.14, duration: 1.1 }}
      />
      <div className="relative z-10 min-h-[46rem]">
        <div className="absolute left-[31%] top-[3rem] z-10 w-[22rem] -translate-x-1/2 md:left-[26%] md:w-[25rem]">
          <AboutLanyardCard />
        </div>

        <div className="relative z-10 flex min-h-[46rem] flex-col justify-start pt-[13.75rem] md:pt-[12.5rem]">
          <div
            ref={storyRef}
            className="ml-auto max-w-[19rem] md:ml-[45%] md:mr-0 md:max-w-[36rem]"
          >
            <BodyLineReveal
              delay={0.08}
              skipAnimation={shouldSkipEntrance}
              className="ml-2 text-[1rem] leading-[1.15] text-[#f0e7d4] md:ml-3 md:text-[1.35rem]"
              lines={["hi, i'm"]}
            />
            <h2 className="mt-2 text-[2.15rem] leading-[0.92] text-[#f0e7d4] md:text-[4.2rem] [font-family:var(--font-akira)]">
              <HeadlineReveal
                text="Alfi Tsani"
                delay={0.14}
                skipAnimation={shouldSkipEntrance}
              />
            </h2>
            <div className="mt-6 md:mt-7">
              <AboutStoryText />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
