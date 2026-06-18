import Link from "next/link";
import { GraduationCap, MapPin, Award, IndianRupee, Download, CheckSquare, Square, ChevronRight, Sparkles } from "lucide-react";
import { CollegeMetadata } from "@/lib/colleges";

// Helper function to parse average placement salary string into a number
function parsePlacementNum(val: string): number {
  if (!val) return 0;
  // Handle strings like "₹11.1 LPA", "₹30 LPA", "11 LPA", "9.0 LPA"
  const clean = val.replace(/[₹,\s]/g, "").toLowerCase();
  const match = clean.match(/([\d.]+)\s*(?:lpa|l|k)?/);
  if (match) {
    let num = parseFloat(match[1]);
    if (clean.includes("k")) num = num / 100;
    return num;
  }
  return 0;
}

// Helper function to parse total course fees string into a number
function parseFeesNum(val: string): number {
  if (!val) return 0;
  // Handle strings like "₹14.0 Lakhs", "₹2 Lakhs", "14 Lakhs", "18.50 Lakhs"
  const clean = val.replace(/[₹,\s]/g, "").toLowerCase();
  const match = clean.match(/([\d.]+)\s*(?:lakhs|lakh|l|cr)?/);
  if (match) {
    let num = parseFloat(match[1]);
    if (clean.includes("cr")) num = num * 100;
    return num;
  }
  return 0;
}

// Calculate ROI based on Average Placement / Course Fees
function calculateRoi(avgPlacementStr: string, feesStr: string): { ratio: number; label: string } | null {
  const placement = parsePlacementNum(avgPlacementStr);
  const fees = parseFeesNum(feesStr);
  if (placement > 0 && fees > 0) {
    const ratio = placement / fees;
    if (ratio >= 2.0) {
      return { ratio, label: `🔥 ROI: ${ratio.toFixed(1)}x` };
    } else if (ratio >= 1.0) {
      return { ratio, label: `⭐ ROI: ${ratio.toFixed(1)}x` };
    } else {
      return { ratio, label: `ROI: ${ratio.toFixed(1)}x` };
    }
  }
  return null;
}

export function CollegeCard({ 
  college,
  onCompareToggle,
  isCompared
}: { 
  college: CollegeMetadata;
  onCompareToggle?: (slug: string) => void;
  isCompared?: boolean;
}) {
  const roi = calculateRoi(college.avg_placement, college.fees);
  
  // Extract initial for placeholder logo
  const initial = college.name ? college.name.charAt(0) : "C";

  // Category specific branding configurations
  const categoryConfig = {
    Management: {
      borderTop: "border-t-violet-600",
      badgeClass: "bg-violet-100 text-violet-800 border-violet-600",
      accentBg: "bg-violet-50/50"
    },
    Engineering: {
      borderTop: "border-t-blue-600",
      badgeClass: "bg-blue-100 text-blue-800 border-blue-600",
      accentBg: "bg-blue-50/50"
    },
    "UG Courses": {
      borderTop: "border-t-amber-500",
      badgeClass: "bg-amber-100 text-amber-800 border-amber-500",
      accentBg: "bg-amber-50/50"
    }
  };

  const config = categoryConfig[college.category] || categoryConfig.Management;

  return (
    <div className={`group flex flex-col h-full bg-white border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1.5 hover:translate-x-[-2px] transition-all duration-200 overflow-hidden rounded-xl ${config.borderTop} border-t-8`}>
      
      {/* Top Header section: Info, logo, name */}
      <div className="p-6 flex flex-col sm:flex-row gap-5 items-start">
        {/* Logo Container */}
        <div className="w-16 h-16 rounded-xl bg-white border-2 border-foreground flex items-center justify-center shrink-0 overflow-hidden font-display font-black text-2xl text-foreground relative shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
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
        </div>

        {/* Name and Tags */}
        <div className="flex-grow space-y-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="bg-slate-100 text-foreground text-[10px] font-black px-2.5 py-1 border-2 border-foreground rounded-md uppercase tracking-wider shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
              {college.ownership}
            </span>
            <span className="bg-accent text-foreground text-[10px] font-black px-2.5 py-1 border-2 border-foreground rounded-md uppercase tracking-wider flex items-center gap-1 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
              <Award className="w-3.5 h-3.5 stroke-[2.5px]" />
              {college.ranking || "Top Rated"}
            </span>
            {roi && (
              <span className={`text-[10px] font-black px-2.5 py-1 border-2 border-foreground rounded-md uppercase tracking-wider flex items-center gap-1 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] ${
                roi.ratio >= 2.0 
                  ? "bg-emerald-500 text-white" 
                  : roi.ratio >= 1.0 
                    ? "bg-emerald-100 text-emerald-800" 
                    : "bg-slate-50 text-slate-700"
              }`}>
                {roi.label}
              </span>
            )}
          </div>

          <Link href={`/colleges/${college.slug}`} prefetch={false} className="block group/link">
            <h3 className="text-xl font-black text-foreground leading-snug tracking-tight group-hover/link:text-primary transition-colors uppercase">
              {college.name}
            </h3>
          </Link>

          <div className="flex items-center text-slate-500 text-xs font-bold uppercase tracking-wide">
            <MapPin className="w-3.5 h-3.5 text-slate-400 mr-1 shrink-0 stroke-[2.5px]" />
            {college.location}
          </div>
        </div>
      </div>

      {/* Top Recruiters Banner (if exists) */}
      {college.top_recruiters && college.top_recruiters.length > 0 && (
        <div className="px-6 py-2 border-t-2 border-foreground bg-slate-50 flex items-center gap-2 overflow-hidden border-dashed">
          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest shrink-0">Recruiters:</span>
          <div className="flex flex-wrap gap-1.5 overflow-hidden max-h-6">
            {college.top_recruiters.slice(0, 3).map((rec, i) => (
              <span key={i} className="text-[9px] font-black bg-white text-slate-700 px-2 py-0.5 border border-slate-200">
                {rec}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Highlights Grid - 4 Cells with solid borders */}
      <div className="grid grid-cols-2 border-t-4 border-b-4 border-foreground bg-foreground gap-[4px] mt-auto">
        <div className="p-4 bg-white space-y-1">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Course Fees</span>
          <span className="text-sm font-black text-foreground flex items-center">
            <IndianRupee className="w-3.5 h-3.5 mr-0.5 stroke-[2.5px]" />
            {college.fees}
          </span>
        </div>
        <div className="p-4 bg-white space-y-1">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Avg Placement</span>
          <span className="text-sm font-black text-emerald-600 block">
            {college.avg_placement}
          </span>
        </div>
        <div className="p-4 bg-white space-y-1">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Highest Package</span>
          <span className="text-sm font-black text-foreground block">
            {college.highest_placement || "N/A"}
          </span>
        </div>
        <div className="p-4 bg-white space-y-1">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Exams Accepted</span>
          <span className="text-xs font-black text-foreground truncate block" title={(college.exams || []).join(", ")}>
            {(college.exams && college.exams.length > 0) ? college.exams.slice(0, 2).join(", ") : "Direct"}
          </span>
        </div>
      </div>

      {/* Footer: Compare toggle, CTA buttons */}
      <div className="p-5 flex items-center justify-between gap-4 bg-white">
        {/* Compare Checkbox */}
        {onCompareToggle ? (
          <button
            onClick={() => onCompareToggle(college.slug)}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors text-xs font-black select-none cursor-pointer"
          >
            {isCompared ? (
              <CheckSquare className="w-4 h-4 text-primary stroke-[2.5px]" />
            ) : (
              <Square className="w-4 h-4 text-slate-300 stroke-[2.5px]" />
            )}
            <span className="uppercase tracking-widest">Compare</span>
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
              className="p-2.5 border-2 border-foreground text-foreground hover:bg-slate-100 hover:translate-x-[1.5px] hover:translate-y-[1.5px] shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all bg-white"
              title="Download Brochure"
            >
              <Download className="w-4 h-4 stroke-[2.5px]" />
            </a>
          )}
          
          <Link
            href={`/inquiry?college=${college.slug}`}
            className="flex items-center gap-1.5 bg-accent hover:bg-white text-foreground px-5 py-2.5 rounded-none font-black text-xs uppercase tracking-widest border-2 border-foreground shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1.5px] hover:translate-y-[1.5px] transition-all"
          >
            Apply Now
            <ChevronRight className="w-4 h-4 stroke-[3px]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
