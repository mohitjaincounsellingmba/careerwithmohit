import { Metadata } from 'next';
import DedicatedGmatMockTestPage, { metadata as originalMetadata } from '@/app/tools/gmat-mock-test/page';

export const metadata: Metadata = {
  ...originalMetadata,
  alternates: {
    canonical: 'https://www.careerwithmohit.online/tools/mock-test/gmat',
  },
};

export default function TopLevelGmatMockTestPage() {
  return <DedicatedGmatMockTestPage />;
}
