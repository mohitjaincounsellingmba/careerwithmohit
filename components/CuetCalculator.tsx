"use client";

import { useState, useMemo } from "react";
import { Calculator, RefreshCw, Trophy, Target, AlertCircle, ChevronRight, Zap, HelpCircle, X, ShieldCheck } from "lucide-react";
import { InquiryForm } from "@/components/InquiryForm";

export function CuetCalculator() {
    const [correct, setCorrect] = useState<number | "">("");
    const [incorrect, setIncorrect] = useState<number | "">("");
    const [unattempted, setUnattempted] = useState<number | "">("");
    const [targetGoal, setTargetGoal] = useState<string>("MBA");

    // Setup calculation method to conditionally render the results UI
    const [calculationMethod, setCalculationMethod] = useState<"manual" | "url">("manual");

    // Inquiry popup state
    const [showInquiry, setShowInquiry] = useState(false);

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<any>(null);
    const [verifications, setVerifications] = useState<Record<string, 'correct' | 'incorrect' | null>>({});

    // Response Sheet URL State
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

    const totalQuestions = 75;

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
            // Highlight verification section
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
            
            // Auto-update the main counts
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

    const reset = () => {
        setCorrect("");
        setIncorrect("");
        setUnattempted("");
        setPageSource("");
        setResponseSheetUrl("");
        setCalculationMethod("manual");
        setAnalysisResult(null);
        setVerifications({});
    };

    const handleCorrectChange = (val: string) => {
        const num = parseInt(val);
        if (val === "" || (num >= 0 && num <= totalQuestions)) {
            const newCorrect = val === "" ? 0 : num;
            setCorrect(val === "" ? "" : num);
            // Re-clamp incorrect so correct + incorrect never exceeds totalQuestions
            const maxIncorrect = totalQuestions - newCorrect;
            if (Number(incorrect) > maxIncorrect) {
                setIncorrect(maxIncorrect);
            }
        }
    };

    const handleIncorrectChange = (val: string) => {
        const num = parseInt(val);
        const maxIncorrect = totalQuestions - (Number(correct) || 0);
        if (val === "" || (num >= 0 && num <= maxIncorrect)) {
            setIncorrect(val === "" ? "" : num);
        }
    };

    const stats = useMemo(() => {
        const c = Number(correct) || 0;
        const i = Number(incorrect) || 0;
        // Official NTA CUET PG Marking: +4 per correct, -1 per incorrect
        // Formula: (Correct × 4) - (Incorrect × 1)
        const score = (c * 4) - (i * 1);
        const accuracy = (c + i) > 0 ? (c / (c + i)) * 100 : 0;
        
        // Percentile Logic — aligned with NTA CUET PG 2026 Score vs Percentile table
        // Consistent with reference table: 230-250 → 99.9+, 200-229 → 99.0-99.85,
        // 180-199 → 95-98.99, 150-179 → 90-94.99, 120-149 → 80-89.99
        let percentile = 0;
        if (score >= 230) percentile = 99.9;
        else if (score >= 200) percentile = 99.0;
        else if (score >= 180) percentile = 95.0;
        else if (score >= 150) percentile = 90.0;
        else if (score >= 120) percentile = 80.0;
        else if (score >= 90)  percentile = 70.0;
        else if (score >= 60)  percentile = 60.0;
        else if (score >= 30)  percentile = 50.0;
        else if (score >= 0)   percentile = 40.0;
        else percentile = 20.0; // negative score range

        return { score, accuracy, percentile };
    }, [correct, incorrect, targetGoal]);

    const handleLeadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/leads', {
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

                <div className="mb-10 p-6 bg-slate-900 text-white border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(37,99,235,1)]">
                    <label className="block text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-primary" />
                        Please Select Your 2026 Admission Goal
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                        {["MBA", "MCA", "LLM", "MA", "M.Tech", "Other"].map((goal) => (
                            <button
                                key={goal}
                                onClick={() => {
                                    setTargetGoal(goal);
                                    setLeadData(prev => ({ ...prev, location: goal }));
                                }}
                                className={`p-3 text-xs font-black uppercase border-2 transition-all ${targetGoal === goal ? 'bg-primary border-white text-white scale-105' : 'bg-white/10 border-white/20 text-white/60 hover:bg-white/20'}`}
                            >
                                {goal}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Response Sheet URL Section */}
                <div className="mb-12 bg-slate-50 border-4 border-foreground p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Zap className="w-6 h-6 text-primary animate-pulse" />
                        <h3 className="text-xl font-black uppercase tracking-tight">Step 1: Auto-Calculate via Response Sheet</h3>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-black uppercase text-slate-500 mb-2">Method A: Submit Response Sheet URL (Instant Scan)</label>
                            <div className="flex flex-col md:flex-row gap-4 mb-4">
                                <input
                                    type="url"
                                    value={responseSheetUrl}
                                    onChange={(e) => setResponseSheetUrl(e.target.value)}
                                    placeholder="Paste your cdn3.digialm.com URL here..."
                                    className="flex-1 bg-white border-4 border-foreground p-4 font-bold text-lg focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all"
                                />
                                <button
                                    onClick={handleAnalyzeUrl}
                                    disabled={isAnalyzing}
                                    className="bg-primary text-white border-4 border-foreground px-8 py-4 font-black uppercase hover:bg-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50"
                                >
                                    {isAnalyzing ? "Scanning..." : "Analyze URL"}
                                </button>
                            </div>
                            
                            {parseError && <p className="text-rose-600 font-black text-xs uppercase mb-4 flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" />
                                {parseError}
                            </p>}

                            {analysisResult && (
                                <div id="verification-grid" className="bg-white border-4 border-primary p-4 animate-in slide-in-from-top-4 duration-500">
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 border-b-2 border-slate-100 pb-4">
                                        <div className="flex flex-wrap items-center gap-3 text-[10px] md:text-xs font-black uppercase">
                                            <div className="flex items-center gap-1.5 text-primary">
                                                <Zap className="w-4 h-4" />
                                                {analysisResult.answeredCount} Answered
                                            </div>
                                            <div className="w-1.5 h-1.5 bg-slate-200 rounded-full hidden md:block"></div>
                                            <div className="flex items-center gap-1.5 text-green-600">
                                                <ShieldCheck className="w-4 h-4" />
                                                {correct || 0} Correct
                                            </div>
                                            <div className="w-1.5 h-1.5 bg-slate-200 rounded-full hidden md:block"></div>
                                            <div className="flex items-center gap-1.5 text-rose-600">
                                                <X className="w-4 h-4 text-rose-500" />
                                                {incorrect || 0} Incorrect
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => {
                                                const c = Math.floor(analysisResult.answeredCount * 0.9);
                                                const i = analysisResult.answeredCount - c;
                                                setCorrect(c);
                                                setIncorrect(i);
                                            }}
                                            className="text-[10px] font-black bg-primary text-white px-3 py-1 uppercase hover:bg-black transition-colors"
                                        >
                                            Quick Estimate (90% Acc)
                                        </button>
                                    </div>

                                    <div className="max-h-[300px] overflow-y-auto mb-6 pr-2 custom-scrollbar">
                                        <div className="grid grid-cols-1 gap-2">
                                            {analysisResult.questions.filter((q: any) => q.status === 'Answered').map((q: any, idx: number) => (
                                                <div key={q.questionId} className="flex items-center justify-between p-3 border-2 border-slate-100 hover:border-primary/20 transition-colors bg-slate-50/50">
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-[10px] font-black text-slate-400 w-6">#{idx + 1}</span>
                                                        <div>
                                                            <div className="text-[10px] font-black uppercase text-slate-500">QID: {q.questionId}</div>
                                                            <div className="text-xs font-bold">Your Opt: <span className="text-primary font-black">{q.chosenOption}</span></div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button 
                                                            onClick={() => toggleVerification(q.questionId, 'correct')}
                                                            className={`p-2 border-2 transition-all ${verifications[q.questionId] === 'correct' ? 'bg-green-500 border-green-600 text-white' : 'bg-white border-slate-200 text-slate-300 hover:text-green-500'}`}
                                                        >
                                                            <Zap className="w-4 h-4" />
                                                        </button>
                                                        <button 
                                                            onClick={() => toggleVerification(q.questionId, 'incorrect')}
                                                            className={`p-2 border-2 transition-all ${verifications[q.questionId] === 'incorrect' ? 'bg-rose-500 border-rose-600 text-white' : 'bg-white border-slate-200 text-slate-300 hover:text-rose-500'}`}
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-400 leading-tight uppercase text-center italic">
                                        *TIPS: Quickly Mark Correct/Incorrect from key to see final score in real-time below.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="h-px bg-slate-200"></div>

                        <div>
                            <label className="block text-xs font-black uppercase text-slate-500 mb-2">Method B: Paste Page Source (Instant Attempt Summary)</label>
                            <textarea
                                value={pageSource}
                                onChange={(e) => setPageSource(e.target.value)}
                                placeholder="Backup: Instructions: Open Sheet -> View Page Source -> Copy all -> Paste here."
                                className="w-full h-24 bg-white border-4 border-foreground p-4 font-bold text-sm focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all mb-4"
                            />
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
                    <span className="text-xs font-black uppercase text-slate-400 tracking-widest px-4">Step 2: Verify & Calculate Score</span>
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
                                placeholder="Count from official key"
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
                                placeholder="Count from official key"
                                className="w-full bg-slate-50 border-4 border-foreground p-5 text-2xl font-black focus:bg-white focus:outline-none transition-all"
                            />
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex gap-4">
                                <div className="text-xs font-black uppercase text-slate-500">
                                    Attempted: <span className="text-primary">{(Number(correct) || 0) + (Number(incorrect) || 0)}</span>
                                </div>
                                <div className="text-xs font-black uppercase text-slate-500">
                                    Unattempted: <span className="text-foreground">{unattempted || 0}</span>
                                </div>
                            </div>
                            <button
                                onClick={reset}
                                className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary hover:underline group"
                            >
                                <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                                Clear
                            </button>
                        </div>


                    </div>

                    {/* Results Section */}
                    <div className="flex flex-col justify-between space-y-8">

                        {/* ── ALWAYS VISIBLE: Raw Score Card ── */}
                        <div className="bg-foreground text-white p-8 border-b-[12px] border-primary relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Trophy className="w-32 h-32" />
                            </div>
                            <div className="relative z-10">
                                <span className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-3 block">
                                    Raw Score (NTA Formula)
                                </span>
                                { (Number(correct) > 0 || Number(incorrect) > 0) ? (
                                    <>
                                        <div className={`text-8xl font-black mb-1 ${stats.score < 0 ? 'text-rose-400' : 'text-white'}`}>
                                            {stats.score}
                                        </div>
                                        <div className="text-sm font-bold text-slate-400 mb-4">out of 300</div>
                                        {/* Formula breakdown */}
                                        <div className="bg-white/10 border border-white/20 px-4 py-2 text-xs font-black font-mono mb-4">
                                            ({Number(correct)} × 4) − ({Number(incorrect)} × 1) = <span className={stats.score < 0 ? 'text-rose-300' : 'text-primary'}>{stats.score}</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-green-500/20 p-2 border-l-4 border-green-500">
                                                <div className="text-[10px] uppercase font-black">Correct (+4 each)</div>
                                                <div className="text-xl font-black">+{(Number(correct) * 4)}</div>
                                            </div>
                                            <div className="bg-rose-500/20 p-2 border-l-4 border-rose-500">
                                                <div className="text-[10px] uppercase font-black">Incorrect (−1 each)</div>
                                                <div className="text-xl font-black">−{Number(incorrect)}</div>
                                            </div>
                                        </div>
                                        {stats.score < 0 && (
                                            <div className="mt-3 bg-rose-500/20 border border-rose-500/50 p-2 text-xs font-bold text-rose-200">
                                                ⚠ Negative score is valid per NTA rules. Incorrect answers reduce your raw score.
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <div className="text-3xl font-black mb-2 uppercase text-slate-400">Enter Your Counts</div>
                                        <div className="text-sm font-bold text-slate-500">Fill correct &amp; incorrect answers on the left to see your score instantly.</div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* ── GATED: Percentile Prediction ── */}
                        {!isUnlocked ? (
                            <div className="bg-slate-900 text-white p-6 border-4 border-dashed border-primary/40 relative overflow-hidden flex flex-col items-center text-center justify-center min-h-[180px]">
                                {!showLeadForm ? (
                                    <div className="relative z-10 transition-all">
                                        <Zap className="w-10 h-10 text-primary mx-auto mb-3 animate-pulse" />
                                        <h3 className="text-lg font-black uppercase mb-2 leading-tight">Unlock Percentile Prediction</h3>
                                        <p className="text-slate-400 font-bold mb-4 text-sm">Get your predicted percentile &amp; college cutoff chances.</p>
                                        <button
                                            onClick={() => setShowLeadForm(true)}
                                            className="bg-primary text-white border-4 border-white px-6 py-3 text-sm font-black uppercase hover:bg-white hover:text-primary transition-all"
                                        >
                                            Predict My Percentile
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleLeadSubmit} className="relative z-10 w-full space-y-3 text-left">
                                        <p className="text-xs font-black text-primary uppercase mb-2">Enter details to unlock percentile →</p>
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
                                            <input
                                                required
                                                readOnly
                                                type="text"
                                                value={targetGoal}
                                                className="w-full bg-white/20 border-2 border-primary p-3 font-bold text-primary focus:outline-none uppercase text-xs cursor-not-allowed"
                                                title="Goal selected already"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-primary text-white p-3 font-black uppercase hover:bg-white hover:text-primary transition-all flex items-center justify-center gap-2"
                                        >
                                            Get My Percentile
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setShowLeadForm(false)}
                                            className="w-full text-[10px] font-black text-white/40 uppercase hover:text-white transition-colors text-center"
                                        >
                                            ← Back
                                        </button>
                                    </form>
                                )}
                            </div>
                        ) : (
                            <div className="bg-slate-900 text-white p-6 border-4 border-primary animate-in fade-in zoom-in duration-500">
                                <span className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-3 block animate-pulse">
                                    Percentile Prediction Unlocked ✓
                                </span>
                                <div className="bg-blue-500/20 border-2 border-blue-500/50 p-3">
                                    <p className="text-xs font-bold text-blue-100 leading-tight">
                                        {calculationMethod === "url" 
                                            ? "*Scanned from response sheet. Mark each question Correct/Incorrect using the answer key above to refine your score." 
                                            : "*Calculated from manual entry. This is your estimated raw score before NTA normalization."}
                                    </p>
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
