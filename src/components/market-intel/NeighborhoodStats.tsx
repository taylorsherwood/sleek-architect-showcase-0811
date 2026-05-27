import { ReactNode, useEffect, useState } from "react";
import { fetchAgentIntel, formatLastUpdated, AgentIntelResponse } from "@/lib/agentIntel";
import InsightCard from "./InsightCard";

interface Props { standfirst?: ReactNode; interpretation?: ReactNode; id?: string }

interface Row {
  name: string;
  median_price: number;
  dom: number;
  yoy_pct: number;
  inventory: number;
}
interface Data { items: Row[] }

const fmtMoney = (n: number) => `$${Math.round(n).toLocaleString()}`;

export const NeighborhoodStats = () => {
  const [resp, setResp] = useState<AgentIntelResponse<Data> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    fetchAgentIntel<Data>("neighborhood-stats")
      .then((r) => live && setResp(r))
      .catch((e) => live && setError(String(e?.message || e)))
      .finally(() => live && setLoading(false));
    return () => { live = false; };
  }, []);

  return (
    <InsightCard
      eyebrow="Neighborhood Stats"
      title="Premier Austin Neighborhoods"
      lastUpdated={resp ? formatLastUpdated(resp.last_updated) : undefined}
      loading={loading}
      error={error}
    >
      {resp && (
        <div className="overflow-x-auto -mx-4 px-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground border-b border-border/60">
                <th className="py-3 pr-4 font-normal">Neighborhood</th>
                <th className="py-3 pr-4 font-normal text-right">Median Price</th>
                <th className="py-3 pr-4 font-normal text-right">YoY</th>
                <th className="py-3 pr-4 font-normal text-right">Avg DOM</th>
                <th className="py-3 font-normal text-right">Active</th>
              </tr>
            </thead>
            <tbody>
              {resp.data.items.map((r) => (
                <tr key={r.name} className="border-b border-border/30">
                  <td className="py-4 pr-4 font-display text-architectural">{r.name}</td>
                  <td className="py-4 pr-4 text-right text-foreground/85">{fmtMoney(r.median_price)}</td>
                  <td className={`py-4 pr-4 text-right ${r.yoy_pct >= 0 ? "text-gold" : "text-muted-foreground"}`}>
                    {r.yoy_pct > 0 ? "+" : ""}{r.yoy_pct.toFixed(1)}%
                  </td>
                  <td className="py-4 pr-4 text-right text-foreground/85">{r.dom}</td>
                  <td className="py-4 text-right text-foreground/85">{r.inventory}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </InsightCard>
  );
};

export default NeighborhoodStats;
