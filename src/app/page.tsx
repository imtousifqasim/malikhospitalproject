"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  PhoneCall,
  Clock,
  ShieldCheck,
  Award,
  ArrowRight,
  MapPin,
  Heart,
  Activity,
  Star,
  Building2,
  ScanLine,
  Microscope,
  Sparkles,
  MessageCircle,
  Stethoscope,
  HeartPulse
} from "lucide-react";
import { hospitalInfo } from "@/data/hospital";
import { departments } from "@/data/departments";
import { doctors } from "@/data/doctors";
import { services } from "@/data/services";
import DoctorCard from "@/components/DoctorCard";
import DepartmentCard from "@/components/DepartmentCard";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import TypewriterText from "@/components/TypewriterText";
import AppointmentForm from "@/components/AppointmentForm";

const HEALTH_CONCERNS = [
  {
    id: "spine-back",
    title: "Severe Back or Neck Pain",
    problem: "Persistent sciatica, disc herniation, or spinal stenosis causing numbness and immobility.",
    solution: "Consult USA-trained spine surgeon Prof. Dr. Abdul Qayyum for minimally invasive spine treatments.",
    deptSlug: "orthopedics-spine"
  },
  {
    id: "child-fever",
    title: "Child Illness & Growth Delays",
    problem: "Recurrent pediatric fever, respiratory distress, or newborn feeding complications.",
    solution: "Consult Dr. Muneeb Babar (FCPS Pediatrics, Children's Hospital Lahore) with 24/7 nursery backup.",
    deptSlug: "pediatrics"
  },
  {
    id: "gynae-pregnancy",
    title: "Pregnancy & Delivery Care",
    problem: "High-risk pregnancy, lack of sterile labor facilities, or emergency delivery complications.",
    solution: "Expert care by certified lady gynaecologist Dr. Pari Iman Gul in a fully equipped 24/7 labor room.",
    deptSlug: "gynecology-obstetrics"
  },
  {
    id: "cardiac-chest",
    title: "Chest Heaviness & Blood Pressure",
    problem: "Hypertension, palpitations, or suspected ischemic cardiac symptoms needing immediate testing.",
    solution: "Cardiac evaluation by Dr. Aftab Anwar with on-site ECG, 2D Echo, and emergency cardiac monitoring.",
    deptSlug: "cardiology"
  },
  {
    id: "digestive-liver",
    title: "Stomach, Liver & Acidity Issues",
    problem: "Chronic ulcers, hepatitis B/C, fatty liver, or persistent gastrointestinal pain.",
    solution: "Advanced evaluation by gastroenterologist Prof. Dr. Faisal Rasheed with ultrasound imaging.",
    deptSlug: "gastroenterology"
  },
  {
    id: "fracture-trauma",
    title: "Bone Fractures & Emergency Trauma",
    problem: "Sudden accident injuries, compound fractures, or dislocated joints requiring urgent reduction.",
    solution: "24/7 trauma team with high-frequency digital X-Ray and round-the-clock bone plaster services.",
    deptSlug: "orthopedics-spine"
  }
];

const heroTypewriterWords = [
  "24/7 Emergency & Trauma Care",
  "USA-Trained Spine Surgery",
  "FCPS Pediatric & Nursery Care",
  "Safe Maternity & Labor Room",
  "Cardiology & 2D Echo Heart Care",
  "High-Precision Digital X-Ray",
  "Automated Pathology Tests",
  "Affordable Rs. 550 General OPD"
];

export default function HomePage() {
  const featuredDoctors = doctors.filter((d) => d.featured).slice(0, 6);
  const featuredServices = services.slice(0, 6);
  const allReviews = doctors.flatMap((d) => d.reviews).slice(0, 4);

  const cleanPhone = hospitalInfo.whatsapp.replace("+", "");
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(hospitalInfo.whatsappMessage)}`;

  return (
    <div className="space-y-0">
      {/* 1. MODERN HOSPITAL HERO SECTION */}
      <section className="relative pt-6 pb-14 sm:pt-12 sm:pb-20 bg-gradient-to-b from-[#F0F7FF] via-[#F8FAFC] to-white overflow-hidden border-b border-slate-200">
        {/* Decorative Background Glows */}
        <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[300px] bg-gradient-to-br from-[#0B3D91]/12 to-[#14B8A6]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-[#14B8A6]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-5 text-center lg:text-left">
              {/* Live Hospital Status Indicator */}
              <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 bg-white/95 border border-slate-200 shadow-xs px-3.5 py-1.5 rounded-full text-xs w-fit mx-auto lg:mx-0">
                <span className="flex items-center gap-1.5 text-emerald-700 font-extrabold">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span>24/7 Emergency Open</span>
                </span>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <span className="text-[#0B3D91] font-bold">
                  Malik Hospital Chowk, Hujra Shah Muqeem
                </span>
              </div>

              {/* Headings & Typing Effect Banner */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B3D91] tracking-tight leading-[1.18]">
                  Your Health, Our Sacred Priority
                </h1>

                {/* Dedicated Typing Effect Pill */}
                <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 bg-blue-50/90 border border-blue-200/80 rounded-2xl px-3.5 py-2 text-sm sm:text-base font-bold text-slate-700 w-fit mx-auto lg:mx-0 shadow-2xs">
                  <span className="text-[#0B3D91] flex items-center gap-1.5 shrink-0 font-extrabold">
                    <Sparkles className="w-4 h-4 text-[#14B8A6]" />
                    <span>Specialized Care:</span>
                  </span>
                  <TypewriterText
                    words={heroTypewriterWords}
                    typingSpeed={65}
                    deletingSpeed={35}
                    pauseMs={2200}
                    className="teal-gradient-text font-black"
                    cursorClassName="bg-[#14B8A6]"
                  />
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-medium">
                Bringing Pakistan&apos;s leading hospital consultants, USA-trained spine surgeons, pediatric specialists, and university-standard diagnostic labs directly to Malik Hospital Chowk.
              </p>

              {/* Quick Consultation Fee Banner */}
              <div className="inline-flex items-center gap-3 bg-white/95 rounded-2xl p-2.5 sm:px-4 border border-teal-600/30 shadow-xs w-fit mx-auto lg:mx-0">
                <div className="w-8 h-8 rounded-xl bg-[#0B3D91] text-teal-300 flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                  Rs
                </div>
                <div>
                  <span className="text-[10px] text-teal-800 font-extrabold block uppercase tracking-wider">
                    Affordable Healthcare Standard
                  </span>
                  <span className="text-xs sm:text-sm font-black text-[#0B3D91]">
                    General Physician Checkup Fee: Only Rs. 550
                  </span>
                </div>
              </div>

              {/* Triple Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
                <Link
                  href="#book-appointment"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#0B3D91] hover:bg-[#072254] text-white font-bold text-sm shadow-md transition-all transform hover:-translate-y-0.5 active:scale-95"
                >
                  <Calendar className="w-4 h-4 text-[#14B8A6]" />
                  <span>Book Consultation</span>
                </Link>

                <a
                  href={`tel:${hospitalInfo.emergencyPhone}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition-all transform hover:-translate-y-0.5 active:scale-95"
                >
                  <PhoneCall className="w-4 h-4 text-white animate-pulse" />
                  <span>24/7 Call: {hospitalInfo.emergencyPhone}</span>
                </a>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-sm shadow-sm transition-all transform hover:-translate-y-0.5 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Trust Badges Strip */}
              <div className="pt-4 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/80 border border-slate-200/80 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">24/7 Emergency</span>
                    <span className="text-[10px] text-slate-500 block">Trauma &amp; Plaster</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/80 border border-slate-200/80 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0B3D91] flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">12+ Specialists</span>
                    <span className="text-[10px] text-slate-500 block">PMDC Certified</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/80 border border-slate-200/80 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#14B8A6] flex items-center justify-center shrink-0">
                    <Microscope className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Digital X-Ray</span>
                    <span className="text-[10px] text-slate-500 block">Automated Lab</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/80 border border-slate-200/80 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Heart className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Rs. 550 Checkup</span>
                    <span className="text-[10px] text-slate-500 block">Affordable Care</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Box */}
            <div className="lg:col-span-5 w-full">
              <div className="relative w-full max-w-md mx-auto lg:max-w-none rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-100">
                {/* Visual Image */}
                <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[460px]" style={{ minHeight: "380px" }}>
                  <Image
                    src="/images/founder.jpg"
                    alt="Dr. Farman Malik - CEO & Founder of Malik Group"
                    fill
                    priority
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B3D91]/95 via-[#0B3D91]/25 to-transparent" />
                </div>

                {/* Top Badge: Leadership */}
                <div className="absolute top-3.5 left-3.5 z-10 bg-white/95 backdrop-blur-md rounded-xl py-1.5 px-3 shadow-md border border-slate-200/80 flex items-center gap-2 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse shrink-0" />
                  <div>
                    <span className="font-extrabold text-slate-900 block leading-tight">CEO &amp; Founder</span>
                    <span className="text-[10px] text-teal-700 font-semibold block">Malik Group</span>
                  </div>
                </div>

                {/* Top-Right Badge (PMU) */}
                <div className="absolute top-3.5 right-3.5 z-10 bg-[#0B3D91] text-white rounded-xl py-1.5 px-3 shadow-md flex items-center gap-1.5 text-xs font-bold border border-white/20">
                  <Award className="w-3.5 h-3.5 text-teal-300" />
                  <span>Head of INT PMU</span>
                </div>

                {/* Bottom Highlight Card - Dr. Farman Malik */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-lg space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0B3D91] bg-[#0B3D91]/10 px-2 py-0.5 rounded-full">
                      Hospital Leadership
                    </span>
                    <span className="text-xs font-extrabold text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-full">
                      Malik Group
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight leading-snug">
                    Dr. Farman Malik
                  </h3>
                  <p className="text-xs text-[#0B3D91] font-bold leading-tight">
                    A young entrepreneur, CEO &amp; Founder of Malik Group of projects
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-normal pt-0.5">
                    Head of INT Department PMU
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="bg-white py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 text-center">
            <div className="pt-4 sm:pt-0">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#0B3D91] tracking-tight block">
                15+
              </span>
              <span className="text-xs sm:text-sm text-slate-600 font-semibold">
                Years of Community Service
              </span>
            </div>
            <div className="pt-4 sm:pt-0">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#0B3D91] tracking-tight block">
                12+
              </span>
              <span className="text-xs sm:text-sm text-slate-600 font-semibold">
                Specialist Doctors &amp; Faculty
              </span>
            </div>
            <div className="pt-4 sm:pt-0">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#0B3D91] tracking-tight block">
                50,000+
              </span>
              <span className="text-xs sm:text-sm text-slate-600 font-semibold">
                Patients Treated with Care
              </span>
            </div>
            <div className="pt-4 sm:pt-0">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#0B3D91] tracking-tight block">
                24/7
              </span>
              <span className="text-xs sm:text-sm text-slate-600 font-semibold">
                Emergency, Labor Room &amp; X-Ray
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED SPECIALIST DOCTORS SECTION */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#0B3D91]/5 text-[#0B3D91] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>Senior Faculty &amp; Specialists</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B3D91] tracking-tight">
              Consult Our Leading Specialists
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Senior professors, USA-trained spine surgeons, certified lady gynaecologists, and Children&apos;s Hospital Lahore consultants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDoctors.map((doc) => (
              <DoctorCard key={doc.slug} doctor={doc} featured={doc.featured} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/doctors"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0B3D91] hover:bg-[#072254] text-white font-bold text-sm shadow-md transition-all active:scale-95"
            >
              <span>Explore All 12 Doctors &amp; OPD Schedules</span>
              <ArrowRight className="w-4 h-4 text-[#14B8A6]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. DIAGNOSTICS & FACILITIES (ServiceCard Grid) */}
      <section className="py-20 bg-[#F8FAFC] border-y border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#0B3D91]/5 text-[#0B3D91] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              <Microscope className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>Modern Diagnostic Facilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B3D91] tracking-tight">
              Clinical &amp; Diagnostic Services
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              No need to travel to Lahore for Digital High-Frequency X-Ray, 2D Echo, Color Doppler, or computerized pathology tests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0B3D91] hover:bg-[#072254] text-white font-bold text-sm shadow-md transition-all active:scale-95"
            >
              <span>Explore All Diagnostic Services &amp; Fees</span>
              <ArrowRight className="w-4 h-4 text-[#14B8A6]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. PROBLEM VS SOLUTION SECTION */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#0B3D91]/5 text-[#0B3D91] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              <HeartPulse className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>Targeted Clinical Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B3D91] tracking-tight">
              Are You Struggling With Health Symptoms?
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              We diagnose the root medical cause and connect you immediately with certified specialty physicians.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HEALTH_CONCERNS.map((concern) => (
              <div
                key={concern.id}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#0B3D91]/10 text-[#0B3D91] flex items-center justify-center font-bold">
                    <Stethoscope className="w-6 h-6 text-[#14B8A6]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B3D91]">
                    {concern.title}
                  </h3>
                  <div className="text-xs sm:text-sm text-red-700 bg-red-50 p-3.5 rounded-2xl border border-red-100 font-medium leading-relaxed">
                    ⚠️ <strong>Condition:</strong> {concern.problem}
                  </div>
                  <div className="text-xs sm:text-sm text-emerald-800 bg-emerald-50 p-3.5 rounded-2xl border border-emerald-100 font-medium leading-relaxed">
                    ✅ <strong>Hospital Solution:</strong> {concern.solution}
                  </div>
                </div>

                <Link
                  href={`/departments/${concern.deptSlug}`}
                  className="pt-2 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0B3D91] hover:text-teal-600 transition-colors"
                >
                  <span>Consult Related Department</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CLINICAL DEPARTMENTS */}
      <section className="py-20 bg-[#F8FAFC] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#0B3D91]/5 text-[#0B3D91] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-2">
                <Building2 className="w-3.5 h-3.5 text-[#14B8A6]" />
                <span>Specialty Departments</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0B3D91] tracking-tight">
                Choose a Clinical Specialty
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Explore dedicated departments, conditions treated, and consultant schedules.
              </p>
            </div>

            <Link
              href="/departments"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-slate-200 text-xs sm:text-sm font-bold text-[#0B3D91] hover:bg-slate-50 shadow-xs transition-colors"
            >
              <span>View All 8 Departments</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <DepartmentCard key={dept.slug} department={dept} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE US */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#0B3D91]/5 text-[#0B3D91] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>Our Clinical Standards</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B3D91] tracking-tight">
              Why Families Trust Malik Medical Complex?
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              6 core pillars that define our hospital care experience in Hujra Shah Muqeem.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#0B3D91] text-[#14B8A6] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                24/7 Emergency &amp; Trauma
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Emergency physician on duty round-the-clock with oxygen therapy, trauma suturing, and emergency bone plastering.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#0B3D91] text-[#14B8A6] flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Prestigious Specialist Faculty
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                USA-trained spine surgeons, FCPS lady gynaecologists, and Children&apos;s Hospital Lahore consultants.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#0B3D91] text-[#14B8A6] flex items-center justify-center">
                <ScanLine className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Digital High-Frequency Diagnostics
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Digital high-frequency X-Ray, 2D Echo, Color Doppler ultrasound, and automated computerized pathology lab.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#0B3D91] text-[#14B8A6] flex items-center justify-center">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Affordable Fee: Only Rs. 550
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                General physician consultation fee is strictly Rs. 550, keeping university-standard care accessible for all families.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#0B3D91] text-[#14B8A6] flex items-center justify-center">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                24/7 Maternity &amp; Nursery
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Sterile delivery labor suites, radiant warmers, phototherapy units, and trained female gynaecological nursing staff.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#0B3D91] text-[#14B8A6] flex items-center justify-center">
                <Microscope className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Strict Hospital Sterilization
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Hospital-grade autoclave sterilization, single-use sterile disposables, and rigorous infection prevention protocols.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAST ONLINE APPOINTMENT SECTION */}
      <section id="book-appointment" className="py-20 bg-gradient-to-b from-white via-slate-50 to-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#0B3D91]/10 text-[#0B3D91] text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>Easy Patient Scheduling</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B3D91] tracking-tight">
              Book Your Hospital Consultation Online
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Select your consultant doctor, choose a convenient time slot, and avoid waiting queues. General Physician checkup fee is only Rs. 550.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <AppointmentForm />
          </div>
        </div>
      </section>

      {/* 9. PATIENT TESTIMONIALS */}
      <section className="py-20 bg-[#F8FAFC] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#0B3D91]/5 text-[#0B3D91] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-2">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Patient Feedback</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0B3D91] tracking-tight">
                Verified Patient Experiences
              </h2>
            </div>

            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-slate-200 text-xs sm:text-sm font-bold text-[#0B3D91] hover:bg-slate-50 shadow-xs transition-colors"
            >
              <span>Read All Feedback</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allReviews.map((rev) => (
              <TestimonialCard key={rev.id} review={rev} />
            ))}
          </div>
        </div>
      </section>

      {/* 10. PRIMARY CTA BANNER */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0B3D91] rounded-3xl p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden border-4 border-[#14B8A6]/20">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#14B8A6]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3 text-center lg:text-left">
                <span className="text-xs font-bold uppercase text-[#14B8A6] tracking-wider">
                  Patient Reception Desk
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                  Need Immediate Help or Appointment Scheduling?
                </h2>
                <p className="text-sm sm:text-base text-blue-100/90 max-w-xl leading-relaxed">
                  Our hospital front desk is ready to guide you to the right consultant, confirm diagnostic test preparation, or coordinate immediate 24/7 emergency care.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <Link
                  href="/appointment"
                  className="inline-flex items-center justify-center gap-2 py-4 px-8 rounded-full bg-[#14B8A6] hover:bg-[#0D9488] text-white text-sm font-bold text-center shadow-lg transition-transform hover:scale-105 active:scale-95"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment Online</span>
                </Link>

                <a
                  href={`tel:${hospitalInfo.emergencyPhone}`}
                  className="inline-flex items-center justify-center gap-2 py-4 px-8 rounded-full bg-white hover:bg-slate-100 text-[#0B3D91] text-sm font-bold text-center shadow-lg transition-transform hover:scale-105 active:scale-95"
                >
                  <PhoneCall className="w-4 h-4 text-red-600" />
                  <span>Call Emergency: {hospitalInfo.emergencyPhone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. LOCATION PREVIEW */}
      <section className="py-16 bg-[#F8FAFC] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                Hospital Location
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0B3D91] tracking-tight">
                Centrally Located at Malik Hospital Chowk
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Directly accessible for patients traveling from Depalpur, Okara, and surrounding villages. 24-hour patient drop-off bay available right at the entrance.
              </p>

              <div className="space-y-2.5 text-sm text-slate-700 pt-1">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <span className="font-semibold">{hospitalInfo.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <PhoneCall className="w-4 h-4 text-teal-700 shrink-0" />
                  <span>
                    Helplines: <strong className="text-slate-900 font-mono">{hospitalInfo.phones.join(" | ")}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>
                    Emergency: 24/7 Always Open • OPD: <strong>{hospitalInfo.workingHours.opd}</strong>
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0B3D91] hover:bg-[#072254] text-white text-sm font-bold transition-colors active:scale-95"
                >
                  <span>Driving Directions &amp; Contacts</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#14B8A6]" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
              <iframe
                title="Malik Medical Complex Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13707.382433547846!2d73.8155!3d30.7423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391807d885a06c57%3A0xb35a0f69f2eaec61!2sHujra%20Shah%20Muqeem%2C%20Okara%2C%20Punjab!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
