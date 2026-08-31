"use client";

import { LogOut, RefreshCw, BarChart3, Globe, FileText, MapPin, MousePointerClick, Users, Shield, Zap, Sparkles, FlaskConical, GraduationCap, GitCompare } from "lucide-react";

interface AdminHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onRefresh: () => void;
  onLogout: () => void;
  isRefreshing: boolean;
  totalBlogsCount: number;
  totalCollegesCount?: number;
  activeNow?: number;
}

export function AdminHeader({
  activeTab,
  setActiveTab,
  onRefresh,
  onLogout,
  isRefreshing,
  totalBlogsCount,
  totalCollegesCount = 654,
  activeNow = 0
}: AdminHeaderProps) {
  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "colleges", label: `🎓 Colleges (${totalCollegesCount})`, icon: GraduationCap },
    { id: "seo", label: "🌐 SEO & GEO Studio", icon: Sparkles },
    { id: "diff", label: "🔄 Diff & Revisions", icon: GitCompare },
    { id: "leads", label: "👥 Leads & Inquiries", icon: Users },
    { id: "blogs", label: `📝 Blogs (${totalBlogsCount})`, icon: FileText },
    { id: "realtime", label: "⚡ Real-Time Traffic", icon: Zap },
    { id: "abtest", label: "🧪 A/B Testing", icon: FlaskConical },
    { id: "pages", label: "📄 Page Views", icon: Globe },
    { id: "locations", label: "📍 Visitor Locations", icon: MapPin },
    { id: "clicks", label: "👆 Clicks & CTR", icon: MousePointerClick },
  ];

  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30 font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black text-lg shadow-md shadow-amber-500/20">
              M
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-lg tracking-tight">CareerWithMohit</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Admin Command Hub
                </span>
              </div>
              <p className="text-xs text-slate-400">Real Data • 5,095+ Posts • 654 Colleges • Live SEO & Diffs</p>
            </div>
          </div>

          {/* Action Buttons & Live Badge */}
          <div className="flex items-center gap-3">
            {/* Live Active Badge */}
            <div
              onClick={() => setActiveTab("realtime")}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold cursor-pointer hover:bg-emerald-500/20 transition-all"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{activeNow} Active Now</span>
            </div>

            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium transition-all hover:text-white cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isRefreshing ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh Data</span>
            </button>

            <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />

            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-800/50 border border-slate-800 text-xs text-slate-300 hidden md:flex">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>careerwithmohit</span>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-semibold transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2 border-t border-slate-800/60">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-slate-950" : "text-amber-400"}`} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
