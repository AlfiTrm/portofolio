"use client";

import { motion } from "framer-motion";

const raysDelay = 0.48;
const raysDuration = 1.25;

export default function HeroLightRays({ isActive = true }: { isActive?: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute -top-16 left-1/2 z-10 h-[56vh] min-h-[340px] w-[82vw] max-w-[1120px] -translate-x-1/2 opacity-95 mix-blend-screen"
      initial={{ opacity: 0, y: -18, scaleY: 0.92 }}
      animate={isActive ? { opacity: 0.95, y: 0, scaleY: 1 } : { opacity: 0, y: -18, scaleY: 0.92 }}
      transition={{
        delay: raysDelay,
        duration: raysDuration,
        ease: [0.22, 1, 0.36, 1],
      }}
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-x-[18%] top-0 h-[24%] rounded-full bg-[radial-gradient(circle_at_50%_0%,rgba(244,238,220,0.34),rgba(244,238,220,0.12)_42%,transparent_78%)] blur-3xl"
        initial={{ opacity: 0, scale: 0.82 }}
        animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.82 }}
        transition={{
          delay: raysDelay + 0.06,
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
      <div className="absolute left-[27%] top-0 h-full w-[6%] bg-[linear-gradient(180deg,rgba(244,238,220,0.34)_0%,rgba(244,238,220,0.12)_28%,transparent_92%)] blur-xl" />
      <div className="absolute left-[41%] top-0 h-full w-[10%] bg-[linear-gradient(180deg,rgba(244,238,220,0.4)_0%,rgba(244,238,220,0.16)_26%,transparent_88%)] blur-xl" />
      <div className="absolute left-1/2 top-0 h-full w-[16%] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(244,238,220,0.3)_0%,rgba(244,238,220,0.14)_22%,transparent_86%)] blur-2xl" />
      <div className="absolute right-[34%] top-0 h-full w-[8%] bg-[linear-gradient(180deg,rgba(244,238,220,0.28)_0%,rgba(244,238,220,0.1)_30%,transparent_92%)] blur-xl" />
      <div className="absolute right-[22%] top-0 h-full w-[5%] bg-[linear-gradient(180deg,rgba(244,238,220,0.24)_0%,rgba(244,238,220,0.08)_28%,transparent_94%)] blur-xl" />
    </motion.div>
  );
}
