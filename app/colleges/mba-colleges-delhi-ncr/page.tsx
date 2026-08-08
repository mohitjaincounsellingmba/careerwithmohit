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
    canonical: `https://www.careerwithmohit.online${hub.route}`,
  },
  openGraph: {
    title: hub.metaTitle,
    description: hub.metaDescription,
    url: `https://www.careerwithmohit.online${hub.route}`,
    siteName: 'CareerWithMohit',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: hub.metaTitle,
    description: hub.metaDescription,
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
        item: 'https://www.careerwithmohit.online',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Colleges',
        item: 'https://www.careerwithmohit.online/colleges',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `MBA Colleges in ${hub.cityName}`,
        item: `https://www.careerwithmohit.online${hub.route}`,
      },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: hub.heroTitle,
    description: hub.heroSubtitle,
    url: `https://www.careerwithmohit.online${hub.route}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: colleges.length,
      itemListElement: colleges.map((college, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: college.name,
        url: `https://www.careerwithmohit.online/colleges/${college.slug}`,
      })),
    },
  };

  const localOrgSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Career With Mohit - MBA Admission Guidance',
    url: 'https://www.careerwithmohit.online',
    description: `Expert 1-on-1 MBA & PGDM admission counselling, GD-PI prep, and college shortlisting in ${hub.cityName}.`,
    areaServed: [
      { '@type': 'City', name: hub.cityName },
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
