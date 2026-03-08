import { getCollegeBySlug, getAllColleges } from "@/lib/colleges";
import { notFound } from "next/navigation";
import { CollegeDetailClient } from "@/components/CollegeDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
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
