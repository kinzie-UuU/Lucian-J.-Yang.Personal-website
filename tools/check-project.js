#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const indexPath = path.join(root, "index.html");

const errors = [];

const log = (message) => {
  process.stdout.write(`${message}\n`);
};

const exists = (relativePath) => {
  const absolutePath = path.join(root, relativePath);
  return fs.existsSync(absolutePath);
};

const stripQueryAndHash = (value) => value.split("#")[0].split("?")[0];

const decodeReference = (value) => {
  try {
    return decodeURIComponent(value);
  } catch (_) {
    return value;
  }
};

const collectMatches = (html, regex) => {
  const matches = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    matches.push(match[1]);
  }
  return matches;
};

log("Checking Lucian J. Yang static site references...");

if (!fs.existsSync(indexPath)) {
  errors.push("Missing index.html");
} else {
  log("OK index.html found");
}

let html = "";
if (fs.existsSync(indexPath)) {
  html = fs.readFileSync(indexPath, "utf8");
}

const cssRefs = collectMatches(html, /<link\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi)
  .filter((href) => href && !/^(?:data:|https?:|#)/i.test(href))
  .map((href) => decodeReference(stripQueryAndHash(href)))
  .filter((href) => href.endsWith(".css"));

const jsRefs = collectMatches(html, /<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)
  .filter((src) => src && !/^(?:data:|https?:|#)/i.test(src))
  .map((src) => decodeReference(stripQueryAndHash(src)))
  .filter((src) => src.endsWith(".js"));

log(`Found ${cssRefs.length} CSS references`);
cssRefs.forEach((href) => {
  if (exists(href)) {
    log(`OK CSS ${href}`);
  } else {
    errors.push(`Missing CSS ${href}`);
  }
});

log(`Found ${jsRefs.length} JS references`);
jsRefs.forEach((src) => {
  if (exists(src)) {
    log(`OK JS ${src}`);
  } else {
    errors.push(`Missing JS ${src}`);
  }
});

["site-data.js", "three.min.js"].forEach((requiredFile) => {
  if (exists(requiredFile)) {
    log(`OK required ${requiredFile}`);
  } else {
    errors.push(`Missing required ${requiredFile}`);
  }
});

if (errors.length > 0) {
  log("");
  log("Project check failed:");
  errors.forEach((error) => log(`- ${error}`));
  process.exit(1);
}

log("");
log("Project check passed.");
process.exit(0);
