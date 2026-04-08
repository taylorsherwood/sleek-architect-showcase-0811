import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { vitePrerenderPlugin } from "vite-prerender-plugin";

const SITE_URL = "https://www.echelonpropertygroup.com";
const DATA_DIR = path.resolve(__dirname, "src/data");

// Routes included in prerender (superset — includes utility pages for SPA fallback)
const prerenderRoutes = [
  "/",
  "/about",
  "/buy",
  "/sell",
  "/listings",
  "/listings/commercial-investment-austin",
  "/communities",
  "/blog",
  "/blog/how-to-find-off-market-real-estate-deals-austin-2026",
  "/contact",
  "/search",
  "/land",
  "/connect",
  "/past-transactions",
  "/moving-to-austin-texas",
  "/best-luxury-neighborhoods-austin",
  "/best-neighborhoods-in-austin-texas",
  "/austin-luxury-market-report",
  "/austin-luxury-homes-for-sale",
  "/austin-commercial-real-estate",
  "/home-value-austin",
  "/luxury-real-estate-austin",
  "/buy-homes-austin",
  "/sell-home-austin",
  "/austin-real-estate-investment",
  "/land-for-sale-austin",
  "/invest",
  "/private-opportunities",
  "/austin-multifamily-report-2026",
  "/why-billionaires-are-moving-to-austin",
  "/off-market-real-estate-austin",
  "/austin-land-development-opportunities",
  "/austin-luxury-real-estate-market-report",
  "/sitemap",
];

// ── Curated sitemap routes (high-value, canonical, 200-status pages only) ──
// Excludes: utility pages (/sitemap, /search, /connect), thin pages,
// redirected URLs, and generic non-Austin blog posts.
const sitemapStaticRoutes = [
  "/",
  "/about",
  "/buy",
  "/sell",
  "/listings",
  "/listings/commercial-investment-austin",
  "/communities",
  "/blog",
  "/contact",
  "/land",
  "/past-transactions",
  "/invest",
  "/private-opportunities",
  // Evergreen SEO pillars
  "/moving-to-austin-texas",
  "/best-luxury-neighborhoods-austin",
  "/best-neighborhoods-in-austin-texas",
  "/austin-luxury-market-report",
  "/austin-luxury-real-estate-market-report",
  "/austin-luxury-homes-for-sale",
  "/austin-commercial-real-estate",
  "/home-value-austin",
  "/luxury-real-estate-austin",
  "/buy-homes-austin",
  "/sell-home-austin",
  "/austin-real-estate-investment",
  "/land-for-sale-austin",
  "/austin-multifamily-report-2026",
  "/why-billionaires-are-moving-to-austin",
  "/off-market-real-estate-austin",
  "/austin-land-development-opportunities",
];

// Blog posts excluded from sitemap (generic/thin content, not Austin-focused)
const excludedBlogIds = new Set([
  "sustainable-architecture-future",
  "minimalism-modern-living",
  "urban-planning-community-spaces",
]);

const extractAll = (file: string, pattern: RegExp): string[] => {
  const content = fs.readFileSync(path.join(DATA_DIR, file), "utf-8");
  return [...content.matchAll(pattern)].map((match) => match[1]);
};

const getAllPrerenderRoutes = () => {
  const communitySlugs = extractAll("communityData.ts", /slug:\s*"([^"]+)"/g);
  const seoCommunityPaths = extractAll("seoCommunityData.ts", /slug:\s*"([^"]+)"/g);
  const blogIds = [
    ...extractAll("seoBlogPosts.ts", /id:\s*"([^"]+)"/g),
    ...extractAll("blogPosts.ts", /id:\s*"([^"]+)"/g),
  ];

  return Array.from(
    new Set([
      ...prerenderRoutes,
      ...communitySlugs.map((slug) => `/communities/${slug}`),
      ...seoCommunityPaths.map((slug) => `/${slug}`),
      ...blogIds.map((id) => `/blog/${id}`),
    ])
  );
};

const getSitemapRoutes = () => {
  const communitySlugs = extractAll("communityData.ts", /slug:\s*"([^"]+)"/g);
  const seoCommunityPaths = extractAll("seoCommunityData.ts", /slug:\s*"([^"]+)"/g);
  const blogIds = [
    ...extractAll("seoBlogPosts.ts", /id:\s*"([^"]+)"/g),
    ...extractAll("blogPosts.ts", /id:\s*"([^"]+)"/g),
  ].filter((id) => !excludedBlogIds.has(id));

  return Array.from(
    new Set([
      ...sitemapStaticRoutes,
      ...communitySlugs.map((slug) => `/communities/${slug}`),
      ...seoCommunityPaths.map((slug) => `/${slug}`),
      ...blogIds.map((id) => `/blog/${id}`),
      // Standalone blog-route editorial pillars
      "/blog/how-to-find-off-market-real-estate-deals-austin-2026",
      "/blog/austin-luxury-market-trends",
    ])
  );
};

function sitemapPlugin(): Plugin {
  function buildSitemap(): string {
    const allRoutes = getSitemapRoutes();
    const today = new Date().toISOString().split("T")[0];

    const urls = allRoutes
      .map(
        (route: string) => {
          const priority = route === "/" ? "1.0"
            : ["/buy", "/sell", "/listings", "/communities", "/invest", "/about"].includes(route) ? "0.9"
            : route.startsWith("/communities/") ? "0.8"
            : route.startsWith("/blog/") ? "0.6"
            : "0.7";
          const changefreq = route === "/" ? "daily"
            : route.startsWith("/blog/") ? "monthly"
            : "weekly";
          return `  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
        }
      )
      .join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  }

  return {
    name: "generate-sitemap",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === "/sitemap.xml") {
          res.setHeader("Content-Type", "application/xml");
          res.end(buildSitemap());
          return;
        }
        next();
      });
    },
    closeBundle() {
      const outDir = path.resolve(__dirname, "dist");
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
      }
      fs.writeFileSync(path.join(outDir, "sitemap.xml"), buildSitemap());
    },
  };
}

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    sitemapPlugin(),
    vitePrerenderPlugin({
      renderTarget: "#root",
      prerenderScript: path.resolve(__dirname, "src/prerender.tsx"),
      additionalPrerenderRoutes: getAllPrerenderRoutes().filter((route: string) => route !== "/"),
    }),
    ViteImageOptimizer({
      png: { quality: 75, compressionLevel: 9 },
      jpeg: { quality: 72, mozjpeg: true },
      jpg: { quality: 72, mozjpeg: true },
      webp: { quality: 75 },
      avif: false,
      svg: { multipass: true },
      cache: true,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime"],
  },
}));
