"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle, Quote } from "lucide-react";
import { DoctorReview } from "@/data/doctors";

interface TestimonialCardProps {
  review: DoctorReview;
  doctorName?: string;
}

export default function TestimonialCard({ review }: TestimonialCardProps) {
  const initials = review.patientName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between h-full"
    >
      <div className="flex-1 flex flex-col">
        {/* Top: Stars & Quote Icon */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-amber-400">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>

          <div className="w-8 h-8 rounded-full bg-[#0B3D91]/10 text-[#0B3D91] flex items-center justify-center">
            <Quote className="w-4 h-4" />
          </div>
        </div>

        {/* Comment with reserved height for equal cards */}
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic mb-4 line-clamp-3 min-h-[64px] flex-1">
          &ldquo;{review.comment}&rdquo;
        </p>
      </div>

      {/* Patient & Treatment Meta (Pinned to bottom) */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded-full bg-[#0B3D91] text-teal-300 font-bold text-sm flex items-center justify-center shadow-xs shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 font-bold text-sm text-slate-900">
              <span className="truncate">{review.patientName}</span>
              {review.verified && (
                <CheckCircle className="w-4 h-4 text-teal-600 fill-teal-100 shrink-0" />
              )}
            </div>
            <span className="text-xs text-slate-600 block truncate font-medium">
              {review.city} • {review.date}
            </span>
          </div>
        </div>

        {/* Condition tag: Single-line pill badge with no multi-line wrapping */}
        <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200/50 whitespace-nowrap shrink-0">
          {review.treatment}
        </span>
      </div>
    </motion.div>
  );
}
