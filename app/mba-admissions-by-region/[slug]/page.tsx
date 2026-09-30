import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { GEO_MBA_HUBS, GeoMbaHub } from '@/data/geoMbaHubs';
import { getCollegesForGeoHub } from '@/lib/geoColleges';
import { GeoMbaHubClient } from '@/components/GeoMbaHubClient';

const SLUG_ALIASES: Record<string, string> = {
  'delhi-ncr': 'delhi-ncr',
  'delhi': 'delhi-ncr',
  'ncr': 'delhi-ncr',
  'noida': 'delhi-ncr',
  'greater-noida': 'delhi-ncr',
  'gurgaon': 'delhi-ncr',
  'gurugram': 'delhi-ncr',
  'ghaziabad': 'delhi-ncr',
  'faridabad': 'delhi-ncr',
  'pune': 'pune',
  'mumbai': 'mumbai',
  'navi-mumbai': 'mumbai',
  'thane': 'mumbai',
  'bangalore': 'bangalore',
  'bengaluru': 'bangalore',
  'hyderabad': 'hyderabad',
  'kolkata': 'kolkata',
  'ahmedabad': 'ahmedabad',
  'gujarat': 'ahmedabad',
  'jaipur': 'jaipur',
  'rajasthan': 'jaipur',
};

export async function generateStaticParams() {
  return Object.keys(SLUG_ALIASES).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const hubKey = SLUG_ALIASES[slug.toLowerCase()];
  const hub = hubKey ? GEO_MBA_HUBS[hubKey] : null;

  if (!hub) {
    return {
      title: 'MBA & PGDM Admissions by Region | CareerWithMohit',
    };
  }

  return {
    title: hub.metaTitle,
    description: hub.metaDescription,
    keywords: hub.keywords,
    alternates: {
      canonical: `https://careerwithmohit.online/mba-admissions-by-region/${slug}/`,
    },
    openGraph: {
      title: hub.metaTitle,
      description: hub.metaDescription,
      url: `https://careerwithmohit.online/mba-admissions-by-region/${slug}/`,
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
}

export default async function DynamicGeoMbaHubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hubKey = SLUG_ALIASES[slug.toLowerCase()];
  const hub = hubKey ? GEO_MBA_HUBS[hubKey] : null;

  if (!hub) {
    // If not a known geo hub, redirect to colleges filtered by that location
    const formattedLocation = slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    redirect(`/colleges?location=${encodeURIComponent(formattedLocation)}`);
  }

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
        name: 'MBA Admissions by Region',
        item: 'https://careerwithmohit.online/mba-admissions-by-region/',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `MBA Colleges in ${hub.cityName}`,
        item: `https://careerwithmohit.online/mba-admissions-by-region/${slug}/`,
      },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: hub.heroTitle,
    description: hub.heroSubtitle,
    url: `https://careerwithmohit.online/mba-admissions-by-region/${slug}/`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GeoMbaHubClient hub={hub} colleges={colleges} />
    </>
  );
}
