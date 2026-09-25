import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: "Free Skill Assessment & Certification 2027 | CareerWithMohit",
  description: "Take free skill assessments in Python, Digital Marketing, AI & Business Analytics. Earn instant verified certificates to boost your career.",
  alternates: {
    canonical: "https://careerwithmohit.online/skill-assessment-certificate/",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function AttemptSkillsGetCertificateAliasPage() {
  redirect('/skill-assessment-certificate');
}
