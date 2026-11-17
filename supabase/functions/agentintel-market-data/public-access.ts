// Public pages may read a finite set of markets, not use the paid API as a proxy.
export const PUBLIC_MARKETS = [
  "Austin Metro", "West Austin", "Southwest Austin", "Central Austin", "South Austin",
  "Downtown Austin", "Northwest Austin", "East Austin", "Hill Country", "Bee Cave",
  "Lake Travis", "Lakeway", "Westlake Hills", "Cedar Park", "Round Rock", "Kyle",
  "Pflugerville", "Georgetown", "Dripping Springs", "Fredericksburg", "Kerrville",
  "Johnson City", "Marble Falls", "Burnet", "Llano", "Lampasas", "Hill Country Ranches",
  "Exotic Wildlife Ranches", "Gillespie County", "Kerr County", "Hays County",
  "Blanco County", "Burnet County", "Llano County", "Lampasas County",
  "Central Texas Hill Country", "Texas", "Austin Metro Residential $2M+",
  "West Austin Residential $2M+", "Austin Luxury $2M+",
] as const;

export const PUBLIC_METRICS = [
  "median_sales_price", "median_list_price", "median_sales_ppsf", "median_list_ppsf",
  "median_days_on_market", "months_of_inventory", "sold_count", "new_listings_count",
  "active_listings_count", "pending_listings_count", "sales_to_list_ratio",
  "sold_above_list_rate", "price_drop_rate", "appreciation", "contract_in_two_weeks_rate",
  "cash_share",
] as const;

export function publicMarketQuery(q: string): string | undefined {
  return PUBLIC_MARKETS.find((name) => name.toLowerCase() === q.trim().toLowerCase());
}

export function publicMetricsAllowed(params: URLSearchParams): boolean {
  const metrics = (params.get("metrics") || "median_sales_price").split(",");
  return (params.get("duration") || "1_month") === "1_month" &&
    metrics.length <= PUBLIC_METRICS.length &&
    metrics.every((metric) => PUBLIC_METRICS.some((allowed) => allowed === metric.trim()));
}