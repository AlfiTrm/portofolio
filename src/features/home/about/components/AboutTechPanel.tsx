"use client";

import { motion } from "framer-motion";
import { techStack } from "@/features/home/data/techStack";
import BodyLineReveal from "@/shared/components/text/BodyLineReveal";
import MetaLabelReveal from "@/shared/components/text/MetaLabelReveal";

const techLogos: Record<string, string> = {
  nextjs: "N",
  typescript: "TS",
  react: "R",
  javascript: "JS",
  tailwind: "TW",
};

export default function AboutTechPanel() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-14% 0px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-[19rem] overflow-hidden border border-white/8 bg-[#090908] px-5 py-5 md:px-6 md:py-6"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_10%,rgba(244,238,220,0.08),transparent_28%)]" />
      <div className="relative z-10">
        <MetaLabelReveal
          as="div"
          className="text-[0.6rem] uppercase text-white/34"
          delay={0.05}
        >
          what i use
        </MetaLabelReveal>

        <BodyLineReveal
          delay={0.14}
          className="mt-4 mb-6 max-w-[14rem] text-[0.86rem] leading-[1.7] text-white/44"
          lines={["a small stack, used with intent.", "enough to build, shape, and refine."]}
        />

        <div className="grid grid-cols-2 gap-3">
          {techStack.map((tech) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.16 + techStack.findIndex((entry) => entry.name === tech.name) * 0.06,
                duration: 0.72,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="keycap border border-white/10 bg-white/[0.03] px-4 py-4"
            >
              <span className="mb-3 block text-[0.72rem] text-white/30">
                {techLogos[tech.icon] ?? tech.name.slice(0, 2)}
              </span>
              <span className="block text-[0.9rem] text-[#f0e7d4]/88">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
