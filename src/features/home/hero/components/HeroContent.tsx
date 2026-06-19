"use client";

import { motion } from "framer-motion";
import HeroImage from "./HeroImage";
import ScrollIndicator from "./ScrollIndicator";

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] as const },
  },
};

interface HeroContentProps {
  onOpenResume?: () => void;
}

export default function HeroContent({ onOpenResume }: HeroContentProps) {
  return (
    <section
      id="home"
      className="relative z-10 flex min-h-screen items-center overflow-hidden px-5 pt-20 md:px-8 md:pt-24"
    >
      <HeroImage src="/hero/gambaralfi.webp" alt="Portrait texture" />

      <div className="pointer-events-none absolute -top-16 left-1/2 z-10 h-[56vh] min-h-[340px] w-[82vw] max-w-[1120px] -translate-x-1/2 opacity-95 mix-blend-screen">
        <div className="absolute inset-x-[18%] top-0 h-[24%] rounded-full bg-[radial-gradient(circle_at_50%_0%,rgba(244,238,220,0.34),rgba(244,238,220,0.12)_42%,transparent_78%)] blur-3xl" />
        <div className="absolute left-[27%] top-0 h-full w-[6%] bg-[linear-gradient(180deg,rgba(244,238,220,0.34)_0%,rgba(244,238,220,0.12)_28%,transparent_92%)] blur-xl" />
        <div className="absolute left-[41%] top-0 h-full w-[10%] bg-[linear-gradient(180deg,rgba(244,238,220,0.4)_0%,rgba(244,238,220,0.16)_26%,transparent_88%)] blur-xl" />
        <div className="absolute left-1/2 top-0 h-full w-[16%] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(244,238,220,0.3)_0%,rgba(244,238,220,0.14)_22%,transparent_86%)] blur-2xl" />
        <div className="absolute right-[34%] top-0 h-full w-[8%] bg-[linear-gradient(180deg,rgba(244,238,220,0.28)_0%,rgba(244,238,220,0.1)_30%,transparent_92%)] blur-xl" />
        <div className="absolute right-[22%] top-0 h-full w-[5%] bg-[linear-gradient(180deg,rgba(244,238,220,0.24)_0%,rgba(244,238,220,0.08)_28%,transparent_94%)] blur-xl" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.08)_34%,rgba(0,0,0,0.4)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(60,47,29,0.14),transparent_36%)]" />

      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
        className="absolute right-6 top-[17.5%] z-20 hidden w-[9.25rem] md:block lg:right-10"
      >
        <p className="text-justify text-[0.55rem] uppercase leading-[1.45] tracking-[0.16em] text-[#efe6d1]/58">
          made from quiet choices, sharp edges, soft light, and things that
          just feel right.
        </p>
      </motion.div>

      <div className="relative z-20 mx-auto flex w-full max-w-[1380px] flex-col justify-center">
        <div className="grid min-h-[74vh] items-center gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-4">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="self-center md:self-start md:pt-[26vh]"
          >
            <p className="text-center text-[2.85rem] leading-[0.92] tracking-[-0.02em] text-[#f0e7d4] sm:text-[3.8rem] md:text-left md:text-[4.8rem] lg:text-[5.5rem] [font-family:var(--font-akira)]">
              port
            </p>
            <p className="mt-10 text-center text-[0.56rem] uppercase tracking-[0.28em] text-[#efe6d1]/58 md:mt-[4.75rem] md:pl-7 md:text-left">
              <span className="block">currently powered by coffee</span>
              <span className="mt-1 block">and questionable sleep</span>
            </p>
          </motion.div>

          <div className="hidden md:block" />

          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.12 }}
            className="self-center md:self-end md:pb-[19vh]"
          >
            <p className="text-center text-[2.85rem] leading-[0.92] tracking-[-0.02em] text-[#f0e7d4] sm:text-[3.8rem] md:text-right md:text-[4.8rem] lg:text-[5.5rem] [font-family:var(--font-akira)]">
              folio
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="pointer-events-none absolute inset-x-0 bottom-[14vh] z-20 mx-auto flex max-w-[320px] justify-between px-2 text-[0.48rem] uppercase tracking-[0.28em] text-[#efe6d1]/46 md:bottom-[11.5vh] md:max-w-[580px]"
        >
          <span>still studies</span>
          <button
            onClick={() => onOpenResume?.()}
            className="pointer-events-auto text-[#efe6d1]/72 transition-colors duration-300 hover:text-[#efe6d1] focus:outline-none focus-visible:text-[#efe6d1]"
          >
            {"<Resume/>"}
          </button>
          <span>still exploring</span>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
