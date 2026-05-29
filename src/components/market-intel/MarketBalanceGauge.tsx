import { useEffect, useState } from "react";
import { fetchMetricsByMarketName, type MarketMetricsResponse, type MetricSeries } from "@/lib/agentIntel";
import { computeMarketBalance, marketForSlug, type MarketBalance } from "@/lib/marketBalance";

interface Props {
  /** Display name for the community (e.g. "Barton Creek"). */
  communityName: string;
  /** Optional community slug; used to look up the AgentIntel market mapping. */
  slug?: string;
  /** Explicit AgentIntel market name override. */
  marketName?: string;
  /** Optional fallback market name when the primary lookup fails. */
  fallbackMarketName?: string;
  /** Optional pre-resolved AgentIntel market UUID. */
  marketUuid?: string;
  /** Optional eyebrow override. */
  eyebrow?: string;
}

const NAVY = "#0C0F24";
const GOLD = "#b9a06c";

const SUPPORTING_METRICS = [
  "months_of_inventory",
  "median_days_on_market",
  "sales_to_list_ratio",
  "sold_above_list_rate",
  "contract_in_two_weeks_rate",
  "price_drop_rate",
];

type PositionTier =
  | "strong-buyer"
  | "moderate-buyer"
  | "balanced"
  | "moderate-seller"
  | "strong-seller";

function tierForScore(score: number): PositionTier {
  if (score <= 20) return "strong-buyer";
  if (score <= 40) return "moderate-buyer";
  if (score < 60) return "balanced";
  if (score < 80) return "moderate-seller";
  return "strong-seller";
}

const TIER_LABEL: Record<PositionTier, string> = {
  "strong-buyer": "Strong Buyer Advantage",
  "moderate-buyer": "Moderate Buyer Advantage",
  "balanced": "Balanced Market",
  "moderate-seller": "Moderate Seller Advantage",
  "strong-seller": "Strong Seller Advantage",
};

function interpretation(tier: PositionTier): string {
  switch (tier) {
    case "strong-buyer":
      return "Conditions strongly favor buyers, with meaningful negotiating room.";
    case "moderate-buyer":
      return "Conditions currently favor patient buyers.";
    case "balanced":
      return "Market conditions remain balanced with moderate negotiating flexibility.";
    case "moderate-seller":
      return "Limited inventory continues to support sellers.";
    case "strong-seller":
      return "Tight inventory and active demand firmly favor sellers.";
  }
}

// ---------------------------------------------------------------------------
// Supporting signals — each returns null when the underlying metric is missing
// so the UI can gracefully omit it.
// ---------------------------------------------------------------------------
type SignalLevel = "low" | "moderate" | "elevated" | "soft" | "neutral" | "firm" | "tight" | "balanced" | "high";

interface Signal { label: string; value: string }

function normalizeRate(v: number | null | undefined): number | null {
  if (v == null || !Number.isFinite(v)) return null;
  return v > 1 ? v / 100 : v;
}

function signalsFrom(metrics: Record<string, MetricSeries> | null | undefined): Signal[] {
  if (!metrics) return [];
  const out: Signal[] = [];

  // Negotiation Leverage — derived from sales-to-list and price-drop rate.
  const stl = metrics["sales_to_list_ratio"]?.latest;
  const drops = normalizeRate(metrics["price_drop_rate"]?.latest);
  if (stl != null || drops != null) {
    const stlNorm = stl != null ? (stl > 5 ? stl / 100 : stl) : null;
    // Higher leverage for buyers when stl below 1.0 and drops elevated.
    let leverage: "Low" | "Moderate" | "High" = "Moderate";
    if (stlNorm != null) {
      if (stlNorm >= 1.0 && (drops == null || drops < 0.15)) leverage = "Low";
      else if (stlNorm < 0.97 || (drops != null && drops > 0.3)) leverage = "High";
    } else if (drops != null) {
      if (drops > 0.3) leverage = "High";
      else if (drops < 0.1) leverage = "Low";
    }
    out.push({ label: "Buyer Negotiation Leverage", value: leverage });
  }

  // Inventory Conditions — months of inventory.
  const moi = metrics["months_of_inventory"]?.latest;
  if (moi != null && Number.isFinite(moi)) {
    let v: string;
    if (moi < 3) v = "Tight";
    else if (moi <= 5) v = "Balanced";
    else v = "Elevated";
    out.push({ label: "Inventory Conditions", value: v });
  }

  // Buyer Competition — contract-in-two-weeks + sold above list.
  const fast = normalizeRate(metrics["contract_in_two_weeks_rate"]?.latest);
  const above = normalizeRate(metrics["sold_above_list_rate"]?.latest);
  if (fast != null || above != null) {
    const a = above ?? 0;
    const f = fast ?? 0;
    const score = a * 0.6 + f * 0.4;
    let v: string;
    if (score >= 0.35) v = "High";
    else if (score >= 0.18) v = "Moderate";
    else v = "Low";
    out.push({ label: "Buyer Competition", value: v });
  }

  // Pricing Pressure — price drop rate (inverse).
  if (drops != null) {
    let v: string;
    if (drops >= 0.3) v = "Soft";
    else if (drops >= 0.12) v = "Neutral";
    else v = "Firm";
    out.push({ label: "Pricing Pressure", value: v });
  }


  return out;
}

export default function MarketBalanceGauge({
  communityName,
  slug,
  marketName,
  fallbackMarketName,
  marketUuid: _marketUuid,
  eyebrow,
}: Props) {
  const [data, setData] = useState<MarketMetricsResponse | null>(null);
  const [resolvedMarket, setResolvedMarket] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadedAt] = useState(() => new Date());
  const [error, setError] = useState<string | null>(null);

  const mapping = slug ? marketForSlug(slug) : null;
  const primaryName = marketName ?? mapping?.primary ?? "Austin Metro";
  const fallbackName = fallbackMarketName ?? mapping?.fallback ?? "Austin Metro";

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    (async () => {
      try {
        let res = await fetchMetricsByMarketName(primaryName, SUPPORTING_METRICS, "1_month");
        if ((!res.data || !res.market) && fallbackName && fallbackName !== primaryName) {
          res = await fetchMetricsByMarketName(fallbackName, SUPPORTING_METRICS, "1_month");
        }
        if (cancelled) return;
        setData(res.data);
        setResolvedMarket(res.market?.name ?? null);
      } catch (e) {
        if (!cancelled) setError("Market data temporarily unavailable.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [primaryName, fallbackName]);

  const balance = computeMarketBalance(data?.metrics);
  const tier: PositionTier | null = balance ? tierForScore(balance.score) : null;
  const signals = signalsFrom(data?.metrics);
  const isProxy = !!resolvedMarket &&
    resolvedMarket.toLowerCase() !== communityName.toLowerCase();

  return (
    <section
      className="py-12 md:py-16"
      style={{ backgroundColor: "#FAFAF8" }}
      aria-label={`${communityName} market conditions`}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div
            className="pt-8 md:pt-10 pb-8 md:pb-10"
            style={{ borderTop: `1px solid ${GOLD}33` }}
          >
            <p
              className="text-[11px] tracking-[0.22em] uppercase font-sans mb-3"
              style={{ color: GOLD }}
            >
              {eyebrow ?? `${communityName} · Market Intelligence`}
            </p>
            <h3
              className="font-display text-2xl md:text-3xl font-normal mb-8"
              style={{ color: NAVY }}
            >
              Market Conditions
            </h3>

            {loading && (
              <p className="text-sm font-sans" style={{ color: `${NAVY}99` }}>
                Reading current market signals…
              </p>
            )}

            {!loading && (error || !balance || !tier) && (
              <p className="text-sm font-sans" style={{ color: `${NAVY}99` }}>
                Live market conditions are temporarily unavailable for this
                submarket. Our advisors maintain a current private read on{" "}
                {communityName}.
              </p>
            )}

            {!loading && balance && tier && (
              <>
                {/* Primary positioning headline */}
                <p
                  className="font-display text-2xl md:text-[28px] leading-tight mb-6"
                  style={{ color: NAVY }}
                >
                  {TIER_LABEL[tier]}
                </p>

                {/* Spectrum */}
                <Spectrum score={balance.score} />

                {/* Plain-English interpretation */}
                <p
                  className="mt-6 font-sans text-[15px] leading-relaxed"
                  style={{ color: `${NAVY}cc` }}
                >
                  {interpretation(tier)}
                </p>

                {/* Supporting signals */}
                {signals.length > 0 && (
                  <dl
                    className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3"
                  >
                    {signals.map((s) => (
                      <div
                        key={s.label}
                        className="flex items-baseline justify-between gap-4 pb-2.5"
                        style={{ borderBottom: `1px solid ${NAVY}14` }}
                      >
                        <dt
                          className="text-[11px] tracking-[0.18em] uppercase font-sans"
                          style={{ color: `${NAVY}80` }}
                        >
                          {s.label}
                        </dt>
                        <dd
                          className="font-display text-[15px]"
                          style={{ color: NAVY }}
                        >
                          {s.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}

                {/* Credibility note */}
                <p
                  className="mt-6 text-[11px] tracking-[0.22em] uppercase font-sans"
                  style={{ color: `${NAVY}66` }}
                >
                  Last Updated {loadedAt.toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Spectrum({ score }: { score: number }) {
  const pct = Math.max(0, Math.min(100, score));
  return (
    <div className="relative pt-2">
      {/* Tri-zone track */}
      <div
        className="relative h-[6px] rounded-full overflow-hidden"
        style={{ backgroundColor: `${NAVY}10` }}
        role="img"
        aria-label={`Market position: ${score} on a buyer-to-seller spectrum`}
      >
        <div
          className="absolute inset-y-0 left-0"
          style={{ width: "40%", backgroundColor: `${NAVY}1f` }}
        />
        <div
          className="absolute inset-y-0"
          style={{ left: "40%", width: "20%", backgroundColor: `${GOLD}40` }}
        />
        <div
          className="absolute inset-y-0"
          style={{ left: "60%", right: 0, backgroundColor: `${NAVY}33` }}
        />
      </div>

      {/* Indicator */}
      <div
        className="absolute -translate-x-1/2 motion-safe:transition-[left] motion-safe:duration-[900ms] motion-safe:ease-[cubic-bezier(0.22,0.61,0.36,1)]"
        style={{ left: `${pct}%`, top: "1px" }}
      >
        <div
          className="gauge-dot-pulse absolute left-1/2 -translate-x-1/2 -top-[5px] w-[14px] h-[14px] rounded-full"
          style={{ backgroundColor: GOLD, boxShadow: `0 0 0 3px #FAFAF8` }}
        />
      </div>

      {/* Endpoint labels */}
      <div
        className="mt-4 flex justify-between text-[10px] tracking-[0.22em] uppercase font-sans"
        style={{ color: `${NAVY}80` }}
      >
        <span>Buyer Advantage</span>
        <span>Balanced</span>
        <span>Seller Advantage</span>
      </div>
    </div>
  );
}
