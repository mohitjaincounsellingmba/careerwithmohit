import { Metadata } from 'next';
import { GenericMockTestClient } from '@/components/GenericMockTest/GenericMockTestClient';
import { EXAM_CONFIGS, generateMockQuestions } from '@/lib/mock-test-data';
import { Clock, Zap, Target, Award, CheckCircle2, ShieldCheck, BookOpen, HelpCircle, Presentation, Search, Star } from 'lucide-react';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Free BITSAT Mock Test 2026 | BITS Pilani Preparation Platform',
  description: 'Practice for BITSAT 2026 with our free full-length mock test. 130 questions in 3 hours covering Physics, Chemistry, English, and Logical Reasoning. Get BITS Goa and Hyderabad campus rank prediction.',
  keywords: 'BITSAT mock test free 2026, BITS Pilani online test, BITSAT practice paper, BITSAT English and Logic, BITSAT score calculator, BITS session 1 mock test, engineering admission BITSAT',
  openGraph: {
    title: 'Free BITSAT Mock Test 2026 | Simulation & BITS Campus Predictor',
    description: 'Master the BITSAT with our advanced CBT interface. Simulation for English Proficiency and Logical Reasoning for high-rank BITS Pilani candidates.',
    type: 'website',
  }
};

export default function BitsatMockTestPage() {
  const config = EXAM_CONFIGS.find(c => c.slug === 'bitsat');
  
  if (!config) {
    notFound();
  }

  const questions = generateMockQuestions(config);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "BITSAT 2026 Mock Test Tool",
    "operatingSystem": "Web",
    "applicationCategory": "EducationalApplication",
    "description": "Full-length 130-question mock test for BITSAT 2026. Includes sectional reporting for Physics, Chemistry, English Proficiency and Logical Reasoning.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    }
  };

  return (
    <main className="min-h-screen bg-[#f0f0f0] pt-24 pb-20 px-6 sm:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="mx-auto max-w-5xl">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-7xl font-black uppercase mb-4 leading-none">
            BITSAT <span className="text-primary italic">2026</span> Mock Test
          </h1>
          <div className="inline-block bg-accent px-6 py-2 border-4 border-foreground transform -rotate-2">
            <p className="font-bold uppercase tracking-widest text-lg md:text-xl">Full-Length 130 Question BITS Simulation</p>
          </div>
        </div>

        {/* Client Interface */}
        <GenericMockTestClient config={config} questions={questions} />

        {/* SEO CONTENT SECTION */}
        <div className="mt-24 space-y-24">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all">
              <div className="bg-primary w-12 h-12 flex items-center justify-center border-4 border-foreground mb-6">
                <Clock className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase mb-4">180 Minutes</h3>
              <p className="font-medium text-gray-600 italic">Total freedom across all sections. Manage your time effectively between PCM and English Proficiency.</p>
            </div>
            <div className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all">
              <div className="bg-accent w-12 h-12 flex items-center justify-center border-4 border-foreground mb-6">
                <Star className="text-foreground w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase mb-4">English & Logic</h3>
              <p className="font-medium text-gray-600 italic">The scoring-booster section unique to BITSAT. 30 high-impact questions to boost your total score.</p>
            </div>
            <div className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all">
              <div className="bg-foreground w-12 h-12 flex items-center justify-center border-4 border-foreground mb-6">
                <Target className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase mb-4">Campus Predictor</h3>
              <p className="font-medium text-gray-600 italic">Benchmark your score against Pilani, Goa, and Hyderabad campus cutoffs for Computer Science and Phoenix branches.</p>
            </div>
          </div>

          {/* Cuts vs Campus Section */}
          <section id="cutoffs" className="bg-white border-4 border-foreground p-10 shadow-[12px_12px_0px_0px_rgba(var(--primary-rgb),1)]">
            <div className="flex items-center gap-4 mb-8">
              <Award className="w-10 h-10 text-primary" strokeWidth={3} />
              <h2 className="text-3xl font-black uppercase tracking-tighter">BITSAT Target Scores: Top Campus Cutoffs</h2>
            </div>
            <p className="mb-8 text-gray-600 font-medium leading-relaxed">
              Based on the 390-mark total scheme (130 questions x 3), here are the scores required for a safe entry into the dream campus branches.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { campus: 'BITS Pilani CS', score: '320+' },
                { campus: 'BITS Goa CS', score: '290+' },
                { campus: 'BITS Hyderabad CS', score: '280+' },
                { campus: 'Pilani ECE/EEE', score: '270+' },
                { campus: 'Goa Mechanical', score: '240+' },
                { campus: 'Hyd Dual Degree', score: '210+' }
              ].map((item, i) => (
                <div key={i} className="border-4 border-foreground p-6 bg-slate-50 flex flex-col items-center justify-center text-center group hover:bg-foreground transition-all">
                  <p className="text-sm font-black text-primary uppercase group-hover:text-white mb-2">{item.campus}</p>
                  <p className="text-3xl font-black group-hover:text-white transition-colors">Score: {item.score}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Exam Pattern Table */}
          <section id="pattern">
            <h2 className="text-4xl font-black uppercase mb-12 flex items-center gap-4">
              <Presentation className="w-10 h-10 text-primary" /> BITSAT 2026 Examination Blueprint
            </h2>
            <div className="overflow-x-auto border-4 border-foreground bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <table className="w-full text-left border-collapse">
                <thead className="bg-foreground text-white uppercase text-sm font-black tracking-widest">
                  <tr>
                    <th className="p-6 border-r border-white/20 text-center">Part</th>
                    <th className="p-6 border-r border-white/20">Subject</th>
                    <th className="p-6">Questions</th>
                  </tr>
                </thead>
                <tbody className="text-xl font-bold">
                  {[
                    { part: 'I', sub: 'Physics', count: 30 },
                    { part: 'II', sub: 'Chemistry', count: 30 },
                    { part: 'III', sub: 'English Proficiency (10) + Logical Reasoning (20)', count: 30 },
                    { part: 'IV', sub: 'Mathematics', count: 40 }
                  ].map((row, idx) => (
                    <tr key={idx} className={`border-b-4 border-foreground hover:bg-gray-50 transition-colors ${idx % 2 !== 0 ? 'bg-slate-50' : ''}`}>
                      <td className="p-6 border-r-4 border-foreground text-center uppercase">Part {row.part}</td>
                      <td className="p-6 border-r-4 border-foreground">{row.sub}</td>
                      <td className="p-6 text-center">{row.count}</td>
                    </tr>
                  ))}
                  <tr className="bg-primary text-white uppercase font-black tracking-widest text-2xl">
                    <td colSpan={2} className="p-8 border-r-4 border-white/20 text-center">Total Questions</td>
                    <td className="p-8 text-center">130</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-6 font-bold text-gray-400 italic">** Bonus Section (12 questions) only opens if you attempt all 130 questions before the timer ends.</p>
          </section>

          {/* Strategy Section */}
          <section id="strategy">
            <h2 className="text-4xl font-black uppercase mb-12 flex items-center gap-4">
              <Search className="w-10 h-10 text-primary" /> How to Dominate BITSAT
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-foreground text-white border-4 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(var(--primary-rgb),1)]">
                <h3 className="text-2xl font-black uppercase mb-4 text-primary italic">The Time-Advantage Tip</h3>
                <p className="text-lg font-medium leading-relaxed italic text-blue-50 mb-6">
                  "Most students forget that Chemistry and English are 40 marks which can be solved in 30 minutes. Use the saved time for the lengthy Calculus questions in Mathematics."
                </p>
                <div className="flex items-center gap-2 font-black uppercase tracking-widest text-xs">
                  <ShieldCheck className="h-4 w-4" /> BITS Pilani Mentor Insight
                </div>
              </div>
              <div className="bg-white border-4 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-2xl font-black uppercase mb-6 flex items-center gap-3">
                  Score-Booster Guide
                </h3>
                <ul className="space-y-4 font-bold text-gray-700 italic">
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-primary w-5 h-5 shrink-0" /> Focus on NCERT for Chemistry and Physics formulas.</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-primary w-5 h-5 shrink-0" /> Logical reasoning patterns are repetitive—solve 10+ mocks.</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-primary w-5 h-5 shrink-0" /> English Proficiency is high-yield for medium-level prep.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="bg-white border-4 border-foreground p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-black uppercase mb-12 flex items-center gap-4">
              <HelpCircle className="w-10 h-10 text-primary" /> BITS Admission Consultation
            </h2>
            <div className="space-y-10">
              {config.faqs?.map((faq, i) => (
                <div key={i} className="border-b-2 border-gray-100 pb-8 last:border-0 border-dashed">
                  <h4 className="text-xl font-bold uppercase mb-4 flex items-start gap-4">
                    <span className="bg-primary text-white text-xs px-2 py-0.5 mt-1 shrink-0">Q</span>
                    {faq.question}
                  </h4>
                  <p className="text-lg text-gray-600 font-medium leading-relaxed italic ml-10">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
