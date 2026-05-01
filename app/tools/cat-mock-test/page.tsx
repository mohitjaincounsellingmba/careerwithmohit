import { Metadata } from 'next';
import { GenericMockTestClient } from '@/components/GenericMockTest/GenericMockTestClient';
import { EXAM_CONFIGS, generateMockQuestions } from '@/lib/mock-test-data';
import { CheckCircle2, BookOpen, Target, Zap, Clock, HelpCircle, BarChart3, Presentation, Award, GraduationCap, ShieldCheck, PieChart } from 'lucide-react';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Free CAT Mock Test 2026 | IIM 99+ Percentile Mock Tool',
  description: 'Take our free full-length CAT 2026 mock test. 66 questions, 120 minutes, with sectional 40-minute timers. Get instant percentile prediction, VARC analysis, and IIM admission guide.',
  keywords: [
    'CAT 2026 mock test', 'CAT 2026 test series', 'Best mock test for CAT 2026', 'CAT 2026 preparation material', 
    'Online CAT coaching 2026', 'CAT exam 2026 date', 'CAT 2026 syllabus PDF', 'Free CAT mock test 2026', 
    'CAT 2026 free study material', 'CAT previous year question papers with solutions', 'Free sectional tests for CAT 2026', 
    'CAT 2026 exam pattern', 'CAT formula book PDF', 'CAT 2026 VARC practice questions', 'DILR sets for CAT 2026 with solutions', 
    'Quantitative Aptitude mock test 2026', 'CAT 2026 Reading Comprehension passages', 'Logical Reasoning puzzles for CAT', 
    'Data Interpretation practice for CAT', 'How to score 99 percentile in CAT 2026', 'CAT 2026 preparation strategy for beginners', 
    'CAT 2026 study plan for working professionals', 'CAT score vs percentile 2026', 'IIM admission criteria 2027', 
    'CAT 2026 registration process', 'TIME AIMCAT 2026 vs IMS SimCAT 2026', 'Career Launcher CDC 2026 review', 
    'Cracku vs Rodha CAT test series', 'Best online test series for CAT 2026', 'Toughness level of different CAT mocks', 
    'CAT 2026 expected cut-offs for IIMs', 'Adaptive mock tests for CAT 2026', 'Non-engineer strategy for CAT 2026', 
    'CAT 2026 notification updates', 'Daily targets for CAT 2026 preparation', 'MBA entrance exams 2026 list'
  ],
  alternates: {
    canonical: '/tools/cat-mock-test',
  },
  openGraph: {
    title: 'Free CAT Mock Test 2026 | Master the IIM Admissions',
    description: 'Master the Common Admission Test (CAT) with our realistic mock tool. Experience 2-hour intense management testing with AI analysis and sectional reports.',
    type: 'website',
    url: 'https://www.careerwithmohit.online/tools/cat-mock-test',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'CAT 2026 Mock Test Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free CAT Mock Test 2026 | Master the IIM Admissions',
    description: 'Realistic 66-question CAT mock test for IIM aspirants. Includes sectional 40-minute timers and a percentile predictor.',
    images: ['/og-image.webp'],
  }
};

export default function CatMockTestPage() {
  const config = EXAM_CONFIGS.find(c => c.slug === 'cat');
  
  if (!config) {
    notFound();
  }

  const questions = generateMockQuestions(config);

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CAT 2026 Mock Test Tool",
    "operatingSystem": "Web",
    "applicationCategory": "EducationalApplication",
    "description": "Realistic 66-question CAT mock test for IIM aspirants. Includes sectional 40-minute timers and a percentile predictor for top management institutes like FMS and XLRI.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.careerwithmohit.online/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tools",
        "item": "https://www.careerwithmohit.online/tools"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "CAT Mock Test",
        "item": "https://www.careerwithmohit.online/tools/cat-mock-test"
      }
    ]
  };

  return (
    <main className="min-h-screen bg-[#f0f0f0] pt-24 pb-20 px-6 sm:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <div className="mx-auto max-w-5xl">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-7xl font-black uppercase mb-4 leading-none">
            CAT <span className="text-primary italic">2026</span> Mock Test
          </h1>
          <div className="inline-block bg-accent px-6 py-2 border-4 border-foreground transform -rotate-2">
            <p className="font-bold uppercase tracking-widest text-lg md:text-xl">Full-Length 120 Minute IIM Practice Simulation</p>
          </div>
        </div>

        {/* Client Interface */}
        <GenericMockTestClient config={config} questions={questions} />

        {/* SEO CONTENT SECTION */}
        <div className="mt-24 space-y-24">
          
          {/* Sectional Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all">
              <div className="bg-primary w-12 h-12 flex items-center justify-center border-4 border-foreground mb-6">
                <Clock className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase mb-4">40m / Section</h3>
              <p className="font-medium text-gray-600 italic">Experience the actual CAT pressure with strictly timed 40-minute windows for VARC, DILR, and Quant.</p>
            </div>
            <div className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all">
              <div className="bg-accent w-12 h-12 flex items-center justify-center border-4 border-foreground mb-6">
                <Zap className="text-foreground w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase mb-4">99+ Percentile AI</h3>
              <p className="font-medium text-gray-600 italic">Get an immediate estimation of your percentile relative to 2.5 lakh+ annual CAT aspirants.</p>
            </div>
            <div className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all">
              <div className="bg-foreground w-12 h-12 flex items-center justify-center border-4 border-foreground mb-6">
                <Target className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase mb-4">IIM Target Benchmarking</h3>
              <p className="font-medium text-gray-600 italic">Know exactly which IIMs you can get based on your sectional accuracy and overall raw score.</p>
            </div>
          </div>

          {/* Marks vs Percentile Table */}
          <section id="marks" className="bg-white border-4 border-foreground p-10 shadow-[12px_12px_0px_0px_rgba(var(--primary-rgb),1)]">
            <div className="flex items-center gap-4 mb-8">
              <BarChart3 className="w-10 h-10 text-primary" strokeWidth={3} />
              <h2 className="text-3xl font-black uppercase tracking-tighter">CAT 2026: Score vs Percentile Chart</h2>
            </div>
            <p className="mb-8 text-gray-600 font-medium leading-relaxed">
              Based on historical data from IIM Lucknow (2023) and IIM Calcutta (2024), here is the projected raw score required (out of 198) to hit your dream percentile.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { s: '105+', p: '99.9+ %ile', target: 'IIM A/B/C' },
                  { s: '85+', p: '99+ %ile', target: 'Top 7 IIMs' },
                  { s: '65+', p: '95+ %ile', target: 'IIM K/I/S' },
                  { s: '50+', p: '90+ %ile', target: 'New IIMs' },
                  { s: '40+', p: '85+ %ile', target: 'Baby IIMs' },
                  { s: '30+', p: '80+ %ile', target: 'Private MBA' },
                  { s: '20+', p: '70+ %ile', target: 'State Uni' },
                  { s: '15+', p: '60+ %ile', target: 'Improvement' }
                ].map((item, i) => (
                  <div key={i} className="border-4 border-foreground p-5 text-center group hover:bg-foreground transition-all">
                    <p className="text-sm font-black text-primary uppercase group-hover:text-white">{item.p}</p>
                    <p className="text-3xl font-black mb-1 group-hover:text-white">{item.s}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-primary transition-colors italic">{item.target}</p>
                  </div>
                ))}
            </div>
          </section>

          {/* Sectional Breakdown */}
          <section id="sections">
            <h2 className="text-4xl font-black uppercase mb-12 flex items-center gap-4">
              <PieChart className="w-10 h-10 text-primary" /> CAT Sectional Strategies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'VARC',
                  desc: '24 Questions | 40 Minutes',
                  tips: ['Focus on 4 RC Passages (16 Questions)', 'Verbal Logic (Para-jumbles, Odd-one-out)', 'Accuracy over speed matters here.'],
                  color: 'bg-blue-50'
                },
                {
                  title: 'DILR',
                  desc: '20 Questions | 40 Minutes',
                  tips: ['Aim to crack 2 Full Sets (8-10 Questions)', 'Pick the logically straightforward sets first', 'Varies from Games to Numerical Puzzle Logic.'],
                  color: 'bg-emerald-50'
                },
                {
                  title: 'QA',
                  desc: '22 Questions | 40 Minutes',
                  tips: ['Master Arithmetic (8-10 Questions)', 'Focus on Geometry and Algebra basics', 'Solve TITA first (No Negative Marking).'],
                  color: 'bg-rose-50'
                }
              ].map((sec, i) => (
                <div key={i} className={`border-4 border-foreground ${sec.color} p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col`}>
                  <h3 className="text-3xl font-black uppercase mb-2">{sec.title}</h3>
                  <p className="text-sm font-bold text-gray-500 mb-6 uppercase tracking-widest">{sec.desc}</p>
                  <ul className="space-y-4 mt-auto">
                    {sec.tips.map((tip, j) => (
                      <li key={j} className="flex font-bold text-sm text-gray-700 items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
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
              <h2 className="text-3xl font-black uppercase mb-6 flex items-center gap-3 underline decoration-primary decoration-8">
                <GraduationCap className="h-8 w-8 text-primary" /> The BLUEPRINT for IIMs
              </h2>
              <p className="text-gray-600 font-medium mb-8 italic">
                CAT score is only 50-60% of the selection criteria for top IIMs. You also need a strong profile to get those dream calls.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 bg-primary border-4 border-foreground flex items-center justify-center font-black text-white">1</div>
                  <div>
                    <h4 className="font-extrabold uppercase">Sectional Cutoffs</h4>
                    <p className="text-sm font-medium text-gray-500">Must clear minimum 70-80 %ile in all three sections to be considered.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 bg-secondary border-4 border-foreground flex items-center justify-center font-black text-white">2</div>
                  <div>
                    <h4 className="font-extrabold uppercase">Academic profile</h4>
                    <p className="text-sm font-medium text-gray-500">10th, 12th, and Graduation marks play a huge role in the final shortlist.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 bg-accent border-4 border-foreground flex items-center justify-center font-black text-foreground">3</div>
                  <div>
                    <h4 className="font-extrabold uppercase">Work experience</h4>
                    <p className="text-sm font-medium text-gray-500">Candidates with 24-36 months of work-ex often get the highest preference.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-primary text-white p-10 border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
              <h2 className="text-3xl font-black uppercase mb-6 flex items-center gap-3">
                 Target IIM Admissions
              </h2>
              <p className="font-bold text-blue-50 leading-relaxed mb-10 italic">
                Don't just stop at a mock test. Read our comprehensive guides on how to handle the interviews and admission cycle for the top management institutes in India.
              </p>
              <ul className="space-y-4">
                <li><a href="/blog/iims-list-courses-placements-cutoffs-admission" className="font-black underline uppercase hover:text-accent flex items-center gap-2 italic"><ArrowRight className="h-4 w-4" /> Comprehensive IIM Guide 2026</a></li>
                <li><a href="/blog/cat-2026-preparation-strategy-syllabus-dates" className="font-black underline uppercase hover:text-accent flex items-center gap-2 italic"><ArrowRight className="h-4 w-4" /> CAT 2026 Preparation Roadmap</a></li>
                <li><a href="/blog/why-take-our-free-cat-mock-test-2026-online" className="font-black underline uppercase hover:text-accent flex items-center gap-2 italic"><ArrowRight className="h-4 w-4" /> How to Analyze CAT Mocks</a></li>
                <li><a href="/blog/top-mba-colleges-mumbai-roi-placements-direct-admission" className="font-black underline uppercase hover:text-accent flex items-center gap-2 italic"><ArrowRight className="h-4 w-4" /> Top MBA Colleges in Mumbai</a></li>
                <li><a href="/blog/top-mba-colleges-pune-direct-admission-fees-placement" className="font-black underline uppercase hover:text-accent flex items-center gap-2 italic"><ArrowRight className="h-4 w-4" /> Best Management Hub: Pune</a></li>
              </ul>
            </div>
          </section>

          {/* FAQs Section */}
          <section id="faq" className="bg-white border-4 border-foreground p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-black uppercase mb-12 flex items-center gap-4">
              <HelpCircle className="w-10 h-10 text-primary" /> Management Hub FAQs
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

          {/* Popular CAT 2026 Search Phrases (SEO Section) */}
          <section id="popular-searches" className="bg-white border-4 border-foreground p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-black uppercase mb-10 flex items-center gap-4">
              <BookOpen className="w-10 h-10 text-primary" /> CAT 2026: Popular Topics & Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               <div className="space-y-4">
                 <h4 className="font-extrabold text-foreground uppercase border-b-2 border-foreground pb-2">High Volume Queries</h4>
                 <ul className="space-y-2 text-sm font-bold text-gray-600 italic">
                   <li><ArrowRight className="inline w-3 h-3 mr-1 text-primary"/> CAT 2026 mock test</li>
                   <li><ArrowRight className="inline w-3 h-3 mr-1 text-primary"/> CAT 2026 test series</li>
                   <li><ArrowRight className="inline w-3 h-3 mr-1 text-primary"/> Best mock test for CAT 2026</li>
                   <li><ArrowRight className="inline w-3 h-3 mr-1 text-primary"/> CAT 2026 preparation material</li>
                   <li><ArrowRight className="inline w-3 h-3 mr-1 text-primary"/> Online CAT coaching 2026</li>
                   <li><ArrowRight className="inline w-3 h-3 mr-1 text-primary"/> CAT exam 2026 date</li>
                   <li><ArrowRight className="inline w-3 h-3 mr-1 text-primary"/> CAT 2026 syllabus PDF</li>
                 </ul>
               </div>
               
               <div className="space-y-4">
                 <h4 className="font-extrabold text-foreground uppercase border-b-2 border-foreground pb-2">Free Study Material</h4>
                 <ul className="space-y-2 text-sm font-bold text-gray-600 italic">
                   <li><ArrowRight className="inline w-3 h-3 mr-1 text-primary"/> Free CAT mock test 2026</li>
                   <li><ArrowRight className="inline w-3 h-3 mr-1 text-primary"/> CAT 2026 free study material</li>
                   <li><ArrowRight className="inline w-3 h-3 mr-1 text-primary"/> CAT previous year question papers</li>
                   <li><ArrowRight className="inline w-3 h-3 mr-1 text-primary"/> Free sectional tests for CAT 2026</li>
                   <li><ArrowRight className="inline w-3 h-3 mr-1 text-primary"/> CAT 2026 exam pattern</li>
                   <li><ArrowRight className="inline w-3 h-3 mr-1 text-primary"/> CAT formula book PDF</li>
                 </ul>
               </div>

               <div className="space-y-4">
                 <h4 className="font-extrabold text-foreground uppercase border-b-2 border-foreground pb-2">Sectional Practice</h4>
                 <ul className="space-y-2 text-sm font-bold text-gray-600 italic">
                   <li><ArrowRight className="inline w-3 h-3 mr-1 text-primary"/> CAT 2026 VARC practice questions</li>
                   <li><ArrowRight className="inline w-3 h-3 mr-1 text-primary"/> DILR sets for CAT 2026 with solutions</li>
                   <li><ArrowRight className="inline w-3 h-3 mr-1 text-primary"/> Quantitative Aptitude mock test 2026</li>
                   <li><ArrowRight className="inline w-3 h-3 mr-1 text-primary"/> CAT 2026 Reading Comprehension</li>
                   <li><ArrowRight className="inline w-3 h-3 mr-1 text-primary"/> Logical Reasoning puzzles for CAT</li>
                   <li><ArrowRight className="inline w-3 h-3 mr-1 text-primary"/> Data Interpretation practice for CAT</li>
                 </ul>
               </div>

               <div className="space-y-4">
                 <h4 className="font-extrabold text-foreground uppercase border-b-2 border-foreground pb-2">Intent & Strategy</h4>
                 <ul className="space-y-2 text-sm font-bold text-gray-600 italic">
                   <li><ArrowRight className="inline w-3 h-3 mr-1 text-primary"/> How to score 99 percentile in CAT 2026</li>
                   <li><ArrowRight className="inline w-3 h-3 mr-1 text-primary"/> Preparation strategy for beginners</li>
                   <li><ArrowRight className="inline w-3 h-3 mr-1 text-primary"/> Study plan for working professionals</li>
                   <li><ArrowRight className="inline w-3 h-3 mr-1 text-primary"/> CAT score vs percentile 2026</li>
                   <li><ArrowRight className="inline w-3 h-3 mr-1 text-primary"/> IIM admission criteria 2027</li>
                   <li><ArrowRight className="inline w-3 h-3 mr-1 text-primary"/> CAT 2026 registration process</li>
                 </ul>
               </div>

               <div className="space-y-4">
                 <h4 className="font-extrabold text-foreground uppercase border-b-2 border-foreground pb-2">Comparisons & Brands</h4>
                 <ul className="space-y-2 text-sm font-bold text-gray-600 italic">
                   <li><ArrowRight className="inline w-3 h-3 mr-1 text-primary"/> TIME AIMCAT 2026 vs IMS SimCAT 2026</li>
                   <li><ArrowRight className="inline w-3 h-3 mr-1 text-primary"/> Career Launcher CDC 2026 review</li>
                   <li><ArrowRight className="inline w-3 h-3 mr-1 text-primary"/> Cracku vs Rodha CAT test series</li>
                   <li><ArrowRight className="inline w-3 h-3 mr-1 text-primary"/> Best online test series for CAT 2026</li>
                   <li><ArrowRight className="inline w-3 h-3 mr-1 text-primary"/> Toughness level of different mocks</li>
                 </ul>
               </div>

               <div className="space-y-4">
                 <h4 className="font-extrabold text-foreground uppercase border-b-2 border-foreground pb-2">LSI & Long-Tail</h4>
                 <ul className="space-y-2 text-sm font-bold text-gray-600 italic">
                   <li><ArrowRight className="inline w-3 h-3 mr-1 text-primary"/> CAT 2026 expected cut-offs for IIMs</li>
                   <li><ArrowRight className="inline w-3 h-3 mr-1 text-primary"/> Adaptive mock tests for CAT 2026</li>
                   <li><ArrowRight className="inline w-3 h-3 mr-1 text-primary"/> Non-engineer strategy for CAT 2026</li>
                   <li><ArrowRight className="inline w-3 h-3 mr-1 text-primary"/> CAT 2026 notification updates</li>
                   <li><ArrowRight className="inline w-3 h-3 mr-1 text-primary"/> Daily targets for CAT 2026 preparation</li>
                   <li><ArrowRight className="inline w-3 h-3 mr-1 text-primary"/> MBA entrance exams 2026 list</li>
                 </ul>
               </div>
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
