
-- Drop the previously-created view; replace with column-level grants.
DROP VIEW IF EXISTS public.communities_public;

-- Re-add a public SELECT policy for anon on published rows; column grants limit what they can read.
CREATE POLICY "Anon can view published community teasers"
ON public.communities
FOR SELECT
TO anon
USING (published = true);

-- Strip default SELECT grant from anon, then grant only teaser columns.
REVOKE SELECT ON public.communities FROM anon;

GRANT SELECT (
  id,
  slug,
  name,
  city,
  county,
  hero_image_url,
  hero_overlay_opacity,
  tagline,
  teaser_summary,
  highlights,
  faqs,
  related_communities,
  sort_order,
  published,
  seo_title,
  meta_description,
  canonical_url,
  gate_enabled,
  gate_headline,
  gate_subheadline,
  thank_you_message,
  updated_at
) ON public.communities TO anon;
