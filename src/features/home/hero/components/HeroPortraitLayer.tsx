"use client";

import Image from "next/image";
import { motion, type MotionValue } from "framer-motion";

interface HeroPortraitLayerProps {
  opacity: MotionValue<number>;
  colorOpacity: MotionValue<number>;
  monoOpacity: MotionValue<number>;
  entranceState: "checking" | "playing" | "ready";
}

export default function HeroPortraitLayer({
  opacity,
  colorOpacity,
  monoOpacity,
  entranceState,
}: HeroPortraitLayerProps) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-[2]"
      aria-hidden="true"
    >
      <motion.div
        className="absolute bottom-0 left-1/2 h-[82svh] w-[145vw] -translate-x-1/2 overflow-hidden md:bottom-auto md:top-0 md:h-screen md:w-[76vw]"
        style={{ opacity }}
        initial={false}
        animate={{ y: entranceState === "checking" ? "105%" : "0%" }}
        transition={
          entranceState === "playing"
            ? { delay: 2.05, duration: 1.55, ease: [0.16, 1, 0.3, 1] }
            : { duration: 0 }
        }
      >
        <motion.div className="absolute inset-0" style={{ opacity: colorOpacity }}>
          <Image
            src="/home/picture-me.webp"
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 76vw, 145vw"
            className="object-contain object-bottom md:object-top [filter:brightness(0.9)_sepia(0.18)_saturate(0.92)_contrast(0.96)]"
          />
        </motion.div>
        <motion.div
          className="absolute inset-0"
          style={{ opacity: monoOpacity }}
          aria-hidden="true"
        >
          <Image
            src="/home/picture-me.webp"
            alt=""
            fill
            sizes="(min-width: 768px) 76vw, 145vw"
            className="object-contain object-bottom md:object-top [filter:brightness(1)_grayscale(1)_sepia(0)_saturate(0)_contrast(1)]"
          />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(19,17,13,0.7)_0%,rgba(19,17,13,0.42)_20%,rgba(19,17,13,0.1)_44%,rgba(19,17,13,0.14)_68%,rgba(19,17,13,0.56)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(241,233,210,0.04)_0%,rgba(0,0,0,0)_18%,rgba(0,0,0,0.08)_56%,rgba(0,0,0,0.46)_100%)]" />
    </motion.div>
  );
}
