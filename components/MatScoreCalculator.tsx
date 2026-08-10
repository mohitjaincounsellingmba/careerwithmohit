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
} from "lucide-react";
import { InquiryForm } from "@/components/InquiryForm";

// ─── MAT May 2026 Exam Structure ────────────────────────────────────────────
// MAT has 5 sections, each with 40 MCQ questions (200 total)
// Marking: +1 correct, -0.25 wrong. Max composite = 800 (scaled)
// Section 5 (Indian & Global Environment) is usually NOT counted in composite

const SECTIONS = [
  {
    key: "lc",
    label: "LC",
    fullName: "Language Comprehension",
    totalMcq: 40,
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-300",
    shadow: "shadow-[8px_8px_0px_0px_rgba(124,58,237,1)]",
    accent: "#7c3aed",
  },
  {
    key: "ms",
    label: "MS",
    fullName: "Mathematical Skills",
    totalMcq: 40,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-300",
    shadow: "shadow-[8px_8px_0px_0px_rgba(37,99,235,1)]",
    accent: "#2563eb",
  },
  {
    key: "da",
    label: "DA",
    fullName: "Data Analysis & Sufficiency",
    totalMcq: 40,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-300",
    shadow: "shadow-[8px_8px_0px_0px_rgba(5,150,105,1)]",
    accent: "#059669",
  },
  {
    key: "icr",
    label: "ICR",
    fullName: "Intelligence & Critical Reasoning",
    totalMcq: 40,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-300",
    shadow: "shadow-[8px_8px_0px_0px_rgba(217,119,6,1)]",
    accent: "#d97706",
  },
  {
    key: "ige",
    label: "IGE",
    fullName: "Indian & Global Environment",
    totalMcq: 40,
    color: "text-slate-500",
    bg: "bg-slate-50",
    border: "border-slate-300",
    shadow: "shadow-[8px_8px_0px_0px_rgba(100,116,139,1)]",
    accent: "#64748b",
    notCounted: true,
  },
];

type SectionKey = "lc" | "ms" | "da" | "icr" | "ige";

interface SectionInput {
  correct: number | "";
  wrong: number | "";
}

const defaultSection: SectionInput = { correct: "", wrong: "" };

// MAT composite score: out of 800 (4 sections × 200 raw scaled to 800)
// Raw score per section = correct*1 - wrong*0.25 (max 40, min -10)
// Composite is proportional across 4 scored sections
function calcSectionRaw(input: SectionInput) {
  const c = Number(input.correct) || 0;
  const w = Number(input.wrong) || 0;
  return parseFloat((c * 1 - w * 0.25).toFixed(2));
}

// Scale raw (max 40) to MAT section score (out of 200)
function scaleToSection(raw: number): number {
  return Math.max(0, parseFloat(((raw / 40) * 200).toFixed(1)));
}

// Estimate percentile from composite score (out of 800) based on MAT historical data
function estimatePercentile(composite: number): number {
  if (composite >= 700) return 99.5;
  if (composite >= 650) return 99.0;
  if (composite >= 600) return 97.0;
  if (composite >= 560) return 95.0;
  if (composite >= 530) return 90.0;
  if (composite >= 500) return 85.0;
  if (composite >= 470) return 80.0;
  if (composite >= 440) return 75.0;
  if (composite >= 410) return 70.0;
  if (composite >= 370) return 60.0;
  if (composite >= 320) return 50.0;
  if (composite >= 270) return 40.0;
  return 30.0;
}

function estimateSectionPercentile(raw: number): number {
  if (raw >= 36) return 99.0;
  if (raw >= 32) return 97.0;
  if (raw >= 28) return 90.0;
  if (raw >= 24) return 80.0;
  if (raw >= 20) return 70.0;
  if (raw >= 15) return 60.0;
  if (raw >= 10) return 50.0;
  return 30.0;
}

export function MatScoreCalculator() {
  const [inputs, setInputs] = useState<Record<SectionKey, SectionInput>>({
    lc: { ...defaultSection },
    ms: { ...defaultSection },
    da: { ...defaultSection },
    icr: { ...defaultSection },
    ige: { ...defaultSection },
  });

  const [showLeadForm, setShowLeadForm] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [leadData, setLeadData] = useState({
    name: "",
    number: "",
    email: "",
    location: "",
  });
  const [showInquiry, setShowInquiry] = useState(false);
  const [activeTab, setActiveTab] = useState<SectionKey>("lc");

  const stats = useMemo(() => {
    const sections = SECTIONS.map((s) => {
      const inp = inputs[s.key as SectionKey];
      const raw = calcSectionRaw(inp);
      const scaled = scaleToSection(raw);
      const percentile = estimateSectionPercentile(raw);
      return { key: s.key, raw, scaled, percentile, notCounted: s.notCounted };
    });

    // Composite = sum of 4 scored sections (IGE excluded)
    const compositeRaw = sections
      .filter((s) => !s.notCounted)
      .reduce((a, b) => a + b.scaled, 0);
    const compositeScore = Math.max(0, Math.round(compositeRaw));
    const overallPercentile = estimatePercentile(compositeScore);

    return { sections, compositeScore, overallPercentile };
  }, [inputs]);

  const updateInput = (
    section: SectionKey,
    field: keyof SectionInput,
    value: string
  ) => {
    const num = parseInt(value);
    if (value === "" || (!isNaN(num) && num >= 0 && num <= 40)) {
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
      lc: { ...defaultSection },
      ms: { ...defaultSection },
      da: { ...defaultSection },
      icr: { ...defaultSection },
      ige: { ...defaultSection },
    });
    setIsUnlocked(false);
    setShowLeadForm(false);
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
          source: "Sept MAT Score Calculator & Checker",
          score: stats.compositeScore,
          percentile: stats.overallPercentile,
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
    return inp.correct !== "" || inp.wrong !== "";
  });

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Main Calculator Card */}
      <div className="bg-white border-[8px] border-foreground shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
        {/* Header */}
        <div className="bg-foreground text-white p-8 md:p-10 border-b-[8px] border-foreground">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-amber-400 p-3 border-4 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)]">
              <Calculator className="w-8 h-8 text-foreground" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-tight">
                Sept MAT Score Calculator & Checker
              </h2>
              <p className="text-amber-300 font-bold text-sm uppercase tracking-widest mt-1">
                5 Sections · Composite 800 · Percentile Predictor
              </p>
            </div>
          </div>
          {/* Marking Scheme badges */}
          <div className="flex flex-wrap gap-3 mt-6">
            <span className="bg-emerald-500 text-white text-xs font-black px-3 py-1.5 uppercase tracking-widest border-2 border-white/30">
              ✓ Correct: +1
            </span>
            <span className="bg-rose-500 text-white text-xs font-black px-3 py-1.5 uppercase tracking-widest border-2 border-white/30">
              ✗ Wrong: −0.25
            </span>
            <span className="bg-slate-600 text-white text-xs font-black px-3 py-1.5 uppercase tracking-widest border-2 border-white/30">
              — IGE: Not in composite
            </span>
            <span className="bg-amber-500 text-white text-xs font-black px-3 py-1.5 uppercase tracking-widest border-2 border-white/30">
              Max Composite: 800
            </span>
          </div>
        </div>

        <div className="p-8 md:p-10">
          {/* Section Info Banner */}
          <div className="mb-10 bg-blue-50 border-4 border-blue-300 p-4 flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
            <p className="text-sm font-bold text-blue-800">
              MAT has <strong>5 sections × 40 questions each</strong> (200 total). 
              The composite score (out of 800) is calculated from 4 sections — LC, MS, DA, ICR. 
              The <strong>IGE section is NOT included</strong> in the composite by most colleges.
            </p>
          </div>

          {/* Section Tabs */}
          <div className="flex border-4 border-foreground mb-8 overflow-hidden flex-wrap md:flex-nowrap">
            {SECTIONS.map((s) => {
              const sRaw = calcSectionRaw(inputs[s.key as SectionKey]);
              return (
                <button
                  key={s.key}
                  onClick={() => setActiveTab(s.key as SectionKey)}
                  className={`flex-1 py-4 px-2 font-black uppercase text-sm transition-all border-r-4 border-foreground last:border-r-0 min-w-[80px] ${
                    activeTab === s.key
                      ? "bg-foreground text-white"
                      : "bg-white text-foreground hover:bg-slate-50"
                  } ${s.notCounted ? "opacity-70" : ""}`}
                >
                  <div className="text-base md:text-lg">{s.label}</div>
                  <div
                    className={`text-xs ${
                      activeTab === s.key ? "text-amber-300" : "text-slate-500"
                    }`}
                  >
                    {sRaw > 0 || inputs[s.key as SectionKey].wrong !== ""
                      ? `${sRaw} pts`
                      : "0 pts"}
                  </div>
                  {s.notCounted && (
                    <div className="text-[8px] font-black uppercase tracking-wider text-rose-400 mt-0.5">
                      Not counted
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Section Input Panel */}
          <div
            className={`${currentSection.bg} border-4 ${currentSection.border} p-6 md:p-8 mb-8`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`text-2xl font-black ${currentSection.color}`}>
                {currentSection.label}
              </div>
              <div className="text-sm font-bold text-slate-500">
                — {currentSection.fullName}
              </div>
              {currentSection.notCounted && (
                <span className="bg-rose-100 text-rose-600 text-[9px] font-black uppercase px-2 py-0.5 border border-rose-300">
                  NOT in composite
                </span>
              )}
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase mb-6">
              40 Questions · +1 Correct · −0.25 Wrong
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Correct */}
              <div>
                <label className="block text-xs font-black uppercase text-slate-600 mb-2">
                  Correct
                  <span className="text-slate-400 ml-1 normal-case">
                    (max 40)
                  </span>
                </label>
                <input
                  type="number"
                  min={0}
                  max={40}
                  value={currentInput.correct}
                  onChange={(e) =>
                    updateInput(activeTab, "correct", e.target.value)
                  }
                  placeholder="0"
                  className="w-full bg-white border-4 border-foreground p-4 text-2xl font-black focus:outline-none focus:ring-4 focus:ring-emerald-300 transition-all"
                />
                <p className="text-[10px] text-emerald-700 font-black uppercase mt-1">
                  +1 each
                </p>
              </div>

              {/* Wrong */}
              <div>
                <label className="block text-xs font-black uppercase text-slate-600 mb-2">
                  Wrong
                  <span className="text-slate-400 ml-1 normal-case">
                    (max 40)
                  </span>
                </label>
                <input
                  type="number"
                  min={0}
                  max={40}
                  value={currentInput.wrong}
                  onChange={(e) =>
                    updateInput(activeTab, "wrong", e.target.value)
                  }
                  placeholder="0"
                  className="w-full bg-white border-4 border-foreground p-4 text-2xl font-black focus:outline-none focus:ring-4 focus:ring-rose-300 transition-all"
                />
                <p className="text-[10px] text-rose-600 font-black uppercase mt-1">
                  −0.25 each
                </p>
              </div>
            </div>

            {/* Section live preview */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between bg-white border-4 border-foreground p-4">
                <span className="text-xs font-black uppercase text-slate-500">
                  {currentSection.label} Raw
                </span>
                <span className={`text-3xl font-black ${currentSection.color}`}>
                  {currentStats.raw}
                  <span className="text-sm text-slate-400 ml-1">/ 40</span>
                </span>
              </div>
              {!currentSection.notCounted && (
                <div className="flex items-center justify-between bg-white border-4 border-foreground p-4">
                  <span className="text-xs font-black uppercase text-slate-500">
                    Section Score
                  </span>
                  <span className={`text-3xl font-black ${currentSection.color}`}>
                    {currentStats.scaled}
                    <span className="text-sm text-slate-400 ml-1">/ 200</span>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Navigate sections */}
          <div className="flex gap-3 mb-10 flex-wrap">
            {SECTIONS.map((s, idx) => (
              <button
                key={s.key}
                onClick={() => setActiveTab(s.key as SectionKey)}
                className={`flex-1 text-xs font-black uppercase py-2 border-2 border-foreground transition-all min-w-[60px] ${
                  activeTab === s.key
                    ? "bg-foreground text-white"
                    : "bg-white hover:bg-slate-50"
                }`}
              >
                {idx + 1}. {s.label}
              </button>
            ))}
          </div>

          {/* Reset + CTA Row */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={reset}
              className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-500 hover:text-foreground group"
            >
              <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              Reset All
            </button>

            {!isUnlocked && hasAnyInput && !showLeadForm && (
              <button
                onClick={() => setShowLeadForm(true)}
                className="bg-amber-400 text-foreground border-4 border-foreground px-8 py-4 text-lg font-black uppercase hover:bg-foreground hover:text-white transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3"
              >
                <Lock className="w-5 h-5" />
                See Full Results
              </button>
            )}
          </div>

          {/* Lead Gate */}
          {showLeadForm && !isUnlocked && (
            <div className="border-4 border-foreground bg-foreground text-white p-8 mb-8 animate-in slide-in-from-bottom-4 duration-300">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-6 h-6 text-amber-400 animate-pulse" />
                <h3 className="text-xl font-black uppercase">
                  Unlock Your MAT Score & Percentile
                </h3>
              </div>
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    required
                    type="text"
                    placeholder="Full Name"
                    value={leadData.name}
                    onChange={(e) =>
                      setLeadData({ ...leadData, name: e.target.value })
                    }
                    className="w-full bg-white/10 border-2 border-white/20 p-3 font-bold text-white placeholder:text-white/40 focus:bg-white/20 focus:outline-none"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="WhatsApp Number"
                    value={leadData.number}
                    onChange={(e) =>
                      setLeadData({ ...leadData, number: e.target.value })
                    }
                    className="w-full bg-white/10 border-2 border-white/20 p-3 font-bold text-white placeholder:text-white/40 focus:bg-white/20 focus:outline-none"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email Address"
                    value={leadData.email}
                    onChange={(e) =>
                      setLeadData({ ...leadData, email: e.target.value })
                    }
                    className="w-full bg-white/10 border-2 border-white/20 p-3 font-bold text-white placeholder:text-white/40 focus:bg-white/20 focus:outline-none"
                  />
                  <input
                    required
                    type="text"
                    placeholder="City / Location"
                    value={leadData.location}
                    onChange={(e) =>
                      setLeadData({ ...leadData, location: e.target.value })
                    }
                    className="w-full bg-white/10 border-2 border-white/20 p-3 font-bold text-white placeholder:text-white/40 focus:bg-white/20 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber-400 text-foreground border-4 border-amber-200 p-4 text-xl font-black uppercase hover:bg-amber-300 transition-all flex items-center justify-center gap-2"
                >
                  Reveal My MAT Score <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setShowLeadForm(false)}
                  className="w-full text-[10px] font-bold text-white/40 uppercase hover:text-white transition-colors text-center"
                >
                  ← Go Back
                </button>
              </form>
            </div>
          )}

          {/* Results Panel */}
          {isUnlocked && (
            <div className="animate-in fade-in zoom-in duration-500 space-y-8">
              {/* Composite Score Banner */}
              <div className="bg-foreground text-white p-8 border-b-[12px] border-amber-400 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <Trophy className="w-40 h-40" />
                </div>
                <div className="relative z-10">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-amber-300 block mb-3 animate-pulse">
                    Sept MAT Composite Score (out of 800)
                  </span>
                  <div className="flex items-end gap-4 flex-wrap">
                    <div className="text-8xl md:text-9xl font-black leading-none">
                      {stats.compositeScore}
                    </div>
                    <div className="text-xl font-bold text-slate-400 pb-2">
                      / 800
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4">
                    <div className="bg-white/10 border border-white/20 px-4 py-2">
                      <div className="text-[10px] font-black uppercase text-amber-300">
                        Expected Percentile
                      </div>
                      <div className="text-2xl font-black">
                        ~{stats.overallPercentile}+
                      </div>
                    </div>
                    <div className="bg-white/10 border border-white/20 px-4 py-2">
                      <div className="text-[10px] font-black uppercase text-amber-300">
                        IGE Score (info only)
                      </div>
                      <div className="text-2xl font-black text-slate-400">
                        {stats.sections.find((s) => s.key === "ige")?.raw ?? 0}
                        <span className="text-sm ml-1">/ 40</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section-wise Breakdown */}
              <div>
                <h3 className="text-lg font-black uppercase tracking-widest mb-4 text-slate-600">
                  Section-Wise Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {stats.sections.map((s, idx) => {
                    const sect = SECTIONS[idx];
                    return (
                      <div
                        key={s.key}
                        className={`bg-white border-4 border-foreground p-6 ${sect.shadow} ${sect.notCounted ? "opacity-60" : ""}`}
                      >
                        <div
                          className={`text-xs font-black uppercase tracking-widest ${sect.color} mb-1`}
                        >
                          {sect.label}
                          {sect.notCounted && (
                            <span className="ml-2 text-rose-400">
                              (not counted)
                            </span>
                          )}
                        </div>
                        <div className="text-4xl font-black mb-1">
                          {s.raw}
                          <span className="text-sm text-slate-400 ml-1">
                            / 40
                          </span>
                        </div>
                        {!sect.notCounted && (
                          <>
                            <div className="text-sm font-black text-slate-500 mb-1">
                              Section Score:{" "}
                              <span className={sect.color}>{s.scaled}</span>{" "}
                              / 200
                            </div>
                            <div className="flex items-center gap-2">
                              <TrendingUp className={`w-4 h-4 ${sect.color}`} />
                              <span className="text-sm font-black text-slate-500">
                                ~{s.percentile}+ %ile
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => setShowInquiry(true)}
                className="w-full bg-amber-400 text-foreground p-8 border-4 border-foreground flex items-center justify-between group cursor-pointer hover:bg-foreground hover:text-white transition-colors text-left shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                <div>
                  <div className="text-sm font-black uppercase tracking-widest mb-1">
                    Need MBA Admission Guidance?
                  </div>
                  <div className="text-xl font-black uppercase">
                    Book Free September MAT Counselling →
                  </div>
                </div>
                <ChevronRight className="w-8 h-8 group-hover:translate-x-2 transition-transform flex-shrink-0" />
              </button>
            </div>
          )}

          {/* Placeholder when nothing entered yet */}
          {!hasAnyInput && !isUnlocked && (
            <div className="border-4 border-dashed border-slate-200 p-12 text-center">
              <BarChart3 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="font-black uppercase text-slate-400 text-sm tracking-widest">
                Enter your answers above to see your MAT score
              </p>
            </div>
          )}

          {/* Live preview (before unlock) */}
          {hasAnyInput && !isUnlocked && !showLeadForm && (
            <div className="border-4 border-amber-300 bg-amber-50 p-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                <Lock className="w-32 h-32" />
              </div>
              <p className="text-xs font-black uppercase text-amber-700 tracking-widest mb-2">
                Live Preview (Composite)
              </p>
              <div className="text-5xl font-black text-foreground blur-[4px] select-none">
                {stats.compositeScore}
              </div>
              <p className="text-sm font-bold text-amber-700 mt-3">
                Submit your details to reveal your full score & percentile
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
              className="absolute top-4 right-4 z-[110] bg-white border-4 border-foreground p-2 hover:bg-rose-50 hover:text-rose-600 transition-colors"
              aria-label="Close"
            >
              <X className="h-6 w-6 stroke-[3px]" />
            </button>
            <div className="bg-white">
              <div className="bg-amber-400 p-8 text-center border-b-8 border-foreground text-foreground">
                <h2 className="text-4xl font-black uppercase italic tracking-tighter">
                  MAT Admission Support (September Session)
                </h2>
                <p className="font-bold mt-2">
                  Expert guidance for MBA colleges accepting MAT score.
                </p>
              </div>
              <div className="p-4 md:p-8">
                <InquiryForm />
              </div>
            </div>
          </div>
          <div
            className="absolute inset-0 -z-10"
            onClick={() => setShowInquiry(false)}
          />
        </div>
      )}

      {/* Score vs Percentile Table */}
      <div className="mt-20">
        <h3 className="text-3xl font-black uppercase tracking-tight mb-8 border-l-[12px] border-amber-400 pl-6">
          September MAT Composite Score vs Percentile (Expected)
        </h3>
        <div className="overflow-x-auto border-4 border-foreground">
          <table className="w-full text-left border-collapse">
            <thead className="bg-foreground text-white uppercase text-sm font-black tracking-widest">
              <tr>
                <th className="p-5 border-r border-white/20">
                  Composite Score (/ 800)
                </th>
                <th className="p-5 border-r border-white/20">
                  Expected Percentile
                </th>
                <th className="p-5">Target MBA Colleges</th>
              </tr>
            </thead>
            <tbody className="text-base font-bold">
              {[
                ["700 – 800", "99.5+", "IIMs (via MAT), JBIMS, MDI"],
                ["650 – 699", "99.0 – 99.4", "TAPMI, Great Lakes, XIMB"],
                ["600 – 649", "97.0 – 98.9", "BIMTECH, IMT Nagpur, Jaipuria"],
                ["530 – 599", "90.0 – 96.9", "NDIM, FORE, LBSIM"],
                ["470 – 529", "80.0 – 89.9", "KJ Somaiya, ISBR, NIBM"],
                ["370 – 469", "60.0 – 79.9", "Good Tier 2 B-schools"],
                ["Below 370", "< 60.0", "Tier 3 B-schools / reappear"],
              ].map(([score, perc, colleges], i) => (
                <tr
                  key={i}
                  className={`border-b-4 border-foreground ${
                    i % 2 === 0 ? "bg-white" : "bg-slate-50"
                  } hover:bg-amber-50 transition-colors`}
                >
                  <td className="p-5 border-r-4 border-foreground">{score}</td>
                  <td className="p-5 border-r-4 border-foreground text-amber-600">
                    {perc}
                  </td>
                  <td className="p-5">{colleges}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MAT Exam Pattern Table */}
      <div className="mt-20">
        <h3 className="text-3xl font-black uppercase tracking-tight mb-8 border-l-[12px] border-amber-400 pl-6">
          September MAT Exam Pattern & Scoring Scheme
        </h3>
        <div className="overflow-x-auto border-4 border-foreground">
          <table className="w-full text-left border-collapse">
            <thead className="bg-foreground text-white uppercase text-sm font-black tracking-widest">
              <tr>
                <th className="p-5 border-r border-white/20">Section</th>
                <th className="p-5 border-r border-white/20">Questions</th>
                <th className="p-5 border-r border-white/20">Max Raw</th>
                <th className="p-5 border-r border-white/20">Scaled Score</th>
                <th className="p-5">In Composite?</th>
              </tr>
            </thead>
            <tbody className="text-base font-bold">
              {[
                ["Language Comprehension (LC)", "40", "40", "200", "✅ Yes"],
                ["Mathematical Skills (MS)", "40", "40", "200", "✅ Yes"],
                ["Data Analysis & Sufficiency (DA)", "40", "40", "200", "✅ Yes"],
                ["Intelligence & Critical Reasoning (ICR)", "40", "40", "200", "✅ Yes"],
                ["Indian & Global Environment (IGE)", "40", "40", "—", "❌ No"],
              ].map(([section, qs, max, scaled, composite], i) => (
                <tr
                  key={i}
                  className={`border-b-4 border-foreground ${
                    i % 2 === 0 ? "bg-white" : "bg-slate-50"
                  } hover:bg-amber-50 transition-colors`}
                >
                  <td className="p-5 border-r-4 border-foreground font-black">
                    {section}
                  </td>
                  <td className="p-5 border-r-4 border-foreground">{qs}</td>
                  <td className="p-5 border-r-4 border-foreground">{max}</td>
                  <td className="p-5 border-r-4 border-foreground">{scaled}</td>
                  <td
                    className={`p-5 font-black ${
                      composite.includes("Yes")
                        ? "text-emerald-600"
                        : "text-rose-500"
                    }`}
                  >
                    {composite}
                  </td>
                </tr>
              ))}
              <tr className="bg-foreground text-white">
                <td className="p-5 border-r-4 border-white/20 font-black">
                  TOTAL
                </td>
                <td className="p-5 border-r-4 border-white/20">200</td>
                <td className="p-5 border-r-4 border-white/20">200</td>
                <td className="p-5 border-r-4 border-white/20">800</td>
                <td className="p-5">4 Sections</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
