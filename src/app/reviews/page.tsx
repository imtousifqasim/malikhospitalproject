import React from "react";
import Link from "next/link";
import { Star, MessageSquare, CheckCircle, ThumbsUp, Calendar } from "lucide-react";
import { doctors } from "@/data/doctors";
import TestimonialCard from "@/components/TestimonialCard";

export const metadata = {
  title: "Patient Reviews & Testimonials — Real Healing Stories",
  description:
    "Read verified patient reviews and ratings for doctors and emergency care at Malik Medical Complex, Hujra Shah Muqeem."
};

export default function ReviewsPage() {
  const allReviews = doctors.flatMap((d) =>
    d.reviews.map((r) => ({ ...r, doctorName: d.name }))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3.5 py-1 rounded-full border border-teal-200">
          Patient Satisfaction
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#0B3D91] tracking-tight">
          What Our Patients Say
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Over 50,000 patients treated across Hujra Shah Muqeem, Depalpur, and Okara. Read verified clinical experiences from families who trust Malik Medical Complex.
        </p>

        {/* Rating Score Overview Card */}
        <div className="inline-flex items-center gap-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-left">
            <span className="text-3xl sm:text-4xl font-black text-[#0B3D91] block">4.9 / 5.0</span>
            <span className="text-xs sm:text-sm text-slate-600 font-medium">Overall Hospital Satisfaction</span>
          </div>
          <div className="flex items-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400" />
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allReviews.map((rev) => (
          <TestimonialCard key={rev.id} review={rev} doctorName={rev.doctorName} />
        ))}
      </div>

      {/* Review Submission CTA */}
      <div className="bg-gradient-to-r from-blue-50 via-teal-50 to-emerald-50 rounded-3xl p-8 border border-teal-200 text-center space-y-3">
        <h3 className="text-xl sm:text-2xl font-bold text-[#0B3D91]">
          Have you recently visited Malik Medical Complex?
        </h3>
        <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
          Your feedback helps us continuously elevate our nursing care, patient hygiene, and consultation services. Share your review directly with our medical superintendent.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#0B3D91] hover:bg-[#07265C] text-white px-6 py-3 rounded-full text-xs font-bold transition-all shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Submit Patient Feedback</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
