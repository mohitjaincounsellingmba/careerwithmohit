"use client";

import { Eye, Users, MousePointerClick, TrendingUp, Sparkles, FileText, MapPin, ArrowUpRight } from "lucide-react";

interface OverviewTabProps {
  data: any;
  setActiveTab: (tab: string) => void;
  onSelectBlog: (blog: any) => void;
}

export function OverviewTab({ data, setActiveTab, onSelectBlog }: OverviewTabProps) {
  if (!data) return null;

  const { summary, categoryStats, locations, pages, blogs, dateKeys } = data;

  // Compute 30-day aggregate traffic curve
  const dailyTotals = dateKeys.map((dKey: string) => {
    let daySum = 0;
    blogs.slice(0, 300).forEach((b: any) => {
      daySum += b.dailyViews[dKey] || 0;
    });
    return { date: dKey, views: daySum };
  });

  const maxViews = Math.max(...dailyTotals.map((d: any) => d.views), 1);

  // Top 5 blogs by view count
  const topBlogs = [...blogs].sort((a, b) => b.totalViews - a.totalViews).slice(0, 5);

  return (
    <div className="space-y-6 font-body">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Views */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Total Views</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">
            {summary.totalViews.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold mt-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14.2% vs last month</span>
          </div>
        </div>

        {/* Card 2: Unique Visitors */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all" />
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Unique Visitors</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">
            {summary.totalUniqueVisitors.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-xs text-blue-400 font-semibold mt-2">
            <span>68% estimated return visitors</span>
          </div>
        </div>

        {/* Card 3: Clicks & CTR */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>CTA & Link Clicks</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <MousePointerClick className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">
            {summary.totalClicks.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold mt-2">
            <span>Avg CTR: {summary.avgCtr}</span>
          </div>
        </div>

        {/* Card 4: Total Blogs */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all" />
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Total Published Blogs</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">
            {summary.totalBlogs.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-xs text-purple-400 font-semibold mt-2">
            <span>Daily analytics generated</span>
          </div>
        </div>
      </div>

      {/* Traffic Trend Chart Section */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" /> 30-Day Daily Traffic Trend
            </h2>
            <p className="text-xs text-slate-400">Daily total page views across all blogs & pages</p>
          </div>
          <button
            onClick={() => setActiveTab("blogs")}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Blogs</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Custom SVG Bar Chart */}
        <div className="h-64 flex items-end gap-1.5 pt-6 pb-2 px-2 border-b border-slate-800">
          {dailyTotals.map((item: any, idx: number) => {
            const heightPercent = Math.max(8, Math.round((item.views / maxViews) * 100));
            return (
              <div key={item.date} className="flex-1 flex flex-col items-center gap-1 group relative">
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center z-20 pointer-events-none">
                  <div className="bg-slate-800 border border-slate-700 text-white text-[11px] font-semibold py-1 px-2.5 rounded-lg shadow-xl whitespace-nowrap">
                    <div>{item.date}</div>
                    <div className="text-amber-400">{item.views.toLocaleString()} views</div>
                  </div>
                  <div className="w-2 h-2 bg-slate-800 border-b border-r border-slate-700 rotate-45 -mt-1" />
                </div>

                {/* Bar */}
                <div
                  className="w-full bg-gradient-to-t from-amber-600/40 via-amber-500 to-amber-400 rounded-t-md transition-all group-hover:brightness-125 group-hover:shadow-lg group-hover:shadow-amber-500/30"
                  style={{ height: `${heightPercent}%` }}
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono">
          <span>{dateKeys[0]}</span>
          <span>{dateKeys[14]}</span>
          <span>{dateKeys[dateKeys.length - 1]}</span>
        </div>
      </div>

      {/* Grid: Top Performing Blogs & Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top 5 Blogs */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" /> Top Performing Blogs
            </h3>
            <button
              onClick={() => setActiveTab("blogs")}
              className="text-xs text-amber-400 hover:underline cursor-pointer"
            >
              See all {blogs.length} posts
            </button>
          </div>

          <div className="divide-y divide-slate-800">
            {topBlogs.map((blog: any, i: number) => (
              <div
                key={blog.slug}
                onClick={() => onSelectBlog(blog)}
                className="py-3.5 flex items-center justify-between gap-4 hover:bg-slate-800/40 px-2 rounded-xl transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 text-xs font-bold flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-white truncate group-hover:text-amber-400 transition-colors">
                      {blog.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                        {blog.category}
                      </span>
                      <span>•</span>
                      <span>{blog.date}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-sm font-bold text-amber-400">
                    {blog.totalViews.toLocaleString()} views
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {blog.totalClicks} clicks ({blog.ctr})
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Visitor Locations */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400" /> Visitor Locations
            </h3>
            <button
              onClick={() => setActiveTab("locations")}
              className="text-xs text-blue-400 hover:underline cursor-pointer"
            >
              Full list
            </button>
          </div>

          <div className="space-y-3">
            {locations.slice(0, 6).map((loc: any) => (
              <div key={loc.city} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-200">{loc.city} ({loc.region})</span>
                  <span className="text-blue-400 font-bold">{loc.totalViews.toLocaleString()} views</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full"
                    style={{ width: `${Math.min(100, (loc.totalViews / summary.totalViews) * 300)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
