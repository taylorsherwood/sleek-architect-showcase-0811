/**
 * Post-build SEO verification.
 *
 * Spot-checks a handful of high-value prerendered routes in dist/ and fails
 * the build if any of them are missing a per-route <title>, a non-default
 * <meta name="description">, a self-referencing <link rel="canonical">, or
 * (where expected) at least one JSON-LD script. Prevents the Helmet/
 * prerender SEO injection bug from silently regressing.
 */
import fs from "node:fs";
import path from "node:path";

const DIST = path.resolve(process.cwd(), "dist");
const SITE = "https://www.echelonpropertygroup.com";

const DEFAULT_TITLES = new Set([
  "Echelon Property Group",
  "Echelon Property Group | Austin Luxury Real Estate",
  "Echelon Property Group — Austin Luxury Real Estate",
]);

type Check = {
  route: string;
  /** When true, JSON-LD presence is required. */
  expectJsonLd?: boolean;
};

const CRITICAL_ROUTES: Check[] = [
  { route: "/", expectJsonLd: true },
  { route: "/blog/minimalism-modern-living", expectJsonLd: true },
  { route: "/communities/cat-mountain", expectJsonLd: true },
  { route: "/land-ranch", expectJsonLd: true },
  { route: "/austin-luxury-homes-for-sale", expectJsonLd: true },
  { route: "/sell", expectJsonLd: true },
  { route: "/buy", expectJsonLd: true },
  { route: "/off-market-real-estate-austin", expectJsonLd: true },
];

const readHtml = (route: string): string | null => {
  const filePath =
    route === "/"
      ? path.join(DIST, "index.html")
      : path.join(DIST, route.replace(/^\//, ""), "index.html");
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf-8") : null;
};

const matchOne = (html: string, re: RegExp): string | null => {
  const m = re.exec(html);
  return m ? m[1] : null;
};

const checkRoute = ({ route, expectJsonLd }: Check): string[] => {
  const html = readHtml(route);
  if (html === null) return [`missing dist file for ${route}`];

  const failures: string[] = [];

  const title = matchOne(html, /<title[^>]*>([^<]*)<\/title>/);
  if (!title) failures.push("no <title>");
  else if (DEFAULT_TITLES.has(title.trim()) && route !== "/")
    failures.push(`default <title> "${title.trim()}"`);

  const description = matchOne(
    html,
    /<meta[^>]*name="description"[^>]*content="([^"]*)"/,
  );
  if (!description || description.trim().length < 20)
    failures.push("missing/short meta description");

  const canonicalHref = matchOne(
    html,
    /<link[^>]*rel="canonical"[^>]*href="([^"]*)"/,
  );
  if (!canonicalHref) {
    failures.push("missing canonical");
  } else {
    const expected = route === "/" ? `${SITE}/` : `${SITE}${route}`;
    if (canonicalHref !== expected)
      failures.push(`canonical mismatch (got "${canonicalHref}", expected "${expected}")`);
  }

  if (expectJsonLd) {
    const ldCount = (html.match(/application\/ld\+json/g) || []).length;
    if (ldCount < 1) failures.push("no JSON-LD scripts");
  }

  return failures;
};

const main = () => {
  if (!fs.existsSync(DIST)) {
    console.error("[verify-prerender] dist/ not found — skipping (dev build?)");
    return;
  }

  let failed = 0;
  for (const check of CRITICAL_ROUTES) {
    const failures = checkRoute(check);
    if (failures.length === 0) {
      console.log(`  OK   ${check.route}`);
    } else {
      failed++;
      console.error(`  FAIL ${check.route}`);
      for (const f of failures) console.error(`       - ${f}`);
    }
  }

  if (failed > 0) {
    console.error(`\n[verify-prerender] ${failed} route(s) failed SEO checks.`);
    process.exit(1);
  }
  console.log(`\n[verify-prerender] ${CRITICAL_ROUTES.length} route(s) passed.`);
};

main();
