import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/auth-guard";
import { createAdminClient } from "@/lib/supabase/admin";

// GET /api/admin/staff - List all staff accounts with their auth emails
export async function GET() {
  const { profile, error } = await requireAdmin();
  if (error || !profile) {
    return NextResponse.json({ error: error || "Unauthorized" }, { status: 403 });
  }

  try {
    const adminClient = createAdminClient();

    // Fetch all profiles
    const { data: profiles, error: profileErr } = await adminClient
      .from("staff_profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (profileErr) {
      return NextResponse.json({ error: profileErr.message }, { status: 500 });
    }

    // Fetch auth users to get email and last_sign_in_at
    const { data: authUsers, error: authErr } = await adminClient.auth.admin.listUsers();
    if (authErr) {
      return NextResponse.json({ error: authErr.message }, { status: 500 });
    }

    const emailMap = new Map<string, { email?: string; last_sign_in_at?: string }>();
    authUsers.users.forEach((u) => {
      emailMap.set(u.id, { email: u.email, last_sign_in_at: u.last_sign_in_at });
    });

    const combined = (profiles || []).map((p) => {
      const authInfo = emailMap.get(p.id);
      return {
        ...p,
        email: authInfo?.email || "Unknown",
        last_sign_in_at: authInfo?.last_sign_in_at || null,
      };
    });

    return NextResponse.json({ staff: combined });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// POST /api/admin/staff - Create new staff account
export async function POST(request: Request) {
  const { profile, error } = await requireAdmin();
  if (error || !profile) {
    return NextResponse.json({ error: error || "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { email, password, full_name, role, phone, can_delete } = body;

    if (!email || !password || !full_name || !role) {
      return NextResponse.json(
        { error: "Email, password, full name, and role are required." },
        { status: 400 }
      );
    }

    if (role !== "admin" && role !== "staff") {
      return NextResponse.json({ error: "Invalid role specified." }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const adminClient = createAdminClient();

    // 1. Create auth user with auto-confirmed email
    const { data: userData, error: createErr } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name, role },
    });

    if (createErr || !userData.user) {
      return NextResponse.json(
        { error: createErr?.message || "Failed to create user in Auth." },
        { status: 400 }
      );
    }

    const newUserId = userData.user.id;

    // 2. Insert into staff_profiles
    const { data: newProfile, error: profileErr } = await adminClient
      .from("staff_profiles")
      .insert({
        id: newUserId,
        full_name: full_name.trim(),
        email: email.trim().toLowerCase(),
        role,
        phone: phone ? phone.trim() : null,
        is_active: true,
        can_delete: Boolean(can_delete),
      })
      .select()
      .single();

    if (profileErr) {
      // Rollback auth user creation if profile insertion fails
      await adminClient.auth.admin.deleteUser(newUserId);
      return NextResponse.json({ error: profileErr.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      staff: { ...newProfile, email: userData.user.email },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
