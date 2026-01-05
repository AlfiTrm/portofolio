"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Home, User, Code, Briefcase, Mail, FileText } from "lucide-react";

interface MobileNavbarProps {
  onOpenResume?: () => void;
}

const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Skills", href: "#skills", icon: Code },
  { name: "Projects", href: "#projects", icon: Briefcase },
  { name: "Contact", href: "#contact", icon: Mail },
];

export default function MobileNavbar({ onOpenResume }: MobileNavbarProps) {
  const [activeTab, setActiveTab] = useState("Home");
  const [translateY, setTranslateY] = useState(0);
  const lastScrollY = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      const diff = Math.abs(currentScrollY - lastScrollY.current);

      if (isScrollingDown && diff > 5) {
        setTranslateY(40);
      } else if (!isScrollingDown && diff > 5) {
        setTranslateY(0);
      }

      lastScrollY.current = currentScrollY;

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setTranslateY(0);
      }, 500);

      const sections = navItems.map((item) => item.href.substring(1));

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveTab(
              navItems.find((item) => item.href === `#${section}`)?.name ||
                "Home"
            );
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const scrollToSection = (href: string, name: string) => {
    setActiveTab(name);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.button
        onClick={() => onOpenResume?.()}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="md:hidden fixed top-4 right-4 z-50 p-3 bg-white text-black rounded-full shadow-lg border border-white/20 active:scale-95 transition-transform"
        aria-label="View Resume"
      >
        <FileText className="w-5 h-5" />
      </motion.button>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 overflow-hidden pointer-events-none">
        <motion.nav
          animate={{ y: translateY }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl px-2 py-3 flex justify-between items-center pointer-events-auto"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;

            return (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href, item.name)}
                className="relative flex-1 flex flex-col items-center gap-1 min-w-0 py-2"
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-pill"
                    className="absolute inset-1 bg-white/10 rounded-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <div
                  className={`relative z-10 transition-colors duration-200 ${
                    isActive ? "text-white" : "text-neutral-500"
                  }`}
                >
                  <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
                </div>
              </button>
            );
          })}
        </motion.nav>
      </div>
    </>
  );
}
