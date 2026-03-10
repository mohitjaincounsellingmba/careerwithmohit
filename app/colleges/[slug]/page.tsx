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

  const title = `${college.name}, ${college.location} - Courses, Fees, Admission 2026, Placements, Ranking, Cutoff`;
  const description = `Discover ${college.name}, ${college.location}. Detailed information on fee structure (approx ${college.fees}), NIRF ranking ${college.ranking}, and average placement package of ${college.avg_placement}. Apply now for 2026 admissions!`;

  return {
    title,
    description,
    keywords: [college.name, college.location, `${college.name} fees`, `${college.name} placement`, `${college.name} admission 2026`, ...college.exams],
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
