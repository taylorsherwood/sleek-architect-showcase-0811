// Returns the live off-market Echelon listings AFTER a valid lead submission.
// Keeps sensitive names/pricing/imagery out of the public client bundle.
//
// Contract:
//   POST { name, email, phone, consent: boolean }
//   200 -> { properties: OffMarketProperty[] }
//   400 -> { error: "Invalid request" }

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type OffMarketProperty = {
  image: string;
  badge: string;
  name: string;
  subtitle: string;
  link: string;
};

// Server-only catalog. Never shipped to the browser bundle.
const OFFMARKET_LISTINGS: OffMarketProperty[] = [
  {
    image: "/__l5e/assets-v1/d1a1ee99-d079-41c4-8a24-29168144a1c4/overlook-pass.jpg",
    badge: "COMING SOON",
    name: "Overlook Pass",
    subtitle: "7.9 acres · 9,800 SF · $9,800,000",
    link: "/contact",
  },
  {
    image: "/__l5e/assets-v1/0a452b99-d631-406a-b169-0be49d92b13c/horseshoe-bay.avif",
    badge: "UNDER CONTRACT",
    name: "Horseshoe Bay",
    subtitle: "5,755 SF · $5,750,000",
    link: "/contact",
  },
  {
    image: "/__l5e/assets-v1/6f9e3a74-a9a4-45fc-b15d-70ec4378439a/falconhead.jpg",
    badge: "COMING SOON",
    name: "Falconhead",
    subtitle: "3,500 SF · $1,100,000",
    link: "/contact",
  },
];

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

function isValidLead(body: unknown): body is { name: string; email: string; phone: string; consent: boolean } {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  const name = typeof b.name === "string" ? b.name.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const phone = typeof b.phone === "string" ? b.phone.replace(/\D/g, "") : "";
  if (name.length < 2 || name.length > 200) return false;
  if (!EMAIL_RE.test(email) || email.length > 255) return false;
  if (phone.length < 7 || phone.length > 20) return false;
  if (b.consent !== true) return false;
  return true;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!isValidLead(payload)) {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ properties: OFFMARKET_LISTINGS }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
