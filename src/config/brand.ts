/**
 * Customization point: BRAND metadata
 *
 * This template is brand-agnostic. Replace the placeholder values below when you fork/clone to create a new site.
 *
 * IMPORTANT: Per repository policy, do NOT modify or delete existing media URLs elsewhere in the project.
 * Images and icons will be replaced manually later; this file centralizes text-only brand settings.
 */

export const BRAND = {
  // Human-readable brand name for your site
  name: "MejoresFinanzas",

  // Primary public domain (used in SEO, sitemap, robots, etc.)
  // Example: "mejoresfinanzas.com" (no protocol, no trailing slash)
  domain: "mejoresfinanzas.com",

  // Short tagline or mission statement (text only)
  // Use this in headers, meta descriptions, and theme components as needed
  tagline: "Unbiased guidance. Your money, simplified.",
} as const;

export type BrandConfig = typeof BRAND;
