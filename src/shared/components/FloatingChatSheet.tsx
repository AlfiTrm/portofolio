"use client";

import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface FloatingChatSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

type PromptKey = "know-me" | "start-project";

interface ChatEntry {
  id: string;
  role: "user" | "assistant" | "typing";
  content: string;
}

const promptResponses: Record<PromptKey, string> = {
  "know-me":
    "i'm a frontend-focused developer shaping quiet, cinematic interfaces with a strong eye for motion, clarity, and feel.",
  "start-project":
    "if you're planning a project, the fastest path is to reach out through contact and share the scope, timeline, and what kind of experience you want to build.",
};

const panelTransition = { duration: 0.78, ease: [0.16, 1, 0.3, 1] as const };
const contentTransition = { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const };

export default function FloatingChatSheet({
  isOpen,
  onClose,
}: FloatingChatSheetProps) {
  const [messages, setMessages] = useState<ChatEntry[]>([]);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const transcriptEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
      timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
      timeoutsRef.current = [];
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
      timeoutsRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    transcriptEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const appendPrompt = (prompt: PromptKey) => {
    const userContent = prompt === "know-me" ? "know me" : "start a project";
    const typingId = `${prompt}-${Date.now()}-${Math.random()}`;

    setMessages((current) => [
      ...current,
      {
        id: `${typingId}-user`,
        role: "user",
        content: userContent,
      },
      { id: typingId, role: "typing", content: "" },
    ]);

    const timeout = setTimeout(() => {
      setMessages((current) =>
        current.map((entry) =>
          entry.id === typingId
            ? {
                id: typingId,
                role: "assistant",
                content: promptResponses[prompt],
              }
            : entry
        )
      );
    }, 950);

    timeoutsRef.current.push(timeout);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[69] bg-black/16"
          />

          <motion.aside
            initial={{
              opacity: 0,
              scale: 0.72,
              x: 64,
              y: 56,
              rotateX: 18,
              rotateY: -20,
              skewX: -6,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
              rotateX: 0,
              rotateY: 0,
              skewX: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.78,
              x: 52,
              y: 34,
              rotateX: 10,
              rotateY: -12,
              skewX: -4,
            }}
            transition={{ ...panelTransition, delay: 0.18 }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed bottom-20 right-5 z-[70] flex h-[33rem] w-[22.5rem] max-w-[calc(100vw-1.5rem)] flex-col overflow-hidden rounded-[1.45rem] border border-white/10 bg-[#090909]/95 shadow-[0_34px_110px_rgba(0,0,0,0.58)] md:bottom-20 md:right-6 md:w-[24.5rem]"
          >
            <motion.div
              initial={{ opacity: 0.82, scaleY: 0.08, y: 22 }}
              animate={{ opacity: 0, scaleY: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.58, ease: [0.18, 1, 0.32, 1] }}
              style={{ transformOrigin: "bottom right" }}
              className="pointer-events-none absolute inset-0 z-10 rounded-[1.45rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_22%,rgba(255,255,255,0)_54%)]"
            />

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ delay: 0.24, ...contentTransition }}
              className="relative z-20 flex items-center justify-between border-b border-white/8 px-4 py-3"
            >
              <div className="flex items-center gap-2 text-[0.76rem] tracking-[0.02em] text-[#efe6d1]/76">
                <Icon icon="iconoir:spark-solid" className="text-[0.9rem]" />
                <span>ask tsan</span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="text-[0.72rem] tracking-[0.02em] text-white/44 transition-colors duration-300 hover:text-white/78"
              >
                close
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ delay: 0.3, ...contentTransition }}
              className="relative z-20 flex-1 space-y-4 overflow-y-auto px-4 py-4"
            >
              <div className="max-w-[87%] rounded-[1.15rem] rounded-bl-md bg-white/[0.05] px-4 py-3 text-[0.95rem] leading-[1.55] text-[#efe6d1]/88">
                {"if you're curious, i can help you start in one of two ways."}
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => appendPrompt("know-me")}
                  className="rounded-full border border-white/10 px-3 py-2 text-[0.76rem] tracking-[0.01em] text-white/62 transition-colors duration-300 hover:border-white/18 hover:text-white/86"
                >
                  know me
                </button>
                <button
                  type="button"
                  onClick={() => appendPrompt("start-project")}
                  className="rounded-full border border-white/10 px-3 py-2 text-[0.76rem] tracking-[0.01em] text-white/62 transition-colors duration-300 hover:border-white/18 hover:text-white/86"
                >
                  start a project
                </button>
              </div>

              <AnimatePresence initial={false}>
                {messages.map((entry, index) => (
                  <motion.div
                    key={`${entry.id}-${index}`}
                    initial={{ opacity: 0, y: 14, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className={
                      entry.role === "user"
                        ? "ml-auto max-w-[78%] rounded-[1.15rem] rounded-br-md bg-[#efe6d1] px-4 py-3 text-[0.82rem] leading-[1.4] text-black"
                        : entry.role === "typing"
                          ? "max-w-[5.5rem] rounded-[1.15rem] rounded-bl-md bg-white/[0.05] px-4 py-3"
                          : entry.role === "assistant"
                          ? "max-w-[88%] rounded-[1.15rem] rounded-bl-md bg-white/[0.05] px-4 py-3 text-[0.93rem] leading-[1.55] text-[#efe6d1]/84"
                          : ""
                    }
                  >
                    {entry.role === "typing" ? (
                      <div className="flex items-center gap-1.5">
                        {[0, 1, 2].map((bar) => (
                          <motion.span
                            key={bar}
                            className="h-5 w-1.5 bg-[#efe6d1]/56"
                            animate={{ opacity: [0.36, 1, 0.36], y: [4, -4, 4] }}
                            transition={{
                              duration: 1.05,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: bar * 0.14,
                            }}
                          />
                        ))}
                      </div>
                    ) : (
                      entry.content
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              <div ref={transcriptEndRef} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ delay: 0.38, ...contentTransition }}
              className="relative z-20 border-t border-white/8 px-4 py-3"
            >
              <div className="flex items-center gap-3 rounded-[1rem] border border-white/10 bg-white/[0.03] px-3 py-3">
                <input
                  disabled
                  value=""
                  placeholder="chat is on its way"
                  className="w-full bg-transparent text-[0.86rem] text-white/38 outline-none placeholder:text-white/28"
                />
                <span className="text-[0.72rem] tracking-[0.01em] text-white/28">
                  soon
                </span>
              </div>
            </motion.div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
