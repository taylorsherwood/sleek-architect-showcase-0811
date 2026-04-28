-- Lead status enum for tracking Zapier delivery state
CREATE TYPE public.lead_zapier_status AS ENUM ('pending', 'sent', 'failed', 'blocked');

-- Universal leads table — every form submission is captured here
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),

  -- Canonical fields (mirrors Zapier payload)
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  source TEXT NOT NULL DEFAULT 'Website Form',

  -- Page / attribution context
  page_url TEXT,
  referrer TEXT,
  user_agent TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,

  -- Flexible bucket for form-specific extras (budget, address, interest, etc.)
  extra JSONB NOT NULL DEFAULT '{}'::jsonb,

  -- Zapier delivery tracking
  zapier_status public.lead_zapier_status NOT NULL DEFAULT 'pending',
  zapier_error TEXT
);

-- Helpful indexes for admin browsing
CREATE INDEX idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX idx_leads_source ON public.leads (source);
CREATE INDEX idx_leads_zapier_status ON public.leads (zapier_status);
CREATE INDEX idx_leads_email ON public.leads (email);

-- Validation trigger — blocks empty payloads at the database layer too
CREATE OR REPLACE FUNCTION public.validate_lead()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF length(coalesce(trim(NEW.name), '')) = 0 OR length(NEW.name) > 200 THEN
    RAISE EXCEPTION 'Invalid name';
  END IF;
  IF length(coalesce(trim(NEW.email), '')) = 0 OR length(NEW.email) > 255
     OR NEW.email !~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email';
  END IF;
  IF length(coalesce(trim(NEW.phone), '')) = 0
     AND length(coalesce(trim(NEW.message), '')) = 0 THEN
    RAISE EXCEPTION 'Either phone or message must be provided';
  END IF;
  IF length(coalesce(NEW.source, '')) > 200 THEN
    RAISE EXCEPTION 'Invalid source';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_lead_before_insert
BEFORE INSERT ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.validate_lead();

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous visitors) can submit a lead
CREATE POLICY "Anyone can submit a lead"
ON public.leads
FOR INSERT
TO public
WITH CHECK (true);

-- Only admins can read leads
CREATE POLICY "Admins can view leads"
ON public.leads
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update leads (e.g. mark Zapier status)
CREATE POLICY "Admins can update leads"
ON public.leads
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete leads
CREATE POLICY "Admins can delete leads"
ON public.leads
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));