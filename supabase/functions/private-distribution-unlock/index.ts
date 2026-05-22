import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

interface UnlockBody {
  edition_slug?: string;
  edition_title?: string;
  name?: string;
  email?: string;
  phone?: string;
  page_url?: string;
  referrer?: string;
}

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const sha256Hex = async (input: string): Promise<string> => {
  const data = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

const randomToken = (): string => {
  const arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  return Array.from(arr)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let body: UnlockBody;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const slug = (body.edition_slug || "").trim();
  const name = (body.name || "").trim();
  const email = (body.email || "").trim().toLowerCase();
  const phone = (body.phone || "").trim();
  const title = (body.edition_title || "").trim();

  if (!slug || slug.length > 200) {
    return new Response(JSON.stringify({ error: "Invalid edition" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  if (!name || name.length > 200) {
    return new Response(JSON.stringify({ error: "Name required" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  if (!email || email.length > 255 || !EMAIL_RE.test(email)) {
    return new Response(JSON.stringify({ error: "Valid email required" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } },
  );

  // Verify the edition exists & is active
  const { data: edition, error: editionErr } = await supabase
    .from("private_editions")
    .select("slug, active, title")
    .eq("slug", slug)
    .maybeSingle();

  if (editionErr || !edition || !edition.active) {
    return new Response(JSON.stringify({ error: "Edition not available" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Insert lead (validate trigger runs); ignore if it throws on phone (phone optional here)
  let leadId: string | null = null;
  try {
    const message = `Private Distribution access, ${title || edition.title}`;
    const { data: leadRow } = await supabase
      .from("leads")
      .insert({
        name,
        email,
        phone: phone || null,
        message,
        source: "Private Distribution",
        page_url: body.page_url || null,
        referrer: body.referrer || null,
        user_agent: req.headers.get("user-agent") || null,
        extra: { edition_slug: slug, edition_title: title || edition.title },
      })
      .select("id")
      .single();
    leadId = leadRow?.id ?? null;
  } catch (e) {
    // Lead validation may reject if name/email malformed despite our checks.
    // Continue — gate is still gated by valid email; we don't block UX here.
    console.error("lead insert failed", e);
  }

  // Generate token, store its hash
  const token = randomToken();
  const tokenHash = await sha256Hex(token);

  const { error: grantErr } = await supabase
    .from("private_edition_grants")
    .insert({
      edition_slug: slug,
      email,
      token_hash: tokenHash,
      lead_id: leadId,
    });

  if (grantErr) {
    console.error("grant insert failed", grantErr);
    return new Response(JSON.stringify({ error: "Could not issue access" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(
    JSON.stringify({
      ok: true,
      token,
      expires_in_days: 60,
    }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});
