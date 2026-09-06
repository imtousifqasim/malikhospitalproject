import React from "react";
import Link from "next/link";
import { services } from "@/data/services";
import ServiceCard from "@/components/ServiceCard";
import { Sparkles, PhoneCall, Calendar } from "lucide-react";
import { hospitalInfo } from "@/data/hospital";

export const metadata = {
  title: "Clinical Facilities & Diagnostic Services",
  description:
    "Explore diagnostic and clinical services at Malik Medical Complex: Digital X-Ray, 2D Echo, Color Doppler Ultrasound, TVS, HSG, Modern Lab, Children's Nursery, Aesthetic Center, Endoscopy, and 24/7 Bone Plaster."
};

export default function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-4 py-1.5 rounded-full border border-teal-200">
          Hospital Diagnostics &amp; Procedures
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B3D91] tracking-tight">
          Comprehensive Clinical Services &amp; Facilities
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Equipped with Japanese and European diagnostic hardware, high-frequency digital X-Ray, 2D Color Doppler Echo, laparoscopic testing, and a 24/7 emergency bone plaster room.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.slug} id={service.slug} className="scroll-mt-28 flex">
            <ServiceCard service={service} />
          </div>
        ))}
      </div>

      {/* Diagnostic Guidance Banner */}
      <div className="bg-gradient-to-r from-[#0B3D91] to-[#07265C] text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs uppercase font-bold text-teal-300 tracking-wider">24/7 Emergency Diagnostics</span>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black">
            Need an Urgent X-Ray, Ultrasound, or Lab Test?
          </h3>
          <p className="text-sm text-blue-100/90 max-w-xl leading-relaxed">
            Our Digital X-Ray and Automated Pathology Laboratory operate round-the-clock without appointment. Walk into Malik Hospital Chowk at any time.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <a
            href={`tel:${hospitalInfo.emergencyPhone}`}
            className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3.5 rounded-full text-sm transition-colors shadow-md active:scale-95"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call 24/7: {hospitalInfo.emergencyPhone}</span>
          </a>
          <Link
            href="/appointment"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#0B3D91] hover:bg-slate-100 font-bold px-6 py-3.5 rounded-full text-sm transition-colors active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Scheduled Scan</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
