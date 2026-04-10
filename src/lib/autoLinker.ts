/**
 * Auto-linking engine for SEO internal linking.
 * Automatically links first occurrences of community names and key phrases
 * to their canonical URLs within content text.
 *
 * Rules:
 * - Only links first occurrence of each target per content block
 * - Skips text already inside markdown links [text](/url)
 * - Longer phrases matched first to avoid partial matches
 * - Maximum auto-links per block to avoid over-optimization
 */

interface LinkTarget {
  /** Text patterns to match (case-insensitive). First match wins. */
  patterns: string[];
  /** Canonical URL to link to */
  href: string;
  /** Priority: higher = matched first when multiple targets overlap */
  priority?: number;
}

// Community pages — canonical names and common variants
const COMMUNITY_TARGETS: LinkTarget[] = [
  { patterns: ["Westlake Hills"], href: "/communities/westlake-hills" },
  { patterns: ["Barton Creek"], href: "/communities/barton-creek" },
  { patterns: ["Tarrytown"], href: "/communities/tarrytown" },
  { patterns: ["Rollingwood"], href: "/communities/rollingwood" },
  { patterns: ["Travis Heights"], href: "/communities/travis-heights" },
  { patterns: ["Downtown Austin"], href: "/communities/downtown" },
  { patterns: ["Dripping Springs"], href: "/communities/dripping-springs" },
  { patterns: ["Hill Country Estates", "Texas Hill Country Estates"], href: "/communities/texas-hill-country-estates" },
  { patterns: ["Lake Austin"], href: "/communities/lake-austin" },
  { patterns: ["Zilker"], href: "/communities/zilker-austin" },
  { patterns: ["Cat Mountain", "Northwest Hills"], href: "/communities/cat-mountain-northwest-hills" },
  { patterns: ["Spanish Oaks"], href: "/communities/spanish-oaks" },
  { patterns: ["Clarksville"], href: "/communities/clarksville" },
  { patterns: ["Lake Travis"], href: "/communities/lake-travis", priority: 10 },
  { patterns: ["Mueller"], href: "/communities/mueller" },
  { patterns: ["Hyde Park"], href: "/communities/hyde-park" },
  { patterns: ["Pemberton Heights"], href: "/communities/pemberton-heights" },
  { patterns: ["Bee Cave"], href: "/communities/bee-cave" },
  { patterns: ["Great Hills"], href: "/communities/great-hills" },
  { patterns: ["Balcones Park"], href: "/communities/balcones-park" },
  { patterns: ["Rob Roy"], href: "/communities/rob-roy" },
  { patterns: ["Steiner Ranch"], href: "/communities/steiner-ranch" },
  { patterns: ["Bryker Woods"], href: "/communities/bryker-woods" },
  { patterns: ["East Austin"], href: "/communities/east-austin" },
  { patterns: ["Old Enfield"], href: "/communities/old-enfield" },
  { patterns: ["Davenport Ranch"], href: "/communities/davenport-ranch" },
  { patterns: ["Lakeway"], href: "/communities/lakeway" },
];

// Evergreen authority pages
const EVERGREEN_TARGETS: LinkTarget[] = [
  { patterns: ["moving to Austin", "relocating to Austin", "move to Austin"], href: "/moving-to-austin-texas", priority: 5 },
  { patterns: ["best luxury neighborhoods"], href: "/best-luxury-neighborhoods-austin", priority: 5 },
  { patterns: ["luxury real estate market report", "Austin luxury market report"], href: "/austin-luxury-real-estate-market-report", priority: 5 },
  { patterns: ["off-market real estate", "off-market properties", "off-market homes"], href: "/off-market-real-estate-austin", priority: 3 },
];

const ALL_TARGETS = [...COMMUNITY_TARGETS, ...EVERGREEN_TARGETS];

/** Maximum auto-links injected per content block */
const MAX_AUTO_LINKS = 6;

/**
 * Applies auto-linking to a content string.
 * Skips text already inside markdown links [text](/url).
 * Only links the first occurrence of each target.
 *
 * @param text - Raw content string (may contain markdown links)
 * @param currentSlug - Current page's community slug (to avoid self-linking)
 * @param maxLinks - Maximum auto-links to inject
 * @returns Text with markdown links injected
 */
export function autoLink(text: string, currentSlug?: string, maxLinks = MAX_AUTO_LINKS): string {
  // Build sorted target list (longer patterns first, then by priority)
  const targets = ALL_TARGETS
    .filter(t => {
      // Don't link to the current page
      if (!currentSlug) return true;
      return !t.href.endsWith(`/${currentSlug}`);
    })
    .flatMap(t => t.patterns.map(p => ({ pattern: p, href: t.href, priority: t.priority ?? 0 })))
    .sort((a, b) => {
      // Sort by pattern length descending, then priority descending
      if (b.pattern.length !== a.pattern.length) return b.pattern.length - a.pattern.length;
      return b.priority - a.priority;
    });

  // Track which hrefs have been linked (only link each target once)
  const linkedHrefs = new Set<string>();
  // Also track hrefs that are already manually linked in the text
  const manualLinkRegex = /\[[^\]]*\]\(([^)]+)\)/g;
  let manualMatch;
  while ((manualMatch = manualLinkRegex.exec(text)) !== null) {
    linkedHrefs.add(manualMatch[1]);
  }

  let linksAdded = 0;

  for (const target of targets) {
    if (linksAdded >= maxLinks) break;
    if (linkedHrefs.has(target.href)) continue;

    // Build regex that matches the pattern only when NOT inside an existing markdown link
    // We use a negative lookbehind for [ and negative lookahead for ]( to avoid matching inside links
    const escapedPattern = target.pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Match word boundary, pattern, then ensure not already linked
    const regex = new RegExp(`(?<![\\[])\\b(${escapedPattern})\\b(?![^\\[]*\\]\\()`, 'i');

    const match = regex.exec(text);
    if (match) {
      // Check this isn't inside an existing markdown link by scanning for unclosed [
      const before = text.slice(0, match.index);
      const lastOpen = before.lastIndexOf('[');
      const lastClose = before.lastIndexOf(']');
      if (lastOpen > lastClose) {
        // We're inside a markdown link text — skip
        continue;
      }

      const originalText = match[1];
      const replacement = `[${originalText}](${target.href})`;
      text = text.slice(0, match.index) + replacement + text.slice(match.index + match[0].length);
      linkedHrefs.add(target.href);
      linksAdded++;
    }
  }

  return text;
}
