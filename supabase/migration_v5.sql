-- Migration V5: Add email column to staff_profiles and backfill from auth.users
ALTER TABLE public.staff_profiles 
ADD COLUMN IF NOT EXISTS email text;

UPDATE public.staff_profiles p
SET email = u.email
FROM auth.users u
WHERE p.id = u.id AND (p.email IS NULL OR p.email = '');

CREATE INDEX IF NOT EXISTS idx_staff_profiles_email ON public.staff_profiles(email);
