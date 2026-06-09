/**
 * Conversion pathway configuration for long-form articles.
 *
 * Maps blog post `category` (and optional path-based context) to:
 *  - two editorial mid-content CTAs (inserted ~30% and ~70% through content)
 *  - three curated "Continue Exploring" destinations shown at article end
 *
 * Keep copy editorial, never advertorial. Aesthetic stays inside the
 * existing luxury system (ivory bg, navy headline, muted gold accent).
 */

export type PathwayTheme =
  | "off-market"
  | "buyer"
  | "seller"
  | "investment"
  | "luxury"
  | "land"
  | "relocation"
  | "market"
  | "default";

export interface InlineCTAConfig {
  eyebrow: string;
  headline: string;
  body: string;
  label: string;
  href: string;
}

export interface PathwayDestination {
  label: string;
  description: string;
  href: string;
}

export interface PathwayConfig {
  mid: [InlineCTAConfig, InlineCTAConfig];
  destinations: [PathwayDestination, PathwayDestination, PathwayDestination];
}

/** Normalize raw blog category strings into a stable theme key. */
export function themeForCategory(rawCategory?: string): PathwayTheme {
  const c = (rawCategory || "").trim().toUpperCase();
  if (c === "OFF-MARKET" || c === "PRIVATE LISTINGS") return "off-market";
  if (c === "BUYER STRATEGY") return "buyer";
  if (c === "SELLER STRATEGY") return "seller";
  if (c === "INVESTMENT") return "investment";
  if (c === "LAND & RANCH") return "land";
  if (c === "RELOCATION") return "relocation";
  if (c === "MARKET INSIGHTS" || c === "NEIGHBORHOODS") return "market";
  if (
    c === "LUXURY ADVISORY" ||
    c === "LUXURY LIVING" ||
    c === "FEATURED LISTING"
  )
    return "luxury";
  return "default";
}

const PATHWAYS: Record<PathwayTheme, PathwayConfig> = {
  "off-market": {
    mid: [
      {
        eyebrow: "Private Network",
        headline: "Access Private & Off-Market Opportunities",
        body:
          "A meaningful share of Austin's $2M+ inventory never reaches the MLS. Echelon Property Group's private network surfaces these quietly, before the broader market sees them.",
        label: "Request Private Access",
        href: "/off-market-real-estate-austin",
      },
      {
        eyebrow: "Confidential Channel",
        headline: "See What Isn't Listed Publicly",
        body:
          "Pocket listings, pre-market estates, and confidential dispositions move through a vetted channel. Join the distribution list to receive briefings as they are released.",
        label: "Join the Distribution",
        href: "/private-opportunities",
      },
    ],
    destinations: [
      {
        label: "Off-Market Real Estate Austin",
        description: "How Echelon Property Group sources private inventory.",
        href: "/off-market-real-estate-austin",
      },
      {
        label: "Private Opportunities",
        description: "Curated, non-public Austin estates and investment positions.",
        href: "/private-opportunities",
      },
      {
        label: "Luxury Market Report",
        description: "Where Austin's $2M+ market is moving this quarter.",
        href: "/austin-luxury-market-report",
      },
    ],
  },
  buyer: {
    mid: [
      {
        eyebrow: "Early Access",
        headline: "Receive New Listings Before They Reach Zillow",
        body:
          "Most serious Austin buyers are working a 48-to-72 hour window. Echelon Property Group's buyer brief delivers new and pre-market inventory the day it surfaces.",
        label: "Request Buyer Brief",
        href: "/buy",
      },
      {
        eyebrow: "Representation",
        headline: "A Quiet Buyer-Side Advantage",
        body:
          "Dedicated buyer representation in Austin's upper tier is about access and pace, not paperwork. Start a confidential conversation with Echelon Property Group.",
        label: "Speak With an Advisor",
        href: "/connect",
      },
    ],
    destinations: [
      {
        label: "Austin Luxury Homes for Sale",
        description: "Current curated inventory across the city's strongest corridors.",
        href: "/austin-luxury-homes-for-sale",
      },
      {
        label: "Buy a Home in Austin",
        description: "The Echelon Property Group buyer process, end to end.",
        href: "/buy",
      },
      {
        label: "Best Neighborhoods in Austin",
        description: "Where Austin buyers are placing real capital this year.",
        href: "/best-neighborhoods-in-austin-texas",
      },
    ],
  },
  seller: {
    mid: [
      {
        eyebrow: "Confidential Review",
        headline: "Request a Confidential Property Review",
        body:
          "Before listing publicly, most $2M+ owners benefit from a private valuation and a quiet test of the network. Echelon Property Group conducts both, on a confidential basis.",
        label: "Request a Review",
        href: "/sell-private",
      },
      {
        eyebrow: "Seller Strategy",
        headline: "A More Discreet Path to Sale",
        body:
          "Public exposure is not the only path. For sensitive dispositions, Echelon Property Group's private channel reaches qualified buyers without a sign in the yard.",
        label: "Explore Private Sale",
        href: "/sell",
      },
    ],
    destinations: [
      {
        label: "Sell Your Austin Home",
        description: "Strategic marketing for $2M+ Austin properties.",
        href: "/sell",
      },
      {
        label: "Sell Privately",
        description: "A confidential, off-MLS pathway for sensitive dispositions.",
        href: "/sell-private",
      },
      {
        label: "Home Value, Austin",
        description: "Begin with a private valuation and a candid market read.",
        href: "/home-value-austin",
      },
    ],
  },
  investment: {
    mid: [
      {
        eyebrow: "Investment Desk",
        headline: "Explore Current Austin Investment Opportunities",
        body:
          "Multifamily, value-add, and land positions move quickly inside Austin's institutional and family-office circles. Echelon Property Group's investment desk tracks what's actually in play.",
        label: "Review Opportunities",
        href: "/austin-real-estate-investment",
      },
      {
        eyebrow: "Market Outlook",
        headline: "Where Capital Is Moving in Austin",
        body:
          "From the 2026 multifamily outlook to land banking and infill, the strongest risk-adjusted positions are not on public portals. See the current desk view.",
        label: "Read the Outlook",
        href: "/austin-multifamily-report-2026",
      },
    ],
    destinations: [
      {
        label: "Austin Real Estate Investment",
        description: "Advisory across multifamily, land, and value-add positions.",
        href: "/austin-real-estate-investment",
      },
      {
        label: "Commercial Real Estate Austin",
        description: "Office, retail, and mixed-use opportunities under review.",
        href: "/austin-commercial-real-estate",
      },
      {
        label: "Multifamily Outlook 2026",
        description: "Where Austin's rental fundamentals are heading next.",
        href: "/austin-multifamily-report-2026",
      },
    ],
  },
  luxury: {
    mid: [
      {
        eyebrow: "Luxury Advisory",
        headline: "A Closer Read on Austin's Luxury Market",
        body:
          "The $2M+ tier in Austin behaves on its own clock. Echelon Property Group publishes the data, the absorption, and the private inventory the citywide median can't see.",
        label: "Read the Market Report",
        href: "/austin-luxury-market-report",
      },
      {
        eyebrow: "Private Representation",
        headline: "Private Representation, On Your Terms",
        body:
          "Whether you are quietly evaluating an estate or preparing to release one to the right audience, the conversation starts privately.",
        label: "Begin a Conversation",
        href: "/connect",
      },
    ],
    destinations: [
      {
        label: "Luxury Real Estate Austin",
        description: "Market analysis and live $2M+ inventory across Austin.",
        href: "/luxury-real-estate-austin",
      },
      {
        label: "Private Opportunities",
        description: "Off-market estates moving through the Echelon Property Group network.",
        href: "/private-opportunities",
      },
      {
        label: "Best Luxury Neighborhoods",
        description: "Westlake, Tarrytown, Lake Austin, and the corridors that compound.",
        href: "/best-luxury-neighborhoods",
      },
    ],
  },
  land: {
    mid: [
      {
        eyebrow: "Land & Ranch",
        headline: "Land, Ranch, and Hill Country Holdings",
        body:
          "From legacy ranches to highest-and-best-use development sites, Echelon Property Group's land desk tracks acreage across Central Texas with discretion.",
        label: "Explore Land & Ranch",
        href: "/land",
      },
      {
        eyebrow: "Development",
        headline: "Development Sites Under Review",
        body:
          "Infill, redevelopment, and entitled positions inside the Austin MSA. The current pipeline is shared on a confidential basis.",
        label: "Review Development Sites",
        href: "/austin-land-development-opportunities",
      },
    ],
    destinations: [
      {
        label: "Land & Ranch",
        description: "Hill Country ranches, live water, and wildlife-exempt acreage.",
        href: "/land",
      },
      {
        label: "Land Development Austin",
        description: "Infill, redevelopment, and entitled site opportunities.",
        href: "/austin-land-development-opportunities",
      },
      {
        label: "Austin Investment",
        description: "Underwriting and structure across land, multifamily, and commercial.",
        href: "/austin-real-estate-investment",
      },
    ],
  },
  relocation: {
    mid: [
      {
        eyebrow: "Relocation",
        headline: "Relocating to Austin? Begin With the Right Map.",
        body:
          "Most relocations to Austin's upper tier hinge on three to five corridors. Echelon Property Group's community guides cut a months-long search to a focused weekend.",
        label: "Read Community Guides",
        href: "/communities",
      },
      {
        eyebrow: "Private Tours",
        headline: "Private, Pre-Visit Briefings",
        body:
          "Before you fly in, Echelon Property Group prepares a discreet, calendar-friendly tour of the corridors that actually fit your brief.",
        label: "Plan a Private Visit",
        href: "/connect",
      },
    ],
    destinations: [
      {
        label: "Moving to Austin Texas",
        description: "A relocation brief for high-net-worth households.",
        href: "/moving-to-austin-texas",
      },
      {
        label: "Austin Communities",
        description: "Editorial guides to Austin's leading luxury neighborhoods.",
        href: "/communities",
      },
      {
        label: "Private Opportunities",
        description: "Quiet listings rarely shown to out-of-market buyers.",
        href: "/private-opportunities",
      },
    ],
  },
  market: {
    mid: [
      {
        eyebrow: "Market Intelligence",
        headline: "The Real Austin Market, Not the Headline Version",
        body:
          "Citywide medians hide what's happening at the $2M+ tier. Echelon Property Group's market intelligence is published monthly for serious buyers and sellers.",
        label: "View Market Intelligence",
        href: "/market-intelligence",
      },
      {
        eyebrow: "Advisory",
        headline: "Translate the Data Into a Decision",
        body:
          "Numbers are useful only when they shape a move. Begin a private conversation about how the current market applies to your specific position.",
        label: "Speak With an Advisor",
        href: "/connect",
      },
    ],
    destinations: [
      {
        label: "Market Intelligence",
        description: "Live absorption, inventory, and pricing across Austin.",
        href: "/market-intelligence",
      },
      {
        label: "Luxury Market Report",
        description: "The $2M+ tier read separately from the citywide median.",
        href: "/austin-luxury-market-report",
      },
      {
        label: "Best Neighborhoods in Austin",
        description: "Where the strongest fundamentals currently sit.",
        href: "/best-neighborhoods-in-austin-texas",
      },
    ],
  },
  default: {
    mid: [
      {
        eyebrow: "Echelon Property Group",
        headline: "A Quieter Way to Move in Austin Real Estate",
        body:
          "Whether you are buying, selling, or simply tracking the market, Echelon Property Group operates as a private advisory rather than a transactional brokerage.",
        label: "Begin a Conversation",
        href: "/connect",
      },
      {
        eyebrow: "Private Network",
        headline: "Inside the Private Austin Market",
        body:
          "The most consequential transactions in Austin are never advertised. See what moves through the Echelon Property Group network each week.",
        label: "Explore Private Opportunities",
        href: "/private-opportunities",
      },
    ],
    destinations: [
      {
        label: "Luxury Real Estate Austin",
        description: "Market analysis and live $2M+ inventory across Austin.",
        href: "/luxury-real-estate-austin",
      },
      {
        label: "Private Opportunities",
        description: "Off-market estates and confidential dispositions.",
        href: "/private-opportunities",
      },
      {
        label: "About Echelon Property Group",
        description: "How Echelon Property Group represents Austin's upper tier.",
        href: "/about-austin-real-estate-advisory",
      },
    ],
  },
};

export function pathwayForCategory(rawCategory?: string): PathwayConfig {
  return PATHWAYS[themeForCategory(rawCategory)];
}
