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

test("layout and globals do not gate first paint behind server loading shell", () => {
  const layout = read("src/app/layout.tsx");
  const globals = read("src/styles/globals.css");

  assert.equal(layout.includes("preload-shell"), false);
  assert.equal(layout.includes("preload-shell__bars"), false);
  assert.equal(layout.includes("data-shell-ready"), false);
  assert.equal(layout.includes("localFont"), true);
  assert.equal(layout.includes("--font-akira"), true);
  assert.equal(globals.includes("html, body"), true);
  assert.equal(globals.includes("[data-shell-ready=\"false\"]"), false);
  assert.equal(globals.includes(".preload-shell__bars"), false);
  assert.equal(globals.includes("@keyframes preloadBar"), false);
});

test("quick loader avoids invalid paragraph nesting and hero image declares sizes", () => {
  const quick = read("src/shared/components/QuickLoader.tsx");
  const heroImage = read("src/features/home/hero/components/HeroImage.tsx");

  assert.equal(quick.includes("motion.p"), false);
  assert.equal(quick.includes("motion.div"), true);
  assert.equal(heroImage.includes("sizes="), true);
});

test("entrance loader exits after hero image readiness and minimum duration", () => {
  const entrance = read("src/shared/components/EntranceLoader.tsx");
  const homeScreen = read("src/features/home/hero/containers/HomeScreen.tsx");

  assert.equal(entrance.includes("shouldExit"), true);
  assert.equal(homeScreen.includes("minLoaderElapsed && heroImageReady"), true);
  assert.equal(homeScreen.includes("onHeroImageReady"), true);
  assert.equal(homeScreen.includes("setHeroImageReady(true)"), true);
  assert.equal(homeScreen.includes('showLoader ? "opacity-0" : "opacity-100"'), false);
});

test("home screen keeps content visible while entrance loader overlays briefly", () => {
  const homeScreen = read("src/features/home/hero/containers/HomeScreen.tsx");

  assert.equal(homeScreen.includes("sessionStorage"), false);
  assert.equal(homeScreen.includes("QuickLoader"), false);
  assert.equal(homeScreen.includes("EntranceLoader"), true);
  assert.equal(homeScreen.includes("scrollRestoration"), true);
  assert.equal(homeScreen.includes("window.scrollTo({ top: 0, behavior: \"auto\" })"), false);
  assert.equal(homeScreen.includes('document.body.style.overflow = "hidden"'), false);
  assert.equal(homeScreen.includes('document.body.style.overflow = ""'), false);
  assert.equal(homeScreen.includes("<HeroAboutTransition"), true);
});
