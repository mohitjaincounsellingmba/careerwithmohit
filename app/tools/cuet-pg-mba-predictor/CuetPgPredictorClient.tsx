"use client";

import { useState, useMemo } from "react";
import { 
    Search, SlidersHorizontal, MapPin, 
    ArrowUpRight, School, Star, Zap, 
    ChevronRight, Filter, Info, Loader2, Sparkles,
    ShieldCheck, Target, TrendingUp, BookOpen, GraduationCap
} from "lucide-react";
import Link from "next/link";

interface College {
    name: string;
    location: string;
    cutoff: number; // Raw Score out of 300 (Expected 2026)
    program: string;
    tier: "Elite" | "Top" | "Mid" | "Emerging";
    zone: "North" | "South" | "East" | "West";
    link?: string;
}

const CUET_MBA_COLLEGES: College[] = [
    // Elite Tier (220+)
    { name: "TISS Mumbai (HRM & LR)", location: "Mumbai", cutoff: 245, program: "MBA Equiv (M.A.)", tier: "Elite", zone: "West" },
    { name: "Delhi University (FMS)", location: "Delhi", cutoff: 235, program: "MBA (Exec/PG)", tier: "Elite", zone: "North" },
    { name: "Jawaharlal Nehru University (JNU)", location: "Delhi", cutoff: 220, program: "MBA", tier: "Elite", zone: "North" },
    { name: "TISS Mumbai (ODCL)", location: "Mumbai", cutoff: 225, program: "M.A.", tier: "Elite", zone: "West" },
    
    // Top Tier (180-220)
    { name: "Banaras Hindu University (BHU)", location: "Varanasi", cutoff: 210, program: "MBA / MBA-IB", tier: "Top", zone: "North" },
    { name: "University of Hyderabad", location: "Hyderabad", cutoff: 195, program: "MBA", tier: "Top", zone: "South" },
    { name: "DAVV (IMS Indore)", location: "Indore", cutoff: 190, program: "MBA", tier: "Top", zone: "West" },
    { name: "TISS (Tuljapur/Hyderabad)", location: "Multi", cutoff: 185, program: "M.A. (Dev Studies)", tier: "Top", zone: "South" },
    { name: "Pondicherry University", location: "Pondicherry", cutoff: 180, program: "MBA", tier: "Top", zone: "South" },
    
    // Mid Tier (140-180)
    { name: "DAVV (School of Commerce)", location: "Indore", cutoff: 165, program: "MBA", tier: "Mid", zone: "West" },
    { name: "Babasaheb Bhimrao Ambedkar University", location: "Lucknow", cutoff: 160, program: "MBA", tier: "Mid", zone: "North" },
    { name: "Central University of Rajasthan", location: "Ajmer", cutoff: 155, program: "MBA", tier: "Mid", zone: "North" },
    { name: "Central University of Haryana", location: "Mahendergarh", cutoff: 150, program: "MBA", tier: "Mid", zone: "North" },
    { name: "Visva Bharati University", location: "Santiniketan", cutoff: 145, program: "MBA", tier: "Mid", zone: "East" },
    { name: "Central University of Punjab", location: "Bathinda", cutoff: 140, program: "MBA", tier: "Mid", zone: "North" },
    
    // Emerging (100-140)
    { name: "Tezpur University", location: "Assam", cutoff: 130, program: "MBA", tier: "Emerging", zone: "East" },
    { name: "Mizoram University", location: "Aizawl", cutoff: 120, program: "MBA", tier: "Emerging", zone: "East" },
    { name: "Nagaland University", location: "Kohima", cutoff: 110, program: "MBA", tier: "Emerging", zone: "East" },
    { name: "Central University of Kerala", location: "Kasaragod", cutoff: 135, program: "MBA", tier: "Emerging", zone: "South" },
    { name: "Harcourt Butler Technical University", location: "Kanpur", cutoff: 130, program: "MBA", tier: "Emerging", zone: "North" }
];

export default function CuetPgPredictorClient() {
    const [score, setScore] = useState<number>(200);
    const [selectedZone, setSelectedZone] = useState<string>("All");
    const [isCalculating, setIsCalculating] = useState(false);

    const predictions = useMemo(() => {
        const filtered = CUET_MBA_COLLEGES.filter(c => selectedZone === "All" || c.zone === selectedZone);
        
        return {
            safe: filtered.filter(c => c.cutoff <= score - 20).sort((a, b) => b.cutoff - a.cutoff),
            target: filtered.filter(c => c.cutoff > score - 20 && c.cutoff <= score + 5).sort((a, b) => b.cutoff - a.cutoff),
            reach: filtered.filter(c => c.cutoff > score + 5 && c.cutoff <= score + 25).sort((a, b) => b.cutoff - a.cutoff)
        };
    }, [score, selectedZone]);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsCalculating(true);
        setScore(Number(e.target.value));
        setTimeout(() => setIsCalculating(false), 300);
    };

    return (
        <section className="py-24 px-6 max-w-7xl mx-auto -mt-16 relative z-30">
            {/* Control Panel */}
            <div className="bg-white rounded-[3rem] border-[6px] border-[#18181b] p-10 md:p-14 shadow-[24px_24px_0px_0px_rgba(37,99,235,1)]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-10">
                        <div>
                            <label className="text-sm font-black uppercase tracking-widest text-[#18181b] mb-6 block">
                                Your CUET PG Raw Score (Out of 300)
                            </label>
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-6xl font-black text-[#18181b] tabular-nums">{score}<span className="text-primary font-bold text-2xl">/300</span></span>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400">Predicted Percentile</span>
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${
                                            score >= 230 ? "bg-emerald-100 text-emerald-600 border-2 border-emerald-500" :
                                            score >= 180 ? "bg-blue-100 text-blue-600 border-2 border-blue-500" :
                                            "bg-amber-100 text-amber-600 border-2 border-amber-500"
                                        }`}>
                                            ~{score >= 230 ? "99.5+" : score >= 180 ? "95+" : "85+"} Percentile
                                        </span>
                                    </div>
                                </div>
                                <input 
                                    type="range" 
                                    min="50" 
                                    max="300" 
                                    step="1"
                                    value={score}
                                    onChange={handleSliderChange}
                                    className="w-full h-4 bg-slate-100 rounded-full appearance-none cursor-pointer accent-primary border-2 border-slate-200"
                                />
                                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <span>50 MARKS</span>
                                    <span>175 MARKS</span>
                                    <span>300 MARKS</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-black uppercase tracking-widest text-[#18181b] mb-4 block">Regional Filter</label>
                            <div className="flex flex-wrap gap-2">
                                {["All", "North", "South", "East", "West"].map(zone => (
                                    <button
                                        key={zone}
                                        onClick={() => setSelectedZone(zone)}
                                        className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-tighter transition-all border-2 ${
                                            selectedZone === zone 
                                            ? "bg-[#18181b] text-white border-[#18181b] shadow-[4px_4px_0px_0px_rgba(37,99,235,1)]" 
                                            : "bg-transparent text-slate-500 border-slate-200 hover:border-primary hover:text-primary"
                                        }`}
                                    >
                                        {zone}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-[2rem] p-8 border-4 border-[#18181b] relative group overflow-hidden shadow-[8px_8px_0px_0px_rgba(37,99,235,1)]">
                        <div className="absolute top-0 right-0 p-6 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity text-primary">
                            <GraduationCap className="w-20 h-20" />
                        </div>
                        <h4 className="text-lg font-black uppercase mb-4 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-primary" />
                            Admission Odds
                        </h4>
                        <p className="text-sm font-bold text-slate-600 leading-relaxed mb-6">
                            Analyzing {score} marks: Found {predictions.safe.length + predictions.target.length + predictions.reach.length} CUET PG Central Universities for your rank.
                        </p>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-black text-[#18181b]">{predictions.safe.length}</div>
                                <div className="text-[8px] font-black uppercase text-emerald-500 tracking-widest">Safe Call</div>
                            </div>
                            <div className="text-center border-x-2 border-slate-200">
                                <div className="text-2xl font-black text-[#18181b]">{predictions.target.length}</div>
                                <div className="text-[8px] font-black uppercase text-blue-500 tracking-widest">Core Target</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-black text-[#18181b]">{predictions.reach.length}</div>
                                <div className="text-[8px] font-black uppercase text-amber-500 tracking-widest">Ambitious</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Grid */}
            <div className="mt-24 space-y-16">
                {/* Target Section */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                            <Target className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black uppercase tracking-tight">University Target Zone</h2>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Highly likely convert based on current Trends</p>
                        </div>
                    </div>
                    {predictions.target.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {predictions.target.map((c, i) => (
                                <CollegeCard key={i} college={c} type="target" />
                            ))}
                        </div>
                    ) : (
                        <EmptyState message="No ideal target universities in this score range. Try a higher score prediction." />
                    )}
                </section>

                {/* Safe Section */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black uppercase tracking-tight">Safety Net</h2>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">High probability Backup Options</p>
                        </div>
                    </div>
                    {predictions.safe.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {predictions.safe.map((c, i) => (
                                <CollegeCard key={i} college={c} type="safe" />
                            ))}
                        </div>
                    ) : (
                        <EmptyState message="Your safety net will expand as you move towards higher scores (150+)." />
                    )}
                </section>

                {/* Reach Section */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black uppercase tracking-tight">Aspirant's Reach</h2>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Competitive institutes requiring a bit more score</p>
                        </div>
                    </div>
                    {predictions.reach.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {predictions.reach.map((c, i) => (
                                <CollegeCard key={i} college={c} type="reach" />
                            ))}
                        </div>
                    ) : (
                        <EmptyState message="You've reached the top tier! Almost every CUET central university is within your reach." />
                    )}
                </section>
            </div>
        </section>
    );
}

function CollegeCard({ college, type }: { college: College, type: "safe" | "target" | "reach" }) {
    return (
        <div className="group bg-white p-6 rounded-[2rem] border-4 border-[#18181b] hover:shadow-[12px_12px_0px_0px_rgba(37,99,235,1)] transition-all flex flex-col h-full relative overflow-hidden">
            <div className={`absolute top-0 right-0 px-4 py-1.5 rounded-bl-3xl text-[9px] font-black uppercase tracking-tighter ${
                type === "safe" ? "bg-emerald-500 text-white" : 
                type === "target" ? "bg-blue-500 text-white" : 
                "bg-amber-500 text-white"
            }`}>
                {type}
            </div>
            
            <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors border-2 border-slate-100 group-hover:border-primary">
                    <School className="w-6 h-6 text-slate-900 group-hover:text-primary transition-colors" />
                </div>
                <div>
                    <h3 className="text-base font-black uppercase leading-tight group-hover:text-primary transition-colors">{college.name}</h3>
                    <div className="flex items-center gap-1.5 mt-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{college.location} | {college.zone}</span>
                    </div>
                </div>
            </div>

            <div className="mt-auto space-y-4 pt-4 border-t-2 border-slate-50">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black uppercase text-slate-400">Course</span>
                        <span className="font-black text-slate-900 text-xs leading-none mt-1">{college.program}</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[9px] font-black uppercase text-slate-400">Exp. Cutoff</span>
                        <span className="font-black text-primary italic">{college.cutoff}+</span>
                    </div>
                </div>
                <Link href="/inquiry" className={`w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 border-2 border-[#18181b] outline-none ${
                    type === "safe" ? "bg-emerald-500 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-y-0 active:translate-y-1" :
                    type === "target" ? "bg-blue-500 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-y-0 active:translate-y-1" :
                    "bg-[#18181b] text-white shadow-[4px_4px_10px_0px_rgba(37,99,235,1)] hover:shadow-none translate-y-0 active:translate-y-1"
                }`}>
                    Secure TISS/BHU Seat <ArrowUpRight className="w-3 h-3" />
                </Link>
            </div>
        </div>
    );
}

function EmptyState({ message }: { message: string }) {
    return (
        <div className="bg-slate-50 border-4 border-dashed border-slate-200 rounded-[2rem] p-12 text-center text-slate-400 font-bold italic">
            {message}
        </div>
    );
}
