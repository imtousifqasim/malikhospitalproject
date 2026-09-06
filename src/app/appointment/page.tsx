import React from "react";
import Link from "next/link";
import {
  Calendar,
  PhoneCall,
  Clock,
  AlertCircle,
  HelpCircle,
  Check,
  Stethoscope
} from "lucide-react";
import { hospitalInfo } from "@/data/hospital";
import AppointmentForm from "@/components/AppointmentForm";

export const metadata = {
  title: "Book an Appointment — Specialist Consultation & Checkups",
  description:
    "Schedule an appointment online with our expert specialists at Malik Medical Complex. General physician fee Rs. 550. Fast confirmation via EmailJS."
};

export default async function AppointmentPage({
  searchParams
}: {
  searchParams: Promise<{ doctor?: string; department?: string; service?: string }>;
}) {
  const { doctor, department } = await searchParams;

  return (
    <div className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3.5 py-1 rounded-full border border-teal-200/60">
            Patient Scheduling
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B3D91] tracking-tight">
            Book an Appointment
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Select your specialist and consultation slot. General Physician checkup fee is only Rs. 550.
          </p>
        </div>

        {/* Main Form & Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-8">
            <AppointmentForm
              initialDoctorSlug={doctor}
              initialDepartmentSlug={department}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-5">
            {/* Emergency Notice */}
            <div className="bg-red-50 rounded-2xl p-5 border border-red-200/80 space-y-2.5">
              <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Immediate Emergency?</span>
              </div>
              <p className="text-sm text-red-900 leading-relaxed">
                Do not wait for online confirmation for severe chest pain, active bleeding, or acute trauma. Walk into our 24/7 Emergency immediately.
              </p>
              <a
                href={`tel:${hospitalInfo.emergencyPhone}`}
                className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm py-3 px-4 rounded-xl transition-colors mt-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Emergency: {hospitalInfo.emergencyPhone}</span>
              </a>
            </div>

            {/* Direct Phone Booking */}
            <div className="card-premium p-5 space-y-3">
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
                Direct Phone Booking
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our reception team can confirm token numbers immediately via phone.
              </p>
              <div className="space-y-2 text-sm">
                {hospitalInfo.phones.map((phoneNum) => (
                  <a
                    key={phoneNum}
                    href={`tel:${phoneNum}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold border border-slate-200/60 transition-colors"
                  >
                    <span>{phoneNum}</span>
                    <span className="text-teal-700 text-xs font-bold">Dial &rarr;</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Visit Guidelines */}
            <div className="card-premium p-5 space-y-2.5">
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
                Visit Guidelines
              </h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>Bring patient CNIC / B-Form</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>Bring prior medical records &amp; prescriptions</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>Reach 15 mins prior to consultant slot</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
