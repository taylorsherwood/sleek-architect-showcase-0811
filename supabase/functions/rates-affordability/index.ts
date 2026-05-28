// Rates + Affordability data proxy.
//
// Pulls the latest 30-Year Fixed Rate Mortgage Average (FRED MORTGAGE30US),
// returning the most recent value and the trailing-52-week series so the
// frontend can render an editorial rate context module without a key on the
// client. FRED's `fredgraph.csv` endpoint is public and does not require an
// API key, but does not always return CORS headers — proxying through this
// function avoids that and adds an in-memory cache.

import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SERIES_URL = "https://fred.stlouisfed.org/graph/fredgraph.csv?id=MORTGAGE30US";

// Cache the entire response for 6 hours. FRED updates weekly (Thursdays).
const CACHE_TTL_MS = 1000 * 60 * 60 * 6;
let cached: { at: number; body: string } | null = null;

interface Point { date: string; value: number }
interface ResponseShape {
  latest: number | null;
  latest_date: string | null;
  points: Point[];
  source: string;
  attribution: string;
  last_fetched: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
      return new Response(cached.body, {
        headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "public, max-age=21600" },
      });
    }

    const res = await fetch(SERIES_URL, {
      headers: { "User-Agent": "EchelonPropertyGroup/1.0 (+https://www.echelonpropertygroup.com)" },
    });
    if (!res.ok) throw new Error(`fred_${res.status}`);
    const csv = await res.text();

    // FRED CSV: first line is "observation_date,MORTGAGE30US" then rows.
    const lines = csv.trim().split("\n").slice(1);
    const points: Point[] = [];
    for (const line of lines) {
      const [date, raw] = line.split(",");
      if (!date || raw == null || raw === "." || raw.trim() === "") continue;
      const v = parseFloat(raw);
      if (!Number.isFinite(v)) continue;
      points.push({ date: date.trim(), value: v });
    }

    const trailing = points.slice(-52);
    const latest = trailing[trailing.length - 1] ?? null;

    const payload: ResponseShape = {
      latest: latest?.value ?? null,
      latest_date: latest?.date ?? null,
      points: trailing,
      source: "FRED",
      attribution: "Freddie Mac via FRED · MORTGAGE30US",
      last_fetched: new Date().toISOString(),
    };

    const body = JSON.stringify(payload);
    cached = { at: Date.now(), body };

    return new Response(body, {
      headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "public, max-age=21600" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown_error";
    return new Response(JSON.stringify({ error: message }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
