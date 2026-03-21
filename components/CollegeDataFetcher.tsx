"use client";

import React, { useState, useMemo } from 'react';
import { Search, TrendingUp, Landmark, Calculator, ArrowUpRight, X } from 'lucide-react';
import { COLLEGES_DATA } from '@/lib/data/colleges';

export default function CollegeDataFetcher() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollege, setSelectedCollege] = useState<typeof COLLEGES_DATA[0] | null>(null);

  const filteredColleges = useMemo(() => {
    if (!searchTerm || searchTerm.length < 1) return [];
    return COLLEGES_DATA.filter(c => 
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
              <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest border-b-2 border-gray-200 pb-1">Verified Site Data</span>
          </div>

          <div className="space-y-4">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-black uppercase">
                    <TrendingUp className="w-4 h-4 text-emerald-500" /> Avg Placement
                </div>
                <div className="text-lg font-black italic text-emerald-600">{selectedCollege.avg}</div>
             </div>

             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-black uppercase">
                    <ArrowUpRight className="w-4 h-4 text-blue-500" /> Highest
                </div>
                <div className="text-lg font-black italic">{selectedCollege.highest}</div>
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
