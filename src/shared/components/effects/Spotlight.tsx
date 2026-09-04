"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface LightRay {
  id: number;
  width: number;
  left: number;
  rotation: number;
  duration: number;
  delay: number;
}

export default function Spotlight() {
  const [rays, setRays] = useState<LightRay[]>([]);

  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const rotateValue = useTransform(mouseX, [-0.5, 0.5], [8, -8]);

  useEffect(() => {
    const newRays = Array.from({ length: 7 }).map((_, i) => ({
      id: i,
      width: 40 + Math.random() * 30,
      left: 15 + i * 12 + (Math.random() * 5 - 2.5),
      rotation: Math.random() * 4 - 2,
      duration: 6 + Math.random() * 3,
      delay: i * 0.5,
    }));

    const t = setTimeout(() => setRays(newRays), 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normalizedX = e.clientX / window.innerWidth - 0.5;
      mouseX.set(normalizedX);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX]);

  return (
    <div className="absolute -top-32 md:-top-20 left-0 right-0 h-[600px] overflow-hidden pointer-events-none z-10 mix-blend-screen">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[400px]"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.3) 0%, transparent 80%)`,
          filter: "blur(60px)",
        }}
      />

      <motion.div
        className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] opacity-100 mix-blend-screen"
        style={{
          rotate: rotateValue,
          transformOrigin: "50% 100px",
        }}
      >
        {rays.map((ray: LightRay) => (
          <motion.div
            key={ray.id}
            className="absolute top-0"
            style={{
              width: `${ray.width}px`,
              height: "100%",
              background: `linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0) 90%)`,
              left: `${ray.left}%`,
              filter: "blur(10px)",
              rotate: ray.rotation,
              transformOrigin: "top center",
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scaleX: [0.95, 1.05, 0.95],
            }}
            transition={{
              duration: ray.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: ray.delay,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
