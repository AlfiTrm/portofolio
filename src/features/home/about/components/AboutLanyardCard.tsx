"use client";

import { Icon } from "@iconify/react";
import { motion, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import useShouldSkipInitialEntrance from "@/features/home/hooks/useShouldSkipInitialEntrance";
import AboutNightBackdrop from "./AboutNightBackdrop";

export default function AboutLanyardCard() {
  const shouldSkipEntrance = useShouldSkipInitialEntrance();
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const cardRotate = useMotionValue(0);
  const [glossPosition, setGlossPosition] = useState({ x: 28, y: 14 });

  useEffect(() => {
    const unsubscribeX = cardX.on("change", (latestX) => {
      const latestY = cardY.get();
      cardRotate.set((latestX as number) * 0.045 + (latestY as number) * 0.02);
    });
    const unsubscribeY = cardY.on("change", (latestY) => {
      const latestX = cardX.get();
      cardRotate.set((latestX as number) * 0.045 + (latestY as number) * 0.02);
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [cardRotate, cardX, cardY]);

  const [cardPos, setCardPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const unsubscribeX = cardX.on("change", (latest) => {
      setCardPos((prev) => ({ ...prev, x: latest }));
    });
    const unsubscribeY = cardY.on("change", (latest) => {
      setCardPos((prev) => ({ ...prev, y: latest }));
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [cardX, cardY]);

  const holeX = cardPos.x;
  const holeY = 136 + cardPos.y;
  const controlX = holeX / 2;
  const controlY = holeY / 2 + Math.abs(holeX) * 0.15 + 20;

  const handleImagePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setGlossPosition({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleImagePointerLeave = () => {
    setGlossPosition({ x: 28, y: 14 });
  };

  const glossySpot = `radial-gradient(circle at ${glossPosition.x}% ${glossPosition.y}%, rgba(255,255,255,0.34), rgba(255,255,255,0.1) 18%, transparent 42%)`;

  return (
    <motion.div
      initial={shouldSkipEntrance ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: shouldSkipEntrance ? 0 : 0.2,
        duration: 1.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex min-h-[30rem] flex-col items-center"
    >
      <div className="absolute left-1/2 top-0 z-30 h-4 w-4 -translate-x-1/2 rounded border-2 border-white/70 bg-white/16" />

      <svg
        className="pointer-events-none absolute left-1/2 top-1.5 -translate-x-1/2"
        style={{ width: "26rem", height: "34rem", overflow: "visible" }}
      >
        <path
          d={`M 208 2 Q ${208 + controlX} ${controlY} ${208 + holeX} ${holeY}`}
          stroke="rgba(255, 255, 255, 1)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 1px rgba(255,255,255,0.18))" }}
        />
        <path
          d={`M 208 2 Q ${208 + controlX} ${controlY} ${208 + holeX} ${holeY}`}
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          style={{ filter: "blur(2px)" }}
        />
      </svg>

      <div className="h-28" />

      <motion.div
        drag
        dragConstraints={{ top: -90, bottom: 100, left: -120, right: 120 }}
        dragElastic={0.18}
        dragMomentum={false}
        dragTransition={{ bounceStiffness: 420, bounceDamping: 28 }}
        style={{ x: cardX, y: cardY, rotate: cardRotate }}
        whileDrag={{ scale: 1.015 }}
        className="relative z-20 cursor-grab active:cursor-grabbing"
      >
        <div className="absolute -top-4 left-1/2 z-20 -translate-x-1/2">
          <div className="flex h-8 w-12 items-center justify-center rounded-lg border-2 border-white/18 bg-white shadow-xl">
            <div className="h-4 w-4 rounded-full border-2 border-white/24 bg-black/80" />
          </div>
        </div>

        <div className="lanyard-card-shadow relative w-[18.5rem] overflow-hidden rounded-[0.95rem] border border-black/8 bg-[#e7e3db] p-5">

          <div className="relative mb-4 flex items-center justify-between border-b border-black/45 pb-3">
            <div className="flex items-center gap-2">
              <Icon
                icon="iconoir:spark-solid"
                className="text-[0.8rem] text-black/70"
              />
              <span className="text-[0.62rem] uppercase tracking-[0.24em] text-black/70">
                developer id
              </span>
            </div>
            <span className="text-[0.62rem] text-black/70">#TSAN</span>
          </div>

          <div
            className="relative mb-4 aspect-square overflow-hidden rounded-[0.8rem] border border-black/12 bg-[linear-gradient(180deg,#070b18_0%,#0a1324_36%,#090909_100%)]"
            onPointerMove={handleImagePointerMove}
            onPointerLeave={handleImagePointerLeave}
          >
            <AboutNightBackdrop />
            <div
              className="absolute inset-0 mix-blend-screen"
              style={{ background: glossySpot }}
            />
            <Image
              src="/about/cartoon-chill.svg"
              alt="Cartoon chill portrait"
              fill
              className="object-cover translate-y-2 scale-[1.03]"
              priority
            />
          </div>

          <div className="relative space-y-2">
            <p className="text-[1.45rem] leading-none text-black [font-family:var(--font-akira)]">
              Tsan
            </p>
            <p className="text-[0.72rem] uppercase tracking-[0.22em] text-black/70">
              Frontend Engineer
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
