"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock3,
  AlertCircle,
  Eye,
  RefreshCw,
  Sparkles,
  Building2,
  Stethoscope,
  ChevronDown,
  Trash2,
  Sliders,
  Plus,
  MessageCircle,
  ShieldCheck,
  Lock
} from "lucide-react";
import { departments } from "@/data/departments";
import { doctors } from "@/data/doctors";
import { Appointment, AppointmentStatus, StaffProfile } from "@/types/database";
import { createClient } from "@/lib/supabase/client";
import { validateAndFormatWhatsApp, generateWhatsAppMessage, buildWhatsAppLink } from "@/lib/phone";
import RetentionSettingsModal from "@/components/dashboard/RetentionSettingsModal";
import ConfirmDeleteModal from "@/components/dashboard/ConfirmDeleteModal";

interface AppointmentsManagerProps {
  initialAppointments?: Appointment[];
  role: "admin" | "staff";
  canDelete?: boolean;
  currentProfile?: StaffProfile | null;
}

export default function AppointmentsManager({
  initialAppointments = [],
  role,
  canDelete = false,
  currentProfile = null,
}: AppointmentsManagerProps) {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const [selectedDoctor, setSelectedDoctor] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalAppointment, setActiveModalAppointment] = useState<Appointment | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [retentionModalOpen, setRetentionModalOpen] = useState(false);

  const [activeProfile, setActiveProfile] = useState<StaffProfile | null>(currentProfile || null);

  // Keep activeProfile loaded and synchronized
  useEffect(() => {
    if (currentProfile) {
      setActiveProfile(currentProfile);
    } else {
      const supabase = createClient();
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) {
          supabase
            .from("staff_profiles")
            .select("*")
            .eq("id", user.id)
            .maybeSingle()
            .then(({ data: prof }) => {
              if (prof) setActiveProfile(prof as StaffProfile);
            });
        }
      });
    }
  }, [currentProfile]);

  // Sync state whenever initialAppointments prop updates
  React.useEffect(() => {
    if (initialAppointments && initialAppointments.length > 0) {
      setAppointments(initialAppointments);
    }
  }, [initialAppointments]);

  // Auto-fetch on mount so navigating to this page always shows latest records
  React.useEffect(() => {
    handleRefresh();
  }, []);

  // Helper date strings
  const todayStr = new Date().toISOString().split("T")[0];
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrowStr = tomorrowDate.toISOString().split("T")[0];

  // Refresh appointments from Supabase
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .order("created_at", { ascending: false });

      if (data && !error) {
        setAppointments(data as Appointment[]);
      }
    } catch (err) {
      console.error("Refresh error:", err);
    } finally {
      setRefreshing(false);
    }
  };

  // Update Status in Supabase (with completed lock guard & updater attribution)
  const handleStatusUpdate = async (id: string, newStatus: AppointmentStatus) => {
    // 1. Guard: Check if already completed
    const currentApp = appointments.find((app) => app.id === id);
    if (currentApp && currentApp.status === "completed") {
      alert("This appointment has already been completed. Its status is permanently locked and cannot be changed.");
      return;
    }

    // 2. Resolve updater info
    const supabase = createClient();
    let updaterName = activeProfile?.full_name || currentProfile?.full_name;
    let updaterId = activeProfile?.id || currentProfile?.id;
    let updaterRole = activeProfile?.role || currentProfile?.role || role;

    if (!updaterName) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        updaterId = user.id;
        const { data: prof } = await supabase
          .from("staff_profiles")
          .select("id, full_name, role")
          .eq("id", user.id)
          .maybeSingle();

        if (prof?.full_name) {
          updaterName = prof.full_name;
          updaterRole = (prof.role as "admin" | "staff") || role;
        } else if (user.user_metadata?.full_name) {
          updaterName = user.user_metadata.full_name;
        }
      }
    }

    if (!updaterName) {
      updaterName = role === "admin" ? "CEO / Executive Admin" : "Hospital Staff Member";
    }

    setUpdatingId(id);
    try {
      const updatePayload = {
        status: newStatus,
        updated_at: new Date().toISOString(),
        updated_by_name: updaterName,
        updated_by_id: updaterId || null,
        updated_by_role: updaterRole,
      };

      const { error } = await supabase
        .from("appointments")
        .update(updatePayload)
        .eq("id", id);

      if (!error) {
        setAppointments((prev) =>
          prev.map((app) => (app.id === id ? { ...app, ...updatePayload } : app))
        );
        if (activeModalAppointment && activeModalAppointment.id === id) {
          setActiveModalAppointment((prev) =>
            prev ? { ...prev, ...updatePayload } : null
          );
        }
      } else {
        alert("Could not update status: " + error.message);
      }
    } catch (err) {
      console.error("Status update error:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Delete Target & modern confirmation state
  const [deleteTarget, setDeleteTarget] = useState<Appointment | null>(null);

  // Delete Appointment (modern dialog confirmed)
  const handleConfirmDeleteAppointment = async () => {
    if (!deleteTarget) return;
    setDeletingId(deleteTarget.id);
    try {
      const res = await fetch(`/api/appointments/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAppointments((prev) => prev.filter((a) => a.id !== deleteTarget.id));
        if (activeModalAppointment?.id === deleteTarget.id) {
          setActiveModalAppointment(null);
        }
        setDeleteTarget(null);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete appointment.");
      }
    } catch (err) {
      console.error("Error deleting appointment:", err);
      alert("Error deleting appointment.");
    } finally {
      setDeletingId(null);
    }
  };

  // WhatsApp custom message & booking states
  const [customWaNote, setCustomWaNote] = useState("");
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [justBookedApp, setJustBookedApp] = useState<Appointment | null>(null);

  // Walk-In Desk form states
  const [deskName, setDeskName] = useState("");
  const [deskPhone, setDeskPhone] = useState("");
  const [deskPhoneError, setDeskPhoneError] = useState<string | null>(null);
  const [deskGender, setDeskGender] = useState<"Male" | "Female" | "Child">("Male");
  const [deskAge, setDeskAge] = useState("");
  const [deskDept, setDeskDept] = useState("general-medicine");
  const [deskDoctor, setDeskDoctor] = useState("");
  const [deskDate, setDeskDate] = useState(todayStr);
  const [deskTimeSlot, setDeskTimeSlot] = useState("Morning Shift (9:00 AM – 1:00 PM)");
  const [deskSymptoms, setDeskSymptoms] = useState("");
  const [deskStatus, setDeskStatus] = useState<AppointmentStatus>("confirmed");
  const [submittingDesk, setSubmittingDesk] = useState(false);
  const [deskSubmitError, setDeskSubmitError] = useState<string | null>(null);

  // Filter doctors for the walk-in modal based on deskDept
  const deskFilteredDoctors = useMemo(() => {
    const dept = departments.find((d) => d.slug === deskDept);
    return dept
      ? doctors.filter((doc) => dept.doctorIds.includes(doc.id))
      : doctors;
  }, [deskDept]);

  // Auto-select first doctor when deskDept changes
  useEffect(() => {
    if (deskFilteredDoctors.length > 0 && !deskFilteredDoctors.some((d) => d.slug === deskDoctor)) {
      setDeskDoctor(deskFilteredDoctors[0].slug);
    }
  }, [deskFilteredDoctors, deskDoctor]);

  // Handle Walk-In Appointment Booking
  const handleBookDeskAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    setDeskPhoneError(null);
    setDeskSubmitError(null);

    const phoneCheck = validateAndFormatWhatsApp(deskPhone);
    if (!phoneCheck.isValid) {
      setDeskPhoneError(phoneCheck.error || "Please provide an active WhatsApp mobile number.");
      return;
    }

    setSubmittingDesk(true);

    try {
      const selectedDocObj = doctors.find((d) => d.slug === deskDoctor);
      const selectedDeptObj = departments.find((d) => d.slug === deskDept);
      const prefix = selectedDocObj ? selectedDocObj.name.substring(3, 6).toUpperCase() : "MMC";
      const randomId = Math.floor(100 + Math.random() * 900);
      const token = `${prefix}-${randomId}`;

      const supabase = createClient();

      // Retrieve the authenticated user's profile to get their real full name
      let staffName = activeProfile?.full_name || currentProfile?.full_name;
      let staffId = activeProfile?.id || currentProfile?.id;
      let staffRole = activeProfile?.role || currentProfile?.role || role;

      if (!staffName) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          staffId = user.id;
          const { data: prof } = await supabase
            .from("staff_profiles")
            .select("id, full_name, role")
            .eq("id", user.id)
            .maybeSingle();

          if (prof?.full_name) {
            staffName = prof.full_name;
            staffRole = (prof.role as "admin" | "staff") || role;
          } else if (user.user_metadata?.full_name) {
            staffName = user.user_metadata.full_name;
          }
        }
      }

      if (!staffName) {
        staffName = role === "admin" ? "CEO / Executive Admin" : "Hospital Staff Member";
      }

      const { data: newRecord, error } = await supabase
        .from("appointments")
        .insert({
          token,
          patient_name: deskName.trim(),
          phone: phoneCheck.cleanPhone,
          gender: deskGender,
          age: deskAge.trim() || null,
          patient_type: "Walk-in Desk",
          visit_type: "opd",
          department: selectedDeptObj?.name || "General Medicine",
          doctor: selectedDocObj?.name || "First Available Specialist",
          date: deskDate,
          time_slot: deskTimeSlot,
          symptoms: deskSymptoms.trim() || null,
          status: deskStatus,
          booked_by_name: staffName,
          booked_by_id: staffId || null,
          booked_by_role: staffRole,
        })
        .select()
        .single();

      if (error) {
        setDeskSubmitError(error.message || "Failed to save appointment to database.");
        return;
      }

      if (newRecord) {
        const createdApp = newRecord as Appointment;
        setAppointments((prev) => [createdApp, ...prev]);
        setJustBookedApp(createdApp);
        // Reset inputs
        setDeskName("");
        setDeskPhone("");
        setDeskAge("");
        setDeskSymptoms("");
      }
    } catch (err) {
      console.error("Desk booking error:", err);
      setDeskSubmitError("An error occurred while booking appointment.");
    } finally {
      setSubmittingDesk(false);
    }
  };

  // Combinable Filtering
  const filteredAppointments = useMemo(() => {
    return appointments.filter((app) => {
      // 1. Department / Category Filter
      if (selectedDept !== "all") {
        const appDept = (app.department || "").toLowerCase();
        const targetDept = selectedDept.toLowerCase();
        if (!appDept.includes(targetDept)) return false;
      }

      // 2. Doctor Filter
      if (selectedDoctor !== "all") {
        const appDoc = (app.doctor || "").toLowerCase();
        const targetDoc = selectedDoctor.toLowerCase();
        if (!appDoc.includes(targetDoc)) return false;
      }

      // 3. Status Filter
      if (statusFilter !== "all") {
        if (app.status !== statusFilter) return false;
      }

      // 4. Date Filter
      if (dateFilter === "today") {
        if (app.date !== todayStr) return false;
      } else if (dateFilter === "tomorrow") {
        if (app.date !== tomorrowStr) return false;
      } else if (dateFilter === "upcoming") {
        if (app.date < todayStr) return false;
      }

      // 5. Search Query (Patient Name, Phone, or Token)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = app.patient_name.toLowerCase().includes(q);
        const matchPhone = app.phone.toLowerCase().includes(q);
        const matchToken = app.token.toLowerCase().includes(q);
        if (!matchName && !matchPhone && !matchToken) return false;
      }

      return true;
    });
  }, [appointments, selectedDept, selectedDoctor, statusFilter, dateFilter, searchQuery, todayStr, tomorrowStr]);

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case "confirmed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
            <span>Confirmed</span>
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Completed</span>
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Cancelled</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock3 className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>Pending</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* FILTER CONTROL CARD */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search patient, phone, or token..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0B3D91] focus:border-transparent bg-slate-50/50"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
            <span className="text-xs font-semibold text-slate-500">
              Showing {filteredAppointments.length} of {appointments.length}
            </span>
            {role === "admin" && (
              <button
                onClick={() => setRetentionModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition-colors cursor-pointer"
                title="Configure Auto-Retention & Cleanup Policies"
              >
                <Sliders className="w-3.5 h-3.5 text-amber-700" />
                <span>Auto-Retention</span>
              </button>
            )}
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-teal-600" : ""}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={() => {
                setJustBookedApp(null);
                setDeskSubmitError(null);
                setBookModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#0B3D91] hover:bg-[#082a66] rounded-xl shadow-xs transition-colors cursor-pointer"
              title="Book Walk-in or Telephone Appointment"
            >
              <Plus className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>

        {/* COMBINABLE FILTERS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-slate-100">
          {/* 1. Category / Department Filter (from static departments.ts) */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
              Department / Specialty
            </label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full text-xs font-medium py-2 px-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-[#0B3D91] focus:outline-none"
            >
              <option value="all">All Departments ({departments.length})</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Doctor Filter (from static doctors.ts) */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
              Specialist Consultant
            </label>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="w-full text-xs font-medium py-2 px-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-[#0B3D91] focus:outline-none"
            >
              <option value="all">All Doctors ({doctors.length})</option>
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.name}>
                  {doc.name} ({doc.specialty})
                </option>
              ))}
            </select>
          </div>

          {/* 3. Status Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
              Booking Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full text-xs font-medium py-2 px-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-[#0B3D91] focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending Review</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* 4. Date Range Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
              Appointment Date
            </label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full text-xs font-medium py-2 px-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-[#0B3D91] focus:outline-none"
            >
              <option value="all">All Dates</option>
              <option value="today">Today ({todayStr})</option>
              <option value="tomorrow">Tomorrow ({tomorrowStr})</option>
              <option value="upcoming">Upcoming (Today & Future)</option>
            </select>
          </div>
        </div>

        {/* ACTIVE FILTER PILLS */}
        {(selectedDept !== "all" || selectedDoctor !== "all" || statusFilter !== "all" || dateFilter !== "all" || searchQuery) && (
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
            <span className="font-semibold text-slate-500">Active filters:</span>
            {selectedDept !== "all" && (
              <span className="inline-flex items-center gap-1 bg-teal-50 text-teal-700 border border-teal-200 px-2.5 py-0.5 rounded-full font-medium">
                Dept: {selectedDept}
                <button onClick={() => setSelectedDept("all")} className="hover:text-teal-900 ml-1">×</button>
              </span>
            )}
            {selectedDoctor !== "all" && (
              <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-full font-medium">
                Dr: {selectedDoctor}
                <button onClick={() => setSelectedDoctor("all")} className="hover:text-blue-900 ml-1">×</button>
              </span>
            )}
            {statusFilter !== "all" && (
              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full font-medium capitalize">
                Status: {statusFilter}
                <button onClick={() => setStatusFilter("all")} className="hover:text-amber-900 ml-1">×</button>
              </span>
            )}
            {dateFilter !== "all" && (
              <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 py-0.5 rounded-full font-medium capitalize">
                Date: {dateFilter}
                <button onClick={() => setDateFilter("all")} className="hover:text-indigo-900 ml-1">×</button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-0.5 rounded-full font-medium">
                Search: &quot;{searchQuery}&quot;
                <button onClick={() => setSearchQuery("")} className="hover:text-slate-900 ml-1">×</button>
              </span>
            )}
            <button
              onClick={() => {
                setSelectedDept("all");
                setSelectedDoctor("all");
                setStatusFilter("all");
                setDateFilter("all");
                setSearchQuery("");
              }}
              className="text-xs text-rose-600 hover:underline font-semibold ml-2"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* APPOINTMENTS DATA TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {filteredAppointments.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No appointments found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              No patient bookings match your active combination of department, doctor, and date filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Token & Patient</th>
                  <th className="py-3.5 px-4">Department & Doctor</th>
                  <th className="py-3.5 px-4">Date & Slot</th>
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Booked / Handled By</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredAppointments.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 text-sm">
                        {app.patient_name}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="font-mono text-[11px] font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200/50">
                          {app.token}
                        </span>
                        {app.gender && (
                          <span className="text-[11px] text-slate-500">
                            {app.gender}, {app.age ? `${app.age}y` : ""}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900 truncate max-w-[200px]">
                        {app.department || "General Medicine"}
                      </div>
                      <div className="text-[11px] text-teal-700 truncate max-w-[200px]">
                        {app.doctor || "On-Duty Consultant"}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">
                        {app.date}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {app.time_slot}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <a
                        href={`tel:${app.phone}`}
                        className="font-mono text-xs text-[#0B3D91] hover:underline font-bold block"
                      >
                        {app.phone}
                      </a>
                      <a
                        href={buildWhatsAppLink(app.phone, generateWhatsAppMessage(app))}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-emerald-600 hover:text-emerald-700 hover:underline font-bold mt-0.5"
                        title="Open WhatsApp chat with patient"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>WhatsApp</span>
                      </a>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex flex-col gap-1">
                        {app.booked_by_role === "staff" || (app.booked_by_name && app.booked_by_name !== "Online / Website Patient" && app.booked_by_role !== "admin") ? (
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900 text-xs">
                              {app.booked_by_name || "Hospital Staff"}
                            </span>
                            <span className="text-[10px] text-[#0B3D91] font-semibold flex items-center gap-1 mt-0.5">
                              <User className="w-2.5 h-2.5 shrink-0" />
                              <span>Staff Booking</span>
                            </span>
                          </div>
                        ) : app.booked_by_role === "admin" ? (
                          <div className="flex flex-col">
                            <span className="font-bold text-amber-950 text-xs">
                              {app.booked_by_name || "CEO / Executive"}
                            </span>
                            <span className="text-[10px] text-amber-700 font-semibold flex items-center gap-1 mt-0.5">
                              <ShieldCheck className="w-2.5 h-2.5 shrink-0 text-amber-600" />
                              <span>Admin Booking</span>
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-700 text-xs">
                              Online Patient
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium">
                              Website Booking
                            </span>
                          </div>
                        )}

                        {/* Handled / Updated by staff info */}
                        {app.updated_by_name && (
                          <div className="mt-0.5 pt-1 border-t border-slate-100 flex flex-col">
                            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">
                              Status Handled By:
                            </span>
                            <span className="text-[11px] font-bold text-teal-800 flex items-center gap-1 mt-0.5">
                              <User className="w-2.5 h-2.5 text-teal-600 shrink-0" />
                              <span>{app.updated_by_name}</span>
                              {app.updated_by_role === "staff" && (
                                <span className="text-[9px] bg-teal-50 text-teal-700 border border-teal-200/80 px-1 py-0.2 rounded font-semibold">
                                  Staff
                                </span>
                              )}
                            </span>
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      {getStatusBadge(app.status)}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Quick status buttons */}
                        {app.status === "pending" && (
                          <button
                            onClick={() => handleStatusUpdate(app.id, "confirmed")}
                            disabled={updatingId === app.id}
                            className="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold text-[11px] transition-colors cursor-pointer"
                          >
                            Confirm
                          </button>
                        )}
                        {app.status === "confirmed" && (
                          <button
                            onClick={() => handleStatusUpdate(app.id, "completed")}
                            disabled={updatingId === app.id}
                            className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[11px] transition-colors cursor-pointer"
                          >
                            Complete
                          </button>
                        )}
                        <a
                          href={buildWhatsAppLink(app.phone, generateWhatsAppMessage(app))}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition-colors"
                          title="Send WhatsApp Update to Patient"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => setActiveModalAppointment(app)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                          title="View Full Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        {(role === "admin" || canDelete) && (
                          <button
                            onClick={() => setDeleteTarget(app)}
                            disabled={deletingId === app.id}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                            title="Delete Appointment Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* APPOINTMENT DETAILS MODAL */}
      {activeModalAppointment && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="font-mono text-xs font-black text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                  {activeModalAppointment.token}
                </span>
                <h3 className="text-lg font-black text-[#0B3D91] mt-1.5">
                  {activeModalAppointment.patient_name}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalAppointment(null)}
                className="text-slate-400 hover:text-slate-700 text-xl font-bold p-1 cursor-pointer"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Phone</span>
                <a href={`tel:${activeModalAppointment.phone}`} className="font-bold text-slate-900 text-sm">
                  {activeModalAppointment.phone}
                </a>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Demographics</span>
                <span className="font-bold text-slate-900">
                  {activeModalAppointment.gender || "N/A"}, {activeModalAppointment.age ? `${activeModalAppointment.age} yrs` : "Age not specified"}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Department</span>
                <span className="font-bold text-slate-900">
                  {activeModalAppointment.department || "General Medicine"}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Doctor</span>
                <span className="font-bold text-slate-900">
                  {activeModalAppointment.doctor || "General Specialist"}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Scheduled Date</span>
                <span className="font-bold text-slate-900">
                  {activeModalAppointment.date}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Time Slot</span>
                <span className="font-bold text-slate-900">
                  {activeModalAppointment.time_slot}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl col-span-2 space-y-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Origin &amp; Booking Attribution</span>
                  <span className="font-bold text-slate-900 text-xs">
                    {activeModalAppointment.booked_by_role === "staff" || (activeModalAppointment.booked_by_name && activeModalAppointment.booked_by_name !== "Online / Website Patient" && activeModalAppointment.booked_by_role !== "admin")
                      ? `Staff Member: ${activeModalAppointment.booked_by_name || "Hospital Staff"}`
                      : activeModalAppointment.booked_by_role === "admin"
                      ? `CEO / Executive Admin: ${activeModalAppointment.booked_by_name || "Executive"}`
                      : "🌐 Online Website Booking by Patient"}
                  </span>
                </div>
                {activeModalAppointment.updated_by_name && (
                  <div className="pt-2 border-t border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Status Handled / Updated By</span>
                    <span className="font-bold text-teal-800 text-xs flex items-center gap-1.5 mt-0.5">
                      <User className="w-3 h-3 text-teal-600" />
                      <span>{activeModalAppointment.updated_by_name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 font-semibold uppercase">
                        {activeModalAppointment.updated_by_role || "Staff"}
                      </span>
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Symptoms & Notes */}
            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Reported Reason / Symptoms
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {activeModalAppointment.symptoms || "No specific symptoms mentioned during booking."}
              </p>
            </div>

            {/* Status Selector */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Appointment Status:
                </label>
                {activeModalAppointment.status === "completed" && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    <Lock className="w-3 h-3 text-emerald-600" />
                    Status Locked (Completed)
                  </span>
                )}
              </div>

              {activeModalAppointment.status === "completed" ? (
                <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 text-xs flex items-center gap-2.5 font-medium">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Consultation Completed</span>
                    <span className="text-[11px] text-slate-500">
                      Yeh appointment complete ho chuki hai. Is ka status permanently lock hai aur dobara update nahi ho sakta.
                    </span>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-2">
                  {(["pending", "confirmed", "completed", "cancelled"] as AppointmentStatus[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusUpdate(activeModalAppointment.id, st)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                        activeModalAppointment.status === st
                          ? "bg-[#0B3D91] text-white shadow-sm"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* WHATSAPP PATIENT UPDATE NOTIFIER */}
            <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Update Patient on WhatsApp</span>
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-200/60 text-emerald-800">
                  Direct Dispatch
                </span>
              </div>

              <p className="text-[11px] text-emerald-800 leading-relaxed">
                Send official notification to <strong>{activeModalAppointment.patient_name}</strong> ({activeModalAppointment.phone}) with token <strong>{activeModalAppointment.token}</strong> for current status (<strong>{activeModalAppointment.status.toUpperCase()}</strong>).
              </p>

              <div>
                <label className="block text-[11px] font-semibold text-emerald-900 mb-1">
                  Optional Desk Note (appended to message):
                </label>
                <input
                  type="text"
                  value={customWaNote}
                  onChange={(e) => setCustomWaNote(e.target.value)}
                  placeholder="e.g. Please bring previous prescriptions / fasting required"
                  className="w-full text-xs px-3 py-1.5 rounded-xl border border-emerald-300 bg-white text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  const msg = generateWhatsAppMessage(activeModalAppointment, customWaNote);
                  const url = buildWhatsAppLink(activeModalAppointment.phone, msg);
                  window.open(url, "_blank", "noopener,noreferrer");
                }}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Update Patient on WhatsApp ({activeModalAppointment.status.toUpperCase()})</span>
              </button>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              {(role === "admin" || canDelete) ? (
                <button
                  type="button"
                  onClick={() => setDeleteTarget(activeModalAppointment)}
                  disabled={deletingId === activeModalAppointment.id}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Appointment</span>
                </button>
              ) : <div />}

              <button
                onClick={() => setActiveModalAppointment(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WALK-IN / DESK BOOKING MODAL */}
      {bookModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-[#0B3D91]">
                  Book Walk-in / Desk Appointment
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Booked by: <strong>{activeProfile?.full_name || currentProfile?.full_name || (role === "admin" ? "CEO / Executive Admin" : "Hospital Staff Member")}</strong>
                </p>
              </div>
              <button
                onClick={() => setBookModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-xl font-bold p-1 cursor-pointer"
              >
                ×
              </button>
            </div>

            {justBookedApp ? (
              <div className="p-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <span className="font-mono text-xs font-black text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                    Token: {justBookedApp.token}
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 mt-2">
                    Appointment Booked Successfully!
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Patient: <strong>{justBookedApp.patient_name}</strong> &bull; {justBookedApp.doctor}
                  </p>
                </div>

                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
                  <p className="text-xs font-semibold text-emerald-900">
                    Would you like to send the confirmation WhatsApp message to the patient now?
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      const msg = generateWhatsAppMessage(justBookedApp);
                      const url = buildWhatsAppLink(justBookedApp.phone, msg);
                      window.open(url, "_blank", "noopener,noreferrer");
                    }}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send WhatsApp Slip to {justBookedApp.phone}</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setJustBookedApp(null);
                    setBookModalOpen(false);
                  }}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                >
                  Done / Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookDeskAppointment} className="space-y-3.5 text-xs">
                {deskSubmitError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{deskSubmitError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Patient Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={deskName}
                      onChange={(e) => setDeskName(e.target.value)}
                      placeholder="e.g. Tariq Mehmood"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0B3D91] focus:outline-none"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block font-bold text-slate-700">
                        WhatsApp Mobile *
                      </label>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        Active WhatsApp
                      </span>
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="0300-1234567"
                      value={deskPhone}
                      onChange={(e) => {
                        setDeskPhone(e.target.value);
                        if (deskPhoneError) setDeskPhoneError(null);
                      }}
                      onBlur={() => {
                        if (deskPhone.trim()) {
                          const res = validateAndFormatWhatsApp(deskPhone);
                          if (!res.isValid) {
                            setDeskPhoneError(res.error || "Invalid WhatsApp number.");
                          } else {
                            setDeskPhoneError(null);
                          }
                        }
                      }}
                      className={`w-full px-3 py-2 rounded-xl border transition-colors ${
                        deskPhoneError ? "border-rose-300 bg-rose-50/20 focus:ring-rose-500" : "border-slate-200 focus:ring-2 focus:ring-[#0B3D91]"
                      } focus:outline-none`}
                    />
                    {deskPhoneError && (
                      <p className="text-[11px] text-rose-600 mt-1 font-medium">{deskPhoneError}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Department *
                    </label>
                    <select
                      value={deskDept}
                      onChange={(e) => setDeskDept(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-[#0B3D91] focus:outline-none"
                    >
                      {departments.map((d) => (
                        <option key={d.slug} value={d.slug}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Doctor / Specialist *
                    </label>
                    <select
                      value={deskDoctor}
                      onChange={(e) => setDeskDoctor(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-[#0B3D91] focus:outline-none"
                    >
                      {deskFilteredDoctors.map((doc) => (
                        <option key={doc.slug} value={doc.slug}>
                          {doc.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Appointment Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={deskDate}
                      onChange={(e) => setDeskDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-[#0B3D91] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Shift / Time Slot *
                    </label>
                    <select
                      value={deskTimeSlot}
                      onChange={(e) => setDeskTimeSlot(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-[#0B3D91] focus:outline-none"
                    >
                      <option value="Morning Shift (9:00 AM – 1:00 PM)">Morning Shift (9:00 AM – 1:00 PM)</option>
                      <option value="Evening Shift (4:00 PM – 8:00 PM)">Evening Shift (4:00 PM – 8:00 PM)</option>
                      <option value="Night / Emergency Slot">Night / Emergency Slot</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Gender
                    </label>
                    <select
                      value={deskGender}
                      onChange={(e) => setDeskGender(e.target.value as "Male" | "Female" | "Child")}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-[#0B3D91] focus:outline-none"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Child">Child</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Age (years)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 35"
                      value={deskAge}
                      onChange={(e) => setDeskAge(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0B3D91] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Initial Status
                    </label>
                    <select
                      value={deskStatus}
                      onChange={(e) => setDeskStatus(e.target.value as AppointmentStatus)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-[#0B3D91] focus:outline-none"
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Symptoms / Reason (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Fever, blood pressure checkup, follow-up"
                    value={deskSymptoms}
                    onChange={(e) => setDeskSymptoms(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0B3D91] focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setBookModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingDesk}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0B3D91] hover:bg-[#082a66] text-white flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    {submittingDesk && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                    <span>Confirm &amp; Issue Token</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* AUTO-RETENTION & DATABASE CLEANUP MODAL (ADMIN ONLY) */}
      {role === "admin" && (
        <RetentionSettingsModal
          isOpen={retentionModalOpen}
          onClose={() => setRetentionModalOpen(false)}
          onCleanupComplete={handleRefresh}
        />
      )}

      {/* MODERN DELETE CONFIRMATION MODAL */}
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        onClose={() => {
          if (!deletingId) setDeleteTarget(null);
        }}
        onConfirm={handleConfirmDeleteAppointment}
        itemName={deleteTarget ? `Appointment #${deleteTarget.token} (${deleteTarget.patient_name})` : undefined}
        loading={!!deletingId}
      />
    </div>
  );
}
