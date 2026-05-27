import { ReactNode, useEffect, useState } from "react";
import { fetchAgentIntel, formatLastUpdated, AgentIntelResponse } from "@/lib/agentIntel";
import InsightCard from "./InsightCard";

interface Props { standfirst?: ReactNode; interpretation?: ReactNode; id?: string }

interface Data {
  threshold_label: string;
  active_listings: number;
  median_price: number;
  median_dom: number;
  avg_sale_to_list_pct: number;
  off_market_share_pct: number;
  insights: string[];
}

const fmtMoney = (n: number) => `$${Math.round(n).toLocaleString()}`;

export const LuxuryMarketInsights = () => {
  const [resp, setResp] = useState<AgentIntelResponse<Data> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    fetchAgentIntel<Data>("luxury-insights")
      .then((r) => live && setResp(r))
      .catch((e) => live && setError(String(e?.message || e)))
      .finally(() => live && setLoading(false));
    return () => { live = false; };
  }, []);

  const d = resp?.data;

  return (
    <InsightCard
      eyebrow="Luxury Market Insights"
      title={`Austin Luxury Tier ${d ? `(${d.threshold_label})` : ""}`}
      lastUpdated={resp ? formatLastUpdated(resp.last_updated) : undefined}
      loading={loading}
      error={error}
    >
      {d && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border mb-8">
            <Stat label="Active Listings" value={d.active_listings.toLocaleString()} />
            <Stat label="Median Price" value={fmtMoney(d.median_price)} />
            <Stat label="Median DOM" value={`${d.median_dom}`} />
            <Stat label="Sale-to-List" value={`${d.avg_sale_to_list_pct.toFixed(1)}%`} />
          </div>
          <ul className="space-y-3">
            {d.insights.map((i, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-foreground/85 leading-relaxed">
                <span className="text-gold mt-1.5 shrink-0">▸</span>
                <span>{i}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground mt-6 italic">
            Off-market transactions: ~{d.off_market_share_pct}% of luxury closings.
          </p>
        </>
      )}
    </InsightCard>
  );
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-background p-5">
    <p className="text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground mb-2">{label}</p>
    <p className="text-xl font-display text-architectural">{value}</p>
  </div>
);

export default LuxuryMarketInsights;
