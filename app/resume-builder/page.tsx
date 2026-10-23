import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Free ATS Resume Builder 2027: 30+ Templates | CareerWithMohit",
  description: "Build an ATS-compliant resume for Internship, Fresher, or Working Professional goals. 30+ free templates, real-time score, and instant PDF download.",
  alternates: {
    canonical: "https://careerwithmohit.online/tools/ats-resume-builder/",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ResumeBuilderRedirect() {
  redirect("/tools/ats-resume-builder");
}
