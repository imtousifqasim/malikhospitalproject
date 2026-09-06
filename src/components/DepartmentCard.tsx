"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Stethoscope,
  Baby,
  Bone,
  HeartPulse,
  Activity,
  Sparkles,
  Users,
  Eye,
  Microscope,
  ArrowRight
} from "lucide-react";
import { Department } from "@/data/departments";
import FeeBadge from "@/components/FeeBadge";

const iconMap: Record<string, React.ElementType> = {
  Stethoscope,
  Baby,
  Bone,
  HeartPulse,
  Activity,
  Sparkles,
  Users,
  Eye,
  Microscope
};

interface DepartmentCardProps {
  department: Department;
}

export default function DepartmentCard({ department }: DepartmentCardProps) {
  const Icon = iconMap[department.iconName] || Stethoscope;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group relative p-6 sm:p-7 h-full"
    >
      <div className="flex-1 flex flex-col">
        {/* Top: Icon & Specialist Count */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-12 rounded-2xl bg-[#0B3D91]/10 text-[#0B3D91] group-hover:bg-[#0B3D91] group-hover:text-white transition-colors flex items-center justify-center shadow-xs">
            <Icon className="w-6 h-6" />
          </div>

          <span className="text-xs font-bold text-[#0B3D91] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            {department.doctorIds.length} {department.doctorIds.length === 1 ? "Specialist" : "Specialists"}
          </span>
        </div>

        {/* Titles */}
        <Link href={`/departments/${department.slug}`}>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#0B3D91] transition-colors leading-snug mb-1">
            {department.name}
          </h3>
        </Link>
        <p className="text-xs sm:text-sm font-semibold text-slate-500 mb-3 leading-normal">
          {department.urduName}
        </p>

        {/* Description */}
        <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4 min-h-[50px] flex-1">
          {department.shortDescription}
        </p>
      </div>

      {/* Footer: Fee & Details Link */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
        <FeeBadge fee={department.startingFee} size="sm" variant="neutral" labelPrefix="From:" />

        <Link
          href={`/departments/${department.slug}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0B3D91] hover:text-teal-700 bg-slate-50 hover:bg-teal-50 px-3.5 py-1.5 rounded-full transition-colors active:scale-95"
        >
          <span>Explore</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}
