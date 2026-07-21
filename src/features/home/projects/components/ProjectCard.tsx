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
      className="relative"
      role="article"
      aria-label={`Project: ${title}`}
    >
      <div
        className={`grid items-start gap-8 lg:min-h-[34rem] lg:grid-cols-12 lg:gap-10 ${
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
            className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#090908]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(240,231,212,0.12),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.05),transparent_28%)]" />
            <div className="relative aspect-video overflow-hidden bg-[#050505] p-4 md:p-5">
              <Image
                src={image}
                alt={title}
                fill
                className="object-contain object-center px-2 py-2 transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,0.18)_56%,rgba(0,0,0,0.84))]" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                <div className="md:translate-y-5 md:opacity-0 md:transition-all md:duration-500 md:ease-out md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100">
                  <p className="max-w-[40rem] text-sm leading-relaxed text-white/78">
                  {description}
                  </p>
                </div>
              </div>
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
            <p className="text-6xl font-semibold leading-none tracking-[-0.07em] text-white/[0.06] md:text-8xl">
              0{indexProp + 1}
            </p>
            <div className="relative -mt-3 space-y-6">
              <div className="flex items-start justify-between gap-4">
                <p className="text-xs leading-none text-[#d8b08c]">
                  {period}
                </p>
                <span className="h-px flex-1 translate-y-2 bg-white/8" />
              </div>

              <div className="space-y-4">
                <h3 className="max-w-[18rem] text-balance text-3xl leading-[0.94] text-[#f0e7d4] md:max-w-[22rem] md:text-5xl [font-family:var(--font-akira)]">
                  {title}
                </h3>
              </div>

              <div className="space-y-5 md:translate-y-4 md:opacity-0 md:transition-all md:duration-500 md:ease-out md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100">
                <p className="max-w-[24rem] text-pretty text-base leading-relaxed text-white/54">
                  {focus}
                </p>

                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs leading-none text-white/38"
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
