"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface MobileNavbarProps {
  onOpenResume?: () => void;
}

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
    name: "Skills",
    label: "Capabilities",
    href: "#skills",
    group: "secondary",
  },
  { name: "Contact", label: "Contact", href: "#contact", group: "contact" },
];

export default function MobileNavbar({ onOpenResume }: MobileNavbarProps) {
  const [activeTab, setActiveTab] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.substring(1));

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 220 && rect.bottom >= 220) {
            setActiveTab(
              navItems.find((item) => item.href === `#${section}`)?.name ||
                "Home"
            );
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setMenuOpen(false);

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navPrimary = navItems.filter((item) => item.group === "primary");
  const navSecondary = navItems.filter((item) => item.group === "secondary");
  const navContact = navItems.filter((item) => item.group === "contact");

  return (
    <>
      <motion.nav
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="md:hidden fixed top-0 left-0 right-0 z-50 px-5 pt-5"
      >
        <div className="flex items-start justify-between">
          <Link
            href="/"
            className="text-[1.35rem] leading-none tracking-[0.02em] text-[#f2ede6] [font-family:var(--font-akira)]"
            aria-label="Tsan - Home"
          >
            Tsan
          </Link>

          <button
            onClick={() => setMenuOpen(true)}
            className="pt-1 uppercase text-[0.68rem] tracking-[0.26em] text-white/48 hover:text-white/76 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-editorial-menu"
          >
            Menu
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-[60] bg-black/88 backdrop-blur-xl px-5 pt-5 pb-10"
          >
            <div className="flex items-start justify-between">
              <span className="text-[1.35rem] leading-none tracking-[0.02em] text-[#f2ede6] [font-family:var(--font-akira)]">
                Tsan
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="pt-1 uppercase text-[0.68rem] tracking-[0.26em] text-white/48 hover:text-white/76 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                aria-label="Close navigation menu"
              >
                Close
              </button>
            </div>

            <motion.div
              id="mobile-editorial-menu"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 14 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-24 flex flex-col gap-16"
            >
              <div className="flex flex-col gap-8">
                {navPrimary.map((item) => {
                  const isActive = activeTab === item.name;

                  return (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className={`text-left uppercase text-[0.82rem] transition-all duration-300 ${
                        isActive
                          ? "text-[#f2ede6] tracking-[0.18em] font-medium"
                          : "text-white/46 tracking-[0.24em] hover:text-white/76"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-col gap-6">
                {navSecondary.map((item) => {
                  const isActive = activeTab === item.name;

                  return (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className={`text-left uppercase text-[0.72rem] transition-all duration-300 ${
                        isActive
                          ? "text-[#f2ede6] tracking-[0.18em] font-medium"
                          : "text-white/46 tracking-[0.24em] hover:text-white/76"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-col gap-6">
                {navContact.map((item) => {
                  const isActive = activeTab === item.name;

                  return (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className={`text-left uppercase text-[0.72rem] transition-all duration-300 ${
                        isActive
                          ? "text-[#f2ede6] tracking-[0.18em] font-medium"
                          : "text-white/46 tracking-[0.24em] hover:text-white/76"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="md:hidden fixed bottom-5 right-5 z-[61]">
        <button
          onClick={() => onOpenResume?.()}
          className="uppercase text-[0.68rem] tracking-[0.24em] text-white/46 hover:text-white/78 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          Resume
        </button>
      </div>
    </>
  );
}
