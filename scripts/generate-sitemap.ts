import fs from "fs";
import path from "path";

const SITE_URL = "https://sleek-architect-showcase-0811.lovable.app";

function extractSlugs(filePath: string, pattern: RegExp): string[] {
  const content = fs.readFileSync(filePath, "utf-8");
  const matches = [...content.matchAll(pattern)];
  return matches.map((m) => m[1]);
}

export function generateSitemap(): string {
  const dataDir = path.resolve(__dirname, "../src/data");

  // Static routes
  const staticRoutes = [
    "/",
    "/about",
    "/buy",
    "/sell",
    "/listings",
    "/listings/commercial-investment-austin",
    "/communities",
    "/blog",
    "/contact",
    "/moving-to-austin",
    "/best-luxury-neighborhoods-austin",
    "/austin-luxury-market-report",
    "/off-market-luxury-homes-austin",
    "/austin-luxury-homes-for-sale",
    "/austin-commercial-real-estate",
    "/home-value-austin",
  ];

  // Dynamic community pages
  const communitySlugs = extractSlugs(
    path.join(dataDir, "communityData.ts"),
    /slug:\s*"([^"]+)"/g
  );
  const communityRoutes = communitySlugs.map((s) => `/communities/${s}`);

  // Dynamic blog posts
  const blogIds = extractSlugs(
    path.join(dataDir, "blogPosts.ts"),
    /id:\s*"([^"]+)"/g
  );
  const seoBlogIds = extractSlugs(
    path.join(dataDir, "seoBlogPosts.ts"),
    /id:\s*"([^"]+)"/g
  );
  const blogRoutes = [...seoBlogIds, ...blogIds].map((id) => `/blog/${id}`);

  const allRoutes = [...staticRoutes, ...communityRoutes, ...blogRoutes];
  const today = new Date().toISOString().split("T")[0];

  const urls = allRoutes
    .map(
      (route) => `  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route === "/" ? "daily" : "weekly"}</changefreq>
    <priority>${route === "/" ? "1.0" : route.includes("/blog/") || route.includes("/communities/") ? "0.7" : "0.8"}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemascript.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls}
</urlset>`;
}
