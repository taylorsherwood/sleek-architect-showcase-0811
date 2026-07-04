import { createClient } from "@supabase/supabase-js";
import type { ToolContext } from "@lovable.dev/mcp-js";

// `process.env` is provided at runtime by Deno (the emitted MCP edge function
// bundle) but TypeScript in the Vite app doesn't have node types loaded.
declare const process: { env: Record<string, string | undefined> };

// Service-role client for admin-role verification via has_role().
// Only ever used server-side inside admin-gated tool handlers.
export function serviceClient() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}

// User-scoped client that forwards the OAuth bearer token so RLS runs
// as the signed-in user.
export function userClient(ctx: ToolContext) {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY!,
    {
      global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    },
  );
}

// Verify the authenticated OAuth user has the `admin` role.
// Returns null when authorized, or an MCP error result when not.
export async function requireAdmin(ctx: ToolContext) {
  if (!ctx.isAuthenticated()) {
    return {
      content: [{ type: "text" as const, text: "Not authenticated. Sign in to continue." }],
      isError: true,
    };
  }
  const userId = ctx.getUserId();
  if (!userId) {
    return {
      content: [{ type: "text" as const, text: "No user id on token." }],
      isError: true,
    };
  }
  const svc = serviceClient();
  const { data, error } = await svc.rpc("has_role", { _user_id: userId, _role: "admin" });
  if (error) {
    return {
      content: [{ type: "text" as const, text: `Authorization check failed: ${error.message}` }],
      isError: true,
    };
  }
  if (!data) {
    return {
      content: [
        {
          type: "text" as const,
          text: "This tool is restricted to Echelon administrators. Your account does not have admin access.",
        },
      ],
      isError: true,
    };
  }
  return null;
}
