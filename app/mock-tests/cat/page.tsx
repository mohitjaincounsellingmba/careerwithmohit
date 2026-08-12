import { Metadata } from 'next';
import CatMockTestPage, { metadata as originalMetadata } from '@/app/tools/cat-mock-test/page';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  ...originalMetadata,
  alternates: {
    canonical: 'https://www.careerwithmohit.online/tools/cat-mock-test',
  },
  openGraph: {
    ...originalMetadata.openGraph,
    url: 'https://www.careerwithmohit.online/tools/cat-mock-test',
  },
  twitter: {
    ...originalMetadata.twitter,
  },
};

export default function MockTestsCatPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CAT Mock Test (Full Practice Exam)",
    "url": "https://www.careerwithmohit.online/tools/cat-mock-test",
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
      <CatMockTestPage />
    </>
  );
}
