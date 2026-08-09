import { Metadata } from 'next';
import { GmatCbtMockTestClient } from '@/components/GmatMockTest/GmatCbtMockTestClient';
import { EXAM_CONFIGS } from '@/lib/mock-test-data';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  alternates: {
    canonical: '/tools/gmat-mock-test',
  },
  title: 'Free GMAT Focus Edition Mock Test 2026/27 | ISB & Global MBA Prep (64 Questions)',
  description: 'Take our free full-length 64-question GMAT Focus Edition mock test in 135 minutes. Quantitative (21), Verbal (23), and Data Insights (20). Instant scaled score predictor (205-805) and full step-by-step solutions.',
  keywords: [
    'GMAT Focus Edition mock test 2026', 'gmat focus mock test free', 'free GMAT practice test online', 
    'GMAT quantitative verbal data insights mock', 'GMAT scaled score estimation tool', 
    'ISB and Harvard MBA preparation online', 'GMAT 64 questions practice paper'
  ],
  openGraph: {
    title: 'Free GMAT Focus Edition Mock Test 2026/27 | ISB & Global MBA Prep',
    description: 'Take our free full-length 64-question GMAT Focus Edition mock test with instant scaled score predictions and detailed solutions.',
    type: 'website',
    url: 'https://www.careerwithmohit.online/tools/gmat-mock-test',
    siteName: 'CareerWithMohit',
    images: [{ url: '/og-image.webp', width: 1200, height: 630, alt: 'GMAT Focus Mock Test' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free GMAT Focus Edition Mock Test 2026/27 | Global MBA Prep',
    description: 'Take our free full-length 64-question GMAT Focus Edition mock test.',
    images: ['/og-image.webp'],
  }
};

export default function DedicatedGmatMockTestPage() {
  const config = EXAM_CONFIGS.find(c => c.slug === 'gmat');
  if (!config) notFound();

  return (
    <main className="min-h-screen bg-[#f8fafc] pt-24 pb-20 px-4 sm:px-8 md:px-12">
      <div className="mx-auto max-w-6xl">
        {/* Hero Section */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase mb-4 leading-none tracking-tight">
            Free GMAT <span className="text-indigo-600 italic">Focus Edition</span> Mock Test
          </h1>
          <div className="inline-block bg-[#0f172a] text-indigo-400 px-6 py-2 border-4 border-slate-900 transform -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="font-black uppercase tracking-widest text-base md:text-xl text-white">
              Full-Length 64-Question Official GMAT Focus CBT Mock Test
            </p>
          </div>
        </div>

        {/* Client Interface */}
        <GmatCbtMockTestClient config={config} />
      </div>
    </main>
  );
}
