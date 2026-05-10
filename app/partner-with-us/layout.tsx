import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner With Us | Colleges & Consultants | CareerWithMohit",
  description:
    "Join CareerWithMohit as a college or consultant partner. Get verified student leads, rich admission data, and direct enrollment partnerships for MBA, BTech, BBA & PGDM programs across India.",
  keywords: [
    "college partnership for admissions India",
    "consultant partner for student leads",
    "MBA admission leads for colleges",
    "education consultant partnership",
    "student data for colleges",
    "admission lead generation India",
    "partner with career counsellor",
    "BTech MBA BBA admission partnership",
  ],
  alternates: {
    canonical: "/partner-with-us",
  },
};

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
