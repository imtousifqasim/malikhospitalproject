"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  ChevronRight,
  Star,
  Check,
  MessageCircle
} from "lucide-react";
import { Doctor } from "@/data/doctors";
import { hospitalInfo } from "@/data/hospital";
import FeeBadge from "@/components/FeeBadge";

interface DoctorCardProps {
  doctor: Doctor;
  featured?: boolean;
}

export default function DoctorCard({ doctor, featured }: DoctorCardProps) {
  const avgRating =
    doctor.reviews.length > 0
      ? (doctor.reviews.reduce((acc, r) => acc + r.rating, 0) / doctor.reviews.length).toFixed(1)
      : "5.0";

  const cleanPhone = hospitalInfo.whatsapp.replace("+", "");
  const customWaMsg = `Hello Malik Medical Complex, I want to book an appointment with ${doctor.name} (${doctor.specialty}). Please share available OPD slots.`;
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(customWaMsg)}`;

  // Clean timing line for card view (strip verbose parenthetical details)
  const displayTiming = doctor.timingSummary.replace(/\s*\([^)]*\)/g, "").trim();

  // Select 2 concise, punchy specializations for card view to prevent mid-word cutting
  const cardSpecializations = useMemo(() => {
    if (!doctor.specializations || doctor.specializations.length === 0) return [];
    const cleanTag = (tag: string) =>
      tag
        .replace("Total Knee Replacement (TKR) & Total Hip Replacement (THR)", "Knee & Hip Replacement (TKR/THR)")
        .replace("Diagnostic & Therapeutic Upper GI Endoscopy", "Upper GI Endoscopy & Colonoscopy")
        .replace("Pediatric Infectious Fevers & Typhoid Management", "Pediatric Fevers & Infections")
        .replace("High-Risk Pregnancy Care & Antenatal Triage", "High-Risk Pregnancy Care")
        .replace("Minimally Invasive Spinal Disc Surgery & Fusion", "Spinal Disc Surgery & Fusion");

    return [...doctor.specializations]
      .map(cleanTag)
      .sort((a, b) => a.length - b.length)
      .slice(0, 2);
  }, [doctor.specializations]);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group relative h-full"
    >
      {/* Image Container with Overlay Badges */}
      <div className="relative h-56 sm:h-60 w-full shrink-0 overflow-hidden bg-slate-100">
        {/* Top Badges Row */}
        <div className="absolute top-3 left-3 right-3 z-10 flex items-start justify-between gap-2 pointer-events-none">
          {/* Experience Pill Top Left */}
          <div className="shrink-0 bg-[#0B3D91] text-teal-300 text-xs font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md border border-teal-500/30 whitespace-nowrap">
            {doctor.yearsOfExperience}+ Yrs Exp
          </div>

          {/* Specialty Tag Top Right */}
          <div className="flex-1 min-w-0 text-right">
            <span className="inline-block bg-white/95 backdrop-blur-md text-[#0B3D91] text-xs font-bold px-2.5 py-1 rounded-xl shadow-xs border border-slate-200 leading-tight max-w-[190px] break-words text-center">
              {doctor.specialty}
            </span>
          </div>
        </div>

        {/* Doctor Photo */}
        <Image
          src={doctor.photo}
          alt={doctor.photoAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient Overlay for high text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B3D91] via-[#0B3D91]/40 to-transparent" />

        {/* Doctor Name & Title Overlay */}
        <div className="absolute bottom-3 left-4 right-4 text-white z-10 flex flex-col justify-end min-h-[60px]">
          <h3 className="font-extrabold text-base sm:text-lg text-white leading-snug drop-shadow-xs line-clamp-2">
            {doctor.name}
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-teal-200 leading-tight mt-0.5 line-clamp-2">
            {doctor.title}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Availability */}
          <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 text-amber-600 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{avgRating}</span>
              <span className="text-slate-600 font-medium">
                ({doctor.reviews.length || 14} reviews)
              </span>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
              Verified Consultant
            </span>
          </div>

          {/* Qualifications & Bio */}
          <p className="text-sm text-slate-600 mt-2.5 font-medium line-clamp-2 leading-relaxed min-h-[40px]">
            {doctor.qualifications}
          </p>

          {/* Timing Specs */}
          <div className="my-3 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-700">
            <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100">
              <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span className="font-bold text-slate-800 leading-snug line-clamp-2">
                {displayTiming}
              </span>
            </div>
          </div>

          {/* Key Specializations */}
          <ul className="space-y-1.5 mb-4 min-h-[44px]">
            {cardSpecializations.map((spec: string, idx: number) => (
              <li key={idx} className="text-xs sm:text-sm text-slate-700 font-medium flex items-start gap-2">
                <div className="w-4 h-4 rounded-full bg-[#0B3D91]/10 text-[#0B3D91] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className="leading-snug line-clamp-1">{spec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing & Dual Action CTAs */}
        <div className="pt-4 border-t border-slate-100 space-y-3 mt-auto">
          <div className="flex items-center justify-between gap-2">
            <FeeBadge fee={doctor.feeRange} size="sm" variant="neutral" labelPrefix="OPD Fee:" />
            <Link
              href={`/doctors/${doctor.slug}`}
              className="text-xs sm:text-sm font-bold text-[#0B3D91] hover:text-teal-700 transition-colors flex items-center gap-0.5"
            >
              <span>Profile</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/#book-appointment`}
              className="w-full bg-[#0B3D91] hover:bg-[#072254] text-white font-bold py-2.5 px-3 rounded-xl text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5 text-teal-300" />
              <span>Book Visit</span>
            </Link>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold py-2.5 px-3 rounded-xl text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
