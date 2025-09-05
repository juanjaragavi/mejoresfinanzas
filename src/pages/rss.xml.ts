import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export async function GET(context: APIContext) {
  const site = context.site?.toString() ?? "https://mejoresfinanzas.com";

  const blog = await getCollection("blog", ({ data }) => !data.draft);
  const personalFinance = await getCollection(
    "personal-finance",
    ({ data }) => !data.draft,
  );
  const financialSolutions = await getCollection(
    "financial-solutions",
    ({ data }) => !data.draft,
  );

  const items = [...blog, ...personalFinance, ...financialSolutions]
    .filter(Boolean)
    .sort(
      (a, b) => (b.data.date?.getTime() || 0) - (a.data.date?.getTime() || 0),
    )
    .map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.date,
      link: `${site}/${entry.id}`.replace(
        /([^:]\/)\/+/, // collapse duplicate slashes except after protocol
        "$1",
      ),
    }));

  return rss({
    title: "MejoresFinanzas",
    description: "Latest articles from MejoresFinanzas",
    site,
    items,
  });
}
