"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  focus: string;
  image: string;
  liveUrl?: string;
  index: number;
  align?: "left" | "right";
}

export default function ProjectCard({
  title,
  focus,
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
      <div className="grid items-start gap-8 lg:min-h-[34rem] lg:grid-cols-12 lg:gap-12">
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
            className="relative overflow-hidden"
          >
            <div className="relative aspect-16/10 overflow-hidden p-3 md:p-5">
              <Image
                src={image}
                alt={title}
                fill
                className="object-contain object-center px-2 py-2 opacity- transition-all duration-700 ease-out group-hover:cursor-pointer group-hover:scale-[1.025] group-hover:opacity-100 group-hover:grayscale-0"
              />
            </div>
          </motion.div>
        </div>

        <div
          className={`relative p-2 lg:pt-8 ${
            isRight
              ? "lg:order-1 lg:col-span-4 lg:col-start-1"
              : "lg:col-span-4 lg:col-start-9"
          }`}
          >
          <div className="relative">
            <div className="relative space-y-6">
              <div className="space-y-4">
                <h3 className="max-w-full break-words text-balance text-[clamp(2rem,3vw,3.5rem)] leading-[0.9] tracking-[-0.02em] text-[#f0e7d4] md:max-w-[24rem] [font-family:var(--font-akira)]">
                  {title}
                </h3>
              </div>

              <div className="space-y-6">
                <p className="max-w-[24rem] text-pretty text-base leading-[1.7] text-[#f0e7d4]/58">
                  {focus}
                </p>

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
