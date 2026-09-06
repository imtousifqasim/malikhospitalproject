"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, UserCheck, Calendar, Sparkles, Filter, ArrowRight } from "lucide-react";
import { doctors } from "@/data/doctors";
import DoctorCard from "@/components/DoctorCard";

const specialties = [
  "All Specialists",
  "General Medicine",
  "Pediatrics & Neonatology",
  "Orthopedics & Spine Surgery",
  "Cardiology & Vascular Medicine",
  "Gastroenterology & Liver Diseases",
  "Aesthetic Medicine",
  "Clinical Dermatology",
  "Gynecology & Obstetrics",
  "Ophthalmology & Laser Eye Surgery"
];

export default function DoctorsListingPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialists");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const matchesSpecialty =
        selectedSpecialty === "All Specialists" ||
        doc.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase().split(" ")[0]) ||
        doc.departmentSlug.toLowerCase().includes(selectedSpecialty.toLowerCase().split(" ")[0]);

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        doc.name.toLowerCase().includes(q) ||
        doc.specialty.toLowerCase().includes(q) ||
        doc.qualifications.toLowerCase().includes(q) ||
        doc.conditionsTreated.some((c) => c.toLowerCase().includes(q));

      return matchesSpecialty && matchesSearch;
    });
  }, [selectedSpecialty, searchQuery]);

  return (
    <div className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#0B3D91]/5 text-[#0B3D91] text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
            <span>Medical Faculty Directory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B3D91] tracking-tight">
            Consult Our Specialists
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Choose from 12 experienced medical professors, surgeons, pediatricians, and lady gynaecologists. Filter by medical specialty or search by condition.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative pt-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search doctor, specialty, or condition..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-slate-50 border border-slate-200 text-sm sm:text-base text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#14B8A6] transition-colors shadow-xs"
            />
          </div>
        </div>

        {/* Specialty Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {specialties.map((spec) => {
            const isActive = selectedSpecialty === spec;
            return (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#0B3D91] text-white shadow-xs"
                    : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {spec}
              </button>
            );
          })}
        </div>

        {/* Doctor Cards Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredDoctors.map((doc) => (
              <DoctorCard key={doc.slug} doctor={doc} featured={doc.featured} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <UserCheck className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="font-bold text-base text-slate-800">No doctors match your criteria</h3>
            <p className="text-xs text-slate-500">
              Try resetting your search query or selecting &quot;All Specialists&quot;.
            </p>
            <button
              onClick={() => {
                setSelectedSpecialty("All Specialists");
                setSearchQuery("");
              }}
              className="btn-secondary px-4 py-2 rounded-lg text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Subtle Assistance Footer Strip */}
        <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-sm sm:text-base text-slate-900">
              Need assistance selecting the right specialist?
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Call our reception desk at 0300-6972295 for guidance on symptoms and doctor availability.
            </p>
          </div>
          <Link
            href="/appointment"
            className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold shrink-0"
          >
            <Calendar className="w-4 h-4" />
            <span>General Booking Form</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
