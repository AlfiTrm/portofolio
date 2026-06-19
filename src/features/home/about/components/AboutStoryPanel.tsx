"use client";

import { motion, MotionValue } from "framer-motion";
import Image from "next/image";
import HeadlineReveal from "@/shared/components/text/HeadlineReveal";
import BodyLineReveal from "@/shared/components/text/BodyLineReveal";
import MetaLabelReveal from "@/shared/components/text/MetaLabelReveal";

interface AboutStoryPanelProps {
  rotateX: MotionValue<string | number>;
  rotateY: MotionValue<string | number>;
  onPointerMove: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerLeave: () => void;
}

export default function AboutStoryPanel({
  rotateX,
  rotateY,
  onPointerMove,
  onPointerLeave,
}: AboutStoryPanelProps) {
  return (
    <motion.article
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-18% 0px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-[42rem] overflow-hidden border border-white/8 bg-[#090908] px-5 pb-8 pt-6 md:px-8 md:pb-10 md:pt-8"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.015)_18%,rgba(255,255,255,0)_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(244,238,220,0.14),transparent_36%)]" />

      <motion.div
        className="pointer-events-none absolute -top-8 left-1/2 h-[23rem] w-[78%] -translate-x-1/2 opacity-90 mix-blend-screen"
        initial={{ opacity: 0, y: -12 }}
        whileInView={{ opacity: 0.9, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.22, duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-x-[18%] top-0 h-[22%] bg-[radial-gradient(circle_at_50%_0%,rgba(244,238,220,0.28),rgba(244,238,220,0.08)_48%,transparent_78%)] blur-3xl" />
        <div className="absolute left-[37%] top-0 h-full w-[8%] bg-[linear-gradient(180deg,rgba(244,238,220,0.2)_0%,rgba(244,238,220,0.06)_30%,transparent_88%)] blur-xl" />
        <div className="absolute left-1/2 top-0 h-full w-[13%] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(244,238,220,0.18)_0%,rgba(244,238,220,0.06)_28%,transparent_84%)] blur-2xl" />
        <div className="absolute right-[36%] top-0 h-full w-[7%] bg-[linear-gradient(180deg,rgba(244,238,220,0.16)_0%,rgba(244,238,220,0.05)_30%,transparent_88%)] blur-xl" />
      </motion.div>

      <div className="relative z-10 flex h-full flex-col justify-between gap-8">
        <div className="flex items-start justify-between gap-4">
          <MetaLabelReveal
            as="div"
            className="text-[0.58rem] uppercase leading-[1.5] text-[#efe6d1]/42"
            delay={0.1}
          >
            scene one
          </MetaLabelReveal>
          <BodyLineReveal
            delay={0.18}
            className="max-w-[9rem] text-right text-[0.56rem] uppercase tracking-[0.2em] text-white/28"
            lines={["quiet screen glow,", "loud interior world."]}
          />
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-[4.25rem] flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16, duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[38rem]"
          >
            <div className="absolute inset-x-[8%] top-[12%] h-[72%] bg-white/[0.06] blur-3xl" />
            <Image
              src="/about/cartoon-chill.svg"
              alt="Cartoon chill portrait"
              width={780}
              height={780}
              className="relative z-10 mx-auto h-auto w-full max-w-[37rem] object-contain"
              priority
            />
          </motion.div>
        </div>

        <div className="relative z-10 max-w-[30rem] pt-[21.5rem] md:pt-[25.5rem]">
          <BodyLineReveal
            delay={0.06}
            className="text-[1.02rem] leading-[1.15] text-[#f0e7d4] md:text-[1.35rem]"
            lines={["hi, i'm"]}
          />
          <h2 className="mt-2 ml-7 text-[2.5rem] leading-[0.94] text-[#f0e7d4] md:ml-12 md:text-[4.6rem]">
            <HeadlineReveal text="Alfi Tsani" delay={0.12} />
          </h2>

          <BodyLineReveal
            delay={0.38}
            className="mt-8 max-w-[24rem] text-[0.96rem] leading-[1.85] text-white/62 md:ml-16 md:text-[1rem]"
            lines={[
              "i build interfaces the way i process the world:",
              "slowly, visually, and with a lot of attention",
              "to what people feel before they click.",
            ]}
          />

          <BodyLineReveal
            delay={0.56}
            className="mt-5 max-w-[20rem] text-[0.82rem] leading-[1.75] text-white/38 md:ml-9"
            lines={[
              "most days start with coffee, curiosity,",
              "and the urge to make something",
              "cleaner than it was before.",
            ]}
          />
        </div>
      </div>
    </motion.article>
  );
}
