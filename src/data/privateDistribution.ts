/**
 * Private Distribution types.
 *
 * Content for editions now lives server-side in Supabase
 * (table: public.private_editions). Public teasers are served
 * via the `private_editions_public` view; gated `sections`,
 * `how_this_works`, `sign_off`, `closing_note`, `pdf_url`, and
 * `watermark` are only returned by the `private-distribution-edition`
 * edge function after a valid access token is presented.
 *
 * This file intentionally exports NO content. Anything bundled
 * here would be readable from the client JS regardless of the gate.
 */

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
  label: string;
  value: string;
}

export interface PropertyFeature {
  status: PropertyStatus;
  address: string;
  zone?: string;
  specs: PropertySpec[];
  price: string;
  priceQualifier?: string;
  description: string;
  insightLabel?: string;
  insight: string;
  /** Bundled-asset key, resolved via resolvePrivateImage(). */
  image_key?: string;
  /** Optional override; if present, takes precedence over image_key. */
  image?: string;
  imageAlt?: string;
}

export interface WatchingItem {
  timeline: string;
  where: string;
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
  chapter?: string;
  eyebrow?: string;
  title?: string;
  count?: string;
  body?: string;
  bullets?: string[];
  properties?: PropertyFeature[];
  watching?: WatchingItem[];
  trades?: TradeRow[];
  feature?: PropertyFeature;
  attribution?: string;
}

/** Public teaser fields (safe to expose to anon). */
export interface BriefEditionTeaser {
  slug: string;
  volume?: string | null;
  issueNumber: string;
  market: string;
  edition: string;
  publishedAt: string;
  title: string;
  subtitle: string;
  dek: string;
  fromTheDesk?: string | null;
  heroImageUrl?: string | null;
  isFeatured?: boolean;
  active?: boolean;
}

/** Gated full edition, only returned by edge function with a valid token. */
export interface BriefEdition extends BriefEditionTeaser {
  watermark?: string | null;
  sections: BriefSection[];
  howThisWorks?: string | null;
  signOff?: SignOff | null;
  closingNote?: string | null;
  pdfUrl?: string | null;
}
