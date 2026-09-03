"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  period: string;
  focus: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  index: number;
  align?: "left" | "right";
}

export default function ProjectCard({
  title,
  period,
  focus,
  description,
  tags,
  image,
  liveUrl,
  index: indexProp,
  align = "left",
}: ProjectCardProps) {
  const isRight = align === "right";

  return (
    <motion.div
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: indexProp * 0.06 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      className="group relative"
      role="article"
      aria-label={`Project: ${title}`}
    >
      <div
        className={`grid items-start gap-8 lg:min-h-[34rem] lg:grid-cols-12 lg:gap-12 ${
          isRight ? "" : ""
        }`}
      >
        <div
          className={`relative ${
            isRight
              ? "lg:order-2 lg:col-span-7 lg:col-start-6"
              : "lg:col-span-7"
          }`}
        >
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.28 }}
            className="relative overflow-hidden bg-[#050505]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_10%,rgba(240,231,212,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.06),transparent_32%)]" />
            <div className="absolute inset-x-6 top-0 h-px bg-[#f0e7d4]/22" />
            <div className="absolute inset-y-6 left-0 w-px bg-[#f0e7d4]/14" />
            <div className="relative aspect-[16/10] overflow-hidden bg-[#050505] p-3 md:p-5">
              <Image
                src={image}
                alt={title}
                fill
                className="object-contain object-center px-2 py-2 opacity-88 grayscale-[0.28] transition-all duration-700 ease-out group-hover:scale-[1.025] group-hover:opacity-100 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.18)_52%,rgba(0,0,0,0.68))]" />
            </div>
          </motion.div>
        </div>

        <div
          className={`relative ${
            isRight
              ? "lg:order-1 lg:col-span-4 lg:col-start-1 lg:pt-18"
              : "lg:col-span-4 lg:col-start-9 lg:pt-20"
          }`}
        >
          <div className="relative">
            <p className="text-6xl font-semibold leading-none tracking-[-0.07em] text-[#f0e7d4]/[0.06] md:text-8xl">
              0{indexProp + 1}
            </p>
            <div className="relative -mt-3 space-y-6">
              <div className="flex items-start justify-between gap-4">
                <p className="text-[0.72rem] leading-none tracking-[0.16em] text-[#d8b08c]/78">
                  {period}
                </p>
                <span className="h-px flex-1 translate-y-2 bg-[#f0e7d4]/10" />
              </div>

              <div className="space-y-4">
                <h3 className="max-w-[18rem] text-balance text-3xl leading-[0.9] tracking-[-0.02em] text-[#f0e7d4] md:max-w-[22rem] md:text-5xl [font-family:var(--font-akira)]">
                  {title}
                </h3>
              </div>

              <div className="space-y-5">
                <p className="max-w-[24rem] text-pretty text-base leading-[1.7] text-[#f0e7d4]/58">
                  {focus}
                </p>
                <p className="max-w-[25rem] text-sm leading-[1.75] text-white/42">
                  {description}
                </p>

                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[0.72rem] leading-none tracking-[0.08em] text-white/38"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {liveUrl && (
                  <Link
                    href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${title} website (opens in new tab)`}
                  className="inline-flex items-center gap-2 text-base text-white/76 transition-colors duration-300 hover:text-[#f0e7d4]"
                >
                  <span>Open project</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
