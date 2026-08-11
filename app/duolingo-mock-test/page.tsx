import { Metadata } from 'next';
import DuolingoMockTestToolPage, { metadata as toolMetadata } from '@/app/tools/duolingo-mock-test/page';

export const metadata: Metadata = {
  ...toolMetadata,
  alternates: {
    canonical: '/duolingo-mock-test',
  },
};

export default function DuolingoMockTestAliasPage() {
  return <DuolingoMockTestToolPage />;
}
