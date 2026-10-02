"use client";

import Link from "next/link";
import { MessageCircle, Video, ArrowRight, Sparkles } from "lucide-react";

export function College4SureCtaBanner() {
  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[32px] sm:rounded-[44px] p-8 sm:p-14 lg:p-16 text-center text-white overflow-hidden shadow-[0_34px_70px_-30px_rgba(37,99,235,0.45)] bg-gradient-to-br from-[#061124] via-[#1E40AF] to-[#0D9488]">
          {/* Dual Cosmic Rotating Dashed Rings */}
          <div className="absolute -top-32 -left-24 w-80 h-80 rounded-full border-2 border-dashed border-white/20 animate-spinv-slow pointer-events-none" />
          <div className="absolute -bottom-28 -right-20 w-72 h-72 rounded-full border-2 border-dashed border-white/20 animate-spinv-reverse pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white font-mono text-xs font-extrabold uppercase tracking-wider mb-5 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              Free 1-on-1 Profile Assessment
            </span>

            <h2 className="font-display text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
              Not sure which colleges<br />
              you should apply to?
            </h2>

            <p className="mt-4 text-base sm:text-lg text-white/90 leading-relaxed font-normal">
              Talk it through with Mohit Jain (certified by IIM Bangalore &amp; FMS Delhi). Free 30-minute strategic profile review on Google Meet — real insights, not a sales script.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
              <Link
                href="/book-session/"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#F59E0B] hover:bg-[#fbbf24] text-[#061124] font-display font-extrabold text-sm sm:text-base transition-all shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Video className="w-4 h-4 text-[#061124]" />
                <span>Book 1-on-1 Google Meet</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20I%20need%20guidance%20for%20my%20MBA%20college%20shortlisting"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-display font-bold text-sm sm:text-base transition-all backdrop-blur-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#10B981]" />
                <span>WhatsApp Profile Review</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
