"use client";

import { useEffect, useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
    Download, Table as TableIcon, Users,
    Filter, Calendar, Search, Trash2,
    ChevronLeft, ChevronRight, CheckCircle2,
    RefreshCw, Lock as AdminLock
} from "lucide-react";

interface Lead {
    id: string;
    name: string;
    number: string;
    email: string;
    location: string;
    source: string;
    timestamp: string;
}

export default function AdminLeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [authError, setAuthError] = useState(false);

    useEffect(() => {
        const savedAuth = sessionStorage.getItem("admin_auth");
        if (savedAuth === "true") {
            setIsAuthenticated(true);
            fetchLeads();
        } else {
            setLoading(false);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Since we can't easily use server-side ENVs here without a dedicated login API, 
        // we'll use a standard admin password for now, or the user can change it.
        if (passwordInput === "mohitadmin2026") {
            setIsAuthenticated(true);
            sessionStorage.setItem("admin_auth", "true");
            fetchLeads();
        } else {
            setAuthError(true);
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem("admin_auth");
        setLeads([]);
    };

    const fetchLeads = async (isManual = false) => {
        if (isManual) setLoading(true);
        try {
            const res = await fetch("/api/leads", {
                headers: {
                    'x-admin-secret': 'mohitadmin2026'
                }
            });
            const data = await res.json();
            if (res.status === 401) {
                handleLogout();
                return;
            }
            // Sort by latest first
            setLeads(data.sort((a: Lead, b: Lead) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
        } catch (error) {
            console.error("Failed to fetch leads");
        } finally {
            setLoading(false);
        }
    };

    const downloadCSV = () => {
        // Collect all possible keys from 'details' objects
        const detailKeys = Array.from(new Set(leads.flatMap(l => Object.keys((l as any).details || {}))));

        const headers = ["ID", "Name", "Number", "Email", "Location", "Source", "Date", ...detailKeys];

        const rows = leads.map(l => {
            const base = [
                l.id,
                l.name,
                l.number,
                l.email,
                l.location,
                l.source,
                new Date(l.timestamp).toLocaleString()
            ];
            const extra = detailKeys.map(key => (l as any).details?.[key] || "");
            return [...base, ...extra];
        });

        const csvContent = [
            headers.join(","),
            ...rows.map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `leads_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredLeads = leads.filter(l =>
        l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!isAuthenticated) {
        return (
            <main className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
                <div className="w-full max-w-md bg-white border-8 border-foreground p-10 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex justify-center mb-8">
                        <div className="bg-primary p-4 border-4 border-foreground">
                            <AdminLock size={40} className="text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-black uppercase text-center mb-6 italic">Admin <span className="text-primary">Access</span></h1>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest mb-2">Security Key</label>
                            <input
                                type="password"
                                value={passwordInput}
                                onChange={(e) => {
                                    setPasswordInput(e.target.value);
                                    setAuthError(false);
                                }}
                                className={`w-full h-14 bg-slate-50 border-4 ${authError ? 'border-red-500' : 'border-foreground'} px-6 font-bold text-center text-xl focus:outline-none focus:bg-white`}
                                placeholder="••••••••"
                                required
                            />
                            {authError && <p className="text-red-500 text-[10px] font-black uppercase mt-2 text-center">Incorrect Password</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full h-16 bg-foreground text-white font-black uppercase tracking-widest hover:bg-primary transition-all active:translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        >
                            Unlock Dashboard
                        </button>
                    </form>
                    <p className="mt-8 text-[10px] font-bold text-slate-400 text-center uppercase">Secure Environment &bull; Authorized Personnel Only</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 pt-32 pb-24 px-6 md:px-12 relative">
            <button
                onClick={handleLogout}
                className="fixed top-8 right-8 z-50 bg-red-500 text-white border-4 border-foreground px-4 py-2 font-black uppercase text-[10px] shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-black hover:-translate-y-1 active:translate-y-0 active:shadow-none transition-all"
            >
                Logout
            </button>
            <div className="max-w-7xl mx-auto">
                <Breadcrumbs />

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-foreground text-white px-4 py-1 mb-4 border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(37,99,235,1)]">
                            <Users className="w-4 h-4 text-primary" />
                            <span className="text-xs font-black uppercase tracking-widest">Lead Management</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                            Admin <span className="text-primary italic">Dashboard</span>
                        </h1>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => fetchLeads(true)}
                            className="bg-white text-foreground border-4 border-foreground px-6 py-4 font-black uppercase text-sm hover:bg-slate-100 transition-all flex items-center justify-center gap-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
                        >
                            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                            Refresh
                        </button>
                        <button
                            onClick={downloadCSV}
                            disabled={leads.length === 0}
                            className="bg-green-500 text-white border-4 border-foreground px-8 py-4 font-black uppercase text-sm hover:bg-black transition-all flex items-center justify-center gap-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50"
                        >
                            <Download className="w-5 h-5" />
                            Export to CSV / Excel
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white border-4 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <div className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Total Leads</div>
                        <div className="text-5xl font-black italic">{leads.length}</div>
                    </div>
                    <div className="bg-white border-4 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(37,99,235,1)]">
                        <div className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Today</div>
                        <div className="text-5xl font-black italic">
                            {leads.filter(l => new Date(l.timestamp).toDateString() === new Date().toDateString()).length}
                        </div>
                    </div>
                    <div className="bg-white border-4 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(34,197,94,1)]">
                        <div className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Status</div>
                        <div className="text-2xl font-black uppercase flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div> Active
                        </div>
                    </div>
                </div>

                {/* Search & Table */}
                <div className="bg-white border-4 border-foreground overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                    <div className="p-6 border-b-4 border-foreground bg-slate-50 flex items-center gap-4">
                        <Search className="w-6 h-6 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search leads by name, source, or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent border-none outline-none font-bold text-lg w-full placeholder:text-slate-300"
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-foreground text-white uppercase text-[10px] font-black tracking-widest">
                                    <th className="p-4 border-r border-slate-700">Date</th>
                                    <th className="p-4 border-r border-slate-700">Name</th>
                                    <th className="p-4 border-r border-slate-700">Contact</th>
                                    <th className="p-4 border-r border-slate-700">Location</th>
                                    <th className="p-4 border-r border-slate-700">Source</th>
                                    <th className="p-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="p-20 text-center font-black uppercase animate-pulse text-slate-300 italic text-2xl">
                                            Loading Leads...
                                        </td>
                                    </tr>
                                ) : filteredLeads.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="p-20 text-center font-black uppercase text-slate-300 italic text-2xl">
                                            No leads found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredLeads.map((lead) => (
                                        <tr key={lead.id} className="border-b-2 border-slate-100 hover:bg-slate-50 transition-colors">
                                            <td className="p-4 font-bold text-xs text-slate-400">
                                                {new Date(lead.timestamp).toLocaleDateString()}
                                                <br />
                                                <span className="text-[10px] opacity-50">{new Date(lead.timestamp).toLocaleTimeString()}</span>
                                            </td>
                                            <td className="p-4 font-black uppercase text-sm">{lead.name}</td>
                                            <td className="p-4">
                                                <div className="font-bold text-sm tracking-tighter">{lead.number}</div>
                                                <div className="text-xs text-slate-400 font-medium">{lead.email}</div>
                                            </td>
                                            <td className="p-4 font-bold text-sm uppercase">{lead.location}</td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 text-[10px] font-black uppercase border-2 ${lead.source.includes('JEE') ? 'bg-blue-50 border-blue-200 text-blue-600' :
                                                    lead.source.includes('CAT') ? 'bg-orange-50 border-orange-200 text-orange-600' :
                                                        'bg-slate-100 border-slate-200 text-slate-600'
                                                    }`}>
                                                    {lead.source}
                                                </span>
                                                {(lead as any).details && Object.keys((lead as any).details).length > 0 && (
                                                    <div className="mt-2 text-[10px] font-bold text-slate-400">
                                                        {Object.entries((lead as any).details).map(([k, v]) => (
                                                            <div key={k}>{k}: {String(v)}</div>
                                                        ))}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <button className="text-slate-300 hover:text-red-500 transition-colors">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}
