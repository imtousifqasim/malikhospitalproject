"use client";

import React from "react";
import Link from "next/link";
import {
  Heart,
  MapPin,
  Phone,
  Clock,
} from "lucide-react";
import { hospitalInfo } from "@/data/hospital";
import { departments } from "@/data/departments";

export default function Footer() {
  return (
    <footer className="bg-[#061838] text-white pt-16 pb-28 md:pb-16 border-t-4 border-[#14B8A6] relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#14B8A6]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl xl:max-w-[1360px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand Logo Lockup & Hospital Info (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4 min-w-0">
            <Link href="/" className="flex items-center gap-3 group max-w-full">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B3D91] to-[#072254] flex items-center justify-center text-white shadow-md border border-white/20 transition-all relative shrink-0">
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <div className="w-1.5 h-4.5 bg-white/95 rounded-xs"></div>
                  <div className="w-4.5 h-1.5 bg-white/95 rounded-xs absolute"></div>
                  <svg
                    className="w-5 h-5 absolute text-[#14B8A6] stroke-current"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="2 12 6 12 8 9 11 16 14 10 16 12 22 12" />
                  </svg>
                </div>
              </div>

              <span className="text-lg xl:text-xl font-bold tracking-tight text-white leading-tight">
                Malik Medical <span className="text-teal-400 font-semibold">Complex</span>
              </span>
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Providing compassionate, technology-driven healthcare to the community of Hujra Shah Muqeem and Okara district with 24/7 emergency care and expert clinical specialists.
            </p>

            <div className="inline-flex items-center gap-2 bg-red-950/40 border border-red-500/40 text-red-300 text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
              <span>24/7 Emergency &amp; Ambulance Care</span>
            </div>
          </div>

          {/* Col 2: Quick Navigation Links (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3 min-w-0">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-teal-400 border-b border-white/15 pb-2.5 inline-block w-fit">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm pt-1">
              <li>
                <Link href="/" className="text-slate-300 hover:text-white transition-colors flex items-center gap-2 font-medium py-0.5">
                  <span className="text-teal-400 text-xs shrink-0">◆</span>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-300 hover:text-white transition-colors flex items-center gap-2 font-medium py-0.5">
                  <span className="text-teal-400 text-xs shrink-0">◆</span>
                  <span>About Hospital</span>
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="text-slate-300 hover:text-white transition-colors flex items-center gap-2 font-medium py-0.5">
                  <span className="text-teal-400 text-xs shrink-0">◆</span>
                  <span>Find a Doctor</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-300 hover:text-white transition-colors flex items-center gap-2 font-medium py-0.5">
                  <span className="text-teal-400 text-xs shrink-0">◆</span>
                  <span>Services &amp; Facilities</span>
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-slate-300 hover:text-white transition-colors flex items-center gap-2 font-medium py-0.5">
                  <span className="text-teal-400 text-xs shrink-0">◆</span>
                  <span>Pricing Table</span>
                </Link>
              </li>
              <li>
                <Link href="/insurance" className="text-slate-300 hover:text-white transition-colors flex items-center gap-2 font-medium py-0.5">
                  <span className="text-teal-400 text-xs shrink-0">◆</span>
                  <span>Insurance / Sehat Card</span>
                </Link>
              </li>
              <li>
                <Link href="/#book-appointment" className="text-slate-300 hover:text-white transition-colors flex items-center gap-2 font-medium py-0.5">
                  <span className="text-teal-400 text-xs shrink-0">◆</span>
                  <span>Book Appointment</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-white transition-colors flex items-center gap-2 font-medium py-0.5">
                  <span className="text-teal-400 text-xs shrink-0">◆</span>
                  <span>Contact &amp; Map</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Featured Specialty Departments (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3 min-w-0">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-teal-400 border-b border-white/15 pb-2.5 inline-block w-fit">
              Clinical Departments
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm pt-1">
              {departments.slice(0, 6).map((dept) => (
                <li key={dept.slug}>
                  <Link
                    href={`/departments/${dept.slug}`}
                    className="text-slate-300 hover:text-white transition-colors flex items-start gap-2 font-medium py-0.5 group"
                  >
                    <span className="text-teal-400 text-xs shrink-0 mt-1">◆</span>
                    <span className="group-hover:text-teal-300 transition-colors leading-snug">
                      {dept.name}
                    </span>
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/departments"
                  className="text-teal-300 hover:text-white hover:underline font-bold text-sm inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>View All 8 Departments</span>
                  <span>&rarr;</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Location (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3 min-w-0">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-teal-400 border-b border-white/15 pb-2.5 inline-block w-fit">
              Contact &amp; Location
            </h3>

            <ul className="flex flex-col gap-4 text-sm text-slate-200 pt-1">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-1" />
                <span className="leading-relaxed text-slate-300">
                  {hospitalInfo.address}
                </span>
              </li>

              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-teal-400 shrink-0 mt-1" />
                <div className="min-w-0 flex flex-col gap-1">
                  <span className="text-xs text-red-400 font-extrabold uppercase tracking-wide">
                    24/7 Emergency Line
                  </span>
                  <a
                    href={`tel:${hospitalInfo.emergencyPhone}`}
                    className="hover:underline text-white font-black text-base block tracking-wide"
                  >
                    {hospitalInfo.emergencyPhone}
                  </a>
                  <span className="text-xs text-slate-400">
                    OPD Desk: <span className="text-slate-200 font-semibold">{hospitalInfo.phones[1]}</span>
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-teal-400 shrink-0 mt-1" />
                <div className="min-w-0 flex flex-col gap-0.5 text-slate-300">
                  <span className="font-bold text-white text-sm">Emergency &amp; Delivery: 24/7 Open</span>
                  <span className="text-xs text-slate-400">Specialist Consultations: 10:00 AM – 09:00 PM</span>
                </div>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={hospitalInfo.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-teal-500 hover:text-white flex items-center justify-center transition-all text-slate-200 border border-white/10 shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={hospitalInfo.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-teal-500 hover:text-white flex items-center justify-center transition-all text-slate-200 border border-white/10 shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={hospitalInfo.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-teal-500 hover:text-white flex items-center justify-center transition-all text-slate-200 border border-white/10 shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Clean, spacious, and elevated above mobile bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-300 font-medium text-center md:text-left">
          <p className="leading-relaxed">
            &copy; {new Date().getFullYear()} {hospitalInfo.name}. All rights reserved. | A project of Malik Group
          </p>
          <p className="flex items-center justify-center gap-2 shrink-0 text-slate-300">
            <span>Dedicated to serving humanity with excellence</span>
            <Heart className="w-4 h-4 text-red-500 fill-current shrink-0" />
          </p>
        </div>
      </div>
    </footer>
  );
}
