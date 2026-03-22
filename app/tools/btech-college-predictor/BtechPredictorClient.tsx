"use client";

import { useState, useMemo } from "react";
import { 
    Search, SlidersHorizontal, MapPin, 
    ArrowUpRight, School, Star, Zap, 
    ChevronRight, Filter, Info, Loader2, Sparkles,
    ShieldCheck, Target, TrendingUp, BookOpen, Cpu
} from "lucide-react";
import Link from "next/link";

interface College {
    name: string;
    location: string;
    cutoff: number; // JEE Main Percentile
    tier: "Top" | "Upper-Mid" | "Mid" | "Emerging";
    zone: "North" | "South" | "East" | "West";
    link?: string;
}

const BTECH_COLLEGES: College[] = [
    // Top Tier (95+)
    { name: "DTU Delhi", location: "Delhi", cutoff: 98.5, tier: "Top", zone: "North" },
    { name: "NSUT Delhi", location: "Delhi", cutoff: 98.2, tier: "Top", zone: "North" },
    { name: "IIIT Delhi", location: "Delhi", cutoff: 97.5, tier: "Top", zone: "North" },
    { name: "NIT Trichy", location: "Trichy", cutoff: 99.2, tier: "Top", zone: "South" },
    { name: "NIT Surathkal", location: "Surathkal", cutoff: 99.0, tier: "Top", zone: "South" },
    { name: "COEP Pune", location: "Pune", cutoff: 98.0, tier: "Top", zone: "West" },
    { name: "RVCE Bangalore", location: "Bangalore", cutoff: 96.5, tier: "Top", zone: "South" },
    
    // Upper Mid Tier (85-95)
    { name: "PEC Chandigarh", location: "Chandigarh", cutoff: 94.0, tier: "Upper-Mid", zone: "North" },
    { name: "PICT Pune", location: "Pune", cutoff: 95.0, tier: "Upper-Mid", zone: "West" },
    { name: "MAIT Delhi", location: "Delhi", cutoff: 91.0, tier: "Upper-Mid", zone: "North" },
    { name: "MSIT Delhi", location: "Delhi", cutoff: 89.0, tier: "Upper-Mid", zone: "North" },
    { name: "BMSCE Bangalore", location: "Bangalore", cutoff: 93.0, tier: "Upper-Mid", zone: "South" },
    { name: "MSRIT Bangalore", location: "Bangalore", cutoff: 92.0, tier: "Upper-Mid", zone: "South" },
    { name: "IGDTUW (Female)", location: "Delhi", cutoff: 93.5, tier: "Upper-Mid", zone: "North" },
    { name: "USICT Delhi", location: "Delhi", cutoff: 90.5, tier: "Upper-Mid", zone: "North" },
    
    // Mid Tier (70-85)
    { name: "BVCOE Delhi", location: "Delhi", cutoff: 86.0, tier: "Mid", zone: "North" },
    { name: "BPIT Delhi", location: "Delhi", cutoff: 84.0, tier: "Mid", zone: "North" },
    { name: "VIT Pune", location: "Pune", cutoff: 88.0, tier: "Mid", zone: "West" },
    { name: "AKGEC Ghaziabad", location: "Ghaziabad", cutoff: 82.0, tier: "Mid", zone: "North" },
    { name: "KIET Ghaziabad", location: "Ghaziabad", cutoff: 80.0, tier: "Mid", zone: "North" },
    { name: "PES University", location: "Bangalore", cutoff: 85.0, tier: "Mid", zone: "South" },
    { name: "ABES Ghaziabad", location: "Ghaziabad", cutoff: 75.0, tier: "Mid", zone: "North" },
    { name: "GL Bajaj Noida", location: "Noida", cutoff: 72.0, tier: "Mid", zone: "North" },
    
    // Emerging (60-70)
    { name: "GNIOT Greater Noida", location: "Noida", cutoff: 62.0, tier: "Emerging", zone: "North" },
    { name: "NIET Greater Noida", location: "Noida", cutoff: 65.0, tier: "Emerging", zone: "North" },
    { name: "HMRITM Delhi", location: "Delhi", cutoff: 68.0, tier: "Emerging", zone: "North" },
    { name: "GTBIT Delhi", location: "Delhi", cutoff: 70.0, tier: "Emerging", zone: "North" },
    { name: "ADGITM Delhi", location: "Delhi", cutoff: 68.0, tier: "Emerging", zone: "North" }
];

export default function BtechPredictorClient() {
    const [percentile, setPercentile] = useState<number>(85);
    const [selectedZone, setSelectedZone] = useState<string>("All");
    const [isCalculating, setIsCalculating] = useState(false);

    const predictions = useMemo(() => {
        const filtered = BTECH_COLLEGES.filter(c => selectedZone === "All" || c.zone === selectedZone);
        
        return {
            safe: filtered.filter(c => c.cutoff <= percentile - 3).sort((a, b) => b.cutoff - a.cutoff),
            target: filtered.filter(c => c.cutoff > percentile - 3 && c.cutoff <= percentile + 1).sort((a, b) => b.cutoff - a.cutoff),
            reach: filtered.filter(c => c.cutoff > percentile + 1 && c.cutoff <= percentile + 5).sort((a, b) => b.cutoff - a.cutoff)
        };
    }, [percentile, selectedZone]);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsCalculating(true);
        setPercentile(Number(e.target.value));
        setTimeout(() => setIsCalculating(false), 300);
    };

    return (
        <section className="py-24 px-6 max-w-7xl mx-auto -mt-16 relative z-30">
            {/* Control Panel */}
            <div className="bg-white rounded-[3rem] border-[6px] border-[#18181b] p-10 md:p-14 shadow-[24px_24px_0px_0px_rgba(234,179,8,1)]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-10">
                        <div>
                            <label className="text-sm font-black uppercase tracking-widest text-[#18181b] mb-6 block">
                                Your JEE Main Percentile (2026 Expectancy)
                            </label>
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-6xl font-black text-[#18181b] tabular-nums">{percentile}<span className="text-yellow-500 font-bold text-2xl">%ile</span></span>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400">Current Bracket</span>
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${
                                            percentile >= 95 ? "bg-yellow-100 text-yellow-600 border-2 border-yellow-500" :
                                            percentile >= 85 ? "bg-blue-100 text-blue-600 border-2 border-blue-500" :
                                            "bg-slate-100 text-slate-600 border-2 border-slate-500"
                                        }`}>
                                            {percentile >= 95 ? "Elite Tier (NIT/IIT Equiv)" : percentile >= 85 ? "Premium State/Private" : "Reputed Institute"}
                                        </span>
                                    </div>
                                </div>
                                <input 
                                    type="range" 
                                    min="50" 
                                    max="99.9" 
                                    step="0.1"
                                    value={percentile}
                                    onChange={handleSliderChange}
                                    className="w-full h-4 bg-slate-100 rounded-full appearance-none cursor-pointer accent-yellow-500 border-2 border-slate-200"
                                />
                                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <span>50%ile</span>
                                    <span>75%ile</span>
                                    <span>99%ile</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-black uppercase tracking-widest text-[#18181b] mb-4 block">Preferred Region</label>
                            <div className="flex flex-wrap gap-2">
                                {["All", "North", "South", "East", "West"].map(zone => (
                                    <button
                                        key={zone}
                                        onClick={() => setSelectedZone(zone)}
                                        className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-tighter transition-all border-2 ${
                                            selectedZone === zone 
                                            ? "bg-[#18181b] text-white border-[#18181b] shadow-[4px_4px_0px_0px_rgba(234,179,8,1)]" 
                                            : "bg-transparent text-slate-500 border-slate-200 hover:border-yellow-500 hover:text-yellow-500"
                                        }`}
                                    >
                                        {zone}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-[2rem] p-8 border-4 border-[#18181b] relative group overflow-hidden shadow-[8px_8px_0px_0px_rgba(234,179,8,1)]">
                        <div className="absolute top-0 right-0 p-6 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity text-yellow-500">
                            <Cpu className="w-20 h-20" />
                        </div>
                        <h4 className="text-lg font-black uppercase mb-4 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-yellow-500" />
                            B.Tech Analysis
                        </h4>
                        <p className="text-sm font-bold text-slate-600 leading-relaxed mb-6">
                            Based on your {percentile} percentile, we found {predictions.safe.length + predictions.target.length + predictions.reach.length} engineering colleges matching your profile.
                        </p>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-black text-[#18181b]">{predictions.safe.length}</div>
                                <div className="text-[8px] font-black uppercase text-emerald-500 tracking-widest">Safe</div>
                            </div>
                            <div className="text-center border-x-2 border-slate-200">
                                <div className="text-2xl font-black text-[#18181b]">{predictions.target.length}</div>
                                <div className="text-[8px] font-black uppercase text-blue-500 tracking-widest">Target</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-black text-[#18181b]">{predictions.reach.length}</div>
                                <div className="text-[8px] font-black uppercase text-amber-500 tracking-widest">Reach</div>
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
                            <h2 className="text-2xl font-black uppercase tracking-tight">Choice Selection</h2>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Colleges you should prioritize in counselling</p>
                        </div>
                    </div>
                    {predictions.target.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {predictions.target.map((c, i) => (
                                <CollegeCard key={i} college={c} type="target" />
                            ))}
                        </div>
                    ) : (
                        <EmptyState message="No ideal target engineering colleges in this percentile range. Try adjusting your region filter." />
                    )}
                </section>

                {/* Safe Section */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black uppercase tracking-tight">Backup Options</h2>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">High probability of getting CS/IT branches here</p>
                        </div>
                    </div>
                    {predictions.safe.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {predictions.safe.map((c, i) => (
                                <CollegeCard key={i} college={c} type="safe" />
                            ))}
                        </div>
                    ) : (
                        <EmptyState message="Aim for a higher percentile to unlock safe options in Tier-1/Tier-2 autonomous institutes." />
                    )}
                </section>

                {/* Reach Section */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black uppercase tracking-tight">Dream Stretch</h2>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Ambitious colleges - ممکن ہے but cutoff may vary</p>
                        </div>
                    </div>
                    {predictions.reach.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {predictions.reach.map((c, i) => (
                                <CollegeCard key={i} college={c} type="reach" />
                            ))}
                        </div>
                    ) : (
                        <EmptyState message="You're already at the top tier! Almost all premium colleges are within your reach." />
                    )}
                </section>
            </div>
        </section>
    );
}

function CollegeCard({ college, type }: { college: College, type: "safe" | "target" | "reach" }) {
    return (
        <div className="group bg-white p-6 rounded-[2rem] border-4 border-[#18181b] hover:shadow-[12px_12px_0px_0px_rgba(234,179,8,1)] transition-all flex flex-col h-full relative overflow-hidden">
            <div className={`absolute top-0 right-0 px-4 py-1.5 rounded-bl-3xl text-[9px] font-black uppercase tracking-tighter ${
                type === "safe" ? "bg-emerald-500 text-white" : 
                type === "target" ? "bg-blue-500 text-white" : 
                "bg-amber-500 text-white"
            }`}>
                {type}
            </div>
            
            <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-100 transition-colors border-2 border-slate-100 group-hover:border-yellow-500">
                    <School className="w-6 h-6 text-slate-900 group-hover:text-yellow-600 transition-colors" />
                </div>
                <div>
                    <h3 className="text-base font-black uppercase leading-tight group-hover:text-yellow-600 transition-colors">{college.name}</h3>
                    <div className="flex items-center gap-1.5 mt-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{college.location} | {college.zone}</span>
                    </div>
                </div>
            </div>

            <div className="mt-auto space-y-4 pt-4 border-t-2 border-slate-50">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black uppercase text-slate-400">JEE Cutoff</span>
                        <span className="font-black text-slate-900">{college.cutoff}%ile</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[9px] font-black uppercase text-slate-400">Class</span>
                        <span className="font-black text-slate-900">{college.tier}</span>
                    </div>
                </div>
                <Link href="/inquiry" className={`w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 border-2 border-[#18181b] ${
                    type === "safe" ? "bg-emerald-500 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-y-0 active:translate-y-1" :
                    type === "target" ? "bg-blue-500 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-y-0 active:translate-y-1" :
                    "bg-[#18181b] text-white shadow-[4px_4px_10px_0px_rgba(234,179,8,1)] hover:shadow-none translate-y-0 active:translate-y-1"
                }`}>
                    Secure Admission <ArrowUpRight className="w-3 h-3" />
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
