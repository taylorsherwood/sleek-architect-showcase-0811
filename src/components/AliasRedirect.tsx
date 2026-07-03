import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.echelonpropertygroup.com";
const BRAND = "Echelon Property Group";

/**
 * Alias route redirect that ships proper SEO signals in the prerendered
 * HTML BEFORE the client-side <Navigate> runs. Ensures Google sees:
 *
 *   - a canonical <link> pointing at the destination
 *   - <meta name="robots" content="noindex, follow">
 *   - a unique <title> and description
 *
 * Every alias URL should also be listed in src/prerender.tsx so these
 * tags are baked into the initial HTML Googlebot receives.
 */
interface AliasRedirectProps {
  /** Absolute path (starting with "/") of the canonical destination. */
  to: string;
  /** Optional label describing the destination for the alias page title. */
  label?: string;
}

const humanize = (path: string) =>
  path
    .replace(/^\//, "")
    .replace(/\/$/, "")
    .split("/")
    .pop()!
    .split("-")
    .map((word) => (word.length ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ") || "Home";

const AliasRedirect = ({ to, label }: AliasRedirectProps) => {
  const destinationLabel = label || humanize(to);
  const canonical = `${SITE_URL}${to}`;
  const title = `Redirecting to ${destinationLabel} | ${BRAND}`;
  const description = `This URL has moved. The canonical page is ${destinationLabel} at ${canonical}.`;

  return (
    <>
      <Helmet prioritizeSeoTags>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
      </Helmet>
      <Navigate to={to} replace />
    </>
  );
};

export default AliasRedirect;
