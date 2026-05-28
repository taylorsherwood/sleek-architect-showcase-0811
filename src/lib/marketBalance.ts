// Buyer / Seller market balance scoring.
//
// Normalizes a handful of AgentIntel metrics into a single 0–100 score:
//   0   = strong buyer advantage
//   50  = balanced
//   100 = strong seller advantage
//
// Each contributing metric is scored independently on a 0–100 scale, then
// averaged across whichever metrics are available. Missing metrics are
// skipped (not penalized) so partial datasets still produce a usable read.

import type { MetricSeries } from "@/lib/agentIntel";

export type BalanceLabel = "Buyer's Market" | "Balanced Market" | "Seller's Market";

export interface MarketBalance {
  score: number;            // 0–100, seller-leaning at the top
  label: BalanceLabel;
  contributing: number;     // count of metrics that produced a sub-score
}

function clamp(n: number, lo = 0, hi = 100): number {
  return Math.max(lo, Math.min(hi, n));
}

/** Linear interpolation between two anchor points, then clamped to 0–100. */
function lerp(value: number, atZero: number, atHundred: number): number {
  if (atZero === atHundred) return 50;
  const t = (value - atZero) / (atHundred - atZero);
  return clamp(t * 100);
}

/** Convert one metric into a 0–100 seller-leaning sub-score. */
function subScore(key: string, v: number): number | null {
  switch (key) {
    case "months_of_inventory":
      // <2 mo → seller; 6+ mo → buyer.
      return lerp(v, 6, 2);
    case "median_days_on_market":
      // <14 days → seller; >90 → buyer.
      return lerp(v, 90, 14);
    case "sales_to_list_ratio":
      // 0.95 → buyer; 1.02 → seller. Accept either decimal or percent forms.
      return lerp(v > 5 ? v / 100 : v, 0.95, 1.02);
    case "sold_above_list_rate":
      // 0% → buyer; 50% → seller.
      return lerp(v > 1 ? v / 100 : v, 0, 0.5);
    case "contract_in_two_weeks_rate":
      // 0% → buyer; 60% → seller.
      return lerp(v > 1 ? v / 100 : v, 0, 0.6);
    case "price_drop_rate":
      // Inverse: 0% drops → seller; 40%+ → buyer.
      return lerp(v > 1 ? v / 100 : v, 0.4, 0);
    default:
      return null;
  }
}

function labelFor(score: number): BalanceLabel {
  if (score >= 62) return "Seller's Market";
  if (score <= 38) return "Buyer's Market";
  return "Balanced Market";
}

export function computeMarketBalance(
  metrics: Record<string, MetricSeries> | null | undefined,
): MarketBalance | null {
  if (!metrics) return null;
  const subs: number[] = [];
  for (const key of [
    "months_of_inventory",
    "median_days_on_market",
    "sales_to_list_ratio",
    "sold_above_list_rate",
    "contract_in_two_weeks_rate",
    "price_drop_rate",
  ]) {
    const v = metrics[key]?.latest;
    if (v == null || !Number.isFinite(v)) continue;
    const s = subScore(key, v);
    if (s != null) subs.push(s);
  }
  if (subs.length === 0) return null;
  const score = subs.reduce((a, b) => a + b, 0) / subs.length;
  return { score: Math.round(score), label: labelFor(score), contributing: subs.length };
}

/** Slug → AgentIntel market lookup. Falls back to Austin Metro for any
 *  community not explicitly mapped, and surfaces a `isProxy` flag when the
 *  resolved market is broader than the named community. */
const SLUG_MARKET: Record<string, { primary: string; fallback: string }> = {
  "westlake-hills": { primary: "West Austin", fallback: "Austin Metro" },
  "barton-creek": { primary: "Southwest Austin", fallback: "Austin Metro" },
  "tarrytown": { primary: "Central Austin", fallback: "Austin Metro" },
  "rollingwood": { primary: "West Austin", fallback: "Austin Metro" },
  "travis-heights": { primary: "South Austin", fallback: "Austin Metro" },
  "downtown": { primary: "Downtown Austin", fallback: "Austin Metro" },
  "dripping-springs": { primary: "Dripping Springs", fallback: "Austin Metro" },
  "texas-hill-country-estates": { primary: "Hill Country", fallback: "Austin Metro" },
  "zilker-austin": { primary: "South Austin", fallback: "Austin Metro" },
  "spanish-oaks": { primary: "Bee Cave", fallback: "Austin Metro" },
  "cat-mountain-northwest-hills": { primary: "Northwest Austin", fallback: "Austin Metro" },
  "lake-austin": { primary: "West Austin", fallback: "Austin Metro" },
  "clarksville": { primary: "Central Austin", fallback: "Austin Metro" },
  "lake-travis": { primary: "Lake Travis", fallback: "Austin Metro" },
  "mueller": { primary: "East Austin", fallback: "Austin Metro" },
  "hyde-park": { primary: "Central Austin", fallback: "Austin Metro" },
  "pemberton-heights": { primary: "Central Austin", fallback: "Austin Metro" },
  "bee-cave": { primary: "Bee Cave", fallback: "Austin Metro" },
  "great-hills": { primary: "Northwest Austin", fallback: "Austin Metro" },
  "balcones-park": { primary: "Northwest Austin", fallback: "Austin Metro" },
  "rob-roy": { primary: "West Austin", fallback: "Austin Metro" },
  "steiner-ranch": { primary: "West Austin", fallback: "Austin Metro" },
  "bryker-woods": { primary: "Central Austin", fallback: "Austin Metro" },
  "east-austin": { primary: "East Austin", fallback: "Austin Metro" },
  "old-enfield": { primary: "Central Austin", fallback: "Austin Metro" },
  "davenport-ranch": { primary: "West Austin", fallback: "Austin Metro" },
  "lakeway": { primary: "Lakeway", fallback: "Austin Metro" },
};

export function marketForSlug(slug: string): { primary: string; fallback: string } {
  return SLUG_MARKET[slug] ?? { primary: "Austin Metro", fallback: "Austin Metro" };
}
