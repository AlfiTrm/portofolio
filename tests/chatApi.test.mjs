import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

function read(relativePath) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

test("chat keeps Sumopod credentials server-side and bounds public requests", () => {
  const route = read("src/app/api/chat/route.ts");
  const client = read("src/features/chat/components/FloatingChatSheet.tsx");

  assert.equal(route.includes("process.env.NEXT_SUMOPOD_AI"), true);
  assert.equal(route.includes("https://ai.sumopod.com/v1/chat/completions"), true);
  assert.equal(route.includes('"qwen3.7-flash-2026-07-15"'), true);
  assert.equal(route.includes("max_tokens: 120"), true);
  assert.equal(route.includes("Answer directly in 2-4 short sentences"), true);
  assert.equal(route.includes("without Markdown emphasis"), true);
  assert.equal(route.includes('.replace(/\\*\\*/g, "")'), true);
  assert.equal(route.includes("message.content.length <= 500"), true);
  assert.equal(route.includes("messages.length > 8"), true);
  assert.equal(route.includes("portfolioTopics.some"), true);
  assert.equal(route.includes("I can only answer questions about Alfi"), true);
  assert.equal(
    route.indexOf("I can only answer questions about Alfi") <
      route.indexOf('fetch("https://ai.sumopod.com'),
    true,
  );
  assert.equal(client.includes('fetch("/api/chat"'), true);
  assert.equal(client.includes("NEXT_SUMOPOD_AI"), false);
});

test("chat keyboard shortcut toggles the shared open state", () => {
  const home = read("src/features/home/HomeScreen.tsx");

  assert.equal(home.includes("event.ctrlKey || event.metaKey"), true);
  assert.equal(home.includes('event.key.toLowerCase() !== "k"'), true);
  assert.equal(home.includes("setChatOpen((current) => !current)"), true);
});

test("assistant replies reveal progressively with a reduced-motion fallback", () => {
  const client = read("src/features/chat/components/FloatingChatSheet.tsx");

  assert.equal(client.includes('matchMedia("(prefers-reduced-motion: reduce)")'), true);
  assert.equal(client.includes("window.setInterval"), true);
  assert.equal(client.includes("content.slice(0, visibleCharacters)"), true);
});
