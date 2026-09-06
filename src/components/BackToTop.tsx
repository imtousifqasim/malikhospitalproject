"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;

      // Calculate scroll progress percentage (0 to 100)
      if (scrollHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
        setScrollProgress(progress);
      }

      // Show button after scrolling down 300px
      if (scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // SVG Circle geometry for 44x44 viewBox
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-20 md:bottom-7 left-4 sm:left-6 z-40 transition-all duration-300 ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto scale-100"
          : "opacity-0 translate-y-6 pointer-events-none scale-75"
      }`}
      aria-hidden={!isVisible}
    >
      <button
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 text-[#0B3D91] hover:text-white shadow-lg hover:shadow-xl shadow-blue-950/10 transition-all duration-300 hover:scale-105 active:scale-90 focus:outline-hidden focus:ring-2 focus:ring-[#14B8A6]/50"
      >
        {/* Background hover gradient fill */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#0B3D91] to-[#14B8A6] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Circular SVG Scroll Progress Ring */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
          viewBox="0 0 44 44"
        >
          {/* Background Track Ring */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="stroke-slate-200/80 group-hover:stroke-white/20 transition-colors"
            strokeWidth="2.5"
            fill="transparent"
          />
          {/* Active Progress Ring */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="stroke-[#14B8A6] group-hover:stroke-white transition-all duration-150"
            strokeWidth="2.5"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Arrow Icon with Micro-Animation */}
        <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5" />

        {/* Floating Tooltip on Desktop Hover */}
        <span className="hidden lg:flex items-center gap-1 absolute left-full ml-3 px-2.5 py-1 bg-slate-900/90 backdrop-blur-xs text-white text-xs font-semibold rounded-lg shadow-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 -translate-x-1 transition-all duration-200">
          <span>Top</span>
          <span className="text-teal-300 font-bold">{Math.round(scrollProgress)}%</span>
        </span>
      </button>
    </div>
  );
}
