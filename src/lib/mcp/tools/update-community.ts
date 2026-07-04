import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { requireAdmin, serviceClient } from "../lib/auth";

// Whitelist of editable fields. Never accept arbitrary keys from tool input —
// this prevents an assistant (or attacker holding a session) from flipping
// system columns like `id`, `created_at`, or foreign keys.
const editableFields = z.object({
  name: z.string().min(1).max(200).optional(),
  overview: z.string().max(20000).optional(),
  price_range: z.string().max(200).optional(),
  meta_title: z.string().max(200).optional(),
  meta_description: z.string().max(500).optional(),
  published: z.boolean().optional(),
});

export default defineTool({
  name: "update_community",
  title: "Update community editorial (admin)",
  description:
    "Admin-only. Update editorial fields on a community record by slug — name, overview, price range, meta title/description, or published status. Only the fields you pass are changed. Requires an Echelon administrator OAuth session.",
  inputSchema: {
    slug: z.string().min(1).max(200).describe("Community slug, e.g. `westlake-hills`."),
    updates: editableFields.describe("Fields to update. Only whitelisted editorial fields are accepted."),
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: false,
  },
  handler: async ({ slug, updates }, ctx) => {
    const denied = await requireAdmin(ctx);
    if (denied) return denied;

    // Strip undefined so we never overwrite a column with null by accident.
    const patch: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(updates)) {
      if (v !== undefined) patch[k] = v;
    }
    if (Object.keys(patch).length === 0) {
      return {
        content: [{ type: "text", text: "No fields provided to update." }],
        isError: true,
      };
    }

    const svc = serviceClient();
    const { data, error } = await svc
      .from("communities")
      .update(patch)
      .eq("slug", slug)
      .select("id, slug, name, published, updated_at")
      .maybeSingle();

    if (error) {
      return {
        content: [{ type: "text", text: `Update failed: ${error.message}` }],
        isError: true,
      };
    }
    if (!data) {
      return {
        content: [{ type: "text", text: `No community found for slug "${slug}".` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: `Updated community "${slug}". ${JSON.stringify(data)}` }],
      structuredContent: { updated: data, fields: Object.keys(patch) },
    };
  },
});
