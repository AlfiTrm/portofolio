# Cinematic Timeline And Vercel Deploy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current straight experience timeline with a cinematic curved story path that draws and rewinds with scroll, then add GitHub Actions workflows that deploy `dev` to Vercel preview and `main` to production.

**Architecture:** Keep the timeline feature centered in `ExperienceTimeline.tsx`, but split the visual path and milestone item into small focused components so scroll orchestration stays readable. Use a normalized milestone data list, SVG path progress driven by section scroll, and two standalone workflow YAML files under `.github/workflows` for deploy automation.

**Tech Stack:** Next.js App Router, React client components, TypeScript, Tailwind CSS, Framer Motion, SVG path rendering, Node test runner, GitHub Actions, Vercel CLI

---

### Task 1: Add failing regression tests for the new cinematic timeline

**Files:**
- Create: `tests/cinematicTimeline.test.mjs`
- Test: `tests/cinematicTimeline.test.mjs`

- [ ] **Step 1: Write the failing test**

```javascript
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

function read(relativePath) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

test("experience timeline uses a cinematic SVG path and minimal milestone copy", () => {
  const timeline = read("src/features/home/about/components/ExperienceTimeline.tsx");

  assert.equal(timeline.includes("<svg"), true);
  assert.equal(timeline.includes("pathLength"), true);
  assert.equal(timeline.includes("CinematicTimelineMilestone"), true);
  assert.equal(timeline.includes("entry.description"), false);
  assert.equal(timeline.includes("entry.highlights"), false);
  assert.equal(timeline.includes("border-dashed"), false);
});

test("timeline data is normalized into a flat milestone list with normalized categories", () => {
  const data = read("src/features/home/about/data/timelineData.ts");

  assert.equal(data.includes("timelineMilestones"), true);
  assert.equal(data.includes("type TimelineCategory"), true);
  assert.equal(data.includes('"organization"'), true);
  assert.equal(data.includes('"hackathon"'), true);
  assert.equal(data.includes('"contract"'), true);
  assert.equal(data.includes('"internship"'), true);
  assert.equal(data.includes('"personal"'), true);
  assert.equal(data.includes("entries:"), false);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/cinematicTimeline.test.mjs`
Expected: `FAIL` because the current timeline still uses grouped `entries`, description/highlight rendering, and a straight vertical line instead of an SVG-driven path.

- [ ] **Step 3: Write minimal implementation**

```javascript
// No production change in this task.
// This task only establishes the failing expectations.
```

- [ ] **Step 4: Run test to verify it still fails for the expected reason**

Run: `node --test tests/cinematicTimeline.test.mjs`
Expected: `FAIL` with assertion failures tied to the missing SVG path and old grouped data structure, not syntax errors.

- [ ] **Step 5: Commit**

```bash
git add tests/cinematicTimeline.test.mjs
git commit -m "test(timeline): add cinematic timeline regression coverage"
```

### Task 2: Normalize timeline data for the new milestone format

**Files:**
- Modify: `src/features/home/about/data/timelineData.ts`
- Test: `tests/cinematicTimeline.test.mjs`

- [ ] **Step 1: Write the failing test**

Use the existing failing data-structure test from Task 1:

```javascript
test("timeline data is normalized into a flat milestone list with normalized categories", () => {
  const data = read("src/features/home/about/data/timelineData.ts");

  assert.equal(data.includes("timelineMilestones"), true);
  assert.equal(data.includes("type TimelineCategory"), true);
  assert.equal(data.includes('"organization"'), true);
  assert.equal(data.includes('"hackathon"'), true);
  assert.equal(data.includes('"contract"'), true);
  assert.equal(data.includes('"internship"'), true);
  assert.equal(data.includes('"personal"'), true);
  assert.equal(data.includes("entries:"), false);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/cinematicTimeline.test.mjs`
Expected: `FAIL` on the grouped `entries` assertions.

- [ ] **Step 3: Write minimal implementation**

Replace the grouped data with a flat normalized list:

```typescript
export type TimelineCategory =
  | "education"
  | "organization"
  | "hackathon"
  | "contract"
  | "internship"
  | "personal";

export type TimelineMilestone = {
  title: string;
  timeLabel: string;
  category: TimelineCategory;
};

export const timelineMilestones: TimelineMilestone[] = [
  {
    title: "Bachelor of Computer Science - Information Systems",
    timeLabel: "2023 - sekarang",
    category: "education",
  },
  {
    title: "IT Fest 2025 Event Platform",
    timeLabel: "Mei - Juli 2025 - organization",
    category: "organization",
  },
  {
    title: "KBMDSI Organization Website",
    timeLabel: "Mei - Juli 2025 - organization",
    category: "organization",
  },
  {
    title: "IFL Chapter Malang Website",
    timeLabel: "Oktober - November 2025 - organization",
    category: "organization",
  },
  {
    title: "PT Inspirasi Mandiri Nusantara",
    timeLabel: "2025 - sekarang - internship",
    category: "internship",
  },
  {
    title: "Academic Competition Platform",
    timeLabel: "2025 - sekarang - contract",
    category: "contract",
  },
];
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/cinematicTimeline.test.mjs`
Expected: The data-structure test now passes, while the timeline-rendering test still fails.

- [ ] **Step 5: Commit**

```bash
git add src/features/home/about/data/timelineData.ts tests/cinematicTimeline.test.mjs
git commit -m "refactor(timeline): normalize timeline milestone data"
```

### Task 3: Build the curved SVG story spine and scroll-driven progress

**Files:**
- Create: `src/features/home/about/components/timeline/CinematicTimelinePath.tsx`
- Modify: `src/features/home/about/components/ExperienceTimeline.tsx`
- Test: `tests/cinematicTimeline.test.mjs`

- [ ] **Step 1: Write the failing test**

Use the existing timeline-rendering test from Task 1:

```javascript
test("experience timeline uses a cinematic SVG path and minimal milestone copy", () => {
  const timeline = read("src/features/home/about/components/ExperienceTimeline.tsx");

  assert.equal(timeline.includes("<svg"), true);
  assert.equal(timeline.includes("pathLength"), true);
  assert.equal(timeline.includes("CinematicTimelineMilestone"), true);
  assert.equal(timeline.includes("entry.description"), false);
  assert.equal(timeline.includes("entry.highlights"), false);
  assert.equal(timeline.includes("border-dashed"), false);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/cinematicTimeline.test.mjs`
Expected: `FAIL` because the current component still scales a straight line and renders description/highlight fields.

- [ ] **Step 3: Write minimal implementation**

Create the path component:

```tsx
"use client";

import { motion, type MotionValue } from "framer-motion";

type CinematicTimelinePathProps = {
  progress: MotionValue<number>;
  pathDefinition: string;
};

export default function CinematicTimelinePath({
  progress,
  pathDefinition,
}: CinematicTimelinePathProps) {
  return (
    <svg
      viewBox="0 0 1000 2200"
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d={pathDefinition}
        fill="none"
        stroke="rgba(240,231,212,0.12)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <motion.path
        d={pathDefinition}
        fill="none"
        stroke="rgba(240,231,212,0.88)"
        strokeWidth="4"
        strokeLinecap="round"
        style={{ pathLength: progress }}
      />
    </svg>
  );
}
```

Rebuild `ExperienceTimeline.tsx` around the new path:

```tsx
"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import { timelineMilestones } from "../data/timelineData";
import CinematicTimelinePath from "./timeline/CinematicTimelinePath";
import CinematicTimelineMilestone from "./timeline/CinematicTimelineMilestone";

export default function ExperienceTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.92", "end 0.18"],
  });

  const smoothedProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.7,
  });

  const pathDefinition = useMemo(
    () =>
      "M 500 40 C 690 160 700 280 500 390 C 300 500 290 640 500 770 C 710 900 700 1060 500 1210 C 310 1350 300 1510 500 1680 C 700 1850 700 2010 500 2140",
    []
  );

  return (
    <section ref={sectionRef} className="relative mt-32 pb-12">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="relative min-h-[135rem]">
          <CinematicTimelinePath
            progress={smoothedProgress}
            pathDefinition={pathDefinition}
          />

          {timelineMilestones.map((entry, index) => {
            const side = index % 2 === 0 ? "left" : "right";
            const anchorY = 9 + index * 18;
            const activationStart = Math.max(index / timelineMilestones.length - 0.08, 0);
            const activationEnd = Math.min(activationStart + 0.14, 1);
            const isActive = useTransform(
              smoothedProgress,
              [activationStart, activationEnd],
              [0, 1]
            );

            return (
              <CinematicTimelineMilestone
                key={`${entry.title}-${entry.timeLabel}`}
                entry={entry}
                side={side}
                top={`${anchorY}%`}
                activeProgress={isActive}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/cinematicTimeline.test.mjs`
Expected: The SVG-path assertions pass, but the new milestone component import may still require the next task to complete.

- [ ] **Step 5: Commit**

```bash
git add src/features/home/about/components/ExperienceTimeline.tsx src/features/home/about/components/timeline/CinematicTimelinePath.tsx tests/cinematicTimeline.test.mjs
git commit -m "feat(timeline): add curved scroll-driven story spine"
```

### Task 4: Add alternating milestone items with dramatic active states

**Files:**
- Create: `src/features/home/about/components/timeline/CinematicTimelineMilestone.tsx`
- Modify: `src/features/home/about/components/ExperienceTimeline.tsx`
- Test: `tests/cinematicTimeline.test.mjs`

- [ ] **Step 1: Write the failing test**

Extend the existing rendering test with left-right alternation markers:

```javascript
test("experience timeline uses a cinematic SVG path and minimal milestone copy", () => {
  const timeline = read("src/features/home/about/components/ExperienceTimeline.tsx");
  const milestone = read(
    "src/features/home/about/components/timeline/CinematicTimelineMilestone.tsx"
  );

  assert.equal(timeline.includes("CinematicTimelineMilestone"), true);
  assert.equal(milestone.includes('side === "left"'), true);
  assert.equal(milestone.includes("activeProgress"), true);
  assert.equal(milestone.includes("entry.timeLabel"), true);
  assert.equal(milestone.includes("entry.category"), true);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/cinematicTimeline.test.mjs`
Expected: `FAIL` until the milestone file exists and exposes the alternating layout and active-state markers.

- [ ] **Step 3: Write minimal implementation**

Create the milestone component:

```tsx
"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import type { TimelineMilestone } from "../../data/timelineData";

type CinematicTimelineMilestoneProps = {
  entry: TimelineMilestone;
  side: "left" | "right";
  top: string;
  activeProgress: MotionValue<number>;
};

export default function CinematicTimelineMilestone({
  entry,
  side,
  top,
  activeProgress,
}: CinematicTimelineMilestoneProps) {
  const opacity = useTransform(activeProgress, [0, 1], [0.34, 1]);
  const y = useTransform(activeProgress, [0, 1], [30, 0]);
  const scale = useTransform(activeProgress, [0, 1], [0.98, 1]);

  return (
    <motion.article
      className={`absolute w-[42%] ${side === "left" ? "left-0 text-right pr-12" : "right-0 text-left pl-12"}`}
      style={{ top, opacity, y, scale }}
    >
      <div className="relative">
        <div
          className={`absolute top-3 h-px w-14 bg-[linear-gradient(90deg,rgba(240,231,212,0.85),transparent)] ${
            side === "left" ? "right-[-0.5rem]" : "left-[-0.5rem] rotate-180"
          }`}
        />
        <div className="space-y-2">
          <h3 className="text-[1.35rem] leading-[1.05] text-[#f0e7d4] md:text-[2rem]">
            {entry.title}
          </h3>
          <p className="text-[0.72rem] uppercase tracking-[0.22em] text-white/44 md:text-[0.76rem]">
            {entry.timeLabel}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
```

Refine `ExperienceTimeline.tsx` so each milestone uses an explicit normalized time/category line:

```tsx
const timelineEntries = timelineMilestones.map((entry) => ({
  ...entry,
  timeLabel: `${entry.timeLabel} - ${entry.category}`,
}));
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/cinematicTimeline.test.mjs`
Expected: `PASS`

- [ ] **Step 5: Commit**

```bash
git add src/features/home/about/components/ExperienceTimeline.tsx src/features/home/about/components/timeline/CinematicTimelineMilestone.tsx tests/cinematicTimeline.test.mjs
git commit -m "feat(timeline): add alternating cinematic milestones"
```

### Task 5: Add failing regression tests for the Vercel deploy workflows

**Files:**
- Create: `tests/vercelDeployWorkflow.test.mjs`
- Test: `tests/vercelDeployWorkflow.test.mjs`

- [ ] **Step 1: Write the failing test**

```javascript
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

function read(relativePath) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

test("preview workflow deploys dev branch to Vercel preview", () => {
  const workflow = read(".github/workflows/vercel-preview.yml");

  assert.equal(workflow.includes("name: Vercel Preview Deployment"), true);
  assert.equal(workflow.includes("branches:"), true);
  assert.equal(workflow.includes("- dev"), true);
  assert.equal(workflow.includes("--environment=preview"), true);
  assert.equal(workflow.includes("vercel deploy --prebuilt"), true);
  assert.equal(workflow.includes("VERCEL_TOKEN"), true);
});

test("production workflow deploys main branch to Vercel production", () => {
  const workflow = read(".github/workflows/vercel-production.yml");

  assert.equal(workflow.includes("name: Vercel Production Deployment"), true);
  assert.equal(workflow.includes("- main"), true);
  assert.equal(workflow.includes("--environment=production"), true);
  assert.equal(workflow.includes("vercel build --prod"), true);
  assert.equal(workflow.includes("vercel deploy --prebuilt --prod"), true);
  assert.equal(workflow.includes("VERCEL_PROJECT_ID"), true);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/vercelDeployWorkflow.test.mjs`
Expected: `FAIL` because the `.github/workflows/` files do not exist yet.

- [ ] **Step 3: Write minimal implementation**

```javascript
// No production change in this task.
// This task only establishes the failing workflow expectations.
```

- [ ] **Step 4: Run test to verify it still fails for the expected reason**

Run: `node --test tests/vercelDeployWorkflow.test.mjs`
Expected: `FAIL` because the workflow files are still missing.

- [ ] **Step 5: Commit**

```bash
git add tests/vercelDeployWorkflow.test.mjs
git commit -m "test(ci): add vercel workflow regression coverage"
```

### Task 6: Implement Vercel preview and production GitHub Actions workflows

**Files:**
- Create: `.github/workflows/vercel-preview.yml`
- Create: `.github/workflows/vercel-production.yml`
- Test: `tests/vercelDeployWorkflow.test.mjs`

- [ ] **Step 1: Write the failing test**

Use the existing workflow expectations from Task 5.

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/vercelDeployWorkflow.test.mjs`
Expected: `FAIL` until the workflow files are added.

- [ ] **Step 3: Write minimal implementation**

Create `.github/workflows/vercel-preview.yml`:

```yaml
name: Vercel Preview Deployment

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

on:
  push:
    branches:
      - dev

jobs:
  Deploy-Preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm install --global vercel@latest
      - run: vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}
      - run: vercel build --token=${{ secrets.VERCEL_TOKEN }}
      - run: vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }}
```

Create `.github/workflows/vercel-production.yml`:

```yaml
name: Vercel Production Deployment

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

on:
  push:
    branches:
      - main

jobs:
  Deploy-Production:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm install --global vercel@latest
      - run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
      - run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
      - run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/vercelDeployWorkflow.test.mjs`
Expected: `PASS`

- [ ] **Step 5: Commit**

```bash
git add .github/workflows/vercel-preview.yml .github/workflows/vercel-production.yml tests/vercelDeployWorkflow.test.mjs
git commit -m "ci: add vercel preview and production workflows"
```

### Task 7: Full verification

**Files:**
- Test: `tests/cinematicTimeline.test.mjs`
- Test: `tests/vercelDeployWorkflow.test.mjs`
- Test: `tests/aboutHybridBento.test.mjs`
- Test: `tests/heroEditorial.test.mjs`
- Test: `tests/loaderCinematic.test.mjs`

- [ ] **Step 1: Run focused timeline and workflow regression tests**

Run: `node --test tests/cinematicTimeline.test.mjs tests/vercelDeployWorkflow.test.mjs`
Expected: `PASS`

- [ ] **Step 2: Run adjacent regression tests**

Run: `node --test tests/aboutHybridBento.test.mjs tests/heroEditorial.test.mjs tests/loaderCinematic.test.mjs`
Expected: `PASS`

- [ ] **Step 3: Run production build**

Run: `npm run build`
Expected: Successful Next.js production build. Existing non-blocking warnings may still appear, but there should be no compilation failure.

- [ ] **Step 4: Manual verification checklist**

```text
1. Confirm the timeline path feels curved and intentional, not noisy.
2. Confirm the bright route grows when scrolling down and rewinds when scrolling up.
3. Confirm milestone titles alternate left and right on desktop.
4. Confirm each milestone only shows title and `Waktu - Kategori`.
5. Confirm the active milestone brightens subtly when the path reaches it.
6. Confirm mobile collapses cleanly without text overlap or clipped path segments.
7. Confirm the deploy workflows exist under `.github/workflows` and target `dev` for preview and `main` for production.
8. Confirm GitHub repository secrets required are `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID`.
```

- [ ] **Step 5: Commit**

```bash
git add src/features/home/about/data/timelineData.ts src/features/home/about/components/ExperienceTimeline.tsx src/features/home/about/components/timeline/CinematicTimelinePath.tsx src/features/home/about/components/timeline/CinematicTimelineMilestone.tsx .github/workflows/vercel-preview.yml .github/workflows/vercel-production.yml tests/cinematicTimeline.test.mjs tests/vercelDeployWorkflow.test.mjs
git commit -m "feat(timeline): add cinematic story path and vercel deploy automation"
```
