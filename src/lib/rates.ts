// Rates client. Talks to the `rates-affordability` edge function which proxies
// FRED's MORTGAGE30US (30-year fixed rate mortgage average). Used by the
// Rates + Affordability Context module on /market-intelligence.

const baseUrl = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const FN_URL = `${baseUrl}/functions/v1/rates-affordability`;

export interface MortgageRateSeries {
  latest: number | null;
  latest_date: string | null;
  points: Array<{ date: string; value: number }>;
  source: string;
  attribution: string;
  last_fetched: string;
}

let memo: { at: number; value: MortgageRateSeries } | null = null;
const TTL_MS = 1000 * 60 * 60; // 1h client-side

export async function fetchMortgageRate(): Promise<MortgageRateSeries> {
  if (memo && Date.now() - memo.at < TTL_MS) return memo.value;
  const res = await fetch(FN_URL, {
    headers: { apikey: publishableKey, Authorization: `Bearer ${publishableKey}` },
  });
  if (!res.ok) throw new Error(`rates_http_${res.status}`);
  const json = (await res.json()) as MortgageRateSeries;
  memo = { at: Date.now(), value: json };
  return json;
}

/** Monthly P&I given principal, annual rate (as percent, e.g. 6.8), term in years. */
export function monthlyPayment(principal: number, annualRatePct: number, years = 30): number {
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}
