import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: "Free XAT Mock Test 2027 | CareerWithMohit",
  alternates: {
    canonical: "https://careerwithmohit.online/tools/xat-mock-test/",
  },
  };

export default function MockTestRedirectPage() {
  redirect("/tools/xat-mock-test/");
}
