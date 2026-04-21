import { CommunityMarketStats } from "@/types/community";

interface MarketSnapshotProps {
  stats: CommunityMarketStats;
  communityName: string;
}

const fmtCurrency = (n?: number | null) =>
  n != null ? `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}` : null;
const fmtNumber = (n?: number | null) =>
  n != null ? n.toLocaleString("en-US") : null;

const MarketSnapshot = ({ stats, communityName }: MarketSnapshotProps) => {
  const numericItems = [
    { label: "Median Active Price", value: fmtCurrency(stats.median_active_price) },
    { label: "Average Active Price", value: fmtCurrency(stats.average_active_price) },
    { label: "Median Sold Price (area)", value: fmtCurrency(stats.median_sold_price_area) },
    { label: "Average Sold Price (area)", value: fmtCurrency(stats.average_sold_price_area) },
    { label: "Active Inventory", value: fmtNumber(stats.active_inventory_count) },
    { label: "Sold (last 90 days)", value: fmtNumber(stats.sold_count_last_90_days) },
    { label: "Avg. Days on Market", value: fmtNumber(stats.average_dom) },
    { label: "Median Price / SqFt", value: fmtCurrency(stats.median_price_per_sqft) },
  ].filter((i) => i.value != null);

  const qualitativeItems = [
    { label: "Inventory Trend", value: stats.inventory_trend?.trim() || null },
    { label: "Buyer Demand", value: stats.buyer_demand?.trim() || null },
  ].filter((i) => i.value);

  // Hide the entire section if no real data exists (per design rule).
  if (numericItems.length === 0 && qualitativeItems.length === 0) return null;

  return (
    <section>
      <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-2">
        Market Snapshot
      </h2>
      {stats.as_of_date && (
        <p className="text-sm text-muted-foreground mb-8">
          As of {stats.as_of_date} • Aggregated area data for {communityName}
        </p>
      )}

      {numericItems.length > 0 && (
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-px bg-border">
          {numericItems.map((item) => (
            <div key={item.label} className="bg-background p-6">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                {item.label}
              </p>
              <p className="text-2xl font-display text-architectural">{item.value}</p>
            </div>
          ))}
        </div>
      )}

      {qualitativeItems.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-px bg-border mt-px">
          {qualitativeItems.map((item) => (
            <div key={item.label} className="bg-background p-6">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                {item.label}
              </p>
              <p className="text-base text-foreground leading-relaxed">{item.value}</p>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground mt-6 italic">
        Aggregated market data only. Individual sold property prices are not displayed.
      </p>
    </section>
  );
};

export default MarketSnapshot;
