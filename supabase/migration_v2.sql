-- ==============================================================================
-- MALIK MEDICAL COMPLEX — MIGRATION V2
-- Granular Staff Delete Permissions, Retention Settings & Backup Codes
-- ==============================================================================

-- 1. Add can_delete and backup_codes to staff_profiles
alter table public.staff_profiles 
  add column if not exists can_delete boolean not null default false,
  add column if not exists backup_codes text[] not null default '{}';

-- 2. System Settings Table for Retention Policies
create table if not exists public.system_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);

-- Enable RLS on system_settings
alter table public.system_settings enable row level security;

-- Drop existing system_settings policies if any
drop policy if exists "Admins can view system_settings" on public.system_settings;
drop policy if exists "Admins can update system_settings" on public.system_settings;
drop policy if exists "Admins can insert system_settings" on public.system_settings;

create policy "Admins can view system_settings"
  on public.system_settings
  for select
  using (public.is_admin());

create policy "Admins can update system_settings"
  on public.system_settings
  for update
  using (public.is_admin());

create policy "Admins can insert system_settings"
  on public.system_settings
  for insert
  with check (public.is_admin());

-- Seed default retention configuration
insert into public.system_settings (key, value)
values (
  'retention_policy',
  '{"unconfirmed_days": 7, "confirmed_days": 30, "messages_days": 30}'::jsonb
)
on conflict (key) do nothing;

-- 3. Update Delete Policies on Appointments & Messages
drop policy if exists "Admins can delete appointments" on public.appointments;
drop policy if exists "Authorized staff and admin can delete appointments" on public.appointments;

create policy "Authorized staff and admin can delete appointments"
  on public.appointments
  for delete
  using (
    public.is_admin() or exists (
      select 1 from public.staff_profiles
      where id = auth.uid() and is_active = true and can_delete = true
    )
  );

drop policy if exists "Admins can delete messages" on public.contact_messages;
drop policy if exists "Authorized staff and admin can delete messages" on public.contact_messages;

create policy "Authorized staff and admin can delete messages"
  on public.contact_messages
  for delete
  using (
    public.is_admin() or exists (
      select 1 from public.staff_profiles
      where id = auth.uid() and is_active = true and can_delete = true
    )
  );
