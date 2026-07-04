import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import communityPages from "../data/communities.json" with { type: "json" };

export default defineTool({
  name: "get_community",
  title: "Get Austin community guide",
  description:
    "Return the editorial overview, price range, and canonical URL for a specific Austin community by slug (e.g. westlake-hills, tarrytown).",
  inputSchema: {
    slug: z.string().min(1).describe("Community slug, e.g. `westlake-hills`."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const match = communityPages.find((c) => c.slug === slug);
    if (!match) {
      return {
        content: [{ type: "text", text: `No community found for slug "${slug}".` }],
        isError: true,
      };
    }
    const payload = {
      slug: match.slug,
      name: match.name,
      priceRange: match.priceRange,
      overview: match.overview,
      url: `https://www.echelonpropertygroup.com/communities/${match.slug}`,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
