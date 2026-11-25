import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";

const source = readFileSync("src/data/seoBlogPosts.ts", "utf8");
function post(id: string) {
  const start = source.indexOf(`    id: "${id}"`);
  if (start < 0) throw new Error(`Missing article: ${id}`);
  const end = source.indexOf("\n    id:", start + 10);
  return source.slice(start, end);
}
const june = post("austin-housing-market-update-june-2026");
const timeline = post("how-long-to-sell-house-austin");
const buyer = post("how-to-buy-home-austin-buyers-market-2026");

describe("specified historical market corrections", () => {
  for (const [name, text, published] of [
    ["June report", june, "2026-07-14"],
    ["selling timeline", timeline, "2026-07-16"],
    ["buyer strategies", buyer, "2026-06-21"],
  ]) {
    test(`${name} preserves publication date and records November 25 revision`, () => {
      expect(text).toContain(`date: "${published}"`);
      expect(text).toContain('dateModified: "2026-11-25"');
    });
  }
  test("June metro single-family snapshot contains the supplied values", () => {
    for (const row of [
      "Median sales price | $450,000 | down 1.1%",
      "Closed sales | 2,976 | up 12%",
      "Sales dollar volume | $1.83 billion | up 16%",
      "Pending sales | 2,600 | up 7.9%",
      "Active listings | 12,573 | down 1.9%",
      "New listings | 4,382 | up 9.0%",
      "Months of inventory | 4.4 months | down 0.6 months",
      "Average close-to-list ratio | 97.8% | versus 97.4%",
    ]) expect(june).toContain(row);
  });
  test("June county residential figures use the supplied values", () => {
    for (const row of [
      "City of Austin (residential) | $598,000 | up 2.4% | 4.59 (down 1.34) | 60.9 (down 2.8)",
      "Travis County (residential) | $529,900 | up 1.7% | 4.91 (down 1.07) | 69.9 (up 2.7)",
      "Williamson County (residential) | $421,000 | down 0.8% | 4.17 (down 0.54) | 77.7 (up 7.5)",
      "Hays County (residential) | $375,000 | up 2.2% | 4.85 (up 0.43) | 80.2 (down 4.6)",
      "Bastrop County (residential) | $337,000 | down 8.9% | 6.21 (down 1.32) | 124.6 (up 19.5)",
      "Caldwell County (residential) | $250,000 | down 13.8% | 6.50 (up 1.38) | 65.4 (down 3.2)",
    ]) expect(june).toContain(row);
  });
  test("June report removes mismatched snapshot and year-to-date figures", () => {
    for (const value of ["rose 1.1%", "up 1.1%", "+1.1%", "93.9%", "93.7%", "13,245", "2,994", "2,961", "$1.81", "4,712", "62 days", "62-day", "605,000", "542,000", "426,800", "400,000", "344,900", "260,495", "425,000", "14.8%", "down 15%", "22.8%", "inventory down 22%", "pendings up double digits"]) expect(june).not.toContain(value);
    expect(june).toContain("28,656 Central Texas listings");
    expect(june).toContain("-2.8%");
  });
  test("timeline uses 28-day city and 42-day metro medians without changing closing window", () => {
    expect(timeline).toContain("City of Austin home went under contract in 28 days");
    expect(timeline).toContain("metro single-family median was 42 days");
    expect(timeline).toContain("Closing typically adds 30 to 45 days");
    for (const old of ["3 to 5 weeks", "three to five weeks", "mid-20s", "medians run in the 20s"]) expect(timeline).not.toContain(old);
  });
  test("timeline retains Redfin, RPR and typical price-tier ranges", () => {
    expect(timeline).toContain("Redfin Data Center, RPR market statistics");
    expect(timeline).toContain("typical ranges, not medians");
    expect(timeline).toContain("20 to 35 days");
    expect(timeline).toContain("~52 days median (June 2026)");
  });
  test("buyer figures retain their values with the City of Austin May reporting period", () => {
    expect(buyer).toContain("City of Austin, trailing 12 months ending May 31, 2026");
    for (const value of ["5.3 months", "48, up from 44", "10,700", "$567,000", "1.5 percent"]) expect(buyer).toContain(value);
    expect(buyer).not.toContain(":::faq");
  });
});