import { Metadata } from 'next';
import AtmaMockTestPage, { metadata as originalMetadata } from '@/app/tools/atma-mock-test/page';

export const metadata: Metadata = {
  ...originalMetadata,
  alternates: {
    canonical: 'https://www.careerwithmohit.online/tools/mock-test/atma',
  },
};

export default function TopLevelAtmaMockTestPage() {
  return <AtmaMockTestPage />;
}
