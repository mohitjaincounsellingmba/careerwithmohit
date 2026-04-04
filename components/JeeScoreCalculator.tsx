"use client";

import { useState, useMemo } from "react";
import { Calculator, RefreshCw, Trophy, Target, AlertCircle, ChevronRight, Zap, HelpCircle, X } from "lucide-react";
import { InquiryForm } from "@/components/InquiryForm";

export function JeeScoreCalculator() {
    const [correct, setCorrect] = useState<number | "">("");
    const [incorrect, setIncorrect] = useState<number | "">("");
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

    const totalQuestions = 75; // JEE Main standard attempt (20 MCQs + 5 NVQs per subject)

    const stats = useMemo(() => {
        const c = Number(correct) || 0;
        const i = Number(incorrect) || 0;
        const score = (c * 4) - (i * 1);

        // Percentile prediction (Approximation based on 2025 trends for Session 2)
        let percentile = 0;
        if (score >= 260) percentile = 99.99;
        else if (score >= 240) percentile = 99.9;
        else if (score >= 220) percentile = 99.5;
        else if (score >= 200) percentile = 99.0;
        else if (score >= 180) percentile = 98.0;
        else if (score >= 150) percentile = 96.0;
        else if (score >= 130) percentile = 93.0;
        else if (score >= 110) percentile = 88.0;
        else if (score >= 90) percentile = 80.0;
        else percentile = 60.0;

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
                    source: `JEE Main 2026 Session 2 Calculator`,
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
                        JEE Main 2026 Score Checker
                    </h2>
                </div>

                {/* Response Sheet URL Section */}
                <div className="mb-12 bg-slate-50 border-4 border-foreground p-6 md:p-8 transition-transform hover:scale-[1.01]">
                    <div className="flex items-center gap-3 mb-6">
                        <Zap className="w-6 h-6 text-primary animate-pulse" />
                        <h3 className="text-xl font-black uppercase tracking-tight">Option 1: Analyze NTA Response Sheet</h3>
                    </div>

                    <div className="mb-8">
                        <label className="block text-xs font-black uppercase text-slate-500 mb-2">Paste your JEE Response Sheet URL</label>
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="url"
                                value={responseSheetUrl}
                                onChange={(e) => setResponseSheetUrl(e.target.value)}
                                placeholder="https://cdn3.digialm.com///per/g01/pub/..."
                                className="flex-1 bg-white border-4 border-foreground p-4 font-bold text-lg focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all"
                            />
                            <button
                                onClick={() => {
                                    setCalculationMethod("url");
                                    setShowLeadForm(true);
                                }}
                                className="bg-primary text-white border-4 border-foreground px-8 py-4 font-black uppercase hover:bg-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            >
                                Check Now
                            </button>
                        </div>
                    </div>

                    <div className="border-t-2 border-slate-200 pt-6">
                        <button
                            onClick={(e) => {
                                const el = (e.currentTarget.nextElementSibling as HTMLElement);
                                el.classList.toggle('hidden');
                            }}
                            className="text-xs font-black uppercase text-primary hover:underline flex items-center gap-2"
                        >
                            <HelpCircle className="w-4 h-4" />
                            How to get my Response Sheet URL?
                        </button>
                        <div className="hidden mt-4 bg-white border-2 border-slate-200 p-4 space-y-3">
                            <ol className="list-decimal list-inside text-sm font-bold text-slate-700 space-y-2">
                                <li>Log in to the official **NTA JEE portal**.</li>
                                <li>Click on **'View Question Paper / Response Sheet'**.</li>
                                <li>The sheet will open in a new tab. **Copy the full URL** from the browser address bar.</li>
                                <li>Paste it above and hit 'Check Now'.</li>
                            </ol>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 mb-10">
                    <div className="h-1 flex-1 bg-slate-200"></div>
                    <span className="text-xs font-black uppercase text-slate-400 tracking-widest px-4">OR MANUAL CALCULATION</span>
                    <div className="h-1 flex-1 bg-slate-200"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Inputs Section */}
                    <div className="space-y-8">
                        <div>
                            <label className="block text-sm font-black uppercase tracking-widest mb-3 text-slate-500">
                                Correct Responses (+4)
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
                                Incorrect Responses (-1)
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
                            Clear Inputs
                        </button>

                        <div className="bg-amber-50 border-4 border-amber-200 p-6 flex gap-4">
                            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                            <p className="text-sm font-bold text-amber-900 leading-tight">
                                This tool uses the official **Session 2** marking scheme. Percentile approximations are based on the latest difficulty analysis.
                            </p>
                        </div>

                        {!isUnlocked && !showLeadForm && (
                            <button
                                onClick={() => {
                                    setCalculationMethod("manual");
                                    setShowLeadForm(true);
                                }}
                                className="w-full bg-foreground text-white border-4 border-primary px-8 py-5 text-xl font-black uppercase hover:bg-black transition-all shadow-[8px_8px_0px_0px_rgba(37,99,235,1)] flex items-center justify-center gap-3"
                            >
                                <Target className="w-6 h-6" />
                                Get Predicted Percentile
                            </button>
                        )}
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
                                        <h3 className="text-2xl font-black uppercase mb-4 leading-tight">Score Analysis Ready</h3>
                                        <p className="text-slate-400 font-bold mb-8">Enter your details to unlock your marks and predicted percentile.</p>
                                        <button
                                            onClick={() => {
                                                setCalculationMethod("manual");
                                                setShowLeadForm(true);
                                            }}
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
                                                className="w-full bg-white/10 border-2 border-white/20 p-3 font-bold text-white placeholder:text-white/40 focus:bg-white/20 focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                required
                                                type="tel"
                                                placeholder="WhatsApp/Mobile Number"
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
                                                placeholder="Your City/Location"
                                                value={leadData.location}
                                                onChange={(e) => setLeadData({ ...leadData, location: e.target.value })}
                                                className="w-full bg-white/10 border-2 border-white/20 p-3 font-bold text-white placeholder:text-white/40 focus:bg-white/20 focus:outline-none"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-primary text-white p-4 font-black uppercase hover:bg-white hover:text-primary transition-all"
                                        >
                                            Show Results
                                        </button>
                                    </form>
                                )}
                            </div>
                        ) : calculationMethod === "url" ? (
                            <div className="bg-blue-600 text-white p-10 border-b-[12px] border-foreground relative overflow-hidden animate-in fade-in zoom-in duration-500 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Zap className="w-40 h-40" />
                                </div>
                                <div className="relative z-10 text-center space-y-6">
                                    <h3 className="text-2xl md:text-3xl font-black uppercase mb-2 leading-tight">
                                        URL Received Successfully
                                    </h3>
                                    <p className="text-white/80 font-bold text-sm md:text-base leading-relaxed border-t-2 border-white/20 pt-6">
                                        Our analysis engine is now mapping your responses to the Session 2 key.
                                    </p>
                                    <div className="bg-black/30 p-4 rounded-xl border-2 border-white/10 text-sm font-black tracking-widest uppercase">
                                        Check WhatsApp for your full score report! 🚀
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-foreground text-white p-10 border-b-[12px] border-primary relative overflow-hidden animate-in fade-in zoom-in duration-500">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Trophy className="w-32 h-32" />
                                </div>
                                <div className="relative z-10">
                                    <span className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-4 block">
                                        Net Raw Score
                                    </span>
                                    <div className="text-8xl font-black mb-2">{stats.score}</div>
                                    <div className="text-xl font-bold text-slate-400">/ 300 marks</div>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-6">
                            <div className={`bg-white border-4 border-foreground p-6 shadow-[8px_8px_0px_0px_rgba(255,193,7,1)] transition-all ${(!isUnlocked || calculationMethod === "url") ? "blur-sm grayscale pointer-events-none opacity-50" : ""}`}>
                                <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-500 mb-2">
                                    <Zap className="w-4 h-4" />
                                    Accuracy
                                </div>
                                <div className="text-3xl font-black text-foreground">{stats.accuracy.toFixed(1)}%</div>
                            </div>

                            <div className={`bg-white border-4 border-foreground p-6 shadow-[8px_8px_0px_0px_rgba(59,130,246,1)] transition-all ${(!isUnlocked || calculationMethod === "url") ? "blur-sm grayscale pointer-events-none opacity-50" : ""}`}>
                                <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-500 mb-2">
                                    <Target className="w-4 h-4" />
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
                                <div className="text-sm font-black uppercase tracking-widest mb-1">Targeting NITs/IIITs?</div>
                                <div className="text-xl font-black uppercase">Get Expert Admission Guidance</div>
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
                        >
                            <X className="h-6 w-6 stroke-[3px]" />
                        </button>
                        <div className="bg-white">
                            <div className="bg-primary p-8 text-center border-b-8 border-foreground">
                                <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Plan Your Admission</h2>
                                <p className="text-blue-50 font-bold mt-2">Connect with Mohit Jain's expert team for your B.Tech journey.</p>
                            </div>
                            <div className="p-4 md:p-8">
                                <InquiryForm />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
