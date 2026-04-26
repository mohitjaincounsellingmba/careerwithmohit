"use client";

import { useState, useMemo } from "react";
import { Calculator, RefreshCw, Trophy, Target, AlertCircle, ChevronRight, Zap, HelpCircle, X, Plus, Trash2 } from "lucide-react";
import { InquiryForm } from "@/components/InquiryForm";

interface Subject {
    id: string;
    name: string;
    type: "domain" | "general";
    correct: number | "";
    incorrect: number | "";
}

export function CuetUgCalculator() {
    const [subjects, setSubjects] = useState<Subject[]>([
        { id: "1", name: "Language / Domain 1", type: "domain", correct: "", incorrect: "" }
    ]);

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

    const addSubject = () => {
        const newId = (subjects.length + 1).toString();
        setSubjects([...subjects, { id: newId, name: `Subject ${newId}`, type: "domain", correct: "", incorrect: "" }]);
    };

    const removeSubject = (id: string) => {
        if (subjects.length > 1) {
            setSubjects(subjects.filter(s => s.id !== id));
        }
    };

    const updateSubject = (id: string, field: keyof Subject, value: any) => {
        setSubjects(subjects.map(s => {
            if (s.id === id) {
                return { ...s, [field]: value };
            }
            return s;
        }));
    };

    const stats = useMemo(() => {
        let totalScore = 0;
        let totalMaxMarks = 0;
        let totalAttempted = 0;
        let totalCorrect = 0;

        subjects.forEach(s => {
            const c = Number(s.correct) || 0;
            const i = Number(s.incorrect) || 0;
            const score = (c * 5) - (i * 1);
            totalScore += score;
            totalMaxMarks += s.type === "domain" ? 200 : 250;
            totalAttempted += (c + i);
            totalCorrect += c;
        });

        // Percentile prediction (Approximation based on 2024/25 trends)
        let percentile = 0;
        const percentage = (totalScore / totalMaxMarks) * 100;
        
        if (percentage >= 95) percentile = 99.9;
        else if (percentage >= 90) percentile = 99.0;
        else if (percentage >= 85) percentile = 95.0;
        else if (percentage >= 75) percentile = 90.0;
        else if (percentage >= 60) percentile = 80.0;
        else if (percentage >= 50) percentile = 70.0;
        else percentile = 50.0;

        const accuracy = totalAttempted > 0 ? (totalCorrect / totalAttempted) * 100 : 0;

        return { score: totalScore, maxMarks: totalMaxMarks, percentile, accuracy };
    }, [subjects]);

    const reset = () => {
        setSubjects([{ id: "1", name: "Language / Domain 1", type: "domain", correct: "", incorrect: "" }]);
    };

    const handleLeadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Direct Activepieces Webhook Call
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
                    source: `CUET UG 2026 Calculator`,
                    score: stats.score,
                    maxMarks: stats.maxMarks,
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
        <div className="w-full max-w-5xl mx-auto">
            <div className="bg-white border-[8px] border-foreground shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12">
                <div className="flex items-center gap-4 mb-10 border-b-4 border-foreground pb-6">
                    <div className="bg-primary p-3 border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <Calculator className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-foreground">
                        CUET UG 2026 Score Calculator
                    </h2>
                </div>

                {/* Response Sheet URL Section */}
                <div className="mb-12 bg-slate-50 border-4 border-foreground p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Zap className="w-6 h-6 text-primary animate-pulse" />
                        <h3 className="text-xl font-black uppercase tracking-tight text-foreground">Option 1: Auto-Calculate via Response Sheet</h3>
                    </div>

                    <div className="mb-8">
                        <label className="block text-xs font-black uppercase text-slate-500 mb-2">Paste your NTA Response Sheet URL here</label>
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="url"
                                value={responseSheetUrl}
                                onChange={(e) => setResponseSheetUrl(e.target.value)}
                                placeholder="https://cdn3.digialm.com///per/g01/pub/..."
                                className="flex-1 bg-white border-4 border-foreground p-4 font-bold text-lg focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all text-foreground"
                            />
                            <button
                                onClick={() => {
                                    setCalculationMethod("url");
                                    setShowLeadForm(true);
                                }}
                                className="bg-primary text-white border-4 border-foreground px-8 py-4 font-black uppercase hover:bg-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            >
                                Submit URL
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
                                <li>Log in to the official **NTA CUET UG portal**.</li>
                                <li>Click on **'View Response Sheet'** button.</li>
                                <li>The sheet will open in a new tab. **Copy the full URL** from the address bar.</li>
                                <li>Paste it in the box above and click submit.</li>
                            </ol>
                            <p className="text-[10px] font-black uppercase text-slate-400">Note: We only use the URL to parse your score. Your data remains private.</p>
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
                        <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            {subjects.map((subject) => (
                                <div key={subject.id} className="p-6 border-4 border-foreground bg-slate-50 relative group">
                                    <button 
                                        onClick={() => removeSubject(subject.id)}
                                        className="absolute -top-3 -right-3 bg-white border-2 border-foreground p-1 rounded-full text-slate-400 hover:text-rose-600 transition-colors shadow-sm hidden group-hover:block"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Subject Name</label>
                                            <input 
                                                type="text" 
                                                value={subject.name}
                                                onChange={(e) => updateSubject(subject.id, "name", e.target.value)}
                                                className="w-full bg-white border-2 border-foreground p-2 font-bold text-sm focus:outline-none text-foreground"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Type</label>
                                            <select 
                                                value={subject.type}
                                                onChange={(e) => updateSubject(subject.id, "type", e.target.value)}
                                                className="w-full bg-white border-2 border-foreground p-2 font-bold text-sm focus:outline-none text-foreground appearance-none"
                                            >
                                                <option value="domain">Language / Domain (+5/-1)</option>
                                                <option value="general">General Test (+5/-1)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Correct Qs</label>
                                            <input 
                                                type="number" 
                                                value={subject.correct}
                                                onChange={(e) => updateSubject(subject.id, "correct", e.target.value)}
                                                placeholder="0"
                                                className="w-full bg-white border-2 border-foreground p-3 font-black text-lg focus:outline-none text-emerald-600"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">Incorrect Qs</label>
                                            <input 
                                                type="number" 
                                                value={subject.incorrect}
                                                onChange={(e) => updateSubject(subject.id, "incorrect", e.target.value)}
                                                placeholder="0"
                                                className="w-full bg-white border-2 border-foreground p-3 font-black text-lg focus:outline-none text-rose-600"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={addSubject}
                                className="flex-1 flex items-center justify-center gap-2 bg-white border-4 border-foreground p-4 font-black uppercase hover:bg-slate-50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-foreground"
                            >
                                <Plus className="w-5 h-5" />
                                Add Subject
                            </button>
                            <button
                                onClick={reset}
                                className="flex items-center justify-center bg-white border-4 border-foreground p-4 font-black uppercase hover:bg-rose-50 hover:text-rose-600 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-slate-400"
                                title="Reset"
                            >
                                <RefreshCw className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="bg-amber-50 border-4 border-amber-200 p-6 flex gap-4">
                            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                            <p className="text-sm font-bold text-amber-900 leading-tight">
                                Marking: +5 for Correct, -1 for Incorrect. <br/>
                                Language/Domain: 40/50 Qs (200 marks). <br/>
                                General Test: 50/60 Qs (250 marks).
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
                                <Calculator className="w-6 h-6" />
                                Predict My CUET UG Score
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
                                        <h3 className="text-2xl font-black uppercase mb-4 leading-tight">Your Score is Ready!</h3>
                                        <p className="text-slate-400 font-bold mb-8">Submit your details to unlock your full score and predicted percentile.</p>
                                        <button
                                            onClick={() => {
                                                setCalculationMethod("manual");
                                                setShowLeadForm(true);
                                            }}
                                            className="bg-primary text-white border-4 border-white px-8 py-4 text-xl font-black uppercase hover:bg-white hover:text-primary transition-all shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]"
                                        >
                                            Unlock Results
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
                                            className="w-full bg-primary text-white p-4 font-black uppercase hover:bg-white hover:text-primary transition-all text-foreground"
                                        >
                                            Show My Scores
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
                            <div className="bg-blue-600 text-white p-10 border-b-[12px] border-foreground relative overflow-hidden animate-in fade-in zoom-in duration-500 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Zap className="w-40 h-40" />
                                </div>
                                <div className="relative z-10 text-center space-y-6">
                                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
                                        <RefreshCw className="w-8 h-8 text-white relative z-10" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-black uppercase mb-2 leading-tight">
                                        Parsing UG Response Sheet...
                                    </h3>
                                    <p className="text-white/80 font-bold text-sm md:text-base leading-relaxed border-t-2 border-white/20 pt-6">
                                        We have received your NTA CUET UG Response Sheet URL. Our engine is calculating subject-wise scores based on the latest answer keys.
                                    </p>
                                    <div className="bg-black/30 p-4 rounded-xl border-2 border-white/10 text-sm font-black tracking-widest uppercase">
                                        We will WhatsApp your detailed report shortly! 🎓
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
                                        Total Raw Score
                                    </span>
                                    <div className="text-8xl font-black mb-2">{stats.score}</div>
                                    <div className="text-xl font-bold text-slate-400">out of {stats.maxMarks} marks</div>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-6">
                            <div className={`bg-white border-4 border-foreground p-6 shadow-[8px_8px_0px_0px_rgba(255,193,7,1)] transition-all ${(!isUnlocked || calculationMethod === "url") ? "blur-sm grayscale pointer-events-none opacity-50" : ""}`}>
                                <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-500 mb-2">
                                    <Target className="w-4 h-4" />
                                    Accuracy
                                </div>
                                <div className="text-3xl font-black text-foreground">{stats.accuracy.toFixed(1)}%</div>
                            </div>

                            <div className={`bg-white border-4 border-foreground p-6 shadow-[8px_8px_0px_0px_rgba(59,130,246,1)] transition-all ${(!isUnlocked || calculationMethod === "url") ? "blur-sm grayscale pointer-events-none opacity-50" : ""}`}>
                                <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-500 mb-2">
                                    <Trophy className="w-4 h-4" />
                                    Percentile
                                </div>
                                <div className="text-3xl font-black text-foreground">~{stats.percentile}+</div>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowInquiry(true)}
                            className="w-full bg-primary text-white p-8 border-4 border-foreground flex items-center justify-between group cursor-pointer hover:bg-black transition-colors text-left"
                        >
                            <div>
                                <div className="text-sm font-black uppercase tracking-widest mb-1">Targeting DU, BHU or JNU?</div>
                                <div className="text-xl font-black uppercase">Speak to Mohit Jain Now</div>
                            </div>
                            <ChevronRight className="w-8 h-8 group-hover:translate-x-2 transition-transform flex-shrink-0" />
                        </button>
                    </div>
                </div>

                {/* Score Breakdown Table */}
                {isUnlocked && calculationMethod === "manual" && (
                    <div className="mt-12 bg-white border-4 border-foreground p-6 overflow-x-auto">
                        <h4 className="text-xl font-black uppercase mb-6 tracking-tight flex items-center gap-2 text-foreground">
                            <BarChart3 className="w-5 h-5 text-primary" />
                            Subject-wise Breakdown
                        </h4>
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-100 border-b-4 border-foreground">
                                <tr>
                                    <th className="p-4 text-xs font-black uppercase text-foreground">Subject</th>
                                    <th className="p-4 text-xs font-black uppercase text-foreground">Pattern</th>
                                    <th className="p-4 text-xs font-black uppercase text-foreground">Correct</th>
                                    <th className="p-4 text-xs font-black uppercase text-foreground">Incorrect</th>
                                    <th className="p-4 text-xs font-black uppercase text-foreground">Score</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-2 divide-slate-100 italic">
                                {subjects.map(s => {
                                    const c = Number(s.correct) || 0;
                                    const i = Number(s.incorrect) || 0;
                                    const score = (c * 5) - (i * 1);
                                    const max = s.type === "domain" ? 200 : 250;
                                    return (
                                        <tr key={s.id} className="text-foreground">
                                            <td className="p-4 font-bold">{s.name}</td>
                                            <td className="p-4 text-xs font-black uppercase">{s.type}</td>
                                            <td className="p-4 font-black text-emerald-600">{c}</td>
                                            <td className="p-4 font-black text-rose-600">{i}</td>
                                            <td className="p-4 font-black">{score}/{max}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Inquiry Modal */}
            {showInquiry && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-[32px_32px_0px_0px_rgba(0,0,0,1)] border-8 border-foreground">
                        <button
                            onClick={() => setShowInquiry(false)}
                            className="absolute top-4 right-4 z-[110] bg-white border-4 border-foreground p-2 hover:bg-rose-50 hover:text-rose-600 transition-colors pointer-events-auto"
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
                </div>
            )}
        </div>
    );
}

function BarChart3({ className }: { className?: string }) {
    return (
        <svg 
            className={className} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        >
            <path d="M3 3v18h18" />
            <path d="M7 16v-4" />
            <path d="M11 16V9" />
            <path d="M15 16V5" />
            <path d="M19 16v-7" />
        </svg>
    );
}
