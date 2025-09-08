#!/usr/bin/env node
/**
 * Generate Netlify _redirects lines from slug-mapping.json plus category folder renames.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");
const MAPPING_PATH = path.join(PROJECT_ROOT, "lib/documents/slug-mapping.json");
const REDIRECTS_FILE = path.join(PROJECT_ROOT, "public", "_redirects");

function main() {
  if (!fs.existsSync(MAPPING_PATH)) {
    console.error("Mapping file not found");
    process.exit(1);
  }
  const mapping = JSON.parse(fs.readFileSync(MAPPING_PATH, "utf8"));
  const lines = [];
  // Category folder renames (if implemented)
  lines.push("/personal-finance/* /finanzas-personales/:splat 301");
  lines.push("/financial-solutions/* /soluciones-financieras/:splat 301");
  for (const [oldRoute, newRoute] of Object.entries(mapping)) {
    // Replace category segments if Spanish folders used
    const spanishNew = newRoute
      .replace("/personal-finance/", "/finanzas-personales/")
      .replace("/financial-solutions/", "/soluciones-financieras/");
    lines.push(`${oldRoute} ${spanishNew} 301`);
  }
  const content = lines.join("\n") + "\n";
  fs.writeFileSync(REDIRECTS_FILE, content);
  console.log("Redirects written:", REDIRECTS_FILE, "lines:", lines.length);
}

if (import.meta.url === `file://${__filename}`) {
  main();
}
