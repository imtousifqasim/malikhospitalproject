import { NextResponse } from "next/server";
import { requireAuthUser } from "@/lib/supabase/auth-guard";
import { createAdminClient } from "@/lib/supabase/admin";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { profile, error } = await requireAuthUser();
  if (error || !profile) {
    return NextResponse.json({ error: error || "Unauthorized" }, { status: 401 });
  }

  // Permission check: Must be admin OR have can_delete === true
  const canDelete = profile.role === "admin" || profile.can_delete === true;
  if (!canDelete) {
    return NextResponse.json(
      { error: "Access Denied: You do not have permission to delete appointment records." },
      { status: 403 }
    );
  }

  const { id } = await params;

  try {
    const adminClient = createAdminClient();
    const { error: delErr } = await adminClient
      .from("appointments")
      .delete()
      .eq("id", id);

    if (delErr) {
      return NextResponse.json({ error: delErr.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Appointment deleted successfully." });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error deleting appointment";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
