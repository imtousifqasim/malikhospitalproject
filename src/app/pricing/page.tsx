"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Tag,
  Calendar,
  Search,
  HelpCircle,
  PhoneCall,
  Check,
  MessageCircle,
  Sparkles
} from "lucide-react";
import { pricingList, pricingCategories, PricingItem } from "@/data/pricing";
import { hospitalInfo } from "@/data/hospital";

export default function PricingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [search, setSearch] = useState("");

  const filteredItems = pricingList.filter((item) => {
    const matchCat = selectedCategory === "All" || item.category === selectedCategory;
    const matchSearch =
      search === "" ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.note.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const cleanPhone = hospitalInfo.whatsapp.replace("+", "");

  return (
    <div className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#0B3D91]/5 text-[#0B3D91] text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
            <span>Transparent Care Rates</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B3D91] tracking-tight">
            Hospital Pricing &amp; Checkup Fees
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Predictable, honest pricing without hidden costs. Review consultation fees, diagnostic test rates, surgical packages, and maternity costs below.
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto relative pt-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search price for X-Ray, Echo, CBC, Delivery, Doctor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-slate-50 border border-slate-200 text-sm sm:text-base text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#14B8A6] transition-colors shadow-xs"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar justify-start sm:justify-center">
          {pricingCategories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#0B3D91] text-white shadow-xs"
                    : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Pricing Cards Grid matching F:\muteeb */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => {
            const waItemMsg = `Hello Malik Medical Complex, I want to inquire about ${item.name} (${item.price}). Please share schedule & details.`;
            const waItemUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waItemMsg)}`;

            return (
              <div
                key={idx}
                className={`bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between relative shadow-sm hover:shadow-xl transition-all duration-300 ${
                  item.popular ? "border-[#14B8A6] ring-2 ring-[#14B8A6]/20" : ""
                }`}
              >
                {item.popular && (
                  <span className="absolute top-4 right-4 bg-[#0B3D91] text-teal-300 text-xs font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                    Standard Rate
                  </span>
                )}

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0B3D91] bg-[#0B3D91]/10 px-3 py-1 rounded-full inline-block mb-3">
                    {item.category}
                  </span>

                  <h3 className="font-bold text-lg sm:text-xl text-slate-900 leading-snug mb-1">
                    {item.name}
                  </h3>

                  {item.urduName && (
                    <p className="font-urdu text-sm sm:text-base font-bold text-teal-800 mb-3">
                      {item.urduName}
                    </p>
                  )}

                  {/* Price Display */}
                  <div className="my-4 p-3.5 rounded-2xl bg-[#F8FAFC] border border-slate-100 flex items-baseline justify-between">
                    <span className="text-2xl sm:text-3xl font-black text-[#0B3D91]">
                      {item.price}
                    </span>
                    {item.durationOrFrequency && (
                      <span className="text-xs sm:text-sm text-slate-500 font-semibold">
                        {item.durationOrFrequency}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {item.note}
                  </p>
                </div>

                {/* Dual CTAs matching F:\muteeb */}
                <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <Link
                    href="/appointment"
                    className="w-full bg-[#0B3D91] hover:bg-[#072254] text-white font-bold py-2.5 px-3 rounded-xl text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5 text-teal-300" />
                    <span>Book Visit</span>
                  </Link>

                  <a
                    href={waItemUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold py-2.5 px-3 rounded-xl text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>Inquire</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Policy Box */}
        <div className="bg-[#F8FAFC] rounded-3xl p-6 sm:p-8 border border-slate-200 text-sm text-slate-600 space-y-2.5">
          <h4 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-teal-600" />
            <span>Hospital Pricing Transparency Guarantee</span>
          </h4>
          <p className="leading-relaxed">
            Standard consultation fees and diagnostic charges are confirmed upfront at the hospital reception desk. No unexpected emergency surcharges are added. Itemized official receipts are generated for all inpatient, outpatient, and diagnostic services.
          </p>
        </div>
      </div>
    </div>
  );
}
