# Current Issues & TODOs

(_Last Updated: May 26, 2025_)

## Immediate Tasks

1. [x] Update site configuration with template branding _(Completed: May 24, 2025)_
   - **Important:** Consult `.clinerules/5-BRANDING.md` for brand guidelines, color palette (#E7B739, #7ED321, #4A90E2), typography (Montserrat font), and tagline
   - ✓ Updated config.json with template title and branding
   - ✓ Updated package.json with project name and description
   - ✓ Updated Base.astro with theme name
   - ✓ Added logo.png and square-logo.png
   - ✓ Updated theme.json with brand colors (primary: #E7B739) and Montserrat font
   - ✓ Footer content updated with legal texts and contact information
   - ✓ Updated footer navigation: 'Our Mission' to 'Our Promise' linked to #our-promise anchor in About Us page. _(Completed: May 24, 2025)_
   - ✓ Contact form action endpoint needs configuration _(Completed: May 24, 2025)_
2. [x] Replace placeholder content on homepage _(Completed: May 24, 2025)_
   - **Important:** Follow brand voice and tone guidelines in `.clinerules/5-BRANDING.md` - approachable, trustworthy, modern voice with clear, jargon-free content
   - ✓ Updated banner section with template tagline and mission statement
   - ✓ Replaced feature section with template key differentiators (unbiased, free, no sign-ups)
   - ✓ Updated services section with credit cards, budgeting, and financial wellness content
   - ✓ Revised workflow section to explain template approach
   - ✓ Updated call-to-action with appropriate messaging
3. [x] Establish blog content structure with TOFU/MOFU strategy _(Completed: May 24, 2025)_
   - **Important:** Follow TOFU (Top of Funnel) and MOFU (Middle of Funnel) content strategy from `src/lib/documents/CONTENT-GUIDELINES.md`
   - ✓ Created comprehensive category structure based on legacy site analysis
   - ✓ Implemented TOFU categories (personal-finance, budgeting-basics, financial-literacy, money-management, financial-planning)
   - ✓ Implemented MOFU categories (financial-solutions, credit-cards, personal-loans, banking-products, investment-products)
   - ✓ Added supporting categories (reviews, comparisons, guides, tools)
   - ✓ Created dynamic category pages with SEO optimization
   - ✓ Implemented category pagination system
   - ✓ Documented category structure in `src/lib/documents/BLOG-CATEGORY-STRUCTURE.md`
   - ✓ Ready for content migration from legacy sources in next iteration
4. [x] Create real blog posts about budgeting/finance _(Completed: May 24, 2025)_
   - **Important:** Reference `.clinerules/5-BRANDING.md` for content tone (engaging, relatable, encouraging) and target audience (Gen-Z/Millennials)
   - ✓ Replaced 5 placeholder blog posts with high-quality financial content
   - ✓ Adapted content from legacy site for US market
   - ✓ Applied template brand voice and tone guidelines
   - ✓ Created balanced TOFU/MOFU content across categories:
     - Personal Finance: "Your Practical Guide to Getting Out of Debt" (TOFU)
     - Financial Literacy: "Understanding Credit Card Interest Rates" (TOFU)
     - Credit Cards: "Best Cashback Credit Cards" (MOFU)
     - Credit Cards: "Top Rewards Credit Cards" (MOFU)
     - Financial Solutions: "Personal Loans: Strategic Debt Management" (MOFU)
   - ✓ Localized currency, regulatory references, and terminology for US market
   - ✓ Maintained original image URLs as specified for future replacement
   - ✓ Properly categorized and tagged content according to blog structure
5. [x] Implement Credit Card Quiz System _(Completed: May 26, 2025)_
   - ✓ Created multi-step quiz interface adapted from legacy implementation
   - ✓ Built React components with Framer Motion animations
   - ✓ Implemented 3-step questionnaire: preferences, income, and user details
   - ✓ Added US localization (currency, phone format validation)
   - ✓ Integrated cookie-based user tracking for returning visitors
   - ✓ Quiz redirects to credit-card-recommender-p1 page instead of blog articles
   - ✓ Updated navigation menu to feature "Credit Card Quiz"
   - ✓ Added quiz CTA to homepage banner and services section
6. [x] Create Categories Page _(Completed: May 26, 2025)_
   - ✓ Built dedicated categories page at /categories
   - ✓ Replaced dropdown menu with direct link to categories page
   - ✓ Designed attractive category cards with icons and descriptions
   - ✓ Applied template brand colors to category cards
   - ✓ Added call-to-action section promoting the quiz
7. [x] Fix mobile responsiveness issues _(Completed: May 26, 2025)_
   - ✓ Fixed blog article overflow on mobile devices
   - ✓ Enhanced mobile-optimizations.css with comprehensive responsive fixes
   - ✓ Created blog-mobile.css for blog-specific mobile styling
   - ✓ Updated PostSingle layout with better responsive classes
   - ✓ Implemented proper word-wrapping and overflow handling
   - ✓ Fixed responsive display of tables, code blocks, and images
   - ✓ Added touch-friendly scrolling for horizontal content
8. [In Progress] Migrate marketing-related components and custom scripts from legacy project to this AstroJS template. _(Started: May 26, 2025)_
   - **Important:** Analyze source, identify marketing integrations (Google Tag, third-party tools), analyze complex components (e.g., UTM Persister), and adapt/implement them into this Astro project using official documentation (e.g., Google Analytics, Ad Manager via @upstash/context7-mcp).
9. [ ] Design and implement template-specific features
   - **Important:** Align with brand personality and competitive differentiation outlined in `.clinerules/5-BRANDING.md` - focus on unbiased, free, and accessible features
10. [ ] Update images and visual assets
    - **Important:** Use color palette from `.clinerules/5-BRANDING.md` - Warm Yellow (#E7B739), Fresh Green (#7ED321), Soft Blue (#4A90E2), Light Gray (#F5F5F5)

11. [ ] Configure contact form endpoint
12. [ ] Set up proper domain and base URL
13. [x] Fix ad unit visibility and CTA styling regressions _(Completed: Sep 1, 2025)_

- Created shortcode `AdZoneTop3` and auto-injected `id="us_site_3"` directly below the H1 for posts in Personal Finance and Financial Solutions.
- Normalized category matching in `PostSingle.astro` to avoid casing/spacing mismatches.
- Standardized MDX link/CTA styles: inline links stay brand yellow/underlined; `.btn` CTAs are not underlined; ensured ad iframes size naturally.

1. [x] Bootstrap MejoresFinanzas branding and configuration _(Completed: Sep 5, 2025)_

- Updated brand metadata (`src/config/brand.ts`), site config (`src/config/config.json`), and package metadata
- Applied color palette and typography in `src/config/theme.json` and wired Inter as body font
- Loaded fonts in `Base.astro`; set msapplication tile color to primary
- Switched primary domain to mejoresfinanzas.com across `astro.config.mjs`, `public/robots.txt`, and `public/llms.txt`
- Left GTM container ID as provided in config

1. [x] Mention the MejoresFinanzas brand on the homepage _(Completed: Sep 5, 2025)_

- Updated `src/content/homepage/-index.md` to include "MejoresFinanzas" in the hero H1 and banner copy for SEO/brand recognition.

## Technical Improvements Needed

1. [ ] Implement actual budgeting features (if this is a budgeting app)
2. [ ] Add user authentication system (if needed)
3. [ ] Create budget tracking components
4. [ ] Integrate with financial APIs (if applicable)
5. [ ] Add data visualization for budgets
6. [ ] Implement user dashboard

## Completed Tasks

- [x] Enhance LLM documentation and add starter prompt _(Completed: Sep 4, 2025)_
  - Added `lib/documents/LLM_STARTER_PROMPT.md`
  - Linked prompt across rules (`.clinerules/1-RULES.md`), WARP.md, README, project rules, and llms.txt
  - Created documentation placeholders in `src/lib/documents/DOCUMENTATION.md` and `src/lib/documents/ADRs.md`
