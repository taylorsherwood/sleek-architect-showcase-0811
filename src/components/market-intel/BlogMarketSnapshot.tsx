import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import {
  fetchMetricsByMarketName,
  type MarketMetricsResponse,
  type MetricSeries,
} from "@/lib/agentIntel";

const MarketBalanceGauge = lazy(() => import("./MarketBalanceGauge"));

/**
 * Editorial in-article market snapshot for luxury blog posts.
 *
 * Pulls live AgentIntel data for Austin Metro (with West Austin fallback).
 * Renders five metrics in a restrained, publication-style layout.
 * Hides the entire section gracefully if no live data is available.
 * No placeholders, no dashboard chrome, no bright colors.
 */

const NAVY = "#0C0F24";
const GOLD = "#b9a06c";

const METRIC_KEYS = [
  "median_sales_price",
  "months_of_inventory",
  "median_days_on_market",
  "sales_to_list_ratio",
  "price_drop_rate",
] as const;

type MetricKey = (typeof METRIC_KEYS)[number];

const METRIC_LABELS: Record<MetricKey, string> = {
  median_sales_price: "Median Luxury Sale Price",
  months_of_inventory: "Months of Inventory",
  median_days_on_market: "Median Days on Market",
  sales_to_list_ratio: "Sale-to-List Price Ratio",
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

/** Dynamic interpretation, capped at ~40 words. */
function buildInterpretation(series: Record<string, MetricSeries>): string {
  const inv = series.months_of_inventory?.latest;
  const stl = series.sales_to_list_ratio?.latest;
  const drops = series.price_drop_rate?.latest;

  if (inv == null) return "";

  if (inv >= 6) {
    return "Inventory remains elevated relative to historical norms across Austin's luxury submarkets, creating additional negotiating leverage for qualified buyers and demanding sharper pricing discipline from sellers.";
  }
  if (inv <= 3) {
    return "Luxury inventory remains constrained across several core submarkets, including Barton Creek, West Lake Hills, Tarrytown, and Lake Austin, supporting pricing power for well-positioned sellers and rewarding decisive buyers.";
  }
  if (drops != null && drops > 0.25) {
    return "Conditions sit in balanced territory, but a meaningful share of active listings has cut price, a signal that initial positioning, not market direction, is separating successful sales from stalled ones.";
  }
  if (stl != null && stl >= 0.97) {
    return "Conditions remain balanced across the luxury tier, with strategically positioned listings clearing close to list price while overpriced inventory continues to sit and re-cut.";
  }
  return "Conditions sit in balanced territory across Austin's luxury market, where strategic pricing, not aggressive list positioning, separates well-trafficked listings from those that quietly lose leverage.";
}

export const BlogMarketSnapshot = () => {
  const [data, setData] = useState<MarketMetricsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [loadedAt] = useState(() => new Date());

  useEffect(() => {
    let live = true;
    (async () => {
      try {
        let res = await fetchMetricsByMarketName("Austin", METRIC_KEYS as unknown as string[], "1_month");
        if ((!res.data || Object.keys(res.data.metrics ?? {}).length === 0)) {
          res = await fetchMetricsByMarketName("West Austin", METRIC_KEYS as unknown as string[], "1_month");
        }
        if (!live) return;
        if (!res.data || Object.keys(res.data.metrics ?? {}).length === 0) {
          setFailed(true);
        } else {
          setData(res.data);
        }
      } catch {
        if (live) setFailed(true);
      } finally {
        if (live) setLoading(false);
      }
    })();
    return () => {
      live = false;
    };
  }, []);

  const rendered = useMemo(() => {
    if (!data) return [];
    return METRIC_KEYS
      .map((k) => ({ key: k, label: METRIC_LABELS[k], value: formatMetric(k, data.metrics[k]) }))
      .filter((r) => r.value != null) as Array<{ key: MetricKey; label: string; value: string }>;
  }, [data]);

  // Loading: render an invisible reserve to avoid CLS, but no visible chrome.
  if (loading) {
    return <div aria-hidden className="my-14 md:my-20 min-h-[120px]" />;
  }

  // Hide gracefully when data is unavailable or too sparse to be meaningful.
  if (failed || !data || rendered.length < 3) return null;

  const periodLabel = formatPeriod(
    data.metrics.median_sales_price?.latest_date ??
      Object.values(data.metrics)[0]?.latest_date ??
      null,
  );
  const interpretation = buildInterpretation(data.metrics);

  return (
    <section
      className="my-14 md:my-20"
      aria-label="Austin Luxury Market Snapshot"
      style={{ color: NAVY }}
    >
      <div
        className="px-6 py-12 md:px-12 md:py-16"
        style={{ background: "#FAFAF8" }}
      >
        {/* Eyebrow + hairline */}
        <div className="text-center">
          <p
            className="text-[0.6rem] md:text-[0.62rem] tracking-[0.36em] uppercase"
            style={{ color: GOLD }}
          >
            Austin Luxury Market Snapshot
          </p>
          <div className="mx-auto mt-4 h-px w-12" style={{ background: `${GOLD}` }} />
          <p
            className="mt-5 max-w-2xl mx-auto font-light italic leading-[1.55] normal-case"
            style={{ fontSize: "clamp(0.95rem, 1.25vw, 1.1rem)", color: `${NAVY}cc` }}
          >
            Current conditions shaping pricing strategy across Austin's luxury market.
          </p>
          {periodLabel && (
            <p className="mt-3 text-[0.55rem] md:text-[0.6rem] tracking-[0.32em] uppercase text-muted-foreground/75 whitespace-pre-line">
              ADVISORY BRIEF · {periodLabel.toUpperCase()}{"\n\n"}
            </p>
          )}
        </div>

        {/* Buyer / Seller balance gauge */}
        <div className="mt-10 md:mt-14 max-w-4xl mx-auto [&_section]:!py-0 [&_section]:!bg-transparent [&_section_.container]:!px-0 [&_section_div>div>div]:!pt-0 [&_section_div>div>div]:!pb-0 [&_section_div>div>div]:!border-t-0">
          <Suspense fallback={<div className="min-h-[180px]" />}>
            <MarketBalanceGauge
              communityName="Austin Metro Residential $2M+"
              marketName="Austin Metro"
              fallbackMarketName="West Austin"
              eyebrow={"\n\nAUSTIN METRO RESIDENTIAL · $2M+ · BUYER / SELLER BALANCE"}
              hideLastUpdated
            />
          </Suspense>
        </div>

        {/* Metric ledger */}
        <dl className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 max-w-5xl mx-auto">
          {rendered.map((m, i) => (
            <div
              key={m.key}
              className={`flex flex-col items-center justify-start text-center py-6 lg:py-2 px-4 ${
                i > 0 ? "border-t sm:border-t-0 sm:border-l" : ""
              } ${i % 2 === 0 ? "sm:border-l-0 lg:border-l" : ""} ${
                i === 0 ? "lg:border-l-0" : ""
              }`}
              style={{ borderColor: `${NAVY}1f` }}
            >
              <dt
                className="text-[0.55rem] md:text-[0.6rem] tracking-[0.28em] uppercase leading-[1.5] flex items-start justify-center min-h-[3em] md:min-h-[3.2em]"
                style={{ color: `${NAVY}99` }}
              >
                <span className="block max-w-[14ch]">{m.label}</span>
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
            </div>
          ))}
        </dl>

        {/* Interpretation */}
        {interpretation && (
          <figure className="mt-10 md:mt-14 max-w-2xl mx-auto text-center">
            <div className="mx-auto h-px w-16 mb-6" style={{ background: `${NAVY}22` }} />
            <blockquote
              className="font-light leading-[1.65] normal-case"
              style={{
                color: `${NAVY}d9`,
                fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
                textTransform: "none",
              }}
            >
              {interpretation}
            </blockquote>
          </figure>
        )}

        {/* Colophon */}
        <p
          className="mt-10 md:mt-14 text-center text-[0.55rem] md:text-[0.6rem] tracking-[0.32em] uppercase"
          style={{ color: `${NAVY}80` }}
        >
          Source · AgentIntel Market Intelligence
        </p>
        <p
          className="mt-4 text-center text-[0.55rem] md:text-[0.6rem] tracking-[0.32em] uppercase"
          style={{ color: `${NAVY}66` }}
        >
          LAST UPDATED {loadedAt.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
          }).toUpperCase()}
        </p>
      </div>
    </section>
  );
};

export default BlogMarketSnapshot;
