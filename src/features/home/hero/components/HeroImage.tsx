"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import CurvedText from "./CurvedText";
import { techStack } from "../data/techStack";

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
  const techStackText = techStack
    .map((tech) => tech.name)
    .join(" </> ")
    .repeat(2);

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center scale-[0.85] xs:scale-[0.85] md:scale-[0.85] lg:scale-[0.9] opacity-60 md:opacity-100 origin-center transition-transform duration-500 pointer-events-none">
        <CurvedText text={techStackText} radius={260} duration={25} />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[280px] h-[280px] md:w-[500px] md:h-[500px] lg:w-[550px] lg:h-[550px] bg-cyan-500/5 rounded-full blur-2xl" />
      </div>

      <motion.div
        className="relative w-[80vw] max-w-[450px] h-[80vw] max-h-[450px] md:w-[600px] md:h-[600px] lg:w-[650px] lg:h-[650px] mx-auto group"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute inset-0 rounded-full border border-white/5" />
        <div className="absolute inset-4 rounded-full border border-white/10" />

        <div className="absolute inset-4.5 rounded-full overflow-hidden">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain grayscale group-hover:grayscale-0 transition-all duration-700"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      </motion.div>
    </div>
  );
}
