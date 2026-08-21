"use client";

import { useState, useMemo } from "react";
import { Search, Filter, ArrowUpDown, Calendar, Eye, MousePointerClick, X, Clock, MapPin, Sparkles, ChevronLeft, ChevronRight, BarChart2 } from "lucide-react";

interface BlogAnalyticsTabProps {
  blogs: any[];
  categories: string[];
  dateKeys: string[];
  selectedBlog: any | null;
  onSelectBlog: (blog: any | null) => void;
}

export function BlogAnalyticsTab({
  blogs,
  categories,
  dateKeys,
  selectedBlog,
  onSelectBlog,
}: BlogAnalyticsTabProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"views-desc" | "views-asc" | "date-desc" | "clicks-desc">("views-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 30;

  // Filtering & Sorting logic
  const filteredBlogs = useMemo(() => {
    return blogs
      .filter((b) => {
        const matchesSearch =
          b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.slug.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCategory === "All" || b.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === "views-desc") return b.totalViews - a.totalViews;
        if (sortBy === "views-asc") return a.totalViews - b.totalViews;
        if (sortBy === "date-desc") return new Date(b.date).getTime() - new Date(a.date).getTime();
        if (sortBy === "clicks-desc") return b.totalClicks - a.totalClicks;
        return 0;
      });
  }, [blogs, searchTerm, selectedCategory, sortBy]);

  const totalPages = Math.ceil(filteredBlogs.length / pageSize) || 1;
  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredBlogs.slice(start, start + pageSize);
  }, [filteredBlogs, currentPage, pageSize]);

  // Reset to page 1 on search change
  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 font-body">
      {/* Header & Filters */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-amber-400" /> Blog Analytics ({filteredBlogs.length.toLocaleString()})
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Inspect daily page views, clicks, and visitor locations for every single blog post
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Page {currentPage} of {totalPages}</span>
          </div>
        </div>

        {/* Search Bar & Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {/* Search */}
          <div className="relative md:col-span-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search blog title or slug..."
              className="w-full bg-slate-950/70 border border-slate-800 focus:border-amber-500 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full bg-slate-950/70 border border-slate-800 focus:border-amber-500 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500 appearance-none cursor-pointer"
            >
              <option value="All">All Categories ({blogs.length})</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="relative">
            <ArrowUpDown className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="w-full bg-slate-950/70 border border-slate-800 focus:border-amber-500 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500 appearance-none cursor-pointer"
            >
              <option value="views-desc">Highest Total Views</option>
              <option value="views-asc">Lowest Total Views</option>
              <option value="date-desc">Newest Published Date</option>
              <option value="clicks-desc">Most CTA Clicks</option>
            </select>
          </div>
        </div>
      </div>

      {/* Blogs Data Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950/60 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">#</th>
                <th className="py-3.5 px-4">Blog Title & Slug</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Total Views</th>
                <th className="py-3.5 px-4 text-right">Clicks (CTR)</th>
                <th className="py-3.5 px-4 text-center">30-Day Sparkline</th>
                <th className="py-3.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {paginatedBlogs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500 text-sm">
                    No blogs found matching your search query.
                  </td>
                </tr>
              ) : (
                paginatedBlogs.map((b, idx) => {
                  const globalIdx = (currentPage - 1) * pageSize + idx + 1;

                  // Find max daily view for sparkline scaling
                  const dailyVals = dateKeys.map((k) => b.dailyViews[k] || 0);
                  const maxDay = Math.max(...dailyVals, 1);

                  return (
                    <tr
                      key={b.slug}
                      className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                      onClick={() => onSelectBlog(b)}
                    >
                      <td className="py-3.5 px-4 font-mono text-slate-500">{globalIdx}</td>
                      <td className="py-3.5 px-4 max-w-xs sm:max-w-md">
                        <div className="font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                          {b.title}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 truncate mt-0.5">
                          /posts/{b.slug}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-[10px] font-medium whitespace-nowrap border border-slate-700">
                          {b.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">{b.date}</td>
                      <td className="py-3.5 px-4 text-right font-extrabold text-amber-400">
                        {b.totalViews.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="font-semibold text-emerald-400">{b.totalClicks}</div>
                        <div className="text-[10px] text-slate-500">CTR {b.ctr}</div>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {/* Mini Sparkline Bar Chart */}
                        <div className="h-6 w-24 flex items-end gap-[1.5px] mx-auto">
                          {dailyVals.slice(-15).map((v, vIdx) => (
                            <div
                              key={vIdx}
                              className="flex-1 bg-amber-500/80 rounded-t-[1px] group-hover:bg-amber-400"
                              style={{ height: `${Math.max(15, Math.round((v / maxDay) * 100))}%` }}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectBlog(b);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-slate-950 font-semibold text-[11px] transition-all cursor-pointer"
                        >
                          Daily Stats
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-between gap-4 bg-slate-950/40">
          <div className="text-xs text-slate-400">
            Showing <span className="text-white font-semibold">{((currentPage - 1) * pageSize) + 1}</span> to{" "}
            <span className="text-white font-semibold">{Math.min(currentPage * pageSize, filteredBlogs.length)}</span> of{" "}
            <span className="text-white font-semibold">{filteredBlogs.length.toLocaleString()}</span> blogs
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold text-slate-300 px-2">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Daily Analytics Drawer / Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-end p-0 sm:p-4 animate-fadeIn font-body">
          <div className="w-full max-w-3xl bg-slate-900 border-l sm:border border-slate-800 rounded-none sm:rounded-2xl h-full flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-start justify-between gap-4 bg-slate-950/60">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold uppercase">
                    {selectedBlog.category}
                  </span>
                  <span className="text-xs text-slate-400">{selectedBlog.date}</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1.5 leading-snug">
                  {selectedBlog.title}
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-1">/posts/{selectedBlog.slug}</p>
              </div>

              <button
                onClick={() => onSelectBlog(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Metric Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase">Total Views</div>
                  <div className="text-xl font-black text-amber-400 mt-1">
                    {selectedBlog.totalViews.toLocaleString()}
                  </div>
                </div>

                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase">CTA Clicks</div>
                  <div className="text-xl font-black text-emerald-400 mt-1">
                    {selectedBlog.totalClicks}
                  </div>
                </div>

                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase">Click CTR</div>
                  <div className="text-xl font-black text-blue-400 mt-1">
                    {selectedBlog.ctr}
                  </div>
                </div>

                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase">Est. Read Time</div>
                  <div className="text-xl font-black text-purple-400 mt-1 flex items-center gap-1">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span>{selectedBlog.estimatedReadTimeMinutes} min</span>
                  </div>
                </div>
              </div>

              {/* Day-by-Day Views Chart */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" /> Daily Page Views (Last 30 Days)
                  </h4>
                </div>

                <div className="h-44 flex items-end gap-1 pt-4 pb-1 border-b border-slate-800">
                  {dateKeys.map((dKey) => {
                    const dayViews = selectedBlog.dailyViews[dKey] || 0;
                    const maxVal = Math.max(...(Object.values(selectedBlog.dailyViews) as number[]), 1);
                    const barHeight = Math.max(10, Math.round((dayViews / maxVal) * 100));

                    return (
                      <div key={dKey} className="flex-1 flex flex-col items-center group relative">
                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-1 hidden group-hover:flex flex-col items-center z-30 pointer-events-none">
                          <div className="bg-slate-800 text-white text-[10px] py-1 px-2 rounded shadow-lg whitespace-nowrap">
                            <div>{dKey}</div>
                            <div className="text-amber-400 font-bold">{dayViews} views</div>
                          </div>
                        </div>
                        <div
                          className="w-full bg-amber-500 rounded-t-[2px] group-hover:bg-amber-300 transition-colors"
                          style={{ height: `${barHeight}%` }}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>{dateKeys[0]}</span>
                  <span>{dateKeys[14]}</span>
                  <span>{dateKeys[dateKeys.length - 1]}</span>
                </div>
              </div>

              {/* Top Visitor Locations for this Blog */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-400" /> Visitor Locations for this Post
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedBlog.locations.slice(0, 6).map((loc: any) => (
                    <div key={loc.city} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                      <div>
                        <div className="font-semibold text-slate-200">{loc.city}</div>
                        <div className="text-[10px] text-slate-500">{loc.region}</div>
                      </div>
                      <div className="text-right font-extrabold text-blue-400">
                        {loc.views} views
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
