import React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ShieldCheck,
  Building2,
  Navigation
} from "lucide-react";
import { hospitalInfo } from "@/data/hospital";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact Us & Hospital Location — Malik Hospital Chowk",
  description:
    "Contact Malik Medical Complex, Hujra Shah Muqeem. Phone numbers: 0370-6972295, 0300-6972295, 0444-860465. 24/7 Emergency, Google Maps location, and inquiry form."
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3.5 py-1 rounded-full border border-teal-200">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#0B3D91] tracking-tight">
          Contact Malik Medical Complex
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm sm:text-base leading-relaxed">
          Located centrally at Malik Hospital Chowk, Hujra Shah Muqeem. Reach us 24/7 for medical emergencies, diagnostic inquiries, or consultant scheduling.
        </p>
      </div>

      {/* Main Grid: Contact Form + Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        {/* Right Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          {/* Phone Numbers Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-extrabold text-base text-[#0B3D91] flex items-center gap-2">
              <Phone className="w-5 h-5 text-teal-600" />
              <span>Direct Hospital Phone Lines</span>
            </h3>

            <div className="space-y-2 text-sm">
              <div className="p-3 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase text-red-600 tracking-wider block">
                    24/7 Emergency Line
                  </span>
                  <a href={`tel:${hospitalInfo.emergencyPhone}`} className="text-lg font-black text-red-700">
                    {hospitalInfo.emergencyPhone}
                  </a>
                </div>
                <span className="text-xs sm:text-sm bg-red-600 text-white font-bold px-2.5 py-1 rounded-md">
                  Call Now
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase text-slate-500 tracking-wider block">
                    OPD & General Inquiries
                  </span>
                  <a href={`tel:${hospitalInfo.phones[0]}`} className="font-bold text-base text-[#0B3D91]">
                    {hospitalInfo.phones[0]}
                  </a>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase text-slate-500 tracking-wider block">
                    Landline Reception
                  </span>
                  <a href={`tel:${hospitalInfo.phones[2]}`} className="font-bold text-base text-[#0B3D91]">
                    {hospitalInfo.phones[2]}
                  </a>
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${hospitalInfo.whatsapp.replace("+", "")}?text=${encodeURIComponent(hospitalInfo.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Message on WhatsApp ({hospitalInfo.whatsapp})</span>
            </a>
          </div>

          {/* Working Hours Summary */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
            <h3 className="font-extrabold text-base sm:text-lg text-[#0B3D91] flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              <span>Working Hours Schedule</span>
            </h3>

            <div className="divide-y divide-slate-100 text-sm text-slate-600 font-medium">
              <div className="py-2.5 flex justify-between">
                <span>Emergency Unit:</span>
                <span className="font-bold text-red-600">24/7 Always Open</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span>OPD Doctor Clinics:</span>
                <span className="font-bold text-slate-800">{hospitalInfo.workingHours.opd}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span>Digital X-Ray & Lab:</span>
                <span className="font-bold text-emerald-700">{hospitalInfo.workingHours.diagnostics}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span>Hospital Pharmacy:</span>
                <span className="font-bold text-slate-800">{hospitalInfo.workingHours.pharmacy}</span>
              </div>
            </div>
          </div>

          {/* Postal Address */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-2 text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block text-base font-bold">Physical Address:</strong>
                <p className="text-slate-700 leading-relaxed mt-0.5 font-medium">{hospitalInfo.address}</p>
                <p className="text-slate-600 mt-1 font-semibold">Landmark: Malik Hospital Chowk (Main Depalpur Road)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Google Map */}
      <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-[#0B3D91]">
              Hospital Location & Driving Directions
            </h3>
            <p className="text-sm text-slate-600 font-medium">
              Easily accessible for patients coming via Okara, Depalpur, or Haveli Lakha.
            </p>
          </div>
          <a
            href="https://maps.google.com/?q=Hujra+Shah+Muqeem"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-700 bg-teal-50 px-4 py-2.5 rounded-xl border border-teal-200 hover:bg-teal-100 transition-colors"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Open in Google Maps App</span>
          </a>
        </div>

        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
          <iframe
            title="Malik Medical Complex Full Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13707.382433547846!2d73.8155!3d30.7423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391807d885a06c57%3A0xb35a0f69f2eaec61!2sHujra%20Shah%20Muqeem%2C%20Okara%2C%20Punjab!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
            width="100%"
            height="380"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
