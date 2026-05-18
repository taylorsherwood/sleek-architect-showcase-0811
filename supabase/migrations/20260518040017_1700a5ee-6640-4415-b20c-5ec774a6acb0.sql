
-- 1. Remove public access to the full communities table.
DROP POLICY IF EXISTS "Published communities are viewable by everyone" ON public.communities;

-- Admins still need to SELECT the full row.
CREATE POLICY "Admins can view all communities"
ON public.communities
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- 2. Public teaser view — exposes only fields safe to render pre-unlock.
-- security_invoker = false (default) so the view runs as its owner and bypasses RLS;
-- access is controlled exclusively by the GRANT below.
CREATE OR REPLACE VIEW public.communities_public AS
SELECT
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
FROM public.communities
WHERE published = true;

GRANT SELECT ON public.communities_public TO anon, authenticated;
