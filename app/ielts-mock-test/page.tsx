import { Metadata } from 'next';
import IeltsMockTestToolPage, { metadata as toolMetadata } from '@/app/tools/ielts-mock-test/page';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  ...toolMetadata,
  alternates: {
    canonical: 'https://www.careerwithmohit.online/tools/ielts-mock-test',
  },
  openGraph: {
    ...toolMetadata.openGraph,
    url: 'https://www.careerwithmohit.online/tools/ielts-mock-test',
  },
  twitter: {
    ...toolMetadata.twitter,
  }
};

export default function IeltsMockTestAliasPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "IELTS Academic & General Mock Test",
    "url": "https://www.careerwithmohit.online/tools/ielts-mock-test",
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
      <IeltsMockTestToolPage />
    </>
  );
}
