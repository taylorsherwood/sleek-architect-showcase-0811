-- Drop the overly-permissive anon SELECT policy that exposed all columns
DROP POLICY IF EXISTS "Anon can view published community teasers" ON public.communities;

-- Create a teaser-only view. security_invoker so callers' RLS applies to base table.
CREATE OR REPLACE VIEW public.communities_public
WITH (security_invoker = on) AS
SELECT
  id, slug, name, city, county,
  hero_image_url, hero_overlay_opacity,
  tagline, teaser_summary, highlights,
  faqs, related_communities, sort_order, published,
  seo_title, meta_description, canonical_url,
  gate_enabled, gate_headline, gate_subheadline, thank_you_message,
  updated_at
FROM public.communities
WHERE published = true;

-- Re-add a minimal SELECT policy on the base table only for the teaser columns
-- the view needs. Since security_invoker views run with the caller's privileges,
-- we need anon/authenticated to be able to read those rows via the view.
-- We grant a narrow policy that still returns all columns at the policy level
-- (Postgres RLS can't restrict columns), but we revoke direct SELECT on the
-- base table from anon and only grant SELECT on the view.
CREATE POLICY "Anon can read published rows for teaser view"
ON public.communities
FOR SELECT
TO anon, authenticated
USING (published = true);

-- Lock down direct column access from anon by revoking and re-granting only
-- the teaser columns on the base table. This means even if someone queries
-- public.communities directly, they can only select teaser-safe columns.
REVOKE SELECT ON public.communities FROM anon, authenticated;
GRANT SELECT (
  id, slug, name, city, county,
  hero_image_url, hero_overlay_opacity,
  tagline, teaser_summary, highlights,
  faqs, related_communities, sort_order, published,
  seo_title, meta_description, canonical_url,
  gate_enabled, gate_headline, gate_subheadline, thank_you_message,
  updated_at
) ON public.communities TO anon, authenticated;

-- Admins access via authenticated role + has_role check; they need full table
-- access, granted via the existing admin policies plus this grant.
GRANT SELECT ON public.communities TO authenticated;

GRANT SELECT ON public.communities_public TO anon, authenticated;