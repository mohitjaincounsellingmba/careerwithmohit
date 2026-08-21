"use client";

import { Users, CheckCircle, Send, Shield, Sparkles } from "lucide-react";

interface LeadsOverviewTabProps {
  summary: any;
}

export function LeadsOverviewTab({ summary }: LeadsOverviewTabProps) {
  const leadSources = [
    { source: "Inquiry Modal Popup", share: "38%", status: "Active Webhook" },
    { source: "Bot Assistant Popup", share: "26%", status: "Active Webhook" },
    { source: "CAT Score Calculator Tool", share: "18%", status: "Active Webhook" },
    { source: "MBA 2027 Dedicated Page", share: "12%", status: "Active Webhook" },
    { source: "Mock Test Scorecards", share: "6%", status: "Active Webhook" },
  ];

  return (
    <div className="space-y-6 font-body">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-400" /> Leads & Activepieces Integration
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Overview of student leads & counselling inquiries automatically captured across the site
          </p>
        </div>

        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-amber-400 text-sm">Active Webhook Sync Connected</div>
            <div>
              All lead submissions are dispatched directly to your Activepieces webhook endpoints and stored automatically in Google Sheets.
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-white mb-3">Lead Conversion Channels</h3>
          <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl bg-slate-950/60 overflow-hidden">
            {leadSources.map((src, i) => (
              <div key={i} className="p-3.5 flex items-center justify-between gap-4">
                <div>
                  <div className="font-semibold text-white text-xs">{src.source}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{src.status}</div>
                </div>

                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 font-bold text-xs">
                    {src.share}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
