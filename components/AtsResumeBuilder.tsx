"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import {
    ResumeGoal,
    ResumeData,
    ResumeTemplate,
    RESUME_TEMPLATES,
    DEFAULT_PROFILES,
    ACTIVE_HIRING_COMPANIES,
    HiringJob,
    ATS_POWER_VERBS
} from "@/data/resumeTemplatesData";
import { submitLead } from "@/lib/leads";
import {
    FileText, Download, Sparkles, CheckCircle2, AlertTriangle,
    Eye, Edit3, Plus, Trash2, ChevronRight, ArrowRight,
    Briefcase, GraduationCap, Award, Wrench, ShieldCheck,
    ZoomIn, ZoomOut, RotateCcw, Share2, Printer, Lock,
    Check, ExternalLink, MapPin, Building2, DollarSign,
    UserCheck, Smartphone, Mail, Linkedin, Globe, Search,
    Flame, RefreshCw
} from "lucide-react";

export function AtsResumeBuilder() {
    const [goal, setGoal] = useState<ResumeGoal>("fresher");
    const [resumeData, setResumeData] = useState<ResumeData>(DEFAULT_PROFILES.fresher);
    const [selectedTemplateId, setSelectedTemplateId] = useState<string>("fresher-big4-trainee");
    const [activeTab, setActiveTab] = useState<"personal" | "summary" | "experience" | "education" | "projects" | "skills" | "certifications">("personal");
    const [templateCategoryFilter, setTemplateCategoryFilter] = useState<"all" | ResumeGoal>("all");
    const [zoom, setZoom] = useState<number>(100);
    const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");
    const [isExporting, setIsExporting] = useState<boolean>(false);
    const [exportFormat, setExportFormat] = useState<"pdf" | "png" | "jpg" | null>(null);
    const [showExportModal, setShowExportModal] = useState<boolean>(false);
    const [exportLead, setExportLead] = useState({ name: "", phone: "", email: "" });
    const [selectedJobForModal, setSelectedJobForModal] = useState<HiringJob | null>(null);

    const resumeRef = useRef<HTMLDivElement>(null);

    // Sync default profile when goal is explicitly changed (preserving if user wants)
    const handleGoalChange = (newGoal: ResumeGoal) => {
        setGoal(newGoal);
        setResumeData(DEFAULT_PROFILES[newGoal]);
        const matchedTpl = RESUME_TEMPLATES.find(t => t.category === newGoal);
        if (matchedTpl) {
            setSelectedTemplateId(matchedTpl.id);
        }
    };

    const currentTemplate = useMemo(() => {
        return RESUME_TEMPLATES.find(t => t.id === selectedTemplateId) || RESUME_TEMPLATES[0];
    }, [selectedTemplateId]);

    const filteredTemplates = useMemo(() => {
        if (templateCategoryFilter === "all") return RESUME_TEMPLATES;
        return RESUME_TEMPLATES.filter(t => t.category === templateCategoryFilter);
    }, [templateCategoryFilter]);

    // Compute Live ATS Score
    const atsEvaluation = useMemo(() => {
        let score = 0;
        const checks: { label: string; passed: boolean; tip: string }[] = [];

        // 1. Contact Information
        const hasContact = Boolean(
            resumeData.personal.fullName.trim() &&
            resumeData.personal.email.includes("@") &&
            resumeData.personal.phone.trim().length >= 8 &&
            resumeData.personal.location.trim()
        );
        if (hasContact) score += 20;
        checks.push({
            label: "Complete Contact Info",
            passed: hasContact,
            tip: "Include clean phone, professional email, city/state, and LinkedIn profile."
        });

        // 2. Target Role & Summary
        const hasSummary = resumeData.summary.trim().split(/\s+/).length >= 25;
        if (hasSummary) score += 20;
        checks.push({
            label: "Impact Summary (25+ words)",
            passed: hasSummary,
            tip: "Write a concise 3-4 sentence summary highlighting target role, key skills, and career objective."
        });

        // 3. Work Experience / Projects
        const totalBullets = [
            ...resumeData.experience.flatMap(e => e.bullets),
            ...resumeData.projects.map(p => p.description)
        ];
        const hasBullets = totalBullets.length >= 3;
        if (hasBullets) score += 20;
        checks.push({
            label: "Structured Experience & Projects",
            passed: hasBullets,
            tip: "Add at least 3-4 action bullet points under internships, jobs, or capstone projects."
        });

        // 4. Measurable Numbers & Metrics (%, $, ₹, X, numbers)
        const metricRegex = /(\d+[%kKxXmM]?|\₹|\$|\b[0-9]{2,}\b)/;
        const bulletsWithMetrics = totalBullets.filter(b => metricRegex.test(b));
        const hasMetrics = bulletsWithMetrics.length >= 2;
        if (hasMetrics) score += 20;
        checks.push({
            label: "Quantifiable Metrics & Results",
            passed: hasMetrics,
            tip: "Include numbers or % in your bullets (e.g., 'boosted speed by 35%', 'reduced costs by ₹4.2L')."
        });

        // 5. Skills & Keyword Density
        const totalSkills = [
            ...resumeData.skills.technical,
            ...resumeData.skills.tools,
            ...resumeData.skills.soft
        ];
        const hasSkills = totalSkills.length >= 6;
        if (hasSkills) score += 20;
        checks.push({
            label: "Core Skill Matrix (6+ skills)",
            passed: hasSkills,
            tip: "List industry-standard technical tools, languages, and core functional domain proficiencies."
        });

        return {
            score: Math.min(score, 100),
            checks,
            totalSkillsCount: totalSkills.length,
            metricBulletsCount: bulletsWithMetrics.length,
        };
    }, [resumeData]);

    // Active hiring companies filtered by current goal and user's target role/skills
    const activeJobs = useMemo(() => {
        return ACTIVE_HIRING_COMPANIES.filter(j => j.category === goal);
    }, [goal]);

    // ── Export Handlers (PDF, PNG, JPG) ───────────────────────────────────

    const triggerPrintPdf = () => {
        if (typeof window !== "undefined") {
            window.print();
        }
    };

    const loadScript = (src: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) {
                resolve();
                return;
            }
            const script = document.createElement("script");
            script.src = src;
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load ${src}`));
            document.body.appendChild(script);
        });
    };

    const handleExport = async (format: "pdf" | "png" | "jpg") => {
        setExportFormat(format);
        setShowExportModal(true);
    };

    const executeDownload = async () => {
        setIsExporting(true);
        const element = resumeRef.current;

        // Submit lead in background for career tracking
        try {
            await submitLead({
                name: exportLead.name || resumeData.personal.fullName,
                phone: exportLead.phone || resumeData.personal.phone,
                email: exportLead.email || resumeData.personal.email,
                location: resumeData.personal.location,
                source: `ATS Resume Builder - Download ${exportFormat?.toUpperCase()}`,
                course: resumeData.personal.targetRole,
                details: {
                    goal,
                    template: currentTemplate.name,
                    atsScore: atsEvaluation.score
                }
            });
        } catch (e) {
            console.warn("Lead track error:", e);
        }

        if (!element) {
            setIsExporting(false);
            setShowExportModal(false);
            return;
        }

        const fileName = `${resumeData.personal.fullName.replace(/\s+/g, "_") || "ATS"}_Resume`;

        if (exportFormat === "pdf") {
            // Text-selectable ATS Compliant native print
            setShowExportModal(false);
            setIsExporting(false);
            setTimeout(() => {
                triggerPrintPdf();
            }, 300);
            return;
        }

        try {
            // Load html2canvas dynamically from CDN
            await loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");
            // @ts-expect-error html2canvas is loaded dynamically
            const canvas = await window.html2canvas(element, {
                scale: 2.5,
                useCORS: true,
                logging: false,
                backgroundColor: "#ffffff",
            });

            if (exportFormat === "png") {
                const imgData = canvas.toDataURL("image/png");
                const link = document.createElement("a");
                link.download = `${fileName}.png`;
                link.href = imgData;
                link.click();
            } else if (exportFormat === "jpg") {
                const imgData = canvas.toDataURL("image/jpeg", 0.95);
                const link = document.createElement("a");
                link.download = `${fileName}.jpg`;
                link.href = imgData;
                link.click();
            }
        } catch (err) {
            console.error("Canvas export failed, falling back to print", err);
            triggerPrintPdf();
        } finally {
            setIsExporting(false);
            setShowExportModal(false);
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto font-sans">
            {/* Top Step 1: Goal Selector Bar */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
                            <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Step 1: Define Your Target Career Milestone
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                            Choose Your Resume Goal
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1">
                            Dynamically calibrates input fields, ATS keywords, and 10+ tailored templates for your specific stage.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setResumeData(DEFAULT_PROFILES[goal])}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                            title="Reset to prefilled industry sample"
                        >
                            <RefreshCw className="w-3.5 h-3.5" /> Load Sample Profile
                        </button>
                    </div>
                </div>

                {/* 3 Goal Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        {
                            id: "internship" as const,
                            title: "1. Internship & Co-op",
                            subtitle: "College Students & Trainees",
                            desc: "Emphasizes coursework, academic capstone projects, coding repositories, and student society leadership.",
                            icon: <GraduationCap className="w-6 h-6" />,
                            badge: "10 Templates",
                            color: "hover:border-sky-500",
                            activeClass: "border-sky-600 bg-sky-50/60 ring-2 ring-sky-500/20 text-sky-950",
                        },
                        {
                            id: "fresher" as const,
                            title: "2. Placement as Fresher",
                            subtitle: "Final Year & Recent Grads",
                            desc: "Highlights degree CGPA, corporate internships, core domain skills, and recruiter-ready certifications.",
                            icon: <Award className="w-6 h-6" />,
                            badge: "10 Templates",
                            color: "hover:border-amber-500",
                            activeClass: "border-amber-600 bg-amber-50/60 ring-2 ring-amber-500/20 text-amber-950",
                        },
                        {
                            id: "professional" as const,
                            title: "3. Working Professional",
                            subtitle: "1 to 10+ Years Experience",
                            desc: "Prioritizes quantifiable business impact, revenue/scale metrics, team leadership, and executive outcomes.",
                            icon: <Briefcase className="w-6 h-6" />,
                            badge: "10 Templates",
                            color: "hover:border-emerald-500",
                            activeClass: "border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20 text-emerald-950",
                        },
                    ].map(card => (
                        <button
                            key={card.id}
                            onClick={() => handleGoalChange(card.id)}
                            className={`text-left p-5 rounded-2xl border-2 transition-all duration-200 flex flex-col justify-between ${
                                goal === card.id
                                    ? card.activeClass
                                    : "border-slate-200 bg-white hover:bg-slate-50"
                            }`}
                        >
                            <div>
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <div className={`p-2.5 rounded-xl ${
                                        goal === card.id ? "bg-white shadow-sm" : "bg-slate-100"
                                    }`}>
                                        {card.icon}
                                    </div>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                                        {card.badge}
                                    </span>
                                </div>
                                <h3 className="text-base font-black tracking-tight mb-0.5">
                                    {card.title}
                                </h3>
                                <p className="text-xs font-bold text-slate-500 mb-2">{card.subtitle}</p>
                                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                    {card.desc}
                                </p>
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold">
                                <span>{goal === card.id ? "Active Track ✓" : "Switch Track"}</span>
                                <ChevronRight className="w-4 h-4" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Template Selector Carousel / Bar */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                            <span>Select Template</span>
                            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-900 text-white">
                                {RESUME_TEMPLATES.length} Total ATS Templates
                            </span>
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                            1-click switch between templates instantly without losing any entered data.
                        </p>
                    </div>

                    {/* Category Filter Chips */}
                    <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
                        {[
                            { id: "all" as const, label: "All (30)" },
                            { id: "internship" as const, label: "Internship (10)" },
                            { id: "fresher" as const, label: "Fresher (10)" },
                            { id: "professional" as const, label: "Pro (10)" },
                        ].map(chip => (
                            <button
                                key={chip.id}
                                onClick={() => setTemplateCategoryFilter(chip.id)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                    templateCategoryFilter === chip.id
                                        ? "bg-white text-slate-950 shadow-sm"
                                        : "text-slate-600 hover:text-slate-900"
                                }`}
                            >
                                {chip.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Templates Grid with Horizontal Overflow on mobile */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3 max-h-56 overflow-y-auto p-1">
                    {filteredTemplates.map(tpl => (
                        <button
                            key={tpl.id}
                            onClick={() => setSelectedTemplateId(tpl.id)}
                            className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                                selectedTemplateId === tpl.id
                                    ? "border-slate-900 bg-slate-900 text-white shadow-md ring-2 ring-amber-400"
                                    : "border-slate-200 bg-slate-50/80 hover:bg-white hover:border-slate-400 text-slate-800"
                            }`}
                        >
                            <div>
                                <div className="flex items-center justify-between gap-1 mb-1.5">
                                    <span
                                        className="w-3 h-3 rounded-full border border-white"
                                        style={{ backgroundColor: tpl.accentColor }}
                                    />
                                    <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded ${
                                        selectedTemplateId === tpl.id ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                                    }`}>
                                        {tpl.badge}
                                    </span>
                                </div>
                                <h4 className="text-xs font-black leading-tight line-clamp-2">
                                    {tpl.name}
                                </h4>
                            </div>

                            <div className="mt-2 text-[10px] opacity-70 capitalize font-medium">
                                {tpl.layoutType} • {tpl.fontStyle}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Mobile Edit / Preview Toggle */}
            <div className="lg:hidden flex items-center justify-center gap-2 mb-6 p-1.5 bg-white rounded-2xl border border-slate-200 shadow-sm sticky top-16 z-30">
                <button
                    onClick={() => setMobileTab("edit")}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                        mobileTab === "edit"
                            ? "bg-slate-900 text-white shadow"
                            : "text-slate-600 hover:bg-slate-100"
                    }`}
                >
                    <Edit3 className="w-4 h-4" /> Edit Resume
                </button>
                <button
                    onClick={() => setMobileTab("preview")}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                        mobileTab === "preview"
                            ? "bg-slate-900 text-white shadow"
                            : "text-slate-600 hover:bg-slate-100"
                    }`}
                >
                    <Eye className="w-4 h-4" /> Live Preview ({atsEvaluation.score}% ATS)
                </button>
            </div>

            {/* Main Split Builder: Left Form Wizard / Right Live Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
                
                {/* LEFT COLUMN: Input Form Wizard */}
                <div className={`lg:col-span-6 space-y-6 ${mobileTab === "preview" ? "hidden lg:block" : "block"}`}>
                    
                    {/* Live ATS Score Card */}
                    <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-6 border border-slate-700 shadow-lg relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                        
                        <div className="relative z-10 flex items-center justify-between gap-4">
                            <div>
                                <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                                    Real-Time ATS Parsing Optimizer
                                </div>
                                <h3 className="text-xl font-black text-white">
                                    ATS Compliance Score
                                </h3>
                                <p className="text-xs text-slate-300 mt-0.5">
                                    {atsEvaluation.score >= 80 ? "Excellent! High chance of clearing bot screening." : "Optimize sections below to surpass the 80% corporate screening cutoff."}
                                </p>
                            </div>

                            <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/10 border border-white/15 min-w-[76px]">
                                <span className={`text-2xl font-black ${
                                    atsEvaluation.score >= 80 ? "text-emerald-400" : atsEvaluation.score >= 60 ? "text-amber-400" : "text-rose-400"
                                }`}>
                                    {atsEvaluation.score}%
                                </span>
                                <span className="text-[10px] font-bold text-slate-300 uppercase">
                                    ATS Score
                                </span>
                            </div>
                        </div>

                        {/* Checklist */}
                        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/10">
                            {atsEvaluation.checks.map((c, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs">
                                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                                        c.passed ? "bg-emerald-500 text-slate-950" : "bg-white/10 text-slate-400"
                                    }`}>
                                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                                    </div>
                                    <span className={c.passed ? "text-slate-200 font-semibold" : "text-slate-400"}>
                                        {c.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Wizard Section Tabs */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 border-b border-slate-100 text-xs font-bold text-slate-600">
                            {[
                                { id: "personal" as const, label: "Personal" },
                                { id: "summary" as const, label: "Summary" },
                                { id: "experience" as const, label: goal === "internship" ? "Internships" : "Experience" },
                                { id: "projects" as const, label: "Projects" },
                                { id: "education" as const, label: "Education" },
                                { id: "skills" as const, label: "Skills" },
                                { id: "certifications" as const, label: "Certifications" },
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all ${
                                        activeTab === tab.id
                                            ? "bg-slate-900 text-white shadow-sm"
                                            : "hover:bg-slate-100 text-slate-600"
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* SECTION 1: Personal Details */}
                        {activeTab === "personal" && (
                            <div className="space-y-4">
                                <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                                    Contact & Target Header
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                                        <input
                                            type="text"
                                            value={resumeData.personal.fullName}
                                            onChange={e => setResumeData({
                                                ...resumeData,
                                                personal: { ...resumeData.personal, fullName: e.target.value }
                                            })}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                                            placeholder="Rahul Sharma"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">Target Job Title *</label>
                                        <input
                                            type="text"
                                            value={resumeData.personal.targetRole}
                                            onChange={e => setResumeData({
                                                ...resumeData,
                                                personal: { ...resumeData.personal, targetRole: e.target.value }
                                            })}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                                            placeholder="Associate Software Engineer / Financial Analyst"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                                        <input
                                            type="email"
                                            value={resumeData.personal.email}
                                            onChange={e => setResumeData({
                                                ...resumeData,
                                                personal: { ...resumeData.personal, email: e.target.value }
                                            })}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                                            placeholder="rahul.sharma@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                                        <input
                                            type="tel"
                                            value={resumeData.personal.phone}
                                            onChange={e => setResumeData({
                                                ...resumeData,
                                                personal: { ...resumeData.personal, phone: e.target.value }
                                            })}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">City / Location *</label>
                                        <input
                                            type="text"
                                            value={resumeData.personal.location}
                                            onChange={e => setResumeData({
                                                ...resumeData,
                                                personal: { ...resumeData.personal, location: e.target.value }
                                            })}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                                            placeholder="Bangalore, India"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">LinkedIn Profile</label>
                                        <input
                                            type="text"
                                            value={resumeData.personal.linkedin}
                                            onChange={e => setResumeData({
                                                ...resumeData,
                                                personal: { ...resumeData.personal, linkedin: e.target.value }
                                            })}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                                            placeholder="linkedin.com/in/rahulsharma"
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-xs font-bold text-slate-700 mb-1">GitHub / Portfolio Website</label>
                                        <input
                                            type="text"
                                            value={resumeData.personal.githubOrPortfolio}
                                            onChange={e => setResumeData({
                                                ...resumeData,
                                                personal: { ...resumeData.personal, githubOrPortfolio: e.target.value }
                                            })}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                                            placeholder="github.com/rahulsharma or portfolio.me"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SECTION 2: Summary */}
                        {activeTab === "summary" && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                                        Professional Summary / Career Objective
                                    </h4>
                                    <span className="text-[11px] font-bold text-slate-400">
                                        {resumeData.summary.split(/\s+/).filter(Boolean).length} words
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500">
                                    {goal === "internship" && "Explain your academic background, core passion, and what technical value you will bring to the summer internship."}
                                    {goal === "fresher" && "State your degree, key internships/capstones, top technical tools, and your target industry entry point."}
                                    {goal === "professional" && "Lead with total years of experience, scale of products/budgets managed, and top quantifiable career achievements."}
                                </p>
                                <textarea
                                    rows={5}
                                    value={resumeData.summary}
                                    onChange={e => setResumeData({ ...resumeData, summary: e.target.value })}
                                    className="w-full p-3.5 rounded-xl border border-slate-200 text-xs text-slate-900 leading-relaxed focus:outline-none focus:border-amber-500"
                                    placeholder="Enter your ATS summary..."
                                />
                                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900">
                                    <strong>💡 ATS Tip:</strong> Avoid buzzwords like &quot;hard worker&quot;. Use concrete terms like &quot;Full-Stack Engineer&quot;, &quot;Financial Modeling&quot;, or &quot;P&L Management&quot;.
                                </div>
                            </div>
                        )}

                        {/* SECTION 3: Experience */}
                        {activeTab === "experience" && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                                        {goal === "internship" ? "Prior Internships / Roles" : "Work Experience"}
                                    </h4>
                                    <button
                                        onClick={() => {
                                            const newExp = {
                                                id: `exp-${Date.now()}`,
                                                role: "Software Developer",
                                                company: "Tech Solutions",
                                                location: "Remote",
                                                startDate: "Jan 2025",
                                                endDate: "Present",
                                                current: true,
                                                bullets: ["Developed core module using modern stack, improving load time by 25%."]
                                            };
                                            setResumeData({
                                                ...resumeData,
                                                experience: [newExp, ...resumeData.experience]
                                            });
                                        }}
                                        className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg"
                                    >
                                        <Plus className="w-3.5 h-3.5" /> Add Experience
                                    </button>
                                </div>

                                {resumeData.experience.map((exp, idx) => (
                                    <div key={exp.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3 relative">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-black text-slate-900">Position #{idx + 1}</span>
                                            {resumeData.experience.length > 1 && (
                                                <button
                                                    onClick={() => {
                                                        setResumeData({
                                                            ...resumeData,
                                                            experience: resumeData.experience.filter(e => e.id !== exp.id)
                                                        });
                                                    }}
                                                    className="text-rose-600 hover:text-rose-700 p-1"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Job Title / Role</label>
                                                <input
                                                    type="text"
                                                    value={exp.role}
                                                    onChange={e => {
                                                        const updated = [...resumeData.experience];
                                                        updated[idx].role = e.target.value;
                                                        setResumeData({ ...resumeData, experience: updated });
                                                    }}
                                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Company Name</label>
                                                <input
                                                    type="text"
                                                    value={exp.company}
                                                    onChange={e => {
                                                        const updated = [...resumeData.experience];
                                                        updated[idx].company = e.target.value;
                                                        setResumeData({ ...resumeData, experience: updated });
                                                    }}
                                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Dates (e.g. Jun 2024 – Present)</label>
                                                <input
                                                    type="text"
                                                    value={`${exp.startDate} – ${exp.endDate}`}
                                                    onChange={e => {
                                                        const updated = [...resumeData.experience];
                                                        const [start, end] = e.target.value.split("–").map(s => s.trim());
                                                        updated[idx].startDate = start || e.target.value;
                                                        updated[idx].endDate = end || "";
                                                        setResumeData({ ...resumeData, experience: updated });
                                                    }}
                                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Location</label>
                                                <input
                                                    type="text"
                                                    value={exp.location}
                                                    onChange={e => {
                                                        const updated = [...resumeData.experience];
                                                        updated[idx].location = e.target.value;
                                                        setResumeData({ ...resumeData, experience: updated });
                                                    }}
                                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs"
                                                />
                                            </div>
                                        </div>

                                        {/* Bullets */}
                                        <div>
                                            <div className="flex items-center justify-between mb-1">
                                                <label className="text-[11px] font-bold text-slate-600">Impact Bullet Points</label>
                                                <button
                                                    onClick={() => {
                                                        const updated = [...resumeData.experience];
                                                        updated[idx].bullets.push("Spearheaded new initiative resulting in 20% efficiency increase.");
                                                        setResumeData({ ...resumeData, experience: updated });
                                                    }}
                                                    className="text-[10px] text-amber-700 font-bold hover:underline"
                                                >
                                                    + Add Bullet
                                                </button>
                                            </div>
                                            <div className="space-y-2">
                                                {exp.bullets.map((b, bIdx) => (
                                                    <div key={bIdx} className="flex items-start gap-2">
                                                        <textarea
                                                            rows={2}
                                                            value={b}
                                                            onChange={e => {
                                                                const updated = [...resumeData.experience];
                                                                updated[idx].bullets[bIdx] = e.target.value;
                                                                setResumeData({ ...resumeData, experience: updated });
                                                            }}
                                                            className="w-full p-2 rounded-lg border border-slate-200 bg-white text-xs leading-relaxed"
                                                        />
                                                        {exp.bullets.length > 1 && (
                                                            <button
                                                                onClick={() => {
                                                                    const updated = [...resumeData.experience];
                                                                    updated[idx].bullets = updated[idx].bullets.filter((_, i) => i !== bIdx);
                                                                    setResumeData({ ...resumeData, experience: updated });
                                                                }}
                                                                className="text-slate-400 hover:text-rose-600 p-1"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* SECTION 4: Projects */}
                        {activeTab === "projects" && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                                        Key Projects &amp; Capstones
                                    </h4>
                                    <button
                                        onClick={() => {
                                            const newProj = {
                                                id: `proj-${Date.now()}`,
                                                title: "Autonomous Web Application",
                                                techStack: "React, Node.js, Tailwind CSS",
                                                link: "github.com/myproject",
                                                description: "Built full-stack application serving 500+ active users with 99.9% uptime."
                                            };
                                            setResumeData({
                                                ...resumeData,
                                                projects: [...resumeData.projects, newProj]
                                            });
                                        }}
                                        className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg"
                                    >
                                        <Plus className="w-3.5 h-3.5" /> Add Project
                                    </button>
                                </div>

                                {resumeData.projects.map((proj, pIdx) => (
                                    <div key={proj.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-black text-slate-900">Project #{pIdx + 1}</span>
                                            {resumeData.projects.length > 1 && (
                                                <button
                                                    onClick={() => {
                                                        setResumeData({
                                                            ...resumeData,
                                                            projects: resumeData.projects.filter(p => p.id !== proj.id)
                                                        });
                                                    }}
                                                    className="text-rose-600 p-1"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Project Name</label>
                                                <input
                                                    type="text"
                                                    value={proj.title}
                                                    onChange={e => {
                                                        const updated = [...resumeData.projects];
                                                        updated[pIdx].title = e.target.value;
                                                        setResumeData({ ...resumeData, projects: updated });
                                                    }}
                                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Tools / Tech Stack</label>
                                                <input
                                                    type="text"
                                                    value={proj.techStack}
                                                    onChange={e => {
                                                        const updated = [...resumeData.projects];
                                                        updated[pIdx].techStack = e.target.value;
                                                        setResumeData({ ...resumeData, projects: updated });
                                                    }}
                                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Description &amp; Metrics</label>
                                            <textarea
                                                rows={2}
                                                value={proj.description}
                                                onChange={e => {
                                                    const updated = [...resumeData.projects];
                                                    updated[pIdx].description = e.target.value;
                                                    setResumeData({ ...resumeData, projects: updated });
                                                }}
                                                className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-xs leading-relaxed"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* SECTION 5: Education */}
                        {activeTab === "education" && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                                        Education &amp; Academic Honors
                                    </h4>
                                    <button
                                        onClick={() => {
                                            const newEdu = {
                                                id: `edu-${Date.now()}`,
                                                degree: "Bachelor of Technology",
                                                institution: "University Institute",
                                                location: "India",
                                                startYear: "2022",
                                                endYear: "2026",
                                                grade: "CGPA: 8.5 / 10"
                                            };
                                            setResumeData({
                                                ...resumeData,
                                                education: [...resumeData.education, newEdu]
                                            });
                                        }}
                                        className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg"
                                    >
                                        <Plus className="w-3.5 h-3.5" /> Add Degree
                                    </button>
                                </div>

                                {resumeData.education.map((edu, edIdx) => (
                                    <div key={edu.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Degree / Course</label>
                                                <input
                                                    type="text"
                                                    value={edu.degree}
                                                    onChange={e => {
                                                        const updated = [...resumeData.education];
                                                        updated[edIdx].degree = e.target.value;
                                                        setResumeData({ ...resumeData, education: updated });
                                                    }}
                                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-bold text-slate-600 mb-0.5">College / University</label>
                                                <input
                                                    type="text"
                                                    value={edu.institution}
                                                    onChange={e => {
                                                        const updated = [...resumeData.education];
                                                        updated[edIdx].institution = e.target.value;
                                                        setResumeData({ ...resumeData, education: updated });
                                                    }}
                                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Years (e.g. 2023–2027)</label>
                                                <input
                                                    type="text"
                                                    value={`${edu.startYear} – ${edu.endYear}`}
                                                    onChange={e => {
                                                        const updated = [...resumeData.education];
                                                        const [s, en] = e.target.value.split("–").map(v => v.trim());
                                                        updated[edIdx].startYear = s || e.target.value;
                                                        updated[edIdx].endYear = en || "";
                                                        setResumeData({ ...resumeData, education: updated });
                                                    }}
                                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Grade / CGPA</label>
                                                <input
                                                    type="text"
                                                    value={edu.grade}
                                                    onChange={e => {
                                                        const updated = [...resumeData.education];
                                                        updated[edIdx].grade = e.target.value;
                                                        setResumeData({ ...resumeData, education: updated });
                                                    }}
                                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* SECTION 6: Skills */}
                        {activeTab === "skills" && (
                            <div className="space-y-4">
                                <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                                    Skills &amp; Keywords
                                </h4>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Technical &amp; Core Domain Skills (comma separated)
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={resumeData.skills.technical.join(", ")}
                                        onChange={e => setResumeData({
                                            ...resumeData,
                                            skills: {
                                                ...resumeData.skills,
                                                technical: e.target.value.split(",").map(s => s.trim()).filter(Boolean)
                                            }
                                        })}
                                        className="w-full p-3 rounded-xl border border-slate-200 text-xs"
                                        placeholder="Python, React, SQL, Financial Modeling, DCF Valuation"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Tools &amp; Platforms (comma separated)
                                    </label>
                                    <textarea
                                        rows={2}
                                        value={resumeData.skills.tools.join(", ")}
                                        onChange={e => setResumeData({
                                            ...resumeData,
                                            skills: {
                                                ...resumeData.skills,
                                                tools: e.target.value.split(",").map(s => s.trim()).filter(Boolean)
                                            }
                                        })}
                                        className="w-full p-3 rounded-xl border border-slate-200 text-xs"
                                        placeholder="Git, Docker, Postman, Excel, Power BI, Bloomberg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Soft &amp; Leadership Skills (comma separated)
                                    </label>
                                    <input
                                        type="text"
                                        value={resumeData.skills.soft.join(", ")}
                                        onChange={e => setResumeData({
                                            ...resumeData,
                                            skills: {
                                                ...resumeData.skills,
                                                soft: e.target.value.split(",").map(s => s.trim()).filter(Boolean)
                                            }
                                        })}
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                                        placeholder="Stakeholder Management, Rapid Prototyping, Presentation"
                                    />
                                </div>
                            </div>
                        )}

                        {/* SECTION 7: Certifications */}
                        {activeTab === "certifications" && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                                        Professional Certifications
                                    </h4>
                                    <button
                                        onClick={() => {
                                            const newCert = {
                                                id: `cert-${Date.now()}`,
                                                name: "AWS Certified Solutions Architect",
                                                issuer: "Amazon Web Services",
                                                year: "2025"
                                            };
                                            setResumeData({
                                                ...resumeData,
                                                certifications: [...resumeData.certifications, newCert]
                                            });
                                        }}
                                        className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg"
                                    >
                                        <Plus className="w-3.5 h-3.5" /> Add Certification
                                    </button>
                                </div>

                                {resumeData.certifications.map((c, cIdx) => (
                                    <div key={c.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
                                        <div className="grid grid-cols-3 gap-2 flex-1">
                                            <input
                                                type="text"
                                                placeholder="Certification Name"
                                                value={c.name}
                                                onChange={e => {
                                                    const updated = [...resumeData.certifications];
                                                    updated[cIdx].name = e.target.value;
                                                    setResumeData({ ...resumeData, certifications: updated });
                                                }}
                                                className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs col-span-2"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Issuer"
                                                value={c.issuer}
                                                onChange={e => {
                                                    const updated = [...resumeData.certifications];
                                                    updated[cIdx].issuer = e.target.value;
                                                    setResumeData({ ...resumeData, certifications: updated });
                                                }}
                                                className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs"
                                            />
                                        </div>
                                        <button
                                            onClick={() => {
                                                setResumeData({
                                                    ...resumeData,
                                                    certifications: resumeData.certifications.filter(item => item.id !== c.id)
                                                });
                                            }}
                                            className="text-rose-500 hover:text-rose-700"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT COLUMN: Real-Time Live Preview Panel */}
                <div className={`lg:col-span-6 sticky top-20 z-20 ${mobileTab === "edit" ? "hidden lg:block" : "block"}`}>
                    
                    {/* Live Preview Control Toolbar */}
                    <div className="bg-slate-900 text-white rounded-3xl p-4 sm:p-5 border border-slate-800 shadow-xl mb-4 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-300">Live Preview</span>
                            <span className="px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 font-black text-[10px] uppercase">
                                {currentTemplate.name}
                            </span>
                        </div>

                        {/* Zoom Controls */}
                        <div className="hidden sm:flex items-center gap-1 bg-white/10 p-1 rounded-xl">
                            <button
                                onClick={() => setZoom(Math.max(75, zoom - 10))}
                                className="p-1 text-slate-300 hover:text-white"
                                title="Zoom Out"
                            >
                                <ZoomOut className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-[11px] font-bold px-1 text-slate-200">{zoom}%</span>
                            <button
                                onClick={() => setZoom(Math.min(110, zoom + 10))}
                                className="p-1 text-slate-300 hover:text-white"
                                title="Zoom In"
                            >
                                <ZoomIn className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        {/* Download Trigger Buttons */}
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <button
                                onClick={() => handleExport("pdf")}
                                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md"
                            >
                                <Download className="w-3.5 h-3.5" /> PDF
                            </button>
                            <button
                                onClick={() => handleExport("png")}
                                className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/10"
                            >
                                PNG
                            </button>
                            <button
                                onClick={() => handleExport("jpg")}
                                className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/10"
                            >
                                JPG
                            </button>
                        </div>
                    </div>

                    {/* Scaled A4 Document Container */}
                    <div className="bg-slate-300/60 p-2 sm:p-4 rounded-3xl border border-slate-300 shadow-inner overflow-x-auto flex justify-center">
                        <div
                            id="ats-resume-document"
                            ref={resumeRef}
                            style={{
                                transform: `scale(${zoom / 100})`,
                                transformOrigin: "top center",
                            }}
                            className={`w-[210mm] min-h-[297mm] bg-white text-slate-900 p-8 sm:p-10 shadow-2xl transition-all ${
                                currentTemplate.fontStyle === "serif" ? "font-serif" : currentTemplate.fontStyle === "mono" ? "font-mono" : "font-sans"
                            }`}
                        >
                            {/* TEMPLATE LAYOUT RENDERER */}

                            {/* Standard Single Column (Classic / Minimal / Tech / Compact) */}
                            {currentTemplate.layoutType !== "sidebar" ? (
                                <div className="space-y-5 text-[11px] leading-relaxed">
                                    
                                    {/* Header */}
                                    <div className={`pb-3 border-b-2`} style={{ borderColor: currentTemplate.accentColor }}>
                                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight uppercase" style={{ color: currentTemplate.accentColor }}>
                                            {resumeData.personal.fullName || "YOUR FULL NAME"}
                                        </h1>
                                        <p className="text-xs font-bold text-slate-700 mt-0.5 tracking-wide uppercase">
                                            {resumeData.personal.targetRole}
                                        </p>

                                        {/* Contact Links */}
                                        <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-[10px] text-slate-600 mt-2 font-medium">
                                            {resumeData.personal.location && <span>📍 {resumeData.personal.location}</span>}
                                            {resumeData.personal.phone && <span>📞 {resumeData.personal.phone}</span>}
                                            {resumeData.personal.email && <span>✉️ {resumeData.personal.email}</span>}
                                            {resumeData.personal.linkedin && <span>🔗 {resumeData.personal.linkedin}</span>}
                                            {resumeData.personal.githubOrPortfolio && <span>💻 {resumeData.personal.githubOrPortfolio}</span>}
                                        </div>
                                    </div>

                                    {/* Summary */}
                                    {resumeData.summary && (
                                        <div>
                                            <h2 className="text-[12px] font-black uppercase tracking-wider mb-1" style={{ color: currentTemplate.accentColor }}>
                                                Professional Summary
                                            </h2>
                                            <p className="text-slate-800 text-[10.5px] leading-relaxed">
                                                {resumeData.summary}
                                            </p>
                                        </div>
                                    )}

                                    {/* Experience / Internships */}
                                    {resumeData.experience.length > 0 && (
                                        <div>
                                            <h2 className="text-[12px] font-black uppercase tracking-wider mb-2" style={{ color: currentTemplate.accentColor }}>
                                                {goal === "internship" ? "Internships & Practical Training" : "Professional Work Experience"}
                                            </h2>
                                            <div className="space-y-3">
                                                {resumeData.experience.map(exp => (
                                                    <div key={exp.id}>
                                                        <div className="flex items-start justify-between gap-2">
                                                            <span className="font-extrabold text-[11px] text-slate-900">{exp.role}</span>
                                                            <span className="text-[10px] font-semibold text-slate-500 whitespace-nowrap">
                                                                {exp.startDate} – {exp.endDate}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center justify-between text-[10px] text-slate-600 italic mb-1">
                                                            <span>{exp.company}</span>
                                                            <span>{exp.location}</span>
                                                        </div>
                                                        <ul className="list-disc list-outside ml-4 space-y-1 text-slate-800 text-[10px]">
                                                            {exp.bullets.map((b, i) => (
                                                                <li key={i}>{b}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Projects */}
                                    {resumeData.projects.length > 0 && (
                                        <div>
                                            <h2 className="text-[12px] font-black uppercase tracking-wider mb-2" style={{ color: currentTemplate.accentColor }}>
                                                Key Projects &amp; Capstones
                                            </h2>
                                            <div className="space-y-2.5">
                                                {resumeData.projects.map(proj => (
                                                    <div key={proj.id}>
                                                        <div className="flex items-start justify-between gap-2">
                                                            <span className="font-bold text-[11px] text-slate-900">
                                                                {proj.title} <span className="font-normal text-slate-500 text-[10px]">({proj.techStack})</span>
                                                            </span>
                                                            {proj.link && (
                                                                <span className="text-[10px] text-blue-700 underline">{proj.link}</span>
                                                            )}
                                                        </div>
                                                        <p className="text-[10px] text-slate-800 mt-0.5 leading-relaxed">
                                                            {proj.description}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Education */}
                                    {resumeData.education.length > 0 && (
                                        <div>
                                            <h2 className="text-[12px] font-black uppercase tracking-wider mb-2" style={{ color: currentTemplate.accentColor }}>
                                                Education &amp; Qualifications
                                            </h2>
                                            <div className="space-y-2">
                                                {resumeData.education.map(edu => (
                                                    <div key={edu.id} className="flex items-start justify-between">
                                                        <div>
                                                            <div className="font-bold text-[11px] text-slate-900">{edu.degree}</div>
                                                            <div className="text-[10px] text-slate-600">{edu.institution}, {edu.location}</div>
                                                        </div>
                                                        <div className="text-right whitespace-nowrap">
                                                            <div className="text-[10px] font-semibold text-slate-500">{edu.startYear} – {edu.endYear}</div>
                                                            <div className="text-[10px] font-bold text-emerald-800">{edu.grade}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Skills Matrix */}
                                    <div>
                                        <h2 className="text-[12px] font-black uppercase tracking-wider mb-1.5" style={{ color: currentTemplate.accentColor }}>
                                            Skills &amp; Competencies
                                        </h2>
                                        <div className="space-y-1 text-[10px]">
                                            <div>
                                                <strong className="text-slate-900">Technical Skills: </strong>
                                                <span className="text-slate-800">{resumeData.skills.technical.join(" • ")}</span>
                                            </div>
                                            <div>
                                                <strong className="text-slate-900">Tools &amp; Frameworks: </strong>
                                                <span className="text-slate-800">{resumeData.skills.tools.join(" • ")}</span>
                                            </div>
                                            <div>
                                                <strong className="text-slate-900">Soft Skills: </strong>
                                                <span className="text-slate-800">{resumeData.skills.soft.join(" • ")}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Certifications */}
                                    {resumeData.certifications.length > 0 && (
                                        <div>
                                            <h2 className="text-[12px] font-black uppercase tracking-wider mb-1.5" style={{ color: currentTemplate.accentColor }}>
                                                Honors &amp; Certifications
                                            </h2>
                                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-800">
                                                {resumeData.certifications.map(c => (
                                                    <span key={c.id}>
                                                        <strong>{c.name}</strong> — {c.issuer} ({c.year})
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                </div>
                            ) : (
                                /* Two Column Sidebar Layout */
                                <div className="grid grid-cols-12 gap-6 text-[10.5px]">
                                    {/* Left Sidebar (35%) */}
                                    <div className="col-span-4 space-y-4 pr-3 border-r-2" style={{ borderColor: currentTemplate.accentColor }}>
                                        <div>
                                            <h1 className="text-xl font-black uppercase leading-tight" style={{ color: currentTemplate.accentColor }}>
                                                {resumeData.personal.fullName}
                                            </h1>
                                            <p className="text-[10px] font-bold text-slate-700 mt-1 uppercase">
                                                {resumeData.personal.targetRole}
                                            </p>
                                        </div>

                                        {/* Contact */}
                                        <div className="space-y-1.5 text-[9.5px] text-slate-600">
                                            <div>📍 {resumeData.personal.location}</div>
                                            <div>📞 {resumeData.personal.phone}</div>
                                            <div>✉️ {resumeData.personal.email}</div>
                                            <div>🔗 {resumeData.personal.linkedin}</div>
                                        </div>

                                        {/* Education */}
                                        <div>
                                            <h3 className="text-[11px] font-black uppercase mb-2" style={{ color: currentTemplate.accentColor }}>
                                                Education
                                            </h3>
                                            {resumeData.education.map(edu => (
                                                <div key={edu.id} className="mb-2">
                                                    <div className="font-bold text-[10px]">{edu.degree}</div>
                                                    <div className="text-[9px] text-slate-600">{edu.institution}</div>
                                                    <div className="text-[9px] font-semibold text-emerald-800">{edu.grade}</div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Skills */}
                                        <div>
                                            <h3 className="text-[11px] font-black uppercase mb-2" style={{ color: currentTemplate.accentColor }}>
                                                Skills
                                            </h3>
                                            <div className="flex flex-wrap gap-1">
                                                {resumeData.skills.technical.map((s, i) => (
                                                    <span key={i} className="px-1.5 py-0.5 rounded bg-slate-100 text-[9px] font-bold text-slate-800">
                                                        {s}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Tools */}
                                        <div>
                                            <h3 className="text-[11px] font-black uppercase mb-1" style={{ color: currentTemplate.accentColor }}>
                                                Tools
                                            </h3>
                                            <div className="text-[9.5px] text-slate-700">
                                                {resumeData.skills.tools.join(", ")}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Main Column (65%) */}
                                    <div className="col-span-8 space-y-4">
                                        {/* Summary */}
                                        <div>
                                            <h2 className="text-[12px] font-black uppercase mb-1" style={{ color: currentTemplate.accentColor }}>
                                                Executive Summary
                                            </h2>
                                            <p className="text-[10px] text-slate-800 leading-relaxed">
                                                {resumeData.summary}
                                            </p>
                                        </div>

                                        {/* Experience */}
                                        <div>
                                            <h2 className="text-[12px] font-black uppercase mb-2" style={{ color: currentTemplate.accentColor }}>
                                                Experience
                                            </h2>
                                            <div className="space-y-3">
                                                {resumeData.experience.map(exp => (
                                                    <div key={exp.id}>
                                                        <div className="flex justify-between font-bold text-[10.5px]">
                                                            <span>{exp.role}</span>
                                                            <span className="text-slate-500 font-normal text-[9.5px]">{exp.startDate} – {exp.endDate}</span>
                                                        </div>
                                                        <div className="text-[9.5px] text-slate-600 mb-1">{exp.company}, {exp.location}</div>
                                                        <ul className="list-disc list-outside ml-3.5 space-y-1 text-[9.5px] text-slate-800">
                                                            {exp.bullets.map((b, i) => (
                                                                <li key={i}>{b}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Projects */}
                                        <div>
                                            <h2 className="text-[12px] font-black uppercase mb-1.5" style={{ color: currentTemplate.accentColor }}>
                                                Projects
                                            </h2>
                                            <div className="space-y-2 text-[9.5px]">
                                                {resumeData.projects.map(p => (
                                                    <div key={p.id}>
                                                        <div className="font-bold text-slate-900">{p.title}</div>
                                                        <p className="text-slate-700">{p.description}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-2 text-center text-xs text-slate-500">
                        ⚡ Tip: Use &quot;Download PDF&quot; for 100% vector, text-selectable ATS submissions.
                    </div>
                </div>

            </div>

            {/* DYNAMIC ACTIVE HIRING COMPANIES SECTION */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl mb-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
                            <Flame className="w-3.5 h-3.5 text-emerald-600" /> Matched to Your Goal: {goal.toUpperCase()}
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                            Active Hiring Companies Looking for Your Profile
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                            Real-time corporate job openings aligned with {goal === "internship" ? "Summer Interns & Co-ops" : goal === "fresher" ? "Fresher Campus & Off-Campus Drives" : "Experienced Lateral Hires"}.
                        </p>
                    </div>

                    <a
                        href="https://wa.me/918851453046?text=Hi%20Mohit%20Sir%2C%20I%20built%20my%20resume%20and%20want%20direct%20referral%20guidance%20for%20active%20openings"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl transition-all self-start md:self-auto"
                    >
                        Request Placement Referral <ChevronRight className="w-4 h-4" />
                    </a>
                </div>

                {/* Job Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {activeJobs.map(job => (
                        <div
                            key={job.id}
                            className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-slate-400 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-300 font-black flex items-center justify-center text-base">
                                        {job.company.charAt(0)}
                                    </div>
                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                                        {job.type}
                                    </span>
                                </div>

                                <h4 className="text-base font-extrabold text-slate-900 leading-snug mb-1">
                                    {job.role}
                                </h4>
                                <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-3">
                                    <Building2 className="w-3.5 h-3.5 text-slate-400" /> {job.company}
                                </div>

                                <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                                    <div className="flex items-center gap-1.5">
                                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}
                                    </div>
                                    <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                                        <DollarSign className="w-3.5 h-3.5 text-emerald-600" /> {job.salaryOrStipend}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-1 mb-4">
                                    {job.tags.map((tag, i) => (
                                        <span key={i} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-[10px] font-semibold">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedJobForModal(job)}
                                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                            >
                                Apply Now <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* DOWNLOAD CONFIRMATION MODAL */}
            {showExportModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative">
                        <div className="text-center mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-3">
                                <Download className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-black text-slate-900">
                                Download Your {exportFormat?.toUpperCase()} Resume
                            </h3>
                            <p className="text-xs text-slate-500 mt-1">
                                100% Free • No watermarks • ATS Parser Optimized
                            </p>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                                <input
                                    type="text"
                                    value={exportLead.name || resumeData.personal.fullName}
                                    onChange={e => setExportLead({ ...exportLead, name: e.target.value })}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                                    placeholder="Enter full name"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Number (For interview alerts)</label>
                                <input
                                    type="tel"
                                    value={exportLead.phone || resumeData.personal.phone}
                                    onChange={e => setExportLead({ ...exportLead, phone: e.target.value })}
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                                    placeholder="+91 98765 43210"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowExportModal(false)}
                                className="flex-1 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={executeDownload}
                                disabled={isExporting}
                                className="flex-1 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md disabled:opacity-50"
                            >
                                {isExporting ? "Processing..." : `Download ${exportFormat?.toUpperCase()}`}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* APPLY JOB MODAL */}
            {selectedJobForModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative">
                        <div className="flex items-start justify-between gap-3 mb-4">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                                    Direct Corporate Opening
                                </span>
                                <h3 className="text-xl font-black text-slate-900 mt-1">
                                    {selectedJobForModal.role}
                                </h3>
                                <p className="text-xs font-bold text-slate-600">{selectedJobForModal.company} • {selectedJobForModal.location}</p>
                            </div>
                            <button
                                onClick={() => setSelectedJobForModal(null)}
                                className="text-slate-400 hover:text-slate-700 p-1"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700 mb-6">
                            <div><strong>Compensation:</strong> {selectedJobForModal.salaryOrStipend}</div>
                            <div><strong>Eligibility:</strong> {selectedJobForModal.experience}</div>
                            <div><strong>Key Skills:</strong> {selectedJobForModal.tags.join(", ")}</div>
                        </div>

                        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                            Ensure your downloaded ATS resume highlights the above key skills before submitting your application.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <a
                                href={selectedJobForModal.applyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider text-center"
                            >
                                Continue to Career Portal
                            </a>
                            <a
                                href={`https://wa.me/918851453046?text=${encodeURIComponent(
                                    `Hi Mohit Sir, I am applying for ${selectedJobForModal.role} at ${selectedJobForModal.company}. Can you review my resume and guide me?`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs text-center"
                            >
                                WhatsApp Referral
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
