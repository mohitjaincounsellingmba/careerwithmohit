import { Metadata } from 'next';
import PreviousYearPapersClient from '@/components/PreviousYearPapersClient';

export const metadata: Metadata = {
  title: 'Previous Year Question Papers | CAT, NMAT, XAT, JEE, NEET | Mohit Jain',
  description: 'Download free previous year question papers for CAT, NMAT, XAT, CMAT, MAT, JEE Main, JEE Advanced, and NEET. Boost your exam preparation with authentic resources.',
  keywords: 'previous year papers, CAT papers, NMAT question papers, XAT previous papers, JEE Main papers, NEET papers, Mohit Jain admission hub',
  openGraph: {
    title: 'Previous Year Question Papers | Mohit Jain Admission Hub',
    description: 'Access and download official previous year papers for top entrance exams in India.',
    type: 'website',
  },
};

export default function PreviousYearPapersPage() {
  return <PreviousYearPapersClient />;
}
