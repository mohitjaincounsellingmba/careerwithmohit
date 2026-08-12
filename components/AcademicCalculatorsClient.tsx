"use client";

import React, { useState } from "react";
import { Calculator, Plus, Trash2, ArrowRight, BookOpen, GraduationCap, Percent, CheckCircle } from "lucide-react";
import Link from "next/link";

export function AcademicCalculatorsClient() {
  const [activeTab, setActiveTab] = useState<'cgpa-percent' | 'sgpa-cgpa' | 'grade-percent'>('cgpa-percent');

  // CGPA to Percentage State
  const [cgpaValue, setCgpaValue] = useState("");
  const [cgpaMultiplier, setCgpaMultiplier] = useState(9.5);
  const [cgpaResult, setCgpaResult] = useState<number | null>(null);

  const calculateCgpaToPercent = () => {
    const cgpa = parseFloat(cgpaValue);
    if (!isNaN(cgpa) && cgpa > 0 && cgpa <= 10) {
      setCgpaResult(parseFloat((cgpa * cgpaMultiplier).toFixed(2)));
    } else {
      setCgpaResult(null);
      alert("Please enter a valid CGPA between 0 and 10.");
    }
  };

  // SGPA to CGPA State
  const [semesters, setSemesters] = useState([{ id: 1, sgpa: "", credits: "" }]);
  const [sgpaResult, setSgpaResult] = useState<{ cgpa: number; totalCredits: number } | null>(null);

  const addSemester = () => {
    if (semesters.length < 12) {
      setSemesters([...semesters, { id: semesters.length + 1, sgpa: "", credits: "" }]);
    }
  };

  const removeSemester = (id: number) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter(sem => sem.id !== id));
    }
  };

  const updateSemester = (id: number, field: 'sgpa' | 'credits', value: string) => {
    setSemesters(semesters.map(sem => sem.id === id ? { ...sem, [field]: value } : sem));
  };

  const calculateSgpaToCgpa = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    let valid = true;

    semesters.forEach(sem => {
      const sgpa = parseFloat(sem.sgpa);
      const credits = parseFloat(sem.credits);
      if (isNaN(sgpa) || isNaN(credits) || sgpa < 0 || sgpa > 10 || credits <= 0) {
        valid = false;
      } else {
        totalPoints += sgpa * credits;
        totalCredits += credits;
      }
    });

    if (valid && totalCredits > 0) {
      setSgpaResult({
        cgpa: parseFloat((totalPoints / totalCredits).toFixed(2)),
        totalCredits: totalCredits
      });
    } else {
      setSgpaResult(null);
      alert("Please enter valid SGPA (0-10) and positive Credits for all semesters.");
    }
  };

  // Grade to Percentage State
  const [grade, setGrade] = useState("O");
  const [gradeResult, setGradeResult] = useState<string | null>(null);

  const gradeMap: Record<string, { points: number, percentRange: string }> = {
    "O": { points: 10, percentRange: "90% - 100%" },
    "A+": { points: 9, percentRange: "80% - 89%" },
    "A": { points: 8, percentRange: "70% - 79%" },
    "B+": { points: 7, percentRange: "60% - 69%" },
    "B": { points: 6, percentRange: "50% - 59%" },
    "C": { points: 5, percentRange: "40% - 49%" },
    "P": { points: 4, percentRange: "35% - 39%" },
    "F": { points: 0, percentRange: "0% - 34%" }
  };

  const calculateGradeToPercent = () => {
    const data = gradeMap[grade];
    if (data) {
      setGradeResult(`Points: ${data.points} | Equivalent Percentage: ${data.percentRange}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-6">
            <Calculator className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-6">
            Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Calculators</span>
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            Essential tools for students. Easily convert your CGPA to percentage, calculate overall CGPA from semester SGPAs, or map your grades to percentages.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row min-h-[600px]">
          
          {/* Sidebar Navigation */}
          <div className="md:w-1/3 bg-gray-50 border-r border-gray-100 p-6 md:p-8">
            <h2 className="text-sm font-black uppercase tracking-widest text-gray-500 mb-6">Select a Tool</h2>
            <div className="space-y-3">
              <button
                onClick={() => setActiveTab('cgpa-percent')}
                className={`w-full text-left flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 font-bold ${
                  activeTab === 'cgpa-percent' 
                    ? 'bg-primary text-white shadow-md scale-105' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Percent className={activeTab === 'cgpa-percent' ? 'text-white' : 'text-primary'} size={20} />
                CGPA to Percentage
              </button>

              <button
                onClick={() => setActiveTab('sgpa-cgpa')}
                className={`w-full text-left flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 font-bold ${
                  activeTab === 'sgpa-cgpa' 
                    ? 'bg-secondary text-white shadow-md scale-105' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <BookOpen className={activeTab === 'sgpa-cgpa' ? 'text-white' : 'text-secondary'} size={20} />
                SGPA to CGPA
              </button>

              <button
                onClick={() => setActiveTab('grade-percent')}
                className={`w-full text-left flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 font-bold ${
                  activeTab === 'grade-percent' 
                    ? 'bg-emerald-500 text-white shadow-md scale-105' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <GraduationCap className={activeTab === 'grade-percent' ? 'text-white' : 'text-emerald-500'} size={20} />
                Grade to Percentage
              </button>
            </div>
            
            <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-100">
              <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <CheckCircle size={18} className="text-blue-600" /> Need Help?
              </h3>
              <p className="text-sm text-blue-700/80 mb-4 font-medium">
                Are you confused about your next career step or college admission?
              </p>
              <Link href="/inquiry" className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 group">
                Book Free Counselling <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Calculator Area */}
          <div className="md:w-2/3 p-6 md:p-12 relative">
            {/* 1. CGPA to Percentage */}
            {activeTab === 'cgpa-percent' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-3xl font-black text-gray-900 mb-2">CGPA to Percentage</h2>
                <p className="text-gray-500 mb-8 font-medium">Convert your Cumulative Grade Point Average to a standard percentage.</p>
                
                <div className="space-y-6 max-w-md">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Enter Your CGPA (out of 10)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      min="0"
                      max="10"
                      value={cgpaValue}
                      onChange={(e) => setCgpaValue(e.target.value)}
                      placeholder="e.g. 8.5"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Select Multiplier</label>
                    <select 
                      value={cgpaMultiplier}
                      onChange={(e) => setCgpaMultiplier(parseFloat(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-medium bg-white"
                    >
                      <option value={9.5}>Multiply by 9.5 (CBSE / Typical University Standard)</option>
                      <option value={10}>Multiply by 10 (Some Engineering Universities)</option>
                      <option value={8.8}>Multiply by 8.8 (Specific State Boards)</option>
                    </select>
                  </div>
                  <button 
                    onClick={calculateCgpaToPercent}
                    className="w-full bg-primary text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/30"
                  >
                    Calculate Percentage
                  </button>
                </div>

                {cgpaResult !== null && (
                  <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-2xl animate-in zoom-in-95 duration-300">
                    <p className="text-green-800 font-medium mb-1">Your Equivalent Percentage is:</p>
                    <div className="text-5xl font-black text-green-600">{cgpaResult}%</div>
                  </div>
                )}
              </div>
            )}

            {/* 2. SGPA to CGPA */}
            {activeTab === 'sgpa-cgpa' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-3xl font-black text-gray-900 mb-2">SGPA to CGPA</h2>
                <p className="text-gray-500 mb-8 font-medium">Calculate your final CGPA based on semester SGPAs and Credits.</p>
                
                <div className="space-y-4 max-w-xl">
                  <div className="grid grid-cols-12 gap-4 text-sm font-bold text-gray-500 px-2 uppercase tracking-wider">
                    <div className="col-span-2">Sem</div>
                    <div className="col-span-4">SGPA (0-10)</div>
                    <div className="col-span-4">Credits</div>
                    <div className="col-span-2 text-center">Action</div>
                  </div>
                  
                  {semesters.map((sem, index) => (
                    <div key={sem.id} className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-2 font-bold text-gray-400 pl-2">#{index + 1}</div>
                      <div className="col-span-4">
                        <input 
                          type="number" step="0.01" min="0" max="10"
                          value={sem.sgpa}
                          onChange={(e) => updateSemester(sem.id, 'sgpa', e.target.value)}
                          placeholder="SGPA"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all font-medium"
                        />
                      </div>
                      <div className="col-span-4">
                        <input 
                          type="number" step="1" min="1"
                          value={sem.credits}
                          onChange={(e) => updateSemester(sem.id, 'credits', e.target.value)}
                          placeholder="Credits"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-secondary focus:border-secondary outline-none transition-all font-medium"
                        />
                      </div>
                      <div className="col-span-2 flex justify-center">
                        <button 
                          onClick={() => removeSemester(sem.id)}
                          disabled={semesters.length === 1}
                          className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex gap-4 pt-4">
                    <button 
                      onClick={addSemester}
                      disabled={semesters.length >= 12}
                      className="flex-1 border-2 border-dashed border-gray-300 text-gray-500 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:border-secondary hover:text-secondary hover:bg-secondary/5 transition-all disabled:opacity-50"
                    >
                      <Plus size={20} /> Add Semester
                    </button>
                    <button 
                      onClick={calculateSgpaToCgpa}
                      className="flex-1 bg-secondary text-white py-3 rounded-xl font-bold uppercase tracking-wider hover:bg-secondary/90 transition-all active:scale-95 shadow-lg shadow-secondary/30"
                    >
                      Calculate CGPA
                    </button>
                  </div>
                </div>

                {sgpaResult !== null && (
                  <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-2xl animate-in zoom-in-95 duration-300 flex flex-col sm:flex-row gap-6 items-center justify-between">
                    <div>
                      <p className="text-blue-800 font-medium mb-1">Total Credits: {sgpaResult.totalCredits}</p>
                      <p className="text-blue-800 font-medium mb-1">Your Calculated CGPA is:</p>
                    </div>
                    <div className="text-5xl font-black text-blue-600">{sgpaResult.cgpa}</div>
                  </div>
                )}
              </div>
            )}

            {/* 3. Grade to Percentage */}
            {activeTab === 'grade-percent' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-3xl font-black text-gray-900 mb-2">Grade to Percentage</h2>
                <p className="text-gray-500 mb-8 font-medium">Standard university letter grade to percentage mapping.</p>
                
                <div className="space-y-6 max-w-md">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Select Your Grade</label>
                    <select 
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all font-medium bg-white"
                    >
                      {Object.keys(gradeMap).map((g) => (
                        <option key={g} value={g}>{g} (Letter Grade)</option>
                      ))}
                    </select>
                  </div>
                  <button 
                    onClick={calculateGradeToPercent}
                    className="w-full bg-emerald-500 text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-emerald-600 transition-all active:scale-95 shadow-lg shadow-emerald-500/30"
                  >
                    View Percentage
                  </button>
                </div>

                {gradeResult !== null && (
                  <div className="mt-8 p-6 bg-emerald-50 border border-emerald-200 rounded-2xl animate-in zoom-in-95 duration-300">
                    <p className="text-emerald-800 font-medium mb-2">Evaluation Result:</p>
                    <div className="text-xl md:text-2xl font-black text-emerald-700">{gradeResult}</div>
                    <p className="text-sm text-emerald-600 mt-3 font-medium">Note: Exact percentage rules may vary based on your specific university guidelines.</p>
                  </div>
                )}
                
                {/* Reference Table */}
                <div className="mt-12">
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Standard UGC Reference Table</h3>
                  <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm text-sm">
                    <div className="grid grid-cols-3 bg-gray-50 font-bold text-gray-600 p-3 border-b border-gray-100">
                      <div>Letter Grade</div>
                      <div>Grade Point</div>
                      <div>Typical % Range</div>
                    </div>
                    {Object.entries(gradeMap).map(([key, val]) => (
                      <div key={key} className="grid grid-cols-3 p-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors text-gray-700 font-medium">
                        <div className="font-bold">{key}</div>
                        <div>{val.points}</div>
                        <div>{val.percentRange}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
