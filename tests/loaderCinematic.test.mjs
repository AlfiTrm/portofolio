import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

function read(relativePath) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

test("entrance and quick loaders use three-rectangle cinematic loading marks", () => {
  const entrance = read("src/shared/components/EntranceLoader.tsx");
  const quick = read("src/shared/components/QuickLoader.tsx");
  const titleCard = read("src/shared/components/LoaderTitleCard.tsx");

  assert.equal(entrance.includes("LoaderTitleCard"), true);
  assert.equal(quick.includes("LoaderTitleCard"), true);
  assert.equal(titleCard.includes("const bars = [0, 1, 2]"), true);
  assert.equal(titleCard.includes("h-32 w-12"), true);
  assert.equal(titleCard.includes("rounded-[0.35rem]"), true);
  assert.equal(titleCard.includes("animate"), true);
  assert.equal(titleCard.includes("Tsan"), false);
  assert.equal(entrance.includes("cyan"), false);
  assert.equal(quick.includes("cyan"), false);
  assert.equal(entrance.includes("LoaderTitleCard"), true);
  assert.equal(quick.includes("LoaderTitleCard"), true);
});

test("layout and globals provide server-first black loading shell", () => {
  const layout = read("src/app/layout.tsx");
  const globals = read("src/styles/globals.css");

  assert.equal(layout.includes("preload-shell"), true);
  assert.equal(layout.includes("preload-shell__bars"), true);
  assert.equal(layout.includes("data-shell-ready"), true);
  assert.equal(layout.includes("localFont"), true);
  assert.equal(layout.includes("--font-akira"), true);
  assert.equal(globals.includes("html, body"), true);
  assert.equal(globals.includes("[data-shell-ready=\"false\"]"), true);
  assert.equal(globals.includes(".preload-shell__bars"), true);
  assert.equal(globals.includes("width: 3rem;"), true);
  assert.equal(globals.includes("@keyframes preloadBar"), true);
});

test("quick loader avoids invalid paragraph nesting and hero image declares sizes", () => {
  const quick = read("src/shared/components/QuickLoader.tsx");
  const heroImage = read("src/features/home/hero/components/HeroImage.tsx");

  assert.equal(quick.includes("motion.p"), false);
  assert.equal(quick.includes("motion.div"), true);
  assert.equal(heroImage.includes("sizes="), true);
});

test("preload shell is dismissed by home screen completion, not immediately on mount", () => {
  const shellDismiss = read("src/shared/components/PreloadShellDismiss.tsx");
  const homeScreen = read("src/features/home/hero/containers/HomeScreen.tsx");

  assert.equal(shellDismiss.includes("data-shell-ready = \"true\""), false);
  assert.equal(homeScreen.includes('document.body.dataset.shellReady = "false"'), true);
  assert.equal(homeScreen.includes('document.body.dataset.shellReady = "true"'), true);
  assert.equal(homeScreen.includes("isLoading ? \"opacity-0\" : \"opacity-100\""), true);
});

test("home screen always replays entrance loading and locks scroll while loading", () => {
  const homeScreen = read("src/features/home/hero/containers/HomeScreen.tsx");

  assert.equal(homeScreen.includes("sessionStorage"), false);
  assert.equal(homeScreen.includes("QuickLoader"), false);
  assert.equal(homeScreen.includes("EntranceLoader"), true);
  assert.equal(homeScreen.includes("scrollRestoration"), true);
  assert.equal(homeScreen.includes("window.scrollTo({ top: 0, behavior: \"auto\" })"), false);
  assert.equal(homeScreen.includes('document.body.style.overflow = "hidden"'), true);
  assert.equal(homeScreen.includes('document.body.style.overflow = ""'), true);
});
