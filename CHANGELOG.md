# Changelog

All notable changes to this template will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- Branded site for MejoresFinanzas: updated site title, domain, and metadata; aligned color palette and typography (Montserrat headings, Inter body); configured fonts and primary domain in robots/sitemap/llms. (Sep 5, 2025)
- Brand tagline defined: "Unbiased guidance. Your money, simplified." and applied to homepage, About, and Footer. (Sep 5, 2025)
- Homepage now explicitly mentions "MejoresFinanzas" in the hero H1 and banner copy for improved SEO and brand recognition. (Sep 5, 2025)
- Switch primary color to neutral blue (#4A90E2) across theme and UI; remove hard-coded yellow usages.
- Homepage banner now uses BRAND.tagline with fallback to “Slogan or Tagline”.
- Updated quiz UI (header/progress/welcome note) and results disclaimer to use theme-based colors.
- Adjusted ad-aware styles to derive borders/shadows from CSS var(--color-primary).
- SVG `arrow-right.svg` now inherits currentColor.
- Development guidelines in `.clinerules/` directory
- CHANGELOG.md file for tracking project changes
- Credit Card Quiz System with multi-step form (May 26, 2025)
- Categories page with organized content structure (May 26, 2025)
- Blog category system with TOFU/MOFU strategy (May 24, 2025)
- 5 high-quality financial blog posts adapted for US market (May 24, 2025)
- Mobile-specific CSS optimizations for blog content (May 26, 2025)
- Blog-specific mobile styles (`blog-mobile.css`) (May 26, 2025)
- Started migration of marketing-related components and custom scripts (e.g., Google Tag Manager, UTM persister) from TopFinanzas UK. (May 26, 2025)
- Added AdZep ad units us_site_3 (post-top) and us_site_4 (in-article fallback) to all Personal Finance (TOFU/MOFU) articles by updating PostSingle layout with category-normalized detection. (Sep 1, 2025)
- Personal Finance cleanup: reduced to 6 cornerstone posts (published, interlinked), archived the rest via draft flags, fixed frontmatter fences and duplicate sections, and normalized internal links to avoid 404s. (Sep 5, 2025)
- Spanish localization infrastructure: automated slug generation, frontmatter lang insertion (es-US), draft -> false publishing, internal link rewrites, new Spanish route layers (`/finanzas-personales`, `/soluciones-financieras`), Netlify 301 redirects from legacy English category paths, sitemap config updated for localized hubs, and added translation glossary & slug mapping artifacts. (Sep 8, 2025)
- Complete localization of Personal Finance collection: all remaining English slugs translated to semantic Spanish equivalents; bodies, titles, descriptions, and tags fully localized; obsolete English MDX files removed; `slug-mapping.json` expanded and `_redirects` regenerated; internal links normalized; validation build passed (no 404s in localized listings). (Sep 8, 2025)
  - Documentation updated with Localization Phase Completion section outlining scope, quality notes, and next steps.
- Complete localization of Financial Solutions collection: all 30+ English credit card articles translated to Spanish with semantic slugs; comprehensive content localization including titles, descriptions, tags, and body content; English duplicates removed; slug mapping expanded with all financial solution translations; redirects regenerated; internal link references updated. Both Personal Finance and Financial Solutions collections now fully Spanish (es-US). (Sep 8, 2025)### Changed

- Transformed original theme structure into a financial blog template
- Updated site branding to template defaults (logo, colors, typography) (May 24, 2025)
- Replaced homepage placeholder content with financial focus (May 24, 2025)
- Updated footer with legal texts and proper navigation (May 24, 2025)
- Enhanced PostSingle layout for better mobile responsiveness (May 26, 2025)
- Improved mobile CSS with comprehensive overflow fixes (May 26, 2025)

### Fixed

- Mobile viewport overflow issues in blog articles (May 26, 2025)
- Responsive display of tables, code blocks, and images (May 26, 2025)
- Touch-friendly scrolling for horizontal content (May 26, 2025)
- Corrected three external financial solution links (Chase Freedom Unlimited, Current Build Visa Signature, Wells Fargo Autograph) to updated official URLs (Aug 15, 2025)
- Vertically centered text for all CTA buttons sitewide by applying flex items-center justify-center to base .btn Tailwind class (Aug 26, 2025)
- Ensured AdZep ad activation on SPA/transitions by adding an Astro client lifecycle bridge that listens to `astro:page-load`/`astro:after-swap` (plus safety nets) and calls `window.AdZepActivateAds()` only when ad units are present. Integrated site-wide via Base.astro and verified with the AdZep Debug Panel. (Sep 4, 2025)
- Added LLM Starter Prompt at `lib/documents/LLM_STARTER_PROMPT.md` and refined agent instructions across docs; linked from README, WARP.md, and project rules. (Sep 4, 2025)

### To Do

- Design and implement template-specific features
- Update images and visual assets
- Configure contact form endpoint
- Set up proper domain and base URL

---

## Version History

### [0.1.0] - 2025-05-23

- Initial setup of the platform
- Project initialization with placeholder content
