"use client";

import { motion } from "framer-motion";
import LoaderTitleCard from "./LoaderTitleCard";

interface QuickLoaderProps {
  onComplete: () => void;
}

export default function QuickLoader({ onComplete }: QuickLoaderProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[100]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.9, delay: 1.25, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={onComplete}
    >
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 1.01 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.18, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <LoaderTitleCard />
      </motion.div>
    </motion.div>
  );
}
