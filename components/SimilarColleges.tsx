"use client";

import Link from "next/link";
import { GraduationCap, MapPin, TrendingUp, ArrowUpRight, Star } from "lucide-react";
import { CollegeMetadata } from "@/lib/colleges";

interface Props {
  current: CollegeMetadata;
  all: CollegeMetadata[];
}

function score(a: CollegeMetadata, b: CollegeMetadata): number {
  let s = 0;
  if (a.category === b.category) s += 40;
  if (a.ownership === b.ownership) s += 20;
  // Same city
  const cityA = a.location.split(",")[0].toLowerCase();
  const cityB = b.location.split(",")[0].toLowerCase();
  if (cityA === cityB) s += 20;
  // Similar fees (within 3L)
  const feeA = parseFloat(a.fees.replace(/[^0-9.]/g, "") || "0");
  const feeB = parseFloat(b.fees.replace(/[^0-9.]/g, "") || "0");
  if (Math.abs(feeA - feeB) <= 3) s += 10;
  // Shared exams
  const sharedExams = (a.exams || []).filter((e) => (b.exams || []).includes(e));
  s += sharedExams.length * 5;
  return s;
}

export function SimilarColleges({ current, all }: Props) {
  const similar = all
    .filter((c) => c.slug !== current.slug)
    .map((c) => ({ college: c, score: score(current, c) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((x) => x.college);

  if (similar.length === 0) return null;

  return (
    <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm">
      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-5 flex items-center gap-2">
        <Star className="w-3.5 h-3.5 text-amber-400" />
        Similar Colleges
      </h4>
      <div className="space-y-3">
        {similar.map((college) => (
          <Link
            key={college.slug}
            href={`/colleges/${college.slug}`}
            prefetch={false}
            className="group flex items-start gap-3 p-3 rounded-2xl border border-transparent hover:border-blue-100 hover:bg-blue-50/40 transition-all"
          >
            {/* Icon */}
            <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-slate-100 rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-100">
              <GraduationCap className="w-5 h-5 text-blue-500" />
            </div>

            {/* Info */}
            <div className="flex-grow min-w-0">
              <p className="text-xs font-black text-slate-800 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                {college.name}
              </p>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                  <MapPin className="w-2.5 h-2.5" />
                  {college.location.split(",")[0]}
                </span>
                <span className="text-slate-200">·</span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                  <TrendingUp className="w-2.5 h-2.5" />
                  {college.avg_placement}
                </span>
              </div>
            </div>

            <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-500 transition-colors flex-shrink-0 mt-0.5" />
          </Link>
        ))}
      </div>

      <Link
        href="/colleges"
        prefetch={false}
        className="mt-4 w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-all"
      >
        View All Colleges
        <ArrowUpRight className="w-3 h-3" />
      </Link>
    </div>
  );
}
