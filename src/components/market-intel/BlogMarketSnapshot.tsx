import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import {
  fetchMetricsByMarketName,
  type MarketMetricsResponse,
  type MetricSeries,
} from "@/lib/agentIntel";

const MarketBalanceGauge = lazy(() => import("./MarketBalanceGauge"));

/**
 * Editorial in-article market snapshot for the Austin luxury ($2M+) segment.
 *
 * Data sourcing order:
 *   1. Live AgentIntel pull restricted to the $2M+ segment markets.
 *   2. If unavailable, manually curated values from LUXURY_SNAPSHOT_OVERRIDES
 *      (edit those constants to publish updated numbers without touching the
 *      article content).
 *   3. If neither is available for a given metric, that metric is hidden.
 *
 * The component will not render at all unless at least three $2M+ metrics
 * are available — we never display generic Austin Metro numbers here.
 */

const NAVY = "#0C0F24";
const GOLD = "#b9a06c";

// ---------------------------------------------------------------------------
// Editable luxury-segment overrides (CMS-style)
// ---------------------------------------------------------------------------
// Set any of the following to a string to publish a curated value for the
// $2M+ segment. Leave as `null` to defer to live data (and hide the metric
// if live data is also unavailable). These are the only values shown in the
// snapshot; nothing here pulls from the generic Austin Metro feed.
const LUXURY_SNAPSHOT_OVERRIDES: Record<MetricKey, string | null> = {
  median_sales_price: null,
  months_of_inventory: null,
  median_days_on_market: null,
  sales_to_list_ratio: null,
  cash_share: null,
  price_drop_rate: null,
};

// Optional period label override (e.g. "May 2026"). Null = derive from live data.
const LUXURY_SNAPSHOT_PERIOD_OVERRIDE: string | null = null;

// Market names tried, in order, when pulling live data. These must be
// $2M+ segment markets in AgentIntel — never substitute with all-price-tier data.
const LUXURY_MARKET_NAMES = [
  "Austin Metro Residential $2M+",
  "West Austin Residential $2M+",
  "Austin Luxury $2M+",
] as const;

const METRIC_KEYS = [
  "median_sales_price",
  "months_of_inventory",
  "median_days_on_market",
  "sales_to_list_ratio",
  "cash_share",
  "price_drop_rate",
] as const;

type MetricKey = (typeof METRIC_KEYS)[number];

const METRIC_LABELS: Record<MetricKey, string> = {
  median_sales_price: "Median Sale Price",
  months_of_inventory: "Months of Inventory",
  median_days_on_market: "Average Days on Market",
  sales_to_list_ratio: "Sale-to-List Price Ratio",
  cash_share: "Cash Transactions",
  price_drop_rate: "Active Listings With Price Reductions",
};

function formatMetric(key: MetricKey, s: MetricSeries | undefined): string | null {
  if (!s || s.latest == null || !Number.isFinite(s.latest)) return null;
  if (s.latest_formatted) return s.latest_formatted;
  const v = s.latest;
  switch (key) {
    case "median_sales_price":
      return `$${Math.round(v).toLocaleString()}`;
    case "months_of_inventory":
      return v.toFixed(1);
    case "median_days_on_market":
      return `${Math.round(v)}`;
    case "sales_to_list_ratio":
    case "cash_share":
    case "price_drop_rate":
      return `${(v * 100).toFixed(1)}%`;
  }
}

function formatPeriod(iso: string | null): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-US", { month: "long", year: "numeric" });
  } catch {
    return iso;
  }
}

export const BlogMarketSnapshot = () => {
  const [data, setData] = useState<MarketMetricsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let live = true;
    (async () => {
      try {
        for (const name of LUXURY_MARKET_NAMES) {
          const res = await fetchMetricsByMarketName(
            name,
            METRIC_KEYS as unknown as string[],
            "1_month",
          );
          if (res.data && Object.keys(res.data.metrics ?? {}).length > 0) {
            if (live) setData(res.data);
            return;
          }
        }
      } catch {
        /* swallow — fall back to overrides */
      } finally {
        if (live) setLoading(false);
      }
    })();
    return () => {
      live = false;
    };
  }, []);

  const rendered = useMemo(() => {
    return METRIC_KEYS.map((k) => {
      const override = LUXURY_SNAPSHOT_OVERRIDES[k];
      const liveValue = data ? formatMetric(k, data.metrics?.[k]) : null;
      const value = override ?? liveValue;
      return value ? { key: k, label: METRIC_LABELS[k], value } : null;
    }).filter(Boolean) as Array<{ key: MetricKey; label: string; value: string }>;
  }, [data]);

  // Loading reserve to prevent CLS — no visible chrome.
  if (loading) {
    return <div aria-hidden className="my-14 md:my-20 min-h-[120px]" />;
  }

  // Hide entirely if we cannot show a credible $2M+ snapshot.
  if (rendered.length < 3) return null;

  const periodLabel =
    LUXURY_SNAPSHOT_PERIOD_OVERRIDE ??
    formatPeriod(
      data?.metrics?.median_sales_price?.latest_date ??
        Object.values(data?.metrics ?? {})[0]?.latest_date ??
        null,
    );

  return (
    <section
      className="my-14 md:my-20"
      aria-label="Austin Luxury Market Snapshot — $2M+"
      style={{ color: NAVY }}
    >
      <div
        className="px-6 py-12 md:px-12 md:py-16 bg-white"
        style={{ border: `1px solid ${GOLD}` }}
      >
        {/* Eyebrow + hairline */}
        <div className="text-center">
          <p
            className="text-[0.6rem] md:text-[0.62rem] tracking-[0.36em] uppercase"
            style={{ color: GOLD }}
          >
            Austin Luxury Market Snapshot · $2M+
          </p>
          <div className="mx-auto mt-4 h-px w-12" style={{ background: GOLD }} />
          <p
            className="mt-5 max-w-2xl mx-auto font-light italic leading-[1.55] normal-case"
            style={{ fontSize: "clamp(0.95rem, 1.25vw, 1.1rem)", color: `${NAVY}cc` }}
          >
            All figures below reflect the $2M+ segment of Austin's residential market.
          </p>
        </div>

        {/* Buyer / Seller balance gauge (already scoped to $2M+) */}
        <div className="mt-10 md:mt-14 max-w-4xl mx-auto [&_section]:!py-0 [&_section]:!bg-transparent [&_section_.container]:!px-0 [&_section_div>div>div]:!pt-0 [&_section_div>div>div]:!pb-0 [&_section_div>div>div]:!border-t-0">
          <Suspense fallback={<div className="min-h-[180px]" />}>
            <MarketBalanceGauge
              communityName="Austin Metro Residential $2M+"
              marketName="Austin Metro Residential $2M+"
              fallbackMarketName="West Austin Residential $2M+"
              eyebrow={"\n\nAUSTIN METRO RESIDENTIAL · $2M+ · BUYER / SELLER BALANCE IN REAL TIME"}
              hideLastUpdated
            />
          </Suspense>
        </div>

        {/* Metric ledger */}
        <dl className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {rendered.map((m, i) => (
            <div
              key={m.key}
              className="flex flex-col items-center justify-start text-center py-8 px-4 border-t sm:[&:nth-child(-n+2)]:border-t-0 lg:[&:nth-child(-n+3)]:border-t-0 sm:border-l sm:[&:nth-child(odd)]:border-l-0 lg:[&:nth-child(3n+1)]:border-l-0 lg:[&:nth-child(odd)]:border-l"
              style={{ borderColor: `${NAVY}1f` }}
            >
              <dt
                className="text-[0.55rem] md:text-[0.6rem] tracking-[0.28em] uppercase leading-[1.5]"
                style={{ color: `${NAVY}99` }}
              >
                {m.label}
              </dt>
              <dd
                className="font-display font-light leading-none mt-4"
                style={{
                  color: NAVY,
                  fontSize: "clamp(1.4rem, 3.2vw, 2rem)",
                  fontFeatureSettings: '"lnum", "tnum"',
                }}
              >
                {m.value}
              </dd>
              <p
                className="mt-3 text-[0.5rem] tracking-[0.3em] uppercase"
                style={{ color: `${NAVY}66` }}
              >
                $2M+ Market
              </p>
            </div>
          ))}
        </dl>

        {/* Colophon */}
        <p
          className="mt-10 md:mt-14 text-center text-[0.55rem] md:text-[0.6rem] tracking-[0.32em] uppercase"
          style={{ color: `${NAVY}80` }}
        >
          Source · AgentIntel Market Intelligence{periodLabel ? ` · ${periodLabel}` : ""}
        </p>
      </div>
    </section>
  );
};

export default BlogMarketSnapshot;
