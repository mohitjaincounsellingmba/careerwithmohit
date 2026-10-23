import { Metadata } from 'next';
import { redirect } from 'next/navigation';

const BASE_URL = 'https://careerwithmohit.online';
const PAGE_PATH = '/mba-admissions-by-region/';
const PAGE_URL = `${BASE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: 'MBA & PGDM Admissions by Region (2027–2029): Compare Hubs, Cutoffs & Fees | CareerWithMohit',
  description:
    'Compare top MBA & PGDM colleges across Delhi NCR, Mumbai, Bangalore, Pune, Hyderabad, Kolkata, Ahmedabad & Jaipur for 2027–2029. Review fees, average placements, and regional cutoffs.',
  keywords: [
    'MBA admissions by region 2027-29',
    'PGDM admissions by region 2027-29',
    'MBA admission Delhi NCR 2027-29',
    'MBA admission Bangalore 2027-29',
    'MBA admission Mumbai 2027-29',
    'MBA admission Pune 2027-29',
    'regional MBA cutoffs CAT XAT CMAT'
  ],
  alternates: {
    canonical: `${BASE_URL}/mba-pgdm-admissions-by-region/`,
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'MBA & PGDM Admissions by Region (2027–2029) | CareerWithMohit',
    description:
      'Compare India\'s 8 major MBA business hubs for 2027–2029 batch. Get fee structures, placement comparisons, and 1-on-1 admission counseling with Mohit Jain.',
    url: PAGE_URL,
    siteName: 'CareerWithMohit',
    type: 'website',
  },
};

export default function MbaAdmissionsByRegionPage() {
  redirect('/mba-pgdm-admissions-by-region');
}

