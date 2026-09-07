"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MessagesManager from "@/components/dashboard/MessagesManager";
import { createClient } from "@/lib/supabase/client";
import { ContactMessage, StaffProfile } from "@/types/database";

export default function StaffMessagesPage() {
  const [currentProfile, setCurrentProfile] = useState<StaffProfile | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
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

        const { data: msgs } = await supabase
          .from("contact_messages")
          .select("*")
          .order("created_at", { ascending: false });

        if (msgs) setMessages(msgs as ContactMessage[]);
      } catch (err) {
        console.error("Fetch messages error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <DashboardLayout
      userRole="staff"
      currentProfile={currentProfile}
      pageTitle="Website Inquiries & Messages"
    >
      <MessagesManager
        initialMessages={messages}
        role="staff"
        canDelete={currentProfile?.can_delete ?? false}
      />
    </DashboardLayout>
  );
}
