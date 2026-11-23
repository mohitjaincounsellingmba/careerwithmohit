import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: "Free SNAP Mock Test 2027 | CareerWithMohit",
  alternates: {
    canonical: "https://careerwithmohit.online/tools/snap-mock-test/",
  },
  };

export default function MockTestRedirectPage() {
  redirect("/tools/snap-mock-test/");
}
