import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: "Free IELTS Mock Test 2027 | CareerWithMohit",
  alternates: {
    canonical: "https://careerwithmohit.online/tools/ielts-mock-test/",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function MockTestRedirectPage() {
  redirect("/tools/ielts-mock-test");
}
