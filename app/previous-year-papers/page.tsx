import { Metadata } from 'next';
import PreviousYearPapersClient from '@/components/PreviousYearPapersClient';

export const metadata: Metadata = {
  alternates: {
    canonical: '/previous-year-papers',
  },
  title: 'Previous Year Question Papers | CAT, NMAT, XAT, SNAP | Mohit Jain',
  description: 'Download free previous year question papers for CAT, NMAT, XAT, and SNAP. Boost your exam preparation with authentic resources.',
  keywords: 'previous year papers, CAT papers, NMAT question papers, XAT previous papers, SNAP question papers, Mohit Jain admission hub',
  openGraph: {
    title: 'Previous Year Question Papers | Mohit Jain Admission Hub',
    description: 'Access and download official previous year papers for top MBA entrance exams in India.',
    type: 'website',
  },
};

export default function PreviousYearPapersPage() {
  return <PreviousYearPapersClient />;
}
