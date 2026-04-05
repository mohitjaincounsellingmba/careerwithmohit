import Link from "next/link";
import { GraduationCap, MapPin, Award, IndianRupee, Briefcase, ChevronRight, Bookmark, TrendingUp, Building2, Zap } from "lucide-react";
import { CollegeMetadata } from "@/lib/colleges";

export function CollegeCard({ college }: { college: CollegeMetadata }) {
  // Parsing placement numbers for the meter
  const getNumericalValue = (val: string) => {
    const match = val.match(/₹?([\d.]+)\s*(?:LPA|L)/i);
    return match ? parseFloat(match[1]) : 0;
  };

  const highVal = getNumericalValue(college.highest_placement || "0");
  const avgVal = getNumericalValue(college.avg_placement || "0");
  const lowVal = getNumericalValue(college.lowest_placement || (avgVal * 0.6).toFixed(1) + " LPA");
  
  const displayLow = college.lowest_placement || (avgVal * 0.6).toFixed(1) + " LPA";

  // Calculate percentages for the meter (relative to High)
  const avgPercent = highVal > 0 ? (avgVal / highVal) * 100 : 0;
  const lowPercent = highVal > 0 ? (getNumericalValue(displayLow) / highVal) * 100 : 0;

  return (
    <div className="group bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 flex flex-col h-full relative">
      
      {/* Dynamic Badge Banner */}
      <div className="absolute top-5 right-5 z-10 flex gap-2">
        <span className="bg-slate-900/90 backdrop-blur-md text-white text-[9px] font-black uppercase px-3 py-1.5 rounded-full border border-white/10 shadow-lg tracking-widest">
          {college.category}
        </span>
      </div>

      <div className="p-8 flex flex-col flex-grow">
        {/* College Identity */}
        <div className="mb-8 pt-4">
          <Link href={`/colleges/${college.slug}`} prefetch={false} className="block group/link">
            <h3 className="text-2xl font-black text-slate-900 group-hover/link:text-blue-600 transition-colors mb-3 leading-tight tracking-tighter">
              {college.name}
            </h3>
          </Link>
          <div className="flex items-center text-slate-500 text-sm font-bold bg-slate-50 border border-slate-100 px-4 py-2 rounded-2xl w-fit">
            <MapPin className="w-4 h-4 text-blue-500 mr-2" />
            {college.location}
          </div>
        </div>

        {/* Specializations Section (Enhanced) */}
        <div className="mb-8 p-5 bg-gradient-to-br from-blue-50/50 to-white rounded-3xl border border-blue-50/50">
          <div className="flex items-center gap-2 mb-4 text-blue-600">
            <GraduationCap className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Top Programs</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {college.courses.slice(0, 4).map(course => (
              <span key={course} className="text-[10px] font-extrabold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm">
                {course}
              </span>
            ))}
            {college.courses.length > 4 && (
              <span className="text-[10px] font-bold text-slate-400 self-center ml-1">
                +{college.courses.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Placement Meter (New Segment) */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between text-slate-400">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span className="text-[10px] font-black uppercase tracking-widest">Placement Range</span>
            </div>
            <div className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              {college.highest_placement} Max
            </div>
          </div>
          
          <div className="relative h-14 bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden flex items-end px-4 pb-2">
            {/* The multi-color meter bar */}
            <div className="absolute top-2 left-4 right-4 h-2.5 bg-slate-200 rounded-full overflow-hidden flex">
              <div 
                className="h-full bg-blue-400 group-hover:bg-blue-500 transition-colors" 
                style={{ width: `${lowPercent}%` }} 
              />
              <div 
                className="h-full bg-emerald-400 group-hover:bg-emerald-500 transition-colors border-l border-white/20" 
                style={{ width: `${avgPercent - lowPercent}%` }} 
              />
              <div 
                className="h-full bg-slate-100 transition-colors" 
                style={{ width: `${100 - avgPercent}%` }} 
              />
            </div>

            {/* Metric Labels */}
            <div className="flex justify-between w-full relative -bottom-2 pb-2">
              <div className="text-center group-hover:-translate-y-1 transition-transform">
                <div className="text-[8px] font-black text-slate-400 uppercase">Min</div>
                <div className="text-[10px] font-extrabold text-slate-700 leading-none">{displayLow}</div>
              </div>
              <div className="text-center group-hover:-translate-y-1 transition-transform" style={{ marginLeft: `calc(${avgPercent}% - 60px)` }}>
                <div className="text-[8px] font-black text-blue-500 uppercase">Average</div>
                <div className="text-[10px] font-extrabold text-blue-700 leading-none">{college.avg_placement}</div>
              </div>
              <div className="text-center group-hover:-translate-y-1 transition-transform">
                <div className="text-[8px] font-black text-slate-400 uppercase">High</div>
                <div className="text-[10px] font-extrabold text-slate-700 leading-none">{college.highest_placement}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Recruiters Section */}
        {college.top_recruiters && college.top_recruiters.length > 0 ? (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3 text-slate-400">
              <Building2 className="w-3.5 h-3.5" />
              <span className="text-[9px] font-black uppercase tracking-widest">Hiring Partners</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {college.top_recruiters.map(recruiter => (
                <div key={recruiter} className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-[9px] font-bold text-slate-600 group-hover:bg-white group-hover:border-blue-100 transition-colors">
                  {recruiter}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-8">
             <div className="flex items-center gap-2 mb-3 text-slate-400 opacity-50">
              <Building2 className="w-3.5 h-3.5" />
              <span className="text-[9px] font-black uppercase tracking-widest">Top Placement Records</span>
            </div>
            <div className="h-8 flex items-center gap-2 overflow-hidden text-[9px] font-bold text-slate-400 italic">
               <Zap className="w-3 h-3 text-amber-500" />
               100% Verified Corporate Network
            </div>
          </div>
        )}

        {/* Footer & CTA */}
        <div className="mt-auto pt-6 flex items-center justify-between border-t border-slate-100">
            <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Ranking</span>
              <span className="text-[11px] font-black italic text-slate-900 flex items-center">
                <Award className="w-3.5 h-3.5 text-amber-500 mr-1.5" />
                {college.ranking}
              </span>
            </div>
            
            <div className="flex gap-2">
              <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-400 border border-slate-200 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-100 transition-all">
                <Bookmark className="w-5 h-5" />
              </button>
              <Link
                href={`/colleges/${college.slug}`}
                prefetch={false}
                className="flex items-center gap-2 bg-slate-900 text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 group/btn"
              >
                Profile 
                <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
        </div>
      </div>
    </div>
  );
}
