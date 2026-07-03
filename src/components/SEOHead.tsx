import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.echelonpropertygroup.com";
const BRAND_NAME = "Echelon Property Group";
const HOMEPAGE_TITLE = `${BRAND_NAME} | Austin Luxury Real Estate`;
const BRAND_SUFFIX_PATTERN = /\s*\|\s*Echelon(?:\s+Property\s+Group)?(?:\s+Austin)?\s*$/i;

interface SEOHeadProps {
  title?: string | null;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: "website" | "article";
  /** When true, emits <meta name="robots" content="noindex, follow" /> */
  noindex?: boolean;
  /** When true, emits explicit <meta name="robots" content="index, follow" /> */
  indexFollow?: boolean;
}

const normalizePageTitle = (rawTitle?: string | null) => {
  if (typeof rawTitle !== "string") return "";
  return rawTitle.replace(/\s+/g, " ").replace(BRAND_SUFFIX_PATTERN, "").trim();
};

const normalizePath = (path: string) => {
  if (!path || path === "/") return "/";
  // Strip query/hash, then trailing slash (only homepage keeps it)
  const cleaned = path.split("?")[0].split("#")[0];
  const noTrail = cleaned.length > 1 && cleaned.endsWith("/") ? cleaned.slice(0, -1) : cleaned;
  return noTrail || "/";
};

const resolveCanonicalUrl = (pathname: string, canonical?: string) => {
  if (canonical && (canonical.startsWith("http://") || canonical.startsWith("https://"))) {
    // Normalize absolute canonicals too
    try {
      const u = new URL(canonical);
      const path = normalizePath(u.pathname);
      return `${SITE_URL}${path === "/" ? "/" : path}`;
    } catch {
      return canonical;
    }
  }
  const raw = canonical || pathname;
  const path = normalizePath(raw.startsWith("/") || raw === "" ? raw : `/${raw}`);
  return `${SITE_URL}${path === "/" ? "/" : path}`;
};

const SEOHead = ({ title, description, canonical, ogTitle, ogDescription, ogType = "website", noindex = false }: SEOHeadProps) => {
  const { pathname } = useLocation();
  const pageTitle = normalizePageTitle(title);
  const seoTitle = pageTitle ? `${pageTitle} | ${BRAND_NAME}` : HOMEPAGE_TITLE;
  const descriptionSubject = pageTitle || "Austin luxury real estate";
  const seoDescription = description || `Explore ${descriptionSubject} with ${BRAND_NAME}. View homes, market insights, and real estate opportunities in Austin Texas.`;
  const canonicalUrl = resolveCanonicalUrl(pathname, canonical);
  const openGraphTitle = ogTitle || seoTitle;
  const openGraphDescription = ogDescription || seoDescription;

  return (
    <Helmet prioritizeSeoTags>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      {noindex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:title" content={openGraphTitle} />
      <meta property="og:description" content={openGraphDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={BRAND_NAME} />
      <meta property="og:image" content={`${SITE_URL}/og-image.png`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={openGraphTitle} />
      <meta name="twitter:description" content={openGraphDescription} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />

      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default SEOHead;
