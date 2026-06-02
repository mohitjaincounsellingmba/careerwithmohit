"use client";

import { useState } from "react";
import { Target, TrendingDown, ChevronDown, ChevronUp, Info } from "lucide-react";

interface CutoffRow {
  exam: string;
  category: string;
  percentile?: string;
  score?: string;
  seats: string;
  trend: "up" | "down" | "stable";
}

const CUTOFF_DB: Record<
  string,
  { general: string; obc: string; sc: string; st: string; seats: string; trend: "up" | "down" | "stable" }
> = {
  CAT:    { general: "90-95",  obc: "80-85", sc: "70-75", st: "65-70", seats: "60%", trend: "up" },
  XAT:    { general: "88-92",  obc: "78-82", sc: "68-72", st: "63-68", seats: "20%", trend: "stable" },
  GMAT:   { general: "680-720",obc: "650-680",sc: "630-650",st: "610-630",seats: "10%", trend: "stable" },
  CMAT:   { general: "280-320",obc: "260-280",sc: "240-260",st: "220-240",seats: "30%", trend: "up" },
  MAT:    { general: "650-700",obc: "600-650",sc: "560-600",st: "540-560",seats: "25%", trend: "down" },
  ATMA:   { general: "700-750",obc: "660-700",sc: "620-660",st: "600-620",seats: "20%", trend: "stable" },
  SNAP:   { general: "85-90",  obc: "75-80", sc: "65-70", st: "60-65", seats: "15%", trend: "up" },
  NMAT:   { general: "195-210",obc: "180-195",sc: "165-180",st: "155-165",seats: "15%", trend: "stable" },
  TISSNET:{ general: "85-90",  obc: "75-80", sc: "65-70", st: "60-65", seats: "20%", trend: "up" },
  MHCET:  { general: "92-96",  obc: "85-90", sc: "78-82", st: "72-76", seats: "50%", trend: "up" },
  MICAT:  { general: "80-85",  obc: "72-78", sc: "64-70", st: "58-64", seats: "10%", trend: "stable" },
  "IPMAT":{ general: "75-85",  obc: "65-75", sc: "55-65", st: "50-60", seats: "40%", trend: "up" },
  JEE:    { general: "90-95",  obc: "80-85", sc: "70-75", st: "65-70", seats: "50%", trend: "stable" },
  "JEE MAIN":{ general: "85-92",obc:"75-82",sc:"65-72",st:"60-67",seats:"50%",trend:"stable"},
  "JEE ADVANCED":{ general:"95-99",obc:"90-95",sc:"85-90",st:"80-85",seats:"20%",trend:"up"},
  BITSAT: { general: "300-340",obc: "280-300",sc: "260-280",st: "240-260",seats: "25%", trend: "stable" },
  VITEEE: { general: "80-90",  obc: "70-80", sc: "60-70", st: "55-65", seats: "30%", trend: "up" },
  SRMJEEE:{ general: "75-85",  obc: "65-75", sc: "55-65", st: "50-60", seats: "35%", trend: "stable" },
  "Direct Admission":{ general:"Merit",obc:"Merit",sc:"Merit",st:"Merit",seats:"100%",trend:"stable"},
};

function getTrendIcon(trend: "up" | "down" | "stable") {
  if (trend === "up")   return <span className="text-emerald-500 text-[10px] font-black">▲ Rising</span>;
  if (trend === "down") return <span className="text-red-400 text-[10px] font-black">▼ Falling</span>;
  return <span className="text-slate-400 text-[10px] font-black">● Stable</span>;
}

function buildRows(exams: string[]): CutoffRow[] {
  const rows: CutoffRow[] = [];
  for (const exam of exams) {
    const key = Object.keys(CUTOFF_DB).find(
      (k) => k.toUpperCase() === exam.toUpperCase()
    ) || "Direct Admission";
    const data = CUTOFF_DB[key] || CUTOFF_DB["Direct Admission"];
    for (const cat of ["General", "OBC", "SC", "ST"]) {
      const val = cat === "General" ? data.general : cat === "OBC" ? data.obc : cat === "SC" ? data.sc : data.st;
      rows.push({
        exam: key,
        category: cat,
        percentile: val,
        seats: data.seats,
        trend: data.trend,
      });
    }
  }
  return rows;
}

export function CutoffsSection({ exams, collegeName }: { exams: string[]; collegeName: string }) {
  const [activeExam, setActiveExam] = useState(exams[0] || "CAT");
  const [showAll, setShowAll] = useState(false);

  const allRows = buildRows(exams.length > 0 ? exams : ["CAT"]);
  const filteredRows = allRows.filter(
    (r) => r.exam.toUpperCase() === activeExam.toUpperCase()
  );
  const visibleRows = showAll ? filteredRows : filteredRows.slice(0, 4);

  const examKeys = [...new Set(allRows.map((r) => r.exam))];

  return (
    <div
      id="cutoffs"
      className="bg-white rounded-[2.5rem] border border-slate-100 p-8 sm:p-10 shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center flex-shrink-0">
          <Target className="w-5 h-5 text-purple-500" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tighter italic">
          Cutoff 2024–25
        </h2>
      </div>

      {/* Notice */}
      <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-6">
        <Info className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
        <p className="text-xs font-medium text-amber-800 leading-relaxed">
          Cutoffs shown are estimated based on historical data for {collegeName}. Actual cutoffs vary by batch and seat availability. Contact admissions for official figures.
        </p>
      </div>

      {/* Exam Tabs */}
      {examKeys.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {examKeys.map((ex) => (
            <button
              key={ex}
              onClick={() => setActiveExam(ex)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                activeExam === ex
                  ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-100"
                  : "bg-white text-slate-500 border-slate-200 hover:border-purple-200"
              }`}
            >
              {ex}
            </button>
          ))}
        </div>
      )}

      {/* Cutoff Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-100">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="text-left px-5 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Exam</th>
              <th className="text-left px-5 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Category</th>
              <th className="text-left px-5 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Cutoff (Percentile / Score)</th>
              <th className="text-left px-5 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Seats %</th>
              <th className="text-left px-5 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400">Trend</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row, i) => (
              <tr
                key={i}
                className={`border-b border-slate-50 hover:bg-purple-50/40 transition-colors ${
                  i % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                }`}
              >
                <td className="px-5 py-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-[10px] font-black uppercase tracking-widest">
                    {row.exam}
                  </span>
                </td>
                <td className="px-5 py-4 text-xs font-bold text-slate-600">{row.category}</td>
                <td className="px-5 py-4">
                  <span className="text-sm font-black text-slate-900">{row.percentile}</span>
                </td>
                <td className="px-5 py-4 text-xs font-bold text-slate-500">{row.seats}</td>
                <td className="px-5 py-4">{getTrendIcon(row.trend)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show more / less */}
      {filteredRows.length > 4 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-purple-600 hover:text-purple-700 transition-colors"
        >
          {showAll ? (
            <><ChevronUp className="w-3.5 h-3.5" /> Show Less</>
          ) : (
            <><ChevronDown className="w-3.5 h-3.5" /> Show All Categories</>
          )}
        </button>
      )}

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 pt-4 border-t border-slate-50">
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          Rising – cutoff getting stricter
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
          <span className="w-2 h-2 rounded-full bg-red-400" />
          Falling – easier to qualify
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
          <span className="w-2 h-2 rounded-full bg-slate-300" />
          Stable – no significant change
        </div>
      </div>
    </div>
  );
}
