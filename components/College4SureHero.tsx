"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Sparkles, Building2, BookOpen, GraduationCap, Users } from "lucide-react";
import { College4SureLiveCompare } from "./College4SureLiveCompare";

export function College4SureHero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/colleges");
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] text-[#061124] pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-[#061124]/10">
      {/* Floating Ambient Glowing Blobs */}
      <span className="blob b1" />
      <span className="blob b2" />
      <span className="blob b3" />

      <div className="relative z-10 max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
          {/* Left Column: Hero Text & Search */}
          <div>
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border-[1.5px] border-[#061124]/10 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.15)] font-mono text-xs font-semibold uppercase tracking-wider mb-6 text-[#061124]">
              <span className="dotlive" />
              <span>770+ colleges · Checked by IIM/FMS mentors, not scraped</span>
            </div>

            {/* Main Display Headline with Marker Angle Highlighter Swipe */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-[68px] font-extrabold text-[#061124] leading-[1.04] tracking-tight">
              Choose your college<br />
              with the <span className="hl">numbers</span><br />
              in front of you.
            </h1>

            {/* Lede paragraph */}
            <p className="mt-5 text-base sm:text-lg text-[#475569] max-w-xl leading-relaxed font-normal">
              Fees, verified placement rates, ROI break-even analysis, and accepted entrance exam percentiles — maintained by senior mentors who pick up the phone.
            </p>

            {/* Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="mt-7 flex items-center gap-2 bg-white p-2 rounded-full border-[1.5px] border-[#061124]/15 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.2)] max-w-xl transition-all focus-within:border-[#2563EB] focus-within:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.3)]"
            >
              <div className="pl-3.5 text-[#475569]">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search a college, MBA specialization, exam or city…"
                className="w-full bg-transparent px-3 py-2.5 outline-none font-body text-sm sm:text-base text-[#061124] placeholder-[#475569]/70 min-w-0 font-medium"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#061124] hover:bg-[#2563EB] text-white font-display font-extrabold text-sm transition-all shrink-0 cursor-pointer shadow-sm hover:-translate-y-0.5"
              >
                Search
              </button>
            </form>

            {/* Popular Search Chips */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#475569] mr-1">
                Popular
              </span>
              <Link
                href="/colleges?stream=Management"
                className="px-3.5 py-1 rounded-full bg-white hover:bg-[#2563EB] text-[#061124] hover:text-white border border-[#061124]/10 font-semibold text-xs transition-all hover:-translate-y-0.5"
              >
                Management
              </Link>
              <Link
                href="/colleges?stream=Engineering"
                className="px-3.5 py-1 rounded-full bg-white hover:bg-[#0EA5E9] text-[#061124] hover:text-white border border-[#061124]/10 font-semibold text-xs transition-all hover:-translate-y-0.5"
              >
                Engineering
              </Link>
              <Link
                href="/online-degree-certification"
                className="px-3.5 py-1 rounded-full bg-white hover:bg-[#10B981] text-[#061124] hover:text-white border border-[#061124]/10 font-semibold text-xs transition-all hover:-translate-y-0.5"
              >
                Online UGC
              </Link>
              <Link
                href="/mba-application-form-discount"
                className="px-3.5 py-1 rounded-full bg-white hover:bg-[#F59E0B] text-[#061124] hover:text-[#061124] border border-[#061124]/10 font-semibold text-xs transition-all hover:-translate-y-0.5"
              >
                Form Discounts
              </Link>
            </div>

            {/* 4 Counter Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-9 max-w-xl">
              <div className="rounded-[18px] bg-white border-[1.5px] border-[#061124]/10 p-3.5 sm:p-4 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.12)] hover:-translate-y-1.5 transition-transform">
                <b className="block font-display font-black text-2xl sm:text-3xl text-[#2563EB] leading-none">
                  770+
                </b>
                <span className="block font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#475569] mt-1.5">
                  Colleges
                </span>
              </div>

              <div className="rounded-[18px] bg-white border-[1.5px] border-[#061124]/10 p-3.5 sm:p-4 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.12)] hover:-translate-y-1.5 transition-transform">
                <b className="block font-display font-black text-2xl sm:text-3xl text-[#E11D48] leading-none">
                  26+
                </b>
                <span className="block font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#475569] mt-1.5">
                  Exams
                </span>
              </div>

              <div className="rounded-[18px] bg-white border-[1.5px] border-[#061124]/10 p-3.5 sm:p-4 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.12)] hover:-translate-y-1.5 transition-transform">
                <b className="block font-display font-black text-2xl sm:text-3xl text-[#10B981] leading-none">
                  50+
                </b>
                <span className="block font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#475569] mt-1.5">
                  Mock Tests
                </span>
              </div>

              <div className="rounded-[18px] bg-white border-[1.5px] border-[#061124]/10 p-3.5 sm:p-4 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.12)] hover:-translate-y-1.5 transition-transform">
                <b className="block font-display font-black text-2xl sm:text-3xl text-[#F59E0B] leading-none">
                  5,000+
                </b>
                <span className="block font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#475569] mt-1.5">
                  Mentored
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Compare Card */}
          <div className="lg:pl-4">
            <College4SureLiveCompare />
          </div>
        </div>
      </div>
    </section>
  );
}
