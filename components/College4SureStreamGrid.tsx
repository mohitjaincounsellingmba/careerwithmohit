"use client";

import Link from "next/link";
import {
  GraduationCap,
  Cpu,
  Globe2,
  Plane,
  Target,
  Percent,
  ArrowRight,
} from "lucide-react";

interface StreamItem {
  title: string;
  count: string;
  degrees: string;
  href: string;
  icon: typeof GraduationCap;
  accent: string;
  accentBg: string;
}

const STREAMS: StreamItem[] = [
  {
    title: "Management",
    count: "189",
    degrees: "MBA · PGDM · Executive MBA",
    href: "/colleges?stream=Management",
    icon: GraduationCap,
    accent: "#6B2CF5",
    accentBg: "rgba(107, 44, 245, 0.12)",
  },
  {
    title: "Engineering",
    count: "145",
    degrees: "B.Tech · M.Tech · JEE Main",
    href: "/colleges?stream=Engineering",
    icon: Cpu,
    accent: "#1FA8F5",
    accentBg: "rgba(31, 168, 245, 0.12)",
  },
  {
    title: "Online UGC Degrees",
    count: "40+",
    degrees: "UGC-DEB Entitled · NAAC A++",
    href: "/online-degree-certification",
    icon: Globe2,
    accent: "#00C795",
    accentBg: "rgba(0, 199, 149, 0.12)",
  },
  {
    title: "Study Abroad",
    count: "120+",
    degrees: "USA · UK · Canada · Germany",
    href: "/abroad-education",
    icon: Plane,
    accent: "#FF6B35",
    accentBg: "rgba(255, 107, 53, 0.12)",
  },
  {
    title: "GD-PI-WAT Mentorship",
    count: "1-on-1",
    degrees: "Mock Interviews · Case Studies",
    href: "/book-session",
    icon: Target,
    accent: "#FF3D8B",
    accentBg: "rgba(255, 61, 139, 0.12)",
  },
  {
    title: "MBA Form Discounts",
    count: "55+",
    degrees: "Save ₹5,000+ Combo Bundles",
    href: "/mba-application-form-discount",
    icon: Percent,
    accent: "#FFD426",
    accentBg: "rgba(255, 212, 38, 0.15)",
  },
];

export function College4SureStreamGrid() {
  return (
    <section className="py-16 sm:py-20 bg-[#F4F2FF]/60 border-b border-[#14103A]/10">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.15em] font-extrabold text-[#6B2CF5] flex items-center gap-2 mb-2">
              <span className="w-5 h-0.5 rounded-full bg-[#6B2CF5]" />
              Where to start
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#14103A] tracking-tight">
              Browse by field &amp; stream
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#575086] max-w-2xl">
              Counts update live as verified colleges are evaluated. Pick a stream to explore cutoff analytics, fee structures, and placement reports.
            </p>
          </div>
          <Link
            href="/colleges"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-[#6B2CF5] text-[#14103A] hover:text-white border border-[#14103A]/15 font-bold text-sm transition-all shadow-sm group self-start sm:self-auto"
          >
            <span>All 770+ Colleges</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 6 Stream Tiles Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {STREAMS.map((st, idx) => {
            const Icon = st.icon;
            return (
              <Link
                key={idx}
                href={st.href}
                style={{ "--card-accent": st.accent } as React.CSSProperties}
                className="st-card-hover group rounded-[22px] bg-white border-[1.5px] border-[#14103A]/10 p-5 sm:p-6 shadow-[0_18px_44px_-22px_rgba(20,16,58,0.2)] flex flex-col justify-between block transition-all"
              >
                <div>
                  {/* Stream Icon */}
                  <div
                    className="w-11 h-11 rounded-[14px] flex items-center justify-center mb-4 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
                    style={{ backgroundColor: st.accentBg, color: st.accent }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Big Number Count */}
                  <div
                    className="font-display font-black text-3xl sm:text-4xl tracking-tight leading-none transition-colors"
                    style={{ color: st.accent }}
                  >
                    {st.count}
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#14103A] mt-2 group-hover:text-white transition-colors">
                    {st.title}
                  </h3>
                </div>

                {/* Degrees Subtitle */}
                <div className="font-mono text-[11px] text-[#575086] group-hover:text-white/90 tracking-wide mt-3 pt-3 border-t border-[#14103A]/8 group-hover:border-white/20 transition-colors">
                  {st.degrees}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
