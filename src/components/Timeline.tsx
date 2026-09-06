import React from "react";
import { GraduationCap, Award, Building2, Briefcase } from "lucide-react";
import { CareerMilestone } from "@/data/doctors";

interface TimelineProps {
  milestones: CareerMilestone[];
}

export default function Timeline({ milestones }: TimelineProps) {
  return (
    <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-[#0B3D91] before:via-teal-500 before:to-slate-200">
      {milestones.map((item, idx) => (
        <div key={idx} className="relative group">
          {/* Timeline Dot */}
          <div className="absolute -left-[27px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-[#0B3D91] group-hover:border-[#14B8A6] group-hover:scale-125 transition-all shadow-xs"></div>

          <div className="bg-slate-50 hover:bg-teal-50/40 rounded-2xl p-4 sm:p-5 border border-slate-200/80 transition-colors">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <span className="inline-block bg-[#0B3D91] text-white text-xs font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                {item.year}
              </span>
              <span className="text-xs text-teal-800 font-semibold flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" />
                {item.institution}
              </span>
            </div>

            <h4 className="font-extrabold text-slate-900 text-base sm:text-lg mb-1">
              {item.title}
            </h4>

            <p className="text-sm text-slate-600 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
