"use client";

import { useState, useMemo } from "react";
import { Calculator, RefreshCw, Trophy, Target, AlertCircle, ChevronRight, Zap, HelpCircle, X } from "lucide-react";
import { InquiryForm } from "@/components/InquiryForm";

export function MhcetCalculator() {
    const [correct, setCorrect] = useState<number | "">("");
    const [unattempted, setUnattempted] = useState<number | "">("");

    // Setup calculation method to conditionally render the results UI
    const [calculationMethod, setCalculationMethod] = useState<"manual" | "url">("manual");

    // Inquiry popup state
    const [showInquiry, setShowInquiry] = useState(false);

    // Response Sheet URL State
    const [responseSheetUrl, setResponseSheetUrl] = useState("");

    // Lead Form State
    const [showLeadForm, setShowLeadForm] = useState(false);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [leadData, setLeadData] = useState({
        name: "",
        number: "",
        email: "",
        location: ""
    });

    const totalQuestions = 200;

    const stats = useMemo(() => {
        const c = Number(correct) || 0;
        // MHCET has no negative marking
        const score = c;

        // Percentile prediction (Approximation based on MHCET trends)
        let percentile = 0;
        if (score >= 155) percentile = 99.99;
        else if (score >= 145) percentile = 99.95;
        else if (score >= 135) percentile = 99.50;
        else if (score >= 125) percentile = 99.00;
        else if (score >= 115) percentile = 98.00;
        else if (score >= 105) percentile = 95.00;
        else if (score >= 95) percentile = 90.00;
        else if (score >= 85) percentile = 80.00;
        else if (score >= 70) percentile = 70.00;
        else percentile = 50.0;

        const accuracy = c > 0 ? (c / totalQuestions) * 100 : 0;

        return { score, percentile, accuracy };
    }, [correct]);

    const reset = () => {
        setCorrect("");
        setUnattempted("");
    };

    const handleCorrectChange = (val: string) => {
        const num = parseInt(val);
        if (val === "" || (num >= 0 && num <= totalQuestions)) {
            setCorrect(val === "" ? "" : num);
        }
    };

    const handleLeadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Direct Activepieces Webhook Call
        try {
            const response = await fetch('https://cloud.activepieces.com/api/v1/webhooks/wjKhP0jGALa4bmUVYcw5F', {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: leadData.name,
                    number: leadData.number,
                    email: leadData.email,
                    location: leadData.location,
                    source: `MHCET MBA 2026 Calculator`,
                    score: stats.score,
                    percentile: stats.percentile,
                    responseSheetUrl: responseSheetUrl,
                    timestamp: new Date().toISOString()
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Webhook failed with status ${response.status}: ${errorText}`);
            }

            setIsUnlocked(true);
            setShowLeadForm(false);
        } catch (e: any) {
            console.error('Webhook Error:', e);
            alert('Submission failed. Please try again.');
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="bg-white border-[8px] border-foreground shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12">
                <div className="flex items-center gap-4 mb-10 border-b-4 border-foreground pb-6">
                    <div className="bg-secondary p-3 border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <Calculator className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
                        MHCET MBA 2026 Score Predictor
                    </h2>
                </div>

                {/* Response Sheet URL Section */}
                <div className="mb-12 bg-slate-50 border-4 border-foreground p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Zap className="w-6 h-6 text-secondary animate-pulse" />
                        <h3 className="text-xl font-black uppercase tracking-tight">Option 1: Auto-Calculate via Answer Key</h3>
                    </div>

                    <div className="mb-8">
                        <label className="block text-xs font-black uppercase text-slate-500 mb-2">Paste your Admit Card Roll No & Date of Birth for Parsing</label>
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="text"
                                placeholder="Roll Number / Application No."
                                className="flex-1 bg-white border-4 border-foreground p-4 font-bold text-lg focus:outline-none focus:ring-4 focus:ring-secondary/20 transition-all"
                            />
                            <button
                                onClick={() => {
                                    setCalculationMethod("url");
                                    setShowLeadForm(true);
                                }}
                                className="bg-secondary text-white border-4 border-foreground px-8 py-4 font-black uppercase hover:bg-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            >
                                Get Score
                            </button>
                        </div>
                    </div>

                    <div className="border-t-2 border-slate-200 pt-6">
                        <button
                            onClick={(e) => {
                                const el = (e.currentTarget.nextElementSibling as HTMLElement);
                                el.classList.toggle('hidden');
                            }}
                            className="text-xs font-black uppercase text-secondary hover:underline flex items-center gap-2"
                        >
                            <HelpCircle className="w-4 h-4" />
                            How to check MHCET MBA Official Answer Key?
                        </button>
                        <div className="hidden mt-4 bg-white border-2 border-slate-200 p-4 space-y-3">
                            <ol className="list-decimal list-inside text-sm font-bold text-slate-700 space-y-2">
                                <li>Visit **cetcell.mahacet.org**.</li>
                                <li>Login with your **Application Number** and **Password**.</li>
                                <li>Click on **'Objection Tracking'** or **'View Response'**.</li>
                                <li>Download the PDF and check your correct responses.</li>
                            </ol>
                            <p className="text-[10px] font-black uppercase text-slate-400">Note: Answer Key is usually released 5-7 days after Phase 2.</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 mb-10">
                    <div className="h-1 flex-1 bg-slate-200"></div>
                    <span className="text-xs font-black uppercase text-slate-400 tracking-widest px-4">OR USE MANUAL INPUT</span>
                    <div className="h-1 flex-1 bg-slate-200"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Inputs Section */}
                    <div className="space-y-8">
                        <div>
                            <label className="block text-sm font-black uppercase tracking-widest mb-3 text-slate-500">
                                Total Correct Attempts
                            </label>
                            <input
                                type="number"
                                value={correct}
                                onChange={(e) => handleCorrectChange(e.target.value)}
                                placeholder="0"
                                className="w-full bg-slate-50 border-4 border-foreground p-5 text-2xl font-black focus:bg-white focus:outline-none transition-all"
                            />
                            <p className="text-[10px] mt-2 font-bold text-slate-400 uppercase italic">*No Negative marking in MHCET MBA</p>
                        </div>

                        <button
                            onClick={reset}
                            className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-secondary hover:underline group"
                        >
                            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                            Reset
                        </button>

                        <div className="bg-blue-50 border-4 border-blue-200 p-6 flex gap-4">
                            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                            <p className="text-sm font-bold text-blue-900 leading-tight">
                                Accurate Scoring: +1 per correct answer. 
                                Predict your percentile for JBIMS, SIMSREE, and PUMBA based on latest shift difficulty.
                            </p>
                        </div>

                        {!isUnlocked && !showLeadForm && (
                            <button
                                onClick={() => {
                                    setCalculationMethod("manual");
                                    setShowLeadForm(true);
                                }}
                                className="w-full bg-foreground text-white border-4 border-secondary px-8 py-5 text-xl font-black uppercase hover:bg-black transition-all shadow-[8px_8px_0px_0px_rgba(236,72,153,1)] flex items-center justify-center gap-3"
                            >
                                <Calculator className="w-6 h-6" />
                                CHECK MY RANK
                            </button>
                        )}
                    </div>

                    {/* Results Section */}
                    <div className="flex flex-col justify-between space-y-8">
                        {!isUnlocked ? (
                            <div className="bg-foreground text-white p-10 border-b-[12px] border-secondary relative overflow-hidden flex flex-col items-center text-center justify-center min-h-[300px]">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Trophy className="w-32 h-32" />
                                </div>
                                {!showLeadForm ? (
                                    <div className="relative z-10 transition-all">
                                        <Zap className="w-16 h-16 text-secondary mx-auto mb-6 animate-pulse" />
                                        <h3 className="text-2xl font-black uppercase mb-4 leading-tight">Predict Percentile</h3>
                                        <p className="text-slate-400 font-bold mb-8">Get insights into JBIMS/SIMSREE cutoffs.</p>
                                        <button
                                            onClick={() => {
                                                setCalculationMethod("manual");
                                                setShowLeadForm(true);
                                            }}
                                            className="bg-secondary text-white border-4 border-white px-8 py-4 text-xl font-black uppercase hover:bg-white hover:text-secondary transition-all shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]"
                                        >
                                            Show Results
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
                                                placeholder="Email"
                                                value={leadData.email}
                                                onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                                                className="w-full bg-white/10 border-2 border-white/20 p-3 font-bold text-white placeholder:text-white/40 focus:bg-white/20 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                required
                                                type="text"
                                                placeholder="City"
                                                value={leadData.location}
                                                onChange={(e) => setLeadData({ ...leadData, location: e.target.value })}
                                                className="w-full bg-white/10 border-2 border-white/20 p-3 font-bold text-white placeholder:text-white/40 focus:bg-white/20 focus:outline-none"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-secondary text-white p-4 font-black uppercase hover:bg-white hover:text-secondary transition-all"
                                        >
                                            Lock Data & View
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
                        ) : calculationMethod === "url" ? (
                            <div className="bg-secondary text-white p-10 border-b-[12px] border-foreground relative overflow-hidden animate-in fade-in zoom-in duration-500 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Zap className="w-40 h-40" />
                                </div>
                                <div className="relative z-10 text-center space-y-6">
                                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
                                        <RefreshCw className="w-8 h-8 text-white relative z-10" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-black uppercase mb-2 leading-tight">
                                        Fetching Data...
                                    </h3>
                                    <p className="text-white/80 font-bold text-sm md:text-base leading-relaxed border-t-2 border-white/20 pt-6">
                                        MHCET Answer Key parsing requested. We will check against official shift data and notify you.
                                    </p>
                                    <div className="bg-black/30 p-4 rounded-xl border-2 border-white/10 text-sm font-black tracking-widest uppercase">
                                        Check WhatsApp for updates! 📈
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-foreground text-white p-10 border-b-[12px] border-secondary relative overflow-hidden animate-in fade-in zoom-in duration-500">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Trophy className="w-32 h-32" />
                                </div>
                                <div className="relative z-10">
                                    <span className="text-sm font-black uppercase tracking-[0.2em] text-secondary mb-4 block">
                                        Total Marks
                                    </span>
                                    <div className="text-8xl font-black mb-2">{stats.score}</div>
                                    <div className="text-xl font-bold text-slate-400">out of 200</div>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-6">
                            <div className={`bg-white border-4 border-foreground p-6 shadow-[8px_8px_0px_0px_rgba(245,158,11,1)] transition-all ${(!isUnlocked || calculationMethod === "url") ? "blur-sm grayscale pointer-events-none opacity-50" : ""}`}>
                                <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-500 mb-2">
                                    <Target className="w-4 h-4" />
                                    Percentage
                                    </div>
                                <div className="text-3xl font-black text-foreground">{stats.accuracy.toFixed(1)}%</div>
                            </div>

                            <div className={`bg-white border-4 border-foreground p-6 shadow-[8px_8px_0px_0px_rgba(236,72,153,1)] transition-all ${(!isUnlocked || calculationMethod === "url") ? "blur-sm grayscale pointer-events-none opacity-50" : ""}`}>
                                <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-500 mb-2">
                                    <Trophy className="w-4 h-4" />
                                    Percentile
                                </div>
                                <div className="text-3xl font-black text-foreground">~{stats.percentile}+</div>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowInquiry(true)}
                            className="w-full bg-secondary text-white p-8 border-4 border-foreground flex items-center justify-between group cursor-pointer hover:bg-black transition-colors text-left"
                        >
                            <div>
                                <div className="text-sm font-black uppercase tracking-widest mb-1">Low Score in MHCET?</div>
                                <div className="text-xl font-black uppercase">Get Direct Admission Hub</div>
                            </div>
                            <ChevronRight className="w-8 h-8 group-hover:translate-x-2 transition-transform flex-shrink-0" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Inquiry Modal */}
            {showInquiry && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-[32px_32px_0px_0px_rgba(0,0,0,1)] border-8 border-foreground text-foreground">
                        <button
                            onClick={() => setShowInquiry(false)}
                            className="absolute top-4 right-4 z-[110] bg-white border-4 border-foreground p-2 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                            aria-label="Close"
                        >
                            <X className="h-6 w-6 stroke-[3px]" />
                        </button>
                        <div className="bg-white">
                            <div className="bg-secondary p-8 text-center border-b-8 border-foreground text-white">
                                <h2 className="text-4xl font-black uppercase italic tracking-tighter">Admission Support 2026</h2>
                                <p className="text-pink-50 font-bold mt-2">Expert guidance for JBIMS, SIMSREE & Private Colleges.</p>
                            </div>
                            <div className="p-4 md:p-8">
                                <InquiryForm />
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-0 -z-10" onClick={() => setShowInquiry(false)} />
                </div>
            )}

            {/* Percentile Table Section */}
            <div className="mt-20">
                <h3 className="text-3xl font-black uppercase tracking-tight mb-8 border-l-[12px] border-secondary pl-6">
                    MHCET MBA Marks vs Percentile (Trend 2026)
                </h3>
                <div className="overflow-x-auto border-4 border-foreground">
                    <table className="w-full text-left border-collapse font-body">
                        <thead className="bg-foreground text-white uppercase text-sm font-black tracking-widest">
                            <tr>
                                <th className="p-5 border-r border-white/20">Raw Marks (out of 200)</th>
                                <th className="p-5 border-r border-white/20">Estimated Percentile</th>
                                <th className="p-5">Target Colleges</th>
                            </tr>
                        </thead>
                        <tbody className="text-lg font-bold">
                            <tr className="border-b-4 border-foreground bg-white hover:bg-secondary/5 transition-colors">
                                <td className="p-5 border-r-4 border-foreground">155 - 165+</td>
                                <td className="p-5 border-r-4 border-foreground text-secondary">99.99</td>
                                <td className="p-5">JBIMS, Mumbai</td>
                            </tr>
                            <tr className="border-b-4 border-foreground bg-slate-50 hover:bg-secondary/5 transition-colors">
                                <td className="p-5 border-r-4 border-foreground">140 - 154</td>
                                <td className="p-5 border-r-4 border-foreground text-secondary">99.90+</td>
                                <td className="p-5">SIMSREE, Mumbai</td>
                            </tr>
                            <tr className="border-b-4 border-foreground bg-white hover:bg-secondary/5 transition-colors">
                                <td className="p-5 border-r-4 border-foreground">125 - 139</td>
                                <td className="p-5 border-r-4 border-foreground text-secondary">99.00+</td>
                                <td className="p-5">PUMBA, Welingkar, SIES</td>
                            </tr>
                            <tr className="border-b-4 border-foreground bg-slate-50 hover:bg-secondary/5 transition-colors">
                                <td className="p-5 border-r-4 border-foreground">110 - 124</td>
                                <td className="p-5 border-r-4 border-foreground">97.00 - 98.50</td>
                                <td className="p-5">XIMR, Chetana, MET</td>
                            </tr>
                            <tr className="border-b-4 border-foreground bg-white hover:bg-secondary/5 transition-colors">
                                <td className="p-5 border-r-4 border-foreground">95 - 109</td>
                                <td className="p-5 border-r-4 border-foreground">90.00 - 95.00</td>
                                <td className="p-5">Indira, Lala Lajpatrai</td>
                            </tr>
                            <tr className="bg-slate-50 hover:bg-secondary/5 transition-colors">
                                <td className="p-5 border-r-4 border-foreground">80 - 94</td>
                                <td className="p-5 border-r-4 border-foreground">80.00 - 89.00</td>
                                <td className="p-5">Tier 2/3 Colleges</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
