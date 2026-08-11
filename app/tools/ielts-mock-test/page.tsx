import { Metadata } from 'next';
import { IeltsCbtMockTestClient } from '@/components/IeltsMockTest/IeltsCbtMockTestClient';
import { EXAM_CONFIGS } from '@/lib/mock-test-data';
import { Clock, Target, Zap, Presentation, CheckCircle2, HelpCircle, BookOpen, Globe, Award, Headphones, PenTool } from 'lucide-react';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Free IELTS Academic Mock Test 2026 | Full Length Practice Paper (80 Questions)',
  description: 'Take our free full-length IELTS Academic 2026 CBT mock test online. 80 questions covering Listening (40 Qs with audio transcripts), Academic Reading (40 Qs with 3 scientific passages), and Writing Tasks 1 & 2 with instant 0-9 Band scores and step-by-step solutions.',
  keywords: [
    'IELTS Academic mock test 2026', 'free IELTS listening reading practice', 'IELTS Band 7 plus exam preparation', 
    'IELTS academic mock paper with answers', 'study abroad English proficiency test mock', 'IELTS full length test online',
    'IELTS reading passage practice with answers', 'IELTS listening audio transcript mock test', 'IELTS writing task 1 and task 2 model essays',
    'Oxford IELTS cutoff', 'Cambridge IELTS requirement', 'Harvard IELTS minimum score', 'Toronto university IELTS band'
  ],
  alternates: {
    canonical: '/tools/ielts-mock-test',
  },
  openGraph: {
    title: 'Free IELTS Academic Mock Test 2026 | Full Length Practice Paper (80 Qs)',
    description: 'Take our free full-length IELTS Academic CBT test with Listening (40 Qs), Reading (40 Qs), and Writing Tasks with instant 0-9 Band scoring & global university matching.',
    type: 'website',
    url: 'https://www.careerwithmohit.online/tools/ielts-mock-test',
    siteName: 'CareerWithMohit',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'IELTS Academic Mock Test Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free IELTS Academic Mock Test 2026 | Full Length Practice Paper',
    description: '80 Questions, Listening & Reading with Audio Transcripts, Band 0-9.0 Score Predictor and Step-by-Step Solutions.',
    images: ['/og-image.webp'],
  }
};

export default function IeltsMockTestToolPage() {
  const config = EXAM_CONFIGS.find(c => c.slug === 'ielts');
  
  if (!config) {
    notFound();
  }

  const jsonLd: any = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "IELTS Academic CBT Mock Test Tool 2026",
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
            "name": "IELTS Mock Test",
            "item": "https://www.careerwithmohit.online/tools/ielts-mock-test"
          }
        ]
      },
      {
        "@type": "Quiz",
        "name": "IELTS Academic Full-Length Practice Test",
        "description": "80 Questions official IELTS Academic mock test covering Listening (40) and Reading (40) with Writing modules.",
        "about": {
          "@type": "Thing",
          "name": "International English Language Testing System (IELTS)"
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-800 text-xs font-black uppercase tracking-wider mb-4 border border-rose-300">
            <Globe className="w-4 h-4 text-rose-600" />
            <span>Official Pattern Practice Test</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase mb-4 leading-none">
            IELTS Academic <span className="text-rose-600 italic">2026</span> Mock Test
          </h1>
          <div className="inline-block bg-accent px-6 py-2 border-4 border-foreground transform -rotate-2">
            <p className="font-bold uppercase tracking-widest text-lg">Full-Length 80 Question Practice Paper + Writing Tasks</p>
          </div>
        </div>

        {/* Client Interface */}
        <IeltsCbtMockTestClient config={config} />

        {/* SEO CONTENT SECTION */}
        <div className="mt-24 space-y-24">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all">
              <div className="bg-rose-600 w-12 h-12 flex items-center justify-center border-4 border-foreground mb-6">
                <Clock className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase mb-4">150 Minutes</h3>
              <p className="font-medium text-gray-600">Simulate official testing pressure: Listening (30m), Reading (60m), and Writing (60m).</p>
            </div>
            <div className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all">
              <div className="bg-accent w-12 h-12 flex items-center justify-center border-4 border-foreground mb-6">
                <Zap className="text-foreground w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase mb-4">Official Band Scale</h3>
              <p className="font-medium text-gray-600">Get your estimated Band Score (0.0–9.0) and CEFR proficiency level (B2 / C1 / C2) immediately.</p>
            </div>
            <div className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all">
              <div className="bg-foreground w-12 h-12 flex items-center justify-center border-4 border-foreground mb-6">
                <Target className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase mb-4">Target Universities</h3>
              <p className="font-medium text-gray-600">Check eligibility for Oxford, Cambridge, Harvard, MIT, Toronto, Melbourne, and UBC.</p>
            </div>
          </div>

          {/* Exam Pattern & Syllabus Table */}
          <section id="pattern">
            <h2 className="text-4xl font-black uppercase mb-12 flex items-center gap-4">
              <Presentation className="w-10 h-10 text-rose-600" /> IELTS Academic Exam Pattern
            </h2>
            <div className="overflow-x-auto border-4 border-foreground bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <table className="w-full text-left border-collapse">
                <thead className="bg-foreground text-white uppercase text-sm font-black tracking-widest">
                  <tr>
                    <th className="p-6 border-r border-white/20">Module / Section</th>
                    <th className="p-6 border-r border-white/20">Question Types & Coverage</th>
                    <th className="p-6 text-center">Questions</th>
                    <th className="p-6 text-center">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-lg font-bold">
                  <tr className="border-b-4 border-foreground hover:bg-gray-50 transition-colors">
                    <td className="p-6 border-r-4 border-foreground flex items-center gap-2">
                      <Headphones className="w-5 h-5 text-rose-600 shrink-0" />
                      Listening Module
                    </td>
                    <td className="p-6 border-r-4 border-foreground text-sm font-medium text-gray-700">
                      Everyday Conversations, Monologues, Academic Student Discussions & Lectures (4 Parts)
                    </td>
                    <td className="p-6 text-center border-r-4 border-foreground">40 Questions</td>
                    <td className="p-6 text-center">30 Minutes</td>
                  </tr>
                  <tr className="border-b-4 border-foreground bg-slate-50 hover:bg-gray-50 transition-colors">
                    <td className="p-6 border-r-4 border-foreground flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-rose-600 shrink-0" />
                      Academic Reading
                    </td>
                    <td className="p-6 border-r-4 border-foreground text-sm font-medium text-gray-700">
                      3 Complex Academic Texts (Environmental AI, Agrarian Revolution, Behavioral Economics) with TFNG, MCQs & Fill Blanks
                    </td>
                    <td className="p-6 text-center border-r-4 border-foreground">40 Questions</td>
                    <td className="p-6 text-center">60 Minutes</td>
                  </tr>
                  <tr className="border-b-4 border-foreground hover:bg-gray-50 transition-colors">
                    <td className="p-6 border-r-4 border-foreground flex items-center gap-2">
                      <PenTool className="w-5 h-5 text-rose-600 shrink-0" />
                      Writing Module
                    </td>
                    <td className="p-6 border-r-4 border-foreground text-sm font-medium text-gray-700">
                      Task 1: Bar Chart / Formal Letter (150 words) • Task 2: Formal Argumentative Essay (250 words)
                    </td>
                    <td className="p-6 text-center border-r-4 border-foreground">2 Tasks</td>
                    <td className="p-6 text-center">60 Minutes</td>
                  </tr>
                  <tr className="bg-rose-600 text-white uppercase font-black tracking-widest text-xl">
                    <td className="p-6 border-r-4 border-white/20" colSpan={2}>Total Practice Paper</td>
                    <td className="p-6 text-center border-r-4 border-white/20">80 Qs + 2 Tasks</td>
                    <td className="p-6 text-center">150 Minutes</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-6 font-bold text-gray-500 italic">** Note: Exam pattern strictly adheres to Cambridge ESOL / British Council / IDP IELTS guidelines.</p>
          </section>

          {/* Top Global Universities & Band Cutoffs */}
          {config.topCollegesList && config.topCollegesList.length > 0 && (
            <section id="colleges">
              <h2 className="text-4xl font-black uppercase mb-12 flex items-center gap-4 text-foreground">
                <Target className="w-10 h-10 text-rose-600" /> Top Global Universities & IELTS Band Cutoffs
              </h2>
              <div className="overflow-x-auto border-4 border-foreground bg-white shadow-[12px_12px_0px_0px_rgba(225,29,72,0.3)]">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-rose-600 text-white uppercase text-sm font-black tracking-widest">
                    <tr>
                      <th className="p-6 border-r border-white/20">Target Institute</th>
                      <th className="p-6">Minimum Expected Cutoff</th>
                    </tr>
                  </thead>
                  <tbody className="text-lg font-bold">
                    {config.topCollegesList.map((clg, idx) => (
                      <tr key={idx} className={`border-b-2 border-foreground/10 hover:bg-rose-50 transition-colors ${idx % 2 !== 0 ? 'bg-slate-50' : ''}`}>
                        <td className="p-6 border-r-2 border-foreground/10 flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          {clg.name}
                        </td>
                        <td className="p-6 text-rose-600 font-black uppercase italic">{clg.cutoff}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Key Features Section */}
          {config.features && config.features.length > 0 && (
            <section id="features" className="mt-16">
              <h2 className="text-4xl font-black uppercase mb-8 flex items-center gap-4">
                <CheckCircle2 className="w-10 h-10 text-rose-600" /> Key Features of This IELTS Mock Test
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {config.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-6 bg-white border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <CheckCircle2 className="w-8 h-8 text-rose-600 shrink-0 mt-1" />
                    <p className="font-bold text-lg">{feature}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Exam Details Section */}
          {config.examDetails && config.examDetails.length > 0 && (
            <section id="details" className="mt-16 space-y-12">
              {config.examDetails.map((detail, idx) => (
                <div key={idx} className="bg-white p-8 md:p-12 border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-3xl font-black uppercase mb-6 flex items-center gap-4">
                    <BookOpen className="w-8 h-8 text-rose-600" />
                    {detail.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-700 font-medium">{detail.content}</p>
                </div>
              ))}
            </section>
          )}

          {/* FAQ Section */}
          {config.faqs && config.faqs.length > 0 && (
            <section id="faq" className="mt-16 border-t-8 border-foreground pt-16">
              <h2 className="text-4xl font-black uppercase mb-8 flex items-center gap-4">
                <HelpCircle className="w-10 h-10 text-rose-600" /> Frequently Asked Questions (IELTS 2026)
              </h2>
              <div className="space-y-6">
                {config.faqs.map((faq, idx) => (
                  <details key={idx} className="group bg-white border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] open:bg-rose-50/50 transition-colors">
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

          {/* Popular Search Phrases */}
          {config.keywords && config.keywords.length > 0 && (
            <section id="popular-searches" className="bg-white border-4 border-foreground p-8 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-3xl font-black uppercase mb-6 flex items-center gap-4">
                <BookOpen className="w-8 h-8 text-rose-600" /> IELTS Academic Practice Queries
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {config.keywords.map((kw, i) => (
                  <div key={i} className="flex items-center gap-3 font-bold text-gray-700 text-sm italic">
                    <span className="text-rose-600 font-black">→</span>
                    <span>{kw}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
}
