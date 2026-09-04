"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useEffect, useRef, useState } from "react";

interface FloatingChatSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatEntry {
  id: string;
  role: "user" | "assistant" | "typing";
  content: string;
}

const panelTransition = { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const };

export default function FloatingChatSheet({
  isOpen,
  onClose,
}: FloatingChatSheetProps) {
  const [messages, setMessages] = useState<ChatEntry[]>([]);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const transcriptEndRef = useRef<HTMLDivElement | null>(null);

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

  const revealAssistantMessage = (id: string, content: string) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMessages((current) =>
        current.map((entry) =>
          entry.id === id ? { id, role: "assistant", content } : entry
        ),
      );
      return Promise.resolve();
    }

    return new Promise<void>((resolve) => {
      let visibleCharacters = 0;
      const charactersPerTick = Math.max(1, Math.ceil(content.length / 90));
      const timer = window.setInterval(() => {
        visibleCharacters = Math.min(visibleCharacters + charactersPerTick, content.length);
        setMessages((current) =>
          current.map((entry) =>
            entry.id === id
              ? { id, role: "assistant", content: content.slice(0, visibleCharacters) }
              : entry
          ),
        );

        if (visibleCharacters === content.length) {
          window.clearInterval(timer);
          resolve();
        }
      }, 18);
    });
  };

  const sendMessage = async (content: string) => {
    const userContent = content.trim();
    if (!userContent || isSending) return;

    const typingId = crypto.randomUUID();
    const history = messages
      .filter((entry) => entry.role !== "typing")
      .slice(-7)
      .map(({ role, content: messageContent }) => ({ role, content: messageContent }));

    setMessages((current) => [
      ...current,
      {
        id: `${typingId}-user`,
        role: "user",
        content: userContent,
      },
      { id: typingId, role: "typing", content: "" },
    ]);
    setDraft("");
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...history, { role: "user", content: userContent }],
        }),
      });
      const data = (await response.json()) as { message?: string; error?: string };

      if (!response.ok || !data.message) throw new Error(data.error);

      await revealAssistantMessage(typingId, data.message);
    } catch {
      setMessages((current) =>
        current.map((entry) =>
          entry.id === typingId
            ? { id: typingId, role: "assistant", content: "i couldn't reach the assistant. please try again." }
            : entry,
        ),
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(draft);
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
            className="fixed inset-0 z-[69] bg-black/10"
          />

          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={panelTransition}
            className="fixed bottom-16 right-3 z-[70] flex h-[32rem] w-[calc(100vw-1.5rem)] max-w-[24rem] flex-col overflow-hidden rounded-lg border border-[#efe6d1]/18 bg-[#090909] font-mono text-[#efe6d1] md:bottom-20 md:right-6"
          >
            <div className="flex items-center justify-between border-b border-[#efe6d1]/12 px-4 py-3 text-xs">
              <div className="flex items-center gap-2 text-[#efe6d1]/70">
                <span className="h-1.5 w-1.5 bg-[#efe6d1]" />
                <span>tsan@portfolio:~/chatbot</span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="text-[#efe6d1]/40 transition-colors hover:text-[#efe6d1] focus:outline-none focus-visible:text-[#efe6d1]"
              >
                [esc]
              </button>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5 text-sm leading-relaxed">
              <div className="max-w-[34ch] text-[#efe6d1]/65">
                <span className="mr-2 text-[#efe6d1]">tsan&gt;</span>
                ask about my work, skills, or collaboration.
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
                <button
                  type="button"
                  onClick={() => void sendMessage("Tell me about Alfi")}
                  disabled={isSending}
                  className="text-[#efe6d1]/45 transition-colors hover:text-[#efe6d1] disabled:opacity-30"
                >
                  /about
                </button>
                <button
                  type="button"
                  onClick={() => void sendMessage("How can I start a project with Alfi?")}
                  disabled={isSending}
                  className="text-[#efe6d1]/45 transition-colors hover:text-[#efe6d1] disabled:opacity-30"
                >
                  /collaborate
                </button>
              </div>

              <AnimatePresence initial={false}>
                {messages.map((entry, index) => (
                  <motion.div
                    key={`${entry.id}-${index}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={
                      entry.role === "user"
                        ? "-mx-4 whitespace-pre-wrap break-words bg-[#2b2b2b] px-4 py-3 text-[#efe6d1]"
                        : entry.role === "typing"
                          ? "text-[#efe6d1]/55"
                          : entry.role === "assistant"
                          ? "max-w-[38ch] whitespace-pre-wrap break-words text-[#efe6d1]/72"
                          : ""
                    }
                  >
                    {entry.role === "typing" ? (
                      <><span className="mr-2 text-[#efe6d1]">tsan&gt;</span><span className="animate-pulse">_</span></>
                    ) : (
                      <><span className="mr-2 text-[#efe6d1]">{entry.role === "user" ? "you>" : "tsan>"}</span>{entry.content}</>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              <div ref={transcriptEndRef} />
            </div>

            <div className="border-t border-[#efe6d1]/12 px-4 py-3">
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2"
              >
                <span aria-hidden="true" className="text-sm text-[#efe6d1]">&gt;</span>
                <input
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  disabled={isSending}
                  maxLength={500}
                  placeholder="ask about Alfi"
                  className="w-full bg-transparent text-sm text-[#efe6d1] outline-none placeholder:text-[#efe6d1]/25"
                />
                <button
                  type="submit"
                  disabled={isSending || !draft.trim()}
                  className="text-xs text-[#efe6d1]/45 transition-colors hover:text-[#efe6d1] disabled:text-[#efe6d1]/15"
                >
                  [enter]
                </button>
              </form>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
