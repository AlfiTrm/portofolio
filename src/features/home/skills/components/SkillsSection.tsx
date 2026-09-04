"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/shared/components/motion/ScrollReveal";
import { skillsData } from "../data/skillsData";
import "../styles/skills.css";

export default function SkillsSection() {
  return (
    <section
      id="recognition"
      className="relative overflow-hidden px-4 py-32 md:px-8"
    >
      <div className="absolute top-20 right-0 h-[28rem] w-[28rem] rounded-full bg-[#f3ede2]/[0.04] blur-3xl" />
      <div className="absolute bottom-0 left-[-8rem] h-[24rem] w-[24rem] rounded-full bg-[#c97b63]/[0.10] blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <ScrollReveal className="mb-18 md:mb-24">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(16rem,0.42fr)] md:items-end">
            <h2 className="max-w-3xl text-balance text-[2.9rem] font-semibold leading-[0.9] text-white md:text-[4.5rem]">
              {skillsData.title}
            </h2>
            <p className="max-w-[28rem] text-pretty text-sm leading-relaxed text-white/52 md:justify-self-end md:text-[0.98rem]">
              {skillsData.description}
            </p>
          </div>
        </ScrollReveal>

        <div className="relative">
          <div className="pointer-events-none absolute bottom-10 left-1/2 top-8 hidden w-px -translate-x-1/2 bg-gradient-to-b from-white/12 via-white/7 to-transparent md:block" />

          <div className="space-y-20 md:space-y-28">
            {skillsData.awards.map((item, index) => (
              <ScrollReveal
                key={item.title}
                delay={0.08 + index * 0.08}
                distance={64}
                className={index % 2 === 0 ? "md:pr-[46%]" : "md:pl-[46%]"}
              >
                {(() => {
                  const tone =
                    item.place === "1st"
                      ? {
                          value:
                            "text-[#f1cf7a] [text-shadow:0_0_26px_rgba(241,207,122,0.18)]",
                          label: "text-[#cfab52]",
                          glow:
                            "bg-[radial-gradient(circle,rgba(241,207,122,0.14),transparent_70%)]",
                        }
                      : {
                          value:
                            "text-[#d9dee8] [text-shadow:0_0_24px_rgba(217,222,232,0.14)]",
                          label: "text-[#aeb7c6]",
                          glow:
                            "bg-[radial-gradient(circle,rgba(217,222,232,0.12),transparent_70%)]",
                        };

                  return (
                <motion.article
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.24 }}
                  className="relative min-h-[22rem]"
                >
                  <div
                    className={`pointer-events-none absolute -left-4 top-6 h-28 w-28 rounded-full blur-3xl md:h-40 md:w-40 ${tone.glow}`}
                  />
                  <div
                    className={`absolute top-8 hidden h-px w-[4.5rem] bg-gradient-to-r md:block ${
                      index % 2 === 0
                        ? "right-[-5.75rem] from-white/32 to-transparent"
                        : "left-[-5.75rem] from-transparent to-white/32"
                    }`}
                  />
                  <div
                    className={`absolute top-[1.7rem] hidden h-3 w-3 rounded-full border border-[#f0e7d4]/30 bg-black md:block ${
                      index % 2 === 0 ? "right-[-6.2rem]" : "left-[-6.2rem]"
                    }`}
                  />

                  <div className="relative">
                    <div className="relative pt-12">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-4">
                          <div>
                            <p
                              className={`text-[4.6rem] font-semibold leading-none tracking-[-0.07em] md:text-[7rem] ${tone.value}`}
                            >
                              {item.place}
                            </p>
                            <p
                              className={`mt-1 text-[0.95rem] leading-none md:text-[1.05rem] ${tone.label}`}
                            >
                              place
                            </p>
                          </div>

                          <h3 className="max-w-[20rem] text-balance text-[1.8rem] leading-[0.94] text-white md:max-w-[24rem] md:text-[2.8rem] [font-family:var(--font-akira)]">
                            {item.title}
                          </h3>
                        </div>

                        <p className="shrink-0 pt-2 text-sm text-white/32">
                          {item.year}
                        </p>
                      </div>

                      <p className="mt-5 max-w-[34rem] text-pretty text-[0.98rem] leading-relaxed text-white/56">
                        {item.note}
                      </p>

                      <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)]">
                        <div>
                          <p className="text-pretty text-[0.95rem] leading-relaxed text-[#d8b08c]/86">
                            {item.theme}
                          </p>
                        </div>

                        <div className="space-y-5">
                          <p className="text-pretty text-sm leading-relaxed text-white/64">
                            {item.entry}
                          </p>
                          <p className="text-pretty text-sm leading-relaxed text-white/64">
                            {item.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
                  );
                })()}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}
