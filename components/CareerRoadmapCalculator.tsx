"use client";

import { useState } from "react";
import { roadmapData, RoadmapSpecialization } from "@/data/roadmapData";
import {
    BookOpen, Award, Building2, TrendingUp, ChevronRight,
    ArrowLeft, Lock, Zap, Send, X, CheckCircle2
} from "lucide-react";

export function CareerRoadmapCalculator() {
    const [step, setStep] = useState<"program" | "specialization" | "locked" | "result">("program");
    const [selectedProgram, setSelectedProgram] = useState<"mba" | "btech" | null>(null);
    const [selectedSpec, setSelectedSpec] = useState<RoadmapSpecialization | null>(null);
    const [activeTab, setActiveTab] = useState<"skills" | "certs" | "companies" | "careers">("skills");

    // Lead form state
    const [leadData, setLeadData] = useState({ name: "", number: "", email: "", location: "" });
    const [submitting, setSubmitting] = useState(false);

    const program = roadmapData.find(p => p.id === selectedProgram);

    const handleProgramSelect = (id: "mba" | "btech") => {
        setSelectedProgram(id);
        setStep("specialization");
    };

    const handleSpecSelect = (spec: RoadmapSpecialization) => {
        setSelectedSpec(spec);
        setStep("locked");
    };

    const handleLeadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        // Direct Activepieces Webhook Call
        try {
            const response = await fetch('https://cloud.activepieces.com/api/v1/webhooks/wjKhP0jGALa4bmUVYcw5F', {
                method: "POST",
                mode: 'cors',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...leadData,
                    source: `Career Roadmap - ${program?.title} ${selectedSpec?.title}`,
                    timestamp: new Date().toISOString()
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Webhook failed with status ${response.status}: ${errorText}`);
            }

            setStep("result");
        } catch (e) {
            console.error('Webhook Error:', e);
            alert('Submission failed. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const reset = () => {
        setStep("program");
        setSelectedProgram(null);
        setSelectedSpec(null);
        setActiveTab("skills");
        setLeadData({ name: "", number: "", email: "", location: "" });
    };

    const levelColor = (level: string) => {
        if (level === "beginner") return "bg-green-100 text-green-800 border-green-300";
        if (level === "intermediate") return "bg-amber-100 text-amber-800 border-amber-300";
        return "bg-red-100 text-red-800 border-red-300";
    };

    return (
        <div className="w-full max-w-5xl mx-auto font-body">
            <div className="bg-white border-[8px] border-foreground shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-6 md:p-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10 border-b-4 border-foreground pb-8">
                    <div className="bg-primary p-4 border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] w-fit">
                        <TrendingUp className="w-10 h-10 text-white" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none mb-2">
                            Career Roadmap Calculator
                        </h2>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                            Select your program + specialization → Get your personalized career roadmap
                        </p>
                    </div>
                    {step !== "program" && (
                        <button onClick={reset} className="flex items-center gap-2 text-xs font-black uppercase text-primary hover:underline">
                            <ArrowLeft className="w-4 h-4" /> Start Over
                        </button>
                    )}
                </div>

                {/* Progress Bar */}
                <div className="flex gap-2 mb-10">
                    {["program", "specialization", "result"].map((s, i) => (
                        <div key={s} className={`h-2 flex-1 border-2 border-foreground transition-all ${step === "program" && i === 0 ? "bg-primary" : (step === "specialization" && i <= 1) || step === "locked" && i <= 1 || step === "result" && i <= 2 ? "bg-primary" : "bg-slate-100"}`} />
                    ))}
                </div>

                {/* STEP 1: Program Selector */}
                {step === "program" && (
                    <div>
                        <p className="text-lg font-black uppercase tracking-tight mb-8 text-slate-600">Step 1: Choose Your Program</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {roadmapData.map(prog => (
                                <button
                                    key={prog.id}
                                    onClick={() => handleProgramSelect(prog.id)}
                                    className="bg-slate-50 border-4 border-foreground p-10 text-left hover:bg-primary hover:text-white transition-all group shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 active:scale-95"
                                >
                                    <div className="text-6xl mb-4">{prog.emoji}</div>
                                    <div className="text-3xl font-black uppercase tracking-tighter mb-2">{prog.title}</div>
                                    <div className="text-sm font-bold text-slate-500 group-hover:text-white/80">
                                        {prog.specializations.length} specializations
                                    </div>
                                    <ChevronRight className="w-6 h-6 mt-4 group-hover:translate-x-2 transition-transform" />
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* STEP 2: Specialization Selector */}
                {step === "specialization" && program && (
                    <div>
                        <p className="text-lg font-black uppercase tracking-tight mb-8 text-slate-600">
                            Step 2: Choose Your {program.title} Specialization
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {program.specializations.map(spec => (
                                <button
                                    key={spec.id}
                                    onClick={() => handleSpecSelect(spec)}
                                    className="bg-slate-50 border-4 border-foreground p-6 text-left hover:bg-foreground hover:text-white transition-all group shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                                >
                                    <div className="text-4xl mb-3">{spec.emoji}</div>
                                    <div className="text-base font-black uppercase tracking-tight leading-tight mb-1">{spec.title}</div>
                                    <div className="text-[11px] font-bold text-slate-500 group-hover:text-white/70 leading-snug line-clamp-2">{spec.description}</div>
                                    <ChevronRight className="w-5 h-5 mt-3 group-hover:translate-x-1 transition-transform text-primary group-hover:text-white" />
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* STEP 3: Lead Gate */}
                {step === "locked" && selectedSpec && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <div className="text-5xl mb-4">{selectedSpec.emoji}</div>
                            <h3 className="text-3xl font-black uppercase tracking-tighter mb-3">{selectedSpec.title} Roadmap</h3>
                            <p className="font-bold text-slate-600 mb-6 leading-relaxed">{selectedSpec.description}</p>
                            <div className="space-y-3">
                                {[
                                    `${selectedSpec.skills.length} Skills to master`,
                                    `${selectedSpec.certifications.length} Top certifications`,
                                    `${selectedSpec.companies.length} Top companies`,
                                    `${selectedSpec.careerPaths.length} Career paths with salaries`,
                                ].map(item => (
                                    <div key={item} className="flex items-center gap-3">
                                        <div className="w-5 h-5 bg-primary flex-shrink-0 flex items-center justify-center">
                                            <Lock className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-sm font-bold text-slate-600">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-foreground text-white p-8 border-b-[12px] border-primary relative overflow-hidden">
                            <div className="absolute -top-4 -right-4 opacity-5">
                                <Zap className="w-48 h-48" />
                            </div>
                            <div className="relative z-10">
                                <h4 className="text-2xl font-black uppercase mb-1">Unlock Your Roadmap</h4>
                                <p className="text-slate-400 text-sm font-bold mb-6">Free — takes 10 seconds</p>
                                <form onSubmit={handleLeadSubmit} className="space-y-4">
                                    <input required type="text" placeholder="Full Name" value={leadData.name}
                                        onChange={e => setLeadData({ ...leadData, name: e.target.value })}
                                        className="w-full bg-white/10 border-2 border-white/20 p-3 font-bold text-white placeholder:text-white/40 focus:outline-none focus:border-primary" />
                                    <input required type="tel" placeholder="WhatsApp Number" value={leadData.number}
                                        onChange={e => setLeadData({ ...leadData, number: e.target.value })}
                                        className="w-full bg-white/10 border-2 border-white/20 p-3 font-bold text-white placeholder:text-white/40 focus:outline-none focus:border-primary" />
                                    <input required type="email" placeholder="Email Address" value={leadData.email}
                                        onChange={e => setLeadData({ ...leadData, email: e.target.value })}
                                        className="w-full bg-white/10 border-2 border-white/20 p-3 font-bold text-white placeholder:text-white/40 focus:outline-none focus:border-primary" />
                                    <input required type="text" placeholder="Location (City)" value={leadData.location}
                                        onChange={e => setLeadData({ ...leadData, location: e.target.value })}
                                        className="w-full bg-white/10 border-2 border-white/20 p-3 font-bold text-white placeholder:text-white/40 focus:outline-none focus:border-primary" />
                                    <button type="submit" disabled={submitting}
                                        className="w-full bg-primary text-white p-4 font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white hover:text-primary transition-all disabled:opacity-50">
                                        {submitting ? "Processing..." : <><Send className="w-5 h-5" /> Show My Roadmap</>}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 4: Results */}
                {step === "result" && selectedSpec && program && (
                    <div>
                        {/* Result Header */}
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10 p-6 bg-primary text-white border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            <div className="text-5xl">{selectedSpec.emoji}</div>
                            <div className="flex-1">
                                <div className="text-xs font-black uppercase tracking-widest opacity-70 mb-1">{program.title} Specialization</div>
                                <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">{selectedSpec.title} Roadmap</h3>
                                <p className="text-sm text-white/70 font-bold mt-1">{selectedSpec.description}</p>
                            </div>
                            <CheckCircle2 className="w-10 h-10 text-white opacity-80 flex-shrink-0" />
                        </div>

                        {/* Tab Navigation */}
                        <div className="flex border-4 border-foreground bg-slate-100 p-2 gap-2 mb-8 flex-wrap">
                            {([
                                { id: "skills", label: "Skills", icon: <BookOpen className="w-4 h-4" /> },
                                { id: "certs", label: "Certifications", icon: <Award className="w-4 h-4" /> },
                                { id: "companies", label: "Top Companies", icon: <Building2 className="w-4 h-4" /> },
                                { id: "careers", label: "Career Paths", icon: <TrendingUp className="w-4 h-4" /> },
                            ] as const).map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex-1 py-3 px-3 font-black uppercase text-xs transition-all flex items-center justify-center gap-2 border-2 min-w-[120px] ${activeTab === tab.id ? "bg-foreground text-white border-foreground" : "bg-white text-foreground border-transparent hover:border-slate-300"}`}
                                >
                                    {tab.icon} <span className="hidden sm:inline">{tab.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Skills Tab */}
                        {activeTab === "skills" && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                                            <span className="w-3 h-3 bg-blue-500 inline-block" /> Technical Skills
                                        </h4>
                                        <div className="space-y-2">
                                            {selectedSpec.skills.filter(s => s.type === "technical").map(skill => (
                                                <div key={skill.name} className="flex items-center gap-3 bg-blue-50 border-2 border-blue-200 p-3">
                                                    <div className="w-2 h-2 bg-blue-500 flex-shrink-0" />
                                                    <span className="font-bold text-sm text-blue-900">{skill.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                                            <span className="w-3 h-3 bg-amber-500 inline-block" /> Soft Skills
                                        </h4>
                                        <div className="space-y-2">
                                            {selectedSpec.skills.filter(s => s.type === "soft").map(skill => (
                                                <div key={skill.name} className="flex items-center gap-3 bg-amber-50 border-2 border-amber-200 p-3">
                                                    <div className="w-2 h-2 bg-amber-500 flex-shrink-0" />
                                                    <span className="font-bold text-sm text-amber-900">{skill.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Certifications Tab */}
                        {activeTab === "certs" && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-4">
                                {selectedSpec.certifications.map((cert, i) => (
                                    <div key={cert.name} className="flex items-start gap-4 bg-white border-4 border-foreground p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                                        <div className="w-10 h-10 bg-primary text-white font-black flex items-center justify-center border-2 border-foreground flex-shrink-0 text-lg">
                                            {i + 1}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-black text-base leading-tight">{cert.name}</div>
                                            <div className="text-sm font-bold text-slate-500 mt-1">by {cert.provider}</div>
                                        </div>
                                        <span className={`text-xs font-black uppercase px-2 py-1 border ${levelColor(cert.level)}`}>
                                            {cert.level}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Companies Tab */}
                        {activeTab === "companies" && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {selectedSpec.companies.map(company => (
                                        <div key={company.name} className="flex items-center gap-4 bg-slate-50 border-4 border-foreground p-5">
                                            <div className="w-10 h-10 bg-foreground text-white font-black text-lg flex items-center justify-center border-2 border-foreground flex-shrink-0">
                                                {company.name[0]}
                                            </div>
                                            <div>
                                                <div className="font-black text-sm">{company.name}</div>
                                                <div className="text-xs font-bold text-primary uppercase">{company.sector}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Career Paths Tab */}
                        {activeTab === "careers" && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-4">
                                {selectedSpec.careerPaths.map((path, i) => (
                                    <div key={path.role} className="flex items-center justify-between gap-4 bg-white border-4 border-foreground p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-2 h-12 flex-shrink-0 ${i % 2 === 0 ? "bg-primary" : "bg-amber-400"}`} />
                                            <div>
                                                <div className="font-black text-base">{path.role}</div>
                                                <div className="text-xs font-bold text-slate-500 uppercase mt-0.5">Avg. Package</div>
                                            </div>
                                        </div>
                                        <div className="text-lg font-black text-primary text-right flex-shrink-0">{path.avgSalary}</div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* CTA Footer */}
                        <div className="mt-10 bg-foreground text-white p-8 border-4 border-primary flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <div className="text-xs font-black uppercase tracking-widest text-primary mb-1">Want Expert Guidance?</div>
                                <div className="text-2xl font-black uppercase leading-tight">Get a Personalized Career Plan</div>
                                <p className="text-slate-400 font-bold text-sm mt-1">Talk to Mohit Jain — MBA admissions & career expert</p>
                            </div>
                            <a
                                href="/inquiry"
                                className="bg-primary text-white border-4 border-white px-8 py-4 font-black uppercase tracking-widest hover:bg-white hover:text-primary transition-all flex items-center gap-3 flex-shrink-0"
                            >
                                <Zap className="w-5 h-5" /> Book Free Call
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
