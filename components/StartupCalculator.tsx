"use client";

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Flame, 
  Zap, 
  Target, 
  ArrowRight,
  Info,
  DollarSign,
  Briefcase,
  Users,
  LineChart,
  ShieldCheck,
  Building2,
  Rocket,
  Wallet,
  ShoppingBag,
  BookOpen,
  Package
} from 'lucide-react';

export default function StartupCalculator() {
  // 1. Basic Startup Info
  const [niche, setNiche] = useState<string>('SaaS');
  const [investment, setInvestment] = useState<number>(5000000); // 50 Lakhs
  const [revenue, setRevenue] = useState<number>(500000); // Monthly Revenue
  
  // 2. Expense Inputs (Monthly)
  const [marketing, setMarketing] = useState<number>(100000);
  const [salaries, setSalaries] = useState<number>(250000);
  const [operations, setOperations] = useState<number>(50000);
  const [tech, setTech] = useState<number>(50000);
  const [legal, setLegal] = useState<number>(20000);

  // 3. Calculated Metrics
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [burnRate, setBurnRate] = useState<number>(0);
  const [runway, setRunway] = useState<number>(0);
  const [valuation, setValuation] = useState<number>(0);
  const [equityOffer, setEquityOffer] = useState<number>(0);

  const niches = [
    { name: 'SaaS', multiplier: 10, icon: <Zap className="w-4 h-4" /> },
    { name: 'E-commerce', multiplier: 3, icon: <ShoppingBag className="w-4 h-4" /> },
    { name: 'EdTech', multiplier: 6, icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Fintech', multiplier: 8, icon: <Wallet className="w-4 h-4" /> },
    { name: 'D2C Brand', multiplier: 4, icon: <Package className="w-4 h-4" /> },
    { name: 'Services', multiplier: 2, icon: <Users className="w-4 h-4" /> },
  ];

  useEffect(() => {
    // 1. Total Monthly Expenses
    const total = marketing + salaries + operations + tech + legal;
    setTotalExpenses(total);

    // 2. Burn Rate (Net Loss per month or Expenses if no revenue)
    const netBurn = Math.max(0, total - revenue);
    setBurnRate(netBurn);

    // 3. Runway (Months)
    if (netBurn > 0) {
      setRunway(investment / netBurn);
    } else {
      setRunway(99); // Infinite if profitable
    }

    // 4. Valuation (Rough Startup Estimate based on Niche Multiplier * ARR)
    const arr = revenue * 12;
    const selectedNiche = niches.find(n => n.name === niche);
    const multiplier = selectedNiche ? selectedNiche.multiplier : 5;
    const calculatedValuation = arr * multiplier;
    setValuation(calculatedValuation || investment * 4); // Default to 4x investment if no revenue

    // 5. Equity Offer (How much equity should you give for this investment?)
    // investment = valuation * equity
    // equity = investment / valuation
    if (calculatedValuation > 0) {
      const eq = (investment / (calculatedValuation + investment)) * 100;
      setEquityOffer(eq);
    } else {
      setEquityOffer(10); // Default placeholder
    }

  }, [niche, investment, revenue, marketing, salaries, operations, tech, legal]);

  const formatINR = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
    return `₹${val.toLocaleString()}`;
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-8 font-display selection:bg-yellow-400 selection:text-black">
      {/* Header Section - Shark Tank Styled */}
      <div className="bg-[#18181b] border-[6px] border-[#18181b] p-8 mb-12 shadow-[12px_12px_0px_0px_rgba(234,179,8,1)] relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500 opacity-10 -mr-24 -mt-24 rounded-full" />
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 relative z-10">
          <div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter mb-4 italic">
              Startup <span className="text-yellow-500 underline decoration-[8px]">Calculator.</span>
            </h2>
            <p className="text-xl font-bold text-gray-400 max-w-2xl leading-tight">
              Ready to face the Sharks? Pitch your numbers and see if your startup is a "Deal" or a "No-Deal". Calculate valuation, runway, and equity distribution.
            </p>
          </div>
          <div className="bg-yellow-500 text-black px-6 py-4 border-4 border-black font-black uppercase tracking-tighter shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            Pitch Score: {runway > 18 ? 'Strong' : runway > 6 ? 'Steady' : 'Burn Alert'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Inputs */}
        <div className="lg:col-span-7 space-y-8">
            
            {/* Core Pitch Box */}
            <div className="bg-white border-[6px] border-[#18181b] p-8 shadow-[8px_8px_0px_0px_rgba(234,179,8,1)]">
                <div className="flex items-center gap-3 mb-8 border-b-4 border-foreground pb-4 uppercase font-black text-xl italic">
                    <Rocket className="w-6 h-6 text-yellow-500" /> 1. The Startup Pitch
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                          Industry / Niche {niches.find(n => n.name === niche)?.icon}
                        </label>
                        <select 
                          value={niche}
                          onChange={(e) => setNiche(e.target.value)}
                          className="w-full h-14 px-4 bg-gray-50 border-4 border-foreground font-black text-xl focus:bg-yellow-50 transition-colors focus:outline-none appearance-none cursor-pointer"
                        >
                          {niches.map(n => (
                            <option key={n.name} value={n.name}>{n.name}</option>
                          ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-black uppercase tracking-widest text-gray-500">Ask Investment</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-lg">₹</span>
                            <input 
                                type="number" 
                                value={investment}
                                onChange={(e) => setInvestment(Number(e.target.value))}
                                className="w-full h-14 pl-10 pr-4 bg-gray-50 border-4 border-foreground font-black text-xl focus:bg-yellow-50 transition-colors focus:outline-none" 
                            />
                        </div>
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                        <label className="text-sm font-black uppercase tracking-widest text-gray-500">Current Monthly Revenue</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-lg">₹</span>
                            <input 
                                type="number" 
                                value={revenue}
                                onChange={(e) => setRevenue(Number(e.target.value))}
                                className="w-full h-14 pl-10 pr-4 bg-gray-50 border-4 border-foreground font-black text-xl focus:bg-yellow-50 transition-colors focus:outline-none" 
                            />
                        </div>
                        <p className="text-[10px] font-black uppercase text-gray-400">Zero revenue? Put 0 for bootstrapped models.</p>
                    </div>
                </div>
            </div>

            {/* Expenses Breakdown Box */}
            <div className="bg-white border-[6px] border-[#18181b] p-8 shadow-[8px_8px_0px_0px_rgba(244,63,94,1)]">
                <div className="flex items-center gap-3 mb-8 border-b-4 border-foreground pb-4 uppercase font-black text-xl italic text-rose-500">
                    <Flame className="w-6 h-6" /> 2. Monthly Burn Breakdown
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-black uppercase tracking-widest text-gray-500">Salaries (Team)</label>
                        <input 
                            type="number" 
                            value={salaries}
                            onChange={(e) => setSalaries(Number(e.target.value))}
                            className="w-full h-14 px-4 bg-gray-50 border-4 border-foreground font-black text-xl focus:bg-rose-50 transition-colors focus:outline-none" 
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-black uppercase tracking-widest text-gray-500">Marketing (Ads/SEO)</label>
                        <input 
                            type="number" 
                            value={marketing}
                            onChange={(e) => setMarketing(Number(e.target.value))}
                            className="w-full h-14 px-4 bg-gray-50 border-4 border-foreground font-black text-xl focus:bg-rose-50 transition-colors focus:outline-none" 
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-black uppercase tracking-widest text-gray-500">Tech / Infrastructure</label>
                        <input 
                            type="number" 
                            value={tech}
                            onChange={(e) => setTech(Number(e.target.value))}
                            className="w-full h-14 px-4 bg-gray-50 border-4 border-foreground font-black text-xl focus:bg-rose-50 transition-colors focus:outline-none" 
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-black uppercase tracking-widest text-gray-500">Admin & Operations</label>
                        <input 
                            type="number" 
                            value={operations}
                            onChange={(e) => setOperations(Number(e.target.value))}
                            className="w-full h-14 px-4 bg-gray-50 border-4 border-foreground font-black text-xl focus:bg-rose-50 transition-colors focus:outline-none" 
                        />
                    </div>
                </div>
            </div>
        </div>

        {/* Right Column: Results - SHARK TANK STYLE */}
        <div className="lg:col-span-5 space-y-8">
            <div className={`border-[10px] border-[#18181b] p-8 sticky top-32 shadow-[20px_20px_0px_0px_rgba(24,24,27,1)] overflow-hidden relative bg-white`}>
                
                {/* Shark Tank Status Badge */}
                <div className={`absolute top-0 right-0 p-6 font-black uppercase tracking-widest text-sm italic rotate-12 -mr-4 -mt-4 border-b-8 border-l-8 border-[#18181b] ${runway > 12 ? 'bg-emerald-500' : 'bg-yellow-500'} text-white`}>
                    {runway > 12 ? 'Investor Ready' : 'Warning'}
                </div>

                <div className="text-sm font-black uppercase tracking-widest text-[#18181b] opacity-60 mb-8 border-b-4 border-[#18181b] inline-block">The Shark Report</div>
                
                <div className="space-y-12">
                    
                    {/* Valuation Metric */}
                    <div className="flex items-end justify-between gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-[#18181b] font-black uppercase text-xs">
                                <Building2 className="w-4 h-4" /> Market Worth
                            </div>
                            <h4 className="text-sm font-bold text-gray-500 uppercase leading-none italic">Est. Valuation</h4>
                        </div>
                        <div className="text-right">
                            <span className="text-5xl font-black italic block leading-none">{formatINR(valuation)}</span>
                            <span className="text-sm font-black uppercase tracking-widest">Pre-money</span>
                        </div>
                    </div>

                    {/* Progress Bar for Runway */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <div className="flex items-center gap-2 font-black uppercase text-xs italic">
                                <Flame className="w-4 h-4 text-rose-500" /> Runway (Health)
                            </div>
                            <div className="text-3xl font-black italic">{Math.round(runway)} Months</div>
                        </div>
                        <div className="h-8 w-full border-4 border-[#18181b] bg-gray-100 p-1">
                            <div 
                                className={`h-full border-2 border-[#18181b] transition-all duration-1000 ${runway > 18 ? 'bg-emerald-400' : runway > 6 ? 'bg-yellow-400' : 'bg-rose-500'}`}
                                style={{ width: `${Math.min((runway / 36) * 100, 100)}%` }}
                            />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-tighter opacity-70">
                            *How long you survive with the requested capital at current burn rate. Target &gt; 18 months.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white border-4 border-[#18181b] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                            <span className="block text-[10px] font-black uppercase text-gray-400 mb-2">Monthly Burn</span>
                            <span className="text-2xl font-black italic block">₹{(totalExpenses/100000).toFixed(1)}L</span>
                        </div>
                        <div className="bg-[#18181b] border-4 border-[#18181b] p-6 shadow-[6px_6px_0px_0px_rgba(234,179,8,1)] text-white">
                            <span className="block text-[10px] font-black uppercase text-yellow-500 mb-2 whitespace-nowrap">Equity to Dilute</span>
                            <span className="text-2xl font-black italic block">{equityOffer.toFixed(1)}%</span>
                        </div>
                    </div>

                    <div className="bg-yellow-50 p-6 border-4 border-[#18181b] shadow-[8px_8px_0px_0px_rgba(234,179,8,1)]">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-black uppercase text-black">Shark Feedback</span>
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div className="text-sm font-bold leading-tight">
                            {runway < 6 
                                ? "Shark: 'The numbers don't add up! Your burn rate is too high for the asked capital. I'm out.'" 
                                : equityOffer > 25 
                                    ? "Shark: '25%+ equity? You're giving away too much too early. Re-evaluate your valuation.'" 
                                    : "Shark: 'This is a solid pitch. The runway is healthy and the equity ask is fair. Let's talk revenue growth.'"}
                        </div>
                    </div>

                    <button 
                        onClick={() => window.location.href = '/inquiry'}
                        className="w-full bg-black text-white border-4 border-yellow-500 py-5 text-xl font-black uppercase tracking-widest hover:bg-yellow-500 hover:text-black transition-all flex items-center justify-center gap-3 shadow-[8px_8px_0px_0px_rgba(234,179,8,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
                    >
                        Pitch for Funding <ArrowRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
      </div>

      <div className="mt-20 p-8 bg-[#18181b] text-white border-[6px] border-[#18181b] shadow-[12px_12px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl font-black uppercase mb-6 flex items-center gap-3 italic underline decoration-yellow-500 underline-offset-8">
                <Info className="w-6 h-6 text-yellow-500" /> Common Startup Pitfalls
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                <div className="space-y-3">
                    <div className="bg-gray-800 p-2 inline-block"><Target className="w-6 h-6 text-yellow-500" /></div>
                    <p className="font-bold leading-relaxed whitespace-pre-line">Overvaluation: Asking for too much money at too high a valuation can kill your next round.</p>
                </div>
                <div className="space-y-3">
                    <div className="bg-gray-800 p-2 inline-block"><Flame className="w-6 h-6 text-rose-500" /></div>
                    <p className="font-bold leading-relaxed">Hidden Burn: Not accounting for legal, software subscriptions, and team benefits in your monthly burn.</p>
                </div>
                <div className="space-y-3">
                    <div className="bg-gray-800 p-2 inline-block"><ShieldCheck className="w-6 h-6 text-emerald-400" /></div>
                    <p className="font-bold leading-relaxed">Equity Dilution: Founders giving away more than 20% in seed rounds often lose control of the company.</p>
                </div>
            </div>
      </div>
    </div>
  );
}
