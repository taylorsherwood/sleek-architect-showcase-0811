import { createClient } from "https://esm.sh/@supabase/supabase-js@2.95.0";
// AgentIntel server-side proxy.
//
// Keeps AGENTINTEL_API_KEY secret. The browser only ever talks to this function.
// Two surfaces are supported:
//
//   1. action=...  → live AgentIntel v0 endpoints (me, search-markets,
//                    market-metrics). This is the foundation layer.
//   2. dataset=... → legacy mock datasets still consumed by existing
//                    MarketPulse / NeighborhoodStats / LuxuryInsights /
//                    InventoryTrends components. Preserved for backwards
//                    compatibility until those modules migrate.
//
// All endpoint mapping + normalization stays here so frontend code never has
// to know the shape of the v0 API.

import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { PUBLIC_MARKETS, PUBLIC_METRICS, publicMarketQuery, publicMetricsAllowed } from "./public-access.ts";

const AGENTINTEL_BASE_URL = "https://api.agentintel.co/v0";

// ---------------------------------------------------------------------------
// In-memory cache (per warm instance). Per-action TTL.
// ---------------------------------------------------------------------------
const cache = new Map<string, { at: number; payload: unknown; status: number; ttlMs: number }>();
const pending = new Map<string, Promise<ActionResult>>();
const publicMarketIds = new Set<string>();
let publicCatalog: Promise<void> | undefined;

function cacheGet(key: string, ttlMs: number) {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < Math.min(ttlMs, hit.ttlMs)) return hit;
  return null;
}
function cacheSet(key: string, payload: unknown, status: number, ttlMs: number) {
  cache.set(key, { at: Date.now(), payload, status, ttlMs });
}

// ---------------------------------------------------------------------------
// Live AgentIntel call helper
// ---------------------------------------------------------------------------
interface LiveResult { status: number; data: unknown; error?: string }

async function callAgentIntel(path: string, query?: Record<string, string>): Promise<LiveResult> {
  const apiKey = Deno.env.get("AGENTINTEL_API_KEY");
  if (!apiKey) {
    return { status: 401, data: null, error: "missing_api_key" };
  }

  const url = new URL(`${AGENTINTEL_BASE_URL}${path}`);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v != null && v !== "") url.searchParams.set(k, v);
    }
  }

  try {
    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
    });

    let json: unknown = null;
    const text = await res.text();
    if (text) {
      try { json = JSON.parse(text); } catch { json = { raw: text }; }
    }

    if (!res.ok) {
      console.error(`AgentIntel ${res.status} ${path}`);
      return { status: res.status, data: null, error: mapStatusToError(res.status) };
    }
    return { status: 200, data: json };
  } catch (err) {
    console.error("AgentIntel network error:", err);
    return { status: 502, data: null, error: "upstream_unreachable" };
  }
}

function mapStatusToError(status: number): string {
  if (status === 401 || status === 403) return "unauthorized";
  if (status === 404) return "not_found";
  if (status === 422) return "invalid_request";
  if (status === 429) return "rate_limited";
  return "upstream_error";
}

// ---------------------------------------------------------------------------
// Normalizers — keep response shapes stable for the frontend.
// ---------------------------------------------------------------------------
function normalizeMarkets(raw: any) {
  const arr = Array.isArray(raw) ? raw : (raw?.results ?? raw?.markets ?? raw?.data ?? []);
  return {
    markets: (arr as any[]).map((m) => ({
      uuid: m.uuid ?? m.id ?? m.market_uuid ?? null,
      name: m.name ?? m.market_name ?? m.label ?? "",
      type: m.type ?? m.market_type ?? null,
      state: m.state ?? m.state_code ?? null,
      region: m.region ?? null,
      raw: m,
    })).filter((m) => m.uuid && m.name),
  };
}

function normalizeMetrics(raw: any) {
  // AgentIntel v0 returns `observations: [{ period_begin, period_end,
  // <metric>: { value, formatted, short }, ... }]`. We pivot that into a
  // per-metric time series so the frontend never needs to know the shape.
  const flat: Record<string, { latest: number | null; latest_date: string | null; latest_formatted: string | null; points: Array<{ date: string; value: number; formatted?: string }> }> = {};

  const observations: any[] = Array.isArray(raw?.observations)
    ? raw.observations
    : Array.isArray(raw?.data?.observations)
      ? raw.data.observations
      : Array.isArray(raw)
        ? raw
        : [];

  // Sort oldest → newest so `latest` is the last entry.
  const sorted = [...observations].sort((a, b) => {
    const da = String(a?.period_end ?? a?.period_begin ?? a?.date ?? "");
    const db = String(b?.period_end ?? b?.period_begin ?? b?.date ?? "");
    return da < db ? -1 : da > db ? 1 : 0;
  });

  for (const obs of sorted) {
    const date = String(obs?.period_end ?? obs?.period_begin ?? obs?.date ?? "");
    if (!date) continue;
    for (const [key, val] of Object.entries(obs)) {
      if (key === "period_begin" || key === "period_end" || key === "date") continue;
      let value: number | null = null;
      let formatted: string | undefined;
      if (val && typeof val === "object" && "value" in (val as any)) {
        const n = Number((val as any).value);
        value = Number.isFinite(n) ? n : null;
        formatted = (val as any).formatted ?? (val as any).short;
      } else if (typeof val === "number") {
        value = val;
      }
      if (value == null) continue;
      if (!flat[key]) flat[key] = { latest: null, latest_date: null, latest_formatted: null, points: [] };
      flat[key].points.push({ date, value, formatted });
      flat[key].latest = value;
      flat[key].latest_date = date;
      flat[key].latest_formatted = formatted ?? null;
    }
  }

  return { metrics: flat, market: raw?.market ?? null, attribution: raw?.attribution ?? null };
}

// ---------------------------------------------------------------------------
// Action router (live API)
// ---------------------------------------------------------------------------
interface ActionResult { status: number; body: unknown; ttlMs: number }

async function cachedAction(action: string, params: URLSearchParams): Promise<ActionResult> {
  const canonical = new URLSearchParams();
  if (action === "search-markets") canonical.set("q", params.get("q") || "");
  if (action === "market-metrics") {
    canonical.set("market_uuid", params.get("market_uuid") || "");
    canonical.set("metrics", [...new Set((params.get("metrics") || "median_sales_price").split(",").map((m) => m.trim()))].sort().join(","));
    canonical.set("duration", params.get("duration") || "1_month");
  }
  const key = `action:${action}:${canonical}`;
  const hit = cacheGet(key, Infinity);
  if (hit) return { status: hit.status, body: { ...(hit.payload as object), cached: true, last_updated: new Date(hit.at).toISOString() }, ttlMs: hit.ttlMs };
  const inFlight = pending.get(key);
  if (inFlight) return inFlight;
  const work = handleAction(action, canonical).then((result) => {
    // Cache failures briefly too, so unavailable markets don't repeatedly hit the paid API.
    cacheSet(key, result.body, result.status, result.ttlMs || 60_000);
    return { ...result, body: { ...(result.body as object), cached: false, last_updated: new Date().toISOString() } };
  }).finally(() => pending.delete(key));
  pending.set(key, work);
  return work;
}

async function resolvePublicMarket(q: string) {
  const result = await cachedAction("search-markets", new URLSearchParams({ q }));
  if (result.status === 200 && publicMarketQuery(q)) {
    const body = result.body as ReturnType<typeof normalizeMarkets>;
    for (const market of body.markets) publicMarketIds.add(market.uuid);
  }
  return result;
}

async function isPublicAction(action: string, params: URLSearchParams): Promise<boolean> {
  if (action === "search-markets") {
    const q = publicMarketQuery(params.get("q") || "");
    if (!q) return false;
    params.set("q", q);
    return true;
  }
  if (action !== "market-metrics" || !publicMetricsAllowed(params)) return false;
  const uuid = params.get("market_uuid") || "";
  if (!/^[a-zA-Z0-9_-]{1,128}$/.test(uuid)) return false;
  const allow = () => {
    // One cache entry per public market, regardless of metric order/subsets.
    params.set("metrics", PUBLIC_METRICS.join(","));
    return true;
  };
  if (publicMarketIds.has(uuid)) return allow();
  // Cold instances can validate IDs returned by another instance, using only
  // fixed approved searches. Arbitrary caller IDs never reach the paid API.
  publicCatalog ??= Promise.all(PUBLIC_MARKETS.map(resolvePublicMarket)).then(() => undefined);
  await publicCatalog;
  return publicMarketIds.has(uuid) ? allow() : false;
}

async function handleAction(action: string, params: URLSearchParams): Promise<ActionResult> {
  switch (action) {
    case "me": {
      // Internal diagnostic only. Do not expose AgentIntel account/subscription
      // details to anonymous callers.
      return { status: 404, body: { error: "not_found" }, ttlMs: 0 };
    }

    case "search-markets": {
      const q = (params.get("q") || "").trim();
      if (!q) return { status: 400, body: { error: "missing_query" }, ttlMs: 0 };
      const r = await callAgentIntel("/us/markets", { q });
      if (r.status !== 200) return { status: r.status, body: { error: r.error }, ttlMs: 0 };
      return { status: 200, body: normalizeMarkets(r.data), ttlMs: 1000 * 60 * 60 };
    }

    case "market-metrics": {
      const uuid = (params.get("market_uuid") || "").trim();
      const metrics = (params.get("metrics") || "median_sales_price").trim();
      const duration = (params.get("duration") || "1_month").trim();
      if (!uuid) return { status: 400, body: { error: "missing_market_uuid" }, ttlMs: 0 };
      const r = await callAgentIntel(`/us/markets/${encodeURIComponent(uuid)}/metrics`, { metrics, duration });
      if (r.status !== 200) return { status: r.status, body: { error: r.error }, ttlMs: 0 };
      return { status: 200, body: normalizeMetrics(r.data), ttlMs: 1000 * 60 * 60 * 6 };
    }

    // Reserved for future datasets — wire when AgentIntel paths are confirmed.
    case "hpi":
    case "building-permits":
    case "jobs-growth":
    case "population-migration":
    case "wage-employment":
    case "interest-rates":
    case "pdf-report":
      return { status: 501, body: { error: "not_implemented", action }, ttlMs: 0 };

    default:
      return { status: 400, body: { error: "unknown_action", action }, ttlMs: 0 };
  }
}

// ---------------------------------------------------------------------------
// Legacy mock datasets (kept so existing components keep rendering).
// ---------------------------------------------------------------------------
const MOCK_DATA: Record<string, unknown> = {
  "market-pulse": {
    headline: "Steady demand, tightening supply at the top of the market",
    median_price: 1485000, median_price_delta_pct: 3.2, avg_days_on_market: 47, dom_delta: -6,
    months_of_supply: 3.1, closed_last_30_days: 612, luxury_share_pct: 18.4,
    summary: "Austin's overall market is stabilizing while the upper tier continues to absorb premium inventory faster than entry segments.",
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
    note: "Active inventory has contracted ~11% YoY while absorption holds steady.",
  },
  "luxury-insights": {
    threshold_label: "$3M+", active_listings: 184, median_price: 4250000, median_dom: 62,
    avg_sale_to_list_pct: 96.8, off_market_share_pct: 34,
    insights: [
      "Off-market transactions account for roughly one-third of $3M+ closings in Austin.",
      "Waterfront and view-protected estates continue to command the strongest premiums.",
      "Buyer pools above $5M are increasingly driven by relocation from CA, NY, and IL.",
      "Sale-to-list ratios in the ultra-luxury tier remain near 97%, signaling disciplined pricing.",
    ],
  },
};

// ---------------------------------------------------------------------------
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get("action");
    const dataset = url.searchParams.get("dataset");

    // -------- Live action surface --------
    if (action) {
      const publicRead = await isPublicAction(action, url.searchParams);
      if (!publicRead) {
        const authHeader = req.headers.get("Authorization") ?? "";
        if (!authHeader.startsWith("Bearer ")) {
          return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }
        const backendUrl = Deno.env.get("SUPABASE_URL");
        const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
        if (!backendUrl || !anonKey) throw new Error("Missing backend configuration");
        const sb = createClient(backendUrl, anonKey, {
          global: { headers: { Authorization: authHeader } },
        });
        const { data: claims, error: claimsErr } = await sb.auth.getClaims(authHeader.slice(7));
        const uid = claims?.claims?.sub;
        if (claimsErr || !uid) {
          return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }
        const { data: isAdmin } = await sb.rpc("has_role", { _user_id: uid, _role: "admin" });
        if (!isAdmin) {
          return new Response(JSON.stringify({ error: "forbidden" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }
      }
      const result = action === "search-markets"
        ? await resolvePublicMarket(url.searchParams.get("q") || "")
        : await cachedAction(action, url.searchParams);
      return new Response(JSON.stringify(result.body), {
        status: result.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // -------- Legacy dataset surface (mock) --------
    if (dataset && dataset in MOCK_DATA) {
      const cacheKey = `dataset:${dataset}`;
      const TTL = 1000 * 60 * 60 * 24;
      const hit = cacheGet(cacheKey, TTL);
      const payload = hit?.payload ?? { ...(MOCK_DATA[dataset] as object), _source: "mock" };
      if (!hit) cacheSet(cacheKey, payload, 200, TTL);
      return new Response(JSON.stringify({
        dataset,
        data: payload,
        cached: !!hit,
        last_updated: new Date(hit?.at ?? Date.now()).toISOString(),
      }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": `public, max-age=${TTL / 1000}` },
      });
    }

    return new Response(
      JSON.stringify({
        error: "Provide either ?action=... or ?dataset=...",
        actions: ["me", "search-markets", "market-metrics"],
        datasets: Object.keys(MOCK_DATA),
      }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("agentintel-market-data error:", err);
    return new Response(JSON.stringify({ error: "internal_error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
