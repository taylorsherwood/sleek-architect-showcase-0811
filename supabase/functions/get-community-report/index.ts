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
import { sendTemplateEmail } from "../_shared/transactional-email-templates/send-email.ts";

const ALLOWED_HOSTS = /^(www\.)?echelonpropertygroup\.com$/;
const DEFAULT_ORIGIN = "https://www.echelonpropertygroup.com";

async function sha256(v: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(v));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function buildLink(pageUrl: string, slug: string, token: string) {
  let url: URL;
  try {
    url = new URL(pageUrl);
    if (url.protocol !== "https:" || !ALLOWED_HOSTS.test(url.hostname)) throw new Error();
    url = new URL(url.pathname, DEFAULT_ORIGIN);
  } catch {
    url = new URL(`/communities/${slug}`, DEFAULT_ORIGIN);
  }
  url.hash = "";
  url.searchParams.delete("report_token");
  url.searchParams.set("report_token", token);
  return url.toString();
}

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
  token?: unknown;
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
  const token = s(body.token, 200);

  if (token) {
    if (!SLUG_RE.test(slug) || !/^[a-f0-9]{64}$/.test(token)) return json({ error: "Invalid link" }, 400);
    const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
    const { data: grant } = await db
      .from("community_report_grants")
      .select("id")
      .eq("token_hash", await sha256(token))
      .eq("community_slug", slug)
      .gt("expires_at", new Date().toISOString())
      .maybeSingle();
    if (!grant) return json({ error: "Link expired or invalid" }, 403);
    const { data: community } = await db.from("communities").select("*").eq("slug", slug).eq("published", true).maybeSingle();
    if (!community) return json({ error: "Not found" }, 404);
    await db.from("community_report_grants").update({ last_accessed_at: new Date().toISOString() }).eq("id", grant.id);
    return json({ community });
  }
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
    .select("id, name")
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

  // Never return the report here. Email a private link so only the owner of
  // the submitted address can open it.
  const raw = Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map((b) => b.toString(16).padStart(2, "0")).join("");
  const { data: grant, error: grantErr } = await admin
    .from("community_report_grants")
    .insert({ community_slug: slug, email, token_hash: await sha256(raw) })
    .select("id")
    .single();
  if (grantErr || !grant) return json({ error: "Could not create access" }, 500);

  try {
    await sendTemplateEmail("community-report-access", email, {
      templateData: {
        firstName,
        communityName: community.name || communityName,
        link: buildLink(s(body.page_url, 500), slug, raw),
      },
      idempotencyKey: `community-report-access-${grant.id}`,
    });
  } catch (e) {
    console.error("report email failed", e);
    return json({ error: "Could not send email" }, 502);
  }

  return json({ emailed: true });
});
