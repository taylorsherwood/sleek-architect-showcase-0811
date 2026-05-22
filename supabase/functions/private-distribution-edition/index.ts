import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const sha256Hex = async (input: string): Promise<string> => {
  const data = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST" && req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let slug = "";
  let token = "";
  if (req.method === "POST") {
    try {
      const body = await req.json();
      slug = String(body.slug || "").trim();
      token = String(body.token || "").trim();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } else {
    const url = new URL(req.url);
    slug = (url.searchParams.get("slug") || "").trim();
    token = (url.searchParams.get("token") || "").trim();
  }

  if (!slug || !token || token.length < 32 || token.length > 128) {
    return new Response(JSON.stringify({ error: "Missing credentials" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const tokenHash = await sha256Hex(token);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } },
  );

  const { data: grant, error: grantErr } = await supabase
    .from("private_edition_grants")
    .select("id, edition_slug, expires_at")
    .eq("token_hash", tokenHash)
    .eq("edition_slug", slug)
    .maybeSingle();

  if (grantErr || !grant) {
    return new Response(JSON.stringify({ error: "Invalid or expired access" }), {
      status: 403,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (new Date(grant.expires_at).getTime() < Date.now()) {
    return new Response(JSON.stringify({ error: "Access expired" }), {
      status: 403,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { data: edition, error: editionErr } = await supabase
    .from("private_editions")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();

  if (editionErr || !edition) {
    return new Response(JSON.stringify({ error: "Edition not found" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Touch last_accessed_at, best-effort
  supabase
    .from("private_edition_grants")
    .update({ last_accessed_at: new Date().toISOString() })
    .eq("id", grant.id)
    .then(() => {}, () => {});

  return new Response(JSON.stringify({ ok: true, edition }), {
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
});
