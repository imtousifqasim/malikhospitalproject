"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ScanLine,
  HeartPulse,
  Radio,
  CircleDot,
  FileSpreadsheet,
  Sparkle,
  Microscope,
  Baby,
  Sparkles,
  Eye,
  Bone,
  Clock,
  Check,
  Calendar,
  MessageCircle
} from "lucide-react";
import { HospitalService } from "@/data/services";
import { hospitalInfo } from "@/data/hospital";
import FeeBadge from "@/components/FeeBadge";

const iconMap: Record<string, React.ElementType> = {
  ScanLine,
  HeartPulse,
  Radio,
  CircleDot,
  FileSpreadsheet,
  Sparkle,
  Microscope,
  Baby,
  Sparkles,
  Eye,
  Bone
};

interface ServiceCardProps {
  service: HospitalService;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconMap[service.iconName] || Microscope;

  const cleanPhone = hospitalInfo.whatsapp.replace("+", "");
  const customWaMsg = `Hello Malik Medical Complex, I want to inquire about ${service.name} (${service.price}). Please share schedule & requirements.`;
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(customWaMsg)}`;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group relative h-full"
    >
      {/* Top Header Section with Category and Badge */}
      <div className="p-6 pb-0 flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B3D91] bg-[#0B3D91]/10 px-3 py-1 rounded-full whitespace-nowrap">
            {service.category}
          </span>
          {service.badge && (
            <span className="text-xs font-extrabold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/60 whitespace-nowrap">
              {service.badge}
            </span>
          )}
        </div>

        {/* Title & Icon */}
        <div className="flex items-start gap-3.5 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-[#0B3D91] flex items-center justify-center shrink-0 group-hover:bg-[#0B3D91] group-hover:text-white transition-colors shadow-xs">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 group-hover:text-[#0B3D91] transition-colors leading-snug">
              {service.name}
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 leading-normal">
              {service.urduName}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 min-h-[54px] mt-1">
          {service.shortDescription}
        </p>

        {/* Timing Spec */}
        <div className="my-3 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100 min-h-[42px]">
          <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
          <span className="font-bold text-slate-800 leading-snug line-clamp-2">{service.timing}</span>
        </div>

        {/* Feature Highlights */}
        <ul className="space-y-2 mb-4 flex-1">
          {service.features.slice(0, 3).map((f, idx) => (
            <li key={idx} className="text-xs sm:text-sm text-slate-700 font-medium flex items-start gap-2">
              <div className="w-4 h-4 rounded-full bg-[#0B3D91]/10 text-[#0B3D91] flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
              <span className="leading-snug line-clamp-2">{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Pricing & CTAs pinned to bottom */}
      <div className="p-6 pt-0 mt-auto">
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between gap-2 min-h-[28px]">
            <FeeBadge fee={service.price} size="sm" variant="neutral" labelPrefix="Price:" />
            <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">
              Walk-in or Book
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/#book-appointment`}
              className="w-full bg-[#0B3D91] hover:bg-[#072254] text-white font-bold py-2.5 px-3 rounded-xl text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5 text-teal-300" />
              <span>Book Test</span>
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
