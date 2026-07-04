import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { seoBlogPosts } from "../../../data/seoBlogPosts";

export default defineTool({
  name: "list_blog_posts",
  title: "List Echelon blog posts",
  description:
    "List published Austin luxury real estate editorial articles from Echelon Property Group, with id, title, date, and canonical URL.",
  inputSchema: {
    query: z
      .string()
      .optional()
      .describe("Optional case-insensitive substring to filter by title or slug/id."),
    limit: z
      .number()
      .int()
      .positive()
      .max(100)
      .optional()
      .describe("Maximum number of posts to return (default 25)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query, limit }) => {
    const q = (query ?? "").trim().toLowerCase();
    const max = limit ?? 25;
    const items = (seoBlogPosts as Array<{ id: string; title: string; date?: string; excerpt?: string }>)
      .filter((p) =>
        !q ? true : p.title.toLowerCase().includes(q) || p.id.toLowerCase().includes(q),
      )
      .slice(0, max)
      .map((p) => ({
        id: p.id,
        title: p.title,
        date: p.date ?? null,
        excerpt: p.excerpt ?? null,
        url: `https://www.echelonpropertygroup.com/blog/${p.id}`,
      }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { count: items.length, items },
    };
  },
});
