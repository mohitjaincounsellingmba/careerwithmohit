"use client";

import { useState, useMemo } from "react";
import { Calculator, RefreshCw, Trophy, Target, AlertCircle, ChevronRight, Zap, HelpCircle, X } from "lucide-react";
import { InquiryForm } from "@/components/InquiryForm";

export function CuetCalculator() {
    const [correct, setCorrect] = useState<number | "">("");
    const [incorrect, setIncorrect] = useState<number | "">("");
    const [unattempted, setUnattempted] = useState<number | "">("");

    // Setup calculation method to conditionally render the results UI
    const [calculationMethod, setCalculationMethod] = useState<"manual" | "url">("manual");

    // Inquiry popup state
    const [showInquiry, setShowInquiry] = useState(false);

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<any>(null);

    const handleAnalyzeUrl = async () => {
        if (!responseSheetUrl) return alert("Please paste a URL first.");
        
        setIsAnalyzing(true);
        setParseError("");
        setAnalysisResult(null);

        try {
            const res = await fetch('/api/analyze-link', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: responseSheetUrl })
            });

            const result = await res.json();
            
            if (!res.ok) throw new Error(result.error || "Analysis failed");

            setAnalysisResult(result.data);
            setUnattempted(result.data.unansweredCount);
            setCalculationMethod("url");
            // Highlight step 2
            const step2 = document.getElementById('step-2-section');
            if (step2) step2.scrollIntoView({ behavior: 'smooth' });
        } catch (err: any) {
            setParseError(err.message);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const reset = () => {
        setCorrect("");
        setIncorrect("");
        setUnattempted("");
        setPageSource("");
        setResponseSheetUrl("");
        setCalculationMethod("manual");
        setAnalysisResult(null);
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
                    source: `CUET PG 2026 Calculator`,
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
                    <div className="bg-primary p-3 border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <Calculator className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
                        CUET PG 2026 Score Calculator
                    </h2>
                </div>

                {/* Response Sheet URL Section */}
                <div className="mb-12 bg-slate-50 border-4 border-foreground p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Zap className="w-6 h-6 text-primary animate-pulse" />
                        <h3 className="text-xl font-black uppercase tracking-tight">Step 1: Auto-Fetch Your Attempts</h3>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-black uppercase text-slate-500 mb-2">Method A: Response Sheet URL (Instant Scan)</label>
                            <div className="flex flex-col md:flex-row gap-4 mb-4">
                                <input
                                    type="url"
                                    value={responseSheetUrl}
                                    onChange={(e) => setResponseSheetUrl(e.target.value)}
                                    placeholder="Paste NTA URL here..."
                                    className="flex-1 bg-white border-4 border-foreground p-4 font-bold text-lg focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all"
                                />
                                <button
                                    onClick={handleAnalyzeUrl}
                                    disabled={isAnalyzing}
                                    className="bg-primary text-white border-4 border-foreground px-8 py-4 font-black uppercase hover:bg-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50"
                                >
                                    {isAnalyzing ? "Scanning..." : "Analyze Link"}
                                </button>
                            </div>
                            
                            {analysisResult && (
                                <div className="bg-white border-4 border-primary p-4 animate-in slide-in-from-top-4 duration-500">
                                    <div className="flex items-center gap-2 text-primary font-black uppercase text-xs mb-4">
                                        <Zap className="w-4 h-4" />
                                        Sheet Scanned Successfully!
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        <div className="bg-slate-50 p-3 border-2 border-slate-200">
                                            <div className="text-[10px] font-black text-slate-400 uppercase">Questions Found</div>
                                            <div className="text-xl font-black">{analysisResult.totalFetched}</div>
                                        </div>
                                        <div className="bg-green-50 p-3 border-2 border-green-200">
                                            <div className="text-[10px] font-black text-green-600 uppercase">Attempted</div>
                                            <div className="text-xl font-black">{analysisResult.answeredCount}</div>
                                        </div>
                                        <div className="bg-slate-50 p-3 border-2 border-slate-200">
                                            <div className="text-[10px] font-black text-slate-400 uppercase">Unattempted</div>
                                            <div className="text-xl font-black">{analysisResult.unansweredCount}</div>
                                        </div>
                                    </div>
                                    <p className="mt-4 text-[10px] font-bold text-slate-600 leading-tight uppercase">
                                        *To see your predicted score, please check your correct answers using the official key and enter the count in Step 2 below.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="h-px bg-slate-200"></div>

                        <div>
                            <label className="block text-xs font-black uppercase text-slate-500 mb-2">Method B: Paste Page Source (Backup)</label>
                            <textarea
                                value={pageSource}
                                onChange={(e) => setPageSource(e.target.value)}
                                placeholder="Backup: If URL fetch fails, paste page source here..."
                                className="w-full h-24 bg-white border-4 border-foreground p-4 font-bold text-sm focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all mb-4"
                            />
                            {parseError && <p className="text-rose-600 font-black text-xs uppercase mb-4 flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" />
                                {parseError}
                            </p>}
                            <button
                                onClick={handleParseSource}
                                disabled={isParsing}
                                className="w-full bg-slate-800 text-white border-4 border-foreground px-8 py-4 font-black uppercase hover:bg-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50"
                            >
                                {isParsing ? "Scanning Source..." : "Parse My Attempts"}
                            </button>
                        </div>
                    </div>
                </div>

                <div id="step-2-section" className="flex items-center gap-3 mb-10 transition-all">
                    <div className="h-1 flex-1 bg-slate-200"></div>
                    <span className="text-xs font-black uppercase text-slate-400 tracking-widest px-4">STEP 2: ENER COUNTS FOR INSTANT SCORE</span>
                    <div className="h-1 flex-1 bg-slate-200"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Inputs Section */}
                    <div className="space-y-8">
                        <div>
                            <label className="block text-sm font-black uppercase tracking-widest mb-3 text-slate-500">
                                Correct Answers (+4)
                            </label>
                            <input
                                type="number"
                                value={correct}
                                onChange={(e) => handleCorrectChange(e.target.value)}
                                placeholder="Enter count from offficial key"
                                className="w-full bg-slate-50 border-4 border-foreground p-5 text-2xl font-black focus:bg-white focus:outline-none transition-all ring-primary/20 ring-offset-4"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-black uppercase tracking-widest mb-3 text-slate-500">
                                Incorrect Answers (-1)
                            </label>
                            <input
                                type="number"
                                value={incorrect}
                                onChange={(e) => handleIncorrectChange(e.target.value)}
                                placeholder="Enter count from offficial key"
                                className="w-full bg-slate-50 border-4 border-foreground p-5 text-2xl font-black focus:bg-white focus:outline-none transition-all"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-xs font-black uppercase text-slate-500">
                                Unattempted: <span className="text-foreground">{unattempted || 0}</span>
                            </div>
                            <button
                                onClick={reset}
                                className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary hover:underline group"
                            >
                                <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                                Clear
                            </button>
                        </div>

                        {!isUnlocked && !showLeadForm && (
                            <button
                                onClick={() => {
                                    setShowLeadForm(true);
                                }}
                                className="w-full bg-foreground text-white border-4 border-primary px-8 py-5 text-xl font-black uppercase hover:bg-black transition-all shadow-[8px_8px_0px_0px_rgba(37,99,235,1)] flex items-center justify-center gap-3"
                            >
                                <Calculator className="w-6 h-6" />
                                Predict My Percentile
                            </button>
                        )}
                    </div>

                    {/* Results Section */}
                    <div className="flex flex-col justify-between space-y-8">
                        {!isUnlocked ? (
                            <div className="bg-foreground text-white p-10 border-b-[12px] border-primary relative overflow-hidden flex flex-col items-center text-center justify-center min-h-[350px]">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Trophy className="w-32 h-32" />
                                </div>
                                {!showLeadForm ? (
                                    <div className="relative z-10 transition-all">
                                        <Zap className="w-16 h-16 text-primary mx-auto mb-6 animate-pulse" />
                                        <h3 className="text-2xl font-black uppercase mb-4 leading-tight">Instant Report Ready!</h3>
                                        <p className="text-slate-400 font-bold mb-8 italic">Based on your input, we have calculated your score and percentile. Unlock to see it.</p>
                                        <button
                                            onClick={() => setShowLeadForm(true)}
                                            className="bg-primary text-white border-4 border-white px-8 py-4 text-xl font-black uppercase hover:bg-white hover:text-primary transition-all shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]"
                                        >
                                            View My Score
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
                                                className="w-full bg-white/10 border-2 border-white/20 p-3 font-bold text-white placeholder:text-white/40 focus:bg-white/20 focus:outline-none placeholder-shown:italic"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                required
                                                type="tel"
                                                placeholder="WhatsApp Number"
                                                value={leadData.number}
                                                onChange={(e) => setLeadData({ ...leadData, number: e.target.value })}
                                                className="w-full bg-white/10 border-2 border-white/20 p-3 font-bold text-white placeholder:text-white/40 focus:bg-white/20 focus:outline-none placeholder-shown:italic"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                required
                                                type="email"
                                                placeholder="Email Address"
                                                value={leadData.email}
                                                onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                                                className="w-full bg-white/10 border-2 border-white/20 p-3 font-bold text-white placeholder:text-white/40 focus:bg-white/20 focus:outline-none placeholder-shown:italic"
                                            />
                                        </div>
                                        <div>
                                            <select
                                                required
                                                value={leadData.location}
                                                onChange={(e) => setLeadData({ ...leadData, location: e.target.value })}
                                                className="w-full bg-white/10 border-2 border-white/20 p-3 font-bold text-white focus:bg-white/20 focus:outline-none uppercase text-xs"
                                            >
                                                <option value="" className="text-black">Your 2026 Goal?</option>
                                                <option value="MBA" className="text-black">MBA Admission</option>
                                                <option value="MCA" className="text-black">MCA Admission</option>
                                                <option value="General Counselling" className="text-black">Career Counselling</option>
                                            </select>
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-primary text-white p-4 font-black uppercase hover:bg-white hover:text-primary transition-all flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]"
                                        >
                                            Get Instant Score
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setShowLeadForm(false)}
                                            className="w-full text-[10px] font-black text-white/40 uppercase hover:text-white transition-colors text-center"
                                        >
                                            ← Adjust Score
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
                                    <span className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-4 block animate-pulse">
                                        Verified Score Result
                                    </span>
                                    <div className="text-8xl font-black mb-2">{stats.score}</div>
                                    <div className="text-xl font-bold text-slate-400">Total Points / 300 Max</div>
                                    
                                    <div className="mt-8 bg-blue-500/20 border-2 border-blue-500/50 p-4 rounded-lg">
                                        <p className="text-xs font-bold text-blue-100 leading-tight">
                                            {calculationMethod === "url" 
                                                ? "*Scanned from link. We've fetched your attempt data instantly. Predicted percentile is based on current trends." 
                                                : "*Calculated from manual entry. Predicted percentile is based on your correct/incorrect counts."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-6">
                            <div className={`bg-white border-4 border-foreground p-6 shadow-[8px_8px_0px_0px_rgba(255,193,7,1)] transition-all ${!isUnlocked ? "blur-[6px] grayscale-[0.5] opacity-50" : ""}`}>
                                <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-500 mb-2">
                                    <Target className="w-4 h-4" />
                                    Accuracy
                                </div>
                                <div className="text-3xl font-black text-foreground">{stats.accuracy.toFixed(1)}%</div>
                            </div>

                            <div className={`bg-white border-4 border-foreground p-6 shadow-[8px_8px_0px_0px_rgba(59,130,246,1)] transition-all ${!isUnlocked ? "blur-[6px] grayscale-[0.5] opacity-50" : ""}`}>
                                <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-500 mb-2">
                                    <Trophy className="w-4 h-4" />
                                    Percentile
                                </div>
                                <div className="text-3xl font-black text-foreground">~{stats.percentile}+</div>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowInquiry(true)}
                            className="w-full bg-primary text-white p-8 border-4 border-foreground flex items-center justify-between group cursor-pointer hover:bg-black transition-colors text-left shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                        >
                            <div>
                                <div className="text-sm font-black uppercase tracking-widest mb-1">Targeting Top B-Schools?</div>
                                <div className="text-xl font-black uppercase">Speak to Mohit Jain Now</div>
                            </div>
                            <ChevronRight className="w-8 h-8 group-hover:translate-x-2 transition-transform flex-shrink-0" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Inquiry Modal */}
            {showInquiry && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-[32px_32px_0px_0px_rgba(0,0,0,1)] border-8 border-foreground">
                        <button
                            onClick={() => setShowInquiry(false)}
                            className="absolute top-4 right-4 z-[110] bg-white border-4 border-foreground p-2 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                            aria-label="Close"
                        >
                            <X className="h-6 w-6 stroke-[3px]" />
                        </button>
                        <div className="bg-white">
                            <div className="bg-primary p-8 text-center border-b-8 border-foreground">
                                <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Ready to Level Up?</h2>
                                <p className="text-blue-50 font-bold mt-2">Share your details and let our experts guide your career journey.</p>
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
