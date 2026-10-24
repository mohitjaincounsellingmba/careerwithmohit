"use client";

import React, { useState } from "react";
import { Sparkles, Check, Copy, MessageCircle, ArrowRight, ShieldCheck, Award, TrendingUp, IndianRupee, MapPin } from "lucide-react";

export interface AiFactItem {
  label: string;
  value: string;
  icon?: "fees" | "placement" | "cutoff" | "location" | "degree" | "verdict";
}

interface AiOverviewBoxProps {
  title: string;
  summaryText: string;
  bulletPoints?: string[];
  facts?: AiFactItem[];
  collegeSlug?: string;
  category?: string;
}

export function AiOverviewBox({
  title,
  summaryText,
  bulletPoints = [],
  facts = [],
  category = "MBA Admissions 2027",
}: AiOverviewBoxProps) {
  const [copied, setCopied] = useState(false);

  const cleanTitle = title.replace(/\s*\|\s*CareerWithMohit.*$/i, "").trim();

  const handleCopySummary = () => {
    const textToCopy = `📌 ${cleanTitle} - AI Overview & Quick Facts\n\n${summaryText}\n\n${
      bulletPoints.length > 0 ? bulletPoints.map((b) => `• ${b}`).join("\n") + "\n\n" : ""
    }${facts.map((f) => `${f.label}: ${f.value}`).join("\n")}\n\nSource: https://careerwithmohit.online/`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Mohit Sir, I was reading your analysis of "${cleanTitle}" on CareerWithMohit. Can you please guide me regarding admission eligibility, cutoffs, and fees for 2027?`
  );
  const whatsappUrl = `https://wa.me/919560020771?text=${whatsappMessage}`;

  return (
    <section
      aria-label="AI Answer Overview and Quick Facts"
      className="sxo-ai-overview ai-summary-card not-prose my-10 rounded-2xl border-4 border-foreground bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden"
      itemScope
      itemType="https://schema.org/Answer"
    >
      {/* Decorative ambient background */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />

      {/* Header Badge & Action */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center gap-1.5 bg-amber-400 text-slate-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
            AI Overview & Direct Answer
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-slate-400 text-xs font-semibold">
            Google AI & ChatGPT Optimized
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopySummary}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-500 bg-slate-800/80 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors shadow-sm cursor-pointer"
            title="Copy summary for sharing or WhatsApp"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                <span className="text-emerald-300">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy Summary</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Direct Answer Paragraph */}
      <div className="relative z-10 mt-6" itemProp="text">
        <h3 className="text-lg sm:text-xl font-black text-amber-300 tracking-tight mb-3 flex items-center gap-2">
          <span>⚡ Direct Answer & Quick Takeaways</span>
        </h3>
        <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed">
          {summaryText}
        </p>
      </div>

      {/* Bullet points if present */}
      {bulletPoints.length > 0 && (
        <div className="relative z-10 mt-4 space-y-2.5">
          {bulletPoints.map((bullet, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-200 font-normal leading-relaxed">
              <span className="text-amber-400 mt-1 font-black shrink-0">✦</span>
              <span>{bullet}</span>
            </div>
          ))}
        </div>
      )}

      {/* Structured Fast Facts Matrix */}
      {facts.length > 0 && (
        <div className="relative z-10 mt-6 pt-6 border-t border-slate-800">
          <div className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4">
            Audited Key Metrics & Decision Data
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {facts.map((fact, idx) => (
              <div
                key={idx}
                className="bg-slate-800/70 hover:bg-slate-800 border border-slate-700/80 rounded-xl p-3 sm:p-3.5 transition-colors"
              >
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5 mb-1">
                  {fact.icon === "fees" && <IndianRupee className="w-3 h-3 text-emerald-400" />}
                  {fact.icon === "placement" && <TrendingUp className="w-3 h-3 text-amber-400" />}
                  {fact.icon === "cutoff" && <Award className="w-3 h-3 text-cyan-400" />}
                  {fact.icon === "location" && <MapPin className="w-3 h-3 text-rose-400" />}
                  <span>{fact.label}</span>
                </div>
                <div className="text-sm sm:text-base font-black text-white truncate" title={fact.value}>
                  {fact.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SXO High-Intent Conversion Bar */}
      <div className="relative z-10 mt-6 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            Verified by <strong className="text-white">Mohit Jain</strong> (IIM-B & FMS Certified Admission Mentor)
          </span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-sm transition-all hover:scale-[1.02] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:scale-100"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950" />
            <span>Ask Mohit on WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
          </a>
        </div>
      </div>
    </section>
  );
}
