"use client";

import { useEffect, useRef, useState } from "react";

type CursorMode = "default" | "hover" | "text";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");

  const mouse = useRef({ x: -100, y: -100 });
  const trailPos = useRef({ x: -100, y: -100 });
  const vel = useRef({ x: 0, y: 0 });

  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `*, *::before, *::after { cursor: none !important; }`;
    style.id = "hide-cursor";
    document.head.appendChild(style);

    return () => {
      document.getElementById("hide-cursor")?.remove();
    };
  }, []);

  useEffect(() => {
    let rafId = 0;
    const SPEED = 0.22;
    const STRETCH = 0.3;

    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;
      }

      const dx = mouse.current.x - trailPos.current.x;
      const dy = mouse.current.y - trailPos.current.y;

      vel.current.x += (dx * SPEED - vel.current.x) * 0.5;
      vel.current.y += (dy * SPEED - vel.current.y) * 0.5;

      trailPos.current.x += vel.current.x;
      trailPos.current.y += vel.current.y;

      const speed = Math.sqrt(vel.current.x ** 2 + vel.current.y ** 2);
      const angle = Math.atan2(vel.current.y, vel.current.x) * (180 / Math.PI);
      const stretch = Math.min(speed * STRETCH, 0.5);

      if (trailRef.current) {
        trailRef.current.style.transform = `
          translate3d(${trailPos.current.x}px, ${trailPos.current.y}px, 0)
          rotate(${angle}deg)
          scale(${1 + stretch}, ${1 - stretch * 0.4})
        `;
      }

      if (!isVisible && mouse.current.x > 0) setIsVisible(true);

      rafId = requestAnimationFrame(animate);
    };

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const isLink = t.closest(
        "a, button, [role='button'], .cursor-pointer, input"
      );
      const isText =
        !isLink && t.closest("p, h1, h2, h3, h4, h5, h6, span, li");

      if (isLink) setMode("hover");
      else if (isText) setMode("text");
      else setMode("default");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  return (
    <>
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -12"
            />
          </filter>
        </defs>
      </svg>

      <div
        className={`pointer-events-none fixed inset-0 z-[9999] hidden md:block transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="mix-blend-difference" style={{ filter: "url(#goo)" }}>
          <div
            ref={cursorRef}
            className="absolute top-0 left-0 w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 will-change-transform"
          />

          <div
            ref={trailRef}
            className="absolute top-0 left-0 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 will-change-transform"
            style={{
              width: mode === "text" ? 8 : 20,
              height: mode === "text" ? 32 : 20,
              borderRadius: mode === "text" ? 4 : "50%",
              transition: "width 0.2s, height 0.2s, border-radius 0.2s",
            }}
          />
        </div>

        <div
          ref={ringRef}
          className="absolute top-0 left-0 rounded-full border border-white/50 -translate-x-1/2 -translate-y-1/2 will-change-transform"
          style={{
            width: 48,
            height: 48,
            opacity: mode === "hover" ? 1 : 0,
            transition:
              "opacity 0.2s, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
      </div>
    </>
  );
}
