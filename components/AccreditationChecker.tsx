'use client';

import React, { useState } from 'react';
import { ShieldCheck, Search, MapPin, Calendar, ExternalLink, Info, CheckCircle, AlertCircle, Compass } from 'lucide-react';
import { aiuApprovedPGDM, courseAccreditations, accreditationInfo } from '../data/accreditationData';

export function AccreditationChecker() {
  const [course, setCourse] = useState('');
  const [accreditation, setAccreditation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const availableAccreditations = course ? courseAccreditations[course] : [];

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCourse(e.target.value);
    setAccreditation('');
  };

  const filteredColleges = aiuApprovedPGDM.filter((college) =>
    college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    college.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    college.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isAIU_PGDM = course === 'MBA/PGDM' && accreditation === 'AIU';

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 mb-12">
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-8 sm:p-12 text-white text-center">
        <div className="inline-flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-full text-blue-100 text-sm font-semibold mb-6 backdrop-blur-sm border border-blue-400/30">
          <ShieldCheck size={18} />
          <span>Official Accreditation Auditor 2024-25</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black mb-6 tracking-tight leading-tight">
          Verify Education <span className="text-yellow-400 italic">Accreditation</span>
        </h2>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto opacity-90 font-medium">
          Ensure your degree is recognized for government jobs & higher studies. 
          Check AICTE, UGC, AIU, and NAAC status instantly.
        </p>
      </div>

      <div className="p-8 sm:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-widest flex items-center gap-2">
              1. Select Your Course
              <div className="h-1 w-8 bg-blue-600 rounded-full"></div>
            </label>
            <select
              value={course}
              onChange={handleCourseChange}
              className="w-full p-4 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-gray-800 font-bold appearance-none cursor-pointer"
            >
              <option value="">Choose Course (B.Tech, MBA, MCA...)</option>
              {Object.keys(courseAccreditations).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-widest flex items-center gap-2">
              2. Select Accreditation Body
              <div className="h-1 w-8 bg-indigo-600 rounded-full"></div>
            </label>
            <select
              value={accreditation}
              onChange={(e) => setAccreditation(e.target.value)}
              disabled={!course}
              className="w-full p-4 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-gray-800 font-bold appearance-none cursor-pointer disabled:opacity-50"
            >
              <option value="">{course ? "Choose Approval Type" : "Select Course First"}</option>
              {availableAccreditations.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        </div>

        {accreditation && (
          <div className="bg-blue-50 rounded-2xl p-6 border-l-4 border-blue-600 mb-12 flex gap-4 animate-in fade-in slide-in-from-top-4">
            <div className="bg-blue-600 text-white p-2 rounded-xl h-fit">
              <Info size={24} />
            </div>
            <div>
              <h4 className="text-blue-900 font-black text-xl mb-2">Why {accreditation} matters?</h4>
              <p className="text-blue-800/80 leading-relaxed font-medium">
                {accreditationInfo[accreditation]}
              </p>
            </div>
          </div>
        )}

        {isAIU_PGDM ? (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-8">
              <div>
                <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                  <span className="bg-green-100 text-green-700 p-2 rounded-xl">
                    <CheckCircle size={24} />
                  </span>
                  AIU Approved PGDM Campus List
                </h3>
                <p className="text-gray-500 font-medium mt-1">Verified for 2024-25 cycle</p>
              </div>
              
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search by college, city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-100 focus:border-blue-500 outline-none transition-all font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredColleges.map((college, idx) => (
                <div key={idx} className="group p-6 rounded-2xl bg-white border-2 border-gray-100 hover:border-blue-500 hover:shadow-xl transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-12 -mt-12 group-hover:bg-blue-100 transition-colors"></div>
                  <h4 className="text-lg font-black text-gray-800 mb-4 pr-6 leading-tight group-hover:text-blue-700 transition-colors">
                    {college.name}
                  </h4>
                  <div className="space-y-3 relative z-10">
                    <div className="flex items-center gap-2 text-gray-500 text-sm font-bold uppercase tracking-wider">
                      <MapPin size={16} className="text-blue-600" />
                      {college.city}, {college.state}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm font-bold uppercase tracking-wider">
                      <Calendar size={16} className="text-orange-500" />
                      Valid Till: <span className="text-gray-900">{college.validTill}</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center italic text-xs font-bold text-green-600 uppercase tracking-tighter">
                    Status: AIU Equivalent
                    <ExternalLink size={14} />
                  </div>
                </div>
              ))}
            </div>
            
            {filteredColleges.length === 0 && (
              <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <AlertCircle size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 font-bold text-lg">No matching AIU campuses found.</p>
              </div>
            )}

            <div className="mt-12 p-8 bg-amber-50 rounded-3xl border-2 border-amber-100">
              <h4 className="text-amber-900 font-black text-xl mb-4 flex items-center gap-2">
                <AlertCircle size={24} />
                Important Note for Students
              </h4>
              <p className="text-amber-800/80 leading-relaxed font-medium">
                Many top PGDM colleges have AIU Equivalence. If a PGDM is AIU-approved, it is treated exactly as an MBA for higher education (PhD, M.Phil) and government recruitment. Always verify the latest validity certificate on the Association of Indian Universities official portal.
              </p>
            </div>
          </div>
        ) : accreditation ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 animate-in fade-in zoom-in duration-500">
            <ShieldCheck size={48} className="mx-auto text-blue-300 mb-6" />
            <h3 className="text-xl font-black text-gray-800 mb-2">Detailed {accreditation} Checker</h3>
            <p className="text-gray-500 max-w-lg mx-auto font-medium mb-8">
              To check real-time {accreditation} status for your chosen institute, please use the official government portals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href={accreditation === 'AICTE' ? "https://www.aicte-india.org/dashboard/pages/dashboard.php" : "https://www.ugc.ac.in/oldpdf/all_universities.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2"
              >
                Official {accreditation} Dashboard <ExternalLink size={16} />
              </a>
            </div>
          </div>
        ) : (
          <div className="text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
             <div className="inline-block p-6 rounded-3xl bg-white shadow-sm mb-6">
               <Compass size={40} className="text-gray-200 animate-pulse" />
             </div>
             <p className="text-gray-400 font-bold text-xl">Select a course and accreditation type to begin audit.</p>
          </div>
        )}
      </div>
    </div>
  );
}
