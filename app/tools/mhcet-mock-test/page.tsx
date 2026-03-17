import { Metadata } from 'next';
import { MhcetMockTestClient } from '@/components/MockTest/MhcetMockTestClient';
import { CheckCircle2, BookOpen, Target, Zap, Clock, HelpCircle, BarChart3, Presentation } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free MAH MBA CET Mock Test 2026 | Full 200 Questions & Percentile Predictor',
  description: 'Take a full-length MAH MBA CET 2026 mock test online. 200 questions, 150 minutes, sectional breakdown, and percentile predictor. 100% free with solutions and expert analysis.',
  keywords: 'MAH MBA CET mock test 2026, free MHCET MBA mock test, MBA CET practice test, MHCET score vs percentile, MAH CET test series, MBA entrance exam preparation',
  openGraph: {
    title: 'Free MAH MBA CET Mock Test 2026',
    description: 'Master the MAH MBA CET with our full-length 200-question mock test. Real exam experience with instant results.',
    type: 'website',
  }
};

export default function MhcetMockTestPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "MAH MBA CET Mock Test Tool",
    "operatingSystem": "Web",
    "applicationCategory": "EducationalApplication",
    "description": "A comprehensive 200-question mock test for MAH MBA CET 2026 with sectional navigation and percentile prediction.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is this MAH MBA CET mock test free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our MAH MBA CET mock test is 100% free and includes a full length 200-question paper along with sectional analysis."
        }
      },
      {
        "@type": "Question",
        "name": "What is the pattern of MAH MBA CET 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The exam consists of 200 questions to be solved in 150 minutes. It has four sections: Logical Reasoning (75), Abstract Reasoning (25), Quantitative Aptitude (50), and Verbal Ability (50)."
        }
      },
      {
        "@type": "Question",
        "name": "Does this mock test provide a percentile predictor?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, after completing the test, you will receive a projected percentile based on your score to help you understand your ranking relative to the previous year's cutoffs."
        }
      }
    ]
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
            MAH MBA CET <span className="text-primary italic">2026</span> Mock Test
          </h1>
          <div className="inline-block bg-accent px-6 py-2 border-4 border-foreground transform -rotate-2">
            <p className="font-bold uppercase tracking-widest text-lg">Full-Length 200 Question Practice Paper</p>
          </div>
        </div>

        {/* Client Interface */}
        <MhcetMockTestClient />

        {/* SEO CONTENT SECTION */}
        <div className="mt-24 space-y-24">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all">
              <div className="bg-primary w-12 h-12 flex items-center justify-center border-4 border-foreground mb-6">
                <Clock className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase mb-4">150 Minutes</h3>
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
              <h3 className="text-xl font-black uppercase mb-4">Percentile Predictor</h3>
              <p className="font-medium text-gray-600">Know where you stand with our algorithm tuned to historical CET cutoffs.</p>
            </div>
          </div>

          {/* Exam Pattern & Syllabus Table */}
          <section id="pattern">
            <h2 className="text-4xl font-black uppercase mb-12 flex items-center gap-4">
              <Presentation className="w-10 h-10 text-primary" /> MAH MBA CET 2026 Exam Pattern
            </h2>
            <div className="overflow-x-auto border-4 border-foreground bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <table className="w-full text-left border-collapse">
                <thead className="bg-foreground text-white uppercase text-sm font-black tracking-widest">
                  <tr>
                    <th className="p-6 border-r border-white/20">Section</th>
                    <th className="p-6 border-r border-white/20">Questions</th>
                    <th className="p-6">Marks</th>
                  </tr>
                </thead>
                <tbody className="text-xl font-bold">
                  <tr className="border-b-4 border-foreground hover:bg-gray-50 transition-colors">
                    <td className="p-6 border-r-4 border-foreground">Logical Reasoning</td>
                    <td className="p-6 border-r-4 border-foreground text-center">75</td>
                    <td className="p-6 text-center">75</td>
                  </tr>
                  <tr className="border-b-4 border-foreground bg-slate-50 hover:bg-gray-50 transition-colors">
                    <td className="p-6 border-r-4 border-foreground">Abstract Reasoning</td>
                    <td className="p-6 border-r-4 border-foreground text-center">25</td>
                    <td className="p-6 text-center">25</td>
                  </tr>
                  <tr className="border-b-4 border-foreground hover:bg-gray-50 transition-colors">
                    <td className="p-6 border-r-4 border-foreground">Quantitative Aptitude</td>
                    <td className="p-6 border-r-4 border-foreground text-center">50</td>
                    <td className="p-6 text-center">50</td>
                  </tr>
                  <tr className="border-b-4 border-foreground bg-slate-50 hover:bg-gray-50 transition-colors">
                    <td className="p-6 border-r-4 border-foreground">Verbal Ability / Reading Comprehension</td>
                    <td className="p-6 border-r-4 border-foreground text-center">50</td>
                    <td className="p-6 text-center">50</td>
                  </tr>
                  <tr className="bg-primary text-white uppercase font-black tracking-widest text-2xl">
                    <td className="p-8 border-r-4 border-white/20">Total</td>
                    <td className="p-8 border-r-4 border-white/20 text-center">200</td>
                    <td className="p-8 text-center">200</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-6 font-bold text-gray-500 italic">** Note: There is no negative marking in MAH MBA CET.</p>
          </section>

          {/* Marks vs Percentile Table */}
          <section id="percentile" className="bg-white border-4 border-foreground p-10 shadow-[12px_12px_0px_0px_rgba(var(--primary-rgb),1)]">
            <h2 className="text-3xl font-black uppercase mb-8 flex items-center gap-4">
              <BarChart3 className="w-8 h-8 text-primary" /> MAH MBA CET 2026: Marks vs Percentile (Projected)
            </h2>
            <p className="mb-8 text-gray-600 font-medium leading-relaxed">
              Based on previous year trends of JBIMS (99.99 percentile), SIMSREE, and PUMBA, here are the expected scores required to reach specific percentiles. Use this table to set your targets while attempting our mock tests.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { m: '145+', p: '99.99+' },
                { m: '135+', p: '99.90+' },
                { m: '125+', p: '99.50+' },
                { m: '115+', p: '99.00+' },
                { m: '105+', p: '98.00+' },
                { m: '95+', p: '95.00+' },
                { m: '85+', p: '90.00+' },
                { m: '75+', p: '80.00+' }
              ].map((item, i) => (
                <div key={i} className="border-4 border-foreground p-4 text-center group hover:bg-foreground transition-all">
                  <p className="text-sm font-black text-gray-400 uppercase tracking-tighter group-hover:text-primary transition-colors">Marks</p>
                  <p className="text-2xl font-black group-hover:text-white transition-colors">{item.m}</p>
                  <div className="h-1 bg-gray-100 my-2 group-hover:bg-primary/20" />
                  <p className="text-sm font-bold text-primary">{item.p} %ile</p>
                </div>
              ))}
            </div>
          </section>

          {/* Sectional Tips */}
          <section id="tips">
            <h2 className="text-3xl font-black uppercase mb-12 flex items-center gap-4">
              <BookOpen className="w-8 h-8 text-primary" /> Section-wise Preparation Tips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { 
                  title: 'Logical Reasoning', 
                  content: 'LR is the highest weightage section (37.5%). Focus on Puzzles, Seating Arrangement, and Critical Reasoning. Speed is key here; goal for 75 questions in 60 minutes.',
                  icon: <Zap className="w-6 h-6" />
                },
                { 
                  title: 'Verbal Ability / RC', 
                  content: 'RC passages can be lengthy. Practice speed reading and improve vocabulary for Synonyms/Antonyms. Error detection and Sentence Completion are scoring areas.',
                  icon: <CheckCircle2 className="w-6 h-6" />
                },
                { 
                  title: 'Quantitative Aptitude', 
                  content: 'Focus on Arithmetic (Percentages, Profit & Loss, Ratio) as it dominates the section. Data Interpretation (DI) charts usually come in sets and are high-yield.',
                  icon: <BarChart3 className="w-6 h-6" />
                },
                { 
                  title: 'Abstract Reasoning', 
                  content: 'Known as "Visual Reasoning". It tests your pattern recognition. Practice Series, Analogy, and Odd One Out. This is generally the fastest section to solve.',
                  icon: <Clock className="w-6 h-6" />
                }
              ].map((tip, i) => (
                <div key={i} className="bg-white border-4 border-foreground p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative group">
                  <div className="absolute -top-4 -left-4 bg-primary text-white p-3 border-4 border-foreground group-hover:-rotate-6 transition-all">
                    {tip.icon}
                  </div>
                  <h4 className="text-xl font-black uppercase mb-4 mt-2">{tip.title}</h4>
                  <p className="font-medium text-gray-600 leading-relaxed">{tip.content}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faqs" className="bg-accent border-4 border-foreground p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-black uppercase mb-12 flex items-center gap-4">
              <HelpCircle className="w-8 h-8 text-foreground" /> Frequently Asked Questions
            </h2>
            <div className="space-y-8">
              {[
                { 
                  q: "What is the level of difficulty for MAH MBA CET 2026?", 
                  a: "The level of difficulty is generally moderate. However, the 'Abstract Reasoning' and 'Logical Reasoning' sections often have some high-difficulty puzzles. Speed is the real challenge, as you have only 45 seconds per question." 
                },
                { 
                  q: "Is there any negative marking in MHCET?", 
                  a: "No, there is no negative marking for incorrect answers in the MAH MBA CET exam. Aspirants are encouraged to attempt all 200 questions." 
                },
                { 
                  q: "Which colleges can I get with a 99 percentile?", 
                  a: "With a 99 percentile, you are eligible for top institutes like SIMSREE (Mumbai), PUMBA (Pune), and Xavier Institute of Management & Research (XIMR)." 
                },
                { 
                  q: "How many mock tests should I take for a 99.9 percentile?", 
                  a: "For a 99.9+ percentile (JBIMS target), it is recommended to take at least 25-30 full-length quality mock tests and analyze them thoroughly to build speed and accuracy." 
                },
                { 
                  q: "Does this mock test simulate the real exam pattern?", 
                  a: "Yes, our mock test strictly follows the official 200-question pattern with sectional progression (Logical, Abstract, Quant, and Verbal sections)." 
                }
              ].map((faq, i) => (
                <div key={i} className="border-b-4 border-foreground/10 pb-6 last:border-0 last:pb-0">
                  <h4 className="text-lg font-black uppercase mb-3 flex items-start gap-4">
                    <span className="bg-foreground text-white px-2 py-0.5 text-sm shrink-0 mt-1">Q</span>
                    {faq.q}
                  </h4>
                  <p className="font-medium text-gray-700 leading-relaxed ml-10 italic">
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

