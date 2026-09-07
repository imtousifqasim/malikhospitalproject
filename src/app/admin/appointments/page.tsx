"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AppointmentsManager from "@/components/dashboard/AppointmentsManager";
import { createClient } from "@/lib/supabase/client";
import { Appointment, StaffProfile } from "@/types/database";

export default function AdminAppointmentsPage() {
  const [currentProfile, setCurrentProfile] = useState<StaffProfile | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
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
      } catch (err) {
        console.error("Fetch appointments error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <DashboardLayout
      userRole="admin"
      currentProfile={currentProfile}
      pageTitle="Appointments Management"
    >
      <AppointmentsManager
        initialAppointments={appointments}
        role="admin"
        canDelete={true}
        currentProfile={currentProfile}
      />
    </DashboardLayout>
  );
}
