import { Metadata } from 'next';
import { XatCbtMockTestClient } from '@/components/XatMockTest/XatCbtMockTestClient';
import { EXAM_CONFIGS } from '@/lib/mock-test-data';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  alternates: {
    canonical: '/tools/xat-mock-test',
  },
  title: 'Free XAT Mock Test 2026/27 | XLRI Decision Making, VALR, QADI & GK Practice (95 Questions)',
  description: 'Take our free full-length 95-question XAT 2026/27 mock test with 5-choice options, Decision Making caselets, VALR, QA & DI, and GK. Instant XLRI cutoff prediction and full solutions.',
  keywords: [
    'XAT mock test 2026', 'XLRI Jamshedpur decision making practice', 'free XAT online test series', 
    'XAT verbal logical quantitative aptitude', 'XAT exam pattern with solutions', 'XAT score vs percentile predictor',
    'XAT 95 questions mock test', 'XAT CBT mock test online'
  ],
  openGraph: {
    title: 'Free XAT Mock Test 2026/27 | XLRI Jamshedpur Prep',
    description: 'Take our free full-length 95-question XAT mock test with 5-choice options and Decision Making caselets.',
    type: 'website',
    url: 'https://www.careerwithmohit.online/tools/xat-mock-test',
    siteName: 'CareerWithMohit',
    images: [{ url: '/og-image.webp', width: 1200, height: 630, alt: 'XAT Mock Test' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free XAT Mock Test 2026/27 | XLRI Prep',
    description: 'Take our free full-length 95-question XAT mock test with 5-choice options.',
    images: ['/og-image.webp'],
  }
};

export default function DedicatedXatMockTestPage() {
  const config = EXAM_CONFIGS.find(c => c.slug === 'xat');
  if (!config) notFound();

  return (
    <main className="min-h-screen bg-[#f0f0f0] pt-24 pb-20 px-4 sm:px-8 md:px-12">
      <div className="mx-auto max-w-6xl">
        {/* Hero Section */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase mb-4 leading-none tracking-tight">
            Free XAT <span className="text-emerald-700 italic">2026/27</span> Mock Test
          </h1>
          <div className="inline-block bg-[#0f291e] text-emerald-400 px-6 py-2 border-4 border-slate-900 transform -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="font-black uppercase tracking-widest text-base md:text-xl">
              Full-Length 95-Question Official XAT CBT Mock Test
            </p>
          </div>
        </div>

        {/* Client Interface */}
        <XatCbtMockTestClient config={config} />
      </div>
    </main>
  );
}
