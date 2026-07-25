"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Building2, GraduationCap, IndianRupee, MapPin, Trophy } from "lucide-react";
import type { CollegeMetadata } from "@/lib/colleges";

function amount(value: string) {
  const match = value.match(/([\d.]+)/);
  return match ? Number(match[1]) : 0;
}

export function CollegeCompareClient({ colleges }: { colleges: CollegeMetadata[] }) {
  const searchParams = useSearchParams();
  const selectedSlugs = (searchParams.get("slugs") || "").split(",").filter(Boolean).slice(0, 4);
  const selected = colleges.filter((college) => selectedSlugs.includes(college.slug));

  if (!selected.length) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-28">
        <section className="mx-auto max-w-3xl rounded-[2.5rem] border border-slate-200 bg-white p-12 text-center shadow-xl">
          <GraduationCap className="mx-auto mb-6 h-16 w-16 text-slate-300" />
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Compare colleges side-by-side</h1>
          <p className="mt-4 text-slate-500">Choose up to four colleges from the directory to see their fees, placements, rankings, and accepted exams.</p>
          <Link href="/colleges" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 text-xs font-black uppercase tracking-widest text-white hover:bg-blue-600">
            <ArrowLeft className="h-4 w-4" /> Choose colleges
          </Link>
        </section>
      </main>
    );
  }

  const cheapest = selected.reduce((winner, college) => amount(college.fees) < amount(winner.fees) ? college : winner);
  const highestAverage = selected.reduce((winner, college) => amount(college.avg_placement) > amount(winner.avg_placement) ? college : winner);

  const rows = [
    { label: "Location", icon: MapPin, value: (college: CollegeMetadata) => college.location },
    { label: "Category", icon: Building2, value: (college: CollegeMetadata) => college.category },
    { label: "Total fees", icon: IndianRupee, value: (college: CollegeMetadata) => college.fees },
    { label: "Average placement", icon: Trophy, value: (college: CollegeMetadata) => college.avg_placement },
    { label: "Highest placement", icon: Trophy, value: (college: CollegeMetadata) => college.highest_placement || "Not listed" },
    { label: "Ranking", icon: Trophy, value: (college: CollegeMetadata) => college.ranking || "Not listed" },
    { label: "Accepted exams", icon: GraduationCap, value: (college: CollegeMetadata) => college.exams.join(", ") || "Not listed" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-28 pt-24">
      <div className="mx-auto max-w-7xl">
        <Link href="/colleges" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-blue-600"><ArrowLeft className="h-4 w-4" /> Back to directory</Link>
        <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 md:text-6xl">Compare colleges</h1>
        <p className="mt-3 text-slate-500">A side-by-side view of {selected.length} selected institute{selected.length === 1 ? "" : "s"}.</p>
        <div className="mt-10 overflow-x-auto rounded-[2rem] border border-slate-200 bg-white shadow-xl">
          <table className="min-w-[820px] w-full border-collapse text-left">
            <thead><tr className="bg-slate-900 text-white"><th className="p-6 text-xs font-black uppercase tracking-widest">Metric</th>{selected.map((college) => <th key={college.slug} className="min-w-56 p-6"><Link href={`/colleges/${college.slug}`} className="text-lg font-black hover:text-blue-300">{college.name}</Link><p className="mt-2 text-xs font-bold text-slate-300">{college.type}</p></th>)}</tr></thead>
            <tbody>{rows.map((row) => { const Icon = row.icon; return <tr key={row.label} className="border-t border-slate-100"><th className="whitespace-nowrap bg-slate-50 p-5 text-xs font-black uppercase tracking-widest text-slate-500"><span className="inline-flex items-center gap-2"><Icon className="h-4 w-4" />{row.label}</span></th>{selected.map((college) => <td key={college.slug} className="p-5 text-sm font-bold text-slate-700">{row.value(college)}{row.label === "Total fees" && college.slug === cheapest.slug && <span className="ml-2 rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-black uppercase text-emerald-700">Lowest</span>}{row.label === "Average placement" && college.slug === highestAverage.slug && <span className="ml-2 rounded-full bg-blue-100 px-2 py-1 text-[10px] font-black uppercase text-blue-700">Highest</span>}</td>)}</tr>; })}</tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
