import { Metadata } from 'next';
import { GEO_MBA_HUBS } from '@/data/geoMbaHubs';
import { getCollegesForGeoHub } from '@/lib/geoColleges';
import { GeoMbaHubClient } from '@/components/GeoMbaHubClient';

const hub = GEO_MBA_HUBS['delhi-ncr'];

export const metadata: Metadata = {
  title: hub.metaTitle,
  description: hub.metaDescription,
  keywords: hub.keywords,
  alternates: {
    canonical: `https://careerwithmohit.online${hub.route}/`,
    languages: {
      'en-IN': `https://careerwithmohit.online${hub.route}/`,
      'x-default': `https://careerwithmohit.online${hub.route}/`,
    },
  },
  openGraph: {
    title: hub.metaTitle,
    description: hub.metaDescription,
    url: `https://careerwithmohit.online${hub.route}/`,
    siteName: 'CareerWithMohit',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Top MBA & PGDM Colleges in Delhi NCR Admissions 2027',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: hub.metaTitle,
    description: hub.metaDescription,
    images: ['/og-image.webp'],
  },
  other: {
    'geo.region': hub.geoCoordinates.region,
    'geo.placename': hub.geoCoordinates.placename,
    'geo.position': `${hub.geoCoordinates.latitude};${hub.geoCoordinates.longitude}`,
    ICBM: `${hub.geoCoordinates.latitude}, ${hub.geoCoordinates.longitude}`,
  },
};

export default function MbaCollegesDelhiNcrPage() {
  const colleges = getCollegesForGeoHub(hub);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://careerwithmohit.online/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Colleges',
        item: 'https://careerwithmohit.online/colleges/',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `MBA Colleges in ${hub.cityName}`,
        item: `https://careerwithmohit.online${hub.route}/`,
      },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: hub.heroTitle,
    description: hub.heroSubtitle,
    url: `https://careerwithmohit.online${hub.route}/`,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'p', '.ai-summary-card'],
    },
    author: {
      '@type': 'Person',
      name: 'Mohit Jain',
      jobTitle: 'Senior MBA Admissions Consultant',
      url: 'https://careerwithmohit.online/about/',
      alumniOf: [
        {
          '@type': 'EducationalOrganization',
          name: 'Indian Institute of Management Bangalore (IIMB)',
        },
        {
          '@type': 'EducationalOrganization',
          name: 'Faculty of Management Studies (FMS Delhi)',
        },
      ],
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: colleges.length,
      itemListElement: colleges.map((college, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: college.name,
        url: `https://careerwithmohit.online/colleges/${college.slug}/`,
      })),
    },
  };

  const localOrgSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Career With Mohit - Delhi NCR MBA Admission Guidance',
    url: 'https://careerwithmohit.online',
    description: `Expert 1-on-1 MBA & PGDM admission counselling, GD-PI prep, and college shortlisting in ${hub.cityName}.`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Delhi NCR',
      addressRegion: 'Delhi',
      addressCountry: 'India',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: hub.geoCoordinates.latitude,
      longitude: hub.geoCoordinates.longitude,
    },
    areaServed: [
      { '@type': 'City', name: 'Delhi' },
      { '@type': 'City', name: 'Noida' },
      { '@type': 'City', name: 'Greater Noida' },
      { '@type': 'City', name: 'Gurgaon' },
      { '@type': 'City', name: 'Ghaziabad' },
      { '@type': 'City', name: 'Faridabad' },
      { '@type': 'Country', name: 'India' },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: hub.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localOrgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GeoMbaHubClient hub={hub} colleges={colleges} />
    </>
  );
}
