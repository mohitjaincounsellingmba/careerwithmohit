import { Metadata } from 'next';
import CatMockTestPage, { metadata as originalMetadata } from '@/app/tools/cat-mock-test/page';

export const metadata: Metadata = {
  ...originalMetadata,
  alternates: {
    canonical: 'https://www.careerwithmohit.online/tools/cat-mock-test',
  },
};

export default function MockTestsCatPage() {
  return <CatMockTestPage />;
}
