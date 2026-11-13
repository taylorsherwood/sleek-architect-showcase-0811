import { describe, expect, test } from "bun:test";
import { formatNeighborhoodMedian, getNeighborhoodStat, neighborhoodPriceSummary, neighborhoodSourceNote } from "../src/data/neighborhoodStats";
import { taylorStats, TRANSACTIONS_CLOSED_LABEL } from "../src/config/taylorStats";

describe("verified neighborhood statistics", () => {
  test("West Lake Hills shows no median price", () => {
    expect(getNeighborhoodStat("westlake-hills")?.medianSale).toBeNull();
    expect(formatNeighborhoodMedian("West Lake Hills")).toBe("");
    expect(neighborhoodSourceNote("West Lake Hills")).toBe("");
    expect(neighborhoodPriceSummary("westlake-hills")).not.toContain("$2.5M");
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