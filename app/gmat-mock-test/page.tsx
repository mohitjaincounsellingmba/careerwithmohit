import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: "Free GMAT Mock Test 2027 | CareerWithMohit",
  alternates: {
    canonical: "https://careerwithmohit.online/tools/gmat-mock-test/",
  },
  };

export default function MockTestRedirectPage() {
  redirect("/tools/gmat-mock-test");
}
