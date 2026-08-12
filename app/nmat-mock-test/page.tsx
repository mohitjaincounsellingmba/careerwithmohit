import { Metadata } from 'next';
import NmatMockTestPage, { metadata as originalMetadata } from '@/app/tools/nmat-mock-test/page';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  ...originalMetadata,
  alternates: {
    canonical: 'https://www.careerwithmohit.online/tools/nmat-mock-test',
  },
  openGraph: {
    ...originalMetadata.openGraph,
    url: 'https://www.careerwithmohit.online/tools/nmat-mock-test',
  },
  twitter: {
    ...originalMetadata.twitter,
  }
};

export default function TopLevelNmatMockTestPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "NMAT 2026 Free Mock Test",
    "url": "https://www.careerwithmohit.online/tools/nmat-mock-test",
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
      <NmatMockTestPage />
    </>
  );
}
