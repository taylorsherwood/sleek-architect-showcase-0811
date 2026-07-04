import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { requireAdmin, serviceClient } from "../lib/auth";

export default defineTool({
  name: "list_leads",
  title: "List recent leads (admin)",
  description:
    "Admin-only. List the most recent leads submitted through Echelon Property Group forms, including name, email, phone, message, source, and timestamp. Requires an Echelon administrator OAuth session.",
  inputSchema: {
    limit: z
      .number()
      .int()
      .positive()
      .max(100)
      .optional()
      .describe("Maximum number of leads to return (default 25, max 100)."),
    source: z
      .string()
      .optional()
      .describe("Optional case-insensitive filter on the `source` field."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit, source }, ctx) => {
    const denied = await requireAdmin(ctx);
    if (denied) return denied;

    const svc = serviceClient();
    let query = svc
      .from("leads")
      .select("id, created_at, name, email, phone, message, source, page_url, utm_source, utm_campaign, zapier_status")
      .order("created_at", { ascending: false })
      .limit(limit ?? 25);
    if (source) query = query.ilike("source", `%${source}%`);
    const { data, error } = await query;
    if (error) {
      return {
        content: [{ type: "text", text: `Failed to load leads: ${error.message}` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { count: data?.length ?? 0, items: data ?? [] },
    };
  },
});
