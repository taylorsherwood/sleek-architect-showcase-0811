CREATE TABLE public.community_report_grants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  community_slug text NOT NULL,
  email text NOT NULL,
  token_hash text NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '30 days'),
  created_at timestamptz NOT NULL DEFAULT now(),
  last_accessed_at timestamptz
);
GRANT ALL ON public.community_report_grants TO service_role;
GRANT SELECT ON public.community_report_grants TO authenticated;
ALTER TABLE public.community_report_grants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins view report grants" ON public.community_report_grants
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));