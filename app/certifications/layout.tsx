import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Professional Certifications & Free Courses | CareerWithMohit",
  description: "Browse curated free and paid professional certifications in Python, Digital Marketing, Excel, and more to boost your career profile.",
  keywords: ["free certifications", "professional courses", "digital marketing course", "python tutorial", "advance excel", "career growth"],
  alternates: {
    canonical: "/certifications",
  },
  openGraph: {
    title: "Professional Certifications & Free Courses",
    description: "Curated list of certifications to level up your skills. Free and paid options available.",
    type: "website",
  }
};

export default function CertificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
