
-- Remove the broad anon read policy on the base table.
DROP POLICY IF EXISTS "Anon can view active private editions" ON public.private_editions;

-- Switch the public teaser view to run as its owner so it can bypass RLS
-- on the base table for the explicitly whitelisted columns only.
ALTER VIEW public.private_editions_public SET (security_invoker = off);

-- Ensure anon/authenticated can only read the teaser view, never the base table.
REVOKE ALL ON public.private_editions FROM anon, authenticated;
GRANT SELECT ON public.private_editions_public TO anon, authenticated;
