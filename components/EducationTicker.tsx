"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Flame, Bell, X } from "lucide-react";

interface AlertItem {
  id: number;
  badge: string;
  badgeColor: string;
  text: string;
  linkText: string;
  href: string;
}

const ALERTS: AlertItem[] = [
  {
    id: 1,
    badge: "ADMISSIONS 2027",
    badgeColor: "bg-amber-400 text-slate-950 font-extrabold",
    text: "Top 55+ MBA/PGDM Colleges Direct & Merit Applications Open",
    linkText: "Check Form Discounts (Save ₹5k+)",
    href: "/mba-application-form-discount",
  },
  {
    id: 2,
    badge: "FREE CBT MOCKS",
    badgeColor: "bg-emerald-400 text-slate-950 font-extrabold",
    text: "CAT 2026, XAT 2027, NMAT & SNAP Full-Length CBT Tests Live",
    linkText: "Attempt Free Mock Now",
    href: "/mock-tests",
  },
  {
    id: 3,
    badge: "1-ON-1 COUNSELLING",
    badgeColor: "bg-blue-400 text-slate-950 font-extrabold",
    text: "Free 30-Min Face-to-Face Video Session with Mohit Jain (IIM-B Certified)",
    linkText: "Book Slot on Meet",
    href: "/book-session",
  },
  {
    id: 4,
    badge: "ONLINE DEGREES",
    badgeColor: "bg-purple-400 text-slate-950 font-extrabold",
    text: "UGC-DEB Approved Online MBA & MCA Programs with EMI from ₹3,500/mo",
    linkText: "Compare 40+ Universities",
    href: "/online-degree-certification",
  },
];

export function EducationTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ALERTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  const currentAlert = ALERTS[currentIndex];

  return (
    <div className="relative bg-gradient-to-r from-slate-950 via-[#0B1E38] to-slate-950 text-white border-b border-blue-900/40 text-xs py-2 px-3 sm:px-6 overflow-hidden z-40 transition-all">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent pointer-events-none" />

      <div className="mx-auto max-w-7xl flex items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-2 overflow-hidden flex-1 justify-center sm:justify-start">
          <div className="hidden sm:flex items-center gap-1.5 shrink-0 px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-bold uppercase text-[10px] tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span>Live Portal Alert</span>
          </div>

          <div className="flex items-center gap-2 truncate animate-in fade-in slide-in-from-bottom-1 duration-300">
            <span className={`px-2 py-0.5 rounded-md text-[10px] uppercase shrink-0 ${currentAlert.badgeColor}`}>
              {currentAlert.badge}
            </span>
            <span className="text-slate-200 font-medium truncate text-[11px] sm:text-xs">
              {currentAlert.text}
            </span>
            <Link
              href={currentAlert.href}
              className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 font-bold text-[11px] sm:text-xs underline underline-offset-2 shrink-0 ml-1 transition-colors"
            >
              <span>{currentAlert.linkText}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Right Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="text-slate-400 hover:text-white p-1 rounded-md transition-colors shrink-0 cursor-pointer"
          title="Dismiss alert"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
