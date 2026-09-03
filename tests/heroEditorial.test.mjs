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
  assert.equal(source.includes("<HeroAboutTransition"), true);
  assert.equal(source.includes("<AboutSection />"), true);
  assert.equal(source.includes("<ProjectsSection />"), true);
  assert.equal(source.includes("onHeroImageReady"), true);
  assert.equal(source.includes("ask"), true);
  assert.equal(source.includes("iconoir:spark-solid"), false);
  assert.equal(source.includes("FloatingChatSheet"), true);
  assert.equal(source.includes("chatOpen"), true);
  assert.equal(source.includes("setChatOpen"), true);
});

test("hero about transition pins hero and introduces about copy", () => {
  const source = read("src/features/home/hero/components/HeroAboutTransition.tsx");
  const techSource = read("src/features/home/hero/data/techStack.ts");
  const timelineSource = read("src/features/home/about/components/ExperienceTimeline.tsx");

  assert.equal(source.includes('className="relative h-[460vh] bg-stage"'), true);
  assert.equal(source.includes("sticky top-0 h-screen"), true);
  assert.equal(source.includes("useScroll"), true);
  assert.equal(source.includes("ivoryX"), false);
  assert.equal(source.includes("sideFrameWidth"), true);
  assert.equal(source.includes("topFrameHeight"), true);
  assert.equal(source.includes("bottomFrameHeight"), true);
  assert.equal(source.includes("leftFrameRotate"), true);
  assert.equal(source.includes("rightFrameRotate"), true);
  assert.equal(source.includes("slashFrameWidth"), true);
  assert.equal(source.includes("slashFrameOpacity"), true);
  assert.equal(source.includes("portraitFilter"), true);
  assert.equal(source.includes("grayscale(1)"), true);
  assert.equal(source.includes('id="about"'), true);
  assert.equal(source.includes("top-[225vh]"), true);
  assert.equal(source.includes("techStack.map"), true);
  assert.equal(source.includes("toolsOpacity"), false);
  assert.equal(source.includes("techShowcaseOpacity"), true);
  assert.equal(source.includes("tools i keep close"), false);
  assert.equal(source.includes("techDisplayScale"), true);
  assert.equal(source.includes("activeTechName"), true);
  assert.equal(source.includes("setActiveTechName"), true);
  assert.equal(source.includes("techIconMap"), true);
  assert.equal(source.includes("watermark"), true);
  assert.equal(source.includes("techColorMap"), true);
  assert.equal(source.includes("activeTechColor"), true);
  assert.equal(source.includes("timelineThreadLength"), false);
  assert.equal(source.includes("timelineThreadOpacity"), false);
  assert.equal(timelineSource.includes("M 500 0 C 500 82"), true);
  assert.equal(timelineSource.includes("className=\"relative overflow-visible pb-14\""), true);
  assert.equal(source.includes("techFrameMap"), false);
  assert.equal(source.includes("adaptiveSideFrame"), false);
  assert.equal(source.includes("techDisplayClassMap"), false);
  assert.equal(source.includes("techDisplayStretchMap"), true);
  assert.equal(source.includes("activeTechStretch"), true);
  assert.equal(source.includes("calc(50vw - 8rem)"), false);
  assert.equal(source.includes("calc(50vh - 8rem)"), false);
  assert.equal(techSource.includes("Figma"), true);
  assert.equal(techSource.includes("Vercel"), true);
  assert.equal(techSource.includes("GitHub"), true);
  assert.equal(techSource.includes("Supabase"), true);
  assert.equal(techSource.includes("Laravel"), true);
  assert.equal(techSource.includes("HTML"), true);
  assert.equal(techSource.includes("CSS"), true);
  assert.equal(source.includes("[0.48, 0.62, 0.78, 0.86]"), true);
  assert.equal(source.includes("[0.86, 0.91]"), true);
  assert.equal(source.includes("highlightOneOpacity"), true);
  assert.equal(source.includes("highlightFourOpacity"), true);
  assert.equal(source.includes("portraitOpacity"), true);
  assert.equal(source.includes('width: "76vw"'), true);
  assert.equal(source.includes('height: "100vh"'), true);
  assert.equal(source.includes("aboutTextOpacity"), true);
  assert.equal(source.includes("heroVisualScale"), false);
  assert.equal(source.includes("portraitCardScale"), false);
  assert.equal(source.includes("Alfi"), true);
  assert.equal(source.includes("Tsani"), true);
  assert.equal(source.includes("aboutData.description"), false);
  assert.equal(source.includes("/hero/gambaralfi.webp"), true);
});

test("navigation can target the pinned about moment inside the hero section", () => {
  const desktopNav = read("src/shared/components/Navbar.tsx");
  const mobileNav = read("src/shared/components/MobileNavbar.tsx");

  assert.equal(desktopNav.includes('let currentItem = "Home"'), true);
  assert.equal(desktopNav.includes("setActiveItem(currentItem)"), true);
  assert.equal(desktopNav.includes("break;"), false);
  assert.equal(mobileNav.includes('let currentItem = "Home"'), true);
  assert.equal(mobileNav.includes("setActiveTab(currentItem)"), true);
  assert.equal(mobileNav.includes("break;"), false);
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
