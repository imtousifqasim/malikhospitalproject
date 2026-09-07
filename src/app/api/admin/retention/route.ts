import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/auth-guard";
import { createAdminClient } from "@/lib/supabase/admin";
import { RetentionPolicy } from "@/types/database";

const DEFAULT_POLICY: RetentionPolicy = {
  unconfirmed_days: 7,
  confirmed_days: 30,
  messages_days: 30,
};

// GET /api/admin/retention - Get current retention settings & expired counts
export async function GET() {
  const { profile, error } = await requireAdmin();
  if (error || !profile) {
    return NextResponse.json({ error: error || "Unauthorized" }, { status: 403 });
  }

  try {
    const adminClient = createAdminClient();

    // 1. Get settings
    const { data: settingRow } = await adminClient
      .from("system_settings")
      .select("value")
      .eq("key", "retention_policy")
      .maybeSingle();

    const policy: RetentionPolicy = (settingRow?.value as RetentionPolicy) || DEFAULT_POLICY;

    // 2. Compute date cutoffs
    const now = new Date();

    const unconfCutoff = new Date(now.getTime() - policy.unconfirmed_days * 24 * 60 * 60 * 1000).toISOString();
    const confCutoff = new Date(now.getTime() - policy.confirmed_days * 24 * 60 * 60 * 1000).toISOString();
    const msgCutoff = new Date(now.getTime() - policy.messages_days * 24 * 60 * 60 * 1000).toISOString();

    // Count eligible unconfirmed appointments
    const { count: expiredUnconfirmed } = await adminClient
      .from("appointments")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending")
      .lt("created_at", unconfCutoff);

    // Count eligible confirmed/completed appointments
    const { count: expiredConfirmed } = await adminClient
      .from("appointments")
      .select("*", { count: "exact", head: true })
      .neq("status", "pending")
      .lt("created_at", confCutoff);

    // Count eligible messages
    const { count: expiredMessages } = await adminClient
      .from("contact_messages")
      .select("*", { count: "exact", head: true })
      .lt("created_at", msgCutoff);

    return NextResponse.json({
      policy,
      stats: {
        expired_unconfirmed: expiredUnconfirmed || 0,
        expired_confirmed: expiredConfirmed || 0,
        expired_messages: expiredMessages || 0,
        total_eligible: (expiredUnconfirmed || 0) + (expiredConfirmed || 0) + (expiredMessages || 0),
      },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error fetching retention settings";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// POST /api/admin/retention - Update retention days configuration
export async function POST(request: Request) {
  const { profile, error } = await requireAdmin();
  if (error || !profile) {
    return NextResponse.json({ error: error || "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const unconfirmed_days = Math.max(1, Number(body.unconfirmed_days) || 7);
    const confirmed_days = Math.max(1, Number(body.confirmed_days) || 30);
    const messages_days = Math.max(1, Number(body.messages_days) || 30);

    const newPolicy: RetentionPolicy = {
      unconfirmed_days,
      confirmed_days,
      messages_days,
    };

    const adminClient = createAdminClient();

    const { error: saveErr } = await adminClient
      .from("system_settings")
      .upsert({
        key: "retention_policy",
        value: newPolicy,
        updated_at: new Date().toISOString(),
      });

    if (saveErr) {
      return NextResponse.json({ error: saveErr.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, policy: newPolicy });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error updating retention settings";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// DELETE /api/admin/retention - Execute immediate database cleanup of expired records
export async function DELETE() {
  const { profile, error } = await requireAdmin();
  if (error || !profile) {
    return NextResponse.json({ error: error || "Unauthorized" }, { status: 403 });
  }

  try {
    const adminClient = createAdminClient();

    // 1. Get current policy
    const { data: settingRow } = await adminClient
      .from("system_settings")
      .select("value")
      .eq("key", "retention_policy")
      .maybeSingle();

    const policy: RetentionPolicy = (settingRow?.value as RetentionPolicy) || DEFAULT_POLICY;

    const now = new Date();
    const unconfCutoff = new Date(now.getTime() - policy.unconfirmed_days * 24 * 60 * 60 * 1000).toISOString();
    const confCutoff = new Date(now.getTime() - policy.confirmed_days * 24 * 60 * 60 * 1000).toISOString();
    const msgCutoff = new Date(now.getTime() - policy.messages_days * 24 * 60 * 60 * 1000).toISOString();

    // Delete expired pending appointments
    const { error: delUnconfErr, data: delUnconf } = await adminClient
      .from("appointments")
      .delete()
      .eq("status", "pending")
      .lt("created_at", unconfCutoff)
      .select("id");

    // Delete expired confirmed/completed/cancelled appointments
    const { error: delConfErr, data: delConf } = await adminClient
      .from("appointments")
      .delete()
      .neq("status", "pending")
      .lt("created_at", confCutoff)
      .select("id");

    // Delete expired contact messages
    const { error: delMsgErr, data: delMsg } = await adminClient
      .from("contact_messages")
      .delete()
      .lt("created_at", msgCutoff)
      .select("id");

    if (delUnconfErr || delConfErr || delMsgErr) {
      const errDetail = delUnconfErr?.message || delConfErr?.message || delMsgErr?.message;
      return NextResponse.json({ error: errDetail }, { status: 500 });
    }

    const unconfCount = delUnconf ? delUnconf.length : 0;
    const confCount = delConf ? delConf.length : 0;
    const msgCount = delMsg ? delMsg.length : 0;
    const totalDeleted = unconfCount + confCount + msgCount;

    return NextResponse.json({
      success: true,
      deleted: {
        unconfirmed_appointments: unconfCount,
        confirmed_appointments: confCount,
        messages: msgCount,
        total: totalDeleted,
      },
      message: `Cleaned up ${totalDeleted} expired records successfully.`,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error executing cleanup";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
