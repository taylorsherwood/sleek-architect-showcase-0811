// AgentIntel market data proxy (mock-first).
// The AGENTINTEL_API_KEY secret is read server-side only and never returned
// to the client. Once live endpoints are confirmed, swap MOCK_DATA for the
// real fetch inside fetchFromAgentIntel().

import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

// ---------------------------------------------------------------------------
// Config — placeholder. Replace base URL and per-dataset paths when AgentIntel
// documentation is available. The shape below is intentionally generic so the
// rest of the app does not need to change.
// ---------------------------------------------------------------------------
const AGENTINTEL_BASE_URL = "https://api.agentintel.example/v1"; // placeholder
const ENDPOINTS: Record<string, string> = {
  "market-pulse": "/market/pulse",
  "neighborhood-stats": "/market/neighborhoods",
  "inventory-trends": "/market/inventory",
  "luxury-insights": "/market/luxury",
};

const CACHE_TTL_SECONDS = 60 * 60 * 24; // 24h
const cache = new Map<string, { at: number; payload: unknown }>();

// ---------------------------------------------------------------------------
// Mock data — used until live API is wired. Shapes match what the frontend
// components consume, so the live cutover is a one-line change in fetch().
// ---------------------------------------------------------------------------
const MOCK_DATA: Record<string, unknown> = {
  "market-pulse": {
    headline: "Steady demand, tightening supply at the top of the market",
    median_price: 1485000,
    median_price_delta_pct: 3.2,
    avg_days_on_market: 47,
    dom_delta: -6,
    months_of_supply: 3.1,
    closed_last_30_days: 612,
    luxury_share_pct: 18.4,
    summary:
      "Austin's overall market is stabilizing while the upper tier continues to absorb premium inventory faster than entry segments.",
  },
  "neighborhood-stats": {
    items: [
      { name: "West Lake Hills", median_price: 3250000, dom: 38, yoy_pct: 6.4, inventory: 14 },
      { name: "Tarrytown", median_price: 2450000, dom: 31, yoy_pct: 5.1, inventory: 9 },
      { name: "Barton Creek", median_price: 2890000, dom: 52, yoy_pct: 4.2, inventory: 21 },
      { name: "Lake Austin", median_price: 5750000, dom: 71, yoy_pct: 8.7, inventory: 11 },
      { name: "Rob Roy", median_price: 3950000, dom: 49, yoy_pct: 5.9, inventory: 6 },
      { name: "Davenport Ranch", median_price: 2150000, dom: 44, yoy_pct: 3.8, inventory: 12 },
    ],
  },
  "inventory-trends": {
    period: "Last 12 months",
    series: [
      { month: "Jun", active: 1820, new: 612, pending: 498, sold: 540, months_of_inventory: 3.4 },
      { month: "Jul", active: 1910, new: 588, pending: 482, sold: 521, months_of_inventory: 3.7 },
      { month: "Aug", active: 1975, new: 542, pending: 461, sold: 498, months_of_inventory: 4.0 },
      { month: "Sep", active: 1860, new: 510, pending: 489, sold: 532, months_of_inventory: 3.5 },
      { month: "Oct", active: 1720, new: 471, pending: 502, sold: 555, months_of_inventory: 3.1 },
      { month: "Nov", active: 1610, new: 402, pending: 458, sold: 489, months_of_inventory: 3.3 },
      { month: "Dec", active: 1525, new: 351, pending: 421, sold: 458, months_of_inventory: 3.3 },
      { month: "Jan", active: 1480, new: 410, pending: 438, sold: 470, months_of_inventory: 3.1 },
      { month: "Feb", active: 1495, new: 488, pending: 467, sold: 502, months_of_inventory: 3.0 },
      { month: "Mar", active: 1540, new: 561, pending: 512, sold: 548, months_of_inventory: 2.8 },
      { month: "Apr", active: 1590, new: 612, pending: 548, sold: 590, months_of_inventory: 2.7 },
      { month: "May", active: 1620, new: 645, pending: 571, sold: 612, months_of_inventory: 2.6 },
    ],
    note: "Active inventory has contracted ~11% YoY while absorption holds steady. Months of inventory has compressed from 3.4 to 2.6, signaling a tightening market.",
  },
  "luxury-insights": {
    threshold_label: "$3M+",
    active_listings: 184,
    median_price: 4250000,
    median_dom: 62,
    avg_sale_to_list_pct: 96.8,
    off_market_share_pct: 34,
    insights: [
      "Off-market transactions account for roughly one-third of $3M+ closings in Austin.",
      "Waterfront and view-protected estates continue to command the strongest premiums.",
      "Buyer pools above $5M are increasingly driven by relocation from CA, NY, and IL.",
      "Sale-to-list ratios in the ultra-luxury tier remain near 97%, signaling disciplined pricing.",
    ],
  },
};

// ---------------------------------------------------------------------------
async function fetchFromAgentIntel(dataset: string): Promise<unknown> {
  const apiKey = Deno.env.get("AGENTINTEL_API_KEY");
  const path = ENDPOINTS[dataset];
  const isPlaceholderHost = AGENTINTEL_BASE_URL.includes("agentintel.example");

  // Until live API is wired (placeholder host), always return mock immediately.
  if (!apiKey || !path || isPlaceholderHost) {
    return { ...((MOCK_DATA[dataset] as object) ?? {}), _source: "mock" };
  }

  try {
    const res = await fetch(`${AGENTINTEL_BASE_URL}${path}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
    });
    if (!res.ok) throw new Error(`AgentIntel ${res.status}`);
    const data = await res.json();
    return { ...data, _source: "live" };
  } catch (err) {
    console.error("AgentIntel fetch failed, falling back to mock:", err);
    return { ...((MOCK_DATA[dataset] as object) ?? {}), _source: "mock-fallback" };
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const dataset = (url.searchParams.get("dataset") || "").trim();

    if (!dataset || !(dataset in MOCK_DATA)) {
      return new Response(
        JSON.stringify({
          error: "Invalid or missing 'dataset' parameter",
          allowed: Object.keys(MOCK_DATA),
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const now = Date.now();
    const cached = cache.get(dataset);
    let payload: unknown;
    let cacheHit = false;

    if (cached && now - cached.at < CACHE_TTL_SECONDS * 1000) {
      payload = cached.payload;
      cacheHit = true;
    } else {
      payload = await fetchFromAgentIntel(dataset);
      cache.set(dataset, { at: now, payload });
    }

    const body = {
      dataset,
      data: payload,
      cached: cacheHit,
      last_updated: new Date(cached?.at ?? now).toISOString(),
    };

    return new Response(JSON.stringify(body), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Cache-Control": `public, max-age=${CACHE_TTL_SECONDS}`,
      },
    });
  } catch (err) {
    console.error("agentintel-market-data error:", err);
    return new Response(
      JSON.stringify({ error: "Internal error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
