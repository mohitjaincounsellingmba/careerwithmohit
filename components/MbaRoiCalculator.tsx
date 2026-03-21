"use client";

import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Wallet, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Info,
  DollarSign,
  Briefcase,
  Layers,
  Zap
} from 'lucide-react';

export default function MbaRoiCalculator() {
  // Investment Inputs
  const [tuitionFee, setTuitionFee] = useState<number>(1200000);
  const [hostelFee, setHostelFee] = useState<number>(400000);
  const [otherExpenses, setOtherExpenses] = useState<number>(100000); // Laptop, Travel, Books
  
  // Placement Inputs
  const [avgSalary, setAvgSalary] = useState<number>(1000000);
  const [salaryGrowth, setSalaryGrowth] = useState<number>(12); // % Annual Growth
  
  // Loan Inputs (Optional)
  const [isLoan, setIsLoan] = useState<boolean>(false);
  const [loanAmount, setLoanAmount] = useState<number>(600000);
  const [loanInterest, setLoanInterest] = useState<number>(9.5);
  const [loanTenure, setLoanTenure] = useState<number>(7); // Years
  const [isDrcc, setIsDrcc] = useState<boolean>(false); // 0% Interest if true

  // Summary Metrics
  const [totalInvestment, setTotalInvestment] = useState<number>(0);
  const [paybackMonths, setPaybackMonths] = useState<number>(0);
  const [roiRatio, setRoiRatio] = useState<number>(0);
  const [fiveYearGain, setFiveYearGain] = useState<number>(0);
  const [monthlyEmi, setMonthlyEmi] = useState<number>(0);

  useEffect(() => {
    // 1. Total Investment
    const total = tuitionFee + hostelFee + otherExpenses;
    setTotalInvestment(total);

    // 2. ROI Ratio (Annual Salary / Total Investment)
    const ratio = (avgSalary / total) * 100;
    setRoiRatio(ratio);

    // 3. Payback Period
    // Using Monthly In-hand (Simplified: 75% of CTC is In-hand)
    const monthlyInHand = (avgSalary * 0.75) / 12;
    const payback = total / monthlyInHand;
    setPaybackMonths(payback);

    // 4. EMI Calculation
    if (isLoan) {
      const rate = isDrcc ? 0 : (loanInterest / 100) / 12;
      const n = loanTenure * 12;
      if (rate === 0) {
        setMonthlyEmi(loanAmount / n);
      } else {
        const emi = (loanAmount * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
        setMonthlyEmi(emi);
      }
    } else {
      setMonthlyEmi(0);
    }

    // 5. 5-Year Wealth Gain
    // Cumulative (Monthly Salary - EMI) for 60 months with growth
    let wealth = 0;
    let currentSalary = avgSalary;
    for (let year = 1; year <= 5; year++) {
      const annualInHand = currentSalary * 0.75;
      const annualEmi = year <= loanTenure ? monthlyEmi * 12 : 0;
      wealth += (annualInHand - (isLoan ? annualEmi : 0));
      currentSalary *= (1 + salaryGrowth / 100);
    }
    // Subtract any initial out-of-pocket investment (Total - Loan)
    const outOfPocket = total - (isLoan ? loanAmount : 0);
    setFiveYearGain(wealth - outOfPocket);

  }, [tuitionFee, hostelFee, otherExpenses, avgSalary, salaryGrowth, isLoan, loanAmount, loanInterest, loanTenure, isDrcc]);

  const getRoiStatus = (ratio: number) => {
    if (ratio >= 100) return { label: "Exceptional", color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-500" };
    if (ratio >= 80) return { label: "Great ROI", color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-500" };
    if (ratio >= 60) return { label: "Good ROI", color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-500" };
    return { label: "High Risk / Low ROI", color: "text-rose-500", bg: "bg-rose-50", border: "border-rose-500" };
  };

  const currentStatus = getRoiStatus(roiRatio);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-8 font-display selection:bg-rose-500 selection:text-white">
      {/* Header Section */}
      <div className="bg-white border-[6px] border-[#18181b] p-8 mb-12 shadow-[12px_12px_0px_0px_rgba(24,24,27,1)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary opacity-10 -mr-12 -mt-12 rounded-full" />
        <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter mb-4 text-[#18181b] italic">
          MBA ROI <span className="text-rose-500 underline decoration-[8px]">Calculator.</span>
        </h2>
        <p className="text-xl font-bold text-gray-600 max-w-2xl leading-tight">
          Don't just look at the college name. Calculate the absolute numbers to see if that ₹15 Lakh investment actually makes financial sense.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Inputs */}
        <div className="lg:col-span-7 space-y-8">
            
            {/* Investment Box */}
            <div className="bg-white border-[6px] border-[#18181b] p-8 shadow-[8px_8px_0px_0px_rgba(24,24,27,1)]">
                <div className="flex items-center gap-3 mb-8 border-b-4 border-foreground pb-4 uppercase font-black text-xl italic">
                    <Wallet className="w-6 h-6 text-rose-500" /> 1. Total Investment
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-black uppercase tracking-widest text-gray-500">Tuition Fee (2 Years)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-lg">₹</span>
                            <input 
                                type="number" 
                                value={tuitionFee}
                                onChange={(e) => setTuitionFee(Number(e.target.value))}
                                className="w-full h-14 pl-10 pr-4 bg-gray-50 border-4 border-foreground font-black text-xl focus:bg-rose-50 transition-colors focus:outline-none" 
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-black uppercase tracking-widest text-gray-500">Hostel & Living (2 Years)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-lg">₹</span>
                            <input 
                                type="number" 
                                value={hostelFee}
                                onChange={(e) => setHostelFee(Number(e.target.value))}
                                className="w-full h-14 pl-10 pr-4 bg-gray-50 border-4 border-foreground font-black text-xl focus:bg-rose-50 transition-colors focus:outline-none" 
                            />
                        </div>
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                        <label className="text-sm font-black uppercase tracking-widest text-gray-500">Other (Laptop, Travel, Books)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-lg">₹</span>
                            <input 
                                type="number" 
                                value={otherExpenses}
                                onChange={(e) => setOtherExpenses(Number(e.target.value))}
                                className="w-full h-14 pl-10 pr-4 bg-gray-50 border-4 border-foreground font-black text-xl focus:bg-rose-50 transition-colors focus:outline-none" 
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Income & Growth Box */}
            <div className="bg-white border-[6px] border-[#18181b] p-8 shadow-[8px_8px_0px_0px_rgba(24,24,27,1)]">
                <div className="flex items-center gap-3 mb-8 border-b-4 border-foreground pb-4 uppercase font-black text-xl italic">
                    <TrendingUp className="w-6 h-6 text-emerald-500" /> 2. Salary & Growth
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-black uppercase tracking-widest text-gray-500">Avg. CTC Placement</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-lg">₹</span>
                            <input 
                                type="number" 
                                value={avgSalary}
                                onChange={(e) => setAvgSalary(Number(e.target.value))}
                                className="w-full h-14 pl-10 pr-4 bg-gray-50 border-4 border-foreground font-black text-xl focus:bg-emerald-50 transition-colors focus:outline-none" 
                            />
                        </div>
                        <p className="text-[10px] font-black uppercase text-rose-400">*75% in-hand assumed for calculations</p>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-black uppercase tracking-widest text-gray-500">Annual Growth (%)</label>
                        <div className="relative">
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-lg">%</span>
                            <input 
                                type="number" 
                                value={salaryGrowth}
                                onChange={(e) => setSalaryGrowth(Number(e.target.value))}
                                className="w-full h-14 pl-4 pr-10 bg-gray-50 border-4 border-foreground font-black text-xl focus:bg-emerald-50 transition-colors focus:outline-none" 
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Loan Section - BOLD AND BRUTAL */}
            <div className={`transition-all duration-300 border-[6px] p-8 shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] ${isLoan ? 'bg-indigo-50 border-indigo-600' : 'bg-white border-[#18181b]'}`}>
                <div className="flex items-center justify-between mb-8 border-b-4 border-indigo-600 pb-4">
                    <div className="flex items-center gap-3 uppercase font-black text-xl italic text-indigo-600">
                        <Layers className="w-6 h-6" /> 3. Education Loan
                    </div>
                    <button 
                        onClick={() => setIsLoan(!isLoan)}
                        className={`px-4 py-2 border-4 border-indigo-600 font-black uppercase text-xs transition-all ${isLoan ? 'bg-indigo-600 text-white shadow-none' : 'bg-white text-indigo-600 shadow-[4px_4px_0px_0px_rgba(79,70,229,1)]'}`}
                    >
                        {isLoan ? "Enabled" : "Add Loan"}
                    </button>
                </div>

                {isLoan && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in slide-in-from-top-4">
                        <div className="space-y-2">
                            <label className="text-sm font-black uppercase tracking-widest text-indigo-600/60">Loan Amount</label>
                            <input 
                                type="number" 
                                value={loanAmount}
                                onChange={(e) => setLoanAmount(Number(e.target.value))}
                                className="w-full h-14 px-4 bg-white border-4 border-indigo-600 font-black text-xl focus:bg-white focus:outline-none" 
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-black uppercase tracking-widest text-indigo-600/60">Interest Rate</label>
                                <button 
                                    onClick={() => setIsDrcc(!isDrcc)}
                                    className={`text-[10px] font-black uppercase border-2 p-1 ${isDrcc ? 'bg-indigo-600 text-white border-indigo-600' : 'text-indigo-600 border-indigo-600'}`}
                                >
                                    Bihar Student CC?
                                </button>
                            </div>
                            <div className="relative">
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-lg text-indigo-600">%</span>
                                <input 
                                    type="number" 
                                    value={isDrcc ? 0 : loanInterest}
                                    disabled={isDrcc}
                                    onChange={(e) => setLoanInterest(Number(e.target.value))}
                                    className="w-full h-14 px-4 bg-white border-4 border-indigo-600 font-black text-xl disabled:opacity-50" 
                                />
                            </div>
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                            <label className="text-sm font-black uppercase tracking-widest text-indigo-600/60">Repayment Period (Years)</label>
                            <input 
                                type="range" 
                                min="1" 
                                max="15" 
                                step="1"
                                value={loanTenure}
                                onChange={(e) => setLoanTenure(Number(e.target.value))}
                                className="w-full h-8 accent-indigo-600" 
                            />
                            <div className="flex justify-between font-black uppercase text-xs text-indigo-600">
                                <span>1 Year</span>
                                <span className="text-lg bg-indigo-600 text-white px-3 py-1 mt-2">{loanTenure} Years</span>
                                <span>15 Years</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* Right Column: Results - ULTRA BOLD */}
        <div className="lg:col-span-5 space-y-8">
            <div className={`border-[10px] border-[#18181b] p-8 sticky top-32 shadow-[20px_20px_0px_0px_rgba(24,24,27,1)] overflow-hidden relative ${currentStatus.bg}`}>
                
                {/* Status Indicator */}
                <div className={`absolute top-0 right-0 p-6 font-black uppercase tracking-widest text-sm italic rotate-12 -mr-4 -mt-4 border-b-8 border-l-8 border-[#18181b] ${currentStatus.bg === 'bg-rose-50' ? 'bg-rose-500 text-white' : 'bg-[#18181b] text-white'}`}>
                    {currentStatus.label}
                </div>

                <div className="text-sm font-black uppercase tracking-widest text-[#18181b] opacity-60 mb-8 border-b-4 border-[#18181b] inline-block">The Verdict</div>
                
                <div className="space-y-12">
                    
                    {/* Payback Metric */}
                    <div className="flex items-end justify-between gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-[#18181b] font-black uppercase text-xs">
                                <Clock className="w-4 h-4" /> Recover Time
                            </div>
                            <h4 className="text-sm font-bold text-gray-500 uppercase leading-none italic">Payback Period</h4>
                        </div>
                        <div className="text-right">
                            <span className="text-6xl font-black italic block leading-none">{Math.round(paybackMonths)}</span>
                            <span className="text-sm font-black uppercase tracking-widest">Months</span>
                        </div>
                    </div>

                    {/* Progress Bar for ROI Ratio */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <div className="flex items-center gap-2 font-black uppercase text-xs italic">
                                <Zap className="w-4 h-4" /> ROI Efficiency Index
                            </div>
                            <div className="text-3xl font-black italic">{roiRatio.toFixed(1)}%</div>
                        </div>
                        <div className="h-8 w-full border-4 border-[#18181b] bg-white p-1">
                            <div 
                                className={`h-full border-2 border-[#18181b] transition-all duration-1000 ${roiRatio > 80 ? 'bg-emerald-400' : roiRatio > 60 ? 'bg-amber-400' : 'bg-rose-500'}`}
                                style={{ width: `${Math.min(roiRatio, 100)}%` }}
                            />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-tighter opacity-70">
                            *This index represents how much of your total cost is recovered as annual salary. &gt;80% is elite.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white border-4 border-[#18181b] p-6 shadow-[6px_6px_0px_0px_rgba(24,24,27,1)]">
                            <span className="block text-[10px] font-black uppercase text-gray-400 mb-2">Total Outflow</span>
                            <span className="text-2xl font-black italic block">₹{(totalInvestment/100000).toFixed(1)}L</span>
                        </div>
                        <div className="bg-[#18181b] border-4 border-[#18181b] p-6 shadow-[6px_6px_0px_0px_rgba(34,197,94,1)] text-white">
                            <span className="block text-[10px] font-black uppercase text-gray-400 mb-2 whitespace-nowrap">Net Gain (5 Yrs)</span>
                            <span className="text-2xl font-black italic block">₹{(fiveYearGain/100000).toFixed(1)}L</span>
                        </div>
                    </div>

                    {isLoan && (
                        <div className="bg-indigo-600 text-white p-6 border-4 border-[#18181b] shadow-[8px_8px_0px_0px_rgba(79,70,229,1)]">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-black uppercase">Your Monthly EMI</span>
                                <AlertCircle className="w-4 h-4 opacity-50" />
                            </div>
                            <div className="text-4xl font-black italic">₹{Math.round(monthlyEmi).toLocaleString()}</div>
                            <p className="mt-3 text-[10px] font-bold opacity-80 leading-tight uppercase">
                                This amount will be deducted from your monthly salary for the next {loanTenure} years.
                            </p>
                        </div>
                    )}

                    <div className="pt-4 border-t-4 border-[#18181b] opacity-80">
                         <div className="font-black uppercase text-xs mb-4">Expert Advice:</div>
                         <div className="text-sm font-bold leading-tight">
                            {roiRatio > 80 
                                ? "This college offers exceptional value. Your career jump exceeds the investment risk significantly. Go for it!" 
                                : roiRatio > 50 
                                    ? "Decent ROI. Ensure the brand name and alumni network justify the out-of-pocket costs and EMI burden." 
                                    : "Warning: The payback period exceeds 4 years. This investment involves high stress unless the college has a very high placement ceiling."}
                         </div>
                    </div>

                    <button 
                        onClick={() => window.location.href = '/inquiry'}
                        className="w-full bg-rose-500 text-white border-4 border-[#18181b] py-5 text-xl font-black uppercase tracking-widest hover:bg-[#18181b] transition-all flex items-center justify-center gap-3 shadow-[8px_8px_0px_0px_rgba(24,24,27,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
                    >
                        Secure Admission Support <ArrowRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
      </div>

      <div className="mt-20 p-8 bg-[#18181b] text-white border-[6px] border-[#18181b] shadow-[12px_12px_0px_0px_rgba(244,63,94,1)]">
            <h3 className="text-2xl font-black uppercase mb-6 flex items-center gap-3 italic underline decoration-rose-500 underline-offset-8">
                <Info className="w-6 h-6 text-rose-500" /> Need a Certified ROI Report?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                <div className="space-y-3">
                    <div className="bg-gray-800 p-2 inline-block"><CheckCircle2 className="w-6 h-6 text-emerald-400" /></div>
                    <p className="font-bold leading-relaxed">Our experts analyze NAAC/NIRF data to give you the most accurate placement projections.</p>
                </div>
                <div className="space-y-3">
                    <div className="bg-gray-800 p-2 inline-block"><CheckCircle2 className="w-6 h-6 text-emerald-400" /></div>
                    <p className="font-bold leading-relaxed">Specific guidance for DRCC students planning to pursue MBA from Pune/Bangalore.</p>
                </div>
                <div className="space-y-3">
                    <div className="bg-gray-800 p-2 inline-block"><CheckCircle2 className="w-6 h-6 text-emerald-400" /></div>
                    <p className="font-bold leading-relaxed">One-on-one session with Mohit Jain to optimize your college selection based on budget.</p>
                </div>
            </div>
      </div>
    </div>
  );
}
