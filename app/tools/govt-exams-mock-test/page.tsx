import { Metadata } from 'next';
import { EXAM_CONFIGS } from '@/lib/mock-test-data';
import { GovtExamHubClient } from '@/components/GovtExamHub/GovtExamHubClient';
import { ShieldCheck, Trophy, Target, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'All Govt Exam Mock Tests - 30+ Sets for Each Exam',
  description: 'Practice free online mock tests for SSC, Banking, Railways, UPSC, and State Exams. Access 30 different question papers for every government body.',
};

export default function GovtExamHubPage() {
  const governmentExams = EXAM_CONFIGS.filter(exam => 
    ['ssc', 'ibps', 'sbi', 'rrb', 'upsc', 'ctet', 'rbi', 'nda', 'cuet', 'lic', 'nabard', 'cds', 'afcat', 'reet', 'rpsc', 'uppsc', 'bpsc', 'upsssc', 'dsssb'].some(prefix => exam.slug.startsWith(prefix))
  );

  return (
    <main className="min-h-screen bg-[#f8f9fa] pt-24 pb-20 px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black uppercase mb-6 tracking-tight text-foreground">
            Govt Exam <span className="text-primary italic">Mock Test</span> Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
            Access over 30 sets of unique practice papers for every major government recruitment exam in India.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: ShieldCheck, title: 'Official Patterns', desc: 'Updated 2026 patterns', color: 'bg-blue-500' },
            { icon: Trophy, title: '30 Full Sets', desc: 'Per exam category', color: 'bg-yellow-500' },
            { icon: Target, title: 'Instant Score', desc: 'Detailed analytics', color: 'bg-green-500' },
            { icon: Globe, title: 'All India Rank', desc: 'Benchmark preparation', color: 'bg-purple-500' },
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4">
              <div className={`${item.color} p-3 border-2 border-foreground rounded-lg`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg uppercase leading-tight">{item.title}</h3>
                <p className="text-sm text-gray-500 font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Client Selection Form */}
        <GovtExamHubClient exams={governmentExams} />

        {/* Content Section for SEO */}
        <div className="mt-24 space-y-16 max-w-4xl mx-auto">
          <section className="bg-white p-8 border-4 border-foreground shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-black uppercase mb-6">Why Practice with CareerWithMohit?</h2>
            <p className="text-lg text-gray-700 leading-relaxed font-medium mb-4">
              Government exams like SSC CGL, IBPS PO, and UPSC CSE are becoming increasingly competitive. Speed and accuracy are the two pillars of success. Our custom-built mock test platform provides a real-time exam simulation that helps you:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Master time management skills',
                'Identify your sectional weak points',
                'Experience actual exam day pressure',
                'Get detailed solutions for every question'
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-3 font-bold text-gray-600">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  {text}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-black uppercase mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: 'Are these mock tests free?', a: 'Yes, all 30 sets for every government exam on this platform are completely free for aspirants.' },
                { q: 'Is the pattern updated for 2026?', a: 'Absolutely. We constantly monitor exam notifications to ensure our mock tests reflect the latest syllabus and marking schemes.' },
                { q: 'Can I re-take a test?', a: 'Yes, you can re-take any test multiple times to improve your score and speed.' }
              ].map((faq, i) => (
                <div key={i} className="bg-white p-6 border-2 border-foreground">
                  <h4 className="font-black uppercase text-secondary mb-2">{faq.q}</h4>
                  <p className="text-gray-600 font-medium">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
