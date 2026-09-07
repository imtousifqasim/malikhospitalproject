"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  HeartPulse,
  LayoutDashboard,
  CalendarCheck,
  MessageSquare,
  Users,
  UserCheck,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Building2,
  ShieldAlert,
  Sparkles,
  Stethoscope,
  KeyRound,
  Clock,
  ArrowRight
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { StaffProfile, StaffRole } from "@/types/database";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: StaffRole;
  currentProfile: StaffProfile | null;
  pageTitle: string;
}

export default function DashboardLayout({
  children,
  userRole,
  currentProfile,
  pageTitle,
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const isAdmin = userRole === "admin";
  const basePath = isAdmin ? "/admin" : "/staff";

  const navigation = [
    {
      name: "Dashboard",
      href: basePath,
      icon: LayoutDashboard,
      exact: true,
    },
    {
      name: "Appointments",
      href: `${basePath}/appointments`,
      icon: CalendarCheck,
      badge: "Live",
    },
    {
      name: "Messages",
      href: `${basePath}/messages`,
      icon: MessageSquare,
    },
    ...(isAdmin
      ? [
          {
            name: "Staff Management",
            href: "/admin/staff",
            icon: Users,
            badge: "Admin",
          },
        ]
      : []),
    {
      name: "My Profile",
      href: `${basePath}/profile`,
      icon: UserCheck,
    },
  ];

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Sign out error:", err);
    } finally {
      router.push(isAdmin ? "/admin/login" : "/staff/login");
      router.refresh();
    }
  };

  const isCurrentActive = (itemHref: string, exact?: boolean) => {
    if (exact) {
      return pathname === itemHref;
    }
    return pathname.startsWith(itemHref);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* MOBILE TOP BAR */}
      <header className="lg:hidden bg-[#0B3D91] text-white px-4 py-3 flex items-center justify-between shadow-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0B3D91] to-[#14B8A6] border border-white/20 flex items-center justify-center text-white shadow-md shrink-0">
            <HeartPulse className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-sm tracking-tight block">
              Malik Medical Complex
            </span>
            <span className="text-[10px] text-teal-300 font-semibold uppercase tracking-wider">
              {isAdmin ? "Executive CEO Portal" : "Hospital Staff Portal"}
            </span>
          </div>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* MOBILE DRAWER BACKDROP */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* SIDEBAR (DESKTOP + MOBILE SLIDE-OUT) */}
      <aside
        className={`fixed lg:sticky top-0 bottom-0 left-0 z-50 w-72 bg-[#0B3D91] text-white flex flex-col transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } shadow-xl lg:shadow-none h-screen`}
      >
        {/* Sidebar Brand Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0B3D91] to-[#14B8A6] border border-white/20 flex items-center justify-center text-white shadow-md shadow-blue-950/30 shrink-0">
              <HeartPulse className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-black text-base tracking-tight text-white leading-tight block">
                Malik Hospital
              </span>
              <span className="text-xs text-teal-300 font-semibold flex items-center gap-1 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse inline-block" />
                {isAdmin ? "CEO / Executive" : "Medical Staff"}
              </span>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden text-white/70 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card in Sidebar */}
        <div className="p-4 mx-3 my-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center font-bold text-white shadow-inner uppercase text-sm shrink-0">
            {currentProfile?.full_name?.charAt(0) || (isAdmin ? "C" : "S")}
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-bold text-xs sm:text-sm text-white leading-snug break-words">
              {currentProfile?.full_name || (isAdmin ? "CEO / Executive Administrator" : "Hospital Staff")}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  isAdmin
                    ? "bg-amber-400 text-slate-900"
                    : "bg-teal-500/30 text-teal-200 border border-teal-400/40"
                }`}
              >
                {isAdmin ? "CEO / Owner" : "Staff Member"}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-2">
            Main Management
          </div>
          {navigation.map((item) => {
            const active = isCurrentActive(item.href, item.exact);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                  active
                    ? "bg-teal-500 text-white shadow-sm font-semibold translate-x-1"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${active ? "text-white" : "text-slate-400"}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase ${
                      active
                        ? "bg-white/20 text-white"
                        : "bg-white/10 text-teal-300"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-white/10">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-2">
              Public Portal
            </div>
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <span>View Live Website</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>
        </nav>

        {/* Sidebar Footer / Sign Out */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-red-500/90 text-white font-medium text-sm transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>{signingOut ? "Signing out..." : "Sign Out"}</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOP BAR */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B3D91] tracking-tight">
              {pageTitle}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Malik Medical Complex &bull; Hujra Shah Muqeem Portal
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Public Link */}
            <Link
              href="/appointment"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#0B3D91] bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
              <span>Public Booking</span>
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full hover:bg-slate-100 transition-colors border border-slate-200 cursor-pointer"
                aria-label="User profile menu"
              >
                <div className="w-8 h-8 rounded-full bg-[#0B3D91] text-white flex items-center justify-center font-bold text-xs">
                  {currentProfile?.full_name?.charAt(0) || (isAdmin ? "C" : "S")}
                </div>
                <div className="text-left hidden md:block max-w-[220px]">
                  <div className="text-xs font-bold text-slate-800 leading-tight break-words">
                    {currentProfile?.full_name || (isAdmin ? "CEO / Executive Administrator" : "Staff")}
                  </div>
                  <div className="text-[10px] text-teal-700 font-semibold uppercase">
                    {isAdmin ? "Owner" : "Staff"}
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </button>

              {profileDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in-50 zoom-in-95"
                  onMouseLeave={() => setProfileDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-800 break-words leading-snug">
                      {currentProfile?.full_name || (isAdmin ? "CEO / Executive Administrator" : "Staff")}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">
                      {currentProfile?.phone || "Hospital Personnel"}
                    </p>
                  </div>

                  <Link
                    href={`${basePath}/profile`}
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <UserCheck className="w-4 h-4 text-slate-400" />
                    <span>My Profile & Security</span>
                  </Link>

                  {isAdmin && (
                    <Link
                      href="/admin/staff"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      <Users className="w-4 h-4 text-slate-400" />
                      <span>Manage Staff Accounts</span>
                    </Link>
                  )}

                  <div className="border-t border-slate-100 my-1" />

                  <button
                    onClick={handleSignOut}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* MAIN BODY CONTAINER */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
