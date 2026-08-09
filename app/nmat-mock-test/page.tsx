import { Metadata } from 'next';
import NmatMockTestPage, { metadata as originalMetadata } from '@/app/tools/nmat-mock-test/page';

export const metadata: Metadata = {
  ...originalMetadata,
  alternates: {
    canonical: 'https://www.careerwithmohit.online/tools/nmat-mock-test',
  },
};

export default function TopLevelNmatMockTestPage() {
  return <NmatMockTestPage />;
}
