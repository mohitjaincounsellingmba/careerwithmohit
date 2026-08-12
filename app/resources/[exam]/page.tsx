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
        description: "Official XAT previous year question papers from 2022 to 2025 with Decision Making solutions.",
        papers: [
            { year: "2025", title: "XAT 2025 Expected Mock Paper & Official Pattern", url: "/papers/xat-2025.pdf" },
            { year: "2024", title: "XAT 2024 Question Paper", url: "/papers/xat-2024.pdf" },
            { year: "2023", title: "XAT 2023 Question Paper", url: "/papers/xat-2023.pdf" },
            { year: "2022", title: "XAT 2022 Question Paper", url: "/papers/xat-2022.pdf" }
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

    const title = `${exam.name} Previous Year Question Papers PDF & Solutions | CareerWithMohit`;
    const description = `${exam.description} Practice with official PDF downloads, topic-wise answer keys, and exam analysis.`;
    const url = `https://www.careerwithmohit.online/resources/${examKey}`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            siteName: "CareerWithMohit",
            type: "website",
            locale: "en_IN",
            images: [
                {
                    url: "/og-image.webp",
                    width: 1200,
                    height: 630,
                    alt: `${exam.name} Previous Year Question Papers`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["/og-image.webp"],
        },
    };
}

export default async function ResourcePage({ params }: PageProps) {
    const resolvedParams = await params;
    const examKey = resolvedParams.exam;
    const exam = EXAM_DATA[examKey];

    if (!exam) {
        notFound();
    }

    const learningResourceSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": `${exam.name} Question Papers and Solutions`,
        "description": exam.description,
        "url": `https://www.careerwithmohit.online/resources/${examKey}`,
        "mainEntity": {
            "@type": "ItemList",
            "itemListElement": exam.papers.map((paper, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "LearningResource",
                    "name": paper.title,
                    "educationalLevel": "Postgraduate Entrance Exam",
                    "learningResourceType": "Question Paper / Practice Exam",
                    "url": paper.url.startsWith("http") ? paper.url : `https://www.careerwithmohit.online${paper.url}`,
                }
            }))
        }
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.careerwithmohit.online",
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Previous Year Papers",
                "item": "https://www.careerwithmohit.online/previous-year-papers",
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": exam.name,
                "item": `https://www.careerwithmohit.online/resources/${examKey}`,
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResourceSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <ResourceClient exam={exam} examKey={examKey} />
        </>
    );
}
