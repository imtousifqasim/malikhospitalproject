"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppChatWidget from "@/components/WhatsAppChatWidget";
import MobileStickyBottomBar from "@/components/MobileStickyBottomBar";
import BackToTop from "@/components/BackToTop";

export default function ConditionalPublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Check if current route is part of Admin, Staff, or Auth portals
  const isPortalRoute =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/staff") ||
    pathname.startsWith("/auth");

  if (isPortalRoute) {
    // For admin, staff, and auth pages: render ONLY the portal UI without public marketing header/footer
    return <main className="flex-1 w-full min-h-screen">{children}</main>;
  }

  // Public marketing website layout
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppChatWidget />
      <BackToTop />
      <MobileStickyBottomBar />
    </>
  );
}
