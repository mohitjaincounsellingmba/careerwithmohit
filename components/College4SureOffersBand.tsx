"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, Percent, CheckCircle2, Flame } from "lucide-react";

interface OfferItem {
  name: string;
  badge: string;
  badgeType: "hot" | "save" | "popular";
  icon: string;
  href: string;
}

const LIVE_OFFERS: OfferItem[] = [
  {
    name: "BML Munjal University (BMU) - Gurgaon",
    badge: "50% OFF",
    badgeType: "popular",
    icon: "🎓",
    href: "/mba-application-form-discount",
  },
  {
    name: "Universal AI University (UAi) - Mumbai",
    badge: "50% OFF",
    badgeType: "popular",
    icon: "🤖",
    href: "/mba-application-form-discount",
  },
  {
    name: "ITM Business School - Navi Mumbai",
    badge: "75% OFF",
    badgeType: "hot",
    icon: "📈",
    href: "/mba-application-form-discount",
  },
  {
    name: "NDIM New Delhi & Delhi NCR Hub Bundle",
    badge: "SAVE ₹2,500+",
    badgeType: "save",
    icon: "🏛️",
    href: "/mba-application-form-discount",
  },
  {
    name: "55+ Premier Business Schools Curated Combo",
    badge: "SAVE ₹5,000+",
    badgeType: "hot",
    icon: "✨",
    href: "/mba-application-form-discount",
  },
];

export function College4SureOffersBand() {
  return (
    <section className="py-14 sm:py-18 bg-[#F1F5F9]/80 border-b border-[#061124]/10">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[28px] sm:rounded-[40px] bg-[#061124] text-white p-7 sm:p-12 overflow-hidden shadow-[0_34px_70px_-30px_rgba(6,17,36,0.6)] border border-white/10">
          {/* Glowing Amber/Cyan Halos */}
          <div className="absolute top-[-140px] right-[-100px] w-96 h-96 rounded-full bg-[#0EA5E9]/25 blur-[90px] pointer-events-none" />
          <div className="absolute bottom-[-140px] left-[-80px] w-80 h-80 rounded-full bg-[#F59E0B]/20 blur-[90px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading & CTAs */}
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.15em] font-bold text-[#F59E0B] flex items-center gap-2 mb-3">
                <Flame className="w-4 h-4 text-[#F59E0B]" />
                Application Fee Discounts
              </span>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.08] tracking-tight">
                Up to 100% off<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#10B981] to-[#0EA5E9]">
                  application form fees
                </span>
              </h2>

              <p className="mt-4 text-sm sm:text-base text-slate-200 leading-relaxed max-w-lg">
                Exclusive institutional discount coupon codes and curated combo bundles arranged directly with accredited business schools across India.
              </p>

              <div className="mt-8 flex flex-wrap gap-3.5">
                <Link
                  href="/mba-application-form-discount/"
                  aria-label="See all 55+ MBA application form fee discount offers"
                  className="px-6 py-3.5 rounded-full bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-[#061124] font-display font-extrabold text-sm sm:text-base transition-all shadow-md flex items-center gap-2 group hover:-translate-y-0.5"
                >
                  <span>See all 55+ fee offers</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/book-session/"
                  aria-label="Book a free 1-on-1 MBA admissions advisory call"
                  className="px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-sm sm:text-base transition-all backdrop-blur-sm"
                >
                  Book free advisory call
                </Link>
              </div>
            </div>

            {/* Right Column: Live Offer Cards List */}
            <div className="space-y-2.5">
              {LIVE_OFFERS.map((offer, idx) => (
                <Link
                  key={idx}
                  href={offer.href}
                  aria-label={`Get ${offer.badge} on ${offer.name} application form`}
                  className="group flex items-center gap-3.5 p-3.5 sm:p-4 rounded-[18px] bg-white/[0.07] hover:bg-white/[0.14] border border-white/12 hover:border-white/30 transition-all duration-300 hover:translate-x-2"
                >
                  <span className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-lg shrink-0 group-hover:scale-110 transition-transform">
                    {offer.icon}
                  </span>

                  <span className="font-display font-semibold text-sm sm:text-base text-white truncate min-w-0 flex-1">
                    {offer.name}
                  </span>

                  <span
                    className={`font-mono text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shrink-0 transition-transform group-hover:scale-105 ${
                      offer.badgeType === "hot"
                        ? "bg-[#10B981] text-white shadow-sm animate-pulse"
                        : offer.badgeType === "save"
                        ? "bg-[#E11D48] text-white"
                        : "bg-[#F59E0B] text-[#061124]"
                    }`}
                  >
                    {offer.badge}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
