"use client";

import { motion, type MotionValue } from "framer-motion";

interface AboutRevealLayerProps {
  textOpacity: MotionValue<number>;
  textY: MotionValue<number>;
  leftX: MotionValue<number>;
  rightX: MotionValue<number>;
  metaOpacity: MotionValue<number>;
  metaY: MotionValue<number>;
  highlightOpacities: readonly [MotionValue<number>, MotionValue<number>, MotionValue<number>, MotionValue<number>];
  onOpenResume?: () => void;
}

export default function AboutRevealLayer({
  textOpacity,
  textY,
  leftX,
  rightX,
  metaOpacity,
  metaY,
  highlightOpacities,
  onOpenResume,
}: AboutRevealLayerProps) {
  const [highlightOneOpacity, highlightTwoOpacity, highlightThreeOpacity, highlightFourOpacity] = highlightOpacities;

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-30 px-5 pt-20 text-black md:px-8 md:pt-24"
      style={{ opacity: textOpacity, y: textY }}
    >
      <motion.div
        className="absolute left-[3vw] top-[42vh] w-[24vw] -translate-y-1/2 md:w-[20vw]"
        style={{ x: leftX }}
      >
        <p className="text-left text-[clamp(0.5rem,1vw,1rem)] leading-[1.6] text-black/58">hi, i&apos;m</p>
        <h2 className="mt-2 text-left text-[2.6rem] leading-[0.95] tracking-[-0.02em] text-black sm:text-[3.4rem] md:text-[4.65rem] lg:text-[5.15rem] [font-family:var(--font-akira)]">
          <span className="block">Alfi</span>
          <span className="block">Tsani</span>
        </h2>
      </motion.div>

      <motion.div
        className="absolute right-[2.5vw] top-[56vh] w-[28vw] -translate-y-1/2 md:w-[min(21vw,24rem)]"
        style={{ x: rightX }}
      >
        <p className="space-y-[clamp(0.25rem,0.8vw,1rem)] text-right text-[clamp(0.5rem,1vw,1rem)] leading-[1.5] text-black/68 md:leading-[1.62]">
          <span className="block">I&apos;m Alfi, a <motion.span style={{ opacity: highlightOneOpacity }} className="text-black">Junior Frontend Developer</motion.span> based in Indonesia.</span>
          <span className="block">I found my way into interfaces in my fourth semester, when <motion.span style={{ opacity: highlightTwoOpacity }} className="text-black">building for the web</motion.span> started to feel less like coursework and more like a language.</span>
          <span className="block">Since then, I&apos;ve been learning to turn <motion.span style={{ opacity: highlightThreeOpacity }} className="text-black">complex ideas into clear experiences</motion.span>: interfaces that feel considered, responsive, and alive.</span>
          <span className="block">I&apos;m still early in the journey, but I keep showing up with <motion.span style={{ opacity: highlightFourOpacity }} className="text-black">curiosity and intent</motion.span>.</span>
        </p>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-[11.5vh] z-40 mx-auto hidden max-w-[580px] justify-between px-2 text-[0.48rem] uppercase tracking-[0.28em] text-black/44 md:flex"
        style={{ opacity: metaOpacity, y: metaY }}
      >
        <span>still studies</span>
        <button
          onClick={() => onOpenResume?.()}
          className="pointer-events-auto text-black/68 transition-colors duration-300 hover:text-black focus:outline-none focus-visible:text-black"
        >
          {"<Resume/>"}
        </button>
        <span>still exploring</span>
      </motion.div>
    </motion.div>
  );
}
