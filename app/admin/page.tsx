"use client";

import { useState, useEffect, useMemo, useRef } from "react";
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
import { SeoStudioTab } from "@/components/admin/SeoStudioTab";
import { EducationSeoStrategyTab } from "@/components/admin/EducationSeoStrategyTab";
import { ABTestingTab } from "@/components/admin/ABTestingTab";
import { CollegesTab } from "@/components/admin/CollegesTab";
import { DiffInspectorTab } from "@/components/admin/DiffInspectorTab";
import { AlertCircle, Clock, Zap, CheckCircle2, RefreshCw } from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState<TimeRangeType>("30d");
  const [rawData, setRawData] = useState<any | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);
  const [fetchError, setFetchError] = useState("");
  const [activeNow, setActiveNow] = useState<number>(0);

  // 5-Minute Auto-Sync Real-Time Rules Engine
  const [autoSyncIntervalSeconds, setAutoSyncIntervalSeconds] = useState<number>(300); // 5 minutes default
  const [secondsUntilNextSync, setSecondsUntilNextSync] = useState<number>(300);
  const [lastSyncedTime, setLastSyncedTime] = useState<string>("Just now");
  const [showSyncSuccessToast, setShowSyncSuccessToast] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedInterval = localStorage.getItem("cwm_auto_sync_interval");
      if (savedInterval !== null) {
        const parsed = parseInt(savedInterval, 10);
        if (!isNaN(parsed)) {
          setAutoSyncIntervalSeconds(parsed);
          setSecondsUntilNextSync(parsed);
        }
      }
    } catch (e) {}
  }, []);

  const handleUpdateAutoSyncInterval = (newSeconds: number) => {
    setAutoSyncIntervalSeconds(newSeconds);
    setSecondsUntilNextSync(newSeconds);
    try {
      localStorage.setItem("cwm_auto_sync_interval", newSeconds.toString());
    } catch (e) {}
  };

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

  // Poll live telemetry for active users
  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchActiveUsers = async () => {
      let count = 0;
      try {
        const raw = localStorage.getItem("cwm_active_sessions_v1");
        if (raw) {
          const sessions = JSON.parse(raw);
          const now = Date.now();
          count = Object.values(sessions).filter((s: any) => (s as any).lastSeen >= now - 45000).length;
        }
      } catch (e) {}

      try {
        const res = await fetch(`/api/track?t=${Date.now()}`);
        if (res.ok) {
          const json = await res.json();
          if (typeof json.activeNow === "number" && json.activeNow > 0) {
            count = json.activeNow;
          }
        }
      } catch (err) {}

      setActiveNow(count);
    };

    fetchActiveUsers();
    const interval = setInterval(fetchActiveUsers, 4000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  // Fetch Dataset
  const loadAdminDataset = async (isBackgroundAutoSync = false) => {
    if (!isBackgroundAutoSync) {
      setIsRefreshing(true);
    }
    setFetchError("");
    try {
      const res = await fetch(`/admin-data.json?t=${Date.now()}`);
      if (!res.ok) throw new Error("Failed to load admin analytics dataset");
      const json = await res.json();
      setRawData(json);
      
      const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLastSyncedTime(nowStr);
      setSecondsUntilNextSync(autoSyncIntervalSeconds);

      if (isBackgroundAutoSync) {
        setShowSyncSuccessToast(true);
        setTimeout(() => setShowSyncSuccessToast(false), 3500);
      }
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

  // Real-Time 5-Minute Auto-Sync Countdown Timer Effect
  useEffect(() => {
    if (!isAuthenticated || autoSyncIntervalSeconds <= 0) return;

    const timer = setInterval(() => {
      setSecondsUntilNextSync((prev) => {
        if (prev <= 1) {
          // Trigger Auto Background Sync
          loadAdminDataset(true);
          return autoSyncIntervalSeconds;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isAuthenticated, autoSyncIntervalSeconds]);

  // Dynamically compute dataset filtered by time range (24h, 7d, 14d, 30d, 3m, 6m, 9m, 12m, all)
  const filteredData = useMemo(() => {
    if (!rawData) return null;

    // Generate fresh date keys up to TODAY so everyday data is always up-to-date
    const today = new Date();
    const freshDateKeys: string[] = [];
    for (let i = 364; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      freshDateKeys.push(d.toISOString().split('T')[0]);
    }

    // Generate fresh hour keys up to current hour
    const currentHour = today.getHours();
    const freshHourKeys: string[] = [];
    for (let i = 23; i >= 0; i--) {
      const h = (currentHour - i + 24) % 24;
      const hStr = h.toString().padStart(2, '0') + ':00';
      freshHourKeys.push(hStr);
    }

    const totalDays = freshDateKeys.length;

    let is24h = timeRange === "24h";
    let targetKeys = is24h ? freshHourKeys : freshDateKeys;
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
      targetKeys = freshDateKeys.slice(-sliceDays);
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
          const hKey = freshHourKeys[hIdx] || `${hIdx}:00`;
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
          const dKey = freshDateKeys[i];
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

  if (!isMounted || isAuthenticated === null || isAuthenticated === false) {
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
        onRefresh={() => loadAdminDataset(false)}
        onLogout={handleLogout}
        isRefreshing={isRefreshing}
        totalBlogsCount={filteredData?.blogs?.length || 5109}
        totalCollegesCount={filteredData?.colleges?.length || 654}
        activeNow={activeNow}
        autoSyncIntervalSeconds={autoSyncIntervalSeconds}
        setAutoSyncIntervalSeconds={handleUpdateAutoSyncInterval}
        secondsUntilNextSync={secondsUntilNextSync}
        lastSyncedTime={lastSyncedTime}
      />

      {/* Sticky Time Range & Real-Time Sync Bar */}
      <div className="bg-slate-950/90 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-2.5 backdrop-blur-sm sticky top-16 z-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <TimeRangeSelector
            selectedRange={timeRange}
            onRangeChange={setTimeRange}
          />

          <div className="flex items-center gap-3 text-[11px] font-mono">
            {/* Real-time sync rule status */}
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>5-Min Auto-Sync Rule Active: Next refresh in <strong className="text-amber-400">{Math.floor(secondsUntilNextSync / 60)}m {secondsUntilNextSync % 60}s</strong></span>
            </div>

            <div className="text-slate-400 hidden sm:block">
              Window: <span className="text-amber-400 font-bold uppercase">{timeRange === "24h" ? "Last 24 Hours (Hourly)" : timeRange}</span> ({filteredData?.dateKeys?.length || 0} {filteredData?.is24h ? "hourly slots" : "days window"})
            </div>
          </div>
        </div>
      </div>

      {/* Background Auto-Sync Toast */}
      {showSyncSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-semibold shadow-2xl backdrop-blur-md animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Real-time dataset auto-synced (5-min rule executed)</span>
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {isLoadingData ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3 text-slate-400">
            <div className="w-8 h-8 border-3 border-amber-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-semibold">Loading 5,109+ blog & 654+ college analytics...</span>
          </div>
        ) : fetchError ? (
          <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5" />
              <span>{fetchError}</span>
            </div>
            <button
              onClick={() => loadAdminDataset(false)}
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

            {activeTab === "consultant-seo" && (
              <EducationSeoStrategyTab
                blogs={filteredData.blogs || []}
                colleges={filteredData.colleges || []}
                summary={filteredData.summary}
              />
            )}

            {activeTab === "colleges" && (
              <CollegesTab colleges={filteredData.colleges || []} />
            )}

            {activeTab === "seo" && (
              <SeoStudioTab
                blogs={filteredData.blogs || []}
                summary={filteredData.summary}
              />
            )}

            {activeTab === "diff" && (
              <DiffInspectorTab
                blogs={filteredData.blogs || []}
                colleges={filteredData.colleges || []}
                recentCommits={filteredData.recentCommits || []}
                sampleDiffs={filteredData.sampleDiffs || []}
              />
            )}

            {activeTab === "realtime" && (
              <RealTimeTrafficTab
                blogs={filteredData.blogs || []}
                pages={filteredData.pages || []}
              />
            )}

            {activeTab === "abtest" && (
              <ABTestingTab blogs={filteredData.blogs || []} />
            )}

            {activeTab === "blogs" && (
              <BlogAnalyticsTab
                blogs={filteredData.blogs || []}
                categories={Object.keys(filteredData.categoryStats || {})}
                dateKeys={filteredData.dateKeys || []}
                selectedBlog={selectedBlog}
                onSelectBlog={setSelectedBlog}
                is24h={filteredData.is24h}
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
              <LeadsOverviewTab
                summary={filteredData.summary}
                leads={filteredData.leads || []}
                subscribers={filteredData.subscribers || []}
              />
            )}
          </>
        ) : null}
      </main>
    </div>
  );
}
