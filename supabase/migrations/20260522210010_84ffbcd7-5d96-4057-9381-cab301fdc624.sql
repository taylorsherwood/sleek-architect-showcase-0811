-- Switch view to security_invoker so it inherits caller's RLS / grants
DROP VIEW IF EXISTS public.private_editions_public;

-- Grant anon SELECT on teaser columns ONLY (gated columns remain unreachable)
GRANT SELECT (id, slug, volume, issue_number, market, edition_label, published_at,
              watermark, title, subtitle, dek, from_the_desk, hero_image_url,
              sort_order, active, is_featured)
  ON public.private_editions TO anon;

-- Anon can read only active editions
CREATE POLICY "Anon can view active private editions"
  ON public.private_editions
  FOR SELECT TO anon
  USING (active = true);

CREATE VIEW public.private_editions_public
WITH (security_invoker = on) AS
  SELECT id, slug, volume, issue_number, market, edition_label, published_at,
         watermark, title, subtitle, dek, from_the_desk, hero_image_url,
         sort_order, active, is_featured
  FROM public.private_editions
  WHERE active = true;

GRANT SELECT ON public.private_editions_public TO anon, authenticated;