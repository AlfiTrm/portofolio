"use client";

import { useEffect, useRef, useState } from "react";

type CursorMode = "default" | "hover" | "text" | "media";

const interactiveSelector =
  "a, button, [role='button'], .cursor-pointer, input, textarea, select, label";
const textSelector = "p, h1, h2, h3, h4, h5, h6, span, li, small, strong, em";
const mediaSelector =
  "img, video, canvas, svg, [data-cursor='media'], [data-cursor='spotlight']";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");

  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointerQuery = window.matchMedia("(pointer: fine)");
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const syncEnabled = () => {
      setEnabled(finePointerQuery.matches && !reducedMotionQuery.matches);
    };

    syncEnabled();
    finePointerQuery.addEventListener("change", syncEnabled);
    reducedMotionQuery.addEventListener("change", syncEnabled);

    return () => {
      finePointerQuery.removeEventListener("change", syncEnabled);
      reducedMotionQuery.removeEventListener("change", syncEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const style = document.createElement("style");
    style.innerHTML = `*, *::before, *::after { cursor: none !important; }`;
    style.id = "hide-cursor";
    document.head.appendChild(style);

    return () => {
      document.getElementById("hide-cursor")?.remove();
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const updatePosition = (x: number, y: number) => {
      if (!cursorRef.current) return;

      cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const onMove = (event: MouseEvent) => {
      updatePosition(event.clientX, event.clientY);

      if (!isVisible) {
        setIsVisible(true);
      }
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      if (target.closest("[data-cursor='default']")) {
        setMode("default");
        return;
      }

      if (target.closest(mediaSelector)) {
        setMode("media");
        return;
      }

      if (target.closest(interactiveSelector)) {
        setMode("hover");
        return;
      }

      if (target.closest(textSelector)) {
        setMode("text");
        return;
      }

      setMode("default");
    };

    const onLeaveWindow = (event: MouseEvent) => {
      if (event.relatedTarget) return;
      setIsVisible(false);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseout", onLeaveWindow);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onLeaveWindow);
    };
  }, [enabled, isVisible]);

  if (!enabled) {
    return null;
  }

  const variantClassName =
    mode === "hover"
      ? "h-12 w-12 border-[#f2ede6]/70 bg-[#f2ede6]/6 shadow-[0_0_18px_rgba(242,237,230,0.16)]"
      : mode === "text"
        ? "h-10 w-3 rounded-md border-[#f2ede6]/58 bg-[#f2ede6]/22"
        : mode === "media"
          ? "h-16 w-16 border-[#22d3ee]/42 bg-[#22d3ee]/10 shadow-[0_0_26px_rgba(34,211,238,0.2)]"
          : "h-5 w-5 border-white/45 bg-white/14";

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] hidden md:block transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        ref={cursorRef}
        className={`absolute left-0 top-0 rounded-full border backdrop-blur-[2px] transition-[width,height,border-radius,background-color,border-color,box-shadow,opacity] duration-180 ease-out ${variantClassName}`}
      >
        <span
          className={`absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f2ede6] transition-transform duration-180 ease-out ${
            mode === "media" ? "scale-125" : "scale-100"
          }`}
        />
      </div>
    </div>
  );
}
