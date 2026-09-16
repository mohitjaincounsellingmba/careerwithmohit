"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAdminSession, isSessionValid, clearAdminSession } from "@/lib/admin-auth";
import { LeadsOverviewTab } from "@/components/admin/LeadsOverviewTab";
import Link from "next/link";
import { ArrowLeft, Shield, LogOut } from "lucide-react";

export default function AdminLeadsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [adminData, setAdminData] = useState<any>(null);

  useEffect(() => {
    const token = getAdminSession();
    if (!isSessionValid(token)) {
      // Also check legacy session
      const legacy = sessionStorage.getItem("admin_auth");
      if (legacy === "true") {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.replace("/admin/login");
      }
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`/admin-data.json?t=${Date.now()}`)
        .then((res) => res.json())
        .then((data) => setAdminData(data))
        .catch(() => {});
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    clearAdminSession();
    sessionStorage.removeItem("admin_auth");
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
      {/* Top Navbar */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Full Admin Dashboard</span>
            </Link>
            <span className="text-slate-500">•</span>
            <span className="text-xs font-bold text-white uppercase tracking-wider">Leads & Inquiries CRM</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-800/50 border border-slate-800 text-xs text-slate-300">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Admin Verified</span>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-semibold cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <LeadsOverviewTab
          summary={adminData?.summary}
          leads={adminData?.leads || []}
          subscribers={adminData?.subscribers || []}
        />
      </main>
    </div>
  );
}
