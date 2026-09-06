"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Calendar,
  MessageCircle,
  Phone,
  Clock,
  ShieldCheck,
  Award,
  Sparkles,
  Stethoscope,
  Baby,
  Bone,
  HeartPulse,
  Activity,
  ScanLine,
  Microscope,
  Tag,
  FileText,
  HelpCircle,
  Image as ImageIcon,
  Star,
  ArrowRight,
  Briefcase,
  Eye
} from "lucide-react";
import { hospitalInfo } from "@/data/hospital";

// Submenu: Specialties & Doctors (All 9 real departments from departments.ts)
const departmentsMenu = {
  name: "Specialties & Doctors",
  featuredDepts: [
    {
      name: "Pediatrics & Child Care",
      subtitle: "Dr. Muneeb Babar (FCPS, Children Hospital)",
      href: "/departments/pediatrics",
      icon: Baby
    },
    {
      name: "Orthopedics & Spine Surgery",
      subtitle: "Prof. Dr. Abdul Qayyum (USA-Trained)",
      href: "/departments/orthopedic-spine",
      icon: Bone
    },
    {
      name: "Gynecology & Obstetrics",
      subtitle: "Dr. Pari Iman Gul (24/7 Normal & C-Section)",
      href: "/departments/gynecology-obstetrics",
      icon: HeartPulse
    },
    {
      name: "Cardiology & Heart Care",
      subtitle: "Dr. Aftab Anwar (2D Echo & ECG)",
      href: "/departments/cardiology",
      icon: Activity
    },
    {
      name: "Gastroenterology & Liver",
      subtitle: "Prof. Dr. Faisal Rasheed (Stomach/Liver)",
      href: "/departments/gastroenterology-liver",
      icon: Stethoscope
    },
    {
      name: "General Medicine & OPD",
      subtitle: "Dr. Faraz Aslam (Fee: Only Rs. 550)",
      href: "/departments/general-medicine",
      icon: ShieldCheck
    },
    {
      name: "Dermatology & Aesthetics",
      subtitle: "Dr. Ayesha & Dr. Iqra (Laser & Skin)",
      href: "/departments/dermatology-aesthetics",
      icon: Sparkles
    },
    {
      name: "Eye Care & Ophthalmology",
      subtitle: "Dr. Numan Ahmed (Laser Cataract)",
      href: "/departments/eye-care-ophthalmology",
      icon: Eye
    }
  ],
  quickLinks: [
    {
      name: "Browse All 12 Specialists",
      desc: "Full profiles, degrees & PMDC verification",
      href: "/doctors",
      icon: Award
    },
    {
      name: "OPD Consultation Schedule",
      desc: "Morning & evening specialist clinic hours",
      href: "/doctors#schedule",
      icon: Clock
    },
    {
      name: "Doctor Consultation Fees",
      desc: "Affordable checkup rates starting from Rs. 550",
      href: "/pricing",
      icon: Tag
    },
    {
      name: "Patient Ratings & Reviews",
      desc: "Verified experiences & patient feedback",
      href: "/reviews",
      icon: Star
    }
  ]
};

// Submenu: Services & Diagnostics (Mapped to anchors on /services)
const servicesMenu = {
  name: "Services & Facilities",
  diagnostics: [
    {
      name: "Digital High-Frequency X-Ray",
      desc: "24/7 instantaneous bone & chest imaging",
      href: "/services#digital-x-ray",
      icon: ScanLine
    },
    {
      name: "2D Color Doppler & Echo",
      desc: "Heart valve, vascular & cardiac assessment",
      href: "/services#ecg-echocardiography",
      icon: HeartPulse
    },
    {
      name: "Automated Pathology Lab",
      desc: "CBC, Liver, Kidney, Hormones & Urine tests",
      href: "/services#modern-laboratory",
      icon: Microscope
    },
    {
      name: "Ultrasound & TVS Scans",
      desc: "Pelvic, abdominal & pregnancy anomaly scans",
      href: "/services#color-doppler-ultrasound",
      icon: Activity
    }
  ],
  clinicalCare: [
    {
      name: "24/7 Emergency & Trauma Room",
      desc: "Oxygen, vital monitors, suturing & bone plaster",
      href: "/services#bone-plaster-and-orthopedic-surgery",
      icon: ShieldCheck
    },
    {
      name: "Sterile Labor Suites & Nursery",
      desc: "Normal delivery, C-Section & incubators",
      href: "/services#childrens-nursery-neonatal-care",
      icon: Baby
    },
    {
      name: "Aesthetic & Laser Skin Center",
      desc: "HydraFacial, PRP, Pigmentation & Laser Hair",
      href: "/services#aesthetic-and-skin-center",
      icon: Sparkles
    },
    {
      name: "Endoscopy & Minor Surgery",
      desc: "Diagnostic Endoscopy, Colonoscopy & Day OT",
      href: "/services#endoscopy-colonoscopy-ercp",
      icon: Stethoscope
    }
  ]
};

// Submenu: Patient Care & Resources (Only 100% existing real pages)
const patientCareMenu = {
  name: "Patient Care",
  items: [
    {
      name: "Transparent Pricing & Fees",
      desc: "Itemized price list for OPD, labs & delivery",
      href: "/pricing",
      icon: Tag,
      badge: "Rs. 550 OPD"
    },
    {
      name: "Insurance & Sehat Card Info",
      desc: "Accepted panels, claim steps & eligibility",
      href: "/insurance",
      icon: ShieldCheck,
      badge: "Panels"
    },
    {
      name: "Verified Patient Reviews",
      desc: "Real patient recovery stories & ratings",
      href: "/reviews",
      icon: Star,
      badge: "4.9 ★"
    },
    {
      name: "Facility Photo Gallery & Tour",
      desc: "Emergency bay, rooms, lab & OT equipment",
      href: "/gallery",
      icon: ImageIcon,
      badge: "10+ Photos"
    },
    {
      name: "Patient FAQs & Visiting Hours",
      desc: "Discharge guidelines, attendant rules & help",
      href: "/faqs",
      icon: HelpCircle
    },
    {
      name: "Health Tips & Medical Guides",
      desc: "Doctor-written prevention & wellness articles",
      href: "/health-tips",
      icon: FileText
    },
    {
      name: "Careers & Clinical Opportunities",
      desc: "Join our doctor, nursing & lab technologist team",
      href: "/careers",
      icon: Briefcase,
      badge: "Hiring"
    }
  ]
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Lock background body scroll when mobile menu drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleMouseEnter = (name: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const cleanPhone = hospitalInfo.whatsapp.replace("+", "");
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(hospitalInfo.whatsappMessage)}`;

  // Shared active/hover underline indicator class
  const isNavActive = (href: string) => pathname === href;
  const isParentActive = (prefix: string) => pathname.startsWith(prefix);

  return (
    <div className="sticky top-0 z-50">
      {/* ─────────────────────────────────────────────────────────────
          TIER 1: TOP UTILITY STRIP (Responsive with Emergency Color)
          ───────────────────────────────────────────────────────────── */}
      <div className="bg-[#061838] text-slate-200 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
        <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto flex items-center justify-between gap-2">
          {/* Left: Emergency Status & Location */}
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="flex items-center gap-1.5 text-rose-300 font-bold">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
              <span>24/7 Emergency & Ambulance</span>
            </span>
            <span className="text-slate-500 hidden md:inline">•</span>
            <span className="text-slate-300 hidden md:inline truncate max-w-[280px] font-medium">
              Malik Hospital Chowk, Hujra Shah Muqeem
            </span>
          </div>

          {/* Right: Emergency Helpline */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm shrink-0">
            <a
              href="tel:0300-6972295"
              className="flex items-center gap-1.5 text-red-300 hover:text-white bg-red-900/60 hover:bg-red-800/80 px-2.5 py-0.5 rounded-full border border-red-500/50 transition-colors font-bold"
            >
              <Phone className="w-3.5 h-3.5 text-red-300 shrink-0" />
              <span>0300-6972295</span>
            </a>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          TIER 2: MAIN NAVBAR (Sticky Header)
          ───────────────────────────────────────────────────────────── */}
      <header
        className={`bg-white transition-all duration-200 border-b border-slate-200/90 ${
          isScrolled ? "shadow-md py-2.5" : "py-3.5"
        }`}
      >
        <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 lg:gap-6 xl:gap-8 2xl:gap-10">
            {/* 1. Brand Logo & Identity */}
            <Link
              href="/"
              className="flex items-center gap-2.5 sm:gap-3 shrink min-w-0 mr-1 sm:mr-2 lg:mr-3 xl:mr-4 group focus:outline-none"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#0B3D91] to-[#14B8A6] flex items-center justify-center text-white shadow-md shadow-blue-900/10 group-hover:scale-105 transition-transform duration-200 shrink-0">
                <HeartPulse className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="shrink min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-black text-base xs:text-lg sm:text-xl tracking-tight text-[#0B3D91] truncate max-w-[200px] xs:max-w-[260px] sm:max-w-none">
                    Malik Medical Complex
                  </span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
                  <span className="text-xs font-bold tracking-wider text-teal-700 uppercase whitespace-nowrap">
                    Hujra Shah Muqeem
                  </span>
                  <span className="text-slate-300 text-xs hidden sm:inline">•</span>
                  <span className="text-xs sm:text-sm text-slate-500 hidden sm:inline font-semibold whitespace-nowrap">
                    24/7 Emergency Care
                  </span>
                </div>
              </div>
            </Link>

            {/* 2. Desktop Navigation Center */}
            <nav className="hidden xl:flex items-center justify-center gap-1 xl:gap-1.5 2xl:gap-3 shrink min-w-0">
              {/* Home */}
              <Link
                href="/"
                className={`text-[13px] 2xl:text-sm font-medium transition-colors py-2 relative group whitespace-nowrap ${
                  isNavActive("/") ? "text-[#0B3D91] font-semibold" : "text-slate-600 hover:text-[#0B3D91]"
                }`}
              >
                <span>Home</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#14B8A6] transition-transform origin-left duration-200 ${
                    isNavActive("/") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>

              {/* Specialties & Doctors Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("specialties")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`text-[13px] 2xl:text-sm font-medium transition-colors py-2 flex items-center gap-1 relative group cursor-pointer whitespace-nowrap ${
                    activeDropdown === "specialties" ||
                    isParentActive("/departments") ||
                    isParentActive("/doctors")
                      ? "text-[#0B3D91] font-semibold"
                      : "text-slate-600 hover:text-[#0B3D91]"
                  }`}
                >
                  <span>Specialties &amp; Doctors</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === "specialties" ? "rotate-180 text-[#0B3D91]" : "text-slate-500"
                    }`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#14B8A6] transition-transform origin-left duration-200 ${
                      isParentActive("/departments") || isParentActive("/doctors")
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {activeDropdown === "specialties" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[680px] bg-white rounded-2xl border border-slate-200 shadow-xl p-6 grid grid-cols-12 gap-6 z-50 text-left"
                    >
                      {/* Left: Clinical Specialties */}
                      <div className="col-span-7 space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B3D91] flex items-center gap-1.5">
                            <Stethoscope className="w-3.5 h-3.5 text-[#14B8A6]" />
                            Clinical Departments
                          </span>
                          <Link
                            href="/departments"
                            className="text-[11px] font-semibold text-teal-700 hover:underline flex items-center gap-1"
                          >
                            <span>All 9 Depts</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>

                        <div className="grid grid-cols-1 gap-1">
                          {departmentsMenu.featuredDepts.map((dept, i) => {
                            const Icon = dept.icon;
                            return (
                              <Link
                                key={i}
                                href={dept.href}
                                className="group flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors"
                              >
                                <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-[#0B3D91] text-slate-700 group-hover:text-white flex items-center justify-center shrink-0 transition-colors mt-0.5">
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <span className="font-semibold text-xs text-slate-800 group-hover:text-[#0B3D91] transition-colors block truncate">
                                    {dept.name}
                                  </span>
                                  <span className="text-[11px] text-slate-600 block truncate font-medium">
                                    {dept.subtitle}
                                  </span>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right: Faculty Directory */}
                      <div className="col-span-5 bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col justify-between space-y-4">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-2.5">
                            Doctor Directory
                          </span>

                          <div className="space-y-1.5">
                            {departmentsMenu.quickLinks.map((ql, i) => {
                              const QIcon = ql.icon;
                              return (
                                <Link
                                  key={i}
                                  href={ql.href}
                                  className="group flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-white transition-colors"
                                >
                                  <div className="w-6 h-6 rounded-md bg-teal-50 text-teal-700 group-hover:bg-teal-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                                    <QIcon className="w-3.5 h-3.5" />
                                  </div>
                                  <div className="min-w-0">
                                    <span className="text-xs font-semibold text-slate-800 group-hover:text-[#0B3D91] transition-colors block leading-tight">
                                      {ql.name}
                                    </span>
                                    <span className="text-[10px] text-slate-600 block truncate font-medium">
                                      {ql.desc}
                                    </span>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>

                        <div className="bg-[#0B3D91] text-white p-3 rounded-lg space-y-1">
                          <span className="text-[10px] font-semibold text-teal-300 uppercase block">
                            Daily Walk-in OPD
                          </span>
                          <p className="text-[11px] text-blue-100 leading-snug">
                            General medicine consultation token fee is only Rs. 550. Fast checkup on arrival.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Services & Facilities Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("services")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`text-[13px] 2xl:text-sm font-medium transition-colors py-2 flex items-center gap-1 relative group cursor-pointer whitespace-nowrap ${
                    activeDropdown === "services" || isParentActive("/services")
                      ? "text-[#0B3D91] font-semibold"
                      : "text-slate-600 hover:text-[#0B3D91]"
                  }`}
                >
                  <span>Services &amp; Facilities</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === "services" ? "rotate-180 text-[#0B3D91]" : "text-slate-500"
                    }`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#14B8A6] transition-transform origin-left duration-200 ${
                      isParentActive("/services") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {activeDropdown === "services" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[640px] bg-white rounded-2xl border border-slate-200 shadow-xl p-6 grid grid-cols-2 gap-6 z-50 text-left"
                    >
                      {/* Diagnostics */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B3D91] flex items-center gap-1.5">
                            <ScanLine className="w-3.5 h-3.5 text-[#14B8A6]" />
                            Diagnostics (24/7)
                          </span>
                          <Link
                            href="/services"
                            className="text-[11px] font-semibold text-teal-700 hover:underline flex items-center gap-1"
                          >
                            <span>Explore</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>

                        <div className="space-y-1">
                          {servicesMenu.diagnostics.map((diag, i) => {
                            const DIcon = diag.icon;
                            return (
                              <Link
                                key={i}
                                href={diag.href}
                                className="group flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors"
                              >
                                <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-[#0B3D91] text-slate-700 group-hover:text-white flex items-center justify-center shrink-0 transition-colors mt-0.5">
                                  <DIcon className="w-4 h-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <span className="font-semibold text-xs text-slate-800 group-hover:text-[#0B3D91] transition-colors block">
                                    {diag.name}
                                  </span>
                                  <span className="text-[11px] text-slate-600 block truncate font-medium">
                                    {diag.desc}
                                  </span>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      {/* Clinical Care */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B3D91] flex items-center gap-1.5">
                            <Activity className="w-3.5 h-3.5 text-[#14B8A6]" />
                            Clinical Facilities
                          </span>
                          <Link
                            href="/pricing"
                            className="text-[11px] font-semibold text-teal-700 hover:underline flex items-center gap-1"
                          >
                            <span>Pricing</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>

                        <div className="space-y-1">
                          {servicesMenu.clinicalCare.map((care, i) => {
                            const CIcon = care.icon;
                            return (
                              <Link
                                key={i}
                                href={care.href}
                                className="group flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors"
                              >
                                <div className="w-8 h-8 rounded-lg bg-teal-50 group-hover:bg-teal-600 text-teal-700 group-hover:text-white flex items-center justify-center shrink-0 transition-colors mt-0.5">
                                  <CIcon className="w-4 h-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <span className="font-semibold text-xs text-slate-800 group-hover:text-[#0B3D91] transition-colors block">
                                    {care.name}
                                  </span>
                                  <span className="text-[11px] text-slate-600 block truncate font-medium">
                                    {care.desc}
                                  </span>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Patient Care Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("patientCare")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`text-[13px] 2xl:text-sm font-medium transition-colors py-2 flex items-center gap-1 relative group cursor-pointer whitespace-nowrap ${
                    activeDropdown === "patientCare" ||
                    isParentActive("/pricing") ||
                    isParentActive("/insurance") ||
                    isParentActive("/gallery") ||
                    isParentActive("/faqs") ||
                    isParentActive("/health-tips") ||
                    isParentActive("/reviews") ||
                    isParentActive("/careers")
                      ? "text-[#0B3D91] font-semibold"
                      : "text-slate-600 hover:text-[#0B3D91]"
                  }`}
                >
                  <span>Patient Care</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === "patientCare" ? "rotate-180 text-[#0B3D91]" : "text-slate-500"
                    }`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#14B8A6] transition-transform origin-left duration-200 ${
                      isParentActive("/pricing") ||
                      isParentActive("/insurance") ||
                      isParentActive("/gallery") ||
                      isParentActive("/faqs") ||
                      isParentActive("/health-tips") ||
                      isParentActive("/reviews") ||
                      isParentActive("/careers")
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {activeDropdown === "patientCare" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-84 bg-white rounded-2xl border border-slate-200 shadow-xl p-3.5 space-y-1 z-50 text-left"
                    >
                      <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-700 border-b border-slate-100 mb-1">
                        Patient Resources
                      </div>

                      {patientCareMenu.items.map((item, i) => {
                        const PIcon = item.icon;
                        return (
                          <Link
                            key={i}
                            href={item.href}
                            className="group flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-[#0B3D91] text-slate-700 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                                <PIcon className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <span className="font-semibold text-xs text-slate-800 group-hover:text-[#0B3D91] transition-colors block">
                                  {item.name}
                                </span>
                                <span className="text-[11px] text-slate-600 block line-clamp-1 font-medium">
                                  {item.desc}
                                </span>
                              </div>
                            </div>

                            {item.badge && (
                              <span className="text-[9px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200/60 shrink-0">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* About */}
              <Link
                href="/about"
                className={`text-[13px] 2xl:text-sm font-medium transition-colors py-2 relative group whitespace-nowrap ${
                  isNavActive("/about") ? "text-[#0B3D91] font-semibold" : "text-slate-600 hover:text-[#0B3D91]"
                }`}
              >
                <span>About</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#14B8A6] transition-transform origin-left duration-200 ${
                    isNavActive("/about") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>

              {/* Contact */}
              <Link
                href="/contact"
                className={`text-[13px] 2xl:text-sm font-medium transition-colors py-2 relative group whitespace-nowrap ${
                  isNavActive("/contact") ? "text-[#0B3D91] font-semibold" : "text-slate-600 hover:text-[#0B3D91]"
                }`}
              >
                <span>Contact</span>
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#14B8A6] transition-transform origin-left duration-200 ${
                    isNavActive("/contact") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            </nav>

            {/* 3. RIGHT: Action Items */}
            <div className="hidden xl:flex items-center gap-2.5 2xl:gap-3 shrink-0">
              {/* WhatsApp */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-emerald-500/40 hover:border-emerald-500 text-emerald-600 hover:bg-emerald-50/70 font-semibold text-xs transition-colors whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-500/15 text-emerald-600" />
                <span>WhatsApp</span>
              </a>

              {/* Book Appointment */}
              <Link
                href="/appointment"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0B3D91] hover:bg-[#072254] text-white font-semibold text-xs shadow-xs hover:shadow-md transition-all active:scale-[0.98] whitespace-nowrap shrink-0"
              >
                <Calendar className="w-3.5 h-3.5 text-teal-300" />
                <span>Book Appointment</span>
              </Link>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="flex items-center xl:hidden shrink-0">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-slate-700 hover:bg-slate-100 active:scale-95 focus:outline-none transition-all cursor-pointer relative z-50"
                aria-label="Toggle navigation menu"
                aria-expanded={isOpen}
                aria-controls="mobile-nav-drawer"
              >
                {isOpen ? <X className="w-6 h-6 text-red-600" /> : <Menu className="w-6 h-6 text-slate-800" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation (Rendered ONLY when isOpen is true) */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[90] xl:hidden animate-backdrop-in cursor-pointer"
            aria-hidden="true"
          />

          {/* Slide-in Drawer */}
          <div
            id="mobile-nav-drawer"
            className="fixed inset-y-0 right-0 w-[88%] max-w-sm bg-white z-[100] flex flex-col shadow-2xl xl:hidden border-l border-slate-200 animate-drawer-in h-[100dvh] max-h-[100dvh] overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {/* Mobile Drawer Header (Pinned Top) */}
            <div className="shrink-0 px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#0B3D91] flex items-center justify-center text-white shadow-xs">
                  <HeartPulse className="w-4 h-4 text-[#14B8A6]" />
                </div>
                <div>
                  <span className="font-extrabold text-sm text-[#0B3D91] block leading-tight">
                    Malik Medical Complex
                  </span>
                  <span className="text-[10px] text-teal-700 font-semibold block">
                    24/7 Multi-Specialty Hospital
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Nav Area */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-3">
              {/* Nav Links List */}
              <nav className="flex flex-col gap-1.5 text-sm">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className={`px-3.5 py-2.5 rounded-xl font-medium transition-colors ${
                    pathname === "/" ? "bg-[#0B3D91] text-white font-semibold" : "text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  Home
                </Link>

            {/* Mobile Accordion: Specialties */}
            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <button
                type="button"
                onClick={() =>
                  setMobileExpandedSection(
                    mobileExpandedSection === "specialties" ? null : "specialties"
                  )
                }
                className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-sm flex items-center justify-between cursor-pointer"
              >
                <span>Specialties &amp; Doctors</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-600 transition-transform ${
                    mobileExpandedSection === "specialties" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileExpandedSection === "specialties" && (
                <div className="p-3 bg-white space-y-1.5 text-sm">
                  <Link
                    href="/doctors"
                    onClick={() => setIsOpen(false)}
                    className="block p-2 rounded-lg font-bold text-[#0B3D91] hover:bg-blue-50"
                  >
                    → All 12 Specialist Doctors
                  </Link>
                  <Link
                    href="/departments"
                    onClick={() => setIsOpen(false)}
                    className="block p-2 rounded-lg font-bold text-teal-700 hover:bg-teal-50"
                  >
                    → All 9 Clinical Departments
                  </Link>
                  {departmentsMenu.featuredDepts.map((d, i) => (
                    <Link
                      key={i}
                      href={d.href}
                      onClick={() => setIsOpen(false)}
                      className="block p-2 text-slate-700 hover:text-[#0B3D91] font-medium rounded-lg hover:bg-slate-50"
                    >
                      • {d.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Accordion: Services */}
            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <button
                type="button"
                onClick={() =>
                  setMobileExpandedSection(
                    mobileExpandedSection === "services" ? null : "services"
                  )
                }
                className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-sm flex items-center justify-between cursor-pointer"
              >
                <span>Services &amp; Facilities</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-600 transition-transform ${
                    mobileExpandedSection === "services" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileExpandedSection === "services" && (
                <div className="p-3 bg-white space-y-1.5 text-sm">
                  <Link
                    href="/services"
                    onClick={() => setIsOpen(false)}
                    className="block p-2 rounded-lg font-bold text-[#0B3D91] hover:bg-blue-50"
                  >
                    → All Diagnostic Services &amp; Facilities
                  </Link>
                  <Link
                    href="/pricing"
                    onClick={() => setIsOpen(false)}
                    className="block p-2 rounded-lg font-bold text-teal-700 hover:bg-teal-50"
                  >
                    → Diagnostic Pricing Table
                  </Link>
                  <Link
                    href="/services#digital-x-ray"
                    onClick={() => setIsOpen(false)}
                    className="block p-2 text-slate-700 hover:text-[#0B3D91] font-medium rounded-lg hover:bg-slate-50"
                  >
                    • 24/7 Digital X-Ray &amp; Imaging
                  </Link>
                  <Link
                    href="/services#ecg-echocardiography"
                    onClick={() => setIsOpen(false)}
                    className="block p-2 text-slate-700 hover:text-[#0B3D91] font-medium rounded-lg hover:bg-slate-50"
                  >
                    • 2D Echo &amp; ECG Cardiology
                  </Link>
                  <Link
                    href="/services#modern-laboratory"
                    onClick={() => setIsOpen(false)}
                    className="block p-2 text-slate-700 hover:text-[#0B3D91] font-medium rounded-lg hover:bg-slate-50"
                  >
                    • Automated Pathology Laboratory
                  </Link>
                  <Link
                    href="/services#bone-plaster-and-orthopedic-surgery"
                    onClick={() => setIsOpen(false)}
                    className="block p-2 text-slate-700 hover:text-[#0B3D91] font-medium rounded-lg hover:bg-slate-50"
                  >
                    • 24/7 Emergency Bone Plaster &amp; Trauma
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Accordion: Patient Care */}
            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <button
                type="button"
                onClick={() =>
                  setMobileExpandedSection(
                    mobileExpandedSection === "patientCare" ? null : "patientCare"
                  )
                }
                className="w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-sm flex items-center justify-between cursor-pointer"
              >
                <span>Patient Care &amp; Pricing</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-600 transition-transform ${
                    mobileExpandedSection === "patientCare" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileExpandedSection === "patientCare" && (
                <div className="p-3 bg-white space-y-1 text-sm">
                  {patientCareMenu.items.map((item, i) => (
                    <Link
                      key={i}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block p-2 text-slate-700 hover:text-[#0B3D91] font-medium rounded-lg hover:bg-slate-50"
                    >
                      • {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className={`px-3.5 py-2.5 rounded-xl font-medium transition-colors ${
                pathname === "/about" ? "bg-[#0B3D91] text-white font-semibold" : "text-slate-800 hover:bg-slate-50"
              }`}
            >
              About
            </Link>

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className={`px-3.5 py-2.5 rounded-xl font-medium transition-colors ${
                pathname === "/contact" ? "bg-[#0B3D91] text-white font-semibold" : "text-slate-800 hover:bg-slate-50"
              }`}
            >
              Contact
            </Link>
              </nav>
            </div>

            {/* Mobile Drawer Footer (Permanently pinned at bottom - never pushed out of screen) */}
            <div className="shrink-0 p-4 border-t border-slate-200/90 bg-slate-50/95 backdrop-blur-md space-y-2 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
              <Link
                href="/appointment"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#0B3D91] hover:bg-[#072254] text-white font-bold rounded-xl text-sm shadow-xs transition-all active:scale-95"
              >
                <Calendar className="w-4 h-4 text-teal-300" />
                <span>Book Appointment Online</span>
              </Link>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold rounded-xl text-xs shadow-xs transition-all active:scale-95"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`tel:${hospitalInfo.emergencyPhone}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-xs transition-all active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>24/7 Helpline</span>
                </a>
              </div>

              <div className="text-center text-[11px] text-slate-500 pt-0.5">
                <span className="font-semibold text-slate-700">General OPD Fee: </span>
                <span className="text-teal-700 font-extrabold">Only Rs. 550</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
