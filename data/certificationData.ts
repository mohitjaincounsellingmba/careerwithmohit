export interface Certification {
    name: string;
    provider: string;
    level: "Beginner" | "Intermediate" | "Advanced";
    duration: string;
    pros: string[];
    cons: string[];
    roi: string;
}

export type CertificationCategory = "Management" | "Engineering" | "Computer Application" | "Designing";

export interface CertSpecialization {
    id: string;
    programId: "mba" | "pgdm" | "bba" | "btech" | "bca" | "mca" | "bdes" | "mdes";
    category: CertificationCategory;
    title: string;
    emoji: string;
    description: string;
    certifications: Certification[];
}

export const certificationData: CertSpecialization[] = [
    {
        id: "finance",
        programId: "mba",
        category: "Management",
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
        programId: "mba",
        category: "Management",
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
        programId: "mba",
        category: "Management",
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
        programId: "mba",
        category: "Management",
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
        programId: "mba",
        category: "Management",
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
    },
    // B.TECH DATA
    {
        id: "cs-it",
        programId: "btech",
        category: "Engineering",
        title: "Computer Science & IT",
        emoji: "💻",
        description: "Software engineering, Cloud computing, and Cybersecurity.",
        certifications: [
            {
                name: "AWS Certified Solutions Architect",
                provider: "Amazon Web Services",
                level: "Intermediate",
                duration: "2-3 Months",
                pros: [
                    "Industry leader in cloud services",
                    "Massive hiring demand globally",
                    "Comprehensive coverage of cloud infra"
                ],
                cons: [
                    "Exam is tricky and scenario-based",
                    "Cloud fees for practice can add up"
                ],
                roi: "Very High - Core for Cloud Engineer and Architect roles."
            },
            {
                name: "CompTIA Security+",
                provider: "CompTIA",
                level: "Beginner",
                duration: "1-2 Months",
                pros: [
                    "Vendor-neutral security foundation",
                    "Recognized by government and defense agencies",
                    "Entry point for Cyber Security careers"
                ],
                cons: [
                    "Theoretical knowledge only",
                    "Needs to be refreshed every 3 years"
                ],
                roi: "High - Essential for SOC Analyst and Security roles."
            }
        ]
    },
    {
        id: "ece",
        programId: "btech",
        category: "Engineering",
        title: "Electronics & Communication",
        emoji: "📡",
        description: "VLSI, Embedded Systems, and IoT.",
        certifications: [
            {
                name: "VLSI Design & Verification",
                provider: "Maven Silicon / Synopsys",
                level: "Advanced",
                duration: "6 Months",
                pros: [
                    "Gateway to core companies like Intel/Qualcomm",
                    "Deep dive into Verilog/SystemVerilog",
                    "High starting salaries in core hardware"
                ],
                cons: [
                    "Very steep learning curve",
                    "Expensive training costs"
                ],
                roi: "Very High - Essential for core hardware design roles."
            }
        ]
    },
    {
        id: "mechanical",
        programId: "btech",
        category: "Engineering",
        title: "Mechanical Engineering",
        emoji: "🔧",
        description: "CAD/CAM, Robotics, and Quality Control.",
        certifications: [
            {
                name: "CSWP (SolidWorks Professional)",
                provider: "Dassault Systèmes",
                level: "Intermediate",
                duration: "1-2 Months",
                pros: [
                    "Gold standard for 3D modeling",
                    "Practical certification exam",
                    "Valued in Automotive & Aerospace"
                ],
                cons: [
                    "Hardware requirements for SolidWorks",
                    "Subscription cost for software"
                ],
                roi: "High - Standard for Design Engineer roles."
            }
        ]
    },
    {
        id: "civil",
        programId: "btech",
        category: "Engineering",
        title: "Civil Engineering",
        emoji: "🏗️",
        description: "Structural design, BIM, and Project Management.",
        certifications: [
            {
                name: "Autodesk Revit Certification",
                provider: "Autodesk",
                level: "Intermediate",
                duration: "2-3 Months",
                pros: [
                    "Leader in BIM (Building Information Modeling)",
                    "Mandatory for international projects",
                    "Increases efficiency in design"
                ],
                cons: [
                    "Complex tool with many modules",
                    "Requires high-end PC"
                ],
                roi: "High - Essential for modern structural design."
            }
        ]
    },
    {
        id: "electrical",
        programId: "btech",
        category: "Engineering",
        title: "Electrical Engineering",
        emoji: "⚡",
        description: "Power systems, Automation, and Smart Grids.",
        certifications: [
            {
                name: "PLC & SCADA Programmer",
                provider: "Schneider / Siemens / Rockwell",
                level: "Intermediate",
                duration: "3-4 Months",
                pros: [
                    "Critical for Industrial Automation",
                    "High demand in manufacturing plants",
                    "Hands-on logic programming"
                ],
                cons: [
                    "Requires lab access for hardware",
                    "Different vendors have different languages"
                ],
                roi: "High - Leads to Automation Engineer roles."
            }
        ]
    },
    // MANAGEMENT - BBA
    {
        id: "bba-gen",
        programId: "bba",
        category: "Management",
        title: "BBA General / Marketing",
        emoji: "📈",
        description: "Foundational marketing and business management for undergraduates.",
        certifications: [
            {
                name: "Google Digital Marketing Certificate",
                provider: "Google",
                level: "Beginner",
                duration: "3-6 Months",
                pros: ["Great for beginners", "Practical labs", "Free on Coursera (Financial Aid available)"],
                cons: ["Very basic", "Theory-heavy"],
                roi: "Medium - Good for first internship."
            }
        ]
    },
    // COMPUTER APPLICATION - BCA & MCA
    {
        id: "bca-web",
        programId: "bca",
        category: "Computer Application",
        title: "Web Development",
        emoji: "🌐",
        description: "Full-stack development for BCA students.",
        certifications: [
            {
                name: "Meta Front-End Developer",
                provider: "Meta",
                level: "Beginner",
                duration: "4-6 Months",
                pros: ["Focus on React", "Industry-aligned projects", "Meta-certified badge"],
                cons: ["Monthly subscription", "Requires strong JS basics"],
                roi: "High - Standard for Junior Web Dev roles."
            }
        ]
    },
    {
        id: "mca-devops",
        programId: "mca",
        category: "Computer Application",
        title: "DevOps & Cloud",
        emoji: "☁️",
        description: "Advanced infrastructure and automation for MCA graduates.",
        certifications: [
            {
                name: "Certified Kubernetes Administrator (CKA)",
                provider: "Cloud Native Computing Foundation",
                level: "Advanced",
                duration: "2-3 Months",
                pros: ["Performance-based exam", "Highest industry value", "Global recognition"],
                cons: ["Very hard", "Expensive ($395)"],
                roi: "Very High - Mandatory for DevOps Architects."
            }
        ]
    },
    // DESIGNING - B.DES & M.DES
    {
        id: "bdes-uiux",
        programId: "bdes",
        category: "Designing",
        title: "UI/UX Design",
        emoji: "🎨",
        description: "User Interface and Experience design foundation.",
        certifications: [
            {
                name: "Google UX Design Professional",
                provider: "Google",
                level: "Beginner",
                duration: "6 Months",
                pros: ["Complete portfolio creation", "Figma training included", "Beginner-friendly"],
                cons: ["Lengthy", "Self-paced can be slow"],
                roi: "High - Best for entry-level UI/UX designers."
            }
        ]
    },
    {
        id: "mdes-design-thinking",
        programId: "mdes",
        category: "Designing",
        title: "Strategic Design & Thinking",
        emoji: "🧠",
        description: "Advanced design strategy for leadership roles.",
        certifications: [
            {
                name: "Design Thinking: From Insights to Viability",
                provider: "IDEO U",
                level: "Advanced",
                duration: "5 Weeks",
                pros: ["Learn from IDEO founders", "Hands-on collaboration", "Focus on business value"],
                cons: ["Very expensive", "Fast-paced"],
                roi: "High - For Product Managers and Design Leads."
            }
        ]
    }
];
