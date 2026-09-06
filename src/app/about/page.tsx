import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Heart,
  Users,
  Target,
  Eye,
  CheckCircle2,
  Calendar,
  PhoneCall,
  Clock
} from "lucide-react";
import { hospitalInfo } from "@/data/hospital";

export const metadata = {
  title: "About Us — History, Leadership & Mission",
  description:
    "Learn about Malik Medical Complex, founded with a vision to provide university-standard healthcare to Hujra Shah Muqeem and Depalpur. Meet our medical leadership, core values, and patient safety standards."
};

export default function AboutPage() {
  return (
    <div className="space-y-16 sm:space-y-24 py-10 sm:py-16">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3.5 py-1 rounded-full border border-teal-200">
          Our Heritage & Commitment
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#0B3D91] tracking-tight">
          Pioneering Excellence in Rural & Regional Healthcare
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Established at Malik Hospital Chowk in Hujra Shah Muqeem, Malik Medical Complex has evolved into a premier multi-specialty destination, bringing renowned professors and cutting-edge technology right to your doorstep.
        </p>
      </section>

      {/* 2. Founder & Leadership Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200/90 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-4/5 border-4 border-slate-50">
              <Image
                src="/images/founder.jpg"
                alt="Founder and Chief Patron - Malik Medical Complex"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                  Founder&apos;s Message
                </span>
                <h3 className="font-extrabold text-lg sm:text-xl text-white">
                  Compassion Before Commerce
                </h3>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-teal-700 bg-teal-50 px-3.5 py-1 rounded-full">
              <Heart className="w-3.5 h-3.5 text-teal-600" />
              <span>Our Guiding Philosophy</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#0B3D91] tracking-tight">
              &ldquo;No Patient Should Suffer Due to Geographic or Financial Barriers&rdquo;
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              For decades, families across Hujra Shah Muqeem and Depalpur faced grueling travel to Lahore or Faisalabad for basic critical medical needs — whether high-risk childbirth, pediatric emergencies, or specialized spine surgeries.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Malik Medical Complex was conceived with one unwavering mandate: to bridge this healthcare divide. By assembling top-tier medical consultants, FCPS lady gynaecologists, USA-trained spine surgeons, and attaching a 24/7 emergency unit with digital X-Ray and modern nursery, we have ensured that hospital-grade clinical interventions are accessible here in Hujra Shah Muqeem at a fair fee (Rs. 550 for general medicine).
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="block text-xl sm:text-2xl font-extrabold text-[#0B3D91]">15+ Yrs</span>
                <span className="text-xs sm:text-sm text-slate-600 font-medium">Unbroken Service</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="block text-xl sm:text-2xl font-extrabold text-[#0B3D91]">50,000+</span>
                <span className="text-xs sm:text-sm text-slate-600 font-medium">Patients Healed</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="block text-xl sm:text-2xl font-extrabold text-[#0B3D91]">24/7</span>
                <span className="text-xs sm:text-sm text-slate-600 font-medium">Emergency Care</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission, Vision & Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mission */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0B3D91] flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-xl text-[#0B3D91]">Our Mission</h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              To deliver compassionate, ethical, and clinically exceptional healthcare with transparency, round-the-clock emergency readiness, and patient dignity at the forefront of every treatment.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-xl text-[#0B3D91]">Our Vision</h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              To remain the most trusted hospital in Okara and Depalpur district, continuously integrating progressive medical technology, robotic and laser surgery, and preventive maternal-child care.
            </p>
          </div>

          {/* Core Values */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-xl text-[#0B3D91]">Our Core Values</h3>
            <ul className="text-sm sm:text-base text-slate-600 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Clinical Integrity & Transparency</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Compassionate Patient Care</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Cleanliness & Sterility Standards</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Affordable Pricing Structure</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Accreditations & Clinical Safety Standards */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-700">
              Quality Assurance
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B3D91]">
              Standards, Accreditations & Hygiene Protocols
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 text-center space-y-2">
              <Award className="w-8 h-8 text-[#0B3D91] mx-auto" />
              <h4 className="font-bold text-base text-slate-800">PMDC Licensed Faculty</h4>
              <p className="text-xs sm:text-sm text-slate-600">Every practicing consultant is registered and accredited by PMDC.</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 text-center space-y-2">
              <ShieldCheck className="w-8 h-8 text-teal-600 mx-auto" />
              <h4 className="font-bold text-base text-slate-800">Punjab Healthcare Commission</h4>
              <p className="text-xs sm:text-sm text-slate-600">Compliant with PHC service quality and biological waste disposal guidelines.</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 text-center space-y-2">
              <Heart className="w-8 h-8 text-rose-600 mx-auto" />
              <h4 className="font-bold text-base text-slate-800">Sterile Laminar Flow OT</h4>
              <p className="text-xs sm:text-sm text-slate-600">HEPA filtered operation rooms preventing post-operative infections.</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 text-center space-y-2">
              <Clock className="w-8 h-8 text-amber-600 mx-auto" />
              <h4 className="font-bold text-base text-slate-800">24/7 Quality Emergency</h4>
              <p className="text-xs sm:text-sm text-slate-600">Rapid triage response under 3 minutes for trauma, heart, and labor calls.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h3 className="text-2xl sm:text-3xl font-black text-[#0B3D91]">
          Experience Compassionate Healthcare at Malik Medical Complex
        </h3>
        <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto">
          Visit us today at Malik Hospital Chowk, Hujra Shah Muqeem, or book an appointment online with your preferred consultant.
        </p>
        <div className="flex justify-center gap-4 pt-2 flex-wrap">
          <Link
            href="/appointment"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0B3D91] to-[#14B8A6] text-white px-6 py-3.5 rounded-full text-sm sm:text-base font-bold shadow-md hover:scale-105 transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment Online</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-slate-700 border border-slate-300 px-6 py-3.5 rounded-full text-sm sm:text-base font-bold hover:bg-slate-50 transition-all"
          >
            <span>Contact Information</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
