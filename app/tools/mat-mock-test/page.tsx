import { Metadata } from 'next';
import { MatCbtMockTestClient } from '@/components/MatMockTest/MatCbtMockTestClient';
import { EXAM_CONFIGS } from '@/lib/mock-test-data';
import { Clock, Target, Zap, Presentation, CheckCircle2, HelpCircle, BookOpen, Calendar } from 'lucide-react';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Free MAT Mock Test 2026/27 | Sept, Dec, Feb & May MAT CBT Practice',
  description: 'Take our free full-length MAT 2026/2027 mock test for Sept MAT, Dec MAT, Feb MAT, and May MAT. 150 questions, 120 minutes with Language, Intelligence, Data Analysis, Math, and Indian & Global Environment with instant scaled composite score (out of 800) and step-by-step solutions.',
  keywords: [
    'MAT mock test 2026', 'Sept MAT mock test', 'Dec MAT mock test', 'Feb MAT mock test', 'May MAT mock test',
    'free MAT test series online', 'MAT score vs percentile calculator', 'MAT composite score 800',
    'PUMBA MAT cutoff', 'Welingkar MAT cutoff', 'BIMTECH MAT cutoff'
  ],
  alternates: {
    canonical: '/tools/mat-mock-test',
  },
  openGraph: {
    title: 'Free MAT Mock Test 2026/27 | Sept, Dec, Feb & May MAT CBT Practice',
    description: '150 Questions, 120 Minutes, 5 Timed Sections with Composite Score Predictor out of 800 and Detailed Step-by-Step Solutions.',
    type: 'website',
    url: 'https://www.careerwithmohit.online/tools/mat-mock-test',
    siteName: 'CareerWithMohit',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'MAT Mock Test Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free MAT Mock Test 2026/27 | Sept, Dec, Feb & May MAT CBT Practice',
    description: '150 Questions, 120 Minutes, 5 Sections with Composite Score Predictor out of 800 and Detailed Step-by-Step Solutions.',
    images: ['/og-image.webp'],
  }
};

export default function MatMockTestToolPage() {
  const config = EXAM_CONFIGS.find(c => c.slug === 'mat');
  
  if (!config) {
    notFound();
  }

  const jsonLd: any = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "MAT Exam Mock Test Tool (Sept, Dec, Feb, May MAT)",
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
            "name": "MAT Mock Test",
            "item": "https://www.careerwithmohit.online/tools/mat-mock-test"
          }
        ]
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
          <h1 className="text-5xl md:text-7xl font-black uppercase mb-4 leading-none">
            MAT 2026/27 <span className="text-primary italic">Exam</span> Mock Test
          </h1>
          <div className="inline-block bg-accent px-6 py-2 border-4 border-foreground transform -rotate-2">
            <p className="font-bold uppercase tracking-widest text-lg">Full-Length 150 Question CBT Practice (Sept, Dec, Feb & May MAT)</p>
          </div>
        </div>

        {/* Client Interface */}
        <MatCbtMockTestClient config={config} />

        {/* SEO CONTENT SECTION */}
        <div className="mt-24 space-y-24">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all">
              <div className="bg-primary w-12 h-12 flex items-center justify-center border-4 border-foreground mb-6">
                <Clock className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase mb-4">120 Minutes</h3>
              <p className="font-medium text-gray-600">Master pace and question selection across all 5 sections with our official 120-minute CBT countdown clock.</p>
            </div>
            <div className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all">
              <div className="bg-accent w-12 h-12 flex items-center justify-center border-4 border-foreground mb-6">
                <Zap className="text-foreground w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase mb-4">Composite Score /800</h3>
              <p className="font-medium text-gray-600">Get your estimated AIMA scaled composite score (out of 800) and percentile instantly upon submission.</p>
            </div>
            <div className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all">
              <div className="bg-foreground w-12 h-12 flex items-center justify-center border-4 border-foreground mb-6">
                <Target className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase mb-4">500+ Top B-Schools</h3>
              <p className="font-medium text-gray-600">Discover admission eligibility for PUMBA, Welingkar, BIMTECH, XIME, JIMS, and Jaipuria.</p>
            </div>
          </div>

          {/* Exam Pattern & Syllabus Table */}
          <section id="pattern">
            <h2 className="text-4xl font-black uppercase mb-12 flex items-center gap-4">
              <Presentation className="w-10 h-10 text-primary" /> MAT 2026/27 Exam Pattern
            </h2>
            <div className="overflow-x-auto border-4 border-foreground bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <table className="w-full text-left border-collapse">
                <thead className="bg-foreground text-white uppercase text-sm font-black tracking-widest">
                  <tr>
                    <th className="p-6 border-r border-white/20">Section</th>
                    <th className="p-6">Questions</th>
                  </tr>
                </thead>
                <tbody className="text-xl font-bold">
                  {config.sections.map((section, idx) => (
                    <tr key={section.id} className={`border-b-4 border-foreground hover:bg-gray-50 transition-colors ${idx % 2 !== 0 ? 'bg-slate-50' : ''}`}>
                      <td className="p-6 border-r-4 border-foreground">{section.label}</td>
                      <td className="p-6 text-center">{section.questionCount}</td>
                    </tr>
                  ))}
                  <tr className="bg-primary text-white uppercase font-black tracking-widest text-2xl">
                    <td className="p-8 border-r-4 border-white/20">Total</td>
                    <td className="p-8 text-center">{config.totalQuestions}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-6 font-bold text-gray-500 italic">** Note: Marking scheme: +1.00 for correct answer, −0.25 penalty for incorrect answer. 0 for unattempted.</p>
          </section>

          {/* Top Colleges & Cutoffs Section */}
          {config.topCollegesList && config.topCollegesList.length > 0 && (
            <section id="colleges">
              <h2 className="text-4xl font-black uppercase mb-12 flex items-center gap-4 text-foreground">
                <Target className="w-10 h-10 text-primary" /> Top Colleges & Expected Cutoffs
              </h2>
              <div className="overflow-x-auto border-4 border-foreground bg-white shadow-[12px_12px_0px_0px_rgba(var(--primary-rgb),0.3)]">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-primary text-white uppercase text-sm font-black tracking-widest">
                    <tr>
                      <th className="p-6 border-r border-white/20">College Name</th>
                      <th className="p-6">Expected Cutoff</th>
                    </tr>
                  </thead>
                  <tbody className="text-xl font-bold">
                    {config.topCollegesList.map((college, idx) => (
                      <tr key={college.name} className={`border-b-4 border-foreground hover:bg-gray-50 transition-colors ${idx % 2 !== 0 ? 'bg-slate-50' : ''}`}>
                        <td className="p-6 border-r-4 border-foreground">{college.name}</td>
                        <td className="p-6 text-center text-primary font-black">{college.cutoff}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Features Section */}
          {config.features && config.features.length > 0 && (
            <section id="features">
              <h2 className="text-4xl font-black uppercase mb-12 flex items-center gap-4">
                <CheckCircle2 className="w-10 h-10 text-accent" /> Why Practice on CareerWithMohit?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {config.features.map((feature, idx) => (
                  <div key={idx} className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-start gap-4">
                    <div className="bg-primary/10 p-3 border-2 border-foreground mt-1">
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold uppercase mb-2">{feature}</h3>
                      <p className="font-medium text-gray-600">Simulate exam pressure, evaluate your performance, and gain an unfair advantage in your MBA admissions.</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FAQs Section */}
          {config.faqs && config.faqs.length > 0 && (
            <section id="faqs">
              <h2 className="text-4xl font-black uppercase mb-12 flex items-center gap-4">
                <HelpCircle className="w-10 h-10 text-primary" /> Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {config.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="text-2xl font-black uppercase mb-4 text-foreground flex items-center gap-3">
                      <span className="text-primary font-black">Q.</span> {faq.question}
                    </h3>
                    <p className="font-medium text-gray-700 text-lg leading-relaxed">{faq.answer}</p>
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
