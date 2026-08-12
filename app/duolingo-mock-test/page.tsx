import { Metadata } from 'next';
import DuolingoMockTestToolPage, { metadata as toolMetadata } from '@/app/tools/duolingo-mock-test/page';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  ...toolMetadata,
  alternates: {
    canonical: 'https://www.careerwithmohit.online/tools/duolingo-mock-test',
  },
  openGraph: {
    ...toolMetadata.openGraph,
    url: 'https://www.careerwithmohit.online/tools/duolingo-mock-test',
  },
  twitter: {
    ...toolMetadata.twitter,
  }
};

export default function DuolingoMockTestAliasPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Duolingo English Test (DET) CBT Mock Test",
    "url": "https://www.careerwithmohit.online/tools/duolingo-mock-test",
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
      <DuolingoMockTestToolPage />
    </>
  );
}
