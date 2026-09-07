"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  Clock3,
  MessageSquare,
  ArrowRight,
  Stethoscope,
  CheckCircle2,
  RefreshCw
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { createClient } from "@/lib/supabase/client";
import { Appointment, ContactMessage, StaffProfile } from "@/types/database";

export default function StaffDashboardPage() {
  const [currentProfile, setCurrentProfile] = useState<StaffProfile | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const todayStr = new Date().toISOString().split("T")[0];

  useEffect(() => {
    async function loadData() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: prof } = await supabase
            .from("staff_profiles")
            .select("*")
            .eq("id", user.id)
            .single();
          if (prof) setCurrentProfile(prof as StaffProfile);
        }

        const { data: apps } = await supabase
          .from("appointments")
          .select("*")
          .order("created_at", { ascending: false });

        if (apps) setAppointments(apps as Appointment[]);

        const { data: msgs } = await supabase
          .from("contact_messages")
          .select("*")
          .order("created_at", { ascending: false });

        if (msgs) setMessages(msgs as ContactMessage[]);
      } catch (err) {
        console.error("Staff dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const todayAppointments = appointments.filter((a) => a.date === todayStr);
  const pendingAppointments = appointments.filter((a) => a.status === "pending");
  const unreadMessages = messages.filter((m) => m.status === "unread");

  return (
    <DashboardLayout
      userRole="staff"
      currentProfile={currentProfile}
      pageTitle="Staff Consultation Desk"
    >
      <div className="space-y-8">
        {/* WELCOME BANNER */}
        <div className="bg-gradient-to-r from-teal-800 to-[#0B3D91] rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-200 bg-white/10 px-3 py-1 rounded-full inline-block">
              Hospital Staff Desk
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Welcome, {currentProfile?.full_name || "Staff Member"}
            </h2>
            <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
              Verify incoming patient appointments, coordinate specialist schedules by department, and address website inquiries.
            </p>
          </div>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Today&apos;s Appointments
              </span>
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                <CalendarCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900">
              {todayAppointments.length}
            </div>
            <div className="text-xs text-slate-500">
              Scheduled for today ({todayStr})
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Pending Verification
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock3 className="w-4 h-4 animate-pulse" />
              </div>
            </div>
            <div className="text-3xl font-black text-amber-600">
              {pendingAppointments.length}
            </div>
            <div className="text-xs text-slate-500">
              New patient requests
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Unread Inquiries
              </span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-blue-600">
              {unreadMessages.length}
            </div>
            <div className="text-xs text-slate-500">
              General inquiries submitted
            </div>
          </div>
        </div>

        {/* QUICK LINK ACTION */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-extrabold text-[#0B3D91]">
              Category-wise Patient Roster
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Filter incoming bookings by Cardiology, Pediatrics, Gynecology, or General Physician.
            </p>
          </div>
          <Link
            href="/staff/appointments"
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0B3D91] hover:bg-[#082a66] text-white transition-colors flex items-center gap-1.5 shrink-0"
          >
            <span>Open Appointments Roster</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
