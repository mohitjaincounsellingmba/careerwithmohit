"use client";

import { useState, useMemo } from "react";
import { Calculator, RefreshCw, Trophy, Target, AlertCircle, ChevronRight, Zap, HelpCircle, X, ShieldCheck } from "lucide-react";
import { InquiryForm } from "@/components/InquiryForm";

export function JeeScoreCalculator() {
    const [correct, setCorrect] = useState<number | "">("");
    const [incorrect, setIncorrect] = useState<number | "">("");
    const [unattempted, setUnattempted] = useState<number | "">("");

    // Setup calculation method to conditionally render the results UI
    const [calculationMethod, setCalculationMethod] = useState<"manual" | "url">("manual");

    // Inquiry popup state
    const [showInquiry, setShowInquiry] = useState(false);

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<any>(null);
    const [verifications, setVerifications] = useState<Record<string, 'correct' | 'incorrect' | null>>({});
    const [responseSheetUrl, setResponseSheetUrl] = useState("");
    const [pageSource, setPageSource] = useState("");
    const [isParsing, setIsParsing] = useState(false);
    const [parseError, setParseError] = useState("");

    // Lead Form State
    const [showLeadForm, setShowLeadForm] = useState(false);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [leadData, setLeadData] = useState({
        name: "",
        number: "",
        email: "",
        location: ""
    });

    const totalQuestions = 75; // JEE Main standard attempt (20 MCQs + 5 NVQs per subject)

    const handleAnalyzeUrl = async () => {
        if (!responseSheetUrl) return alert("Please paste a URL first.");
        
        setIsAnalyzing(true);
        setParseError("");
        setAnalysisResult(null);
        setVerifications({});

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
            
            const verif = document.getElementById('verification-grid');
            if (verif) verif.scrollIntoView({ behavior: 'smooth' });
        } catch (err: any) {
            setParseError(err.message);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const toggleVerification = (qId: string, status: 'correct' | 'incorrect') => {
        setVerifications(prev => {
            const current = prev[qId];
            const next = current === status ? null : status;
            const newVerif = { ...prev, [qId]: next };
            
            const correctCount = Object.values(newVerif).filter(v => v === 'correct').length;
            const incorrectCount = Object.values(newVerif).filter(v => v === 'incorrect').length;
            
            setCorrect(correctCount || "");
            setIncorrect(incorrectCount || "");
            
            return newVerif;
        });
    };

    const handleParseSource = async () => {
        if (!pageSource) return alert("Please paste page source first.");
        setIsParsing(true);
        setParseError("");
        try {
            const html = pageSource;
            const questionMatches = Array.from(html.matchAll(/Question ID ?: ?<\/td><td[^>]*>(\d+)<\/td>/g)).map(m => m[1]);
            const statusMatches = Array.from(html.matchAll(/Status ?: ?<\/td><td[^>]*>(Answered|Not Answered|Marked for Review)<\/td>/g)).map(m => m[1]);
            const optionMatches = Array.from(html.matchAll(/Chosen Option ?: ?<\/td><td[^>]*>(.*?)<\/td>/g)).map(m => m[1].replace(/&nbsp;/g, '').trim());

            if (questionMatches.length === 0) {
                throw new Error("No question data found. Please ensure you copied the full page source.");
            }

            const answeredCount = statusMatches.filter(s => s === 'Answered').length;

            setAnalysisResult({
                totalFetched: questionMatches.length,
                answeredCount: answeredCount,
                unansweredCount: questionMatches.length - answeredCount,
                questions: questionMatches.map((mid, i) => ({
                    questionId: mid,
                    status: statusMatches[i] || 'Unknown',
                    chosenOption: optionMatches[i] || '--'
                }))
            });

            setUnattempted(questionMatches.length - answeredCount);
            setCalculationMethod("url");
            
            const verif = document.getElementById('verification-grid');
            if (verif) verif.scrollIntoView({ behavior: 'smooth' });
        } catch (err: any) {
            setParseError(err.message || "Failed to parse source.");
        } finally {
            setIsParsing(false);
        }
    };

    const shareOnWhatsApp = () => {
        const text = `🚀 Just calculated my JEE Main 2026 Score: ${stats.score}/300 (~${stats.percentile}%ile)! 🎯 Checking my chances for top NITs. %0A%0ACheck your score instantly: https://www.careerwithmohit.online/blog/jee-main-2026-score-calculator-marks-vs-percentile`;
        window.open(`https://wa.me/?text=${text}`, '_blank');
    };

    const shareOnTwitter = () => {
        const text = `Just calculated my JEE Main 2026 Score: ${stats.score}/300 (~${stats.percentile}%ile)! 🎯 Checking my chances for top NITs with @CareerWithMohit. %0A%0ACheck yours: https://www.careerwithmohit.online/blog/jee-main-2026-score-calculator-marks-vs-percentile`;
        window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
    };

    const nitTarget = useMemo(() => {
        if (stats.score >= 230) return { name: "NIT Trichy / Surathkal", color: "bg-purple-600", text: "Elite Tier" };
        if (stats.score >= 190) return { name: "NIT Warangal / Rourkela", color: "bg-blue-600", text: "Top Tier" };
        if (stats.score >= 160) return { name: "NIT Allahabad / Jaipur", color: "bg-green-600", text: "Mid Tier" };
        if (stats.score >= 130) return { name: "Other NITs / IIITs", color: "bg-amber-600", text: "Safe Tier" };
        return { name: "State Govt Colleges", color: "bg-slate-600", text: "Backup Tier" };
    }, [stats.score]);

    return (
        <div className="w-full max-w-4xl mx-auto relative">
            <div className="bg-white border-[8px] border-foreground shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12 mb-12">
                <div className="flex items-center gap-4 mb-10 border-b-4 border-foreground pb-6">
                    <div className="bg-primary p-3 border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <Calculator className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
                            JEE Main 2026 Score Checker
                        </h2>
                        <p className="text-xs font-black uppercase text-slate-400 mt-1">Official Session 2 Analysis Engine</p>
                    </div>
                </div>

                {/* Response Sheet URL Section */}
                <div className="mb-12 bg-slate-50 border-4 border-foreground p-6 md:p-8 transition-transform hover:scale-[1.01] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 -mr-16 -mt-16 rounded-full group-hover:scale-150 transition-transform duration-700" />
                    
                    <div className="flex items-center gap-3 mb-6 relative z-10">
                        <div className="bg-primary text-white p-1 rounded-sm">
                            <Zap className="w-5 h-5 animate-pulse" />
                        </div>
                        <h3 className="text-xl font-black uppercase tracking-tight">Option 1: Paste NTA Response Sheet URL</h3>
                    </div>

                    <div className="mb-8 relative z-10">
                        <div className="flex flex-col md:flex-row gap-4 mb-4">
                            <input
                                type="url"
                                value={responseSheetUrl}
                                onChange={(e) => setResponseSheetUrl(e.target.value)}
                                placeholder="Paste your cdn3.digialm.com URL here..."
                                className="flex-1 bg-white border-4 border-foreground p-4 font-bold text-lg focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all placeholder:text-slate-300"
                            />
                            <button
                                onClick={handleAnalyzeUrl}
                                disabled={isAnalyzing}
                                className="bg-primary text-white border-4 border-foreground px-10 py-4 font-black uppercase hover:bg-black transition-all hover:translate-x-1 hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0 active:translate-y-0 disabled:opacity-50"
                            >
                                {isAnalyzing ? (
                                    <span className="flex items-center gap-2">
                                        <RefreshCw className="w-5 h-5 animate-spin" />
                                        Scanning...
                                    </span>
                                ) : "Auto-Calculate"}
                            </button>
                        </div>

                        {parseError && (
                            <div className="bg-rose-50 border-2 border-rose-200 p-3 mb-4 flex items-center gap-3">
                                <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                                <p className="text-rose-600 font-black text-[10px] uppercase leading-tight">
                                    {parseError}
                                </p>
                            </div>
                        )}

                        {analysisResult && (
                            <div id="verification-grid" className="bg-white border-4 border-primary p-4 animate-in slide-in-from-top-4 duration-500 shadow-[8px_8px_0px_0px_rgba(37,99,235,0.1)]">
                                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-4 mb-6 border-b-2 border-slate-100 pb-4">
                                    <div className="flex flex-wrap items-center gap-3 text-[10px] md:text-sm font-black uppercase">
                                        <div className="flex items-center gap-1.5 text-primary bg-primary/10 px-2 py-1">
                                            <Zap className="w-4 h-4" />
                                            {analysisResult.answeredCount} Answered
                                        </div>
                                        <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-2 py-1">
                                            <ShieldCheck className="w-4 h-4" />
                                            {correct || 0} Correct
                                        </div>
                                        <div className="flex items-center gap-1.5 text-rose-600 bg-rose-50 px-2 py-1">
                                            <X className="w-4 h-4 text-rose-500" />
                                            {incorrect || 0} Incorrect
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            const c = Math.floor(analysisResult.answeredCount * 0.85);
                                            const i = analysisResult.answeredCount - c;
                                            setCorrect(c);
                                            setIncorrect(i);
                                        }}
                                        className="text-[10px] font-black bg-foreground text-white px-4 py-2 uppercase hover:bg-primary transition-colors flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                    >
                                        <Trophy className="w-3 h-3" />
                                        Quick Estimate
                                    </button>
                                </div>

                                <div className="max-h-[300px] overflow-y-auto mb-6 pr-2 custom-scrollbar space-y-2">
                                    {analysisResult.questions
                                        .filter((q: any) => q.status === "Answered")
                                        .map((q: any, idx: number) => (
                                            <div key={q.questionId} className="flex items-center justify-between p-3 border-2 border-slate-100 hover:border-primary/40 transition-all bg-white hover:bg-slate-50 group/item">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-[10px] font-black text-slate-300 w-6 group-hover/item:text-primary transition-colors">#{idx + 1}</span>
                                                    <div>
                                                        <div className="text-[10px] font-black uppercase text-slate-400">QID: {q.questionId}</div>
                                                        <div className="text-xs font-bold">
                                                            Your Opt: <span className="text-primary font-black bg-primary/5 px-1.5 rounded">{q.chosenOption}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => toggleVerification(q.questionId, "correct")}
                                                        className={`p-2 border-2 transition-all hover:scale-110 ${verifications[q.questionId] === "correct" ? "bg-green-500 border-green-600 text-white shadow-[2px_2px_0px_0px_rgba(22,101,52,1)]" : "bg-white border-slate-200 text-slate-300 hover:text-green-500 hover:border-green-500"}`}
                                                    >
                                                        <Zap className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => toggleVerification(q.questionId, "incorrect")}
                                                        className={`p-2 border-2 transition-all hover:scale-110 ${verifications[q.questionId] === "incorrect" ? "bg-rose-500 border-rose-600 text-white shadow-[2px_2px_0px_0px_rgba(159,18,57,1)]" : "bg-white border-slate-200 text-slate-300 hover:text-rose-500 hover:border-rose-500"}`}
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                                <div className="p-3 bg-slate-900 text-white/50 text-center rounded-lg">
                                    <p className="text-[10px] font-black uppercase tracking-widest italic flex items-center justify-center gap-2">
                                        <HelpCircle className="w-3 h-3" />
                                        Tip: Mark questions from Answer Key to see actual score below
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="border-t-2 border-slate-200 pt-8 relative z-10 flex flex-col md:flex-row gap-6 items-start">
                        <div className="flex-1 w-full">
                            <label className="block text-xs font-black uppercase text-slate-400 mb-2">Option 2: Paste Page Source (Backup)</label>
                            <div className="relative">
                                <textarea
                                    value={pageSource}
                                    onChange={(e) => setPageSource(e.target.value)}
                                    placeholder="Backup: Right Click -> View Page Source -> Copy all -> Paste here."
                                    className="w-full h-24 bg-white border-4 border-foreground p-4 font-bold text-xs focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all mb-2 custom-scrollbar"
                                />
                                <button
                                    onClick={handleParseSource}
                                    disabled={isParsing}
                                    className="absolute bottom-4 right-4 bg-slate-800 text-white border-2 border-foreground px-4 py-2 text-[10px] font-black uppercase hover:bg-black transition-colors"
                                >
                                    {isParsing ? "Scanning..." : "Parse Code"}
                                </button>
                            </div>
                        </div>
                        <div className="w-full md:w-64 space-y-4">
                            <button
                                onClick={(e) => {
                                    const el = (e.currentTarget.parentElement?.querySelector('.help-box')) as HTMLElement;
                                    el?.classList.toggle("hidden");
                                }}
                                className="w-full bg-white border-4 border-foreground p-4 text-xs font-black uppercase hover:bg-accent transition-all flex items-center justify-between group"
                            >
                                <span>How to get URL?</span>
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <div className="help-box hidden bg-white border-2 border-slate-200 p-4 space-y-3 animate-in fade-in slide-in-from-right-2 duration-300">
                                <ol className="list-decimal list-inside text-[10px] font-bold text-slate-500 space-y-2 uppercase leading-tight">
                                    <li>Log in to **NTA portal**.</li>
                                    <li>Click **'View Responses'**.</li>
                                    <li>Copy the **URL** from address bar.</li>
                                    <li>Paste & hit 'Auto-Calculate'.</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6 mb-12">
                    <div className="h-1 flex-1 bg-slate-200"></div>
                    <span className="text-xs font-black uppercase text-slate-300 tracking-[0.3em] px-4">OR MANUAL ENTRY</span>
                    <div className="h-1 flex-1 bg-slate-200"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Inputs Section */}
                    <div className="space-y-10">
                        <div className="relative">
                            <label className="block text-sm font-black uppercase tracking-widest mb-4 text-slate-400">Correct Attempt (+4)</label>
                            <div className="relative group">
                                <input
                                    type="number"
                                    value={correct}
                                    onChange={(e) => handleCorrectChange(e.target.value)}
                                    placeholder="0"
                                    className="w-full bg-slate-50 border-[6px] border-foreground p-6 text-4xl font-black focus:bg-white focus:outline-none transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0px_0px_rgba(37,99,235,1)]"
                                />
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-green-500 font-black text-xl">+4</div>
                            </div>
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-black uppercase tracking-widest mb-4 text-slate-400">Incorrect Attempt (-1)</label>
                            <div className="relative group">
                                <input
                                    type="number"
                                    value={incorrect}
                                    onChange={(e) => handleIncorrectChange(e.target.value)}
                                    placeholder="0"
                                    className="w-full bg-slate-50 border-[6px] border-foreground p-6 text-4xl font-black focus:bg-white focus:outline-none transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0px_0px_rgba(225,29,72,1)]"
                                />
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-rose-500 font-black text-xl">-1</div>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-6 px-2">
                            <div className="flex gap-6">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase text-slate-400">Attempted</span>
                                    <span className="text-xl font-black">{(Number(correct) || 0) + (Number(incorrect) || 0)}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase text-slate-400">Left</span>
                                    <span className="text-xl font-black">{unattempted || 0}</span>
                                </div>
                            </div>
                            <button onClick={reset} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:text-black transition-colors group">
                                <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
                                Reset
                            </button>
                        </div>

                        <div className="bg-foreground text-white p-6 border-l-[12px] border-primary flex gap-4">
                            <div className="bg-primary/20 p-2 rounded self-start">
                                <ShieldCheck className="w-6 h-6 text-primary" />
                            </div>
                            <p className="text-sm font-bold leading-relaxed">
                                <span className="text-primary font-black uppercase block mb-1">2026 Marking Scheme Applied</span>
                                Numerical Questions now carry **-1 negative marking**. Percentile based on April Shift normalization.
                            </p>
                        </div>

                        {!isUnlocked && !showLeadForm && (
                            <button
                                onClick={() => {
                                    setCalculationMethod("manual");
                                    setShowLeadForm(true);
                                }}
                                className="w-full bg-primary text-white border-4 border-foreground px-8 py-6 text-2xl font-black uppercase hover:bg-black transition-all shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-4 group"
                            >
                                <Target className="w-8 h-8 group-hover:scale-125 transition-transform" />
                                Reveal Predicted Percentile
                            </button>
                        )}
                    </div>

                    {/* Results Section */}
                    <div className="flex flex-col justify-between space-y-10">
                        {!isUnlocked ? (
                            <div className="bg-slate-900 text-white p-12 border-b-[16px] border-primary relative overflow-hidden flex flex-col items-center text-center justify-center min-h-[450px] shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] group">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
                                    <Trophy className="w-64 h-64" />
                                </div>
                                
                                {!showLeadForm ? (
                                    <div className="relative z-10 transition-all flex flex-col items-center">
                                        <div className="relative mb-10">
                                            <div className="absolute inset-0 bg-primary blur-2xl opacity-20 animate-pulse" />
                                            <Zap className="w-24 h-24 text-primary relative z-10" />
                                        </div>
                                        <h3 className="text-4xl font-black uppercase mb-4 leading-none tracking-tighter">Your Results <br />Are Ready!</h3>
                                        <p className="text-slate-400 font-bold mb-12 max-w-xs uppercase text-sm tracking-widest leading-loose">Enter your details to generate your score report and NIT eligibility badge.</p>
                                        <button
                                            onClick={() => {
                                                setCalculationMethod("manual");
                                                setShowLeadForm(true);
                                            }}
                                            className="bg-white text-foreground border-4 border-foreground px-12 py-5 text-2xl font-black uppercase hover:bg-primary hover:text-white transition-all shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] hover:translate-x-1 hover:-translate-y-1"
                                        >
                                            View Report →
                                        </button>
                                    </div>
                                ) : (
                                    <div className="relative z-10 w-full animate-in fade-in zoom-in-95 duration-500">
                                        <div className="mb-10 text-left">
                                            <h4 className="text-2xl font-black uppercase italic text-primary">Unlock Analysis</h4>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Free Counselling for all users</p>
                                        </div>
                                        <form onSubmit={handleLeadSubmit} className="space-y-4">
                                            <input
                                                required
                                                type="text"
                                                placeholder="Student Name"
                                                value={leadData.name}
                                                onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                                                className="w-full bg-white/5 border-2 border-white/10 p-4 font-black text-white focus:bg-white/15 focus:outline-none focus:border-primary transition-all rounded-none"
                                            />
                                            <input
                                                required
                                                type="tel"
                                                placeholder="WhatsApp Number (for Report)"
                                                value={leadData.number}
                                                onChange={(e) => setLeadData({ ...leadData, number: e.target.value })}
                                                className="w-full bg-white/5 border-2 border-white/10 p-4 font-black text-white focus:bg-white/15 focus:outline-none focus:border-primary transition-all rounded-none"
                                            />
                                            <input
                                                required
                                                type="email"
                                                placeholder="Email Address"
                                                value={leadData.email}
                                                onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                                                className="w-full bg-white/5 border-2 border-white/10 p-4 font-black text-white focus:bg-white/15 focus:outline-none focus:border-primary transition-all rounded-none"
                                            />
                                            <button type="submit" className="w-full bg-primary text-white p-6 text-xl font-black uppercase hover:bg-white hover:text-primary transition-all shadow-[0_8px_30px_rgb(37,99,235,0.4)]">
                                                Show My Percentile
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </div>
                        ) : calculationMethod === "url" ? (
                            <div className="bg-blue-600 text-white p-12 border-b-[16px] border-foreground relative overflow-hidden animate-in fade-in zoom-in duration-700 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center text-center">
                                <div className="absolute top-0 right-0 p-8 opacity-20 animate-spin-slow">
                                    <RefreshCw className="w-48 h-48" />
                                </div>
                                <div className="relative z-10 space-y-8">
                                    <div className="bg-white text-blue-600 p-4 rounded-full inline-block animate-bounce">
                                        <Zap className="w-12 h-12" />
                                    </div>
                                    <h3 className="text-3xl md:text-5xl font-black uppercase mb-2 leading-[0.9] tracking-tighter">Scanning <br />Response Sheet</h3>
                                    <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-white animate-progress w-[80%]"></div>
                                    </div>
                                    <p className="text-white/80 font-black text-xs md:text-sm leading-relaxed border-t-2 border-white/20 pt-8 uppercase tracking-[0.2em]">Detailed session analysis being sent to via WhatsApp</p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-foreground text-white p-12 border-b-[16px] border-primary relative overflow-hidden animate-in fade-in zoom-in duration-500 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
                                <div className="absolute top-0 right-0 p-6 opacity-10 rotate-12">
                                    <Trophy className="w-48 h-48" />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-8">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary bg-primary/10 px-3 py-1 border border-primary/20 animate-pulse">Session 2 | April Attempt</span>
                                        <div className={`${nitTarget.color} text-white px-4 py-1 text-[10px] font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]`}>
                                            {nitTarget.text}
                                        </div>
                                    </div>

                                    {Number(correct) > 0 || Number(incorrect) > 0 ? (
                                        <div className="animate-in slide-in-from-bottom-8 duration-500">
                                            <div className="flex items-baseline gap-4 mb-2">
                                                <div className="text-9xl font-black leading-none italic">{stats.score}</div>
                                                <div className="text-2xl font-black text-slate-500 italic">/300</div>
                                            </div>
                                            <div className="text-xl font-bold text-slate-400 uppercase tracking-widest mb-10 italic">Total Marks Secured</div>
                                            
                                            <div className="bg-white/5 p-6 border-2 border-white/10 mb-10 flex items-center justify-between group">
                                                <div>
                                                    <div className="text-[10px] uppercase font-black text-slate-500 mb-1">Target Achievement</div>
                                                    <div className="text-2xl font-black text-white">{nitTarget.name}</div>
                                                </div>
                                                <div className={`${nitTarget.color} p-3 group-hover:scale-110 transition-transform`}>
                                                    <Compass className="w-8 h-8 text-white" />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-green-500/10 p-4 border-l-4 border-green-500">
                                                    <div className="text-[10px] uppercase font-black text-slate-400">Correct</div>
                                                    <div className="text-2xl font-black text-green-500">+{correct}</div>
                                                </div>
                                                <div className="bg-rose-500/10 p-4 border-l-4 border-rose-500">
                                                    <div className="text-[10px] uppercase font-black text-slate-400">Incorrect</div>
                                                    <div className="text-2xl font-black text-rose-500">-{incorrect}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-12 border-4 border-dashed border-white/10">
                                            <AlertCircle className="w-12 h-12 text-slate-500 mb-4" />
                                            <div className="text-2xl font-black mb-1 uppercase tracking-tighter">Awaiting Input</div>
                                            <div className="text-[10px] font-bold text-slate-500 uppercase">Enter your correct/incorrect counts</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-8">
                            <div className={`bg-white border-4 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(22,163,74,1)] transition-all relative overflow-hidden group ${!isUnlocked || calculationMethod === "url" ? "blur-sm grayscale pointer-events-none opacity-50" : "hover:-translate-y-2"}`}>
                                <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <ShieldCheck className="w-12 h-12" />
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 mb-3">
                                    Accuracy
                                </div>
                                <div className="text-4xl font-black text-foreground">{stats.accuracy.toFixed(1)}%</div>
                            </div>

                            <div className={`bg-white border-4 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(37,99,235,1)] transition-all relative overflow-hidden group ${!isUnlocked || calculationMethod === "url" ? "blur-sm grayscale pointer-events-none opacity-50" : "hover:-translate-y-2"}`}>
                                <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Target className="w-12 h-12" />
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 mb-3">
                                    Percentile
                                </div>
                                <div className="text-4xl font-black text-foreground">~{stats.percentile}+</div>
                            </div>
                        </div>

                        {/* Social Sharing - VIRAL COMPONENT */}
                        {isUnlocked && (
                             <div className="bg-slate-50 border-4 border-dotted border-slate-300 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 animate-in slide-in-from-bottom-4 duration-500">
                                <div className="text-center sm:text-left">
                                    <h5 className="text-sm font-black uppercase italic">Share your achievement!</h5>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Help your friends calculate their scores too.</p>
                                </div>
                                <div className="flex gap-4">
                                    <button 
                                        onClick={shareOnWhatsApp}
                                        className="bg-green-600 text-white p-4 border-2 border-foreground hover:bg-green-700 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                                        title="Share on WhatsApp"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Send className="w-5 h-5" />
                                            <span className="text-xs font-black uppercase">WhatsApp</span>
                                        </div>
                                    </button>
                                    <button 
                                        onClick={shareOnTwitter}
                                        className="bg-black text-white p-4 border-2 border-foreground hover:bg-slate-800 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                                        title="Share on X (Twitter)"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg">𝕏</span>
                                            <span className="text-xs font-black uppercase">Twitter</span>
                                        </div>
                                    </button>
                                </div>
                             </div>
                        )}

                        <button
                            onClick={() => setShowInquiry(true)}
                            className="w-full bg-primary text-white p-10 border-4 border-foreground flex items-center justify-between group cursor-pointer hover:bg-black transition-all text-left shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-white/20" />
                            <div className="relative z-10">
                                <div className="text-[10px] font-black uppercase tracking-[0.4em] mb-2 text-white/70">Admission Expert Help</div>
                                <div className="text-2xl md:text-3xl font-black uppercase leading-none tracking-tighter">Get NIT Admission Strategy</div>
                            </div>
                            <ChevronRight className="w-10 h-10 group-hover:translate-x-4 transition-all flex-shrink-0" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Viral Share Floating Button */}
            {isUnlocked && (
                <button 
                    onClick={shareOnWhatsApp}
                    className="fixed bottom-8 right-8 z-50 bg-green-500 text-white p-6 rounded-full border-8 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:scale-110 active:scale-95 transition-all animate-bounce-slow"
                >
                    <Send className="w-8 h-8" />
                </button>
            )}

            {showInquiry && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-foreground/80 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-[48px_48px_0px_0px_rgba(0,0,0,1)] border-[12px] border-foreground">
                        <button
                            onClick={() => setShowInquiry(false)}
                            className="absolute top-6 right-6 z-[110] bg-white border-8 border-foreground p-3 hover:bg-rose-50 hover:text-rose-600 transition-colors shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
                        >
                            <X className="h-8 w-8 stroke-[4px]" />
                        </button>
                        <div className="bg-white">
                            <div className="bg-primary p-12 text-center border-b-[12px] border-foreground relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-4 bg-accent" />
                                <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-4 leading-none">Engineering <br />Dominance 2026</h2>
                                <p className="text-blue-100 font-bold text-xl uppercase tracking-widest">Connect with Mohit Jain's Strategic Admission Team</p>
                            </div>
                            <div className="p-8 md:p-16">
                                <InquiryForm />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            <style jsx global>{`
                @keyframes progress {
                    0% { width: 0%; }
                    100% { width: 80%; }
                }
                .animate-progress {
                    animation: progress 3s ease-out forwards;
                }
                .animate-spin-slow {
                    animation: spin 8s linear infinite;
                }
                .animate-bounce-slow {
                    animation: bounce 3s infinite;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #3b82f6;
                    border: 2px solid #f1f1f1;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #2563eb;
                }
            `}</style>
        </div>
    );
}
    );
}
