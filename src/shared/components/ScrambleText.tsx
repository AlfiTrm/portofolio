"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const CHARS = "!@#$%^&*():{};|,.<>/?";

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleClassName?: string;
  scrambleOnHover?: boolean;
}

interface ScrambleState {
  chars: string[];
  revealIndex: number;
}

export default function ScrambleText({
  text,
  className = "",
  scrambleClassName = "text-cyan-400",
  scrambleOnHover = true,
}: ScrambleTextProps) {
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const [state, setState] = useState<ScrambleState>({
    chars: text.split(""),
    revealIndex: text.length,
  });

  const scramble = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startTimeRef.current = 0;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;

      const pos = elapsed / 125;

      const newChars = text.split("").map((char, index) => {
        if (index < pos) return text[index];
        if (char === " ") return "\u00A0";
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      });

      setState({
        chars: newChars,
        revealIndex: Math.floor(pos),
      });

      if (pos < text.length) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setState({ chars: text.split(""), revealIndex: text.length });
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  }, [text]);

  useEffect(() => {
    scramble();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [text, scramble]);

  return (
    <motion.span
      className={`inline-block whitespace-nowrap cursor-default relative overflow-hidden ${className}`}
      onMouseEnter={scrambleOnHover ? scramble : undefined}
      onClick={scramble}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-block">
        {state.chars.map((char, index) => (
          <span
            key={index}
            className={`inline-block transition-colors duration-200 ${
              index < state.revealIndex ? "" : `${scrambleClassName} font-mono`
            }`}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </motion.span>
  );
}
