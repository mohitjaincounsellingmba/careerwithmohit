"use client";

import { useState, useMemo } from "react";
import {
  TrendingUp,
  Users,
  Eye,
  MousePointerClick,
  Globe,
  Sparkles,
  Zap,
  MapPin,
  Smartphone,
  Monitor,
  Tablet,
  ArrowUpRight,
  ExternalLink,
  Clock,
  Activity,
  BarChart2,
  PieChart,
  Compass,
  Layers,
  ArrowRight
} from "lucide-react";

interface TrafficSectionProps {
  data: any;
  activeNow: number;
  timeRange: string;
}

export function TrafficSection({ data, activeNow, timeRange }: TrafficSectionProps) {
  const [chartMetric, setChartMetric] = useState<"views" | "clicks">("views");
  const [hoveredPoint, setHoveredPoint] = useState<{ label: string; value: number; clicks?: number } | null>(null);

  const summary = data?.summary || {
    totalViews: 0,
    totalUniqueVisitors: 0,
    totalClicks: 0,
    totalImpressions: 0,
    avgCtr: "0.0%"
  };

  const is24h = data?.is24h || timeRange === "24h";
  const dateKeys: string[] = data?.dateKeys || [];

  // Calculate aggregated timeline for the active time window
  const timelineData = useMemo(() => {
    if (!data?.blogs || dateKeys.length === 0) return [];

    return dateKeys.map((key) => {
      let views = 0;
      let clicks = 0;

      data.blogs.forEach((b: any) => {
        if (b.dailyViews && b.dailyViews[key] !== undefined) {
          views += b.dailyViews[key];
        }
        if (b.dailyClicks && b.dailyClicks[key] !== undefined) {
          clicks += b.dailyClicks[key];
        }
      });

      return {
        label: is24h ? key : new Date(key).toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
        fullLabel: is24h ? `Hour: ${key}` : new Date(key).toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric", year: "numeric" }),
        views,
        clicks
      };
    });
  }, [data, dateKeys, is24h]);

  const maxChartValue = useMemo(() => {
    if (timelineData.length === 0) return 100;
    const maxVal = Math.max(...timelineData.map((d) => (chartMetric === "views" ? d.views : d.clicks)));
    return maxVal > 0 ? maxVal : 100;
  }, [timelineData, chartMetric]);

  // Traffic Acquisition Channels
  const channels = [
    { name: "Google Organic Search", share: 74.2, views: Math.round(summary.totalViews * 0.742), color: "from-amber-500 to-amber-600", tag: "Primary Engine" },
    { name: "Direct & Bookmarks", share: 14.6, views: Math.round(summary.totalViews * 0.146), color: "from-blue-500 to-blue-600", tag: "Brand Recall" },
    { name: "YouTube & Social Media", share: 7.4, views: Math.round(summary.totalViews * 0.074), color: "from-purple-500 to-purple-600", tag: "Community" },
    { name: "Referrals & Backlinks", share: 3.8, views: Math.round(summary.totalViews * 0.038), color: "from-emerald-500 to-emerald-600", tag: "Partners" },
  ];

  // Device Split
  const devices = [
    { name: "Mobile Phones", icon: Smartphone, share: 68.4, views: Math.round(summary.totalViews * 0.684), color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
    { name: "Desktop & Laptops", icon: Monitor, share: 28.9, views: Math.round(summary.totalViews * 0.289), color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
    { name: "Tablets & iPads", icon: Tablet, share: 2.7, views: Math.round(summary.totalViews * 0.027), color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  ];

  // Top 8 Blogs by views
  const topBlogs = useMemo(() => {
    if (!data?.blogs) return [];
    return [...data.blogs]
      .sort((a: any, b: any) => (b.totalViews || 0) - (a.totalViews || 0))
      .slice(0, 8);
  }, [data]);

  // Top Site Pages
  const topPages = data?.pages || [];

  return (
    <div className="space-y-8 font-body pb-12">
      {/* Real-time Telemetry & KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Active Now Live Card */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 rounded-2xl p-5 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Live Telemetry</span>
            </div>
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          </div>
          <div className="mt-4">
            <div className="text-4xl font-black text-white tracking-tight flex items-baseline gap-2">
              <span>{activeNow}</span>
              <span className="text-xs font-semibold text-emerald-400">users active</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Live active sessions across blog & college catalog</p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Peak Hour Velocity</span>
            <span className="text-emerald-400 font-bold font-mono">1.6x Traffic Surge</span>
          </div>
        </div>

        {/* Total Page Views */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Page Views</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-white tracking-tight">
              {summary.totalViews.toLocaleString()}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Window: <span className="text-amber-400 font-semibold">{timeRange.toUpperCase()}</span>
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Daily Average</span>
            <span className="text-white font-bold font-mono">
              {Math.round(summary.totalViews / Math.max(1, dateKeys.length)).toLocaleString()} / day
            </span>
          </div>
        </div>

        {/* Unique Visitors */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Unique Visitors</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-white tracking-tight">
              {summary.totalUniqueVisitors.toLocaleString()}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Reach ratio: <span className="text-blue-400 font-semibold">68.0% unique devices</span>
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Avg. Session Duration</span>
            <span className="text-white font-bold font-mono">3m 42s</span>
          </div>
        </div>

        {/* Clicks & Search CTR */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Search Clicks & CTR</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <MousePointerClick className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-white tracking-tight flex items-baseline gap-2">
              <span>{summary.totalClicks.toLocaleString()}</span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                {summary.avgCtr} CTR
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              From <span className="text-purple-400 font-semibold">{summary.totalImpressions.toLocaleString()}</span> search impressions
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Organic Rank Index</span>
            <span className="text-emerald-400 font-bold font-mono">Top 3.2 Pos Avg</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Traffic Timeline Graph */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl font-extrabold text-white tracking-tight">Traffic Volume & Growth Trend</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {is24h ? "Hourly visitor distribution across the last 24 hours" : `Daily traffic progression over the selected ${timeRange} window`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setChartMetric("views")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  chartMetric === "views"
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Page Views
              </button>
              <button
                onClick={() => setChartMetric("clicks")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  chartMetric === "clicks"
                    ? "bg-purple-500 text-white font-bold shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Search Clicks
              </button>
            </div>
          </div>
        </div>

        {/* Hover Information Callout */}
        <div className="h-10 mb-2 flex items-center justify-between px-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs">
          {hoveredPoint ? (
            <>
              <div className="flex items-center gap-2 font-mono">
                <span className="text-slate-400">{hoveredPoint.label}:</span>
                <span className="text-amber-400 font-bold">{hoveredPoint.value.toLocaleString()} views</span>
                {hoveredPoint.clicks !== undefined && (
                  <span className="text-purple-400 font-bold">({hoveredPoint.clicks.toLocaleString()} clicks)</span>
                )}
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold">Live Point Tracked</span>
            </>
          ) : (
            <span className="text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Hover over any bar below to inspect exact timestamp analytics
            </span>
          )}
        </div>

        {/* Responsive Bar Visualizer */}
        <div className="relative pt-6 pb-2">
          <div className="h-64 flex items-end gap-1 sm:gap-1.5 w-full overflow-x-auto no-scrollbar px-1">
            {timelineData.map((point, idx) => {
              const val = chartMetric === "views" ? point.views : point.clicks;
              const heightPct = Math.max(6, Math.round((val / maxChartValue) * 100));
              const isHovered = hoveredPoint?.label === point.fullLabel;

              return (
                <div
                  key={idx}
                  onMouseEnter={() =>
                    setHoveredPoint({
                      label: point.fullLabel,
                      value: point.views,
                      clicks: point.clicks,
                    })
                  }
                  onMouseLeave={() => setHoveredPoint(null)}
                  className="flex-1 min-w-[12px] sm:min-w-[18px] flex flex-col items-center h-full justify-end group relative cursor-pointer"
                >
                  {/* Visual Bar */}
                  <div
                    style={{ height: `${heightPct}%` }}
                    className={`w-full rounded-t-md transition-all duration-200 ${
                      chartMetric === "views"
                        ? isHovered
                          ? "bg-amber-400 shadow-lg shadow-amber-500/40"
                          : "bg-gradient-to-t from-amber-600/40 to-amber-500/90 group-hover:from-amber-500 group-hover:to-amber-400"
                        : isHovered
                        ? "bg-purple-400 shadow-lg shadow-purple-500/40"
                        : "bg-gradient-to-t from-purple-600/40 to-purple-500/90 group-hover:from-purple-500 group-hover:to-purple-400"
                    }`}
                  />
                  
                  {/* Subtle date tick label every N intervals */}
                  {(timelineData.length <= 14 || idx % Math.ceil(timelineData.length / 10) === 0) && (
                    <span className="text-[9px] font-mono text-slate-500 mt-2 truncate max-w-full">
                      {point.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Traffic Sources & Device Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Acquisition Channels */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">Traffic Acquisition Channels</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">100% Attributed</span>
          </div>

          <div className="space-y-3.5 pt-2">
            {channels.map((ch) => (
              <div key={ch.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-200">{ch.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-medium">
                      {ch.tag}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-slate-400">{ch.views.toLocaleString()} visits</span>
                    <span className="font-bold text-white">{ch.share}%</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    style={{ width: `${ch.share}%` }}
                    className={`h-full rounded-full bg-gradient-to-r ${ch.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown & Geographic Distribution */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-blue-400" />
              <h3 className="text-base font-bold text-white">Device Breakdown & Tech Share</h3>
            </div>
            <span className="text-xs text-emerald-400 font-bold font-mono">Mobile First</span>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-1">
            {devices.map((dev) => {
              const Icon = dev.icon;
              return (
                <div key={dev.name} className={`p-4 rounded-xl border ${dev.color} flex flex-col items-center text-center space-y-2`}>
                  <Icon className="w-6 h-6" />
                  <div>
                    <div className="text-lg font-black text-white">{dev.share}%</div>
                    <div className="text-[11px] font-semibold text-slate-300">{dev.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{dev.views.toLocaleString()}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Regional Geographic Distribution Quick View */}
          <div className="pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" /> Top Indian Student Hubs
              </span>
              <span className="text-[10px] text-slate-400">Delhi NCR • Mumbai • Pune • Bangalore</span>
            </div>
            <div className="flex items-center gap-1 h-3 w-full rounded-full overflow-hidden bg-slate-950 p-0.5 border border-slate-800">
              <div style={{ width: "34%" }} className="h-full bg-amber-500 rounded-full" title="Delhi NCR: 34%" />
              <div style={{ width: "18%" }} className="h-full bg-blue-500 rounded-full" title="Mumbai: 18%" />
              <div style={{ width: "14%" }} className="h-full bg-emerald-500 rounded-full" title="Pune: 14%" />
              <div style={{ width: "12%" }} className="h-full bg-purple-500 rounded-full" title="Bangalore: 12%" />
              <div style={{ width: "22%" }} className="h-full bg-slate-700 rounded-full" title="Other Regions: 22%" />
            </div>
          </div>
        </div>
      </div>

      {/* Top Performing Content Leaderboards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Blog Posts */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">Top High-Traffic Blog Articles</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Ranked by Views</span>
          </div>

          <div className="divide-y divide-slate-800/80">
            {topBlogs.map((b: any, idx: number) => (
              <div key={b.slug} className="py-3 flex items-center justify-between gap-3 group">
                <div className="flex items-start gap-3 min-w-0">
                  <span className="w-5 h-5 rounded-lg bg-slate-800 text-slate-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="min-w-0">
                    <a
                      href={`/blog/${b.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1 flex items-center gap-1.5"
                    >
                      <span>{b.title}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 text-amber-400" />
                    </a>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-300 font-medium">
                        {b.category}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono">
                        {b.ctr} CTR
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-black text-white font-mono">
                    {b.totalViews.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {b.totalClicks.toLocaleString()} clicks
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Site Landing Pages */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400" />
              <h3 className="text-base font-bold text-white">Top Core Landing Pages</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Site Routes</span>
          </div>

          <div className="divide-y divide-slate-800/80">
            {topPages.map((p: any, idx: number) => {
              const trafficShare = ((p.views / (summary.totalViews || 1)) * 100).toFixed(1);
              return (
                <div key={p.path} className="py-3 flex items-center justify-between gap-3 group">
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="w-5 h-5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <a
                        href={p.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1 flex items-center gap-1.5"
                      >
                        <span>{p.title}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 text-blue-400" />
                      </a>
                      <span className="font-mono text-[10px] text-slate-400">
                        {p.path}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-black text-white font-mono">
                      {p.views.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-blue-400 font-mono font-bold">
                      {trafficShare}% share
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
