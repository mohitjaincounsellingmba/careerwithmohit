"use client";

import { useState, useMemo } from "react";
import { 
    Search, SlidersHorizontal, MapPin, 
    ArrowUpRight, School, Star, Zap, 
    ChevronRight, Filter, Info, Loader2, Sparkles,
    ShieldCheck, Target, TrendingUp
} from "lucide-react";
import Link from "next/link";

interface College {
    name: string;
    location: string;
    cutoff: number;
    tier: "Top" | "Upper-Mid" | "Mid" | "Emerging";
    zone: "North" | "South" | "East" | "West";
    link?: string;
}

const MAT_COLLEGES: College[] = [
    // Top Tier (95+)
    { name: "JBIMS Mumbai (MMS/MSc)", location: "Mumbai", cutoff: 99.5, tier: "Top", zone: "West" },
    { name: "PUMBA Pune", location: "Pune", cutoff: 98.0, tier: "Top", zone: "West" },
    { name: "XIME Bangalore", location: "Bangalore", cutoff: 95.0, tier: "Top", zone: "South" },
    { name: "BIMTECH Greater Noida", location: "Noida", cutoff: 95.0, tier: "Top", zone: "North" },
    { name: "Christ University (Main Campus)", location: "Bangalore", cutoff: 95.0, tier: "Top", zone: "South" },
    { name: "IPE Hyderabad", location: "Hyderabad", cutoff: 95.0, tier: "Top", zone: "South" },
    
    // Upper Mid Tier (85-95)
    { name: "NDIM Delhi (PGDM)", location: "Delhi", cutoff: 90.0, tier: "Upper-Mid", zone: "North" },
    { name: "JAGSOM", location: "Bangalore", cutoff: 90.0, tier: "Upper-Mid", zone: "South" },
    { name: "Alliance University", location: "Bangalore", cutoff: 90.0, tier: "Upper-Mid", zone: "South" },
    { name: "ITM Navi Mumbai", location: "Mumbai", cutoff: 88.0, tier: "Upper-Mid", zone: "West" },
    { name: "IMI Bhubaneswar", location: "Bhubaneswar", cutoff: 85.0, tier: "Upper-Mid", zone: "East" },
    { name: "Christ University (Delhi NCR)", location: "Ghaziabad", cutoff: 85.0, tier: "Upper-Mid", zone: "North" },
    { name: "XIME Kochi", location: "Kochi", cutoff: 85.0, tier: "Upper-Mid", zone: "South" },
    
    // Mid Tier (75-85)
    { name: "Jaipuria Institute (Noida/Lucknow)", location: "Noida", cutoff: 80.0, tier: "Mid", zone: "North" },
    { name: "JIMS Rohini", location: "Delhi", cutoff: 80.0, tier: "Mid", zone: "North" },
    { name: "Lexicon MILE", location: "Pune", cutoff: 75.0, tier: "Mid", zone: "West" },
    { name: "Atlas Skilltech University", location: "Mumbai", cutoff: 75.0, tier: "Mid", zone: "West" },
    { name: "PES University", location: "Bangalore", cutoff: 80.0, tier: "Mid", zone: "South" },
    { name: "IILM University", location: "Gurgaon", cutoff: 75.0, tier: "Mid", zone: "North" },
    { name: "JK Business School", location: "Gurgaon", cutoff: 75.0, tier: "Mid", zone: "North" },
    { name: "Balaji Institute (BIMM/BITM)", location: "Pune", cutoff: 80.0, tier: "Mid", zone: "West" },
    
    // Emerging (60-75)
    { name: "GNIOT Greater Noida", location: "Noida", cutoff: 65.0, tier: "Emerging", zone: "North" },
    { name: "GLBIMR Greater Noida", location: "Noida", cutoff: 65.0, tier: "Emerging", zone: "North" },
    { name: "Accurate Institute", location: "Noida", cutoff: 60.0, tier: "Emerging", zone: "North" },
    { name: "SCMS Cochin", location: "Kochi", cutoff: 70.0, tier: "Emerging", zone: "South" },
    { name: "ISBR Bangalore", location: "Bangalore", cutoff: 70.0, tier: "Emerging", zone: "South" },
    { name: "IMS Ghaziabad", location: "Ghaziabad", cutoff: 70.0, tier: "Emerging", zone: "North" }
];

export default function MatPredictorClient() {
    const [percentile, setPercentile] = useState<number>(85);
    const [selectedZone, setSelectedZone] = useState<string>("All");
    const [isCalculating, setIsCalculating] = useState(false);

    const predictions = useMemo(() => {
        const filtered = MAT_COLLEGES.filter(c => selectedZone === "All" || c.zone === selectedZone);
        
        return {
            safe: filtered.filter(c => c.cutoff <= percentile - 5).sort((a, b) => b.cutoff - a.cutoff),
            target: filtered.filter(c => c.cutoff > percentile - 5 && c.cutoff <= percentile).sort((a, b) => b.cutoff - a.cutoff),
            reach: filtered.filter(c => c.cutoff > percentile && c.cutoff <= percentile + 5).sort((a, b) => b.cutoff - a.cutoff)
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
            <div className="bg-white rounded-[3rem] border-[6px] border-[#1a1a2e] p-10 md:p-14 shadow-[24px_24px_0px_0px_rgba(26,26,46,1)]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-10">
                        <div>
                            <label className="text-sm font-black uppercase tracking-widest text-[#1a1a2e] mb-6 block">
                                Your MAT Percentile (2026 Expectancy)
                            </label>
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-6xl font-black text-[#1a1a2e] tabular-nums">{percentile}<span className="text-emerald-500 font-bold text-2xl">%ile</span></span>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400">Current Bracket</span>
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${
                                            percentile >= 95 ? "bg-purple-100 text-purple-600" :
                                            percentile >= 85 ? "bg-emerald-100 text-emerald-600" :
                                            "bg-blue-100 text-blue-600"
                                        }`}>
                                            {percentile >= 95 ? "Top Tier Elite" : percentile >= 85 ? "Premium B-School" : "Quality Professional"}
                                        </span>
                                    </div>
                                </div>
                                <input 
                                    type="range" 
                                    min="50" 
                                    max="99" 
                                    step="1"
                                    value={percentile}
                                    onChange={handleSliderChange}
                                    className="w-full h-4 bg-slate-100 rounded-full appearance-none cursor-pointer accent-emerald-500 border-2 border-slate-200"
                                />
                                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <span>50%ile</span>
                                    <span>75%ile</span>
                                    <span>99%ile</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-black uppercase tracking-widest text-[#1a1a2e] mb-4 block">Preferred Zone</label>
                            <div className="flex flex-wrap gap-2">
                                {["All", "North", "South", "East", "West"].map(zone => (
                                    <button
                                        key={zone}
                                        onClick={() => setSelectedZone(zone)}
                                        className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-tighter transition-all border-2 ${
                                            selectedZone === zone 
                                            ? "bg-[#1a1a2e] text-white border-[#1a1a2e] shadow-lg shadow-blue-900/20" 
                                            : "bg-transparent text-slate-500 border-slate-200 hover:border-emerald-500 hover:text-emerald-500"
                                        }`}
                                    >
                                        {zone}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-[2rem] p-8 border-2 border-slate-100 relative group overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
                            <Sparkles className="w-20 h-20 text-emerald-500" />
                        </div>
                        <h4 className="text-lg font-black uppercase mb-4 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-emerald-500" />
                            Smart Analysis
                        </h4>
                        <p className="text-sm font-bold text-slate-600 leading-relaxed mb-6">
                            Based on {percentile} percentile, we have filtered {predictions.safe.length + predictions.target.length + predictions.reach.length} highly compatible institutes for you.
                        </p>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-black text-[#1a1a2e]">{predictions.safe.length}</div>
                                <div className="text-[8px] font-black uppercase text-emerald-500 tracking-widest">Safe</div>
                            </div>
                            <div className="text-center border-x-2 border-slate-200">
                                <div className="text-2xl font-black text-[#1a1a2e]">{predictions.target.length}</div>
                                <div className="text-[8px] font-black uppercase text-blue-500 tracking-widest">Target</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-black text-[#1a1a2e]">{predictions.reach.length}</div>
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
                            <h2 className="text-2xl font-black uppercase tracking-tight">Target Zone</h2>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Perfect match for your current score</p>
                        </div>
                    </div>
                    {predictions.target.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {predictions.target.map((c, i) => (
                                <CollegeCard key={i} college={c} type="target" />
                            ))}
                        </div>
                    ) : (
                        <EmptyState message="No ideal target colleges in this percentile range. Try adjusting your filter." />
                    )}
                </section>

                {/* Safe Section */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black uppercase tracking-tight">Safe Zone</h2>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">High probability of admission</p>
                        </div>
                    </div>
                    {predictions.safe.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {predictions.safe.map((c, i) => (
                                <CollegeCard key={i} college={c} type="safe" />
                            ))}
                        </div>
                    ) : (
                        <EmptyState message="Increase your score for safe options in premium B-schools." />
                    )}
                </section>

                {/* Reach Section */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black uppercase tracking-tight">Reach Zone</h2>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Competitive but achievable with good GD/PI</p>
                        </div>
                    </div>
                    {predictions.reach.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {predictions.reach.map((c, i) => (
                                <CollegeCard key={i} college={c} type="reach" />
                            ))}
                        </div>
                    ) : (
                        <EmptyState message="Try aiming for a 2-3% higher percentile to unlock elite institutes." />
                    )}
                </section>
            </div>
        </section>
    );
}

function CollegeCard({ college, type }: { college: College, type: "safe" | "target" | "reach" }) {
    const colors = {
        safe: "border-emerald-500 text-emerald-600 bg-emerald-500/5",
        target: "border-blue-500 text-blue-600 bg-blue-500/5",
        reach: "border-amber-500 text-amber-600 bg-amber-500/5"
    };

    return (
        <div className="group bg-white p-6 rounded-[2rem] border-2 border-slate-100 hover:border-[#1a1a2e] hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col h-full relative overflow-hidden">
            <div className={`absolute top-0 right-0 px-4 py-1.5 rounded-bl-3xl text-[9px] font-black uppercase tracking-tighter ${
                type === "safe" ? "bg-emerald-500 text-white" : 
                type === "target" ? "bg-blue-500 text-white" : 
                "bg-amber-500 text-white"
            }`}>
                {type}
            </div>
            
            <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <School className="w-6 h-6 text-slate-900" />
                </div>
                <div>
                    <h3 className="text-base font-black uppercase leading-tight group-hover:text-emerald-500 transition-colors">{college.name}</h3>
                    <div className="flex items-center gap-1.5 mt-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{college.location} | {college.zone}</span>
                    </div>
                </div>
            </div>

            <div className="mt-auto space-y-4 pt-4 border-t border-slate-50">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[9px] font-black uppercase text-slate-400">Exp. Cutoff</span>
                        <span className="font-black text-slate-900">{college.cutoff}%ile</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[9px] font-black uppercase text-slate-400">Tier</span>
                        <span className="font-black text-slate-900">{college.tier}</span>
                    </div>
                </div>
                <Link href="/inquiry" className={`w-full py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                    type === "safe" ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" :
                    type === "target" ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" :
                    "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                }`}>
                    Get Admission Guide <ArrowUpRight className="w-3 h-3" />
                </Link>
            </div>
        </div>
    );
}

function EmptyState({ message }: { message: string }) {
    return (
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] p-12 text-center text-slate-400 font-bold italic">
            {message}
        </div>
    );
}
