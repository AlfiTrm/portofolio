"use client";

import { motion } from "framer-motion";
import Lightfall from "@/shared/components/effects/Lightfall";

export default function AboutNightBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <Lightfall
        className="absolute inset-0"
        colors={["#ffffff", "#7aa7ff"]}
        backgroundColor="#050815"
        speed={0.2}
        streakCount={2}
        streakWidth={0.8}
        streakLength={1}
        glow={0.88}
        density={0.42}
        twinkle={0.7}
        zoom={3.6}
        backgroundGlow={0}
        opacity={0.58}
        mouseInteraction={false}
      />

    </div>
  );
}
