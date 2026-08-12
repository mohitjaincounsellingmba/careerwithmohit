import { Metadata } from 'next';
import DedicatedSnapMockTestPage, { metadata as originalMetadata } from '@/app/tools/snap-mock-test/page';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  ...originalMetadata,
  alternates: {
    canonical: 'https://www.careerwithmohit.online/tools/snap-mock-test',
  },
  openGraph: {
    ...originalMetadata.openGraph,
    url: 'https://www.careerwithmohit.online/tools/snap-mock-test',
  },
  twitter: {
    ...originalMetadata.twitter,
  }
};

export default function TopLevelSnapMockTestPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "SNAP 2026-2027 Free Mock Test",
    "url": "https://www.careerwithmohit.online/tools/snap-mock-test",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    }
  };

  return (
    <>
      <JsonLd data={schema} />
      <DedicatedSnapMockTestPage />
    </>
  );
}
