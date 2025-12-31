"use client";

import { motion } from "framer-motion";

interface QuickLoaderProps {
  onComplete: () => void;
}

export default function QuickLoader({ onComplete }: QuickLoaderProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={onComplete}
    >
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, filter: "blur(20px)", scale: 1.1 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <h1 className="text-5xl font-bold text-white tracking-tighter">
            AT
            <span className="text-cyan-500">.</span>
          </h1>
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full opacity-0"
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 1.5, times: [0, 0.5, 1] }}
        />
      </div>

      <div className="w-24 h-[1px] bg-white/10 mt-8 overflow-hidden relative">
        <motion.div
          className="absolute inset-y-0 left-0 bg-cyan-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </div>

      <motion.p
        className="absolute bottom-12 text-[10px] text-white/40 font-mono tracking-[0.3em] uppercase"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Initializing
      </motion.p>
    </motion.div>
  );
}
