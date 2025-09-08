#!/usr/bin/env node
/**
 * Update internal links to Spanish localized routes.
 * - Uses slug-mapping.json (oldRoute -> newRoute with English category path)
 * - Rewrites to Spanish category path segments (/finanzas-personales/ & /soluciones-financieras/)
 * - Also rewrites root category links and canonicalUrl variables.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");
const MAPPING_PATH = path.join(PROJECT_ROOT, "lib/documents/slug-mapping.json");

const exts = new Set([".md", ".mdx", ".astro", ".ts", ".tsx"]);

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (
      entry.name.startsWith(".") ||
      entry.name === "node_modules" ||
      entry.name === "dist"
    )
      continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (exts.has(path.extname(entry.name))) out.push(full);
  }
  return out;
}

function buildReplacements(mapping) {
  const pairs = [];
  // Map each oldRoute to Spanish version of newRoute
  for (const [oldRoute, newRoute] of Object.entries(mapping)) {
    const spanishNew = newRoute
      .replace("/personal-finance/", "/finanzas-personales/")
      .replace("/financial-solutions/", "/soluciones-financieras/");
    // Also map old English category path to Spanish new slug
    pairs.push([oldRoute + "/", spanishNew + "/"]);
    pairs.push([oldRoute, spanishNew]);
  }
  // Category roots
  pairs.push(["/personal-finance/", "/finanzas-personales/"]);
  pairs.push(["/financial-solutions/", "/soluciones-financieras/"]);
  // Canonical patterns (avoid double slash issues)
  pairs.push(["`/personal-finance/", "`/finanzas-personales/"]);
  pairs.push(['"/personal-finance/', '"/finanzas-personales/']);
  pairs.push(["`/financial-solutions/", "`/soluciones-financieras/"]);
  pairs.push(['"/financial-solutions/', '"/soluciones-financieras/']);
  // Sort by length desc to avoid partial conflicts
  return pairs.sort((a, b) => b[0].length - a[0].length);
}

function replaceAll(content, pairs) {
  let changed = false;
  for (const [from, to] of pairs) {
    if (content.includes(from)) {
      content = content.split(from).join(to);
      changed = true;
    }
  }
  return { content, changed };
}

function main() {
  if (!fs.existsSync(MAPPING_PATH)) {
    console.error("Mapping file missing");
    process.exit(1);
  }
  const mapping = JSON.parse(fs.readFileSync(MAPPING_PATH, "utf8"));
  const pairs = buildReplacements(mapping);
  const files = walk(PROJECT_ROOT).filter(
    (f) => !f.includes("/public/_redirects"),
  );
  let modified = 0;
  for (const file of files) {
    const orig = fs.readFileSync(file, "utf8");
    const { content, changed } = replaceAll(orig, pairs);
    if (changed) {
      fs.writeFileSync(file, content);
      modified++;
    }
  }
  console.log("Files scanned:", files.length, "Modified:", modified);
}

if (import.meta.url === `file://${__filename}`) {
  main();
}
