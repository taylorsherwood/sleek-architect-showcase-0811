import { useEffect, useState, useMemo } from "react";
import { fetchAgentIntel, formatLastUpdated, AgentIntelResponse } from "@/lib/agentIntel";
import InsightCard from "./InsightCard";

interface Point { month: string; active: number; new: number; sold: number }
interface Data { period: string; series: Point[]; note?: string }

export const InventoryTrends = () => {
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

  const max = useMemo(() => {
    if (!resp) return 1;
    return Math.max(...resp.data.series.flatMap((p) => [p.active, p.new, p.sold]));
  }, [resp]);

  return (
    <InsightCard
      eyebrow="Inventory Trends"
      title="Active, New, and Sold Inventory"
      lastUpdated={resp ? formatLastUpdated(resp.last_updated) : undefined}
      loading={loading}
      error={error}
    >
      {resp && (
        <>
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">{resp.data.period}</p>
          <div className="flex items-end gap-2 md:gap-3 h-48 border-b border-border/60 pb-2">
            {resp.data.series.map((p) => (
              <div key={p.month} className="flex-1 flex flex-col items-center gap-1 group">
                <div className="flex items-end gap-px h-full w-full justify-center">
                  <div className="w-2 bg-foreground/70" style={{ height: `${(p.active / max) * 100}%` }} title={`Active: ${p.active}`} />
                  <div className="w-2 bg-gold" style={{ height: `${(p.new / max) * 100}%` }} title={`New: ${p.new}`} />
                  <div className="w-2 bg-muted-foreground/60" style={{ height: `${(p.sold / max) * 100}%` }} title={`Sold: ${p.sold}`} />
                </div>
                <span className="text-[0.6rem] tracking-wider uppercase text-muted-foreground mt-2">{p.month}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-5 mt-5 text-xs text-muted-foreground">
            <LegendDot color="bg-foreground/70" label="Active" />
            <LegendDot color="bg-gold" label="New" />
            <LegendDot color="bg-muted-foreground/60" label="Sold" />
          </div>
          {resp.data.note && (
            <p className="text-sm text-muted-foreground mt-5 leading-relaxed italic">{resp.data.note}</p>
          )}
        </>
      )}
    </InsightCard>
  );
};

const LegendDot = ({ color, label }: { color: string; label: string }) => (
  <span className="inline-flex items-center gap-2">
    <span className={`inline-block w-2 h-2 ${color}`} />
    {label}
  </span>
);

export default InventoryTrends;
