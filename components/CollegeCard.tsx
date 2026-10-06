"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Award, MapPin, IndianRupee, Briefcase, GraduationCap, 
  Download, CheckSquare, Square, ChevronRight, Sparkles, 
  CheckCircle2, AlertCircle, Building2, PhoneCall, ExternalLink
} from "lucide-react";
import { CollegeMetadata } from "@/lib/colleges";
import { getCollegeCampusImage } from "@/lib/collegeImages";

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

// Map college categories/names to aesthetic fallback gradients
function getCardGradient(name: string, category: string): string {
  const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const gradients = [
    "from-indigo-600 to-violet-700",
    "from-purple-600 to-pink-600",
    "from-blue-600 to-cyan-700",
    "from-slate-800 to-indigo-900",
    "from-violet-700 to-purple-900",
    "from-emerald-700 to-teal-900",
    "from-rose-600 to-indigo-800"
  ];
  return gradients[hash % gradients.length];
}

export function CollegeCard({ 
  college,
  onCompareToggle,
  isCompared = false,
  onDownloadBrochure,
  onQuickApply,
  userScore,
  viewMode = "grid"
}: { 
  college: CollegeMetadata;
  onCompareToggle?: (slug: string) => void;
  isCompared?: boolean;
  onDownloadBrochure?: (college: CollegeMetadata) => void;
  onQuickApply?: (college: CollegeMetadata) => void;
  userScore?: number;
  viewMode?: "grid" | "list";
}) {
  const [campusImgError, setCampusImgError] = useState(false);

  // Extract initial / monogram for placeholder logo
  const initials = college.name
    ? college.name
        .split(" ")
        .filter(w => !["of", "and", "the", "&", "in", "for"].includes(w.toLowerCase()))
        .slice(0, 3)
        .map(w => w[0])
        .join("")
        .toUpperCase()
    : "COL";

  // Calculate ROI ratio
  const avgNum = parseLakhs(college.avg_placement);
  const feeNum = parseLakhs(college.fees);
  const roiRatio = feeNum > 0 ? avgNum / feeNum : 0;
  const isHighRoi = roiRatio >= 1.1;

  // Derive Rank label
  const rawRank = (college.ranking || "").trim();
  const isNirf = rawRank.toLowerCase().includes("nirf");
  const rankDisplay = rawRank && rawRank !== "#" ? rawRank : "Top Rated";

  // City extraction
  const city = college.location ? college.location.split(",")[0].trim() : "India";

  // Prediction status if user entered exam score
  const prediction = (userScore && userScore > 0) ? getPredictionStatus(college, userScore) : null;

  // Placeholder banner gradient
  const cardGradient = getCardGradient(college.name, college.category);

  // Campus image resolution
  const campusImage = getCollegeCampusImage(college);

  // COMPACT LIST VIEW
  if (viewMode === "list") {
    return (
      <article className={`group bg-white rounded-2xl border transition-all duration-300 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs hover:shadow-lg ${
        isCompared ? "border-violet-600 bg-violet-50/25 ring-2 ring-violet-500/20" : "border-slate-200/90 hover:border-violet-400"
      }`}>
        {/* Left: Thumbnail & Info */}
        <div className="flex items-start gap-4 min-w-0 flex-1">
          <Link 
            href={`/colleges/${college.slug}`} 
            prefetch={false}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 shadow-sm relative group-hover:scale-105 transition-transform bg-slate-100"
          >
            {!campusImgError ? (
              <img 
                src={campusImage} 
                alt={`${college.name} campus`} 
                loading="lazy"
                decoding="async"
                width={80}
                height={80}
                className="w-full h-full object-cover"
                onError={() => setCampusImgError(true)}
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${cardGradient} flex items-center justify-center font-mono font-bold text-white text-base`}>
                {initials}
              </div>
            )}
          </Link>

          <div className="min-w-0 space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="bg-slate-100 text-slate-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                {college.ownership || "Autonomous"}
              </span>
              <span className="bg-amber-100 text-amber-900 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Award className="w-3 h-3 text-amber-700" />
                {rankDisplay}
              </span>
              {isHighRoi && (
                <span className="bg-emerald-100 text-emerald-900 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                  🔥 {roiRatio.toFixed(1)}x ROI
                </span>
              )}
              {prediction && (
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                  prediction.type === "safe"
                    ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                    : prediction.type === "moderate"
                    ? "bg-amber-50 text-amber-800 border-amber-300"
                    : "bg-rose-50 text-rose-800 border-rose-300"
                }`}>
                  Predictor: {prediction.label}
                </span>
              )}
            </div>

            <Link href={`/colleges/${college.slug}`} prefetch={false} className="block group-hover:text-violet-700 transition-colors">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug truncate">
                {college.name}
              </h3>
            </Link>

            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                {city}, {college.state || "India"}
              </span>
              <span>•</span>
              <span className="font-mono text-[11px] text-slate-600">
                Exams: {(college.exams && college.exams.length > 0) ? college.exams.slice(0, 3).join(", ") : "Direct Merit"}
              </span>
            </div>
          </div>
        </div>

        {/* Middle: Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 px-3.5 py-2 bg-slate-50 rounded-xl border border-slate-100 shrink-0 md:w-56 text-left">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block tracking-wider">Fees</span>
            <span className="text-xs sm:text-sm font-mono font-bold text-slate-800 flex items-center">
              <IndianRupee className="w-3 h-3 text-slate-500 mr-0.5" />
              {college.fees}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block tracking-wider">Avg Placement</span>
            <span className="text-xs sm:text-sm font-mono font-bold text-emerald-700 block">
              {college.avg_placement || "₹8.50 LPA"}
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0 justify-between md:justify-end">
          {onCompareToggle && (
            <button
              type="button"
              onClick={() => onCompareToggle(college.slug)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                isCompared
                  ? "bg-violet-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900"
              }`}
              title={isCompared ? "Remove from comparison" : "Add to comparison"}
            >
              {isCompared ? (
                <CheckSquare className="w-3.5 h-3.5" />
              ) : (
                <Square className="w-3.5 h-3.5 text-slate-400" />
              )}
              <span className="hidden sm:inline">Compare</span>
            </button>
          )}

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
            className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:text-violet-700 hover:border-violet-300 hover:bg-violet-50/50 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            title="Download Brochure"
          >
            <Download className="w-3.5 h-3.5 text-violet-600" />
            <span className="hidden sm:inline">Brochure</span>
          </button>

          <Link
            href={`/colleges/${college.slug}`}
            prefetch={false}
            className="px-4 py-2 bg-[#14103A] hover:bg-violet-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center gap-1"
          >
            <span>View</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </article>
    );
  }

  // RICH NOTEBOOK NEON CARD (DEFAULT GRID VIEW)
  return (
    <article 
      className={`group bg-white rounded-3xl border transition-all duration-300 flex flex-col h-full relative overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 ${
        isCompared ? "border-violet-600 ring-2 ring-violet-500/25" : "border-slate-200/90 hover:border-violet-300"
      }`}
    >
      
      {/* 1. Header Banner / Authentic Campus Image Container */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900 select-none">
        {!campusImgError ? (
          <img 
            src={campusImage} 
            alt={`${college.name} campus building`} 
            loading="lazy"
            decoding="async"
            width={600}
            height={338}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            onError={() => setCampusImgError(true)}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${cardGradient} flex flex-col items-center justify-center p-4 text-center text-white`}>
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-1.5 border border-white/30">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <span className="font-display font-extrabold text-xs">{initials}</span>
          </div>
        )}

        {/* Dark gradient overlay for badge readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#061124]/90 via-[#061124]/25 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between gap-2">
          {/* Rank Badge */}
          <span className="bg-[#F59E0B] text-slate-950 font-mono font-extrabold text-[10px] sm:text-[11px] px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 tracking-wider">
            <Award className="w-3 h-3 text-slate-950" />
            {rankDisplay}
          </span>

          {/* City / Location Badge */}
          <span className="bg-black/50 backdrop-blur-md border border-white/20 text-white font-mono font-bold text-[10px] sm:text-[11px] px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
            <MapPin className="w-3 h-3 text-amber-300" />
            {city}
          </span>
        </div>

        {/* Bottom Tag on Image: Category & ROI */}
        <div className="absolute bottom-2.5 left-3.5 right-3.5 z-10 flex items-center justify-between">
          <span className="bg-white/95 backdrop-blur-xs text-slate-900 font-mono text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
            {college.category || "Higher Education"}
          </span>
          {isHighRoi && (
            <span className="bg-emerald-500 text-white font-mono text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs">
              🔥 {roiRatio.toFixed(1)}x ROI
            </span>
          )}
        </div>
      </div>

      {/* 2. Card Content Body */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* College Name */}
          <div className="space-y-1">
            <Link href={`/colleges/${college.slug}`} prefetch={false} className="block group/link">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug group-hover/link:text-violet-700 transition-colors line-clamp-2 min-h-[48px]">
                {college.name}
              </h3>
            </Link>
            
            {/* Metadata line: Type · Est. · Campus · Approvals */}
            <p className="text-[11px] font-mono text-slate-500 truncate">
              {college.ownership || "Private"} · Est. {college.established || "2000"} · {college.state || city}
            </p>
          </div>

          {/* Fee line banner */}
          <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-baseline justify-between gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Total Fees
            </span>
            <span className="text-sm font-mono font-bold text-slate-900 flex items-center">
              <IndianRupee className="w-3.5 h-3.5 text-slate-500 mr-0.5" />
              {college.fees}
            </span>
          </div>

          {/* 3-Column Metrics Grid */}
          <div className="my-3.5 py-3 border-y border-dashed border-slate-200 grid grid-cols-3 gap-2 text-center">
            <div className="space-y-0.5">
              <span className="text-xs sm:text-sm font-mono font-extrabold text-emerald-600 block truncate">
                {college.avg_placement && college.avg_placement !== "N/A" ? college.avg_placement : "95% Placed"}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                Avg Package
              </span>
            </div>

            <div className="space-y-0.5 border-x border-dashed border-slate-200 px-1">
              <span className="text-xs sm:text-sm font-mono font-extrabold text-violet-700 block truncate">
                {college.highest_placement || "₹22.0 LPA"}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                Highest
              </span>
            </div>

            <div className="space-y-0.5">
              <span className="text-xs sm:text-sm font-mono font-extrabold text-amber-600 block truncate">
                {(college.exams && college.exams.length > 0) ? college.exams[0] : "Merit"}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                Accepted Exam
              </span>
            </div>
          </div>
        </div>

        {/* 3. Card Footer Actions */}
        <div className="pt-2 flex items-center justify-between gap-2">
          {onCompareToggle && (
            <button
              type="button"
              onClick={() => onCompareToggle(college.slug)}
              className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                isCompared 
                  ? "bg-violet-600 text-white border-violet-600 shadow-xs" 
                  : "border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
              title={isCompared ? "Remove from comparison" : "Add to comparison"}
            >
              {isCompared ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-400" />}
              <span className="text-[11px] hidden sm:inline">Compare</span>
            </button>
          )}

          <div className="flex items-center gap-2 flex-1 justify-end">
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
              className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:text-violet-700 hover:border-violet-300 hover:bg-violet-50/50 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              title="Download Brochure"
            >
              <Download className="w-3.5 h-3.5 text-violet-600" />
              <span className="hidden sm:inline">Brochure</span>
            </button>

            <Link
              href={`/colleges/${college.slug}`}
              prefetch={false}
              className="px-4 py-2 bg-[#14103A] hover:bg-violet-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center gap-1"
            >
              <span>Explore</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
