export interface Certification {
    name: string;
    provider: string;
    level: "Beginner" | "Intermediate" | "Advanced";
    duration: string;
    pros: string[];
    cons: string[];
    roi: string;
}

export interface CertSpecialization {
    id: string;
    title: string;
    emoji: string;
    description: string;
    certifications: Certification[];
}

export const certificationData: CertSpecialization[] = [
    {
        id: "finance",
        title: "Finance",
        emoji: "💰",
        description: "Focus on capital markets, investment banking, and corporate finance.",
        certifications: [
            {
                name: "CFA (Chartered Financial Analyst)",
                provider: "CFA Institute",
                level: "Advanced",
                duration: "2-4 Years",
                pros: [
                    "Gold standard in investment management",
                    "Global recognition",
                    "Deep knowledge of equity and fixed income"
                ],
                cons: [
                    "Extremely high difficulty",
                    "Significant time commitment",
                    "Expensive exam fees"
                ],
                roi: "Very High - Essential for portfolio management & research roles."
            },
            {
                name: "FRM (Financial Risk Manager)",
                provider: "GARP",
                level: "Advanced",
                duration: "1-2 Years",
                pros: [
                    "Specialized in risk management",
                    "Highly valued by banks and hedge funds",
                    "Relatively faster than CFA"
                ],
                cons: [
                    "Narrower focus than CFA",
                    "Requires 2 years of work-ex for full certification"
                ],
                roi: "High - Ideal for risk analyst and treasury roles."
            },
            {
                name: "FMVA (Financial Modeling & Valuation Analyst)",
                provider: "CFI",
                level: "Intermediate",
                duration: "4-6 Months",
                pros: [
                    "Practical, hands-on skill building",
                    "Expertise in Excel and financial models",
                    "Industry-aligned curriculum"
                ],
                cons: [
                    "Less formal than CFA",
                    "Online-only perception in some traditional firms"
                ],
                roi: "High - Excellent for investment banking and equity research entry."
            }
        ]
    },
    {
        id: "marketing",
        title: "Marketing",
        emoji: "🚀",
        description: "Focus on brand management, consumer behavior, and marketing strategy.",
        certifications: [
            {
                name: "Google Digital Marketing & E-commerce",
                provider: "Google",
                level: "Beginner",
                duration: "3-6 Months",
                pros: [
                    "Practical knowledge of Google tools",
                    "Recognized by all startups/tech firms",
                    "Low cost/Free options available"
                ],
                cons: [
                    "Very basic for experienced marketers",
                    "Theoretical in some modules"
                ],
                roi: "Medium - Good for entry-level digital roles."
            },
            {
                name: "HubSpot Inbound Marketing",
                provider: "HubSpot",
                level: "Beginner",
                duration: "1-2 Weeks",
                pros: [
                    "Industry leader in inbound methodology",
                    "Free and quick to complete",
                    "Great for understanding customer journeys"
                ],
                cons: [
                    "Specific to HubSpot's ecosystem",
                    "Often seen as a 'baseline' rather than a differentiator"
                ],
                roi: "High (Time-wise) - Essential for content and inbound roles."
            },
            {
                name: "Professional Certified Marketer (PCM)",
                provider: "AMA",
                level: "Advanced",
                duration: "6+ Months",
                pros: [
                    "Credential from the top marketing body",
                    "Focuses on strategic marketing management",
                    "Solidifies academic MBA concepts"
                ],
                cons: [
                    "Expensive",
                    "Requires rigorous study"
                ],
                roi: "High - Great for long-term brand management careers."
            }
        ]
    },
    {
        id: "hr",
        title: "Human Resources",
        emoji: "🤝",
        description: "Focus on talent management, organizational behavior, and people analytics.",
        certifications: [
            {
                name: "SHRM-CP (Certified Professional)",
                provider: "SHRM",
                level: "Advanced",
                duration: "6-12 Months",
                pros: [
                    "Most globally recognized HR body",
                    "Strategic focus on business leadership",
                    "Networking opportunities"
                ],
                cons: [
                    "Tough eligibility criteria",
                    "High passing standards"
                ],
                roi: "Very High - Mandatory for senior HR roles in MNCs."
            },
            {
                name: "People Analytics Specialization",
                provider: "Wharton",
                level: "Intermediate",
                duration: "3-5 Months",
                pros: [
                    "Focus on the future of HR: Data",
                    "Wharton's prestigious name",
                    "High practical application in performance mgt"
                ],
                cons: [
                    "More academic than SHRM",
                    "Requires basic statistical interest"
                ],
                roi: "High - Differentiates you in a crowded HR market."
            }
        ]
    },
    {
        id: "operations",
        title: "Operations & SCM",
        emoji: "⚙️",
        description: "Focus on supply chain, logistics, and process optimization.",
        certifications: [
            {
                name: "Lean Six Sigma Black Belt",
                provider: "ASQ / IASSC",
                level: "Advanced",
                duration: "6-9 Months",
                pros: [
                    "Expertise in process perfection",
                    "Universal application across sectors",
                    "Significant salary premium"
                ],
                cons: [
                    "Requires project proof",
                    "Complex statistical tools"
                ],
                roi: "Excellent - Essential for manufacturing and operations heads."
            },
            {
                name: "CSCP (Supply Chain Professional)",
                provider: "ASCM (APICS)",
                level: "Advanced",
                duration: "1 Year",
                pros: [
                    "End-to-end supply chain mastery",
                    "Global industry standard",
                    "High demand in logistics and e-commerce"
                ],
                cons: [
                    "Very expensive",
                    "Requires prior experience"
                ],
                roi: "Very High - Best for global logistics roles."
            }
        ]
    },
    {
        id: "analytics",
        title: "Business Analytics",
        emoji: "📊",
        description: "Focus on data-driven decision making and business intelligence.",
        certifications: [
            {
                name: "Microsoft Certified: Power BI Data Analyst",
                provider: "Microsoft",
                level: "Intermediate",
                duration: "2-4 Months",
                pros: [
                    "Direct certification from the software provider",
                    "Exploding demand for Power BI skills",
                    "Practical exam"
                ],
                cons: [
                    "Tool-specific",
                    "Needs regular renewal"
                ],
                roi: "High - Immediate job readiness in data roles."
            },
            {
                name: "Google Data Analytics Professional",
                provider: "Google",
                level: "Beginner",
                duration: "6 Months",
                pros: [
                    "Hands-on with SQL, R, and Tableau",
                    "Complete case study inclusion",
                    "Great for career switchers"
                ],
                cons: [
                    "Foundational approach",
                    "Requires self-discipline"
                ],
                roi: "High - Perfect for first-time data analysts."
            }
        ]
    }
];
