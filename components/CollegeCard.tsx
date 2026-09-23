import Link from "next/link";
import { GraduationCap, MapPin, Award, IndianRupee, Briefcase, ChevronRight, Download, CheckSquare, Square, Sparkles, CheckCircle2, AlertCircle, ExternalLink } from "lucide-react";
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
    if (score >= 95) return { label: "Safe Chance", type: "safe" };
    if (score >= 88) return { label: "Moderate Call", type: "moderate" };
    return { label: "Ambitious (Reach)", type: "ambitious" };
  } else if (isMidTier) {
    if (score >= 82) return { label: "Safe Chance", type: "safe" };
    if (score >= 72) return { label: "Moderate Call", type: "moderate" };
    return { label: "Ambitious (Reach)", type: "ambitious" };
  } else {
    if (score >= 65) return { label: "Safe Chance", type: "safe" };
    if (score >= 50) return { label: "Moderate Call", type: "moderate" };
    return { label: "Ambitious (Reach)", type: "ambitious" };
  }
}

export function CollegeCard({ 
  college,
  onCompareToggle,
  isCompared,
  onDownloadBrochure,
  userScore,
  viewMode = "grid"
}: { 
  college: CollegeMetadata;
  onCompareToggle?: (slug: string) => void;
  isCompared?: boolean;
  onDownloadBrochure?: (college: CollegeMetadata) => void;
  userScore?: number;
  viewMode?: "grid" | "list";
}) {
  // Extract initial for placeholder logo
  const initial = college.name ? college.name.charAt(0) : "C";

  // Calculate ROI ratio
  const avgNum = parseLakhs(college.avg_placement);
  const feeNum = parseLakhs(college.fees);
  const roiRatio = feeNum > 0 ? avgNum / feeNum : 0;
  const isHighRoi = roiRatio >= 1.1;

  // Prediction status if user entered exam score
  const prediction = (userScore && userScore > 0) ? getPredictionStatus(college, userScore) : null;

  // COMPACT LIST VIEW
  if (viewMode === "list") {
    return (
      <div className={`group bg-white rounded-2xl border transition-all duration-200 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs hover:shadow-md ${
        isCompared ? "border-blue-500 bg-blue-50/20 ring-1 ring-blue-500/20" : "border-slate-200/90 hover:border-blue-300"
      }`}>
        {/* Left: Logo & Info */}
        <div className="flex items-start gap-3.5 min-w-0 flex-1">
          <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-center shrink-0 overflow-hidden font-display font-black text-lg text-blue-600">
            {college.logo && !college.logo.includes('default') ? (
              <img 
                src={college.logo} 
                alt={`${college.name} logo`} 
                loading="lazy"
                decoding="async"
                width={48}
                height={48}
                className="w-full h-full object-contain p-1.5"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : (
              <span>{initial}</span>
            )}
          </div>

          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                {college.ownership}
              </span>
              <span className="bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                <Award className="w-3 h-3 text-blue-600" />
                {college.ranking || "Top Rated"}
              </span>
              {isHighRoi && (
                <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-md">
                  🔥 {roiRatio.toFixed(1)}x ROI
                </span>
              )}
              {prediction && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                  prediction.type === "safe"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : prediction.type === "moderate"
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : "bg-rose-50 text-rose-700 border-rose-200"
                }`}>
                  AI Call: {prediction.label}
                </span>
              )}
            </div>

            <Link href={`/colleges/${college.slug}`} prefetch={false} className="block group-hover:text-blue-600 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug truncate">
                {college.name}
              </h3>
            </Link>

            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                {college.location}
              </span>
              <span>•</span>
              <span>Exams: {(college.exams && college.exams.length > 0) ? college.exams.slice(0, 3).join(", ") : "Direct"}</span>
            </div>
          </div>
        </div>

        {/* Middle: Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 px-3 py-2 bg-slate-50/80 rounded-xl border border-slate-100 shrink-0 md:w-56 text-left">
          <div>
            <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">Total Fees</span>
            <span className="text-xs sm:text-sm font-bold text-slate-800 flex items-center">
              <IndianRupee className="w-3 h-3 text-slate-500 mr-0.5" />
              {college.fees}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase text-slate-400 block tracking-wider">Avg Placement</span>
            <span className="text-xs sm:text-sm font-bold text-emerald-600 block">
              {college.avg_placement}
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0 justify-between md:justify-end">
          {onCompareToggle && (
            <button
              type="button"
              onClick={() => onCompareToggle(college.slug)}
              className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-slate-100 transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
              title={isCompared ? "Remove from comparison" : "Add to comparison"}
            >
              {isCompared ? (
                <CheckSquare className="w-4 h-4 text-blue-600" />
              ) : (
                <Square className="w-4 h-4 text-slate-300" />
              )}
              <span className="hidden sm:inline">Compare</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              if (onDownloadBrochure) {
                onDownloadBrochure(college);
              } else {
                window.location.href = `/inquiry?college=${college.slug}&type=brochure`;
              }
            }}
            className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/40 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            title="Download Brochure"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Brochure</span>
          </button>

          <Link
            href={`/colleges/${college.slug}`}
            prefetch={false}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs active:scale-95 flex items-center gap-1"
          >
            <span>Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  // RICH GRID VIEW (DEFAULT)
  return (
    <div className={`group bg-white rounded-3xl border transition-all duration-300 flex flex-col h-full relative overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-0.5 ${
      isCompared ? "border-blue-500 ring-2 ring-blue-500/20" : "border-slate-200/90 hover:border-blue-300"
    }`}>
      
      {/* Top Header section: Info, logo, name */}
      <div className="p-5 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">
        {/* Logo Container */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0 overflow-hidden font-display font-black text-xl sm:text-2xl text-blue-600 shadow-2xs group-hover:border-blue-300 transition-colors">
          {college.logo && !college.logo.includes('default') ? (
            <img 
              src={college.logo} 
              alt={`${college.name} logo`} 
              loading="lazy"
              decoding="async"
              width={64}
              height={64}
              className="w-full h-full object-contain p-2"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          ) : (
            <span className="select-none">{initial}</span>
          )}
        </div>

        {/* Name and Badges */}
        <div className="flex-grow space-y-2 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {college.ownership}
            </span>
            <span className="bg-blue-50 text-blue-700 border border-blue-200/60 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Award className="w-3 h-3 text-blue-600" />
              {college.ranking || "Top Rated"}
            </span>

            {/* High ROI Badge */}
            {isHighRoi && (
              <span className="bg-amber-50 text-amber-700 border border-amber-200/80 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                🔥 {roiRatio.toFixed(1)}x ROI
              </span>
            )}
          </div>

          {/* AI Predictor Badge if active */}
          {prediction && (
            <div className="pt-0.5">
              <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
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
                <span>Predictor: {prediction.label}</span>
              </span>
            </div>
          )}

          <Link href={`/colleges/${college.slug}`} prefetch={false} className="block group/link">
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug group-hover/link:text-blue-600 transition-colors line-clamp-2">
              {college.name}
            </h3>
          </Link>

          <div className="flex items-center text-slate-500 text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5 text-slate-400 mr-1 shrink-0" />
            <span className="truncate">{college.location}</span>
          </div>
        </div>
      </div>

      {/* Highlights Grid - 4 Columns/Boxes */}
      <div className="px-5 sm:px-6 py-3.5 bg-slate-50/70 border-t border-b border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="space-y-0.5">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Course Fees</span>
          <span className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center">
            <IndianRupee className="w-3.5 h-3.5 text-slate-500 mr-0.5" />
            {college.fees}
          </span>
        </div>
        <div className="space-y-0.5 border-l border-slate-200/60 pl-3">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Avg Placement</span>
          <span className="text-xs sm:text-sm font-extrabold text-emerald-600 block">
            {college.avg_placement}
          </span>
        </div>
        <div className="space-y-0.5 border-l border-slate-200/60 pl-3">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Highest CTC</span>
          <span className="text-xs sm:text-sm font-extrabold text-slate-800 block truncate">
            {college.highest_placement || "N/A"}
          </span>
        </div>
        <div className="space-y-0.5 border-l border-slate-200/60 pl-3">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Key Exams</span>
          <span className="text-[11px] font-bold text-slate-700 truncate block" title={(college.exams || []).join(", ")}>
            {(college.exams && college.exams.length > 0) ? college.exams.slice(0, 2).join(", ") : "Direct"}
          </span>
        </div>
      </div>

      {/* Footer: Compare toggle, CTA buttons */}
      <div className="mt-auto p-4 sm:p-5 flex items-center justify-between gap-2.5 bg-white">
        {/* Compare Checkbox */}
        {onCompareToggle ? (
          <button
            type="button"
            onClick={() => onCompareToggle(college.slug)}
            className="flex items-center gap-1.5 text-slate-600 hover:text-blue-600 transition-colors text-xs font-bold select-none cursor-pointer py-1 px-1.5 rounded-lg hover:bg-slate-50"
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
          {/* Brochure Lead Button */}
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
            className="flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/50 transition-all bg-white font-bold text-xs cursor-pointer shadow-2xs"
            title="Download 2027 Brochure & Fee Report"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Brochure</span>
          </button>
          
          <Link
            href={`/colleges/${college.slug}`}
            prefetch={false}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-4 py-2 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all shadow-md shadow-blue-600/15"
          >
            <span>Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
