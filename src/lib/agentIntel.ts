// AgentIntel client service layer.
// All requests go through the `agentintel-market-data` edge function so the
// API key never reaches the browser. Includes a small in-memory cache to avoid
// duplicate fetches across components on the same page.

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

const CLIENT_TTL_MS = 1000 * 60 * 30; // 30 min in-tab cache
const memCache = new Map<string, { at: number; value: AgentIntelResponse }>();

export async function fetchAgentIntel<T = unknown>(
  dataset: AgentIntelDataset,
): Promise<AgentIntelResponse<T>> {
  const cached = memCache.get(dataset);
  if (cached && Date.now() - cached.at < CLIENT_TTL_MS) {
    return cached.value as AgentIntelResponse<T>;
  }

  const baseUrl = import.meta.env.VITE_SUPABASE_URL;
  const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  const url = `${baseUrl}/functions/v1/agentintel-market-data?dataset=${encodeURIComponent(dataset)}`;

  const res = await fetch(url, {
    headers: {
      apikey: publishableKey,
      Authorization: `Bearer ${publishableKey}`,
    },
  });

  if (!res.ok) throw new Error(`AgentIntel request failed (${res.status})`);

  const data = (await res.json()) as AgentIntelResponse<T>;
  memCache.set(dataset, { at: Date.now(), value: data });
  return data;
}

export function formatLastUpdated(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}
