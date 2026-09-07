import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";
import { hospitalInfo } from "@/data/hospital";

export const metadata = {
  title: "Privacy Policy & Patient Confidentiality",
  description:
    "Patient data privacy, electronic medical records confidentiality, and ethical clinical standards at Malik Medical Complex."
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8 text-slate-700">
      <div className="border-b border-slate-200 pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
          Legal & Compliance
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0B3D91] mt-3">
          Patient Privacy Policy & Medical Confidentiality
        </h1>
        <p className="text-xs text-slate-500 mt-1">Last revised: September 2026</p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Patient Medical Confidentiality</h2>
          <p>
            At {hospitalInfo.name}, patient confidentiality is governed by strict biomedical ethics and the Pakistan Medical and Dental Council (PMDC) Code of Ethics. All diagnostic records, ultrasound scans, pathology findings, and consultation notes are strictly confidential and accessible exclusively to treating physicians, authorized medical staff, and the patient.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. Information We Collect</h2>
          <p>
            When booking an appointment or contacting us via our website, we collect personal contact details including your Name, Phone / WhatsApp number, Email address, and reported symptoms. This information is utilized solely to schedule consultations, deliver test notifications, and confirm appointments via automated medical notifications, SMS, or direct phone callback.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. Non-Disclosure to Third Parties</h2>
          <p>
            We do not sell, rent, commercialize, or share your medical data with commercial advertisers. Patient information is shared only with certified diagnostic laboratories (e.g., specialized pathology reference labs) or empaneled health insurance providers (such as Sehat Sahulat Program / State Life) when explicit patient consent is provided for pre-authorization.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">4. Contact Our Medical Superintendent</h2>
          <p>
            If you have questions regarding your electronic health records, request hard copies of diagnostic tests, or wish to update contact records, please contact our hospital administrator at <a href={`mailto:${hospitalInfo.email}`} className="text-teal-700 underline">{hospitalInfo.email}</a> or call {hospitalInfo.phones[0]}.
          </p>
        </section>
      </div>
    </div>
  );
}
