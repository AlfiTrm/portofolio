"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const portraitDelay = 0.76;
const portraitDuration = 2.15;

interface HeroImageProps {
  src: string;
  alt: string;
  className?: string;
  isActive?: boolean;
}

export default function HeroImage({
  src,
  alt,
  className = "",
  isActive = true,
}: HeroImageProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-stage" />

      <motion.div
        className="absolute inset-y-0 left-1/2 top-0 w-[96vw] -translate-x-1/2 md:w-[82vw] lg:w-[76vw]"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : { opacity: 0 }}
        transition={{
          delay: portraitDelay,
          duration: portraitDuration,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.div
          className="absolute inset-0 sepia-[0.18] saturate-[0.82] contrast-[0.94]"
          initial={{ filter: "brightness(0.42)" }}
          animate={
            isActive
              ? { filter: "brightness(0.76)" }
              : { filter: "brightness(0.42)" }
          }
          transition={{
            delay: portraitDelay + 0.08,
            duration: portraitDuration,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="100vw"
            className="object-contain object-top"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(19,17,13,0.86)_0%,rgba(19,17,13,0.58)_20%,rgba(19,17,13,0.16)_44%,rgba(19,17,13,0.22)_68%,rgba(19,17,13,0.72)_100%)]"
        initial={{ opacity: 1 }}
        animate={isActive ? { opacity: 0.72 } : { opacity: 1 }}
        transition={{
          delay: portraitDelay,
          duration: portraitDuration,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(241,233,210,0.03)_0%,rgba(0,0,0,0)_18%,rgba(0,0,0,0.12)_56%,rgba(0,0,0,0.62)_100%)]"
        initial={{ opacity: 0.9 }}
        animate={isActive ? { opacity: 1 } : { opacity: 0.9 }}
        transition={{
          delay: portraitDelay + 0.04,
          duration: portraitDuration,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </div>
  );
}
