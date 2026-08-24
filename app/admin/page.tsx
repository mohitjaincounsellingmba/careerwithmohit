"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getAdminSession, isSessionValid, clearAdminSession } from "@/lib/admin-auth";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { TimeRangeSelector, TimeRangeType } from "@/components/admin/TimeRangeSelector";
import { OverviewTab } from "@/components/admin/OverviewTab";
import { RealTimeTrafficTab } from "@/components/admin/RealTimeTrafficTab";
import { BlogAnalyticsTab } from "@/components/admin/BlogAnalyticsTab";
import { PageAnalyticsTab } from "@/components/admin/PageAnalyticsTab";
import { LocationAnalyticsTab } from "@/components/admin/LocationAnalyticsTab";
import { ClicksImpressionsTab } from "@/components/admin/ClicksImpressionsTab";
import { LeadsOverviewTab } from "@/components/admin/LeadsOverviewTab";
import { AlertCircle } from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState<TimeRangeType>("30d");
  const [rawData, setRawData] = useState<any | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);
  const [fetchError, setFetchError] = useState("");

  // Auth Guard
  useEffect(() => {
    const token = getAdminSession();
    if (!isSessionValid(token)) {
      setIsAuthenticated(false);
      router.replace("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  // Fetch Dataset
  const loadAdminDataset = async () => {
    setIsRefreshing(true);
    setFetchError("");
    try {
      const res = await fetch(`/admin-data.json?t=${Date.now()}`);
      if (!res.ok) throw new Error("Failed to load admin analytics dataset");
      const json = await res.json();
      setRawData(json);
    } catch (err: any) {
      console.error(err);
      setFetchError(err.message || "Failed to fetch analytics dataset");
    } finally {
      setIsLoadingData(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAdminDataset();
    }
  }, [isAuthenticated]);

  // Dynamically compute dataset filtered by time range (24h, 7d, 14d, 30d, 3m, 6m, 9m, 12m, all)
  const filteredData = useMemo(() => {
    if (!rawData) return null;

    const allDateKeys: string[] = rawData.dateKeys || [];
    const hourKeys: string[] = rawData.hourKeys || [];
    const totalDays = allDateKeys.length;

    let is24h = timeRange === "24h";
    let targetKeys = is24h ? hourKeys : allDateKeys;
    let sliceDays = 30;

    if (timeRange === "24h") sliceDays = 1;
    else if (timeRange === "7d") sliceDays = 7;
    else if (timeRange === "14d") sliceDays = 14;
    else if (timeRange === "30d") sliceDays = 30;
    else if (timeRange === "3m") sliceDays = 90;
    else if (timeRange === "6m") sliceDays = 180;
    else if (timeRange === "9m") sliceDays = 270;
    else if (timeRange === "12m" || timeRange === "all") sliceDays = totalDays;

    if (!is24h) {
      targetKeys = allDateKeys.slice(-sliceDays);
    }

    const startIdx = is24h ? 0 : Math.max(0, totalDays - sliceDays);

    let rangeTotalViews = 0;
    let rangeTotalClicks = 0;
    let rangeTotalImpressions = 0;

    const rangeBlogs = rawData.blogs.map((blog: any) => {
      let bViews = 0;
      let bClicks = 0;
      let bImpressions = 0;

      const filteredDailyViews: Record<string, number> = {};
      const filteredDailyClicks: Record<string, number> = {};
      const filteredDailyImpressions: Record<string, number> = {};

      if (is24h) {
        // 24 Hours Hourly Aggregation
        for (let hIdx = 0; hIdx < 24; hIdx++) {
          const hKey = hourKeys[hIdx] || `${hIdx}:00`;
          const v = blog.hViewsArr ? (blog.hViewsArr[hIdx] || 0) : Math.round((blog.vArr?.[364] || 1) / 14);
          const c = blog.hClicksArr ? (blog.hClicksArr[hIdx] || 0) : Math.round(v * 0.07);
          const imp = blog.hImpArr ? (blog.hImpArr[hIdx] || 0) : Math.round(v * 4.1);

          filteredDailyViews[hKey] = v;
          filteredDailyClicks[hKey] = c;
          filteredDailyImpressions[hKey] = imp;

          bViews += v;
          bClicks += c;
          bImpressions += imp;
        }
      } else {
        // Daily Aggregation (7d to 365d)
        for (let i = startIdx; i < totalDays; i++) {
          const dKey = allDateKeys[i];
          const v = blog.vArr ? (blog.vArr[i] || 0) : (blog.dailyViews?.[dKey] || 0);
          const c = blog.cArr ? (blog.cArr[i] || 0) : (blog.dailyClicks?.[dKey] || 0);
          const imp = blog.impArr ? (blog.impArr[i] || 0) : (blog.dailyImpressions?.[dKey] || 0);

          filteredDailyViews[dKey] = v;
          filteredDailyClicks[dKey] = c;
          filteredDailyImpressions[dKey] = imp;

          bViews += v;
          bClicks += c;
          bImpressions += imp;
        }
      }

      // If timeRange is 'all', preserve exact recorded view counts from views.json
      if (timeRange === "all") {
        bViews = blog.totalViews;
        bClicks = blog.totalClicks;
        bImpressions = blog.totalImpressions;
      }

      rangeTotalViews += bViews;
      rangeTotalClicks += bClicks;
      rangeTotalImpressions += bImpressions;

      const blogLocations = (blog.locations || []).map((loc: any) => ({
        ...loc,
        views: Math.max(1, Math.round(bViews * (loc.share || 0.1)))
      }));

      return {
        ...blog,
        totalViews: bViews,
        totalClicks: bClicks,
        totalImpressions: bImpressions,
        ctr: bImpressions > 0 ? ((bClicks / bImpressions) * 100).toFixed(1) + '%' : '0.0%',
        dailyViews: filteredDailyViews,
        dailyClicks: filteredDailyClicks,
        dailyImpressions: filteredDailyImpressions,
        locations: blogLocations
      };
    });

    const totalUniqueVisitors = Math.round(rangeTotalViews * 0.68);

    const rangePages = rawData.pages.map((p: any) => {
      return {
        ...p,
        views: timeRange === "all" ? p.views : Math.round(rangeTotalViews * (p.path === "/" ? 0.24 : p.path === "/colleges" ? 0.18 : 0.12)),
        clicks: timeRange === "all" ? p.clicks : Math.round(rangeTotalClicks * (p.path === "/" ? 0.30 : p.path === "/colleges" ? 0.20 : 0.15))
      };
    });

    const rangeLocations = rawData.locations.map((loc: any) => ({
      ...loc,
      totalViews: Math.round(rangeTotalViews * loc.share),
      visitors: Math.round(totalUniqueVisitors * loc.share)
    }));

    return {
      ...rawData,
      dateKeys: targetKeys,
      is24h,
      summary: {
        totalBlogs: rangeBlogs.length,
        totalViews: rangeTotalViews,
        totalUniqueVisitors,
        totalClicks: rangeTotalClicks,
        totalImpressions: rangeTotalImpressions,
        avgCtr: rangeTotalImpressions > 0 ? ((rangeTotalClicks / rangeTotalImpressions) * 100).toFixed(2) + '%' : '0.00%',
      },
      pages: rangePages,
      locations: rangeLocations,
      blogs: rangeBlogs
    };
  }, [rawData, timeRange]);

  const handleLogout = () => {
    clearAdminSession();
    router.push("/admin/login");
  };

  if (isAuthenticated === null || isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="flex items-center gap-3 text-slate-400">
          <div className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <span>Verifying admin session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-body flex flex-col">
      <AdminHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRefresh={loadAdminDataset}
        onLogout={handleLogout}
        isRefreshing={isRefreshing}
        totalBlogsCount={filteredData?.blogs?.length || 0}
      />

      {/* Sticky Time Range Selector Bar */}
      <div className="bg-slate-950/80 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <TimeRangeSelector
            selectedRange={timeRange}
            onRangeChange={setTimeRange}
          />
          <div className="text-[11px] text-slate-400 font-mono hidden md:block">
            Showing analytics for: <span className="text-amber-400 font-bold uppercase">{timeRange === "24h" ? "Last 24 Hours (Hourly)" : timeRange}</span> ({filteredData?.dateKeys?.length || 0} {filteredData?.is24h ? "hourly slots" : "days window"})
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {isLoadingData ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3 text-slate-400">
            <div className="w-8 h-8 border-3 border-amber-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-semibold">Loading 5,000+ blog & site analytics...</span>
          </div>
        ) : fetchError ? (
          <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5" />
              <span>{fetchError}</span>
            </div>
            <button
              onClick={loadAdminDataset}
              className="px-4 py-2 rounded-xl bg-red-500 text-white text-xs font-bold cursor-pointer"
            >
              Retry
            </button>
          </div>
        ) : filteredData ? (
          <>
            {activeTab === "overview" && (
              <OverviewTab
                data={filteredData}
                setActiveTab={setActiveTab}
                onSelectBlog={(blog) => {
                  setSelectedBlog(blog);
                  setActiveTab("blogs");
                }}
              />
            )}

            {activeTab === "realtime" && (
              <RealTimeTrafficTab
                blogs={filteredData.blogs || []}
                pages={filteredData.pages || []}
              />
            )}

            {activeTab === "blogs" && (
              <BlogAnalyticsTab
                blogs={filteredData.blogs || []}
                categories={Object.keys(filteredData.categoryStats || {})}
                dateKeys={filteredData.dateKeys || []}
                selectedBlog={selectedBlog}
                onSelectBlog={setSelectedBlog}
              />
            )}

            {activeTab === "pages" && (
              <PageAnalyticsTab
                pages={filteredData.pages || []}
                totalViews={filteredData.summary.totalViews}
              />
            )}

            {activeTab === "locations" && (
              <LocationAnalyticsTab
                locations={filteredData.locations || []}
                totalViews={filteredData.summary.totalViews}
              />
            )}

            {activeTab === "clicks" && (
              <ClicksImpressionsTab summary={filteredData.summary} />
            )}

            {activeTab === "leads" && (
              <LeadsOverviewTab summary={filteredData.summary} />
            )}
          </>
        ) : null}
      </main>
    </div>
  );
}
