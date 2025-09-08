# MejoresFinanzas — Financial Wellness Blog Platform

Note: Image links below intentionally reference existing media URLs and should be replaced manually when you brand your site.

![Template Placeholder Logo](https://media.topfinanzas.com/budgetbee/images/logo.png)
Note: The placeholder logo above references a legacy CDN path to preserve working asset links during templating. Swap this image in-place under `public/images/logo.png` when you brand your site.

This repository is an Astro-based financial content platform. It started from a brand-agnostic template and is now branded as MejoresFinanzas. Update textual brand data via `src/config/brand.ts` and `src/config/config.json`. Media assets can be swapped later without breaking paths.

Branding defaults:

- Primary color is a neutral blue (`#4A90E2`) defined in `src/config/theme.json` and exposed via `var(--color-primary)`.
- The homepage banner title reads from `BRAND.tagline` with a fallback to “Slogan or Tagline”. Clear `banner.title` in `src/content/homepage/-index.md` to use the fallback.

## Key Features

- 10+ pre-designed pages and listing/pagination
- Credit Card quiz scaffolding and shortcodes
- Mobile-optimized layouts and typography
- TOFU/MOFU-ready content structure
- Fast by default (Astro) with prefetch links
- Category system and pagination
- SEO: sitemap, RSS, and robots.txt
- Financial content-first structure and utilities
- US localization ready (editable)
- Search integration (Fuse.js)
- Design system via theme.json and Tailwind plugin

## Getting Started

Quick start:

1. Copy or clone this repo to your project folder.
2. Install dependencies with pnpm.
3. Start the dev server.

Note: This project uses pnpm. If you use npm/yarn, adapt commands accordingly.

Or download as a ZIP file and extract to your desired location.

### Development

- Start dev server: pnpm dev (<http://localhost:4322>)
- Build for prod: pnpm build
- Preview build: pnpm preview

## Deployment

### Deploy to Netlify

<a href="#" target="_blank"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify (configure to your fork)"></a>

👉 [Netlify Deployment Guide](https://docs.netlify.com/site-deploys/create-deploys/)

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

👉 [Vercel Deployment Guide](https://vercel.com/docs)

### Deploy to GitHub Pages

👉 [GitHub Pages Deployment Guide](https://docs.astro.build/en/guides/deploy/github/)

### Deploy to GitLab Pages

👉 [GitLab Pages Deployment Guide](https://docs.astro.build/en/guides/deploy/gitlab/)

## Reporting Issues

Open issues in your fork or template copy.

## License

MIT — see `LICENSE`.

Original image URLs are kept to avoid breaking paths; replace them manually as needed.

## Template Customization (for LLM Agents and humans)

- Edit `src/config/brand.ts` to set:
  - name: your brand display name
  - domain: primary domain (mejoresfinanzas.com)
  - tagline: short text-only tagline
- Do not change existing media URLs during initial setup; swap files at the same paths later.
- Update `src/config/config.json`, `src/config/theme.json`, and styles as needed. Add your logos under `public/images/` using existing filenames to avoid code changes.

Sample content lives under `src/content`. For Personal Finance we now ship 6 cornerstone, interlinked posts to keep listings clean and focused. Add new content as needed and ensure frontmatter is valid so it appears in listings.

## Using This Template with LLMs

- Start with the LLM Starter Prompt and fill in variables:
  - `lib/documents/LLM_STARTER_PROMPT.md`
- Agents must follow pnpm usage, dev server assumptions, and Astro best practices documented in this repo.
