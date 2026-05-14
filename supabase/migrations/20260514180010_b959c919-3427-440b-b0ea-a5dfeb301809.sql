
-- LISTINGS
CREATE TABLE public.listings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  address TEXT,
  neighborhood TEXT,
  city TEXT DEFAULT 'Austin',
  state TEXT DEFAULT 'TX',
  zip TEXT,
  price NUMERIC,
  status TEXT DEFAULT 'active',
  mls_number TEXT,
  hero_image_url TEXT,
  hero_video_url TEXT,
  short_intro TEXT,
  full_description TEXT,
  beds NUMERIC,
  baths NUMERIC,
  sqft INTEGER,
  acres NUMERIC,
  year_built INTEGER,
  property_type TEXT,
  agent_name TEXT,
  agent_phone TEXT,
  agent_email TEXT,
  agent_headshot_url TEXT,
  meta_title TEXT,
  meta_description TEXT,
  og_image_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_listings_slug ON public.listings(slug);
CREATE INDEX idx_listings_published ON public.listings(is_published);

ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published listings viewable by everyone"
ON public.listings FOR SELECT TO public
USING (is_published = true OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert listings"
ON public.listings FOR INSERT TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update listings"
ON public.listings FOR UPDATE TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete listings"
ON public.listings FOR DELETE TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_listings_updated_at
BEFORE UPDATE ON public.listings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- STORY SECTIONS
CREATE TABLE public.story_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  section_type TEXT NOT NULL,
  title TEXT,
  eyebrow TEXT,
  body TEXT,
  media_url TEXT,
  secondary_media_url TEXT,
  video_url TEXT,
  button_label TEXT,
  button_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  animation_style TEXT DEFAULT 'fade',
  background_style TEXT DEFAULT 'ivory',
  is_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_story_sections_listing ON public.story_sections(listing_id, display_order);

ALTER TABLE public.story_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Story sections viewable when parent published"
ON public.story_sections FOR SELECT TO public
USING (
  EXISTS (SELECT 1 FROM public.listings l WHERE l.id = listing_id AND (l.is_published = true OR has_role(auth.uid(), 'admin'::app_role)))
);

CREATE POLICY "Admins can manage story sections"
ON public.story_sections FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_story_sections_updated_at
BEFORE UPDATE ON public.story_sections
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- LISTING MEDIA
CREATE TABLE public.listing_media (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  media_url TEXT NOT NULL,
  media_type TEXT NOT NULL DEFAULT 'gallery',
  caption TEXT,
  alt_text TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  focal_point TEXT DEFAULT 'center',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_listing_media_listing ON public.listing_media(listing_id, display_order);

ALTER TABLE public.listing_media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Media viewable when parent published"
ON public.listing_media FOR SELECT TO public
USING (
  EXISTS (SELECT 1 FROM public.listings l WHERE l.id = listing_id AND (l.is_published = true OR has_role(auth.uid(), 'admin'::app_role)))
);

CREATE POLICY "Admins can manage listing media"
ON public.listing_media FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- LISTING LEADS
CREATE TABLE public.listing_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id UUID REFERENCES public.listings(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  source TEXT DEFAULT 'listing_story',
  page_url TEXT,
  cta_clicked TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_listing_leads_listing ON public.listing_leads(listing_id);

ALTER TABLE public.listing_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a listing lead"
ON public.listing_leads FOR INSERT TO public
WITH CHECK (
  length(coalesce(trim(name), '')) > 0 AND length(name) <= 200
  AND length(coalesce(trim(email), '')) > 0 AND length(email) <= 255
  AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
);

CREATE POLICY "Admins can view listing leads"
ON public.listing_leads FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage listing leads"
ON public.listing_leads FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- STORAGE BUCKET for listing media uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('listing-media', 'listing-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Listing media publicly readable"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'listing-media');

CREATE POLICY "Admins can upload listing media"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'listing-media' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update listing media"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'listing-media' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete listing media"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'listing-media' AND has_role(auth.uid(), 'admin'::app_role));
