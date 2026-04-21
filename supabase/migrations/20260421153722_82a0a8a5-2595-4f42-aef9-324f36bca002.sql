ALTER TABLE public.communities
  ADD COLUMN IF NOT EXISTS local_highlights JSONB NOT NULL DEFAULT '[]'::jsonb;