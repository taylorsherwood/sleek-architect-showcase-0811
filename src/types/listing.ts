export type SectionType =
  | "editorial_text"
  | "full_bleed_image"
  | "image_text_split"
  | "quote"
  | "gallery"
  | "video"
  | "floorplan"
  | "matterport"
  | "map"
  | "neighborhood"
  | "renovation_highlights"
  | "lifestyle"
  | "cta";

export const SECTION_TYPES: { value: SectionType; label: string }[] = [
  { value: "editorial_text", label: "Editorial Text" },
  { value: "full_bleed_image", label: "Full-Bleed Image" },
  { value: "image_text_split", label: "Image / Text Split" },
  { value: "quote", label: "Pull Quote" },
  { value: "gallery", label: "Gallery" },
  { value: "video", label: "Video" },
  { value: "floorplan", label: "Floorplan" },
  { value: "matterport", label: "Matterport / 3D Tour" },
  { value: "map", label: "Map" },
  { value: "neighborhood", label: "Neighborhood" },
  { value: "renovation_highlights", label: "Renovation / Before-After" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "cta", label: "Call to Action" },
];

export interface Listing {
  id: string;
  slug: string;
  title: string;
  address: string | null;
  neighborhood: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  price: number | null;
  status: string | null;
  mls_number: string | null;
  hero_image_url: string | null;
  hero_video_url: string | null;
  short_intro: string | null;
  full_description: string | null;
  beds: number | null;
  baths: number | null;
  sqft: number | null;
  acres: number | null;
  year_built: number | null;
  property_type: string | null;
  agent_name: string | null;
  agent_phone: string | null;
  agent_email: string | null;
  agent_headshot_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  og_image_url: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface StorySection {
  id: string;
  listing_id: string;
  section_type: SectionType;
  title: string | null;
  eyebrow: string | null;
  body: string | null;
  media_url: string | null;
  secondary_media_url: string | null;
  video_url: string | null;
  button_label: string | null;
  button_url: string | null;
  display_order: number;
  animation_style: string | null;
  background_style: string | null;
  is_visible: boolean;
}

export interface ListingMedia {
  id: string;
  listing_id: string;
  media_url: string;
  media_type: string;
  caption: string | null;
  alt_text: string | null;
  display_order: number;
  is_featured: boolean;
  focal_point: string | null;
}
