import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import AutoImport from "astro-auto-import";
import { defineConfig } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import config from "./src/config/config.json";

let highlighter;
async function getHighlighter() {
  if (!highlighter) {
    const { getHighlighter } = await import("shiki");
    highlighter = await getHighlighter({ theme: "one-dark-pro" });
  }
  return highlighter;
}

// https://astro.build/config
export default defineConfig({
  site: config.site.base_url ? config.site.base_url : "https://mejoresfinanzas.com",
  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: config.site.trailing_slash ? "always" : "never",
  server: {
    port: 4322,
    host: true, // Allow connections from network (useful for production)
  },
  vite: { plugins: [tailwindcss()] },
  integrations: [
    react(),
    sitemap({
      // Comprehensive sitemap configuration with detailed metadata
      customPages: [
        // Primary navigation pages with high priority
        "https://mejoresfinanzas.com/",
        "https://mejoresfinanzas.com/about/",
        "https://mejoresfinanzas.com/contact/",
        "https://mejoresfinanzas.com/blog/",
        "https://mejoresfinanzas.com/personal-finance/",
        "https://mejoresfinanzas.com/financial-solutions/",

        // Interactive tools with high conversion value
        "https://mejoresfinanzas.com/quiz/",
        "https://mejoresfinanzas.com/quiz-results/",
        "https://mejoresfinanzas.com/credit-card-recommender-p1/",
        "https://mejoresfinanzas.com/credit-card-recommender-p2/",
        "https://mejoresfinanzas.com/credit-card-recommender-p3/",

        // Legal and policy pages
        "https://mejoresfinanzas.com/privacy-policy/",
        "https://mejoresfinanzas.com/terms-conditions/",
        "https://mejoresfinanzas.com/cookie-policy/",

        // Category pages
        "https://mejoresfinanzas.com/categories/",
      ],

      // Configure change frequency, priority, and last modification
      serialize(item) {
        // Get the current date for recently updated content
        const now = new Date();
        const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        // Define URL-specific configurations
        const urlConfig = {
          // Homepage - highest priority, frequently updated
          "/": {
            changefreq: "daily",
            priority: 1.0,
            lastmod: now.toISOString().split("T")[0],
          },

          // Main navigation pages - high priority
          "/about/": {
            changefreq: "monthly",
            priority: 0.9,
            lastmod: lastWeek.toISOString().split("T")[0],
          },
          "/contact/": {
            changefreq: "monthly",
            priority: 0.8,
            lastmod: lastWeek.toISOString().split("T")[0],
          },

          // Content hub pages - high priority, updated weekly
          "/blog/": {
            changefreq: "weekly",
            priority: 0.9,
            lastmod: now.toISOString().split("T")[0],
          },
          "/personal-finance/": {
            changefreq: "weekly",
            priority: 0.9,
            lastmod: now.toISOString().split("T")[0],
          },
          "/financial-solutions/": {
            changefreq: "weekly",
            priority: 0.9,
            lastmod: now.toISOString().split("T")[0],
          },

          // Interactive tools - high conversion value
          "/quiz/": {
            changefreq: "monthly",
            priority: 0.95,
            lastmod: lastWeek.toISOString().split("T")[0],
          },
          "/quiz-results/": {
            changefreq: "monthly",
            priority: 0.9,
            lastmod: lastWeek.toISOString().split("T")[0],
          },
          "/credit-card-recommender-p1/": {
            changefreq: "monthly",
            priority: 0.9,
            lastmod: lastWeek.toISOString().split("T")[0],
          },
          "/credit-card-recommender-p2/": {
            changefreq: "monthly",
            priority: 0.9,
            lastmod: lastWeek.toISOString().split("T")[0],
          },
          "/credit-card-recommender-p3/": {
            changefreq: "monthly",
            priority: 0.9,
            lastmod: lastWeek.toISOString().split("T")[0],
          },

          // Legal pages - lower priority, rarely updated
          "/privacy-policy/": {
            changefreq: "yearly",
            priority: 0.3,
            lastmod: "2025-01-01",
          },
          "/terms-conditions/": {
            changefreq: "yearly",
            priority: 0.3,
            lastmod: "2025-01-01",
          },
          "/cookie-policy/": {
            changefreq: "yearly",
            priority: 0.3,
            lastmod: "2025-01-01",
          },

          // Utility pages
          "/categories/": {
            changefreq: "weekly",
            priority: 0.6,
            lastmod: now.toISOString().split("T")[0],
          },
          "/elements/": {
            changefreq: "yearly",
            priority: 0.2,
            lastmod: "2024-12-01",
          },
        };

        // Extract path from URL
        let path = item.url.replace("https://mejoresfinanzas.com", "");
        if (!path.endsWith("/")) path += "/";

        // Apply specific configuration or defaults
        const config = urlConfig[path] || getDefaultConfig(path);

        return {
          url: item.url,
          changefreq: config.changefreq,
          priority: config.priority,
          lastmod: config.lastmod,
        };

        function getDefaultConfig(path) {
          // Default configurations based on URL patterns
          if (
            path.includes("/personal-finance/") &&
            path !== "/personal-finance/"
          ) {
            return {
              changefreq: "monthly",
              priority: 0.7,
              lastmod: lastWeek.toISOString().split("T")[0],
            };
          }

          if (
            path.includes("/financial-solutions/") &&
            path !== "/financial-solutions/"
          ) {
            return {
              changefreq: "monthly",
              priority: 0.7,
              lastmod: lastWeek.toISOString().split("T")[0],
            };
          }

          if (path.includes("/blog/") && path !== "/blog/") {
            return {
              changefreq: "monthly",
              priority: 0.6,
              lastmod: lastWeek.toISOString().split("T")[0],
            };
          }

          if (path.includes("/page/")) {
            return {
              changefreq: "weekly",
              priority: 0.5,
              lastmod: now.toISOString().split("T")[0],
            };
          }

          // Default for all other pages
          return {
            changefreq: "monthly",
            priority: 0.5,
            lastmod: lastWeek.toISOString().split("T")[0],
          };
        }
      },

      // Generate multiple sitemaps if needed (for large sites)
      entryLimit: 45000,

      // Filter out any pages that shouldn't be indexed
      filter: (page) => {
        // Exclude API routes and admin pages
        if (page.includes("/api/")) return false;
        if (page.includes("/admin/")) return false;
        if (page.includes("/_astro/")) return false;

        // Include all other pages
        return true;
      },
    }),
    AutoImport({
      imports: [
        "@/shortcodes/AdZone",
        "@/shortcodes/AdZoneTop3",
        "@/shortcodes/Button",
        "@/shortcodes/Accordion",
        "@/shortcodes/Notice",
        "@/shortcodes/Video",
        "@/shortcodes/Youtube",
        "@/shortcodes/Tabs",
        "@/shortcodes/Tab",
      ],
    }),
    mdx(),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
    extendDefaultPlugins: true,
    highlighter: getHighlighter,
  },
});
