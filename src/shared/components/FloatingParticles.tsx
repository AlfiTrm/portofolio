"use client";

import { motion, AnimatePresence } from "framer-motion";

const PARTICLE_CONFIGS = [
  { x: 10, y: 85, size: 2, duration: 4, delay: 0 },
  { x: 25, y: 90, size: 3, duration: 5, delay: 0.5 },
  { x: 40, y: 88, size: 2, duration: 4.5, delay: 1 },
  { x: 55, y: 92, size: 4, duration: 6, delay: 0.3 },
  { x: 70, y: 87, size: 2, duration: 4, delay: 0.8 },
  { x: 85, y: 90, size: 3, duration: 5.5, delay: 1.2 },
  { x: 15, y: 95, size: 2, duration: 4.2, delay: 2 },
  { x: 35, y: 82, size: 3, duration: 5, delay: 1.5 },
  { x: 50, y: 88, size: 2, duration: 4.8, delay: 0.2 },
  { x: 65, y: 93, size: 4, duration: 5.5, delay: 2.5 },
  { x: 80, y: 86, size: 2, duration: 4.3, delay: 1.8 },
  { x: 95, y: 91, size: 3, duration: 6, delay: 0.7 },
  { x: 20, y: 89, size: 2, duration: 4.6, delay: 2.2 },
  { x: 45, y: 94, size: 3, duration: 5.2, delay: 1.1 },
  { x: 75, y: 84, size: 2, duration: 4.4, delay: 2.8 },
];

interface FloatingParticlesProps {
  isActive: boolean;
}

export default function FloatingParticles({
  isActive,
}: FloatingParticlesProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-30 rounded-lg">
          {PARTICLE_CONFIGS.map((particle, index) => (
            <motion.div
              key={index}
              className="absolute rounded-full bg-cyan-400/80"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: particle.size,
                height: particle.size,
                boxShadow: `0 0 ${particle.size * 3}px rgba(34, 211, 238, 0.6)`,
              }}
              initial={{ opacity: 0, scale: 0, y: 0 }}
              animate={{
                opacity: [0, 0.8, 0.8, 0],
                scale: [0, 1, 1.2, 0.5],
                y: [0, -50, -120, -200],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeOut",
              }}
              exit={{ opacity: 0, scale: 0, transition: { duration: 0.3 } }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
