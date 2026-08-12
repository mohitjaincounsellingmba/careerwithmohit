import { Metadata } from 'next';
import { CertificationsClient } from '@/components/CertificationsClient';
import { CERTIFICATIONS_DATA } from '@/data/certificationsData';

export const metadata: Metadata = {
  title: 'Free & Professional Certification Courses 2026-2027 | LearnVern & IIDE | CareerWithMohit',
  description: 'Explore free and premium online certification courses in Python, Digital Marketing, Advanced Excel, Machine Learning, and AI. Boost your resume with certified skills.',
  keywords: [
    'free certification courses', 'python tutorial course', 'digital marketing certification',
    'advanced excel course', 'machine learning with python', 'IIDE digital marketing',
    'online certifications india 2027', 'resume booster courses', 'career certification guide'
  ],
  alternates: {
    canonical: 'https://www.careerwithmohit.online/certifications',
  },
  openGraph: {
    title: 'Free & Professional Certification Courses 2026-2027 | CareerWithMohit',
    description: 'Explore curated free & premium certifications in Python, AI, Digital Marketing, and Financial Analysis to accelerate your career.',
    url: 'https://www.careerwithmohit.online/certifications',
    siteName: 'CareerWithMohit',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'CareerWithMohit Professional Certifications',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free & Professional Certification Courses 2026-2027',
    description: 'Explore curated free & premium certifications in Python, AI, Digital Marketing, and Financial Analysis.',
    images: ['/og-image.webp'],
  },
};

export default function CertificationsPage() {
  const courseListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Top Free and Paid Professional Certification Courses',
    itemListElement: CERTIFICATIONS_DATA.map((course, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Course',
        name: course.title,
        description: course.description || `Comprehensive ${course.title} course by ${course.provider}.`,
        provider: {
          '@type': 'Organization',
          name: course.provider,
        },
        offers: {
          '@type': 'Offer',
          category: course.type === 'free' ? 'Free' : 'Paid',
          price: course.type === 'free' ? '0' : 'Varies',
          priceCurrency: 'INR',
        },
      },
    })),
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
        name: 'Certifications',
        item: 'https://www.careerwithmohit.online/certifications',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CertificationsClient />
    </>
  );
}
