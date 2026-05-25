// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.
// Mirrors the indexable routes from src/prerender.tsx.

import { writeFileSync } from "fs";
import { resolve } from "path";
import { communityPages } from "../src/data/communityData";
import { blogPosts } from "../src/data/blogPosts";
import { seoBlogPosts } from "../src/data/seoBlogPosts";

const BASE_URL = "https://www.echelonpropertygroup.com";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

// Indexable static routes (excludes admin, auth, /search results, redirects,
// thank-you confirmations, and 404).
const staticEntries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/about-austin-real-estate-advisory", changefreq: "monthly", priority: "0.6" },
  { path: "/buy", changefreq: "weekly", priority: "0.9" },
  { path: "/sell", changefreq: "weekly", priority: "0.9" },
  { path: "/sell-private", changefreq: "monthly", priority: "0.7" },
  { path: "/invest", changefreq: "weekly", priority: "0.8" },
  { path: "/listings", changefreq: "daily", priority: "0.9" },
  { path: "/listings/commercial-investment-austin", changefreq: "weekly", priority: "0.7" },
  { path: "/communities", changefreq: "weekly", priority: "0.8" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.6" },
  { path: "/connect", changefreq: "monthly", priority: "0.6" },
  { path: "/land", changefreq: "monthly", priority: "0.6" },
  { path: "/past-transactions", changefreq: "monthly", priority: "0.6" },
  { path: "/private-opportunities", changefreq: "weekly", priority: "0.7" },
  { path: "/moving-to-austin-texas", changefreq: "monthly", priority: "0.7" },
  { path: "/best-luxury-neighborhoods-austin", changefreq: "monthly", priority: "0.7" },
  { path: "/best-neighborhoods-in-austin-texas", changefreq: "monthly", priority: "0.7" },
  { path: "/austin-luxury-market-report", changefreq: "weekly", priority: "0.8" },
  { path: "/austin-luxury-real-estate-market-report", changefreq: "weekly", priority: "0.7" },
  { path: "/off-market-real-estate-austin", changefreq: "weekly", priority: "0.9" },
  { path: "/austin-luxury-homes-for-sale", changefreq: "weekly", priority: "0.8" },
  { path: "/austin-commercial-real-estate", changefreq: "monthly", priority: "0.7" },
  { path: "/home-value-austin", changefreq: "monthly", priority: "0.7" },
  { path: "/luxury-real-estate-austin", changefreq: "weekly", priority: "0.7" },
  { path: "/austin-real-estate-investment", changefreq: "monthly", priority: "0.7" },
  { path: "/land-for-sale-austin", changefreq: "monthly", priority: "0.7" },
  { path: "/austin-multifamily-report-2026", changefreq: "monthly", priority: "0.7" },
  { path: "/why-billionaires-are-moving-to-austin", changefreq: "monthly", priority: "0.6" },
  { path: "/austin-land-development-opportunities", changefreq: "monthly", priority: "0.7" },
  { path: "/blog/austin-luxury-market-trends", changefreq: "monthly", priority: "0.6" },
];

// Indexable Private Distribution editions (slugs intended to be public).
const privateDistributionSlugs = [
  "78703-may-2026",
  "78746-may-2026",
];

const communityEntries: SitemapEntry[] = communityPages.map((c) => ({
  path: `/communities/${c.slug}`,
  changefreq: "weekly",
  priority: "0.7",
}));

const blogEntries: SitemapEntry[] = [...seoBlogPosts, ...blogPosts].map((p) => ({
  path: `/blog/${p.id}`,
  changefreq: "monthly",
  priority: "0.6",
}));

const privateDistributionEntries: SitemapEntry[] = privateDistributionSlugs.map((slug) => ({
  path: `/private-distribution/${slug}`,
  changefreq: "monthly",
  priority: "0.5",
}));

// Dedupe by path (last wins).
const seen = new Map<string, SitemapEntry>();
for (const e of [
  ...staticEntries,
  ...communityEntries,
  ...blogEntries,
  ...privateDistributionEntries,
]) {
  seen.set(e.path, e);
}
const entries = Array.from(seen.values());

const today = new Date().toISOString().slice(0, 10);

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n")
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
    ``,
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);
