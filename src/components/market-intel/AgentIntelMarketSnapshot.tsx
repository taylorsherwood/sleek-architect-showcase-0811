import { useEffect, useMemo, useState } from "react";
import {
  fetchMarketMetrics,
  fetchMetricsByMarketName,
  publicErrorMessage,
  type AgentIntelMarket,
  type MarketMetricsResponse,
  type MetricSeries,
} from "@/lib/agentIntel";

type Variant = "editorial" | "compact";

interface Props {
  marketUuid?: string;
  marketName?: string;
  /** Hero metric. Defaults to median_sales_price. */
  heroMetric?: string;
  /** Up to 3 supporting metrics. */
  supportingMetrics?: string[];
  /** Period token (1_month, 3_months, 12_months, etc.). */
  duration?: string;
  /** Editorial = narrative-led with sparkline (default). Compact = inline strip. */
  variant?: Variant;
  eyebrow?: string;
  title?: string;
  /** Optional advisor commentary appended after the auto-generated headline. */
  commentary?: string;
}

const NAVY = "#0C0F24";
const GOLD = "#b9a06c";

const DEFAULT_HERO = "median_sales_price";
const DEFAULT_SUPPORTING = ["median_days_on_market", "months_of_inventory", "sales_to_list_ratio"];

const METRIC_META: Record<string, { label: string; format: "money" | "number" | "decimal" | "days" | "percent" }> = {
  median_sales_price: { label: "Median Sales Price", format: "money" },
  median_list_price: { label: "Median List Price", format: "money" },
  median_sales_ppsf: { label: "Median $ / Sq Ft", format: "money" },
  median_list_ppsf: { label: "List $ / Sq Ft", format: "money" },
  median_days_on_market: { label: "Days on Market", format: "days" },
  months_of_inventory: { label: "Months of Inventory", format: "decimal" },
  sold_count: { label: "Homes Sold", format: "number" },
  new_listings_count: { label: "New Listings", format: "number" },
  active_listings_count: { label: "Active Listings", format: "number" },
  pending_listings_count: { label: "Pending", format: "number" },
  sales_to_list_ratio: { label: "Sale-to-List", format: "percent" },
  sold_above_list_rate: { label: "Sold Above List", format: "percent" },
  price_drop_rate: { label: "Price Drop Rate", format: "percent" },
  appreciation: { label: "Appreciation YoY", format: "percent" },
};

function formatValue(key: string, v: number | null, formatted?: string | null): string {
  if (formatted) return formatted;
  if (v == null || !Number.isFinite(v)) return "—";
  switch (METRIC_META[key]?.format) {
    case "money": return `$${Math.round(v).toLocaleString()}`;
    case "days": return `${Math.round(v)}`;
    case "decimal": return v.toFixed(1);
    case "percent": return `${(v * 100).toFixed(1)}%`;
    default: return Math.round(v).toLocaleString();
  }
}

function prettyLabel(key: string): string {
  return METRIC_META[key]?.label ?? key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatPeriod(iso: string | null): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-US", { month: "long", year: "numeric" });
  } catch { return iso; }
}

/** Build a single editorial sentence from the hero series + supporting context. */
function buildNarrative(
  marketLabel: string,
  hero: MetricSeries | undefined,
  heroKey: string,
  inv: MetricSeries | undefined,
  dom: MetricSeries | undefined,
): string {
  if (!hero?.points?.length) return "";
  const pts = hero.points;
  const latest = pts[pts.length - 1];
  const prior = pts.length >= 13 ? pts[pts.length - 13] : pts[0];
  const delta = prior?.value ? (latest.value - prior.value) / prior.value : 0;
  const dir = delta > 0.005 ? "appreciating" : delta < -0.005 ? "easing" : "holding steady";
  const pct = Math.abs(delta * 100).toFixed(1);
  const heroLabel = METRIC_META[heroKey]?.label?.toLowerCase() ?? "pricing";

  const invLatest = inv?.latest;
  const supplyClause =
    invLatest != null
      ? invLatest < 3
        ? " against tight supply"
        : invLatest > 6
          ? " as inventory expands"
          : " with balanced inventory"
      : "";

  const domLatest = dom?.latest;
  const paceClause =
    domLatest != null
      ? domLatest < 30
        ? "; homes are trading quickly"
        : domLatest > 75
          ? "; properties are taking longer to sell"
          : ""
      : "";

  return `${marketLabel}'s ${heroLabel} is ${dir} ${pct}% year-over-year${supplyClause}${paceClause}.`;
}

/** Minimal gold hairline sparkline. Last 12 observations. */
function Sparkline({ points }: { points: Array<{ value: number }> }) {
  const series = points.slice(-12);
  if (series.length < 2) return null;
  const w = 320, h = 56, pad = 2;
  const vals = series.map((p) => p.value);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const range = max - min || 1;
  const step = (w - pad * 2) / (series.length - 1);
  const d = series
    .map((p, i) => {
      const x = pad + i * step;
      const y = h - pad - ((p.value - min) / range) * (h - pad * 2);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-12 md:h-14 mt-6" preserveAspectRatio="none" aria-hidden>
      <path d={d} fill="none" stroke={GOLD} strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const AgentIntelMarketSnapshot = ({
  marketUuid,
  marketName,
  heroMetric = DEFAULT_HERO,
  supportingMetrics = DEFAULT_SUPPORTING,
  duration = "1_month",
  variant = "editorial",
  eyebrow = "Market Intelligence",
  title,
  commentary,
}: Props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<MarketMetricsResponse | null>(null);
  const [market, setMarket] = useState<AgentIntelMarket | null>(null);

  const requested = useMemo(
    () => Array.from(new Set([heroMetric, ...supportingMetrics, "months_of_inventory", "median_days_on_market"])),
    [heroMetric, supportingMetrics],
  );

  useEffect(() => {
    let live = true;
    setLoading(true);
    setError(null);
    (async () => {
      try {
        if (marketUuid) {
          const res = await fetchMarketMetrics(marketUuid, requested, duration);
          if (!live) return;
          setData(res);
        } else if (marketName) {
          const { market: m, data: res } = await fetchMetricsByMarketName(marketName, requested, duration);
          if (!live) return;
          setMarket(m);
          setData(res);
          if (!m) setError("Market intelligence for this area is being curated.");
        } else {
          setError("No market specified.");
        }
      } catch (e) {
        if (live) setError(publicErrorMessage(e));
      } finally {
        if (live) setLoading(false);
      }
    })();
    return () => { live = false; };
  }, [marketUuid, marketName, duration, requested.join(",")]);

  const series = data?.metrics ?? {};
  const hero = series[heroMetric];
  const displayTitle = title ?? market?.name ?? marketName ?? "Market Snapshot";
  const periodLabel = formatPeriod(hero?.latest_date ?? null);

  const narrative = useMemo(
    () => (data ? buildNarrative(displayTitle, hero, heroMetric, series.months_of_inventory, series.median_days_on_market) : ""),
    [data, displayTitle, hero, heroMetric, series],
  );

  // ---------------- Compact variant (sidebars, inline strips) ----------------
  if (variant === "compact") {
    return (
      <aside className="bg-[#FAFAF8] py-6 md:py-8 px-6 md:px-8">
        <p className="text-[0.6rem] tracking-[0.28em] uppercase mb-2" style={{ color: GOLD }}>
          {eyebrow}
        </p>
        <p className="font-display text-base md:text-lg" style={{ color: NAVY }}>{displayTitle}</p>
        {!loading && !error && hero && (
          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-display text-2xl md:text-3xl" style={{ color: NAVY }}>
              {formatValue(heroMetric, hero.latest, hero.latest_formatted)}
            </span>
            <span className="text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground">
              {prettyLabel(heroMetric)} · {periodLabel}
            </span>
          </div>
        )}
        {loading && <div className="mt-4 h-6 w-40 bg-border/40 animate-pulse" />}
        {error && <p className="mt-4 text-sm italic text-muted-foreground">{error}</p>}
      </aside>
    );
  }

  // ---------------- Editorial variant (default) ----------------
  const supporting = supportingMetrics.slice(0, 3);

  return (
    <section className="bg-[#FAFAF8] py-12 md:py-16 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 md:mb-10">
          <p className="text-[0.7rem] tracking-[0.32em] uppercase mb-4" style={{ color: GOLD }}>
            {eyebrow}
          </p>
          <h2 className="font-display text-2xl md:text-[2rem] font-normal leading-tight" style={{ color: NAVY }}>
            {displayTitle}
          </h2>
          {periodLabel && !loading && !error && (
            <p className="mt-3 text-[0.65rem] tracking-[0.22em] uppercase text-muted-foreground">
              Period · {periodLabel}
            </p>
          )}
        </header>

        {loading && (
          <div className="space-y-6 animate-pulse">
            <div className="h-10 w-2/3 bg-border/40" />
            <div className="h-12 w-full bg-border/30" />
            <div className="h-4 w-3/4 bg-border/30" />
          </div>
        )}

        {!loading && error && (
          <p className="text-sm italic text-muted-foreground">{error}</p>
        )}

        {!loading && !error && hero && (
          <>
            {/* Hero figure + sparkline */}
            <div className="border-t border-b border-border/40 py-8 md:py-10">
              <p className="text-[0.65rem] tracking-[0.24em] uppercase text-muted-foreground mb-3">
                {prettyLabel(heroMetric)}
              </p>
              <p
                className="font-display leading-none"
                style={{ color: NAVY, fontSize: "clamp(2.5rem, 6vw, 3.75rem)" }}
              >
                {formatValue(heroMetric, hero.latest, hero.latest_formatted)}
              </p>
              <Sparkline points={hero.points} />
            </div>

            {/* Editorial commentary */}
            {(narrative || commentary) && (
              <p className="mt-8 md:mt-10 text-base md:text-lg leading-relaxed max-w-2xl" style={{ color: NAVY }}>
                {narrative}
                {commentary && <span className="text-foreground/75"> {commentary}</span>}
              </p>
            )}

            {/* Supporting figures — inline, hairline-separated, NOT a tile grid */}
            {supporting.length > 0 && (
              <dl className="mt-10 md:mt-12 grid grid-cols-3 gap-px bg-border/40">
                {supporting.map((k) => {
                  const s = series[k];
                  return (
                    <div key={k} className="bg-[#FAFAF8] py-4 md:py-5 pr-4">
                      <dt className="text-[0.6rem] tracking-[0.22em] uppercase text-muted-foreground mb-2">
                        {prettyLabel(k)}
                      </dt>
                      <dd className="font-display text-xl md:text-2xl" style={{ color: NAVY }}>
                        {formatValue(k, s?.latest ?? null, s?.latest_formatted)}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            )}
          </>
        )}

        <p className="mt-10 md:mt-12 text-[0.6rem] tracking-[0.24em] uppercase text-muted-foreground">
          Source · AgentIntel{data?.attribution ? ` · ${data.attribution}` : ""}
        </p>
      </div>
    </section>
  );
};

export default AgentIntelMarketSnapshot;
