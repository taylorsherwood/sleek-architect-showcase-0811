-- Restore anonymous read access to teaser columns on public.communities.
-- The prior cleanup dropped the anon SELECT policy, which broke every
-- community and community report page for logged-out visitors (they now
-- see "Report Not Available"). Re-grant SELECT to anon on ONLY the
-- teaser-safe columns and recreate the RLS policy limiting rows to
-- published communities. Gated columns (full_overview, our_take,
-- demographics, market_stats, schools, transit, local_highlights) remain
-- inaccessible to anon because they are not in the column grant list.

GRANT SELECT (
  id, slug, name, city, county, hero_image_url, hero_overlay_opacity,
  tagline, teaser_summary, highlights, faqs, related_communities,
  sort_order, published, seo_title, meta_description, canonical_url,
  gate_enabled, gate_headline, gate_subheadline, thank_you_message, updated_at
) ON public.communities TO anon;

DROP POLICY IF EXISTS "Anon can read published rows for teaser view" ON public.communities;
CREATE POLICY "Anon can read published rows for teaser view"
ON public.communities
FOR SELECT
TO anon
USING (published = true);