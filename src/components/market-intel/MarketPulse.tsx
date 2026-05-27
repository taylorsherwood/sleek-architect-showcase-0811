import { ReactNode, useEffect, useState } from "react";
import { fetchAgentIntel, formatLastUpdated, AgentIntelResponse } from "@/lib/agentIntel";
import InsightCard from "./InsightCard";

interface MarketPulseProps {
  standfirst?: ReactNode;
  interpretation?: ReactNode;
  id?: string;
}

interface MarketPulseData {
  headline: string;
  median_price: number;
  median_price_delta_pct: number;
  avg_days_on_market: number;
  dom_delta: number;
  months_of_supply: number;
  closed_last_30_days: number;
  luxury_share_pct: number;
  summary: string;
}

const fmtMoney = (n: number) => `$${Math.round(n).toLocaleString()}`;
const fmtPct = (n: number, withSign = true) =>
  `${withSign && n > 0 ? "+" : ""}${n.toFixed(1)}%`;

export const MarketPulse = () => {
  const [resp, setResp] = useState<AgentIntelResponse<MarketPulseData> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    fetchAgentIntel<MarketPulseData>("market-pulse")
      .then((r) => live && setResp(r))
      .catch((e) => live && setError(String(e?.message || e)))
      .finally(() => live && setLoading(false));
    return () => {
      live = false;
    };
  }, []);

  const d = resp?.data;

  return (
    <InsightCard
      eyebrow="Market Pulse"
      title="Austin Real Estate at a Glance"
      lastUpdated={resp ? formatLastUpdated(resp.last_updated) : undefined}
      loading={loading}
      error={error}
    >
      {d && (
        <>
          <p className="text-base md:text-lg text-foreground/85 font-display leading-relaxed mb-8">
            {d.headline}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
            <Stat label="Median Price" value={fmtMoney(d.median_price)} delta={fmtPct(d.median_price_delta_pct)} positive={d.median_price_delta_pct >= 0} />
            <Stat label="Avg Days on Market" value={`${d.avg_days_on_market}`} delta={`${d.dom_delta > 0 ? "+" : ""}${d.dom_delta} days`} positive={d.dom_delta <= 0} />
            <Stat label="Months of Supply" value={d.months_of_supply.toFixed(1)} />
            <Stat label="Luxury Share" value={`${d.luxury_share_pct.toFixed(1)}%`} />
          </div>
          <p className="text-sm text-muted-foreground mt-6 leading-relaxed">{d.summary}</p>
        </>
      )}
    </InsightCard>
  );
};

const Stat = ({ label, value, delta, positive }: { label: string; value: string; delta?: string; positive?: boolean }) => (
  <div className="bg-background p-5">
    <p className="text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground mb-2">{label}</p>
    <p className="text-2xl font-display text-architectural">{value}</p>
    {delta && (
      <p className={`text-xs mt-1 ${positive ? "text-gold" : "text-muted-foreground"}`}>{delta}</p>
    )}
  </div>
);

export default MarketPulse;
