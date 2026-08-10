'use client';

import { useState } from 'react';
import { Download, FileText, Lock, CheckCircle2, Search, ArrowRight, GraduationCap, ExternalLink } from 'lucide-react';
import { LeadGenForm } from '@/components/LeadGenForm';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const EXAMS = [
  {
    id: 'cat',
    name: 'CAT',
    fullName: 'Common Admission Test',
    description: 'Actual CAT question papers from 2022 to 2025 with complete solutions.',
    papers: [
      { year: 2025, slot: 'Expected Pattern & Official Mock', link: '/papers/cat-2025.pdf' },
      { year: 2024, slot: 'Official Question Paper', link: '/papers/cat-2024.pdf' },
      { year: 2023, slot: 'Official Question Paper', link: '/papers/cat-2023.pdf' },
      { year: 2022, slot: 'Official Question Paper', link: '/papers/cat-2022.pdf' },
    ]
  },
  {
    id: 'nmat',
    name: 'NMAT',
    fullName: 'NMAT by GMAC',
    description: 'Actual NMAT question papers from 2022 to 2025 with complete solutions.',
    papers: [
      { year: 2025, slot: 'Expected Pattern & Official Mock', link: '/papers/nmat-2025.pdf' },
      { year: 2024, slot: 'Official Question Paper', link: '/papers/nmat-2024.pdf' },
      { year: 2023, slot: 'Official Question Paper', link: '/papers/nmat-2023.pdf' },
      { year: 2022, slot: 'Official Question Paper', link: '/papers/nmat-2022.pdf' },
    ]
  },
  {
    id: 'xat',
    name: 'XAT',
    fullName: 'Xavier Aptitude Test',
    description: 'Actual XAT question papers from 2022 to 2025 with complete solutions and Decision Making analysis.',
    papers: [
      { year: 2025, slot: 'Expected Pattern & Official Mock', link: '/papers/xat-2025.pdf' },
      { year: 2024, slot: 'Official Question Paper', link: '/papers/xat-2024.pdf' },
      { year: 2023, slot: 'Official Question Paper', link: '/papers/xat-2023.pdf' },
      { year: 2022, slot: 'Official Question Paper', link: '/papers/xat-2022.pdf' },
    ]
  },
  {
    id: 'snap',
    name: 'SNAP',
    fullName: 'Symbiosis National Aptitude Test',
    description: 'Actual SNAP question papers from 2022 to 2025 with complete solutions and speed strategies.',
    papers: [
      { year: 2025, slot: 'Expected Pattern & Official Mock', link: '/papers/snap-2025.pdf' },
      { year: 2024, slot: 'Memory Based Solved Paper', link: '/papers/snap-2024.pdf' },
      { year: 2023, slot: 'Memory Based Solved Paper', link: '/papers/snap-2023.pdf' },
      { year: 2022, slot: 'Memory Based Solved Paper', link: '/papers/snap-2022.pdf' },
    ]
  }
];

export default function PreviousYearPapersClient() {
  const [selectedExam, setSelectedExam] = useState(EXAMS[0]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [activePaper, setActivePaper] = useState<any>(null);

  const handleDownloadClick = (paper: any) => {
    if (isUnlocked) {
      window.open(paper.link, '_blank');
    } else {
      setActivePaper(paper);
      setShowForm(true);
    }
  };

  const handleSuccess = () => {
    setIsUnlocked(true);
    setShowForm(false);

    if (activePaper) {
      window.open(activePaper.link, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumbs />
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest mb-6">
            <GraduationCap className="w-4 h-4" />
            Study Resources
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-foreground uppercase italic leading-none mb-6">
            Previous Year <span className="text-primary">Papers</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl font-bold text-slate-500">
            Boost your preparation with authentic previous year question papers. Unlock all papers for free by submitting a quick inquiry.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Exam Selection Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white border-4 border-foreground p-6 rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-xl font-black uppercase italic mb-6 flex items-center gap-2">
                <Search className="w-5 h-5 text-primary" /> Select Exam
              </h3>
              <div className="flex flex-col gap-2">
                {EXAMS.map((exam) => (
                  <button
                    key={exam.id}
                    onClick={() => setSelectedExam(exam)}
                    className={`w-full text-left px-6 py-4 rounded-lg font-black uppercase transition-all flex items-center justify-between group ${
                      selectedExam.id === exam.id
                        ? 'bg-primary text-white border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-1 -translate-y-1'
                        : 'bg-slate-50 text-slate-400 border-2 border-slate-100 hover:border-foreground hover:text-foreground'
                    }`}
                  >
                    {exam.name}
                    <ArrowRight className={`w-5 h-5 transition-transform ${selectedExam.id === exam.id ? 'translate-x-1' : 'group-hover:translate-x-1 opacity-0 group-hover:opacity-100'}`} />
                  </button>
                ))}
              </div>
            </div>

            {!isUnlocked && (
              <div className="bg-accent/10 border-4 border-dashed border-accent p-6 rounded-xl">
                <p className="font-bold text-accent italic text-center">
                  Unlock access to all PDFs by filling the form once.
                </p>
              </div>
            )}
          </div>

          {/* Papers List */}
          <div className="lg:col-span-8">
            <div className="bg-white border-8 border-foreground p-8 md:p-12 rounded-2xl shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b-4 border-slate-50 pb-8">
                <div>
                  <h2 className="text-4xl font-black uppercase italic text-foreground mb-2">
                    {selectedExam.fullName}
                  </h2>
                  <p className="text-lg font-bold text-slate-500">{selectedExam.description}</p>
                </div>
                {isUnlocked && (
                  <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg font-black uppercase text-xs">
                    <CheckCircle2 className="w-4 h-4" /> Unlocked
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedExam.papers.map((paper, idx) => (
                  <div
                    key={idx}
                    className="group relative bg-slate-50 border-4 border-slate-100 p-6 rounded-xl hover:border-foreground hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-white p-3 rounded-lg border-2 border-slate-100 group-hover:border-primary transition-colors">
                        <FileText className="w-8 h-8 text-primary" />
                      </div>
                      <span className="text-xs font-black uppercase bg-slate-200 px-3 py-1 rounded-full">
                        PDF Paper
                      </span>
                    </div>
                    <h4 className="text-xl font-black uppercase mb-1">
                      {selectedExam.name} {paper.year}
                    </h4>
                    <p className="font-bold text-slate-400 mb-6">{paper.slot}</p>
                    
                    <button
                      onClick={() => handleDownloadClick(paper)}
                      className="w-full py-4 bg-foreground text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 group-hover:bg-primary transition-all active:translate-y-1"
                    >
                      {isUnlocked ? (
                        <>Download Now <Download className="w-5 h-5" /></>
                      ) : (
                        <>Unlock Paper <Lock className="w-5 h-5" /></>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Lead Gen Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-foreground/80 backdrop-blur-sm">
          <div className="w-full max-w-xl">
            <LeadGenForm
              resourceName={`${selectedExam.name} ${activePaper?.year || ''} Paper`}
              onSuccess={handleSuccess}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
