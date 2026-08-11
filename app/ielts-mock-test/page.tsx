import { Metadata } from 'next';
import IeltsMockTestToolPage, { metadata as toolMetadata } from '@/app/tools/ielts-mock-test/page';

export const metadata: Metadata = {
  ...toolMetadata,
  alternates: {
    canonical: '/ielts-mock-test',
  },
};

export default function IeltsMockTestAliasPage() {
  return <IeltsMockTestToolPage />;
}
