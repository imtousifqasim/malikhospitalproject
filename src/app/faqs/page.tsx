"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  PhoneCall,
  Calendar,
  Search,
  CheckCircle2
} from "lucide-react";
import { faqs, FAQItem } from "@/data/faqs";
import { hospitalInfo } from "@/data/hospital";

export default function FAQsPage() {
  const [openId, setOpenId] = useState<string | null>("faq-1");
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");

  const categories = ["All", "Appointments", "Emergency", "Payments & Pricing", "Diagnostics & Reports", "Maternity & Surgery"];

  const filteredFaqs = faqs.filter((f) => {
    const matchCat = selectedCat === "All" || f.category === selectedCat;
    const matchSearch =
      search === "" ||
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3.5 py-1 rounded-full border border-teal-200">
          Patient Assistance
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#0B3D91] tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm sm:text-base leading-relaxed">
          Clear answers to common questions about doctor checkups, hospital admission, 24/7 emergency response, lab reports, and payment procedures.
        </p>

        {/* Search */}
        <div className="relative pt-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search questions (e.g. appointment, emergency, fee, delivery, reports)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-sm focus:outline-hidden focus:ring-2 focus:ring-[#0B3D91]"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 justify-start sm:justify-center no-scrollbar">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCat(c)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedCat === c
                ? "bg-[#0B3D91] text-white shadow-xs"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen ? "border-teal-400 shadow-md ring-2 ring-teal-500/10" : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                aria-expanded={isOpen}
              >
                <div className="space-y-1">
                  <span className="text-xs font-extrabold uppercase text-teal-700 bg-teal-50 px-3 py-0.5 rounded-full border border-teal-100">
                    {faq.category}
                  </span>
                  <h3 className="font-extrabold text-base sm:text-lg text-[#0B3D91] leading-snug">
                    {faq.question}
                  </h3>
                  {faq.urduQuestion && (
                    <p className="font-urdu text-sm sm:text-base font-bold text-teal-800">
                      {faq.urduQuestion}
                    </p>
                  )}
                </div>
                <div className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-180 bg-teal-50 text-teal-700" : "text-slate-500"
                }`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-2 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100/80 animate-in slide-in-from-top-1">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Have Questions Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-3xl p-8 border border-teal-200 text-center space-y-4">
        <h3 className="text-xl font-extrabold text-[#0B3D91]">
          Still have questions about your hospital visit?
        </h3>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          Our helpline team is available 24/7 to clarify doctor schedules, procedure costs, or emergency bed reservations.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`tel:${hospitalInfo.emergencyPhone}`}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-full text-xs font-bold transition-colors shadow-sm"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call {hospitalInfo.emergencyPhone}</span>
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#0B3D91] border border-slate-300 hover:bg-slate-50 px-6 py-2.5 rounded-full text-xs font-bold transition-colors"
          >
            <span>Write to Front Desk</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
