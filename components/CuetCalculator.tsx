"use client";

import { useState, useMemo } from "react";
import { Calculator, RefreshCw, Trophy, Target, AlertCircle, ChevronRight, Zap } from "lucide-react";

export function CuetCalculator() {
    const [correct, setCorrect] = useState<number | "">("");
    const [incorrect, setIncorrect] = useState<number | "">("");
    const [unattempted, setUnattempted] = useState<number | "">("");

    // Lead Form State
    const [showLeadForm, setShowLeadForm] = useState(false);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [leadData, setLeadData] = useState({
        name: "",
        number: "",
        email: "",
        location: ""
    });

    const totalQuestions = 75; // Most common pattern for 2024/2025

    const stats = useMemo(() => {
        const c = Number(correct) || 0;
        const i = Number(incorrect) || 0;
        const score = (c * 4) - (i * 1);

        // Percentile prediction (Approximation based on 2024 trends)
        let percentile = 0;
        if (score >= 230) percentile = 99.9;
        else if (score >= 200) percentile = 99.0;
        else if (score >= 180) percentile = 95.0;
        else if (score >= 150) percentile = 90.0;
        else if (score >= 120) percentile = 80.0;
        else if (score >= 100) percentile = 70.0;
        else if (score >= 80) percentile = 60.0;
        else percentile = 50.0;

        const accuracy = c + i > 0 ? (c / (c + i)) * 100 : 0;

        return { score, percentile, accuracy };
    }, [correct, incorrect]);

    const reset = () => {
        setCorrect("");
        setIncorrect("");
        setUnattempted("");
    };

    const handleCorrectChange = (val: string) => {
        const num = parseInt(val);
        if (val === "" || (num >= 0 && num <= totalQuestions)) {
            setCorrect(val === "" ? "" : num);
        }
    };

    const handleIncorrectChange = (val: string) => {
        const num = parseInt(val);
        if (val === "" || (num >= 0 && num <= totalQuestions - (Number(correct) || 0))) {
            setIncorrect(val === "" ? "" : num);
        }
    };

    const handleLeadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Save to Leads API
        try {
            console.log('Client: Sending lead to /api/leads from CuetCalculator');
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: leadData.name,
                    number: leadData.number,
                    email: leadData.email,
                    location: leadData.location,
                    source: `CUET PG 2026 Calculator`,
                    score: stats.score,
                    percentile: stats.percentile
                }),
            });
            console.log('Client: API response status:', response.status);
        } catch (e) {
            console.error('Client: Failed to save lead to API', e);
        }

        // Generate WhatsApp message for the lead
        const message = `*New CUET PG Lead*%0A%0A` +
            `*Name:* ${leadData.name}%0A` +
            `*Phone:* ${leadData.number}%0A` +
            `*Email:* ${leadData.email}%0A` +
            `*Location:* ${leadData.location}%0A` +
            `*Calculated Score:* ${stats.score}%0A` +
            `*Percentile:* ~${stats.percentile}+`;

        const whatsappUrl = `https://wa.me/919560020771?text=${message}`;
        window.open(whatsappUrl, '_blank');

        setIsUnlocked(true);
        setShowLeadForm(false);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="bg-white border-[8px] border-foreground shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12">
                <div className="flex items-center gap-4 mb-10 border-b-4 border-foreground pb-6">
                    <div className="bg-primary p-3 border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <Calculator className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
                        CUET PG 2026 Score Calculator
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Inputs Section */}
                    <div className="space-y-8">
                        <div>
                            <label className="block text-sm font-black uppercase tracking-widest mb-3 text-slate-500">
                                Correct Answers (+4 each)
                            </label>
                            <input
                                type="number"
                                value={correct}
                                onChange={(e) => handleCorrectChange(e.target.value)}
                                placeholder="0"
                                className="w-full bg-slate-50 border-4 border-foreground p-5 text-2xl font-black focus:bg-white focus:outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-black uppercase tracking-widest mb-3 text-slate-500">
                                Incorrect Answers (-1 each)
                            </label>
                            <input
                                type="number"
                                value={incorrect}
                                onChange={(e) => handleIncorrectChange(e.target.value)}
                                placeholder="0"
                                className="w-full bg-slate-50 border-4 border-foreground p-5 text-2xl font-black focus:bg-white focus:outline-none transition-all"
                            />
                        </div>

                        <button
                            onClick={reset}
                            className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary hover:underline group"
                        >
                            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                            Reset All Fields
                        </button>

                        <div className="bg-amber-50 border-4 border-amber-200 p-6 flex gap-4">
                            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                            <p className="text-sm font-bold text-amber-900 leading-tight">
                                This calculator uses the official NTA marking scheme: +4 for correct, -1 for incorrect.
                                Based on the 75-question pattern (300 total marks).
                            </p>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="flex flex-col justify-between space-y-8">
                        {!isUnlocked ? (
                            <div className="bg-foreground text-white p-10 border-b-[12px] border-primary relative overflow-hidden flex flex-col items-center text-center justify-center min-h-[300px]">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Trophy className="w-32 h-32" />
                                </div>
                                {!showLeadForm ? (
                                    <div className="relative z-10 transition-all">
                                        <Zap className="w-16 h-16 text-primary mx-auto mb-6 animate-pulse" />
                                        <h3 className="text-2xl font-black uppercase mb-4 leading-tight">Your Score is Ready!</h3>
                                        <p className="text-slate-400 font-bold mb-8">Submit your details to unlock your full score and predicted percentile.</p>
                                        <button
                                            onClick={() => setShowLeadForm(true)}
                                            className="bg-primary text-white border-4 border-white px-8 py-4 text-xl font-black uppercase hover:bg-white hover:text-primary transition-all shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]"
                                        >
                                            Unlock Now
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleLeadSubmit} className="relative z-10 w-full space-y-4 text-left">
                                        <div>
                                            <input
                                                required
                                                type="text"
                                                placeholder="Full Name"
                                                value={leadData.name}
                                                onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                                                className="w-full bg-white/10 border-2 border-white/20 p-3 font-bold text-white placeholder:text-white/40 focus:bg-white/20 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                required
                                                type="tel"
                                                placeholder="WhatsApp Number"
                                                value={leadData.number}
                                                onChange={(e) => setLeadData({ ...leadData, number: e.target.value })}
                                                className="w-full bg-white/10 border-2 border-white/20 p-3 font-bold text-white placeholder:text-white/40 focus:bg-white/20 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                required
                                                type="email"
                                                placeholder="Email Address"
                                                value={leadData.email}
                                                onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                                                className="w-full bg-white/10 border-2 border-white/20 p-3 font-bold text-white placeholder:text-white/40 focus:bg-white/20 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                required
                                                type="text"
                                                placeholder="Your Location"
                                                value={leadData.location}
                                                onChange={(e) => setLeadData({ ...leadData, location: e.target.value })}
                                                className="w-full bg-white/10 border-2 border-white/20 p-3 font-bold text-white placeholder:text-white/40 focus:bg-white/20 focus:outline-none"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-primary text-white p-4 font-black uppercase hover:bg-white hover:text-primary transition-all"
                                        >
                                            Show My Results
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setShowLeadForm(false)}
                                            className="w-full text-xs font-bold text-white/50 uppercase hover:text-white transition-colors"
                                        >
                                            Back
                                        </button>
                                    </form>
                                )}
                            </div>
                        ) : (
                            <div className="bg-foreground text-white p-10 border-b-[12px] border-primary relative overflow-hidden animate-in fade-in zoom-in duration-500">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Trophy className="w-32 h-32" />
                                </div>
                                <div className="relative z-10">
                                    <span className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-4 block">
                                        Estimated Raw Score
                                    </span>
                                    <div className="text-8xl font-black mb-2">{stats.score}</div>
                                    <div className="text-xl font-bold text-slate-400">out of 300 marks</div>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-6">
                            <div className={`bg-white border-4 border-foreground p-6 shadow-[8px_8px_0px_0px_rgba(255,193,7,1)] transition-all ${!isUnlocked ? "blur-sm grayscale pointer-events-none opacity-50" : ""}`}>
                                <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-500 mb-2">
                                    <Target className="w-4 h-4" />
                                    Accuracy
                                </div>
                                <div className="text-3xl font-black text-foreground">{stats.accuracy.toFixed(1)}%</div>
                            </div>

                            <div className={`bg-white border-4 border-foreground p-6 shadow-[8px_8px_0px_0px_rgba(59,130,246,1)] transition-all ${!isUnlocked ? "blur-sm grayscale pointer-events-none opacity-50" : ""}`}>
                                <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-500 mb-2">
                                    <Trophy className="w-4 h-4" />
                                    Percentile
                                </div>
                                <div className="text-3xl font-black text-foreground">~{stats.percentile}+</div>
                            </div>
                        </div>

                        <div className="bg-primary text-white p-8 border-4 border-foreground flex items-center justify-between group cursor-pointer hover:bg-black transition-colors">
                            <div>
                                <div className="text-sm font-black uppercase tracking-widest mb-1">Targeting Top B-Schools?</div>
                                <div className="text-xl font-black uppercase">Speak to Mohit Jain Now</div>
                            </div>
                            <ChevronRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Percentile Table Section */}
            <div className="mt-20">
                <h3 className="text-3xl font-black uppercase tracking-tight mb-8 border-l-[12px] border-primary pl-6">
                    Score vs Percentile (Predicted)
                </h3>
                <div className="overflow-x-auto border-4 border-foreground">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-foreground text-white uppercase text-sm font-black tracking-widest">
                            <tr>
                                <th className="p-5 border-r border-white/20">Raw Score (Out of 300)</th>
                                <th className="p-5">Expected Percentile</th>
                            </tr>
                        </thead>
                        <tbody className="text-lg font-bold">
                            <tr className="border-b-4 border-foreground bg-white hover:bg-primary/5 transition-colors">
                                <td className="p-5 border-r-4 border-foreground">230 - 250</td>
                                <td className="p-5 text-primary">99.90+ Percentile</td>
                            </tr>
                            <tr className="border-b-4 border-foreground bg-slate-50 hover:bg-primary/5 transition-colors">
                                <td className="p-5 border-r-4 border-foreground">200 - 229</td>
                                <td className="p-5">99.00 - 99.85 Percentile</td>
                            </tr>
                            <tr className="border-b-4 border-foreground bg-white hover:bg-primary/5 transition-colors">
                                <td className="p-5 border-r-4 border-foreground">180 - 199</td>
                                <td className="p-5">95.00 - 98.99 Percentile</td>
                            </tr>
                            <tr className="border-b-4 border-foreground bg-slate-50 hover:bg-primary/5 transition-colors">
                                <td className="p-5 border-r-4 border-foreground">150 - 179</td>
                                <td className="p-5">90.00 - 94.99 Percentile</td>
                            </tr>
                            <tr className="bg-white hover:bg-primary/5 transition-colors">
                                <td className="p-5 border-r-4 border-foreground">120 - 149</td>
                                <td className="p-5">80.00 - 89.99 Percentile</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
