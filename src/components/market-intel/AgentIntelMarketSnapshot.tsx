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
  /** Fallback market name used when the primary `marketName` resolves to no
   *  AgentIntel record (e.g. ultra-luxury micro-markets that the upstream
   *  feed indexes only at the metro or sub-metro level). */
  fallbackMarketName?: string;
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
  /** Optional provenance note rendered beneath the period stamp. Use to
   *  disclose when figures reflect a regional proxy rather than the named
   *  micro-market (e.g. Southwest Austin standing in for Barton Creek). */
  dataNote?: string;
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

/** Year-over-year delta on the hero metric. */
function yoyDelta(hero: MetricSeries | undefined): number | null {
  const pts = hero?.points ?? [];
  if (pts.length < 2) return null;
  const latest = pts[pts.length - 1];
  const prior = pts.length >= 13 ? pts[pts.length - 13] : pts[0];
  if (!prior?.value) return null;
  return (latest.value - prior.value) / prior.value;
}

/** Tighter, advisory-grade single sentence. */
function buildNarrative(
  marketLabel: string,
  hero: MetricSeries | undefined,
  heroKey: string,
  inv: MetricSeries | undefined,
): string {
  const delta = yoyDelta(hero);
  if (delta == null) return "";
  const pct = Math.abs(delta * 100).toFixed(1);
  const heroLabel = METRIC_META[heroKey]?.label?.toLowerCase() ?? "pricing";
  const inv12 = inv?.latest;

  const supply =
    inv12 == null
      ? ""
      : inv12 < 3
        ? " amid persistently thin supply"
        : inv12 > 6
          ? " as inventory continues to widen"
          : " against a balanced supply profile";

  const tone =
    delta > 0.005
      ? `${marketLabel} ${heroLabel} advanced ${pct}% year-over-year${supply}.`
      : delta < -0.005
        ? `${marketLabel} ${heroLabel} eased ${pct}% year-over-year${supply}.`
        : `${marketLabel} ${heroLabel} held within ${pct}% of the prior year${supply}.`;
  return tone;
}

/** Refined sparkline: hairline + soft gold wash + terminal dot. */
function Sparkline({ points }: { points: Array<{ value: number }> }) {
  const series = points.slice(-12);
  if (series.length < 2) return null;
  const w = 600, h = 80, pad = 4;
  const vals = series.map((p) => p.value);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const range = max - min || 1;
  const step = (w - pad * 2) / (series.length - 1);
  const coords = series.map((p, i) => {
    const x = pad + i * step;
    const y = h - pad - ((p.value - min) / range) * (h - pad * 2);
    return { x, y };
  });
  const line = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(" ");
  const area = `${line} L${coords[coords.length - 1].x.toFixed(1)} ${h} L${coords[0].x.toFixed(1)} ${h} Z`;
  const tail = coords[coords.length - 1];
  const totalLen = coords.reduce((acc, c, i) => {
    if (i === 0) return 0;
    const p = coords[i - 1];
    return acc + Math.hypot(c.x - p.x, c.y - p.y);
  }, 0);
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full h-16 md:h-20"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="ei-spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={GOLD} stopOpacity="0.18" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#ei-spark-fill)" />
      <path
        d={line}
        fill="none"
        stroke={GOLD}
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={totalLen}
        strokeDashoffset={totalLen}
        style={{ animation: "ei-spark-draw 1600ms cubic-bezier(0.22, 1, 0.36, 1) forwards" }}
      />
      {/* Soft pulsing halo behind terminal dot */}
      <circle
        cx={tail.x}
        cy={tail.y}
        r={2.25}
        fill={GOLD}
        style={{ opacity: 0, transformOrigin: `${tail.x}px ${tail.y}px`, animation: "ei-spark-pulse 2400ms ease-out 1800ms infinite" }}
      />
      <circle
        cx={tail.x}
        cy={tail.y}
        r={2.25}
        fill={GOLD}
        style={{ opacity: 0, animation: "ei-spark-dot 400ms ease-out 1600ms forwards" }}
      />
      <style>{`
        @keyframes ei-spark-draw { to { stroke-dashoffset: 0; } }
        @keyframes ei-spark-dot { to { opacity: 1; } }
        @keyframes ei-spark-pulse {
          0%   { opacity: 0.55; transform: scale(1); }
          70%  { opacity: 0;    transform: scale(4); }
          100% { opacity: 0;    transform: scale(4); }
        }
      `}</style>
    </svg>
  );
}

export const AgentIntelMarketSnapshot = ({
  marketUuid,
  marketName,
  fallbackMarketName,
  heroMetric = DEFAULT_HERO,
  supportingMetrics = DEFAULT_SUPPORTING,
  duration = "1_month",
  variant = "editorial",
  eyebrow = "Market Intelligence",
  title,
  commentary,
  dataNote,
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
          let { market: m, data: res } = await fetchMetricsByMarketName(marketName, requested, duration);
          // Graceful fallback for micro-markets the upstream feed doesn't index.
          if ((!m || !res) && fallbackMarketName) {
            const fb = await fetchMetricsByMarketName(fallbackMarketName, requested, duration);
            m = fb.market;
            res = fb.data;
          }
          if (!live) return;
          setMarket(m);
          setData(res);
          if (!m || !res) setError("Market intelligence for this area is being curated.");
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
  }, [marketUuid, marketName, fallbackMarketName, duration, requested.join(",")]);

  const series = data?.metrics ?? {};
  const hero = series[heroMetric];
  const displayTitle = title ?? market?.name ?? marketName ?? "Market Snapshot";
  const periodLabel = formatPeriod(hero?.latest_date ?? null);
  const delta = yoyDelta(hero);

  const narrative = useMemo(
    () => (data ? buildNarrative(displayTitle, hero, heroMetric, series.months_of_inventory) : ""),
    [data, displayTitle, hero, heroMetric, series],
  );

  // ---------------- Compact variant (sidebars, inline strips) ----------------
  if (variant === "compact") {
    return (
      <aside className="py-6 md:py-8">
        <p className="text-[0.6rem] tracking-[0.32em] uppercase mb-2" style={{ color: GOLD }}>
          {eyebrow}
        </p>
        <p className="font-display text-base md:text-lg" style={{ color: NAVY }}>{displayTitle}</p>
        {!loading && !error && hero && (
          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-display text-2xl md:text-3xl" style={{ color: NAVY }}>
              {formatValue(heroMetric, hero.latest, hero.latest_formatted)}
            </span>
            <span className="text-[0.65rem] tracking-[0.24em] uppercase text-muted-foreground">
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
  const deltaPct = delta != null && Math.abs(delta) >= 0.001
    ? `${delta >= 0 ? "+" : "−"}${Math.abs(delta * 100).toFixed(1)}%`
    : null;

  return (
    <section
      className="relative pt-4 md:pt-8 pb-12 md:pb-16"
      aria-label={`${displayTitle} market briefing`}
    >
      {/* Atmospheric wash — ultra-subtle, never reads as a "card" */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] md:h-[560px]"
        style={{
          background:
            "radial-gradient(60% 70% at 50% 18%, rgba(12,15,36,0.045) 0%, rgba(12,15,36,0.018) 38%, rgba(12,15,36,0) 72%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-2 md:px-0">
        {/* Editorial masthead — folio numeral + eyebrow */}
        <div className="mb-8 md:mb-10 text-center">
          <p
            className="text-[0.6rem] tracking-[0.46em] uppercase"
            style={{ color: GOLD }}
          >
            <span className="font-display italic normal-case tracking-normal mr-3" style={{ fontSize: "0.95em" }}>
              No. I
            </span>
            <span aria-hidden style={{ color: `${NAVY}55` }}>·</span>
            <span className="ml-3">{eyebrow}</span>
          </p>
        </div>
        <header className="text-center max-w-3xl mx-auto mb-10 md:mb-14">

          <h2
            className="font-display font-light leading-[1.04] tracking-tight"
            style={{ color: NAVY, fontSize: "clamp(1.85rem, 3.6vw, 2.75rem)" }}
          >
            {displayTitle}
          </h2>
          {periodLabel && !loading && !error && (
            <p className="mt-6 text-[0.6rem] tracking-[0.4em] uppercase text-muted-foreground/75">
              Advisory Brief · {periodLabel}
            </p>
          )}
          {dataNote && !loading && !error && (
            <p className="mt-3 text-[0.65rem] md:text-[0.7rem] italic text-muted-foreground/70 leading-relaxed normal-case" style={{ textTransform: "none" }}>
              {dataNote}
            </p>
          )}
        </header>


        {loading && (
          <div className="space-y-8 animate-pulse max-w-3xl mx-auto">
            <div className="h-20 w-2/3 mx-auto bg-border/30" />
            <div className="h-16 w-full bg-border/20" />
            <div className="h-4 w-3/4 mx-auto bg-border/20" />
          </div>
        )}

        {!loading && error && (
          <p className="text-center text-sm italic text-muted-foreground">{error}</p>
        )}

        {!loading && !error && hero && (
          <>
            {/* Hero figure — architectural, centered, oversized */}
            <div className="text-center">
              <p className="text-[0.6rem] tracking-[0.36em] uppercase text-muted-foreground/80 mb-6">
                {prettyLabel(heroMetric)}
              </p>
              <p
                className="font-display font-light leading-[0.95] tracking-[-0.02em]"
                style={{
                  color: NAVY,
                  fontSize: "clamp(3.75rem, 11vw, 8.5rem)",
                  fontFeatureSettings: '"lnum", "tnum"',
                }}
              >
                {formatValue(heroMetric, hero.latest, hero.latest_formatted)}
              </p>
              {deltaPct && (
                <p
                  className="mt-6 text-[0.62rem] tracking-[0.32em] uppercase"
                  style={{ color: GOLD }}
                >
                  <span className="opacity-70">Year over Year ·</span>{" "}
                  <span className="font-medium">{deltaPct}</span>
                </p>
              )}

              {/* Sparkline — full-width hairline */}
              <div className="mt-10 md:mt-14 max-w-3xl mx-auto">
                <Sparkline points={hero.points} />
                <div className="mt-3 flex justify-between text-[0.55rem] tracking-[0.3em] uppercase text-muted-foreground/60">
                  <span>Trailing 12 Months</span>
                  <span>{periodLabel}</span>
                </div>
              </div>
            </div>

            {/* Editorial commentary — pull-quote treatment */}
            {(narrative || commentary) && (
              <figure className="mt-10 md:mt-14 max-w-2xl mx-auto text-center">
                <blockquote
                  className="font-light italic leading-[1.55] normal-case"
                  style={{ color: NAVY, fontSize: "clamp(1rem, 1.35vw, 1.2rem)", textTransform: "none", fontVariant: "normal" }}
                >
                  {commentary || narrative}
                </blockquote>
              </figure>
            )}

            {/* Supporting figures — column rule, no boxes */}
            {supporting.length > 0 && (
              <dl className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-3 max-w-4xl mx-auto">
                {supporting.map((k, i) => {
                  const s = series[k];
                  return (
                    <div
                      key={k}
                      className={`text-center py-6 md:py-2 ${
                        i > 0 ? "md:border-l border-t md:border-t-0" : ""
                      }`}
                      style={{ borderColor: `${NAVY}14` }}
                    >
                      <dt className="text-[0.55rem] tracking-[0.36em] uppercase text-muted-foreground/80 mb-3">
                        {prettyLabel(k)}
                      </dt>
                      <dd
                        className="font-display font-light leading-none"
                        style={{
                          color: NAVY,
                          fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                          fontFeatureSettings: '"lnum", "tnum"',
                        }}
                      >
                        {formatValue(k, s?.latest ?? null, s?.latest_formatted)}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            )}
          </>
        )}

        {/* Colophon */}
        <div className="mt-12 md:mt-16 flex items-center gap-6">
          <span aria-hidden className="h-px flex-1" style={{ background: `${NAVY}14` }} />
          <p className="text-[0.55rem] tracking-[0.36em] uppercase text-muted-foreground/70 whitespace-nowrap">
            Source · AgentIntel{data?.attribution ? ` · ${data.attribution}` : ""}
          </p>
          <span aria-hidden className="h-px flex-1" style={{ background: `${NAVY}14` }} />
        </div>
      </div>

    </section>
  );
};

export default AgentIntelMarketSnapshot;
