-- ── Listings: hide agent contact PII from public reads ──────────────
-- Application code does not read agent_phone / agent_email anywhere;
-- only admins ever needed these, and admin tooling does not select
-- them. Revoke column-level SELECT from anon and authenticated so
-- the public "Published listings viewable by everyone" RLS policy
-- cannot expose these fields.
REVOKE SELECT (agent_phone, agent_email) ON public.listings FROM anon;
REVOKE SELECT (agent_phone, agent_email) ON public.listings FROM authenticated;

-- ── Communities: re-assert column-level lockdown for anon ───────────
-- The "Anon can view published community teasers" RLS policy allows
-- SELECT on any column of published rows; column-level grants are
-- what actually keep gated fields private. Re-assert the revoke so
-- it survives schema resets.
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
  seo_title,
  meta_description,
  canonical_url,
  gate_enabled,
  gate_headline,
  gate_subheadline,
  thank_you_message,
  sort_order,
  published,
  created_at,
  updated_at
) ON public.communities TO anon;