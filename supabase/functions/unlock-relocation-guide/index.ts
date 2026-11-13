import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { validateGuideLead } from "./validation.ts";

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status, headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "no-store" },
});

// Owner preview link: only the SHA-256 hash of the private token lives in code.
const ADMIN_TOKEN_HASH = "b853dd106b867be3f2512a40a83502eaf50b9b33dc79d409a779d047f8dc0f1e";
async function sha256(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  const body = await req.json().catch(() => null);
  const adminToken = typeof body?.admin_token === "string" ? body.admin_token : "";
  const isAdmin = adminToken.length > 0 && await sha256(adminToken) === ADMIN_TOKEN_HASH;
  const lead = isAdmin ? null : validateGuideLead(body);
  if (isAdmin) {
    const url = Deno.env.get("SUPABASE_URL"), key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!url || !key) return json({ error: "Guide access is temporarily unavailable." }, 503);
    const client = createClient(url, key, { auth: { persistSession: false } });
    const { data: access, error } = await client.storage.from("buyer-guides").createSignedUrl("austin-relocation-guide-v3.pdf", 3600);
    if (error || !access) return json({ error: "The guide could not be opened." }, 503);
    return json({ url: access.signedUrl, expiresAt: Date.now() + 3600000 });
  }
  if (!lead) return json({ error: "Please provide your name and a valid email address." }, 400);
  const url = Deno.env.get("SUPABASE_URL"), key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) return json({ error: "Guide access is temporarily unavailable." }, 503);
  try {
    const client = createClient(url, key, { auth: { persistSession: false } });
    // Generate access before submitting, but never return it unless the lead is saved and forwarded.
    const { data: access, error } = await client.storage.from("buyer-guides").createSignedUrl("austin-relocation-guide-v3.pdf", 3600);
    if (error || !access) return json({ error: "The guide could not be opened." }, 503);
    const timestamp = new Date().toISOString();
    const result = await client.functions.invoke("submit-lead", { body: {
      payload: { ...lead, page: lead.page_url, source: "Austin Relocation Guide", message: "Requested access to the Austin Relocation Guide flipbook", time: timestamp, timestamp },
      webhookUrl: "https://hooks.zapier.com/hooks/catch/26916347/upj5fa0/",
      userAgent: req.headers.get("user-agent") || "",
    } });
    if (result.error || !result.data?.ok) return json({ error: "Your request could not be completed. Please try again later." }, 502);
    return json({ url: access.signedUrl, expiresAt: Date.now() + 3600000 });
  } catch {
    return json({ error: "Guide access is temporarily unavailable." }, 503);
  }
});