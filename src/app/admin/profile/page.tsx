"use client";

import React, { useState, useEffect } from "react";
import {
  UserCheck,
  ShieldCheck,
  KeyRound,
  Lock,
  Phone,
  User,
  QrCode,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Copy,
  Printer,
  Download,
  ShieldAlert,
  ShieldX
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { createClient } from "@/lib/supabase/client";
import { StaffProfile } from "@/types/database";
import ConfirmDeleteModal from "@/components/dashboard/ConfirmDeleteModal";

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<StaffProfile | null>(null);
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  // Password change state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatingPassword, setUpdatingPassword] = useState(false);

  // Notifications
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  // 2FA / TOTP MFA State
  const [mfaEnrolled, setMfaEnrolled] = useState(false);
  const [currentFactorId, setCurrentFactorId] = useState<string | null>(null);
  const [enrollingMfa, setEnrollingMfa] = useState(false);
  const [mfaSecret, setMfaSecret] = useState<string>("");
  const [mfaQrSvg, setMfaQrSvg] = useState<string>("");
  const [mfaFactorId, setMfaFactorId] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [confirmDisableMfaOpen, setConfirmDisableMfaOpen] = useState(false);
  const [disablingMfa, setDisablingMfa] = useState(false);
  const [copiedSecret, setCopiedSecret] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setEmail(user.email || "");
          const { data: prof } = await supabase
            .from("staff_profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          if (prof) {
            setProfile(prof as StaffProfile);
            setFullName(prof.full_name || "");
            setPhone(prof.phone || "");
            if (prof.backup_codes && Array.isArray(prof.backup_codes) && prof.backup_codes.length > 0) {
              setBackupCodes(prof.backup_codes);
            }
          }

          // Check MFA factors
          const { data: factors } = await supabase.auth.mfa.listFactors();
          const verified = factors?.totp?.find((f) => f.status === "verified");
          if (verified) {
            setMfaEnrolled(true);
            setCurrentFactorId(verified.id);
          }
        }
      } catch (err) {
        console.error("Profile load error:", err);
      }
    }
    loadData();
  }, []);

  // Update Profile Name & Phone
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorNotice(null);
    setSuccessNotice(null);
    setSavingProfile(true);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not logged in");

      const { error } = await supabase
        .from("staff_profiles")
        .update({
          full_name: fullName.trim(),
          phone: phone.trim() || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;
      setSuccessNotice("Executive profile information updated successfully.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update profile.";
      setErrorNotice(msg);
    } finally {
      setSavingProfile(false);
    }
  };

  // Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorNotice(null);
    setSuccessNotice(null);

    if (newPassword.length < 6) {
      setErrorNotice("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorNotice("Passwords do not match.");
      return;
    }

    setUpdatingPassword(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      setSuccessNotice("Your password has been changed successfully.");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update password.";
      setErrorNotice(msg);
    } finally {
      setUpdatingPassword(false);
    }
  };

  // Begin MFA Enrollment
  const handleStartEnrollment = async () => {
    setErrorNotice(null);
    setSuccessNotice(null);
    setEnrollingMfa(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: "totp",
        issuer: "Malik Hospital CEO",
      });

      if (error) throw error;

      setMfaFactorId(data.id);
      setMfaSecret(data.totp.secret);
      setMfaQrSvg(data.totp.qr_code);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to initiate 2FA enrollment.";
      setErrorNotice(msg);
      setEnrollingMfa(false);
    }
  };

  // Verify TOTP to Complete MFA Enrollment
  const handleVerifyEnrollment = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorNotice(null);
    setVerifyingCode(true);

    try {
      const supabase = createClient();
      const { data: challengeData, error: challengeErr } = await supabase.auth.mfa.challenge({
        factorId: mfaFactorId,
      });

      if (challengeErr) throw challengeErr;

      const { error: verifyErr } = await supabase.auth.mfa.verify({
        factorId: mfaFactorId,
        challengeId: challengeData.id,
        code: verificationCode.trim(),
      });

      if (verifyErr) throw verifyErr;

      // Generate 10 emergency backup codes for CEO recovery
      const generatedCodes = Array.from({ length: 10 }, () =>
        Math.random().toString(36).substring(2, 6).toUpperCase() +
        "-" +
        Math.random().toString(36).substring(2, 6).toUpperCase()
      );

      // Persist TOTP secret and backup codes into database profile
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from("staff_profiles")
          .update({
            totp_secret: mfaSecret,
            backup_codes: generatedCodes,
            updated_at: new Date().toISOString(),
          })
          .eq("id", user.id);
      }

      setBackupCodes(generatedCodes);
      setMfaEnrolled(true);
      setCurrentFactorId(mfaFactorId);
      setEnrollingMfa(false);
      setSuccessNotice("Two-Factor Authentication is now active! Save your emergency backup recovery codes.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid code. Please check your authenticator app.";
      setErrorNotice(msg);
    } finally {
      setVerifyingCode(false);
    }
  };

  // Disable / Unenroll MFA
  const handleDisableMfa = async () => {
    if (!currentFactorId) return;
    setDisablingMfa(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.mfa.unenroll({
        factorId: currentFactorId,
      });

      if (error) throw error;

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from("staff_profiles")
          .update({
            totp_secret: null,
            backup_codes: [],
            updated_at: new Date().toISOString(),
          })
          .eq("id", user.id);
      }

      setMfaEnrolled(false);
      setCurrentFactorId(null);
      setBackupCodes([]);
      setSuccessNotice("Two-Factor Authentication has been disabled for this account.");
      setConfirmDisableMfaOpen(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to disable MFA";
      setErrorNotice(msg);
    } finally {
      setDisablingMfa(false);
    }
  };

  // Dedicated Clean Print Slip for 2FA Backup Codes (User details on top, codes below)
  const handlePrintBackupCodes = () => {
    const printWindow = window.open("", "_blank", "width=680,height=750");
    if (!printWindow) {
      alert("Please allow popups to print your emergency backup recovery slip.");
      return;
    }

    const generatedDate = new Date().toLocaleString("en-US", {
      dateStyle: "full",
      timeStyle: "short",
    });

    const codesHtml = backupCodes
      .map(
        (code, i) => `
        <div style="border: 1px dashed #cbd5e1; border-radius: 8px; padding: 10px 14px; display: flex; align-items: center; justify-content: space-between; font-family: 'Courier New', Courier, monospace; font-size: 15px; font-weight: bold; background: #f8fafc;">
          <span style="color: #64748b; font-size: 12px; font-family: sans-serif; font-weight: normal;">[ ] Code #${i + 1}</span>
          <span style="letter-spacing: 2px; color: #0f172a;">${code}</span>
        </div>
      `
      )
      .join("");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>2FA Backup Codes - Malik Medical Complex</title>
          <style>
            @page { size: auto; margin: 15mm; }
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
              color: #0f172a;
              margin: 0;
              padding: 24px;
              background: #ffffff;
            }
            .header {
              border-bottom: 2px solid #0B3D91;
              padding-bottom: 12px;
              margin-bottom: 18px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .title {
              font-size: 20px;
              font-weight: 900;
              color: #0B3D91;
              margin: 0;
            }
            .subtitle {
              margin: 3px 0 0 0;
              font-size: 12px;
              color: #475569;
            }
            .badge {
              font-size: 11px;
              font-weight: 700;
              background: #fef3c7;
              color: #92400e;
              padding: 4px 10px;
              border-radius: 9999px;
              border: 1px solid #fde68a;
              text-transform: uppercase;
            }
            .user-box {
              background: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 12px;
              padding: 14px 18px;
              margin-bottom: 18px;
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 12px;
              font-size: 12px;
            }
            .user-label {
              color: #64748b;
              font-size: 11px;
              font-weight: 600;
              text-transform: uppercase;
              margin-bottom: 2px;
            }
            .user-val {
              font-weight: 700;
              color: #0f172a;
              font-size: 13px;
            }
            .notice {
              background: #fffbeb;
              border-left: 4px solid #f59e0b;
              border-radius: 6px;
              padding: 10px 14px;
              font-size: 11px;
              color: #92400e;
              line-height: 1.5;
              margin-bottom: 18px;
            }
            .grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 10px;
              margin-bottom: 20px;
            }
            .footer {
              border-top: 1px solid #e2e8f0;
              padding-top: 12px;
              text-align: center;
              font-size: 11px;
              color: #94a3b8;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1 class="title">Malik Medical Complex</h1>
              <p class="subtitle">Two-Factor Authentication (2FA) Emergency Recovery Slip</p>
            </div>
            <span class="badge">Confidential</span>
          </div>

          <div class="user-box">
            <div>
              <div class="user-label">Account Holder</div>
              <div class="user-val">${fullName || "Administrator"}</div>
            </div>
            <div>
              <div class="user-label">Authorized Email</div>
              <div class="user-val">${email}</div>
            </div>
            <div>
              <div class="user-label">System Role</div>
              <div class="user-val">CEO / Executive Administrator</div>
            </div>
            <div>
              <div class="user-label">Issued Date & Time</div>
              <div class="user-val">${generatedDate}</div>
            </div>
          </div>

          <div class="notice">
            <strong>SECURITY INSTRUCTIONS:</strong> Each recovery code below can only be used <u>once</u> to access your hospital account if you lose access to your authenticator app. Store this sheet in a secure, private location.
          </div>

          <div class="grid">
            ${codesHtml}
          </div>

          <div class="footer">
            Malik Medical Complex Security Protocol &bull; Strictly Confidential Document
          </div>

          <script>
            window.onload = function() {
              window.focus();
              window.print();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Download 2FA Backup Codes as Clean Text File (User details on top, codes below)
  const handleDownloadBackupCodes = () => {
    const generatedDate = new Date().toLocaleString("en-US", {
      dateStyle: "full",
      timeStyle: "short",
    });

    const lines = [
      "======================================================================",
      "         MALIK MEDICAL COMPLEX - 2FA EMERGENCY RECOVERY CODES",
      "======================================================================",
      "",
      "ACCOUNT DETAILS:",
      `  Name:         ${fullName || "Administrator"}`,
      `  Email:        ${email}`,
      `  Role:         CEO / Executive Administrator`,
      `  Issued Date:  ${generatedDate}`,
      "",
      "----------------------------------------------------------------------",
      "SECURITY INSTRUCTIONS:",
      "Each backup code below can only be used ONCE to recover your account",
      "if you ever lose access to your Authenticator phone app.",
      "Store this file in a safe and secure location.",
      "----------------------------------------------------------------------",
      "",
      "EMERGENCY RECOVERY BACKUP CODES:",
      ...backupCodes.map((code, idx) => `  [ ] Code ${(idx + 1).toString().padStart(2, " ")}:   ${code}`),
      "",
      "----------------------------------------------------------------------",
      "Malik Medical Complex Security • Strictly Confidential Document",
      "======================================================================",
    ];

    const blob = new Blob([lines.join("\r\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `malik-hospital-2fa-backup-codes-${(fullName || "admin").toLowerCase().replace(/\s+/g, "-")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout
      userRole="admin"
      currentProfile={profile}
      pageTitle="Executive Profile & Security"
    >
      <div className="max-w-4xl space-y-6">
        {/* NOTICES */}
        {errorNotice && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorNotice}</span>
            </div>
            <button onClick={() => setErrorNotice(null)} className="font-bold text-rose-500 hover:text-rose-800">×</button>
          </div>
        )}

        {successNotice && (
          <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-800 text-xs sm:text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
              <span>{successNotice}</span>
            </div>
            <button onClick={() => setSuccessNotice(null)} className="font-bold text-teal-500 hover:text-teal-800">×</button>
          </div>
        )}

        {/* SECTION 1: PERSONAL DETAILS */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#0B3D91]">
                Executive Information
              </h2>
              <p className="text-xs text-slate-500">
                Primary contact details associated with your CEO profile.
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0B3D91] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Phone Contact
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0370-6972295"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0B3D91] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Account Email (Hospital Security Credentials)
              </label>
              <input
                type="email"
                disabled
                value={email}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={savingProfile}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0B3D91] hover:bg-[#082a66] text-white flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors"
              >
                {savingProfile && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>

        {/* SECTION 2: TWO-FACTOR AUTHENTICATION (TOTP / 2FA) */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-[#0B3D91] flex items-center gap-2">
                  <span>Two-Factor Authentication (TOTP)</span>
                  {mfaEnrolled ? (
                    <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Active &bull; Enforced
                    </span>
                  ) : (
                    <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                      Not Enabled
                    </span>
                  )}
                </h2>
                <p className="text-xs text-slate-500">
                  Protects your CEO account with Google Authenticator or Authy.
                </p>
              </div>
            </div>

            {mfaEnrolled && (
              <button
                onClick={() => setConfirmDisableMfaOpen(true)}
                className="text-xs font-bold text-rose-600 hover:text-rose-800 hover:underline cursor-pointer"
              >
                Disable 2FA
              </button>
            )}
          </div>

          {!mfaEnrolled && !enrollingMfa && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Add an extra layer of defense to the Malik Hospital executive portal. When enabled, signing into `/admin/login` will require both your password and a 6-digit verification code from your mobile authenticator app.
              </p>
              <button
                onClick={handleStartEnrollment}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-sm transition-colors cursor-pointer"
              >
                <QrCode className="w-4 h-4" />
                <span>Enable Two-Factor Authentication</span>
              </button>
            </div>
          )}

          {/* ACTIVE ENROLLMENT IN PROGRESS */}
          {enrollingMfa && (
            <div className="space-y-5 animate-in fade-in-50">
              <div className="p-4 bg-teal-50/70 border border-teal-200/80 rounded-2xl space-y-3">
                <h3 className="text-xs font-bold text-teal-900 uppercase tracking-wider">
                  Step 1: Scan QR Code with Authenticator App
                </h3>
                <p className="text-xs text-teal-800 leading-relaxed">
                  Open Google Authenticator, Authy, or 1Password on your phone and scan the code below:
                </p>

                {mfaQrSvg && (
                  mfaQrSvg.startsWith("data:") || mfaQrSvg.startsWith("http") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={mfaQrSvg}
                      alt="Authenticator QR Code"
                      className="p-3 bg-white rounded-2xl w-48 h-48 mx-auto border border-slate-200 shadow-xs object-contain"
                    />
                  ) : (
                    <div
                      className="p-3 bg-white rounded-2xl w-48 h-48 mx-auto flex items-center justify-center border border-slate-200 shadow-xs"
                      dangerouslySetInnerHTML={{ __html: mfaQrSvg }}
                    />
                  )
                )}

                <div className="text-center">
                  <span className="text-[11px] text-slate-500 block mb-1">
                    Or enter secret manually:
                  </span>
                  <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 font-mono text-xs text-slate-800">
                    <span>{mfaSecret}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(mfaSecret);
                        setCopiedSecret(true);
                        setTimeout(() => setCopiedSecret(false), 2000);
                      }}
                      className="text-teal-700 hover:text-teal-900"
                      title="Copy Secret"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {copiedSecret && <span className="text-[11px] text-teal-600 block mt-1 font-semibold">Copied!</span>}
                </div>
              </div>

              {/* STEP 2: VERIFICATION FORM */}
              <form onSubmit={handleVerifyEnrollment} className="space-y-3">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Step 2: Enter 6-Digit Code from App
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                    placeholder="123456"
                    className="w-44 px-3 py-2 text-center font-mono text-base tracking-widest rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0B3D91]"
                  />
                  <button
                    type="submit"
                    disabled={verifyingCode || verificationCode.length !== 6}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0B3D91] hover:bg-[#082a66] text-white flex items-center gap-1.5 cursor-pointer"
                  >
                    {verifyingCode && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <span>Confirm & Activate</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEnrollingMfa(false)}
                    className="px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* BACKUP RECOVERY CODES DISPLAY */}
          {backupCodes.length > 0 && (
            <div className="p-5 bg-amber-50 rounded-2xl border border-amber-200 space-y-3 animate-in zoom-in-95">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Emergency Backup Recovery Codes (Save These Now!)</span>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                If you ever lose access to your authenticator phone, these one-time codes can be used to recover your account. Print them or save them in a safe place.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs text-slate-800 bg-white p-3 rounded-xl border border-amber-200/60">
                {backupCodes.map((code, idx) => (
                  <span key={idx} className="p-1 bg-slate-50 rounded text-center border border-slate-100">
                    {code}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handlePrintBackupCodes}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-amber-300 text-amber-900 font-bold text-xs hover:bg-amber-100 transition-colors cursor-pointer shadow-2xs"
                  title="Print clean official recovery slip"
                >
                  <Printer className="w-3.5 h-3.5 text-amber-700" />
                  <span>Print Recovery Slip</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadBackupCodes}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-2xs"
                  title="Download codes as text file"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Codes (.txt)</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 3: CHANGE PASSWORD */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#0B3D91]">
                Change Password
              </h2>
              <p className="text-xs text-slate-500">
                Update your CEO dashboard login credentials.
              </p>
            </div>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  New Password (min 6 characters)
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0B3D91] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0B3D91] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={updatingPassword}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0B3D91] hover:bg-[#082a66] text-white flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors"
              >
                {updatingPassword && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Update Password</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* MODERN 2FA DISABLE CONFIRMATION MODAL */}
      <ConfirmDeleteModal
        isOpen={confirmDisableMfaOpen}
        onClose={() => setConfirmDisableMfaOpen(false)}
        onConfirm={handleDisableMfa}
        title="Disable Two-Factor Authentication"
        description="Are you sure you want to remove 2FA from your CEO account? Your account will only be protected by password and will no longer require an authenticator code."
        loading={disablingMfa}
      />
    </DashboardLayout>
  );
}
