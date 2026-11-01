export interface NeighborhoodStat {
  area: string;
  medianSale: number | null;
  metricLabel: string;
  period: string | null;
  salesCount: number | null;
  source: string | null;
  asOf: string | null;
}

const pending = (area: string): NeighborhoodStat => ({
  area, medianSale: null, metricLabel: "Median sale", period: null,
  salesCount: null, source: null, asOf: null,
});

export const neighborhoodStats: Record<string, NeighborhoodStat> = {
  "westlake-hills": {
    area: "West Lake Hills", medianSale: 2_500_000, metricLabel: "Median sale",
    period: "12 months through October 2026", salesCount: 47,
    source: "Unlock MLS", asOf: "2026-10-31",
  },
  "barton-creek": pending("Barton Creek"),
  rollingwood: pending("Rollingwood"),
  tarrytown: pending("Tarrytown"),
  "spanish-oaks": pending("Spanish Oaks"),
  "lake-austin": pending("Lake Austin"),
};

export function getNeighborhoodStat(areaOrSlug: string): NeighborhoodStat | undefined {
  const normalized = areaOrSlug.toLowerCase().replace(/-homes-for-sale$/, "").replace(/ waterfront$/, "");
  return neighborhoodStats[normalized] ?? Object.values(neighborhoodStats).find(
    (entry) => entry.area.toLowerCase() === normalized,
  );
}

export function formatNeighborhoodMedian(areaOrSlug: string): string {
  const stat = getNeighborhoodStat(areaOrSlug);
  if (stat?.medianSale == null) return "";
  return `$${Number((stat.medianSale / 1_000_000).toFixed(2))}M`;
}

export function neighborhoodSourceNote(areaOrSlug: string): string {
  const stat = getNeighborhoodStat(areaOrSlug);
  if (stat?.medianSale == null || !stat.period || !stat.source) return "";
  return `${stat.metricLabel} · ${stat.area}, all residential closings, ${stat.period} · Source: ${stat.source}`;
}

export function neighborhoodPriceSummary(areaOrSlug: string): string {
  const value = formatNeighborhoodMedian(areaOrSlug);
  return value ? `${value}. ${neighborhoodSourceNote(areaOrSlug)}` : "Contact Echelon Property Group for a current, neighborhood-specific pricing analysis.";
}