import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: "Free NMAT Mock Test 2027 | CareerWithMohit",
  alternates: {
    canonical: "https://careerwithmohit.online/tools/nmat-mock-test/",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function MockTestRedirectPage() {
  redirect("/tools/nmat-mock-test");
}
