# MejoresFinanzas Blog Post Generation Prompt (Adapted)

> Use this prompt to generate new articles precisely aligned with this project’s structure, metadata, and listings. For branding/site setup, see `lib/documents/LLM_STARTER_PROMPT.md`.

## Context

- Project framework: Astro 5 + content collections (MD/MDX) under `src/content/`
- Collections used for articles:
  - Personal Finance: `src/content/finanzas-personales/`
  - Financial Solutions: `src/content/soluciones-financieras/`
  - Blog hub (optional): `src/content/blog/`
- Domain: configured in `src/config/config.json` → `site.base_url` (currently `https://mejoresfinanzas.com`).
- Sitemap to consult before writing: `dist/sitemap-index.xml` (build-generated). Use it to avoid duplicate topics/URLs and to select existing internal links.
- Homepage Latest/Featured sections pull exclusively from the Personal Finance collection.

## Task

Read and follow this whole file. Then generate a SEO-optimized blog article with the inputs below, using the topic schema in `lib/documents/topfinanzas-us-topic-outline.csv`.

### Inputs

- Pillar: {pillar}
- Main Keyword: {keyword}
- Tentative Title: {title}
- Content Focus: {content_focus}
- SEO Intent: {intent} (e.g., Informational, Comparational)
- Funnel Stage: {stage} (TOFU | MOFU)
- Market: United States
- Language: English (United States)

## Data sources to consult

1. Topic outline: `lib/documents/topfinanzas-us-topic-outline.csv`
   - Columns: Pillar, Is it a pillar?, Main Keyword, Example/Tentative Title, Content Focus, SEO Intent Type, TOFU/MOFU Level
2. Current sitemap: `dist/sitemap-index.xml`
   - Use the configured domain (e.g., `https://mejoresfinanzas.com`) for internal links

## Routing the article to the correct collection

- If Is it a pillar? = Yes → This is a Pillar article for the Pillar category.
  - For Money Management and similar general education topics: create in `src/content/finanzas-personales/`.
- If Is it a pillar? = No → This is a Cluster article.
  - TOFU topics (general education) → `src/content/finanzas-personales/`
  - MOFU topics related to specific products/solutions (e.g., credit cards) → `src/content/soluciones-financieras/`

Note: The homepage Latest/Featured sections read from Personal Finance only. If you want homepage visibility, place the article in `personal-finance`.

## Frontmatter schema (must match `src/content.config.ts`)

Required/Allowed fields for both `personal-finance` and `financial-solutions` collections:

- title: string (required)
- meta_title: string (optional)
- description: string (optional, recommended for SEO)
- date: ISO 8601 (e.g., `2025-09-05T12:00:00Z`) — required for proper sorting
- image: string (optional; absolute URL or `/images/...` path)
- authors: array of strings (defaults to `["admin"]`)
- categories: array of strings (defaults to `["others"]`)
- tags: array of strings (defaults to `["others"]`)
- draft: boolean (set to `false` to publish)

### Frontmatter template

```mdx
---
title: "{final_seo_title}"
meta_title: "{optional_meta_title}"
description: "{1–2 sentence SEO description using the main keyword naturally.}"
image: "{optional_image_url_or_/images/...}"
date: 2025-09-05T12:00:00Z
categories: ["personal-finance"] # or ["financial-solutions"]
tags: ["{keyword}", "{supporting_tag_1}", "{supporting_tag_2}"]
draft: false
---
```

## Writing rules

- Language: English (United States), informal but educational, accessible and practical.
- Length targets:
  - Pillar (Yes): 1,500–2,000 words
  - Cluster TOFU: 800–1,000 words
  - Cluster MOFU: 1,000–1,200 words
- Title and headings: Use the Main Keyword naturally (no stuffing). H1 should include or strongly reflect the keyword.
- Structure for Cluster (Is Pillar? = No):
  - <h1> SEO Title (with keyword)
  - Intro paragraph that connects with the reader
  - 2–3 main sections (<h2>/<h3>) with explanatory paragraphs and lists where helpful
  - Final section with a clear next step (do not title it “Conclusion” or “Summary”)
- Structure for Pillar (Is Pillar? = Yes):
  - Intro + comprehensive coverage: definition, importance, common mistakes, initial steps, and examples
  - Link to cluster articles in this same pillar using their tentative titles as anchors when possible
- Internal links (min 3):
  - Use live URLs under the configured domain (e.g., `https://mejoresfinanzas.com/...`)
  - Choose links contextually relevant (e.g., category pages, related guides)
- Accuracy & ethics:
  - Do not invent brands or specific offers/benefits that aren’t supported by the topic
  - Avoid absolute promises; use careful, general language
  - No personalized financial or legal advice; keep it general and educational

## File placement & naming

- Directory:
  - TOFU education → `src/content/finanzas-personales/`
  - Product/solution MOFU → `src/content/soluciones-financieras/`
- Filename: kebab-case from final title (e.g., `how-to-create-a-budget-that-works.mdx`)
- Format: `.mdx` recommended

## After saving — listing integration checks

The site auto-integrates properly formatted posts.

Verify the new article appears in:

1. Homepage (`src/pages/index.astro`)
   - Latest News (most recent 3 personal-finance articles)
   - Featured Article (top personal-finance article by date)
   - Featured Posts (personal-finance articles 2–4)
2. Blog hub (`src/pages/blog/index.astro`) — aggregated list
3. Category pages
   - Personal Finance → `/finanzas-personales/`
   - Financial Solutions → `/soluciones-financieras/`
4. Pagination pages
   - `/blog/page/[slug].astro`
   - `/finanzas-personales/page/[slug].astro`
   - `/soluciones-financieras/page/[slug].astro`

## Troubleshooting missing articles

- Draft is still true → set `draft: false`
- Date missing/invalid/future → use ISO with Z (e.g., `2025-09-05T12:00:00Z`) and ensure it’s not in the future
- Wrong directory → move to correct collection folder
- Required fields missing → ensure frontmatter aligns to schema (see above)

## Example invocation

```markdown
## Task

First than all, read and process the `lib/documents/blog-post-generation-prompt.mf.md` file.

Then, generate a SEO-optimized Blog article based on the requirements below.

### Pillar

Money Management

### Main Keyword

personal finance

### Tentative Title

{title}

### Content Focus

Money Management

### SEO Intent

Informational

### Funnel Stage

TOFU

### Market

United States

### Language

English (United States)

## Important

- The full context and details for this topic (Tentative Title, Content Focus, etc.) are located in the row for this pillar within `lib/documents/topfinanzas-us-topic-outline.csv`.
- Before generating content, review the local sitemap at `dist/sitemap-index.xml` to avoid duplication and to choose internal links that already exist on the configured domain (default `https://mejoresfinanzas.com`).
- If the Funnel Stage is TOFU, create the new article in `src/content/finanzas-personales/` (for homepage visibility). If it’s MOFU and solution-specific, use `src/content/soluciones-financieras/`.
- Match the frontmatter schema and date format exactly; set `draft: false` to publish.
```
