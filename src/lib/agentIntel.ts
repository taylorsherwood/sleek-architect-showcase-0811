// AgentIntel client service layer.
//
// All requests go through the `agentintel-market-data` edge function so the
// API key never reaches the browser. Two surfaces exist:
//
//   • Live actions (testAgentIntelConnection, searchAgentIntelMarkets,
//     fetchMarketMetrics) — talk to the real AgentIntel v0 API.
//   • Legacy datasets (fetchAgentIntel) — mock data still consumed by older
//     market-intel components.
//
// Endpoint mapping and response normalization live in the edge function so
// React components stay decoupled from the upstream API shape.

const baseUrl = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const FN_URL = `${baseUrl}/functions/v1/agentintel-market-data`;

// ---------------------------------------------------------------------------
// Tiny in-memory cache (per tab). Avoids duplicate fetches across components.
// ---------------------------------------------------------------------------
interface CacheEntry { at: number; value: unknown }
const memCache = new Map<string, CacheEntry>();

async function callFn<T>(query: Record<string, string>, ttlMs: number): Promise<T> {
  const key = new URLSearchParams(query).toString();
  const cached = memCache.get(key);
  if (cached && Date.now() - cached.at < ttlMs) return cached.value as T;

  const url = `${FN_URL}?${key}`;
  const res = await fetch(url, {
    headers: { apikey: publishableKey, Authorization: `Bearer ${publishableKey}` },
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const code = (json && (json.error as string)) || `http_${res.status}`;
    throw new AgentIntelError(code, res.status);
  }
  memCache.set(key, { at: Date.now(), value: json });
  return json as T;
}

export class AgentIntelError extends Error {
  status: number;
  constructor(code: string, status: number) {
    super(code);
    this.status = status;
    this.name = "AgentIntelError";
  }
}

/** Translate an AgentIntelError into a public-safe message. */
export function publicErrorMessage(err: unknown): string {
  if (err instanceof AgentIntelError) {
    switch (err.message) {
      case "unauthorized": return "Market data service is temporarily unavailable.";
      case "not_found": return "We couldn't find data for that market yet.";
      case "invalid_request": return "That request couldn't be processed.";
      case "rate_limited": return "Market data is busy. Please try again shortly.";
      default: return "Market data is temporarily unavailable.";
    }
  }
  return "Market data is temporarily unavailable.";
}

// ---------------------------------------------------------------------------
// Live API surface
// ---------------------------------------------------------------------------
export interface AgentIntelMarket {
  uuid: string;
  name: string;
  type: string | null;
  state: string | null;
  region: string | null;
  raw: unknown;
}

export interface MetricSeries {
  latest: number | null;
  latest_date: string | null;
  latest_formatted: string | null;
  points: Array<{ date: string; value: number; formatted?: string }>;
}

export interface MarketMetricsResponse {
  metrics: Record<string, MetricSeries>;
  market: { name?: string; market_uuid?: string; type?: string } | null;
  attribution: string | null;
  last_updated: string;
}

export async function testAgentIntelConnection(): Promise<{ ok: boolean; account: unknown }> {
  return callFn({ action: "me" }, 30_000);
}

export async function searchAgentIntelMarkets(query: string): Promise<{ markets: AgentIntelMarket[] }> {
  return callFn({ action: "search-markets", q: query }, 1000 * 60 * 30);
}

export async function fetchMarketMetrics(
  marketUuid: string,
  metrics: string | string[] = "median_sales_price",
  duration: string = "1_month",
): Promise<MarketMetricsResponse> {
  const metricsStr = Array.isArray(metrics) ? metrics.join(",") : metrics;
  return callFn(
    { action: "market-metrics", market_uuid: marketUuid, metrics: metricsStr, duration },
    1000 * 60 * 60,
  );
}

/** Convenience: resolve a market name to a uuid + fetch metrics in one call. */
export async function fetchMetricsByMarketName(
  name: string,
  metrics: string | string[] = "median_sales_price",
  duration: string = "1_month",
): Promise<{ market: AgentIntelMarket | null; data: MarketMetricsResponse | null }> {
  const { markets } = await searchAgentIntelMarkets(name);
  const match =
    markets.find((m) => m.name.toLowerCase() === name.toLowerCase()) ?? markets[0] ?? null;
  if (!match) return { market: null, data: null };
  const data = await fetchMarketMetrics(match.uuid, metrics, duration);
  return { market: match, data };
}

// ---------------------------------------------------------------------------
// Legacy dataset surface (kept for existing components)
// ---------------------------------------------------------------------------
export type AgentIntelDataset =
  | "market-pulse"
  | "neighborhood-stats"
  | "inventory-trends"
  | "luxury-insights";

export interface AgentIntelResponse<T = unknown> {
  dataset: AgentIntelDataset;
  data: T;
  cached: boolean;
  last_updated: string;
}

const LEGACY_TTL_MS = 1000 * 60 * 30;

export async function fetchAgentIntel<T = unknown>(
  dataset: AgentIntelDataset,
): Promise<AgentIntelResponse<T>> {
  const key = `dataset=${dataset}`;
  const cached = memCache.get(key);
  if (cached && Date.now() - cached.at < LEGACY_TTL_MS) {
    return cached.value as AgentIntelResponse<T>;
  }
  const res = await fetch(`${FN_URL}?dataset=${encodeURIComponent(dataset)}`, {
    headers: { apikey: publishableKey, Authorization: `Bearer ${publishableKey}` },
  });
  if (!res.ok) throw new Error(`AgentIntel request failed (${res.status})`);
  const data = (await res.json()) as AgentIntelResponse<T>;
  memCache.set(key, { at: Date.now(), value: data });
  return data;
}

export function formatLastUpdated(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-US", {
      month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit",
    });
  } catch {
    return iso;
  }
}
