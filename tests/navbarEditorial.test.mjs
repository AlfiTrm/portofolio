import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

function read(relativePath) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

test("desktop navbar uses editorial split layout and Tsan wordmark", () => {
  const source = read("src/shared/components/Navbar.tsx");

  assert.equal(source.includes("Tsan"), true);
  assert.equal(source.includes("rounded-full border"), false);
  assert.equal(source.includes("bg-black/90"), false);
  assert.equal(source.includes("nav-pill"), false);
  assert.equal(source.includes("navPrimary"), true);
  assert.equal(source.includes("navSecondary"), true);
  assert.equal(source.includes("navContact"), true);
  assert.equal(source.includes("flex-col"), true);
  assert.equal(source.includes("fixed bottom-6 right-6"), true);
  assert.equal(source.includes('label: "Works"'), true);
  assert.equal(source.includes('name: "About"'), true);
  assert.equal(source.includes("var(--font-akira)"), true);
  assert.equal(source.includes("@iconify/react"), true);
  assert.equal(source.includes("iconoir:spark-solid"), true);
  assert.equal(source.includes("gap-10 xl:gap-14"), true);
  assert.equal(source.includes("absolute -left-4"), true);
  assert.equal(source.includes("pt-[0.9rem]"), true);
});

test("desktop navbar active state follows in-view section instead of click target", () => {
  const source = read("src/shared/components/Navbar.tsx");

  assert.equal(source.includes("setActiveItem(name)"), false);
  assert.equal(
    source.includes("const handleNavClick = (name: string, href: string)"),
    false
  );
  assert.equal(source.includes("const handleNavClick = (href: string)"), true);
});

test("mobile navbar no longer uses bottom dock navigation", () => {
  const source = read("src/shared/components/MobileNavbar.tsx");

  assert.equal(source.includes("fixed bottom-0"), false);
  assert.equal(source.includes("Tsan"), true);
  assert.equal(source.includes("rounded-2xl"), false);
  assert.equal(source.includes("fixed bottom-5 right-5"), true);
});

test("mobile navbar active state follows in-view section instead of click target", () => {
  const source = read("src/shared/components/MobileNavbar.tsx");

  assert.equal(source.includes("setActiveTab(name)"), false);
  assert.equal(
    source.includes("const scrollToSection = (href: string, name: string)"),
    false
  );
  assert.equal(source.includes("const scrollToSection = (href: string)"), true);
});
