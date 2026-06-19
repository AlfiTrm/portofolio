"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "@/shared/components/ScrollReveal";
import { techStack } from "@/features/home/hero/data/techStack";
import { aboutData } from "../data/aboutData";
import ExperienceTimeline from "../components/ExperienceTimeline";
import "../styles/about.css";

const tiltSpring = {
  stiffness: 120,
  damping: 18,
  mass: 0.4,
};

const techLogos: Record<string, string> = {
  nextjs: "N",
  typescript: "TS",
  react: "R",
  javascript: "JS",
  tailwind: "TW",
};

export default function AboutSection() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, tiltSpring);
  const smoothY = useSpring(pointerY, tiltSpring);
  const rotateX = useTransform(smoothY, [-40, 40], [6, -6]);
  const rotateY = useTransform(smoothX, [-40, 40], [-7, 7]);

  const introParagraphs = aboutData.description.split("\n\n");

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = event.clientX - rect.left - rect.width / 2;
    const relativeY = event.clientY - rect.top - rect.height / 2;
    pointerX.set(relativeX / 8);
    pointerY.set(relativeY / 8);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden pb-28 md:pb-28"
    >

      <div className="relative z-10 w-full mx-auto max-w-[1490px]">
        <div className="border border-white/8">
          <div className="grid gap-4 lg:grid-cols-[1.6fr_0.9fr]">
            <motion.article
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative min-h-[36rem] overflow-hidden border border-white/8 bg-[#0c0c0c] p-6 md:p-8"
            >
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.01)_22%,rgba(255,255,255,0)_58%)]" />

              <div className="relative z-10 flex h-full flex-col justify-end gap-10">
                <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
                  <div className="relative mt-2 w-full max-w-[34rem]">
                    <div className="absolute inset-x-[10%] top-[10%] h-[72%] bg-white/[0.05] blur-3xl" />
                    <Image
                      src="/about/cartoon-chill.svg"
                      alt="Cartoon chill portrait"
                      width={720}
                      height={720}
                      className="relative z-10 mx-auto h-auto w-full max-w-[31rem] object-contain md:max-w-[34rem]"
                      priority
                    />
                  </div>
                </div>

                <div className="relative z-10 max-w-[26rem] pt-[22rem] md:pt-[26rem]">
                  <div className="max-w-[16rem] md:max-w-[20rem]">
                    <p className="text-[1.15rem] leading-[1.2] text-[#f0e7d4] md:text-[1.5rem]">
                      hi, i&apos;m
                    </p>
                    <h2 className="mt-2 ml-8 text-3xl leading-[0.95] text-[#f0e7d4] md:ml-12 md:text-5xl">
                      Alfi Tsani
                    </h2>
                  </div>
                  <p className="mt-6 max-w-[22rem] text-[0.96rem] leading-[1.75] text-white/62 md:ml-16 md:text-[1rem]">
                    {introParagraphs[0]}
                  </p>
                  <p className="mt-4 max-w-[19rem] text-[0.86rem] leading-[1.7] text-white/40 md:ml-8">
                    {introParagraphs[1]}
                  </p>
                </div>

              </div>
            </motion.article>

            <div className="grid gap-4 lg:grid-rows-[0.9fr_1.1fr]">
              <article className="min-h-[14rem] border border-white/8 bg-[#0c0c0c] p-5 md:p-6">
                <p className="mb-4 text-[0.66rem] uppercase tracking-[0.24em] text-white/34">
                  quick notes
                </p>
                <div className="space-y-3 text-[0.94rem] leading-[1.65] text-white/58">
                  <p>based in malang, building on the frontend.</p>
                  <p>drawn to quiet interfaces, motion, and strong visual rhythm.</p>
                  <p>currently powered by coffee and questionable sleep.</p>
                </div>
              </article>

              <article className="min-h-[18rem] border border-white/8 bg-[#0c0c0c] p-5 md:p-6">
                <p className="mb-5 text-[0.66rem] uppercase tracking-[0.24em] text-white/34">
                  tech stack
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {techStack.map((tech) => (
                    <div
                      key={tech.name}
                      className="keycap border border-white/10 bg-white/[0.03] px-4 py-4"
                    >
                      <span className="mb-3 block text-[0.72rem] text-white/30">
                        {techLogos[tech.icon] ?? tech.name.slice(0, 2)}
                      </span>
                      <span className="block text-[0.9rem] text-[#f0e7d4]/88">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <ExperienceTimeline />
        </div>
      </div>

      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}
