import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

const SITE_URL = "https://www.echelonpropertygroup.com";

function sitemapPlugin(): Plugin {
  function buildSitemap(): string {
    const dataDir = path.resolve(__dirname, "src/data");

    const extractAll = (file: string, pattern: RegExp): string[] => {
      const content = fs.readFileSync(path.join(dataDir, file), "utf-8");
      return [...content.matchAll(pattern)].map((m) => m[1]);
    };

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
      "/luxury-real-estate-austin",
      "/buy-homes-austin",
      "/sell-home-austin",
      "/austin-real-estate-investment",
      "/land-for-sale-austin",
    ];

    const communitySlugs = extractAll("communityData.ts", /slug:\s*"([^"]+)"/g);
    const blogIds = [
      ...extractAll("seoBlogPosts.ts", /id:\s*"([^"]+)"/g),
      ...extractAll("blogPosts.ts", /id:\s*"([^"]+)"/g),
    ];

    const allRoutes = [
      ...staticRoutes,
      ...communitySlugs.map((s) => `/communities/${s}`),
      ...blogIds.map((id) => `/blog/${id}`),
    ];

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
      fs.writeFileSync(path.join(outDir, "sitemap.xml"), buildSitemap());
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    sitemapPlugin(),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 75 },
      jpg: { quality: 75 },
      webp: { quality: 75 },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime"],
  },
}));
