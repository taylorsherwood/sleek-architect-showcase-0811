CREATE TABLE public.booking_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  start_at timestamptz NOT NULL,
  duration_minutes integer NOT NULL DEFAULT 15,
  display_date text,
  display_time text,
  status text NOT NULL DEFAULT 'pending',
  event_id text,
  decided_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.booking_requests TO authenticated;
GRANT ALL ON public.booking_requests TO service_role;
ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins view booking requests" ON public.booking_requests
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));