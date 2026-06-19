"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import LoaderTitleCard from "./LoaderTitleCard";

export default function EntranceLoader({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<"card" | "hold" | "fade" | "complete">(
    "card"
  );
  useEffect(() => {
    const sequence = async () => {
      setPhase("card");
      await new Promise((r) => setTimeout(r, 1400));

      setPhase("hold");
      await new Promise((r) => setTimeout(r, 900));

      setPhase("fade");
      await new Promise((r) => setTimeout(r, 900));
      onComplete();
      setPhase("complete");
    };

    sequence();
  }, [onComplete]);

  if (phase === "complete") return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{
        opacity: phase === "fade" ? 0 : 1,
        scale: phase === "fade" ? 1.02 : 1,
      }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{
          opacity: 1,
          y: phase === "hold" ? -4 : 0,
        }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <LoaderTitleCard />
      </motion.div>
    </motion.div>
  );
}
