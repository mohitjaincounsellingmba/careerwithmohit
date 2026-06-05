import OfferLetterGenerator from '@/components/OfferLetterGenerator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Job Offer Letter Generator – Customize & Download | CareerWithMohit',
  description: 'Design and customize job offer letters for free. Use startup, corporate, or executive templates to create professional offers instantly.',
  keywords: [
    'offer letter generator', 'job offer template', 'appointment letter creator',
    'free offer letter maker', 'hiring templates', 'human resources tools'
  ],
  alternates: {
    canonical: '/tools/offer-letter-generator',
  },
};

export default function OfferLetterGeneratorPage() {
  return (
    <main>
      <OfferLetterGenerator />
    </main>
  );
}
