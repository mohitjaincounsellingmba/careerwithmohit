import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ exam: string }> }): Promise<Metadata> {
  const { exam } = await params;
  const examName = exam.toUpperCase();
  return {
    title: `${examName} Previous Year Question Papers PDF & Solutions | CareerWithMohit`,
    description: `Download official ${examName} previous year question papers with detailed answer keys and solutions. Essential practice resources for MBA and engineering aspirants.`,
    alternates: {
      canonical: `/resources/${exam}`,
    },
    openGraph: {
      title: `${examName} Previous Year Question Papers PDF & Solutions`,
      description: `Download official ${examName} previous year question papers with detailed answer keys and solutions.`,
      type: "website",
      url: `https://www.careerwithmohit.online/resources/${exam}`,
    }
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
