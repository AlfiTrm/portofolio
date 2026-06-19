"use client";

import { motion } from "framer-motion";
import BodyLineReveal from "@/shared/components/text/BodyLineReveal";
import MetaLabelReveal from "@/shared/components/text/MetaLabelReveal";

export default function AboutTonePanel() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 38 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-14% 0px" }}
      transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-[15.5rem] overflow-hidden border border-white/8 bg-[#090908] px-5 py-5 md:px-6 md:py-6"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),transparent_42%)]" />
      <div className="relative z-10 flex h-full flex-col justify-between gap-8">
        <MetaLabelReveal
          as="div"
          className="text-[0.6rem] uppercase text-white/34"
          delay={0.05}
        >
          how i see the work
        </MetaLabelReveal>

        <BodyLineReveal
          delay={0.16}
          className="max-w-[16rem] text-[1rem] leading-[1.75] text-white/58"
          lines={[
            "good interfaces should feel calm before they feel clever.",
            "motion is there to guide the eye, not beg for attention.",
            "the details matter because people notice the feeling first.",
          ]}
        />
      </div>
    </motion.article>
  );
}
