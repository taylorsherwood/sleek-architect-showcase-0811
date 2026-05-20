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
import mistywoodImg from "@/assets/private-distribution/mistywood-drive.jpg";
import westlakeModernImg from "@/assets/private-distribution/mistywood-drive-interior.png";


export type BriefSectionType =
  | "observation"
  | "properties"
  | "watching"
  | "trades"
  | "feature"
  | "commentary"
  | "note";

export type PropertyStatus = "Private Listing" | "Pre-Market" | "Off-Market" | "Active";

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
        count: "04 properties",
        properties: [
          {
            status: "Private Listing",
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
            status: "Private Listing",
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
            status: "Pre-Market",
            address: "Westlake · Modern Under $2M",
            zone: "78746 · Eanes ISD",
            specs: [
              { label: "Beds", value: "3" },
              { label: "Baths", value: "2.5" },
              { label: "Interior", value: "2,000 sf" },
              { label: "Built", value: "2009" },
            ],
            price: "$1,990,000",
            description:
              "A 2009 modern build inside Westlake — compact at 2,000 sf, but engineered for light and a real view from a price point that almost never holds modern, move-in ready inventory in this district. Listing brokerage releasing photos late May; we have a window to preview before the broader market sees it. Address held until launch.",
            insight:
              "Sub-$2M Eanes inventory disappears in days when it's actually move-in ready. Modern with views at this price point is the rarest combination in the corridor.",
            image: westlakeModernImg,
            imageAlt: "Modern open-plan living and kitchen with floor-to-ceiling windows — Westlake pre-market home",
          },
          {
            status: "Private Listing",
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
  {
    slug: "78703-may-2026",
    volume: "VOLUME I",
    issueNumber: "EDITION NO. 01",
    market: "78703 · Austin, TX",
    edition: "MAY 2026 EDITION",
    publishedAt: "2026-05-20",
    watermark: "78703",
    title: "The 78703 Brief",
    subtitle:
      "An off-market dossier on Tarrytown, Old Enfield, and the west side of central Austin — circulated only to qualified buyers.",
    dek:
      "An off-market dossier on Tarrytown, Old Enfield, and the west side of central Austin — circulated only to qualified buyers.",
    fromTheDesk:
      "Three of the four below are held off-market or priced on request — which tells you most of what you need to know about 78703 right now. Tarrytown and Old Enfield don't have an inventory problem so much as an access problem: the best houses move through relationships, not the MLS. This edition runs from a 1927 Kreïsle estate to a brand-new Tarrytown build to a 42nd-floor penthouse over Lady Bird Lake — the full range of how this zip actually lives. If one of them fits, reply to the email this came attached to.",
    sections: [
      {
        id: "active-off-market",
        type: "properties",
        chapter: "I",
        eyebrow: "Active · Off-Market",
        title: "Active · Off-Market",
        count: "04 properties",
        properties: [
          {
            status: "Private Listing",
            address: "Windsor Road · Old Enfield",
            zone: "78703 · Austin ISD",
            specs: [
              { label: "Beds", value: "6" },
              { label: "Baths", value: "6F · 4H" },
              { label: "Built", value: "1927" },
              { label: "Lot", value: "1.13 ac" },
            ],
            price: "$17,900,000",
            description:
              "A 1927 Tudor estate by architect Edwin F. Kreïsle, set behind fieldstone walls on ~1.13 gated acres — an English garden compound of five freestanding structures: the main residence, guest house, garage apartment, gate house, and a glass conservatory. Steeply pitched slate roofs, ornamental half-timbering, hand-forged ironwork, and panoramic views from the UT Tower to the Capitol. Inside, a paneled library with hand-carved ceiling and concealed doors, a living room with plaster detail modeled on The Breakers in Newport, reclaimed longleaf pine in the kitchen, and a commercial elevator across levels. A brick drive crosses a private stone bridge over a koi pond to grounds with an English-fountain pool.",
            insight:
              "One of Austin's most architecturally significant residences. Pre-war estates of this provenance in Old Enfield are generational holdings — they almost never trade, and never quietly. Direct access is the entire game here.",
          },
          {
            status: "Pre-Market",
            address: "Greenlee Drive · Tarrytown",
            zone: "78703 · Austin ISD",
            specs: [
              { label: "Beds", value: "6" },
              { label: "Baths", value: "7F · 1H" },
              { label: "Interior", value: "9,500 sf" },
              { label: "Lot", value: "0.65 ac" },
            ],
            price: "Price Upon Request",
            description:
              "A soon-to-be-completed European-inspired estate behind gates on one of Tarrytown's most private streets — ~9,500 sf by Nomad Design Build with interiors by Jenny Mason Designs. A formal dining salon with glass courtyard walls anchors the main level; dual catering pantries, a second-level speakeasy lounge with full bar, and a paneled billiards-and-club room with concealed doors handle entertaining at scale. The two-level primary retreat connects a main-level wing to an upstairs dressing salon by sculptural spiral stair. A lantern-lined motor court opens to a resort-style pool and spa with a covered loggia and outdoor fireplace.",
            insight:
              "New-construction estates at this scale in Tarrytown are almost always spoken for before completion. A pre-completion allocation is the only way in at this level — and there's still a window to influence final selections.",
          },
          {
            status: "Private Listing",
            address: "McCullough Street · Tarrytown",
            zone: "78703 · Austin ISD",
            specs: [
              { label: "Beds", value: "5" },
              { label: "Baths", value: "4F · 1H" },
              { label: "Interior", value: "4,789 sf" },
              { label: "Lot", value: "0.23 ac" },
            ],
            price: "$2,950,000",
            description:
              "A custom-built residence in the heart of Tarrytown — ~4,789 sf on a 10,000+ sf lot, with a new stucco exterior and a renovated kitchen built for both intimate dinners and larger gatherings. The primary suite is down, with a studs-out remodeled bath in marble: freestanding soaker tub, steam shower, dual vanities, custom walk-in closet. Five bedrooms plus an office that lives as a sixth, two additional living spaces, and room on the lot to add a pool. Minutes to Lake Austin, Casis Elementary, and downtown.",
            insight:
              "Primary-down, five bedrooms, Casis zoning, under $3M — the exact profile relocating families fight over in Tarrytown, and one that rarely surfaces with a fully reset single-level primary.",
          },
          {
            status: "Private Listing",
            address: "Bowie Street · West Downtown",
            zone: "78703 · Austin ISD",
            specs: [
              { label: "Beds", value: "3" },
              { label: "Baths", value: "3F · 1H" },
              { label: "Interior", value: "3,614 sf" },
              { label: "Floor", value: "42nd" },
            ],
            price: "Price Upon Request",
            description:
              "A two-story penthouse on the 42nd floor of the Spring, designed by Dick Clark Architecture, with floor-to-ceiling glass on every wall framing Lady Bird Lake, downtown, and the Hill Country. Italian cabinetry, imported marble, Wolf and Bosch appliances, a Sub-Zero, and an EcoSmart fireplace; a private rooftop terrace with custom seating and landscaping that has hosted live performances. Three garage spaces, two private storage units, 24/7 concierge, heated pool. Whole Foods and Trader Joe's across the street, Lady Bird Lake two blocks down.",
            insight:
              "Two-story penthouses with private terraces in the Spring rarely list — and almost never publicly. The lock-and-leave counterweight to a Tarrytown estate, for a buyer who wants the lake and downtown at the door.",
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
            where: "Pemberton Heights · near Pease Park",
            note:
              "Estate sale of a 1930s original on an oversized lot. Heirs deciding between a quiet direct sale and a renovate-and-list. Early-mover advantage if it goes direct — we're in the conversation.",
          },
          {
            timeline: "Expected · Q3 2026",
            where: "Clarksville · West Lynn corridor",
            note:
              "Architect's personal residence likely to free up on a relocation — modern infill on a rare double lot. Pre-market preview possible before it's formally shopped.",
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
