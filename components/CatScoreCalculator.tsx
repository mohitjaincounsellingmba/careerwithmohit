"use client";

import { useState, useMemo } from "react";
import {
  Calculator,
  RefreshCw,
  Trophy,
  Target,
  AlertCircle,
  ChevronRight,
  Zap,
  BookOpen,
  BarChart3,
  X,
  Lock,
  TrendingUp,
  Building2,
  MapPin,
  Sparkles,
  CheckCircle2,
  Clock,
  ShieldCheck,
  FileText,
  Sliders,
  Award,
  HelpCircle,
} from "lucide-react";
import { InquiryForm } from "@/components/InquiryForm";
import Link from "next/link";

// ─── CAT 2026 Exam Structure (66 Questions · 198 Marks) ──────────────────────
const SECTIONS = [
  {
    key: "varc",
    label: "VARC",
    fullName: "Verbal Ability & Reading Comprehension",
    totalMcq: 19,
    totalTita: 5,
    maxScore: 72,
    badgeColor: "text-violet-700 bg-violet-50 border-violet-200",
    accentBg: "bg-violet-500",
    glowColor: "from-violet-500/20 to-transparent",
    accent: "#7c3aed",
  },
  {
    key: "dilr",
    label: "DILR",
    fullName: "Data Interpretation & Logical Reasoning",
    totalMcq: 16,
    totalTita: 4,
    maxScore: 60,
    badgeColor: "text-blue-700 bg-blue-50 border-blue-200",
    accentBg: "bg-blue-500",
    glowColor: "from-blue-500/20 to-transparent",
    accent: "#2563eb",
  },
  {
    key: "qa",
    label: "QA",
    fullName: "Quantitative Aptitude",
    totalMcq: 14,
    totalTita: 8,
    maxScore: 66,
    badgeColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    accentBg: "bg-emerald-500",
    glowColor: "from-emerald-500/20 to-transparent",
    accent: "#059669",
  },
];

type SectionKey = "varc" | "dilr" | "qa";
type SlotKey = "slot1" | "slot2" | "slot3" | "general";

interface SectionInput {
  correctMcq: number | "";
  wrongMcq: number | "";
  correctTita: number | "";
}

const defaultSection: SectionInput = {
  correctMcq: "",
  wrongMcq: "",
  correctTita: "",
};

// Precise Percentile lookup based on official 66-question CAT score distributions (198 max marks)
function estimatePercentile(rawScore: number, slot: SlotKey = "general"): number {
  let adjustedScore = rawScore;
  if (slot === "slot2") adjustedScore = rawScore * 1.015;
  if (slot === "slot3") adjustedScore = rawScore * 1.03;

  if (adjustedScore >= 115) return 99.99;
  if (adjustedScore >= 105) return 99.9;
  if (adjustedScore >= 95) return 99.7;
  if (adjustedScore >= 88) return 99.5;
  if (adjustedScore >= 82) return 99.0;
  if (adjustedScore >= 75) return 98.0;
  if (adjustedScore >= 68) return 97.0;
  if (adjustedScore >= 60) return 95.0;
  if (adjustedScore >= 52) return 92.0;
  if (adjustedScore >= 45) return 90.0;
  if (adjustedScore >= 38) return 85.0;
  if (adjustedScore >= 32) return 80.0;
  if (adjustedScore >= 26) return 75.0;
  if (adjustedScore >= 21) return 70.0;
  if (adjustedScore >= 16) return 60.0;
  if (adjustedScore >= 11) return 50.0;
  return Math.max(10, Math.round(adjustedScore * 4.2));
}

function estimateSectionPercentile(rawScore: number, section: string): number {
  const table: Record<string, Array<[number, number]>> = {
    varc: [
      [50, 99.9],
      [42, 99.0],
      [36, 97.0],
      [30, 93.0],
      [24, 85.0],
      [18, 70.0],
      [12, 50.0],
    ],
    dilr: [
      [42, 99.9],
      [32, 99.0],
      [26, 97.0],
      [20, 93.0],
      [15, 85.0],
      [11, 70.0],
      [7, 50.0],
    ],
    qa: [
      [45, 99.9],
      [35, 99.0],
      [29, 97.0],
      [22, 93.0],
      [16, 85.0],
      [11, 70.0],
      [7, 50.0],
    ],
  };
  const rows = table[section] || [];
  for (const [score, percentile] of rows) {
    if (rawScore >= score) return percentile;
  }
  return 30.0;
}

function getTargetColleges(percentile: number) {
  if (percentile >= 99.5) {
    return {
      tier: "Tier 1: Mega Premier IIMs & Top Business Schools",
      colleges: ["IIM Ahmedabad", "IIM Bangalore", "IIM Calcutta", "FMS Delhi", "SPJIMR Mumbai", "SJMSOM IIT Bombay"],
      badge: "IIM A/B/C Call Range",
      color: "text-emerald-700 bg-emerald-50 border-emerald-300",
      avgCtc: "₹32 – 35+ LPA",
    };
  }
  if (percentile >= 98.0) {
    return {
      tier: "Tier 1.5: Top Legacy IIMs & Premier B-Schools",
      colleges: ["IIM Lucknow", "IIM Kozhikode", "IIM Indore", "IIM Shillong", "MDI Gurgaon", "DMS IIT Delhi", "IIFT Delhi"],
      badge: "BLACKI & MDI Calls Likely",
      color: "text-blue-700 bg-blue-50 border-blue-300",
      avgCtc: "₹24 – 28 LPA",
    };
  }
  if (percentile >= 90.0) {
    return {
      tier: "Tier 2 Top: New IIMs, IITs & Top Private Institutes",
      colleges: ["New IIMs (Udaipur, Trichy, Ranchi, Raipur)", "IMT Ghaziabad", "IMI New Delhi", "VGSoM IIT Kharagpur", "DoMS IIT Madras", "GIM Goa"],
      badge: "CAP / New IIMs Strong Call",
      color: "text-amber-700 bg-amber-50 border-amber-300",
      avgCtc: "₹16 – 20 LPA",
    };
  }
  if (percentile >= 80.0) {
    return {
      tier: "Tier 2: Baby IIMs & Reputed PGDM Institutes",
      colleges: ["Baby IIMs (Nagpur, Vizag, Amritsar, Bodh Gaya)", "FORE School of Management", "TAPMI Manipal", "Great Lakes Chennai", "BIMTECH Greater Noida", "LBSIM Delhi"],
      badge: "Baby IIMs & Top PGDM Range",
      color: "text-indigo-700 bg-indigo-50 border-indigo-300",
      avgCtc: "₹12 – 15 LPA",
    };
  }
  if (percentile >= 70.0) {
    return {
      tier: "Tier 3: Quality Regional & Metro PGDM Hubs",
      colleges: ["K J Somaiya Mumbai", "Welingkar Mumbai/Bangalore", "Jaipuria Institute", "NDIM Delhi", "JIMS Rohini", "SOIL Institute", "IBS Hyderabad"],
      badge: "Metro PGDM & Direct Range",
      color: "text-purple-700 bg-purple-50 border-purple-300",
      avgCtc: "₹9 – 12 LPA",
    };
  }
  return {
    tier: "Specialized & Profile-Based MBA Admissions",
    colleges: ["ITM Navi Mumbai", "FOSTIIMA Delhi", "Regional University MBA Programs", "Alternative Exams: CMAT / MAT / CUET-PG"],
    badge: "Profile & Direct Guidance Needed",
    color: "text-slate-700 bg-slate-100 border-slate-300",
    avgCtc: "₹7 – 10 LPA",
  };
}

function calcSectionRaw(input: SectionInput) {
  const cMcq = Number(input.correctMcq) || 0;
  const wMcq = Number(input.wrongMcq) || 0;
  const cTita = Number(input.correctTita) || 0;
  return cMcq * 3 - wMcq * 1 + cTita * 3;
}

export function CatScoreCalculator() {
  const [inputs, setInputs] = useState<Record<SectionKey, SectionInput>>({
    varc: { ...defaultSection },
    dilr: { ...defaultSection },
    qa: { ...defaultSection },
  });

  const [selectedSlot, setSelectedSlot] = useState<SlotKey>("general");
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [leadData, setLeadData] = useState({
    name: "",
    number: "",
    email: "",
    location: "",
  });
  const [showInquiry, setShowInquiry] = useState(false);
  const [activeTab, setActiveTab] = useState<SectionKey>("varc");
  const [inputMode, setInputMode] = useState<"url" | "source" | "manual">("url");

  // Link & Page Source parsing state
  const [responseSheetUrl, setResponseSheetUrl] = useState("");
  const [pageSource, setPageSource] = useState("");
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleAnalyzeUrl = async () => {
    if (!responseSheetUrl.trim()) {
      setParseError("Please enter your official CAT response sheet URL.");
      return;
    }

    setIsAnalyzing(true);
    setParseError("");
    setAnalysisResult(null);

    try {
      const res = await fetch("/api/analyze-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: responseSheetUrl.trim() }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Analysis failed");

      setAnalysisResult(result.data);
    } catch (err: any) {
      setParseError(
        err.message ||
          "Could not directly fetch response sheet from this network. You can paste your Page Source below or enter section attempts manually!"
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleParseSource = () => {
    if (!pageSource.trim()) {
      setParseError("Please paste the page source code first.");
      return;
    }

    setIsParsing(true);
    setParseError("");

    try {
      const answeredCount = (pageSource.match(/Answered/g) || []).length;
      const totalFetched = (pageSource.match(/Question ID/g) || []).length;

      if (answeredCount === 0 && totalFetched === 0) {
        throw new Error(
          "Could not find 'Answered' or 'Question ID' in the pasted HTML. Please ensure you copied the entire page source from your response sheet."
        );
      }

      setAnalysisResult({
        totalFetched: totalFetched || 66,
        answeredCount: answeredCount,
      });
    } catch (err: any) {
      setParseError(err.message);
    } finally {
      setIsParsing(false);
    }
  };

  const stats = useMemo(() => {
    const sections = SECTIONS.map((s) => {
      const raw = calcSectionRaw(inputs[s.key as SectionKey]);
      const sect = s as (typeof SECTIONS)[0];
      const maxRaw = sect.maxScore;
      const percentile = estimateSectionPercentile(raw, s.key);
      return { key: s.key, raw, maxRaw, percentile };
    });
    const totalRaw = sections.reduce((a, b) => a + b.raw, 0);
    const maxTotal = sections.reduce((a, b) => a + b.maxRaw, 0);
    const overallPercentile = estimatePercentile(totalRaw, selectedSlot);

    // Scaled score with slot difficulty weighting (capped at max 198)
    const slotMultiplier = selectedSlot === "slot3" ? 1.03 : selectedSlot === "slot2" ? 1.015 : 1.0;
    const scaledScore = Math.min(Math.round(totalRaw * slotMultiplier), 198);
    const recommendedColleges = getTargetColleges(overallPercentile);

    return { sections, totalRaw, maxTotal, overallPercentile, scaledScore, recommendedColleges };
  }, [inputs, selectedSlot]);

  const updateInput = (
    section: SectionKey,
    field: keyof SectionInput,
    value: string
  ) => {
    const num = parseInt(value, 10);
    const sect = SECTIONS.find((s) => s.key === section)!;
    const max =
      field === "correctMcq" || field === "wrongMcq"
        ? sect.totalMcq
        : sect.totalTita;

    if (value === "" || (!isNaN(num) && num >= 0 && num <= max)) {
      setInputs((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value === "" ? "" : num,
        },
      }));
    }
  };

  const reset = () => {
    setInputs({
      varc: { ...defaultSection },
      dilr: { ...defaultSection },
      qa: { ...defaultSection },
    });
    setIsUnlocked(false);
    setShowLeadForm(false);
    setAnalysisResult(null);
    setResponseSheetUrl("");
    setPageSource("");
    setParseError("");
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadData.name,
          number: leadData.number,
          email: leadData.email,
          location: leadData.location,
          source: "CAT 2026 Score Calculator (2027 Admission)",
          score: stats.totalRaw,
          percentile: stats.overallPercentile,
          slot: selectedSlot,
          timestamp: new Date().toISOString(),
        }),
      });
      setIsUnlocked(true);
      setShowLeadForm(false);
    } catch {
      setIsUnlocked(true);
      setShowLeadForm(false);
    }
  };

  const currentSection = SECTIONS.find((s) => s.key === activeTab)!;
  const currentInput = inputs[activeTab];
  const currentStats = stats.sections.find((s) => s.key === activeTab)!;

  const hasAnyInput = SECTIONS.some((s) => {
    const inp = inputs[s.key as SectionKey];
    return inp.correctMcq !== "" || inp.wrongMcq !== "" || inp.correctTita !== "";
  });

  return (
    <div className="w-full max-w-5xl mx-auto" id="cat-calculator-app">
      {/* Main Glassmorphic Modern Calculator Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl shadow-slate-900/10 overflow-hidden transition-all">
        
        {/* Calculator Header: Sleek Deep Navy Gradient */}
        <div className="relative bg-gradient-to-br from-[#0A192F] via-[#0D2342] to-[#123058] text-white p-6 sm:p-8 md:p-10 overflow-hidden">
          {/* Ambient Glow Orbs */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-lg shadow-amber-500/20 shrink-0">
                <div className="w-full h-full bg-[#0A192F] rounded-[14px] flex items-center justify-center">
                  <Calculator className="w-7 h-7 text-amber-400" />
                </div>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="bg-amber-400/20 text-amber-300 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-amber-400/30">
                    CAT 2026 Engine
                  </span>
                  <span className="text-slate-400 text-xs font-semibold">
                    66 Qs · 198 Max Marks
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  CAT Score &amp; Percentile Calculator
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl font-medium">
                  Official +3 / −1 marking scheme with Slot Equating Normalization &amp; 2027 IIM call forecasting.
                </p>
              </div>
            </div>

            {/* Exam Slot Selector Pill Group */}
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15 shrink-0">
              <label
                htmlFor="slot-select"
                className="block text-[11px] font-bold uppercase tracking-wider text-amber-300 mb-2 flex items-center gap-1.5"
              >
                <Clock className="w-3.5 h-3.5" /> Exam Slot Normalization
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {[
                  { key: "general", label: "General" },
                  { key: "slot1", label: "Slot 1" },
                  { key: "slot2", label: "Slot 2" },
                  { key: "slot3", label: "Slot 3" },
                ].map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setSelectedSlot(s.key as SlotKey)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                      selectedSlot === s.key
                        ? "bg-amber-400 text-slate-950 shadow-md font-extrabold"
                        : "bg-white/5 text-slate-300 hover:bg-white/15 hover:text-white"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Marking Rules Micro-Strip */}
          <div className="relative z-10 flex flex-wrap items-center gap-2 mt-6 pt-5 border-t border-white/10">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Correct MCQ: +3
            </span>
            <span className="inline-flex items-center gap-1.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3 py-1 rounded-full text-xs font-semibold">
              <X className="w-3.5 h-3.5 text-rose-400" /> Wrong MCQ: −1
            </span>
            <span className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> TITA Correct: +3
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-700/50 text-slate-300 border border-white/10 px-3 py-1 rounded-full text-xs font-semibold">
              🛡️ Wrong TITA: 0 (No Penalty)
            </span>
          </div>
        </div>

        {/* Calculator Body */}
        <div className="p-6 sm:p-8 md:p-10 space-y-10">

          {/* STEP 1: Response Sheet Scan or Manual Input Method Tabs */}
          <div className="bg-slate-50/80 rounded-2xl p-5 sm:p-7 border border-slate-200/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Check Response Sheet or Enter Attempts
                  </h3>
                  <p className="text-xs text-slate-500">
                    Choose your preferred calculation method
                  </p>
                </div>
              </div>

              {/* Input Mode Selector */}
              <div className="flex bg-white rounded-xl p-1 border border-slate-200 shadow-sm">
                <button
                  type="button"
                  onClick={() => setInputMode("url")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    inputMode === "url"
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  ⚡ Digialm URL
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode("source")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    inputMode === "source"
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  📄 HTML Source
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode("manual")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    inputMode === "manual"
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  ✏️ Manual Marks
                </button>
              </div>
            </div>

            {/* Method A: URL Scanner */}
            {inputMode === "url" && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <label
                  htmlFor="response-sheet-input"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Paste Candidate Response Sheet Link (from{" "}
                  <code className="bg-slate-200 text-slate-800 px-1 py-0.5 rounded text-[11px]">
                    cdn.digialm.com
                  </code>{" "}
                  or{" "}
                  <code className="bg-slate-200 text-slate-800 px-1 py-0.5 rounded text-[11px]">
                    iimcat.ac.in
                  </code>
                  )
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="url"
                    id="response-sheet-input"
                    value={responseSheetUrl}
                    onChange={(e) => setResponseSheetUrl(e.target.value)}
                    placeholder="https://cdn.digialm.com/.../CandidateResponseSheet.html"
                    className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-3.5 font-medium text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 shadow-sm transition-all"
                  />
                  <button
                    id="scan-answer-key-btn"
                    onClick={handleAnalyzeUrl}
                    disabled={isAnalyzing}
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-md shadow-amber-500/20 active:scale-95 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shrink-0 disabled:opacity-50"
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" /> Scanning...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" /> Scan My Answer Key
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Method B: HTML Source Parser */}
            {inputMode === "source" && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <label
                  htmlFor="page-source-input"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Paste Response Sheet Page Source (Press{" "}
                  <kbd className="bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded text-[11px]">
                    Ctrl+U
                  </kbd>{" "}
                  or Right-Click → View Page Source, then Copy All)
                </label>
                <textarea
                  id="page-source-input"
                  value={pageSource}
                  onChange={(e) => setPageSource(e.target.value)}
                  placeholder="<!DOCTYPE html><html>... paste complete HTML source code here ..."
                  rows={4}
                  className="w-full bg-white border border-slate-300 rounded-xl p-3.5 font-mono text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 shadow-sm transition-all"
                />
                <button
                  id="parse-source-btn"
                  onClick={handleParseSource}
                  disabled={isParsing}
                  className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isParsing ? "Parsing Response Source..." : "Extract & Calculate from Source"}
                </button>
              </div>
            )}

            {/* Method C: Manual Entry Hint */}
            {inputMode === "manual" && (
              <div className="p-4 bg-amber-500/10 border border-amber-300/60 rounded-xl text-xs text-amber-900 font-medium flex items-center gap-2.5 animate-in fade-in duration-300">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  Direct Section Mode active. Select each section tab below (VARC, DILR, QA) to key in your correct and incorrect attempts.
                </span>
              </div>
            )}

            {/* Error Message */}
            {parseError && (
              <div className="mt-4 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs font-semibold text-rose-700 flex items-start gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{parseError}</span>
              </div>
            )}

            {/* Successful Parse Result Summary */}
            {analysisResult && (
              <div className="mt-5 p-4 sm:p-5 bg-emerald-50/80 border border-emerald-200 rounded-2xl animate-in slide-in-from-top-3 duration-300">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Answer Key Successfully Identified!
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-sm">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">Total Questions</span>
                    <span className="text-xl font-black text-slate-900">{analysisResult.totalFetched || 66}</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-sm">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase block">Answered Qs</span>
                    <span className="text-xl font-black text-emerald-700">{analysisResult.answeredCount}</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-emerald-100 shadow-sm col-span-2 sm:col-span-1">
                    <span className="text-[10px] font-bold text-amber-700 uppercase block">Maximum Marks</span>
                    <span className="text-xl font-black text-amber-700">198</span>
                  </div>
                </div>
                <p className="text-[11px] font-medium text-slate-600 mt-3">
                  Now verify your section-wise right and wrong counts below to compute your normalized percentile and IIM call ranges.
                </p>
              </div>
            )}
          </div>

          {/* STEP 2: Sectional Tabs & Input Fields */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Enter Section Attempts (VARC · DILR · QA)
                </h3>
                <p className="text-xs text-slate-500">
                  Switch tabs to adjust attempts across all 3 sections
                </p>
              </div>
            </div>

            {/* Section Tab Buttons */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
              {SECTIONS.map((s) => {
                const sRaw = calcSectionRaw(inputs[s.key as SectionKey]);
                const isActive = activeTab === s.key;
                return (
                  <button
                    key={s.key}
                    id={`tab-${s.key}`}
                    type="button"
                    onClick={() => setActiveTab(s.key as SectionKey)}
                    className={`p-3 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      isActive
                        ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/10"
                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs sm:text-sm font-extrabold uppercase ${isActive ? "text-amber-300" : "text-slate-900"}`}>
                        {s.label}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                      }`}>
                        Max {s.maxScore}M
                      </span>
                    </div>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className={`text-lg sm:text-2xl font-black ${isActive ? "text-white" : "text-slate-800"}`}>
                        {sRaw}
                      </span>
                      <span className={`text-[11px] font-medium ${isActive ? "text-slate-300" : "text-slate-400"}`}>
                        marks
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Section Inputs Box */}
            <div className="bg-slate-50/70 border border-slate-200/90 rounded-3xl p-5 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${currentSection.badgeColor}`}>
                      {currentSection.label}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900">
                      {currentSection.fullName}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {currentSection.totalMcq + currentSection.totalTita} Questions total ({currentSection.totalMcq} MCQs + {currentSection.totalTita} TITAs)
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm self-start sm:self-auto">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> 40 Minutes Sectional Limit
                </div>
              </div>

              {/* 3 Input Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                {/* Correct MCQ */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor={`correct-mcq-${activeTab}`}
                      className="text-xs font-bold uppercase text-slate-700"
                    >
                      Correct MCQs
                    </label>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      +3 Marks
                    </span>
                  </div>
                  <input
                    type="number"
                    id={`correct-mcq-${activeTab}`}
                    min={0}
                    max={currentSection.totalMcq}
                    value={currentInput.correctMcq}
                    onChange={(e) => updateInput(activeTab, "correctMcq", e.target.value)}
                    placeholder="0"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-2xl font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-center"
                  />
                  <div className="text-[11px] text-slate-500 text-center font-medium">
                    Max: {currentSection.totalMcq} MCQs
                  </div>
                </div>

                {/* Wrong MCQ */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor={`wrong-mcq-${activeTab}`}
                      className="text-xs font-bold uppercase text-slate-700"
                    >
                      Wrong MCQs
                    </label>
                    <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                      −1 Penalty
                    </span>
                  </div>
                  <input
                    type="number"
                    id={`wrong-mcq-${activeTab}`}
                    min={0}
                    max={currentSection.totalMcq}
                    value={currentInput.wrongMcq}
                    onChange={(e) => updateInput(activeTab, "wrongMcq", e.target.value)}
                    placeholder="0"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-2xl font-black text-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all text-center"
                  />
                  <div className="text-[11px] text-slate-500 text-center font-medium">
                    Max: {currentSection.totalMcq} MCQs
                  </div>
                </div>

                {/* Correct TITA */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor={`correct-tita-${activeTab}`}
                      className="text-xs font-bold uppercase text-slate-700"
                    >
                      Correct TITA
                    </label>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      +3 / 0 Neg
                    </span>
                  </div>
                  <input
                    type="number"
                    id={`correct-tita-${activeTab}`}
                    min={0}
                    max={currentSection.totalTita}
                    value={currentInput.correctTita}
                    onChange={(e) => updateInput(activeTab, "correctTita", e.target.value)}
                    placeholder="0"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-2xl font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-center"
                  />
                  <div className="text-[11px] text-slate-500 text-center font-medium">
                    Max: {currentSection.totalTita} Non-MCQs
                  </div>
                </div>
              </div>

              {/* Section Score Live Pill */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${currentSection.accentBg}`} />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      {currentSection.label} Current Raw Score
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Est. Sectional Percentile: ~{currentStats.percentile}%ile
                    </span>
                  </div>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900">
                    {currentStats.raw}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    / {currentStats.maxRaw} marks
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Row: Reset & Unlock / Reveal */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
            <button
              onClick={reset}
              id="reset-calculator-btn"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" /> Reset All Inputs
            </button>

            {!isUnlocked && hasAnyInput && !showLeadForm && (
              <button
                id="see-results-btn"
                onClick={() => setShowLeadForm(true)}
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black px-8 py-4 rounded-2xl shadow-xl shadow-amber-500/20 active:scale-95 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4" /> Unlock Full Score, Percentile &amp; IIM Calls
              </button>
            )}
          </div>

          {/* Lead Gate Modal / Drawer */}
          {showLeadForm && !isUnlocked && (
            <div className="relative bg-gradient-to-br from-[#0A192F] via-[#0D2342] to-[#123058] text-white p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-300">
                  <Zap className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Unlock Your CAT 2026 Score, Percentile &amp; IIM Call Predictor
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Instant sectional breakdown + Free 2027 MBA admission eligibility report.
                  </p>
                </div>
              </div>

              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <input
                    required
                    id="lead-name-input"
                    type="text"
                    placeholder="Full Name"
                    value={leadData.name}
                    onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 font-medium text-white placeholder:text-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <input
                    required
                    id="lead-phone-input"
                    type="tel"
                    placeholder="WhatsApp Number (for call updates)"
                    value={leadData.number}
                    onChange={(e) => setLeadData({ ...leadData, number: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 font-medium text-white placeholder:text-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <input
                    required
                    id="lead-email-input"
                    type="email"
                    placeholder="Email Address"
                    value={leadData.email}
                    onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 font-medium text-white placeholder:text-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <input
                    required
                    id="lead-city-input"
                    type="text"
                    placeholder="Current City / State (e.g. Delhi, Mumbai, Pune)"
                    value={leadData.location}
                    onChange={(e) => setLeadData({ ...leadData, location: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 font-medium text-white placeholder:text-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    id="reveal-score-btn"
                    className="flex-1 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black py-3.5 rounded-xl shadow-lg active:scale-95 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Reveal My Predicted CAT Score &amp; Percentile <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowLeadForm(false)}
                    className="text-xs font-bold text-slate-400 hover:text-white px-4 py-2 transition-colors cursor-pointer text-center"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Unlocked Comprehensive Results Display */}
          {isUnlocked && (
            <div className="space-y-8 animate-in fade-in duration-500">
              
              {/* Overall Score Master Banner */}
              <div className="relative bg-gradient-to-br from-[#0A192F] via-[#0D2342] to-[#123058] text-white p-6 sm:p-8 md:p-10 rounded-3xl border border-amber-400/40 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <Trophy className="w-56 h-56 text-amber-400" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
                    <Sparkles className="w-4 h-4" />
                    Overall Predicted CAT 2026 Result
                  </div>

                  <div className="flex flex-wrap items-baseline gap-4 mb-8">
                    <span className="text-6xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-amber-200">
                      {stats.totalRaw}
                    </span>
                    <span className="text-lg sm:text-2xl font-bold text-slate-400">
                      / {stats.maxTotal} marks raw
                    </span>
                  </div>

                  {/* 3 Result Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block mb-1">
                        Expected Percentile
                      </span>
                      <span className="text-2xl sm:text-3xl font-black text-white">
                        ~{stats.overallPercentile}+ %ile
                      </span>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block mb-1">
                        Estimated Scaled Score
                      </span>
                      <span className="text-2xl sm:text-3xl font-black text-white">
                        {stats.scaledScore} / 198
                      </span>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block mb-1">
                        Slot Equated
                      </span>
                      <span className="text-lg sm:text-xl font-black text-white uppercase">
                        {selectedSlot === "slot1"
                          ? "Slot 1 (Morning)"
                          : selectedSlot === "slot2"
                          ? "Slot 2 (Afternoon)"
                          : selectedSlot === "slot3"
                          ? "Slot 3 (Evening)"
                          : "Overall Normalized"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Target College Recommendations */}
              <div className="bg-amber-50/70 border border-amber-300/80 rounded-3xl p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-6 h-6 text-amber-600 shrink-0" />
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        Eligible B-Schools For Your Score Band (~{stats.overallPercentile}+ %ile)
                      </h3>
                      <p className="text-xs text-slate-600 font-medium">
                        {stats.recommendedColleges.tier} · Avg CTC: <span className="font-bold text-slate-900">{stats.recommendedColleges.avgCtc}</span>
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border uppercase self-start sm:self-auto ${stats.recommendedColleges.color}`}>
                    {stats.recommendedColleges.badge}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-5">
                  {stats.recommendedColleges.colleges.map((col, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-3 rounded-xl border border-amber-200/80 text-xs font-bold text-slate-800 flex items-center gap-2 shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="truncate">{col}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 pt-4 border-t border-amber-200/70 text-xs font-bold">
                  <Link
                    href="/colleges"
                    className="text-amber-800 hover:text-amber-900 underline underline-offset-4 flex items-center gap-1"
                  >
                    Explore Complete 650+ College Directory →
                  </Link>
                  <Link
                    href="/top-tier-mba-colleges"
                    className="text-amber-800 hover:text-amber-900 underline underline-offset-4 flex items-center gap-1"
                  >
                    View Top Tier MBA Rankings →
                  </Link>
                  <Link
                    href="/tools/college-comparison"
                    className="text-amber-800 hover:text-amber-900 underline underline-offset-4 flex items-center gap-1"
                  >
                    Compare College Fees &amp; Placements →
                  </Link>
                </div>
              </div>

              {/* Section-Wise Breakdown Cards */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-600 mb-3">
                  Sectional Marks &amp; Predicted Percentiles
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {stats.sections.map((s, idx) => {
                    const sect = SECTIONS[idx];
                    return (
                      <div
                        key={s.key}
                        className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-bold uppercase ${sect.badgeColor} px-2 py-0.5 rounded-full border`}>
                            {sect.label}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">
                            Max {s.maxRaw}M
                          </span>
                        </div>
                        <div className="text-3xl font-black text-slate-900">
                          {s.raw}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 pt-1 border-t border-slate-100">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                          <span>~{s.percentile}+ Sectional %ile</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* High-Converting CTA Banner */}
              <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 rounded-3xl p-6 sm:p-8 text-slate-950 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-amber-500/10">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-900 bg-white/40 px-3 py-1 rounded-full inline-block mb-2">
                    Free 1-on-1 MBA Advisory
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
                    Confused About Your IIM Calls &amp; College Shortlists?
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-1 max-w-xl">
                    Get an unbiased profile evaluation with Mohit Jain. Know your real chances at BLACKI, New IIMs, FMS, MDI, SPJIMR, and top PGDM colleges.
                  </p>
                </div>
                <button
                  id="book-counselling-cta-btn"
                  onClick={() => setShowInquiry(true)}
                  className="bg-slate-950 hover:bg-slate-900 text-white font-bold px-7 py-4 rounded-2xl shadow-lg active:scale-95 transition-all text-xs uppercase tracking-wider shrink-0 cursor-pointer flex items-center gap-2"
                >
                  Book Free Consultation <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Placeholder when nothing entered yet */}
          {!hasAnyInput && !isUnlocked && (
            <div className="rounded-2xl border-2 border-dashed border-slate-200 p-8 sm:p-12 text-center">
              <BarChart3 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Scan your official answer key link or enter section attempts above to calculate your score
              </p>
            </div>
          )}

          {/* Blurred Live Preview (Before Unlock) */}
          {hasAnyInput && !isUnlocked && !showLeadForm && (
            <div className="rounded-2xl bg-amber-50/70 border border-amber-200/80 p-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                <Lock className="w-40 h-40" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-800 bg-amber-200/60 px-3 py-1 rounded-full inline-block mb-2">
                Score Ready
              </span>
              <div className="text-5xl font-black text-slate-800 blur-sm select-none my-2">
                {stats.totalRaw}
              </div>
              <p className="text-xs font-semibold text-amber-900 mt-2">
                Click &quot;Unlock Full Score, Percentile &amp; IIM Calls&quot; to reveal sectional percentiles, slot normalization &amp; college matches.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Inquiry Modal */}
      {showInquiry && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-200">
            <button
              onClick={() => setShowInquiry(false)}
              className="absolute top-4 right-4 z-[110] bg-slate-100 hover:bg-slate-200 text-slate-700 p-2.5 rounded-full transition-colors cursor-pointer"
              aria-label="Close Modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="bg-gradient-to-br from-[#0A192F] via-[#0D2342] to-[#123058] text-white p-8 text-center rounded-t-3xl relative overflow-hidden">
              <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" /> 1-on-1 Profile Assessment
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                MBA Admissions 2027 Guidance
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg mx-auto font-medium">
                Direct expert counselling for IIM calls, non-IIM premier B-schools &amp; high-ROI PGDM options.
              </p>
            </div>

            <div className="p-6 sm:p-8">
              <InquiryForm />
            </div>
          </div>
          <div className="absolute inset-0 -z-10" onClick={() => setShowInquiry(false)} />
        </div>
      )}

      {/* Marks vs Percentile Benchmark Table */}
      <div className="mt-16 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-lg shadow-slate-900/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
              <BarChart3 className="w-4 h-4" /> Benchmark Matrix
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              CAT Marks vs Percentile Target Matrix (66 Qs · 198 Marks)
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full self-start sm:self-auto">
            Based on 66-Question CAT Pattern
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead className="bg-slate-900 text-white font-bold uppercase text-[11px] tracking-wider">
              <tr>
                <th className="p-4 border-r border-slate-800">Raw Marks (out of 198)</th>
                <th className="p-4 border-r border-slate-800">Expected Percentile</th>
                <th className="p-4 border-r border-slate-800">Approx. Net Correct Attempts</th>
                <th className="p-4">Target Business Schools (2027 Admissions)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium">
              {[
                ["110 – 198", "99.90 – 99.99+", "38 – 42+ Net Correct", "IIM Ahmedabad, IIM Bangalore, IIM Calcutta, FMS Delhi"],
                ["95 – 109", "99.50 – 99.89", "33 – 37 Net Correct", "IIM Lucknow, IIM Kozhikode, IIM Indore, SPJIMR, SJMSOM IIT Bombay"],
                ["82 – 94", "99.00 – 99.49", "29 – 32 Net Correct", "IIM Shillong, MDI Gurgaon, DMS IIT Delhi, IIFT Delhi"],
                ["75 – 81", "98.00 – 98.99", "26 – 28 Net Correct", "New IIMs (Udaipur, Trichy, Ranchi, Raipur), VGSoM IIT Kharagpur"],
                ["65 – 74", "95.00 – 97.99", "23 – 25 Net Correct", "IMT Ghaziabad, IMI New Delhi, DoMS IIT Madras, IIM Rohtak"],
                ["52 – 64", "90.00 – 94.99", "18 – 22 Net Correct", "Baby IIMs (Nagpur, Vizag, Amritsar, Bodh Gaya), FORE, GIM Goa, TAPMI"],
                ["42 – 51", "80.00 – 89.99", "15 – 17 Net Correct", "Great Lakes Chennai, BIMTECH Greater Noida, LBSIM, K J Somaiya"],
                ["32 – 41", "70.00 – 79.99", "12 – 14 Net Correct", "Welingkar, Jaipuria, NDIM, JIMS Rohini, SOIL, IBS Hyderabad"],
                ["20 – 31", "50.00 – 69.99", "8 – 11 Net Correct", "ITM Navi Mumbai, FOSTIIMA, Regional PGDM B-Schools"],
              ].map(([score, perc, attempts, colleges], i) => (
                <tr
                  key={i}
                  className={`hover:bg-amber-50/60 transition-colors ${
                    i % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                  }`}
                >
                  <td className="p-4 font-black text-slate-900 border-r border-slate-200">{score}</td>
                  <td className="p-4 font-black text-amber-600 border-r border-slate-200">{perc}</td>
                  <td className="p-4 text-slate-600 border-r border-slate-200 font-semibold">{attempts}</td>
                  <td className="p-4 text-slate-800">{colleges}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CAT Exam Pattern Overview Table */}
      <div className="mt-12 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-lg shadow-slate-900/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
              <FileText className="w-4 h-4" /> Exam Architecture
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              CAT 2026 Section-Wise Structure &amp; Marking Rules
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full self-start sm:self-auto">
            120 Minutes Total Duration
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead className="bg-slate-900 text-white font-bold uppercase text-[11px] tracking-wider">
              <tr>
                <th className="p-4 border-r border-slate-800">Section Name</th>
                <th className="p-4 border-r border-slate-800">Total Qs</th>
                <th className="p-4 border-r border-slate-800">MCQs (+3 / −1)</th>
                <th className="p-4 border-r border-slate-800">TITA (+3 / 0)</th>
                <th className="p-4 border-r border-slate-800">Max Marks</th>
                <th className="p-4">Time Limit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium">
              {SECTIONS.map((s, i) => (
                <tr
                  key={s.key}
                  className={`hover:bg-slate-50 transition-colors ${
                    i % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                  }`}
                >
                  <td className="p-4 font-black text-slate-900 border-r border-slate-200">
                    {s.label} ({s.fullName})
                  </td>
                  <td className="p-4 border-r border-slate-200 font-semibold">{s.totalMcq + s.totalTita}</td>
                  <td className="p-4 border-r border-slate-200 text-emerald-700 font-semibold">{s.totalMcq}</td>
                  <td className="p-4 border-r border-slate-200 text-amber-700 font-semibold">{s.totalTita}</td>
                  <td className="p-4 border-r border-slate-200 font-black text-slate-900">{s.maxScore} Marks</td>
                  <td className="p-4 text-slate-600 font-semibold">40 Minutes</td>
                </tr>
              ))}
              <tr className="bg-slate-900 text-white font-bold">
                <td className="p-4 border-r border-slate-800">Overall Total</td>
                <td className="p-4 border-r border-slate-800">66 Questions</td>
                <td className="p-4 border-r border-slate-800">49 MCQs</td>
                <td className="p-4 border-r border-slate-800">17 TITAs</td>
                <td className="p-4 border-r border-slate-800 text-amber-300">198 Marks</td>
                <td className="p-4">120 Minutes (2 Hours)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
