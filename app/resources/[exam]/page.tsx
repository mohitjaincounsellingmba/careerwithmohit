import { notFound } from "next/navigation";
import { ResourceClient } from "./ResourceClient";
import type { Metadata } from "next";

interface Paper {
    year: string;
    title: string;
    url: string;
}

const EXAM_DATA: Record<string, { name: string; description: string; papers: Paper[] }> = {
    "cat": {
        name: "CAT (Common Admission Test)",
        description: "Official CAT previous year question papers with detailed solutions. Essential for IIM aspirants.",
        papers: [
            { year: "2025", title: "CAT 2025 Expected Mock Paper & Official Pattern", url: "/papers/cat-2025.pdf" },
            { year: "2024", title: "CAT 2024 Question Paper", url: "/papers/cat-2024.pdf" },
            { year: "2023", title: "CAT 2023 Question Paper", url: "/papers/cat-2023.pdf" },
            { year: "2022", title: "CAT 2022 Question Paper", url: "/papers/cat-2022.pdf" }
        ]
    },
    "xat": {
        name: "XAT (Xavier Aptitude Test)",
        description: "Previous year papers for XAT. Focus on Decision Making and Verbal Ability sections.",
        papers: [
            { year: "2024", title: "XAT 2024 Question Paper", url: "https://cracku.in/xat-previous-year-papers" },
            { year: "2023", title: "XAT 2023 Question Paper", url: "https://cracku.in/xat-2023-question-paper-with-solutions-pdf" }
        ]
    },
    "cmat": {
        name: "CMAT (Common Management Admission Test)",
        description: "Download CMAT previous year papers to practice Innovation & Entrepreneurship section.",
        papers: [
            { year: "2024", title: "CMAT 2024 Question Paper", url: "https://cracku.in/cmat-previous-year-papers" },
            { year: "2023", title: "CMAT 2023 Question Paper", url: "https://cracku.in/cmat-previous-year-papers" }
        ]
    },
    "snap": {
        name: "SNAP (Symbiosis National Aptitude Test)",
        description: "Solve authentic SNAP previous year question papers from 2022 to 2025 with detailed solutions.",
        papers: [
            { year: "2025", title: "SNAP 2025 Expected Mock Paper & Pattern", url: "/papers/snap-2025.pdf" },
            { year: "2024", title: "SNAP 2024 Memory Based Paper", url: "/papers/snap-2024.pdf" },
            { year: "2023", title: "SNAP 2023 Memory Based Paper", url: "/papers/snap-2023.pdf" },
            { year: "2022", title: "SNAP 2022 Memory Based Paper", url: "/papers/snap-2022.pdf" }
        ]
    },
    "nmat": {
        name: "NMAT (NMAT by GMAC)",
        description: "Official NMAT previous year question papers and mock tests with solutions.",
        papers: [
            { year: "2025", title: "NMAT 2025 Expected Mock Paper & Official Pattern", url: "/papers/nmat-2025.pdf" },
            { year: "2024", title: "NMAT 2024 Question Paper", url: "/papers/nmat-2024.pdf" },
            { year: "2023", title: "NMAT 2023 Question Paper", url: "/papers/nmat-2023.pdf" },
            { year: "2022", title: "NMAT 2022 Question Paper", url: "/papers/nmat-2022.pdf" }
        ]
    },
    "mah-mba-cet": {
        name: "MAH MBA CET",
        description: "Maharashtra CET previous year papers for JBIMS, Sydenham, and PUMBA aspirants.",
        papers: [
            { year: "2024", title: "MAH CET 2024 Question Paper", url: "https://cracku.in/mah-cet-previous-year-papers" },
            { year: "2023", title: "MAH CET 2023 Question Paper", url: "https://cracku.in/mah-cet-previous-year-papers" }
        ]
    },
    "cuet-pg": {
        name: "CUET PG (MBA/General Management)",
        description: "Previous year papers for CUET PG. Best for TISS, DU, and BHU admissions.",
        papers: [
            { year: "2024", title: "CUET PG 2024 MBA Paper", url: "https://cracku.in/cuet-pg-previous-year-papers" },
            { year: "2023", title: "CUET PG 2023 MBA Paper", url: "https://cracku.in/cuet-pg-previous-year-papers" }
        ]
    }
};

interface PageProps {
    params: Promise<{ exam: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
    return Object.keys(EXAM_DATA).map((examKey) => ({
        exam: examKey,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const examKey = resolvedParams.exam;
    const exam = EXAM_DATA[examKey];

    if (!exam) {
        return {
            title: "Resource Not Found | CareerWithMohit",
        };
    }

    return {
        title: `${exam.name} Previous Year Question Papers PDF | CareerWithMohit`,
        description: `${exam.description} Practice with high-resolution PDFs, topic-wise solutions, and get free expert guidance.`,
    };
}

export default async function ResourcePage({ params }: PageProps) {
    const resolvedParams = await params;
    const examKey = resolvedParams.exam;
    const exam = EXAM_DATA[examKey];

    if (!exam) {
        notFound();
    }

    return <ResourceClient exam={exam} examKey={examKey} />;
}
