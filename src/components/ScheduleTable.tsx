import React from "react";
import { Clock, CheckCircle, XCircle, PhoneCall, Calendar } from "lucide-react";
import { DaySchedule } from "@/data/doctors";

interface ScheduleTableProps {
  schedule: DaySchedule[];
}

export default function ScheduleTable({ schedule }: ScheduleTableProps) {
  const getStatusBadge = (status: DaySchedule["status"]) => {
    switch (status) {
      case "Available":
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">
            <CheckCircle className="w-3.5 h-3.5" />
            Available
          </span>
        );
      case "On Call":
        return (
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full">
            <PhoneCall className="w-3.5 h-3.5" />
            On Call
          </span>
        );
      case "By Appointment":
        return (
          <span className="inline-flex items-center gap-1 bg-blue-100 text-[#0B3D91] text-xs font-bold px-2.5 py-1 rounded-full">
            <Calendar className="w-3.5 h-3.5" />
            By Appointment
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-500 text-xs font-bold px-2.5 py-1 rounded-full">
            <XCircle className="w-3.5 h-3.5" />
            Off
          </span>
        );
    }
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200">
      <table className="w-full text-left text-xs sm:text-sm">
        <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase tracking-wider text-xs">
          <tr>
            <th className="py-3.5 px-4">Day</th>
            <th className="py-3.5 px-4">Consultation Hours</th>
            <th className="py-3.5 px-4">Status</th>
            <th className="py-3.5 px-4 hidden sm:table-cell">Clinic Room</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white font-medium text-slate-700">
          {schedule.map((slot, idx) => (
            <tr key={idx} className="hover:bg-teal-50/30 transition-colors">
              <td className="py-3 px-4 font-bold text-[#0B3D91]">{slot.day}</td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>{slot.time}</span>
                </div>
              </td>
              <td className="py-3 px-4">{getStatusBadge(slot.status)}</td>
              <td className="py-3 px-4 text-slate-500 hidden sm:table-cell">
                {slot.room || "Specialist OPD"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
