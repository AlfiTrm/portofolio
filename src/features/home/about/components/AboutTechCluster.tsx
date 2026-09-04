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

export default function AboutTechCluster() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative mt-6 md:-mt-16"
    >
      <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
        <div className="max-w-[15rem] md:ml-[8%]">
          <MetaLabelReveal
            as="div"
            className="text-[0.58rem] uppercase text-white/34"
            delay={0.04}
          >
            what stays open
          </MetaLabelReveal>
          <BodyLineReveal
            delay={0.14}
            className="mt-4 text-[0.88rem] leading-[1.75] text-white/44"
            lines={[
              "next, react, typescript, tailwind.",
              "small tools, repeated often, shaped until they feel right.",
            ]}
          />
        </div>

        <div className="flex flex-wrap justify-start gap-3 md:justify-end">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.16 + index * 0.06,
                duration: 0.72,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="keycap min-w-[8.6rem] border border-white/10 bg-white/[0.03] px-4 py-4"
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
    </motion.div>
  );
}
