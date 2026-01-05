"use client";

import { useEffect, useRef } from "react";

export default function BentoGridBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number>(0);

  const keywords = [
    { text: "Coffee Addict", size: "text-lg" },
    { text: "Nocturnal Creature", size: "text-sm" },
    { text: "Born to Game", size: "text-base" },
    { text: "Spotify Enjoyer", size: "text-xs" },
    { text: "Code Enjoyer", size: "text-base" },
    { text: "Frontend Developer", size: "text-xl" },
    { text: "Future Fullstack", size: "text-lg" },
    { text: "Future Backend", size: "text-base" },
    { text: "React", size: "text-base" },
    { text: "TypeScript", size: "text-lg" },
    { text: "Next.js", size: "text-sm" },
    { text: "Tailwind CSS", size: "text-xs" },
    { text: "JavaScript", size: "text-base" },
    { text: "Node.js", size: "text-sm" },
    { text: "UI/UX", size: "text-sm" },
    { text: "Clean Code", size: "text-base" },
    { text: "Responsive", size: "text-xs" },
    { text: "Git Master", size: "text-sm" },
    { text: "API Design", size: "text-xs" },
    { text: "Always Learning", size: "text-lg" },
    { text: "Build & Ship", size: "text-base" },
    { text: "User First", size: "text-sm" },
    { text: "Creative", size: "text-xs" },
    { text: "Problem Solver", size: "text-base" },
    { text: "Passion Driven", size: "text-sm" },
    { text: "Detail Oriented", size: "text-xs" },
  ];

  const positions = [
    { top: "5%", left: "8%" },
    { top: "12%", left: "75%" },
    { top: "18%", left: "25%" },
    { top: "25%", left: "85%" },
    { top: "32%", left: "15%" },
    { top: "38%", left: "60%" },
    { top: "45%", left: "35%" },
    { top: "52%", left: "80%" },
    { top: "58%", left: "10%" },
    { top: "65%", left: "70%" },
    { top: "72%", left: "40%" },
    { top: "78%", left: "20%" },
    { top: "85%", left: "65%" },
    { top: "8%", left: "50%" },
    { top: "28%", left: "45%" },
    { top: "48%", left: "55%" },
    { top: "68%", left: "90%" },
    { top: "88%", left: "30%" },
    { top: "15%", left: "92%" },
    { top: "92%", left: "12%" },
    { top: "10%", left: "40%" },
    { top: "22%", left: "65%" },
    { top: "35%", left: "88%" },
    { top: "42%", left: "12%" },
    { top: "55%", left: "48%" },
    { top: "62%", left: "28%" },
    { top: "75%", left: "82%" },
    { top: "82%", left: "52%" },
    { top: "90%", left: "75%" },
    { top: "95%", left: "42%" },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        elementsRef.current.forEach((el) => {
          if (!el) return;

          const elRect = el.getBoundingClientRect();
          const elX = elRect.left - rect.left + elRect.width / 2;
          const elY = elRect.top - rect.top + elRect.height / 2;

          const distance = Math.sqrt(
            Math.pow(mouseX - elX, 2) + Math.pow(mouseY - elY, 2)
          );

          const maxDistance = 250;
          const minOpacity = 0.05;
          const maxOpacity = 0.35;

          const opacity =
            distance > maxDistance
              ? minOpacity
              : maxOpacity -
                (distance / maxDistance) * (maxOpacity - minOpacity);

          el.style.opacity = String(opacity);
        });

        rafRef.current = 0;
      });
    };

    const handleMouseLeave = () => {
      elementsRef.current.forEach((el) => {
        if (el) el.style.opacity = "0.05";
      });
    };

    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {keywords.map((keyword, index) => (
        <div
          key={index}
          ref={(el) => {
            elementsRef.current[index] = el;
          }}
          className={`absolute ${keyword.size} text-white whitespace-nowrap`}
          style={{
            top: positions[index].top,
            left: positions[index].left,
            opacity: 0.05,
            transition: "opacity 0.3s ease-out",
          }}
        >
          {keyword.text}
        </div>
      ))}
    </div>
  );
}
