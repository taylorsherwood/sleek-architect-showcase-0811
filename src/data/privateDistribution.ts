/**
 * Private Distribution — recurring private market intelligence editions.
 *
 * Each edition is a self-contained "brief": metadata, a teaser block that
 * may be indexed, and a sequence of gated sections that only appear after
 * the reader submits the access form. Structured so future editions can
 * be added by appending an object — no layout changes required.
 */

import almarionImg from "@/assets/private-distribution/almarion-drive.jpg";
import flintridgeImg from "@/assets/private-distribution/flintridge-road.jpg";
import mistywoodImg from "@/assets/private-distribution/mistywood-drive-interior.png";


export type BriefSectionType =
  | "observation"
  | "properties"
  | "watching"
  | "trades"
  | "feature"
  | "commentary"
  | "note";

export type PropertyStatus = "Pocket Listing" | "Pre-Market" | "Off-Market" | "Active";

export interface PropertySpec {
  label: string; // "Beds", "Interior", "Lot", "Built"
  value: string; // "6", "5,519 sf", "0.73 ac", "2009"
}

export interface PropertyFeature {
  status: PropertyStatus;
  address: string;        // "Almarion Drive · Rollingwood"
  zone?: string;          // "78746 · Eanes ISD"
  specs: PropertySpec[];
  price: string;          // "$13,900,000"
  priceQualifier?: string;
  description: string;
  insightLabel?: string;  // default "Why It Matters"
  insight: string;
  image?: string;         // imported asset URL
  imageAlt?: string;
}

export interface WatchingItem {
  timeline: string;       // "Expected · 30–60 days"
  where: string;          // "Tarrytown · West 35th area"
  note: string;
}

export interface TradeRow {
  address: string;
  neighborhood?: string;
  closedPrice: string;
  notes?: string;
}

export interface SignOff {
  name: string;
  title: string;
  phone?: string;
  email?: string;
  website?: string;
  handle?: string;
}

export interface BriefSection {
  id: string;
  type: BriefSectionType;
  /** Roman or numeric chapter marker for the section header (e.g. "I", "II"). */
  chapter?: string;
  eyebrow?: string;
  title?: string;
  /** Count chip in the section header, e.g. "04 properties". */
  count?: string;
  body?: string;
  bullets?: string[];
  properties?: PropertyFeature[];
  watching?: WatchingItem[];
  trades?: TradeRow[];
  feature?: PropertyFeature;
  attribution?: string;
}

export interface BriefEdition {
  slug: string;
  volume?: string;            // "Volume I"
  issueNumber: string;        // "Edition No. 04"
  market: string;             // "78746 · Westlake"
  edition: string;            // "May 2026 Edition"
  publishedAt: string;        // ISO date
  watermark?: string;         // oversize watermark in hero (e.g. "78746")
  title: string;              // "The 78746 Brief"
  subtitle: string;           // editorial subhead
  dek: string;                // 1-2 sentence public teaser
  fromTheDesk?: string;       // public "Editor's note"
  sections: BriefSection[];   // gated content
  howThisWorks?: string;      // gated explainer near sign-off
  signOff?: SignOff;
  closingNote?: string;
  pdfUrl?: string;
  /** When false, the edition is hidden from the index page. */
  active?: boolean;
}

export const PRIVATE_DISTRIBUTION: BriefEdition[] = [
  {
    slug: "78746-may-2026",
    volume: "VOLUME I",
    issueNumber: "EDITION NO. 04",
    market: "78746 · Austin, TX",
    edition: "MAY 2026 EDITION",
    publishedAt: "2026-05-01",
    watermark: "78746",
    title: "The 78746 Brief",
    subtitle:
      "An off-market dossier on Westlake, Rollingwood, and the Eanes corridor — circulated only to qualified buyers.",
    dek:
      "An off-market dossier on Westlake, Rollingwood, and the Eanes corridor — circulated only to qualified buyers.",
    fromTheDesk:
      "May has been quieter on paper than the headlines suggest. Three of the four properties below never touched MLS. Two won't. Inventory in Eanes ISD is up 11% year-over-year but the homes that actually trade still go in under three weeks — the gap is real, the floor isn't moving. If something here lines up with your timing, reply to the email this came attached to.",
    sections: [
      {
        id: "active-off-market",
        type: "properties",
        chapter: "I",
        eyebrow: "Active · Off-Market",
        title: "Active · Off-Market",
        count: "03 properties",
        properties: [
          {
            status: "Pocket Listing",
            address: "Almarion Drive · Rollingwood",
            zone: "78746 · Eanes ISD",
            specs: [
              { label: "Beds", value: "6" },
              { label: "Baths", value: "6" },
              { label: "Interior", value: "5,519 sf" },
              { label: "Lot", value: "0.73 ac" },
            ],
            price: "$13,900,000",
            description:
              "The Monarch — a Christopher Sanders mid-century completed in 2023, set on what was once part of the original Hatley estate, the founding grounds of Rollingwood. The architect's signature folded-hinge geometry orients every upstairs room to a full downtown skyline view, with Lake Austin in profile and the ACL main stage visible in the distance. Pool with screened lounge and fireplace, separate casita with kitchenette and laundry, infrared and hot-rock sauna, gym, dedicated office, three-car garage. Floor plan engineered to expand without compromising flow.",
            insight:
              "Sanders's final residential work. Downtown-facing trophy parcels at this scale almost never trade publicly in Rollingwood — direct access here is the differentiator.",
            image: almarionImg,
            imageAlt: "Living room with downtown Austin skyline view — Almarion Drive, Rollingwood",
          },
          {
            status: "Pocket Listing",
            address: "Flintridge Road · West Lake Hills",
            zone: "78746 · Eanes ISD",
            specs: [
              { label: "Beds", value: "5" },
              { label: "Baths", value: "4" },
              { label: "Interior", value: "3,605 sf" },
              { label: "Lot", value: "2.14 ac" },
            ],
            price: "$3,400,000",
            description:
              "A complete gut renovation of a 1978 ranch on 2.14 acres inside West Lake Hills city limits. Vaulted ceilings with exposed beams, fluted Taj Mahal quartzite kitchen with integrated Thermador appliances, two distinct living spaces, new pool and spa. Split single-story plan with the primary suite at the rear overlooking the pool and a full in-law suite at the opposite end. Circular drive, room on the lot for a carriage house or second garage.",
            insight:
              "Two-plus acres inside West Lake Hills city limits is the rarest land profile in 78746. Finding it paired with a fully reset single-story is essentially a unicorn — these don't come back around.",
            image: flintridgeImg,
            imageAlt: "Renovated kitchen with quartzite island and alabaster pendants — Flintridge Road, West Lake Hills",
          },
          {
            status: "Pocket Listing",
            address: "Mistywood Drive · Westlake",
            zone: "78746 · Eanes ISD",
            specs: [
              { label: "Beds", value: "4" },
              { label: "Baths", value: "2.5" },
              { label: "Interior", value: "2,852 sf" },
              { label: "Lot", value: "0.23 ac" },
            ],
            price: "$1,799,000",
            description:
              "A creek-backed Westlake home with a pool and a genuinely usable yard — the kind of lot that's increasingly hard to find at this price point. Walking distance to all three Eanes ISD schools and bikeable to Zilker. Dedicated office off the entry, main-level game room as a flexible second living space, kitchen designed to open to the backyard.",
            insight:
              "Sub-$1.8M in Westlake with a pool, a real backyard, and walking distance to all three Eanes schools is the single most demanded profile in the corridor for relocating families.",
            image: mistywoodImg,
            imageAlt: "Modern open-plan living and kitchen with floor-to-ceiling windows — Mistywood Drive, Westlake",
          },
        ],
      },
      {
        id: "on-the-radar",
        type: "watching",
        chapter: "II",
        eyebrow: "On the Radar",
        title: "On the Radar",
        count: "02 properties",
        watching: [
          {
            timeline: "Expected · 30–60 days",
            where: "Tarrytown · West 35th area",
            note:
              "Long-time owners preparing for a downsize. Lakeview frontage, dock rights. Currently estimating $5.5–6M range; we'll see specs in 3 weeks.",
          },
          {
            timeline: "Expected · Q3 2026",
            where: "Davenport Ranch · Pascal Lane",
            note:
              "New build wrapping up. Spec home from a builder we've sold three times for. Likely $4.2–4.5M; pre-construction allocation possible.",
          },
        ],
      },
    ],
    howThisWorks:
      "The Brief circulates monthly to a short list of qualified buyers. Properties on it are either off-MLS, pre-MLS, or expired inventory I can re-open quietly. If something resonates, a reply is enough — I'll share the address, full marketing materials, and we can decide together whether to pursue.",
    signOff: {
      name: "Taylor Sherwood",
      title: "Principal · Echelon Property Group",
      phone: "(512) 661-3843",
      email: "taylor@echelonpropertygroup.com",
      website: "echelonpropertygroup.com",
      handle: "@TheInvestorBroker",
    },
    closingNote:
      "Echelon Property Group · Affiliated with eXp Realty, LLC · Texas Real Estate License #734520. This document is for the use of the named recipient only. Information believed accurate, not guaranteed.",
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
