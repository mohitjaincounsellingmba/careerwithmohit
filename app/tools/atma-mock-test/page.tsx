import { Metadata } from 'next';
import { GenericMockTestClient } from '@/components/GenericMockTest/GenericMockTestClient';
import { EXAM_CONFIGS, generateMockQuestions } from '@/lib/mock-test-data';
import { CheckCircle2, BookOpen, Target, Zap, Clock, HelpCircle, BarChart3, Presentation, Award, GraduationCap, ShieldCheck, PieChart } from 'lucide-react';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Free ATMA Mock Test 2026 | MBA Entrance Exam Practice Tool',
  description: 'Take our free full-length ATMA 2026 mock test. 180 questions, 180 minutes, with 6 specialized sections. Get instant analytics, percentile prediction, and top B-school cutoffs.',
  keywords: [
    'ATMA 2026 mock test', 'ATMA exam practice 2026', 'Free ATMA test series', 'ATMA preparation material',
    'ATMA analytical reasoning questions', 'ATMA verbal skills practice', 'ATMA quantitative skills mock',
    'AIMS ATMA 2026 exam pattern', 'ATMA score vs percentile', 'JBIMS ATMA cutoff 2026',
    'best mock test for ATMA 2026', 'free ATMA practice paper with solutions', 'AIMS MBA entrance preparation'
  ],
  alternates: {
    canonical: '/tools/atma-mock-test',
  }
};

export default function AtmaMockTestPage() {
  const config = EXAM_CONFIGS.find(c => c.slug === 'atma');
  
  if (!config) {
    notFound();
  }

  const questions = generateMockQuestions(config);

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ATMA 2026 Mock Test Tool",
    "operatingSystem": "Web",
    "applicationCategory": "EducationalApplication",
    "description": "Take our free full-length ATMA 2026 mock test. 180 questions, 180 minutes, with 6 specialized sections. Get instant analytics, percentile prediction, and top B-school cutoffs.",
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
        "name": "Mock Tests",
        "item": "https://www.careerwithmohit.online/mock-tests"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "ATMA Mock Test",
        "item": "https://www.careerwithmohit.online/tools/atma-mock-test"
      }
    ]
  };

  const faqSchema = config.faqs && config.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": config.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

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
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <div className="mx-auto max-w-5xl">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-7xl font-black uppercase mb-4 leading-none">
            ATMA <span className="text-primary italic">2026</span> Mock Test
          </h1>
          <div className="inline-block bg-accent px-6 py-2 border-4 border-foreground transform -rotate-2">
            <p className="font-bold uppercase tracking-widest text-lg md:text-xl">Full-Length 180 Minute MBA Practice Simulation</p>
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
              <h3 className="text-xl font-black uppercase mb-4">30m / Section</h3>
              <p className="font-medium text-gray-600 italic">Experience the actual ATMA pressure with 6 strictly timed 30-minute sections.</p>
            </div>
            <div className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all">
              <div className="bg-accent w-12 h-12 flex items-center justify-center border-4 border-foreground mb-6">
                <Zap className="text-foreground w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase mb-4">180 Questions</h3>
              <p className="font-medium text-gray-600 italic">Complete 180 MCQs covering Analytical, Verbal, and Quantitative skills.</p>
            </div>
            <div className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all">
              <div className="bg-foreground w-12 h-12 flex items-center justify-center border-4 border-foreground mb-6">
                <Target className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase mb-4">JBIMS/PUMBA Targeting</h3>
              <p className="font-medium text-gray-600 italic">Benchmarked against top colleges in Maharashtra and across India that accept ATMA scores.</p>
            </div>
          </div>

          {/* ATMA Pattern Table */}
          <section id="pattern" className="bg-white border-4 border-foreground p-10 shadow-[12px_12px_0px_0px_rgba(var(--primary-rgb),1)]">
            <div className="flex items-center gap-4 mb-8">
              <BarChart3 className="w-10 h-10 text-primary" strokeWidth={3} />
              <h2 className="text-3xl font-black uppercase tracking-tighter">ATMA 2026: Exam Pattern</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-4 border-foreground">
                <thead>
                  <tr className="bg-foreground text-white uppercase text-xs font-black">
                    <th className="p-4 text-left border-r border-white/20">Section</th>
                    <th className="p-4 text-center border-r border-white/20">Questions</th>
                    <th className="p-4 text-center">Time Limit</th>
                  </tr>
                </thead>
                <tbody className="font-bold text-sm">
                  {[
                    { s: 'Analytical Reasoning Skills I', q: 30, t: '30 Mins' },
                    { s: 'Analytical Reasoning Skills II', q: 30, t: '30 Mins' },
                    { s: 'Verbal Skills I', q: 30, t: '30 Mins' },
                    { s: 'Verbal Skills II', q: 30, t: '30 Mins' },
                    { s: 'Quantitative Skills I', q: 30, t: '30 Mins' },
                    { s: 'Quantitative Skills II', q: 30, t: '30 Mins' }
                  ].map((item, i) => (
                    <tr key={i} className="border-b-2 border-foreground/10 hover:bg-primary/5">
                      <td className="p-4 border-r-2 border-foreground/10">{item.s}</td>
                      <td className="p-4 text-center border-r-2 border-foreground/10">{item.q}</td>
                      <td className="p-4 text-center text-primary italic">{item.t}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50 font-black">
                    <td className="p-4 border-r-2 border-foreground/10">Total</td>
                    <td className="p-4 text-center border-r-2 border-foreground/10">180</td>
                    <td className="p-4 text-center italic">180 Mins (3 Hours)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Top Colleges Section */}
          <section id="colleges">
            <h2 className="text-4xl font-black uppercase mb-12 flex items-center gap-4 text-foreground">
              <Target className="w-10 h-10 text-primary" strokeWidth={3} /> Top Colleges Accepting ATMA
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { name: 'JBIMS Mumbai', cutoff: '99.9+ %ile', location: 'Mumbai' },
                { name: 'SIMSREE Mumbai', cutoff: '99.7+ %ile', location: 'Mumbai' },
                { name: 'PUMBA Pune', cutoff: '98+ %ile', location: 'Pune' },
                { name: 'Welingkar Mumbai', cutoff: '97+ %ile', location: 'Mumbai' },
                { name: 'MET Mumbai', cutoff: '95+ %ile', location: 'Mumbai' },
                { name: 'IES MCRC Mumbai', cutoff: '92+ %ile', location: 'Mumbai' }
              ].map((clg, idx) => (
                <div key={idx} className="bg-white border-4 border-foreground p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex justify-between items-center group hover:bg-foreground transition-all">
                  <div>
                    <h4 className="font-black uppercase group-hover:text-white transition-colors">{clg.name}</h4>
                    <p className="text-xs font-bold text-gray-400 uppercase italic group-hover:text-primary">{clg.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black text-primary group-hover:text-white italic">{clg.cutoff}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQs Section */}
          <section id="faq" className="bg-white border-4 border-foreground p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-black uppercase mb-12 flex items-center gap-4">
              <HelpCircle className="w-10 h-10 text-primary" /> ATMA Exam FAQs
            </h2>
            <div className="space-y-8">
              {[
                {
                  q: "What is the marking scheme for ATMA 2026?",
                  a: "ATMA follows a +1 for correct answer and -0.25 for incorrect answer marking scheme. There is no penalty for unattempted questions."
                },
                {
                  q: "Is there a sectional time limit in ATMA?",
                  a: "Yes, each of the six sections has a strict 30-minute time limit. You cannot move back and forth between sections."
                },
                {
                  q: "Which MBA colleges accept ATMA scores?",
                  a: "Over 500+ MBA colleges in India accept ATMA scores, including top institutes like JBIMS, SIMSREE, PUMBA, and Welingkar (primarily for OMS candidates or specific quotas)."
                }
              ].map((faq, i) => (
                <div key={i} className="border-b-4 border-gray-50 pb-8 last:border-0 border-double">
                  <h4 className="text-xl font-bold uppercase mb-4 flex items-start gap-4">
                    <span className="bg-foreground text-white text-xs px-2 py-0.5 mt-1 shrink-0">Q</span>
                    {faq.q}
                  </h4>
                  <p className="text-lg text-gray-600 font-medium leading-relaxed italic ml-10">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Popular Search Phrases (SEO Section) */}
          <section id="popular-searches" className="bg-white border-4 border-foreground p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-black uppercase mb-10 flex items-center gap-4">
              <BookOpen className="w-10 h-10 text-primary" /> ATMA 2026: Popular Topics & Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h4 className="font-extrabold text-foreground uppercase border-b-2 border-foreground pb-2">High Volume Queries</h4>
                <ul className="space-y-2 text-sm font-bold text-gray-500 italic">
                  <li><span className="text-primary font-black">→</span> ATMA 2026 mock test</li>
                  <li><span className="text-primary font-black">→</span> ATMA exam practice online 2026</li>
                  <li><span className="text-primary font-black">→</span> Free ATMA test series</li>
                  <li><span className="text-primary font-black">→</span> ATMA preparation material</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-extrabold text-foreground uppercase border-b-2 border-foreground pb-2">Syllabus & Pattern</h4>
                <ul className="space-y-2 text-sm font-bold text-gray-500 italic">
                  <li><span className="text-primary font-black">→</span> AIMS ATMA exam pattern</li>
                  <li><span className="text-primary font-black">→</span> ATMA analytical reasoning questions</li>
                  <li><span className="text-primary font-black">→</span> ATMA verbal skills practice</li>
                  <li><span className="text-primary font-black">→</span> ATMA quantitative skills mock</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-extrabold text-foreground uppercase border-b-2 border-foreground pb-2">Percentile & Target Colleges</h4>
                <ul className="space-y-2 text-sm font-bold text-gray-500 italic">
                  <li><span className="text-primary font-black">→</span> ATMA score vs percentile 2026</li>
                  <li><span className="text-primary font-black">→</span> JBIMS ATMA cutoff 2026</li>
                  <li><span className="text-primary font-black">→</span> PUMBA Pune admission ATMA</li>
                  <li><span className="text-primary font-black">→</span> Welingkar Mumbai ATMA cutoff score</li>
                </ul>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
