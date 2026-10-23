import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: "Free CAT Mock Test 2027 | CareerWithMohit",
  alternates: {
    canonical: "https://careerwithmohit.online/tools/cat-mock-test/",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function MockTestRedirectPage() {
  redirect("/tools/cat-mock-test");
}
