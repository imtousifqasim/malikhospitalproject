import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  PhoneCall,
  CreditCard,
  Building2,
  ExternalLink
} from "lucide-react";
import { insurancePartners } from "@/data/insurance";
import { hospitalInfo } from "@/data/hospital";

export const metadata = {
  title: "Insurance & Corporate Panels — Sehat Card & Private Panels",
  description:
    "Cashless hospitalization and corporate panel partners at Malik Medical Complex. State Life Sehat Sahulat Card, Jubilee, EFU, Adamjee, Pak Qatar, and claim instructions."
};

export default function InsurancePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3.5 py-1 rounded-full border border-teal-200">
          Financial Protection & Corporate Health
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#0B3D91] tracking-tight">
          Insurance Panels & Sehat Sahulat Card
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm sm:text-base leading-relaxed">
          Malik Medical Complex facilitates cashless medical treatment, surgery pre-authorizations, and corporate insurance coverage for corporate employees, armed forces welfare, and Sehat Card holders.
        </p>
      </div>

      {/* 3-Step Cashless Claim Workflow */}
      <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-black text-[#0B3D91]">
            How to Avail Cashless Treatment
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-1">
            Simple 3-step admission process at our insurance billing counter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B3D91] text-white flex items-center justify-center font-bold text-base">
              1
            </div>
            <h3 className="font-bold text-base text-slate-900">Present CNIC & Health Card</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Show your original CNIC and insurance/Sehat card at the hospital admission desk upon arrival.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-base">
              2
            </div>
            <h3 className="font-bold text-base text-slate-900">Pre-Authorization Approval</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our billing desk verifies your active policy eligibility and submits the electronic pre-approval request.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-base">
              3
            </div>
            <h3 className="font-bold text-base text-slate-900">Receive Cashless Care</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Undergo medical or surgical care seamlessly without upfront room or operation theater out-of-pocket charges.
            </p>
          </div>
        </div>
      </section>

      {/* Insurance Partners Directory */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B3D91]">
            Empaneled Insurance & Corporate Programs
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            List of private health insurance companies and public healthcare welfare programs supported.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {insurancePartners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100 block w-fit mb-1.5">
                    {partner.type}
                  </span>
                  <h3 className="font-extrabold text-lg text-[#0B3D91]">
                    {partner.name}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5" />
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {partner.description}
              </p>

              <div className="space-y-2 text-sm pt-2 border-t border-slate-100">
                <div>
                  <strong className="text-slate-800">Coverage Scope: </strong>
                  <span className="text-slate-600">{partner.coverageDetails}</span>
                </div>
                <div>
                  <strong className="text-slate-800">Claim Steps: </strong>
                  <span className="text-slate-600">{partner.claimProcess}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Desk Support: <strong>{partner.supportPhone}</strong>
                </span>
                <a
                  href={`tel:${partner.supportPhone}`}
                  className="text-xs sm:text-sm font-bold text-teal-700 hover:text-teal-900"
                >
                  Call Panel Desk &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Corporate Inquiries Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl font-bold">Are you an employer or insurance company?</h3>
          <p className="text-xs text-slate-300 max-w-lg">
            Empanel your organization or school network with Malik Medical Complex for discounted corporate healthcare, employee annual screenings, and prioritized admission.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-[#14B8A6] hover:bg-teal-500 text-white font-bold text-xs py-3 px-6 rounded-full transition-colors shrink-0"
        >
          <span>Contact Panel Coordinator</span>
        </Link>
      </div>
    </div>
  );
}
