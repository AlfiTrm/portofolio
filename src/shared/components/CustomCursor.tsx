"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseEnter);

    document.addEventListener("mouseleave", () => setIsVisible(false));
    document.addEventListener("mouseenter", () => setIsVisible(true));

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseleave", () => setIsVisible(false));
      document.removeEventListener("mouseenter", () => setIsVisible(true));
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <>
      <style jsx global>{`
        @media (min-width: 768px) and (hover: hover) and (pointer: fine) {
          body,
          a,
          button,
          [role="button"] {
            cursor: none !important;
          }
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block overflow-hidden">
        <motion.div
          className="fixed top-0 left-0 w-3 h-3 bg-cyan-400 rounded-full mix-blend-difference pointer-events-none"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />

        <motion.div
          className="fixed top-0 left-0 w-8 h-8 border border-white/50 rounded-full mix-blend-difference pointer-events-none"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            scale: isHovering ? 2 : 1,
            backgroundColor: isHovering
              ? "rgba(34, 211, 238, 0.1)"
              : "transparent",
            borderColor: isHovering
              ? "rgba(34, 211, 238, 0.8)"
              : "rgba(255, 255, 255, 0.5)",
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        />
      </div>
    </>
  );
}
