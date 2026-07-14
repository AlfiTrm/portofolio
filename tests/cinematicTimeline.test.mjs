import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

function read(relativePath) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

test("experience timeline uses a cinematic SVG path and minimal milestone copy", () => {
  const timeline = read("src/features/home/about/components/ExperienceTimeline.tsx");
  const pathComponent = read(
    "src/features/home/about/components/timeline/CinematicTimelinePath.tsx"
  );

  assert.equal(timeline.includes("CinematicTimelinePath"), true);
  assert.equal(timeline.includes("CinematicTimelineMilestone"), true);
  assert.equal(pathComponent.includes("<svg"), true);
  assert.equal(pathComponent.includes("pathLength"), true);
  assert.equal(timeline.includes("teaserHeightRem"), true);
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

test("timeline milestone component alternates sides and renders time/category metadata", () => {
  const milestone = read(
    "src/features/home/about/components/timeline/CinematicTimelineMilestone.tsx"
  );

  assert.equal(milestone.includes('side === "left"'), true);
  assert.equal(milestone.includes("progress"), true);
  assert.equal(milestone.includes("entry.timeLabel"), true);
  assert.equal(milestone.includes("entry.category"), true);
});
