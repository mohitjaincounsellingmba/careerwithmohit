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

// ─── CAT 2026 Exam Structure ────────────────────────────────────────────────
const SECTIONS = [
  {
    key: "varc",
    label: "VARC",
    fullName: "Verbal Ability & Reading Comprehension",
    totalMcq: 19,
    totalTita: 5,
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
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-300",
    shadow: "shadow-[8px_8px_0px_0px_rgba(5,150,105,1)]",
    accent: "#059669",
  },
];

type SectionKey = "varc" | "dilr" | "qa";

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

// Percentile lookup table based on CAT historical trends
function estimatePercentile(totalRaw: number): number {
  if (totalRaw >= 195) return 99.99;
  if (totalRaw >= 185) return 99.97;
  if (totalRaw >= 170) return 99.9;
  if (totalRaw >= 155) return 99.5;
  if (totalRaw >= 140) return 99.0;
  if (totalRaw >= 130) return 98.5;
  if (totalRaw >= 120) return 98.0;
  if (totalRaw >= 110) return 97.0;
  if (totalRaw >= 100) return 95.5;
  if (totalRaw >= 90) return 93.0;
  if (totalRaw >= 80) return 90.0;
  if (totalRaw >= 70) return 85.0;
  if (totalRaw >= 60) return 78.0;
  if (totalRaw >= 50) return 70.0;
  if (totalRaw >= 40) return 58.0;
  if (totalRaw >= 30) return 45.0;
  return 30.0;
}

function estimateSectionPercentile(rawScore: number, section: string): number {
  const table: Record<string, Array<[number, number]>> = {
    varc: [[55,99.9],[48,99],[40,97],[33,93],[25,85],[18,70],[10,50]],
    dilr: [[50,99.9],[42,99],[35,97],[28,93],[20,85],[13,70],[8,50]],
    qa:   [[60,99.9],[52,99],[44,97],[36,93],[27,85],[18,70],[9,50]],
  };
  const rows = table[section] || [];
  for (const [score, percentile] of rows) {
    if (rawScore >= score) return percentile;
  }
  return 30.0;
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

  const stats = useMemo(() => {
    const sections = SECTIONS.map((s) => {
      const raw = calcSectionRaw(inputs[s.key as SectionKey]);
      const sect = s as typeof SECTIONS[0];
      const maxRaw = sect.totalMcq * 3 + sect.totalTita * 3;
      const percentile = estimateSectionPercentile(raw, s.key);
      return { key: s.key, raw, maxRaw, percentile };
    });
    const totalRaw = sections.reduce((a, b) => a + b.raw, 0);
    const maxTotal = sections.reduce((a, b) => a + b.maxRaw, 0);
    const overallPercentile = estimatePercentile(totalRaw);
    // Scaled score (approximate, based on equating: scaled ≈ raw * 1.02 capped at 228)
    const scaledScore = Math.min(Math.round(totalRaw * 1.0), 228);
    return { sections, totalRaw, maxTotal, overallPercentile, scaledScore };
  }, [inputs]);

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
    setInputs({ varc: { ...defaultSection }, dilr: { ...defaultSection }, qa: { ...defaultSection } });
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
          source: "CAT 2026 Score Calculator",
          score: stats.totalRaw,
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
    return inp.correctMcq !== "" || inp.wrongMcq !== "" || inp.correctTita !== "";
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
                CAT 2026 Score Calculator
              </h2>
              <p className="text-amber-300 font-bold text-sm uppercase tracking-widest mt-1">
                Section-wise · Raw Score · Scaled Score · Percentile
              </p>
            </div>
          </div>
          {/* Marking Scheme badges */}
          <div className="flex flex-wrap gap-3 mt-6">
            <span className="bg-emerald-500 text-white text-xs font-black px-3 py-1.5 uppercase tracking-widest border-2 border-white/30">
              ✓ Correct MCQ: +3
            </span>
            <span className="bg-rose-500 text-white text-xs font-black px-3 py-1.5 uppercase tracking-widest border-2 border-white/30">
              ✗ Wrong MCQ: −1
            </span>
            <span className="bg-amber-500 text-white text-xs font-black px-3 py-1.5 uppercase tracking-widest border-2 border-white/30">
              ◇ TITA Correct: +3
            </span>
            <span className="bg-slate-600 text-white text-xs font-black px-3 py-1.5 uppercase tracking-widest border-2 border-white/30">
              — TITA Wrong: 0
            </span>
          </div>
        </div>

        <div className="p-8 md:p-10">
          {/* Section Tabs */}
          <div className="flex border-4 border-foreground mb-8 overflow-hidden">
            {SECTIONS.map((s) => {
              const sRaw = calcSectionRaw(inputs[s.key as SectionKey]);
              return (
                <button
                  key={s.key}
                  onClick={() => setActiveTab(s.key as SectionKey)}
                  className={`flex-1 py-4 px-2 font-black uppercase text-sm transition-all border-r-4 border-foreground last:border-r-0 ${
                    activeTab === s.key
                      ? "bg-foreground text-white"
                      : "bg-white text-foreground hover:bg-slate-50"
                  }`}
                >
                  <div className="text-lg">{s.label}</div>
                  <div className={`text-xs ${activeTab === s.key ? "text-amber-300" : "text-slate-500"}`}>
                    {sRaw > 0 || inputs[s.key as SectionKey].wrongMcq !== "" ? `${sRaw} pts` : "0 pts"}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Section Input Panel */}
          <div className={`${currentSection.bg} border-4 ${currentSection.border} p-6 md:p-8 mb-8`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`text-2xl font-black ${currentSection.color}`}>
                {currentSection.label}
              </div>
              <div className="text-sm font-bold text-slate-500">
                — {currentSection.fullName}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Correct MCQ */}
              <div>
                <label className="block text-xs font-black uppercase text-slate-600 mb-2">
                  Correct MCQ
                  <span className="text-slate-400 ml-1 normal-case">(max {currentSection.totalMcq})</span>
                </label>
                <input
                  type="number"
                  min={0}
                  max={currentSection.totalMcq}
                  value={currentInput.correctMcq}
                  onChange={(e) => updateInput(activeTab, "correctMcq", e.target.value)}
                  placeholder="0"
                  className="w-full bg-white border-4 border-foreground p-4 text-2xl font-black focus:outline-none focus:ring-4 focus:ring-emerald-300 transition-all"
                />
                <p className="text-[10px] text-emerald-700 font-black uppercase mt-1">+3 each</p>
              </div>

              {/* Wrong MCQ */}
              <div>
                <label className="block text-xs font-black uppercase text-slate-600 mb-2">
                  Wrong MCQ
                  <span className="text-slate-400 ml-1 normal-case">(max {currentSection.totalMcq})</span>
                </label>
                <input
                  type="number"
                  min={0}
                  max={currentSection.totalMcq}
                  value={currentInput.wrongMcq}
                  onChange={(e) => updateInput(activeTab, "wrongMcq", e.target.value)}
                  placeholder="0"
                  className="w-full bg-white border-4 border-foreground p-4 text-2xl font-black focus:outline-none focus:ring-4 focus:ring-rose-300 transition-all"
                />
                <p className="text-[10px] text-rose-600 font-black uppercase mt-1">−1 each</p>
              </div>

              {/* Correct TITA */}
              <div>
                <label className="block text-xs font-black uppercase text-slate-600 mb-2">
                  Correct TITA
                  <span className="text-slate-400 ml-1 normal-case">(max {currentSection.totalTita})</span>
                </label>
                <input
                  type="number"
                  min={0}
                  max={currentSection.totalTita}
                  value={currentInput.correctTita}
                  onChange={(e) => updateInput(activeTab, "correctTita", e.target.value)}
                  placeholder="0"
                  className="w-full bg-white border-4 border-foreground p-4 text-2xl font-black focus:outline-none focus:ring-4 focus:ring-amber-300 transition-all"
                />
                <p className="text-[10px] text-amber-600 font-black uppercase mt-1">+3 each, no negative</p>
              </div>
            </div>

            {/* Section score live preview */}
            <div className="mt-6 flex items-center justify-between bg-white border-4 border-foreground p-4">
              <span className="text-xs font-black uppercase text-slate-500">
                {currentSection.label} Raw Score
              </span>
              <span className={`text-3xl font-black ${currentSection.color}`}>
                {currentStats.raw}
                <span className="text-sm text-slate-400 ml-1">/ {currentStats.maxRaw}</span>
              </span>
            </div>
          </div>

          {/* Navigate sections */}
          <div className="flex gap-3 mb-10">
            {SECTIONS.map((s, idx) => (
              <button
                key={s.key}
                onClick={() => setActiveTab(s.key as SectionKey)}
                className={`flex-1 text-xs font-black uppercase py-2 border-2 border-foreground transition-all ${
                  activeTab === s.key ? "bg-foreground text-white" : "bg-white hover:bg-slate-50"
                }`}
              >
                {idx + 1}. {s.label}
              </button>
            ))}
          </div>

          {/* Reset + Calculate Row */}
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
                <h3 className="text-xl font-black uppercase">Unlock Your CAT Score & Percentile</h3>
              </div>
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    required
                    type="text"
                    placeholder="Full Name"
                    value={leadData.name}
                    onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                    className="w-full bg-white/10 border-2 border-white/20 p-3 font-bold text-white placeholder:text-white/40 focus:bg-white/20 focus:outline-none"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="WhatsApp Number"
                    value={leadData.number}
                    onChange={(e) => setLeadData({ ...leadData, number: e.target.value })}
                    className="w-full bg-white/10 border-2 border-white/20 p-3 font-bold text-white placeholder:text-white/40 focus:bg-white/20 focus:outline-none"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email Address"
                    value={leadData.email}
                    onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                    className="w-full bg-white/10 border-2 border-white/20 p-3 font-bold text-white placeholder:text-white/40 focus:bg-white/20 focus:outline-none"
                  />
                  <input
                    required
                    type="text"
                    placeholder="City / Location"
                    value={leadData.location}
                    onChange={(e) => setLeadData({ ...leadData, location: e.target.value })}
                    className="w-full bg-white/10 border-2 border-white/20 p-3 font-bold text-white placeholder:text-white/40 focus:bg-white/20 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber-400 text-foreground border-4 border-amber-200 p-4 text-xl font-black uppercase hover:bg-amber-300 transition-all flex items-center justify-center gap-2"
                >
                  Reveal My CAT Score <ChevronRight className="w-5 h-5" />
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
              {/* Overall Score Banner */}
              <div className="bg-foreground text-white p-8 border-b-[12px] border-amber-400 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <Trophy className="w-40 h-40" />
                </div>
                <div className="relative z-10">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-amber-300 block mb-3 animate-pulse">
                    Overall Raw Score
                  </span>
                  <div className="flex items-end gap-4 flex-wrap">
                    <div className="text-8xl md:text-9xl font-black leading-none">{stats.totalRaw}</div>
                    <div className="text-xl font-bold text-slate-400 pb-2">/ {stats.maxTotal}</div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4">
                    <div className="bg-white/10 border border-white/20 px-4 py-2">
                      <div className="text-[10px] font-black uppercase text-amber-300">Expected Percentile</div>
                      <div className="text-2xl font-black">~{stats.overallPercentile}+</div>
                    </div>
                    <div className="bg-white/10 border border-white/20 px-4 py-2">
                      <div className="text-[10px] font-black uppercase text-amber-300">Scaled Score (Est.)</div>
                      <div className="text-2xl font-black">{stats.scaledScore}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section-wise breakdown */}
              <div>
                <h3 className="text-lg font-black uppercase tracking-widest mb-4 text-slate-600">
                  Section-Wise Breakdown
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
                          {sect.label}
                        </div>
                        <div className="text-4xl font-black mb-1">
                          {s.raw}
                          <span className="text-sm text-slate-400 ml-1">/ {s.maxRaw}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className={`w-4 h-4 ${sect.color}`} />
                          <span className="text-sm font-black text-slate-500">
                            ~{s.percentile}+ %ile
                          </span>
                        </div>
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
                    Need Admission Guidance?
                  </div>
                  <div className="text-xl font-black uppercase">
                    Book Free CAT 2026 Counselling →
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
                Enter your answers above to see your score
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
                <h2 className="text-4xl font-black uppercase italic tracking-tighter">CAT Admission Support 2026</h2>
                <p className="font-bold mt-2">Expert guidance for IIMs & Top B-Schools.</p>
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
          CAT 2026 Score vs Percentile (Expected)
        </h3>
        <div className="overflow-x-auto border-4 border-foreground">
          <table className="w-full text-left border-collapse">
            <thead className="bg-foreground text-white uppercase text-sm font-black tracking-widest">
              <tr>
                <th className="p-5 border-r border-white/20">Raw Score (out of 228)</th>
                <th className="p-5 border-r border-white/20">Expected Percentile</th>
                <th className="p-5">Target Colleges</th>
              </tr>
            </thead>
            <tbody className="text-base font-bold">
              {[
                ["185 – 228", "99.97+", "IIM A, B, C"],
                ["155 – 184", "99.5 – 99.9", "IIM L, K, I, XLRI"],
                ["130 – 154", "98.5 – 99.4", "IIM Shillong, MDI, IIFT"],
                ["110 – 129", "97 – 98.4", "IIM Ranchi, Udaipur, NITIE"],
                ["90 – 109", "93 – 96.9", "IIM Raipur, Trichy, FMS"],
                ["70 – 89", "85 – 92.9", "JBIMS, SPJIMR, NMIMS"],
                ["50 – 69", "70 – 84.9", "Tier 2 B-schools"],
              ].map(([score, perc, colleges], i) => (
                <tr
                  key={i}
                  className={`border-b-4 border-foreground ${i % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-amber-50 transition-colors`}
                >
                  <td className="p-5 border-r-4 border-foreground">{score}</td>
                  <td className="p-5 border-r-4 border-foreground text-amber-600">{perc}</td>
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
          CAT 2026 Exam Pattern
        </h3>
        <div className="overflow-x-auto border-4 border-foreground">
          <table className="w-full text-left border-collapse">
            <thead className="bg-foreground text-white uppercase text-sm font-black tracking-widest">
              <tr>
                <th className="p-5 border-r border-white/20">Section</th>
                <th className="p-5 border-r border-white/20">Total Qs</th>
                <th className="p-5 border-r border-white/20">MCQ</th>
                <th className="p-5 border-r border-white/20">TITA</th>
                <th className="p-5 border-r border-white/20">Max Score</th>
                <th className="p-5">Duration</th>
              </tr>
            </thead>
            <tbody className="text-base font-bold">
              {SECTIONS.map((s, i) => (
                <tr
                  key={s.key}
                  className={`border-b-4 border-foreground ${i % 2 === 0 ? "bg-white" : "bg-slate-50"} hover:bg-amber-50 transition-colors`}
                >
                  <td className={`p-5 border-r-4 border-foreground font-black ${s.color}`}>{s.label}</td>
                  <td className="p-5 border-r-4 border-foreground">{s.totalMcq + s.totalTita}</td>
                  <td className="p-5 border-r-4 border-foreground">{s.totalMcq}</td>
                  <td className="p-5 border-r-4 border-foreground">{s.totalTita}</td>
                  <td className="p-5 border-r-4 border-foreground">{(s.totalMcq + s.totalTita) * 3}</td>
                  <td className="p-5">40 min</td>
                </tr>
              ))}
              <tr className="bg-foreground text-white">
                <td className="p-5 border-r-4 border-white/20 font-black">TOTAL</td>
                <td className="p-5 border-r-4 border-white/20">66</td>
                <td className="p-5 border-r-4 border-white/20">49</td>
                <td className="p-5 border-r-4 border-white/20">17</td>
                <td className="p-5 border-r-4 border-white/20">228</td>
                <td className="p-5">120 min</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
