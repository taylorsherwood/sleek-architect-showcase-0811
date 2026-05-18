DROP POLICY IF EXISTS "Anyone can update zapier status" ON public.leads;
REVOKE UPDATE (zapier_status, zapier_error) ON public.leads FROM anon;
REVOKE UPDATE (zapier_status, zapier_error) ON public.leads FROM authenticated;