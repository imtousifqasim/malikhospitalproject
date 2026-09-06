"use client";

import React, { useState } from "react";
import { MessageCircle, X, Send, Heart, Clock, Sparkles } from "lucide-react";
import { hospitalInfo } from "@/data/hospital";

const presetQueries = [
  "Hi, I want to book an appointment with Dr. Faraz Aslam",
  "Hi, I want to consult Spine Surgeon Prof. Dr. Abdul Qayyum",
  "Hi, I need an appointment with Child Specialist Dr. Muneeb Babar",
  "I want to inquire about Normal Delivery / C-Section package",
  "Is the 24/7 Emergency and Digital X-Ray open right now?"
];

export default function WhatsAppChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = (textToSend?: string) => {
    const finalMsg = textToSend || message || hospitalInfo.whatsappMessage;
    const cleanPhone = hospitalInfo.whatsapp.replace("+", "");
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(finalMsg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end">
      {/* Expanded Live Chat Dialog */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] sm:w-88 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-[#0B3D91] p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#14B8A6] flex items-center justify-center text-[#0B3D91] font-bold">
                    <Heart className="w-5 h-5 fill-current" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></span>
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-tight">Malik Medical Helpdesk</h4>
                  <div className="flex items-center gap-1 text-xs text-teal-200">
                    <Clock className="w-3 h-3" />
                    <span>Typically replies within 5 mins</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close WhatsApp chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-4 bg-slate-50 max-h-72 overflow-y-auto space-y-3">
            <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-slate-100 text-sm text-slate-700">
              <p className="font-bold text-[#0B3D91] mb-1">
                Assalam-o-Alaikum! 👋
              </p>
              <p>
                Welcome to Malik Medical Complex, Hujra Shah Muqeem. How can our hospital reception assist you today?
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                Quick Inquiries:
              </span>
              {presetQueries.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="w-full text-left text-xs sm:text-sm bg-white hover:bg-teal-50 text-slate-700 hover:text-[#0B3D91] p-2.5 rounded-xl border border-slate-200/80 transition-all font-medium flex items-center justify-between group cursor-pointer"
                >
                  <span className="line-clamp-1">{q}</span>
                  <Send className="w-3.5 h-3.5 text-slate-500 group-hover:text-teal-600 shrink-0 ml-1" />
                </button>
              ))}
            </div>
          </div>

          {/* Footer Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-100 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Type your question here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-slate-100 rounded-xl px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#14B8A6]"
            />
            <button
              type="submit"
              className="bg-[#25D366] hover:bg-[#20BA5A] text-white p-2.5 rounded-xl transition-all shadow-md shadow-emerald-700/20 active:scale-95 cursor-pointer"
              aria-label="Send via WhatsApp"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button with pulse-whatsapp from F:\muteeb */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat on WhatsApp with Malik Medical Complex"
        className="flex items-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 pulse-whatsapp group focus:outline-none"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white stroke-[#25D366]" />
        <div className="hidden md:flex flex-col text-left">
          <span className="text-xs uppercase font-bold tracking-wider opacity-95 leading-tight">
            Online 24/7
          </span>
          <span className="text-xs sm:text-sm font-extrabold leading-tight">
            Book on WhatsApp
          </span>
        </div>
      </button>
    </div>
  );
}
