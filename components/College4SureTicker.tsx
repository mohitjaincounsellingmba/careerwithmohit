"use client";

import Link from "next/link";
import { Phone, Sparkles } from "lucide-react";

export function College4SureTicker() {
  const updates = [
    { title: "2027–2029 MBA/PGDM Admissions Open", href: "/colleges" },
    { title: "Free CAT 2026, XAT 2027 & NMAT Full Mock Tests Live", href: "/mock-tests" },
    { title: "Save up to ₹5,000+ on MBA Application Forms", href: "/mba-application-form-discount" },
    { title: "Top Online MBA & MCA Entitled Universities 2027", href: "/online-degree-certification" },
    { title: "Direct 1-on-1 Profile Assessment with Mohit Jain", href: "/book-session" },
    { title: "Top 770+ Colleges Verified Placement & Fee Audits", href: "/colleges" },
  ];

  return (
    <div className="bg-[#14103A] text-white border-b border-white/10 overflow-hidden relative z-40">
      <div className="flex w-max animate-ticker py-2 text-xs font-mono tracking-wider">
        {/* First track */}
        <div className="flex items-center gap-8 shrink-0 pr-8">
          {updates.map((item, idx) => (
            <Link
              key={`a-${idx}`}
              href={item.href}
              className="inline-flex items-center gap-2 text-white/80 hover:text-[#FFD426] transition-colors whitespace-nowrap"
            >
              <span className="dotlive" />
              <span>{item.title}</span>
            </Link>
          ))}
          <a
            href="tel:+919560020771"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6B2CF5] hover:bg-[#FF3D8B] text-white font-bold transition-colors whitespace-nowrap"
          >
            <Phone className="w-3 h-3" />
            <span>Admissions Helpline +91 95600 20771</span>
          </a>
        </div>

        {/* Second track for seamless infinite marquee */}
        <div className="flex items-center gap-8 shrink-0 pr-8" aria-hidden="true">
          {updates.map((item, idx) => (
            <Link
              key={`b-${idx}`}
              href={item.href}
              className="inline-flex items-center gap-2 text-white/80 hover:text-[#FFD426] transition-colors whitespace-nowrap"
            >
              <span className="dotlive" />
              <span>{item.title}</span>
            </Link>
          ))}
          <a
            href="tel:+919560020771"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6B2CF5] hover:bg-[#FF3D8B] text-white font-bold transition-colors whitespace-nowrap"
          >
            <Phone className="w-3 h-3" />
            <span>Admissions Helpline +91 95600 20771</span>
          </a>
        </div>
      </div>
    </div>
  );
}
