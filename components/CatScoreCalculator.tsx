"use client";

import { useState, useMemo, useEffect } from "react";
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
  Share2,
  Copy,
  Check,
  Flame,
  Lightbulb,
  MessageCircle,
  ArrowRight,
  ExternalLink,
  Percent,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import { submitLead } from "@/lib/leads";

// ─── CAT 2026 Exam Structure (66 Questions · 198 Marks) ──────────────────────
const SECTIONS = [
  {
    key: "varc",
    label: "VARC",
    fullName: "Verbal Ability & Reading Comprehension",
    totalMcq: 19,
    totalTita: 5,
    maxScore: 72,
    badgeColor: "text-[#8B5CF6] bg-[#8B5CF6]/10 border-[#8B5CF6]/30",
    accentBg: "bg-[#8B5CF6]",
    glowColor: "from-[#8B5CF6]/20 to-transparent",
    accent: "#8B5CF6",
  },
  {
    key: "dilr",
    label: "DILR",
    fullName: "Data Interpretation & Logical Reasoning",
    totalMcq: 16,
    totalTita: 4,
    maxScore: 60,
    badgeColor: "text-[#00F0FF] bg-[#00F0FF]/10 border-[#00F0FF]/30",
    accentBg: "bg-[#00F0FF]",
    glowColor: "from-[#00F0FF]/20 to-transparent",
    accent: "#00F0FF",
  },
  {
    key: "qa",
    label: "QA",
    fullName: "Quantitative Aptitude",
    totalMcq: 14,
    totalTita: 8,
    maxScore: 66,
    badgeColor: "text-[#00FF88] bg-[#00FF88]/10 border-[#00FF88]/30",
    accentBg: "bg-[#00FF88]",
    glowColor: "from-[#00FF88]/20 to-transparent",
    accent: "#00FF88",
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

// Target Percentile Blueprint for Goal Planner
const TARGET_PERCENTILE_PLANS = [
  {
    percentile: "99.9+ %ile",
    rawScoreNeeded: "110 – 125+ Marks",
    netCorrect: "38 – 42+ Net Qs",
    varcTarget: "15 Qs (45M)",
    dilrTarget: "12 Qs (36M)",
    qaTarget: "13 Qs (39M)",
    iimCall: "IIM Ahmedabad, Bangalore, Calcutta (BLACKI)",
    desc: "Elite Tier. Target for Top 3 IIMs, FMS Delhi & SPJIMR Mumbai.",
  },
  {
    percentile: "99.5+ %ile",
    rawScoreNeeded: "95 – 109 Marks",
    netCorrect: "33 – 37 Net Qs",
    varcTarget: "14 Qs (42M)",
    dilrTarget: "10 Qs (30M)",
    qaTarget: "11 Qs (33M)",
    iimCall: "IIM Lucknow, Kozhikode, Indore, MDI Gurgaon",
    desc: "Calls from almost all Old IIMs with decent academic profile.",
  },
  {
    percentile: "99.0+ %ile",
    rawScoreNeeded: "82 – 94 Marks",
    netCorrect: "29 – 32 Net Qs",
    varcTarget: "12 Qs (36M)",
    dilrTarget: "9 Qs (27M)",
    qaTarget: "9 Qs (27M)",
    iimCall: "IIM Shillong, IIT Delhi, IIT Bombay, IIFT Delhi",
    desc: "Qualifies for all New IIMs, top IIT DMS, and premier private B-schools.",
  },
  {
    percentile: "98.0+ %ile",
    rawScoreNeeded: "75 – 81 Marks",
    netCorrect: "26 – 28 Net Qs",
    varcTarget: "11 Qs (33M)",
    dilrTarget: "8 Qs (24M)",
    qaTarget: "8 Qs (24M)",
    iimCall: "New IIMs (Udaipur, Trichy, Ranchi, Raipur)",
    desc: "Strong call probability for New IIM CAP round and IIT Kharagpur/Madras.",
  },
  {
    percentile: "95.0+ %ile",
    rawScoreNeeded: "60 – 74 Marks",
    netCorrect: "21 – 25 Net Qs",
    varcTarget: "9 Qs (27M)",
    dilrTarget: "6 Qs (18M)",
    qaTarget: "7 Qs (21M)",
    iimCall: "IMT Ghaziabad, IMI New Delhi, IIM Rohtak",
    desc: "Premier high-ROI management institutes with average package ₹16-20 LPA.",
  },
  {
    percentile: "90.0+ %ile",
    rawScoreNeeded: "48 – 59 Marks",
    netCorrect: "17 – 20 Net Qs",
    varcTarget: "8 Qs (24M)",
    dilrTarget: "5 Qs (15M)",
    qaTarget: "5 Qs (15M)",
    iimCall: "Baby IIMs (Nagpur, Vizag, Amritsar, Bodh Gaya), FORE, GIM Goa",
    desc: "Baby IIMs CAP cutoff and top private PGDM institutions.",
  },
  {
    percentile: "85.0+ %ile",
    rawScoreNeeded: "38 – 47 Marks",
    netCorrect: "14 – 16 Net Qs",
    varcTarget: "6 Qs (18M)",
    dilrTarget: "4 Qs (12M)",
    qaTarget: "4 Qs (12M)",
    iimCall: "TAPMI, Great Lakes Chennai, BIMTECH, LBSIM Delhi",
    desc: "Established PGDM colleges with strong metro alumni networks.",
  },
  {
    percentile: "80.0+ %ile",
    rawScoreNeeded: "32 – 37 Marks",
    netCorrect: "11 – 13 Net Qs",
    varcTarget: "5 Qs (15M)",
    dilrTarget: "3 Qs (9M)",
    qaTarget: "4 Qs (12M)",
    iimCall: "K J Somaiya Mumbai, Welingkar, LIBA Chennai",
    desc: "Quality metro B-schools offering specialized marketing & finance programs.",
  },
  {
    percentile: "70.0+ %ile",
    rawScoreNeeded: "22 – 31 Marks",
    netCorrect: "8 – 10 Net Qs",
    varcTarget: "4 Qs (12M)",
    dilrTarget: "2 Qs (6M)",
    qaTarget: "3 Qs (9M)",
    iimCall: "Jaipuria, NDIM New Delhi, JIMS Rohini, SOIL, IBS Hyderabad",
    desc: "Direct & merit admissions in metro PGDM hubs.",
  },
];

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
      accentBg: "bg-emerald-500",
      avgCtc: "₹32 – 35+ LPA",
    };
  }
  if (percentile >= 98.0) {
    return {
      tier: "Tier 1.5: Top Legacy IIMs & Premier B-Schools",
      colleges: ["IIM Lucknow", "IIM Kozhikode", "IIM Indore", "IIM Shillong", "MDI Gurgaon", "DMS IIT Delhi", "IIFT Delhi"],
      badge: "BLACKI & MDI Calls Likely",
      color: "text-blue-700 bg-blue-50 border-blue-300",
      accentBg: "bg-blue-500",
      avgCtc: "₹24 – 28 LPA",
    };
  }
  if (percentile >= 90.0) {
    return {
      tier: "Tier 2 Top: New IIMs, IITs & Top Private Institutes",
      colleges: ["New IIMs (Udaipur, Trichy, Ranchi, Raipur)", "IMT Ghaziabad", "IMI New Delhi", "VGSoM IIT Kharagpur", "DoMS IIT Madras", "GIM Goa"],
      badge: "CAP / New IIMs Strong Call",
      color: "text-amber-700 bg-amber-50 border-amber-300",
      accentBg: "bg-amber-500",
      avgCtc: "₹16 – 20 LPA",
    };
  }
  if (percentile >= 80.0) {
    return {
      tier: "Tier 2: Baby IIMs & Reputed PGDM Institutes",
      colleges: ["Baby IIMs (Nagpur, Vizag, Amritsar, Bodh Gaya)", "FORE School of Management", "TAPMI Manipal", "Great Lakes Chennai", "BIMTECH Greater Noida", "LBSIM Delhi"],
      badge: "Baby IIMs & Top PGDM Range",
      color: "text-indigo-700 bg-indigo-50 border-indigo-300",
      accentBg: "bg-indigo-500",
      avgCtc: "₹12 – 15 LPA",
    };
  }
  if (percentile >= 70.0) {
    return {
      tier: "Tier 3: Quality Regional & Metro PGDM Hubs",
      colleges: ["K J Somaiya Mumbai", "Welingkar Mumbai/Bangalore", "Jaipuria Institute", "NDIM Delhi", "JIMS Rohini", "SOIL Institute", "IBS Hyderabad"],
      badge: "Metro PGDM & Direct Range",
      color: "text-purple-700 bg-purple-50 border-purple-300",
      accentBg: "bg-purple-500",
      avgCtc: "₹9 – 12 LPA",
    };
  }
  return {
    tier: "Specialized & Profile-Based MBA Admissions",
    colleges: ["ITM Navi Mumbai", "FOSTIIMA Delhi", "Regional University MBA Programs", "Alternative Exams: CMAT / MAT / CUET-PG"],
    badge: "Profile & Direct Guidance Needed",
    color: "text-slate-700 bg-slate-100 border-slate-300",
    accentBg: "bg-slate-500",
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
  const [activeTab, setActiveTab] = useState<SectionKey>("varc");
  const [inputMode, setInputMode] = useState<"url" | "source" | "manual" | "target">("url");
  const [selectedTargetIndex, setSelectedTargetIndex] = useState(2); // Default 99.0%ile
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  // Link & Page Source parsing state
  const [responseSheetUrl, setResponseSheetUrl] = useState("");
  const [pageSource, setPageSource] = useState("");
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [consoleCodeCopied, setConsoleCodeCopied] = useState(false);

  // Read URL query parameter if candidate arrives from bookmarklet or referral link
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlParam = params.get("url");
      if (urlParam) {
        setResponseSheetUrl(decodeURIComponent(urlParam));
        setInputMode("url");
      }
    }
  }, []);

  const handleCopyConsoleCode = () => {
    const code = "copy(document.documentElement.outerHTML);alert('CAT Response Sheet HTML copied to clipboard! Now paste it in the HTML Source tab on CareerWithMohit.');";
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setConsoleCodeCopied(true);
      setTimeout(() => setConsoleCodeCopied(false), 3000);
    }
  };

  const handleAnalyzeUrl = async () => {
    if (!responseSheetUrl.trim()) {
      setParseError("Please enter your official CAT candidate response sheet URL.");
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

      const data = result.data;
      setAnalysisResult(data);

      if (data.sections) {
        setInputs({
          varc: {
            correctMcq: data.sections.varc.correctMcq,
            wrongMcq: data.sections.varc.wrongMcq,
            correctTita: data.sections.varc.correctTita,
          },
          dilr: {
            correctMcq: data.sections.dilr.correctMcq,
            wrongMcq: data.sections.dilr.wrongMcq,
            correctTita: data.sections.dilr.correctTita,
          },
          qa: {
            correctMcq: data.sections.qa.correctMcq,
            wrongMcq: data.sections.qa.wrongMcq,
            correctTita: data.sections.qa.correctTita,
          },
        });

        if (data.detectedSlot && data.detectedSlot !== "general") {
          setSelectedSlot(data.detectedSlot);
        }
      }
    } catch (err: any) {
      setParseError(
        err.message ||
          "Could not directly fetch response sheet from this network. You can paste your Page Source in the 'HTML Source' tab or enter section attempts manually!"
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleParseSource = async () => {
    if (!pageSource.trim()) {
      setParseError("Please paste the page source code first.");
      return;
    }

    setIsParsing(true);
    setParseError("");

    try {
      const res = await fetch("/api/analyze-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html: pageSource }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to parse page source");

      const data = result.data;
      setAnalysisResult(data);

      if (data.sections) {
        setInputs({
          varc: {
            correctMcq: data.sections.varc.correctMcq,
            wrongMcq: data.sections.varc.wrongMcq,
            correctTita: data.sections.varc.correctTita,
          },
          dilr: {
            correctMcq: data.sections.dilr.correctMcq,
            wrongMcq: data.sections.dilr.wrongMcq,
            correctTita: data.sections.dilr.correctTita,
          },
          qa: {
            correctMcq: data.sections.qa.correctMcq,
            wrongMcq: data.sections.qa.wrongMcq,
            correctTita: data.sections.qa.correctTita,
          },
        });

        if (data.detectedSlot && data.detectedSlot !== "general") {
          setSelectedSlot(data.detectedSlot);
        }
      }
    } catch (err: any) {
      setParseError(err.message || "Failed to extract data from HTML source.");
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
      await submitLead({
        name: leadData.name,
        number: leadData.number,
        email: leadData.email,
        location: leadData.location,
        source: "CAT 2026 Score Calculator (2027 Admission)",
        category: "calculator",
        score: stats.totalRaw,
        percentile: stats.overallPercentile,
        slot: selectedSlot,
        details: {
          slot: selectedSlot,
          rawScore: stats.totalRaw,
          percentile: stats.overallPercentile,
          varcScore: stats.sections.find((s) => s.key === "varc")?.raw,
          dilrScore: stats.sections.find((s) => s.key === "dilr")?.raw,
          qaScore: stats.sections.find((s) => s.key === "qa")?.raw,
        },
        timestamp: new Date().toISOString(),
      });
      setIsUnlocked(true);
      setShowLeadForm(false);
    } catch {
      setIsUnlocked(true);
      setShowLeadForm(false);
    }
  };

  const handleCopyResults = () => {
    const varc = stats.sections.find((s) => s.key === "varc")?.raw || 0;
    const dilr = stats.sections.find((s) => s.key === "dilr")?.raw || 0;
    const qa = stats.sections.find((s) => s.key === "qa")?.raw || 0;

    const summaryText = `📊 My Predicted CAT 2026 Score Breakdown:
• Raw Score: ${stats.totalRaw} / 198 Marks
• Predicted Percentile: ~${stats.overallPercentile}+ %ile
• Sectional Scores: VARC: ${varc}M | DILR: ${dilr}M | QA: ${qa}M
• Slot Equated: ${selectedSlot.toUpperCase()}
• Eligible B-Schools: ${stats.recommendedColleges.tier}

Calculate your score here: https://careerwithmohit.online/tools/cat-score-calculator/`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleShareWhatsApp = () => {
    const varc = stats.sections.find((s) => s.key === "varc")?.raw || 0;
    const dilr = stats.sections.find((s) => s.key === "dilr")?.raw || 0;
    const qa = stats.sections.find((s) => s.key === "qa")?.raw || 0;

    const shareMsg = encodeURIComponent(`🔥 Check out my CAT 2026 Scorecard Prediction!
📊 Raw Score: ${stats.totalRaw}/198 Marks
🎯 Predicted Percentile: ~${stats.overallPercentile}+ %ile
📈 Sectionals: VARC: ${varc}M | DILR: ${dilr}M | QA: ${qa}M
🏛️ Shortlist Target: ${stats.recommendedColleges.tier}

Calculate your score with official Digialm answer key check & slot normalization:
👉 https://careerwithmohit.online/tools/cat-score-calculator/`);

    window.open(`https://api.whatsapp.com/send?text=${shareMsg}`, "_blank");
    setShared(true);
    setTimeout(() => setShared(false), 3000);
  };

  const currentSection = SECTIONS.find((s) => s.key === activeTab)!;
  const currentInput = inputs[activeTab];
  const currentStats = stats.sections.find((s) => s.key === activeTab)!;

  const hasAnyInput = SECTIONS.some((s) => {
    const inp = inputs[s.key as SectionKey];
    return inp.correctMcq !== "" || inp.wrongMcq !== "" || inp.correctTita !== "";
  });

  const activeTargetPlan = TARGET_PERCENTILE_PLANS[selectedTargetIndex];

  return (
    <div className="w-full max-w-5xl mx-auto" id="cat-calculator-app">
      {/* Main Glassmorphic Modern Calculator Container Matching Home Page */}
      <div className="bg-white rounded-[32px] sm:rounded-[40px] border-[1.5px] border-[#061124]/10 shadow-[0_34px_70px_-30px_rgba(6,17,36,0.18)] overflow-hidden transition-all">
        
        {/* Calculator Header: Sleek Cyber Deep Navy Gradient */}
        <div className="relative bg-[#070A14] text-white p-6 sm:p-8 md:p-10 overflow-hidden border-b border-white/10">
          {/* Ambient Glowing Blobs */}
          <div className="absolute -top-16 -right-16 w-72 h-72 bg-[#00F0FF]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-[#FF007A]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Cyber Grid Texture */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FF007A] via-[#8B5CF6] to-[#00F0FF] p-0.5 shadow-[0_0_25px_rgba(0,240,255,0.3)] shrink-0">
                <div className="w-full h-full bg-[#070A14] rounded-[14px] flex items-center justify-center">
                  <Calculator className="w-7 h-7 text-[#00F0FF]" />
                </div>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="bg-white/10 text-[#00FF88] text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-0.5 rounded-full border border-[#00FF88]/30 flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,255,136,0.2)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-ping" />
                    CAT 2026 Engine
                  </span>
                  <span className="text-slate-400 text-xs font-mono font-semibold">
                    66 Qs · 198 Max Marks · Equipercentile Scaling
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black tracking-tight text-white leading-tight">
                  CAT Exam Score Calculator &amp; Percentile Predictor
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl font-normal">
                  Official +3 / −1 marking scheme with Slot Equating Normalization, candidate response sheet scan &amp; 2027 IIM call forecasting.
                </p>
              </div>
            </div>

            {/* Exam Slot Selector Pill Group */}
            <div className="bg-white/[0.08] backdrop-blur-xl p-3.5 rounded-2xl border border-white/15 shrink-0 shadow-lg">
              <label
                htmlFor="slot-select"
                className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#00F0FF] mb-2 flex items-center gap-1.5"
              >
                <Clock className="w-3.5 h-3.5 text-[#00F0FF]" /> Exam Slot Normalization
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {[
                  { key: "general", label: "General" },
                  { key: "slot1", label: "Slot 1 (Morning)" },
                  { key: "slot2", label: "Slot 2 (Afternoon)" },
                  { key: "slot3", label: "Slot 3 (Evening)" },
                ].map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setSelectedSlot(s.key as SlotKey)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                      selectedSlot === s.key
                        ? "bg-gradient-to-r from-[#00F0FF] to-[#6366F1] text-slate-950 font-black shadow-[0_0_15px_rgba(0,240,255,0.4)]"
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
          <div className="relative z-10 flex flex-wrap items-center gap-2 mt-6 pt-5 border-t border-white/10 font-mono text-xs">
            <span className="inline-flex items-center gap-1.5 bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/30 px-3 py-1 rounded-full font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF88]" /> Correct MCQ: +3 Marks
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#FF007A]/10 text-[#FF007A] border border-[#FF007A]/30 px-3 py-1 rounded-full font-semibold">
              <X className="w-3.5 h-3.5 text-[#FF007A]" /> Wrong MCQ: −1 Mark Penalty
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#FFD600]/10 text-[#FFD600] border border-[#FFD600]/30 px-3 py-1 rounded-full font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD600]" /> TITA Correct: +3 Marks
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-800/80 text-slate-300 border border-white/10 px-3 py-1 rounded-full font-semibold">
              🛡️ Wrong TITA: 0 (No Negative Marking)
            </span>
          </div>
        </div>

        {/* Calculator Body */}
        <div className="p-6 sm:p-8 md:p-10 space-y-10 bg-slate-50/40">

          {/* STEP 1: Response Sheet Scan, Manual Input or Goal Planner Tabs */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#061124]/10 shadow-[0_12px_32px_-16px_rgba(6,17,36,0.08)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-[#061124] text-[#00F0FF] flex items-center justify-center font-black text-sm shadow-md">
                  1
                </div>
                <div>
                  <h3 className="font-display text-base sm:text-lg font-black text-[#061124]">
                    Check Response Sheet URL, Page Source or Key Attempts
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Choose your calculation or target simulation mode
                  </p>
                </div>
              </div>

              {/* Input Mode Selector */}
              <div className="flex flex-wrap bg-slate-100/80 rounded-2xl p-1 border border-slate-200 gap-1">
                <button
                  type="button"
                  id="tab-url-mode"
                  onClick={() => setInputMode("url")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    inputMode === "url"
                      ? "bg-[#061124] text-[#00F0FF] shadow-sm font-black"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  ⚡ Digialm URL
                </button>
                <button
                  type="button"
                  id="tab-source-mode"
                  onClick={() => setInputMode("source")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    inputMode === "source"
                      ? "bg-[#061124] text-[#00F0FF] shadow-sm font-black"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  📄 HTML Source
                </button>
                <button
                  type="button"
                  id="tab-manual-mode"
                  onClick={() => setInputMode("manual")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    inputMode === "manual"
                      ? "bg-[#061124] text-[#00F0FF] shadow-sm font-black"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  ✏️ Manual Marks
                </button>
                <button
                  type="button"
                  id="tab-target-mode"
                  onClick={() => setInputMode("target")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    inputMode === "target"
                      ? "bg-gradient-to-r from-[#FF007A] to-[#8B5CF6] text-white font-black shadow-sm"
                      : "text-rose-700 bg-rose-50 hover:bg-rose-100"
                  }`}
                >
                  🎯 %ile Goal Planner
                </button>
              </div>
            </div>

            {/* Method A: URL Scanner */}
            {inputMode === "url" && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <label
                  htmlFor="response-sheet-input"
                  className="block text-xs font-bold text-slate-700"
                >
                  Paste Candidate Response Sheet Link (hosted on{" "}
                  <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-mono text-[11px] border border-slate-200">
                    cdn.digialm.com
                  </code>{" "}
                  or{" "}
                  <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-mono text-[11px] border border-slate-200">
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
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-2xl px-4 py-3.5 font-medium text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00F0FF] focus:border-[#00F0FF] shadow-sm transition-all"
                  />
                  <button
                    id="scan-answer-key-btn"
                    onClick={handleAnalyzeUrl}
                    disabled={isAnalyzing}
                    className="bg-gradient-to-r from-[#00F0FF] via-[#6366F1] to-[#FF007A] hover:opacity-95 text-white font-display font-black px-7 py-3.5 rounded-2xl shadow-lg shadow-cyan-500/25 active:scale-95 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shrink-0 disabled:opacity-50"
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" /> Scanning Response Sheet...
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
                  className="block text-xs font-bold text-slate-700"
                >
                  Paste Response Sheet Page Source (Press{" "}
                  <kbd className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-mono text-[11px] border border-slate-200">
                    Ctrl+U
                  </kbd>{" "}
                  or Right-Click → View Page Source on your answer key, then Copy All)
                </label>
                <textarea
                  id="page-source-input"
                  value={pageSource}
                  onChange={(e) => setPageSource(e.target.value)}
                  placeholder="<!DOCTYPE html><html>... paste complete HTML source code here ..."
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-300 rounded-2xl p-3.5 font-mono text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00F0FF] focus:border-[#00F0FF] shadow-sm transition-all"
                />
                <button
                  id="parse-source-btn"
                  onClick={handleParseSource}
                  disabled={isParsing}
                  className="w-full sm:w-auto bg-[#061124] hover:bg-[#070A14] text-white font-display font-black px-7 py-3.5 rounded-2xl shadow-md transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isParsing ? "Parsing Response Source..." : "Extract & Calculate from Source"}
                </button>
              </div>
            )}

            {/* Helper: 1-Click Console Shortcut & Bookmarklet */}
            {(inputMode === "url" || inputMode === "source") && (
              <div className="mt-4 p-4 rounded-2xl bg-slate-900 text-slate-200 border border-slate-800 shadow-inner">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5 pb-2.5 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-ping" />
                    <span className="font-bold text-white text-xs flex items-center gap-1.5 font-mono uppercase tracking-wider">
                      <Terminal className="w-3.5 h-3.5 text-[#00F0FF]" />
                      Fast Shortcut: 1-Click Console Auto-Copy
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyConsoleCode}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs font-semibold transition-all cursor-pointer shrink-0 border border-white/15"
                  >
                    {consoleCodeCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#00FF88]" />
                        <span className="text-[#00FF88] font-bold">Script Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#00F0FF]" />
                        <span>Copy 1-Click Script</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-[11px] text-slate-300">
                  <div className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-white/5">
                    <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-[#00F0FF] flex items-center justify-center font-bold shrink-0 text-[10px]">1</span>
                    <span>Open response sheet on <strong>digialm.com</strong> and press <kbd className="bg-slate-800 px-1 py-0.5 rounded text-[10px] text-white font-mono">F12</kbd> (or Inspect → Console).</span>
                  </div>
                  <div className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-white/5">
                    <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-[#00F0FF] flex items-center justify-center font-bold shrink-0 text-[10px]">2</span>
                    <span>Click <strong>Copy 1-Click Script</strong> above, paste in Console &amp; hit <strong>Enter</strong>.</span>
                  </div>
                  <div className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-white/5">
                    <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-[#00F0FF] flex items-center justify-center font-bold shrink-0 text-[10px]">3</span>
                    <span>Switch to <strong>HTML Source</strong> tab here, press <kbd className="bg-slate-800 px-1 py-0.5 rounded text-[10px] text-white font-mono">Ctrl+V</kbd> &amp; calculate!</span>
                  </div>
                </div>
              </div>
            )}

            {/* Method C: Manual Entry Hint */}
            {inputMode === "manual" && (
              <div className="p-4 bg-cyan-50 border border-cyan-200 rounded-2xl text-xs text-cyan-900 font-medium flex items-center gap-3 animate-in fade-in duration-300">
                <Sparkles className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>
                  Direct Section Mode active. Select each section tab below (VARC, DILR, QA) to key in your correct and incorrect attempts.
                </span>
              </div>
            )}

            {/* Method D: Percentile Target Reverse Planner */}
            {inputMode === "target" && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                    Select Your Dream Percentile Target:
                  </span>
                  <span className="text-xs font-black text-rose-700 bg-rose-100 px-3 py-0.5 rounded-full">
                    {activeTargetPlan.percentile} Goal
                  </span>
                </div>

                {/* Target Pills */}
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {TARGET_PERCENTILE_PLANS.map((plan, idx) => (
                    <button
                      key={plan.percentile}
                      type="button"
                      onClick={() => setSelectedTargetIndex(idx)}
                      className={`p-2.5 rounded-2xl text-xs font-bold transition-all text-center cursor-pointer border ${
                        selectedTargetIndex === idx
                          ? "bg-[#061124] text-[#00F0FF] border-[#061124] shadow-md font-black"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {plan.percentile}
                    </button>
                  ))}
                </div>

                {/* Target Strategy Card */}
                <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                    <div>
                      <span className="text-base sm:text-lg font-display font-black text-[#061124]">
                        Target Raw Score Needed: {activeTargetPlan.rawScoreNeeded}
                      </span>
                      <p className="text-xs text-slate-600 font-medium">{activeTargetPlan.desc}</p>
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0 self-start sm:self-auto">
                      {activeTargetPlan.netCorrect}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div className="bg-[#8B5CF6]/10 p-3.5 rounded-2xl border border-[#8B5CF6]/20">
                      <span className="text-[11px] font-mono font-bold text-[#8B5CF6] uppercase block">VARC Attempt Strategy</span>
                      <span className="text-base font-black text-slate-900">{activeTargetPlan.varcTarget}</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">3 RCs + 4-5 VA Qs</span>
                    </div>

                    <div className="bg-[#00F0FF]/10 p-3.5 rounded-2xl border border-[#00F0FF]/20">
                      <span className="text-[11px] font-mono font-bold text-[#0EA5E9] uppercase block">DILR Attempt Strategy</span>
                      <span className="text-base font-black text-slate-900">{activeTargetPlan.dilrTarget}</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">2 Full Sets with 100% Accuracy</span>
                    </div>

                    <div className="bg-[#00FF88]/10 p-3.5 rounded-2xl border border-[#00FF88]/20">
                      <span className="text-[11px] font-mono font-bold text-emerald-700 uppercase block">QA Attempt Strategy</span>
                      <span className="text-base font-black text-slate-900">{activeTargetPlan.qaTarget}</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Arithmetic + Algebra Core</span>
                    </div>
                  </div>

                  <div className="text-xs font-bold text-slate-800 pt-1 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-[#F59E0B] shrink-0" />
                    <span>Expected Shortlists: <span className="text-amber-800 font-extrabold">{activeTargetPlan.iimCall}</span></span>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {parseError && (
              <div className="mt-4 p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs font-semibold text-rose-700 flex items-start gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{parseError}</span>
              </div>
            )}

            {/* Successful Parse Result Summary */}
            {analysisResult && (
              <div className="mt-5 p-5 bg-emerald-50/90 border border-emerald-200 rounded-3xl animate-in slide-in-from-top-3 duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 text-emerald-800 font-mono font-bold text-xs uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Candidate Response Sheet Successfully Parsed!
                  </div>
                  {analysisResult.candidateName && analysisResult.candidateName !== "Candidate" && (
                    <span className="text-xs font-bold text-slate-700 bg-white px-3 py-1 rounded-full border border-emerald-200">
                      Candidate: {analysisResult.candidateName}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white p-3.5 rounded-2xl border border-emerald-100 shadow-sm">
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">Total Questions</span>
                    <span className="text-xl font-black text-slate-900">{analysisResult.totalFetched || 66}</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-2xl border border-emerald-100 shadow-sm">
                    <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase block">Answered Qs</span>
                    <span className="text-xl font-black text-emerald-700">{analysisResult.answeredCount}</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-2xl border border-emerald-100 shadow-sm">
                    <span className="text-[10px] font-mono font-bold text-blue-700 uppercase block">Calculated Raw Score</span>
                    <span className="text-xl font-black text-blue-700">{stats.totalRaw} / 198</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-2xl border border-emerald-100 shadow-sm">
                    <span className="text-[10px] font-mono font-bold text-amber-700 uppercase block">Est. Percentile</span>
                    <span className="text-xl font-black text-amber-700">~{stats.overallPercentile}+ %ile</span>
                  </div>
                </div>
                <p className="text-[11px] font-medium text-slate-600 mt-3">
                  Attempts have been automatically mapped below. Verify your sectional VARC, DILR &amp; QA numbers or make adjustments.
                </p>
              </div>
            )}
          </div>

          {/* STEP 2: Sectional Tabs & Input Fields */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-2xl bg-[#061124] text-[#00F0FF] flex items-center justify-center font-black text-sm shadow-md">
                2
              </div>
              <div>
                <h3 className="font-display text-base sm:text-lg font-black text-[#061124]">
                  Enter Section Attempts (VARC · DILR · QA)
                </h3>
                <p className="text-xs text-slate-500 font-medium">
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
                    className={`p-3.5 sm:p-5 rounded-3xl border text-left transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#061124] text-white border-[#061124] shadow-[0_18px_40px_-15px_rgba(6,17,36,0.4)]"
                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs sm:text-sm font-display font-black uppercase ${isActive ? "text-[#00F0FF]" : "text-slate-900"}`}>
                        {s.label}
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        isActive ? "bg-white/15 text-white border border-white/20" : "bg-slate-100 text-slate-600"
                      }`}>
                        Max {s.maxScore}M
                      </span>
                    </div>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className={`text-xl sm:text-3xl font-black ${isActive ? "text-white" : "text-slate-800"}`}>
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
            <div className="bg-white border-[1.5px] border-[#061124]/10 rounded-[32px] p-5 sm:p-8 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.08)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${currentSection.badgeColor}`}>
                      {currentSection.label}
                    </span>
                    <h4 className="text-base sm:text-lg font-display font-black text-[#061124]">
                      {currentSection.fullName}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    {currentSection.totalMcq + currentSection.totalTita} Questions total ({currentSection.totalMcq} MCQs + {currentSection.totalTita} TITAs)
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-600 bg-slate-100 px-3.5 py-1.5 rounded-2xl border border-slate-200 shadow-sm self-start sm:self-auto">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> 40 Minutes Sectional Limit
                </div>
              </div>

              {/* 3 Input Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                {/* Correct MCQ */}
                <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor={`correct-mcq-${activeTab}`}
                      className="text-xs font-mono font-bold uppercase text-slate-700"
                    >
                      Correct MCQs
                    </label>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
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
                    className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-2xl font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-center"
                  />
                  <div className="text-[11px] text-slate-500 text-center font-medium">
                    Max: {currentSection.totalMcq} MCQs
                  </div>
                </div>

                {/* Wrong MCQ */}
                <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor={`wrong-mcq-${activeTab}`}
                      className="text-xs font-mono font-bold uppercase text-slate-700"
                    >
                      Wrong MCQs
                    </label>
                    <span className="text-[10px] font-mono font-bold text-[#FF007A] bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
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
                    className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-2xl font-black text-[#FF007A] focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all text-center"
                  />
                  <div className="text-[11px] text-slate-500 text-center font-medium">
                    Max: {currentSection.totalMcq} MCQs
                  </div>
                </div>

                {/* Correct TITA */}
                <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor={`correct-tita-${activeTab}`}
                      className="text-xs font-mono font-bold uppercase text-slate-700"
                    >
                      Correct TITA
                    </label>
                    <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
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
                    className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-2xl font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50 focus:border-[#F59E0B] transition-all text-center"
                  />
                  <div className="text-[11px] text-slate-500 text-center font-medium">
                    Max: {currentSection.totalTita} Non-MCQs
                  </div>
                </div>
              </div>

              {/* Section Score Live Pill */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
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
              className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" /> Reset All Inputs
            </button>

            {!isUnlocked && hasAnyInput && !showLeadForm && (
              <button
                id="see-results-btn"
                onClick={() => setShowLeadForm(true)}
                className="w-full sm:w-auto bg-gradient-to-r from-[#00F0FF] via-[#6366F1] to-[#FF007A] text-white font-display font-black px-8 py-4 rounded-full shadow-[0_20px_50px_-15px_rgba(0,240,255,0.4)] hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4" /> Unlock Full Score, Percentile &amp; IIM Calls
              </button>
            )}
          </div>

          {/* Lead Gate Modal / Drawer */}
          {showLeadForm && !isUnlocked && (
            <div className="relative bg-[#070A14] text-white p-6 sm:p-8 rounded-[32px] border border-white/20 shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-[#00FF88]/20 flex items-center justify-center text-[#00FF88]">
                  <Zap className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-black text-white">
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
                    className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3.5 font-medium text-white placeholder:text-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#00F0FF]"
                  />
                  <input
                    required
                    id="lead-phone-input"
                    type="tel"
                    placeholder="WhatsApp Number (for call updates)"
                    value={leadData.number}
                    onChange={(e) => setLeadData({ ...leadData, number: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3.5 font-medium text-white placeholder:text-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#00F0FF]"
                  />
                  <input
                    required
                    id="lead-email-input"
                    type="email"
                    placeholder="Email Address"
                    value={leadData.email}
                    onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3.5 font-medium text-white placeholder:text-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#00F0FF]"
                  />
                  <input
                    required
                    id="lead-city-input"
                    type="text"
                    placeholder="Current City / State (e.g. Delhi, Mumbai, Pune)"
                    value={leadData.location}
                    onChange={(e) => setLeadData({ ...leadData, location: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3.5 font-medium text-white placeholder:text-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#00F0FF]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    id="reveal-score-btn"
                    className="flex-1 bg-gradient-to-r from-[#00F0FF] via-[#6366F1] to-[#FF007A] text-white font-display font-black py-4 rounded-full shadow-lg active:scale-95 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Reveal My Predicted CAT Score &amp; Percentile <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowLeadForm(false)}
                    className="text-xs font-bold text-slate-400 hover:text-white px-5 py-3 transition-colors cursor-pointer text-center"
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
              <div className="relative bg-[#070A14] text-white p-6 sm:p-8 md:p-10 rounded-[32px] sm:rounded-[40px] border border-cyan-400/40 shadow-[0_34px_70px_-30px_rgba(0,240,255,0.3)] overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <Trophy className="w-56 h-56 text-[#00F0FF]" />
                </div>

                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2 text-[#00FF88] text-xs font-mono font-bold uppercase tracking-widest">
                      <Sparkles className="w-4 h-4 text-[#00FF88]" />
                      Predicted CAT Result (MBA 2027 Batch)
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleShareWhatsApp}
                        className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-slate-950 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-md"
                      >
                        {shared ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Shared!
                          </>
                        ) : (
                          <>
                            <MessageCircle className="w-3.5 h-3.5" /> Share on WhatsApp
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={handleCopyResults}
                        className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/15 px-3.5 py-1.5 rounded-full text-xs font-bold text-white transition-all cursor-pointer"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#00FF88]" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-[#00F0FF]" /> Copy Summary
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-baseline gap-4 mb-8">
                    <span className="text-6xl sm:text-8xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300">
                      {stats.totalRaw}
                    </span>
                    <span className="text-lg sm:text-2xl font-bold text-slate-400">
                      / {stats.maxTotal} marks raw
                    </span>
                  </div>

                  {/* 3 Result Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/15">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#00FF88] block mb-1">
                        Expected Percentile
                      </span>
                      <span className="text-2xl sm:text-3xl font-display font-black text-white">
                        ~{stats.overallPercentile}+ %ile
                      </span>
                    </div>

                    <div className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/15">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#00F0FF] block mb-1">
                        Estimated Scaled Score
                      </span>
                      <span className="text-2xl sm:text-3xl font-display font-black text-white">
                        {stats.scaledScore} / 198
                      </span>
                    </div>

                    <div className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/15">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FFD600] block mb-1">
                        Slot Equated
                      </span>
                      <span className="text-lg sm:text-xl font-display font-black text-white uppercase">
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
              <div className="bg-white border-[1.5px] border-[#061124]/10 rounded-[32px] p-6 sm:p-8 shadow-[0_18px_44px_-22px_rgba(6,17,36,0.1)]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#061124] text-[#00F0FF] flex items-center justify-center font-bold">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-base sm:text-lg font-black text-[#061124]">
                        Eligible B-Schools For Your Score Band (~{stats.overallPercentile}+ %ile)
                      </h3>
                      <p className="text-xs text-slate-600 font-medium">
                        {stats.recommendedColleges.tier} · Avg CTC: <span className="font-bold text-slate-900">{stats.recommendedColleges.avgCtc}</span>
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border uppercase self-start sm:self-auto ${stats.recommendedColleges.color}`}>
                    {stats.recommendedColleges.badge}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-5">
                  {stats.recommendedColleges.colleges.map((col, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-2 shadow-sm hover:border-cyan-400 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#00F0FF] shrink-0" />
                      <span className="truncate">{col}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-200 text-xs font-bold">
                  <Link
                    href="/colleges/"
                    className="text-[#2563EB] hover:text-[#1D4ED8] underline underline-offset-4 flex items-center gap-1"
                  >
                    Explore Complete 770+ College Directory →
                  </Link>
                  <Link
                    href="/top-tier-mba-colleges/"
                    className="text-[#2563EB] hover:text-[#1D4ED8] underline underline-offset-4 flex items-center gap-1"
                  >
                    View Top Tier MBA Rankings →
                  </Link>
                  <Link
                    href="/tools/college-comparison/"
                    className="text-[#2563EB] hover:text-[#1D4ED8] underline underline-offset-4 flex items-center gap-1"
                  >
                    Compare College Fees &amp; Placements →
                  </Link>
                </div>
              </div>

              {/* Section-Wise Breakdown Cards */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 mb-3">
                  Sectional Marks &amp; Predicted Percentiles
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {stats.sections.map((s, idx) => {
                    const sect = SECTIONS[idx];
                    return (
                      <div
                        key={s.key}
                        className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-mono font-bold uppercase ${sect.badgeColor} px-2.5 py-0.5 rounded-full border`}>
                            {sect.label}
                          </span>
                          <span className="text-xs text-slate-400 font-mono font-medium">
                            Max {s.maxRaw}M
                          </span>
                        </div>
                        <div className="text-3xl font-display font-black text-slate-900">
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

              {/* High-Converting 1-on-1 Advisory CTA Matching Home Page */}
              <div className="bg-gradient-to-r from-[#061124] via-[#1E40AF] to-[#0D9488] rounded-[32px] p-7 sm:p-9 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_34px_70px_-30px_rgba(37,99,235,0.45)]">
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#00FF88] bg-white/10 px-3 py-1 rounded-full inline-block mb-2 border border-white/15">
                    Free 1-on-1 Profile Assessment
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-black tracking-tight leading-tight">
                    Confused About Your IIM Calls &amp; College Shortlists?
                  </h3>
                  <p className="text-xs sm:text-sm font-normal text-white/80 mt-1 max-w-xl">
                    Get an unbiased profile evaluation with Mohit Jain (IIM Bangalore &amp; FMS Delhi alumnus). Know your real chances at BLACKI, New IIMs, FMS, MDI, SPJIMR, and top PGDM colleges.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <Link
                    href="/book-session/"
                    className="px-6 py-3.5 rounded-full bg-[#F59E0B] hover:bg-[#fbbf24] text-[#061124] font-display font-extrabold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    <span>Book Google Meet</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="https://wa.me/919560020771?text=Hi%20Mohit%20Sir%2C%20I%20checked%20my%20predicted%20CAT%20score%20and%20need%20profile%20evaluation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-xs uppercase tracking-wider transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4 text-[#00FF88]" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
