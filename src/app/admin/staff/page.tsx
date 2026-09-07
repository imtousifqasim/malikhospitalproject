"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  UserPlus,
  KeyRound,
  ShieldCheck,
  ShieldAlert,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  AlertCircle,
  Phone,
  Mail,
  Lock,
  RefreshCw,
  Trash2,
  Edit3
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { StaffProfile } from "@/types/database";

interface StaffWithEmail extends StaffProfile {
  email: string;
  last_sign_in_at?: string | null;
}

export default function AdminStaffPage() {
  const [staffList, setStaffList] = useState<StaffWithEmail[]>([]);
  const [currentProfile, setCurrentProfile] = useState<StaffProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // Modals state
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [resetModalStaff, setResetModalStaff] = useState<StaffWithEmail | null>(null);
  const [editModalStaff, setEditModalStaff] = useState<StaffWithEmail | null>(null);

  // Form states for Add Staff
  const [newFullName, setNewFullName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newRole, setNewRole] = useState<"staff" | "admin">("staff");
  const [newCanDelete, setNewCanDelete] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [submittingAdd, setSubmittingAdd] = useState(false);

  // Form states for Edit Staff (including email change)
  const [editFullName, setEditFullName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editRole, setEditRole] = useState<"staff" | "admin">("staff");
  const [editCanDelete, setEditCanDelete] = useState(false);
  const [submittingEdit, setSubmittingEdit] = useState(false);

  // Form states for Password Reset
  const [directNewPassword, setDirectNewPassword] = useState("");
  const [submittingReset, setSubmittingReset] = useState(false);

  // Action loading states
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [togglingDeleteId, setTogglingDeleteId] = useState<string | null>(null);

  const fetchStaffData = async () => {
    try {
      const res = await fetch("/api/admin/staff");
      if (res.ok) {
        const data = await res.json();
        setStaffList(data.staff || []);
      } else {
        const err = await res.json();
        setErrorNotice(err.error || "Failed to load staff list");
      }
    } catch (err) {
      console.error("Fetch staff error:", err);
      setErrorNotice("Could not connect to staff service");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStaffData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setErrorNotice(null);
    setSuccessNotice(null);
    fetchStaffData();
  };

  // Add new staff
  const handleAddStaffSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorNotice(null);
    setSuccessNotice(null);
    setSubmittingAdd(true);

    try {
      const res = await fetch("/api/admin/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: newFullName,
          email: newEmail,
          phone: newPhone,
          role: newRole,
          password: newPassword,
          can_delete: newRole === "admin" ? true : newCanDelete,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        setSuccessNotice(`Staff account for "${newFullName}" created successfully.`);
        setAddModalOpen(false);
        // Reset form
        setNewFullName("");
        setNewEmail("");
        setNewPhone("");
        setNewRole("staff");
        setNewCanDelete(false);
        setNewPassword("");
        fetchStaffData();
      } else {
        setErrorNotice(result.error || "Failed to create staff account.");
      }
    } catch (err) {
      setErrorNotice("Error submitting new staff member.");
    } finally {
      setSubmittingAdd(false);
    }
  };

  // Admin Direct Password Reset
  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetModalStaff) return;
    setErrorNotice(null);
    setSuccessNotice(null);
    setSubmittingReset(true);

    try {
      const res = await fetch(`/api/admin/staff/${resetModalStaff.id}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          new_password: directNewPassword,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        setSuccessNotice(`Password updated successfully for ${resetModalStaff.full_name}.`);
        setResetModalStaff(null);
        setDirectNewPassword("");
      } else {
        setErrorNotice(result.error || "Failed to reset password.");
      }
    } catch (err) {
      setErrorNotice("Error updating staff password.");
    } finally {
      setSubmittingReset(false);
    }
  };

  // Open Edit Details Modal
  const handleOpenEdit = (staff: StaffWithEmail) => {
    setEditModalStaff(staff);
    setEditFullName(staff.full_name || "");
    setEditEmail(staff.email || "");
    setEditPhone(staff.phone || "");
    setEditRole(staff.role as "staff" | "admin");
    setEditCanDelete(!!staff.can_delete);
  };

  // Submit Edit Staff (including email change)
  const handleEditStaffSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editModalStaff) return;
    setErrorNotice(null);
    setSuccessNotice(null);
    setSubmittingEdit(true);

    try {
      const res = await fetch(`/api/admin/staff/${editModalStaff.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: editFullName,
          email: editEmail,
          phone: editPhone,
          role: editRole,
          can_delete: editRole === "admin" ? true : editCanDelete,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        setSuccessNotice(`Staff profile & details for "${editFullName}" updated successfully.`);
        setEditModalStaff(null);
        fetchStaffData();
      } else {
        setErrorNotice(result.error || "Failed to update staff details.");
      }
    } catch (err) {
      setErrorNotice("Error updating staff details.");
    } finally {
      setSubmittingEdit(false);
    }
  };

  // Toggle active status
  const handleToggleActive = async (staff: StaffWithEmail) => {
    setTogglingId(staff.id);
    setErrorNotice(null);
    setSuccessNotice(null);

    try {
      const res = await fetch(`/api/admin/staff/${staff.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          is_active: !staff.is_active,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        setStaffList((prev) =>
          prev.map((s) => (s.id === staff.id ? { ...s, is_active: !s.is_active } : s))
        );
        setSuccessNotice(
          `${staff.full_name} is now ${!staff.is_active ? "Active" : "Deactivated"}.`
        );
      } else {
        setErrorNotice(result.error || "Failed to change account status.");
      }
    } catch (err) {
      setErrorNotice("Error updating status.");
    } finally {
      setTogglingId(null);
    }
  };

  // Toggle deletion permission for staff
  const handleToggleCanDelete = async (staff: StaffWithEmail) => {
    setTogglingDeleteId(staff.id);
    setErrorNotice(null);
    setSuccessNotice(null);

    try {
      const res = await fetch(`/api/admin/staff/${staff.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          can_delete: !staff.can_delete,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        setStaffList((prev) =>
          prev.map((s) => (s.id === staff.id ? { ...s, can_delete: !s.can_delete } : s))
        );
        setSuccessNotice(
          `Deletion access for ${staff.full_name} has been ${!staff.can_delete ? "Granted" : "Revoked"}.`
        );
      } else {
        setErrorNotice(result.error || "Failed to update deletion permission.");
      }
    } catch (err) {
      setErrorNotice("Error updating deletion permission.");
    } finally {
      setTogglingDeleteId(null);
    }
  };

  const filteredStaff = staffList.filter((s) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      s.full_name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      (s.phone && s.phone.toLowerCase().includes(q)) ||
      s.role.toLowerCase().includes(q)
    );
  });

  return (
    <DashboardLayout
      userRole="admin"
      currentProfile={currentProfile}
      pageTitle="Staff & Role Management"
    >
      <div className="space-y-6">
        {/* NOTICES */}
        {errorNotice && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center justify-between animate-in fade-in-50">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorNotice}</span>
            </div>
            <button onClick={() => setErrorNotice(null)} className="font-bold text-rose-500 hover:text-rose-800">×</button>
          </div>
        )}

        {successNotice && (
          <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-800 text-xs sm:text-sm flex items-center justify-between animate-in fade-in-50">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
              <span>{successNotice}</span>
            </div>
            <button onClick={() => setSuccessNotice(null)} className="font-bold text-teal-500 hover:text-teal-800">×</button>
          </div>
        )}

        {/* HEADER BAR & CONTROLS */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search staff by name, email, or role..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B3D91] bg-slate-50/50"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-teal-600" : ""}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={() => setAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#0B3D91] hover:bg-[#082a66] text-white shadow-sm transition-colors cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Staff Account</span>
            </button>
          </div>
        </div>

        {/* STAFF DIRECTORY TABLE */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {loading ? (
            <div className="py-16 text-center text-slate-500 flex flex-col items-center justify-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-teal-600" />
              <span className="text-xs font-semibold">Loading staff directory...</span>
            </div>
          ) : filteredStaff.length === 0 ? (
            <div className="py-16 text-center text-slate-500">
              <Users className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-800">No staff members found</h3>
              <p className="text-xs text-slate-500 mt-1">
                Click &quot;Add Staff Account&quot; to register hospital coordinators and administrative assistants.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4">Staff Member</th>
                    <th className="py-3.5 px-4">Contact Info</th>
                    <th className="py-3.5 px-4">Role</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">2FA Security</th>
                    <th className="py-3.5 px-4">Delete Access</th>
                    <th className="py-3.5 px-4">Joined</th>
                    <th className="py-3.5 px-4 text-right">Admin Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filteredStaff.map((staff) => (
                    <tr key={staff.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#0B3D91] text-white flex items-center justify-center font-bold text-xs">
                            {staff.full_name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-sm">
                              {staff.full_name}
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono">
                              ID: {staff.id.substring(0, 8)}...
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="text-slate-900 font-medium flex items-center gap-1.5">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span className="font-semibold text-slate-900">{staff.email}</span>
                        </div>
                        {staff.phone && (
                          <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                            <Phone className="w-3 h-3 text-slate-400" />
                            <span>{staff.phone}</span>
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        {staff.role === "admin" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                            <ShieldCheck className="w-3 h-3 text-amber-600" />
                            <span>CEO / Admin</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
                            <span>Staff Member</span>
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        {staff.is_active ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Active</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                            <XCircle className="w-3 h-3 text-rose-600" />
                            <span>Deactivated</span>
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        {staff.totp_secret || (staff.backup_codes && staff.backup_codes.length > 0) ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            <span>2FA Active</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-500 border border-slate-200">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>Not Configured</span>
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        {staff.role === "admin" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                            <ShieldCheck className="w-3 h-3 text-amber-600" />
                            <span>Full Privileges</span>
                          </span>
                        ) : (
                          <button
                            onClick={() => handleToggleCanDelete(staff)}
                            disabled={togglingDeleteId === staff.id}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer border ${
                              staff.can_delete
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                                : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"
                            }`}
                            title="Click to toggle record deletion permissions"
                          >
                            <Trash2 className={`w-3 h-3 ${staff.can_delete ? "text-emerald-600" : "text-slate-400"}`} />
                            <span>{staff.can_delete ? "Allowed (Revoke)" : "Restricted (Grant)"}</span>
                          </button>
                        )}
                      </td>

                      <td className="py-3 px-4 text-[11px] text-slate-500">
                        {new Date(staff.created_at).toLocaleDateString()}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Edit Staff details button */}
                          <button
                            onClick={() => handleOpenEdit(staff)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 font-semibold text-[11px] transition-colors cursor-pointer border border-teal-200"
                            title="Edit Staff Details & Email"
                          >
                            <Edit3 className="w-3 h-3 text-teal-600" />
                            <span>Edit</span>
                          </button>

                          {/* Direct password reset button */}
                          <button
                            onClick={() => {
                              setResetModalStaff(staff);
                              setDirectNewPassword("");
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] transition-colors cursor-pointer"
                            title="Reset Staff Password"
                          >
                            <KeyRound className="w-3 h-3 text-amber-600" />
                            <span>Reset Password</span>
                          </button>

                          {/* Deactivate/Reactivate toggle */}
                          <button
                            onClick={() => handleToggleActive(staff)}
                            disabled={togglingId === staff.id}
                            className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] transition-colors cursor-pointer ${
                              staff.is_active
                                ? "bg-rose-50 hover:bg-rose-100 text-rose-700"
                                : "bg-emerald-50 hover:bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            {staff.is_active ? "Deactivate" : "Activate"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* MODAL 1: ADD NEW STAFF MEMBER */}
        {addModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in-50">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95">
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-lg font-black text-[#0B3D91]">
                    Register New Staff Account
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Creates a secure hospital staff credential & profile record.
                  </p>
                </div>
                <button
                  onClick={() => setAddModalOpen(false)}
                  className="text-slate-400 hover:text-slate-700 text-xl font-bold p-1 cursor-pointer"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleAddStaffSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newFullName}
                    onChange={(e) => setNewFullName(e.target.value)}
                    placeholder="e.g. Dr. Ayesha Khan"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0B3D91] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="staff@malikhospital.com"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0B3D91] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="0300-1234567"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0B3D91] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Role & Permissions *
                  </label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as "staff" | "admin")}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0B3D91] focus:outline-none bg-white font-medium"
                  >
                    <option value="staff">Hospital Staff (Appointments & Inquiries)</option>
                    <option value="admin">CEO / Executive Admin (Full System Access)</option>
                  </select>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={newRole === "admin" || newCanDelete}
                      disabled={newRole === "admin"}
                      onChange={(e) => setNewCanDelete(e.target.checked)}
                      className="w-4 h-4 rounded text-[#0B3D91] focus:ring-[#0B3D91] border-slate-300 cursor-pointer"
                    />
                    <span className="font-bold text-slate-800 text-xs">
                      Grant Record Deletion Access
                    </span>
                  </label>
                  <p className="text-[11px] text-slate-500 pl-6.5 leading-relaxed">
                    {newRole === "admin"
                      ? "Admins automatically have deletion access across all records."
                      : "Allow this staff member to delete individual appointments and inquiries."}
                  </p>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Initial Temporary Password * (min 6 chars)
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0B3D91] focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingAdd}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0B3D91] hover:bg-[#082a66] text-white flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    {submittingAdd && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <span>Create Account</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 2: DIRECT PASSWORD RESET */}
        {resetModalStaff && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in-50">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95">
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-lg font-black text-[#0B3D91]">
                    Reset Staff Password
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Directly updates password for: <strong>{resetModalStaff.full_name}</strong>
                  </p>
                </div>
                <button
                  onClick={() => setResetModalStaff(null)}
                  className="text-slate-400 hover:text-slate-700 text-xl font-bold p-1 cursor-pointer"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleResetPasswordSubmit} className="space-y-4 text-xs">
                <div className="p-3 bg-amber-50 border border-amber-200/70 rounded-xl text-amber-900 leading-relaxed">
                  As CEO/Admin, this overrides the staff member&apos;s password immediately via the Hospital Security Core.
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    New Password * (min 6 characters)
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={directNewPassword}
                    onChange={(e) => setDirectNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0B3D91] focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setResetModalStaff(null)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingReset}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    {submittingReset && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <span>Update Password</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL 3: EDIT STAFF DETAILS & EMAIL */}
        {editModalStaff && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in-50">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95">
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-lg font-black text-[#0B3D91]">
                    Edit Staff Profile & Details
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Modifying credentials for: <strong>{editModalStaff.full_name}</strong>
                  </p>
                </div>
                <button
                  onClick={() => setEditModalStaff(null)}
                  className="text-slate-400 hover:text-slate-700 text-xl font-bold p-1 cursor-pointer"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleEditStaffSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editFullName}
                    onChange={(e) => setEditFullName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0B3D91] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0B3D91] focus:outline-none"
                  />
                  <p className="text-[10.5px] text-slate-500 mt-1">
                    Updates both the Supabase Authentication login and the staff directory profile.
                  </p>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    placeholder="0300-1234567"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0B3D91] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Role & Permissions *
                  </label>
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value as "staff" | "admin")}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0B3D91] focus:outline-none bg-white font-medium"
                  >
                    <option value="staff">Hospital Staff (Appointments & Inquiries)</option>
                    <option value="admin">CEO / Executive Admin (Full System Access)</option>
                  </select>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={editRole === "admin" || editCanDelete}
                      disabled={editRole === "admin"}
                      onChange={(e) => setEditCanDelete(e.target.checked)}
                      className="w-4 h-4 rounded text-[#0B3D91] focus:ring-[#0B3D91] border-slate-300 cursor-pointer"
                    />
                    <span className="font-bold text-slate-800 text-xs">
                      Grant Record Deletion Access
                    </span>
                  </label>
                  <p className="text-[11px] text-slate-500 pl-6.5 leading-relaxed">
                    {editRole === "admin"
                      ? "Admins automatically have deletion access across all records."
                      : "Allow this staff member to delete appointments & patient messages."}
                  </p>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setEditModalStaff(null)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingEdit}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0B3D91] hover:bg-[#082a66] text-white flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    {submittingEdit && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
