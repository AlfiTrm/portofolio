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
