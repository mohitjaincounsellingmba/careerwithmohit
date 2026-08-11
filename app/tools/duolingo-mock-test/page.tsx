import { Metadata } from 'next';
import { DetCbtMockTestClient } from '@/components/DetMockTest/DetCbtMockTestClient';
import { EXAM_CONFIGS } from '@/lib/mock-test-data';
import { Clock, Target, Zap, Presentation, CheckCircle2, HelpCircle, BookOpen, Globe, Award, Headphones, PenTool, Mic } from 'lucide-react';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Free Duolingo English Test (DET) Mock 2026 | Full Length Adaptive Practice Paper',
  description: 'Take our free full-length Duolingo English Test (DET) 2026 mock exam online. Practice Read & Select, C-Test missing letters, Dictation, Photo Writing, Interactive Reading + Writing & Speaking video samples with instant 10-160 score prediction.',
  keywords: [
    'Duolingo English Test mock 2026', 'free DET adaptive practice test online', 'Duolingo English score 120 plus prep', 
    'DET literacy comprehension conversation production', 'Duolingo English sample test questions',
    'DET practice test with answers', 'Duolingo English test subscores calculator', 'universities accepting Duolingo English Test 2026',
    'Columbia DET requirement', 'Yale Duolingo English score', 'NYU Stern DET cutoff'
  ],
  alternates: {
    canonical: '/tools/duolingo-mock-test',
  },
  openGraph: {
    title: 'Free Duolingo English Test (DET) Mock 2026 | Adaptive Practice Paper',
    description: '1-Hour official pattern DET simulation covering Adaptive skills, Dictation audio, C-Test, Photo description & Writing/Speaking samples with instant 10-160 scoring.',
    type: 'website',
    url: 'https://www.careerwithmohit.online/tools/duolingo-mock-test',
    siteName: 'CareerWithMohit',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Duolingo English Test Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Duolingo English Test (DET) Mock 2026 | Practice Paper',
    description: '10–160 Scale Scoring with 4 Subscores: Literacy, Comprehension, Conversation & Production.',
    images: ['/og-image.webp'],
  }
};

export default function DuolingoMockTestToolPage() {
  const config = EXAM_CONFIGS.find(c => c.slug === 'duolingo');
  
  if (!config) {
    notFound();
  }

  const jsonLd: any = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Duolingo English Test (DET) CBT Mock Test Tool 2026",
        "operatingSystem": "Web",
        "applicationCategory": "EducationalApplication",
        "description": config.seoDescription,
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        }
      },
      {
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
            "name": "Duolingo English Test Mock",
            "item": "https://www.careerwithmohit.online/tools/duolingo-mock-test"
          }
        ]
      },
      {
        "@type": "Quiz",
        "name": "Duolingo English Test Full-Length Practice Test",
        "description": "Full-length 1-hour DET adaptive mock simulation with subscore calculation (Literacy, Comprehension, Conversation, Production).",
        "about": {
          "@type": "Thing",
          "name": "Duolingo English Test (DET)"
        }
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="mx-auto max-w-5xl">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider mb-4 border border-emerald-300">
            <Globe className="w-4 h-4 text-emerald-600" />
            <span>Official Pattern Practice Test</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase mb-4 leading-none text-slate-900">
            Duolingo English Test <span className="text-emerald-600 italic">2026</span> Mock
          </h1>
          <div className="inline-block bg-accent px-6 py-2 border-4 border-foreground transform -rotate-2">
            <p className="font-bold uppercase tracking-widest text-lg">Adaptive Skills (23 Qs) + Writing & Speaking Samples</p>
          </div>
        </div>

        {/* Client Interface */}
        <DetCbtMockTestClient config={config} />

        {/* SEO CONTENT SECTION */}
        <div className="mt-24 space-y-24">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all">
              <div className="bg-emerald-500 w-12 h-12 flex items-center justify-center border-4 border-foreground mb-6 text-slate-950">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase mb-4">60 Minutes</h3>
              <p className="font-medium text-gray-600">Simulate official test duration: 45 minutes adaptive section + 15 minutes video & writing samples.</p>
            </div>
            <div className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all">
              <div className="bg-accent w-12 h-12 flex items-center justify-center border-4 border-foreground mb-6">
                <Zap className="text-foreground w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase mb-4">10–160 Scale</h3>
              <p className="font-medium text-gray-600">Instant overall scaled score and detailed subscore breakdown: Literacy, Comprehension, Conversation, and Production.</p>
            </div>
            <div className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all">
              <div className="bg-foreground w-12 h-12 flex items-center justify-center border-4 border-foreground mb-6">
                <Target className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase mb-4">Target Universities</h3>
              <p className="font-medium text-gray-600">Check eligibility for Columbia, Yale, NYU Stern, USC, Northeastern, McGill, Toronto, and Melbourne.</p>
            </div>
          </div>

          {/* Exam Pattern Table */}
          <section id="pattern">
            <h2 className="text-4xl font-black uppercase mb-12 flex items-center gap-4 text-slate-900">
              <Presentation className="w-10 h-10 text-emerald-600" /> Duolingo English Test Pattern & Tasks
            </h2>
            <div className="overflow-x-auto border-4 border-foreground bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <table className="w-full text-left border-collapse">
                <thead className="bg-foreground text-white uppercase text-sm font-black tracking-widest">
                  <tr>
                    <th className="p-6 border-r border-white/20">Task / Module</th>
                    <th className="p-6 border-r border-white/20">Focus & Skill Measured</th>
                    <th className="p-6 text-center">Items</th>
                    <th className="p-6 text-center">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-lg font-bold">
                  <tr className="border-b-4 border-foreground hover:bg-gray-50 transition-colors">
                    <td className="p-6 border-r-4 border-foreground flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-emerald-600 shrink-0" />
                      Read and Select
                    </td>
                    <td className="p-6 border-r-4 border-foreground text-sm font-medium text-gray-700">
                      Identify genuine English words from invented non-words in vocabulary grids
                    </td>
                    <td className="p-6 text-center border-r-4 border-foreground">Q1 - Q5</td>
                    <td className="p-6 text-center">Adaptive</td>
                  </tr>
                  <tr className="border-b-4 border-foreground bg-slate-50 hover:bg-gray-50 transition-colors">
                    <td className="p-6 border-r-4 border-foreground flex items-center gap-2">
                      <PenTool className="w-5 h-5 text-emerald-600 shrink-0" />
                      Read and Complete (C-Test)
                    </td>
                    <td className="p-6 border-r-4 border-foreground text-sm font-medium text-gray-700">
                      Fill in missing letters of partially completed words in authentic academic texts
                    </td>
                    <td className="p-6 text-center border-r-4 border-foreground">Q6 - Q10</td>
                    <td className="p-6 text-center">Adaptive</td>
                  </tr>
                  <tr className="border-b-4 border-foreground hover:bg-gray-50 transition-colors">
                    <td className="p-6 border-r-4 border-foreground flex items-center gap-2">
                      <Headphones className="w-5 h-5 text-emerald-600 shrink-0" />
                      Listen and Type (Dictation)
                    </td>
                    <td className="p-6 border-r-4 border-foreground text-sm font-medium text-gray-700">
                      Transcribe short spoken English sentences with strict spelling & grammar fidelity
                    </td>
                    <td className="p-6 text-center border-r-4 border-foreground">Q11 - Q15</td>
                    <td className="p-6 text-center">Adaptive</td>
                  </tr>
                  <tr className="border-b-4 border-foreground bg-slate-50 hover:bg-gray-50 transition-colors">
                    <td className="p-6 border-r-4 border-foreground flex items-center gap-2">
                      <PenTool className="w-5 h-5 text-emerald-600 shrink-0" />
                      Write About the Photo
                    </td>
                    <td className="p-6 border-r-4 border-foreground text-sm font-medium text-gray-700">
                      Write 1 to 3 descriptive, grammatically complex sentences characterizing an image
                    </td>
                    <td className="p-6 text-center border-r-4 border-foreground">Q16 - Q18</td>
                    <td className="p-6 text-center">Adaptive</td>
                  </tr>
                  <tr className="border-b-4 border-foreground hover:bg-gray-50 transition-colors">
                    <td className="p-6 border-r-4 border-foreground flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-emerald-600 shrink-0" />
                      Interactive Reading
                    </td>
                    <td className="p-6 border-r-4 border-foreground text-sm font-medium text-gray-700">
                      Passage Gap Completion, Synonym Match, Main Idea, Title Choice, and Inference
                    </td>
                    <td className="p-6 text-center border-r-4 border-foreground">Q19 - Q23</td>
                    <td className="p-6 text-center">Adaptive</td>
                  </tr>
                  <tr className="border-b-4 border-foreground bg-slate-50 hover:bg-gray-50 transition-colors">
                    <td className="p-6 border-r-4 border-foreground flex items-center gap-2">
                      <Mic className="w-5 h-5 text-purple-600 shrink-0" />
                      Writing & Speaking Samples
                    </td>
                    <td className="p-6 border-r-4 border-foreground text-sm font-medium text-gray-700">
                      3–5 minute open writing sample + 1–3 minute spoken video response for university admissions review
                    </td>
                    <td className="p-6 text-center border-r-4 border-foreground">2 Samples</td>
                    <td className="p-6 text-center">15 Minutes</td>
                  </tr>
                  <tr className="bg-emerald-600 text-white uppercase font-black tracking-widest text-xl">
                    <td className="p-6 border-r-4 border-white/20" colSpan={2}>Total DET Practice Exam</td>
                    <td className="p-6 text-center border-r-4 border-white/20">23 Qs + 2 Samples</td>
                    <td className="p-6 text-center">60 Minutes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Top Global Universities & Cutoffs */}
          {config.topCollegesList && config.topCollegesList.length > 0 && (
            <section id="colleges">
              <h2 className="text-4xl font-black uppercase mb-12 flex items-center gap-4 text-foreground">
                <Target className="w-10 h-10 text-emerald-600" /> Top Universities Accepting Duolingo English Test
              </h2>
              <div className="overflow-x-auto border-4 border-foreground bg-white shadow-[12px_12px_0px_0px_rgba(34,197,94,0.3)]">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-emerald-600 text-white uppercase text-sm font-black tracking-widest">
                    <tr>
                      <th className="p-6 border-r border-white/20">Target Institute</th>
                      <th className="p-6">Expected Minimum DET Score</th>
                    </tr>
                  </thead>
                  <tbody className="text-lg font-bold">
                    {config.topCollegesList.map((clg, idx) => (
                      <tr key={idx} className={`border-b-2 border-foreground/10 hover:bg-emerald-50 transition-colors ${idx % 2 !== 0 ? 'bg-slate-50' : ''}`}>
                        <td className="p-6 border-r-2 border-foreground/10 flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          {clg.name}
                        </td>
                        <td className="p-6 text-emerald-700 font-black uppercase italic">{clg.cutoff}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Features Section */}
          {config.features && config.features.length > 0 && (
            <section id="features" className="mt-16">
              <h2 className="text-4xl font-black uppercase mb-8 flex items-center gap-4 text-slate-900">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" /> Key Features of This DET Mock Test
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {config.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-6 bg-white border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0 mt-1" />
                    <p className="font-bold text-lg">{feature}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FAQ Section */}
          {config.faqs && config.faqs.length > 0 && (
            <section id="faq" className="mt-16 border-t-8 border-foreground pt-16">
              <h2 className="text-4xl font-black uppercase mb-8 flex items-center gap-4 text-slate-900">
                <HelpCircle className="w-10 h-10 text-emerald-600" /> Frequently Asked Questions (DET 2026)
              </h2>
              <div className="space-y-6">
                {config.faqs.map((faq, idx) => (
                  <details key={idx} className="group bg-white border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] open:bg-emerald-50/50 transition-colors">
                    <summary className="p-6 text-xl font-bold uppercase cursor-pointer list-none flex justify-between items-center">
                      <span>{faq.question}</span>
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <div className="p-6 pt-0 text-lg text-gray-700 font-medium border-t-4 border-foreground mt-4 leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
}
