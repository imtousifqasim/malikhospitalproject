"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Sparkles, Stethoscope, ArrowRight } from "lucide-react";
import { departments } from "@/data/departments";
import DepartmentCard from "@/components/DepartmentCard";

export default function DepartmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = departments.filter((dept) => {
    const q = searchQuery.toLowerCase();
    return (
      dept.name.toLowerCase().includes(q) ||
      dept.shortDescription.toLowerCase().includes(q) ||
      dept.conditionsTreated.some((c) => c.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3.5 py-1 rounded-full border border-teal-200">
          Specialty Centers
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#0B3D91] tracking-tight">
          Clinical Departments & Specialties
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm sm:text-base leading-relaxed">
          Explore our specialized medical, surgical, diagnostic, and pediatric departments. Every department is supported by dedicated consultant physicians, trained nursing teams, and on-site diagnostic technology.
        </p>

        {/* Search Input */}
        <div className="max-w-md mx-auto relative pt-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search departments, illness, or conditions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-sm focus:outline-hidden focus:ring-2 focus:ring-[#0B3D91]"
          />
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((dept) => (
            <DepartmentCard key={dept.slug} department={dept} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
          <Stethoscope className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="font-bold text-lg text-slate-800">No departments found</h3>
          <p className="text-xs text-slate-500">Try searching for &quot;Child&quot;, &quot;Spine&quot;, &quot;Heart&quot;, &quot;Skin&quot;, or &quot;Sugar&quot;.</p>
          <button
            onClick={() => setSearchQuery("")}
            className="text-xs font-bold text-[#0B3D91] hover:underline"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Bottom Assistance Banner */}
      <div className="bg-gradient-to-r from-blue-50 via-teal-50 to-emerald-50 rounded-3xl p-8 border border-teal-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="font-extrabold text-lg text-[#0B3D91]">
            Not sure which department you need?
          </h3>
          <p className="text-xs text-slate-600">
            Visit our General Physician clinic or call reception at 0300-6972295. Our medical officers will guide you to the right consultant.
          </p>
        </div>
        <Link
          href="/appointment"
          className="inline-flex items-center gap-2 bg-[#0B3D91] hover:bg-[#07265C] text-white px-6 py-3 rounded-full text-xs font-bold shadow-md hover:scale-105 transition-all shrink-0"
        >
          <span>Book General Triage</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
