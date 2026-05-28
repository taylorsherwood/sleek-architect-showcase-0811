import { useEffect, useState } from "react";
import {
  fetchMarketMetrics,
  fetchMetricsByMarketName,
  publicErrorMessage,
  type AgentIntelMarket,
  type MarketMetricsResponse,
  type MetricSeries,
} from "@/lib/agentIntel";

interface Props {
  /** Provide either a market_uuid or a marketName. */
  marketUuid?: string;
  marketName?: string;
  /** Metrics to request. Defaults to a curated luxury-relevant set. */
  metrics?: string[];
  /** AgentIntel duration token (e.g. 1_month, 3_months, 12_months). */
  duration?: string;
  /** Optional eyebrow label override. */
  eyebrow?: string;
  /** Optional title override. */
  title?: string;
}

const DEFAULT_METRICS = [
  "median_sales_price",
  "median_days_on_market",
  "months_of_inventory",
  "sold_count",
  "new_listings_count",
];

const METRIC_META: Record<string, { label: string; format: "money" | "number" | "decimal" | "days" | "percent" }> = {
  median_sales_price: { label: "Median Sales Price", format: "money" },
  median_list_price: { label: "Median List Price", format: "money" },
  median_sales_ppsf: { label: "Median $/Sq Ft", format: "money" },
  median_list_ppsf: { label: "List $/Sq Ft", format: "money" },
  median_days_on_market: { label: "Median Days on Market", format: "days" },
  months_of_inventory: { label: "Months of Inventory", format: "decimal" },
  sold_count: { label: "Homes Sold", format: "number" },
  new_listings_count: { label: "New Listings", format: "number" },
  active_listings_count: { label: "Active Listings", format: "number" },
  pending_listings_count: { label: "Pending", format: "number" },
  sales_to_list_ratio: { label: "Sale-to-List", format: "percent" },
  sold_above_list_rate: { label: "Sold Above List", format: "percent" },
  price_drop_rate: { label: "Price Drop Rate", format: "percent" },
  appreciation: { label: "Appreciation (YoY)", format: "percent" },
};

function formatValue(metricKey: string, v: number | null, formatted?: string | null): string {
  if (formatted) return formatted;
  if (v == null || !Number.isFinite(v)) return "—";
  const meta = METRIC_META[metricKey];
  switch (meta?.format) {
    case "money": return `$${Math.round(v).toLocaleString()}`;
    case "days": return `${Math.round(v)}`;
    case "decimal": return v.toFixed(1);
    case "percent": return `${(v * 100).toFixed(1)}%`;
    case "number":
    default: return Math.round(v).toLocaleString();
  }
}

function prettyLabel(key: string): string {
  return METRIC_META[key]?.label ?? key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatDate(iso: string | null): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  } catch { return iso; }
}

export const AgentIntelMarketSnapshot = ({
  marketUuid,
  marketName,
  metrics = DEFAULT_METRICS,
  duration = "1_month",
  eyebrow = "Market Intelligence",
  title,
}: Props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<MarketMetricsResponse | null>(null);
  const [market, setMarket] = useState<AgentIntelMarket | null>(null);

  useEffect(() => {
    let live = true;
    setLoading(true);
    setError(null);

    const run = async () => {
      try {
        if (marketUuid) {
          const res = await fetchMarketMetrics(marketUuid, metrics, duration);
          if (!live) return;
          setData(res);
        } else if (marketName) {
          const { market: m, data: res } = await fetchMetricsByMarketName(marketName, metrics, duration);
          if (!live) return;
          setMarket(m);
          setData(res);
          if (!m) setError("We couldn't find that market yet.");
        } else {
          setError("No market specified.");
        }
      } catch (e) {
        if (!live) return;
        setError(publicErrorMessage(e));
      } finally {
        if (live) setLoading(false);
      }
    };

    run();
    return () => { live = false; };
  }, [marketUuid, marketName, duration, metrics.join(",")]);

  const displayTitle = title ?? market?.name ?? marketName ?? "Market Snapshot";
  const orderedKeys = metrics.slice(0, 5);
  const series = data?.metrics ?? {};
  const latestDate = Object.values(series).find((s): s is MetricSeries => !!s?.latest_date)?.latest_date ?? null;

  return (
    <section className="bg-[#FAFAF8] dark:bg-[hsl(38_15%_15%/0.2)] border border-border/50 p-8 md:p-12">
      <header className="mb-8 md:mb-10">
        <p className="text-[0.7rem] tracking-[0.28em] uppercase font-semibold mb-3" style={{ color: "#b9a06c" }}>
          {eyebrow}
        </p>
        <h2 className="font-display text-2xl md:text-3xl font-normal leading-snug" style={{ color: "#0C0F24" }}>
          {displayTitle}
        </h2>
        {latestDate && !loading && !error && (
          <p className="mt-3 text-xs tracking-[0.18em] uppercase text-muted-foreground">
            As of {formatDate(latestDate)}
          </p>
        )}
      </header>

      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-border/60">
          {orderedKeys.map((k) => (
            <div key={k} className="bg-[#FAFAF8] p-6 animate-pulse">
              <div className="h-3 w-20 bg-border/60 mb-4" />
              <div className="h-6 w-24 bg-border/60" />
            </div>
          ))}
        </div>
      )}

      {!loading && error && (
        <p className="text-sm italic text-muted-foreground">{error}</p>
      )}

      {!loading && !error && data && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-border/60">
          {orderedKeys.map((k) => {
            const s = series[k];
            return (
              <div key={k} className="bg-[#FAFAF8] dark:bg-background p-6 md:p-7">
                <p className="text-[0.65rem] tracking-[0.22em] uppercase text-muted-foreground mb-3">
                  {prettyLabel(k)}
                </p>
                <p
                  className="font-display text-2xl md:text-[1.65rem] leading-none"
                  style={{ color: "#0C0F24" }}
                >
                  {formatValue(k, s?.latest ?? null)}
                </p>
                {s?.latest_date && (
                  <p className="mt-3 text-[0.65rem] tracking-[0.18em] uppercase text-muted-foreground">
                    {formatDate(s.latest_date)}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      <p className="mt-8 text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground">
        Source · AgentIntel
      </p>
    </section>
  );
};

export default AgentIntelMarketSnapshot;
