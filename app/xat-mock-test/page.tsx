import { Metadata } from 'next';
import DedicatedXatMockTestPage, { metadata as originalMetadata } from '@/app/tools/xat-mock-test/page';

export const metadata: Metadata = {
  ...originalMetadata,
  alternates: {
    canonical: 'https://www.careerwithmohit.online/tools/mock-test/xat',
  },
};

export default function TopLevelXatMockTestPage() {
  return <DedicatedXatMockTestPage />;
}
