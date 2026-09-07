"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HeartPulse,
  KeyRound,
  ShieldCheck,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Mail,
  Lock,
  QrCode,
  LifeBuoy
} from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState<"totp" | "backup_code">("totp");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRecoverSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Please enter your account email address.");
      return;
    }

    if (!code.trim()) {
      setError(
        method === "totp"
          ? "Please enter your 6-digit Authenticator code."
          : "Please enter your emergency backup code."
      );
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/recover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          method,
          code: code.trim(),
          new_password: newPassword,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
      } else {
        setError(data.error || "Failed to recover password. Check your code.");
      }
    } catch (err: unknown) {
      setError("Network error while connecting to recovery service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-[#0B3D91] to-slate-900 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full">
        {/* BRAND HEADER */}
        <div className="text-center space-y-2 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0B3D91] to-[#14B8A6] border border-white/20 flex items-center justify-center text-white shadow-xl shadow-blue-950/40 mx-auto">
            <HeartPulse className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Account Recovery
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Malik Medical Complex &bull; 2FA & Backup Code Verification
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 space-y-6">
          {success ? (
            <div className="text-center space-y-4 animate-in zoom-in-95">
              <div className="w-14 h-14 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                Password Successfully Reset
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your password has been securely updated using your two-factor verification. You can now log into your hospital dashboard.
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <Link
                  href="/admin/login"
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-[#0B3D91] text-white text-center hover:bg-[#082a66] transition-colors"
                >
                  CEO / Admin Login
                </Link>
                <Link
                  href="/staff/login"
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-slate-100 text-slate-700 text-center hover:bg-slate-200 transition-colors"
                >
                  Staff Login
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleRecoverSubmit} className="space-y-4">
              {error && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2 animate-in fade-in-50">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="p-3 bg-amber-50/80 border border-amber-200/70 rounded-2xl text-[11px] text-amber-900 leading-relaxed flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  Password recovery is verified directly with your <strong>Authenticator App</strong> or <strong>Emergency Backup Code</strong> (no email confirmation needed).
                </span>
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Mail"
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B3D91] bg-slate-50/50"
                  />
                </div>
              </div>

              {/* METHOD TOGGLE */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {method === "totp" ? "6-Digit Authenticator Code" : "Backup Recovery Code"}
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setMethod(method === "totp" ? "backup_code" : "totp");
                      setCode("");
                      setError(null);
                    }}
                    className="text-[11px] font-bold text-teal-700 hover:underline cursor-pointer"
                  >
                    {method === "totp" ? "Use Backup Code" : "Use Authenticator App"}
                  </button>
                </div>

                <div className="relative">
                  {method === "totp" ? (
                    <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  ) : (
                    <LifeBuoy className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  )}
                  <input
                    type="text"
                    required
                    maxLength={method === "totp" ? 6 : 12}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder={method === "totp" ? "Enter 6-digit code (e.g. 123456)" : "Enter Backup Code (e.g. A4B2-9F8C)"}
                    className="w-full pl-10 pr-4 py-2.5 text-sm font-mono tracking-wider rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B3D91] bg-slate-50/50"
                  />
                </div>
              </div>

              {/* NEW PASSWORD */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  New Password (min 6 characters)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter your Password"
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B3D91] bg-slate-50/50"
                  />
                </div>
              </div>

              {/* CONFIRM NEW PASSWORD */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Enter your Password"
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B3D91] bg-slate-50/50"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-[#0B3D91] hover:bg-[#082a66] text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Code & Updating...</span>
                  </>
                ) : (
                  <span>Verify & Set New Password</span>
                )}
              </button>

              <div className="pt-2 text-center flex items-center justify-center gap-3 text-xs text-slate-500 font-semibold">
                <Link href="/admin/login" className="hover:text-slate-800 flex items-center gap-1">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>CEO Login</span>
                </Link>
                <span>&bull;</span>
                <Link href="/staff/login" className="hover:text-slate-800">
                  <span>Staff Login</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
