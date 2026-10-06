import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { SkillAssessmentApp } from '@/components/SkillAssessmentApp';

export const metadata: Metadata = {
  title: 'MBA & PGDM Specialization Skill Assessment & Certification 2026-2027 | CareerWithMohit',
  description: 'Attempt certified skill assessments for MBA & PGDM students across 10 specializations: Human Resource, Finance, Marketing, Digital Marketing, Operations & Logistics, FinTech, Agri Business, Healthcare, Pharma, and Business Analytics. Negative marking (+1.0 / -0.33), 25 minutes, instant verified certificate signed by Mohit Jain.',
  keywords: [
    'mba skill assessment certificate',
    'pgdm certification exam',
    'mba hr certification test',
    'mba finance valuation test',
    'mba marketing brand assessment',
    'digital marketing certification for mba',
    'operations logistics supply chain certificate',
    'fintech certification for mba pgdm',
    'agri business management test certificate',
    'healthcare hospital management certification',
    'pharma management certification exam',
    'business analytics certification for mba',
    'careerwithmohit mba certifications'
  ],
  alternates: {
    canonical: 'https://careerwithmohit.online/skill-assessment-certificate/',
  },
  openGraph: {
    title: 'MBA & PGDM Specialization Skill Assessment & Certificate 2026–2027 | CareerWithMohit',
    description: 'Verify your MBA competence across 10 high-growth specializations: HR, Finance, Marketing, Digital Marketing, Operations & Logistics, FinTech, Agri-Business, Healthcare, Pharma, and Business Analytics. Negative marking, 25 minutes, instant verifiable digital certificate.',
    url: 'https://careerwithmohit.online/skill-assessment-certificate',
    siteName: 'CareerWithMohit',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'CareerWithMohit MBA & PGDM Specialization Skill Assessment Engine',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MBA & PGDM Specialization Skill Assessment & Certificate 2026-2027 | CareerWithMohit',
    description: 'Attempt industry-standard timed MBA specializations skill tests (+1.0/-0.33 negative marking) and download your accredited certificate of excellence.',
    images: ['/og-image.webp'],
  },
};

export default function SkillAssessmentCertificatePage() {
  const assessmentSchema = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: 'MBA & PGDM Specialization Skill Assessment & Accreditation Engine',
    description: 'Interactive competency assessments across 10 core, emerging tech, and sectoral MBA/PGDM specializations with negative marking and instant accredited digital certificate generation.',
    educationalCredentialAwarded: 'Executive Certificate of Excellence & Specialization Competency',
    provider: {
      '@type': 'Organization',
      name: 'CareerWithMohit',
      url: 'https://careerwithmohit.online',
    },
    hasPart: [
      { '@type': 'Question', name: 'Strategic Human Resource Management & HR Analytics' },
      { '@type': 'Question', name: 'Corporate Finance, DCF Valuation & Investment Banking' },
      { '@type': 'Question', name: 'Strategic Marketing & Brand Management' },
      { '@type': 'Question', name: 'Digital Marketing, Growth & MarTech Analytics' },
      { '@type': 'Question', name: 'Operations, Supply Chain & Logistics Excellence' },
      { '@type': 'Question', name: 'FinTech, Digital Banking & Algorithmic Finance' },
      { '@type': 'Question', name: 'Agri-Business Management & Commodity Markets' },
      { '@type': 'Question', name: 'Healthcare & Hospital Administration' },
      { '@type': 'Question', name: 'Pharmaceutical Management & Life Sciences Strategy' },
      { '@type': 'Question', name: 'Business Analytics & Enterprise Decision Sciences' },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://careerwithmohit.online',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Resources',
        item: 'https://careerwithmohit.online/resources',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'MBA Skill Assessments & Certifications',
        item: 'https://careerwithmohit.online/skill-assessment-certificate',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(assessmentSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Suspense fallback={
        <div className="min-h-screen bg-[#050811] flex items-center justify-center text-slate-400">
          <div className="animate-pulse text-sm font-medium">Loading MBA Specialization Assessment Engine...</div>
        </div>
      }>
        <SkillAssessmentApp />
      </Suspense>
    </>
  );
}
