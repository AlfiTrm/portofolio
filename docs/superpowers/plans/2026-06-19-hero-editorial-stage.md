# Hero Editorial Stage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the home hero into a dramatic editorial stage with minimal reflective copy, a subdued portrait layer, and no repeated identity headline.

**Architecture:** Keep the current hero component boundary but change what each part does. `HeroContent` becomes the editorial stage wrapper and copy container, `HeroImage` becomes a background-presence layer instead of a circular avatar, and a lightweight source-based regression test protects the new composition choices.

**Tech Stack:** Next.js App Router, React client components, TypeScript, Tailwind CSS, Framer Motion, Node test runner

---

### Task 1: Add hero regression coverage

**Files:**
- Create: `tests/heroEditorial.test.mjs`
- Test: `tests/heroEditorial.test.mjs`

- [ ] **Step 1: Write the failing test**

```javascript
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

function read(relativePath) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

test("hero content removes repeated identity and rotating role intro", () => {
  const source = read("src/features/home/hero/components/HeroContent.tsx");

  assert.equal(source.includes("Alfi Tsani"), false);
  assert.equal(source.includes("Junior Frontend Developer"), false);
  assert.equal(source.includes("Future Fullstack Developer"), false);
  assert.equal(source.includes("ScrambleText"), false);
});

test("hero image no longer uses circular tech-ring portrait treatment", () => {
  const source = read("src/features/home/hero/components/HeroImage.tsx");

  assert.equal(source.includes("CurvedText"), false);
  assert.equal(source.includes("rounded-full"), false);
  assert.equal(source.includes("bg-cyan-500/5"), false);
});

test("home screen no longer renders gamey hero companions", () => {
  const source = read("src/features/home/hero/containers/HomeScreen.tsx");

  assert.equal(source.includes("PixelCharacter"), false);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/heroEditorial.test.mjs`
Expected: `FAIL` because the current hero still contains the old name, rotating roles, circular image treatment, and `PixelCharacter`.

- [ ] **Step 3: Write minimal implementation**

```javascript
// No production change in this task.
// This task ends after the failing regression test is in place.
```

- [ ] **Step 4: Run test to verify it still fails for the expected reason**

Run: `node --test tests/heroEditorial.test.mjs`
Expected: `FAIL` with assertion failures tied to old hero strings and styling markers, not syntax errors.

- [ ] **Step 5: Commit**

```bash
git add tests/heroEditorial.test.mjs
git commit -m "test(hero): add editorial hero regression coverage"
```

### Task 2: Rebuild the hero copy stage

**Files:**
- Modify: `src/features/home/hero/components/HeroContent.tsx`
- Test: `tests/heroEditorial.test.mjs`

- [ ] **Step 1: Write the failing test**

Use the existing failing test from Task 1:

```javascript
test("hero content removes repeated identity and rotating role intro", () => {
  const source = read("src/features/home/hero/components/HeroContent.tsx");

  assert.equal(source.includes("Alfi Tsani"), false);
  assert.equal(source.includes("Junior Frontend Developer"), false);
  assert.equal(source.includes("Future Fullstack Developer"), false);
  assert.equal(source.includes("ScrambleText"), false);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/heroEditorial.test.mjs`
Expected: `FAIL` on the hero content assertions.

- [ ] **Step 3: Write minimal implementation**

Replace the current rotating intro with a staged editorial composition:

```tsx
"use client";

import { motion } from "framer-motion";
import HeroImage from "./HeroImage";
import ScrollIndicator from "./ScrollIndicator";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function HeroContent() {
  return (
    <section
      id="home"
      className="relative z-10 flex min-h-screen items-end justify-center overflow-hidden px-6 pb-12 pt-28 md:px-8 md:pb-16"
    >
      <HeroImage src="/hero/gambaralfi.webp" alt="Portrait texture" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center"
      >
        <motion.p
          variants={itemVariants}
          className="mb-5 text-[0.62rem] uppercase tracking-[0.34em] text-[#f2ede6]/42 md:text-[0.68rem]"
        >
          Quiet beginnings, deliberate motion
        </motion.p>

        <motion.div variants={itemVariants} className="max-w-[18rem] md:max-w-[34rem]">
          <p className="text-[1.1rem] leading-[1.45] tracking-[-0.02em] text-[#f2ede6]/88 md:text-[1.8rem] md:leading-[1.35]">
            I move through interface the way I move through thought:
            slowly, carefully, and always looking for a clearer shape.
          </p>
        </motion.div>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/heroEditorial.test.mjs`
Expected: The hero content test now passes, while the hero image and home screen assertions may still fail until later tasks.

- [ ] **Step 5: Commit**

```bash
git add src/features/home/hero/components/HeroContent.tsx tests/heroEditorial.test.mjs
git commit -m "feat(hero): replace intro text with editorial stage copy"
```

### Task 3: Rebuild the hero image into a ghosted portrait layer

**Files:**
- Modify: `src/features/home/hero/components/HeroImage.tsx`
- Test: `tests/heroEditorial.test.mjs`

- [ ] **Step 1: Write the failing test**

Use the existing failing test from Task 1:

```javascript
test("hero image no longer uses circular tech-ring portrait treatment", () => {
  const source = read("src/features/home/hero/components/HeroImage.tsx");

  assert.equal(source.includes("CurvedText"), false);
  assert.equal(source.includes("rounded-full"), false);
  assert.equal(source.includes("bg-cyan-500/5"), false);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/heroEditorial.test.mjs`
Expected: `FAIL` on the hero image assertions.

- [ ] **Step 3: Write minimal implementation**

Convert the image into a restrained atmospheric layer:

```tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface HeroImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function HeroImage({
  src,
  alt,
  className = "",
}: HeroImageProps) {
  return (
    <motion.div
      className={`pointer-events-none absolute inset-0 ${className}`}
      initial={{ opacity: 0, scale: 1.03 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12),transparent_32%),linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.6)_50%,rgba(0,0,0,0.92)_100%)]" />

      <div className="absolute inset-x-0 top-[8%] bottom-0 mx-auto w-full max-w-[980px] overflow-hidden opacity-30 md:opacity-38">
        <div className="absolute inset-x-[10%] top-0 bottom-[-8%] grayscale contrast-[0.92] brightness-[0.62]">
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="100vw"
            className="object-contain object-top"
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.5)_35%,rgba(0,0,0,0.88)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,transparent_0%,rgba(0,0,0,0.18)_42%,rgba(0,0,0,0.72)_100%)]" />
    </motion.div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/heroEditorial.test.mjs`
Expected: The hero image test now passes, while the home screen assertion may still fail until the next task.

- [ ] **Step 5: Commit**

```bash
git add src/features/home/hero/components/HeroImage.tsx tests/heroEditorial.test.mjs
git commit -m "feat(hero): turn portrait into atmospheric stage layer"
```

### Task 4: Remove hero companions that break the editorial tone

**Files:**
- Modify: `src/features/home/hero/containers/HomeScreen.tsx`
- Test: `tests/heroEditorial.test.mjs`

- [ ] **Step 1: Write the failing test**

Use the existing failing test from Task 1:

```javascript
test("home screen no longer renders gamey hero companions", () => {
  const source = read("src/features/home/hero/containers/HomeScreen.tsx");

  assert.equal(source.includes("PixelCharacter"), false);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/heroEditorial.test.mjs`
Expected: `FAIL` because `HomeScreen` still references `PixelCharacter` indirectly through `HeroContent`-era composition decisions or related imports.

- [ ] **Step 3: Write minimal implementation**

Ensure the home screen keeps only the cleaned hero surface:

```tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import Navbar from "@/shared/components/Navbar";
import MobileNavbar from "@/shared/components/MobileNavbar";
import SmoothScroll from "@/shared/components/SmoothScroll";
import Footer from "@/shared/components/Footer";
import Spotlight from "@/shared/components/Spotlight";
import ResumeModal from "@/shared/components/ResumeModal";
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
            <HeroContent />
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
git commit -m "refactor(hero): remove conflicting companion elements"
```

### Task 5: Full verification

**Files:**
- Test: `tests/heroEditorial.test.mjs`
- Test: `tests/navbarEditorial.test.mjs`
- Test: `tests/loaderCinematic.test.mjs`

- [ ] **Step 1: Run focused hero regression tests**

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
1. Refresh `/` and confirm loader hands off cleanly into the new hero without cropped flicker.
2. Confirm the hero no longer shows Tsan, Alfi Tsani, or rotating role text.
3. Confirm the spotlight still reads strongly from the top on desktop.
4. Confirm mobile keeps the same dramatic stage feeling and readable copy.
5. Confirm the nav remains visible and the active spark behavior is unchanged.
```

- [ ] **Step 5: Commit**

```bash
git add src/features/home/hero/components/HeroContent.tsx src/features/home/hero/components/HeroImage.tsx src/features/home/hero/containers/HomeScreen.tsx tests/heroEditorial.test.mjs
git commit -m "feat(hero): redesign intro as editorial stage"
```
