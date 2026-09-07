"use client";

import React, { useState, useEffect } from "react";
import {
  Clock,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldAlert,
  Calendar,
  MessageSquare,
  RefreshCw,
  Sliders
} from "lucide-react";
import { RetentionPolicy } from "@/types/database";
import ConfirmDeleteModal from "@/components/dashboard/ConfirmDeleteModal";

interface RetentionSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCleanupComplete?: () => void;
}

export default function RetentionSettingsModal({
  isOpen,
  onClose,
  onCleanupComplete,
}: RetentionSettingsModalProps) {
  const [policy, setPolicy] = useState<RetentionPolicy>({
    unconfirmed_days: 7,
    confirmed_days: 30,
    messages_days: 30,
  });

  const [stats, setStats] = useState<{
    expired_unconfirmed: number;
    expired_confirmed: number;
    expired_messages: number;
    total_eligible: number;
  }>({
    expired_unconfirmed: 0,
    expired_confirmed: 0,
    expired_messages: 0,
    total_eligible: 0,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [cleaning, setCleaning] = useState(false);
  const [confirmCleanupOpen, setConfirmCleanupOpen] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/retention");
      if (res.ok) {
        const data = await res.json();
        if (data.policy) setPolicy(data.policy);
        if (data.stats) setStats(data.stats);
      }
    } catch (err) {
      console.error("Error fetching retention policy:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setNotice(null);
      fetchSettings();
    }
  }, [isOpen]);

  const handleSavePolicy = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setNotice(null);

    try {
      const res = await fetch("/api/admin/retention", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(policy),
      });

      const data = await res.json();
      if (res.ok) {
        setNotice({ type: "success", text: "Retention policy saved successfully." });
        fetchSettings();
      } else {
        setNotice({ type: "error", text: data.error || "Failed to save settings." });
      }
    } catch (err) {
      setNotice({ type: "error", text: "Network error saving settings." });
    } finally {
      setSaving(false);
    }
  };

  const handleExecuteCleanup = async () => {
    setCleaning(true);
    setNotice(null);
    setConfirmCleanupOpen(false);

    try {
      const res = await fetch("/api/admin/retention", {
        method: "DELETE",
      });

      const data = await res.json();
      if (res.ok) {
        setNotice({
          type: "success",
          text: `Cleaned up ${data.deleted?.total || 0} expired records from the database.`,
        });
        fetchSettings();
        if (onCleanupComplete) onCleanupComplete();
      } else {
        setNotice({ type: "error", text: data.error || "Failed to execute cleanup." });
      }
    } catch (err) {
      setNotice({ type: "error", text: "Network error during cleanup." });
    } finally {
      setCleaning(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in-50">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        {/* HEADER */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-[#0B3D91]">
                Database Auto-Retention & Cleanup
              </h3>
              <p className="text-xs text-slate-500">
                Configure when unconfirmed bookings, patient history, and messages are purged.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-xl font-bold p-1 cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* NOTICES */}
        {notice && (
          <div
            className={`p-3.5 rounded-2xl text-xs flex items-center gap-2 animate-in fade-in-50 ${
              notice.type === "success"
                ? "bg-teal-50 border border-teal-200 text-teal-800"
                : "bg-rose-50 border border-rose-200 text-rose-800"
            }`}
          >
            {notice.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{notice.text}</span>
          </div>
        )}

        {loading ? (
          <div className="py-12 text-center text-xs text-slate-500 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-teal-600" />
            <span>Loading retention metrics...</span>
          </div>
        ) : (
          <>
            {/* STATS OVERVIEW */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-2xl text-center space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                  Pending Past Cutoff
                </span>
                <span className="text-xl font-black text-amber-900">
                  {stats.expired_unconfirmed}
                </span>
                <span className="text-[10px] text-amber-700 block">
                  &gt; {policy.unconfirmed_days} days
                </span>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-200/60 rounded-2xl text-center space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 block">
                  Confirmed Past Cutoff
                </span>
                <span className="text-xl font-black text-blue-900">
                  {stats.expired_confirmed}
                </span>
                <span className="text-[10px] text-blue-700 block">
                  &gt; {policy.confirmed_days} days
                </span>
              </div>

              <div className="p-3 bg-purple-50/70 border border-purple-200/60 rounded-2xl text-center space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 block">
                  Messages Past Cutoff
                </span>
                <span className="text-xl font-black text-purple-900">
                  {stats.expired_messages}
                </span>
                <span className="text-[10px] text-purple-700 block">
                  &gt; {policy.messages_days} days
                </span>
              </div>
            </div>

            {/* CONFIGURATION FORM */}
            <form onSubmit={handleSavePolicy} className="space-y-4 text-xs pt-1">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                {/* 1. Unconfirmed Appointments */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-800 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Unconfirmed / Pending Bookings Auto-Delete</span>
                    </label>
                    <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      {policy.unconfirmed_days} Days
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={60}
                    value={policy.unconfirmed_days}
                    onChange={(e) =>
                      setPolicy({ ...policy, unconfirmed_days: Number(e.target.value) })
                    }
                    className="w-full accent-amber-600"
                  />
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Delete patient bookings that remained unconfirmed after this many days.
                  </p>
                </div>

                <div className="border-t border-slate-200/60 pt-3">
                  {/* 2. Confirmed Appointments */}
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-800 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      <span>Confirmed & Completed Appointments Auto-Delete</span>
                    </label>
                    <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                      {policy.confirmed_days} Days
                    </span>
                  </div>
                  <input
                    type="range"
                    min={7}
                    max={180}
                    value={policy.confirmed_days}
                    onChange={(e) =>
                      setPolicy({ ...policy, confirmed_days: Number(e.target.value) })
                    }
                    className="w-full accent-blue-600"
                  />
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Retain verified consultations in database for audit history before purging.
                  </p>
                </div>

                <div className="border-t border-slate-200/60 pt-3">
                  {/* 3. Contact Messages */}
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-800 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-purple-600" />
                      <span>Contact Inquiries Auto-Delete</span>
                    </label>
                    <span className="font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                      {policy.messages_days} Days
                    </span>
                  </div>
                  <input
                    type="range"
                    min={7}
                    max={180}
                    value={policy.messages_days}
                    onChange={(e) =>
                      setPolicy({ ...policy, messages_days: Number(e.target.value) })
                    }
                    className="w-full accent-purple-600"
                  />
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Delete general website inquiry submissions after this duration.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setConfirmCleanupOpen(true)}
                  disabled={cleaning || stats.total_eligible === 0}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                  title="Immediately purge all records matching these cutoff dates"
                >
                  {cleaning ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="w-3.5 h-3.5" />
                  )}
                  <span>
                    Clean Up {stats.total_eligible} Expired Records Now
                  </span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0B3D91] hover:bg-[#082a66] text-white flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <span>Save Retention Days</span>
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </div>

      {/* MODERN RETENTION PURGE CONFIRMATION MODAL */}
      <ConfirmDeleteModal
        isOpen={confirmCleanupOpen}
        onClose={() => setConfirmCleanupOpen(false)}
        onConfirm={handleExecuteCleanup}
        title="Confirm Database Cleanup"
        description={`Are you sure you want to permanently delete all ${stats.total_eligible} expired records from the Hospital Cloud Database? This action cannot be undone.`}
        loading={cleaning}
      />
    </div>
  );
}
