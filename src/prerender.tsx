import { renderToString } from "react-dom/server";
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
  "/best-luxury-neighborhoods-in-austin",
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
    // Aliased community slug rendered as its own indexable page.
    "/communities/northwest-hills",
    ...[...seoBlogPosts, ...blogPosts].map((post) => `/blog/${post.id}`),
    ...privateDistributionSlugs.map((slug) => `/private-distribution/${slug}`),
  ])
);

const decodeEntities = (value: string) =>
  value
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

const parseAttributes = (attributes: string) => {
  const props: Record<string, string> = {};
  const attrRegex = /([\w:-]+)(?:="([^"]*)")?/g;
  let match: RegExpExecArray | null;

  while ((match = attrRegex.exec(attributes)) !== null) {
    const key = match[1];
    const value = match[2] ?? "";
    // Preserve data-rh so react-helmet-async recognizes its server-rendered
    // tags on hydration and replaces (instead of duplicating) them.
    props[key] = decodeEntities(value);
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
  const raw = titleMatch?.[1]?.trim();
  if (!raw) return "Echelon Property Group | Austin Luxury Real Estate";
  return decodeEntities(raw);
};

const buildHead = (helmet?: HelmetServerState) => {
  if (!helmet) {
    return {
      title: "Echelon Property Group | Austin Luxury Real Estate",
      elements: new Set<HeadTag>(),
    };
  }

  // SEOHead uses <Helmet prioritizeSeoTags>, which routes the canonical
  // title/description/og/twitter/canonical tags onto helmet.priority
  // instead of the regular meta/link/script buckets. We have to read
  // BOTH so nothing gets dropped from the prerendered <head>.
  const priorityMarkup =
    typeof helmet.priority?.toString === "function" ? helmet.priority.toString() : "";

  const metaTags = [
    ...parseSelfClosing(helmet.meta.toString(), "meta"),
    ...parseSelfClosing(priorityMarkup, "meta"),
  ];
  const linkTags = [
    ...parseSelfClosing(helmet.link.toString(), "link"),
    ...parseSelfClosing(priorityMarkup, "link"),
  ];
  const scriptTags = [
    ...parseScripts(helmet.script.toString()),
    ...parseScripts(priorityMarkup),
  ];

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

const flushAsync = () =>
  new Promise<void>((resolve) => setTimeout(resolve, 0));

/**
 * Render the React tree to a string. React 18's renderToString supports
 * Suspense by emitting fallback content when a lazy import throws a
 * pending promise. We render in a short loop so any React.lazy chunks
 * that resolved after the first pass are inlined on a subsequent pass.
 * Helmet captures from the FINAL render, which is the one whose head
 * tags we ship.
 */
const renderAppToString = async (
  routePath: string,
  helmetContext: { helmet?: HelmetServerState },
) => {
  const queryClient = new QueryClient();

  const tree = (
    <HelmetProvider context={helmetContext}>
      <AppShell queryClient={queryClient}>
        <StaticRouter location={routePath}>
          <main id="main-content">
            <AppRoutes />
          </main>
        </StaticRouter>
      </AppShell>
    </HelmetProvider>
  );

  let html = "";
  let previous = "";
  for (let attempt = 0; attempt < 6; attempt++) {
    try {
      html = renderToString(tree);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`[prerender] ${routePath}:`, err);
      html = "";
    }
    if (html && html === previous) break;
    previous = html;
    // Allow any pending React.lazy() module promises to resolve before
    // the next render pass.
    await flushAsync();
  }

  return html;
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
