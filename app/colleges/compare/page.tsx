// app/colleges/compare/page.tsx
import { getAllColleges } from "@/lib/colleges";
import Link from "next/link";
import { ArrowLeft, GraduationCap, MapPin, Award, IndianRupee, Trophy, Building2, BookOpen, Star, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata = {
  alternates: {
    canonical: '/colleges/compare',
  },
  title: "Compare Top Colleges side‑by‑side 2026: Fees, Placements & Ranking | CareerWithMohit",
  description: "Compare fees structure, average placement records, NIRF rankings, and cutoffs side‑by‑side for top MBA, B.Tech, and BBA colleges in India for 2026 admission.",
};

interface PageProps {
  searchParams: Promise<{ slugs?: string }>;
}

export default async function ComparePage({ searchParams }: PageProps) {
  const { slugs } = await searchParams;
  const allColleges = getAllColleges();
  
  // Parse slugs from query: ?slugs=iim-ahmedabad,iim-bangalore
  const selectedSlugs = slugs ? slugs.split(",") : [];
  const comparedColleges = allColleges.filter((c) => selectedSlugs.includes(c.slug));

  // Helper helper to format ratings / calculate winning metrics
  const getNumericalValue = (val: string) => {
    const match = val.match(/₹?([\d.]+)\s*(?:LPA|L)/i);
    return match ? parseFloat(match[1]) : 0;
  };

  const parseFees = (feesStr: string): number => {
    const cleanStr = feesStr.replace(/[₹,]/g, "").toLowerCase();
    let num = parseFloat(cleanStr);
    if (cleanStr.includes("lakh")) num *= 100000;
    return isNaN(num) ? 99999999 : num;
  };

  // Find "Winners" for visual highlight (like green badge)
  let lowestFeeCollegeSlug = "";
  let highestPlacementSlug = "";
  let highestAvgPlacementSlug = "";

  if (comparedColleges.length > 0) {
    let minFee = Infinity;
    let maxHigh = -Infinity;
    let maxAvg = -Infinity;

    comparedColleges.forEach((c) => {
      const fee = parseFees(c.fees);
      if (fee < minFee) {
        minFee = fee;
        lowestFeeCollegeSlug = c.slug;
      }

      const high = getNumericalValue(c.highest_placement || "0");
      if (high > maxHigh) {
        maxHigh = high;
        highestPlacementSlug = c.slug;
      }

      const avg = getNumericalValue(c.avg_placement || "0");
      if (avg > maxAvg) {
        maxAvg = avg;
        highestAvgPlacementSlug = c.slug;
      }
    });
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      {/* Upper Navigation & Breadcrumbs */}
      <div className="bg-white border-b border-slate-100 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <Breadcrumbs />
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mt-4 tracking-tighter italic leading-tight">
              Compare <span className="text-blue-600">Colleges</span> Side‑by‑Side
            </h1>
          </div>
          <Link
            href="/colleges"
            className="inline-flex items-center gap-2 px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-black uppercase tracking-widest transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Directory
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {comparedColleges.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl p-16 text-center max-w-3xl mx-auto mt-12 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-100 pointer-events-none" />
            <ArrowLeft className="w-16 h-16 text-slate-300 mx-auto mb-6 relative z-10" />
            <h3 className="text-2xl font-black text-slate-800 uppercase tracking-widest relative z-10">
              No Colleges Selected for Comparison
            </h3>
            <p className="text-slate-500 font-medium mt-4 relative z-10 mb-8">
              Navigate back to the directory and select up to 4 colleges to view their comprehensive breakdown side‑by‑side.
            </p>
            <Link
              href="/colleges"
              className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-slate-200"
            >
              Go Select Colleges
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden overflow-x-auto relative">
            <div className="min-w-[800px]">
              
              {/* Header Columns: Identities */}
              <div className="grid grid-cols-5 border-b border-slate-100 bg-slate-50/50">
                <div className="p-8 flex flex-col justify-center border-r border-slate-100">
                  <span className="bg-blue-50 text-blue-600 text-[10px] font-black uppercase px-3 py-1.5 rounded-full border border-blue-100/50 tracking-widest w-fit mb-4">
                    Comparison Desk
                  </span>
                  <h3 className="text-lg font-black text-slate-900 leading-tight">
                    Evaluating {comparedColleges.length} Institutes
                  </h3>
                </div>

                {/* Compared College Headers */}
                {Array.from({ length: 4 }).map((_, i) => {
                  const college = comparedColleges[i];
                  if (!college) {
                    return (
                      <div
                        key={i}
                        className="p-8 border-r border-slate-100 last:border-0 flex flex-col items-center justify-center text-center bg-slate-50/20"
                      >
                        <div className="w-14 h-14 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 mb-4">
                          <GraduationCap className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-black uppercase text-slate-400 tracking-widest">
                          Add College
                        </span>
                        <Link
                          href="/colleges"
                          className="mt-3 text-[10px] font-black uppercase text-blue-600 hover:underline"
                        >
                          + Choose
                        </Link>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={college.slug}
                      className="p-8 border-r border-slate-100 last:border-0 flex flex-col items-center text-center relative overflow-hidden bg-white group"
                    >
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center p-3 mb-4 relative z-10">
                        {college.logo ? (
                          <img src={college.logo} alt={college.name} className="w-full h-full object-contain" />
                        ) : (
                          <GraduationCap className="w-8 h-8 text-blue-400" />
                        )}
                      </div>
                      <h4 className="text-sm font-black text-slate-900 leading-snug line-clamp-2 h-10 mb-2">
                        {college.name}
                      </h4>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <MapPin className="w-3 h-3 text-blue-500" />
                        {college.location.split(",")[0]}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Row: Estd & Type */}
              <CompareRow label="Type & Ownership" icon={<Building2 className="w-4 h-4 text-indigo-500" />}>
                {comparedColleges.map((c) => (
                  <div key={c.slug} className="p-6 text-center font-bold text-xs text-slate-700 bg-white">
                    <div className="font-black text-slate-900 uppercase tracking-widest text-[9px] mb-1">
                      {c.ownership}
                    </div>
                    Established {c.established}
                  </div>
                ))}
              </CompareRow>

              {/* Row: NIRF Rankings */}
              <CompareRow label="Accreditation & Rank" icon={<Award className="w-4 h-4 text-amber-500" />}>
                {comparedColleges.map((c) => (
                  <div key={c.slug} className="p-6 text-center font-black text-xs text-slate-800 bg-white flex flex-col items-center justify-center gap-1.5">
                    <span className="flex items-center bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-100/50 text-[10px]">
                      {c.ranking}
                    </span>
                  </div>
                ))}
              </CompareRow>

              {/* Row: Fees */}
              <CompareRow label="Fee Structure" icon={<IndianRupee className="w-4 h-4 text-blue-500" />}>
                {comparedColleges.map((c) => {
                  const isWinner = c.slug === lowestFeeCollegeSlug;
                  return (
                    <div
                      key={c.slug}
                      className={`p-6 text-center transition-all ${
                        isWinner ? "bg-emerald-50/50" : "bg-white"
                      }`}
                    >
                      <div className={`text-base font-black ${isWinner ? "text-emerald-700" : "text-slate-800"}`}>
                        {c.fees}
                      </div>
                      {isWinner && (
                        <span className="inline-block mt-1 text-[8px] font-black text-emerald-600 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded uppercase tracking-widest">
                          Best ROI / Budget Friendly
                        </span>
                      )}
                    </div>
                  );
                })}
              </CompareRow>

              {/* Row: Average Placements */}
              <CompareRow label="Average Placement" icon={<Star className="w-4 h-4 text-emerald-500" />}>
                {comparedColleges.map((c) => {
                  const isWinner = c.slug === highestAvgPlacementSlug;
                  return (
                    <div
                      key={c.slug}
                      className={`p-6 text-center transition-all ${
                        isWinner ? "bg-emerald-50/50" : "bg-white"
                      }`}
                    >
                      <div className={`text-base font-black ${isWinner ? "text-emerald-700" : "text-slate-800"}`}>
                        {c.avg_placement}
                      </div>
                      {isWinner && (
                        <span className="inline-block mt-1 text-[8px] font-black text-emerald-600 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded uppercase tracking-widest">
                          Highest Avg Package
                        </span>
                      )}
                    </div>
                  );
                })}
              </CompareRow>

              {/* Row: Highest Placements */}
              <CompareRow label="Highest Placement" icon={<Trophy className="w-4 h-4 text-yellow-500" />}>
                {comparedColleges.map((c) => {
                  const isWinner = c.slug === highestPlacementSlug;
                  return (
                    <div
                      key={c.slug}
                      className={`p-6 text-center transition-all ${
                        isWinner ? "bg-emerald-50/50" : "bg-white"
                      }`}
                    >
                      <div className={`text-base font-black ${isWinner ? "text-emerald-700" : "text-slate-800"}`}>
                        {c.highest_placement}
                      </div>
                    </div>
                  );
                })}
              </CompareRow>

              {/* Row: Exams Accepted */}
              <CompareRow label="Accepted Exams" icon={<BookOpen className="w-4 h-4 text-purple-500" />}>
                {comparedColleges.map((c) => (
                  <div key={c.slug} className="p-6 text-center bg-white flex flex-wrap justify-center gap-1.5">
                    {c.exams.map((exam) => (
                      <span
                        key={exam}
                        className="px-2 py-1 bg-slate-50 border border-slate-100 text-slate-600 rounded-lg text-[9px] font-black uppercase tracking-wider"
                      >
                        {exam}
                      </span>
                    ))}
                  </div>
                ))}
              </CompareRow>

              {/* Row: Main Courses */}
              <CompareRow label="Top Offered Courses" icon={<GraduationCap className="w-4 h-4 text-rose-500" />}>
                {comparedColleges.map((c) => (
                  <div key={c.slug} className="p-6 text-center bg-white flex flex-wrap justify-center gap-1.5 max-w-[200px] mx-auto">
                    {c.courses.map((course) => (
                      <span
                        key={course}
                        className="px-2.5 py-1 bg-blue-50/50 border border-blue-100/50 text-blue-700 rounded-lg text-[9px] font-black uppercase tracking-wider"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                ))}
              </CompareRow>

              {/* Row: Action Links */}
              <div className="grid grid-cols-5 border-t border-slate-100 bg-slate-50/50 py-6 px-4">
                <div className="flex items-center justify-center font-black text-xs uppercase tracking-widest text-slate-400">
                  Ready to apply?
                </div>
                {Array.from({ length: 4 }).map((_, i) => {
                  const college = comparedColleges[i];
                  if (!college) {
                    return <div key={i} className="flex justify-center" />;
                  }

                  return (
                    <div key={college.slug} className="flex flex-col gap-2.5 px-4 justify-center">
                      <Link
                        href={`/colleges/${college.slug}`}
                        className="w-full text-center bg-slate-900 text-white font-black uppercase tracking-widest px-4 py-3.5 rounded-xl hover:bg-blue-600 transition-all text-[10px]"
                      >
                        View Profile
                      </Link>
                      <Link
                        href="/inquiry"
                        className="w-full text-center bg-white border border-slate-200 text-slate-700 font-black uppercase tracking-widest px-4 py-3 rounded-xl hover:bg-slate-50 transition-all text-[9px]"
                      >
                        Apply for Guide
                      </Link>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface CompareRowProps {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode[];
}

function CompareRow({ label, icon, children }: CompareRowProps) {
  return (
    <div className="grid grid-cols-5 border-b border-slate-100 last:border-0 items-center">
      {/* Category Header */}
      <div className="p-6 bg-slate-50/30 border-r border-slate-100 flex items-center gap-3 h-full">
        <div className="w-8 h-8 rounded-xl bg-white border border-slate-200/60 shadow-sm flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 leading-snug">
          {label}
        </span>
      </div>

      {/* College specific data rows */}
      {Array.from({ length: 4 }).map((_, i) => {
        const item = children[i];
        if (!item) {
          return (
            <div
              key={i}
              className="p-6 border-r border-slate-100 last:border-0 bg-slate-50/10 h-full flex items-center justify-center text-slate-300"
            >
              —
            </div>
          );
        }
        return (
          <div key={i} className="border-r border-slate-100 last:border-0 h-full flex flex-col justify-center">
            {item}
          </div>
        );
      })}
    </div>
  );
}
