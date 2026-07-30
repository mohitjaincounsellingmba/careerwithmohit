import Link from "next/link";
import { GraduationCap, MapPin, Award, IndianRupee, Briefcase, ChevronRight, Download, CheckSquare, Square, Star, Sparkles, Target, CheckCircle2, AlertCircle } from "lucide-react";
import { CollegeMetadata } from "@/lib/colleges";

// Helper to compute numeric Lakh value from string like "₹15.5 Lakhs" or "20 LPA"
function parseLakhs(str?: string): number {
  if (!str) return 0;
  const match = str.match(/([0-9]+(\.[0-9]+)?)/);
  return match ? parseFloat(match[1]) : 0;
}

// Compute intelligent prediction status based on exam score/percentile
function getPredictionStatus(college: CollegeMetadata, score: number): { label: string; type: "safe" | "moderate" | "ambitious" } {
  const nameLower = college.name.toLowerCase();
  const isTopTier = nameLower.includes("iim ") || nameLower.includes("iit ") || nameLower.includes("xlri") || nameLower.includes("fms") || nameLower.includes("isb");
  const isMidTier = nameLower.includes("sibm") || nameLower.includes("nmims") || nameLower.includes("mdi") || nameLower.includes("spjimr") || nameLower.includes("nit ");

  if (isTopTier) {
    if (score >= 95) return { label: "High Chance (Safe)", type: "safe" };
    if (score >= 88) return { label: "Moderate Chance", type: "moderate" };
    return { label: "Ambitious (Reach)", type: "ambitious" };
  } else if (isMidTier) {
    if (score >= 82) return { label: "High Chance (Safe)", type: "safe" };
    if (score >= 72) return { label: "Moderate Chance", type: "moderate" };
    return { label: "Ambitious (Reach)", type: "ambitious" };
  } else {
    if (score >= 65) return { label: "High Chance (Safe)", type: "safe" };
    if (score >= 50) return { label: "Moderate Chance", type: "moderate" };
    return { label: "Ambitious (Reach)", type: "ambitious" };
  }
}

export function CollegeCard({ 
  college,
  onCompareToggle,
  isCompared,
  onDownloadBrochure,
  userScore
}: { 
  college: CollegeMetadata;
  onCompareToggle?: (slug: string) => void;
  isCompared?: boolean;
  onDownloadBrochure?: (college: CollegeMetadata) => void;
  userScore?: number;
}) {
  const displayLow = college.lowest_placement || "N/A";
  
  // Extract initial for placeholder logo
  const initial = college.name ? college.name.charAt(0) : "C";

  // Calculate ROI ratio
  const avgNum = parseLakhs(college.avg_placement);
  const feeNum = parseLakhs(college.fees);
  const roiRatio = feeNum > 0 ? avgNum / feeNum : 0;
  const isHighRoi = roiRatio >= 1.1;

  // Prediction status if user entered exam score
  const prediction = (userScore && userScore > 0) ? getPredictionStatus(college, userScore) : null;

  return (
    <div className="group bg-white rounded-3xl border border-slate-100 hover:border-blue-600/30 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col h-full relative overflow-hidden">
      
      {/* Top Header section: Info, logo, name */}
      <div className="p-6 flex flex-col sm:flex-row gap-5 items-start">
        {/* Logo Container */}
        <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden font-display font-black text-2xl text-blue-600/80 relative">
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
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent pointer-events-none" />
        </div>

        {/* Name and Tags */}
        <div className="flex-grow space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              {college.ownership}
            </span>
            <span className="bg-blue-600/10 text-blue-600 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Award className="w-3 h-3" />
              {college.ranking || "Top Rated"}
            </span>

            {/* High ROI Badge */}
            {isHighRoi && (
              <span className="bg-amber-50 text-amber-700 border border-amber-200/60 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                🔥 High ROI ({roiRatio.toFixed(1)}x)
              </span>
            )}
          </div>

          {/* AI Predictor Badge if active */}
          {prediction && (
            <div className="mt-1">
              <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                prediction.type === "safe"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : prediction.type === "moderate"
                  ? "bg-amber-50 text-amber-700 border-amber-200"
                  : "bg-rose-50 text-rose-700 border-rose-200"
              }`}>
                {prediction.type === "safe" ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-3 h-3" />
                )}
                <span>AI Predictor: {prediction.label}</span>
              </span>
            </div>
          )}

          <Link href={`/colleges/${college.slug}`} prefetch={false} className="block group/link">
            <h3 className="text-xl font-bold text-slate-800 leading-snug group-hover/link:text-blue-600 transition-colors">
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
      <div className="mt-auto p-5 flex items-center justify-between gap-3">
        {/* Compare Checkbox */}
        {onCompareToggle ? (
          <button
            onClick={() => onCompareToggle(college.slug)}
            className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors text-xs font-bold select-none cursor-pointer"
          >
            {isCompared ? (
              <CheckSquare className="w-4 h-4 text-blue-600" />
            ) : (
              <Square className="w-4 h-4 text-slate-300" />
            )}
            <span>Compare</span>
          </button>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-2">
          {/* Always available Brochure Lead Magnet Button */}
          <button
            type="button"
            onClick={() => {
              if (onDownloadBrochure) {
                onDownloadBrochure(college);
              } else if (college.brochure_url && college.brochure_url !== "#") {
                window.open(college.brochure_url, "_blank", "noopener,noreferrer");
              } else {
                window.location.href = `/inquiry?college=${college.slug}&type=brochure`;
              }
            }}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-600/40 hover:bg-blue-50/50 transition-all bg-white font-bold text-xs cursor-pointer"
            title="Download 2026 Brochure & Fee Report"
          >
            <Download className="w-4 h-4 text-blue-600" />
            <span className="hidden sm:inline">Brochure</span>
          </button>
          
          <Link
            href={`/inquiry?college=${college.slug}`}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-blue-600/10 hover:shadow-lg hover:shadow-blue-600/20"
          >
            Apply Now
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
