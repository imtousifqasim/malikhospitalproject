import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  Calendar,
  Clock,
  Stethoscope,
  ScanLine,
  ArrowRight,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { departments } from "@/data/departments";
import { doctors } from "@/data/doctors";
import DoctorCard from "@/components/DoctorCard";
import FeeBadge from "@/components/FeeBadge";

export async function generateStaticParams() {
  return departments.map((dept) => ({
    slug: dept.slug
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dept = departments.find((d) => d.slug === slug);
  if (!dept) return { title: "Department Not Found" };

  return {
    title: `${dept.name} — Specialist Doctors & Diagnostic Care`,
    description: `${dept.shortDescription} Conditions treated, specialist doctor schedules, and diagnostic tests available at Malik Medical Complex, Hujra Shah Muqeem.`
  };
}

export default async function DepartmentDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const department = departments.find((d) => d.slug === slug);

  if (!department) {
    notFound();
  }

  // Find assigned doctors
  const deptDoctors = doctors.filter((doc) => doc.departmentSlug === slug);

  return (
    <div className="space-y-16 sm:space-y-24 py-10 sm:py-16">
      {/* 1. Department Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Link href="/departments" className="text-xs font-bold text-teal-700 hover:underline">
                Departments
              </Link>
              <span className="text-slate-400 text-xs">/</span>
              <span className="text-xs font-semibold text-slate-500">{department.name}</span>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl sm:text-4xl font-black text-[#0B3D91] tracking-tight">
                {department.name}
              </h1>
              <p className="font-urdu text-base sm:text-lg font-bold text-teal-800">
                {department.urduName}
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {department.longDescription}
            </p>

            {/* Badges & Timing */}
            <div className="flex items-center gap-3 flex-wrap pt-2">
              <FeeBadge fee={department.startingFee} size="md" variant="teal" labelPrefix="Consultation:" />
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full font-semibold">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                <span>{department.workingSchedule}</span>
              </div>
            </div>

            {/* Quick CTAs */}
            <div className="flex items-center gap-3 pt-3 flex-wrap">
              <Link
                href={`/appointment?department=${department.slug}`}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0B3D91] to-[#14B8A6] text-white px-6 py-3 rounded-full text-sm sm:text-base font-bold shadow-md hover:scale-105 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment in this Department</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-16/10 border-4 border-slate-50">
              <Image
                src={department.heroImage}
                alt={department.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs uppercase tracking-wider font-extrabold bg-teal-500/80 px-2.5 py-0.5 rounded-md">
                  Malik Medical Center of Excellence
                </span>
                <p className="text-xs sm:text-sm font-semibold mt-1">
                  Equipped with specialized clinical tools and sterile examination suites.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Conditions Treated & Key Diagnostic Facilities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Conditions List */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-teal-700 uppercase tracking-wider mb-1">
                <Stethoscope className="w-4 h-4" />
                <span>Clinical Scope</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0B3D91]">
                Conditions & Illnesses Treated
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {department.conditionsTreated.map((condition, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-teal-50/50 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-slate-700">{condition}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Diagnostic Facilities & Features */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-teal-700 uppercase tracking-wider mb-1">
                <ScanLine className="w-4 h-4" />
                <span>Diagnostics</span>
              </div>
              <h3 className="text-lg font-black text-[#0B3D91]">
                Attached Diagnostic Facilities
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-600">
                {department.diagnosticFacilities.map((test, idx) => (
                  <li key={idx} className="flex items-center gap-2 font-medium">
                    <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                    <span>{test}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#0B3D91] to-[#07265C] text-white rounded-3xl p-6 sm:p-8 shadow-md space-y-3">
              <span className="text-xs uppercase font-bold text-teal-300">Fast Triage</span>
              <h3 className="text-lg sm:text-xl font-bold">Have an acute medical question?</h3>
              <p className="text-sm text-slate-200 leading-relaxed">
                Contact our helpline directly. Our clinical coordinator can confirm consultant slot availability for this department.
              </p>
              <a
                href="tel:03006972295"
                className="inline-flex items-center gap-2 bg-white text-[#0B3D91] hover:bg-teal-50 font-bold text-sm px-4 py-2.5 rounded-xl transition-colors shadow-sm"
              >
                <span>Call 0300-6972295</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Doctors in this Department */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
            Consultant Faculty
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B3D91] tracking-tight mt-1">
            Specialists Available in {department.name}
          </h2>
          <p className="text-sm text-slate-500">
            Select a specialist below to view their qualifications, detailed schedule, and book an appointment.
          </p>
        </div>

        {deptDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deptDoctors.map((doc) => (
              <DoctorCard key={doc.slug} doctor={doc} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-2">
            <p className="text-sm font-semibold text-slate-700">
              Department consultations are handled by rotating visiting senior faculty.
            </p>
            <Link
              href="/appointment"
              className="text-sm font-bold text-[#0B3D91] hover:underline"
            >
              Inquire at Reception &rarr;
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
