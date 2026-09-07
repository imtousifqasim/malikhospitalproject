"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  HeartPulse,
  Stethoscope,
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  Loader2,
  Building2,
  CheckCircle2,
  KeyRound,
  ShieldCheck
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

function StaffLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");
  const redirectTarget = searchParams.get("redirect") || "/staff";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    urlError === "account_deactivated"
      ? "Your staff account has been deactivated. Please consult hospital administration."
      : null
  );

  // 2FA TOTP state
  const [mfaRequired, setMfaRequired] = useState(false);
  const [mfaFactorId, setMfaFactorId] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [verifyingMfa, setVerifyingMfa] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error: authErr } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authErr) {
        setError(authErr.message);
        setLoading(false);
        return;
      }

      if (!data.user) {
        setError("Unable to authenticate staff member.");
        setLoading(false);
        return;
      }

      // 1. Check staff_profiles FIRST
      const { data: profile, error: profileErr } = await supabase
        .from("staff_profiles")
        .select("role, is_active")
        .eq("id", data.user.id)
        .maybeSingle();

      if (profileErr || !profile) {
        setError("No staff profile record found. Contact hospital administration.");
        await supabase.auth.signOut();
        setLoading(false);
        return;
      }

      if (!profile.is_active) {
        setError("Your account is deactivated. Contact hospital management.");
        await supabase.auth.signOut();
        setLoading(false);
        return;
      }

      if (profile.role !== "staff") {
        setError("Access Denied: This portal is strictly for Hospital Staff. CEO & Executive Administrators must sign in at /admin/login.");
        await supabase.auth.signOut();
        setLoading(false);
        return;
      }

      // 2. Check if user has MFA factors verified
      const { data: factors } = await supabase.auth.mfa.listFactors();
      const verifiedTotp = factors?.totp?.find((f) => f.status === "verified");

      if (verifiedTotp) {
        setMfaFactorId(verifiedTotp.id);
        setMfaRequired(true);
        setLoading(false);
        return;
      }

      router.push(redirectTarget);
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(msg);
      setLoading(false);
    }
  };

  const handleVerifyTotp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setVerifyingMfa(true);

    try {
      const supabase = createClient();
      const { data: challengeData, error: challengeErr } = await supabase.auth.mfa.challenge({
        factorId: mfaFactorId,
      });

      if (challengeErr) {
        setError(challengeErr.message);
        setVerifyingMfa(false);
        return;
      }

      const { error: verifyErr } = await supabase.auth.mfa.verify({
        factorId: mfaFactorId,
        challengeId: challengeData.id,
        code: totpCode.trim(),
      });

      if (verifyErr) {
        setError("Invalid authenticator code. Please try again.");
        setVerifyingMfa(false);
        return;
      }

      // Re-verify staff role authorization
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("staff_profiles")
          .select("role, is_active")
          .eq("id", user.id)
          .maybeSingle();

        if (!profile || profile.role !== "staff" || !profile.is_active) {
          setError("Access Denied: Hospital staff authorization required. Administrators must sign in at /admin/login.");
          await supabase.auth.signOut();
          setVerifyingMfa(false);
          return;
        }
      }

      router.push(redirectTarget);
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error verifying MFA code.";
      setError(msg);
      setVerifyingMfa(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-teal-950 to-slate-900 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full">
        {/* BRAND BADGE */}
        <div className="text-center space-y-2 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0B3D91] to-[#14B8A6] border border-white/20 flex items-center justify-center text-white shadow-xl shadow-teal-950/40 mx-auto">
            <HeartPulse className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Hospital Staff Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Malik Medical Complex &bull; Consultation & Inquiries Desk
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 space-y-6">
          {error && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in-50">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {!mfaRequired ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Staff Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Mail"
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent bg-slate-50/50"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Password
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs text-teal-700 hover:underline font-semibold"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your Password"
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent bg-slate-50/50"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-teal-600 hover:bg-teal-700 text-white transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Logging into Staff Desk...</span>
                  </>
                ) : (
                  <>
                    <Stethoscope className="w-4 h-4" />
                    <span>Sign In to Staff Desk</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            /* 2FA TOTP VERIFICATION STEP */
            <form onSubmit={handleVerifyTotp} className="space-y-4 animate-in fade-in-50">
              <div className="text-center space-y-1">
                <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-2">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Two-Factor Authentication (2FA)
                </h3>
                <p className="text-xs text-slate-500">
                  Enter the 6-digit verification code from your Authenticator App (Google Authenticator, Authy, etc.).
                </p>
              </div>

              <div>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ""))}
                  placeholder="000000"
                  className="w-full py-3 px-4 text-center font-mono text-xl tracking-widest rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 bg-slate-50"
                />
              </div>

              <button
                type="submit"
                disabled={verifyingMfa || totpCode.length !== 6}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-teal-600 hover:bg-teal-700 text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {verifyingMfa ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Validating Code...</span>
                  </>
                ) : (
                  <span>Verify &amp; Enter Staff Desk</span>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMfaRequired(false);
                    setTotpCode("");
                  }}
                  className="text-xs text-slate-500 hover:text-slate-800 underline"
                >
                  &larr; Back to login
                </button>
              </div>
            </form>
          )}

          {/* PORTAL SWITCHER */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Executive / Hospital Owner?</span>
            <Link
              href="/admin/login"
              className="text-[#0B3D91] font-bold hover:underline flex items-center gap-1"
            >
              <span>CEO Login</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StaffLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center text-white text-xs">Loading Staff Desk...</div>}>
      <StaffLoginForm />
    </Suspense>
  );
}
