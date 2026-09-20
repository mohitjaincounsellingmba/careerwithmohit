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
  FileSpreadsheet,
  CheckCircle2,
  Table,
  ArrowDownToLine,
  HelpCircle,
  Check
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

interface ManageLeadsSectionProps {
  initialLeads?: LeadItem[];
}

export function ManageLeadsSection({ initialLeads = [] }: ManageLeadsSectionProps) {
  const [leadsList, setLeadsList] = useState<LeadItem[]>(initialLeads);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedDateRange, setSelectedDateRange] = useState<string>("all");

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
    showToast(next ? "🔔 Audio chime enabled for new website leads" : "🔕 Audio alerts muted");
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

        if (soundEnabled) {
          playLeadChime();
        }

        showToast(`⚡ New lead received from website: ${newLead.name} (${newLead.source || "Inquiry"})`);

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
      showToast("Live database & Google Sheet sync refreshed");
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
      showToast(`Lead status updated to "${newStatus}"`);
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
      showToast("Note added to lead record");
    } catch (e) {
      console.error(e);
    } finally {
      setIsSavingNote(false);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!confirm("Are you sure you want to delete this lead record?")) return;
    try {
      await deleteLead(leadId);
      setLeadsList((prev) => prev.filter((l) => l.id !== leadId));
      if (selectedLead?.id === leadId) setSelectedLead(null);
      showToast("Lead record removed");
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddManualLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualForm.name.trim() || !manualForm.number.trim()) {
      alert("Name and Phone Number are required.");
      return;
    }

    try {
      const res = await submitLead({
        name: manualForm.name.trim(),
        number: manualForm.number.trim(),
        email: manualForm.email.trim(),
        location: manualForm.location.trim() || "Online",
        source: manualForm.source.trim() || "Manual Phone Inquiry",
        category: manualForm.category || "inquiry",
        course: manualForm.course.trim(),
        college: manualForm.college.trim(),
        score: manualForm.score ? Number(manualForm.score) : undefined,
        percentile: manualForm.percentile ? Number(manualForm.percentile) : undefined,
        status: manualForm.status || "New",
        message: manualForm.notes.trim(),
      });

      if (res.success) {
        showToast("Lead added successfully & synced to Google Sheet!");
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
        handleRefresh();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Export to CSV formatted for Google Sheets
  const handleExportCSV = () => {
    if (leadsList.length === 0) {
      alert("No leads available to export.");
      return;
    }

    const headers = [
      "Lead ID",
      "Timestamp",
      "Date",
      "Time",
      "Student Name",
      "Phone Number",
      "Email Address",
      "City / Location",
      "Lead Source Form",
      "Category",
      "Target Course",
      "Target College",
      "Exam Score",
      "Percentile",
      "Status",
      "Counselor Notes"
    ];

    const rows = leadsList.map((lead) => {
      const date = lead.timestamp ? new Date(lead.timestamp).toLocaleDateString("en-IN") : "";
      const time = lead.timestamp ? new Date(lead.timestamp).toLocaleTimeString("en-IN") : "";
      const notes = (lead.notes || []).map((n) => n.text).join(" | ");

      return [
        `"${lead.id || ""}"`,
        `"${lead.timestamp || ""}"`,
        `"${date}"`,
        `"${time}"`,
        `"${(lead.name || "").replace(/"/g, '""')}"`,
        `"${lead.number || lead.phone || ""}"`,
        `"${lead.email || ""}"`,
        `"${(lead.location || "").replace(/"/g, '""')}"`,
        `"${(lead.source || "").replace(/"/g, '""')}"`,
        `"${lead.category || "inquiry"}"`,
        `"${(lead.course || "").replace(/"/g, '""')}"`,
        `"${(lead.college || "").replace(/"/g, '""')}"`,
        `"${lead.score !== undefined ? lead.score : ""}"`,
        `"${lead.percentile !== undefined ? lead.percentile : ""}"`,
        `"${lead.status || "New"}"`,
        `"${notes.replace(/"/g, '""')}"`
      ].join(",");
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CareerWithMohit_GoogleSheet_Leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("CSV file downloaded! Ready to import directly into Google Sheets.");
  };

  // Filter leads
  const filteredLeads = useMemo(() => {
    return leadsList.filter((lead) => {
      // Search term
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesName = (lead.name || "").toLowerCase().includes(q);
        const matchesPhone = (lead.number || lead.phone || "").toLowerCase().includes(q);
        const matchesEmail = (lead.email || "").toLowerCase().includes(q);
        const matchesLocation = (lead.location || "").toLowerCase().includes(q);
        const matchesSource = (lead.source || "").toLowerCase().includes(q);
        const matchesCollege = (lead.college || "").toLowerCase().includes(q);
        const matchesCourse = (lead.course || "").toLowerCase().includes(q);
        if (!matchesName && !matchesPhone && !matchesEmail && !matchesLocation && !matchesSource && !matchesCollege && !matchesCourse) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== "all") {
        const cat = lead.category || categorizeSource(lead.source);
        if (cat !== selectedCategory) return false;
      }

      // Status filter
      if (selectedStatus !== "all") {
        const st = lead.status || "New";
        if (st !== selectedStatus) return false;
      }

      // Date Range filter
      if (selectedDateRange !== "all" && lead.timestamp) {
        const leadTime = new Date(lead.timestamp).getTime();
        const now = Date.now();
        if (selectedDateRange === "today" && now - leadTime > 24 * 60 * 60 * 1000) return false;
        if (selectedDateRange === "7d" && now - leadTime > 7 * 24 * 60 * 60 * 1000) return false;
        if (selectedDateRange === "30d" && now - leadTime > 30 * 24 * 60 * 60 * 1000) return false;
      }

      return true;
    });
  }, [leadsList, searchTerm, selectedCategory, selectedStatus, selectedDateRange]);

  // KPI Calculations
  const stats = useMemo(() => {
    const total = leadsList.length;
    const newLeads = leadsList.filter((l) => (l.status || "New") === "New").length;
    const inDiscussion = leadsList.filter((l) => l.status === "In Discussion" || l.status === "Contacted").length;
    const converted = leadsList.filter((l) => l.status === "Converted").length;
    const calculators = leadsList.filter((l) => (l.category || categorizeSource(l.source)) === "calculator").length;
    const inquiries = leadsList.filter((l) => (l.category || categorizeSource(l.source)) === "inquiry").length;

    return { total, newLeads, inDiscussion, converted, calculators, inquiries };
  }, [leadsList]);

  return (
    <div className="space-y-6 font-body pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-semibold shadow-2xl backdrop-blur-md animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner: Google Sheets Sync & Live Leads Hub */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>Google Sheet Live Integration Active</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Website Leads & Google Sheets Sync Hub
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              All inquiries submitted via website forms, CAT/XAT score calculators, profile evaluations, and mentorship bookings are synced in real-time with your **Google Sheet** and live database.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-950/80 border border-slate-800 text-[10px] text-emerald-400 font-semibold flex items-center gap-1.5">
                <FileSpreadsheet className="w-3 h-3 text-emerald-400" />
                Activepieces Webhook Connected
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-950/80 border border-slate-800 text-[10px] text-blue-400 font-semibold flex items-center gap-1.5">
                <Radio className="w-3 h-3 text-blue-400" />
                Zero-Latency Live Prepend
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Audio Alert Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                soundEnabled
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
                  : "bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300"
              }`}
              title={soundEnabled ? "Audio alert chime active on new lead" : "Audio alert chime muted"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Force Sync */}
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all border border-slate-700 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isLoading ? "animate-spin" : ""}`} />
              <span>Sync Live</span>
            </button>

            {/* Export CSV for Google Sheet */}
            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-emerald-600/20"
              title="Download full CSV compatible with Google Sheets"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export to Google Sheet (CSV)</span>
            </button>

            {/* Add Manual Lead */}
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-amber-500/10"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Lead</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg">
          <div className="text-[10px] uppercase font-bold text-slate-400">Total Leads</div>
          <div className="text-2xl font-black text-white font-mono mt-1">{stats.total}</div>
          <div className="text-[10px] text-slate-400 mt-1">Google Sheet Pool</div>
        </div>

        <div className="bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-4 shadow-lg">
          <div className="text-[10px] uppercase font-bold text-emerald-400">New / Unread</div>
          <div className="text-2xl font-black text-emerald-400 font-mono mt-1">{stats.newLeads}</div>
          <div className="text-[10px] text-slate-400 mt-1">Action Required</div>
        </div>

        <div className="bg-slate-900/80 border border-blue-500/30 rounded-2xl p-4 shadow-lg">
          <div className="text-[10px] uppercase font-bold text-blue-400">In Discussion</div>
          <div className="text-2xl font-black text-blue-400 font-mono mt-1">{stats.inDiscussion}</div>
          <div className="text-[10px] text-slate-400 mt-1">Active Calls</div>
        </div>

        <div className="bg-slate-900/80 border border-purple-500/30 rounded-2xl p-4 shadow-lg">
          <div className="text-[10px] uppercase font-bold text-purple-400">Converted</div>
          <div className="text-2xl font-black text-purple-400 font-mono mt-1">{stats.converted}</div>
          <div className="text-[10px] text-slate-400 mt-1">Admitted / Enrolled</div>
        </div>

        <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-4 shadow-lg">
          <div className="text-[10px] uppercase font-bold text-amber-400">Score Calculators</div>
          <div className="text-2xl font-black text-amber-400 font-mono mt-1">{stats.calculators}</div>
          <div className="text-[10px] text-slate-400 mt-1">High Intent</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg">
          <div className="text-[10px] uppercase font-bold text-slate-400">Direct Inquiries</div>
          <div className="text-2xl font-black text-white font-mono mt-1">{stats.inquiries}</div>
          <div className="text-[10px] text-slate-400 mt-1">Form Submissions</div>
        </div>
      </div>

      {/* Search & Multi-Filter Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search leads by student name, phone, email, college, or city..."
              className="w-full bg-slate-950/80 border border-slate-700 focus:border-emerald-500 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />
          </div>

          {/* Secondary Dropdown Filters */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="New">Status: New</option>
              <option value="Contacted">Status: Contacted</option>
              <option value="In Discussion">Status: In Discussion</option>
              <option value="Converted">Status: Converted</option>
              <option value="Cold">Status: Cold</option>
            </select>

            {/* Date Range Filter */}
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="all">All Time</option>
              <option value="today">Today (Last 24h)</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-slate-800">
          {[
            { id: "all", label: "All Form Submissions" },
            { id: "calculator", label: "📊 Score Calculators" },
            { id: "inquiry", label: "📝 Direct Admission Inquiries" },
            { id: "booking", label: "📅 1-on-1 Mentorship Bookings" },
            { id: "mocktest", label: "⚡ Mock Tests & Certifications" },
            { id: "brochure", label: "📥 College Brochure Downloads" },
            { id: "starterkit", label: "🎒 Starter Kit Downloads" },
          ].map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-extrabold"
                    : "bg-slate-950/70 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Leads Table & Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>Showing <strong className="text-white">{filteredLeads.length}</strong> matching website leads</span>
          <span>Click WhatsApp icon for instant 1-click candidate outreach</span>
        </div>

        {filteredLeads.length === 0 ? (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 text-sm space-y-3">
            <p>No leads matched your search or filter criteria.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedStatus("all");
                setSelectedDateRange("all");
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-bold cursor-pointer transition-all"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3.5">
            {filteredLeads.map((lead) => {
              const isNewlyArrived = newlyArrivedLeadId === lead.id;
              const dateStr = lead.timestamp
                ? new Date(lead.timestamp).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                : "Recent";
              const timeStr = lead.timestamp
                ? new Date(lead.timestamp).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
                : "";
              const phone = lead.number || lead.phone || "";
              const cleanPhone = phone.replace(/[^0-9]/g, "");
              const formattedPhone = cleanPhone.length === 10 ? `+91 ${cleanPhone}` : phone;
              const waLink = `https://wa.me/91${cleanPhone.slice(-10)}?text=${encodeURIComponent(
                `Hi ${lead.name || "there"}, this is Mohit Jain from CareerWithMohit regarding your ${lead.source || "MBA admission"} inquiry. How can I assist you with your B-School admission?`
              )}`;

              const cat = lead.category || categorizeSource(lead.source);
              const status = lead.status || "New";

              return (
                <div
                  key={lead.id}
                  className={`bg-slate-900/80 border rounded-2xl p-5 shadow-lg transition-all space-y-3 relative group ${
                    isNewlyArrived
                      ? "border-emerald-400 ring-2 ring-emerald-500/40 bg-emerald-950/20 animate-pulse"
                      : "border-slate-800 hover:border-emerald-500/40"
                  }`}
                >
                  {/* Top Row: Name, Badges, Status Dropdown, Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        {isNewlyArrived && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase animate-bounce">
                            ⚡ LIVE NEW
                          </span>
                        )}
                        <h3 className="text-base sm:text-lg font-black text-white group-hover:text-emerald-400 transition-colors">
                          {lead.name}
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold uppercase tracking-wider border border-slate-700">
                          {cat}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          {dateStr} {timeStr}
                        </span>
                      </div>

                      {/* Source details */}
                      <p className="text-xs text-amber-400 font-medium flex items-center gap-1.5">
                        <span className="text-slate-400">Source:</span>
                        <span>{lead.source}</span>
                      </p>
                    </div>

                    {/* Action Buttons & Status Selector */}
                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      {/* Status Dropdown */}
                      <select
                        value={status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                        className={`text-xs font-bold rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer border ${
                          status === "Converted"
                            ? "bg-purple-500/20 text-purple-300 border-purple-500/40"
                            : status === "In Discussion"
                            ? "bg-blue-500/20 text-blue-300 border-blue-500/40"
                            : status === "Contacted"
                            ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                            : status === "Cold"
                            ? "bg-slate-800 text-slate-400 border-slate-700"
                            : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                        }`}
                      >
                        <option value="New">Status: New</option>
                        <option value="Contacted">Status: Contacted</option>
                        <option value="In Discussion">Status: In Discussion</option>
                        <option value="Converted">Status: Converted</option>
                        <option value="Cold">Status: Cold</option>
                      </select>

                      {/* WhatsApp 1-Click Button */}
                      {cleanPhone && (
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20"
                          title="Open WhatsApp chat with prefilled message"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      )}

                      {/* Call Button */}
                      {cleanPhone && (
                        <a
                          href={`tel:${cleanPhone}`}
                          className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white transition-all"
                          title="Call phone number"
                        >
                          <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
                        </a>
                      )}

                      {/* View Details Drawer */}
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <span>Details</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDeleteLead(lead.id)}
                        className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all cursor-pointer"
                        title="Delete lead record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Student Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 pt-1 text-xs">
                    <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-2.5 space-y-0.5">
                      <div className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                        <Phone className="w-3 h-3 text-emerald-400" /> Phone / WhatsApp
                      </div>
                      <div className="font-mono text-white font-bold">{formattedPhone || "Not Provided"}</div>
                    </div>

                    <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-2.5 space-y-0.5">
                      <div className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                        <Mail className="w-3 h-3 text-blue-400" /> Email Address
                      </div>
                      <div className="text-white font-medium truncate">{lead.email || "Not Provided"}</div>
                    </div>

                    <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-2.5 space-y-0.5">
                      <div className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-400" /> Location / City
                      </div>
                      <div className="text-white font-medium truncate">{lead.location || "Online"}</div>
                    </div>

                    <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-2.5 space-y-0.5">
                      <div className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                        <GraduationCap className="w-3 h-3 text-purple-400" /> Course / Score
                      </div>
                      <div className="text-white font-bold truncate">
                        {lead.percentile ? `${lead.percentile}%ile` : lead.score ? `Score: ${lead.score}` : lead.course || lead.college || "General MBA"}
                      </div>
                    </div>
                  </div>

                  {/* Message / Latest Note if exists */}
                  {(lead.message || (lead.notes && lead.notes.length > 0)) && (
                    <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
                      <FileText className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        {lead.message && <p className="line-clamp-1"><strong className="text-white">Note/Goal:</strong> {lead.message}</p>}
                        {lead.notes && lead.notes.length > 0 && (
                          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                            <strong className="text-amber-400">Counselor:</strong> {lead.notes[0].text}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Slide-Over Drawer / Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl p-6 shadow-2xl relative space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">Lead Record Details</h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Overview */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-base font-black text-white">{selectedLead.name}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                  {selectedLead.status || "New"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-slate-300">
                <div><strong>Phone:</strong> {selectedLead.number || selectedLead.phone || "N/A"}</div>
                <div><strong>Email:</strong> {selectedLead.email || "N/A"}</div>
                <div><strong>City:</strong> {selectedLead.location || "Online"}</div>
                <div><strong>Target Course:</strong> {selectedLead.course || selectedLead.program || "MBA / PGDM"}</div>
                <div><strong>Target College:</strong> {selectedLead.college || "Open"}</div>
                <div><strong>Score/Percentile:</strong> {selectedLead.percentile || selectedLead.score || "N/A"}</div>
                <div className="col-span-2"><strong>Source:</strong> {selectedLead.source}</div>
                <div className="col-span-2"><strong>Received At:</strong> {selectedLead.timestamp ? new Date(selectedLead.timestamp).toLocaleString("en-IN") : "N/A"}</div>
              </div>
            </div>

            {/* Counselor Notes Timeline */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                Counselor Follow-Up Notes ({selectedLead.notes?.length || 0})
              </h4>

              <form onSubmit={handleAddNote} className="space-y-2">
                <textarea
                  rows={2}
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Add a new follow-up note (e.g. Called candidate, interested in SIBM Pune / PGDM Delhi NCR)..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSavingNote || !newNoteText.trim()}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 disabled:opacity-50 cursor-pointer"
                  >
                    {isSavingNote ? "Saving..." : "Add Note"}
                  </button>
                </div>
              </form>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {(selectedLead.notes || []).map((note, nIdx) => (
                  <div key={nIdx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                    <div className="text-[10px] text-slate-500 font-mono">
                      {new Date(note.timestamp).toLocaleString("en-IN")}
                    </div>
                    <p className="text-slate-300">{note.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Manual Lead */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">Add Candidate Lead (Google Sheet Sync)</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddManualLead} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Student Name *</label>
                  <input
                    type="text"
                    required
                    value={manualForm.name}
                    onChange={(e) => setManualForm({ ...manualForm, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={manualForm.number}
                    onChange={(e) => setManualForm({ ...manualForm, number: e.target.value })}
                    placeholder="e.g. 9876543210"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={manualForm.email}
                    onChange={(e) => setManualForm({ ...manualForm, email: e.target.value })}
                    placeholder="rahul@gmail.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">City / Location</label>
                  <input
                    type="text"
                    value={manualForm.location}
                    onChange={(e) => setManualForm({ ...manualForm, location: e.target.value })}
                    placeholder="Delhi NCR"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Target Course</label>
                  <input
                    type="text"
                    value={manualForm.course}
                    onChange={(e) => setManualForm({ ...manualForm, course: e.target.value })}
                    placeholder="MBA / PGDM"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Target College</label>
                  <input
                    type="text"
                    value={manualForm.college}
                    onChange={(e) => setManualForm({ ...manualForm, college: e.target.value })}
                    placeholder="e.g. SIBM Pune"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Counselor Note / Message</label>
                <textarea
                  rows={2}
                  value={manualForm.notes}
                  onChange={(e) => setManualForm({ ...manualForm, notes: e.target.value })}
                  placeholder="Details about candidate profile and preferences..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 shadow-md shadow-emerald-500/20 cursor-pointer"
                >
                  Submit & Sync to Sheet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
