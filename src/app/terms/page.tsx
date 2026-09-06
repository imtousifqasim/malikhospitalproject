import React from "react";
import Link from "next/link";
import { ShieldCheck, FileCheck } from "lucide-react";
import { hospitalInfo } from "@/data/hospital";

export const metadata = {
  title: "Terms & Conditions — Patient Rights and Clinical Care",
  description:
    "Terms of clinical treatment, appointment cancellation guidelines, emergency priority triage, and patient responsibilities at Malik Medical Complex."
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8 text-slate-700">
      <div className="border-b border-slate-200 pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
          Hospital Terms
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0B3D91] mt-3">
          Terms of Clinical Care & Patient Guidelines
        </h1>
        <p className="text-xs text-slate-500 mt-1">Effective Date: September 2026</p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Emergency Priority Triage</h2>
          <p>
            Patients arriving at {hospitalInfo.name} with acute life-threatening medical or trauma conditions (cardiac arrest, respiratory failure, trauma fractures, active hemorrhaging, or active maternal labor) will be triaged and attended immediately ahead of scheduled non-emergency consultations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">2. Online Appointments & Scheduling</h2>
          <p>
            Online appointment booking requests submitted via this website are processed during hospital OPD hours. A verbal or WhatsApp confirmation by our front desk confirms the reserved consultation token. Patients are kindly asked to arrive 15 minutes prior to their designated slot.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">3. Checkup Fees & Payment Terms</h2>
          <p>
            Checkup fees (such as Rs. 550 for General Physician consultation) and diagnostic laboratory charges are payable at the hospital registration counter. Transparent itemized invoices will be provided for all treatments and operations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">4. Patient Rights and Dignity</h2>
          <p>
            Every patient has the right to considerate, respectful care given by competent personnel. Patients have the right to complete current information concerning their diagnosis, treatment, and prognosis in terms they can reasonably understand.
          </p>
        </section>
      </div>
    </div>
  );
}
