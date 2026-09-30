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
    <div className="bg-[#050811] text-white border-b border-white/10 overflow-hidden relative z-40">
      <div className="flex w-max animate-ticker py-2 text-xs font-mono tracking-wider">
        {/* First track */}
        <div className="flex items-center gap-8 shrink-0 pr-8">
          {updates.map((item, idx) => (
            <Link
              key={`a-${idx}`}
              href={item.href}
              className="inline-flex items-center gap-2 text-slate-300 hover:text-[#00F0FF] transition-colors whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-[#00FF88] shadow-[0_0_8px_#00FF88]" />
              <span>{item.title}</span>
            </Link>
          ))}
          <a
            href="tel:+919560020771"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#6366F1] hover:from-[#00FF88] hover:to-[#00F0FF] text-slate-950 font-black shadow-[0_0_12px_rgba(0,240,255,0.4)] transition-all whitespace-nowrap"
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
              className="inline-flex items-center gap-2 text-slate-300 hover:text-[#00F0FF] transition-colors whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-[#00FF88] shadow-[0_0_8px_#00FF88]" />
              <span>{item.title}</span>
            </Link>
          ))}
          <a
            href="tel:+919560020771"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#6366F1] hover:from-[#00FF88] hover:to-[#00F0FF] text-slate-950 font-black shadow-[0_0_12px_rgba(0,240,255,0.4)] transition-all whitespace-nowrap"
          >
            <Phone className="w-3 h-3" />
            <span>Admissions Helpline +91 95600 20771</span>
          </a>
        </div>
      </div>
    </div>
  );
}
