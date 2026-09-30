"use client";

import Link from "next/link";
import { CheckCircle2, Clock, Calculator, PhoneCall, ArrowRight } from "lucide-react";

interface WhyItem {
  title: string;
  desc: string;
  icon: typeof CheckCircle2;
  accent: string;
  accentBg: string;
}

const WHY_ITEMS: WhyItem[] = [
  {
    title: "A shortlist you can defend",
    desc: "Built from verified placement rates, median salary audits, and realistic cutoff percentiles — not from whoever spends the most on ads.",
    icon: CheckCircle2,
    accent: "#6B2CF5",
    accentBg: "rgba(107, 44, 245, 0.12)",
  },
  {
    title: "The deadline you almost missed",
    desc: "We actively track 26+ entrance exam cycles (CAT, XAT, NMAT, SNAP, MAT, ATMA) and institute application closing dates so you never lose a cycle.",
    icon: Clock,
    accent: "#FF6B35",
    accentBg: "rgba(255, 107, 53, 0.12)",
  },
  {
    title: "Fees & ROI you can plan for",
    desc: "Real-world course fee audits across 770+ colleges with integrated payback period calculations before you pay a single application fee.",
    icon: Calculator,
    accent: "#00C795",
    accentBg: "rgba(0, 199, 149, 0.12)",
  },
  {
    title: "Direct 1-on-1 on Google Meet",
    desc: "Stuck between three offers? A generic spreadsheet won't solve it. Talk 1-on-1 with Mohit Jain (IIM Bangalore & FMS Delhi credentials).",
    icon: PhoneCall,
    accent: "#1FA8F5",
    accentBg: "rgba(31, 168, 245, 0.12)",
  },
];

export function College4SureWhyGrid() {
  return (
    <section className="py-16 sm:py-24 bg-[#F4F2FF]/60 border-b border-[#14103A]/10">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.15em] font-extrabold text-[#00C795] flex items-center gap-2 mb-2">
              <span className="w-5 h-0.5 rounded-full bg-[#00C795]" />
              Before you apply
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#14103A] tracking-tight">
              Why students talk to us first
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#575086] max-w-2xl">
              Every college application costs non-refundable money and a crucial admissions window you cannot recover.
            </p>
          </div>
          <Link
            href="/book-session"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#6B2CF5] hover:bg-[#6B2CF5]/90 text-white font-display font-extrabold text-sm transition-all shadow-[0_12px_26px_-12px_rgba(107,44,245,0.85)] hover:-translate-y-0.5 self-start sm:self-auto"
          >
            <span>Book a free strategy call</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {WHY_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-[28px] bg-white border-[1.5px] border-[#14103A]/10 p-6 sm:p-7 shadow-[0_18px_44px_-22px_rgba(20,16,58,0.2)] hover:shadow-[0_34px_70px_-30px_rgba(20,16,58,0.35)] hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Colored Top Border Sweep */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-500 scale-x-0 group-hover:scale-x-100 origin-left"
                  style={{ backgroundColor: item.accent }}
                />

                <div>
                  <div
                    className="w-12 h-12 rounded-[16px] flex items-center justify-center mb-5 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
                    style={{ backgroundColor: item.accentBg, color: item.accent }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-[#14103A] leading-snug">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm text-[#575086] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#14103A]/8 flex items-center gap-1.5 text-xs font-bold font-mono uppercase tracking-wider" style={{ color: item.accent }}>
                  <span>Verified insight</span>
                  <span className="text-base leading-none">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
