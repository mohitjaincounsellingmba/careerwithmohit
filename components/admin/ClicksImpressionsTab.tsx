"use client";

import { MousePointerClick, Eye, TrendingUp, Sparkles, Target, Zap } from "lucide-react";

interface ClicksImpressionsTabProps {
  summary: any;
}

export function ClicksImpressionsTab({ summary }: ClicksImpressionsTabProps) {
  const ctaBreakdown = [
    { element: "Book 1-on-1 Counselling Call", count: Math.round(summary.totalClicks * 0.32), conversion: "8.4%" },
    { element: "Inquiry Popup Form Submit", count: Math.round(summary.totalClicks * 0.25), conversion: "6.2%" },
    { element: "CAT / Entrance Mock Test Start", count: Math.round(summary.totalClicks * 0.18), conversion: "12.1%" },
    { element: "WhatsApp Mentorship Chat", count: Math.round(summary.totalClicks * 0.15), conversion: "9.8%" },
    { element: "Download College Fees Brochure", count: Math.round(summary.totalClicks * 0.10), conversion: "5.5%" },
  ];

  return (
    <div className="space-y-6 font-body">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <MousePointerClick className="w-5 h-5 text-emerald-400" /> Clicks & Search Impressions
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Track user click behavior, search impressions, and call-to-action button engagement
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-400 uppercase font-semibold">Total Impressions</div>
            <div className="text-2xl font-black text-white mt-1">
              {summary.totalImpressions.toLocaleString()}
            </div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-400 uppercase font-semibold">Total Clicks</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">
              {summary.totalClicks.toLocaleString()}
            </div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-400 uppercase font-semibold">Average CTR</div>
            <div className="text-2xl font-black text-amber-400 mt-1">
              {summary.avgCtr}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" /> Top Call-To-Action (CTA) Click Elements
          </h3>

          <div className="divide-y divide-slate-800">
            {ctaBreakdown.map((cta, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    #{idx + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">{cta.element}</h4>
                    <p className="text-xs text-slate-400">Target Conversion Rate: {cta.conversion}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-extrabold text-emerald-400">
                    {cta.count.toLocaleString()} clicks
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
