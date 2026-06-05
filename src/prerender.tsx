import { PassThrough } from "stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { QueryClient } from "@tanstack/react-query";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { AppShell } from "@/App";
import AppRoutes from "@/AppRoutes";
import { communityPages } from "@/data/communityData";
import { blogPosts } from "@/data/blogPosts";
import { seoBlogPosts } from "@/data/seoBlogPosts";

const SITE_URL = "https://www.echelonpropertygroup.com";

type HeadTag = {
  type: "meta" | "link" | "script";
  props: Record<string, string>;
  children?: string;
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
  "/search",
  "/connect",
  "/land",
  "/invest",
  "/moving-to-austin-texas",
  "/best-luxury-neighborhoods-austin",
  "/best-neighborhoods-in-austin-texas",
  "/austin-luxury-market-report",
  "/off-market-real-estate-austin",
  "/austin-luxury-homes-for-sale",
  "/austin-commercial-real-estate",
  "/home-value-austin",
  "/luxury-real-estate-austin",
  "/austin-real-estate-investment",
  "/land-for-sale-austin",
  "/past-transactions",
  "/austin-multifamily-report-2026",
  "/why-billionaires-are-moving-to-austin",
  "/austin-land-development-opportunities",
  "/land-development",
  "/about-austin-real-estate-advisory",
  "/sell-private",
  "/private-opportunities",
  "/blog/find-off-market-homes-austin",
  "/blog/what-is-private-listing-in-real-estate",
  "/blog/why-most-buyers-never-see-austins-best-homes",
];

const privateDistributionSlugs = [
  "78703-may-2026",
  "78746-may-2026",
];

const allPrerenderRoutes = Array.from(
  new Set([
    ...staticRoutes,
    ...communityPages.map((community) => `/communities/${community.slug}`),
    ...[...seoBlogPosts, ...blogPosts].map((post) => `/blog/${post.id}`),
    ...privateDistributionSlugs.map((slug) => `/private-distribution/${slug}`),
  ])
);

const parseAttributes = (attributes: string) => {
  const props: Record<string, string> = {};
  const attrRegex = /([\w:-]+)(?:="([^"]*)")?/g;
  let match: RegExpExecArray | null;

  while ((match = attrRegex.exec(attributes)) !== null) {
    const key = match[1];
    const value = match[2] ?? "";
    if (key !== "data-rh") props[key] = value;
  }

  return props;
};

const parseSelfClosing = (markup: string, tag: "meta" | "link") => {
  const tags: HeadTag[] = [];
  const re = new RegExp(`<${tag}\\s+([^>]*?)\\/?>(?:<\\/${tag}>)?`, "g");
  let m: RegExpExecArray | null;
  while ((m = re.exec(markup)) !== null) {
    const props = parseAttributes(m[1]);
    if (Object.keys(props).length > 0) tags.push({ type: tag, props });
  }
  return tags;
};

const parseScripts = (markup: string) => {
  const tags: HeadTag[] = [];
  const re = /<script\s*([^>]*)>([\s\S]*?)<\/script>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(markup)) !== null) {
    const props = parseAttributes(m[1] || "");
    tags.push({ type: "script", props, children: m[2] });
  }
  return tags;
};

const extractTitle = (titleMarkup: string) => {
  const titleMatch = /<title[^>]*>([\s\S]*?)<\/title>/.exec(titleMarkup);
  return titleMatch?.[1]?.trim() || "Echelon Property Group | Austin Luxury Real Estate";
};

const buildHead = (helmet?: HelmetServerState) => {
  if (!helmet) {
    return {
      title: "Echelon Property Group | Austin Luxury Real Estate",
      elements: new Set<HeadTag>(),
    };
  }

  const metaTags = parseSelfClosing(helmet.meta.toString(), "meta");
  const linkTags = parseSelfClosing(helmet.link.toString(), "link");
  const scriptTags = parseScripts(helmet.script.toString());

  return {
    title: extractTitle(helmet.title.toString()),
    elements: new Set<HeadTag>([...metaTags, ...linkTags, ...scriptTags]),
  };
};

const resolvePrerenderPath = (url: string) => {
  try {
    const parsedUrl = new URL(url, SITE_URL);
    return `${parsedUrl.pathname}${parsedUrl.search}`;
  } catch {
    return url || "/";
  }
};

const renderAppToString = (routePath: string, helmetContext: { helmet?: HelmetServerState }) => {
  const queryClient = new QueryClient();

  return new Promise<string>((resolve, reject) => {
    let html = "";
    const sink = new PassThrough();
    sink.setEncoding("utf-8");
    sink.on("data", (chunk: string) => {
      html += chunk;
    });
    sink.on("end", () => resolve(html));
    sink.on("error", reject);

    const { pipe } = renderToPipeableStream(
      <HelmetProvider context={helmetContext}>
        <AppShell queryClient={queryClient}>
          <StaticRouter location={routePath}>
            <main id="main-content">
              <AppRoutes />
            </main>
          </StaticRouter>
        </AppShell>
      </HelmetProvider>,
      {
        // Wait until all Suspense boundaries (React.lazy chunks) resolve so
        // every route's <SEOHead> / <SchemaMarkup> Helmet tags are captured.
        onAllReady() {
          pipe(sink);
        },
        onShellError(err) {
          reject(err);
        },
        onError(err) {
          // Non-fatal SSR errors are reported but do not abort the render.
          // eslint-disable-next-line no-console
          console.error(`[prerender] ${routePath}:`, err);
        },
      },
    );
  });
};

export async function prerender(data: { url: string }) {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const routePath = resolvePrerenderPath(data.url);

  const html = await renderAppToString(routePath, helmetContext);

  return {
    html,
    data: { url: routePath },
    links: new Set(allPrerenderRoutes),
    head: buildHead(helmetContext.helmet),
  };
}
