import { Metadata } from 'next';
import { getAllGeoHubs } from '@/data/geoMbaHubs';
import { getCollegesForGeoHub } from '@/lib/geoColleges';
import { CollegeMetadata } from '@/lib/colleges';
import MbaPgdmAdmissionsByRegionClient from '@/components/MbaPgdmAdmissionsByRegionClient';

const BASE_URL = 'https://www.careerwithmohit.online';
const PAGE_PATH = '/mba-admissions-by-region';
const PAGE_URL = `${BASE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: 'MBA & PGDM Admissions by Region 2027: Compare Hubs, Cutoffs & Fees | CareerWithMohit',
  description:
    'Compare top MBA & PGDM colleges across Delhi NCR, Mumbai, Bangalore, Pune, Hyderabad, Kolkata, Ahmedabad & Jaipur for 2027. Review fees, average placements, and regional cutoffs.',
  keywords: [
    'MBA admissions by region',
    'PGDM admissions by region 2027',
    'MBA admission Delhi NCR',
    'MBA admission Bangalore',
    'MBA admission Mumbai',
    'MBA admission Pune',
    'regional MBA cutoffs CAT XAT CMAT'
  ],
  alternates: {
    canonical: `${BASE_URL}/mba-pgdm-admissions-by-region/`,
  },
  openGraph: {
    title: 'MBA & PGDM Admissions by Region 2027 | CareerWithMohit',
    description:
      'Compare India\'s 8 major MBA business hubs. Get fee structures, placement comparisons, and 1-on-1 admission counseling with Mohit Jain.',
    url: PAGE_URL,
    siteName: 'CareerWithMohit',
    type: 'website',
  },
};

export default function MbaAdmissionsByRegionPage() {
  const allHubs = getAllGeoHubs();

  const collegesByHub: Record<string, CollegeMetadata[]> = {};
  let totalCollegesCount = 0;

  allHubs.forEach((hub) => {
    const cols = getCollegesForGeoHub(hub);
    collegesByHub[hub.hubKey] = cols;
    totalCollegesCount += cols.length;
  });

  return (
    <MbaPgdmAdmissionsByRegionClient
      allHubs={allHubs}
      collegesByHub={collegesByHub}
      totalCollegesCount={totalCollegesCount}
    />
  );
}
