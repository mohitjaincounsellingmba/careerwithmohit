"use client";

import { useState } from "react";
import { roadmapData, RoadmapProgram, RoadmapSpecialization, ProgramId } from "@/data/roadmapData";
import { submitLead } from "@/lib/leads";
import {
    BookOpen, Award, Building2, TrendingUp, ChevronRight,
    ArrowLeft, Lock, Zap, Send, CheckCircle2, Search,
    Sparkles, ShieldCheck, Download, MessageCircle, ExternalLink,
    Briefcase, GraduationCap, Scale, Laptop, Compass, Check
} from "lucide-react";

export function CareerRoadmapCalculator() {
    const [step, setStep] = useState<"program" | "specialization" | "locked" | "result">("program");
    const [selectedProgramId, setSelectedProgramId] = useState<ProgramId | null>(null);
    const [selectedSpec, setSelectedSpec] = useState<RoadmapSpecialization | null>(null);
    const [activeTab, setActiveTab] = useState<"skills" | "certs" | "companies" | "careers">("skills");
    const [categoryFilter, setCategoryFilter] = useState<"all" | "Post-Graduate" | "Undergraduate" | "Professional Law">("all");
    const [searchQuery, setSearchQuery] = useState("");

    // Lead form state
    const [leadData, setLeadData] = useState({ name: "", number: "", email: "", location: "" });
    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const program = roadmapData.find(p => p.id === selectedProgramId);

    const filteredPrograms = roadmapData.filter(p => {
        const matchesCategory = categoryFilter === "all" || p.level === categoryFilter;
        const matchesSearch = searchQuery.trim() === "" || 
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.specializations.some(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    const handleProgramSelect = (id: ProgramId) => {
        setSelectedProgramId(id);
        setStep("specialization");
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 400, behavior: "smooth" });
        }
    };

    const handleSpecSelect = (spec: RoadmapSpecialization) => {
        setSelectedSpec(spec);
        setStep("locked");
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 400, behavior: "smooth" });
        }
    };

    const handleLeadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await submitLead({
                name: leadData.name,
                number: leadData.number,
                phone: leadData.number,
                email: leadData.email,
                location: leadData.location,
                course: program ? `${program.shortName} - ${selectedSpec?.title}` : "Career Roadmap",
                source: `Career Roadmap Calculator - ${program?.shortName} (${selectedSpec?.title})`,
                type: "roadmap_unlock",
                details: {
                    degree: program?.title,
                    specialization: selectedSpec?.title,
                }
            });

            if (res.success) {
                setSubmitSuccess(true);
                setTimeout(() => {
                    setStep("result");
                    if (typeof window !== "undefined") {
                        window.scrollTo({ top: 350, behavior: "smooth" });
                    }
                }, 400);
            } else {
                // Fallback to result even on warning to guarantee user value
                setStep("result");
            }
        } catch (err) {
            console.error("Lead submission error:", err);
            setStep("result");
        } finally {
            setSubmitting(false);
        }
    };

    const reset = () => {
        setStep("program");
        setSelectedProgramId(null);
        setSelectedSpec(null);
        setActiveTab("skills");
        setSearchQuery("");
        setSubmitSuccess(false);
    };

    const levelBadge = (level: string) => {
        if (level === "beginner") return "bg-emerald-50 text-emerald-700 border-emerald-200";
        if (level === "intermediate") return "bg-amber-50 text-amber-700 border-amber-200";
        return "bg-rose-50 text-rose-700 border-rose-200";
    };

    const whatsappUrl = `https://wa.me/918851453046?text=${encodeURIComponent(
        `Hi Mohit Sir, I just generated my Career Roadmap for ${program?.shortName || ""} (${selectedSpec?.title || ""}). Can you help me evaluate top colleges, eligibility, and 2026-2027 placement opportunities?`
    )}`;

    return (
        <div id="calculator-widget" className="w-full max-w-6xl mx-auto font-sans">
            {/* Main Interactive Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden">
                
                {/* Top Interactive Progress Header */}
                <div className="bg-slate-900 text-white p-6 sm:p-8 relative overflow-hidden">
                    <div className="absolute -right-12 -top-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-bold tracking-wide uppercase mb-3">
                                <Sparkles className="w-3.5 h-3.5" /> 2026–2027 Career Intelligence
                            </div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                                {step === "program" && "Step 1: Choose Your Degree Program"}
                                {step === "specialization" && `Step 2: Select ${program?.shortName} Specialization`}
                                {step === "locked" && "Step 3: Access Verified Roadmap & Benchmark Data"}
                                {step === "result" && `${selectedSpec?.title} Career Roadmap`}
                            </h2>
                            <p className="text-slate-300 text-sm sm:text-base mt-1.5 max-w-2xl">
                                {step === "program" && "Explore 11 premier undergraduate, postgraduate, and professional degrees with tailored hiring trajectories."}
                                {step === "specialization" && `Choose your preferred functional track to unlock skill requirements, certifications, and recruiter CTCs.`}
                                {step === "locked" && "Unlock verified technical skills, high-value certifications, top recruiting firms, and 2026-2027 packages."}
                                {step === "result" && `Tailored blueprint for ${program?.title} with real industry salary benchmarks and skills matrix.`}
                            </p>
                        </div>

                        {step !== "program" && (
                            <button
                                onClick={reset}
                                className="self-start md:self-center inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all border border-white/10"
                            >
                                <ArrowLeft className="w-4 h-4" /> Start Over
                            </button>
                        )}
                    </div>

                    {/* Step Dots & Progression Bar */}
                    <div className="relative z-10 grid grid-cols-4 gap-2 sm:gap-3 mt-8 pt-6 border-t border-white/10">
                        {[
                            { stepKey: "program", label: "1. Degree", num: "01" },
                            { stepKey: "specialization", label: "2. Specialization", num: "02" },
                            { stepKey: "locked", label: "3. Unlock", num: "03" },
                            { stepKey: "result", label: "4. Full Roadmap", num: "04" },
                        ].map((item, idx) => {
                            const isCurrent = step === item.stepKey;
                            const isPast = (
                                (item.stepKey === "program") ||
                                (item.stepKey === "specialization" && (step === "specialization" || step === "locked" || step === "result")) ||
                                (item.stepKey === "locked" && (step === "locked" || step === "result")) ||
                                (item.stepKey === "result" && step === "result")
                            );

                            return (
                                <div key={item.stepKey} className="flex flex-col gap-1.5">
                                    <div className={`h-1.5 rounded-full transition-all duration-300 ${
                                        isPast ? "bg-amber-400" : "bg-white/20"
                                    }`} />
                                    <span className={`text-[11px] font-semibold tracking-tight transition-colors truncate ${
                                        isCurrent ? "text-amber-300 font-bold" : isPast ? "text-white" : "text-slate-400"
                                    }`}>
                                        <span className="hidden sm:inline">{item.num} </span>{item.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* STEP 1: Program Selector (All 11 Courses) */}
                {step === "program" && (
                    <div className="p-6 sm:p-10 bg-slate-50/50">
                        {/* Filters & Search Toolbar */}
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                            {/* Stream Tabs */}
                            <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                                {([
                                    { id: "all", label: "All Degrees (11)" },
                                    { id: "Post-Graduate", label: "Post-Graduate (MBA, PGDM, MCA, MA, LLM)" },
                                    { id: "Undergraduate", label: "Undergraduate (BTech, BBA, BCom, BCA, BA)" },
                                    { id: "Professional Law", label: "Law (LLB, LLM)" },
                                ] as const).map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setCategoryFilter(tab.id)}
                                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                                            categoryFilter === tab.id
                                                ? "bg-slate-900 text-white shadow-sm"
                                                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Search Input */}
                            <div className="relative min-w-[260px]">
                                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder="Search degree or track..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                                />
                            </div>
                        </div>

                        {/* 11 Degree Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {filteredPrograms.map((prog) => (
                                <button
                                    key={prog.id}
                                    onClick={() => handleProgramSelect(prog.id)}
                                    className="group relative flex flex-col justify-between text-left p-6 bg-white rounded-2xl border border-slate-200 hover:border-amber-400/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div>
                                        <div className="flex items-start justify-between gap-3 mb-4">
                                            <div className="w-12 h-12 rounded-2xl bg-amber-50 group-hover:bg-amber-100 flex items-center justify-center text-2xl transition-colors">
                                                {prog.emoji}
                                            </div>
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200 group-hover:bg-amber-50 group-hover:text-amber-800 group-hover:border-amber-200 transition-colors">
                                                {prog.shortName}
                                            </span>
                                        </div>

                                        <h3 className="text-base font-extrabold text-slate-900 group-hover:text-amber-700 transition-colors mb-1.5 leading-snug">
                                            {prog.title}
                                        </h3>
                                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4">
                                            {prog.description}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600">
                                        <span className="flex items-center gap-1.5 text-amber-600">
                                            <Sparkles className="w-3.5 h-3.5" /> {prog.specializations.length} Tracks
                                        </span>
                                        <span className="flex items-center gap-1 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all">
                                            Explore <ChevronRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {filteredPrograms.length === 0 && (
                            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
                                <p className="text-slate-500 text-sm font-medium">No degree programs matched your filter.</p>
                                <button
                                    onClick={() => { setCategoryFilter("all"); setSearchQuery(""); }}
                                    className="mt-3 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* STEP 2: Specialization Selector */}
                {step === "specialization" && program && (
                    <div className="p-6 sm:p-10 bg-slate-50/50">
                        {/* Degree Header Banner */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200 mb-8 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="text-3xl p-3 bg-amber-50 rounded-2xl">{program.emoji}</div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold uppercase tracking-wider text-amber-600">{program.badge}</span>
                                        <span className="text-slate-300">•</span>
                                        <span className="text-xs font-bold text-slate-500">{program.level}</span>
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900">{program.title}</h3>
                                </div>
                            </div>

                            <button
                                onClick={() => setStep("program")}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 self-start sm:self-center"
                            >
                                <ArrowLeft className="w-3.5 h-3.5" /> Change Degree
                            </button>
                        </div>

                        <div className="mb-6">
                            <h4 className="text-base font-extrabold text-slate-900">
                                Select Your Specialized Domain or Dream Track:
                            </h4>
                            <p className="text-xs text-slate-500 mt-1">
                                Click on any track below to calculate skills roadmap, key certifications, and real-world recruiters.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {program.specializations.map((spec) => (
                                <button
                                    key={spec.id}
                                    onClick={() => handleSpecSelect(spec)}
                                    className="group text-left p-6 bg-white rounded-2xl border border-slate-200 hover:border-slate-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-start justify-between gap-3 mb-3">
                                            <span className="text-3xl p-2.5 rounded-xl bg-slate-50 group-hover:bg-amber-50 transition-colors">
                                                {spec.emoji}
                                            </span>
                                            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                                                {spec.careerPaths.length} Roles
                                            </span>
                                        </div>
                                        <h5 className="text-base font-black text-slate-900 group-hover:text-amber-700 transition-colors mb-2">
                                            {spec.title}
                                        </h5>
                                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4">
                                            {spec.description}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                                        <span className="text-emerald-700 font-extrabold">
                                            {spec.careerPaths[0]?.avgSalary ? `Avg: ${spec.careerPaths[0].avgSalary}` : "High Package"}
                                        </span>
                                        <span className="inline-flex items-center gap-1 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all">
                                            View Roadmap <ChevronRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* STEP 3: Locked Preview & Lead Capture Gate */}
                {step === "locked" && selectedSpec && program && (
                    <div className="p-6 sm:p-10 bg-slate-50/50">
                        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                            
                            {/* Left Preview Column */}
                            <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                                            {program.shortName} Track
                                        </span>
                                        <span className="text-xs font-semibold text-slate-400">Ready to Unlock</span>
                                    </div>

                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="text-4xl p-3 rounded-2xl bg-slate-100">{selectedSpec.emoji}</div>
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-900">{selectedSpec.title}</h3>
                                            <p className="text-xs text-slate-500 font-medium">{program.title}</p>
                                        </div>
                                    </div>

                                    <p className="text-xs text-slate-600 leading-relaxed mb-6">
                                        {selectedSpec.description}
                                    </p>

                                    {/* What is unlocked */}
                                    <div className="space-y-3">
                                        <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                                            Included in Your Free Roadmap:
                                        </div>
                                        {[
                                            `${selectedSpec.skills.length} Technical & Soft Skills Required by Top Recruiters`,
                                            `${selectedSpec.certifications.length} Industry-Recognized Certifications (Beginner to Advanced)`,
                                            `${selectedSpec.companies.length} Leading Hiring Companies & MNC Sectors`,
                                            `${selectedSpec.careerPaths.length} Career Tracks with 2026-2027 Salary Benchmarks`,
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                                                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <Check className="w-3.5 h-3.5" />
                                                </div>
                                                <span className="text-xs font-bold text-slate-700 leading-snug">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                                    <span className="flex items-center gap-1.5">
                                        <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Free & Confidential
                                    </span>
                                    <button
                                        onClick={() => setStep("specialization")}
                                        className="text-slate-600 font-bold hover:underline"
                                    >
                                        Change Track
                                    </button>
                                </div>
                            </div>

                            {/* Right Lead Capture Form */}
                            <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between shadow-xl">
                                <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                                <div className="relative z-10">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
                                        <Lock className="w-3 h-3 text-amber-400" /> Instant Access
                                    </div>
                                    <h4 className="text-xl sm:text-2xl font-black text-white mb-1.5">
                                        Unlock Your Roadmap
                                    </h4>
                                    <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                                        Enter your details to generate the personalized curriculum, required certifications, and salary reports.
                                    </p>

                                    <form onSubmit={handleLeadSubmit} className="space-y-3.5">
                                        <div>
                                            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                                                Full Name *
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="e.g. Rahul Sharma"
                                                value={leadData.name}
                                                onChange={e => setLeadData({ ...leadData, name: e.target.value })}
                                                className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:bg-white/15"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                                                WhatsApp Phone Number *
                                            </label>
                                            <input
                                                required
                                                type="tel"
                                                placeholder="e.g. +91 98765 43210"
                                                value={leadData.number}
                                                onChange={e => setLeadData({ ...leadData, number: e.target.value })}
                                                className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:bg-white/15"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                                                    Email Address *
                                                </label>
                                                <input
                                                    required
                                                    type="email"
                                                    placeholder="rahul@gmail.com"
                                                    value={leadData.email}
                                                    onChange={e => setLeadData({ ...leadData, email: e.target.value })}
                                                    className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:bg-white/15"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                                                    City / Location *
                                                </label>
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="Delhi, Pune, Mumbai"
                                                    value={leadData.location}
                                                    onChange={e => setLeadData({ ...leadData, location: e.target.value })}
                                                    className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:bg-white/15"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="w-full mt-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-widest py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50"
                                        >
                                            {submitting ? (
                                                <span>Preparing Blueprint...</span>
                                            ) : submitSuccess ? (
                                                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-900" /> Unlocked!</span>
                                            ) : (
                                                <>
                                                    <Zap className="w-4 h-4 fill-current" /> Show My Complete Roadmap
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </div>

                                <div className="mt-4 pt-4 border-t border-white/10 text-center">
                                    <p className="text-[10px] text-slate-400">
                                        Prefer instant WhatsApp counseling?{" "}
                                        <a
                                            href={whatsappUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-amber-300 font-bold hover:underline"
                                        >
                                            Chat directly on WhatsApp →
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 4: Full Roadmap Results View */}
                {step === "result" && selectedSpec && program && (
                    <div className="p-6 sm:p-10 bg-slate-50/50">
                        {/* Highlights Banner */}
                        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 mb-8 relative overflow-hidden shadow-lg">
                            <div className="absolute right-0 top-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-start gap-4">
                                    <div className="text-4xl p-3.5 rounded-2xl bg-white/10 border border-white/10 flex-shrink-0">
                                        {selectedSpec.emoji}
                                    </div>
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                            <span className="px-2.5 py-0.5 rounded-md bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider">
                                                {program.shortName} Specialized Track
                                            </span>
                                            <span className="text-xs text-slate-400 font-semibold">{program.badge}</span>
                                        </div>
                                        <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                                            {selectedSpec.title} Roadmap
                                        </h3>
                                        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                                            {selectedSpec.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                    <a
                                        href={whatsappUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold tracking-wide transition-all shadow-md"
                                    >
                                        <MessageCircle className="w-4 h-4" /> Discuss with Mohit Sir
                                    </a>
                                    <button
                                        onClick={() => {
                                            if (typeof window !== "undefined") window.print();
                                        }}
                                        className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold tracking-wide border border-white/15 transition-all"
                                    >
                                        <Download className="w-4 h-4" /> Print / Save PDF
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Tab Navigation */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 p-1.5 bg-white rounded-2xl border border-slate-200 mb-8 shadow-sm">
                            {([
                                { id: "skills", label: "Skills Matrix", count: selectedSpec.skills.length, icon: <BookOpen className="w-4 h-4" /> },
                                { id: "certs", label: "Certifications", count: selectedSpec.certifications.length, icon: <Award className="w-4 h-4" /> },
                                { id: "companies", label: "Top Recruiters", count: selectedSpec.companies.length, icon: <Building2 className="w-4 h-4" /> },
                                { id: "careers", label: "Careers & CTC", count: selectedSpec.careerPaths.length, icon: <TrendingUp className="w-4 h-4" /> },
                            ] as const).map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs font-bold transition-all ${
                                        activeTab === tab.id
                                            ? "bg-slate-900 text-white shadow-sm"
                                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                                    }`}
                                >
                                    {tab.icon}
                                    <span>{tab.label}</span>
                                    <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-extrabold ${
                                        activeTab === tab.id ? "bg-amber-400 text-slate-950" : "bg-slate-100 text-slate-600"
                                    }`}>
                                        {tab.count}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* TAB 1: Skills Matrix */}
                        {activeTab === "skills" && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Technical Skills */}
                                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                                        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                                            <div className="w-3 h-3 rounded-full bg-blue-600" />
                                            <h4 className="text-sm font-black uppercase tracking-wider text-slate-900">
                                                Domain & Technical Skills ({selectedSpec.skills.filter(s => s.type === "technical").length})
                                            </h4>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {selectedSpec.skills.filter(s => s.type === "technical").map((skill, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center gap-2.5 p-3 rounded-xl bg-blue-50/50 border border-blue-100"
                                                >
                                                    <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
                                                    <span className="text-xs font-bold text-slate-800">{skill.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Soft & Behavioral Skills */}
                                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                                        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                                            <div className="w-3 h-3 rounded-full bg-amber-500" />
                                            <h4 className="text-sm font-black uppercase tracking-wider text-slate-900">
                                                Leadership & Soft Skills ({selectedSpec.skills.filter(s => s.type === "soft").length})
                                            </h4>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {selectedSpec.skills.filter(s => s.type === "soft").map((skill, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-50/50 border border-amber-100"
                                                >
                                                    <div className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                                                    <span className="text-xs font-bold text-slate-800">{skill.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 2: Certifications Roadmap */}
                        {activeTab === "certs" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {selectedSpec.certifications.map((cert, i) => (
                                    <div
                                        key={i}
                                        className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between gap-2 mb-3">
                                                <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-black text-xs flex items-center justify-center">
                                                    0{i + 1}
                                                </span>
                                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${levelBadge(cert.level)}`}>
                                                    {cert.level}
                                                </span>
                                            </div>
                                            <h4 className="text-sm font-extrabold text-slate-900 mb-1.5 leading-snug">
                                                {cert.name}
                                            </h4>
                                            <p className="text-xs text-slate-500 font-medium">
                                                Issued by: <span className="font-bold text-slate-700">{cert.provider}</span>
                                            </p>
                                        </div>

                                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-amber-600">
                                            <CheckCircle2 className="w-3.5 h-3.5" /> Resume-Boosting Credential
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* TAB 3: Companies & Recruiters */}
                        {activeTab === "companies" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {selectedSpec.companies.map((comp, i) => (
                                    <div
                                        key={i}
                                        className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-slate-400 transition-all flex items-center gap-3.5"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-300 font-black text-sm flex items-center justify-center flex-shrink-0">
                                            {comp.name.charAt(0)}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h4 className="text-xs font-extrabold text-slate-900 truncate">
                                                {comp.name}
                                            </h4>
                                            <p className="text-[11px] font-bold text-slate-500 truncate uppercase">
                                                {comp.sector}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* TAB 4: Career Paths & 2026-2027 Salary Benchmarks */}
                        {activeTab === "careers" && (
                            <div className="space-y-3.5">
                                {selectedSpec.careerPaths.map((path, i) => (
                                    <div
                                        key={i}
                                        className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                                    >
                                        <div className="flex items-center gap-3.5">
                                            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 font-black text-xs flex items-center justify-center flex-shrink-0">
                                                #{i + 1}
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-extrabold text-slate-900">
                                                    {path.role}
                                                </h4>
                                                <p className="text-xs text-slate-500 font-medium">
                                                    {program.shortName} • {selectedSpec.title}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 self-end sm:self-center">
                                            <div className="text-right">
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                                                    Average Starting Package
                                                </span>
                                                <span className="text-base sm:text-lg font-black text-emerald-700">
                                                    {path.avgSalary}
                                                </span>
                                            </div>
                                            <a
                                                href={whatsappUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1"
                                            >
                                                College Match <ChevronRight className="w-3.5 h-3.5" />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Bottom Action Card */}
                        <div className="mt-10 rounded-3xl bg-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <div className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
                                    Next Strategic Step
                                </div>
                                <h4 className="text-xl sm:text-2xl font-black text-white">
                                    Want a 1-on-1 Profile & College Shortlisting Strategy?
                                </h4>
                                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                                    Connect with Mohit Jain (Career & Admissions Mentor) for cutoff insights, GD/PI preparation, and direct institutional merit quotas.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-3">
                                <a
                                    href="/inquiry"
                                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-widest text-center transition-all shadow-md"
                                >
                                    Book Free Consultation
                                </a>
                                <button
                                    onClick={() => setStep("specialization")}
                                    className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider text-center transition-all border border-white/10"
                                >
                                    Try Another Track
                                </button>
                            </div>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}
