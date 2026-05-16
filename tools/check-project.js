#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const indexPath = path.join(root, "index.html");

const errors = [];
const assetRefs = new Map();

const log = (message) => {
  process.stdout.write(`${message}\n`);
};

const exists = (relativePath) => {
  const absolutePath = path.resolve(root, relativePath.replace(/\//g, path.sep));
  return absolutePath.startsWith(`${root}${path.sep}`) && fs.existsSync(absolutePath);
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

const collectAttributeRefs = (html, regex) => {
  const refs = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    match[1]
      .split(/\s+/)
      .filter(Boolean)
      .forEach((ref) => refs.push(ref));
  }
  return refs;
};

const isLocalReference = (value) => value && !/^(?:data:|https?:|mailto:|tel:|javascript:|#)/i.test(value);

const normalizeReference = (value, baseDir = "") => {
  if (!isLocalReference(value)) return null;

  const raw = value.trim();
  const decodedRaw = decodeReference(raw);
  if (!decodedRaw || decodedRaw.startsWith("#")) return null;

  const stripped = stripQueryAndHash(decodedRaw);
  if (!stripped) return null;

  return path.posix.normalize(path.posix.join(baseDir, stripped.replace(/\\/g, "/")));
};

const addAssetRef = (value, source, baseDir = "") => {
  const reference = normalizeReference(value, baseDir);
  if (!reference) return;

  if (!assetRefs.has(reference)) assetRefs.set(reference, new Set());
  assetRefs.get(reference).add(source);
};

const isAssetReference = (value) => /\.(?:css|js|png|jpe?g|webp|gif|svg|mp4|webm|woff2?|ttf|otf|ico)$/i.test(stripQueryAndHash(value));

const collectObjectAssetRefs = (value, trail) => {
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectObjectAssetRefs(item, `${trail}[${index}]`));
    return;
  }

  if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, item]) => collectObjectAssetRefs(item, `${trail}.${key}`));
    return;
  }

  if (typeof value === "string" && /^(?:images|videos|fonts)\//.test(value)) {
    addAssetRef(value, trail);
  }
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

const ids = collectMatches(html, /\bid=["']([^"']+)["']/gi);
const idCounts = ids.reduce((counts, id) => {
  counts.set(id, (counts.get(id) || 0) + 1);
  return counts;
}, new Map());
const idSet = new Set(ids);
const duplicateIds = Array.from(idCounts.entries())
  .filter(([, count]) => count > 1)
  .map(([id]) => id);

duplicateIds.forEach((id) => errors.push(`Duplicate id #${id}`));

collectMatches(html, /\bhref=["']#([^"']+)["']/gi)
  .filter((id) => id && id !== "top")
  .forEach((id) => {
    if (!idSet.has(id)) errors.push(`Missing target for href="#${id}"`);
  });

collectAttributeRefs(html, /\b(?:aria-controls|aria-labelledby|aria-describedby|for)=["']([^"']+)["']/gi)
  .forEach((id) => {
    if (!idSet.has(id)) errors.push(`Missing id reference #${id}`);
  });

log(`Found ${ids.length} element ids`);
if (!duplicateIds.length) log("OK no duplicate ids");

const cssRefs = collectMatches(html, /<link\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi)
  .map((href) => normalizeReference(href))
  .filter(Boolean)
  .filter((href) => href.endsWith(".css"));

const jsRefs = collectMatches(html, /<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)
  .map((src) => normalizeReference(src))
  .filter(Boolean)
  .filter((src) => src.endsWith(".js"));

collectMatches(html, /\b(?:src|poster|href)=["']([^"']+)["']/gi)
  .filter(isAssetReference)
  .forEach((reference) => addAssetRef(reference, "index.html"));

collectMatches(html, /\bsrcset=["']([^"']+)["']/gi)
  .forEach((srcset) => {
    srcset.split(",")
      .map((entry) => entry.trim().split(/\s+/)[0])
      .filter(Boolean)
      .forEach((reference) => addAssetRef(reference, "index.html srcset"));
  });

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

cssRefs.forEach((cssRef) => {
  if (!exists(cssRef)) return;
  const css = fs.readFileSync(path.join(root, cssRef), "utf8");
  const baseDir = path.posix.dirname(cssRef);
  let match;
  const urlRegex = /url\((?:["']?)([^)"']+)(?:["']?)\)/gi;

  while ((match = urlRegex.exec(css)) !== null) {
    addAssetRef(match[1], cssRef, baseDir);
  }
});

if (exists("site-data.js")) {
  try {
    const context = {};
    vm.createContext(context);
    vm.runInContext(fs.readFileSync(path.join(root, "site-data.js"), "utf8"), context);
    ["i18n", "worksData", "workGalleryImages", "workGalleryProjects", "galleryText"]
      .forEach((name) => collectObjectAssetRefs(context[name], name));
  } catch (error) {
    errors.push(`site-data.js could not be evaluated: ${error.message}`);
  }
}

log(`Found ${assetRefs.size} asset references`);
assetRefs.forEach((sources, reference) => {
  if (exists(reference)) {
    log(`OK asset ${reference}`);
  } else {
    errors.push(`Missing asset ${reference} referenced by ${Array.from(sources).join(", ")}`);
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
