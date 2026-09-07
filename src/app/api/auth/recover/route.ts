import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyTotp } from "@/lib/totp";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, method, code, new_password } = body;

    if (!email || !method || !code || !new_password) {
      return NextResponse.json(
        { error: "Email, recovery method, verification code, and new password are required." },
        { status: 400 }
      );
    }

    if (new_password.length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const adminClient = createAdminClient();

    // 1. Find user by email
    const { data: usersData, error: userErr } = await adminClient.auth.admin.listUsers();
    if (userErr || !usersData?.users) {
      return NextResponse.json({ error: "Unable to look up accounts." }, { status: 500 });
    }

    const targetUser = usersData.users.find(
      (u) => u.email?.toLowerCase().trim() === email.toLowerCase().trim()
    );

    if (!targetUser) {
      return NextResponse.json(
        { error: "No registered account found with this email address." },
        { status: 404 }
      );
    }

    // 2. Fetch staff profile
    const { data: profile, error: profErr } = await adminClient
      .from("staff_profiles")
      .select("*")
      .eq("id", targetUser.id)
      .maybeSingle();

    if (profErr || !profile) {
      return NextResponse.json(
        { error: "Staff profile record not found." },
        { status: 404 }
      );
    }

    // 3. Verification based on selected method
    if (method === "totp") {
      const cleanTotp = code.replace(/\D/g, "");
      if (cleanTotp.length !== 6) {
        return NextResponse.json(
          { error: "Please enter a valid 6-digit Authenticator code." },
          { status: 400 }
        );
      }

      if (!profile.totp_secret) {
        return NextResponse.json(
          { error: "Two-factor authenticator is not configured for this account. Please use backup recovery codes." },
          { status: 400 }
        );
      }

      const isValid = verifyTotp(cleanTotp, profile.totp_secret);
      if (!isValid) {
        return NextResponse.json(
          { error: "Invalid or expired Authenticator code. Please check your app and try again." },
          { status: 400 }
        );
      }
    } else if (method === "backup_code" || method === "backup") {
      const normalizedCode = code.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
      const existingCodes: string[] = profile.backup_codes || [];

      const matchIndex = existingCodes.findIndex(
        (c) => c.replace(/[^a-zA-Z0-9]/g, "").toUpperCase() === normalizedCode
      );

      if (matchIndex === -1) {
        return NextResponse.json(
          { error: "Invalid or already-used backup recovery code. Please try another code or your authenticator app." },
          { status: 400 }
        );
      }

      // Burn the used one-time backup code
      const remainingCodes = [...existingCodes];
      remainingCodes.splice(matchIndex, 1);

      await adminClient
        .from("staff_profiles")
        .update({
          backup_codes: remainingCodes,
          updated_at: new Date().toISOString(),
        })
        .eq("id", targetUser.id);
    } else {
      return NextResponse.json({ error: "Invalid recovery method." }, { status: 400 });
    }

    // 4. Update the user password
    const { error: updateErr } = await adminClient.auth.admin.updateUserById(targetUser.id, {
      password: new_password,
    });

    if (updateErr) {
      return NextResponse.json({ error: updateErr.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Password updated successfully! You can now log into your hospital account.",
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error recovering password";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
