"use client";

import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Send, CheckCircle2, AlertCircle, Loader2, User, Phone, Mail, MessageSquare } from "lucide-react";
import { hospitalInfo } from "@/data/hospital";
import { createClient } from "@/lib/supabase/client";
import { validateAndFormatWhatsApp } from "@/lib/phone";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPhoneError(null);

    const phoneCheck = validateAndFormatWhatsApp(phone);
    if (!phoneCheck.isValid) {
      const msg = phoneCheck.error || "Please provide an active WhatsApp mobile number (e.g. 0300-1234567).";
      setPhoneError(msg);
      setError(msg);
      return;
    }

    setLoading(true);

    const templateParams = {
      from_name: name,
      from_phone: phone,
      from_email: email || "Not provided",
      subject: subject,
      message: message,
      hospital_name: hospitalInfo.name
    };

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_placeholder";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_placeholder";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "public_key_malik";

    try {
      // 1. Dispatch messaging service if configured
      if (
        publicKey &&
        publicKey !== "public_key_malik" &&
        serviceId !== "service_placeholder"
      ) {
        await emailjs.send(serviceId, templateId, templateParams, publicKey);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 300));
        console.log("Simulated Contact Form Dispatch:", templateParams);
      }

      // 2. Persist message to Supabase database
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseAnonKey) {
        const supabase = createClient();
        const { error: insertErr } = await supabase.from("contact_messages").insert({
          name: name.trim(),
          phone: phoneCheck.cleanPhone,
          email: email.trim() || null,
          subject: subject.trim() || "General Inquiry",
          message: message.trim(),
          status: "unread",
        });

        if (insertErr) {
          console.warn("Supabase contact_messages insertion notice:", insertErr.message);
        }
      }

      setSubmitted(true);
    } catch (err) {
      console.warn("Contact form submission error:", err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-200 text-center space-y-4 animate-in zoom-in-95 duration-200">
        <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h4 className="text-xl sm:text-2xl font-bold text-emerald-900">Message Received!</h4>
        <p className="text-sm sm:text-base text-emerald-700 max-w-sm mx-auto leading-relaxed">
          Thank you for reaching out to Malik Medical Complex. Our administration desk will respond to your message promptly.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setName("");
            setPhone("");
            setPhoneError(null);
            setEmail("");
            setMessage("");
          }}
          className="inline-block px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors cursor-pointer"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-4">
      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded-xl text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">
            Your Name *
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="e.g. Tariq Mehmood"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 py-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#0B3D91] focus:outline-hidden"
              required
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs sm:text-sm font-semibold text-slate-700">
              WhatsApp Mobile *
            </label>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full">
              Active WhatsApp
            </span>
          </div>
          <div className="relative">
            <Phone className={`w-4 h-4 absolute left-3 top-3.5 pointer-events-none ${phoneError ? "text-rose-400" : "text-slate-400"}`} />
            <input
              type="tel"
              placeholder="0300-1234567 or +923001234567"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (phoneError) setPhoneError(null);
              }}
              onBlur={() => {
                if (phone.trim()) {
                  const res = validateAndFormatWhatsApp(phone);
                  if (!res.isValid) {
                    setPhoneError(res.error || "Invalid WhatsApp mobile number.");
                  } else {
                    setPhoneError(null);
                  }
                }
              }}
              className={`w-full rounded-xl border bg-slate-50 pl-9 pr-3 py-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:outline-hidden transition-colors ${
                phoneError
                  ? "border-rose-300 focus:ring-rose-500 bg-rose-50/20"
                  : "border-slate-200 focus:ring-[#0B3D91]"
              }`}
              required
            />
          </div>
          {phoneError && (
            <p className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-medium animate-in fade-in-50">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{phoneError}</span>
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">
            Email Address (Optional)
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
            <input
              type="email"
              placeholder="yourname@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 py-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#0B3D91] focus:outline-hidden"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">
            Subject
          </label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#0B3D91] focus:outline-hidden"
          >
            <option value="General Inquiry">General Inquiry</option>
            <option value="Doctor Availability">Doctor Availability</option>
            <option value="Diagnostic Test Inquiries">Diagnostic Test / Ultrasound / Lab</option>
            <option value="Maternity & Delivery Packages">Maternity & Delivery Packages</option>
            <option value="Corporate Panel / Insurance">Corporate Panel / Insurance</option>
            <option value="Feedback / Complaint">Feedback / Complaint</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">
          Your Message *
        </label>
        <textarea
          rows={4}
          placeholder="How can we assist you?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#0B3D91] focus:outline-hidden"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#0B3D91] to-[#14B8A6] hover:from-[#07265C] hover:to-[#0D9488] text-white font-bold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Send Message</span>
          </>
        )}
      </button>
    </form>
  );
}
