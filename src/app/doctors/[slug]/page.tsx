import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  Award,
  Check,
  GraduationCap,
  Star,
  Globe,
  ShieldCheck,
  Building2,
  ChevronRight,
  PhoneCall
} from "lucide-react";
import { doctors } from "@/data/doctors";
import FeeBadge from "@/components/FeeBadge";
import Timeline from "@/components/Timeline";
import ScheduleTable from "@/components/ScheduleTable";
import AppointmentForm from "@/components/AppointmentForm";
import TestimonialCard from "@/components/TestimonialCard";
import { PhysicianJsonLd } from "@/components/JsonLd";

export async function generateStaticParams() {
  return doctors.map((doc) => ({
    slug: doc.slug
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doctor = doctors.find((d) => d.slug === slug);
  if (!doctor) return { title: "Doctor Not Found" };

  return {
    title: `${doctor.name} (${doctor.specialty}) — Malik Medical Complex`,
    description: `${doctor.name}, ${doctor.qualifications}. ${doctor.specialty} consultation hours, fee: ${doctor.feeRange}, and appointment booking at Malik Hospital Chowk, Hujra Shah Muqeem.`
  };
}

export default async function DoctorProfilePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doctor = doctors.find((d) => d.slug === slug);

  if (!doctor) {
    notFound();
  }

  const avgRating = doctor.reviews.length > 0
    ? (doctor.reviews.reduce((acc, r) => acc + r.rating, 0) / doctor.reviews.length).toFixed(1)
    : "5.0";

  return (
    <div className="py-10 sm:py-16 bg-white space-y-12 sm:space-y-16">
      <PhysicianJsonLd doctor={doctor} />

      {/* 1. Profile Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-premium p-6 sm:p-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
            <Link href="/" className="hover:text-[#0B3D91]">Home</Link>
            <span>/</span>
            <Link href="/doctors" className="hover:text-[#0B3D91]">Doctors</Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">{doctor.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Avatar & Badges */}
            <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                  <Image
                    src={doctor.photo}
                    alt={doctor.photoAlt}
                    width={176}
                    height={176}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-2 -right-1 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-md shadow-xs">
                  {doctor.yearsOfExperience}+ Years Exp
                </div>
              </div>

              <div className="space-y-1 w-full text-xs sm:text-sm">
                <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-1 rounded-md font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                  PMDC Registered: {doctor.pmdcNumber}
                </span>
                <p className="text-slate-500 pt-1">
                  Languages: <strong>{doctor.languages.join(", ")}</strong>
                </p>
              </div>
            </div>

            {/* Right: Bio & Key Details */}
            <div className="lg:col-span-8 space-y-5">
              <div>
                <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200/60">
                    {doctor.specialty}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 text-xs sm:text-sm font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{avgRating} ({doctor.reviews.length} reviews)</span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0B3D91] tracking-tight">
                  {doctor.name}
                </h1>
                <p className="font-urdu text-base sm:text-lg font-bold text-teal-800">
                  {doctor.urduName}
                </p>
                <p className="text-sm sm:text-base font-semibold text-teal-700 mt-1">
                  {doctor.title}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mt-1">
                  {doctor.qualifications}
                </p>
              </div>

              {/* Fee & Timing Bar */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
                <FeeBadge fee={doctor.feeRange} size="md" variant="teal" labelPrefix="Consultation Fee:" />
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Clock className="w-4 h-4 text-teal-600" />
                  <span>{doctor.timingSummary}</span>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-1.5">
                <h3 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-500">
                  Clinical Overview
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {doctor.about}
                </p>
              </div>

              {/* Specializations */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-500">
                  Specialized Treatments:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {doctor.specializations.map((spec, i) => (
                    <span
                      key={i}
                      className="text-xs sm:text-sm bg-slate-100 text-slate-700 px-3 py-1 rounded-md font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Schedule, Conditions, Timeline & Booking */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-8">
            {/* Weekly Timetable */}
            <div className="card-premium p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900">
                    Weekly Consultation Schedule
                  </h3>
                  <p className="text-sm text-slate-500">
                    Day-by-day clinic timings and room allocations.
                  </p>
                </div>
                <Clock className="w-4 h-4 text-slate-400" />
              </div>
              <ScheduleTable schedule={doctor.weeklySchedule} />
            </div>

            {/* Conditions Treated */}
            <div className="card-premium p-6 sm:p-8 space-y-4">
              <h3 className="font-bold text-base sm:text-lg text-slate-900">
                Conditions &amp; Illnesses Treated
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {doctor.conditionsTreated.map((cond, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{cond}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="card-premium p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#0B3D91]" />
                <h3 className="font-bold text-base sm:text-lg text-slate-900">
                  Education &amp; Career Milestones
                </h3>
              </div>
              <Timeline milestones={doctor.careerTimeline} />
            </div>

            {/* Patient Feedback */}
            <div className="card-premium p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900">
                    Patient Reviews
                  </h3>
                  <p className="text-sm text-slate-500">
                    Verified patient feedback from local consultations.
                  </p>
                </div>
                <div className="flex items-center gap-1 text-amber-500 text-xs sm:text-sm font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{avgRating} / 5.0</span>
                </div>
              </div>

              <div className="space-y-4">
                {doctor.reviews.map((rev) => (
                  <TestimonialCard key={rev.id} review={rev} doctorName={doctor.name} />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Sticky Booking Form */}
          <div className="lg:col-span-5 sticky top-24 space-y-4">
            <AppointmentForm
              initialDoctorSlug={doctor.slug}
              initialDepartmentSlug={doctor.departmentSlug}
            />

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-sm flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 block">Need phone booking assistance?</span>
                <span className="text-slate-500">Helpline: {doctor.phoneContact || "0300-6972295"}</span>
              </div>
              <a
                href={`tel:${doctor.phoneContact || "03006972295"}`}
                className="btn-secondary p-2.5 rounded-lg font-bold"
              >
                <PhoneCall className="w-4 h-4 text-slate-700" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mobile Sticky "Book with Dr. X" Strip */}
      <div className="fixed bottom-14 left-0 right-0 z-30 md:hidden bg-white border-t border-slate-200 p-3 text-slate-800 shadow-md flex items-center justify-between px-4">
        <div className="leading-tight">
          <span className="text-xs text-slate-500 block font-medium">Checkup Fee: {doctor.feeRange}</span>
          <span className="font-bold text-sm text-slate-900 line-clamp-1">{doctor.name}</span>
        </div>
        <Link
          href={`/appointment?doctor=${doctor.slug}`}
          className="btn-primary px-4 py-2 rounded-xl text-sm font-bold"
        >
          Book Appointment
        </Link>
      </div>
    </div>
  );
}
