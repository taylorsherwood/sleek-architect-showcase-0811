// Returns the full community report only when a recent community_lead exists
// for the requested {slug, email}. Anonymous browsers can no longer read the
// gated columns directly from the `communities` table (see migration that
// restricts column grants to anon).
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const SLUG_RE = /^[a-z0-9-]{1,200}$/;
const UNLOCK_WINDOW_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let body: { slug?: unknown; email?: unknown };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const slug = typeof body.slug === "string" ? body.slug.trim().toLowerCase() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!SLUG_RE.test(slug)) return json({ error: "Invalid slug" }, 400);
  if (!email || email.length > 255 || !EMAIL_RE.test(email)) {
    return json({ error: "Invalid email" }, 400);
  }

  const admin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } },
  );

  // Verify a recent community_lead exists for this email + slug pair.
  const since = new Date(Date.now() - UNLOCK_WINDOW_MS).toISOString();
  const { data: lead, error: leadErr } = await admin
    .from("community_leads")
    .select("id")
    .eq("community_slug", slug)
    .ilike("email", email)
    .gte("created_at", since)
    .limit(1)
    .maybeSingle();

  if (leadErr) return json({ error: "Verification failed" }, 500);
  if (!lead) return json({ error: "Access not verified" }, 403);

  // Return the full row (all gated columns).
  const { data: community, error: commErr } = await admin
    .from("communities")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (commErr) return json({ error: "Lookup failed" }, 500);
  if (!community) return json({ error: "Not found" }, 404);

  return json({ community });
});
