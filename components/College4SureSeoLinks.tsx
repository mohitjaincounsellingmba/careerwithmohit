"use client";

import Link from "next/link";

export function College4SureSeoLinks() {
  const cityHubs = [
    { name: "🏛️ MBA Colleges in Delhi NCR", href: "/mba-admissions-by-region/delhi-ncr" },
    { name: "🏰 MBA Colleges in Pune", href: "/mba-admissions-by-region/pune" },
    { name: "🌊 MBA Colleges in Mumbai", href: "/mba-admissions-by-region/mumbai" },
    { name: "💻 MBA Colleges in Bangalore", href: "/mba-admissions-by-region/bangalore" },
    { name: "🕌 MBA Colleges in Hyderabad", href: "/mba-admissions-by-region/hyderabad" },
    { name: "👑 MBA Colleges in Jaipur", href: "/mba-admissions-by-region/jaipur" },
    { name: "🪁 MBA Colleges in Ahmedabad", href: "/mba-admissions-by-region/ahmedabad" },
    { name: "🌉 MBA Colleges in Kolkata", href: "/mba-admissions-by-region/kolkata" },
    { name: "🏎️ MBA Colleges in Noida", href: "/colleges?location=Noida" },
    { name: "🏙️ MBA Colleges in Gurgaon", href: "/colleges?location=Gurgaon" },
  ];

  const toolsAndExams = [
    { name: "Free CAT 2026 Mock Test", href: "/cat-mock-test" },
    { name: "Free XAT 2027 Mock Test", href: "/xat-mock-test" },
    { name: "Free NMAT 2026 Practice Test", href: "/nmat-mock-test" },
    { name: "Free SNAP 2026 Mock Test", href: "/snap-mock-test" },
    { name: "Free MAT Mock Test", href: "/mat-mock-test" },
    { name: "Free GMAT Focus Practice Test", href: "/gmat-mock-test" },
    { name: "MBA Form Combo Discounts", href: "/mba-application-form-discount" },
    { name: "Interactive MBA ROI Calculator", href: "/calculator" },
    { name: "UGC Online MBA Degrees", href: "/online-degree-certification" },
    { name: "Study Abroad Admissions", href: "/abroad-education" },
  ];

  return (
    <section className="bg-[#F8FAFC] text-slate-600 py-12 border-t border-slate-200/80 text-xs">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.15em] font-extrabold text-[#0F1026] mb-4">
            Popular B-School Hubs by City
          </h3>
          <div className="flex flex-wrap gap-2">
            {cityHubs.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200/80 shadow-2xs transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200/80">
          <h3 className="font-mono text-xs uppercase tracking-[0.15em] font-extrabold text-[#0F1026] mb-4">
            Free Entrance Exam Test Engines &amp; Admissions Tools
          </h3>
          <div className="flex flex-wrap gap-2">
            {toolsAndExams.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200/80 shadow-2xs transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
