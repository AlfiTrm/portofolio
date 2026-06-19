import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

function read(relativePath) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

test("about section uses an asymmetric cinematic scene with cartoon chill asset", () => {
  const section = read("src/features/home/about/containers/AboutSection.tsx");
  const scene = read("src/features/home/about/components/AboutAsymmetricScene.tsx");
  const lanyard = read("src/features/home/about/components/AboutLanyardCard.tsx");
  const story = read("src/features/home/about/components/AboutStoryText.tsx");

  assert.equal(section.includes("AboutAsymmetricScene"), true);
  assert.equal(section.includes("AboutTechCluster"), false);
  assert.equal(scene.includes("AboutLanyardCard"), true);
  assert.equal(scene.includes("AboutStoryText"), true);
  assert.equal(scene.includes("scene two"), false);
  assert.equal(lanyard.includes("cartoon-chill.svg"), true);
  assert.equal(lanyard.includes("developer id"), true);
  assert.equal(lanyard.includes("Frontend Engineer"), true);
  assert.equal(story.includes("Junior Frontend Developer"), true);
  assert.equal(scene.includes("grid-cols-["), false);
  assert.equal(scene.includes("BentoGridBackground"), false);
});

test("about section trims copy and removes the tech cluster", () => {
  const source = read("src/features/home/about/components/AboutStoryText.tsx");
  const scene = read("src/features/home/about/components/AboutAsymmetricScene.tsx");

  assert.equal(source.includes("techStack.map"), false);
  assert.equal(source.includes("good cup of coffee"), true);
  assert.equal(source.includes("useScroll"), true);
  assert.equal(
    scene.includes('whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" }}'),
    true,
  );
});
