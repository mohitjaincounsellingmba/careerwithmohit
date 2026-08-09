import { Metadata } from 'next';
import DedicatedSnapMockTestPage, { metadata as originalMetadata } from '@/app/tools/snap-mock-test/page';

export const metadata: Metadata = {
  ...originalMetadata,
  alternates: {
    canonical: 'https://www.careerwithmohit.online/tools/mock-test/snap',
  },
};

export default function TopLevelSnapMockTestPage() {
  return <DedicatedSnapMockTestPage />;
}
