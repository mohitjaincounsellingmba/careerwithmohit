"use client";

import { useState } from "react";
import {
  LogOut,
  RefreshCw,
  Zap,
  Lightbulb,
  Users,
  Clock,
  ChevronDown,
  CheckCircle2,
  Shield,
  Activity
} from "lucide-react";

interface AdminHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onRefresh: () => void;
  onLogout: () => void;
  isRefreshing: boolean;
  totalBlogsCount: number;
  totalCollegesCount?: number;
  totalLeadsCount?: number;
  activeNow?: number;
  autoSyncIntervalSeconds?: number;
  setAutoSyncIntervalSeconds?: (seconds: number) => void;
  secondsUntilNextSync?: number;
  lastSyncedTime?: string;
}

export function AdminHeader({
  activeTab,
  setActiveTab,
  onRefresh,
  onLogout,
  isRefreshing,
  totalBlogsCount,
  totalCollegesCount = 654,
  totalLeadsCount,
  activeNow = 0,
  autoSyncIntervalSeconds = 300,
  setAutoSyncIntervalSeconds,
  secondsUntilNextSync = 300,
  lastSyncedTime = "Just now"
}: AdminHeaderProps) {
  const [showSyncMenu, setShowSyncMenu] = useState(false);

  // Strictly 3 Focused Sections: Traffic, Blogs Suggestion, Manage Leads (Google Sheet Synced)
  const tabs = [
    { id: "traffic", label: "⚡ Traffic Section", icon: Zap },
    { id: "blogs-suggestion", label: "💡 Blogs Suggestion Section", icon: Lightbulb },
    { id: "leads", label: totalLeadsCount !== undefined ? `👥 Manage Leads (${totalLeadsCount})` : "👥 Manage Leads Section", icon: Users },
  ];

  const formatCountdown = (secs: number) => {
    if (autoSyncIntervalSeconds === 0) return "Paused";
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const syncOptions = [
    { label: "Every 1 Minute", value: 60 },
    { label: "Every 3 Minutes", value: 180 },
    { label: "Every 5 Minutes (Default)", value: 300 },
    { label: "Every 10 Minutes", value: 600 },
    { label: "Pause Auto-Sync", value: 0 },
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
                  Admin Hub
                </span>
              </div>
              <p className="text-xs text-slate-400">Traffic • Blogs Suggestion • Manage Leads</p>
            </div>
          </div>

          {/* Action Buttons & Live Telemetry Badge */}
          <div className="flex items-center gap-2.5">
            {/* Real-Time Auto-Sync Countdown Badge */}
            <div className="relative">
              <button
                onClick={() => setShowSyncMenu(!showSyncMenu)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-all cursor-pointer"
                title="Configure Auto-Refresh Interval"
              >
                <span className="relative flex h-2 w-2">
                  {autoSyncIntervalSeconds > 0 && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  )}
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${autoSyncIntervalSeconds > 0 ? "bg-amber-500" : "bg-slate-500"}`}></span>
                </span>
                <span className="hidden sm:inline text-slate-400">Auto-Sync:</span>
                <span className="font-mono text-amber-400 font-bold">
                  {formatCountdown(secondsUntilNextSync)}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {/* Sync Interval Menu Dropdown */}
              {showSyncMenu && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50 space-y-1">
                  <div className="px-3 py-2 border-b border-slate-800 flex items-center justify-between text-xs">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      Auto-Refresh Interval
                    </span>
                    <span className="text-[10px] text-slate-400">{lastSyncedTime}</span>
                  </div>
                  {syncOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        if (setAutoSyncIntervalSeconds) {
                          setAutoSyncIntervalSeconds(opt.value);
                        }
                        setShowSyncMenu(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                        autoSyncIntervalSeconds === opt.value
                          ? "bg-amber-500 text-slate-950 font-bold"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      <span>{opt.label}</span>
                      {autoSyncIntervalSeconds === opt.value && (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  ))}
                  <div className="p-2 border-t border-slate-800">
                    <button
                      onClick={() => {
                        onRefresh();
                        setShowSyncMenu(false);
                      }}
                      className="w-full py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-bold transition-all text-center cursor-pointer"
                    >
                      ⚡ Force Sync Right Now
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Live Active Visitors Badge */}
            <div
              onClick={() => setActiveTab("traffic")}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold cursor-pointer hover:bg-emerald-500/20 transition-all"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{activeNow} Active</span>
            </div>

            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium transition-all hover:text-white cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isRefreshing ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />

            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-semibold transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation - Focused on strictly 3 core tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2.5 border-t border-slate-800/60">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-extrabold scale-[1.02]"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60 bg-slate-950/40 border border-slate-800/60"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-slate-950" : "text-amber-400"}`} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
