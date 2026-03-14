"use client";

import { useState } from "react";
import { certificationData, Certification, CertSpecialization } from "@/data/certificationData";
import {
    ChevronRight, ArrowLeft, Zap, Send, CheckCircle2, 
    Award, Clock, BarChart3, Plus, Minus, Info
} from "lucide-react";

export function CertificationCalculator() {
    const [step, setStep] = useState<"program" | "specialization" | "result">("program");
    const [selectedProgram, setSelectedProgram] = useState<"mba" | "pgdm" | "btech" | null>(null);
    const [selectedSpec, setSelectedSpec] = useState<CertSpecialization | null>(null);
    const [expandedCert, setExpandedCert] = useState<string | null>(null);

    // Lead form state
    const [leadData, setLeadData] = useState({ name: "", number: "", email: "" });
    const [submitting, setSubmitting] = useState(false);

    const handleProgramSelect = (id: "mba" | "pgdm" | "btech") => {
        setSelectedProgram(id);
        setStep("specialization");
    };

    const handleSpecSelect = (spec: CertSpecialization) => {
        setSelectedSpec(spec);
        setStep("result");
    };

    const handleLeadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            await fetch('https://cloud.activepieces.com/api/v1/webhooks/wjKhP0jGALa4bmUVYcw5F', {
                method: "POST",
                mode: 'cors',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...leadData,
                    source: `Certification Calculator - ${selectedProgram?.toUpperCase()} ${selectedSpec?.title}`,
                    timestamp: new Date().toISOString()
                }),
            });
            alert("Thank you! Our expert will contact you soon.");
        } catch (e) {
            console.error('Webhook Error:', e);
        } finally {
            setSubmitting(false);
        }
    };

    const reset = () => {
        setStep("program");
        setSelectedProgram(null);
        setSelectedSpec(null);
        setExpandedCert(null);
    };

    return (
        <div className="w-full max-w-4xl mx-auto font-body">
            <div className="bg-white border-[8px] border-foreground shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-6 md:p-10">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10 border-b-4 border-foreground pb-8">
                    <div className="bg-amber-400 p-4 border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] w-fit rotate-3">
                        <Award className="w-10 h-10 text-foreground" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none mb-2">
                            MBA Certification Calculator
                        </h2>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                            Find the best certifications for your {selectedProgram?.toUpperCase() || "MBA/PGDM"} career
                        </p>
                    </div>
                    {step !== "program" && (
                        <button onClick={reset} className="flex items-center gap-2 text-xs font-black uppercase text-primary hover:underline">
                            <ArrowLeft className="w-4 h-4" /> Start Over
                        </button>
                    )}
                </div>

                {/* STEP 1: Program Selection */}
                {step === "program" && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <p className="text-lg font-black uppercase tracking-tight mb-8 text-slate-600 italic">Step 1: Select Your Degree</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {["mba", "pgdm", "btech"].map((prog) => (
                                <button
                                    key={prog}
                                    onClick={() => handleProgramSelect(prog as "mba" | "pgdm" | "btech")}
                                    className="bg-white border-4 border-foreground p-12 text-center hover:bg-primary hover:text-white transition-all group shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1"
                                >
                                    <div className="text-4xl font-black uppercase tracking-tighter mb-2">{prog}</div>
                                    <div className="text-xs font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100">
                                        {prog === "btech" ? "Engineering Track" : "Professional Track"}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* STEP 2: Specialization Selection */}
                {step === "specialization" && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <p className="text-lg font-black uppercase tracking-tight mb-8 text-slate-600 italic">Step 2: Choose Your {selectedProgram?.toUpperCase()} Specialization</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {certificationData
                                .filter(s => s.programId === selectedProgram)
                                .map((spec) => (
                                    <button
                                        key={spec.id}
                                        onClick={() => handleSpecSelect(spec)}
                                        className="bg-slate-50 border-4 border-foreground p-6 text-left hover:bg-foreground hover:text-white transition-all group shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                                    >
                                        <div className="text-4xl mb-4">{spec.emoji}</div>
                                        <div className="text-xl font-black uppercase tracking-tight leading-none mb-2">{spec.title}</div>
                                        <div className="text-[11px] font-bold text-slate-500 group-hover:text-white/70 leading-relaxed line-clamp-2">
                                            {spec.description}
                                        </div>
                                        <ChevronRight className="w-6 h-6 mt-4 text-primary group-hover:text-white transition-transform group-hover:translate-x-2" />
                                    </button>
                                ))}
                        </div>
                    </div>
                )}

                {/* STEP 3: Results */}
                {step === "result" && selectedSpec && (
                    <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
                        <div className="bg-foreground text-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_#FFA500] mb-10 flex flex-col md:flex-row items-center gap-6">
                            <div className="text-6xl">{selectedSpec.emoji}</div>
                            <div className="flex-1">
                                <h3 className="text-3xl font-black uppercase tracking-tighter leading-none mb-2">Recommended for {selectedSpec.title}</h3>
                                <p className="text-sm font-bold text-slate-400">Essential certifications to boost your ROI and career growth.</p>
                            </div>
                            <CheckCircle2 className="w-12 h-12 text-primary" />
                        </div>

                        <div className="space-y-8">
                            {selectedSpec.certifications.map((cert) => (
                                <div key={cert.name} className="border-4 border-foreground bg-white overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                                    <div className="p-6 border-b-4 border-foreground flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`text-[10px] font-black uppercase px-2 py-0.5 border-2 border-foreground bg-slate-100`}>
                                                    {cert.level}
                                                </span>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                                                    <Clock className="w-3 h-3" /> {cert.duration}
                                                </span>
                                            </div>
                                            <h4 className="text-2xl font-black uppercase tracking-tight leading-tight">{cert.name}</h4>
                                            <p className="text-sm font-bold text-primary italic">Provided by {cert.provider}</p>
                                        </div>
                                        <button 
                                            onClick={() => setExpandedCert(expandedCert === cert.name ? null : cert.name)}
                                            className="bg-foreground text-white px-4 py-2 font-black uppercase text-xs flex items-center gap-2 hover:bg-primary transition-colors"
                                        >
                                            {expandedCert === cert.name ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                            {expandedCert === cert.name ? "Less Details" : "View Pros/Cons"}
                                        </button>
                                    </div>

                                    {expandedCert === cert.name && (
                                        <div className="p-6 bg-slate-50 animate-in slide-in-from-top-2 duration-300">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                                                <div>
                                                    <h5 className="text-sm font-black uppercase tracking-widest text-green-600 mb-3 flex items-center gap-2">
                                                        <Plus className="w-4 h-4" /> Pros
                                                    </h5>
                                                    <ul className="space-y-2">
                                                        {cert.pros.map((pro, i) => (
                                                            <li key={i} className="text-sm font-bold text-slate-700 flex items-start gap-2">
                                                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                                                                {pro}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h5 className="text-sm font-black uppercase tracking-widest text-red-500 mb-3 flex items-center gap-2">
                                                        <Minus className="w-4 h-4" /> Cons
                                                    </h5>
                                                    <ul className="space-y-2">
                                                        {cert.cons.map((con, i) => (
                                                            <li key={i} className="text-sm font-bold text-slate-700 flex items-start gap-2">
                                                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 flex-shrink-0" />
                                                                {con}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="bg-primary/10 border-2 border-primary p-4 flex items-start gap-3">
                                                <BarChart3 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                                <p className="text-sm font-black text-foreground">
                                                    <span className="uppercase italic mr-2">ROI Analysis:</span>
                                                    {cert.roi}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* CTA / Lead Form */}
                        <div className="mt-16 p-8 border-4 border-foreground bg-amber-400 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                            <div className="absolute -right-10 -top-10 opacity-10 rotate-12">
                                <Award className="w-64 h-64" />
                            </div>
                            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                                <div>
                                    <h4 className="text-3xl font-black uppercase tracking-tighter leading-none mb-4">Want a Personalized Study Plan?</h4>
                                    <p className="text-sm font-bold text-foreground mb-6 leading-relaxed">
                                        Selecting the right certification depends on your previous background and future goals. Get a 1:1 consultation with Mohit Jain.
                                    </p>
                                    <div className="flex items-center gap-3 text-xs font-black uppercase">
                                        <div className="flex -space-x-2">
                                            {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-foreground bg-slate-200" />)}
                                        </div>
                                        <span>500+ Students Guided</span>
                                    </div>
                                </div>
                                <form onSubmit={handleLeadSubmit} className="space-y-4">
                                    <input required type="text" placeholder="Full Name" value={leadData.name}
                                        onChange={e => setLeadData({ ...leadData, name: e.target.value })}
                                        className="w-full bg-white border-4 border-foreground p-3 font-bold placeholder:text-slate-400 focus:outline-none focus:ring-0" />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input required type="tel" placeholder="WhatsApp Number" value={leadData.number}
                                            onChange={e => setLeadData({ ...leadData, number: e.target.value })}
                                            className="w-full bg-white border-4 border-foreground p-3 font-bold placeholder:text-slate-400 focus:outline-none focus:ring-0" />
                                        <input required type="email" placeholder="Email Address" value={leadData.email}
                                            onChange={e => setLeadData({ ...leadData, email: e.target.value })}
                                            className="w-full bg-white border-4 border-foreground p-3 font-bold placeholder:text-slate-400 focus:outline-none focus:ring-0" />
                                    </div>
                                    <button type="submit" disabled={submitting}
                                        className="w-full bg-foreground text-white p-5 font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white hover:text-foreground transition-all disabled:opacity-50 border-4 border-transparent hover:border-foreground">
                                        {submitting ? "Processing..." : <><Send className="w-5 h-5" /> Get Expert Advice</>}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
