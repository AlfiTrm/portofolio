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
