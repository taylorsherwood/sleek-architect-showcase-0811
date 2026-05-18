// get-community-report
//
// Single-request unlock flow for the gated community report:
//   1. Validates the submitted lead (name, email, phone, slug, etc.).
//   2. Inserts a row into `community_leads` using the service role.
//   3. Returns the full community row (gated columns included).
//
// Anonymous browsers can no longer read the gated columns directly from
// the `communities` table — column-level grants on the table limit anon
// to teaser fields only. The full payload is only ever served by this
// function, and only after a community_lead has been recorded.
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

type Body = {
  slug?: unknown;
  email?: unknown;
  first_name?: unknown;
  last_name?: unknown;
  phone?: unknown;
  community_name?: unknown;
  interest?: unknown;
  utm_source?: unknown;
  utm_medium?: unknown;
  utm_campaign?: unknown;
  utm_term?: unknown;
  utm_content?: unknown;
  referrer?: unknown;
  page_url?: unknown;
  source_tag?: unknown;
};

const s = (v: unknown, max = 255) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const slug = s(body.slug, 200).toLowerCase();
  const email = s(body.email, 255).toLowerCase();
  const firstName = s(body.first_name, 100);
  const lastName = s(body.last_name, 100);
  const phone = s(body.phone, 30);
  const communityName = s(body.community_name, 200) || slug;

  if (!SLUG_RE.test(slug)) return json({ error: "Invalid slug" }, 400);
  if (!email || !EMAIL_RE.test(email)) return json({ error: "Invalid email" }, 400);
  if (!firstName) return json({ error: "Missing first name" }, 400);
  if (!lastName) return json({ error: "Missing last name" }, 400);
  if (phone.replace(/\D/g, "").length < 10) {
    return json({ error: "Invalid phone" }, 400);
  }

  const admin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } },
  );

  // Confirm the community exists & is published before recording anything.
  const { data: community, error: commErr } = await admin
    .from("communities")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (commErr) return json({ error: "Lookup failed" }, 500);
  if (!community) return json({ error: "Not found" }, 404);

  // Look for a recent matching lead. If none, insert one now. Either way,
  // the unlock is only granted after a verified community_leads row exists
  // for this {slug, email} pair.
  const since = new Date(Date.now() - UNLOCK_WINDOW_MS).toISOString();
  const { data: existing } = await admin
    .from("community_leads")
    .select("id")
    .eq("community_slug", slug)
    .ilike("email", email)
    .gte("created_at", since)
    .limit(1)
    .maybeSingle();

  if (!existing) {
    const { error: insertErr } = await admin.from("community_leads").insert({
      community_slug: slug,
      community_name: communityName,
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      interest: s(body.interest, 100) || null,
      utm_source: s(body.utm_source, 200) || null,
      utm_medium: s(body.utm_medium, 200) || null,
      utm_campaign: s(body.utm_campaign, 200) || null,
      utm_term: s(body.utm_term, 200) || null,
      utm_content: s(body.utm_content, 200) || null,
      referrer: s(body.referrer, 500) || null,
      page_url: s(body.page_url, 500) || null,
      source_tag: s(body.source_tag, 200) || null,
    });
    if (insertErr) return json({ error: "Could not record lead" }, 500);
  }

  return json({ community });
});
