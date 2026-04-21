CREATE OR REPLACE FUNCTION public.validate_community_lead()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF length(coalesce(NEW.first_name, '')) = 0 OR length(NEW.first_name) > 100 THEN
    RAISE EXCEPTION 'Invalid first_name';
  END IF;
  IF length(coalesce(NEW.last_name, '')) = 0 OR length(NEW.last_name) > 100 THEN
    RAISE EXCEPTION 'Invalid last_name';
  END IF;
  IF length(coalesce(NEW.email, '')) = 0 OR length(NEW.email) > 255
     OR NEW.email !~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email';
  END IF;
  IF length(coalesce(NEW.phone, '')) < 7 OR length(NEW.phone) > 30 THEN
    RAISE EXCEPTION 'Invalid phone';
  END IF;
  IF length(coalesce(NEW.community_slug, '')) = 0 OR length(NEW.community_slug) > 200 THEN
    RAISE EXCEPTION 'Invalid community_slug';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_community_lead_trigger
  BEFORE INSERT ON public.community_leads
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_community_lead();