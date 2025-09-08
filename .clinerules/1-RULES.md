# Project Guidelines

## Documentation Requirements

- Update relevant documentation in `src/lib/documents/DOCUMENTATION.md` when modifying features
- Keep `README.md` in sync with new capabilities
- Maintain changelog entries in `/CHANGELOG.md`

## Project Awareness & Context

- Always read `2-PLANNING.md` at the start of a new conversation to understand the project's architecture, goals, style, and constraints.
- Check and update `3-TASKS.md` before starting a new task. If the task isn’t listed, add it with a brief description and today's date.
- Refer to `4-PUSH-AND-COMMIT.md` for commit and push guidelines.
- Review `5-BRANDING.md` for branding guidelines, including color palette, typography, and voice/tone.

## Architecture Decision Records

Create ADRs in `src/lib/documents/ADRs.md` for:

- Major dependency changes
- Architectural pattern changes
- New integration patterns

## Package Manager

This project uses **pnpm** as the Node.js package manager. Always use `pnpm` commands instead of `npm` or `yarn`.

### Common Commands

- **Install dependencies**: `pnpm install`
- **Add new dependency**: `pnpm add <package-name>`
- **Add development dependency**: `pnpm add -D <package-name>`
- **Remove dependency**: `pnpm remove <package-name>`
- **Run scripts**: `pnpm run <script-name>` or `pnpm <script-name>`
- **Update dependencies**: `pnpm update`

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm check` - Run Astro checks
- `pnpm format` - Format code with Prettier
- `pnpm workflow` - Run git workflow script
- `pnpm sync` - Sync with main branch
- `pnpm deploy` - Deploy to production

### Why pnpm?

- **Disk efficiency**: Shared dependencies across projects
- **Speed**: Faster installations than npm/yarn
- **Strict**: Better dependency resolution
- **Workspace support**: Excellent monorepo capabilities

## Code Style & Patterns

- Generate API clients using OpenAPI Generator
- Prefer composition over inheritance
- Use repository pattern for data access

## Testing Standards

- Unit tests required for business logic
- Integration tests for API endpoints
- E2E tests for critical user flows

## Tool Usage

A suite of MCP Server tools is available for your use. These tools should be employed as needed to perform various tasks.

### MCP Server Discovery

To identify available MCP Servers, utilize the `@modelcontextprotocol/server-filesystem` to read the configuration file located at:
`/Users/macbookpro/Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`

This will provide you with a complete list of configured MCP servers and their capabilities.

### Astro Project Documentation

As this is an Astro project, before executing any task related to the structure of the project, you should use the `@upstash/context7-mcp@latest` MCP server tool to look for Astro documentation in <https://docs.astro.build/en/getting-started/>. This will ensure you have the most up-to-date information about Astro's patterns, conventions, and best practices.

### Effective Tool Selection

Analyze the capabilities of these tools to determine the most appropriate approach for your tasks.

## Primary LLM Input

When starting a new site with this template, use the Starter Prompt at:

- `lib/documents/LLM_STARTER_PROMPT.md`

Fill its variables and pass the prompt to your LLM agent as the initial instruction.

## LLM Agent Checklist (Must-Do)

1. Read `.clinerules/2-PLANNING.md`, `.clinerules/1-RULES.md`, and `.clinerules/5-BRANDING.md`.
2. Log the task in `.clinerules/3-TASKS.md` with today’s date.
3. Use pnpm exclusively for all Node tasks; assume dev server at <http://localhost:4322>.
4. After each iteration, run functional, UI/UX, integration, and performance checks.
5. Update `src/lib/documents/DOCUMENTATION.md`, `README.md`, and `CHANGELOG.md` for any feature or process change.
6. Create ADRs in `src/lib/documents/ADRs.md` for major decisions.

## Development Workflow

### Development Server Assumption

**Always assume the development server is running** unless explicitly told otherwise. The development server is typically started with `pnpm dev` and runs on `http://localhost:4322` for Astro projects.

### Post-Iteration Testing

After completing any successful development iteration (code changes, feature additions, bug fixes), **immediately initiate testing** to verify the changes work as expected. This includes:

- **Functional Testing**: Verify the implemented features work correctly
- **UI/UX Testing**: Check visual elements, responsiveness, and user interactions
- **Integration Testing**: Ensure new changes don't break existing functionality
- **Performance Testing**: Confirm changes don't negatively impact site performance

Testing should be done proactively without waiting for user prompts, as part of the standard development cycle quality assurance.

## Agent Authoring Directive

- Whenever the agent is prompted to generate a new blog post or article for this template site:
  - First, review `lib/documents/blog-post-generation-prompt.md` to follow the latest content generation rules and US localisation requirements.
  - Also consult `lib/documents/topfinanzas-us-topic-outline.csv` to determine article type (pillar vs cluster), tentative title, content focus, and related cluster/pillar context.
  - Use the US sitemap at `dist/sitemap-index.xml` to avoid duplicating already published content and to build correct internal links.
  - Produce content in US English conventions (en-US) and ensure internal links point to your configured domain.
  - If the funnel stage is TOFU, create the new blog post under `src/pages/personal-finance`, matching the structure and layout used by existing articles in that directory, but write entirely new, original content.

## Blog Post Listing Integration Requirements

After creating any new blog post or article, **ensure the content appears in all relevant listing pages** across the website for optimal discoverability and user experience.

### Key Blog Listing Locations

**New articles must appear in:**

1. **Homepage** (`src/pages/index.astro`):
   - Latest News section (latest 3 articles)
   - Featured Article section (top article)
   - Featured Posts section (articles 2-4)

2. **Main Blog Hub** (`src/pages/blog/index.astro`):
   - All Articles section with category filtering
   - Aggregated content from personal-finance and financial-solutions

3. **Category Pages**:
   - Personal Finance: `/personal-finance/` (`src/pages/personal-finance/index.astro`)
   - Financial Solutions: `/financial-solutions/` (`src/pages/financial-solutions/index.astro`)

4. **Pagination Pages**:
   - Blog: `/blog/page/[slug].astro`
   - Personal Finance: `/personal-finance/page/[slug].astro`
   - Financial Solutions: `/financial-solutions/page/[slug].astro`

### Post-Creation Verification

**Always verify after creating new content:**

1. Check homepage Latest News section displays new article
2. Confirm article appears in appropriate category listing
3. Test category filtering includes the new article
4. Validate pagination system updates properly

### Common Issues

- **Future dates**: Articles with future publication dates are filtered out
- **Invalid categories**: Category names must match existing structure
- **Missing frontmatter**: All required metadata fields must be present
- **Wrong location**: Files must be in correct content collection directory

**Note**: The system automatically integrates properly formatted articles with correct frontmatter.
