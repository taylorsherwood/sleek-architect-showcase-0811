import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import communityPages from "../data/communities.json" with { type: "json" };

export default defineTool({
  name: "list_communities",
  title: "List Austin communities",
  description:
    "List luxury Austin-area communities/neighborhoods covered by Echelon Property Group, with slug, name, and price range.",
  inputSchema: {
    query: z
      .string()
      .optional()
      .describe("Optional case-insensitive substring to filter by community name or slug."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query }) => {
    const q = (query ?? "").trim().toLowerCase();
    const items = communityPages
      .filter((c) =>
        !q ? true : c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q),
      )
      .map((c) => ({
        slug: c.slug,
        name: c.name,
        priceRange: c.priceRange,
        url: `https://www.echelonpropertygroup.com/communities/${c.slug}`,
      }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { count: items.length, items },
    };
  },
});
