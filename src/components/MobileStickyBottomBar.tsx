"use client";

import React from "react";
import Link from "next/link";
import { PhoneCall, Calendar, MessageCircle } from "lucide-react";
import { hospitalInfo } from "@/data/hospital";

export default function MobileStickyBottomBar() {
  return (
    <aside
      aria-label="Mobile quick action bar"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/98 backdrop-blur-md border-t border-slate-200/90 px-3 py-2.5 shadow-lg safe-area-pb"
    >
      <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto items-center">
        {/* Call Hospital */}
        <a
          href={`tel:${hospitalInfo.emergencyPhone}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 active:scale-95 transition-all text-xs font-bold"
        >
          <div className="flex items-center gap-1 mb-0.5">
            <PhoneCall className="w-3.5 h-3.5 text-red-600" />
            <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.2 rounded-xs font-black">24/7</span>
          </div>
          <span>Call Desk</span>
        </a>

        {/* WhatsApp Direct */}
        <a
          href={`https://wa.me/${hospitalInfo.whatsapp.replace("+", "")}?text=${encodeURIComponent(hospitalInfo.whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 active:scale-95 transition-all text-xs font-bold"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-600 mb-0.5" />
          <span>WhatsApp</span>
        </a>

        {/* Book Appointment CTA */}
        <Link
          href="/#book-appointment"
          className="btn-primary flex flex-col items-center justify-center py-2 px-1 rounded-xl active:scale-95 text-xs font-bold"
        >
          <Calendar className="w-3.5 h-3.5 mb-0.5" />
          <span>Book Visit</span>
        </Link>
      </div>
    </aside>
  );
}
