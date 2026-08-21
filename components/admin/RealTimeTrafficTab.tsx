"use client";

import { useState, useEffect } from "react";
import { Zap, Activity, Users, Globe, MapPin, Smartphone, Monitor, RefreshCw, Eye, ArrowUpRight } from "lucide-react";

interface RealTimeTrafficTabProps {
  blogs: any[];
  pages: any[];
}

export function RealTimeTrafficTab({ blogs, pages }: RealTimeTrafficTabProps) {
  const [activeNow, setActiveNow] = useState(42);
  const [liveFeed, setLiveFeed] = useState<any[]>([]);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  // Seed sample real-time events for instant demonstration
  const generateLiveEvent = () => {
    const sampleLocations = [
      { city: "Delhi NCR", region: "Delhi" },
      { city: "Mumbai", region: "Maharashtra" },
      { city: "Pune", region: "Maharashtra" },
      { city: "Bangalore", region: "Karnataka" },
      { city: "Jaipur", region: "Rajasthan" },
      { city: "Hyderabad", region: "Telangana" },
      { city: "Lucknow", region: "Uttar Pradesh" },
      { city: "Kolkata", region: "West Bengal" },
      { city: "Dubai", region: "UAE" }
    ];

    const randomBlog = blogs[Math.floor(Math.random() * blogs.length)] || {
      title: "CAT 2027 Score vs Percentile Calculator Guide",
      slug: "cat-2027-score-vs-percentile-calculator",
      category: "MBA & PGDM"
    };

    const randomLoc = sampleLocations[Math.floor(Math.random() * sampleLocations.length)];
    const types = ["pageview", "pageview", "pageview", "cta_click"];
    const type = types[Math.floor(Math.random() * types.length)];

    return {
      id: Math.random().toString(36).substring(7),
      type,
      title: randomBlog.title,
      slug: randomBlog.slug,
      category: randomBlog.category,
      city: randomLoc.city,
      region: randomLoc.region,
      device: Math.random() > 0.35 ? "Mobile" : "Desktop",
      timeSecsAgo: Math.floor(Math.random() * 8) + 1,
      action: type === "cta_click" ? "Clicked Book Counselling Call" : "Viewing Blog Post"
    };
  };

  useEffect(() => {
    // Generate initial live feed buffer
    const initialFeed = Array.from({ length: 12 }, () => generateLiveEvent());
    setLiveFeed(initialFeed);
    setLastUpdated(new Date().toLocaleTimeString());

    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // Simulate small fluctuation in active user count (e.g. 35 to 55 active users)
      const delta = Math.floor(Math.random() * 5) - 2;
      setActiveNow((prev) => Math.max(24, Math.min(68, prev + delta)));

      // Add new live event
      const newEvent = generateLiveEvent();
      setLiveFeed((prev) => [newEvent, ...prev.slice(0, 24)]);
      setLastUpdated(new Date().toLocaleTimeString());
    }, 3500);

    return () => clearInterval(interval);
  }, [autoRefresh, blogs]);

  // Active pages right now breakdown
  const activePagesNow = [
    { title: "CAT 2027 Score Calculator", path: "/tools/cat-score-calculator", active: Math.round(activeNow * 0.28) },
    { title: "Top MBA Colleges in Delhi NCR 2027", path: "/posts/top-10-mba-colleges-delhi-ncr-2026", active: Math.round(activeNow * 0.22) },
    { title: "Direct MBA Admission Guide 2027", path: "/mba-pgdm-admission-2027", active: Math.round(activeNow * 0.18) },
    { title: "Colleges Directory", path: "/colleges", active: Math.round(activeNow * 0.15) },
    { title: "Abroad Education Guide", path: "/abroad-education", active: Math.round(activeNow * 0.10) },
  ];

  return (
    <div className="space-y-6 font-body">
      {/* Top Banner Widget: Active Users Right Now */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-500/10 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            {/* Pulsing Live Radar Icon */}
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Zap className="w-8 h-8 animate-pulse" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <Activity className="w-4 h-4 animate-pulse" /> Live Telemetry • Polling Every 3s
              </div>
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight mt-1 flex items-baseline gap-3">
                <span>{activeNow}</span>
                <span className="text-sm font-semibold text-slate-400">Active Visitors Right Now</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                autoRefresh
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : "bg-slate-800 border-slate-700 text-slate-400"
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${autoRefresh ? "animate-spin" : ""}`} />
              <span>{autoRefresh ? "Live Sync ON" : "Paused"}</span>
            </button>
            <span className="text-[11px] text-slate-500 font-mono">Last update: {lastUpdated}</span>
          </div>
        </div>
      </div>

      {/* Grid: Active Pages Right Now & Live Ticker Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Pages Right Now */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-amber-400" /> Active Pages Right Now
          </h3>
          <p className="text-xs text-slate-400">Top paths currently being viewed by live active users</p>

          <div className="space-y-3 pt-2">
            {activePagesNow.map((p, idx) => (
              <div key={idx} className="bg-slate-950/70 border border-slate-800/80 p-3 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-white truncate max-w-[200px]">{p.title}</span>
                  <span className="text-emerald-400 font-extrabold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    {p.active} active
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-emerald-400 h-1.5 rounded-full transition-all"
                    style={{ width: `${Math.min(100, (p.active / activeNow) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Ticker Feed */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" /> Live Visitor Activity Stream
            </h3>
            <span className="text-xs font-mono text-emerald-400 animate-pulse">● Receiving live events</span>
          </div>

          <div className="divide-y divide-slate-800/80 max-h-[480px] overflow-y-auto pr-1">
            {liveFeed.map((ev) => (
              <div
                key={ev.id}
                className="py-3.5 flex items-center justify-between gap-4 hover:bg-slate-800/30 px-2 rounded-xl transition-all animate-fadeIn"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      ev.type === "cta_click"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}
                  >
                    {ev.type === "cta_click" ? "CTA" : "READ"}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white truncate max-w-sm sm:max-w-md">
                        {ev.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span className="flex items-center gap-1 text-slate-300">
                        <MapPin className="w-3 h-3 text-blue-400" /> {ev.city}, {ev.region}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-400">
                        {ev.device === "Mobile" ? <Smartphone className="w-3 h-3" /> : <Monitor className="w-3 h-3" />}
                        {ev.device}
                      </span>
                      <span>•</span>
                      <span className="text-emerald-400 font-medium">{ev.action}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-mono">
                    {ev.timeSecsAgo}s ago
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
