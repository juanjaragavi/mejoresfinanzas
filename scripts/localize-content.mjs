#!/usr/bin/env node
/**
 * Localization Script
 * - Scans personal-finance & financial-solutions content collections
 * - Generates Spanish slugs from (future) translated titles
 * - Injects lang frontmatter & ensures draft false (optionally deferred)
 * - Builds slug mapping JSON (append-only)
 * NOTE: This script does NOT perform automatic machine translation to avoid quality issues.
 */
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// PROJECT_ROOT = repository root (two levels up from scripts dir?)
// __dirname => /.../mejoresfinanzas/scripts
const PROJECT_ROOT = path.resolve(__dirname, "..");
const CONTENT_DIRS = [
  "src/content/personal-finance",
  "src/content/financial-solutions",
];
const MAPPING_PATH = path.join(PROJECT_ROOT, "lib/documents/slug-mapping.json");

// Basic ASCII normalization for slug creation
function toSlug(str) {
  return str
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (
      /\.mdx?$/.test(entry.name) &&
      !entry.name.startsWith("template") &&
      !entry.name.startsWith("-index")
    )
      out.push(full);
  }
  return out;
}

function loadMapping() {
  if (!fs.existsSync(MAPPING_PATH)) return {};
  return JSON.parse(fs.readFileSync(MAPPING_PATH, "utf8"));
}

function saveMapping(map) {
  fs.writeFileSync(MAPPING_PATH, JSON.stringify(map, null, 2) + "\n");
}

function ensureUniqueSlug(baseSlug, used) {
  let slug = baseSlug;
  let i = 2;
  while (used.has(slug)) {
    slug = `${baseSlug}-${i++}`;
  }
  used.add(slug);
  return slug;
}

function processFile(file, mapping, usedSlugs) {
  const raw = fs.readFileSync(file, "utf8");
  const parsed = matter(raw);
  const dirRel = file.replace(PROJECT_ROOT + path.sep, "");
  const front = parsed.data;

  if (!front.title) {
    console.warn("Skipping (no title):", dirRel);
    return null;
  }

  // Expect title already translated before running final rename.
  const spanishTitle = front.title;
  const baseSlug = toSlug(spanishTitle);
  const slug = ensureUniqueSlug(baseSlug, usedSlugs);

  // Derive new filename if different
  const currentSlug = path.basename(file).replace(/\.(md|mdx)$/, "");
  if (currentSlug === slug) {
    // Still ensure lang & draft
    let changed = false;
    if (front.lang !== "es-US") {
      front.lang = "es-US";
      changed = true;
    }
    if (front.draft === true) {
      front.draft = false;
      changed = true;
    }
    if (changed) {
      const out = matter.stringify(parsed.content, front);
      fs.writeFileSync(file, out);
    }
    return { file: dirRel, slug, renamed: false };
  }

  const newFile = path.join(path.dirname(file), slug + path.extname(file));
  front.lang = "es-US";
  if (front.draft === true) front.draft = false;
  const output = matter.stringify(parsed.content, front);
  fs.writeFileSync(newFile, output);
  fs.unlinkSync(file);

  const oldRoute = routeFromPath(currentSlug, file);
  const newRoute = routeFromPath(slug, newFile);
  mapping[oldRoute] = newRoute;

  return { file: dirRel, slug, renamed: true, oldRoute, newRoute };
}

function routeFromPath(slug, absFile) {
  const rel = absFile.replace(PROJECT_ROOT + path.sep, "");
  // Determine top-level collection to build public route prefix; later will be replaced with localized category folders.
  if (rel.includes("src/content/personal-finance/"))
    return `/personal-finance/${slug}`;
  if (rel.includes("src/content/financial-solutions/"))
    return `/financial-solutions/${slug}`;
  return `/${slug}`;
}

function main() {
  const mapping = loadMapping();
  const usedSlugs = new Set();
  const results = [];
  for (const base of CONTENT_DIRS) {
    const abs = path.join(PROJECT_ROOT, base);
    const files = walk(abs);
    files.forEach((f) => {
      const r = processFile(f, mapping, usedSlugs);
      if (r) results.push(r);
    });
  }
  saveMapping(mapping);
  console.log("Processed:", results.length);
  const renamed = results.filter((r) => r.renamed).length;
  console.log("Renamed:", renamed);
  console.log("Mapping entries total:", Object.keys(mapping).length);
}

if (import.meta.url === `file://${__filename}`) {
  try {
    main();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
