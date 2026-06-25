import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academic Grade & CGPA/SGPA Calculators | CareerWithMohit",
  description: "Calculate CGPA to Percentage, SGPA to CGPA, and Marks/Grades to Percentages easily. Simple and accurate online academic converters.",
  alternates: {
    canonical: "/tools/academic-calculators",
  },
  openGraph: {
    title: "Academic Grade & CGPA/SGPA Calculators",
    description: "Calculate CGPA to Percentage, SGPA to CGPA, and Marks/Grades to Percentages easily.",
    type: "website",
    url: "https://www.careerwithmohit.online/tools/academic-calculators",
  }
};

export default function AcademicCalculatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
