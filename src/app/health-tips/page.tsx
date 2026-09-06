import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Clock, BookOpen, UserCheck, ChevronRight } from "lucide-react";
import { healthArticles } from "@/data/articles";

export const metadata = {
  title: "Health Tips & Medical Awareness Guides",
  description:
    "Doctor-authored medical tips on diabetes management, heart attack warning signs, child seasonal fevers, pregnancy care, and spine health from Malik Medical Complex."
};

export default function HealthTipsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3.5 py-1 rounded-full border border-teal-200">
          Preventive Care & Wellness
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#0B3D91] tracking-tight">
          Health Tips & Medical Guides
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm sm:text-base leading-relaxed">
          Reliable health insights, diet recommendations, and early symptom awareness guides written by practicing doctors at Malik Medical Complex.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {healthArticles.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="relative aspect-16/9 bg-slate-100 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#0B3D91] text-white text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                  {article.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-teal-600" />
                    {article.readTime}
                  </span>
                  <span>•</span>
                  <span>{article.date}</span>
                </div>

                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 group-hover:text-teal-700 transition-colors leading-snug">
                  {article.title}
                </h3>

                {article.urduTitle && (
                  <p className="font-urdu text-sm sm:text-base font-bold text-teal-800">
                    {article.urduTitle}
                  </p>
                )}

                <p className="text-sm text-slate-700 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>

                {/* Excerpt points */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100 text-sm text-slate-700 font-medium">
                  {article.content.slice(0, 2).map((point, idx) => (
                    <p key={idx} className="line-clamp-2">
                      &bull; {point}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-slate-700">
                {article.author}
              </span>
              <Link
                href="/appointment"
                className="text-xs sm:text-sm font-bold text-[#0B3D91] hover:text-teal-600 flex items-center gap-1"
              >
                <span>Consult Doctor</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
