"use client";

import { motion, type MotionValue } from "framer-motion";
import BodyLineReveal from "@/shared/components/text/BodyLineReveal";
import HeadlineReveal from "@/shared/components/text/HeadlineReveal";
import MetaLabelReveal from "@/shared/components/text/MetaLabelReveal";

interface HeroCopyProps {
  opacity: MotionValue<number>;
  leftX: MotionValue<number>;
  rightX: MotionValue<number>;
  metaY: MotionValue<number>;
  onOpenResume?: () => void;
}

export default function HeroCopy({
  opacity,
  leftX,
  rightX,
  metaY,
  onOpenResume,
}: HeroCopyProps) {
  return (
    <motion.div
      className="absolute inset-0 z-20 px-5 pt-20 md:px-8 md:pt-24"
      style={{ opacity }}
    >
      <div className="absolute right-6 top-[17.5%] hidden w-[9.25rem] md:block lg:right-10">
        <BodyLineReveal
          isActive
          skipAnimation
          className="text-justify text-[0.55rem] uppercase leading-[1.45] tracking-[0.16em] text-[#efe6d1]/58"
          lines={["made from quiet choices,", "sharp edges, soft light,", "and things that just", "feel right."]}
        />
      </div>

      <div className="mx-auto flex h-full w-full max-w-[1380px] flex-col justify-center">
        <div className="grid min-h-[74vh] grid-cols-[1fr_auto_1fr] items-center gap-1 md:gap-4">
          <motion.div className="self-start pt-[26vh]" style={{ x: leftX }}>
            <p className="text-left text-[clamp(1.5rem,7vw,7rem)] leading-[0.92] tracking-[-0.02em] text-[#f0e7d4] [font-family:var(--font-akira)]">
              <HeadlineReveal text="port" isActive skipAnimation />
            </p>
            <BodyLineReveal
              isActive
              skipAnimation
              className="mt-6 text-left text-[clamp(0.4rem,0.8vw,0.56rem)] uppercase tracking-[0.2em] text-[#efe6d1]/58 md:mt-[4.75rem] md:pl-7 md:tracking-[0.28em]"
              lineClassName="leading-[1.5]"
              lines={["currently powered by coffee", "and questionable sleep"]}
            />
          </motion.div>

          <div />

          <motion.div className="self-end pb-[19vh]" style={{ x: rightX }}>
            <p className="text-right text-[clamp(1.5rem,7vw,7rem)] leading-[0.92] tracking-[-0.02em] text-[#f0e7d4] [font-family:var(--font-akira)]">
              <HeadlineReveal text="folio" isActive skipAnimation />
            </p>
          </motion.div>
        </div>

        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-[14vh] mx-auto flex max-w-[320px] justify-between px-2 text-[0.48rem] uppercase tracking-[0.28em] text-[#efe6d1]/46 md:bottom-[11.5vh] md:max-w-[580px]"
          style={{ y: metaY }}
        >
          <MetaLabelReveal isActive>still studies</MetaLabelReveal>
          <button
            onClick={() => onOpenResume?.()}
            className="pointer-events-auto text-[#efe6d1]/72 transition-colors duration-300 hover:text-[#efe6d1] focus:outline-none focus-visible:text-[#efe6d1]"
          >
            {"<Resume/>"}
          </button>
          <MetaLabelReveal isActive>still exploring</MetaLabelReveal>
        </motion.div>
      </div>
    </motion.div>
  );
}
