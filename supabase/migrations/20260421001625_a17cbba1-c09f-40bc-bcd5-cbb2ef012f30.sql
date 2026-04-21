-- Roles enum and table
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer role check (prevents recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Updated-at trigger function (shared)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Communities table (CMS-editable neighborhood reports)
CREATE TABLE public.communities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT 'Austin',
  county TEXT,
  hero_image_url TEXT,
  hero_overlay_opacity NUMERIC NOT NULL DEFAULT 0.45,
  tagline TEXT,
  teaser_summary TEXT,
  full_overview TEXT,
  highlights JSONB NOT NULL DEFAULT '[]'::jsonb,
  our_take TEXT,
  demographics JSONB NOT NULL DEFAULT '{}'::jsonb,
  schools JSONB NOT NULL DEFAULT '[]'::jsonb,
  transit JSONB NOT NULL DEFAULT '{}'::jsonb,
  market_stats JSONB NOT NULL DEFAULT '{}'::jsonb,
  realscout_reference TEXT,
  related_communities JSONB NOT NULL DEFAULT '[]'::jsonb,
  faqs JSONB NOT NULL DEFAULT '[]'::jsonb,
  seo_title TEXT,
  meta_description TEXT,
  canonical_url TEXT,
  gate_enabled BOOLEAN NOT NULL DEFAULT true,
  gate_headline TEXT,
  gate_subheadline TEXT,
  thank_you_message TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published communities are viewable by everyone"
  ON public.communities FOR SELECT
  USING (published = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert communities"
  ON public.communities FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update communities"
  ON public.communities FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete communities"
  ON public.communities FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_communities_updated_at
  BEFORE UPDATE ON public.communities
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_communities_slug ON public.communities(slug);
CREATE INDEX idx_communities_published ON public.communities(published);

-- Community leads table (gate submissions)
CREATE TABLE public.community_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  community_slug TEXT NOT NULL,
  community_name TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  interest TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  referrer TEXT,
  page_url TEXT,
  user_agent TEXT,
  source_tag TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.community_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a community lead"
  ON public.community_leads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view community leads"
  ON public.community_leads FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage community leads"
  ON public.community_leads FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_community_leads_slug ON public.community_leads(community_slug);
CREATE INDEX idx_community_leads_created ON public.community_leads(created_at DESC);