"use client";

import { motion } from "framer-motion";

export default function LoaderTitleCard() {
  const bars = [0, 1, 2];

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-0 opacity-8 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_30%)]" />

      <div className="relative flex items-end gap-6 md:gap-7">
        {bars.map((index) => (
          <motion.div
            key={index}
            className="h-32 w-12 rounded-[0.35rem] bg-white/28 md:h-40 md:w-14"
            animate={{
              y: [12, -16, 12],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.35,
              repeat: Infinity,
              ease: [0.4, 0, 0.2, 1],
              delay: index * 0.16,
            }}
          />
        ))}
      </div>
    </div>
  );
}
