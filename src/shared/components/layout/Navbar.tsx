"use client";

import { Icon } from "@iconify/react";
import { motion, type MotionStyle } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", label: "Home", href: "#home", group: "primary" },
  { name: "About", label: "About", href: "#about", group: "primary" },
  {
    name: "Projects",
    label: "Works",
    href: "#projects",
    group: "secondary",
  },
  {
    name: "Exploring",
    label: "Exploring",
    href: "#exploring",
    group: "secondary",
  },
  { name: "Contact", label: "Contact", href: "#contact", group: "contact" },
];

const navPrimary = navItems.filter((item) => item.group === "primary");
const navSecondary = navItems.filter((item) => item.group === "secondary");
const navContact = navItems.filter((item) => item.group === "contact");

interface NavbarProps {
  tone?: "light" | "dark";
  style?: MotionStyle;
  className?: string;
}

export default function Navbar({
  tone = "light",
  style,
  className = "",
}: NavbarProps) {
  const [activeItem, setActiveItem] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const isDark = tone === "dark";
  const activeText = isDark ? "text-black" : "text-[#f2ede6]";
  const inactiveText = isDark
    ? "text-black/34 hover:text-black/68"
    : "text-white/42 hover:text-white/72";
  const brandText = isDark ? "text-black" : "text-[#f2ede6]";
  const focusRing = isDark
    ? "focus-visible:ring-black/50 focus-visible:ring-offset-[#f2ede6]"
    : "focus-visible:ring-white/60 focus-visible:ring-offset-black";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navItems.map((item) => item.href.substring(1));
      let currentItem = "Home";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 220 && rect.bottom >= 220) {
            currentItem =
              navItems.find((item) => item.href === `#${section}`)?.name ||
              currentItem;
          }
        }
      }

      setActiveItem(currentItem);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderNavGroup = (items: typeof navItems) => (
    <ul className="flex flex-col items-start gap-0.5 xl:gap-0.5" role="menubar">
      {items.map((item) => {
        const isActive = activeItem === item.name;

        return (
          <li key={item.name} role="none">
            <button
              onClick={() => handleNavClick(item.href)}
              role="menuitem"
              aria-current={isActive ? "page" : undefined}
              className={`relative uppercase text-[0.68rem] xl:text-[0.72rem] leading-none transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${focusRing} ${
                isActive
                  ? `${activeText} tracking-[0.18em] font-medium`
                  : `${inactiveText} tracking-[0.24em]`
              }`}
            >
              {isActive && (
                <Icon
                  icon="iconoir:spark-solid"
                  className={`absolute -left-4 top-1/2 text-[0.78rem] -translate-y-1/2 ${activeText}`}
                />
              )}
              {item.label}
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-lg focus:font-medium"
      >
        Skip to main content
      </a>

      <motion.nav
        style={style}
        className={`hidden md:flex fixed top-0 left-0 right-0 z-50 justify-center px-6 xl:px-10 pointer-events-none ${className}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          className={`pointer-events-auto flex w-full max-w-[1440px] items-start justify-between gap-8 pt-7 xl:pt-8 transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-90"
          }`}
        >
          <Link
            href="/"
            className={`shrink-0 text-[1.45rem] leading-none tracking-[0.02em] ${brandText} transition-opacity duration-300 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${focusRing} rounded-sm [font-family:var(--font-akira)]`}
            aria-label="Tsan - Home"
          >
            Tsan
          </Link>

          <div className="flex items-start gap-10 xl:gap-14 ml-auto">
            <div className="pt-2">{renderNavGroup(navPrimary)}</div>
            <div className="pt-2 flex flex-col items-start">
              {renderNavGroup(navSecondary)}
            </div>
            <div className="pt-[0.9rem]">{renderNavGroup(navContact)}</div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
