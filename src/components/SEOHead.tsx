import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://www.echelonpropertygroup.com";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
}

const SEOHead = ({ title, description, canonical }: SEOHeadProps) => {
  const { pathname } = useLocation();
  const canonicalUrl = canonical || `${SITE_URL}${pathname === "/" ? "" : pathname}`;

  useEffect(() => {
    // Title
    document.title = title;

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Standard meta
    setMeta("description", description);

    // Open Graph
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("og:type", "website", true);
    setMeta("og:site_name", "Echelon Property Group", true);
    setMeta("og:image", `${SITE_URL}/og-image.png`, true);

    // Twitter
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", `${SITE_URL}/og-image.png`);

    // Canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonicalUrl;

    return () => {};
  }, [title, description, canonicalUrl]);

  return null;
};

export default SEOHead;
