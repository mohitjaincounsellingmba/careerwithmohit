"use client";

import { MapPin, Globe, Compass, Users } from "lucide-react";

interface LocationAnalyticsTabProps {
  locations: any[];
  totalViews: number;
}

export function LocationAnalyticsTab({ locations, totalViews }: LocationAnalyticsTabProps) {
  return (
    <div className="space-y-6 font-body">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-400" /> Geographic Visitor Locations
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Visitor location statistics gathered via Cloudflare Edge headers & geolocation signals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {locations.map((loc) => {
            const share = ((loc.totalViews / (totalViews || 1)) * 100).toFixed(1);
            return (
              <div
                key={loc.city}
                className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex items-center justify-between gap-4 hover:border-slate-700 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">
                    {loc.country === "India" ? "IN" : loc.country}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{loc.city}</h3>
                    <p className="text-xs text-slate-400">{loc.region} • {loc.country}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-base font-extrabold text-blue-400">
                    {loc.totalViews.toLocaleString()} views
                  </div>
                  <div className="text-xs text-slate-400">{loc.visitors.toLocaleString()} unique visitors ({share}%)</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
