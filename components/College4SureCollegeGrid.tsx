"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Building2, Star, ShieldCheck } from "lucide-react";

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
}

const FEATURED_COLLEGES: FeaturedCollege[] = [
  {
    name: "Indian Institute Of Management Ahmedabad (IIMA)",
    nirfRank: "NIRF 1",
    location: "Ahmedabad",
    meta: "PUBLIC · EST. 1961",
    placedRate: "100%",
    highestPackage: "₹2.20 Cr",
    avgPackage: "₹35.23 LPA",
    totalFees: "₹12 L – ₹33 L",
    slug: "/top-tier-mba-colleges",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80",
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
    slug: "/top-tier-mba-colleges",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80",
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
    slug: "/colleges",
    image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&auto=format&fit=crop&q=80",
  },
  {
    name: "SIBM Pune (Symbiosis Institute of Business Mgmt)",
    nirfRank: "TOP 15",
    location: "Pune",
    meta: "SNAP TOP PICK · EST. 1978",
    placedRate: "100%",
    highestPackage: "₹35.20 LPA",
    avgPackage: "₹28.16 LPA",
    totalFees: "₹14 L – ₹24.2 L",
    slug: "/colleges",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80",
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
    slug: "/colleges",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80",
  },
];

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
                <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-[#2563EB] to-[#0EA5E9]">
                  <img
                    src={college.image}
                    alt={`${college.name} campus building and admission review`}
                    width={800}
                    height={450}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061124]/85 via-[#061124]/20 to-transparent" />

                  {/* Badges on Thumbnail */}
                  <div className="absolute left-3.5 bottom-3 right-3.5 z-10 flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] sm:text-[11px] font-extrabold px-3 py-1 rounded-full bg-[#F59E0B] text-[#061124] shadow-sm tracking-wider">
                      {college.nirfRank}
                    </span>
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full bg-white/25 backdrop-blur-md text-white border border-white/30 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {college.location}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6">
                  <h3 className="font-display font-extrabold text-base sm:text-lg text-[#061124] group-hover:text-[#2563EB] transition-colors line-clamp-2 leading-snug min-h-[48px]">
                    {college.name}
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
                      <span className="font-mono text-[9px] uppercase tracking-wider text-slate-600 mt-1 block">
                        Placed
                      </span>
                    </div>

                    <div className="border-x border-dashed border-[#061124]/12 px-1">
                      <b className="block font-display font-black text-sm sm:text-base text-[#2563EB] leading-none truncate">
                        {college.highestPackage}
                      </b>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-slate-600 mt-1 block">
                        Highest
                      </span>
                    </div>

                    <div>
                      <b className="block font-display font-black text-sm sm:text-base text-[#EA580C] leading-none truncate">
                        {college.avgPackage}
                      </b>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-slate-600 mt-1 block">
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
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border-[1.5px] border-[#061124]/15 group-hover:border-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white text-[#061124] font-bold text-xs transition-all"
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
