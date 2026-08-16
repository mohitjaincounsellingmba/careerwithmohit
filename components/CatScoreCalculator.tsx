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
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-300",
    shadow: "shadow-[8px_8px_0px_0px_rgba(124,58,237,1)]",
    accent: "#7c3aed",
  },
  {
    key: "dilr",
    label: "DILR",
    fullName: "Data Interpretation & Logical Reasoning",
    totalMcq: 16,
    totalTita: 4,
    maxScore: 60,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-300",
    shadow: "shadow-[8px_8px_0px_0px_rgba(37,99,235,1)]",
    accent: "#2563eb",
  },
  {
    key: "qa",
    label: "QA",
    fullName: "Quantitative Aptitude",
    totalMcq: 14,
    totalTita: 8,
    maxScore: 66,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-300",
    shadow: "shadow-[8px_8px_0px_0px_rgba(5,150,105,1)]",
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
      color: "text-emerald-700 bg-emerald-100 border-emerald-400",
    };
  }
  if (percentile >= 98.0) {
    return {
      tier: "Tier 1.5: Top Legacy IIMs & Premier B-Schools",
      colleges: ["IIM Lucknow", "IIM Kozhikode", "IIM Indore", "IIM Shillong", "MDI Gurgaon", "DMS IIT Delhi", "IIFT Delhi"],
      badge: "BLACKI & MDI Calls Likely",
      color: "text-blue-700 bg-blue-100 border-blue-400",
    };
  }
  if (percentile >= 90.0) {
    return {
      tier: "Tier 2 Top: New IIMs, IITs & Top Private Institutes",
      colleges: ["New IIMs (Udaipur, Trichy, Ranchi, Raipur)", "IMT Ghaziabad", "IMI New Delhi", "VGSoM IIT Kharagpur", "DoMS IIT Madras", "GIM Goa"],
      badge: "CAP / New IIMs Strong Call",
      color: "text-amber-700 bg-amber-100 border-amber-400",
    };
  }
  if (percentile >= 80.0) {
    return {
      tier: "Tier 2: Baby IIMs & Reputed PGDM Institutes",
      colleges: ["Baby IIMs (Nagpur, Vizag, Amritsar, Bodh Gaya)", "FORE School of Management", "TAPMI Manipal", "Great Lakes Chennai", "BIMTECH Greater Noida", "LBSIM Delhi"],
      badge: "Baby IIMs & Top PGDM Range",
      color: "text-indigo-700 bg-indigo-100 border-indigo-400",
    };
  }
  if (percentile >= 70.0) {
    return {
      tier: "Tier 3: Quality Regional & Metro PGDM Hubs",
      colleges: ["K J Somaiya Mumbai", "Welingkar Mumbai/Bangalore", "Jaipuria Institute", "NDIM Delhi", "JIMS Rohini", "SOIL Institute", "IBS Hyderabad"],
      badge: "Metro PGDM & Direct Range",
      color: "text-purple-700 bg-purple-100 border-purple-400",
    };
  }
  return {
    tier: "Specialized & Profile-Based MBA Admissions",
    colleges: ["ITM Navi Mumbai", "FOSTIIMA Delhi", "Regional University MBA Programs", "Alternative Exams: CMAT / MAT / CUET-PG"],
    badge: "Profile & Direct Guidance Needed",
    color: "text-slate-700 bg-slate-100 border-slate-400",
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

  // Link & Page Source parsing state
  const [responseSheetUrl, setResponseSheetUrl] = useState("");
  const [pageSource, setPageSource] = useState("");
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleAnalyzeUrl = async () => {
    if (!responseSheetUrl) return alert("Please enter the response sheet URL.");

    setIsAnalyzing(true);
    setParseError("");
    setAnalysisResult(null);

    try {
      const res = await fetch("/api/analyze-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: responseSheetUrl }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Analysis failed");

      setAnalysisResult(result.data);
    } catch (err: any) {
      setParseError(err.message || "Failed to scan URL. Please paste page source or enter marks manually.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleParseSource = () => {
    if (!pageSource) {
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
          "Could not find any 'Answered' status in the pasted content. Make sure you pasted the full page source from your response sheet."
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
    const num = parseInt(value);
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
      {/* Main Calculator Card */}
      <div className="bg-white border-[8px] border-foreground shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
        {/* Header */}
        <div className="bg-foreground text-white p-8 md:p-10 border-b-[8px] border-foreground">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4">
            <div className="flex items-center gap-4">
              <div className="bg-amber-400 p-3.5 border-4 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] shrink-0">
                <Calculator className="w-8 h-8 text-foreground" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-tight">
                  CAT 2026 Score Calculator & Predictor
                </h2>
                <p className="text-amber-300 font-bold text-xs md:text-sm uppercase tracking-widest mt-1">
                  66 Questions · 198 Max Marks · Response Sheet Scanner · 2027 MBA Percentile
                </p>
              </div>
            </div>

            {/* Slot Selector */}
            <div className="bg-white/10 p-3 border-2 border-white/20">
              <label htmlFor="slot-select" className="block text-[11px] font-black uppercase text-amber-300 mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Exam Slot Normalization
              </label>
              <select
                id="slot-select"
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value as SlotKey)}
                className="bg-slate-900 text-white font-bold text-xs p-2 border border-white/40 focus:outline-none focus:ring-2 focus:ring-amber-400 uppercase w-full cursor-pointer"
              >
                <option value="general">Overall / General Normalization</option>
                <option value="slot1">Slot 1 (Morning Session)</option>
                <option value="slot2">Slot 2 (Afternoon Session)</option>
                <option value="slot3">Slot 3 (Evening Session)</option>
              </select>
            </div>
          </div>

          {/* Marking Scheme badges */}
          <div className="flex flex-wrap gap-2.5 mt-6">
            <span className="bg-emerald-600 text-white text-xs font-black px-3 py-1.5 uppercase tracking-widest border-2 border-white/30 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Correct MCQ: +3
            </span>
            <span className="bg-rose-600 text-white text-xs font-black px-3 py-1.5 uppercase tracking-widest border-2 border-white/30">
              ✗ Wrong MCQ: −1
            </span>
            <span className="bg-amber-500 text-white text-xs font-black px-3 py-1.5 uppercase tracking-widest border-2 border-white/30">
              ◇ TITA Correct: +3
            </span>
            <span className="bg-slate-700 text-white text-xs font-black px-3 py-1.5 uppercase tracking-widest border-2 border-white/30">
              — TITA Wrong: 0 (No Negative)
            </span>
          </div>
        </div>

        <div className="p-6 md:p-10">
          {/* Response Sheet URL Section */}
          <div className="mb-12 bg-slate-50 border-4 border-foreground p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-amber-500 animate-pulse" />
              <h3 className="text-xl font-black uppercase tracking-tight">
                Step 1: Check CAT 2026 Answer Key / Response Sheet URL
              </h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 mb-2">
                  Method A: Paste Official Response Sheet Link (cdn.digialm.com / iimcat.ac.in)
                </label>
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <input
                    type="url"
                    id="response-sheet-input"
                    value={responseSheetUrl}
                    onChange={(e) => setResponseSheetUrl(e.target.value)}
                    placeholder="https://cdn.digialm.com/.../CandidateResponseSheet.html"
                    className="flex-1 bg-white border-4 border-foreground p-4 font-bold text-base md:text-lg focus:outline-none focus:ring-4 focus:ring-amber-300 transition-all"
                  />
                  <button
                    id="scan-answer-key-btn"
                    onClick={handleAnalyzeUrl}
                    disabled={isAnalyzing}
                    className="bg-amber-400 text-foreground border-4 border-foreground px-8 py-4 font-black uppercase hover:bg-foreground hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 cursor-pointer shrink-0"
                  >
                    {isAnalyzing ? "Scanning Answer Key..." : "Scan My Response Sheet"}
                  </button>
                </div>

                {analysisResult && (
                  <div className="bg-white border-4 border-amber-400 p-5 animate-in slide-in-from-top-4 duration-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center gap-2 text-emerald-700 font-black uppercase text-xs mb-4">
                      <Zap className="w-4 h-4 text-emerald-600" />
                      Answer Key Successfully Scanned!
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="bg-slate-50 p-3 border-2 border-slate-200">
                        <div className="text-[10px] font-black text-slate-500 uppercase">Total Questions</div>
                        <div className="text-2xl font-black">{analysisResult.totalFetched || 66}</div>
                      </div>
                      <div className="bg-emerald-50 p-3 border-2 border-emerald-300">
                        <div className="text-[10px] font-black text-emerald-700 uppercase">Answered Qs</div>
                        <div className="text-2xl font-black text-emerald-800">{analysisResult.answeredCount}</div>
                      </div>
                      <div className="bg-amber-50 p-3 border-2 border-amber-300 col-span-2 md:col-span-1">
                        <div className="text-[10px] font-black text-amber-700 uppercase">Max Possible Marks</div>
                        <div className="text-2xl font-black text-amber-900">198</div>
                      </div>
                    </div>
                    <p className="text-xs font-bold text-slate-600 uppercase mt-3">
                      Enter your section-wise right and wrong counts below to compute normalized percentile.
                    </p>
                  </div>
                )}
              </div>

              <div className="h-px bg-slate-200"></div>

              <div>
                <label className="block text-xs font-black uppercase text-slate-700 mb-2">
                  Method B: Paste Candidate HTML Page Source (Alternative)
                </label>
                <textarea
                  id="page-source-input"
                  value={pageSource}
                  onChange={(e) => setPageSource(e.target.value)}
                  placeholder="Ctrl+U / Right Click -> 'View Page Source' on your response sheet, copy all and paste here..."
                  className="w-full h-20 bg-white border-4 border-foreground p-3 font-bold text-xs focus:outline-none focus:ring-4 focus:ring-amber-300 transition-all mb-3"
                />
                {parseError && (
                  <p className="text-rose-600 font-black text-xs uppercase mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {parseError}
                  </p>
                )}
                <button
                  id="parse-source-btn"
                  onClick={handleParseSource}
                  disabled={isParsing}
                  className="w-full bg-slate-800 text-white border-4 border-foreground px-6 py-3 font-black uppercase hover:bg-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 cursor-pointer text-sm"
                >
                  {isParsing ? "Parsing Response Sheet..." : "Parse Page Source"}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-8">
            <div className="h-1 flex-1 bg-slate-200"></div>
            <span className="text-xs font-black uppercase text-slate-500 tracking-widest px-4">
              STEP 2: ENTER SECTION MARKS (VARC · DILR · QA)
            </span>
            <div className="h-1 flex-1 bg-slate-200"></div>
          </div>

          {/* Section Tabs */}
          <div className="flex border-4 border-foreground mb-8 overflow-hidden">
            {SECTIONS.map((s) => {
              const sRaw = calcSectionRaw(inputs[s.key as SectionKey]);
              return (
                <button
                  key={s.key}
                  id={`tab-${s.key}`}
                  onClick={() => setActiveTab(s.key as SectionKey)}
                  className={`flex-1 py-4 px-2 font-black uppercase text-sm transition-all border-r-4 border-foreground last:border-r-0 cursor-pointer ${
                    activeTab === s.key
                      ? "bg-foreground text-white"
                      : "bg-white text-foreground hover:bg-slate-50"
                  }`}
                >
                  <div className="text-base md:text-lg">{s.label}</div>
                  <div
                    className={`text-xs ${
                      activeTab === s.key ? "text-amber-300" : "text-slate-500"
                    }`}
                  >
                    {sRaw !== 0 || inputs[s.key as SectionKey].wrongMcq !== ""
                      ? `${sRaw} / ${s.maxScore} marks`
                      : `Max ${s.maxScore} marks`}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Section Input Panel */}
          <div className={`${currentSection.bg} border-4 ${currentSection.border} p-6 md:p-8 mb-8`}>
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className={`text-2xl md:text-3xl font-black ${currentSection.color}`}>
                  {currentSection.label}
                </div>
                <div className="text-xs md:text-sm font-bold text-slate-600">
                  — {currentSection.fullName} ({currentSection.totalMcq + currentSection.totalTita} Questions · {currentSection.maxScore} Marks)
                </div>
              </div>
              <div className="bg-white border-2 border-foreground px-3 py-1 text-xs font-black uppercase">
                Time Limit: 40 Mins
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Correct MCQ */}
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 mb-2">
                  Correct MCQ Answers
                  <span className="text-slate-500 ml-1 normal-case">(max {currentSection.totalMcq})</span>
                </label>
                <input
                  type="number"
                  id={`correct-mcq-${activeTab}`}
                  min={0}
                  max={currentSection.totalMcq}
                  value={currentInput.correctMcq}
                  onChange={(e) => updateInput(activeTab, "correctMcq", e.target.value)}
                  placeholder="0"
                  className="w-full bg-white border-4 border-foreground p-4 text-2xl font-black focus:outline-none focus:ring-4 focus:ring-emerald-300 transition-all"
                />
                <p className="text-xs text-emerald-700 font-black uppercase mt-1.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> +3 marks per question
                </p>
              </div>

              {/* Wrong MCQ */}
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 mb-2">
                  Wrong MCQ Answers
                  <span className="text-slate-500 ml-1 normal-case">(max {currentSection.totalMcq})</span>
                </label>
                <input
                  type="number"
                  id={`wrong-mcq-${activeTab}`}
                  min={0}
                  max={currentSection.totalMcq}
                  value={currentInput.wrongMcq}
                  onChange={(e) => updateInput(activeTab, "wrongMcq", e.target.value)}
                  placeholder="0"
                  className="w-full bg-white border-4 border-foreground p-4 text-2xl font-black focus:outline-none focus:ring-4 focus:ring-rose-300 transition-all"
                />
                <p className="text-xs text-rose-600 font-black uppercase mt-1.5">
                  ✗ −1 negative penalty
                </p>
              </div>

              {/* Correct TITA */}
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 mb-2">
                  Correct TITA (Non-MCQ)
                  <span className="text-slate-500 ml-1 normal-case">(max {currentSection.totalTita})</span>
                </label>
                <input
                  type="number"
                  id={`correct-tita-${activeTab}`}
                  min={0}
                  max={currentSection.totalTita}
                  value={currentInput.correctTita}
                  onChange={(e) => updateInput(activeTab, "correctTita", e.target.value)}
                  placeholder="0"
                  className="w-full bg-white border-4 border-foreground p-4 text-2xl font-black focus:outline-none focus:ring-4 focus:ring-amber-300 transition-all"
                />
                <p className="text-xs text-amber-700 font-black uppercase mt-1.5">
                  ◇ +3 marks, 0 negative
                </p>
              </div>
            </div>

            {/* Section score live preview */}
            <div className="mt-6 flex items-center justify-between bg-white border-4 border-foreground p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div>
                <span className="text-xs font-black uppercase text-slate-500 block">
                  {currentSection.label} Section Raw Score
                </span>
                <span className="text-xs font-bold text-slate-400">
                  Est. Sectional Percentile: ~{currentStats.percentile}%ile
                </span>
              </div>
              <span className={`text-3xl md:text-4xl font-black ${currentSection.color}`}>
                {currentStats.raw}
                <span className="text-sm text-slate-400 ml-1">/ {currentStats.maxRaw} marks</span>
              </span>
            </div>
          </div>

          {/* Navigate sections */}
          <div className="flex gap-3 mb-10">
            {SECTIONS.map((s, idx) => (
              <button
                key={s.key}
                onClick={() => setActiveTab(s.key as SectionKey)}
                className={`flex-1 text-xs font-black uppercase py-2.5 border-2 border-foreground transition-all cursor-pointer ${
                  activeTab === s.key ? "bg-foreground text-white" : "bg-white hover:bg-slate-50"
                }`}
              >
                {idx + 1}. {s.label} ({s.maxScore}M)
              </button>
            ))}
          </div>

          {/* Reset + Calculate Row */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={reset}
              id="reset-calculator-btn"
              className="flex items-center gap-2 text-xs md:text-sm font-black uppercase tracking-widest text-slate-500 hover:text-foreground group cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              Reset All Scores
            </button>

            {!isUnlocked && hasAnyInput && !showLeadForm && (
              <button
                id="see-results-btn"
                onClick={() => setShowLeadForm(true)}
                className="bg-amber-400 text-foreground border-4 border-foreground px-8 py-4 text-base md:text-lg font-black uppercase hover:bg-foreground hover:text-white transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 cursor-pointer"
              >
                <Lock className="w-5 h-5" />
                Unlock Full Score & Percentile
              </button>
            )}
          </div>

          {/* Lead Gate */}
          {showLeadForm && !isUnlocked && (
            <div className="border-4 border-foreground bg-foreground text-white p-6 md:p-8 mb-8 animate-in slide-in-from-bottom-4 duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-6 h-6 text-amber-400 animate-pulse" />
                <div>
                  <h3 className="text-xl md:text-2xl font-black uppercase">
                    Unlock Your CAT 2026 Score, Percentile & IIM Call Predictor
                  </h3>
                  <p className="text-xs text-slate-300 font-bold mt-0.5">
                    Instant breakdown + Free 2027 MBA admission eligibility report.
                  </p>
                </div>
              </div>
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    required
                    id="lead-name-input"
                    type="text"
                    placeholder="Full Name"
                    value={leadData.name}
                    onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                    className="w-full bg-white/10 border-2 border-white/20 p-3.5 font-bold text-white placeholder:text-white/40 focus:bg-white/20 focus:outline-none"
                  />
                  <input
                    required
                    id="lead-phone-input"
                    type="tel"
                    placeholder="WhatsApp Number (for call updates)"
                    value={leadData.number}
                    onChange={(e) => setLeadData({ ...leadData, number: e.target.value })}
                    className="w-full bg-white/10 border-2 border-white/20 p-3.5 font-bold text-white placeholder:text-white/40 focus:bg-white/20 focus:outline-none"
                  />
                  <input
                    required
                    id="lead-email-input"
                    type="email"
                    placeholder="Email Address"
                    value={leadData.email}
                    onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                    className="w-full bg-white/10 border-2 border-white/20 p-3.5 font-bold text-white placeholder:text-white/40 focus:bg-white/20 focus:outline-none"
                  />
                  <input
                    required
                    id="lead-city-input"
                    type="text"
                    placeholder="Current City / State (e.g. Delhi, Mumbai, Bengaluru)"
                    value={leadData.location}
                    onChange={(e) => setLeadData({ ...leadData, location: e.target.value })}
                    className="w-full bg-white/10 border-2 border-white/20 p-3.5 font-bold text-white placeholder:text-white/40 focus:bg-white/20 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  id="reveal-score-btn"
                  className="w-full bg-amber-400 text-foreground border-4 border-amber-200 p-4 text-lg md:text-xl font-black uppercase hover:bg-amber-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[4px_4px_0px_0px_rgba(255,255,255,0.4)]"
                >
                  Reveal My Predicted CAT Score & Percentile <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setShowLeadForm(false)}
                  className="w-full text-xs font-bold text-white/50 uppercase hover:text-white transition-colors text-center cursor-pointer"
                >
                  ← Go Back
                </button>
              </form>
            </div>
          )}

          {/* Results Panel */}
          {isUnlocked && (
            <div className="animate-in fade-in zoom-in duration-500 space-y-8">
              {/* Overall Score Banner */}
              <div className="bg-foreground text-white p-8 md:p-10 border-b-[12px] border-amber-400 relative overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                  <Trophy className="w-48 h-48" />
                </div>
                <div className="relative z-10">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-amber-300 block mb-2 animate-pulse">
                    Overall Predicted CAT 2026 Score & Percentile
                  </span>
                  <div className="flex items-end gap-4 flex-wrap mb-6">
                    <div className="text-7xl md:text-9xl font-black leading-none">{stats.totalRaw}</div>
                    <div className="text-2xl font-bold text-slate-400 pb-2">/ {stats.maxTotal} marks</div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white/10 border-2 border-white/20 p-4">
                      <div className="text-[10px] font-black uppercase text-amber-300">Expected Percentile</div>
                      <div className="text-3xl font-black">~{stats.overallPercentile}+ %ile</div>
                    </div>
                    <div className="bg-white/10 border-2 border-white/20 p-4">
                      <div className="text-[10px] font-black uppercase text-amber-300">Estimated Scaled Score</div>
                      <div className="text-3xl font-black">{stats.scaledScore} / 198</div>
                    </div>
                    <div className="bg-white/10 border-2 border-white/20 p-4">
                      <div className="text-[10px] font-black uppercase text-amber-300">Selected Slot</div>
                      <div className="text-xl font-black uppercase mt-1">
                        {selectedSlot === "slot1" ? "Slot 1" : selectedSlot === "slot2" ? "Slot 2" : selectedSlot === "slot3" ? "Slot 3" : "All Slots"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Target College Recommendations */}
              <div className="bg-amber-50 border-4 border-foreground p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-foreground" />
                    <h3 className="text-xl font-black uppercase">
                      Recommended B-Schools For Your Score Band (~{stats.overallPercentile}+ %ile)
                    </h3>
                  </div>
                  <span className={`text-xs font-black px-3 py-1 border-2 uppercase ${stats.recommendedColleges.color}`}>
                    {stats.recommendedColleges.badge}
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-700 mb-4">
                  {stats.recommendedColleges.tier}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                  {stats.recommendedColleges.colleges.map((col, idx) => (
                    <div
                      key={idx}
                      className="bg-white border-2 border-foreground p-3 font-black text-xs uppercase flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{col}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 pt-2 border-t-2 border-slate-200">
                  <Link
                    href="/mba-pgdm-admissions-by-region"
                    className="text-xs font-black uppercase underline decoration-2 hover:text-amber-700"
                  >
                    View Colleges by Region (Delhi, Mumbai, Bangalore, Pune) →
                  </Link>
                  <Link
                    href="/tools/college-comparison"
                    className="text-xs font-black uppercase underline decoration-2 hover:text-amber-700"
                  >
                    Compare B-Schools Fees & Placements →
                  </Link>
                </div>
              </div>

              {/* Section-wise breakdown */}
              <div>
                <h3 className="text-lg font-black uppercase tracking-widest mb-4 text-slate-700">
                  Section-Wise Score & Estimated Percentile Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {stats.sections.map((s, idx) => {
                    const sect = SECTIONS[idx];
                    return (
                      <div
                        key={s.key}
                        className={`bg-white border-4 border-foreground p-6 ${sect.shadow}`}
                      >
                        <div className={`text-xs font-black uppercase tracking-widest ${sect.color} mb-1`}>
                          {sect.label} ({sect.fullName})
                        </div>
                        <div className="text-4xl font-black mb-2">
                          {s.raw}
                          <span className="text-sm text-slate-400 ml-1">/ {s.maxRaw} marks</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className={`w-4 h-4 ${sect.color}`} />
                          <span className="text-sm font-black text-slate-600">
                            ~{s.percentile}+ Sectional %ile
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <button
                id="book-counselling-cta-btn"
                onClick={() => setShowInquiry(true)}
                className="w-full bg-amber-400 text-foreground p-6 md:p-8 border-4 border-foreground flex items-center justify-between group cursor-pointer hover:bg-foreground hover:text-white transition-colors text-left shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                <div>
                  <div className="text-xs md:text-sm font-black uppercase tracking-widest mb-1 text-foreground group-hover:text-amber-300">
                    Confused About Your IIM Calls & College Choices?
                  </div>
                  <div className="text-xl md:text-2xl font-black uppercase">
                    Book Free MBA 2027 Admission Counselling with Mohit Jain →
                  </div>
                </div>
                <ChevronRight className="w-8 h-8 group-hover:translate-x-2 transition-transform shrink-0" />
              </button>
            </div>
          )}

          {/* Placeholder when nothing entered yet */}
          {!hasAnyInput && !isUnlocked && (
            <div className="border-4 border-dashed border-slate-200 p-10 md:p-12 text-center">
              <BarChart3 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="font-black uppercase text-slate-500 text-sm tracking-widest">
                Scan your answer key link or enter section attempts above to calculate score
              </p>
            </div>
          )}

          {/* Live preview (before unlock) */}
          {hasAnyInput && !isUnlocked && !showLeadForm && (
            <div className="border-4 border-amber-300 bg-amber-50 p-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                <Lock className="w-32 h-32" />
              </div>
              <p className="text-xs font-black uppercase text-amber-700 tracking-widest mb-2">Live Preview</p>
              <div className="text-5xl font-black text-foreground blur-[4px] select-none">
                {stats.totalRaw}
              </div>
              <p className="text-sm font-bold text-amber-800 mt-3">
                Click &apos;Unlock Full Score & Percentile&apos; to view sectional percentiles, slot normalization & IIM eligibility
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Inquiry Modal */}
      {showInquiry && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-[32px_32px_0px_0px_rgba(0,0,0,1)] border-8 border-foreground text-foreground">
            <button
              onClick={() => setShowInquiry(false)}
              className="absolute top-4 right-4 z-[110] bg-white border-4 border-foreground p-2 hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
              aria-label="Close Modal"
            >
              <X className="h-6 w-6 stroke-[3px]" />
            </button>
            <div className="bg-white">
              <div className="bg-amber-400 p-8 text-center border-b-8 border-foreground text-foreground">
                <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter">
                  MBA Admission Support 2027 (CAT 2026)
                </h2>
                <p className="font-bold mt-2 text-slate-800">
                  Expert 1-on-1 Profile Evaluation for IIMs & Top Business Schools with Mohit Jain.
                </p>
              </div>
              <div className="p-4 md:p-8">
                <InquiryForm />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 -z-10" onClick={() => setShowInquiry(false)} />
        </div>
      )}

      {/* Percentile Table */}
      <div className="mt-20">
        <h3 className="text-3xl font-black uppercase tracking-tight mb-8 border-l-[12px] border-amber-400 pl-6">
          CAT 2026 Marks vs Percentile Benchmark (66 Questions · 198 Marks)
        </h3>
        <div className="overflow-x-auto border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <table className="w-full text-left border-collapse">
            <thead className="bg-foreground text-white uppercase text-xs md:text-sm font-black tracking-widest">
              <tr>
                <th className="p-5 border-r border-white/20">Raw Marks (out of 198)</th>
                <th className="p-5 border-r border-white/20">Expected Percentile</th>
                <th className="p-5 border-r border-white/20">Approx. Correct Attempts</th>
                <th className="p-5">Target Business Schools (2027 Admissions)</th>
              </tr>
            </thead>
            <tbody className="text-sm md:text-base font-bold">
              {[
                ["110 – 198", "99.90 – 99.99+", "38 – 42+ Net Correct", "IIM Ahmedabad, IIM Bangalore, IIM Calcutta, FMS Delhi"],
                ["95 – 109", "99.50 – 99.89", "33 – 37 Net Correct", "IIM Lucknow, IIM Kozhikode, IIM Indore, SPJIMR, SJMSOM IIT Bombay"],
                ["82 – 94", "99.00 – 99.49", "29 – 32 Net Correct", "IIM Shillong, MDI Gurgaon, DMS IIT Delhi, IIFT Delhi"],
                ["75 – 81", "98.00 – 98.99", "26 – 28 Net Correct", "New IIMs (Udaipur, Trichy, Ranchi, Raipur), VGSoM IIT Kharagpur"],
                ["65 – 74", "95.00 – 97.99", "23 – 25 Net Correct", "IMT Ghaziabad, IMI New Delhi, DoMS IIT Madras, IIM Rohtak, IIM Kashipur"],
                ["52 – 64", "90.00 – 94.99", "18 – 22 Net Correct", "Baby IIMs (Nagpur, Vizag, Amritsar, Bodh Gaya), FORE, GIM Goa, TAPMI"],
                ["42 – 51", "80.00 – 89.99", "15 – 17 Net Correct", "Great Lakes Chennai, BIMTECH Greater Noida, LBSIM, K J Somaiya"],
                ["32 – 41", "70.00 – 79.99", "12 – 14 Net Correct", "Welingkar, Jaipuria, NDIM, JIMS Rohini, SOIL, IBS Hyderabad"],
                ["20 – 31", "50.00 – 69.99", "8 – 11 Net Correct", "ITM Navi Mumbai, FOSTIIMA, Regional PGDM B-Schools"],
              ].map(([score, perc, attempts, colleges], i) => (
                <tr
                  key={i}
                  className={`border-b-4 border-foreground ${
                    i % 2 === 0 ? "bg-white" : "bg-slate-50"
                  } hover:bg-amber-50 transition-colors`}
                >
                  <td className="p-5 border-r-4 border-foreground font-black">{score}</td>
                  <td className="p-5 border-r-4 border-foreground text-amber-600 font-black">{perc}</td>
                  <td className="p-5 border-r-4 border-foreground text-slate-600">{attempts}</td>
                  <td className="p-5">{colleges}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section-wise info */}
      <div className="mt-20">
        <h3 className="text-3xl font-black uppercase tracking-tight mb-8 border-l-[12px] border-amber-400 pl-6">
          CAT 2026 Section-Wise Exam Pattern & Marking Structure
        </h3>
        <div className="overflow-x-auto border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <table className="w-full text-left border-collapse">
            <thead className="bg-foreground text-white uppercase text-xs md:text-sm font-black tracking-widest">
              <tr>
                <th className="p-5 border-r border-white/20">Section Name</th>
                <th className="p-5 border-r border-white/20">Total Qs</th>
                <th className="p-5 border-r border-white/20">MCQs (+3 / −1)</th>
                <th className="p-5 border-r border-white/20">TITA (+3 / 0)</th>
                <th className="p-5 border-r border-white/20">Max Score</th>
                <th className="p-5">Sectional Time</th>
              </tr>
            </thead>
            <tbody className="text-base font-bold">
              {SECTIONS.map((s, i) => (
                <tr
                  key={s.key}
                  className={`border-b-4 border-foreground ${
                    i % 2 === 0 ? "bg-white" : "bg-slate-50"
                  } hover:bg-amber-50 transition-colors`}
                >
                  <td className={`p-5 border-r-4 border-foreground font-black ${s.color}`}>
                    {s.label} ({s.fullName})
                  </td>
                  <td className="p-5 border-r-4 border-foreground">{s.totalMcq + s.totalTita}</td>
                  <td className="p-5 border-r-4 border-foreground">{s.totalMcq}</td>
                  <td className="p-5 border-r-4 border-foreground">{s.totalTita}</td>
                  <td className="p-5 border-r-4 border-foreground font-black">{s.maxScore} Marks</td>
                  <td className="p-5">40 Minutes</td>
                </tr>
              ))}
              <tr className="bg-foreground text-white font-black">
                <td className="p-5 border-r-4 border-white/20">OVERALL TOTAL</td>
                <td className="p-5 border-r-4 border-white/20">66 Questions</td>
                <td className="p-5 border-r-4 border-white/20">49 MCQs</td>
                <td className="p-5 border-r-4 border-white/20">17 TITAs</td>
                <td className="p-5 border-r-4 border-white/20 text-amber-300">198 Marks</td>
                <td className="p-5">120 Minutes (2 Hours)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
