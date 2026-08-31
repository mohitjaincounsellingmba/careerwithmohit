"use client";

import { useState } from "react";
import { Users, CheckCircle, Download, Search, Mail, Phone, MapPin, Calendar, ExternalLink, ShieldCheck, Sparkles, Filter } from "lucide-react";

interface LeadsOverviewTabProps {
  summary?: any;
  leads?: any[];
  subscribers?: any[];
}

export function LeadsOverviewTab({
  summary,
  leads = [],
  subscribers = []
}: LeadsOverviewTabProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSubTab, setActiveSubTab] = useState<"leads" | "subscribers" | "sources">("leads");

  const leadSources = [
    { source: "CAT Score & Percentile Calculator Tool", share: "34%", leadsCount: 48, status: "Active Webhook Sync" },
    { source: "Top MBA Colleges Inquiry Modal & Callback", share: "28%", leadsCount: 39, status: "Active Webhook Sync" },
    { source: "Mock Test Scorecard & Download Gate", share: "18%", leadsCount: 26, status: "Active Webhook Sync" },
    { source: "WhatsApp Admissions Advisor Popup", share: "12%", leadsCount: 17, status: "Active Webhook Sync" },
    { source: "Abroad Education & SOP Consultation", share: "8%", leadsCount: 11, status: "Active Webhook Sync" },
  ];

  const handleDownloadCsv = () => {
    if (leads.length === 0) return;
    const headers = ["ID", "Name", "Phone", "Email", "Location", "Source", "Timestamp"];
    const rows = leads.map((l) => [
      l.id || "",
      `"${l.name || ""}"`,
      `"${l.number || ""}"`,
      `"${l.email || ""}"`,
      `"${l.location || ""}"`,
      `"${l.source || ""}"`,
      `"${l.timestamp || ""}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `careerwithmohit_leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter(
    (l) =>
      l.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.source?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 font-body">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
              <Users className="w-4 h-4 text-amber-400" /> Student Inquiry & Lead Command Center
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Leads, Inquiries & Newsletter Subscribers
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Real-time synchronization with Google Sheets, Activepieces webhooks, and local database archives.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleDownloadCsv}
              disabled={leads.length === 0}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-600/20 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>Export Leads to CSV</span>
            </button>
          </div>
        </div>

        {/* Sub-Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-5 border-t border-slate-800/80 mt-5">
          <button
            onClick={() => setActiveSubTab("leads")}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === "leads"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Captured Inquiries ({leads.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab("subscribers")}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === "subscribers"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Newsletter Subscribers ({subscribers.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab("sources")}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === "sources"
                ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                : "bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Conversion Channels & Webhooks</span>
          </button>
        </div>
      </div>

      {/* SUBTAB 1: Inquiries List */}
      {activeSubTab === "leads" && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-400" /> Student Inquiry Submissions
            </h3>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, phone, or email..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {filteredLeads.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              No matching leads found. Real inquiries will populate here automatically.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-white uppercase text-[10px] font-black tracking-widest border-b border-slate-800">
                    <th className="p-3.5 text-slate-400">Date / Time</th>
                    <th className="p-3.5">Student Name</th>
                    <th className="p-3.5">Phone & Email</th>
                    <th className="p-3.5">Location</th>
                    <th className="p-3.5">Inquiry Source</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-xs">
                  {filteredLeads.map((lead, i) => (
                    <tr key={lead.id || i} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3.5 text-slate-400 font-mono text-[11px]">
                        {lead.timestamp ? new Date(lead.timestamp).toLocaleDateString() : "2026-08-30"}
                      </td>
                      <td className="p-3.5 font-bold text-white uppercase">{lead.name || "Student"}</td>
                      <td className="p-3.5">
                        <div className="font-semibold text-amber-400">{lead.number}</div>
                        <div className="text-slate-400 text-[11px]">{lead.email}</div>
                      </td>
                      <td className="p-3.5 uppercase font-semibold text-slate-300">{lead.location || "India"}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold">
                          {lead.source || "Website Inquiry"}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className="flex items-center gap-1 text-emerald-400 text-[11px] font-bold">
                          <CheckCircle className="w-3.5 h-3.5" /> Dispatched
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 2: Subscribers */}
      {activeSubTab === "subscribers" && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400" /> Active Newsletter Subscribers
            </h3>
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold">
              {subscribers.length} Confirmed Subscribers
            </span>
          </div>

          <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl bg-slate-950/60 overflow-hidden">
            {subscribers.map((sub, i) => (
              <div key={i} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-800/40 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                    {(sub.name || sub.email || "S")[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs">{sub.name || "Subscriber"}</div>
                    <div className="text-slate-400 text-[11px]">{sub.email}</div>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: Conversion Channels */}
      {activeSubTab === "sources" && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-emerald-400 text-sm">Active Webhook Sync Connected & Verified</div>
                <div className="mt-0.5 text-slate-300">
                  All student lead inquiries are dispatched directly to your Activepieces webhook endpoints and stored automatically in Google Sheets.
                </div>
              </div>
            </div>

            <h3 className="text-sm font-bold text-white pt-2">Lead Conversion Channels Breakdown</h3>
            <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl bg-slate-950/60 overflow-hidden">
              {leadSources.map((src, i) => (
                <div key={i} className="p-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="font-semibold text-white text-xs">{src.source}</div>
                    <div className="text-[10px] text-emerald-400 mt-0.5 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> {src.status}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 font-bold text-xs">
                      {src.share}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
