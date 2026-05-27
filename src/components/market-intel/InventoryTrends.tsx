import { ReactNode, useEffect, useState, useMemo } from "react";
import { fetchAgentIntel, formatLastUpdated, AgentIntelResponse } from "@/lib/agentIntel";
import InsightCard from "./InsightCard";

interface Props { standfirst?: ReactNode; interpretation?: ReactNode; id?: string }

interface Point {
  month: string;
  active: number;
  new: number;
  pending: number;
  sold: number;
  months_of_inventory?: number;
}
interface Data { period: string; series: Point[]; note?: string }

const SERIES_KEYS = ["active", "new", "pending", "sold"] as const;
const SERIES_META: Record<(typeof SERIES_KEYS)[number], { label: string; bar: string; dot: string }> = {
  active:  { label: "Active",  bar: "bg-foreground/75",      dot: "bg-foreground/75" },
  new:     { label: "New",     bar: "bg-gold",                dot: "bg-gold" },
  pending: { label: "Pending", bar: "bg-foreground/40",      dot: "bg-foreground/40" },
  sold:    { label: "Sold",    bar: "bg-muted-foreground/60", dot: "bg-muted-foreground/60" },
};

const hasValidSeries = (d: Data | undefined | null): d is Data =>
  !!d && Array.isArray(d.series) && d.series.length > 0 &&
  d.series.every((p) => SERIES_KEYS.every((k) => typeof p[k] === "number" && !Number.isNaN(p[k])));

export const InventoryTrends = ({ standfirst, interpretation, id }: Props = {}) => {
  const [resp, setResp] = useState<AgentIntelResponse<Data> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    fetchAgentIntel<Data>("inventory-trends")
      .then((r) => live && setResp(r))
      .catch((e) => live && setError(String(e?.message || e)))
      .finally(() => live && setLoading(false));
    return () => { live = false; };
  }, []);

  const valid = hasValidSeries(resp?.data);
  const max = useMemo(() => {
    if (!valid) return 1;
    return Math.max(
      1,
      ...resp!.data.series.flatMap((p) => SERIES_KEYS.map((k) => p[k] as number)),
    );
  }, [resp, valid]);

  return (
    <InsightCard
      id={id}
      standfirst={standfirst}
      interpretation={interpretation}
      eyebrow="Inventory Trends"
      title="Active, New, Pending, and Sold Inventory"
      lastUpdated={resp ? formatLastUpdated(resp.last_updated) : undefined}
      loading={loading}
      error={error}
    >
      {resp && !valid && (
        <p className="text-sm text-muted-foreground italic py-8 text-center">
          Market trend data loading…
        </p>
      )}

      {resp && valid && (
        <>
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
            {resp.data.period}
          </p>

          <div className="flex items-end gap-2 md:gap-3 h-56 border-b border-border/60 pb-2">
            {resp.data.series.map((p) => (
              <div key={p.month} className="flex-1 h-full flex flex-col items-center">
                <div className="flex-1 w-full flex items-end justify-center gap-px">
                  {SERIES_KEYS.map((k) => {
                    const v = p[k] as number;
                    const h = Math.max(2, (v / max) * 100);
                    return (
                      <div
                        key={k}
                        className={`w-1.5 md:w-2 ${SERIES_META[k].bar} transition-[height] duration-500`}
                        style={{ height: `${h}%` }}
                        title={`${SERIES_META[k].label}: ${v.toLocaleString()}`}
                      />
                    );
                  })}
                </div>
                <span className="text-[0.6rem] tracking-wider uppercase text-muted-foreground mt-2">
                  {p.month}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-5 mt-5 text-xs text-muted-foreground">
            {SERIES_KEYS.map((k) => (
              <span key={k} className="inline-flex items-center gap-2">
                <span className={`inline-block w-2 h-2 ${SERIES_META[k].dot}`} />
                {SERIES_META[k].label}
              </span>
            ))}
          </div>

          {(() => {
            const last = resp.data.series[resp.data.series.length - 1];
            return typeof last?.months_of_inventory === "number" ? (
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-6">
                Months of inventory:{" "}
                <span className="text-foreground font-medium normal-case tracking-normal">
                  {last.months_of_inventory.toFixed(1)}
                </span>
              </p>
            ) : null;
          })()}

          {resp.data.note && (
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed italic">
              {resp.data.note}
            </p>
          )}
        </>
      )}
    </InsightCard>
  );
};

export default InventoryTrends;
