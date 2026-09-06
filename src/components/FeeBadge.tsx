import React from "react";
import { Tag } from "lucide-react";

interface FeeBadgeProps {
  fee: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "teal" | "neutral";
  className?: string;
  labelPrefix?: string;
}

export default function FeeBadge({
  fee,
  size = "md",
  variant = "teal",
  className = "",
  labelPrefix = "Checkup Fee:"
}: FeeBadgeProps) {
  const isConfirmed = fee.toLowerCase().includes("rs.");

  const sizeClasses = {
    sm: "text-xs px-2.5 py-0.5 gap-1.5 font-medium",
    md: "text-xs sm:text-sm px-3 py-1 gap-1.5 font-semibold",
    lg: "text-sm sm:text-base px-4 py-1.5 gap-2 font-bold"
  };

  const variantClasses = {
    teal: "bg-teal-50 text-teal-900 border border-teal-200/60",
    primary: "bg-blue-50 text-[#0B3D91] border border-blue-200/60",
    neutral: "bg-slate-100 text-slate-800 border border-slate-200/60"
  };

  return (
    <span
      className={`inline-flex items-center rounded-lg font-medium transition-all ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      <Tag className={`${size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} text-teal-600 shrink-0 opacity-80`} />
      <span className="text-slate-700 font-semibold">{labelPrefix}</span>
      <span className={isConfirmed ? "font-bold text-slate-900" : "font-bold text-slate-800"}>
        {fee}
      </span>
    </span>
  );
}
