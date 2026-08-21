"use client";

import { Globe, ArrowUpRight, MousePointerClick, Eye, ShieldCheck } from "lucide-react";

interface PageAnalyticsTabProps {
  pages: any[];
  totalViews: number;
}

export function PageAnalyticsTab({ pages, totalViews }: PageAnalyticsTabProps) {
  return (
    <div className="space-y-6 font-body">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-amber-400" /> Page & Route Analytics
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Pageviews, clicks, and traffic breakdown according to URL paths & main site sections
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950/60 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">Page / Path</th>
                <th className="py-3.5 px-4">Section Name</th>
                <th className="py-3.5 px-4 text-right">Page Views</th>
                <th className="py-3.5 px-4 text-right">% Traffic Share</th>
                <th className="py-3.5 px-4 text-right">CTA Clicks</th>
                <th className="py-3.5 px-4 text-center">Engagement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {pages.map((p) => {
                const sharePercent = ((p.views / (totalViews || 1)) * 100).toFixed(1);
                return (
                  <tr key={p.path} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-4 font-mono font-semibold text-amber-400">
                      {p.path}
                    </td>
                    <td className="py-4 px-4 font-bold text-white">{p.title}</td>
                    <td className="py-4 px-4 text-right font-extrabold text-white text-sm">
                      {p.views.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-right font-bold text-blue-400">
                      {sharePercent}%
                    </td>
                    <td className="py-4 px-4 text-right font-bold text-emerald-400">
                      {p.clicks.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                        High Converting
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
