import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.echelonpropertygroup.com";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
}

const SEOHead = ({ title, description, canonical }: SEOHeadProps) => {
  const { pathname } = useLocation();
  const canonicalUrl = canonical || `${SITE_URL}${pathname === "/" ? "" : pathname}`;

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Echelon Property Group" />
      <meta property="og:image" content={`${SITE_URL}/og-image.png`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />

      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default SEOHead;
