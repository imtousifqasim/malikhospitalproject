# Malik Medical Complex — Supabase & Role-Based Portals Setup Guide

Your Supabase project (`nbfiirpzwrecdksapdju`) is **connected and fully initialized**.

---

## 1. Environment Variables Configured (`.env.local`)

The following credentials are active in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://nbfiirpzwrecdksapdju.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_z6O4AdfcQW6YKLsnslcLUQ_F_2duB58
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

---

## 2. Database Schema & RLS Policies (Already Pushed)

The database schema in `supabase/schema.sql` has been pushed and verified:
- `staff_profiles` table (Active)
- `appointments` table (Active)
- `contact_messages` table (Active)
- Row Level Security (RLS) policies enforcing role permissions (Active)

---

## 3. Pre-Provisioned CEO / Admin Account

An initial Executive Administrator account is ready for testing:

- **Login URL:** [`/admin/login`](http://localhost:3000/admin/login)
- **Email:** `ceo@malikhospital.com`
- **Password:** `MalikHospital2026!`
- **Role:** `admin` (Full executive privileges)

*(You can change this password or email at any time from `/admin/profile`)*

---

## 4. Portals & Features Overview

### Executive Portal (`/admin/login` & `/admin`)
- **Appointments**: Combinable filters for **Department / Specialty** (from static `departments.ts`), **Doctor** (from `doctors.ts`), **Status**, and **Date**.
- **Inquiries**: Review messages submitted via the Contact Us page.
- **Staff Management (`/admin/staff`)**:
  - Add new staff accounts (automatically registers auth user and profile).
  - Deactivate / reactivate accounts.
  - **Direct Password Reset**: Change any staff member's password directly using the Supabase Admin API.
- **2FA / Authenticator (`/admin/profile`)**:
  - Enable TOTP Two-Factor Authentication via Google Authenticator or Authy.
  - Generates 10 emergency backup recovery codes.
  - Reset password via email recovery (`/auth/forgot-password`).

### Staff Portal (`/staff/login` & `/staff`)
- **Appointments Roster (`/staff/appointments`)**: Verify appointments and filter by department.
- **Messages (`/staff/messages`)**: Read and mark inquiries as replied.
- **My Profile (`/staff/profile`)**: Update personal details and change own password.
- **Security**: Staff cannot access `/admin/staff` or any CEO route (enforced at both UI, middleware, and database RLS levels).

---

## 5. Static Data Remains In Code
Doctors (`src/data/doctors.ts`), clinical departments (`src/data/departments.ts`), and services remain static files in code.
