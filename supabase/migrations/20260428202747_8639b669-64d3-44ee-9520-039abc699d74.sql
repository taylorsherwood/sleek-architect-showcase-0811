GRANT INSERT, SELECT ON public.leads TO anon, authenticated, service_role;
GRANT UPDATE ON public.leads TO authenticated, service_role;
GRANT UPDATE (zapier_status, zapier_error) ON public.leads TO anon;
GRANT DELETE ON public.leads TO authenticated, service_role;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;