import { Metadata } from 'next';
import MatMockTestToolPage, { metadata as toolMetadata } from '@/app/tools/mat-mock-test/page';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  ...toolMetadata,
  alternates: {
    canonical: 'https://www.careerwithmohit.online/tools/mat-mock-test',
  },
  openGraph: {
    ...toolMetadata.openGraph,
    url: 'https://www.careerwithmohit.online/tools/mat-mock-test',
  },
  twitter: {
    ...toolMetadata.twitter,
  }
};

export default function MatMockTestAliasPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "MAT Exam Mock Test Tool",
    "url": "https://www.careerwithmohit.online/tools/mat-mock-test",
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
      <MatMockTestToolPage />
    </>
  );
}
