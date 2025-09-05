# LLM Starter Prompt: New Astro.js Site Setup

This Astro.js project is a template developed to create financial wellness blog platforms, on top of it. We will create a new site called **MejoresFinanzas**, following the instructions below and the guidelines in the `lib/documents/mejoresfinanzas.json` JSON Object and in the `lib/documents/mejoresfinanzas-config.yaml` file. This new site, will be based on two existing projects, located on the following local directories: `/Users/macbookpro/Github/budgetbee` and `/Users/macbookpro/Github/uk-topfinanzas-com`. Browse those projects to obtain extra context about what we want to achieve for MejoresFinanzas.

## Variables (fill these before sending to the agent)

```yaml
BRAND: "MejoresFinanzas"
SITE_DESCRIPTION: "MejoresFinanzas is a comprehensive financial wellness blog platform designed to provide valuable financial education, credit card recommendations, and personal finance tools. Building upon the proven success of BudgetBee and UK TopFinanzas, this platform combines the best features from both systems to create an optimized experience for diverse markets."
PRIMARY_DOMAIN: "https://mejoresfinanzas.com"
COLOR_PALETTE:
  primary: "#4A90E2"
  secondary: "#71C96C" # Using green from BudgetBee's successful design
  accent: "#F59E0B" # Warm amber for CTAs and highlights
  neutral_bg: "#ffffff"
  text: "#111111"
TYPOGRAPHY:
  heading_font: "Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
  body_font: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
TONE_VOICE: "Approachable, trustworthy, educational, unbiased, accessible"
TARGET_AUDIENCE: "English-speaking consumers aged 25-45, seeking unbiased financial guidance, credit card recommendations, and budgeting tools. Income level $25,000-$75,000 annually with beginner to intermediate financial literacy."
MARKET: "United States, United Kingdom, Canada, Australia"
LANGUAGE: "English (United States)"
FEATURES_TO_ENABLE:
  - blog
  - personal-finance
  - financial-solutions
  - quiz
  - credit-card-recommender
  - calculators
  - newsletter
  - search
  - sitemap
  - robots_llms
  - rss-feed
  - category-pages
INTEGRATIONS:
  google_tag_id: "GTM-MP4CPT97" # Using existing GTM from reference projects
  convertkit:
    enabled: true
    form_id: "" # To be configured with actual ConvertKit account
  mailchimp:
    enabled: false
    list_id: "" # Alternative to ConvertKit
  plausible_domain: "" # Optional analytics alternative
  hotjar:
    enabled: false
    site_id: "" # For heatmap and session recording
CONTENT_CATEGORIES:
  - "Personal Finance"
  - "Financial Solutions"
  - "Credit Cards"
  - "Budgeting"
  - "Debt Management"
  - "Savings & Investing"
  - "Financial Literacy"
  - "Credit Score"
FUNNEL_STRATEGY: "TOFU/MOFU/BOFU" # Comprehensive funnel coverage
SOCIAL_HANDLES:
  twitter: ""
  linkedin: ""
  facebook: ""
  instagram: ""
  youtube: ""
REPO_URL: "https://github.com/juanjaragavi/mejoresfinanzas"
PACKAGE_MANAGER: "pnpm" # Required for this template
ENVIRONMENT:
  DEV_URL: "http://localhost:4322"
  STAGING_URL: "https://staging.mejoresfinanzas.com"
  PRODUCTION_URL: "https://mejoresfinanzas.com"
```

## System and Project Instructions (Agent must follow)

- Always use pnpm for Node tasks (install, add, run, build).
- Assume dev server runs at <http://localhost:4322> unless told otherwise.
- Follow project docs:
  - Planning and rules: [.clinerules/1-RULES.md](../../.clinerules/1-RULES.md), [.clinerules/2-PLANNING.md](../../.clinerules/2-PLANNING.md), [.clinerules/3-TASKS.md](../../.clinerules/3-TASKS.md), [.clinerules/5-BRANDING.md](../../.clinerules/5-BRANDING.md)
  - Repo-wide rules: [.github/instructions/project-rules.instructions.md](../../.github/instructions/project-rules.instructions.md), [WARP.md](../../WARP.md)
  - Content: [lib/documents/blog-post-generation-prompt.md](./blog-post-generation-prompt.md)
- Use Astro docs via the configured MCP tool when needed: <https://docs.astro.build/en/getting-started/>
- Create ADRs for major architectural or integration decisions in [src/lib/documents/ADRs.md](../../src/lib/documents/ADRs.md).
- After any change, perform functional, UI/UX, integration, and performance sanity checks.

## Tasks

### Step 1: Read and align

- Read: .clinerules/2-PLANNING.md, .clinerules/1-RULES.md, .clinerules/5-BRANDING.md.
- Add an entry to [.clinerules/3-TASKS.md](../../.clinerules/3-TASKS.md) describing this site bootstrap with today’s date.

### Step 2: Branding and configuration

- Apply COLOR_PALETTE and TYPOGRAPHY to theme and global styles (theme/config files, CSS variables, and layout where applicable).
- Update site metadata (title, description, canonical domain) in config files and meta tags.
- Ensure PRIMARY_DOMAIN is used in sitemap and robots/llms files (see /public/robots.txt and /public/llms.txt guidance).

### Step 3: Integrations and features

- Enable requested FEATURES_TO_ENABLE.
- If INTEGRATIONS.google_tag_id provided, configure Google tag per Astro best practices.
- If ConvertKit is enabled, verify ENV variables exist and implement/enable subscriber flow per [lib/documents/convertkit-integration-prompt.md](./convertkit-integration-prompt.md).

### Step 4: Content structure

- Ensure collections and pages exist for selected CONTENT_CATEGORIES.
- For TOFU content, place new posts under src/content/personal-finance in US English, following [blog-post-generation-prompt.md](./blog-post-generation-prompt.md).
- Respect listing and pagination integration rules in blog listing requirements.

### Step 5: QA and verification

- With the dev server running, verify:
  - Homepage shows latest/featured posts
  - Category pages list content correctly
  - Filters and pagination work
  - Internal links use PRIMARY_DOMAIN
  - No future-dated or invalid frontmatter entries

### Step 6: Commit and workflow

- Update [src/lib/documents/DOCUMENTATION.md](../../src/lib/documents/DOCUMENTATION.md), [README.md](../../README.md), and [CHANGELOG.md](../../CHANGELOG.md).
- When asked “Push and commit our latest changes.”, follow workflow in [.github/instructions/project-rules.instructions.md](../../.github/instructions/project-rules.instructions.md).

## Deliverables

- Branded site configuration (colors, typography, metadata)
- Enabled features and integrations as requested
- At least one seed blog post per category (US English, valid frontmatter) if content work is in scope
- Updated documentation and changelog
- Verification notes covering the checks above
