import { Metadata } from 'next';
import DedicatedGmatMockTestPage, { metadata as originalMetadata } from '@/app/tools/gmat-mock-test/page';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  ...originalMetadata,
  alternates: {
    canonical: 'https://www.careerwithmohit.online/tools/gmat-mock-test',
  },
  openGraph: {
    ...originalMetadata.openGraph,
    url: 'https://www.careerwithmohit.online/tools/gmat-mock-test',
  },
  twitter: {
    ...originalMetadata.twitter,
  }
};

export default function TopLevelGmatMockTestPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "GMAT Focus Edition Free Mock Test",
    "url": "https://www.careerwithmohit.online/tools/gmat-mock-test",
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
      <DedicatedGmatMockTestPage />
    </>
  );
}
