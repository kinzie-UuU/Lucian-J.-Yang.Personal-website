#!/usr/bin/env node
/**
 * Simple concatenation bundler.
 * Merges app scripts + vendor scripts into two JS files,
 * and all stylesheets into one CSS file:
 *   dist/vendor.js   — three.min.js + GSAP (heavy libs, rarely change)
 *   dist/bundle.js   — all app scripts in exact HTML load order
 *   dist/bundle.css  — all stylesheets in exact HTML load order
 *
 * Run: node tools/build.js
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

if (!fs.existsSync(DIST)) fs.mkdirSync(DIST);

const read = (rel) => {
  const full = path.join(ROOT, rel);
  if (!fs.existsSync(full)) {
    console.warn("  SKIP (not found):", rel);
    return "";
  }
  return fs.readFileSync(full, "utf8");
};

const concat = (files, label) => {
  const parts = files.map((f) => {
    const src = read(f);
    if (!src) return "";
    return `/* --- ${f} --- */\n${src}\n`;
  });
  const result = parts.join("\n");
  const hash = crypto.createHash("md5").update(result).digest("hex").slice(0, 8);
  console.log(`  ${label}: ${files.length} files, ${(result.length / 1024).toFixed(1)} KB, hash=${hash}`);
  return { result, hash };
};

// ── Vendor bundle (three + GSAP) ──────────────────────────────────────────
const vendorFiles = [
  "three.min.js",
  "scripts/vendor/gsap/gsap.min.js",
  "scripts/vendor/gsap/MorphSVGPlugin.min.js",
];

// ── App bundle (exact order from index.html) ──────────────────────────────
const appFiles = [
  "site-data.js",
  "scripts/audio-feedback.js",
  "scripts/hero-state-runtime.js",
  "scripts/hero-sequence-runtime.js",
  "scripts/runtime-bridge.js",
  "scripts/app-bootstrap.js",
  "scripts/static-text-runtime.js",
  "scripts/language-runtime.js",
  "scripts/flip-text.js",
  "script.js",
  "scripts/services-scroll-story.js",
  "scripts/work-gallery.js",
  "scripts/work-case-data.js",
  "scripts/work-case.js",
  "scripts/scrambled-text.js",
  "scripts/header-controls.js",
  "scripts/hero-tv-controls.js",
  "scripts/language-controls.js",
  "scripts/contact-interactions.js",
  "scripts/scroll-type-effects.js",
  "scripts/reveal-effects.js",
  "scripts/precision-cursor.js",
  "scripts/works-hover-preview.js",
  "scripts/work-infinite-gallery.js",
  "scripts/work-category-showcase.js",
  "scripts/section-flow.js",
  "scripts/site-clock.js",
  "scripts/bottom-nav-scroll-spy.js",
  "scripts/clients-marquee.js",
  "scripts/clients-title-interaction.js",
  "scripts/portrait-motion.js",
  "scripts/scroll-curtain-transitions.js",
  "scripts/entry-key-model.js",
  "scripts/entry-hero-experience.js",
];

// ── CSS bundle ────────────────────────────────────────────────────────────
const cssFiles = [
  "styles/fonts.css",
  "styles.css",
  "styles/cursor.css",
  "styles/typography.css",
  "styles/home.css",
  "styles/entry-hero-experience.css",
  "styles/about.css",
  "styles/services.css",
  "styles/works.css",
  "styles/clients.css",
  "styles/work-gallery.css",
  "styles/work-case.css",
  "styles/contact.css",
  "styles/navigation.css",
  "styles/responsive.css",
  "styles/shared-motion.css",
];

console.log("\nBuilding bundles…");

const vendor = concat(vendorFiles, "vendor.js");
const app    = concat(appFiles,    "bundle.js");
const css    = concat(cssFiles,    "bundle.css");

fs.writeFileSync(path.join(DIST, "vendor.js"),  vendor.result, "utf8");
fs.writeFileSync(path.join(DIST, "bundle.js"),  app.result,    "utf8");
fs.writeFileSync(path.join(DIST, "bundle.css"), css.result,    "utf8");

// Write a manifest so index.html can reference versioned files
const manifest = {
  vendor: vendor.hash,
  bundle: app.hash,
  css:    css.hash,
  built:  new Date().toISOString(),
};
fs.writeFileSync(path.join(DIST, "manifest.json"), JSON.stringify(manifest, null, 2), "utf8");

console.log("\n✓ dist/vendor.js");
console.log("✓ dist/bundle.js");
console.log("✓ dist/bundle.css");
console.log("✓ dist/manifest.json");
console.log("\nHashes — update index.html ?v= accordingly:");
console.log(`  vendor: ${vendor.hash}`);
console.log(`  bundle: ${app.hash}`);
console.log(`  css:    ${css.hash}\n`);
