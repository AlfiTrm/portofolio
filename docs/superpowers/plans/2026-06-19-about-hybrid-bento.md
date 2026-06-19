# About Hybrid Bento Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the `About` section into a dark three-panel hybrid bento with one dominant left panel, two stacked right panels, and a tactile tech-keycaps treatment.

**Architecture:** Keep the redesign centered in `AboutSection.tsx` while adding only small supporting helpers where it improves clarity. The section will use a responsive two-column grid, a cursor-reactive left framed panel, a light-content upper-right panel, and a lower-right tech stack panel, while leaving `TechStackTransition` untouched for now.

**Tech Stack:** Next.js App Router, React client components, TypeScript, Tailwind CSS, Framer Motion, Next/Image, Node test runner

---

### Task 1: Add regression coverage for the new about composition

**Files:**
- Create: `tests/aboutHybridBento.test.mjs`
- Test: `tests/aboutHybridBento.test.mjs`

- [ ] **Step 1: Write the failing test**

```javascript
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

function read(relativePath) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

test("about section uses hybrid bento layout with cartoon chill asset", () => {
  const source = read("src/features/home/about/containers/AboutSection.tsx");

  assert.equal(source.includes("cartoon-chill.svg"), true);
  assert.equal(source.includes("grid-cols-["), true);
  assert.equal(source.includes("whileDrag"), false);
  assert.equal(source.includes("Developer ID"), false);
  assert.equal(source.includes("BentoGridBackground"), false);
});

test("about section includes a dedicated tech keycaps panel", () => {
  const source = read("src/features/home/about/containers/AboutSection.tsx");

  assert.equal(source.includes("techStack.map"), true);
  assert.equal(source.includes("keycap"), true);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/aboutHybridBento.test.mjs`
Expected: `FAIL` because the current `AboutSection` still uses the draggable-card layout and does not contain the new hybrid-bento structure markers.

- [ ] **Step 3: Write minimal implementation**

```javascript
// No production change in this task.
// This task only establishes the failing regression test.
```

- [ ] **Step 4: Run test to verify it still fails for the expected reason**

Run: `node --test tests/aboutHybridBento.test.mjs`
Expected: `FAIL` with assertion failures tied to the missing new layout markers, not syntax errors.

- [ ] **Step 5: Commit**

```bash
git add tests/aboutHybridBento.test.mjs
git commit -m "test(about): add hybrid bento regression coverage"
```

### Task 2: Rebuild the about section into the new three-panel grid

**Files:**
- Modify: `src/features/home/about/containers/AboutSection.tsx`
- Test: `tests/aboutHybridBento.test.mjs`

- [ ] **Step 1: Write the failing test**

Use the existing failing test from Task 1:

```javascript
test("about section uses hybrid bento layout with cartoon chill asset", () => {
  const source = read("src/features/home/about/containers/AboutSection.tsx");

  assert.equal(source.includes("cartoon-chill.svg"), true);
  assert.equal(source.includes("grid-cols-["), true);
  assert.equal(source.includes("whileDrag"), false);
  assert.equal(source.includes("Developer ID"), false);
  assert.equal(source.includes("BentoGridBackground"), false);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/aboutHybridBento.test.mjs`
Expected: `FAIL` on the layout assertions.

- [ ] **Step 3: Write minimal implementation**

Replace the current draggable-card composition with a framed three-panel section:

```tsx
"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "@/shared/components/ScrollReveal";
import { techStack } from "@/features/home/hero/data/techStack";
import { aboutData } from "../data/aboutData";
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

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
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
    <section id="about" className="relative px-4 py-28 md:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.04),transparent_24%),radial-gradient(circle_at_82%_68%,rgba(255,255,255,0.03),transparent_22%)]" />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <ScrollReveal className="mb-10 text-center">
          <p className="text-[0.66rem] uppercase tracking-[0.34em] text-white/34">
            {aboutData.subtitle}
          </p>
        </ScrollReveal>

        <div className="rounded-[2rem] border border-white/8 bg-white/[0.02] p-3 md:p-4">
          <div className="grid gap-4 lg:grid-cols-[1.6fr_0.9fr]">
            <motion.article
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative min-h-[36rem] overflow-hidden rounded-[1.6rem] border border-white/8 bg-[#0c0c0c] p-6 md:p-8"
            >
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.01)_22%,rgba(255,255,255,0)_58%)]" />

              <div className="relative z-10 flex h-full flex-col justify-between gap-10 lg:flex-row">
                <div className="max-w-[22rem]">
                  <p className="mb-4 text-[0.68rem] uppercase tracking-[0.24em] text-white/34">
                    about me
                  </p>
                  <h2 className="text-3xl leading-[1] text-[#f0e7d4] md:text-5xl">
                    Alfi Tsani
                  </h2>
                  <p className="mt-5 text-[0.96rem] leading-[1.75] text-white/62 md:text-[1rem]">
                    {aboutData.description.split("\n\n")[0]}
                  </p>
                </div>

                <div className="relative mx-auto flex w-full max-w-[26rem] flex-1 items-end justify-center">
                  <div className="absolute inset-x-[12%] bottom-[4%] h-[62%] rounded-full bg-white/[0.04] blur-3xl" />
                  <Image
                    src="/about/cartoon-chill.svg"
                    alt="Cartoon chill portrait"
                    width={520}
                    height={520}
                    className="relative z-10 h-auto w-full max-w-[24rem] object-contain"
                    priority
                  />
                </div>
              </div>
            </motion.article>

            <div className="grid gap-4 lg:grid-rows-[0.9fr_1.1fr]">
              <article className="min-h-[14rem] rounded-[1.45rem] border border-white/8 bg-[#0c0c0c] p-5 md:p-6">
                <p className="mb-4 text-[0.66rem] uppercase tracking-[0.24em] text-white/34">
                  quick notes
                </p>
                <div className="space-y-3 text-[0.94rem] leading-[1.65] text-white/58">
                  <p>based in malang, building on the frontend.</p>
                  <p>drawn to quiet interfaces, motion, and strong visual rhythm.</p>
                  <p>currently powered by coffee and questionable sleep.</p>
                </div>
              </article>

              <article className="min-h-[18rem] rounded-[1.45rem] border border-white/8 bg-[#0c0c0c] p-5 md:p-6">
                <p className="mb-5 text-[0.66rem] uppercase tracking-[0.24em] text-white/34">
                  tech stack
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {techStack.map((tech) => (
                    <div
                      key={tech.name}
                      className="keycap rounded-[1rem] border border-white/10 bg-white/[0.03] px-4 py-4"
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
      </div>

      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/aboutHybridBento.test.mjs`
Expected: The new about-layout assertions pass.

- [ ] **Step 5: Commit**

```bash
git add src/features/home/about/containers/AboutSection.tsx tests/aboutHybridBento.test.mjs
git commit -m "feat(about): add hybrid bento layout"
```

### Task 3: Refine panel details and tech keycap treatment

**Files:**
- Modify: `src/features/home/about/containers/AboutSection.tsx`
- Modify: `src/features/home/about/styles/about.css`
- Test: `tests/aboutHybridBento.test.mjs`

- [ ] **Step 1: Write the failing test**

Use the existing tech-keycaps assertion:

```javascript
test("about section includes a dedicated tech keycaps panel", () => {
  const source = read("src/features/home/about/containers/AboutSection.tsx");

  assert.equal(source.includes("techStack.map"), true);
  assert.equal(source.includes("keycap"), true);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/aboutHybridBento.test.mjs`
Expected: If the layout task was implemented minimally without the `keycap` class or tactile treatment, this should still fail. If it already passes, keep the test and continue refining the visual detail.

- [ ] **Step 3: Write minimal implementation**

Add a focused keycap style in `about.css` so the lower-right panel reads as tactile, not generic:

```css
.keycap {
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    inset 0 -10px 18px rgba(0, 0, 0, 0.24),
    0 10px 24px rgba(0, 0, 0, 0.2);
  transition:
    transform 220ms ease,
    border-color 220ms ease,
    background-color 220ms ease;
}

.keycap:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.18);
  background-color: rgba(255, 255, 255, 0.05);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/aboutHybridBento.test.mjs`
Expected: `PASS`

- [ ] **Step 5: Commit**

```bash
git add src/features/home/about/containers/AboutSection.tsx src/features/home/about/styles/about.css tests/aboutHybridBento.test.mjs
git commit -m "feat(about): refine framed panels and tech keycaps"
```

### Task 4: Full verification

**Files:**
- Test: `tests/aboutHybridBento.test.mjs`
- Test: `tests/heroEditorial.test.mjs`
- Test: `tests/navbarEditorial.test.mjs`
- Test: `tests/loaderCinematic.test.mjs`

- [ ] **Step 1: Run focused about regression tests**

Run: `node --test tests/aboutHybridBento.test.mjs`
Expected: `PASS`

- [ ] **Step 2: Run adjacent UI regression tests**

Run: `node --test tests/heroEditorial.test.mjs tests/navbarEditorial.test.mjs tests/loaderCinematic.test.mjs`
Expected: `PASS`

- [ ] **Step 3: Run production build**

Run: `npm run build`
Expected: Successful Next.js production build. Existing non-blocking warnings may still appear, but no build failure.

- [ ] **Step 4: Manual verification checklist**

```text
1. Confirm the About section reads as one framed composition with a dominant left panel and two stacked right panels.
2. Confirm the left panel reacts subtly to cursor movement without feeling gimmicky or unstable.
3. Confirm `cartoon-chill.svg` feels dominant and clean inside the left panel.
4. Confirm the right-top panel remains light and does not overpower the left panel.
5. Confirm the right-bottom tech panel feels tactile and low-noise.
6. Confirm `TechStackTransition` still renders below and can be removed later if the new section already carries enough weight.
7. Confirm mobile layout stacks cleanly and stays readable.
```

- [ ] **Step 5: Commit**

```bash
git add src/features/home/about/containers/AboutSection.tsx src/features/home/about/styles/about.css tests/aboutHybridBento.test.mjs
git commit -m "feat(about): redesign section as hybrid bento composition"
```
