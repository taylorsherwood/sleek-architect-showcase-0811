import { useEffect, useState } from "react";
import { fetchMetricsByMarketName, type MarketMetricsResponse } from "@/lib/agentIntel";
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

function advisoryCopy(b: MarketBalance, community: string): string {
  if (b.label === "Seller's Market") {
    return `Current ${community} conditions favor well-prepared sellers. Pricing discipline, presentation quality, and quiet positioning matter more than broad exposure.`;
  }
  if (b.label === "Buyer's Market") {
    return `Conditions in ${community} have widened in favor of patient buyers. Negotiation leverage, contingency posture, and timing are doing more of the work than headline pricing.`;
  }
  return `${community} is trading near balance. Pricing strategy and property-level presentation now matter more than the direction of the broader market.`;
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
  const isProxy = !!resolvedMarket &&
    resolvedMarket.toLowerCase() !== communityName.toLowerCase();

  return (
    <section
      className="py-12 md:py-16"
      style={{ backgroundColor: "#FAFAF8" }}
      aria-label={`${communityName} buyer seller market gauge`}
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
              {eyebrow ?? `${communityName} · Market Balance`}
            </p>
            <h3
              className="font-display text-2xl md:text-3xl font-normal mb-8"
              style={{ color: NAVY }}
            >
              Buyer / Seller Conditions
            </h3>

            {loading && (
              <p className="text-sm font-sans" style={{ color: `${NAVY}99` }}>
                Reading current market signals…
              </p>
            )}

            {!loading && (error || !balance) && (
              <p className="text-sm font-sans" style={{ color: `${NAVY}99` }}>
                Live balance metrics are temporarily unavailable for this submarket.
                Our advisors maintain a current private read on {communityName}.
              </p>
            )}

            {!loading && balance && (
              <>
                <Gauge score={balance.score} label={balance.label} />

                <div className="mt-6 flex items-baseline justify-between gap-4">
                  <div>
                    <p
                      className="font-display text-xl md:text-2xl"
                      style={{ color: NAVY }}
                    >
                      {balance.label}
                    </p>
                  </div>
                  <p
                    className="text-[11px] tracking-[0.18em] uppercase font-sans"
                    style={{ color: `${NAVY}80` }}
                  >
                    Balance Index {balance.score} / 100
                  </p>
                </div>

                <p
                  className="mt-5 font-sans text-[15px] leading-relaxed"
                  style={{ color: `${NAVY}cc` }}
                >
                  {advisoryCopy(balance, communityName)}
                </p>

                {isProxy && resolvedMarket && (
                  <p
                    className="mt-4 text-[11px] tracking-[0.16em] uppercase font-sans"
                    style={{ color: `${NAVY}66` }}
                  >
                    Regional proxy · {resolvedMarket} area context
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Gauge({ score, label }: { score: number; label: string }) {
  const pct = Math.max(0, Math.min(100, score));
  return (
    <div className="relative">
      {/* Tri-zone track */}
      <div
        className="relative h-[6px] rounded-full overflow-hidden"
        style={{ backgroundColor: `${NAVY}10` }}
        role="img"
        aria-label={`Market balance ${score} of 100, ${label}`}
      >
        <div
          className="absolute inset-y-0 left-0"
          style={{ width: "38%", backgroundColor: `${NAVY}1f` }}
        />
        <div
          className="absolute inset-y-0"
          style={{ left: "38%", width: "24%", backgroundColor: `${GOLD}40` }}
        />
        <div
          className="absolute inset-y-0"
          style={{ left: "62%", right: 0, backgroundColor: `${NAVY}33` }}
        />
      </div>

      {/* Indicator */}
      <div
        className="absolute -translate-x-1/2"
        style={{ left: `${pct}%`, top: "-7px" }}
      >
        <div
          className="w-[2px] h-5"
          style={{ backgroundColor: GOLD }}
        />
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-[3px] w-[10px] h-[10px] rounded-full"
          style={{ backgroundColor: GOLD, boxShadow: `0 0 0 3px #FAFAF8` }}
        />
      </div>

      {/* Endpoint labels */}
      <div className="mt-4 flex justify-between text-[10px] tracking-[0.22em] uppercase font-sans"
           style={{ color: `${NAVY}80` }}>
        <span>Buyer&rsquo;s Market</span>
        <span>Balanced</span>
        <span>Seller&rsquo;s Market</span>
      </div>
    </div>
  );
}
