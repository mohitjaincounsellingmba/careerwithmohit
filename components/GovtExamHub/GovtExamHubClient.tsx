'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ExamConfig } from '@/lib/mock-test-data';
import { Search, ChevronDown, Play, BookOpen, Clock, Target, Info } from 'lucide-react';

export function GovtExamHubClient({ exams }: { exams: ExamConfig[] }) {
  const router = useRouter();
  const [selectedExam, setSelectedExam] = useState<ExamConfig | null>(null);
  const [selectedSet, setSelectedSet] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Group exams by category
  const categories = {
    SSC: exams.filter(e => e.slug.startsWith('ssc')),
    Banking: exams.filter(e => e.slug.startsWith('ibps') || e.slug.startsWith('sbi') || e.slug.startsWith('rbi') || e.slug.startsWith('nabard')),
    Railways: exams.filter(e => e.slug.startsWith('rrb')),
    UPSC: exams.filter(e => e.slug.startsWith('upsc')),
    Defence: exams.filter(e => e.slug.startsWith('nda') || e.slug.startsWith('cds') || e.slug.startsWith('afcat')),
    Teaching: exams.filter(e => e.slug.startsWith('ctet') || e.slug.startsWith('reet') || e.slug.startsWith('dsssb')),
    State: exams.filter(e => e.slug.startsWith('rpsc') || e.slug.startsWith('uppsc') || e.slug.startsWith('bpsc') || e.slug.startsWith('upsssc')),
    Others: exams.filter(e => e.slug.startsWith('cuet') || e.slug.startsWith('lic'))
  };

  const filteredExams = exams.filter(exam => 
    exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exam.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startTest = () => {
    if (selectedExam) {
      router.push(`/tools/mock-test/${selectedExam.slug}?set=${selectedSet}`);
    }
  };

  return (
    <div className="space-y-12">
      {/* Selection Form Section */}
      <div className="bg-white p-8 md:p-12 border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-5xl mx-auto transform -rotate-1">
        <h2 className="text-3xl font-black uppercase mb-8 flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-primary" /> Start Your Assessment
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          {/* Exam Selection Dropdown */}
          <div className="relative space-y-4">
            <label className="text-xl font-black uppercase flex items-center gap-2">
              1. Select Your Exam
            </label>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-white border-4 border-foreground p-6 flex justify-between items-center text-left hover:bg-slate-50 transition-colors"
                id="exam-select-button"
              >
                <span className="font-bold text-lg truncate">
                  {selectedExam ? selectedExam.name : 'Choose an examination...'}
                </span>
                <ChevronDown className={`w-6 h-6 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white border-4 border-foreground overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-h-[400px] overflow-y-auto">
                  <div className="p-4 border-b-4 border-foreground bg-slate-50 sticky top-0">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search for an exam..."
                        className="w-full pl-12 pr-4 py-3 border-2 border-foreground font-bold focus:outline-none focus:ring-2 ring-primary bg-white"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="p-2 space-y-4">
                    {Object.entries(categories).map(([category, catExams]) => (
                      catExams.length > 0 && (
                        <div key={category}>
                          <p className="px-4 py-2 text-sm font-black uppercase tracking-widest text-primary bg-slate-100 mb-2">
                            {category} Exams
                          </p>
                          {catExams.filter(e => e.name.toLowerCase().includes(searchQuery.toLowerCase())).map(exam => (
                            <button
                              key={exam.id}
                              onClick={() => {
                                setSelectedExam(exam);
                                setIsDropdownOpen(false);
                              }}
                              className="w-full text-left px-6 py-4 hover:bg-primary hover:text-white font-bold transition-all border-b border-gray-100 last:border-0"
                            >
                              {exam.name}
                            </button>
                          ))}
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Set Selection */}
          <div className="space-y-4">
            <label className="text-xl font-black uppercase flex items-center gap-2">
              2. Select Question Paper
            </label>
            <div className="grid grid-cols-5 gap-3">
              {[...Array(30)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedSet(i + 1)}
                  className={`py-3 font-bold border-2 border-foreground transition-all flex items-center justify-center ${
                    selectedSet === i + 1 
                      ? 'bg-accent text-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
                      : 'bg-white text-gray-400 hover:bg-slate-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <p className="text-sm font-bold text-gray-500 italic">30 unique sets available for maximum practice</p>
          </div>
        </div>

        {/* Start Button */}
        <div className="mt-12 flex flex-col md:flex-row gap-6 items-center">
          <button
            onClick={startTest}
            disabled={!selectedExam}
            className={`w-full md:w-auto px-12 py-6 text-2xl font-black uppercase tracking-widest flex items-center justify-center gap-4 border-4 border-foreground transition-all ${
              selectedExam 
                ? 'bg-primary text-white hover:translate-x-2 hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Play className="w-8 h-8 fill-current" />
            Launch Mock Test
          </button>

          {selectedExam && (
            <div className="flex-1 space-y-2">
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5 font-bold text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full border border-blue-200">
                  <Clock className="w-4 h-4" /> {selectedExam.durationMinutes} Min
                </div>
                <div className="flex items-center gap-1.5 font-bold text-sm bg-orange-100 text-orange-800 px-3 py-1 rounded-full border border-orange-200">
                  <Target className="w-4 h-4" /> {selectedExam.totalQuestions} Questions
                </div>
              </div>
              <p className="text-gray-600 font-medium">Ready to start the <span className="font-bold text-primary">{selectedExam.name}</span> exam paper set <span className="font-bold text-accent">{selectedSet}</span>.</p>
            </div>
          )}
        </div>
      </div>

      {/* Grid of Exams for direct access */}
      <div>
        <h2 className="text-4xl font-black uppercase mb-12 text-center">Popular Govt Exam Mock Tests</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {exams.slice(0, 12).map((exam) => (
            <div 
              key={exam.id} 
              className="bg-white border-4 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all group flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-black uppercase mb-4 leading-tight group-hover:text-primary transition-colors">
                  {exam.name}
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-[10px] font-black tracking-widest uppercase bg-slate-100 px-2 py-0.5 border border-foreground">
                    FREE TEST
                  </span>
                  <span className="text-[10px] font-black tracking-widest uppercase bg-accent/20 px-2 py-0.5 border border-foreground">
                    30 SETS
                  </span>
                </div>
              </div>
              <button 
                onClick={() => {
                  setSelectedExam(exam);
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
                className="w-full py-3 bg-foreground text-white font-black uppercase text-sm tracking-widest border-2 border-foreground hover:bg-primary transition-colors"
                id={`start-${exam.slug}`}
              >
                Access All Sets
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
