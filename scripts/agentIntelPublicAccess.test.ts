import { describe, expect, test } from "bun:test";
import { PUBLIC_MARKETS, publicMarketQuery, publicMetricsAllowed } from "../supabase/functions/agentintel-market-data/public-access";

describe("visitor market data access", () => {
  test("allows the Austin Metro request used by public intelligence and seller pages", () => {
    expect(publicMarketQuery(" Austin Metro ")).toBe("Austin Metro");
  });
  test("allows community, blog and regional market requests", () => {
    for (const name of PUBLIC_MARKETS) expect(publicMarketQuery(name.toLowerCase())).toBe(name);
    expect(publicMarketQuery("Seattle")).toBeUndefined();
    expect(publicMarketQuery("Austin Metro&extra=1")).toBeUndefined();
  });
  test("allows the public snapshot and buyer/seller metrics without arbitrary paid queries", () => {
    expect(publicMetricsAllowed(new URLSearchParams({ metrics: "median_sales_price,months_of_inventory,median_days_on_market,sales_to_list_ratio", duration: "1_month" }))).toBe(true);
    expect(publicMetricsAllowed(new URLSearchParams({ metrics: "sold_above_list_rate,contract_in_two_weeks_rate,price_drop_rate" }))).toBe(true);
    expect(publicMetricsAllowed(new URLSearchParams({ metrics: "account_details" }))).toBe(false);
  });
  test("restricts visitor requests to the one-month period used on the site", () => {
    expect(publicMetricsAllowed(new URLSearchParams({ duration: "1_month" }))).toBe(true);
    expect(publicMetricsAllowed(new URLSearchParams({ duration: "100_years" }))).toBe(false);
  });
});