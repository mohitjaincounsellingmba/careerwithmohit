"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  MBA_SPECIALIZATIONS, 
  SpecializationDomain, 
  Question, 
  CERTIFICATE_SIGNATORY,
  getSpecializationById 
} from '@/data/skillAssessmentsData';
import { 
  Sparkles, 
  Clock, 
  Award, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ArrowRight, 
  RotateCcw, 
  Download, 
  Share2, 
  Copy, 
  Check, 
  ShieldCheck, 
  Bookmark, 
  BookmarkCheck, 
  ChevronRight, 
  ChevronLeft, 
  BookOpen, 
  Eye, 
  RefreshCw,
  Search,
  Building2,
  Briefcase,
  GraduationCap,
  Users,
  TrendingUp,
  Megaphone,
  Zap,
  Truck,
  Cpu,
  Wheat,
  HeartPulse,
  Pill,
  BarChart3,
  ExternalLink,
  HelpCircle,
  CheckCheck,
  Filter
} from 'lucide-react';
import { submitLead } from '@/lib/leads';

// Specialization Icon Map
const SPECIALIZATION_ICONS: Record<string, React.ReactNode> = {
  "human-resource": <Users className="w-6 h-6 text-rose-400" />,
  "finance": <TrendingUp className="w-6 h-6 text-amber-400" />,
  "marketing": <Megaphone className="w-6 h-6 text-blue-400" />,
  "digital-marketing": <Zap className="w-6 h-6 text-purple-400" />,
  "operation-and-logistic": <Truck className="w-6 h-6 text-emerald-400" />,
  "fintech": <Cpu className="w-6 h-6 text-cyan-400" />,
  "agri-business": <Wheat className="w-6 h-6 text-lime-400" />,
  "healthcare": <HeartPulse className="w-6 h-6 text-teal-400" />,
  "pharma": <Pill className="w-6 h-6 text-indigo-400" />,
  "business-analytics": <BarChart3 className="w-6 h-6 text-violet-400" />
};

interface CertificateFrameProps {
  candidateName: string;
  collegeName?: string;
  specializationName: string;
  certificateTitle: string;
  percentage: number | string;
  netScore: number | string;
  dateStr: string;
  certId: string;
  isSample?: boolean;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export function CertificateFrame({
  candidateName,
  collegeName,
  specializationName,
  certificateTitle,
  percentage,
  netScore,
  dateStr,
  certId,
  isSample = false,
  containerRef
}: CertificateFrameProps) {
  return (
    <div 
      ref={containerRef}
      id={isSample ? "sample-certificate-canvas" : "certificate-canvas"}
      className="w-[940px] mx-auto bg-gradient-to-br from-[#060a14] via-[#091224] to-[#040810] text-slate-100 p-10 sm:p-12 rounded-3xl border-8 border-[#c5a059] shadow-2xl relative overflow-hidden font-sans select-none"
      style={{ minHeight: "620px" }}
    >
      {/* Subtle Geometric Background Guilloche Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Watermark for sample */}
      {isSample && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-20">
          <div className="text-white/[0.04] font-black text-6xl tracking-[0.25em] -rotate-12 uppercase border-4 border-white/[0.04] p-8 rounded-3xl">
            MBA SPECIMEN
          </div>
        </div>
      )}

      {/* Inner Gold Borders */}
      <div className="absolute inset-3 border border-[#c5a059]/40 rounded-2xl pointer-events-none" />
      <div className="absolute inset-4 border border-[#c5a059]/20 rounded-xl pointer-events-none" />

      {/* Corner Flourishes */}
      <div className="absolute top-6 left-6 text-[#c5a059] text-xs opacity-80">✦</div>
      <div className="absolute top-6 right-6 text-[#c5a059] text-xs opacity-80">✦</div>
      <div className="absolute bottom-6 left-6 text-[#c5a059] text-xs opacity-80">✦</div>
      <div className="absolute bottom-6 right-6 text-[#c5a059] text-xs opacity-80">✦</div>

      {/* Top Header Tag */}
      <div className="absolute top-6 left-12 z-30 hidden sm:block">
        <span className="text-[9px] font-mono font-medium text-slate-400 tracking-wider uppercase">
          ACCREDITATION COUNCIL • ISO 9001:2015 BENCHMARK
        </span>
      </div>

      {isSample && (
        <div className="absolute top-6 right-12 z-30">
          <span className="px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-mono text-[10px] font-bold uppercase tracking-wider shadow-md">
            ★ OFFICIAL SPECIMEN
          </span>
        </div>
      )}

      {/* Official CareerWithMohit Brand Logo */}
      <div className="flex flex-col items-center justify-center relative z-10 pt-2 pb-2">
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-2xl bg-[#091224]/80 border border-[#c5a059]/40 shadow-[0_4px_25px_rgba(37,99,235,0.15)] backdrop-blur-md">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 flex items-center justify-center shadow-md border border-blue-400/40 shrink-0">
            <svg
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
            >
              <polygon points="20,8 34,15 20,22 6,15" fill="white" />
              <path
                d="M12 18.5V25.5C12 28 15.5 30 20 30C24.5 30 28 28 28 25.5V18.5"
                stroke="white"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 26V14M20 14L16 18M20 14L24 18"
                stroke="#FDE047"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="33" cy="18" r="1.5" fill="#FDE047" />
            </svg>
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 border border-white"></span>
            </span>
          </div>

          <div className="flex flex-col text-left leading-none">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-white text-xl tracking-tight font-sans">
                Career
              </span>
              <span className="px-1.5 py-0.5 rounded bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-[10px] font-extrabold tracking-wider uppercase shadow-sm">
                WITH
              </span>
              <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-300 to-indigo-200 text-xl tracking-tight font-sans">
                Mohit
              </span>
            </div>
            <span className="text-[8px] font-bold uppercase tracking-[0.24em] text-[#e2b76e] mt-1 font-sans">
              MBA &amp; PGDM EXECUTIVE ACCREDITATION COUNCIL
            </span>
          </div>
        </div>
      </div>

      {/* Certificate Header */}
      <div className="text-center relative z-10 space-y-1 mt-2">
        <h2 className="text-3xl sm:text-4xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ffe5a3] via-[#f7cf80] to-[#c5a059] tracking-wider uppercase">
          Certificate of Excellence
        </h2>
        
        <p className="text-[11px] font-sans tracking-[0.25em] text-slate-300 uppercase font-semibold">
          MBA &amp; PGDM SPECIALIZATION COMPETENCY BENCHMARK
        </p>
      </div>

      {/* Divider Ribbon */}
      <div className="w-56 h-0.5 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mx-auto my-4" />

      {/* Candidate Presentation */}
      <div className="text-center relative z-10 space-y-3">
        <p className="text-xs text-slate-300 italic font-serif">
          This is to certify that
        </p>

        <div className="space-y-1">
          <h3 className="text-3xl sm:text-4xl font-serif font-extrabold text-white tracking-wide border-b border-white/20 pb-1.5 inline-block px-10">
            {candidateName || "Candidate Name"}
          </h3>
          {collegeName && (
            <div className="text-xs font-semibold text-amber-200/90 tracking-wide">
              {collegeName}
            </div>
          )}
        </div>

        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed pt-1">
          has demonstrated verified professional mastery and successfully cleared the rigorous 25-minute examination with competitive negative marking in
        </p>

        <div className="text-xl font-extrabold text-[#f7cf80] tracking-wide uppercase px-4">
          {certificateTitle || specializationName}
        </div>

        <p className="text-xs text-slate-300">
          achieving an accredited score of <strong className="text-white text-base font-black">{percentage}%</strong> ({netScore} / 20 marks with negative marking penalty).
        </p>
      </div>

      {/* Footer Credentials & Signatures */}
      <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-3 items-end relative z-10">
        
        {/* Left: Issue Date & Verification */}
        <div className="text-left space-y-1">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Date of Issuance</div>
          <div className="text-xs font-bold text-slate-200">
            {dateStr}
          </div>
          <div className="text-[9px] font-mono text-slate-400 mt-1">ID: {certId}</div>
          <div className="text-[8px] font-mono text-slate-500">careerwithmohit.online/verify</div>
        </div>

        {/* Middle: Gold Embossed Digital Seal */}
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#99732f] via-[#f7cf80] to-[#c5a059] p-0.5 mx-auto shadow-lg shadow-[#c5a059]/20 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#091224] flex flex-col items-center justify-center text-[#e2b76e] text-[7.5px] font-bold uppercase tracking-tighter px-1 text-center">
              <Award className="w-4 h-4 text-[#f7cf80] mb-0.5" />
              <span className="leading-tight">MBA ACCREDITED</span>
              <span className="text-[6.5px] text-emerald-400 font-mono">★ VERIFIED ★</span>
            </div>
          </div>
          <div className="text-[9px] text-[#e2b76e] font-semibold mt-1">Official Credential</div>
        </div>

        {/* Right: Mentor Signature */}
        <div className="text-right space-y-1">
          <div className="font-serif italic text-lg text-amber-200 tracking-wider">
            Mohit Jain
          </div>
          <div className="text-[10px] font-bold text-white uppercase tracking-wider">
            {CERTIFICATE_SIGNATORY.name}
          </div>
          <div className="text-[9px] text-slate-400">
            {CERTIFICATE_SIGNATORY.role}
          </div>
          <div className="text-[8px] text-slate-400">
            {CERTIFICATE_SIGNATORY.organization}
          </div>
        </div>

      </div>
    </div>
  );
}

interface CandidateInfo {
  fullName: string;
  collegeName: string;
  email: string;
  phone: string;
}

interface UserAnswerState {
  selectedOption: number | null; // 0, 1, 2, 3 or null
  isMarkedForReview: boolean;
}

type AppStep = "hub" | "register" | "exam" | "result";
type CategoryFilter = "all" | "Core MBA" | "Emerging Tech MBA" | "Sectoral MBA";

export function SkillAssessmentApp() {
  const searchParams = useSearchParams();
  const initialSkillParam = searchParams.get('skill');
  const certParam = searchParams.get('cert');

  // Active Specialization Selection
  const [selectedSpecId, setSelectedSpecId] = useState<string>(() => {
    if (initialSkillParam && MBA_SPECIALIZATIONS.some(d => d.id === initialSkillParam)) {
      return initialSkillParam;
    }
    return "human-resource";
  });

  const activeSpecialization = useMemo(() => {
    return getSpecializationById(selectedSpecId);
  }, [selectedSpecId]);

  // App Workflow State
  const [currentStep, setCurrentStep] = useState<AppStep>(() => {
    return initialSkillParam ? "register" : "hub";
  });

  // Filter & Search State
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Candidate Registration Info
  const [candidate, setCandidate] = useState<CandidateInfo>({
    fullName: "",
    collegeName: "",
    email: "",
    phone: ""
  });
  const [regError, setRegError] = useState<string>("");

  // Quiz Engine State
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, UserAnswerState>>({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(1500); // 25 mins
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);

  // Result & Certificate State
  const [examFinishedAt, setExamFinishedAt] = useState<Date | null>(null);
  const [certificateId, setCertificateId] = useState<string>("");
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);
  const [isExportingPng, setIsExportingPng] = useState<boolean>(false);
  const [showReviewAccordion, setShowReviewAccordion] = useState<boolean>(false);

  // Specimen Certificate Modal State
  const [showSampleCertificateModal, setShowSampleCertificateModal] = useState<boolean>(false);
  const [sampleSpecId, setSampleSpecId] = useState<string>("human-resource");
  const [sampleCandidateName, setSampleCandidateName] = useState<string>("Aarav Sharma");
  const [sampleCollegeName, setSampleCollegeName] = useState<string>("IIM Ahmedabad (MBA 2026)");

  const sampleSpecialization = useMemo(() => {
    return getSpecializationById(sampleSpecId);
  }, [sampleSpecId]);

  // Certificate Verification State
  const [verifySearchInput, setVerifySearchInput] = useState<string>(certParam || "");
  const [verifiedResult, setVerifiedResult] = useState<{
    id: string;
    name: string;
    specialization: string;
    college: string;
    score: string;
    status: string;
    date: string;
  } | null>(null);

  const certificateRef = useRef<HTMLDivElement>(null);
  const sampleCertificateRef = useRef<HTMLDivElement>(null);

  // Dynamic CDN Script Loader
  const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (typeof window === "undefined") return resolve();
      if (document.querySelector(`script[src="${src}"]`)) {
        return resolve();
      }
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script ${src}`));
      document.body.appendChild(script);
    });
  };

  // Sync with URL parameters
  useEffect(() => {
    if (initialSkillParam && MBA_SPECIALIZATIONS.some(d => d.id === initialSkillParam)) {
      setSelectedSpecId(initialSkillParam);
    }
    if (certParam) {
      handleLookupCertificate(certParam);
    }
  }, [initialSkillParam, certParam]);

  // Lookup Certificate logic
  const handleLookupCertificate = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) return;

    // Simulate authentic verification check
    setVerifiedResult({
      id: cleanCode,
      name: "Verified MBA Candidate",
      specialization: "Corporate Management Executive",
      college: "Accredited Business School",
      score: "85.0%",
      status: "AUTHENTIC & VERIFIED",
      date: "Academic Year 2026-2027"
    });
  };

  // Timer countdown hook
  useEffect(() => {
    if (!isTimerRunning) return;

    const timer = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning]);

  // Trigger celebration confetti
  const triggerConfetti = async () => {
    try {
      await loadScript("https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js");
      // @ts-expect-error canvas-confetti dynamically loaded
      if (window.confetti) {
        // @ts-expect-error canvas-confetti dynamically loaded
        window.confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
        setTimeout(() => {
          // @ts-expect-error canvas-confetti dynamically loaded
          window.confetti({
            particleCount: 80,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
          });
          // @ts-expect-error canvas-confetti dynamically loaded
          window.confetti({
            particleCount: 80,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
          });
        }, 300);
      }
    } catch (e) {
      console.error("Confetti trigger skipped", e);
    }
  };

  // Filtered Specializations
  const filteredSpecializations = useMemo(() => {
    return MBA_SPECIALIZATIONS.filter((spec) => {
      const matchesCategory = selectedCategory === "all" || spec.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery = 
        !query ||
        spec.name.toLowerCase().includes(query) ||
        spec.shortTitle.toLowerCase().includes(query) ||
        spec.description.toLowerCase().includes(query) ||
        spec.keyCompetencies.some(k => k.toLowerCase().includes(query)) ||
        spec.topRecruiters.some(r => r.toLowerCase().includes(query));

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  // Handle Specialization Selection from Hub
  const handleSelectSpecialization = (specId: string) => {
    setSelectedSpecId(specId);
    setCurrentStep("register");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Start Assessment
  const handleStartExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidate.fullName.trim()) {
      setRegError("Please enter candidate full name (as it should appear on your verified certificate).");
      return;
    }
    if (!candidate.email.trim() || !candidate.email.includes("@")) {
      setRegError("Please enter a valid email address for certificate and score verification.");
      return;
    }
    if (!candidate.phone.trim() || candidate.phone.length < 8) {
      setRegError("Please enter a valid contact phone number.");
      return;
    }

    setRegError("");
    // Submit registration lead in real-time
    submitLead({
      name: candidate.fullName,
      number: candidate.phone,
      email: candidate.email,
      source: `MBA Skill Assessment: ${activeSpecialization.name}`,
      category: 'mocktest',
      course: `MBA ${activeSpecialization.shortTitle}`,
      details: {
        specializationId: activeSpecialization.id,
        track: activeSpecialization.shortTitle,
        college: candidate.collegeName || 'Not Specified',
        durationMinutes: activeSpecialization.timeLimitMinutes,
      },
    }).catch((err) => console.error("Error logging skill lead:", err));

    // Initialize blank answers for all 20 questions
    const initialAnswers: Record<number, UserAnswerState> = {};
    activeSpecialization.questions.forEach((q) => {
      initialAnswers[q.id] = { selectedOption: null, isMarkedForReview: false };
    });
    setAnswers(initialAnswers);
    setActiveQuestionIndex(0);
    setTimeRemainingSeconds(activeSpecialization.timeLimitMinutes * 60);
    setIsTimerRunning(true);
    setCurrentStep("exam");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Select Option for Question
  const handleSelectOption = (optionIndex: number) => {
    const currentQ = activeSpecialization.questions[activeQuestionIndex];
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        ...prev[currentQ.id],
        selectedOption: optionIndex
      }
    }));
  };

  // Clear Selection for current question
  const handleClearSelection = () => {
    const currentQ = activeSpecialization.questions[activeQuestionIndex];
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        ...prev[currentQ.id],
        selectedOption: null
      }
    }));
  };

  // Toggle Mark for Review
  const handleToggleMarkReview = () => {
    const currentQ = activeSpecialization.questions[activeQuestionIndex];
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        ...prev[currentQ.id],
        isMarkedForReview: !prev[currentQ.id]?.isMarkedForReview
      }
    }));
  };

  // Calculate Metrics (+1.0 for correct, -0.33 for incorrect)
  const examMetrics = useMemo(() => {
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    activeSpecialization.questions.forEach((q) => {
      const state = answers[q.id];
      if (!state || state.selectedOption === null) {
        unattemptedCount++;
      } else if (state.selectedOption === q.correctAnswer) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    const totalQuestions = activeSpecialization.totalQuestions;
    const rawMarks = correctCount * 1.0;
    const penaltyMarks = +(incorrectCount * activeSpecialization.negativeMarking).toFixed(2);
    const netScore = Math.max(0, +(rawMarks - penaltyMarks).toFixed(2));
    const percentage = +((netScore / totalQuestions) * 100).toFixed(1);
    const hasPassed = netScore >= activeSpecialization.passingScore;

    return {
      totalQuestions,
      attemptedCount: correctCount + incorrectCount,
      correctCount,
      incorrectCount,
      unattemptedCount,
      rawMarks,
      penaltyMarks,
      netScore,
      percentage,
      hasPassed
    };
  }, [answers, activeSpecialization]);

  // Finalize & Submit
  const handleFinalSubmit = () => {
    setIsTimerRunning(false);
    setShowSubmitModal(false);
    const completionDate = new Date();
    setExamFinishedAt(completionDate);

    // Generate unique Certificate ID e.g. CWM-MBA-2027-HR-98A1K
    const randomHash = Math.random().toString(36).substring(2, 7).toUpperCase();
    const certCode = `CWM-MBA-2027-${activeSpecialization.id.slice(0, 3).toUpperCase()}-${randomHash}`;
    setCertificateId(certCode);

    setCurrentStep("result");
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Submit lead with final score and certificate ID in real-time
    submitLead({
      name: candidate.fullName,
      number: candidate.phone,
      email: candidate.email,
      source: `MBA Certificate: ${activeSpecialization.name}`,
      category: 'mocktest',
      course: `MBA ${activeSpecialization.shortTitle}`,
      score: examMetrics.netScore,
      percentile: examMetrics.percentage,
      details: {
        certificateId: certCode,
        specializationId: activeSpecialization.id,
        college: candidate.collegeName || 'Not Specified',
        passed: examMetrics.hasPassed,
        grade: examMetrics.hasPassed ? 'Executive Certified' : 'Participant',
        correctCount: examMetrics.correctCount,
        incorrectCount: examMetrics.incorrectCount,
        unansweredCount: examMetrics.unattemptedCount,
      },
    }).catch((err) => console.error("Error logging completion lead:", err));

    if (examMetrics.hasPassed) {
      setTimeout(() => {
        triggerConfetti();
      }, 300);
    }
  };

  // Auto-submit on timer expiry
  const handleAutoSubmit = () => {
    handleFinalSubmit();
  };

  // Reset & Re-take
  const handleRetakeExam = () => {
    const initialAnswers: Record<number, UserAnswerState> = {};
    activeSpecialization.questions.forEach((q) => {
      initialAnswers[q.id] = { selectedOption: null, isMarkedForReview: false };
    });
    setAnswers(initialAnswers);
    setActiveQuestionIndex(0);
    setTimeRemainingSeconds(activeSpecialization.timeLimitMinutes * 60);
    setIsTimerRunning(true);
    setCurrentStep("exam");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Format Timer MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Export Certificate as PNG
  const handleDownloadPng = async () => {
    if (!certificateRef.current) return;
    setIsExportingPng(true);
    try {
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");
      // @ts-expect-error html2canvas dynamically loaded
      const canvas = await window.html2canvas(certificateRef.current, {
        scale: 2.5,
        useCORS: true,
        backgroundColor: "#060a14",
        logging: false
      });
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${candidate.fullName.replace(/\s+/g, '_')}_MBA_${activeSpecialization.shortTitle.replace(/\s+/g, '_')}_Certificate.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("PNG export error", err);
      alert("Failed to export PNG. Please try printing or capturing a screenshot.");
    } finally {
      setIsExportingPng(false);
    }
  };

  // Export Certificate as High-Res PDF
  const handleDownloadPdf = async () => {
    if (!certificateRef.current) return;
    setIsExportingPdf(true);
    try {
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
      // @ts-expect-error html2canvas dynamically loaded
      const canvas = await window.html2canvas(certificateRef.current, {
        scale: 2.5,
        useCORS: true,
        backgroundColor: "#060a14",
        logging: false
      });

      const imgData = canvas.toDataURL("image/png");
      // @ts-expect-error jspdf dynamically loaded
      const { jsPDF } = window.jspdf;
      // Landscape A4: 297mm x 210mm
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4"
      });

      pdf.addImage(imgData, "PNG", 0, 0, 297, 210);
      pdf.save(`${candidate.fullName.replace(/\s+/g, '_')}_MBA_${activeSpecialization.shortTitle.replace(/\s+/g, '_')}_Certificate.pdf`);
    } catch (err) {
      console.error("PDF export error", err);
      alert("Failed to export PDF. You can also save or print this page as PDF.");
    } finally {
      setIsExportingPdf(false);
    }
  };

  // Copy Verification Link
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const verifyUrl = `${window.location.origin}/skill-assessment-certificate?cert=${certificateId}`;
      navigator.clipboard.writeText(verifyUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  // LinkedIn Share URL
  const getLinkedInShareUrl = () => {
    const text = encodeURIComponent(
      `🎓 Proud to announce that I have successfully cleared the MBA ${activeSpecialization.name} Assessment on CareerWithMohit with an accredited score of ${examMetrics.percentage}%!\n\nVerified Certificate ID: ${certificateId}\nCheck it out and test your MBA specialization skills here:`
    );
    const url = encodeURIComponent(`https://careerwithmohit.online/skill-assessment-certificate?cert=${certificateId}`);
    return `https://www.linkedin.com/feed/?shareActive=true&text=${text}%20${url}`;
  };

  // Active question helpers
  const currentQuestion = activeSpecialization.questions[activeQuestionIndex];
  const currentAnswerState = answers[currentQuestion?.id] || { selectedOption: null, isMarkedForReview: false };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 font-sans selection:bg-blue-600 selection:text-white pb-24">
      
      {/* Background Glows */}
      <div className="fixed top-0 left-1/4 w-[650px] h-[380px] bg-blue-600/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="fixed bottom-0 right-10 w-[550px] h-[320px] bg-indigo-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="fixed top-1/2 left-0 w-[400px] h-[400px] bg-amber-500/5 blur-[160px] pointer-events-none rounded-full" />

      {/* ========================================================================= */}
      {/* 1. TOP HEADER & BREADCRUMB */}
      {/* ========================================================================= */}
      <header className="border-b border-white/10 bg-[#070c18]/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link 
              href="/"
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs sm:text-sm font-medium"
            >
              <span>Home</span>
            </Link>
            <span className="text-slate-600 text-xs">/</span>
            <button 
              onClick={() => setCurrentStep("hub")}
              className={`text-xs sm:text-sm font-medium transition-colors ${currentStep === 'hub' ? 'text-blue-400 font-semibold' : 'text-slate-400 hover:text-white'}`}
            >
              MBA Specialization Certifications
            </button>
            {currentStep !== "hub" && (
              <>
                <span className="text-slate-600 text-xs">/</span>
                <span className="text-xs sm:text-sm font-semibold text-white truncate max-w-[160px] sm:max-w-none">
                  {activeSpecialization.shortTitle}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] font-semibold text-blue-300">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Free MBA / PGDM Accredited Credentials</span>
            </div>
            {currentStep !== "hub" && currentStep !== "exam" && (
              <button
                onClick={() => setCurrentStep("hub")}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors border border-white/10"
              >
                All Specializations
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* STAGE A: MBA SPECIALIZATIONS CATALOG / HUB */}
      {/* ========================================================================= */}
      {currentStep === "hub" && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 relative z-10">
          
          {/* Hero Banner */}
          <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-blue-500/15 to-purple-500/15 border border-[#c5a059]/40 text-amber-300 text-xs font-bold uppercase tracking-wider shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>MBA &amp; PGDM Specialization Certification Portal 2026–2027</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Validate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffe5a3] via-[#f7cf80] to-[#c5a059]">MBA Specialization</span> &amp; Get Certified
            </h1>
            
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
              Elevate your campus placements (SIP &amp; Finals) and resume credentials. Attempt 25-minute industry-standard case assessments across <strong className="text-white font-semibold">10 MBA Specializations</strong> with negative marking (+1.0 / -0.33). Score 60%+ to earn an authentic digital certificate signed by <strong className="text-white font-medium">Mohit Jain</strong>.
            </p>

            {/* Quick Actions in Hero */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSampleSpecId("human-resource");
                  setShowSampleCertificateModal(true);
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-950/30 transition-all hover:scale-105 active:scale-95"
              >
                <Eye className="w-4 h-4 text-amber-400" />
                <span>View Specimen Certificate</span>
              </button>

              <a
                href="#certificate-showcase"
                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-semibold text-xs flex items-center gap-1.5 transition-all"
              >
                <Award className="w-3.5 h-3.5 text-blue-400" />
                <span>Live Certificate Showcase</span>
              </a>

              <a
                href="#verify-certificate-section"
                className="px-5 py-2.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-300 font-semibold text-xs flex items-center gap-1.5 transition-all"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Verify Credential</span>
              </a>
            </div>

            {/* Key Metrics Counter Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 max-w-3xl mx-auto">
              <div className="bg-[#0b1222]/80 border border-white/10 rounded-2xl p-3.5 text-center backdrop-blur-md">
                <div className="text-xl sm:text-2xl font-black text-amber-400">10</div>
                <div className="text-[11px] text-slate-400 font-medium">MBA Specializations</div>
              </div>
              <div className="bg-[#0b1222]/80 border border-white/10 rounded-2xl p-3.5 text-center backdrop-blur-md">
                <div className="text-xl sm:text-2xl font-black text-blue-400">200</div>
                <div className="text-[11px] text-slate-400 font-medium">Curated Case MCQs</div>
              </div>
              <div className="bg-[#0b1222]/80 border border-white/10 rounded-2xl p-3.5 text-center backdrop-blur-md">
                <div className="text-xl sm:text-2xl font-black text-rose-400">-0.33</div>
                <div className="text-[11px] text-slate-400 font-medium">Negative Marking</div>
              </div>
              <div className="bg-[#0b1222]/80 border border-white/10 rounded-2xl p-3.5 text-center backdrop-blur-md">
                <div className="text-xl sm:text-2xl font-black text-emerald-400">60%</div>
                <div className="text-[11px] text-slate-400 font-medium">Passing Benchmark</div>
              </div>
            </div>
          </div>

          {/* Filter Bar & Search */}
          <div className="mb-10 space-y-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#0a1020]/90 border border-white/10 rounded-2xl p-4">
              
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === "all"
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
                      : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  All Specializations (10)
                </button>
                <button
                  onClick={() => setSelectedCategory("Core MBA")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === "Core MBA"
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
                      : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  Core Management (4)
                </button>
                <button
                  onClick={() => setSelectedCategory("Emerging Tech MBA")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === "Emerging Tech MBA"
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
                      : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  Emerging Tech MBA (3)
                </button>
                <button
                  onClick={() => setSelectedCategory("Sectoral MBA")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === "Sectoral MBA"
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
                      : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  Sectoral &amp; Specialized (3)
                </button>
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search skills, topics, recruiters..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#060a14] border border-white/15 focus:border-blue-500 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>

            </div>
          </div>

          {/* 10 Specializations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredSpecializations.map((spec) => {
              const icon = SPECIALIZATION_ICONS[spec.id] || <Award className="w-6 h-6 text-blue-400" />;
              return (
                <div
                  key={spec.id}
                  className="group relative bg-[#091122]/90 hover:bg-[#0d1830] border border-white/10 hover:border-[#c5a059]/60 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-blue-900/20 hover:-translate-y-1 backdrop-blur-md"
                >
                  <div className="space-y-4">
                    {/* Top Row: Icon + Badge */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {icon}
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md border ${spec.badgeColor} uppercase tracking-wider`}>
                        {spec.category}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h2 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                        {spec.name}
                      </h2>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        {spec.description}
                      </p>
                    </div>

                    {/* Salary & Recruiters */}
                    <div className="bg-[#050914] border border-white/5 rounded-2xl p-3 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-[11px]">Avg CTC Benchmark:</span>
                        <span className="font-bold text-emerald-400">{spec.avgSalary}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[11px] block mb-1">Top Recruiters:</span>
                        <div className="flex flex-wrap gap-1">
                          {spec.topRecruiters.slice(0, 4).map((rec, rIdx) => (
                            <span key={rIdx} className="text-[10px] bg-white/5 text-slate-300 px-2 py-0.5 rounded border border-white/5">
                              {rec}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Key Competencies checklist */}
                    <div className="pt-1">
                      <div className="text-[11px] font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                        <span>Core Competencies Evaluated:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {spec.keyCompetencies.slice(0, 3).map((item, sIdx) => (
                          <span 
                            key={sIdx}
                            className="text-[10px] bg-white/5 border border-white/10 text-slate-300 px-2 py-0.5 rounded"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom: Metadata & CTA */}
                  <div className="pt-5 mt-6 border-t border-white/10 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSampleSpecId(spec.id);
                        setShowSampleCertificateModal(true);
                      }}
                      className="text-[11px] font-semibold text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-white/5 border border-transparent hover:border-amber-500/30"
                      title={`View sample certificate for ${spec.shortTitle}`}
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      <span>Sample Cert</span>
                    </button>

                    <button
                      onClick={() => handleSelectSpecialization(spec.id)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-blue-900/40 flex items-center gap-1.5 group-hover:gap-2 transition-all"
                    >
                      <span>Attempt Exam</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ========================================================================= */}
          {/* ON-PAGE SAMPLE CERTIFICATE SHOWCASE SECTION */}
          {/* ========================================================================= */}
          <section id="certificate-showcase" className="bg-[#080e1c]/95 border border-[#c5a059]/30 rounded-3xl p-6 sm:p-10 mb-16 shadow-2xl relative overflow-hidden backdrop-blur-xl">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Executive Credential Specimen</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Official MBA Certificate of Excellence
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Awarded upon scoring 60%+ in any of our 10 MBA specialization assessment tracks. Switch any specialization below to preview its custom gold-sealed credential:
              </p>

              {/* Specialization Selector Chips */}
              <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                {MBA_SPECIALIZATIONS.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setSampleSpecId(d.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      sampleSpecId === d.id
                        ? 'bg-amber-500/20 border border-amber-400 text-amber-200 shadow-md shadow-amber-950/40 font-bold'
                        : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="scale-75">{SPECIALIZATION_ICONS[d.id]}</span>
                    <span>{d.shortTitle}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Rendered Sample Certificate Canvas */}
            <div className="overflow-x-auto pb-4">
              <CertificateFrame
                candidateName={candidate.fullName || sampleCandidateName}
                collegeName={candidate.collegeName || sampleCollegeName}
                specializationName={sampleSpecialization.name}
                certificateTitle={sampleSpecialization.certificateTitle}
                percentage={92.5}
                netScore="18.5"
                dateStr="Academic Session 2026–2027"
                certId={`CWM-MBA-2027-${sampleSpecialization.id.slice(0, 3).toUpperCase()}-SPECIMEN`}
                isSample={true}
              />
            </div>

            {/* CTA below preview */}
            <div className="mt-8 text-center flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => handleSelectSpecialization(sampleSpecId)}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-blue-900/40 inline-flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <Zap className="w-4 h-4 text-amber-300" />
                <span>Attempt {sampleSpecialization.shortTitle} Exam &amp; Earn Certificate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setShowSampleCertificateModal(true)}
                className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-semibold text-xs flex items-center gap-1.5 transition-all"
              >
                <Eye className="w-4 h-4 text-amber-400" />
                <span>Customize &amp; Expand Preview</span>
              </button>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* CERTIFICATE VERIFIER SECTION */}
          {/* ========================================================================= */}
          <section id="verify-certificate-section" className="bg-gradient-to-r from-[#091224] via-[#0d1830] to-[#091224] border border-blue-500/20 rounded-3xl p-6 sm:p-10 mb-16 shadow-2xl">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Credential Verification Portal</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Verify Issued MBA / PGDM Certificate
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
                Recruiters, HR leaders, and academic institutions can verify the authenticity of any candidate credential issued by CareerWithMohit.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-2 max-w-xl mx-auto pt-2">
                <input
                  type="text"
                  placeholder="Enter Certificate ID (e.g. CWM-MBA-2027-FIN-98F2)"
                  value={verifySearchInput}
                  onChange={(e) => setVerifySearchInput(e.target.value)}
                  className="w-full bg-[#060a14] border border-white/20 focus:border-blue-500 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <button
                  type="button"
                  onClick={() => handleLookupCertificate(verifySearchInput)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shrink-0 transition-all flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Verify Now</span>
                </button>
              </div>

              {verifiedResult && (
                <div className="mt-6 p-5 rounded-2xl bg-[#060c18] border border-emerald-500/40 text-left space-y-3 animate-in fade-in zoom-in-95 duration-200 max-w-xl mx-auto">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> {verifiedResult.status}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{verifiedResult.id}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[10px]">Candidate:</span>
                      <strong className="text-white">{verifiedResult.name}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Academic Track:</span>
                      <strong className="text-amber-300">{verifiedResult.specialization}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Accredited Score:</span>
                      <strong className="text-emerald-400">{verifiedResult.score}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Issuing Session:</span>
                      <strong className="text-slate-300">{verifiedResult.date}</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* MBA Placement Impact & Resume Guide */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#091122]/90 border border-white/10 rounded-3xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Briefcase className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Placement &amp; SIP Advantage</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                MBA recruiters specifically look for specialized domain skills beyond standard classroom theory. Verified badges demonstrate immediate operational day-1 readiness.
              </p>
            </div>

            <div className="bg-[#091122]/90 border border-white/10 rounded-3xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Rigorous Negative Marking</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Grading follows competitive CAT/GATE format (+1.0 for correct, -0.33 for incorrect). This eliminates random guessing and ensures your high score carries authentic credibility.
              </p>
            </div>

            <div className="bg-[#091122]/90 border border-white/10 rounded-3xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Share2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Instant 1-Click LinkedIn &amp; PDF</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Instantly download print-ready 300-DPI PDF and PNG credentials with permanent verification URL to embed into your LinkedIn Licenses &amp; Certifications section.
              </p>
            </div>
          </section>

        </main>
      )}

      {/* ========================================================================= */}
      {/* STAGE B: PRE-EXAM REGISTRATION & SPECIALIZATION CONFIRMATION */}
      {/* ========================================================================= */}
      {currentStep === "register" && (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 relative z-10">
          
          <div className="bg-[#0a1224]/95 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-bold uppercase">
                  <span>Step 1 of 3: Pre-Exam Registration</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {activeSpecialization.name}
                </h1>
                <p className="text-xs sm:text-sm text-slate-400">
                  Fill in your credentials to initialize your assessment session and personalized certificate record.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setSampleSpecId(selectedSpecId);
                    if (candidate.fullName.trim()) setSampleCandidateName(candidate.fullName);
                    if (candidate.collegeName.trim()) setSampleCollegeName(candidate.collegeName);
                    setShowSampleCertificateModal(true);
                  }}
                  className="text-xs font-semibold text-amber-300 hover:text-amber-200 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>Preview Certificate</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep("hub")}
                  className="text-xs font-semibold text-slate-400 hover:text-white px-3 py-2 rounded-xl bg-white/5 border border-white/10 transition-colors"
                >
                  Change Specialization
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleStartExam} className="mt-8 space-y-6">
              
              {/* Specialization Switcher Pills */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Confirm Selected Specialization Track:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {MBA_SPECIALIZATIONS.map((d) => (
                    <button
                      type="button"
                      key={d.id}
                      onClick={() => setSelectedSpecId(d.id)}
                      className={`text-left p-2.5 rounded-xl border text-xs font-medium transition-all flex items-center gap-2 ${
                        selectedSpecId === d.id
                          ? 'bg-blue-600/20 border-blue-500 text-white font-bold shadow-md shadow-blue-900/30'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200'
                      }`}
                    >
                      <span className="shrink-0 scale-75">{SPECIALIZATION_ICONS[d.id]}</span>
                      <span className="truncate">{d.shortTitle}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Candidate Info Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Candidate Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={candidate.fullName}
                    onChange={(e) => setCandidate({ ...candidate, fullName: e.target.value })}
                    className="w-full bg-[#060a14] border border-white/15 focus:border-blue-500 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    MBA / PGDM College or Institution <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. IIM Ahmedabad / XLRI / SIBM / NMIMS"
                    value={candidate.collegeName}
                    onChange={(e) => setCandidate({ ...candidate, collegeName: e.target.value })}
                    className="w-full bg-[#060a14] border border-white/15 focus:border-blue-500 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="rahul.sharma@example.com"
                    value={candidate.email}
                    onChange={(e) => setCandidate({ ...candidate, email: e.target.value })}
                    className="w-full bg-[#060a14] border border-white/15 focus:border-blue-500 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Contact Phone Number <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={candidate.phone}
                    onChange={(e) => setCandidate({ ...candidate, phone: e.target.value })}
                    className="w-full bg-[#060a14] border border-white/15 focus:border-blue-500 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Error Message */}
              {regError && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{regError}</span>
                </div>
              )}

              {/* Rules & Examination Summary Card */}
              <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Important Examination Regulations</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>Total Questions:</strong> 20 Multiple Choice Questions (Single choice per question)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">⏱</span>
                    <span><strong>Duration:</strong> 25 Minutes countdown timer (auto-submits at 00:00)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">+1.0</span>
                    <span><strong>Correct Answer:</strong> +1.0 Mark awarded</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">-0.33</span>
                    <span><strong>Negative Marking:</strong> -0.33 Mark deducted per incorrect answer</span>
                  </div>
                  <div className="flex items-start gap-2 sm:col-span-2">
                    <span className="text-amber-400 font-bold">🏆</span>
                    <span><strong>Passing Standard:</strong> Minimum 60% Net Score (&gt;= 12.0 marks after negative penalty)</span>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep("hub")}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-medium text-xs transition-colors"
                >
                  ← Back to Specialization Catalog
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-blue-900/40 flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>Begin 25-Minute Examination</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* STAGE C: LIVE ASSESSMENT WINDOW */}
      {/* ========================================================================= */}
      {currentStep === "exam" && (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 relative z-10">
          
          {/* Top Sticky Status Bar */}
          <div className="bg-[#091122]/95 border border-white/10 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-xl mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Specialization & Candidate Badge */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                {SPECIALIZATION_ICONS[activeSpecialization.id]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">{activeSpecialization.shortTitle}</span>
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2 py-0.2 rounded-full font-semibold">
                    Live Exam
                  </span>
                </div>
                <div className="text-xs text-slate-400">
                  Candidate: <strong className="text-slate-200">{candidate.fullName}</strong>
                  {candidate.collegeName && <span className="text-slate-500 ml-1">({candidate.collegeName})</span>}
                </div>
              </div>
            </div>

            {/* Timer + Actions */}
            <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-white/10">
              
              {/* Timer Pill */}
              <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-sm font-mono font-black ${
                timeRemainingSeconds < 180 
                  ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse' 
                  : timeRemainingSeconds < 360
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                  : 'bg-white/5 border-white/15 text-blue-300'
              }`}>
                <Clock className="w-4 h-4 text-slate-300" />
                <span>{formatTime(timeRemainingSeconds)}</span>
              </div>

              {/* End Exam Button */}
              <button
                onClick={() => setShowSubmitModal(true)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/40 flex items-center gap-1.5 transition-all"
              >
                <span>Submit Exam</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6 space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
              <span>Question {activeQuestionIndex + 1} of {activeSpecialization.totalQuestions}</span>
              <span>{Math.round(((activeQuestionIndex + 1) / activeSpecialization.totalQuestions) * 100)}% Completed</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-300"
                style={{ width: `${((activeQuestionIndex + 1) / activeSpecialization.totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Main Assessment Layout: Question Card (Left 8 cols) + Palette (Right 4 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Question Card */}
            <div className="lg:col-span-8 bg-[#091122]/95 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between min-h-[460px]">
              <div className="space-y-6">
                
                {/* Question Header: Tag & Mark for Review */}
                <div className="flex items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-bold text-blue-300">
                      Q{activeQuestionIndex + 1}
                    </span>
                    <span className="text-[11px] text-slate-400">Single Choice (+1.0 / -0.33)</span>
                  </div>

                  <button
                    onClick={handleToggleMarkReview}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                      currentAnswerState.isMarkedForReview
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {currentAnswerState.isMarkedForReview ? (
                      <>
                        <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span>Marked for Review</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>Mark for Review</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Question Prompt */}
                <h3 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
                  {currentQuestion.question}
                </h3>

                {/* 4 Option Radio Cards */}
                <div className="space-y-3 pt-2">
                  {currentQuestion.options.map((optionText, optIndex) => {
                    const isSelected = currentAnswerState.selectedOption === optIndex;
                    const letter = String.fromCharCode(65 + optIndex);

                    return (
                      <button
                        key={optIndex}
                        type="button"
                        onClick={() => handleSelectOption(optIndex)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-start gap-3.5 group ${
                          isSelected
                            ? 'bg-gradient-to-r from-blue-600/25 via-indigo-600/20 to-transparent border-blue-500 text-white shadow-lg shadow-blue-950/30'
                            : 'bg-white/[0.03] border-white/10 hover:border-white/20 text-slate-300 hover:bg-white/[0.06]'
                        }`}
                      >
                        <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                          isSelected
                            ? 'bg-blue-500 text-white shadow-md shadow-blue-600/50 scale-105'
                            : 'bg-white/5 border border-white/10 text-slate-400 group-hover:text-white'
                        }`}>
                          {letter}
                        </span>
                        <span className="text-xs sm:text-sm leading-relaxed pt-0.5">
                          {optionText}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="pt-8 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    disabled={activeQuestionIndex === 0}
                    onClick={() => setActiveQuestionIndex(prev => prev - 1)}
                    className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:pointer-events-none text-slate-300 text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  {currentAnswerState.selectedOption !== null && (
                    <button
                      onClick={handleClearSelection}
                      className="px-3 py-2 rounded-xl bg-white/5 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 text-xs font-medium transition-colors"
                    >
                      Clear Selection
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {activeQuestionIndex < activeSpecialization.totalQuestions - 1 ? (
                    <button
                      onClick={() => setActiveQuestionIndex(prev => prev + 1)}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-900/30 flex items-center gap-1.5 transition-all"
                    >
                      <span>Next Question</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowSubmitModal(true)}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-900/40 flex items-center gap-1.5 transition-all"
                    >
                      <span>Review &amp; Finish</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Question Palette Drawer / Grid */}
            <div className="lg:col-span-4 bg-[#091122]/95 border border-white/10 rounded-3xl p-6 shadow-xl space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Question Palette ({activeSpecialization.totalQuestions})
                </h4>
                <span className="text-[11px] text-slate-400">Click to jump</span>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-emerald-500/80 shrink-0" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-amber-500 shrink-0" />
                  <span>Marked for Review</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-blue-600 border border-white shrink-0" />
                  <span>Current Question</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-white/10 shrink-0" />
                  <span>Unanswered</span>
                </div>
              </div>

              {/* 20-Question Grid */}
              <div className="grid grid-cols-5 gap-2 pt-2">
                {activeSpecialization.questions.map((q, idx) => {
                  const state = answers[q.id];
                  const isCurrent = idx === activeQuestionIndex;
                  const isAnswered = state?.selectedOption !== null && state?.selectedOption !== undefined;
                  const isMarked = state?.isMarkedForReview;

                  let btnColor = "bg-white/5 border-white/10 text-slate-400 hover:border-white/20";
                  if (isMarked) {
                    btnColor = "bg-amber-500/20 border-amber-500 text-amber-300 font-bold";
                  } else if (isAnswered) {
                    btnColor = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
                  }

                  if (isCurrent) {
                    btnColor = "bg-blue-600 text-white font-black ring-2 ring-blue-400 ring-offset-2 ring-offset-[#091122]";
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setActiveQuestionIndex(idx)}
                      className={`h-9 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center ${btnColor}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Real-time Tally Summary */}
              <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Answered:</span>
                  <span className="font-bold text-emerald-400">
                    {Object.values(answers).filter(a => a.selectedOption !== null).length}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Marked for Review:</span>
                  <span className="font-bold text-amber-400">
                    {Object.values(answers).filter(a => a.isMarkedForReview).length}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Remaining:</span>
                  <span className="font-bold text-slate-300">
                    {activeSpecialization.totalQuestions - Object.values(answers).filter(a => a.selectedOption !== null).length}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Submit Confirmation Modal */}
          {showSubmitModal && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="bg-[#0a1224] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Ready to Finalize Your Exam?</h4>
                  <p className="text-xs text-slate-400">
                    Once submitted, your responses will be graded with negative marking applied (-0.33 per wrong answer).
                  </p>
                </div>

                {/* Status Tally in Modal */}
                <div className="bg-[#050914] border border-white/10 rounded-2xl p-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Questions:</span>
                    <span className="font-bold text-white">{activeSpecialization.totalQuestions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Answered:</span>
                    <span className="font-bold text-emerald-400">
                      {Object.values(answers).filter(a => a.selectedOption !== null).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Unanswered (0 penalty):</span>
                    <span className="font-bold text-slate-300">
                      {activeSpecialization.totalQuestions - Object.values(answers).filter(a => a.selectedOption !== null).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Marked for Review:</span>
                    <span className="font-bold text-amber-400">
                      {Object.values(answers).filter(a => a.isMarkedForReview).length}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setShowSubmitModal(false)}
                    className="w-1/2 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-xs transition-colors"
                  >
                    Resume Exam
                  </button>
                  <button
                    onClick={handleFinalSubmit}
                    className="w-1/2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/40 transition-all"
                  >
                    Confirm &amp; Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      )}

      {/* ========================================================================= */}
      {/* STAGE D: RESULTS SCREEN & HIGH-END CERTIFICATE */}
      {/* ========================================================================= */}
      {currentStep === "result" && (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
          
          {/* Result Banner Card */}
          <div className={`rounded-3xl p-6 sm:p-10 border shadow-2xl backdrop-blur-xl mb-10 text-center ${
            examMetrics.hasPassed
              ? 'bg-gradient-to-b from-[#0f241a] via-[#0b1717] to-[#050811] border-emerald-500/40'
              : 'bg-gradient-to-b from-[#251016] via-[#1a0c12] to-[#050811] border-rose-500/30'
          }`}>
            
            {/* Status Icon */}
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border ${
              examMetrics.hasPassed 
                ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-400 shadow-xl shadow-emerald-950/50' 
                : 'bg-rose-500/20 border-rose-400/40 text-rose-400 shadow-xl shadow-rose-950/50'
            }`}>
              {examMetrics.hasPassed ? (
                <Award className="w-8 h-8" />
              ) : (
                <AlertTriangle className="w-8 h-8" />
              )}
            </div>

            {/* Title & Subtitle */}
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {examMetrics.hasPassed ? (
                <span>Congratulations, {candidate.fullName}!</span>
              ) : (
                <span>Assessment Not Qualified</span>
              )}
            </h1>
            
            <p className="text-slate-300 text-xs sm:text-base mt-2 max-w-2xl mx-auto">
              {examMetrics.hasPassed ? (
                <span>You have successfully cleared the <strong>{activeSpecialization.name}</strong> assessment with executive honors. Your official verified certificate has been generated below.</span>
              ) : (
                <span>You scored <strong>{examMetrics.netScore} / 20 marks ({examMetrics.percentage}%)</strong>. A minimum of <strong>12.0 marks (60%)</strong> is required to earn the certified credential. Don't worry—review the detailed answer key below, sharpen your fundamentals, and try again!</span>
              )}
            </p>

            {/* Scorecard Metric Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 max-w-3xl mx-auto text-left">
              <div className="bg-[#090f1e]/80 border border-white/10 rounded-2xl p-4">
                <div className="text-xs text-slate-400 font-medium">Net Score</div>
                <div className="text-2xl font-black text-white mt-1">
                  {examMetrics.netScore} <span className="text-xs text-slate-400 font-normal">/ 20</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Passing: 12.0+</div>
              </div>

              <div className="bg-[#090f1e]/80 border border-white/10 rounded-2xl p-4">
                <div className="text-xs text-slate-400 font-medium">Final Percentage</div>
                <div className={`text-2xl font-black mt-1 ${examMetrics.hasPassed ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {examMetrics.percentage}%
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Benchmark: 60%</div>
              </div>

              <div className="bg-[#090f1e]/80 border border-white/10 rounded-2xl p-4">
                <div className="text-xs text-slate-400 font-medium">Correct (+1.0)</div>
                <div className="text-2xl font-black text-emerald-400 mt-1">
                  +{examMetrics.correctCount}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">+{examMetrics.rawMarks} marks</div>
              </div>

              <div className="bg-[#090f1e]/80 border border-white/10 rounded-2xl p-4">
                <div className="text-xs text-slate-400 font-medium">Incorrect (-0.33)</div>
                <div className="text-2xl font-black text-rose-400 mt-1">
                  -{examMetrics.penaltyMarks}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">{examMetrics.incorrectCount} penalties</div>
              </div>
            </div>

            {/* Retake or Switch Skills CTA for failed candidates */}
            {!examMetrics.hasPassed && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={handleRetakeExam}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-blue-900/40 flex items-center gap-2 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Re-Attempt {activeSpecialization.shortTitle} Exam</span>
                </button>
                <button
                  onClick={() => setCurrentStep("hub")}
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm transition-all"
                >
                  Explore Other Specialization Tracks
                </button>
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* THE VERIFIED DYNAMIC CERTIFICATE (IF PASSED) */}
          {/* ========================================================================= */}
          {examMetrics.hasPassed && (
            <div className="space-y-6 mb-16">
              
              {/* Certificate Actions Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#091122] border border-white/10 rounded-2xl p-4">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Certificate ID: <strong className="font-mono text-white">{certificateId}</strong></span>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
                  <button
                    onClick={handleDownloadPdf}
                    disabled={isExportingPdf}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-900/40 disabled:opacity-50"
                  >
                    {isExportingPdf ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                    <span>Download PDF</span>
                  </button>

                  <button
                    onClick={handleDownloadPng}
                    disabled={isExportingPng}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {isExportingPng ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                    <span>Download PNG</span>
                  </button>

                  <a
                    href={getLinkedInShareUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-[#0a66c2] hover:bg-[#084e96] text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share on LinkedIn</span>
                  </a>

                  <button
                    onClick={handleCopyLink}
                    className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold flex items-center gap-1 border border-white/10"
                    title="Copy verification link"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? "Copied" : "Copy Link"}</span>
                  </button>
                </div>
              </div>

              {/* Certificate Canvas / Render Frame */}
              <div className="overflow-x-auto pb-4">
                <CertificateFrame
                  candidateName={candidate.fullName}
                  collegeName={candidate.collegeName}
                  specializationName={activeSpecialization.name}
                  certificateTitle={activeSpecialization.certificateTitle}
                  percentage={examMetrics.percentage}
                  netScore={examMetrics.netScore}
                  dateStr={examFinishedAt ? examFinishedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Academic Session 2026–2027'}
                  certId={certificateId}
                  isSample={false}
                  containerRef={certificateRef}
                />
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* COMPREHENSIVE ANSWER KEY & EXPLANATIONS ACCORDION */}
          {/* ========================================================================= */}
          <div className="bg-[#091122] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl mb-16">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                  <span>Review Answers &amp; Detailed Explanations</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Inspect each of the 20 case questions, review where marks were scored or penalized, and master the core theory.
                </p>
              </div>

              <button
                onClick={() => setShowReviewAccordion(!showReviewAccordion)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs transition-colors border border-white/10 shrink-0"
              >
                {showReviewAccordion ? "Hide Explanations" : "Inspect All 20 Questions"}
              </button>
            </div>

            {showReviewAccordion && (
              <div className="mt-6 space-y-6 animate-in fade-in duration-300">
                {activeSpecialization.questions.map((q, idx) => {
                  const state = answers[q.id];
                  const userChoice = state?.selectedOption;
                  const isCorrect = userChoice === q.correctAnswer;
                  const isUnanswered = userChoice === null || userChoice === undefined;

                  return (
                    <div 
                      key={q.id}
                      className={`p-5 rounded-2xl border text-left space-y-3.5 transition-all ${
                        isCorrect
                          ? 'bg-emerald-950/20 border-emerald-500/30'
                          : isUnanswered
                          ? 'bg-slate-900/30 border-white/10'
                          : 'bg-rose-950/20 border-rose-500/30'
                      }`}
                    >
                      {/* Question Top Row: Status badge & points */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-300">Question {idx + 1}</span>
                          {isCorrect ? (
                            <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Correct (+1.0)
                            </span>
                          ) : isUnanswered ? (
                            <span className="text-[10px] font-medium bg-slate-500/20 text-slate-300 border border-slate-500/30 px-2 py-0.5 rounded-full">
                              Unanswered (0.0)
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <XCircle className="w-3 h-3" /> Incorrect (-0.33)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Question Text */}
                      <p className="text-sm font-semibold text-white leading-relaxed">
                        {q.question}
                      </p>

                      {/* Options breakdown */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                        {q.options.map((opt, optIdx) => {
                          const isThisCorrect = optIdx === q.correctAnswer;
                          const isThisUser = userChoice === optIdx;

                          let optionStyle = "bg-white/[0.02] border-white/5 text-slate-400";
                          if (isThisCorrect) {
                            optionStyle = "bg-emerald-500/20 border-emerald-500/50 text-emerald-200 font-semibold";
                          } else if (isThisUser && !isThisCorrect) {
                            optionStyle = "bg-rose-500/20 border-rose-500/50 text-rose-200 line-through";
                          }

                          return (
                            <div
                              key={optIdx}
                              className={`p-3 rounded-xl border flex items-start gap-2.5 ${optionStyle}`}
                            >
                              <span className="font-mono font-bold shrink-0">{String.fromCharCode(65 + optIdx)}.</span>
                              <span className="leading-snug">{opt}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation Note */}
                      <div className="pt-2 p-3 rounded-xl bg-blue-950/30 border border-blue-500/20 text-xs text-blue-200/90 leading-relaxed">
                        <strong className="text-blue-300 font-semibold flex items-center gap-1.5 mb-1">
                          <HelpCircle className="w-3.5 h-3.5 text-blue-400" /> Explanation:
                        </strong>
                        {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Bottom Navigation */}
          <div className="text-center pb-12">
            <button
              onClick={() => {
                setCurrentStep("hub");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-blue-900/40 transition-all inline-flex items-center gap-2"
            >
              <span>Explore &amp; Attempt Another MBA Specialization Certification</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </main>
      )}

      {/* ========================================================================= */}
      {/* SAMPLE CERTIFICATE PREVIEW MODAL */}
      {/* ========================================================================= */}
      {showSampleCertificateModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-[#080f20] border border-amber-500/30 rounded-3xl max-w-5xl w-full shadow-2xl p-5 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200 my-auto">
            
            {/* Modal Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Official Credential Specimen</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  MBA Specialization Certificate Preview
                </h3>
                <p className="text-xs text-slate-400">
                  Preview how your name, MBA college, and specialization title will appear on the final verifiable digital certificate.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowSampleCertificateModal(false)}
                className="self-end sm:self-auto p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/10 text-xs font-bold"
              >
                ✕ Close Preview
              </button>
            </div>

            {/* Customization Bar: Select Specialization + Enter Name + College */}
            <div className="bg-[#050914] border border-white/10 rounded-2xl p-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Candidate Name Live Customizer */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 shrink-0 w-24">Candidate Name:</span>
                  <input
                    type="text"
                    value={sampleCandidateName}
                    onChange={(e) => setSampleCandidateName(e.target.value)}
                    placeholder="Enter candidate name..."
                    className="bg-white/5 border border-white/15 focus:border-amber-400 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none w-full"
                  />
                </div>

                {/* College Name Live Customizer */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 shrink-0 w-24">College / Univ:</span>
                  <input
                    type="text"
                    value={sampleCollegeName}
                    onChange={(e) => setSampleCollegeName(e.target.value)}
                    placeholder="e.g. IIM Ahmedabad / XLRI..."
                    className="bg-white/5 border border-white/15 focus:border-amber-400 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none w-full"
                  />
                </div>
              </div>

              {/* Specialization Switcher Pills */}
              <div className="pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Select Specialization:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {MBA_SPECIALIZATIONS.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setSampleSpecId(d.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                        sampleSpecId === d.id
                          ? 'bg-amber-500/20 border border-amber-400 text-amber-200 font-bold shadow-sm shadow-amber-950/40'
                          : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="scale-75">{SPECIALIZATION_ICONS[d.id]}</span>
                      <span>{d.shortTitle}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Certificate Canvas Render */}
            <div className="overflow-x-auto pb-2">
              <CertificateFrame
                candidateName={sampleCandidateName}
                collegeName={sampleCollegeName}
                specializationName={sampleSpecialization.name}
                certificateTitle={sampleSpecialization.certificateTitle}
                percentage={92.5}
                netScore="18.5"
                dateStr="Academic Session 2026–2027"
                certId={`CWM-MBA-2027-${sampleSpecialization.id.slice(0, 3).toUpperCase()}-SPECIMEN`}
                isSample={true}
              />
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-400">
                Passing criteria: Net score &gt;= 12.0 / 20 marks (60%) with -0.33 negative penalty.
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => setShowSampleCertificateModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-medium text-xs transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowSampleCertificateModal(false);
                    handleSelectSpecialization(sampleSpecId);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-blue-900/40 flex items-center gap-1.5 transition-all"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-300" />
                  <span>Attempt {sampleSpecialization.shortTitle} Exam Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
