// components/CompareDrawer.tsx
"use client";

import { X, ArrowRightLeft, GraduationCap } from "lucide-react";
import { CollegeMetadata } from "@/lib/colleges";

interface CompareDrawerProps {
  selectedColleges: CollegeMetadata[];
  onRemove: (slug: string) => void;
  onClearAll: () => void;
  onCompare: () => void;
}

export function CompareDrawer({
  selectedColleges,
  onRemove,
  onClearAll,
  onCompare,
}: CompareDrawerProps) {
  if (selectedColleges.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 md:pb-6 animate-slide-up">
      <div className="max-w-4xl mx-auto bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-white p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Summary info */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <ArrowRightLeft className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-black text-sm uppercase tracking-wider">Compare Colleges</h4>
            <p className="text-xs text-slate-400 font-bold mt-0.5">
              {selectedColleges.length} of 4 selected
            </p>
          </div>
        </div>

        {/* Middle: Selected college chips/cards */}
        <div className="flex flex-wrap items-center justify-center gap-3 flex-grow">
          {selectedColleges.map((college) => (
            <div
              key={college.slug}
              className="flex items-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all pl-3 pr-2 py-2 rounded-2xl max-w-[200px]"
            >
              {/* College Logo/Icon */}
              <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/5 flex items-center justify-center p-1.5 flex-shrink-0">
                {college.logo ? (
                  <img src={college.logo} alt={college.name} className="w-full h-full object-contain" />
                ) : (
                  <GraduationCap className="w-4 h-4 text-blue-400" />
                )}
              </div>
              
              {/* College Name */}
              <span className="text-xs font-black truncate text-slate-200">
                {college.name}
              </span>

              {/* Remove Button */}
              <button
                onClick={() => onRemove(college.slug)}
                className="w-6 h-6 rounded-lg bg-white/5 border border-white/5 hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-400 flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {/* Empty placeholders to encourage adding more */}
          {selectedColleges.length < 2 && (
            <div className="hidden md:flex items-center justify-center border-2 border-dashed border-white/10 px-4 py-3 rounded-2xl text-xs font-black uppercase text-slate-500 tracking-widest">
              Add at least 1 more
            </div>
          )}
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={onClearAll}
            className="w-1/2 md:w-auto px-5 py-3.5 bg-white/5 border border-white/5 hover:bg-white/10 text-xs font-black uppercase tracking-widest rounded-2xl transition-all cursor-pointer text-center"
          >
            Clear All
          </button>
          
          <button
            onClick={onCompare}
            disabled={selectedColleges.length < 2}
            className="w-1/2 md:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800 disabled:text-slate-600 disabled:border-transparent text-white border border-blue-500 shadow-lg shadow-blue-500/20 disabled:shadow-none text-xs font-black uppercase tracking-widest rounded-2xl transition-all cursor-pointer text-center"
          >
            Compare Now
          </button>
        </div>

      </div>
    </div>
  );
}
