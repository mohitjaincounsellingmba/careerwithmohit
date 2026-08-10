import { Metadata } from 'next';
import MatMockTestToolPage, { metadata as toolMetadata } from '@/app/tools/mat-mock-test/page';

export const metadata: Metadata = {
  ...toolMetadata,
  alternates: {
    canonical: '/mat-mock-test',
  },
};

export default function MatMockTestAliasPage() {
  return <MatMockTestToolPage />;
}
