export interface CommunityHighlight {
  title: string;
  description: string;
}

export interface CommunitySchool {
  name: string;
  grades?: string;
  district?: string;
  enrollment?: number | null;
  ratio?: string | null;
  rating?: string | null;
}

export interface CommunityTransit {
  walk_score?: number | null;
  bike_score?: number | null;
  transit_score?: number | null;
  summary?: string | null;
}

export interface CommunityDemographics {
  population?: number | null;
  median_household_income?: number | null;
  median_age?: number | null;
  homeownership_rate?: number | null;
  education_bachelors_or_higher?: number | null;
  average_household_size?: number | null;
}

export interface CommunityMarketStats {
  median_active_price?: number | null;
  average_active_price?: number | null;
  median_sold_price_area?: number | null;
  average_sold_price_area?: number | null;
  active_inventory_count?: number | null;
  sold_count_last_90_days?: number | null;
  average_dom?: number | null;
  median_price_per_sqft?: number | null;
  /** Qualitative direction of inventory (e.g. "Tightening", "Stable", "Expanding"). */
  inventory_trend?: string | null;
  /** Qualitative read on buyer demand (e.g. "Strong, multiple-offer activity returning"). */
  buyer_demand?: string | null;
  as_of_date?: string | null;
  notes?: string | null;
}

export interface CommunityFAQ {
  question: string;
  answer: string;
}

export interface LocalHighlightItem {
  name: string;
  detail?: string | null;
}

export interface LocalHighlightCategory {
  /** e.g. "Parks", "Restaurants", "Cafes", "Trails" */
  category: string;
  /** Single emoji or short label rendered as the icon. Optional. */
  icon?: string | null;
  /** Curated places in this category. */
  items: LocalHighlightItem[];
}

export interface CommunityRecord {
  id: string;
  slug: string;
  name: string;
  city: string;
  county: string | null;
  hero_image_url: string | null;
  hero_overlay_opacity: number;
  tagline: string | null;
  teaser_summary: string | null;
  full_overview: string | null;
  highlights: CommunityHighlight[];
  our_take: string | null;
  demographics: CommunityDemographics;
  schools: CommunitySchool[];
  transit: CommunityTransit;
  market_stats: CommunityMarketStats;
  realscout_reference: string | null;
  related_communities: string[];
  faqs: CommunityFAQ[];
  local_highlights: LocalHighlightCategory[];
  seo_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  gate_enabled: boolean;
  gate_headline: string | null;
  gate_subheadline: string | null;
  thank_you_message: string | null;
  published: boolean;
  sort_order: number;
  updated_at?: string | null;
}
