"use client";

import { Star } from "lucide-react";

interface Review {
  name: string;
  role: string;
  admit: string;
  score: string;
  text: string;
  avatarBg: string;
}

const REVIEWS: Review[] = [
  {
    name: "Rohan Sharma",
    role: "MBA Candidate",
    admit: "IIM Bangalore (PGP)",
    score: "CAT 99.42 %ile",
    text: "Mohit Sir's profile assessment and GD-PI-WAT coaching gave me complete clarity. His interview mock sessions accurately predicted the exact case discussion questions at IIM Bangalore.",
    avatarBg: "#2563EB",
  },
  {
    name: "Ananya Deshmukh",
    role: "MBA Core",
    admit: "NMIMS Mumbai",
    score: "NMAT 248",
    text: "The free CBT mock tests on CareerWithMohit were identical to the real exam pattern. Sir also saved me ₹4,200 using the MBA form combo discount bundle!",
    avatarBg: "#0EA5E9",
  },
  {
    name: "Vikram Singhania",
    role: "MBA Aspirant",
    admit: "SIBM Pune",
    score: "SNAP 98.8 %ile",
    text: "Mohit Sir's 1-on-1 Google Meet strategy call helped me choose between SIBM and SCMHRD based on real ROI and placement statistics rather than marketing claims.",
    avatarBg: "#10B981",
  },
  {
    name: "Pooja Malhotra",
    role: "PGDM Marketing",
    admit: "IMT Ghaziabad",
    score: "XAT 93.6 %ile",
    text: "From B-School shortlisting to direct admission guidance, Sir's mentorship was transparent and unmatched. Highly recommend booking a 1-on-1 session.",
    avatarBg: "#EA580C",
  },
  {
    name: "Siddharth Verma",
    role: "B.Tech Grad",
    admit: "FORE School Delhi",
    score: "CAT 89.2 %ile",
    text: "Got into FORE School of Management with merit scholarship support. Mohit Jain Sir guided my SOP and interview answers flawlessly.",
    avatarBg: "#E11D48",
  },
  {
    name: "Megha Kulkarni",
    role: "Working Professional",
    admit: "Amity Online MBA",
    score: "NAAC A++ Entitled",
    text: "Enrolled in UGC-DEB approved online MBA with Canada WES validity. Transparent fee breakdown and complete documentation assistance.",
    avatarBg: "#F59E0B",
  },
];

export function College4SureReviewsMarquee() {
  return (
    <section className="py-16 sm:py-24 bg-[#F1F5F9]/80 border-b border-[#061124]/10 overflow-hidden">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.15em] font-extrabold text-[#2563EB] flex items-center gap-2 mb-2">
              <span className="w-5 h-0.5 rounded-full bg-[#2563EB]" />
              After the call
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#061124] tracking-tight">
              What students said afterwards
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#475569] max-w-xl">
              Verified reviews from students and parents across India mentored for MBA &amp; college admissions.
            </p>
          </div>

          {/* Rating Badge */}
          <div className="flex items-center gap-3 p-3.5 px-5 rounded-[20px] bg-white border border-[#061124]/10 shadow-sm self-start sm:self-auto">
            <span className="font-display font-black text-3xl sm:text-4xl text-[#061124] leading-none">
              4.9
            </span>
            <div className="text-xs">
              <div className="flex items-center gap-0.5 text-[#F59E0B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F59E0B]" />
                ))}
              </div>
              <span className="font-mono text-[10px] text-[#475569] font-semibold uppercase tracking-wider block mt-0.5">
                5,000+ Mentored
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Masked Infinite Sliding Marquee */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-reviews gap-5 py-2">
          {/* First loop */}
          {REVIEWS.map((rev, idx) => (
            <figure
              key={`r1-${idx}`}
              className="w-[320px] sm:w-[360px] rounded-[24px] bg-white border-[1.5px] border-[#061124]/10 p-6 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.12)] flex flex-col justify-between shrink-0"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-0.5 text-[#F59E0B]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F59E0B]" />
                    ))}
                  </div>
                  <span className="font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#10B981]/15 text-[#059669] border border-[#10B981]/25">
                    {rev.score}
                  </span>
                </div>

                <blockquote className="text-sm sm:text-base text-[#475569] leading-relaxed mb-6 font-normal">
                  &ldquo;{rev.text}&rdquo;
                </blockquote>
              </div>

              <figcaption className="flex items-center gap-3 pt-4 border-t border-[#061124]/8">
                <span
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-display font-bold text-sm shrink-0 shadow-sm"
                  style={{ backgroundColor: rev.avatarBg }}
                >
                  {rev.name[0]}
                </span>
                <div className="min-w-0">
                  <b className="block font-display font-bold text-sm text-[#061124] truncate">
                    {rev.name}
                  </b>
                  <span className="font-mono text-[10px] text-[#475569] block truncate">
                    {rev.admit} · {rev.role}
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}

          {/* Second loop for seamless infinite slide */}
          {REVIEWS.map((rev, idx) => (
            <figure
              key={`r2-${idx}`}
              aria-hidden="true"
              className="w-[320px] sm:w-[360px] rounded-[24px] bg-white border-[1.5px] border-[#061124]/10 p-6 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.12)] flex flex-col justify-between shrink-0"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-0.5 text-[#F59E0B]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F59E0B]" />
                    ))}
                  </div>
                  <span className="font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#10B981]/15 text-[#059669] border border-[#10B981]/25">
                    {rev.score}
                  </span>
                </div>

                <blockquote className="text-sm sm:text-base text-[#475569] leading-relaxed mb-6 font-normal">
                  &ldquo;{rev.text}&rdquo;
                </blockquote>
              </div>

              <figcaption className="flex items-center gap-3 pt-4 border-t border-[#061124]/8">
                <span
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-display font-bold text-sm shrink-0 shadow-sm"
                  style={{ backgroundColor: rev.avatarBg }}
                >
                  {rev.name[0]}
                </span>
                <div className="min-w-0">
                  <b className="block font-display font-bold text-sm text-[#061124] truncate">
                    {rev.name}
                  </b>
                  <span className="font-mono text-[10px] text-[#475569] block truncate">
                    {rev.admit} · {rev.role}
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
