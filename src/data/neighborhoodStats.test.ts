import { describe, expect, test } from "bun:test";
import { formatNeighborhoodMedian, getNeighborhoodStat, neighborhoodPriceSummary, neighborhoodSourceNote } from "./neighborhoodStats";
import { taylorStats, TRANSACTIONS_CLOSED_LABEL } from "../config/taylorStats";

describe("verified neighborhood statistics", () => {
  test("West Lake Hills median is $2.5M", () => {
    expect(getNeighborhoodStat("westlake-hills")?.medianSale).toBe(2_500_000);
    expect(formatNeighborhoodMedian("West Lake Hills")).toBe("$2.5M");
  });
  test("West Lake Hills reporting window has 47 closings through October 2026", () => {
    const stat = getNeighborhoodStat("West Lake Hills");
    expect(stat?.salesCount).toBe(47);
    expect(stat?.period).toBe("12 months through October 2026");
    expect(stat?.asOf).toBe("2026-10-31");
  });
  test("verified median retains Unlock MLS provenance", () => {
    expect(getNeighborhoodStat("West Lake Hills")?.source).toBe("Unlock MLS");
    expect(neighborhoodSourceNote("West Lake Hills")).toBe("Median sale · West Lake Hills, all residential closings, 12 months through October 2026 · Source: Unlock MLS");
    expect(neighborhoodPriceSummary("westlake-hills")).toContain("47 sales.");
  });
  for (const area of ["barton-creek", "rollingwood", "tarrytown", "spanish-oaks", "lake-austin"]) {
    test(`${area} has no fabricated median or sales count`, () => {
      expect(getNeighborhoodStat(area)?.medianSale).toBeNull();
      expect(getNeighborhoodStat(area)?.salesCount).toBeNull();
      expect(formatNeighborhoodMedian(area)).toBe("");
      expect(neighborhoodSourceNote(area)).toBe("");
    });
  }
});

describe("final career statistics", () => {
  test("experience is 11+ years", () => expect(taylorStats[0].value).toBe(11));
  test("career sales are $155M+", () => expect(taylorStats[1].value).toBe(155));
  test("200+ closings use Transactions Closed", () => {
    expect(taylorStats[2].value).toBe(200);
    expect(taylorStats[2].label).toBe("Transactions Closed");
    expect(TRANSACTIONS_CLOSED_LABEL).toBe("Transactions Closed");
  });
});