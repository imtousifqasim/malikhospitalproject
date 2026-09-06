"use client";

import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Send, CheckCircle2, AlertCircle, Loader2, User, Phone, Mail, MessageSquare } from "lucide-react";
import { hospitalInfo } from "@/data/hospital";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

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
      if (
        publicKey &&
        publicKey !== "public_key_malik" &&
        serviceId !== "service_placeholder"
      ) {
        await emailjs.send(serviceId, templateId, templateParams, publicKey);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 700));
        console.log("Simulated EmailJS Contact Form:", templateParams);
      }
      setSubmitted(true);
    } catch (err) {
      console.warn("EmailJS error:", err);
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
          <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">
            Phone / WhatsApp *
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
            <input
              type="tel"
              placeholder="e.g. 0300-6972295"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 py-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#0B3D91] focus:outline-hidden"
              required
            />
          </div>
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
            <span>Send Message via EmailJS</span>
          </>
        )}
      </button>
    </form>
  );
}
