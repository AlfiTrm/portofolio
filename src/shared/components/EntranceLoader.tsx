"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import LoaderTitleCard from "./LoaderTitleCard";

export default function EntranceLoader({
  shouldExit,
  onComplete,
}: {
  shouldExit: boolean;
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<"card" | "fade" | "complete">("card");

  useEffect(() => {
    if (!shouldExit) {
      setPhase("card");
      return;
    }

    setPhase("fade");
    const timer = window.setTimeout(() => {
      onComplete();
      setPhase("complete");
    }, 420);

    return () => window.clearTimeout(timer);
  }, [onComplete, shouldExit]);

  if (phase === "complete") return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] pointer-events-none backdrop-blur-[2px]"
      initial={{ opacity: 1 }}
      animate={{
        opacity: phase === "fade" ? 0 : 1,
        scale: phase === "fade" ? 1.01 : 1,
      }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="opacity-72"
        initial={{ opacity: 0, y: 12 }}
        animate={{
          opacity: phase === "fade" ? 0.72 : 1,
          y: 0,
        }}
        transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
      >
        <LoaderTitleCard />
      </motion.div>
    </motion.div>
  );
}
