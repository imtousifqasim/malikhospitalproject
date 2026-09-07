-- ==============================================================================
-- MALIK MEDICAL COMPLEX — SUPABASE DATABASE SCHEMA & RLS POLICIES
-- ==============================================================================
-- Execute this entire script inside the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql/new
-- ==============================================================================

-- 1. Enable required extensions
create extension if not exists "uuid-ossp";

-- 2. Staff Profiles Table (linked 1:1 with auth.users)
create table if not exists public.staff_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null check (role in ('admin', 'staff')),
  phone text,
  avatar_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index for role lookups
create index if not exists idx_staff_profiles_role on public.staff_profiles(role);
create index if not exists idx_staff_profiles_is_active on public.staff_profiles(is_active);

-- 3. Appointments Table
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  token text not null,
  patient_name text not null,
  phone text not null,
  gender text,
  age text,
  patient_type text default 'New Patient',
  visit_type text default 'opd',
  department text,
  doctor text,
  date date not null,
  time_slot text not null,
  symptoms text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indices for rapid filtering
create index if not exists idx_appointments_date on public.appointments(date desc);
create index if not exists idx_appointments_department on public.appointments(department);
create index if not exists idx_appointments_doctor on public.appointments(doctor);
create index if not exists idx_appointments_status on public.appointments(status);
create index if not exists idx_appointments_token on public.appointments(token);

-- 4. Contact Messages Table
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  subject text,
  message text not null,
  department text,
  status text not null default 'unread' check (status in ('unread', 'read', 'replied', 'archived')),
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_contact_messages_status on public.contact_messages(status);
create index if not exists idx_contact_messages_created_at on public.contact_messages(created_at desc);

-- 5. Helper Functions with SECURITY DEFINER to prevent RLS recursion
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.staff_profiles
    where id = auth.uid() and role = 'admin' and is_active = true
  );
$$;

create or replace function public.is_staff_or_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.staff_profiles
    where id = auth.uid() and is_active = true
  );
$$;

-- 6. Enable Row Level Security (RLS)
alter table public.staff_profiles enable row level security;
alter table public.appointments enable row level security;
alter table public.contact_messages enable row level security;

-- ==============================================================================
-- RLS POLICIES
-- ==============================================================================

-- Drop existing policies if any to allow clean re-runs
drop policy if exists "Users can view own profile" on public.staff_profiles;
drop policy if exists "Admins can view all profiles" on public.staff_profiles;
drop policy if exists "Admins can insert profiles" on public.staff_profiles;
drop policy if exists "Admins can update profiles" on public.staff_profiles;
drop policy if exists "Users can update own details" on public.staff_profiles;

drop policy if exists "Public can insert appointments" on public.appointments;
drop policy if exists "Staff and Admins can view appointments" on public.appointments;
drop policy if exists "Staff and Admins can update appointments" on public.appointments;
drop policy if exists "Admins can delete appointments" on public.appointments;

drop policy if exists "Public can insert contact messages" on public.contact_messages;
drop policy if exists "Staff and Admins can view messages" on public.contact_messages;
drop policy if exists "Staff and Admins can update messages" on public.contact_messages;
drop policy if exists "Admins can delete messages" on public.contact_messages;

-- STAFF_PROFILES POLICIES
-- Staff can view their own profile
create policy "Users can view own profile"
  on public.staff_profiles
  for select
  using (auth.uid() = id);

-- Admins can view all staff profiles
create policy "Admins can view all profiles"
  on public.staff_profiles
  for select
  using (public.is_admin());

-- Admins can insert staff profiles
create policy "Admins can insert profiles"
  on public.staff_profiles
  for insert
  with check (public.is_admin());

-- Admins can update any staff profile
create policy "Admins can update profiles"
  on public.staff_profiles
  for update
  using (public.is_admin());

-- Staff can update their own personal info (name, phone, avatar) but cannot alter role or is_active
create policy "Users can update own details"
  on public.staff_profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- APPOINTMENTS POLICIES
-- Public booking form can insert appointments
create policy "Public can insert appointments"
  on public.appointments
  for insert
  with check (true);

-- Staff and Admin can view all appointments
create policy "Staff and Admins can view appointments"
  on public.appointments
  for select
  using (public.is_staff_or_admin());

-- Staff and Admin can update appointment status or notes
create policy "Staff and Admins can update appointments"
  on public.appointments
  for update
  using (public.is_staff_or_admin());

-- Only Admin can delete appointments
create policy "Admins can delete appointments"
  on public.appointments
  for delete
  using (public.is_admin());

-- CONTACT_MESSAGES POLICIES
-- Public can submit contact messages
create policy "Public can insert contact messages"
  on public.contact_messages
  for insert
  with check (true);

-- Staff and Admin can view contact messages
create policy "Staff and Admins can view messages"
  on public.contact_messages
  for select
  using (public.is_staff_or_admin());

-- Staff and Admin can update status of contact messages
create policy "Staff and Admins can update messages"
  on public.contact_messages
  for update
  using (public.is_staff_or_admin());

-- Only Admin can delete contact messages
create policy "Admins can delete messages"
  on public.contact_messages
  for delete
  using (public.is_admin());

-- ==============================================================================
-- INITIAL CEO / ADMIN SEED HELPER
-- ==============================================================================
-- After you create your first account in Supabase Dashboard (Authentication > Users > Add User),
-- execute this snippet with your email to grant that account CEO / Admin privileges:
--
-- insert into public.staff_profiles (id, full_name, role, phone, is_active)
-- select id, 'CEO / Executive Admin', 'admin', '0370-6972295', true
-- from auth.users
-- where email = 'your-ceo-email@example.com'
-- on conflict (id) do update set role = 'admin', is_active = true;
