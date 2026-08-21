"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAdminSession, isSessionValid, clearAdminSession } from "@/lib/admin-auth";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { OverviewTab } from "@/components/admin/OverviewTab";
import { RealTimeTrafficTab } from "@/components/admin/RealTimeTrafficTab";
import { BlogAnalyticsTab } from "@/components/admin/BlogAnalyticsTab";
import { PageAnalyticsTab } from "@/components/admin/PageAnalyticsTab";
import { LocationAnalyticsTab } from "@/components/admin/LocationAnalyticsTab";
import { ClicksImpressionsTab } from "@/components/admin/ClicksImpressionsTab";
import { LeadsOverviewTab } from "@/components/admin/LeadsOverviewTab";
import { RefreshCw, AlertCircle } from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [data, setData] = useState<any | null>(null);
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
      setData(json);
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
        totalBlogsCount={data?.blogs?.length || 0}
      />

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
        ) : data ? (
          <>
            {activeTab === "overview" && (
              <OverviewTab
                data={data}
                setActiveTab={setActiveTab}
                onSelectBlog={(blog) => {
                  setSelectedBlog(blog);
                  setActiveTab("blogs");
                }}
              />
            )}

            {activeTab === "realtime" && (
              <RealTimeTrafficTab
                blogs={data.blogs || []}
                pages={data.pages || []}
              />
            )}

            {activeTab === "blogs" && (
              <BlogAnalyticsTab
                blogs={data.blogs || []}
                categories={Object.keys(data.categoryStats || {})}
                dateKeys={data.dateKeys || []}
                selectedBlog={selectedBlog}
                onSelectBlog={setSelectedBlog}
              />
            )}

            {activeTab === "pages" && (
              <PageAnalyticsTab
                pages={data.pages || []}
                totalViews={data.summary.totalViews}
              />
            )}

            {activeTab === "locations" && (
              <LocationAnalyticsTab
                locations={data.locations || []}
                totalViews={data.summary.totalViews}
              />
            )}

            {activeTab === "clicks" && (
              <ClicksImpressionsTab summary={data.summary} />
            )}

            {activeTab === "leads" && (
              <LeadsOverviewTab summary={data.summary} />
            )}
          </>
        ) : null}
      </main>
    </div>
  );
}
