"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Users,
  CheckCircle,
  Download,
  Search,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Filter,
  Plus,
  Trash2,
  RefreshCw,
  MessageCircle,
  Clock,
  ChevronRight,
  X,
  FileText,
  Calculator,
  GraduationCap,
  Award,
  AlertCircle,
  Layers,
  Send,
  UserCheck,
  PhoneCall,
  Flame,
  Zap,
  Volume2,
  VolumeX,
  Radio,
} from "lucide-react";
import {
  LeadItem,
  fetchAllLeads,
  subscribeToLeadsRealtime,
  updateLeadStatus,
  deleteLead,
  submitLead,
  categorizeSource,
} from "@/lib/leads";

interface LeadsOverviewTabProps {
  summary?: any;
  leads?: LeadItem[];
  subscribers?: any[];
}

export function LeadsOverviewTab({
  summary,
  leads: initialLeads = [],
  subscribers = [],
}: LeadsOverviewTabProps) {
  const [leadsList, setLeadsList] = useState<LeadItem[]>(initialLeads);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedDateRange, setSelectedDateRange] = useState<string>("all");
  const [activeSubTab, setActiveSubTab] = useState<"leads" | "subscribers" | "sources">("leads");

  // Real-Time Notification & Highlight State
  const [newlyArrivedLead, setNewlyArrivedLead] = useState<LeadItem | null>(null);
  const [newlyArrivedLeadId, setNewlyArrivedLeadId] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Lead Profile Drawer / Detail Modal
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [newNoteText, setNewNoteText] = useState("");
  const [isSavingNote, setIsSavingNote] = useState(false);

  // Add Manual Lead Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [manualForm, setManualForm] = useState({
    name: "",
    number: "",
    email: "",
    location: "Online",
    source: "Phone / Direct Inquiry",
    category: "inquiry" as LeadItem["category"],
    course: "MBA / PGDM",
    college: "",
    score: "",
    percentile: "",
    status: "New" as LeadItem["status"],
    notes: "",
  });

  // Success toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Sound preference persistence
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cwm_admin_lead_sound");
      if (saved !== null) {
        setSoundEnabled(saved === "true");
      }
    } catch (e) {}
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    try {
      localStorage.setItem("cwm_admin_lead_sound", String(next));
    } catch (e) {}
    showToast(next ? "🔔 Audio alerts enabled for new leads" : "🔕 Audio alerts muted");
  };

  // Web Audio API synthesized lead alert chime
  const playLeadChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const now = ctx.currentTime;

      // Note 1: E5 (659.25 Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(659.25, now);
      gain1.gain.setValueAtTime(0.2, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.35);

      // Note 2: B5 (987.77 Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(987.77, now + 0.12);
      gain2.gain.setValueAtTime(0.25, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.55);

      // Note 3: E6 (1318.51 Hz)
      const osc3 = ctx.createOscillator();
      const gain3 = ctx.createGain();
      osc3.type = "sine";
      osc3.frequency.setValueAtTime(1318.51, now + 0.24);
      gain3.gain.setValueAtTime(0.2, now + 0.24);
      gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.75);
      osc3.connect(gain3);
      gain3.connect(ctx.destination);
      osc3.start(now + 0.24);
      osc3.stop(now + 0.75);
    } catch (e) {}
  };

  // Real-time live subscription on mount
  useEffect(() => {
    const unsubscribe = subscribeToLeadsRealtime(
      (updatedLeads) => {
        setLeadsList(updatedLeads);
      },
      initialLeads,
      (newLead) => {
        // Instant 0ms prepend into local list state
        setLeadsList((prev) => {
          if (prev.some((l) => l.id === newLead.id)) return prev;
          return [newLead, ...prev];
        });

        // Set live real-time alert card
        setNewlyArrivedLead(newLead);
        setNewlyArrivedLeadId(newLead.id);

        // Play chime if enabled
        if (soundEnabled) {
          playLeadChime();
        }

        showToast(`⚡ New lead received: ${newLead.name} (${newLead.source || "Inquiry"})`);

        // Fade highlight after 8 seconds
        setTimeout(() => {
          setNewlyArrivedLeadId((curr) => (curr === newLead.id ? null : curr));
        }, 8000);
      }
    );

    return () => unsubscribe();
  }, [initialLeads, soundEnabled]);

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      const fresh = await fetchAllLeads(initialLeads);
      setLeadsList(fresh);
      showToast("Leads synced with live database");
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (leadId: string, newStatus: LeadItem["status"]) => {
    try {
      await updateLeadStatus(leadId, newStatus);
      setLeadsList((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
      );
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
      showToast(`Status updated to "${newStatus}"`);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newNoteText.trim()) return;
    setIsSavingNote(true);
    try {
      await updateLeadStatus(selectedLead.id, selectedLead.status, newNoteText.trim());
      const updatedNotes = [
        { text: newNoteText.trim(), timestamp: new Date().toISOString() },
        ...(selectedLead.notes || []),
      ];
      setSelectedLead({ ...selectedLead, notes: updatedNotes });
      setLeadsList((prev) =>
        prev.map((l) => (l.id === selectedLead.id ? { ...l, notes: updatedNotes } : l))
      );
      setNewNoteText("");
      showToast("Note added successfully");
    } catch (e) {
      console.error(e);
    } finally {
      setIsSavingNote(false);
    }
  };

  const handleDelete = async (leadId: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
      await deleteLead(leadId);
      setLeadsList((prev) => prev.filter((l) => l.id !== leadId));
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead(null);
      }
      showToast("Lead removed");
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddManualLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualForm.name || !manualForm.number) {
      alert("Name and phone number are required.");
      return;
    }

    try {
      const res = await submitLead({
        name: manualForm.name,
        number: manualForm.number,
        email: manualForm.email,
        location: manualForm.location,
        source: manualForm.source,
        category: manualForm.category,
        course: manualForm.course,
        college: manualForm.college,
        score: manualForm.score || undefined,
        percentile: manualForm.percentile || undefined,
        status: manualForm.status,
        details: {
          manualEntry: true,
          initialNote: manualForm.notes,
        },
      });

      if (res.success) {
        setShowAddModal(false);
        setManualForm({
          name: "",
          number: "",
          email: "",
          location: "Online",
          source: "Phone / Direct Inquiry",
          category: "inquiry",
          course: "MBA / PGDM",
          college: "",
          score: "",
          percentile: "",
          status: "New",
          notes: "",
        });
        showToast("Lead added successfully!");
        handleRefresh();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Filtered Leads Calculation
  const filteredLeads = useMemo(() => {
    return leadsList.filter((lead) => {
      // 1. Search Query
      const q = searchTerm.toLowerCase();
      const matchSearch =
        !searchTerm ||
        lead.name?.toLowerCase().includes(q) ||
        lead.number?.toLowerCase().includes(q) ||
        lead.email?.toLowerCase().includes(q) ||
        lead.location?.toLowerCase().includes(q) ||
        lead.source?.toLowerCase().includes(q) ||
        lead.college?.toLowerCase().includes(q) ||
        lead.course?.toLowerCase().includes(q);

      if (!matchSearch) return false;

      // 2. Category Filter
      const cat = lead.category || categorizeSource(lead.source);
      if (selectedCategory !== "all" && cat !== selectedCategory) {
        return false;
      }

      // 3. Status Filter
      const stat = lead.status || "New";
      if (selectedStatus !== "all" && stat !== selectedStatus) {
        return false;
      }

      // 4. Date Range Filter
      if (selectedDateRange !== "all") {
        const leadDate = new Date(lead.timestamp || 0);
        const now = new Date();
        const diffDays = (now.getTime() - leadDate.getTime()) / (1000 * 60 * 60 * 24);

        if (selectedDateRange === "today" && diffDays > 1) return false;
        if (selectedDateRange === "7d" && diffDays > 7) return false;
        if (selectedDateRange === "30d" && diffDays > 30) return false;
      }

      return true;
    });
  }, [leadsList, searchTerm, selectedCategory, selectedStatus, selectedDateRange]);

  // KPI Counts
  const kpis = useMemo(() => {
    const today = new Date().toDateString();
    const todayCount = leadsList.filter(
      (l) => new Date(l.timestamp || 0).toDateString() === today
    ).length;

    const calculatorsCount = leadsList.filter(
      (l) => (l.category || categorizeSource(l.source)) === "calculator"
    ).length;

    const brochuresCount = leadsList.filter(
      (l) => (l.category || categorizeSource(l.source)) === "brochure" || (l.category || categorizeSource(l.source)) === "starterkit"
    ).length;

    const inquiriesCount = leadsList.filter(
      (l) => (l.category || categorizeSource(l.source)) === "inquiry"
    ).length;

    const mockTestsCount = leadsList.filter(
      (l) => (l.category || categorizeSource(l.source)) === "mocktest"
    ).length;

    const bookingsCount = leadsList.filter(
      (l) => (l.category || categorizeSource(l.source)) === "booking"
    ).length;

    const convertedCount = leadsList.filter((l) => l.status === "Converted").length;
    const conversionRate = leadsList.length > 0 ? ((convertedCount / leadsList.length) * 100).toFixed(1) + "%" : "0.0%";

    return {
      total: leadsList.length,
      today: todayCount,
      calculators: calculatorsCount,
      brochures: brochuresCount,
      inquiries: inquiriesCount,
      mockTests: mockTestsCount,
      bookings: bookingsCount,
      converted: convertedCount,
      conversionRate,
    };
  }, [leadsList]);

  const handleDownloadCsv = () => {
    if (leadsList.length === 0) return;
    const detailKeys = Array.from(
      new Set(leadsList.flatMap((l) => Object.keys(l.details || {})))
    );

    const headers = [
      "Lead ID",
      "Timestamp (IST)",
      "Student Name",
      "Phone Number",
      "Email Address",
      "Location",
      "Category",
      "Source",
      "Course / Program",
      "Target College",
      "Score",
      "Percentile",
      "Status",
      ...detailKeys,
    ];

    const rows = leadsList.map((l) => {
      const base = [
        `"${l.id || ""}"`,
        `"${l.timestamp ? new Date(l.timestamp).toLocaleString("en-IN") : ""}"`,
        `"${(l.name || "").replace(/"/g, '""')}"`,
        `"${l.number || l.phone || ""}"`,
        `"${l.email || ""}"`,
        `"${(l.location || "").replace(/"/g, '""')}"`,
        `"${l.category || categorizeSource(l.source)}"`,
        `"${(l.source || "").replace(/"/g, '""')}"`,
        `"${(l.course || "").replace(/"/g, '""')}"`,
        `"${(l.college || "").replace(/"/g, '""')}"`,
        `"${l.score !== undefined ? l.score : ""}"`,
        `"${l.percentile !== undefined ? l.percentile : ""}"`,
        `"${l.status || "New"}"`,
      ];
      const extra = detailKeys.map((k) => `"${String((l.details as any)?.[k] || "").replace(/"/g, '""')}"`);
      return [...base, ...extra].join(",");
    });

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `careerwithmohit_leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getCategoryBadge = (category?: string, source: string = "") => {
    const cat = category || categorizeSource(source);
    switch (cat) {
      case "calculator":
        return {
          label: "🧮 Calculator",
          className: "bg-purple-500/15 text-purple-400 border-purple-500/30",
        };
      case "brochure":
        return {
          label: "📥 Brochure",
          className: "bg-blue-500/15 text-blue-400 border-blue-500/30",
        };
      case "starterkit":
        return {
          label: "🚀 Starter Kit",
          className: "bg-sky-500/15 text-sky-400 border-sky-500/30",
        };
      case "mocktest":
        return {
          label: "🧪 Mock Test",
          className: "bg-amber-500/15 text-amber-400 border-amber-500/30",
        };
      case "booking":
        return {
          label: "📅 1-on-1 Session",
          className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
        };
      default:
        return {
          label: "💬 Inquiry",
          className: "bg-slate-500/15 text-slate-300 border-slate-500/30",
        };
    }
  };

  const getStatusBadge = (status: string = "New") => {
    switch (status) {
      case "New":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "Contacted":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "In Discussion":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Converted":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "Cold":
        return "bg-slate-700/40 text-slate-400 border-slate-700";
      default:
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    }
  };

  const createWhatsAppUrl = (lead: LeadItem) => {
    const rawPhone = lead.number || lead.phone || "";
    const cleanPhone = rawPhone.replace(/\D/g, "");
    const phoneWithCountry = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const msg = `Hi ${lead.name || "there"}, I'm reaching out from CareerWithMohit regarding your recent inquiry on ${lead.source || "our portal"}. How can I assist you with your admissions & career planning?`;
    return `https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="space-y-6 font-body">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-emerald-950/95 border border-emerald-500/40 text-emerald-300 text-xs font-semibold shadow-2xl backdrop-blur-md animate-fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 font-black">Live Real-Time Lead Stream</span>
              <span className="text-slate-500">•</span>
              <span>Admissions CRM & Inquiries</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Leads & Admissions Command Center
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl">
              Captures all student interactions in real-time across CAT/XAT/JEE/CUET/MHCET score calculators, college brochure downloads, 1-on-1 strategy sessions, starter kits, and inquiry forms.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={toggleSound}
              className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                soundEnabled
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20"
                  : "bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200"
              }`}
              title={soundEnabled ? "Mute audio alert chime" : "Enable audio alert chime"}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-amber-400" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{soundEnabled ? "Sound On" : "Sound Muted"}</span>
            </button>

            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer border border-slate-700"
              title="Force sync latest leads"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isLoading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add Lead</span>
            </button>

            <button
              onClick={handleDownloadCsv}
              disabled={leadsList.length === 0}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-600/20 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
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
            <span>Captured Inquiries ({leadsList.length})</span>
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

      {/* Real-Time Live Lead Arrival Alert Card */}
      {newlyArrivedLead && (
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-2 border-emerald-500/80 rounded-2xl p-4 shadow-2xl animate-fade-in flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3.5 w-3.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
            </span>
            <div>
              <div className="text-[11px] font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
                <span>Instant Real-Time Lead Received Right Now!</span>
                <span className="text-slate-500">•</span>
                <span className="text-amber-400">{newlyArrivedLead.timeStr || "Just now"}</span>
              </div>
              <div className="text-sm font-bold text-white mt-0.5 flex items-center gap-2 flex-wrap">
                <span>{newlyArrivedLead.name}</span>
                <span className="text-slate-400 font-mono text-xs">({newlyArrivedLead.number || newlyArrivedLead.phone})</span>
                <span className="text-slate-500">•</span>
                <span className="text-amber-400 text-xs font-semibold">{newlyArrivedLead.source}</span>
                {newlyArrivedLead.college && (
                  <span className="text-slate-300 text-xs">| {newlyArrivedLead.college}</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={createWhatsAppUrl(newlyArrivedLead)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/30 transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            <button
              onClick={() => setSelectedLead(newlyArrivedLead)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-all cursor-pointer"
            >
              Open Profile
            </button>
            <button
              onClick={() => setNewlyArrivedLead(null)}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
              title="Dismiss alert"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-md">
          <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center justify-between">
            <span>Total Leads</span>
            <Users className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white mt-1">{kpis.total}</div>
          <div className="text-[10px] text-emerald-400 mt-1 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            All Sources
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-md">
          <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center justify-between">
            <span>Today's Leads</span>
            <Flame className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-rose-400 mt-1">{kpis.today}</div>
          <div className="text-[10px] text-slate-400 mt-1">Live from today</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-md">
          <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center justify-between">
            <span>Calculators</span>
            <Calculator className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-400 mt-1">{kpis.calculators}</div>
          <div className="text-[10px] text-slate-400 mt-1">CAT, XAT, JEE, MHCET</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-md">
          <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center justify-between">
            <span>Brochures</span>
            <FileText className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-blue-400 mt-1">{kpis.brochures}</div>
          <div className="text-[10px] text-slate-400 mt-1">College & Starter Kits</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-md">
          <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center justify-between">
            <span>1-on-1 Sessions</span>
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">{kpis.bookings}</div>
          <div className="text-[10px] text-slate-400 mt-1">Advising Appointments</div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-md">
          <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider flex items-center justify-between">
            <span>Mock Tests</span>
            <Award className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">{kpis.mockTests}</div>
          <div className="text-[10px] text-slate-400 mt-1">Registered Test-Takers</div>
        </div>
      </div>

      {/* SUBTAB 1: Leads Command Stream */}
      {activeSubTab === "leads" && (
        <div className="space-y-4">
          {/* Filtering & Search Bar */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by student name, phone, email, city, college, exam..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Dropdown Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="all">All Channels (All Types)</option>
                <option value="calculator">🧮 Score Calculators</option>
                <option value="brochure">📥 Brochure Downloads</option>
                <option value="inquiry">💬 Direct Inquiries & Callbacks</option>
                <option value="mocktest">🧪 Mock Tests & Exams</option>
                <option value="booking">📅 1-on-1 Sessions</option>
                <option value="starterkit">🚀 Starter Kits</option>
              </select>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="New">🟢 New Inquiries</option>
                <option value="Contacted">🟡 Contacted</option>
                <option value="In Discussion">🔵 In Discussion</option>
                <option value="Converted">🟣 Converted</option>
                <option value="Cold">⚫ Cold</option>
              </select>

              {/* Date Filter */}
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="all">All Time</option>
                <option value="today">Today Only</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
            </div>
          </div>

          {/* Leads Table Container */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" />
                <span>Showing {filteredLeads.length} of {leadsList.length} leads</span>
              </span>
              <span>Click on any student to open detailed CRM profile</span>
            </div>

            {filteredLeads.length === 0 ? (
              <div className="py-20 text-center text-slate-400 space-y-3">
                <Users className="w-12 h-12 text-slate-600 mx-auto" />
                <div className="text-sm font-bold text-slate-300">No leads match your current filter</div>
                <div className="text-xs text-slate-500 max-w-sm mx-auto">
                  When visitors submit score calculators, download brochures, or book strategy sessions, they will instantly appear here.
                </div>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setSelectedStatus("all");
                    setSelectedDateRange("all");
                  }}
                  className="px-4 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold hover:bg-amber-500/20 transition-all cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-950/90 text-slate-400 uppercase text-[10px] font-black tracking-wider border-b border-slate-800">
                      <th className="p-3.5">Time & Date</th>
                      <th className="p-3.5">Student</th>
                      <th className="p-3.5">Contact (Call / WA)</th>
                      <th className="p-3.5">Location</th>
                      <th className="p-3.5">Channel / Source</th>
                      <th className="p-3.5">Parameters / Score</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Quick Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredLeads.map((lead) => {
                      const badge = getCategoryBadge(lead.category, lead.source);
                      const isNewlyArrived = newlyArrivedLeadId === lead.id;
                      const currentStatus = lead.status || "New";

                      return (
                        <tr
                          key={lead.id}
                          onClick={() => setSelectedLead(lead)}
                          className={`transition-all duration-700 cursor-pointer group ${
                            isNewlyArrived
                              ? "bg-emerald-500/25 ring-2 ring-emerald-400 shadow-xl shadow-emerald-500/20 animate-pulse"
                              : "hover:bg-slate-800/50"
                          }`}
                        >
                          {/* Date & Time */}
                          <td className="p-3.5 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                            <div className="font-semibold text-slate-300">
                              {lead.timestamp ? new Date(lead.timestamp).toLocaleDateString("en-IN", { month: "short", day: "numeric" }) : "Recent"}
                            </div>
                            <div className="text-[10px] text-slate-500">
                              {lead.timestamp ? new Date(lead.timestamp).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) : ""}
                            </div>
                          </td>

                          {/* Student Name */}
                          <td className="p-3.5 whitespace-nowrap">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs shrink-0 border border-amber-500/30">
                                {(lead.name || "S")[0].toUpperCase()}
                              </div>
                              <div>
                                <div className="font-bold text-white group-hover:text-amber-400 transition-colors">
                                  {lead.name || "Student Lead"}
                                </div>
                                {lead.notes && lead.notes.length > 0 && (
                                  <div className="text-[10px] text-amber-400 flex items-center gap-1 mt-0.5">
                                    <MessageCircle className="w-2.5 h-2.5" /> {lead.notes.length} note(s)
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Phone & Email */}
                          <td className="p-3.5 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center gap-2">
                              <a
                                href={`tel:${lead.number || lead.phone}`}
                                className="font-mono font-bold text-amber-400 hover:underline flex items-center gap-1 text-[11px]"
                                title="Call student"
                              >
                                <PhoneCall className="w-3 h-3 text-slate-400" />
                                {lead.number || lead.phone || "No phone"}
                              </a>
                              <a
                                href={createWhatsAppUrl(lead)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 rounded-md bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 transition-all"
                                title="Message on WhatsApp"
                              >
                                <MessageCircle className="w-3 h-3" />
                              </a>
                            </div>
                            {lead.email && (
                              <a
                                href={`mailto:${lead.email}`}
                                className="text-slate-400 hover:text-white text-[11px] block mt-0.5"
                              >
                                {lead.email}
                              </a>
                            )}
                          </td>

                          {/* Location */}
                          <td className="p-3.5 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1 text-slate-300 font-medium">
                              <MapPin className="w-3 h-3 text-slate-500" />
                              {lead.location || "Online"}
                            </span>
                          </td>

                          {/* Source / Category */}
                          <td className="p-3.5">
                            <div className="max-w-[200px]">
                              <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${badge.className}`}>
                                {badge.label}
                              </span>
                              <div className="text-[11px] text-slate-300 font-medium mt-1 truncate" title={lead.source}>
                                {lead.source}
                              </div>
                            </div>
                          </td>

                          {/* Parameters / Score */}
                          <td className="p-3.5">
                            {lead.score !== undefined || lead.percentile !== undefined ? (
                              <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-purple-950/60 border border-purple-800/40 text-purple-300 font-mono text-[11px]">
                                {lead.score !== undefined && (
                                  <span>Score: <strong className="text-white">{lead.score}</strong></span>
                                )}
                                {lead.percentile !== undefined && (
                                  <span>• <strong className="text-amber-400">{lead.percentile}%ile</strong></span>
                                )}
                              </div>
                            ) : lead.college ? (
                              <span className="text-[11px] text-slate-300 font-medium flex items-center gap-1">
                                <GraduationCap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                <span className="truncate max-w-[160px]">{lead.college}</span>
                              </span>
                            ) : lead.course ? (
                              <span className="text-[11px] text-slate-400 font-medium truncate max-w-[160px] block">
                                {lead.course}
                              </span>
                            ) : (
                              <span className="text-slate-500 text-[11px]">—</span>
                            )}
                          </td>

                          {/* Status Dropdown */}
                          <td className="p-3.5 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                            <select
                              value={currentStatus}
                              onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border cursor-pointer focus:outline-none ${getStatusBadge(currentStatus)}`}
                            >
                              <option value="New" className="bg-slate-900 text-emerald-400">🟢 New</option>
                              <option value="Contacted" className="bg-slate-900 text-amber-400">🟡 Contacted</option>
                              <option value="In Discussion" className="bg-slate-900 text-blue-400">🔵 In Discussion</option>
                              <option value="Converted" className="bg-slate-900 text-purple-400">🟣 Converted</option>
                              <option value="Cold" className="bg-slate-900 text-slate-400">⚫ Cold</option>
                            </select>
                          </td>

                          {/* Actions */}
                          <td className="p-3.5 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1">
                              <a
                                href={createWhatsAppUrl(lead)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all"
                                title="Direct WhatsApp Chat"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                              </a>
                              <button
                                onClick={() => setSelectedLead(lead)}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
                                title="View Lead Details"
                              >
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDelete(lead.id)}
                                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all cursor-pointer"
                                title="Delete Lead"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
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

          {subscribers.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs">
              No newsletter subscribers recorded yet.
            </div>
          ) : (
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
          )}
        </div>
      )}

      {/* SUBTAB 3: Conversion Channels */}
      {activeSubTab === "sources" && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-emerald-400 text-sm">Real-Time Webhook & Cloud Sync Active</div>
                <div className="mt-0.5 text-slate-300">
                  Every form submission on CareerWithMohit is immediately mirrored in Firebase Firestore, backed up in LocalStorage, dispatched to Activepieces webhooks, and recorded in Google Sheets.
                </div>
              </div>
            </div>

            <h3 className="text-sm font-bold text-white pt-2">Conversion Channels Breakdown</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span className="flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-purple-400" /> Score Calculators (CAT/XAT/JEE/CUET)
                  </span>
                  <span className="text-purple-400 font-mono">{kpis.calculators} Leads</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${Math.min(100, (kpis.calculators / (kpis.total || 1)) * 100)}%` }}
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-400" /> Brochure & Starter Kit Downloads
                  </span>
                  <span className="text-blue-400 font-mono">{kpis.brochures} Leads</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${Math.min(100, (kpis.brochures / (kpis.total || 1)) * 100)}%` }}
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-400" /> 1-on-1 Advising Bookings
                  </span>
                  <span className="text-emerald-400 font-mono">{kpis.bookings} Leads</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className="bg-emerald-500 h-2 rounded-full"
                    style={{ width: `${Math.min(100, (kpis.bookings / (kpis.total || 1)) * 100)}%` }}
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-amber-400" /> Direct Inquiries & Popup Callbacks
                  </span>
                  <span className="text-amber-400 font-mono">{kpis.inquiries} Leads</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className="bg-amber-500 h-2 rounded-full"
                    style={{ width: `${Math.min(100, (kpis.inquiries / (kpis.total || 1)) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LEAD PROFILE DRAWER / MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-xl bg-slate-900 border-l border-slate-800 h-full overflow-y-auto p-6 space-y-6 shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black text-lg flex items-center justify-center shadow-md">
                    {(selectedLead.name || "S")[0].toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">{selectedLead.name || "Student"}</h3>
                    <div className="text-xs text-slate-400">
                      Submitted on {selectedLead.timestamp ? new Date(selectedLead.timestamp).toLocaleString("en-IN") : "Recent"}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status & Quick Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={createWhatsAppUrl(selectedLead)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href={`tel:${selectedLead.number || selectedLead.phone}`}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call Student</span>
                </a>
              </div>

              {/* Contact Information Card */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-xs font-black uppercase text-slate-400 tracking-wider">Contact & Location</div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 text-[11px] block">Phone / Mobile</span>
                    <span className="font-mono font-bold text-amber-400">{selectedLead.number || selectedLead.phone || "—"}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Email</span>
                    <span className="text-slate-200 truncate block">{selectedLead.email || "—"}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">City / State</span>
                    <span className="text-slate-200 font-semibold">{selectedLead.location || "Online"}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px] block">Lead Category</span>
                    <span className="text-slate-200 font-semibold uppercase">{selectedLead.category || categorizeSource(selectedLead.source)}</span>
                  </div>
                </div>
              </div>

              {/* Submission Source & Custom Parameters */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-xs font-black uppercase text-slate-400 tracking-wider">Inquiry Parameters</div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-slate-500">Source Name</span>
                    <span className="text-amber-400 font-bold">{selectedLead.source}</span>
                  </div>
                  {selectedLead.score !== undefined && (
                    <div className="flex justify-between py-1 border-b border-slate-900 font-mono">
                      <span className="text-slate-500">Calculated Score</span>
                      <span className="text-white font-bold">{selectedLead.score}</span>
                    </div>
                  )}
                  {selectedLead.percentile !== undefined && (
                    <div className="flex justify-between py-1 border-b border-slate-900 font-mono">
                      <span className="text-slate-500">Predicted Percentile</span>
                      <span className="text-amber-400 font-bold">{selectedLead.percentile}%ile</span>
                    </div>
                  )}
                  {selectedLead.college && (
                    <div className="flex justify-between py-1 border-b border-slate-900">
                      <span className="text-slate-500">Target College</span>
                      <span className="text-white font-bold">{selectedLead.college}</span>
                    </div>
                  )}
                  {selectedLead.course && (
                    <div className="flex justify-between py-1 border-b border-slate-900">
                      <span className="text-slate-500">Program / Degree</span>
                      <span className="text-white font-bold">{selectedLead.course}</span>
                    </div>
                  )}
                  {selectedLead.slot && (
                    <div className="flex justify-between py-1 border-b border-slate-900">
                      <span className="text-slate-500">Exam Slot</span>
                      <span className="text-white font-bold">{selectedLead.slot}</span>
                    </div>
                  )}

                  {/* Extra Details */}
                  {selectedLead.details &&
                    Object.entries(selectedLead.details).map(([k, v]) => (
                      <div key={k} className="flex justify-between py-1 border-b border-slate-900">
                        <span className="text-slate-500 capitalize">{k.replace(/([A-Z])/g, " $1")}</span>
                        <span className="text-slate-300 font-medium text-right max-w-[240px] truncate">{String(v)}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Status Selector */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-black uppercase text-slate-400 tracking-wider">Update Pipeline Status</div>
                <div className="flex items-center gap-2 flex-wrap">
                  {(["New", "Contacted", "In Discussion", "Converted", "Cold"] as LeadItem["status"][]).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedLead.id, st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedLead.status === st
                          ? "bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20"
                          : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* CRM Follow-up Notes Timeline */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center justify-between">
                  <span>Admissions Notes & Timeline</span>
                  <span className="text-amber-400 font-mono text-[11px]">{selectedLead.notes?.length || 0} note(s)</span>
                </div>

                <form onSubmit={handleAddNote} className="space-y-2">
                  <textarea
                    rows={2}
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Add a follow-up note (e.g. Called student, wants PGDM Marketing with ₹10L budget)..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    disabled={isSavingNote || !newNoteText.trim()}
                    className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Save Note</span>
                  </button>
                </form>

                <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar pt-2">
                  {selectedLead.notes && selectedLead.notes.length > 0 ? (
                    selectedLead.notes.map((n, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 text-xs space-y-1">
                        <div className="text-slate-200">{n.text}</div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          {new Date(n.timestamp).toLocaleString("en-IN")}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-[11px] text-slate-500 text-center py-2">
                      No follow-up notes added yet.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Delete Lead Button */}
            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={() => handleDelete(selectedLead.id)}
                className="w-full py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Lead Record</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD MANUAL LEAD MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-black text-white">Add Manual Student Lead</h3>
                <p className="text-xs text-slate-400 mt-0.5">Log offline inquiries, direct WhatsApp chats, or phone calls</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddManualLead} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">Student Name *</label>
                  <input
                    type="text"
                    required
                    value={manualForm.name}
                    onChange={(e) => setManualForm({ ...manualForm, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={manualForm.number}
                    onChange={(e) => setManualForm({ ...manualForm, number: e.target.value })}
                    placeholder="e.g. 9876543210"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={manualForm.email}
                    onChange={(e) => setManualForm({ ...manualForm, email: e.target.value })}
                    placeholder="student@example.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">City / Location</label>
                  <input
                    type="text"
                    value={manualForm.location}
                    onChange={(e) => setManualForm({ ...manualForm, location: e.target.value })}
                    placeholder="e.g. Delhi NCR, Mumbai"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">Lead Channel</label>
                  <select
                    value={manualForm.category}
                    onChange={(e) => setManualForm({ ...manualForm, category: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:border-amber-500 focus:outline-none"
                  >
                    <option value="inquiry">💬 Direct Phone / WhatsApp Inquiry</option>
                    <option value="calculator">🧮 Score Calculator Lead</option>
                    <option value="brochure">📥 Brochure Request</option>
                    <option value="booking">📅 1-on-1 Consultation</option>
                    <option value="mocktest">🧪 Mock Test Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">Target College / Program</label>
                  <input
                    type="text"
                    value={manualForm.college}
                    onChange={(e) => setManualForm({ ...manualForm, college: e.target.value })}
                    placeholder="e.g. SOIL Gurgaon, PGDM"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Initial Counselor Note</label>
                <textarea
                  rows={2}
                  value={manualForm.notes}
                  onChange={(e) => setManualForm({ ...manualForm, notes: e.target.value })}
                  placeholder="Student background, budget, target exams..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/20"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
