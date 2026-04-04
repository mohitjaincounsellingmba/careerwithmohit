import { Metadata } from 'next';
import { GenericMockTestClient } from '@/components/GenericMockTest/GenericMockTestClient';
import { EXAM_CONFIGS, generateMockQuestions } from '@/lib/mock-test-data';
import { Clock, Zap, Target, Award, CheckCircle2, ShieldCheck, BookOpen, HelpCircle, Presentation } from 'lucide-react';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Free JEE Main Mock Test 2026 | Full Length PCM Tool',
  description: 'Boost your percentile with our free full-length JEE Main 2026 mock test. 90 questions, 180 minutes, with detailed performance analytics for Physics, Chemistry, and Maths.',
  keywords: 'JEE Main mock test 2026, free NTA mock test, JEE Main practice tool, B.Tech career counselling, NIT admission 2026, JEE Main Paper 1 online test, JEE Main rank predictor, JEE Main syllabus overview',
  openGraph: {
    title: 'Free JEE Main Mock Test 2026 | Performance & Analytics Tool',
    description: 'Master the JEE Main with our advanced mock test tool. Full-length practice paper with detailed analysis and rank predictor for NIT and IIIT admissions.',
    type: 'website',
  }
};

export default function JeeMainMockTestPage() {
  const config = EXAM_CONFIGS.find(c => c.slug === 'jee-main');
  
  if (!config) {
    notFound();
  }

  const questions = generateMockQuestions(config);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "JEE Main 2026 Mock Test Tool",
    "operatingSystem": "Web",
    "applicationCategory": "EducationalApplication",
    "description": "Comprehensive full-length 90-question mock test for JEE Main 2026. Includes detailed reporting and percentile prediction for NIT and IIIT admission targets.",
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
            JEE Main <span className="text-primary italic">2026</span> Mock Test
          </h1>
          <div className="inline-block bg-accent px-6 py-2 border-4 border-foreground transform -rotate-2">
            <p className="font-bold uppercase tracking-widest text-lg">Full-Length 90 Question Practice Paper</p>
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
              <p className="font-medium text-gray-600">Simulate real-time pressure with our official exam-timed environment.</p>
            </div>
            <div className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all">
              <div className="bg-accent w-12 h-12 flex items-center justify-center border-4 border-foreground mb-6">
                <Zap className="text-foreground w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase mb-4">Instant Analysis</h3>
              <p className="font-medium text-gray-600">Get your score, accuracy, and sectional breakdown the moment you finish.</p>
            </div>
            <div className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all">
              <div className="bg-foreground w-12 h-12 flex items-center justify-center border-4 border-foreground mb-6">
                <Target className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase mb-4">NIT Rank Predictor</h3>
              <p className="font-medium text-gray-600">Achieve a good score to get into NITs, IIITs, and other premier GFTIs.</p>
            </div>
          </div>

          {/* Exam Pattern Table */}
          <section id="pattern">
            <h2 className="text-4xl font-black uppercase mb-12 flex items-center gap-4">
              <Presentation className="w-10 h-10 text-primary" /> JEE Main 2026 Exam Pattern
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
          </section>

          {/* Marks vs Percentile Card */}
          <section id="percentile" className="bg-white border-4 border-foreground p-10 shadow-[12px_12px_0px_0px_rgba(var(--primary-rgb),1)]">
            <div className="flex items-center gap-4 mb-8">
              <Award className="w-10 h-10 text-primary" strokeWidth={3} />
              <h2 className="text-3xl font-black uppercase tracking-tighter">JEE Main Target Score: 99+ Percentile</h2>
            </div>
            <p className="mb-8 text-gray-600 font-medium leading-relaxed">
              Target a score of at least <strong>200+ out of 300</strong> to secure a 99+ percentile. This is our baseline recommendation for candidates aiming for top-tier NITs (Trichy, Surathkal, Warangal) or to qualify for JEE Advanced with a strong buffer.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-50 border-4 border-foreground p-6 transform rotate-1">
                <h4 className="text-xl font-black uppercase mb-2">High ROI Target</h4>
                <p className="font-bold text-gray-600">Goal: 180+ marks for Top 10 NITs.</p>
              </div>
              <div className="bg-accent border-4 border-foreground p-6 transform -rotate-1">
                <h4 className="text-xl font-black uppercase mb-2">Qualification Target</h4>
                <p className="font-bold text-gray-600">Goal: 95-105 marks to qualify for Advanced.</p>
              </div>
            </div>
          </section>

          {/* Syllabus Section */}
          <section id="syllabus">
            <h2 className="text-4xl font-black uppercase mb-12 flex items-center gap-4">
              <BookOpen className="w-10 h-10 text-primary" /> Syllabus Mastery Check
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white border-4 border-foreground p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group hover:-translate-y-2 transition-all">
                <h3 className="text-2xl font-black uppercase mb-4 text-primary">Physics</h3>
                <p className="font-bold text-gray-600 italic leading-relaxed">Focus on Modern Physics, Heat & Thermodynamics, and Mechanics.</p>
              </div>
              <div className="bg-white border-4 border-foreground p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group hover:-translate-y-2 transition-all">
                <h3 className="text-2xl font-black uppercase mb-4 text-secondary">Chemistry</h3>
                <p className="font-bold text-gray-600 italic leading-relaxed">NCERT is king here. Focus on GOC, Chemical Bonding, and Coordination compounds.</p>
              </div>
              <div className="bg-white border-4 border-foreground p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group hover:-translate-y-2 transition-all">
                <h3 className="text-2xl font-black uppercase mb-4 text-accent">Maths</h3>
                <p className="font-bold text-gray-600 italic leading-relaxed">Heavy practice required in Coordinate Geometry, Matrices, and Vectors.</p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section id="faq" className="bg-white border-4 border-foreground p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-black uppercase mb-12 flex items-center gap-4">
              <HelpCircle className="w-10 h-10 text-primary" /> Engineering Aspirant FAQs
            </h2>
            <div className="space-y-10">
              {[
                { q: "Is this JEE Main mock test free?", a: "Yes, it is 100% free and based on the latest NTA exam pattern with full-length PCM coverage." },
                { q: "Does it help in rank prediction?", a: "The tool provides a projection of your performance based on historical NIT cutoffs and marks vs percentile trends." },
                { q: "Can I take this test on mobile?", a: "Yes, our interface is fully responsive, though for a real CBT experience, we recommend using a desktop." }
              ].map((faq, i) => (
                <div key={i} className="border-b-2 border-gray-100 pb-8 last:border-0 border-dashed">
                  <h4 className="text-xl font-bold uppercase mb-4 flex items-start gap-4">
                    <span className="bg-primary text-white text-xs px-2 py-0.5 mt-1 shrink-0">Q</span>
                    {faq.q}
                  </h4>
                  <p className="text-lg text-gray-600 font-medium leading-relaxed italic ml-10">
                    {faq.a}
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
