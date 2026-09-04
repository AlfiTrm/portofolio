"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { contactData } from "../data/contactData";

const visibleSocials = contactData.socials.filter(
  ({ name }) => name === "GitHub" || name === "LinkedIn",
);

export default function ContactSection() {
  const reduceMotion = useReducedMotion();
  const [emailUser, emailDomain] = contactData.email.split("@");

  return (
    <section
      id="contact"
      className="relative flex min-h-screen overflow-hidden bg-black px-5 pb-7 pt-28 text-[#f2ede6] md:px-10 md:pb-9 md:pt-32"
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
        whileInView={{ opacity: 0.82, scale: 1 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: reduceMotion ? 0 : 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 -translate-y-[7%] md:left-auto md:w-[72vw]"
        aria-hidden="true"
      >
        <Image
          src="/home/map.webp"
          alt=""
          fill
          sizes="(min-width: 768px) 72vw, 100vw"
          className="object-cover object-center md:object-contain md:object-right"
        />
      </motion.div>

      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,#000_0%,rgba(0,0,0,0.96)_24%,rgba(0,0,0,0.58)_58%,rgba(0,0,0,0.1)_100%)] md:bg-[linear-gradient(90deg,#000_0%,#000_28%,rgba(0,0,0,0.8)_48%,rgba(0,0,0,0.08)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.44)_0%,transparent_28%,transparent_68%,rgba(0,0,0,0.72)_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 48, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ delay: reduceMotion ? 0 : 0.25, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="my-auto max-w-[56rem] py-12 md:py-16"
        >
          <h2 className="mb-8 text-3xl leading-none tracking-[-0.03em] [font-family:var(--font-akira)] md:mb-10 md:text-5xl">
            Get in touch
          </h2>
          <p className="mb-7 max-w-sm text-sm leading-relaxed text-[#f2ede6]/54 md:text-base">
            Open for thoughtful projects and collaborations.
          </p>
          <a
            href={`mailto:${contactData.email}`}
            className="group inline-flex max-w-full flex-col text-[clamp(2.45rem,6.2vw,6rem)] font-medium leading-[0.9] tracking-[-0.04em] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f2ede6]/70"
          >
            <span>{emailUser}</span>
            <span className="mt-2 flex items-end gap-3 md:gap-5">
              @{emailDomain}
              <ArrowUpRight
                className="mb-1 size-8 shrink-0 transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-2 md:size-12"
                aria-hidden="true"
              />
            </span>
          </a>
        </motion.div>

        <div className="grid gap-5 text-[0.72rem] uppercase tracking-[0.2em] text-[#f2ede6]/56 md:grid-cols-3 md:items-end">
          <div className="flex gap-6">
            {visibleSocials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-[#f2ede6] focus:outline-none focus-visible:text-[#f2ede6]"
              >
                {social.name}
              </a>
            ))}
          </div>
          <p className="md:text-center">&copy; {new Date().getFullYear()} Alfi Tsani</p>
        </div>
      </div>
    </section>
  );
}
