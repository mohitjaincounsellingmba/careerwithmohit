export type ResumeGoal = "internship" | "fresher" | "professional";

export interface ResumeData {
    goal: ResumeGoal;
    personal: {
        fullName: string;
        targetRole: string;
        email: string;
        phone: string;
        location: string;
        linkedin: string;
        githubOrPortfolio: string;
    };
    summary: string;
    experience: {
        id: string;
        role: string;
        company: string;
        location: string;
        startDate: string;
        endDate: string;
        current: boolean;
        bullets: string[];
    }[];
    education: {
        id: string;
        degree: string;
        institution: string;
        location: string;
        startYear: string;
        endYear: string;
        grade: string;
    }[];
    projects: {
        id: string;
        title: string;
        techStack: string;
        link: string;
        description: string;
    }[];
    skills: {
        technical: string[];
        tools: string[];
        soft: string[];
    };
    certifications: {
        id: string;
        name: string;
        issuer: string;
        year: string;
    }[];
}

export interface ResumeTemplate {
    id: string;
    name: string;
    category: ResumeGoal;
    layoutType: "minimal" | "classic" | "modern" | "sidebar" | "executive" | "tech" | "compact";
    accentColor: string;
    fontStyle: "sans" | "serif" | "mono";
    description: string;
    badge: string;
}

export const RESUME_TEMPLATES: ResumeTemplate[] = [
    // ── 1. INTERNSHIP TEMPLATES (10) ──────────────────────────────────────
    {
        id: "intern-tech-minimal",
        name: "Campus Tech Minimal",
        category: "internship",
        layoutType: "tech",
        accentColor: "#0284c7", // sky-600
        fontStyle: "sans",
        description: "Prioritizes GitHub projects, hackathons, and technical coursework for summer SDE/Tech internships.",
        badge: "Top SDE Pick",
    },
    {
        id: "intern-scholar-classic",
        name: "Modern Scholar Classic",
        category: "internship",
        layoutType: "classic",
        accentColor: "#1e3a8a", // blue-900
        fontStyle: "serif",
        description: "Ivy League academic styling highlighting university GPA, coursework, and research papers.",
        badge: "Ivy League",
    },
    {
        id: "intern-campus-leader",
        name: "Campus Leader & Societies",
        category: "internship",
        layoutType: "modern",
        accentColor: "#059669", // emerald-600
        fontStyle: "sans",
        description: "Designed for business, marketing, and student club leads showcasing event execution.",
        badge: "Leadership",
    },
    {
        id: "intern-junior-sde",
        name: "Junior Developer Terminal",
        category: "internship",
        layoutType: "tech",
        accentColor: "#0f172a", // slate-900
        fontStyle: "mono",
        description: "High ATS compatibility for software engineering internships, open-source commits, and DSA.",
        badge: "100% ATS Safe",
    },
    {
        id: "intern-research-lab",
        name: "University Research Lab",
        category: "internship",
        layoutType: "classic",
        accentColor: "#475569", // slate-600
        fontStyle: "serif",
        description: "Structured for research fellowships, scientific journals, and laboratory assistant positions.",
        badge: "Academic",
    },
    {
        id: "intern-creative-clean",
        name: "Creative & Design Intern",
        category: "internship",
        layoutType: "modern",
        accentColor: "#7c3aed", // violet-600
        fontStyle: "sans",
        description: "Clean aesthetic with prominent Behance/Figma portfolio links for UI/UX and product interns.",
        badge: "Design",
    },
    {
        id: "intern-startup-hustler",
        name: "Early-Stage Startup Hustle",
        category: "internship",
        layoutType: "compact",
        accentColor: "#ea580c", // orange-600
        fontStyle: "sans",
        description: "Fast-scanning bullet points emphasizing zero-to-one problem solving and growth hacking.",
        badge: "Fast Track",
    },
    {
        id: "intern-analytics-trainee",
        name: "Business Analyst Trainee",
        category: "internship",
        layoutType: "sidebar",
        accentColor: "#0d9488", // teal-600
        fontStyle: "sans",
        description: "Split layout showcasing SQL, Excel, Tableau tools alongside academic case studies.",
        badge: "Analytics",
    },
    {
        id: "intern-one-page-density",
        name: "Compact One-Pager",
        category: "internship",
        layoutType: "compact",
        accentColor: "#334155", // slate-700
        fontStyle: "sans",
        description: "High-density single-page template tailored for students with 0–1 year of co-op experience.",
        badge: "Zero Fluff",
    },
    {
        id: "intern-engineering-core",
        name: "Core Engineering Co-op",
        category: "internship",
        layoutType: "minimal",
        accentColor: "#b45309", // amber-700
        fontStyle: "sans",
        description: "Specialized for Mechanical, Civil, Electrical, and Electronics hardware industrial trainees.",
        badge: "Core Engg",
    },

    // ── 2. FRESHER PLACEMENT TEMPLATES (10) ──────────────────────────────
    {
        id: "fresher-big4-trainee",
        name: "Big 4 Corporate Trainee",
        category: "fresher",
        layoutType: "classic",
        accentColor: "#0f172a", // slate-900
        fontStyle: "serif",
        description: "Tailored for Deloitte, PwC, EY, KPMG fresher hiring in audit, risk advisory, and tax.",
        badge: "Big 4 Standard",
    },
    {
        id: "fresher-faang-sde1",
        name: "FAANG SDE-1 Minimalist",
        category: "fresher",
        layoutType: "minimal",
        accentColor: "#000000",
        fontStyle: "sans",
        description: "Zero styling distractions, 100% ATS parser compliant for Amazon, Google, and Microsoft.",
        badge: "Maximum ATS",
    },
    {
        id: "fresher-product-associate",
        name: "Associate Product Manager",
        category: "fresher",
        layoutType: "modern",
        accentColor: "#2563eb", // blue-600
        fontStyle: "sans",
        description: "Highlights user stories, feature rollouts, wireframing tools, and analytical mindset.",
        badge: "APM Track",
    },
    {
        id: "fresher-investment-analyst",
        name: "Investment Banking Analyst",
        category: "fresher",
        layoutType: "classic",
        accentColor: "#1e293b",
        fontStyle: "serif",
        description: "Formal structure highlighting DCF valuation, Bloomberg, CFA level 1, and balance sheet analysis.",
        badge: "Finance High-CTC",
    },
    {
        id: "fresher-growth-marketing",
        name: "Digital Growth & Media",
        category: "fresher",
        layoutType: "modern",
        accentColor: "#e11d48", // rose-600
        fontStyle: "sans",
        description: "Clean metrics-focused layout for Performance Marketing, SEO, and Social Media roles.",
        badge: "Growth Marketing",
    },
    {
        id: "fresher-strategy-consultant",
        name: "Management Consulting Associate",
        category: "fresher",
        layoutType: "executive",
        accentColor: "#1d4ed8", // blue-700
        fontStyle: "serif",
        description: "Structure inspired by McKinsey & BCG campus presentations with MECE bullet frameworks.",
        badge: "Consulting",
    },
    {
        id: "fresher-data-scientist",
        name: "Data Science & AI Fresher",
        category: "fresher",
        layoutType: "tech",
        accentColor: "#0891b2", // cyan-600
        fontStyle: "sans",
        description: "Features Kaggle achievements, model accuracy metrics, Python libraries, and cloud deployments.",
        badge: "AI / Data",
    },
    {
        id: "fresher-monochrome-pro",
        name: "High-Contrast Monochrome",
        category: "fresher",
        layoutType: "minimal",
        accentColor: "#18181b", // zinc-900
        fontStyle: "sans",
        description: "Crisp black and white divider hierarchy designed for clean scanning by human HRs and robots.",
        badge: "Clean Scan",
    },
    {
        id: "fresher-hr-operations",
        name: "Corporate HR Trainee",
        category: "fresher",
        layoutType: "modern",
        accentColor: "#0d9488",
        fontStyle: "sans",
        description: "Highlights HRIS tools, campus recruitment drives, labor compliance, and talent sourcing.",
        badge: "HR & People",
    },
    {
        id: "fresher-operations-scm",
        name: "Operations & Supply Chain",
        category: "fresher",
        layoutType: "compact",
        accentColor: "#c2410c",
        fontStyle: "sans",
        description: "Six Sigma Green Belt, warehouse logistics, vendor management, and cost-reduction focus.",
        badge: "Operations",
    },

    // ── 3. WORKING PROFESSIONAL TEMPLATES (10) ────────────────────────────
    {
        id: "pro-harvard-ats",
        name: "Harvard Business Review ATS",
        category: "professional",
        layoutType: "classic",
        accentColor: "#000000",
        fontStyle: "serif",
        description: "The gold standard executive template used by top MBA alumni and Fortune 500 directors.",
        badge: "Executive Standard",
    },
    {
        id: "pro-tech-architect",
        name: "Principal SDE & Architect",
        category: "professional",
        layoutType: "tech",
        accentColor: "#0f766e",
        fontStyle: "sans",
        description: "Emphasizes distributed systems, million-QPS scale, cloud cost reduction, and engineering leadership.",
        badge: "Tech Architect",
    },
    {
        id: "pro-business-growth",
        name: "P&L Growth & Strategy Leader",
        category: "professional",
        layoutType: "executive",
        accentColor: "#1e3a8a",
        fontStyle: "sans",
        description: "Focuses on EBITDA expansion, ARR scaling, team building, and multi-market enterprise sales.",
        badge: "P&L Leader",
    },
    {
        id: "pro-eng-manager",
        name: "Engineering Manager (VPE)",
        category: "professional",
        layoutType: "modern",
        accentColor: "#334155",
        fontStyle: "sans",
        description: "Demonstrates sprint velocity, retention metrics, team scaling, and cross-border delivery.",
        badge: "Eng Leadership",
    },
    {
        id: "pro-vp-director",
        name: "VP & C-Suite Executive",
        category: "professional",
        layoutType: "executive",
        accentColor: "#09090b",
        fontStyle: "serif",
        description: "Includes an authoritative Executive Summary, governance track record, and board advisory roles.",
        badge: "C-Suite",
    },
    {
        id: "pro-fintech-quant",
        name: "FinTech & Quant Portfolio",
        category: "professional",
        layoutType: "sidebar",
        accentColor: "#15803d",
        fontStyle: "sans",
        description: "Structured for hedge funds, algorithmic trading, risk management, and quantitative research.",
        badge: "FinTech Quant",
    },
    {
        id: "pro-global-consultant",
        name: "Global Practice Principal",
        category: "professional",
        layoutType: "classic",
        accentColor: "#1d4ed8",
        fontStyle: "serif",
        description: "Designed for McKinsey, BCG, Bain, and Accenture strategy principals handling global accounts.",
        badge: "Global Partner",
    },
    {
        id: "pro-senior-pm",
        name: "Senior Product Manager / GPM",
        category: "professional",
        layoutType: "modern",
        accentColor: "#6366f1",
        fontStyle: "sans",
        description: "Showcases North Star retention, $10M+ product lines, experimentation engines, and UX impact.",
        badge: "GPM / Lead PM",
    },
    {
        id: "pro-general-counsel",
        name: "General Counsel & Legal Head",
        category: "professional",
        layoutType: "classic",
        accentColor: "#451a03",
        fontStyle: "serif",
        description: "Highlights cross-border M&A transactions, regulatory risk compliance, IP, and litigation wins.",
        badge: "Legal Counsel",
    },
    {
        id: "pro-split-executive",
        name: "Modern Split Executive",
        category: "professional",
        layoutType: "sidebar",
        accentColor: "#0f172a",
        fontStyle: "sans",
        description: "Two-column design balancing deep career timeline with core competencies and advisory boards.",
        badge: "Modern Split",
    },
];

// ── Default Profiles for 1-Click Fill ────────────────────────────────────

export const DEFAULT_PROFILES: Record<ResumeGoal, ResumeData> = {
    internship: {
        goal: "internship",
        personal: {
            fullName: "Aarav Mehra",
            targetRole: "Software Engineering Intern / Tech Fellow",
            email: "aarav.mehra@college.edu",
            phone: "+91 98765 43210",
            location: "Bangalore / Remote",
            linkedin: "linkedin.com/in/aarav-mehra-tech",
            githubOrPortfolio: "github.com/aaravmehra",
        },
        summary: "3rd-year Computer Science undergraduate with hands-on full-stack development experience, 200+ solved LeetCode problems, and top 5% finish at Smart India Hackathon. Passionate about building high-performance web applications and cloud APIs.",
        experience: [
            {
                id: "exp-1",
                role: "Web Development Intern",
                company: "NexGen Labs",
                location: "Bangalore (Hybrid)",
                startDate: "Jun 2025",
                endDate: "Aug 2025",
                current: false,
                bullets: [
                    "Engineered 4 responsive React/Next.js client portals, boosting mobile page speed scores by 38%.",
                    "Integrated RESTful microservices with Node.js and PostgreSQL, processing 15,000+ daily mock API requests.",
                    "Collaborated in a 5-member Agile pod using Jira and Git, reducing PR review cycles from 48 to 18 hours."
                ]
            }
        ],
        education: [
            {
                id: "edu-1",
                degree: "B.Tech in Computer Science & Engineering",
                institution: "National Institute of Technology (NIT)",
                location: "Karnataka, India",
                startYear: "2023",
                endYear: "2027",
                grade: "CGPA: 8.8 / 10.0"
            }
        ],
        projects: [
            {
                id: "proj-1",
                title: "AI-Powered Smart Career Advisor",
                techStack: "Next.js 15, TypeScript, Python FastAPI, OpenAI API, Tailwind CSS",
                link: "github.com/aaravmehra/career-ai",
                description: "Built an end-to-end career guidance platform utilized by 1,200+ peer students with real-time course recommendations and 94% user satisfaction rating."
            },
            {
                id: "proj-2",
                title: "Distributed Peer-to-Peer Task Scheduler",
                techStack: "Go, Docker, Redis, gRPC",
                link: "github.com/aaravmehra/distributed-queue",
                description: "Architected a concurrent job queue capable of processing 10,000 tasks/sec with fault tolerance and sub-5ms worker latency."
            }
        ],
        skills: {
            technical: ["Python", "JavaScript / TypeScript", "React.js", "Next.js", "Node.js", "SQL", "Data Structures & Algorithms"],
            tools: ["Git & GitHub", "Docker", "Postman", "Linux", "VS Code", "Vercel"],
            soft: ["Problem Solving", "Rapid Prototyping", "Team Collaboration", "Clear Technical Communication"]
        },
        certifications: [
            {
                id: "cert-1",
                name: "AWS Certified Cloud Practitioner",
                issuer: "Amazon Web Services",
                year: "2025"
            },
            {
                id: "cert-2",
                name: "Meta Front-End Developer Professional Certificate",
                issuer: "Coursera / Meta",
                year: "2024"
            }
        ]
    },

    fresher: {
        goal: "fresher",
        personal: {
            fullName: "Pooja Sharma",
            targetRole: "Management Trainee / Financial Analyst",
            email: "pooja.sharma@alumni.mba.in",
            phone: "+91 99887 76655",
            location: "Mumbai / Delhi NCR",
            linkedin: "linkedin.com/in/pooja-sharma-finance",
            githubOrPortfolio: "pooja-finance-portfolio.com",
        },
        summary: "MBA in Finance & Strategic Management graduate with dual academic honors and hands-on corporate finance internship at a Tier-1 NBFC. Proficient in Discounted Cash Flow (DCF) modeling, SAP FICO, Bloomberg Terminal, and corporate valuation. Seeking an entry-level analyst position at a high-growth investment or consulting firm.",
        experience: [
            {
                id: "exp-1",
                role: "Corporate Finance & M&A Intern",
                company: "Tata Capital Financial Services",
                location: "Mumbai, India",
                startDate: "May 2025",
                endDate: "Jul 2025",
                current: false,
                bullets: [
                    "Constructed 3-statement financial models and sensitivity analyses for 3 prospective ₹50Cr+ mid-market equity acquisitions.",
                    "Analyzed historical balance sheets and debt covenants across 14 competing logistics firms, uncovering ₹8.4Cr in potential cost synergies.",
                    "Presented weekly investment memorandums to 4 Senior Vice Presidents, securing buy-in for 2 pilot syndication deals."
                ]
            },
            {
                id: "exp-2",
                role: "Financial Research Trainee",
                company: "HDFC Securities",
                location: "Pune, India",
                startDate: "Jan 2024",
                endDate: "Apr 2024",
                current: false,
                bullets: [
                    "Published 6 equity research notes covering the Indian FMCG sector, achieving 84% target price accuracy over a 6-month tracking window.",
                    "Automated daily portfolio NAV reporting using Advanced Excel VBA macros, saving 12 analyst hours weekly."
                ]
            }
        ],
        education: [
            {
                id: "edu-1",
                degree: "Master of Business Administration (MBA) - Finance",
                institution: "Symbiosis Institute of Business Management (SIBM)",
                location: "Pune, India",
                startYear: "2024",
                endYear: "2026",
                grade: "CGPA: 8.6 / 10.0 (Top 10% of Batch)"
            },
            {
                id: "edu-2",
                degree: "Bachelor of Commerce (Honours)",
                institution: "Delhi University (SRCC / Hansraj)",
                location: "New Delhi, India",
                startYear: "2021",
                endYear: "2024",
                grade: "88.4% First Class with Distinction"
            }
        ],
        projects: [
            {
                id: "proj-1",
                title: "FinTech Disruption & UPI Monetization Capstone",
                techStack: "Financial Modeling, Power BI, Python for Finance, Statista",
                link: "bit.ly/fintech-monetization-study",
                description: "Evaluated interchange fees and credit card alternatives across 8 leading Indian payment gateways; awarded Best Academic Project 2025."
            }
        ],
        skills: {
            technical: ["Financial Modeling & Valuation", "DCF & LBO Modeling", "Equity Research", "Financial Statement Analysis", "Portfolio Management"],
            tools: ["Bloomberg Terminal", "Advanced Excel & VBA", "Power BI", "SAP FICO", "Tableau", "SPSS"],
            soft: ["Executive Presentation", "Cross-Functional Leadership", "Stakeholder Management", "High-Stakes Negotiation"]
        },
        certifications: [
            {
                id: "cert-1",
                name: "CFA Program Level 1 Candidate",
                issuer: "CFA Institute",
                year: "2025"
            },
            {
                id: "cert-2",
                name: "Financial Modeling & Valuation Analyst (FMVA)",
                issuer: "Corporate Finance Institute (CFI)",
                year: "2024"
            }
        ]
    },

    professional: {
        goal: "professional",
        personal: {
            fullName: "Vikramaditya Rao",
            targetRole: "Senior Product Manager / Head of Product",
            email: "vikram.rao@executivepm.com",
            phone: "+91 98111 22334",
            location: "Bangalore, India (Open to Relocation)",
            linkedin: "linkedin.com/in/vikram-rao-pm",
            githubOrPortfolio: "vikramrao.design/portfolio",
        },
        summary: "Results-driven Senior Product Manager with 6+ years of experience scaling B2B SaaS and consumer FinTech platforms from ₹0 to ₹45Cr ARR. Proven track record of spearheading cross-functional teams of 22+ engineers, data scientists, and designers. Reduced churn by 24% and lifted checkout conversion by 36% through data-driven A/B testing and customer discovery.",
        experience: [
            {
                id: "exp-1",
                role: "Senior Product Manager",
                company: "Razorpay / Innovate Fintech",
                location: "Bangalore, India",
                startDate: "Aug 2023",
                endDate: "Present",
                current: true,
                bullets: [
                    "Spearheaded the zero-to-one launch of an automated B2B vendor payouts engine, scaling payment volume to ₹120Cr monthly within 14 months.",
                    "Pioneered machine-learning-driven fraud scoring algorithms that lowered chargeback dispute rates by 42% while retaining 99.8% approval speed.",
                    "Managed a team of 14 engineers, 3 designers, and 2 product analysts, boosting team quarterly sprint completion rate from 72% to 94%."
                ]
            },
            {
                id: "exp-2",
                role: "Product Manager - Growth & Retention",
                company: "Swiggy / Bundl Technologies",
                location: "Bangalore, India",
                startDate: "Jul 2021",
                endDate: "Jul 2023",
                current: false,
                bullets: [
                    "Owned the loyalty membership checkout funnel, executing 40+ iterative A/B experiments that boosted 30-day recurring user retention by 28%.",
                    "Integrated personalized dynamic cart upsells, generating an incremental ₹18.5Cr in annualized gross merchandising volume (GMV).",
                    "Redesigned the cross-platform onboarding UX across iOS and Android, decreasing bounce rate on the address verification screen by 35%."
                ]
            },
            {
                id: "exp-3",
                role: "Associate Product Manager",
                company: "CleverTap",
                location: "Mumbai, India",
                startDate: "Jun 2019",
                endDate: "Jun 2021",
                current: false,
                bullets: [
                    "Authored 50+ detailed PRDs, system architecture diagrams, and release notes for analytics telemetry pipelines.",
                    "Collaborated with enterprise customer success directors to onboard 85+ enterprise brands including Domino's and SonyLIV."
                ]
            }
        ],
        education: [
            {
                id: "edu-1",
                degree: "Master of Business Administration (MBA)",
                institution: "Indian Institute of Management (IIM Lucknow)",
                location: "Lucknow, India",
                startYear: "2017",
                endYear: "2019",
                grade: "Dean's Merit List"
            },
            {
                id: "edu-2",
                degree: "B.Tech in Information Technology",
                institution: "Delhi Technological University (DTU)",
                location: "New Delhi, India",
                startYear: "2013",
                endYear: "2017",
                grade: "First Class with Distinction"
            }
        ],
        projects: [
            {
                id: "proj-1",
                title: "AI-Driven Customer Churn Prediction Engine",
                techStack: "Mixpanel, Amplitude, SQL, Python, XGBoost, Segment",
                link: "vikramrao.design/case-study-churn",
                description: "Built a predictive churn model identifying enterprise at-risk accounts 45 days in advance, preserving ₹6.2Cr in annual ARR."
            }
        ],
        skills: {
            technical: ["Product Strategy & Roadmapping", "A/B Testing & Experimentation", "Go-To-Market (GTM) Strategy", "SQL & Product Analytics", "API Architecture"],
            tools: ["Jira & Confluence", "Amplitude", "Mixpanel", "Figma", "Segment", "Tableau", "Postman"],
            soft: ["Executive Leadership", "Cross-Functional Orchestration", "Stakeholder Buy-In", "P&L Ownership"]
        },
        certifications: [
            {
                id: "cert-1",
                name: "Certified Scrum Product Owner (CSPO)",
                issuer: "Scrum Alliance",
                year: "2023"
            },
            {
                id: "cert-2",
                name: "Reforge Product Strategy & Growth Series",
                issuer: "Reforge",
                year: "2022"
            }
        ]
    }
};

// ── Dynamic Active Hiring Companies ──────────────────────────────────────

export interface HiringJob {
    id: string;
    company: string;
    role: string;
    category: ResumeGoal;
    tags: string[];
    salaryOrStipend: string;
    location: string;
    type: "Full-Time" | "Internship" | "Contract";
    experience: string;
    applyUrl: string;
}

export const ACTIVE_HIRING_COMPANIES: HiringJob[] = [
    // Internship Openings
    {
        id: "job-1",
        company: "Google India",
        role: "Software Engineering Summer Intern 2026",
        category: "internship",
        tags: ["C++", "Python", "Data Structures", "Algorithms"],
        salaryOrStipend: "₹1,10,000 / month",
        location: "Bangalore / Hyderabad",
        type: "Internship",
        experience: "College Undergrads (2026/2027)",
        applyUrl: "https://careers.google.com",
    },
    {
        id: "job-2",
        company: "Microsoft",
        role: "Software Developer Intern",
        category: "internship",
        tags: ["Java", "React", "Cloud Azure", "Git"],
        salaryOrStipend: "₹95,000 / month",
        location: "Hyderabad / Noida",
        type: "Internship",
        experience: "B.Tech / MCA Students",
        applyUrl: "https://careers.microsoft.com",
    },
    {
        id: "job-3",
        company: "Goldman Sachs",
        role: "Summer Financial Analyst Intern",
        category: "internship",
        tags: ["Financial Modeling", "Excel", "Accounting", "DCF"],
        salaryOrStipend: "₹85,000 / month",
        location: "Bangalore, India",
        type: "Internship",
        experience: "MBA / B.Com / Eco Pre-Final",
        applyUrl: "https://goldmansachs.com/careers",
    },
    {
        id: "job-4",
        company: "Amazon Web Services",
        role: "Cloud Solutions Architecture Intern",
        category: "internship",
        tags: ["AWS", "Linux", "Networking", "Python"],
        salaryOrStipend: "₹80,000 / month",
        location: "Bangalore / Remote",
        type: "Internship",
        experience: "Engineering / BCA Undergrads",
        applyUrl: "https://amazon.jobs",
    },
    {
        id: "job-5",
        company: "Swiggy",
        role: "Product Growth & Analytics Intern",
        category: "internship",
        tags: ["SQL", "Tableau", "Excel", "Product Discovery"],
        salaryOrStipend: "₹45,000 / month",
        location: "Bangalore, India",
        type: "Internship",
        experience: "Any Degree Undergrad",
        applyUrl: "https://swiggy.careers",
    },

    // Fresher Openings
    {
        id: "job-6",
        company: "Deloitte US-India",
        role: "Associate Analyst - Strategic Advisory",
        category: "fresher",
        tags: ["Business Analysis", "Power BI", "Excel", "Consulting"],
        salaryOrStipend: "₹8.5 – 12.0 LPA",
        location: "Hyderabad / Mumbai / Gurgaon",
        type: "Full-Time",
        experience: "Freshers (0–1 Year)",
        applyUrl: "https://deloitte.com/careers",
    },
    {
        id: "job-7",
        company: "Flipkart",
        role: "Associate Software Engineer (SDE-1)",
        category: "fresher",
        tags: ["Java", "System Design", "Spring Boot", "Kafka"],
        salaryOrStipend: "₹18.0 – 26.0 LPA",
        location: "Bangalore, India",
        type: "Full-Time",
        experience: "Fresh B.Tech / MCA",
        applyUrl: "https://flipkartcareers.com",
    },
    {
        id: "job-8",
        company: "McKinsey & Company",
        role: "Junior Research & Business Analyst",
        category: "fresher",
        tags: ["Market Research", "Financial Analysis", "Strategy"],
        salaryOrStipend: "₹14.0 – 20.0 LPA",
        location: "Gurgaon / Mumbai",
        type: "Full-Time",
        experience: "Fresh MBA / Engineering",
        applyUrl: "https://mckinsey.com/careers",
    },
    {
        id: "job-9",
        company: "ICICI Bank",
        role: "Management Trainee (MT) - Wholesale Banking",
        category: "fresher",
        tags: ["Credit Appraisal", "Treasury", "Risk", "Banking"],
        salaryOrStipend: "₹12.0 – 16.5 LPA",
        location: "Mumbai / Delhi / Pan-India",
        type: "Full-Time",
        experience: "MBA / PGDM 2026/2027",
        applyUrl: "https://icicicareers.com",
    },
    {
        id: "job-10",
        company: "JPMorgan Chase & Co.",
        role: "Corporate Analyst Development Program (CADP)",
        category: "fresher",
        tags: ["Financial Operations", "Python", "Data Analysis"],
        salaryOrStipend: "₹13.5 – 18.0 LPA",
        location: "Mumbai / Bangalore",
        type: "Full-Time",
        experience: "Freshers (0–1 Year)",
        applyUrl: "https://jpmorganchase.com/careers",
    },

    // Working Professional Openings
    {
        id: "job-11",
        company: "CRED",
        role: "Senior Backend Engineer (Payments)",
        category: "professional",
        tags: ["Go", "Distributed Systems", "PostgreSQL", "AWS"],
        salaryOrStipend: "₹42.0 – 65.0 LPA + ESOPs",
        location: "Bangalore (In-Office)",
        type: "Full-Time",
        experience: "3–6 Years",
        applyUrl: "https://careers.cred.club",
    },
    {
        id: "job-12",
        company: "Zomato",
        role: "Lead Product Manager - Dining & Nightlife",
        category: "professional",
        tags: ["Product Strategy", "P&L Management", "UX", "SQL"],
        salaryOrStipend: "₹38.0 – 55.0 LPA",
        location: "Gurgaon, India",
        type: "Full-Time",
        experience: "4–8 Years",
        applyUrl: "https://zomato.com/careers",
    },
    {
        id: "job-13",
        company: "Razorpay",
        role: "Director / Principal Product Architect",
        category: "professional",
        tags: ["FinTech", "Scalability", "Microservices", "Leadership"],
        salaryOrStipend: "₹60.0 – 90.0 LPA + Stock",
        location: "Bangalore, India",
        type: "Full-Time",
        experience: "7–12+ Years",
        applyUrl: "https://razorpay.com/jobs",
    },
    {
        id: "job-14",
        company: "Bain & Company",
        role: "Consultant / Case Team Leader",
        category: "professional",
        tags: ["Corporate Strategy", "M&A Diligence", "Due Diligence"],
        salaryOrStipend: "₹35.0 – 50.0 LPA",
        location: "New Delhi / Mumbai",
        type: "Full-Time",
        experience: "3–7 Years",
        applyUrl: "https://bain.com/careers",
    },
    {
        id: "job-15",
        company: "Shardul Amarchand Mangaldas & Co",
        role: "Senior Corporate Associate (M&A)",
        category: "professional",
        tags: ["Corporate Law", "Cross-Border Transactions", "PE/VC"],
        salaryOrStipend: "₹24.0 – 36.0 LPA",
        location: "New Delhi / Mumbai",
        type: "Full-Time",
        experience: "3–6 Years (LLB/LLM)",
        applyUrl: "https://amsshardul.com/careers",
    },
];

// ── Action Verbs & ATS Power Keywords ────────────────────────────────────

export const ATS_POWER_VERBS = [
    "Spearheaded", "Architected", "Engineered", "Orchestrated", "Accelerated",
    "Maximized", "Pioneered", "Automated", "Generated", "Revamped",
    "Negotiated", "Streamlined", "Constructed", "Formulated", "Supervised",
    "Benchmarked", "Decreased", "Expanded", "Standardized", "Optimized"
];
