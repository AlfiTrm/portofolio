"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { type ReactNode, useRef, useState } from "react";
import {
  SiCss3,
  SiFigma,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiNextdotjs,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { FaReact } from "react-icons/fa";
import Navbar from "@/shared/components/Navbar";
import MobileNavbar from "@/shared/components/MobileNavbar";
import BodyLineReveal from "@/shared/components/text/BodyLineReveal";
import HeadlineReveal from "@/shared/components/text/HeadlineReveal";
import MetaLabelReveal from "@/shared/components/text/MetaLabelReveal";
import HeroLightRays from "./HeroLightRays";
import { techStack } from "@/features/home/hero/data/techStack";

const techIconMap: Record<string, ReactNode> = {
  nextjs: <SiNextdotjs />,
  typescript: <SiTypescript />,
  react: <FaReact />,
  javascript: <SiJavascript />,
  tailwind: <SiTailwindcss />,
  figma: <SiFigma />,
  vercel: <SiVercel />,
  github: <SiGithub />,
  supabase: <SiSupabase />,
  laravel: <SiLaravel />,
  html: <SiHtml5 />,
  css: <SiCss3 />,
};

const techDisplayStretchMap: Record<string, number> = {
  "Next.js": 0.82,
  TypeScript: 0.52,
  React: 1,
  JavaScript: 0.52,
  "Tailwind CSS": 0.44,
  Figma: 0.92,
  Vercel: 0.8,
  GitHub: 0.74,
  Supabase: 0.62,
  Laravel: 0.72,
  HTML: 1,
  CSS: 1,
};

const techColorMap: Record<string, string> = {
  "Next.js": "rgba(255,255,255,0.07)",
  TypeScript: "rgba(49,120,198,0.16)",
  React: "rgba(97,218,251,0.16)",
  JavaScript: "rgba(247,223,30,0.13)",
  "Tailwind CSS": "rgba(6,182,212,0.15)",
  Figma: "rgba(242,78,30,0.14)",
  Vercel: "rgba(255,255,255,0.07)",
  GitHub: "rgba(255,255,255,0.07)",
  Supabase: "rgba(62,207,142,0.15)",
  Laravel: "rgba(255,45,32,0.14)",
  HTML: "rgba(227,79,38,0.14)",
  CSS: "rgba(21,114,182,0.16)",
};

interface HeroAboutTransitionProps {
  onOpenResume?: () => void;
  onHeroImageReady?: () => void;
}

export default function HeroAboutTransition({
  onOpenResume,
  onHeroImageReady,
}: HeroAboutTransitionProps) {
  const [activeTechName, setActiveTechName] = useState("React");
  const activeTechStretch =
    techDisplayStretchMap[activeTechName] ?? techDisplayStretchMap.React;
  const activeTechColor = techColorMap[activeTechName] ?? techColorMap.React;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.18, 0.36], [1, 1, 0]);
  const heroLeftX = useTransform(scrollYProgress, [0.12, 0.44], [0, -76]);
  const heroRightX = useTransform(scrollYProgress, [0.12, 0.44], [0, 76]);
  const heroMetaY = useTransform(scrollYProgress, [0.08, 0.34], [0, 28]);
  const heroChromeY = useTransform(scrollYProgress, [0.12, 0.36], [0, -28]);
  const heroChromeOpacity = useTransform(scrollYProgress, [0.12, 0.34], [1, 0]);
  const frameOpacity = useTransform(scrollYProgress, [0, 0.01], [1, 1]);
  const sideFrameWidth = useTransform(scrollYProgress, [0.18, 0.58], ["0vw", "48vw"]);
  const topFrameHeight = useTransform(scrollYProgress, [0.22, 0.58], ["0vh", "34vh"]);
  const bottomFrameHeight = useTransform(scrollYProgress, [0.26, 0.6], ["0vh", "30vh"]);
  const leftFrameRotate = useTransform(scrollYProgress, [0.18, 0.62, 0.84, 0.91], [-24, -10, -10, 0]);
  const rightFrameRotate = useTransform(scrollYProgress, [0.18, 0.62, 0.84, 0.91], [24, 10, 10, 0]);
  const topFrameRotate = useTransform(scrollYProgress, [0.22, 0.6, 0.84, 0.91], [12, 5.5, 5.5, 0]);
  const bottomFrameRotate = useTransform(scrollYProgress, [0.26, 0.62, 0.84, 0.91], [-12, -5.5, -5.5, 0]);
  const slashFrameWidth = useTransform(scrollYProgress, [0.3, 0.62], ["0vw", "66vw"]);
  const slashFrameOpacity = useTransform(scrollYProgress, [0.3, 0.42, 0.84, 0.91], [0, 1, 1, 0]);
  const leftFrameClip = useTransform(
    scrollYProgress,
    [0.84, 0.91],
    ["polygon(0 0, 82% 5%, 100% 92%, 0 100%)", "polygon(0 0, 100% 0, 100% 100%, 0 100%)"]
  );
  const rightFrameClip = useTransform(
    scrollYProgress,
    [0.84, 0.91],
    ["polygon(18% 5%, 100% 0, 100% 100%, 0 92%)", "polygon(0 0, 100% 0, 100% 100%, 0 100%)"]
  );
  const topFrameClip = useTransform(
    scrollYProgress,
    [0.84, 0.91],
    ["polygon(0 0, 100% 0, 92% 74%, 10% 100%)", "polygon(0 0, 100% 0, 100% 100%, 0 100%)"]
  );
  const bottomFrameClip = useTransform(
    scrollYProgress,
    [0.84, 0.91],
    ["polygon(8% 0, 92% 18%, 100% 100%, 0 100%)", "polygon(0 0, 100% 0, 100% 100%, 0 100%)"]
  );
  const aboutOpacity = useTransform(scrollYProgress, [0.48, 0.62], [0, 1]);
  const aboutChromeY = useTransform(scrollYProgress, [0.48, 0.62], [-24, 0]);
  const aboutMetaY = useTransform(scrollYProgress, [0.48, 0.62], [22, 0]);
  const aboutLeftX = useTransform(scrollYProgress, [0.48, 0.64], [-34, 0]);
  const aboutRightX = useTransform(scrollYProgress, [0.48, 0.64], [34, 0]);
  const aboutTextOpacity = useTransform(scrollYProgress, [0.48, 0.62, 0.78, 0.86], [0, 1, 1, 0]);
  const aboutTextY = useTransform(scrollYProgress, [0.78, 0.86], [0, -18]);
  const highlightOneOpacity = useTransform(scrollYProgress, [0.65, 0.68], [0.42, 1]);
  const highlightTwoOpacity = useTransform(scrollYProgress, [0.68, 0.71], [0.42, 1]);
  const highlightThreeOpacity = useTransform(scrollYProgress, [0.71, 0.74], [0.42, 1]);
  const highlightFourOpacity = useTransform(scrollYProgress, [0.74, 0.77], [0.42, 1]);
  const portraitOpacity = useTransform(scrollYProgress, [0, 0.78, 0.91], [1, 1, 0]);
  const techShowcaseOpacity = useTransform(scrollYProgress, [0.86, 0.91], [0, 1]);
  const techShowcaseY = useTransform(scrollYProgress, [0.86, 0.91], [18, 0]);
  const techDisplayScale = useTransform(scrollYProgress, [0.84, 0.91], [1.12, 1]);
  const portraitColorOpacity = useTransform(scrollYProgress, [0.28, 0.76], [1, 0]);
  const portraitMonoOpacity = useTransform(scrollYProgress, [0.28, 0.76], [0, 1]);

  return (
    <section ref={sectionRef} id="home" className="relative h-[460vh] bg-stage">
      <div
        id="about"
        className="absolute top-[225vh] h-screen w-px"
        aria-hidden="true"
      />
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-stage" aria-hidden="true" />

        <HeroLightRays />

        <motion.div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-stage" />
          <motion.div
            className="absolute left-1/2 top-0 h-screen w-[76vw] -translate-x-1/2 overflow-hidden"
            style={{ opacity: portraitOpacity }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ opacity: portraitColorOpacity }}
            >
              <Image
                src="/hero/gambaralfi.webp"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-contain object-top [filter:brightness(0.9)_sepia(0.18)_saturate(0.82)_contrast(0.94)]"
                onLoad={onHeroImageReady}
              />
            </motion.div>
            <motion.div
              className="absolute inset-0"
              style={{ opacity: portraitMonoOpacity }}
              aria-hidden="true"
            >
              <Image
                src="/hero/gambaralfi.webp"
                alt=""
                fill
                sizes="100vw"
                className="object-contain object-top [filter:brightness(0.94)_grayscale(1)_sepia(0.04)_saturate(0.72)_contrast(1)]"
              />
            </motion.div>
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(19,17,13,0.7)_0%,rgba(19,17,13,0.42)_20%,rgba(19,17,13,0.1)_44%,rgba(19,17,13,0.14)_68%,rgba(19,17,13,0.56)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(241,233,210,0.04)_0%,rgba(0,0,0,0)_18%,rgba(0,0,0,0.08)_56%,rgba(0,0,0,0.46)_100%)]" />
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-0 z-[9] hidden text-white md:block"
          style={{ opacity: techShowcaseOpacity, y: techShowcaseY }}
          aria-hidden="true"
        >
          <motion.div
            key={`${activeTechName}-watermark`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-8deg] text-[clamp(18rem,42vw,52rem)] mix-blend-screen [filter:drop-shadow(0_2px_0_rgba(255,255,255,0.035))_drop-shadow(0_-18px_36px_rgba(0,0,0,0.86))_drop-shadow(0_20px_34px_rgba(255,255,255,0.025))]"
            style={{ color: activeTechColor }}
          >
            {techIconMap[
              techStack.find((tech) => tech.name === activeTechName)?.icon ??
                "react"
            ]}
          </motion.div>
          <motion.p
            key={activeTechName}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-1/2 w-max -translate-x-1/2 -translate-y-1/2 text-center text-[clamp(4rem,7vw,8rem)] leading-[0.72] tracking-[-0.06em] [font-family:var(--font-akira)]"
            style={{ scale: techDisplayScale, scaleX: activeTechStretch }}
          >
            {activeTechName}
          </motion.p>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute -bottom-[26vh] -top-[26vh] left-[-18vw] z-10 origin-left bg-[#f2ede6]"
          style={{
            width: sideFrameWidth,
            opacity: frameOpacity,
            rotate: leftFrameRotate,
            clipPath: leftFrameClip,
          }}
          aria-hidden="true"
        />
        <motion.div
          className="pointer-events-none absolute -bottom-[26vh] -top-[26vh] right-[-18vw] z-10 origin-right bg-[#f2ede6]"
          style={{
            width: sideFrameWidth,
            opacity: frameOpacity,
            rotate: rightFrameRotate,
            clipPath: rightFrameClip,
          }}
          aria-hidden="true"
        />
        <motion.div
          className="pointer-events-none absolute left-[-22vw] right-[-22vw] top-[-10vh] z-10 origin-top bg-[#f2ede6]"
          style={{
            height: topFrameHeight,
            opacity: frameOpacity,
            rotate: topFrameRotate,
            clipPath: topFrameClip,
          }}
          aria-hidden="true"
        />
        <motion.div
          className="pointer-events-none absolute bottom-[-10vh] left-[-22vw] right-[-22vw] z-10 origin-bottom bg-[#f2ede6]"
          style={{
            height: bottomFrameHeight,
            opacity: frameOpacity,
            rotate: bottomFrameRotate,
            clipPath: bottomFrameClip,
          }}
          aria-hidden="true"
        />
        <motion.div
          className="pointer-events-none absolute left-[-24vw] top-[6vh] z-10 h-[36vh] origin-left rotate-[-28deg] bg-[#f2ede6]"
          style={{
            width: slashFrameWidth,
            opacity: slashFrameOpacity,
            clipPath: "polygon(0 16%, 100% 0, 92% 82%, 4% 100%)",
          }}
          aria-hidden="true"
        />
        <motion.div
          className="pointer-events-none absolute bottom-[3vh] right-[-26vw] z-10 h-[34vh] origin-right rotate-[-28deg] bg-[#f2ede6]"
          style={{
            width: slashFrameWidth,
            opacity: slashFrameOpacity,
            clipPath: "polygon(7% 0, 100% 14%, 96% 100%, 0 76%)",
          }}
          aria-hidden="true"
        />

        <Navbar
          onOpenResume={() => onOpenResume?.()}
          style={{ opacity: heroChromeOpacity, y: heroChromeY }}
        />
        <Navbar
          onOpenResume={() => onOpenResume?.()}
          tone="dark"
          style={{ opacity: aboutOpacity, y: aboutChromeY }}
        />
        <MobileNavbar onOpenResume={() => onOpenResume?.()} />

        <motion.div
          className="absolute inset-0 z-20 px-5 pt-20 md:px-8 md:pt-24"
          style={{ opacity: heroTextOpacity }}
        >
          <div className="absolute right-6 top-[17.5%] hidden w-[9.25rem] md:block lg:right-10">
            <BodyLineReveal
              isActive
              skipAnimation
              className="text-justify text-[0.55rem] uppercase leading-[1.45] tracking-[0.16em] text-[#efe6d1]/58"
              lines={[
                "made from quiet choices,",
                "sharp edges, soft light,",
                "and things that just",
                "feel right.",
              ]}
            />
          </div>

          <div className="mx-auto flex h-full w-full max-w-[1380px] flex-col justify-center">
            <div className="grid min-h-[74vh] items-center gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-4">
              <motion.div
                className="self-center md:self-start md:pt-[26vh]"
                style={{ x: heroLeftX }}
              >
                <p className="text-center text-[2.85rem] leading-[0.92] tracking-[-0.02em] text-[#f0e7d4] sm:text-[3.8rem] md:text-left md:text-[5rem] lg:text-[7rem] [font-family:var(--font-akira)]">
                  <HeadlineReveal text="port" isActive skipAnimation />
                </p>
                <BodyLineReveal
                  isActive
                  skipAnimation
                  className="mt-10 text-center text-[0.56rem] uppercase tracking-[0.28em] text-[#efe6d1]/58 md:mt-[4.75rem] md:pl-7 md:text-left"
                  lineClassName="leading-[1.5]"
                  lines={[
                    "currently powered by coffee",
                    "and questionable sleep",
                  ]}
                />
              </motion.div>

              <div className="hidden md:block" />

              <motion.div
                className="self-center md:self-end md:pb-[19vh]"
                style={{ x: heroRightX }}
              >
                <p className="text-center text-[2.85rem] leading-[0.92] tracking-[-0.02em] text-[#f0e7d4] sm:text-[3.8rem] md:text-right md:text-[5rem] lg:text-[7rem] [font-family:var(--font-akira)]">
                  <HeadlineReveal text="folio" isActive skipAnimation />
                </p>
              </motion.div>
            </div>

            <motion.div
              className="pointer-events-none absolute inset-x-0 bottom-[14vh] mx-auto flex max-w-[320px] justify-between px-2 text-[0.48rem] uppercase tracking-[0.28em] text-[#efe6d1]/46 md:bottom-[11.5vh] md:max-w-[580px]"
              style={{ y: heroMetaY }}
            >
              <MetaLabelReveal isActive>still studies</MetaLabelReveal>
              <button
                onClick={() => onOpenResume?.()}
                className="pointer-events-auto text-[#efe6d1]/72 transition-colors duration-300 hover:text-[#efe6d1] focus:outline-none focus-visible:text-[#efe6d1]"
              >
                {"<Resume/>"}
              </button>
              <MetaLabelReveal isActive>still exploring</MetaLabelReveal>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-0 z-30 px-5 pt-20 text-black md:px-8 md:pt-24"
          style={{ opacity: aboutTextOpacity, y: aboutTextY }}
        >
          <div className="mx-auto flex h-full w-full max-w-[1380px] flex-col justify-center">
            <div className="grid min-h-[74vh] items-center gap-10 md:block">
              <motion.div
                className="self-center md:absolute md:left-8 md:top-[42vh] md:w-[30vw] md:-translate-y-1/2 lg:left-12"
                style={{ x: aboutLeftX }}
              >
                <p className="text-center text-[1rem] leading-[1.6] text-black/58 md:text-left">
                  hi, i&apos;m
                </p>
                <h2 className="mt-2 text-center text-[2.6rem] leading-[0.95] tracking-[-0.02em] text-black sm:text-[3.4rem] md:text-left md:text-[4.65rem] lg:text-[5.15rem] [font-family:var(--font-akira)]">
                  <span className="block">Alfi</span>
                  <span className="block">Tsani</span>
                </h2>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="mx-auto mt-8 max-w-[26rem] md:absolute md:right-6 md:top-[46vh] md:mx-0 md:mt-0 md:w-[min(22vw,26rem)] md:-translate-y-1/2 lg:right-10"
            style={{ x: aboutRightX }}
          >
            <p className="text-center text-[0.95rem] leading-[1.82] text-black/74 md:text-right md:text-[0.98rem]">
              <span className="text-black/42">I&apos;m a passionate </span>
              <motion.span style={{ opacity: highlightOneOpacity }} className="text-black">
                Junior Frontend Developer
              </motion.span>
              <span className="text-black/42"> based in Indonesia, specializing in creating </span>
              <motion.span style={{ opacity: highlightTwoOpacity }} className="text-black">
                beautiful
              </motion.span>
              <span className="text-black/42"> and interactive web experiences. My journey started in my 4th semester when I discovered the magic of building </span>
              <motion.span style={{ opacity: highlightThreeOpacity }} className="text-black">
                user interfaces
              </motion.span>
              <span className="text-black/42">. I love turning complex problems into simple, beautiful, and </span>
              <motion.span style={{ opacity: highlightFourOpacity }} className="text-black">
                intuitive designs
              </motion.span>
              <span className="text-black/42">.</span>
            </p>
          </motion.div>

          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-[11.5vh] z-40 mx-auto hidden max-w-[580px] justify-between px-2 text-[0.48rem] uppercase tracking-[0.28em] text-black/44 md:flex"
            style={{ opacity: aboutOpacity, y: aboutMetaY }}
          >
            <span>still studies</span>
            <button
              onClick={() => onOpenResume?.()}
              className="pointer-events-auto text-black/68 transition-colors duration-300 hover:text-black focus:outline-none focus-visible:text-black"
            >
              {"<Resume/>"}
            </button>
            <span>still exploring</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-0 z-30 hidden text-black md:block"
          style={{ opacity: techShowcaseOpacity, y: techShowcaseY }}
          aria-hidden="true"
        >
          <div className="absolute left-8 top-1/2 w-[22vw] -translate-y-1/2 lg:left-12">
            <p className="text-[clamp(2.8rem,5.6vw,6.4rem)] leading-[0.82] tracking-[-0.04em] text-black [font-family:var(--font-akira)]">
              Tech
              <span className="block">I use</span>
            </p>
            <p className="mt-5 max-w-[16rem] text-[0.82rem] leading-[1.7] text-black/52">
              A small stack I reach for when the interface needs to feel fast,
              sharp, and easy to keep alive.
            </p>
          </div>

          <div className="pointer-events-auto absolute right-8 top-1/2 grid -translate-y-1/2 grid-cols-2 gap-3 lg:right-10">
            {techStack.map((tech, index) => (
              <button
                type="button"
                key={tech.name}
                onMouseEnter={() => setActiveTechName(tech.name)}
                onFocus={() => setActiveTechName(tech.name)}
                className={`flex h-11 w-11 items-center justify-center text-[1.45rem] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/50 ${
                  activeTechName === tech.name
                    ? "text-black"
                    : "text-black/36 hover:text-black/74"
                }`}
                aria-label={`Show ${tech.name}`}
              >
                {techIconMap[tech.icon] ?? (
                  <span className="text-[0.72rem] leading-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
