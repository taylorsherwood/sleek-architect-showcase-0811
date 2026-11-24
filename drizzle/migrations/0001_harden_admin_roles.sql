CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
  AND (_user_id = auth.uid() OR auth.role() = 'service_role' OR current_user IN ('postgres','service_role'))
$function$;

DROP TRIGGER IF EXISTS on_auth_user_created_admin_bootstrap ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_confirmed_admin_bootstrap ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user_admin_bootstrap();