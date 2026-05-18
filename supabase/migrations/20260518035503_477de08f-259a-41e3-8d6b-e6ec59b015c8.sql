-- Tighten "Anyone can submit a lead" policy on public.leads
DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.leads;
CREATE POLICY "Anyone can submit a lead"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(coalesce(trim(name), '')) > 0
  AND length(name) <= 200
  AND length(coalesce(trim(email), '')) > 0
  AND length(email) <= 255
  AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
);

-- Tighten "Anyone can submit a community lead" policy on public.community_leads
DROP POLICY IF EXISTS "Anyone can submit a community lead" ON public.community_leads;
CREATE POLICY "Anyone can submit a community lead"
ON public.community_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(coalesce(trim(first_name), '')) > 0
  AND length(first_name) <= 100
  AND length(coalesce(trim(last_name), '')) > 0
  AND length(last_name) <= 100
  AND length(coalesce(trim(email), '')) > 0
  AND length(email) <= 255
  AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND length(coalesce(trim(phone), '')) >= 7
  AND length(phone) <= 30
  AND length(coalesce(community_slug, '')) > 0
  AND length(community_slug) <= 200
);