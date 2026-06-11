import Link from "next/link";
import { GraduationCap, MapPin, Award, IndianRupee, Briefcase, ChevronRight, Download, CheckSquare, Square, Star } from "lucide-react";
import { CollegeMetadata } from "@/lib/colleges";

export function CollegeCard({ 
  college,
  onCompareToggle,
  isCompared
}: { 
  college: CollegeMetadata;
  onCompareToggle?: (slug: string) => void;
  isCompared?: boolean;
}) {
  const displayLow = college.lowest_placement || "N/A";
  
  // Extract initial for placeholder logo
  const initial = college.name ? college.name.charAt(0) : "C";

  return (
    <div className="group bg-white rounded-3xl border border-slate-100 hover:border-primary-brand/30 hover:shadow-2xl hover:shadow-primary-brand/5 transition-all duration-300 flex flex-col h-full relative overflow-hidden">
      
      {/* Top Header section: Info, logo, name */}
      <div className="p-6 flex flex-col sm:flex-row gap-5 items-start">
        {/* Logo Container */}
        <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden font-display font-black text-2xl text-primary-brand/80 relative">
          {college.logo && !college.logo.includes('default') ? (
            <img 
              src={college.logo} 
              alt={`${college.name} logo`} 
              className="w-full h-full object-contain p-2"
              onError={(e) => {
                // Fallback to initial
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          ) : (
            <span className="select-none">{initial}</span>
          )}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-brand/5 to-transparent pointer-events-none" />
        </div>

        {/* Name and Tags */}
        <div className="flex-grow space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              {college.ownership}
            </span>
            <span className="bg-primary-brand/10 text-primary-brand text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Award className="w-3 h-3" />
              {college.ranking || "Top Rated"}
            </span>
          </div>

          <Link href={`/colleges/${college.slug}`} prefetch={false} className="block group/link">
            <h3 className="text-xl font-bold text-slate-800 leading-snug group-hover/link:text-primary-brand transition-colors">
              {college.name}
            </h3>
          </Link>

          <div className="flex items-center text-slate-500 text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5 text-slate-400 mr-1.5 shrink-0" />
            {college.location}
          </div>
        </div>
      </div>

      {/* Highlights Grid - 4 Columns/Boxes */}
      <div className="px-6 py-4 bg-slate-50/50 border-t border-b border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Course Fees</span>
          <span className="text-sm font-bold text-slate-800 flex items-center">
            <IndianRupee className="w-3.5 h-3.5 text-slate-500 mr-0.5" />
            {college.fees}
          </span>
        </div>
        <div className="space-y-1 border-l border-slate-100 pl-2 sm:pl-4">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Avg Placement</span>
          <span className="text-sm font-bold text-emerald-600 block">
            {college.avg_placement}
          </span>
        </div>
        <div className="space-y-1 border-l border-slate-100 pl-2 sm:pl-4">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Highest Package</span>
          <span className="text-sm font-bold text-slate-800 block">
            {college.highest_placement || "N/A"}
          </span>
        </div>
        <div className="space-y-1 border-l border-slate-100 pl-2 sm:pl-4">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Exams Accepted</span>
          <span className="text-xs font-bold text-slate-700 truncate block" title={(college.exams || []).join(", ")}>
            {(college.exams && college.exams.length > 0) ? college.exams.slice(0, 2).join(", ") : "Direct"}
          </span>
        </div>
      </div>

      {/* Footer: Compare toggle, CTA buttons */}
      <div className="mt-auto p-5 flex items-center justify-between gap-4">
        {/* Compare Checkbox */}
        {onCompareToggle ? (
          <button
            onClick={() => onCompareToggle(college.slug)}
            className="flex items-center gap-2 text-slate-600 hover:text-primary-brand transition-colors text-xs font-bold select-none cursor-pointer"
          >
            {isCompared ? (
              <CheckSquare className="w-4 h-4 text-primary-brand" />
            ) : (
              <Square className="w-4 h-4 text-slate-300" />
            )}
            <span>Compare</span>
          </button>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-2">
          {college.brochure_url && (
            <a
              href={college.brochure_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-primary-brand hover:border-primary-brand/30 transition-all bg-white"
              title="Download Brochure"
            >
              <Download className="w-4 h-4" />
            </a>
          )}
          
          <Link
            href={`/inquiry?college=${college.slug}`}
            className="flex items-center gap-1.5 bg-primary-brand hover:bg-primary-brand/90 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-primary-brand/10 hover:shadow-lg hover:shadow-primary-brand/20"
          >
            Apply Now
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
