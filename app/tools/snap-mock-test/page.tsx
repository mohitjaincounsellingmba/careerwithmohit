import { Metadata } from 'next';
import { SnapCbtMockTestClient } from '@/components/SnapMockTest/SnapCbtMockTestClient';
import { EXAM_CONFIGS } from '@/lib/mock-test-data';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.careerwithmohit.online/tools/snap-mock-test',
  },
  title: 'Free SNAP Mock Test 2026/27 | SIBM Pune & Symbiosis Speed Test (60 Questions)',
  description: 'Take our free full-length 60-question SNAP mock test in 60 minutes. General English (15), Quant & DI (20), Logical Reasoning (25). Instant SIBM Pune call predictor and step-by-step solutions.',
  keywords: [
    'SNAP mock test 2026', 'SIBM Pune SCMHRD mock test free', 'SNAP December exam practice paper', 
    'SNAP general English logic quantitative mock', 'SNAP score to percentile calculator',
    'SNAP 60 questions speed test'
  ],
  openGraph: {
    title: 'Free SNAP Mock Test 2026/27 | SIBM Pune & SCMHRD Prep | CareerWithMohit',
    description: 'Take our free full-length 60-question SNAP speed test with instant scorecards and detailed solutions.',
    type: 'website',
    url: 'https://www.careerwithmohit.online/tools/snap-mock-test',
    siteName: 'CareerWithMohit',
    images: [{ url: '/og-image.webp', width: 1200, height: 630, alt: 'SNAP Mock Test' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free SNAP Mock Test 2026/27 | Symbiosis Prep',
    description: 'Take our free full-length 60-question SNAP mock test in 60 minutes.',
    images: ['/og-image.webp'],
  }
};

export default function DedicatedSnapMockTestPage() {
  const config = EXAM_CONFIGS.find(c => c.slug === 'snap');
  if (!config) notFound();

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "SNAP 2026-2027 Speed Mock Test Tool",
    "url": "https://www.careerwithmohit.online/tools/snap-mock-test",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "description": "Full-length 60-question 60-minute SNAP CBT mock test with SIBM Pune and SCMHRD percentile analytics."
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.careerwithmohit.online",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Mock Tests",
        "item": "https://www.careerwithmohit.online/mock-tests",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "SNAP Mock Test",
        "item": "https://www.careerwithmohit.online/tools/snap-mock-test",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#f0f0f0] pt-24 pb-20 px-4 sm:px-8 md:px-12">
      <JsonLd data={softwareSchema} />
      <JsonLd data={breadcrumbSchema} />
      <div className="mx-auto max-w-6xl">
        {/* Hero Section */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase mb-4 leading-none tracking-tight">
            Free SNAP <span className="text-purple-700 italic">2026/27</span> Mock Test
          </h1>
          <div className="inline-block bg-[#2e1065] text-purple-300 px-6 py-2 border-4 border-slate-900 transform -rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="font-black uppercase tracking-widest text-base md:text-xl text-white">
              Full-Length 60-Question Official SNAP CBT Mock Test
            </p>
          </div>
        </div>

        {/* Client Interface */}
        <SnapCbtMockTestClient config={config} />
      </div>
    </main>
  );
}
