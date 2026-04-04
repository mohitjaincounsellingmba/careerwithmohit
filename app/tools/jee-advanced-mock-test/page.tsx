import { Metadata } from 'next';
import { GenericMockTestClient } from '@/components/GenericMockTest/GenericMockTestClient';
import { EXAM_CONFIGS, generateMockQuestions } from '@/lib/mock-test-data';
import { CheckCircle2, BookOpen, Target, Zap, Clock, HelpCircle, BarChart3, Presentation, Award, ShieldCheck } from 'lucide-react';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Free IIT JEE Advanced Mock Test 2026 | Paper 1 & 2 Full Length Tool',
  description: 'Practice for the toughest exam in India with our free full-length IIT JEE Advanced 2026 mock test. Experience multi-correct, integer, and matrix-match questions with real-time analysis.',
  keywords: 'JEE Advanced mock test 2026, free IIT JEE mock test, JEE Advanced Paper 1 online test, B.Tech career guidance, IIT Roorkee exam pattern, JEE Advanced syllabus Class 12, rank predictor JEE Advanced',
  openGraph: {
    title: 'Free IIT JEE Advanced Mock Test 2026 | Simulation & Analytics',
    description: 'Master the JEE Advanced with our advanced CBT mock test interface. Detailed solutions, rank predictor, and syllabus-wise breakdown for Physics, Chemistry, and Mathematics.',
    type: 'website',
  }
};

export default function JeeAdvancedMockTestPage() {
  const config = EXAM_CONFIGS.find(c => c.slug === 'jee-advanced');
  
  if (!config) {
    notFound();
  }

  const questions = generateMockQuestions(config);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "IIT JEE Advanced 2026 Mock Test Tool",
    "operatingSystem": "Web",
    "applicationCategory": "EducationalApplication",
    "description": "Full-length 54-question mock test for IIT JEE Advanced 2026. Features include multi-correct, integer-type questions, and a detailed rank predictor.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": config.faqs?.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    })) || []
  };

  return (
    <main className="min-h-screen bg-[#f0f0f0] pt-24 pb-20 px-6 sm:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      
      <div className="mx-auto max-w-5xl">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-7xl font-black uppercase mb-4 leading-none">
            JEE Advanced <span className="text-primary italic">2026</span> Mock Test
          </h1>
          <div className="inline-block bg-accent px-6 py-2 border-4 border-foreground transform -rotate-2">
            <p className="font-bold uppercase tracking-widest text-lg">Full-Length 54 Question Paper Simulation</p>
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
              <p className="font-medium text-gray-600">Strict 3-hour timer to simulate the intense Paper 1 environment of the real IIT exam.</p>
            </div>
            <div className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all">
              <div className="bg-accent w-12 h-12 flex items-center justify-center border-4 border-foreground mb-6">
                <Zap className="text-foreground w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase mb-4">Advanced Analytics</h3>
              <p className="font-medium text-gray-600">Immediate rank prediction based on your accuracy in complex multi-select sections.</p>
            </div>
            <div className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all">
              <div className="bg-foreground w-12 h-12 flex items-center justify-center border-4 border-foreground mb-6">
                <Target className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase mb-4">IIT Rank Predictor</h3>
              <p className="font-medium text-gray-600">Benchmark your 180-mark score against the historical cutoff of top 23 IITs.</p>
            </div>
          </div>

          {/* Marks vs Rank Table */}
          <section id="rank" className="bg-white border-4 border-foreground p-10 shadow-[12px_12px_0px_0px_rgba(var(--primary-rgb),1)]">
            <div className="flex items-center gap-4 mb-8">
              <Award className="w-10 h-10 text-primary" strokeWidth={3} />
              <h2 className="text-3xl font-black uppercase tracking-tighter">JEE Advanced: Expected Rank vs Marks</h2>
            </div>
            <p className="mb-8 text-gray-600 font-medium leading-relaxed">
              Based on historical data from the organizing IITs (IIT Delhi, IIT Madras, IIT Roorkee), here are the projected marks required (out of roughly 180 for Paper 1) to land a specific CRL rank.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { marks: '140+', rank: 'All India Rank < 500' },
                { marks: '120+', rank: 'All India Rank < 2000' },
                { marks: '100+', rank: 'All India Rank < 5000' },
                { marks: '85+', rank: 'All India Rank < 10000' },
                { marks: '75+', rank: 'All India Rank < 15000' },
                { marks: '65+', rank: 'IIT Cutoff Qualified' },
                { marks: '55+', rank: 'Attempt Improvement' },
                { marks: '45+', rank: 'Conceptual Focus' }
              ].map((item, i) => (
                <div key={i} className="border-4 border-foreground bg-slate-50 p-6 flex flex-col items-center justify-center text-center group hover:bg-foreground transition-all">
                  <p className="text-3xl font-black group-hover:text-white transition-colors">{item.marks}</p>
                  <p className="text-xs font-bold text-primary mt-2 uppercase tracking-widest">{item.rank}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pattern Details */}
          <section id="pattern">
            <h2 className="text-4xl font-black uppercase mb-12 flex items-center gap-4">
              <Presentation className="w-10 h-10 text-primary" /> Examination Pattern Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-white border-4 border-foreground p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-2xl font-black uppercase mb-6 flex items-center gap-3">
                  <ShieldCheck className="text-secondary w-6 h-6" /> Paper 1 Structure
                </h3>
                <ul className="space-y-4 font-bold text-gray-700">
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-primary w-5 h-5 shrink-0" /> Physics: 18 High-Difficulty Questions</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-primary w-5 h-5 shrink-0" /> Chemistry: 18 Conceptual Questions</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-primary w-5 h-5 shrink-0" /> Mathematics: 18 Analytical Questions</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-primary w-5 h-5 shrink-0" /> Total Duration: 180 Minutes (3 Hours)</li>
                </ul>
              </div>
              <div className="bg-foreground text-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(var(--primary-rgb),1)]">
                <h3 className="text-2xl font-black uppercase mb-6 flex items-center gap-3 text-primary">
                  Complex Marking Scheme
                </h3>
                <p className="mb-4 text-gray-300 font-medium">JEE Advanced is famous for its "Zero-Mark" and "Partial Mark" criteria:</p>
                <div className="space-y-3">
                  <div className="bg-white/10 p-4 border-l-4 border-primary">
                    <p className="font-black text-sm">Multiple Correct: +4 (All Correct), +1 (Each Partial)</p>
                  </div>
                  <div className="bg-white/10 p-4 border-l-4 border-secondary">
                    <p className="font-black text-sm text-secondary uppercase">Negative Marking: -1 or -2 (Varies)</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Syllabus Section */}
          <section id="syllabus">
            <h2 className="text-4xl font-black uppercase mb-12 flex items-center gap-4">
              <BookOpen className="w-10 h-10 text-primary" /> Core Syllabus Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group">
                <div className="bg-white border-4 border-foreground p-6 h-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:bg-blue-50 transition-colors">
                  <h4 className="text-xl font-black uppercase mb-4 border-b-4 border-primary pb-2">Physics</h4>
                  <p className="text-sm font-bold text-gray-600 leading-relaxed italic">
                    Focus on Mechanics, Thermal Physics, Electricity and Magnetism, Optics, and Modern Physics. Experimental measurements and error analysis are highly tested.
                  </p>
                </div>
              </div>
              <div className="group">
                <div className="bg-white border-4 border-foreground p-6 h-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:bg-emerald-50 transition-colors">
                  <h4 className="text-xl font-black uppercase mb-4 border-b-4 border-secondary pb-2">Chemistry</h4>
                  <p className="text-sm font-bold text-gray-600 leading-relaxed italic">
                    Physical Chemistry (Thermodynamics, Kinetics), Inorganic (P-block, Coordination compounds), and Organic Chemistry (GOC, Carbonyls) are the backbone of this section.
                  </p>
                </div>
              </div>
              <div className="group">
                <div className="bg-white border-4 border-foreground p-6 h-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:bg-amber-50 transition-colors">
                  <h4 className="text-xl font-black uppercase mb-4 border-b-4 border-accent pb-2">Mathematics</h4>
                  <p className="text-sm font-bold text-gray-600 leading-relaxed italic">
                    Algebra (Complex Numbers, Matrices), Trigonometry, Analytical Geometry (3D), Calculus (Integrals), and Vectors require heavy practice.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs Section */}
          <section id="faq" className="bg-white border-4 border-foreground p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-black uppercase mb-12 flex items-center gap-4">
              <HelpCircle className="w-10 h-10 text-primary" /> IIT Candidate Consultation
            </h2>
            <div className="space-y-10">
              {config.faqs?.map((faq, i) => (
                <div key={i} className="border-b-2 border-gray-100 pb-8 last:border-0">
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
