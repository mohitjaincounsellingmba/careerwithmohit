import { Metadata } from 'next';
import { GEO_MBA_HUBS, getAllGeoHubs } from '@/data/geoMbaHubs';
import { getCollegesForGeoHub } from '@/lib/geoColleges';
import { CollegeMetadata } from '@/lib/colleges';
import MbaPgdmAdmissionsByRegionClient from '@/components/MbaPgdmAdmissionsByRegionClient';

const BASE_URL = 'https://www.careerwithmohit.online';
const PAGE_PATH = '/mba-pgdm-admissions-by-region';
const PAGE_URL = `${BASE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: 'Explore MBA & PGDM Admissions by Region 2027: Top Hubs, Cutoffs & Fees | CareerWithMohit',
  description:
    'Compare top MBA & PGDM colleges across Delhi NCR, Mumbai, Bangalore, Pune, Hyderabad, Kolkata, Ahmedabad & Jaipur for 2027. Review fees, average placements, and regional cutoffs.',
  keywords: [
    'Explore MBA PGDM Admissions by Region',
    'MBA admission by region India',
    'top MBA colleges Delhi NCR 2027',
    'MBA admission Bangalore 2027',
    'MBA admission Mumbai 2027',
    'MBA admission Pune 2027',
    'MBA admission Hyderabad 2027',
    'MBA admission Kolkata 2027',
    'MBA admission Ahmedabad 2027',
    'MBA admission Jaipur 2027',
    'best regional MBA colleges India',
    'regional MBA cutoffs CAT XAT CMAT'
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'Explore MBA & PGDM Admissions by Region 2027 | CareerWithMohit',
    description:
      'Compare India\'s 8 major MBA business hubs. Get fee structures, placement comparisons, and 1-on-1 admission counseling with Mohit Jain.',
    url: PAGE_URL,
    siteName: 'CareerWithMohit',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Explore MBA & PGDM Admissions by Region 2027',
    description:
      'Compare premier PGDM/MBA institutes across major Indian cities: Delhi NCR, Mumbai, Bangalore, Pune, and more.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
};

export default function MbaPgdmAdmissionsByRegionPage() {
  const allHubs = getAllGeoHubs();

  const collegesByHub: Record<string, CollegeMetadata[]> = {};
  let totalCollegesCount = 0;

  allHubs.forEach((hub) => {
    const cols = getCollegesForGeoHub(hub);
    collegesByHub[hub.hubKey] = cols;
    totalCollegesCount += cols.length;
  });

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'MBA / PGDM Admission 2027', item: `${BASE_URL}/mba-pgdm-admission-2027` },
      { '@type': 'ListItem', position: 3, name: 'Admissions by Region', item: PAGE_URL },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Explore MBA & PGDM Admissions by Region 2027',
    description:
      'Compare premier MBA and PGDM business schools across Delhi NCR, Mumbai, Bangalore, Pune, Hyderabad, Kolkata, Ahmedabad, and Jaipur.',
    url: PAGE_URL,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: allHubs.length,
      itemListElement: allHubs.map((hub, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: `MBA Colleges in ${hub.cityName}`,
        url: `${BASE_URL}${hub.route}`,
      })),
    },
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
      <MbaPgdmAdmissionsByRegionClient
        allHubs={allHubs}
        collegesByHub={collegesByHub}
        totalCollegesCount={totalCollegesCount}
      />
    </>
  );
}
