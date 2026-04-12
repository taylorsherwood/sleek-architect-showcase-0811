import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppRoutes from "@/AppRoutes";
import { communityPages } from "@/data/communityData";
import { blogPosts } from "@/data/blogPosts";
import { seoBlogPosts } from "@/data/seoBlogPosts";

const SITE_URL = "https://www.echelonpropertygroup.com";

type HeadTag = {
  type: "meta" | "link";
  props: Record<string, string>;
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
  "/buy-homes-austin",
  "/sell-home-austin",
  "/austin-real-estate-investment",
  "/land-for-sale-austin",
  "/past-transactions",
  "/austin-multifamily-report-2026",
  "/why-billionaires-are-moving-to-austin",
  "/austin-land-development-opportunities",
  "/private-opportunities",
  "/blog/how-to-find-off-market-real-estate-deals-austin-2026",
  "/sitemap",
  "/best-luxury-neighborhoods-in-austin",
  "/communities/zilker",
  "/communities/northwest-hills",
];

const allPrerenderRoutes = Array.from(
  new Set([
    ...staticRoutes,
    ...communityPages.map((community) => `/communities/${community.slug}`),
    ...[...seoBlogPosts, ...blogPosts].map((post) => `/blog/${post.id}`),
  ])
);

const parseAttributes = (attributes: string) => {
  const props: Record<string, string> = {};
  const attrRegex = /([\w:-]+)="([^"]*)"/g;
  let match: RegExpExecArray | null;

  while ((match = attrRegex.exec(attributes)) !== null) {
    const key = match[1];
    const value = match[2];
    if (key !== "data-rh") props[key] = value;
  }

  return props;
};

const parseHeadTags = (markup: string, expectedTag: "meta" | "link") => {
  const tags: HeadTag[] = [];
  const tagRegex = new RegExp(`<${expectedTag}\\s+([^>]*?)\\/?>(?:<\\/${expectedTag}>)?`, "g");
  let match: RegExpExecArray | null;

  while ((match = tagRegex.exec(markup)) !== null) {
    const props = parseAttributes(match[1]);
    if (Object.keys(props).length > 0) {
      tags.push({ type: expectedTag, props });
    }
  }

  return tags;
};

const extractTitle = (titleMarkup: string) => {
  const titleMatch = /<title[^>]*>([\s\S]*?)<\/title>/.exec(titleMarkup);
  return titleMatch?.[1]?.trim() || "Echelon Property Group";
};

const buildHead = (helmet?: HelmetServerState) => {
  if (!helmet) {
    return {
      title: "Echelon Property Group",
      elements: new Set<HeadTag>(),
    };
  }

  const metaTags = parseHeadTags(helmet.meta.toString(), "meta");
  const linkTags = parseHeadTags(helmet.link.toString(), "link");

  return {
    title: extractTitle(helmet.title.toString()),
    elements: new Set<HeadTag>([...metaTags, ...linkTags]),
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

export async function prerender(data: { url: string }) {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const queryClient = new QueryClient();
  const routePath = resolvePrerenderPath(data.url);

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <StaticRouter location={routePath}>
            <AppRoutes />
          </StaticRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );

  return {
    html,
    data: { url: routePath },
    links: new Set(allPrerenderRoutes),
    head: buildHead(helmetContext.helmet),
  };
}
