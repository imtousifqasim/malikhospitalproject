"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Stethoscope,
  ShieldCheck,
  Sparkles,
  MessageCircle
} from "lucide-react";
import { departments } from "@/data/departments";
import { doctors } from "@/data/doctors";
import { hospitalInfo } from "@/data/hospital";

interface AppointmentFormProps {
  initialDoctorSlug?: string;
  initialDepartmentSlug?: string;
  className?: string;
}

export default function AppointmentForm({
  initialDoctorSlug,
  initialDepartmentSlug,
  className = ""
}: AppointmentFormProps) {
  const [visitType, setVisitType] = useState("opd");
  const [selectedDepartment, setSelectedDepartment] = useState(initialDepartmentSlug || "");
  const [selectedDoctor, setSelectedDoctor] = useState(initialDoctorSlug || "");

  // Demographics
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState<"Male" | "Female" | "Child">("Male");
  const [age, setAge] = useState("");
  const [patientType, setPatientType] = useState<"New Patient" | "Existing Record">("New Patient");

  // Scheduling
  const todayStr = new Date().toISOString().split("T")[0];
  const tomorrowObj = new Date();
  tomorrowObj.setDate(tomorrowObj.getDate() + 1);
  const tomorrowStr = tomorrowObj.toISOString().split("T")[0];

  const [date, setDate] = useState(todayStr);
  const [timeSlot, setTimeSlot] = useState("Morning Shift (9:00 AM – 1:00 PM)");
  const [symptoms, setSymptoms] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [generatedToken, setGeneratedToken] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Dynamic Visit Types
  const visitTypes = [
    {
      id: "opd",
      label: "Specialist OPD",
      badge: "Routine",
      desc: "Consultant appointment"
    },
    {
      id: "urgent",
      label: "Same-Day Urgent",
      badge: "Fast Track",
      desc: "Prioritized triage"
    },
    {
      id: "pediatric",
      label: "Child & Baby Clinic",
      badge: "Pediatrics",
      desc: "Nursery / Vaccine / Child"
    },
    {
      id: "followup",
      label: "Follow-up / Reports",
      badge: "Review",
      desc: "Prior prescription review"
    }
  ];

  const quickSymptoms = [
    "Severe Back / Spine Pain",
    "High Fever & Cough",
    "Pregnancy / Gynae Check",
    "Chest Pain & Blood Pressure",
    "Stomach Acidity & Gastric",
    "Bone Fracture & Plaster",
    "Skin Rash / Allergy"
  ];

  // Filtering doctors based on selected department
  const filteredDoctors = selectedDepartment
    ? doctors.filter((doc) => {
        const dept = departments.find((d) => d.slug === selectedDepartment);
        return dept ? dept.doctorIds.includes(doc.id) : true;
      })
    : doctors;

  const currentDoctorObj = doctors.find((d) => d.slug === selectedDoctor);
  const currentDeptObj = departments.find((d) => d.slug === selectedDepartment);

  const handleDepartmentChange = (deptSlug: string) => {
    setSelectedDepartment(deptSlug);
    if (deptSlug) {
      const dept = departments.find((d) => d.slug === deptSlug);
      if (dept && dept.doctorIds.length > 0) {
        const firstDoc = doctors.find((d) => d.id === dept.doctorIds[0]);
        if (firstDoc) {
          setSelectedDoctor(firstDoc.slug);
          return;
        }
      }
    }
    setSelectedDoctor("");
  };

  const handleSymptomTagClick = (tag: string) => {
    if (!symptoms) {
      setSymptoms(tag);
    } else if (!symptoms.includes(tag)) {
      setSymptoms(`${symptoms}, ${tag}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!patientName.trim()) {
      setError("Please provide the patient full name.");
      return;
    }

    const cleanPhone = phone.replace(/[^0-9+]/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      setError("Please provide a valid Pakistani contact number (e.g. 0300-1234567).");
      return;
    }

    if (!selectedDoctor && !selectedDepartment) {
      setError("Please select either a Clinical Department or a Specialist Consultant.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const randomId = Math.floor(100 + Math.random() * 900);
      const prefix = currentDoctorObj ? currentDoctorObj.name.substring(3, 6).toUpperCase() : "MMC";
      const token = `${prefix}-${randomId}`;

      setGeneratedToken(token);
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setGeneratedToken("");
    setPatientName("");
    setPhone("");
    setAge("");
    setSymptoms("");
    setError(null);
  };

  const cleanPhone = hospitalInfo.whatsapp.replace("+", "");
  const waConfirmationMsg =
    `*Malik Medical Complex - Online Appointment Request*\n` +
    `*Token:* ${generatedToken || "Online-Web"}\n` +
    `*Patient Name:* ${patientName || "Patient"}\n` +
    `*Age/Gender:* ${age ? age + " yrs" : "N/A"} (${gender})\n` +
    `*Doctor:* ${currentDoctorObj?.name || "First Available Specialist"}\n` +
    `*Department:* ${currentDeptObj?.name || "General OPD"}\n` +
    `*Date & Slot:* ${date} - ${timeSlot}\n` +
    `*Reason / Symptoms:* ${symptoms || "Consultation"}\n\n` +
    `Please confirm my token number and estimated reporting time. Thank you!`;

  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waConfirmationMsg)}`;

  // SUBMITTED SUCCESS RECEIPT STATE
  if (submitted) {
    return (
      <div className={`bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden ${className}`}>
        {/* Receipt Header Banner */}
        <div className="bg-gradient-to-r from-[#0B3D91] to-[#072254] p-6 sm:p-8 text-white text-center relative">
          <div className="w-16 h-16 bg-[#14B8A6]/20 border-2 border-[#14B8A6] rounded-full flex items-center justify-center mx-auto mb-3 text-[#14B8A6]">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <span className="inline-block text-[11px] font-extrabold uppercase tracking-widest bg-[#14B8A6] text-white px-3 py-1 rounded-full mb-2">
            Confirmed &amp; Token Issued
          </span>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Appointment Registered Successfully
          </h3>
          <p className="text-blue-100 text-xs sm:text-sm mt-1 max-w-md mx-auto">
            Our hospital front desk has received your request. Present this digital slip at Malik Hospital Chowk reception.
          </p>
        </div>

        {/* Digital Slip Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Token Card */}
          <div className="bg-slate-50 border-2 border-dashed border-teal-600/40 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Appointment Token ID
              </span>
              <span className="text-2xl sm:text-3xl font-black text-[#0B3D91] tracking-wider">
                {generatedToken}
              </span>
              <span className="text-xs text-teal-700 block font-semibold mt-0.5">
                ● Status: Active &amp; Ready for Counter Verification
              </span>
            </div>

            <div className="text-right sm:border-slate-200 sm:border-l sm:pl-6">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Estimated Fee
              </span>
              <span className="text-lg sm:text-xl font-extrabold text-emerald-700">
                {currentDoctorObj?.feeRange || "General Checkup: Rs. 550"}
              </span>
              <span className="text-[11px] text-slate-500 block">Pay at Hospital Cashier</span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-100 space-y-1">
              <span className="text-slate-500 font-medium block">Patient Name:</span>
              <span className="font-bold text-slate-900 text-sm sm:text-base">{patientName}</span>
              <span className="text-slate-500 text-xs block">
                {gender} • {age ? `${age} Years` : ""}
              </span>
            </div>

            <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-100 space-y-1">
              <span className="text-slate-500 font-medium block">Consultant / Doctor:</span>
              <span className="font-bold text-[#0B3D91] text-sm sm:text-base">
                {currentDoctorObj ? currentDoctorObj.name : "Assigned Specialist"}
              </span>
              <span className="text-slate-600 text-xs block">
                {currentDoctorObj?.specialty || currentDeptObj?.name || "General OPD"}
              </span>
            </div>

            <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-100 space-y-1">
              <span className="text-slate-500 font-medium block">Scheduled Date &amp; Shift:</span>
              <span className="font-bold text-slate-900">{date}</span>
              <span className="text-teal-700 text-xs font-semibold block">{timeSlot}</span>
            </div>

            <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-100 space-y-1">
              <span className="text-slate-500 font-medium block">Contact &amp; Location:</span>
              <span className="font-bold text-slate-900">{phone}</span>
              <span className="text-slate-500 text-xs block">{hospitalInfo.address}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-sm shadow-md transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Send Slip on WhatsApp Front Desk</span>
            </a>

            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-colors cursor-pointer"
            >
              <span>Book Another Appointment</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE BOOKING FORM
  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden ${className}`}
    >
      {/* Form Top Branding Bar */}
      <div className="bg-gradient-to-r from-[#0B3D91] via-[#0D3880] to-[#072254] p-6 sm:p-7 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 bg-[#14B8A6]/25 border border-[#14B8A6]/40 px-3 py-1 rounded-full text-xs font-bold text-teal-200">
              <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>Online Patient Appointment Portal</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Schedule Specialist Consultation
            </h2>
            <p className="text-xs sm:text-sm text-blue-100/90">
              General Physician checkup: Rs. 550 • Fast confirmation with token number
            </p>
          </div>

          <div className="hidden sm:flex flex-col shrink-0 items-end">
            <span className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
              24/7 Desk Help
            </span>
            <a
              href={`tel:${hospitalInfo.emergencyPhone}`}
              className="text-sm font-black text-rose-300 hover:text-white transition-colors"
            >
              {hospitalInfo.emergencyPhone}
            </a>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* 1. Visit Type Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
            1. Select Consultation Category
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {visitTypes.map((v) => {
              const active = visitType === v.id;
              return (
                <button
                  type="button"
                  key={v.id}
                  onClick={() => setVisitType(v.id)}
                  className={`p-3 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                    active
                      ? "border-[#0B3D91] bg-blue-50/60 shadow-xs"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <span
                    className={`text-[10px] font-extrabold uppercase tracking-wider block ${
                      active ? "text-teal-700" : "text-slate-600"
                    }`}
                  >
                    {v.badge}
                  </span>
                  <span
                    className={`text-xs sm:text-sm font-bold block mt-0.5 ${
                      active ? "text-[#0B3D91]" : "text-slate-800"
                    }`}
                  >
                    {v.label}
                  </span>
                  <span className="text-[11px] text-slate-600 block line-clamp-1 mt-0.5">
                    {v.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Department & Doctor Selection */}
        <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-[#14B8A6]" />
              <span>2. Department &amp; Specialist Doctor</span>
            </span>
            {currentDoctorObj && (
              <span className="text-xs font-extrabold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                Fee: {currentDoctorObj.feeRange}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Clinical Department *
              </label>
              <select
                value={selectedDepartment}
                onChange={(e) => handleDepartmentChange(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D91] shadow-xs"
                required
              >
                <option value="">-- All Hospital Departments --</option>
                {departments.map((dept) => (
                  <option key={dept.slug} value={dept.slug}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Specialist Consultant *
              </label>
              <select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D91] shadow-xs"
                required
              >
                <option value="">-- Select Specialist Doctor --</option>
                {filteredDoctors.map((doc) => (
                  <option key={doc.slug} value={doc.slug}>
                    {doc.name} — {doc.specialty} ({doc.feeRange})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 3. Patient Demographics */}
        <div className="space-y-4">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            3. Patient Personal Details
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Patient Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Muhammad Aslam"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-3.5 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D91] shadow-xs"
                  required
                />
                <User className="w-4 h-4 text-slate-400 absolute top-3.5 left-3.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone / WhatsApp Number *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="e.g. 0300-1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-3.5 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D91] shadow-xs"
                  required
                />
                <Phone className="w-4 h-4 text-slate-400 absolute top-3.5 left-3.5 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Patient Gender *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["Male", "Female", "Child"] as const).map((g) => (
                  <button
                    type="button"
                    key={g}
                    onClick={() => setGender(g)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer text-center ${
                      gender === g
                        ? "bg-[#0B3D91] text-white border-[#0B3D91]"
                        : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Patient Age (Years / Months)
              </label>
              <input
                type="text"
                placeholder="e.g. 35 yrs or 6 mos"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D91] shadow-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Patient Record Type
              </label>
              <select
                value={patientType}
                onChange={(e) => setPatientType(e.target.value as any)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D91] shadow-xs"
              >
                <option value="New Patient">New Patient (First Visit)</option>
                <option value="Existing Record">Existing Patient (Hospital Card)</option>
              </select>
            </div>
          </div>
        </div>

        {/* 4. Scheduling & Time Slot */}
        <div className="space-y-3 pt-2 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              4. Preferred Date &amp; Shift Slot
            </span>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => setDate(todayStr)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  date === todayStr ? "bg-[#0B3D91] text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => setDate(tomorrowStr)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  date === tomorrowStr ? "bg-[#0B3D91] text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Tomorrow
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Consultation Date *
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  min={todayStr}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-3.5 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D91] shadow-xs"
                  required
                />
                <Calendar className="w-4 h-4 text-slate-400 absolute top-3.5 left-3.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Preferred Shift Slot *
              </label>
              <div className="relative">
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-3.5 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D91] shadow-xs"
                >
                  <option value="Morning Shift (9:00 AM – 1:00 PM)">Morning Shift (9:00 AM – 1:00 PM)</option>
                  <option value="Afternoon Shift (1:00 PM – 4:00 PM)">Afternoon Shift (1:00 PM – 4:00 PM)</option>
                  <option value="Evening Shift (4:00 PM – 8:00 PM)">Evening Shift (4:00 PM – 8:00 PM)</option>
                  <option value="Night Emergency Shift (7:00 PM – 9:00 AM)">Night Emergency Shift (7:00 PM – 9:00 AM)</option>
                </select>
                <Clock className="w-4 h-4 text-slate-400 absolute top-3.5 left-3.5 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* 5. Health Concerns / Symptoms */}
        <div className="space-y-2 pt-2 border-t border-slate-200">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            5. Symptoms / Reason for Visit
          </span>

          <div className="flex flex-wrap gap-1.5 pb-1">
            {quickSymptoms.map((chip) => (
              <button
                type="button"
                key={chip}
                onClick={() => handleSymptomTagClick(chip)}
                className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 px-2.5 py-1 rounded-lg border border-slate-200/80 transition-colors cursor-pointer"
              >
                + {chip}
              </button>
            ))}
          </div>

          <textarea
            rows={3}
            placeholder="Describe patient condition, duration of symptoms, or any prior treatments..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#0B3D91] shadow-xs"
          ></textarea>
        </div>

        {/* Trust Note */}
        <div className="flex items-start gap-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600">
          <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
          <span>
            Strict patient confidentiality. No advance payment required online. Consultation fee is settled directly at the hospital reception counter.
          </span>
        </div>

        {/* Submit Button */}
        <div className="space-y-3 pt-1">
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-[#0B3D91] hover:bg-[#072254] text-white font-extrabold text-sm sm:text-base shadow-lg transition-all active:scale-[0.98] cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Registering Appointment &amp; Generating Token...</span>
              </>
            ) : (
              <>
                <Calendar className="w-5 h-5 text-[#14B8A6]" />
                <span>Confirm &amp; Generate Appointment Token</span>
              </>
            )}
          </button>

          <div className="text-center text-xs text-slate-500">
            <span>Prefer instant WhatsApp booking? </span>
            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent("Assalam-o-Alaikum, I want to book an appointment with a specialist doctor at Malik Medical Complex.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 font-bold hover:underline inline-flex items-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5 inline fill-current" />
              <span>Chat with Receptionist on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </form>
  );
}
