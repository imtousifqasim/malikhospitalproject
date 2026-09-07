import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/auth-guard";
import { createAdminClient } from "@/lib/supabase/admin";

// POST /api/admin/staff/[id]/reset-password - Direct password reset by Admin
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { profile, error } = await requireAdmin();
  if (error || !profile) {
    return NextResponse.json({ error: error || "Unauthorized" }, { status: 403 });
  }

  const { id: targetStaffId } = await params;

  try {
    const body = await request.json();
    const { new_password } = body;

    if (!new_password || typeof new_password !== "string" || new_password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const adminClient = createAdminClient();

    const { data: user, error: updateAuthErr } = await adminClient.auth.admin.updateUserById(
      targetStaffId,
      {
        password: new_password,
      }
    );

    if (updateAuthErr || !user) {
      return NextResponse.json(
        { error: updateAuthErr?.message || "Failed to update staff password." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Staff member's password has been updated successfully.",
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
