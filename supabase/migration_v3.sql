-- Migration V3: Staff Booking Attribution Columns on appointments
ALTER TABLE public.appointments 
ADD COLUMN IF NOT EXISTS booked_by_name text DEFAULT 'Online / Website Patient',
ADD COLUMN IF NOT EXISTS booked_by_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS booked_by_role text DEFAULT 'patient';

CREATE INDEX IF NOT EXISTS idx_appointments_booked_by_role ON public.appointments(booked_by_role);
CREATE INDEX IF NOT EXISTS idx_appointments_booked_by_id ON public.appointments(booked_by_id);
