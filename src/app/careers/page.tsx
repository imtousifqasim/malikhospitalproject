import React from "react";
import Link from "next/link";
import { Briefcase, MapPin, Clock, Send, CheckCircle2, HeartHandshake } from "lucide-react";
import { hospitalInfo } from "@/data/hospital";

export const metadata = {
  title: "Careers & Clinical Opportunities — Join Our Team",
  description:
    "Join the medical and nursing team at Malik Medical Complex, Hujra Shah Muqeem. Explore career opportunities for doctors, staff nurses, and lab technologists."
};

const jobListings = [
  {
    id: "job-1",
    title: "Registered Staff Nurse (Emergency & ICU)",
    department: "Emergency & Nursing Department",
    type: "Full Time / Rotating Shifts",
    requirements: "BSc Nursing / General Nursing Diploma with PNC registration. 1-2 years experience in acute patient care.",
    posted: "Active Hiring"
  },
  {
    id: "job-2",
    title: "Medical Lab Technologist (MLT)",
    department: "Diagnostic Pathology Laboratory",
    type: "Full Time",
    requirements: "BS Medical Laboratory Technology (MLT). Hands-on experience with automated chemistry & hematology analyzers.",
    posted: "Active Hiring"
  },
  {
    id: "job-3",
    title: "Lady Health Visitor / Midwife (LHV)",
    department: "Gynecology & Labor Suite",
    type: "Full Time",
    requirements: "Certified LHV diploma. Experienced in normal delivery assistance and post-natal maternal care.",
    posted: "Active Hiring"
  },
  {
    id: "job-4",
    title: "Hospital Receptionist & Billing Executive",
    department: "Patient Front Desk & Triage",
    type: "Full Time / Day & Night Shifts",
    requirements: "Intermediate / Graduate with polite Urdu/Punjabi communication skills and basic computer literacy.",
    posted: "Active Hiring"
  }
];

export default function CareersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3.5 py-1 rounded-full border border-teal-200">
          Work With Us
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#0B3D91] tracking-tight">
          Join the Malik Medical Complex Team
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm sm:text-base leading-relaxed">
          Be part of a compassionate clinical family dedicated to delivering the highest standards of healthcare to Hujra Shah Muqeem and Depalpur.
        </p>
      </div>

      {/* Open Positions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobListings.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                  {job.department}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {job.posted}
                </span>
              </div>

              <h3 className="font-black text-lg sm:text-xl text-[#0B3D91] leading-snug">
                {job.title}
              </h3>

              <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-600 font-medium">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-teal-600" />
                  {job.type}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-teal-600" />
                  Hujra Shah Muqeem
                </span>
              </div>

              <p className="text-sm text-slate-600 pt-2 border-t border-slate-100 leading-relaxed">
                <strong>Requirements:</strong> {job.requirements}
              </p>
            </div>

            <div className="pt-4">
              <a
                href={`mailto:${hospitalInfo.email}?subject=Application for ${encodeURIComponent(job.title)}`}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#0B3D91] hover:bg-[#07265C] text-white py-3 px-4 rounded-xl font-bold text-sm transition-colors shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>Apply via Email (CV & Credentials)</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Spontaneous Application Banner */}
      <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 text-center space-y-3">
        <h3 className="font-extrabold text-lg text-slate-900">
          Are you a visiting medical consultant or specialist?
        </h3>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          We welcome specialist clinicians interested in weekly visiting clinics or specialized surgical procedures. Contact our medical superintendent directly.
        </p>
        <div className="pt-1">
          <a
            href={`mailto:${hospitalInfo.email}`}
            className="text-xs font-bold text-teal-700 hover:text-teal-900 underline"
          >
            Email Medical Administration: {hospitalInfo.email}
          </a>
        </div>
      </div>
    </div>
  );
}
