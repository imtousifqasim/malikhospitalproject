"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  Clock3,
  MessageSquare,
  Users,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Stethoscope,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  RefreshCw
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { createClient } from "@/lib/supabase/client";
import { Appointment, ContactMessage, StaffProfile } from "@/types/database";

export default function AdminDashboardPage() {
  const [currentProfile, setCurrentProfile] = useState<StaffProfile | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [staffCount, setStaffCount] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  const todayStr = new Date().toISOString().split("T")[0];

  const loadDashboardData = async () => {
    try {
      const supabase = createClient();

      // 1. Current user profile
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: prof } = await supabase
          .from("staff_profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        if (prof) setCurrentProfile(prof as StaffProfile);
      }

      // 2. Appointments
      const { data: apps } = await supabase
        .from("appointments")
        .select("*")
        .order("created_at", { ascending: false });

      if (apps) setAppointments(apps as Appointment[]);

      // 3. Contact messages
      const { data: msgs } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (msgs) setMessages(msgs as ContactMessage[]);

      // 4. Staff Count
      const { count } = await supabase
        .from("staff_profiles")
        .select("*", { count: "exact", head: true });

      if (count !== null) setStaffCount(count);
    } catch (err) {
      console.error("Admin dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Compute Metrics
  const todayAppointments = appointments.filter((a) => a.date === todayStr);
  const pendingAppointments = appointments.filter((a) => a.status === "pending");
  const unreadMessages = messages.filter((m) => m.status === "unread");

  return (
    <DashboardLayout
      userRole="admin"
      currentProfile={currentProfile}
      pageTitle="Executive Overview"
    >
      <div className="space-y-8">
        {/* WELCOME BANNER */}
        <div className="bg-gradient-to-r from-[#0B3D91] to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-teal-500/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-300 bg-white/10 px-3 py-1 rounded-full inline-block">
              CEO & Executive Command
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Welcome back, {currentProfile?.full_name || "Executive Admin"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Real-time monitor for patient appointment bookings, general inquiries, and medical staff oversight at Malik Medical Complex.
            </p>
          </div>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Today's Appointments */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Today&apos;s Consultations
              </span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0B3D91] flex items-center justify-center">
                <CalendarCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900">
              {todayAppointments.length}
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-1">
              <span className="font-semibold text-slate-800">{appointments.length}</span> total bookings recorded
            </div>
          </div>

          {/* Card 2: Pending Approval */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Pending Approval
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock3 className="w-4 h-4 animate-pulse" />
              </div>
            </div>
            <div className="text-3xl font-black text-amber-600">
              {pendingAppointments.length}
            </div>
            <div className="text-xs text-slate-500">
              Awaiting confirmation
            </div>
          </div>

          {/* Card 3: Unread Messages */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Unread Inquiries
              </span>
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-teal-600">
              {unreadMessages.length}
            </div>
            <div className="text-xs text-slate-500">
              Website contact submissions
            </div>
          </div>

          {/* Card 4: Active Staff Members */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Staff Accounts
              </span>
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-purple-700">
              {staffCount}
            </div>
            <Link
              href="/admin/staff"
              className="text-xs text-[#0B3D91] hover:underline font-bold inline-flex items-center gap-1"
            >
              <span>Manage Staff Accounts</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* RECENT ACTIVITY SPLIT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Appointments */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-[#0B3D91]">
                  Recent Patient Bookings
                </h3>
                <p className="text-xs text-slate-500">Latest online submissions</p>
              </div>
              <Link
                href="/admin/appointments"
                className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1"
              >
                <span>Category Filter View</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {appointments.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                No appointment submissions yet.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {appointments.slice(0, 5).map((app) => (
                  <div key={app.id} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-900 text-sm">
                        {app.patient_name}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="font-mono font-bold text-teal-700">{app.token}</span>
                        <span>&bull;</span>
                        <span>{app.department || "General OPD"}</span>
                        <span>&bull;</span>
                        <span>{app.date}</span>
                      </div>
                    </div>
                    <div>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase ${
                          app.status === "confirmed"
                            ? "bg-teal-50 text-teal-700"
                            : app.status === "completed"
                            ? "bg-blue-50 text-blue-700"
                            : app.status === "cancelled"
                            ? "bg-rose-50 text-rose-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Inquiries */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-[#0B3D91]">
                  Recent Messages
                </h3>
                <p className="text-xs text-slate-500">Contact form inquiries</p>
              </div>
              <Link
                href="/admin/messages"
                className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {messages.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                No contact inquiries submitted yet.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {messages.slice(0, 5).map((msg) => (
                  <div key={msg.id} className="py-3 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{msg.name}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          msg.status === "unread"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {msg.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-1">
                      {msg.subject ? `${msg.subject}: ` : ""}{msg.message}
                    </p>
                    <div className="text-[10px] text-slate-400">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
