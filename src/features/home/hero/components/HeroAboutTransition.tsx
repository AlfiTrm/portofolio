"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import AboutRevealLayer from "@/features/home/about/components/AboutRevealLayer";
import TransitionFrames from "@/features/home/components/TransitionFrames";
import HeroLightRays from "./HeroLightRays";
import HeroPortraitLayer from "./HeroPortraitLayer";
import HeroCopy from "./HeroCopy";

interface HeroAboutTransitionProps {
  isReady?: boolean;
  onOpenResume?: () => void;
}

export default function HeroAboutTransition({ isReady = true, onOpenResume }: HeroAboutTransitionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [renderRays, setRenderRays] = useState(true);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.18, 0.36], [1, 1, 0]);
  const heroLeftX = useTransform(scrollYProgress, [0.12, 0.44], [0, -76]);
  const heroRightX = useTransform(scrollYProgress, [0.12, 0.44], [0, 76]);
  const heroMetaY = useTransform(scrollYProgress, [0.08, 0.34], [0, 28]);
  const raysOpacityTarget = useTransform(
    scrollYProgress,
    [0.18, 0.38, 0.58],
    [1, 0.6, 0],
  );
  const raysOpacity = useSpring(raysOpacityTarget, { stiffness: 90, damping: 24 });
  const frameOpacity = useTransform(scrollYProgress, [0, 0.01], [1, 1]);
  const sideFrameWidth = useTransform(
    scrollYProgress,
    [0.18, 0.58, 0.86, 1],
    ["0vw", "56vw", "56vw", "78vw"],
  );
  const topFrameHeight = useTransform(
    scrollYProgress,
    [0.22, 0.58, 0.86, 1],
    ["0vh", "34vh", "34vh", "62vh"],
  );
  const bottomFrameHeight = useTransform(
    scrollYProgress,
    [0.26, 0.6, 0.86, 1],
    ["0vh", "30vh", "30vh", "62vh"],
  );
  const leftFrameRotate = useTransform(scrollYProgress, [0.18, 0.62], [-24, -10]);
  const rightFrameRotate = useTransform(scrollYProgress, [0.18, 0.62], [24, 10]);
  const topFrameRotate = useTransform(scrollYProgress, [0.22, 0.62], [12, 5.5]);
  const bottomFrameRotate = useTransform(scrollYProgress, [0.26, 0.62], [-12, -5.5]);
  const slashFrameWidth = useTransform(scrollYProgress, [0.3, 0.62], ["0vw", "66vw"]);
  const slashFrameOpacity = useTransform(scrollYProgress, [0.3, 0.42], [0, 1]);
  const aboutOpacity = useTransform(scrollYProgress, [0.48, 0.62], [0, 1]);
  const aboutMetaY = useTransform(scrollYProgress, [0.48, 0.62], [22, 0]);
  const aboutLeftX = useTransform(scrollYProgress, [0.48, 0.64], [-34, 0]);
  const aboutRightX = useTransform(scrollYProgress, [0.48, 0.64], [34, 0]);
  const aboutTextOpacity = useTransform(scrollYProgress, [0.48, 0.62, 0.86, 1], [0, 1, 1, 0]);
  const aboutTextY = useTransform(scrollYProgress, [0.86, 1], [0, -18]);
  const highlightOpacities = [
    useTransform(scrollYProgress, [0.61, 0.67], [0.42, 1]),
    useTransform(scrollYProgress, [0.67, 0.73], [0.42, 1]),
    useTransform(scrollYProgress, [0.73, 0.79], [0.42, 1]),
    useTransform(scrollYProgress, [0.79, 0.85], [0.42, 1]),
  ] as const;
  const portraitOpacity = useTransform(scrollYProgress, [0, 0.78, 0.91], [1, 1, 0]);
  const portraitColorOpacity = useTransform(scrollYProgress, [0.28, 0.76], [1, 0]);
  const portraitMonoOpacity = useTransform(scrollYProgress, [0.28, 0.76], [0, 1]);
  const revealTransition = {
    duration: reduceMotion ? 0 : 0.7,
    ease: [0.16, 1, 0.3, 1] as const,
  };
  const revealState = isReady
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: reduceMotion ? 0 : 14 };

  useMotionValueEvent(raysOpacity, "change", (opacity) => {
    setRenderRays(opacity > 0.01);
  });

  return (
    <section ref={sectionRef} id="home" className="relative h-[440vh] bg-stage">
      <div id="about" className="absolute top-[210vh] h-[230vh] w-px" aria-hidden="true" />
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-stage" aria-hidden="true" />
        {renderRays && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-[15]"
            style={{ opacity: raysOpacity }}
            aria-hidden="true"
          >
            <HeroLightRays isActive={isReady} />
          </motion.div>
        )}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[2]"
          initial={false}
          animate={revealState}
          transition={revealTransition}
        >
          <HeroPortraitLayer opacity={portraitOpacity} colorOpacity={portraitColorOpacity} monoOpacity={portraitMonoOpacity} />
        </motion.div>
        <TransitionFrames frameOpacity={frameOpacity} sideFrameWidth={sideFrameWidth} topFrameHeight={topFrameHeight} bottomFrameHeight={bottomFrameHeight} leftFrameRotate={leftFrameRotate} rightFrameRotate={rightFrameRotate} topFrameRotate={topFrameRotate} bottomFrameRotate={bottomFrameRotate} slashFrameWidth={slashFrameWidth} slashFrameOpacity={slashFrameOpacity} />
        <motion.div
          className="absolute inset-0 z-20"
          initial={false}
          animate={revealState}
          transition={{ ...revealTransition, delay: reduceMotion ? 0 : 0.14 }}
        >
          <HeroCopy opacity={heroTextOpacity} leftX={heroLeftX} rightX={heroRightX} metaY={heroMetaY} onOpenResume={onOpenResume} />
        </motion.div>
        <motion.div
          className="absolute inset-0 z-30"
          initial={false}
          animate={revealState}
          transition={{ ...revealTransition, delay: reduceMotion ? 0 : 0.14 }}
        >
          <AboutRevealLayer textOpacity={aboutTextOpacity} textY={aboutTextY} leftX={aboutLeftX} rightX={aboutRightX} metaOpacity={aboutOpacity} metaY={aboutMetaY} highlightOpacities={highlightOpacities} onOpenResume={onOpenResume} />
        </motion.div>
      </div>
    </section>
  );
}
