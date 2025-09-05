#!/usr/bin/env node
// Marks all posts in specified content collections as draft: true,
// excluding collection index files (-index.md/mdx) and template.md

import fs from "fs";
import path from "path";

const root = path.resolve(process.cwd());
const targets = [
  "src/content/personal-finance",
  "src/content/financial-solutions",
];

const isSkippable = (filename) => {
  const base = path.basename(filename);
  if (base === "template.md") return true;
  if (base === "-index.md" || base === "-index.mdx") return true;
  if (base.startsWith("-index.")) return true;
  return false;
};

function ensureDraftTrue(frontmatter) {
  const lines = frontmatter.split("\n");
  const draftIdx = lines.findIndex((l) => /^\s*draft\s*:/i.test(l));
  if (draftIdx >= 0) {
    lines[draftIdx] = "draft: true";
    return lines.join("\n");
  }
  // Insert near the top, after title if present
  let insertAt = 1;
  const titleIdx = lines.findIndex((l) => /^\s*title\s*:/i.test(l));
  if (titleIdx >= 0) insertAt = titleIdx + 1;
  lines.splice(insertAt, 0, "draft: true");
  return lines.join("\n");
}

function processFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (![".md", ".mdx"].includes(ext)) return false;
  if (isSkippable(filePath)) return false;

  const raw = fs.readFileSync(filePath, "utf8");
  if (!raw.startsWith("---")) {
    // No frontmatter; add minimal frontmatter
    const updated = `---\ndraft: true\n---\n\n${raw}`;
    fs.writeFileSync(filePath, updated, "utf8");
    return true;
  }
  const endIdx = raw.indexOf("\n---", 3);
  if (endIdx === -1) return false; // malformed, skip
  const start = 3; // after '---'
  const fm = raw.slice(start, endIdx);
  const body = raw.slice(endIdx + 4); // skip closing '---' and newline
  const newFm = ensureDraftTrue(fm);
  if (newFm === fm) return false;
  const updated = `---${newFm}\n---${body}`;
  fs.writeFileSync(filePath, updated, "utf8");
  return true;
}

let changed = 0;
for (const relDir of targets) {
  const dir = path.join(root, relDir);
  if (!fs.existsSync(dir)) continue;
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const fp = path.join(dir, entry);
    const stat = fs.statSync(fp);
    if (stat.isDirectory()) continue;
    const did = processFile(fp);
    if (did) changed += 1;
  }
}

console.log(`Draft flag set or ensured on ${changed} files.`);
