"use client";

import React, { useState, useMemo } from 'react';
import { Search, GraduationCap, TrendingUp, Landmark, Calculator, ArrowUpRight, X } from 'lucide-react';

const COLLEGE_DATA = [
  { "name": "IIM Ahmedabad", "avgPlacement": "₹34.45 Lakhs", "highestPlacement": "₹1.46 Crores", "lowestPlacement": "₹15.00 Lakhs", "fees": "₹26.50 Lakhs" },
  { "name": "IIM Bangalore", "avgPlacement": "₹34.88 Lakhs", "highestPlacement": "₹1.15 Crores", "lowestPlacement": "₹18.00 Lakhs", "fees": "₹26.50 Lakhs" },
  { "name": "IIM Calcutta", "avgPlacement": "₹34.23 Lakhs", "highestPlacement": "₹1.45 Crores", "lowestPlacement": "₹16.00 Lakhs", "fees": "₹27.00 Lakhs" },
  { "name": "IIM Lucknow", "avgPlacement": "₹30.00 Lakhs", "highestPlacement": "₹1.23 Crores", "lowestPlacement": "₹11.00 Lakhs", "fees": "₹21.75 Lakhs" },
  { "name": "IIM Kozhikode", "avgPlacement": "₹28.05 Lakhs", "highestPlacement": "₹72.02 Lakhs", "lowestPlacement": "₹12.00 Lakhs", "fees": "₹22.50 Lakhs" },
  { "name": "IIM Indore", "avgPlacement": "₹25.68 Lakhs", "highestPlacement": "₹1.00 Crores", "lowestPlacement": "₹12.00 Lakhs", "fees": "₹21.17 Lakhs" },
  { "name": "FMS Delhi", "avgPlacement": "₹34.10 Lakhs", "highestPlacement": "₹1.23 Crores", "lowestPlacement": "₹20.00 Lakhs", "fees": "₹2.32 Lakhs" },
  { "name": "XLRI Jamshedpur", "avgPlacement": "₹32.70 Lakhs", "highestPlacement": "₹1.10 Crores", "lowestPlacement": "₹17.00 Lakhs", "fees": "₹28.00 Lakhs" },
  { "name": "SPJIMR Mumbai", "avgPlacement": "₹33.00 Lakhs", "highestPlacement": "₹89.00 Lakhs", "lowestPlacement": "₹18.00 Lakhs", "fees": "₹21.50 Lakhs" },
  { "name": "ISB Hyderabad", "avgPlacement": "₹34.20 Lakhs", "highestPlacement": "₹60.00 Lakhs", "lowestPlacement": "₹20.00 Lakhs", "fees": "₹33.00 Lakhs" },
  { "name": "MDI Gurgaon", "avgPlacement": "₹27.50 Lakhs", "highestPlacement": "₹60.00 Lakhs", "lowestPlacement": "₹14.00 Lakhs", "fees": "₹24.00 Lakhs" },
  { "name": "SIBM Pune", "avgPlacement": "₹26.77 Lakhs", "highestPlacement": "₹50.00 Lakhs", "lowestPlacement": "₹18.00 Lakhs", "fees": "₹25.00 Lakhs" },
  { "name": "SCMHRD Pune", "avgPlacement": "₹24.28 Lakhs", "highestPlacement": "₹38.00 Lakhs", "lowestPlacement": "₹16.00 Lakhs", "fees": "₹24.00 Lakhs" },
  { "name": "IIM Mumbai (NITIE)", "avgPlacement": "₹25.40 Lakhs", "highestPlacement": "₹54.00 Lakhs", "lowestPlacement": "₹12.00 Lakhs", "fees": "₹21.00 Lakhs" },
  { "name": "JBIMS Mumbai", "avgPlacement": "₹28.02 Lakhs", "highestPlacement": "₹67.00 Lakhs", "lowestPlacement": "₹18.00 Lakhs", "fees": "₹6.10 Lakhs" },
  { "name": "TISS Mumbai", "avgPlacement": "₹28.30 Lakhs", "highestPlacement": "₹49.00 Lakhs", "lowestPlacement": "₹16.00 Lakhs", "fees": "₹1.80 Lakhs" },
  { "name": "BIMTECH Greater Noida", "avgPlacement": "₹11.10 Lakhs", "highestPlacement": "₹24.43 Lakhs", "lowestPlacement": "₹6.00 Lakhs", "fees": "₹14.00 Lakhs" },
  { "name": "GL Bajaj Greater Noida", "avgPlacement": "₹7.12 Lakhs", "highestPlacement": "₹30.00 Lakhs", "lowestPlacement": "₹4.00 Lakhs", "fees": "₹6.00 Lakhs" },
  { "name": "NDIM Delhi", "avgPlacement": "₹8.50 Lakhs", "highestPlacement": "₹16.10 Lakhs", "lowestPlacement": "₹5.00 Lakhs", "fees": "₹11.50 Lakhs" },
  { "name": "FIIB Delhi", "avgPlacement": "₹8.50 Lakhs", "highestPlacement": "₹25.00 Lakhs", "lowestPlacement": "₹5.50 Lakhs", "fees": "₹10.10 Lakhs" },
  { "name": "IIT Bombay (SJMSOM)", "avgPlacement": "₹28.01 Lakhs", "highestPlacement": "₹54.00 Lakhs", "lowestPlacement": "₹18.00 Lakhs", "fees": "₹12.00 Lakhs" },
  { "name": "IIT Delhi (DMS)", "avgPlacement": "₹25.82 Lakhs", "highestPlacement": "₹41.13 Lakhs", "lowestPlacement": "₹16.00 Lakhs", "fees": "₹11.20 Lakhs" },
  { "name": "IIM Shillong", "avgPlacement": "₹26.10 Lakhs", "highestPlacement": "₹71.30 Lakhs", "lowestPlacement": "₹11.00 Lakhs", "fees": "₹15.00 Lakhs" },
  { "name": "IIM Rohtak", "avgPlacement": "₹18.73 Lakhs", "highestPlacement": "₹36.00 Lakhs", "lowestPlacement": "₹10.00 Lakhs", "fees": "₹17.90 Lakhs" },
  { "name": "IIM Ranchi", "avgPlacement": "₹19.29 Lakhs", "highestPlacement": "₹50.39 Lakhs", "lowestPlacement": "₹10.00 Lakhs", "fees": "₹17.50 Lakhs" },
  { "name": "IIM Raipur", "avgPlacement": "₹18.15 Lakhs", "highestPlacement": "₹42.29 Lakhs", "lowestPlacement": "₹9.50 Lakhs", "fees": "₹18.00 Lakhs" },
  { "name": "IIM Trichy", "avgPlacement": "₹19.43 Lakhs", "highestPlacement": "₹43.69 Lakhs", "lowestPlacement": "₹10.00 Lakhs", "fees": "₹21.00 Lakhs" },
  { "name": "IIM Udaipur", "avgPlacement": "₹20.30 Lakhs", "highestPlacement": "₹35.04 Lakhs", "lowestPlacement": "₹11.00 Lakhs", "fees": "₹20.43 Lakhs" },
  { "name": "IIM Kashipur", "avgPlacement": "₹18.11 Lakhs", "highestPlacement": "₹37.00 Lakhs", "lowestPlacement": "₹10.00 Lakhs", "fees": "₹17.30 Lakhs" },
  { "name": "IIM Visakhapatnam", "avgPlacement": "₹16.61 Lakhs", "highestPlacement": "₹43.25 Lakhs", "lowestPlacement": "₹9.00 Lakhs", "fees": "₹20.50 Lakhs" },
  { "name": "IIM Nagpur", "avgPlacement": "₹16.74 Lakhs", "highestPlacement": "₹64.00 Lakhs", "lowestPlacement": "₹9.00 Lakhs", "fees": "₹21.00 Lakhs" },
  { "name": "IIM Amritsar", "avgPlacement": "₹16.58 Lakhs", "highestPlacement": "₹36.25 Lakhs", "lowestPlacement": "₹9.00 Lakhs", "fees": "₹21.00 Lakhs" },
  { "name": "IIM Jammu", "avgPlacement": "₹16.50 Lakhs", "highestPlacement": "₹64.00 Lakhs", "lowestPlacement": "₹8.50 Lakhs", "fees": "₹20.73 Lakhs" },
  { "name": "IIM Sirmaur", "avgPlacement": "₹14.45 Lakhs", "highestPlacement": "₹64.12 Lakhs", "lowestPlacement": "₹8.00 Lakhs", "fees": "₹20.00 Lakhs" },
  { "name": "IIM Bodh Gaya", "avgPlacement": "₹16.01 Lakhs", "highestPlacement": "₹48.58 Lakhs", "lowestPlacement": "₹8.50 Lakhs", "fees": "₹17.96 Lakhs" },
  { "name": "IIM Sambalpur", "avgPlacement": "₹16.64 Lakhs", "highestPlacement": "₹64.61 Lakhs", "lowestPlacement": "₹8.50 Lakhs", "fees": "₹21.01 Lakhs" },
  { "name": "NMIMS Mumbai", "avgPlacement": "₹26.63 Lakhs", "highestPlacement": "₹67.80 Lakhs", "lowestPlacement": "₹14.00 Lakhs", "fees": "₹24.00 Lakhs" },
  { "name": "IMT Ghaziabad", "avgPlacement": "₹16.25 Lakhs", "highestPlacement": "₹41.55 Lakhs", "lowestPlacement": "₹10.00 Lakhs", "fees": "₹21.53 Lakhs" },
  { "name": "IMI New Delhi", "avgPlacement": "₹17.01 Lakhs", "highestPlacement": "₹70.95 Lakhs", "lowestPlacement": "₹11.00 Lakhs", "fees": "₹22.00 Lakhs" },
  { "name": "IIFT Delhi/Kolkata", "avgPlacement": "₹29.10 Lakhs", "highestPlacement": "₹85.00 Lakhs", "lowestPlacement": "₹15.00 Lakhs", "fees": "₹22.50 Lakhs" },
  { "name": "XIM Bhubaneswar", "avgPlacement": "₹19.53 Lakhs", "highestPlacement": "₹30.00 Lakhs", "lowestPlacement": "₹12.00 Lakhs", "fees": "₹24.60 Lakhs" },
  { "name": "GIM Goa", "avgPlacement": "₹14.81 Lakhs", "highestPlacement": "₹26.30 Lakhs", "lowestPlacement": "₹9.00 Lakhs", "fees": "₹20.40 Lakhs" },
  { "name": "TAPMI Manipal", "avgPlacement": "₹13.84 Lakhs", "highestPlacement": "₹32.02 Lakhs", "lowestPlacement": "₹8.50 Lakhs", "fees": "₹18.00 Lakhs" },
  { "name": "K J Somaiya Mumbai", "avgPlacement": "₹12.79 Lakhs", "highestPlacement": "₹28.50 Lakhs", "lowestPlacement": "₹8.00 Lakhs", "fees": "₹22.32 Lakhs" },
  { "name": "IRMA Anand", "avgPlacement": "₹14.17 Lakhs", "highestPlacement": "₹31.16 Lakhs", "lowestPlacement": "₹9.00 Lakhs", "fees": "₹16.75 Lakhs" },
  { "name": "FORE New Delhi", "avgPlacement": "₹16.01 Lakhs", "highestPlacement": "₹70.00 Lakhs", "lowestPlacement": "₹10.00 Lakhs", "fees": "₹20.77 Lakhs" },
  { "name": "MICA Ahmedabad", "avgPlacement": "₹19.21 Lakhs", "highestPlacement": "₹35.50 Lakhs", "lowestPlacement": "₹11.00 Lakhs", "fees": "₹28.00 Lakhs" },
  { "name": "LBSIM Delhi", "avgPlacement": "₹12.42 Lakhs", "highestPlacement": "₹24.75 Lakhs", "lowestPlacement": "₹8.00 Lakhs", "fees": "₹15.50 Lakhs" },
  { "name": "IIT Kharagpur (VGSoM)", "avgPlacement": "₹22.75 Lakhs", "highestPlacement": "₹37.63 Lakhs", "lowestPlacement": "₹15.00 Lakhs", "fees": "₹12.85 Lakhs" },
  { "name": "UBS Chandigarh", "avgPlacement": "₹12.43 Lakhs", "highestPlacement": "₹24.00 Lakhs", "lowestPlacement": "₹7.00 Lakhs", "fees": "₹4.00 Lakhs" }
];

export default function CollegeDataFetcher() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollege, setSelectedCollege] = useState<typeof COLLEGE_DATA[0] | null>(null);

  const filteredColleges = useMemo(() => {
    if (!searchTerm || searchTerm.length < 1) return [];
    return COLLEGE_DATA.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5);
  }, [searchTerm]);

  return (
    <div className="w-full bg-[#18181b] p-6 border-4 border-white shadow-[8px_8px_0px_0px_rgba(244,63,94,1)] text-white font-display">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-6 h-6 text-rose-500" />
        <h3 className="text-xl font-black uppercase tracking-tighter italic underline decoration-rose-500 underline-offset-4">
          Placement <span className="text-rose-500">Fast-Check.</span>
        </h3>
      </div>
      
      <p className="text-xs font-bold text-gray-400 mb-6 leading-tight uppercase tracking-widest">
        Instantly get placement & fee data for any top MBA college in India.
      </p>

      {!selectedCollege ? (
        <div className="relative">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-rose-500 transition-colors" />
            <input 
              type="text"
              placeholder="ENTER COLLEGE NAME..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-14 pl-12 pr-4 bg-transparent border-4 border-white font-black text-lg focus:outline-none focus:border-rose-500 focus:bg-white/5 transition-all placeholder:text-gray-600 uppercase"
            />
          </div>

          {filteredColleges.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white border-4 border-white shadow-[6px_6px_0px_0px_rgba(244,63,94,1)] z-50 overflow-hidden">
              {filteredColleges.map((college) => (
                <button
                  key={college.name}
                  onClick={() => setSelectedCollege(college)}
                  className="w-full text-left px-4 py-3 bg-[#18181b] hover:bg-rose-500 text-white font-black uppercase text-sm border-b-2 border-white last:border-0 transition-colors"
                >
                  {college.name}
                </button>
              ))}
            </div>
          )}
          
          <div className="mt-4 flex flex-col gap-2">
            <p className="text-[10px] font-black uppercase text-gray-500 italic">Popular: IIM Ahmedabad, SIBM Pune, NDIM Delhi</p>
            <a 
              href={`https://www.google.com/search?q=${searchTerm.length > 0 ? searchTerm : "top+mba+colleges"}+placement+fees+2025`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-black uppercase text-rose-400 flex items-center gap-1 hover:underline"
            >
              Search more on Google <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      ) : (
        <div className="bg-white text-[#18181b] p-6 border-4 border-rose-500 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] animate-in zoom-in-95 duration-200 relative">
          <button 
            onClick={() => { setSelectedCollege(null); setSearchTerm(''); }}
            className="absolute top-2 right-2 p-1 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="mb-4">
              <h4 className="text-xl font-black uppercase tracking-tighter leading-none mb-1">{selectedCollege.name}</h4>
              <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest border-b-2 border-gray-200 pb-1">2024-25 Batch Data</span>
          </div>

          <div className="space-y-4">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-black uppercase">
                    <TrendingUp className="w-4 h-4 text-emerald-500" /> Avg Placement
                </div>
                <div className="text-lg font-black italic text-emerald-600">{selectedCollege.avgPlacement}</div>
             </div>

             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-black uppercase">
                    <ArrowUpRight className="w-4 h-4 text-blue-500" /> Highest
                </div>
                <div className="text-lg font-black italic">{selectedCollege.highestPlacement}</div>
             </div>

             <div className="flex items-center justify-between opacity-60">
                <div className="text-xs font-black uppercase">Lowest Recorded</div>
                <div className="text-sm font-black italic">{selectedCollege.lowestPlacement}</div>
             </div>

             <div className="pt-4 border-t-2 border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-black uppercase">
                    <Landmark className="w-4 h-4 text-rose-500" /> Total Fees
                </div>
                <div className="text-lg font-black italic text-rose-500 underline decoration-2">{selectedCollege.fees}</div>
             </div>
          </div>
          
          <button 
            onClick={() => window.location.href = '/inquiry'}
            className="w-full mt-6 bg-[#18181b] text-white py-3 text-xs font-black uppercase tracking-widest hover:bg-rose-500 transition-colors shadow-[4px_4px_0px_0px_rgba(244,63,94,1)] active:shadow-none translate-y-0 active:translate-x-1 active:translate-y-1"
          >
            Get Direct Admission Help
          </button>
        </div>
      )}
    </div>
  );
}
