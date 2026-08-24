"use client";

import { Calendar, Clock } from "lucide-react";

export type TimeRangeType = "24h" | "7d" | "14d" | "30d" | "3m" | "6m" | "9m" | "12m" | "all";

interface TimeRangeSelectorProps {
  selectedRange: TimeRangeType;
  onRangeChange: (range: TimeRangeType) => void;
}

export function TimeRangeSelector({ selectedRange, onRangeChange }: TimeRangeSelectorProps) {
  const options: { id: TimeRangeType; label: string }[] = [
    { id: "24h", label: "24 Hours" },
    { id: "7d", label: "7 Days" },
    { id: "14d", label: "14 Days" },
    { id: "30d", label: "30 Days" },
    { id: "3m", label: "3 Months" },
    { id: "6m", label: "6 Months" },
    { id: "9m", label: "9 Months" },
    { id: "12m", label: "12 Months" },
    { id: "all", label: "All Time" },
  ];

  return (
    <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 p-1.5 rounded-xl overflow-x-auto no-scrollbar shadow-inner font-body">
      <div className="flex items-center gap-1.5 px-2 text-xs font-semibold text-amber-400 shrink-0">
        <Clock className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Time Range:</span>
      </div>

      <div className="flex items-center gap-1">
        {options.map((opt) => {
          const isActive = selectedRange === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onRangeChange(opt.id)}
              className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
