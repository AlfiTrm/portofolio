"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface HeroImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function HeroImage({
  src,
  alt,
  className = "",
}: HeroImageProps) {
  return (
    <motion.div
      className={`pointer-events-none absolute inset-0 ${className}`}
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[#12110d]" />
      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(191,186,159,0.58),transparent_30%),linear-gradient(180deg,rgba(133,124,96,0.18)_0%,rgba(28,24,18,0.18)_38%,rgba(8,7,6,0.6)_100%)]" /> */}

      <div className="absolute inset-y-0 left-1/2 top-0 w-[96vw] -translate-x-1/2 md:w-[82vw] lg:w-[76vw]">
        <div className="absolute inset-0 sepia-[0.18] saturate-[0.82] contrast-[0.94] brightness-[0.72]">
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="100vw"
            className="object-contain object-top"
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(19,17,13,0.86)_0%,rgba(19,17,13,0.58)_20%,rgba(19,17,13,0.16)_44%,rgba(19,17,13,0.22)_68%,rgba(19,17,13,0.72)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(241,233,210,0.03)_0%,rgba(0,0,0,0)_18%,rgba(0,0,0,0.12)_56%,rgba(0,0,0,0.62)_100%)]" />
    </motion.div>
  );
}
