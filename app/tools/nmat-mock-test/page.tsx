import { Metadata } from 'next';
import { GenericMockTestClient } from '@/components/GenericMockTest/GenericMockTestClient';
import { EXAM_CONFIGS, generateMockQuestions } from '@/lib/mock-test-data';
import { CheckCircle2, Zap, Clock, HelpCircle, BarChart3, GraduationCap, PieChart, Activity } from 'lucide-react';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Free NMAT Mock Test 2026 | NMIMS Mumbai 230+ Score Prep',
  description: 'Take our free full-length NMAT 2026 mock test. 108 questions, 120 minutes, no negative marking. Experience adaptive simulation for NMIMS, SPJIMR, and ISB.',
  keywords: 'Free NMAT mock test 2026, NMIMS Mumbai mock test, NMAT practice paper free, NMAT 2026 exam pattern, scaled score NMAT, NMAT preparation Mumbai, adaptive mock test NMAT',
  openGraph: {
    title: 'Free NMAT Mock Test 2026 | Crack NMIMS Mumbai',
    description: 'Master the NMAT by GMAC with our realistic mock tool. 108 questions across Language, Quants, and Logic with sectional timers.',
    type: 'website',
  }
};

export default function NmatMockTestPage() {
  const config = EXAM_CONFIGS.find(c => c.slug === 'nmat');
  
  if (!config) {
    notFound();
  }

  const questions = generateMockQuestions(config);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "NMAT 2026 Mock Test Tool",
    "operatingSystem": "Web",
    "applicationCategory": "EducationalApplication",
    "description": "Realistic 108-question NMAT mock test for NMIMS aspirants. Includes sectional timers and scaled score prediction for top B-schools.",
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
            NMAT <span className="text-secondary italic">2026</span> Mock Test
          </h1>
          <div className="inline-block bg-primary px-6 py-2 border-4 border-foreground transform rotate-1">
            <p className="font-bold uppercase tracking-widest text-lg md:text-xl text-white">Full-Length 120 Minute NMIMS Simulation</p>
          </div>
        </div>

        {/* Client Interface */}
        <GenericMockTestClient config={config} questions={questions} />

        {/* SEO CONTENT SECTION */}
        <div className="mt-24 space-y-24">
          
          {/* Sectional Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all">
              <div className="bg-secondary w-12 h-12 flex items-center justify-center border-4 border-foreground mb-6">
                <Clock className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase mb-4">Adaptive Flow</h3>
              <p className="font-medium text-gray-600 italic">Experience the NMAT adaptive algorithm simulation where question difficulty adjusts based on your performance.</p>
            </div>
            <div className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all">
              <div className="bg-accent w-12 h-12 flex items-center justify-center border-4 border-foreground mb-6">
                <Zap className="text-foreground w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase mb-4">0 Negative Marks</h3>
              <p className="font-medium text-gray-600 italic">Unique NMAT pattern where you can attempt all 108 questions without fear of penalties. Strategy is key.</p>
            </div>
            <div className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all">
              <div className="bg-foreground w-12 h-12 flex items-center justify-center border-4 border-foreground mb-6">
                <Activity className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase mb-4">Scaled Scoring</h3>
              <p className="font-medium text-gray-600 italic">Get an immediate estimation of your scaled score (36-360) benchmarked against NMIMS Mumbai cutoffs.</p>
            </div>
          </div>

          {/* Marks vs Percentile Table */}
          <section id="marks" className="bg-white border-4 border-foreground p-10 shadow-[12px_12px_0px_0px_rgba(var(--secondary-rgb),1)]">
            <div className="flex items-center gap-4 mb-8">
              <BarChart3 className="w-10 h-10 text-secondary" strokeWidth={3} />
              <h2 className="text-3xl font-black uppercase tracking-tighter">NMAT 2026: Scaled Score vs Cutoffs</h2>
            </div>
            <p className="mb-8 text-gray-600 font-medium leading-relaxed">
              Based on recent trends, NMIMS Mumbai (Main Campus) requires a consistent 232+ score. Here's a breakdown of scores and their corresponding targets.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { s: '245+', p: '99+ %ile', target: 'NMIMS Mumbai Top' },
                  { s: '232+', p: '95+ %ile', target: 'NMIMS Mumbai MBA' },
                  { s: '228+', p: '93+ %ile', target: 'NMIMS HR/Bng' },
                  { s: '220+', p: '90+ %ile', target: 'SPJIMR/ISB' },
                  { s: '210+', p: '85+ %ile', target: 'XIMB / VIT' },
                  { s: '200+', p: '80+ %ile', target: 'SDA Bocconi' },
                  { s: '180+', p: '70+ %ile', target: 'TEMA / BEN' },
                  { s: '150+', p: '50+ %ile', target: 'Improvement' }
                ].map((item, i) => (
                  <div key={i} className="border-4 border-foreground p-5 text-center group hover:bg-foreground transition-all">
                    <p className="text-sm font-black text-secondary uppercase group-hover:text-white">{item.p}</p>
                    <p className="text-3xl font-black mb-1 group-hover:text-white">{item.s}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-secondary transition-colors italic">{item.target}</p>
                  </div>
                ))}
            </div>
          </section>

          {/* Sectional Breakdown */}
          <section id="sections">
            <h2 className="text-4xl font-black uppercase mb-12 flex items-center gap-4">
              <PieChart className="w-10 h-10 text-secondary" /> NMAT Sectional Strategy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Language',
                  desc: '36 Qs | 28 Mins',
                  tips: ['High Speed (46s per Q)', 'Focus on Vocab & Grammer', 'RC should be handled last if slow.'],
                  color: 'bg-indigo-50'
                },
                {
                  title: 'Quants',
                  desc: '36 Qs | 52 Mins',
                  tips: ['Better Time (86s per Q)', 'Data Interpretation is key', 'Arithmetic & DI carry 70% weight.'],
                  color: 'bg-orange-50'
                },
                {
                  title: 'Logic',
                  desc: '36 Qs | 40 Mins',
                  tips: ['Moderate Speed (66s per Q)', 'Verbal Reasoning (Assumptions)', 'Critical Reasoning is high scoring.'],
                  color: 'bg-teal-50'
                }
              ].map((sec, i) => (
                <div key={i} className={`border-4 border-foreground ${sec.color} p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col`}>
                  <h3 className="text-3xl font-black uppercase mb-2">{sec.title}</h3>
                  <p className="text-sm font-bold text-gray-500 mb-6 uppercase tracking-widest">{sec.desc}</p>
                  <ul className="space-y-4 mt-auto">
                    {sec.tips.map((tip, j) => (
                      <li key={j} className="flex font-bold text-sm text-gray-700 items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Admission Guide Section */}
          <section id="admission" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white border-4 border-foreground p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-3xl font-black uppercase mb-6 flex items-center gap-3 underline decoration-secondary decoration-8">
                <GraduationCap className="h-8 w-8 text-secondary" /> NMIMS Mumbai Roadmap
              </h2>
              <p className="text-gray-600 font-medium mb-8 italic">
                NMAT score is just the first step. NMIMS has a rigorous Case Discussion (CD) and Personal Interview (PI) round for final selection.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 bg-secondary border-4 border-foreground flex items-center justify-center font-black text-white">1</div>
                  <div>
                    <h4 className="font-extrabold uppercase">Sectional Equivalence</h4>
                    <p className="text-sm font-medium text-gray-500">You must score balanced marks across all sections to get the main campus call.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 bg-primary border-4 border-foreground flex items-center justify-center font-black text-white">2</div>
                  <div>
                    <h4 className="font-extrabold uppercase">3 Attempts Rule</h4>
                    <p className="text-sm font-medium text-gray-500">NMAT allows up to 3 attempts. However, NMIMS usually considers only the FIRST attempt.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 bg-accent border-4 border-foreground flex items-center justify-center font-black text-foreground">3</div>
                  <div>
                    <h4 className="font-extrabold uppercase">Speed & Accuracy</h4>
                    <p className="text-sm font-medium text-gray-500">With 108 questions in 120 mins, NMAT is more about speed than CAT-style deep logic.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-secondary text-white p-10 border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
              <h2 className="text-3xl font-black uppercase mb-6 flex items-center gap-3">
                 Target MBA Institutes
              </h2>
              <p className="font-bold text-blue-50 leading-relaxed mb-10 italic">
                Ready to level up? Explore our guides for top-tier MBA programs that accept NMAT and how to optimize your application profile.
              </p>
              <ul className="space-y-4">
                <li><a href="/blog/all-about-nmat-exam" className="font-black underline uppercase hover:text-accent flex items-center gap-2 italic"><ArrowRight className="h-4 w-4" /> NMAT 2026 Ultimate Guide</a></li>
                <li><a href="/blog/top-mba-colleges-mumbai-roi-placements-direct-admission" className="font-black underline uppercase hover:text-accent flex items-center gap-2 italic"><ArrowRight className="h-4 w-4" /> Best Colleges in Mumbai</a></li>
                <li><a href="/blog/how-to-crack-nmims-interviews" className="font-black underline uppercase hover:text-accent flex items-center gap-2 italic"><ArrowRight className="h-4 w-4" /> CD/PI Preparation for NMIMS</a></li>
              </ul>
            </div>
          </section>

          {/* FAQs Section */}
          <section id="faq" className="bg-white border-4 border-foreground p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-black uppercase mb-12 flex items-center gap-4">
              <HelpCircle className="w-10 h-10 text-secondary" /> NMAT Prep FAQs
            </h2>
            <div className="space-y-8">
              {config.faqs?.map((faq, i) => (
                <div key={i} className="border-b-4 border-gray-50 pb-8 last:border-0 border-double">
                  <h4 className="text-xl font-bold uppercase mb-4 flex items-start gap-4">
                    <span className="bg-foreground text-white text-xs px-2 py-0.5 mt-1 shrink-0">Q</span>
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

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
