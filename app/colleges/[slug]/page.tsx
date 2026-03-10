import { getCollegeBySlug, getAllColleges } from "@/lib/colleges";
import { notFound } from "next/navigation";
import { CollegeDetailClient } from "@/components/CollegeDetailClient";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const college = await getCollegeBySlug(slug);

  if (!college) return {};

  const title = `${college.name} | Fees, Placement & Admission 2026`;
  const description = `Get detailed information about ${college.name}, ${college.location}. Explore fee structure, NIRF ranking ${college.ranking}, and average placement of ${college.avg_placement}. Apply now!`;

  return {
    title,
    description,
    keywords: [college.name, college.location, `${college.name} fees`, `${college.name} placement`, ...college.exams],
    alternates: {
      canonical: `/colleges/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `/colleges/${slug}`,
      siteName: "CareerWithMohit",
    }
  };
}

export async function generateStaticParams() {
  const colleges = getAllColleges();
  return colleges.map((college) => ({
    slug: college.slug,
  }));
}

export default async function CollegeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const college = await getCollegeBySlug(slug);

  if (!college) {
    notFound();
  }

  return <CollegeDetailClient college={college} />;
}
