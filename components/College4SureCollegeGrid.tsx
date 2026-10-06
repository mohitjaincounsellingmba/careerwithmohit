"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Building2, Sparkles } from "lucide-react";

interface FeaturedCollege {
  name: string;
  nirfRank: string;
  location: string;
  meta: string;
  placedRate: string;
  highestPackage: string;
  avgPackage: string;
  totalFees: string;
  slug: string;
  image: string;
  badgeColor?: string;
}

const FEATURED_COLLEGES: FeaturedCollege[] = [
  {
    name: "Indian Institute of Management Ahmedabad (IIMA)",
    nirfRank: "NIRF 1",
    location: "Ahmedabad",
    meta: "PUBLIC · EST. 1961",
    placedRate: "100%",
    highestPackage: "₹2.20 Cr",
    avgPackage: "₹35.23 LPA",
    totalFees: "₹12 L – ₹33 L",
    slug: "/colleges/iim-ahmedabad",
    image: "/images/colleges/iim-ahmedabad-campus.jpg",
    badgeColor: "bg-amber-400 text-slate-900",
  },
  {
    name: "Indian Institute of Management Bangalore (IIMB)",
    nirfRank: "NIRF 2",
    location: "Bangalore",
    meta: "PUBLIC · EST. 1973",
    placedRate: "100%",
    highestPackage: "₹1.15 Cr",
    avgPackage: "₹34.88 LPA",
    totalFees: "₹4.5 L – ₹34 L",
    slug: "/colleges/iim-bangalore",
    image: "/images/colleges/iim-bangalore-campus.jpg",
    badgeColor: "bg-amber-400 text-slate-900",
  },
  {
    name: "NMIMS School of Business Management (SBM)",
    nirfRank: "TOP 10",
    location: "Mumbai",
    meta: "PRIVATE · NAAC A++",
    placedRate: "100%",
    highestPackage: "₹67.80 LPA",
    avgPackage: "₹26.63 LPA",
    totalFees: "₹11.9 L – ₹26.5 L",
    slug: "/colleges/nmims-mumbai",
    image: "/images/colleges/nmims-mumbai-campus.jpg",
    badgeColor: "bg-orange-500 text-white",
  },
  {
    name: "SIBM Pune (Symbiosis Institute of Business Management)",
    nirfRank: "TOP 15",
    location: "Pune",
    meta: "SNAP TOP PICK · EST. 1978",
    placedRate: "100%",
    highestPackage: "₹35.20 LPA",
    avgPackage: "₹28.16 LPA",
    totalFees: "₹14 L – ₹24.2 L",
    slug: "/colleges/sibm-pune",
    image: "/images/colleges/sibm-pune-campus.jpg",
    badgeColor: "bg-purple-600 text-white",
  },
  {
    name: "FORE School of Management",
    nirfRank: "DELHI TOP",
    location: "South Delhi",
    meta: "AICTE · SAQS · EST. 1992",
    placedRate: "100%",
    highestPackage: "₹30.00 LPA",
    avgPackage: "₹16.01 LPA",
    totalFees: "₹18.98 Lakhs",
    slug: "/colleges/fore-school-delhi",
    image: "/images/colleges/fore-school-delhi-campus.jpg",
    badgeColor: "bg-blue-600 text-white",
  },
  {
    name: "Amity University Online (UGC-DEB Approved)",
    nirfRank: "QS RANKED",
    location: "Noida / Global",
    meta: "NAAC A+ · WES CANADA",
    placedRate: "100% WES",
    highestPackage: "₹18.00 LPA",
    avgPackage: "₹8.50 LPA",
    totalFees: "₹1.99 Lakhs",
    slug: "/online-degree-certification/amity-university-online",
    image: "/images/colleges/amity-university-campus.jpg",
    badgeColor: "bg-emerald-600 text-white",
  },
];

function CollegeCardImage({ college }: { college: FeaturedCollege }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#0EA5E9] flex flex-col items-center justify-center p-6 text-center text-white">
        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-2 shadow-inner border border-white/30">
          <Building2 className="w-6 h-6 text-white" />
        </div>
        <span className="font-display font-extrabold text-sm line-clamp-1">{college.name}</span>
        <span className="font-mono text-[10px] text-white/80 uppercase tracking-wider">{college.location}</span>
      </div>
    );
  }

  return (
    <img
      src={college.image}
      alt={`${college.name} campus building`}
      width={800}
      height={450}
      loading="lazy"
      decoding="async"
      onError={() => setHasError(true)}
      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
    />
  );
}

export function College4SureCollegeGrid() {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#061124]/10">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.15em] font-extrabold text-[#2563EB] flex items-center gap-2 mb-2">
              <span className="w-5 h-0.5 rounded-full bg-[#2563EB]" />
              Top Ranked B-Schools
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#061124] tracking-tight">
              Compare before you apply
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-700 max-w-2xl">
              Verified fee structures, highest/average placement packages, and accepted entrance exam cutoffs side by side.
            </p>
          </div>
          <Link
            href="/colleges/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-display font-bold text-sm transition-all shadow-[0_12px_26px_-12px_rgba(37,99,235,0.85)] hover:-translate-y-0.5 self-start sm:self-auto"
          >
            <span>Compare all colleges</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {FEATURED_COLLEGES.map((college, idx) => (
            <article
              key={idx}
              className="group rounded-[28px] bg-white border-[1.5px] border-[#061124]/10 overflow-hidden shadow-[0_18px_44px_-22px_rgba(6,17,36,0.15)] hover:shadow-[0_34px_70px_-30px_rgba(6,17,36,0.25)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image & Badges */}
              <div>
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                  <CollegeCardImage college={college} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061124]/85 via-[#061124]/15 to-transparent pointer-events-none" />

                  {/* Badges on Thumbnail */}
                  <div className="absolute left-3.5 bottom-3 right-3.5 z-10 flex items-center justify-between gap-2">
                    <span className={`font-mono text-[10px] sm:text-[11px] font-extrabold px-3 py-1 rounded-full shadow-sm tracking-wider ${college.badgeColor || 'bg-[#F59E0B] text-[#061124]'}`}>
                      {college.nirfRank}
                    </span>
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full bg-white/25 backdrop-blur-md text-white border border-white/30 flex items-center gap-1 shadow-sm">
                      <MapPin className="w-3 h-3 text-white" />
                      {college.location}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6">
                  <h3 className="font-display font-extrabold text-base sm:text-lg text-[#061124] group-hover:text-[#2563EB] transition-colors line-clamp-2 leading-snug min-h-[48px]">
                    <Link href={college.slug} className="hover:underline">
                      {college.name}
                    </Link>
                  </h3>

                  <div className="font-mono text-[11px] text-slate-600 uppercase tracking-wider mt-1.5 font-medium">
                    {college.meta}
                  </div>

                  {/* 3 Metric Columns */}
                  <div className="grid grid-cols-3 gap-2 my-4 py-3.5 border-y border-dashed border-[#061124]/12 text-center">
                    <div>
                      <b className="block font-display font-black text-sm sm:text-base text-[#10B981] leading-none">
                        {college.placedRate}
                      </b>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-slate-600 mt-1 block font-semibold">
                        Placed
                      </span>
                    </div>

                    <div className="border-x border-dashed border-[#061124]/12 px-1">
                      <b className="block font-display font-black text-sm sm:text-base text-[#2563EB] leading-none truncate">
                        {college.highestPackage}
                      </b>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-slate-600 mt-1 block font-semibold">
                        Highest
                      </span>
                    </div>

                    <div>
                      <b className="block font-display font-black text-sm sm:text-base text-[#EA580C] leading-none truncate">
                        {college.avgPackage}
                      </b>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-slate-600 mt-1 block font-semibold">
                        Average
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer: Fee & View Button */}
              <div className="px-5 pb-5 sm:px-6 sm:pb-6 flex items-center justify-between gap-3 pt-1">
                <div>
                  <span className="block font-mono text-[10px] text-slate-600 uppercase tracking-wider font-semibold">
                    Total fees
                  </span>
                  <span className="font-mono font-bold text-xs sm:text-sm text-[#061124]">
                    {college.totalFees}
                  </span>
                </div>

                <Link
                  href={college.slug}
                  aria-label={`View details and placement reports for ${college.name}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border-[1.5px] border-[#061124]/15 group-hover:border-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white text-[#061124] font-bold text-xs transition-all shadow-xs"
                >
                  <span>View</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
