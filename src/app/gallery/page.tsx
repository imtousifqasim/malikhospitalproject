"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, X, Eye, ZoomIn, Building2 } from "lucide-react";
import { galleryImages, galleryCategories, GalleryImage } from "@/data/gallery";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeModalImage, setActiveModalImage] = useState<GalleryImage | null>(null);

  const filtered = galleryImages.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3.5 py-1 rounded-full border border-teal-200">
          Hospital Infrastructure
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#0B3D91] tracking-tight">
          Hospital Facility & Technology Gallery
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm sm:text-base leading-relaxed">
          Take a virtual visual tour of our modern clinical spaces: 24/7 Emergency triage, sterile laminar-flow Operation Theaters, Children&apos;s Nursery, High-Frequency Digital X-Ray, and medical aesthetics lounges.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 justify-start sm:justify-center no-scrollbar">
        {galleryCategories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-[#0B3D91] text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveModalImage(item)}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
          >
            <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="w-10 h-10 rounded-full bg-white/90 text-slate-800 flex items-center justify-center shadow-md">
                  <ZoomIn className="w-5 h-5 text-[#0B3D91]" />
                </div>
              </div>
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-xs font-bold text-teal-800 px-3 py-1 rounded-full shadow-xs">
                {item.category}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 group-hover:text-[#0B3D91] transition-colors mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <span className="text-xs font-bold text-teal-700 pt-3 flex items-center gap-1">
                <span>View High-Res Photo</span>
                <span>&rarr;</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeModalImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveModalImage(null)}
        >
          <div
            className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalImage(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 bg-black/60 hover:bg-black text-white rounded-full flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-16/10 bg-slate-900">
              <Image
                src={activeModalImage.image}
                alt={activeModalImage.alt}
                fill
                className="object-contain"
              />
            </div>

            <div className="p-6 space-y-2 bg-white">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                {activeModalImage.category}
              </span>
              <h3 className="text-lg font-black text-[#0B3D91]">
                {activeModalImage.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activeModalImage.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
