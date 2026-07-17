/**
 * Central configuration for the Taylor Sherwood by-the-numbers stats.
 * Update values here without touching component code.
 *
 * Rendering requirement: the FINAL value must be present in server rendered
 * (prerendered) HTML. Any client-side animation must initialize from the
 * rendered DOM value; it must never write a starting value into SSR output.
 */
export interface TaylorStat {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
}

export const taylorStats: TaylorStat[] = [
  { label: "Years in Austin Real Estate", value: 11, suffix: "+" },
  { label: "Career Sales Volume", value: 150, prefix: "$", suffix: "M+" },
  { label: "Homes Sold", value: 200, suffix: "+" },
  { label: "Communities Served", value: 0, suffix: "+" }, // FILL BEFORE LAUNCH
  { label: "Commercial Transactions", value: 0, suffix: "+" }, // FILL BEFORE LAUNCH
  { label: "Land Acres Represented", value: 0, suffix: "+" }, // FILL BEFORE LAUNCH
];

export const taylorFeaturedMedia: Array<{
  type: "youtube" | "interview" | "podcast" | "press";
  title: string;
  source: string;
  url: string;
  thumbnail?: string;
}> = [];
