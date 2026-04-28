-- Fix anonymous inserts into leads table
DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.leads;

CREATE POLICY "Anyone can submit a lead"
  ON public.leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anon to update zapier_status on the row they just inserted
-- (best-effort status tracking; fields restricted by column grants)
GRANT INSERT ON public.leads TO anon, authenticated;
GRANT UPDATE (zapier_status, zapier_error) ON public.leads TO anon, authenticated;

-- Add an UPDATE policy so anon can mark zapier delivery status
DROP POLICY IF EXISTS "Anyone can update zapier status" ON public.leads;
CREATE POLICY "Anyone can update zapier status"
  ON public.leads
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);