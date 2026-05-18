/**
 * Private Distribution — recurring private market intelligence editions.
 *
 * Each edition is a self-contained "brief": metadata, a teaser block that
 * may be indexed, and a sequence of gated sections that only appear after
 * the reader submits the access form. Structured so future editions can
 * be added by appending an object — no layout changes required.
 */

export type BriefSectionType =
  | "observation"
  | "trades"
  | "feature"
  | "commentary"
  | "note";

export interface TradeRow {
  address: string;
  neighborhood?: string;
  closedPrice: string;
  notes?: string;
}

export interface FeatureProperty {
  label: string;
  headline: string;
  description: string;
  meta?: string[];
}

export interface BriefSection {
  id: string;
  type: BriefSectionType;
  eyebrow?: string;
  title?: string;
  body?: string;
  bullets?: string[];
  trades?: TradeRow[];
  feature?: FeatureProperty;
  attribution?: string;
}

export interface BriefEdition {
  slug: string;
  issueNumber: string;        // "No. 04"
  market: string;             // "78746 · Westlake"
  edition: string;            // "May 2026 Edition"
  publishedAt: string;        // ISO date
  title: string;              // "The 78746 Brief"
  subtitle: string;           // editorial subhead
  dek: string;                // 1-2 sentence teaser
  teaserParagraphs: string[]; // shown publicly above the gate
  sections: BriefSection[];   // gated content
  closingNote?: string;
  pdfUrl?: string;            // optional print edition
  /** When false, the edition is hidden from the index page. */
  active?: boolean;
}

export const PRIVATE_DISTRIBUTION: BriefEdition[] = [
  {
    slug: "78746-may-2026",
    issueNumber: "No. 04",
    market: "78746 · Westlake",
    edition: "May 2026 Edition",
    publishedAt: "2026-05-01",
    title: "The 78746 Brief",
    subtitle: "Private market intelligence for Austin's most guarded zip code.",
    dek: "A confidential read on Westlake, Rollingwood, and the Eanes corridor — trades closed off-market, properties whispered before listing, and the strategic posture of buyers actively in the field.",
    teaserParagraphs: [
      "The 78746 corridor — Westlake Hills, Rollingwood, the Eanes school footprint — continues to trade at a pace and discretion the public market never sees. This edition collects what our advisory observed over the past thirty days: properties moved without ever surfacing on the MLS, capital quietly assembled for tear-downs along Westlake Drive, and the strategic posture of the half-dozen buyers currently active above twelve million.",
      "The brief is distributed privately to a limited list of principals, family offices, and qualified buyers and sellers. It is not indexed in full, and the underlying transaction notes are not published anywhere else.",
    ],
    sections: [
      {
        id: "market-observation",
        type: "observation",
        eyebrow: "Market Observation",
        title: "Inventory has tightened; conviction has not.",
        body:
          "Active listings inside the 78746 boundary fell to thirty-one homes in April, a six-year low for the spring window. Withdrawn-and-relisted activity continues to climb as sellers test private channels before re-engaging the public market. Buyer behavior has not softened in parallel — we tracked four offers above ten million written on properties never publicly marketed, all from out-of-state principals represented by Texas counsel.",
        bullets: [
          "Active listings: 31 (-22% YoY)",
          "Median closed price: $4.85M (+9% YoY)",
          "Off-market closings tracked by Echelon advisory: 11",
          "Days from private introduction to LOI (median): 9",
        ],
      },
      {
        id: "private-trades",
        type: "trades",
        eyebrow: "Recent Private Trades",
        title: "Closings that did not touch the MLS.",
        body:
          "The following transactions were closed off-market in the trailing thirty days. Addresses are abbreviated; full street-and-folio detail is available on request to verified principals.",
        trades: [
          { address: "Westlake Dr · single-loaded waterfront", neighborhood: "Westlake Hills", closedPrice: "$14.8M", notes: "Tear-down basis; assembled with adjacent lot under separate entity." },
          { address: "Toro Canyon Rd · canyon-rim estate", neighborhood: "Rollingwood", closedPrice: "$9.2M", notes: "Closed in 11 days from private introduction." },
          { address: "Pascal Ln · architect-built contemporary", neighborhood: "Westlake Hills", closedPrice: "$7.6M", notes: "Buyer represented; seller declined to list." },
          { address: "Bridge Way · main-basin Lake Austin", neighborhood: "Davenport/Westlake border", closedPrice: "$22.4M", notes: "Closed all-cash; principal-to-principal introduction." },
        ],
      },
      {
        id: "featured-property",
        type: "feature",
        eyebrow: "Featured — Private Inventory",
        title: "A property currently available off-market.",
        feature: {
          label: "Coming Off-Market · 78746",
          headline: "An architecturally significant Westlake Drive estate with deepwater frontage.",
          description:
            "Approximately 1.4 acres of single-loaded Lake Austin frontage with a 2018 reimagining by a regionally recognized firm. The owner is prepared to entertain qualified offers between $24M and $28M without public marketing. Tours by invitation; financial qualification required prior to address disclosure.",
          meta: [
            "Approx. 8,400 sq ft · 5 bedrooms",
            "1.4 acres · deepwater dock with two slips",
            "Available without public marketing",
          ],
        },
      },
      {
        id: "insider-commentary",
        type: "commentary",
        eyebrow: "Insider Commentary",
        title: "What the public data does not show.",
        body:
          "Three observations from the past quarter that do not appear in any published market report. First: the most active buyer profile in 78746 is no longer the tech operator — it is the family office allocating from a sold operating business, typically structured through a Texas-domiciled LLC. Second: tear-down pricing on Westlake Drive has compressed against finished-home pricing to within roughly fifteen percent per usable acre, narrowing a gap that was historically closer to thirty. Third: a small number of long-tenured owners along the canyon rim are quietly listening to unsolicited approaches for the first time in a decade.",
        attribution: "— Taylor Sherwood, Founding Advisor",
      },
      {
        id: "editorial-note",
        type: "note",
        eyebrow: "Editorial Note",
        title: "On distribution and discretion.",
        body:
          "This brief is shared with a narrow audience of buyers, sellers, and capital allocators with active interest in the 78746 market. Specific addresses, principals, and financial detail beyond what is published here are available only through direct introduction. To request an introduction or to receive future editions, reply to the access confirmation email.",
      },
    ],
    closingNote:
      "Distributed privately by Echelon Property Group. Not for redistribution. Information is believed accurate as of the publication date and is sourced from confidential transactions, principal conversations, and proprietary market tracking.",
    active: true,
  },
];

export const FEATURED_EDITION_SLUG = "78746-may-2026";

export function getEditionBySlug(slug: string): BriefEdition | undefined {
  return PRIVATE_DISTRIBUTION.find((e) => e.slug === slug);
}

export function getFeaturedEdition(): BriefEdition {
  return getEditionBySlug(FEATURED_EDITION_SLUG) ?? PRIVATE_DISTRIBUTION[0];
}
