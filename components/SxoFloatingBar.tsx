"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, PhoneCall, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface SxoFloatingBarProps {
  title: string;
  slug: string;
}

export function SxoFloatingBar({ title, slug }: SxoFloatingBarProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;

      const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
      setScrollProgress(progress);

      // Show after 400px of scrolling, hide near the bottom footer
      const scrollY = window.scrollY;
      const isPastHero = scrollY > 400;
      const isNearBottom = scrollY > totalHeight - 350;

      setIsVisible(isPastHero && !isNearBottom);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cleanTitle = title.replace(/\s*\|\s*CareerWithMohit.*$/i, "").trim();

  const whatsappMessage = encodeURIComponent(
    `Hi Mohit Sir, I am reading about "${cleanTitle}" on CareerWithMohit. Can you please guide me with admission cutoffs, fees, and seat availability for 2027?`
  );
  const whatsappUrl = `https://wa.me/919560020771?text=${whatsappMessage}`;

  return (
    <>
      {/* Top Reading Progress Bar (SXO) */}
      <div
        className="fixed top-0 left-0 right-0 h-1.5 z-50 bg-transparent pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-amber-400 via-primary to-emerald-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Bottom Sticky Action Bar (SXO CRO Engine) */}
      {isVisible && !isDismissed && (
        <aside
          aria-label="Quick Admissions Consultation Bar"
          className="hidden sm:block fixed bottom-4 right-6 max-w-md z-40 animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          <div className="bg-slate-950 text-white border-4 border-foreground rounded-2xl p-3.5 sm:p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden flex flex-col gap-2.5">
            {/* Top Row: Context & Dismiss */}
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-300">
                  Admissions Mentorship
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-xs text-slate-300 font-bold truncate">
                  {cleanTitle}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsDismissed(true)}
                className="text-slate-400 hover:text-white p-0.5 rounded transition-colors cursor-pointer shrink-0"
                aria-label="Close advisory bar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Row: Actions */}
            <div className="flex items-center gap-2 pt-0.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-transform hover:-translate-y-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950 shrink-0" />
                <span>WhatsApp Mohit</span>
              </a>

              <Link
                href="/inquiry/"
                className="inline-flex items-center justify-center gap-1 bg-white hover:bg-amber-300 text-slate-950 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-black border-2 border-foreground transition-transform hover:-translate-y-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none whitespace-nowrap"
              >
                <span>Book Call</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
              </Link>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
