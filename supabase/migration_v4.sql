-- Migration V4: Staff Update / Handled Attribution Columns on appointments
ALTER TABLE public.appointments 
ADD COLUMN IF NOT EXISTS updated_by_name text,
ADD COLUMN IF NOT EXISTS updated_by_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS updated_by_role text;

CREATE INDEX IF NOT EXISTS idx_appointments_updated_by_role ON public.appointments(updated_by_role);
CREATE INDEX IF NOT EXISTS idx_appointments_updated_by_id ON public.appointments(updated_by_id);
