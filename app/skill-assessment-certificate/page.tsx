import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { SkillAssessmentApp } from '@/components/SkillAssessmentApp';

export const metadata: Metadata = {
  title: 'Attempt Skills & Get Certificate 2026-2027 | Free Verified Skill Assessments | CareerWithMohit',
  description: 'Attempt 30-minute certified skill assessments in Power BI, Tableau, Six Sigma, SQL, Advanced Excel, Digital Marketing, Cyber Security, Cloud Computing, and AI. Score 60%+ to earn an authentic digital certificate signed by Mohit Jain.',
  keywords: [
    'attempt skills get certificate',
    'free skill certification',
    'power bi certificate test',
    'tableau skill assessment',
    'six sigma green belt test',
    'sql certification exam mcqs',
    'advanced excel assessment',
    'digital marketing test with certificate',
    'cyber security skill exam',
    'cloud computing aws azure test',
    'artificial intelligence certification quiz',
    'career with mohit certifications'
  ],
  alternates: {
    canonical: 'https://www.careerwithmohit.online/skill-assessment-certificate',
  },
  openGraph: {
    title: 'Attempt Skills & Get Certificate | Free Accredited Assessments | CareerWithMohit',
    description: 'Test your competence across 9 high-growth domains: Power BI, Tableau, Six Sigma, SQL, Excel, Digital Marketing, Cyber Security, Cloud, and AI. Negative marking (+1/-0.5), 30 minutes, instant verified PDF certificate.',
    url: 'https://www.careerwithmohit.online/skill-assessment-certificate',
    siteName: 'CareerWithMohit',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'CareerWithMohit Skill Assessment and Certification Engine',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Attempt Skills & Get Certificate 2026-2027 | CareerWithMohit',
    description: 'Attempt industry-standard timed skill tests (+1/-0.5 negative marking) and download your accredited certificate of excellence.',
    images: ['/og-image.webp'],
  },
};

export default function SkillAssessmentCertificatePage() {
  const assessmentSchema = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: 'Professional Skill Assessments & Certification Engine',
    description: 'Interactive competency assessments across 9 technical and business domains with negative marking and instant accredited certificate generation.',
    educationalCredentialAwarded: 'Certificate of Excellence & Competence',
    provider: {
      '@type': 'Organization',
      name: 'CareerWithMohit',
      url: 'https://www.careerwithmohit.online',
    },
    hasPart: [
      { '@type': 'Question', name: 'Power BI Data Modeling & DAX Assessment' },
      { '@type': 'Question', name: 'Tableau Visual Analytics & LOD Expressions' },
      { '@type': 'Question', name: 'Six Sigma Green Belt Quality Management' },
      { '@type': 'Question', name: 'SQL Window Functions, Joins & Query Architecture' },
      { '@type': 'Question', name: 'Advanced Excel Formulas, Dynamic Arrays & Automation' },
      { '@type': 'Question', name: 'Digital Marketing, SEO & Performance Advertising' },
      { '@type': 'Question', name: 'Cyber Security, CIA Triad & Cryptography' },
      { '@type': 'Question', name: 'Cloud Computing Architecture (AWS & Azure)' },
      { '@type': 'Question', name: 'Artificial Intelligence, LLMs & Machine Learning' },
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
        item: 'https://www.careerwithmohit.online',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Resources',
        item: 'https://www.careerwithmohit.online/resources',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Attempt Skills & Get Certificate',
        item: 'https://www.careerwithmohit.online/skill-assessment-certificate',
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
        <div className="min-h-screen bg-[#070b14] flex items-center justify-center text-slate-400">
          <div className="animate-pulse text-sm font-medium">Loading Skill Assessment Engine...</div>
        </div>
      }>
        <SkillAssessmentApp />
      </Suspense>
    </>
  );
}
