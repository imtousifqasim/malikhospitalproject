import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/auth-guard";
import { createAdminClient } from "@/lib/supabase/admin";

// PATCH /api/admin/staff/[id] - Update staff profile (role, status, details)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user: currentAdmin, profile, error } = await requireAdmin();
  if (error || !profile || !currentAdmin) {
    return NextResponse.json({ error: error || "Unauthorized" }, { status: 403 });
  }

  const { id: targetStaffId } = await params;

  try {
    const body = await request.json();
    const { full_name, email, role, phone, is_active, can_delete } = body;

    // Safety check: Cannot deactivate or demote self
    if (targetStaffId === currentAdmin.id) {
      if (is_active === false) {
        return NextResponse.json(
          { error: "You cannot deactivate your own CEO / Admin account." },
          { status: 400 }
        );
      }
      if (role && role !== "admin") {
        return NextResponse.json(
          { error: "You cannot change your own role away from Admin." },
          { status: 400 }
        );
      }
    }

    const updates: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (full_name !== undefined) updates.full_name = full_name.trim();
    if (phone !== undefined) updates.phone = phone ? phone.trim() : null;
    if (role !== undefined) {
      if (role !== "admin" && role !== "staff") {
        return NextResponse.json({ error: "Invalid role specified." }, { status: 400 });
      }
      updates.role = role;
    }
    if (is_active !== undefined) {
      updates.is_active = Boolean(is_active);
    }
    if (can_delete !== undefined) {
      updates.can_delete = Boolean(can_delete);
    }

    const adminClient = createAdminClient();

    // Handle email change if provided
    let updatedEmail = undefined;
    if (email !== undefined && typeof email === "string" && email.trim()) {
      const cleanEmail = email.trim().toLowerCase();
      const { error: authEmailErr } = await adminClient.auth.admin.updateUserById(
        targetStaffId,
        { email: cleanEmail, email_confirm: true }
      );
      if (authEmailErr) {
        return NextResponse.json({ error: authEmailErr.message }, { status: 400 });
      }
      updates.email = cleanEmail;
      updatedEmail = cleanEmail;
    }

    const { data: updatedProfile, error: updateErr } = await adminClient
      .from("staff_profiles")
      .update(updates)
      .eq("id", targetStaffId)
      .select()
      .single();

    if (updateErr) {
      return NextResponse.json({ error: updateErr.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      staff: {
        ...updatedProfile,
        email: updatedEmail || updatedProfile.email,
      },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
