# Floating Chat Sheet Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a floating dark chat sheet that opens from the `ask` trigger with an unfolding motion and a guided preview flow for `know me` and `start a project`.

**Architecture:** Add a dedicated shared chat-sheet component and keep its behavior local-state-driven. `HomeScreen` will own the open/close state and render the `ask` trigger plus the floating sheet, while the sheet itself owns the scripted preview transcript state and disabled input presentation.

**Tech Stack:** Next.js App Router, React client components, TypeScript, Tailwind CSS, Framer Motion, Iconify, Node test runner

---

### Task 1: Add regression coverage for the floating chat sheet

**Files:**
- Modify: `tests/heroEditorial.test.mjs`
- Test: `tests/heroEditorial.test.mjs`

- [ ] **Step 1: Write the failing test**

Append assertions that lock the new chat-sheet wiring:

```javascript
test("home screen wires the ask trigger to a floating chat sheet", () => {
  const source = read("src/features/home/hero/containers/HomeScreen.tsx");

  assert.equal(source.includes("FloatingChatSheet"), true);
  assert.equal(source.includes("chatOpen"), true);
  assert.equal(source.includes("setChatOpen"), true);
  assert.equal(source.includes(">ask<"), true);
  assert.equal(source.includes("iconoir:spark-solid"), true);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/heroEditorial.test.mjs`
Expected: `FAIL` because `HomeScreen` does not yet contain `FloatingChatSheet` or the new `chatOpen` state.

- [ ] **Step 3: Write minimal implementation**

```javascript
// No production change in this task.
// This task only establishes the failing regression test.
```

- [ ] **Step 4: Run test to verify it still fails for the expected reason**

Run: `node --test tests/heroEditorial.test.mjs`
Expected: `FAIL` with assertion failures tied to the missing chat-sheet wiring, not syntax errors.

- [ ] **Step 5: Commit**

```bash
git add tests/heroEditorial.test.mjs
git commit -m "test(chat): add floating chat sheet regression coverage"
```

### Task 2: Build the floating chat sheet component

**Files:**
- Create: `src/shared/components/FloatingChatSheet.tsx`
- Test: `tests/heroEditorial.test.mjs`

- [ ] **Step 1: Write the failing test**

Use the existing failing wiring test from Task 1, then add a component-source test:

```javascript
test("floating chat sheet contains guided preview content", () => {
  const source = read("src/shared/components/FloatingChatSheet.tsx");

  assert.equal(
    source.includes(
      "if you're curious, i can help you start in one of two ways."
    ),
    true
  );
  assert.equal(source.includes("know me"), true);
  assert.equal(source.includes("start a project"), true);
  assert.equal(source.includes("live conversation is still in progress"), true);
  assert.equal(source.includes("chat is on its way"), true);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/heroEditorial.test.mjs`
Expected: `FAIL` because `FloatingChatSheet.tsx` does not exist yet.

- [ ] **Step 3: Write minimal implementation**

Create a dedicated floating sheet component with scripted preview state:

```tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useMemo, useState } from "react";

interface FloatingChatSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

type PromptKey = "know-me" | "start-project" | null;

const promptResponses = {
  "know-me":
    "i'm a frontend-focused developer shaping quiet, cinematic interfaces with a strong eye for motion, clarity, and feel.",
  "start-project":
    "if you're planning a project, the fastest path is to reach out through contact and share the scope, timeline, and what kind of experience you want to build.",
} as const;

export default function FloatingChatSheet({
  isOpen,
  onClose,
}: FloatingChatSheetProps) {
  const [selectedPrompt, setSelectedPrompt] = useState<PromptKey>(null);

  const transcript = useMemo(() => {
    if (!selectedPrompt) return [];

    return [
      {
        role: "user" as const,
        content:
          selectedPrompt === "know-me" ? "know me" : "start a project",
      },
      {
        role: "assistant" as const,
        content: promptResponses[selectedPrompt],
      },
      {
        role: "system" as const,
        content: "live conversation is still in progress",
      },
    ];
  }, [selectedPrompt]);

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
            className="fixed inset-0 z-[69] bg-black/18 backdrop-blur-[2px]"
          />

          <motion.aside
            initial={{
              opacity: 0,
              scale: 0.78,
              x: 42,
              y: 28,
              rotateX: 16,
              rotateY: -14,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
              rotateX: 0,
              rotateY: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.82,
              x: 38,
              y: 20,
              rotateX: 10,
              rotateY: -10,
            }}
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed bottom-20 right-5 z-[70] flex h-[32rem] w-[22rem] max-w-[calc(100vw-1.5rem)] flex-col overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#0a0a0a]/94 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl md:bottom-20 md:right-6 md:w-[24rem]"
          >
            <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
              <div className="flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.22em] text-[#efe6d1]/58">
                <Icon icon="iconoir:spark-solid" className="text-[0.8rem]" />
                <span>ask tsan</span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="text-[0.62rem] uppercase tracking-[0.22em] text-white/42 transition-colors duration-300 hover:text-white/74"
              >
                close
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              <div className="rounded-[1rem] border border-white/7 bg-white/[0.03] px-3 py-2 text-[0.66rem] uppercase tracking-[0.16em] text-[#efe6d1]/42">
                live conversation is still in progress
              </div>

              <div className="max-w-[85%] rounded-[1.1rem] rounded-bl-md bg-white/[0.05] px-4 py-3 text-[0.9rem] leading-[1.5] text-[#efe6d1]/88">
                if you're curious, i can help you start in one of two ways.
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedPrompt("know-me")}
                  className="rounded-full border border-white/10 px-3 py-2 text-[0.7rem] uppercase tracking-[0.18em] text-white/58 transition-colors duration-300 hover:border-white/18 hover:text-white/84"
                >
                  know me
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPrompt("start-project")}
                  className="rounded-full border border-white/10 px-3 py-2 text-[0.7rem] uppercase tracking-[0.18em] text-white/58 transition-colors duration-300 hover:border-white/18 hover:text-white/84"
                >
                  start a project
                </button>
              </div>

              {transcript.map((entry, index) => (
                <div
                  key={`${entry.role}-${index}`}
                  className={
                    entry.role === "user"
                      ? "ml-auto max-w-[78%] rounded-[1.1rem] rounded-br-md bg-[#efe6d1] px-4 py-3 text-[0.78rem] uppercase tracking-[0.16em] text-black"
                      : entry.role === "assistant"
                        ? "max-w-[88%] rounded-[1.1rem] rounded-bl-md bg-white/[0.05] px-4 py-3 text-[0.9rem] leading-[1.5] text-[#efe6d1]/84"
                        : "text-[0.64rem] uppercase tracking-[0.16em] text-[#efe6d1]/38"
                  }
                >
                  {entry.content}
                </div>
              ))}
            </div>

            <div className="border-t border-white/8 px-4 py-3">
              <div className="flex items-center gap-3 rounded-[1rem] border border-white/10 bg-white/[0.03] px-3 py-3">
                <input
                  disabled
                  value=""
                  placeholder="chat is on its way"
                  className="w-full bg-transparent text-[0.84rem] text-white/36 outline-none placeholder:text-white/28"
                />
                <span className="text-[0.62rem] uppercase tracking-[0.16em] text-white/26">
                  soon
                </span>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/heroEditorial.test.mjs`
Expected: The floating chat sheet content test passes, while the `HomeScreen` wiring assertion may still fail until the next task.

- [ ] **Step 5: Commit**

```bash
git add src/shared/components/FloatingChatSheet.tsx tests/heroEditorial.test.mjs
git commit -m "feat(chat): add floating guided chat sheet"
```

### Task 3: Wire the ask trigger to the floating chat sheet

**Files:**
- Modify: `src/features/home/hero/containers/HomeScreen.tsx`
- Test: `tests/heroEditorial.test.mjs`

- [ ] **Step 1: Write the failing test**

Use the existing failing wiring test from Task 1:

```javascript
test("home screen wires the ask trigger to a floating chat sheet", () => {
  const source = read("src/features/home/hero/containers/HomeScreen.tsx");

  assert.equal(source.includes("FloatingChatSheet"), true);
  assert.equal(source.includes("chatOpen"), true);
  assert.equal(source.includes("setChatOpen"), true);
  assert.equal(source.includes(">ask<"), true);
  assert.equal(source.includes("iconoir:spark-solid"), true);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/heroEditorial.test.mjs`
Expected: `FAIL` on the `HomeScreen` assertions.

- [ ] **Step 3: Write minimal implementation**

Import the shared sheet, add `chatOpen` state, and render the trigger plus sheet:

```tsx
"use client";

import { Icon } from "@iconify/react";
import { useState, useCallback, useEffect } from "react";
import Navbar from "@/shared/components/Navbar";
import MobileNavbar from "@/shared/components/MobileNavbar";
import SmoothScroll from "@/shared/components/SmoothScroll";
import Footer from "@/shared/components/Footer";
import Spotlight from "@/shared/components/Spotlight";
import ResumeModal from "@/shared/components/ResumeModal";
import FloatingChatSheet from "@/shared/components/FloatingChatSheet";
import TechStackTransition from "@/shared/components/TechStackTransition";
import HeroContent from "../components/HeroContent";
import AboutSection from "@/features/home/about/containers/AboutSection";
import SkillsSection from "@/features/home/skills/containers/SkillsSection";
import ProjectsSection from "@/features/home/projects/containers/ProjectsSection";
import ContactSection from "@/features/home/contact/containers/ContactSection";
import EntranceLoader from "@/shared/components/EntranceLoader";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    document.body.dataset.shellReady = "false";
    document.body.style.overflow = "hidden";
    window.scrollTo({ top: 0, behavior: "auto" });

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";
  }, [isLoading]);

  const handleLoadComplete = useCallback(() => {
    document.body.dataset.shellReady = "true";
    document.body.style.overflow = "";
    setIsLoading(false);
  }, []);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen overflow-hidden bg-black">
        {isLoading && <EntranceLoader onComplete={handleLoadComplete} />}

        <div
          className={`relative transition-opacity duration-500 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          aria-hidden={isLoading}
        >
          <div className="pointer-events-none fixed inset-0 bg-grid opacity-20" />
          <Spotlight />

          <Navbar onOpenResume={() => setResumeOpen(true)} />
          <MobileNavbar onOpenResume={() => setResumeOpen(true)} />

          <main id="main-content">
            <HeroContent onOpenResume={() => setResumeOpen(true)} />
            <TechStackTransition />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
          </main>
        </div>

        <div
          className={`transition-opacity duration-500 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          aria-hidden={isLoading}
        >
          <Footer />
        </div>

        <button
          type="button"
          aria-label="Open chat"
          onClick={() => setChatOpen((current) => !current)}
          className={`fixed bottom-6 right-6 z-[62] hidden items-center gap-2 uppercase text-[0.68rem] tracking-[0.24em] text-white/46 transition-colors duration-300 hover:text-white/78 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black md:flex ${
            isLoading ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <Icon icon="iconoir:spark-solid" className="text-[0.82rem]" />
          <span>ask</span>
        </button>

        <FloatingChatSheet
          isOpen={!isLoading && chatOpen}
          onClose={() => setChatOpen(false)}
        />

        <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      </div>
    </SmoothScroll>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/heroEditorial.test.mjs`
Expected: All tests in `tests/heroEditorial.test.mjs` pass.

- [ ] **Step 5: Commit**

```bash
git add src/features/home/hero/containers/HomeScreen.tsx tests/heroEditorial.test.mjs
git commit -m "feat(chat): wire ask trigger to floating sheet"
```

### Task 4: Full verification

**Files:**
- Test: `tests/heroEditorial.test.mjs`
- Test: `tests/navbarEditorial.test.mjs`
- Test: `tests/loaderCinematic.test.mjs`

- [ ] **Step 1: Run focused chat and hero regression tests**

Run: `node --test tests/heroEditorial.test.mjs`
Expected: `PASS`

- [ ] **Step 2: Run adjacent UI regression tests**

Run: `node --test tests/navbarEditorial.test.mjs tests/loaderCinematic.test.mjs`
Expected: `PASS`

- [ ] **Step 3: Run production build**

Run: `npm run build`
Expected: Successful Next.js production build. Existing non-blocking warnings may still appear, but no build failure.

- [ ] **Step 4: Manual verification checklist**

```text
1. Click `ask` and confirm the panel unfolds from the lower-right toward the upper-left.
2. Confirm the panel reads as dark, floating, and editorial rather than a generic chat widget.
3. Confirm `know me` and `start a project` both append a user bubble and a short assistant preview response.
4. Confirm the input appears disabled with clear in-progress messaging.
5. Confirm `Resume` still opens from the hero and does not conflict with the chat trigger.
6. Confirm the sheet closes via the close control and the backdrop.
```

- [ ] **Step 5: Commit**

```bash
git add src/shared/components/FloatingChatSheet.tsx src/features/home/hero/containers/HomeScreen.tsx tests/heroEditorial.test.mjs
git commit -m "feat(chat): add floating guided conversation sheet"
```
