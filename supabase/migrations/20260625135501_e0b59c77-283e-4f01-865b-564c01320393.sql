-- Restrict the public teaser read policy to anonymous visitors only.
-- Authenticated non-admins previously inherited table-level SELECT privileges
-- on every column, allowing them to bypass the community report gate by
-- querying gated columns (full_overview, our_take, demographics, schools,
-- transit, market_stats, local_highlights) directly via PostgREST.
DROP POLICY IF EXISTS "Anon can read published rows for teaser view" ON public.communities;

CREATE POLICY "Anon can read published rows for teaser view"
ON public.communities
FOR SELECT
TO anon
USING (published = true);

-- Remove broad table-level SELECT from authenticated so column ACLs are the
-- only path for non-admin signed-in users. Admins continue to read via the
-- existing "Admins can view all communities" policy, which runs as the
-- authenticated role and is unaffected by column grants because admins are
-- granted full table SELECT below.
REVOKE SELECT ON public.communities FROM authenticated;

-- Re-grant SELECT on only the teaser columns so that any future authenticated
-- policy (or admin policy) can return them, while gated columns remain
-- inaccessible to non-admin authenticated sessions through PostgREST.
GRANT SELECT (
  id, slug, name, city, county, hero_image_url, hero_overlay_opacity,
  tagline, teaser_summary, highlights, faqs, related_communities,
  sort_order, published, seo_title, meta_description, canonical_url,
  gate_enabled, gate_headline, gate_subheadline, thank_you_message, updated_at
) ON public.communities TO authenticated;

-- Admins read gated columns through the get-community-report edge function
-- (service role) and via the AdminCommunityEditor, which we now route through
-- the service role as well. Ensure service_role retains full access.
GRANT ALL ON public.communities TO service_role;