import { Metadata } from 'next';
import DedicatedXatMockTestPage, { metadata as originalMetadata } from '@/app/tools/xat-mock-test/page';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  ...originalMetadata,
  alternates: {
    canonical: 'https://www.careerwithmohit.online/tools/xat-mock-test',
  },
  openGraph: {
    ...originalMetadata.openGraph,
    url: 'https://www.careerwithmohit.online/tools/xat-mock-test',
  },
  twitter: {
    ...originalMetadata.twitter,
  }
};

export default function TopLevelXatMockTestPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "XAT 2027 Free Mock Test",
    "url": "https://www.careerwithmohit.online/tools/xat-mock-test",
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
      <DedicatedXatMockTestPage />
    </>
  );
}
