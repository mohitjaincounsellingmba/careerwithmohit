'use client';

import React, { useState, useMemo } from 'react';
import { ShieldCheck, Search, MapPin, Calendar, ExternalLink, Info, CheckCircle, AlertCircle, Compass, GraduationCap, Building2 } from 'lucide-react';
import { databaseMapping, courseAccreditations, accreditationInfo, CollegeRecord } from '../data/accreditationData';

export function AccreditationChecker() {
  const [course, setCourse] = useState('');
  const [accreditation, setAccreditation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const availableAccreditations = useMemo(() => {
    return course ? courseAccreditations[course] : [];
  }, [course]);

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCourse(e.target.value);
    setAccreditation('');
  };

  const currentDatabase = useMemo(() => {
    // If PGDM + AIU, show AIU list. For others, show their respective databases if mapped.
    return databaseMapping[accreditation] || [];
  }, [accreditation]);

  const filteredColleges = useMemo(() => {
    return currentDatabase.filter((college) =>
      college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      college.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      college.state.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [currentDatabase, searchQuery]);

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 mb-12">
      <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-950 p-10 sm:p-16 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 px-5 py-2.5 rounded-full text-blue-200 text-sm font-black mb-8 backdrop-blur-md border border-blue-400/30 uppercase tracking-widest">
            <ShieldCheck size={18} className="text-blue-400" />
            <span>Academic Trust Auditor 2024-25</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black mb-8 tracking-tighter leading-none">
            Verify Your Degree <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 italic">Accreditation</span>
          </h2>
          <p className="text-blue-100/80 text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Protect your career. Audit AICTE, UGC, BCI, COA, and PCI status of any campus in India instantly.
          </p>
        </div>
      </div>

      <div className="p-8 sm:p-14 bg-gray-50/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
          <div className="space-y-4">
            <label className="text-xs font-black text-blue-900 uppercase tracking-[0.2em] flex items-center gap-2 px-1">
              <GraduationCap size={16} />
              1. Choose Program Category
            </label>
            <div className="relative">
              <select
                value={course}
                onChange={handleCourseChange}
                className="w-full p-5 rounded-3xl border-2 border-gray-100 bg-white hover:border-blue-500 focus:border-blue-600 focus:ring-8 focus:ring-blue-600/5 transition-all outline-none text-gray-900 font-black appearance-none cursor-pointer shadow-sm hover:shadow-md text-lg"
              >
                <option value="">Select Course (B.Tech, MBA, Law...)</option>
                {Object.keys(courseAccreditations).map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <Compass size={20} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-black text-indigo-900 uppercase tracking-[0.2em] flex items-center gap-2 px-1">
              <Building2 size={16} />
              2. Approval Body to Audit
            </label>
            <div className="relative">
              <select
                value={accreditation}
                onChange={(e) => setAccreditation(e.target.value)}
                disabled={!course}
                className="w-full p-5 rounded-3xl border-2 border-gray-100 bg-white hover:border-indigo-500 focus:border-indigo-600 focus:ring-8 focus:ring-indigo-600/5 transition-all outline-none text-gray-900 font-black appearance-none cursor-pointer disabled:opacity-50 shadow-sm hover:shadow-md text-lg"
              >
                <option value="">{course ? "Choose Approval Type" : "Select Course First"}</option>
                {availableAccreditations.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
               <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <ShieldCheck size={20} />
              </div>
            </div>
          </div>
        </div>

        {accreditation && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-[2.5rem] p-8 sm:p-10 border border-blue-100 mb-14 flex flex-col md:flex-row gap-8 items-center animate-in fade-in slide-in-from-top-6 duration-500">
            <div className="bg-white p-5 rounded-3xl shadow-xl border border-blue-100 shrink-0 transform -rotate-3 hover:rotate-0 transition-transform">
              <div className="bg-blue-600 text-white p-4 rounded-2xl">
                <Info size={32} />
              </div>
            </div>
            <div>
              <h4 className="text-blue-900 font-black text-2xl mb-3 flex items-center gap-2 uppercase tracking-tight">
                Role of {accreditation} <span className="text-blue-500">Auditor</span>
              </h4>
              <p className="text-blue-800/70 leading-relaxed font-bold text-lg">
                {accreditationInfo[accreditation]}
              </p>
            </div>
          </div>
        )}

        {accreditation && currentDatabase.length > 0 ? (
          <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
              <div>
                <h3 className="text-3xl font-black text-gray-900 flex items-center gap-4">
                  <span className="bg-emerald-100 text-emerald-700 p-3 rounded-2xl">
                    <CheckCircle size={28} />
                  </span>
                  {accreditation} Certified Database
                </h3>
                <p className="text-gray-500 font-bold text-lg mt-2 ml-1">Showing {filteredColleges.length} verified records for 2024-25 cycle</p>
              </div>
              
              <div className="relative w-full lg:w-96 group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" size={20} />
                <input
                  type="text"
                  placeholder={`Search ${accreditation} database...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-8 py-5 rounded-3xl border-2 border-gray-100 bg-white focus:border-blue-500 outline-none transition-all font-bold text-lg shadow-sm hover:shadow-md focus:shadow-xl focus:shadow-blue-500/10 placeholder:text-gray-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredColleges.map((college, idx) => (
                <div 
                  key={idx} 
                  className="group p-8 rounded-[2rem] bg-white border-2 border-gray-100 hover:border-blue-500 hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)] transition-all relative overflow-hidden flex flex-col justify-between"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[4rem] -mr-16 -mt-16 group-hover:bg-blue-100 transition-all duration-500"></div>
                  
                  <div>
                    <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4 bg-blue-50 w-fit px-3 py-1 rounded-full border border-blue-100">
                      {college.category || accreditation}
                    </div>
                    <h4 className="text-xl font-black text-gray-900 mb-6 pr-6 leading-tight group-hover:text-blue-700 transition-all">
                      {college.name}
                    </h4>
                  </div>

                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center gap-3 text-gray-500 font-bold text-sm uppercase tracking-wider">
                      <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <MapPin size={16} />
                      </div>
                      {college.city}, {college.state}
                    </div>
                    {college.validTill && (
                      <div className="flex items-center gap-3 text-gray-500 font-bold text-sm uppercase tracking-wider">
                        <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
                          <Calendar size={16} />
                        </div>
                        Valid Till: <span className="text-gray-900 ml-1">{college.validTill}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-50 flex justify-between items-center text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                    <span className="flex items-center gap-1">
                      <ShieldCheck size={14} />
                      Verified Auditor
                    </span>
                    <ExternalLink size={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
            
            {filteredColleges.length === 0 && (
              <div className="text-center py-32 bg-white/50 rounded-[3rem] border-4 border-dashed border-gray-100">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle size={48} className="text-gray-200" />
                </div>
                <h3 className="text-2xl font-black text-gray-800 mb-2">No Verified Matches</h3>
                <p className="text-gray-500 font-bold text-lg">Try adjusting your search terms or choosing a different category.</p>
              </div>
            )}

            <div className="mt-16 p-10 bg-indigo-900 rounded-[3rem] text-white relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                  <ShieldCheck size={48} className="text-blue-400" />
                </div>
                <div>
                  <h4 className="text-2xl font-black mb-4 flex items-center gap-3 uppercase tracking-tight">
                    Critical Warning for Applicants
                  </h4>
                  <p className="text-indigo-100/70 leading-relaxed font-bold text-lg">
                    Accreditation cycles vary. An "A++" grade or AICTE approval might be under renewal. Always check for the physical "Letter of Approval" (LoA) from the current academic year before final fee submission.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : accreditation ? (
          <div className="text-center py-28 bg-white rounded-[3rem] border-2 border-gray-100 shadow-sm animate-in fade-in zoom-in duration-700">
            <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
               <ShieldCheck size={64} className="text-blue-400" />
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-4">Official {accreditation} Dashboard</h3>
            <p className="text-gray-500 max-w-2xl mx-auto font-bold text-xl mb-12 leading-relaxed">
              We are currently populating more records for {accreditation}. Access the full real-time database via official regulatory portals below.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a 
                href={accreditation === 'AICTE' ? "https://www.aicte-india.org/dashboard/pages/dashboard.php" : "https://www.ugc.ac.in/oldpdf/all_universities.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-12 py-6 bg-blue-600 text-white rounded-3xl font-black hover:bg-blue-700 transition-all flex items-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 text-lg"
              >
                Launch Official Web Auditor <ExternalLink size={20} />
              </a>
            </div>
          </div>
        ) : (
          <div className="text-center py-32 bg-white/40 rounded-[3rem] border-4 border-dashed border-gray-100">
             <div className="inline-block p-8 rounded-[2.5rem] bg-white shadow-xl border border-gray-50 mb-8 transform rotate-6 animate-pulse">
               <Compass size={56} className="text-blue-100" />
             </div>
             <p className="text-gray-400 font-black text-2xl uppercase tracking-widest">Select Auditor Parameters to Begin</p>
          </div>
        )}
      </div>
    </div>
  );
}
