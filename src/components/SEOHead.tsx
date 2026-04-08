import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.echelonpropertygroup.com";
const BRAND_NAME = "Echelon Property Group";
const BRAND_SUFFIX_PATTERN = /\s*\|\s*Echelon Property Group(?: Austin)?\s*$/i;

interface SEOHeadProps {
  title: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: "website" | "article";
  /** When true, emits <meta name="robots" content="noindex, follow" /> */
  noindex?: boolean;
}

const normalizePageTitle = (rawTitle: string) => {
  const pageTitle = rawTitle.replace(BRAND_SUFFIX_PATTERN, "").trim();
  return pageTitle.length > 0 ? pageTitle : "Home";
};

const resolveCanonicalUrl = (pathname: string, canonical?: string) => {
  if (!canonical) return `${SITE_URL}${pathname === "/" ? "" : pathname}`;
  if (canonical.startsWith("http://") || canonical.startsWith("https://")) return canonical;
  return `${SITE_URL}${canonical.startsWith("/") ? canonical : `/${canonical}`}`;
};

const SEOHead = ({ title, description, canonical, ogTitle, ogDescription, ogType = "website", noindex = false }: SEOHeadProps) => {
  const { pathname } = useLocation();
  const pageTitle = normalizePageTitle(title);
  const seoTitle = `${pageTitle} | ${BRAND_NAME}`;
  const seoDescription = description || `Explore ${pageTitle} with ${BRAND_NAME}. View homes, market insights, and real estate opportunities in Austin Texas.`;
  const canonicalUrl = resolveCanonicalUrl(pathname, canonical);
  const openGraphTitle = ogTitle || seoTitle;
  const openGraphDescription = ogDescription || seoDescription;

  return (
    <Helmet prioritizeSeoTags>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />

      <meta property="og:title" content={openGraphTitle} />
      <meta property="og:description" content={openGraphDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={BRAND_NAME} />
      <meta property="og:image" content={`${SITE_URL}/og-image.png`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={openGraphTitle} />
      <meta name="twitter:description" content={openGraphDescription} />
      <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />

      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default SEOHead;
