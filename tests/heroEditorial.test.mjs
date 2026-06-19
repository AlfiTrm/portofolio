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
  assert.equal(source.includes("port"), true);
  assert.equal(source.includes("folio"), true);
  assert.equal(source.includes("var(--font-akira)"), true);
  assert.equal(source.includes("Quiet beginnings, deliberate motion"), false);
  assert.equal(
    source.includes("I move through interface the way I move through thought"),
    false
  );
  assert.equal(source.includes("onOpenResume"), true);
  assert.equal(source.includes("Resume"), true);
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
  assert.equal(source.includes("<HeroContent"), true);
  assert.equal(source.includes("isActive={heroReady}"), true);
  assert.equal(source.includes("ask"), true);
  assert.equal(source.includes("iconoir:spark-solid"), true);
  assert.equal(source.includes("FloatingChatSheet"), true);
  assert.equal(source.includes("chatOpen"), true);
  assert.equal(source.includes("setChatOpen"), true);
});

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
  assert.equal(source.includes("live conversation is still in progress"), false);
  assert.equal(source.includes("chat is on its way"), true);
  assert.equal(source.includes("uppercase"), false);
  assert.equal(source.includes("backdrop-blur"), false);
  assert.equal(source.includes("useState<ChatEntry[]>([])"), true);
  assert.equal(source.includes("setMessages((current) => ["), true);
  assert.equal(source.includes('role: "typing"'), true);
  assert.equal(
    source.includes("animate={{ opacity: [0.36, 1, 0.36], y: [4, -4, 4] }}"),
    true
  );
});
