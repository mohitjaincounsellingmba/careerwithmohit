export interface RoadmapSpecialization {
    id: string;
    title: string;
    emoji: string;
    description: string;
    skills: { name: string; type: "technical" | "soft" }[];
    certifications: { name: string; provider: string; level: "beginner" | "intermediate" | "advanced" }[];
    companies: { name: string; sector: string }[];
    careerPaths: { role: string; avgSalary: string }[];
}

export type ProgramId = 
    | "mba" 
    | "pgdm" 
    | "bba" 
    | "btech" 
    | "bcom" 
    | "bca" 
    | "mca" 
    | "ba" 
    | "ma" 
    | "llb" 
    | "llm";

export interface RoadmapProgram {
    id: ProgramId;
    title: string;
    shortName: string;
    badge: string;
    level: "Post-Graduate" | "Undergraduate" | "Professional Law";
    emoji: string;
    description: string;
    specializations: RoadmapSpecialization[];
}

export const roadmapData: RoadmapProgram[] = [
    // ── 1. MBA ────────────────────────────────────────────────────────────
    {
        id: "mba",
        title: "MBA (Master of Business Administration)",
        shortName: "MBA",
        badge: "Post-Graduate • 2 Years",
        level: "Post-Graduate",
        emoji: "🎓",
        description: "Master strategic leadership, corporate finance, marketing, and cross-functional operations.",
        specializations: [
            {
                id: "finance",
                title: "Finance & Investment Banking",
                emoji: "💰",
                description: "Master capital markets, corporate valuation, mergers & acquisitions, and treasury management.",
                skills: [
                    { name: "Financial Modeling & DCF Valuation", type: "technical" },
                    { name: "Excel & Power BI", type: "technical" },
                    { name: "Equity Research & Portfolio Analysis", type: "technical" },
                    { name: "Mergers & Acquisitions (M&A)", type: "technical" },
                    { name: "Credit Risk Management", type: "technical" },
                    { name: "SAP FICO / Bloomberg Terminal", type: "technical" },
                    { name: "Analytical Problem Solving", type: "soft" },
                    { name: "High-Stakes Negotiation", type: "soft" },
                    { name: "Executive Presentation", type: "soft" },
                ],
                certifications: [
                    { name: "CFA (Chartered Financial Analyst)", provider: "CFA Institute", level: "advanced" },
                    { name: "FRM (Financial Risk Manager)", provider: "GARP", level: "advanced" },
                    { name: "FMVA (Financial Modeling & Valuation Analyst)", provider: "CFI", level: "intermediate" },
                    { name: "NISM Series VIII - Equity Derivatives", provider: "NISM / SEBI", level: "beginner" },
                    { name: "Bloomberg Market Concepts (BMC)", provider: "Bloomberg", level: "beginner" },
                ],
                companies: [
                    { name: "Goldman Sachs", sector: "Investment Banking" },
                    { name: "J.P. Morgan", sector: "Investment Banking" },
                    { name: "Morgan Stanley", sector: "Wealth Management" },
                    { name: "Kotak Mahindra Bank", sector: "Private Banking" },
                    { name: "HDFC Bank", sector: "Commercial Banking" },
                    { name: "Deloitte / PwC", sector: "Financial Advisory" },
                    { name: "Blackstone", sector: "Private Equity" },
                ],
                careerPaths: [
                    { role: "Investment Banker", avgSalary: "₹18–40 LPA" },
                    { role: "Equity Research Analyst", avgSalary: "₹10–22 LPA" },
                    { role: "Corporate Finance Manager", avgSalary: "₹12–26 LPA" },
                    { role: "Portfolio / Fund Manager", avgSalary: "₹20–50 LPA" },
                    { role: "Chief Financial Officer (CFO)", avgSalary: "₹45–90+ LPA" },
                ],
            },
            {
                id: "marketing",
                title: "Marketing & Brand Leadership",
                emoji: "📣",
                description: "Lead consumer research, brand positioning, digital advertising, and growth marketing.",
                skills: [
                    { name: "Brand Positioning & Architecture", type: "technical" },
                    { name: "Performance Marketing & SEO/SEM", type: "technical" },
                    { name: "Consumer Behavior Analytics", type: "technical" },
                    { name: "Go-to-Market (GTM) Strategy", type: "technical" },
                    { name: "CRM Tools (Salesforce, HubSpot)", type: "technical" },
                    { name: "Creative Storytelling", type: "soft" },
                    { name: "Strategic Communication", type: "soft" },
                    { name: "Cross-Functional Leadership", type: "soft" },
                ],
                certifications: [
                    { name: "Google Digital Marketing & E-Commerce", provider: "Google / Coursera", level: "beginner" },
                    { name: "Meta Certified Digital Marketing Associate", provider: "Meta", level: "intermediate" },
                    { name: "HubSpot Inbound Marketing Professional", provider: "HubSpot", level: "beginner" },
                    { name: "Strategic Marketing Leadership", provider: "IIM Ahmedabad (Executive)", level: "advanced" },
                ],
                companies: [
                    { name: "Hindustan Unilever (HUL)", sector: "FMCG" },
                    { name: "Procter & Gamble (P&G)", sector: "FMCG" },
                    { name: "Amazon India", sector: "E-Commerce" },
                    { name: "Google", sector: "Tech & AdTech" },
                    { name: "ITC Limited", sector: "Conglomerate" },
                    { name: "Nestlé India", sector: "Consumer Goods" },
                ],
                careerPaths: [
                    { role: "Brand Manager", avgSalary: "₹12–28 LPA" },
                    { role: "Product Marketing Manager", avgSalary: "₹15–35 LPA" },
                    { role: "Digital Growth Lead", avgSalary: "₹10–24 LPA" },
                    { role: "Category Manager", avgSalary: "₹14–30 LPA" },
                    { role: "Chief Marketing Officer (CMO)", avgSalary: "₹40–85+ LPA" },
                ],
            },
            {
                id: "hr",
                title: "Human Resources & Talent Analytics",
                emoji: "👥",
                description: "Master talent acquisition, people analytics, leadership development, and labor compliance.",
                skills: [
                    { name: "People Analytics & HR Dashboards", type: "technical" },
                    { name: "HRIS Systems (SAP SuccessFactors, Workday)", type: "technical" },
                    { name: "Compensation & Benefits (C&B) Structuring", type: "technical" },
                    { name: "Labor Law & Employment Compliance", type: "technical" },
                    { name: "Empathy & Active Listening", type: "soft" },
                    { name: "Executive Conflict Resolution", type: "soft" },
                    { name: "Organizational Psychology", type: "soft" },
                ],
                certifications: [
                    { name: "SHRM-CP (Certified Professional)", provider: "SHRM USA", level: "advanced" },
                    { name: "PHR (Professional in Human Resources)", provider: "HRCI", level: "intermediate" },
                    { name: "People Analytics Specialist", provider: "Wharton Online", level: "intermediate" },
                    { name: "SAP Certified Application Associate - HCM", provider: "SAP", level: "advanced" },
                ],
                companies: [
                    { name: "Deloitte / EY", sector: "Human Capital Consulting" },
                    { name: "TCS / Infosys", sector: "IT Services" },
                    { name: "Accenture", sector: "Strategy & Operations" },
                    { name: "Aon Hewitt", sector: "HR Advisory" },
                    { name: "Unilever / P&G", sector: "FMCG" },
                ],
                careerPaths: [
                    { role: "HR Business Partner (HRBP)", avgSalary: "₹10–24 LPA" },
                    { role: "Talent Acquisition Head", avgSalary: "₹12–25 LPA" },
                    { role: "Compensation & Benefits Manager", avgSalary: "₹11–22 LPA" },
                    { role: "Chief People Officer (CPO)", avgSalary: "₹35–75+ LPA" },
                ],
            },
            {
                id: "operations",
                title: "Operations & Supply Chain",
                emoji: "⚙️",
                description: "Optimize international supply networks, lean manufacturing, warehouse automation, and logistics.",
                skills: [
                    { name: "Supply Chain Network Optimization", type: "technical" },
                    { name: "Lean Six Sigma DMAIC Methodology", type: "technical" },
                    { name: "ERP Logistics (SAP S/4HANA)", type: "technical" },
                    { name: "Procurement & Strategic Sourcing", type: "technical" },
                    { name: "Process Bottleneck Analysis", type: "soft" },
                    { name: "Crisis Management & Resilience", type: "soft" },
                ],
                certifications: [
                    { name: "Lean Six Sigma Black Belt", provider: "ASQ / IASSC", level: "advanced" },
                    { name: "CSCP (Certified Supply Chain Professional)", provider: "APICS / ASCM", level: "advanced" },
                    { name: "PMP (Project Management Professional)", provider: "PMI", level: "advanced" },
                    { name: "Certified Logistics & Inventory Executive", provider: "CII", level: "intermediate" },
                ],
                companies: [
                    { name: "Amazon Logistics", sector: "E-Commerce" },
                    { name: "DHL Express", sector: "Global Freight" },
                    { name: "Tata Motors", sector: "Automotive" },
                    { name: "Maruti Suzuki", sector: "Manufacturing" },
                    { name: "McKinsey Operations", sector: "Consulting" },
                ],
                careerPaths: [
                    { role: "Supply Chain Director", avgSalary: "₹22–45 LPA" },
                    { role: "Operations Lead", avgSalary: "₹12–25 LPA" },
                    { role: "Procurement Head", avgSalary: "₹14–28 LPA" },
                    { role: "Chief Operating Officer (COO)", avgSalary: "₹40–85+ LPA" },
                ],
            },
            {
                id: "business-analytics",
                title: "Business Analytics & AI Strategy",
                emoji: "📊",
                description: "Harness big data, generative AI, statistical modeling, and data-driven corporate decision making.",
                skills: [
                    { name: "Python for Data Analysis (Pandas, NumPy)", type: "technical" },
                    { name: "SQL & Relational Databases", type: "technical" },
                    { name: "Tableau & Power BI Dashboards", type: "technical" },
                    { name: "Predictive Modeling & Machine Learning", type: "technical" },
                    { name: "Data Storytelling & Visualization", type: "soft" },
                    { name: "Strategic Business Consulting", type: "soft" },
                ],
                certifications: [
                    { name: "Google Advanced Data Analytics", provider: "Google", level: "intermediate" },
                    { name: "Microsoft Certified: Power BI Data Analyst Associate", provider: "Microsoft", level: "intermediate" },
                    { name: "CAP (Certified Analytics Professional)", provider: "INFORMS", level: "advanced" },
                    { name: "Applied Machine Learning for Executives", provider: "MIT Sloan", level: "advanced" },
                ],
                companies: [
                    { name: "McKinsey QuantumBlack", sector: "AI Consulting" },
                    { name: "BCG GAMMA", sector: "Data Strategy" },
                    { name: "Fractal Analytics", sector: "Pure Analytics" },
                    { name: "Amazon / Flipkart", sector: "E-Commerce Tech" },
                    { name: "Zomato", sector: "Data-Driven Consumer" },
                ],
                careerPaths: [
                    { role: "Senior Business Analyst", avgSalary: "₹10–22 LPA" },
                    { role: "Lead Data Strategist", avgSalary: "₹16–35 LPA" },
                    { role: "Product Analytics Manager", avgSalary: "₹18–38 LPA" },
                    { role: "Chief Analytics Officer (CAO)", avgSalary: "₹40–90+ LPA" },
                ],
            }
        ],
    },

    // ── 2. PGDM ───────────────────────────────────────────────────────────
    {
        id: "pgdm",
        title: "PGDM (Post Graduate Diploma in Management)",
        shortName: "PGDM",
        badge: "AICTE Approved • Industry Autonomous",
        level: "Post-Graduate",
        emoji: "🏆",
        description: "Fast-track, industry-curated curriculum focused on corporate agility, fintech, product leadership, and global trade.",
        specializations: [
            {
                id: "fintech",
                title: "FinTech & Digital Banking",
                emoji: "💳",
                description: "Specialize in neo-banking, algorithmic trading, payment gateways, blockchain, and regulatory tech.",
                skills: [
                    { name: "API & Open Banking Architecture", type: "technical" },
                    { name: "Blockchain & Smart Contracts", type: "technical" },
                    { name: "Algorithmic Trading & Python", type: "technical" },
                    { name: "FinTech Regulatory Compliance (RBI/SEBI)", type: "technical" },
                    { name: "Risk Assessment & Fraud Analytics", type: "technical" },
                    { name: "Agile Innovation Thinking", type: "soft" },
                ],
                certifications: [
                    { name: "Certified FinTech Practitioner", provider: "CFTE London", level: "intermediate" },
                    { name: "Blockchain for Financial Services", provider: "INSEAD", level: "intermediate" },
                    { name: "NISM Series XV - Research Analyst", provider: "SEBI / NISM", level: "beginner" },
                ],
                companies: [
                    { name: "Razorpay / PhonePe", sector: "Payments FinTech" },
                    { name: "CRED / BharatPe", sector: "Consumer Credit" },
                    { name: "Zerodha / Groww", sector: "WealthTech / Broking" },
                    { name: "Paytm Payments Bank", sector: "Digital Banking" },
                    { name: "Standard Chartered Bank", sector: "Corporate Banking" },
                ],
                careerPaths: [
                    { role: "FinTech Product Manager", avgSalary: "₹16–38 LPA" },
                    { role: "Digital Transformation Lead", avgSalary: "₹14–30 LPA" },
                    { role: "Risk & Compliance Officer", avgSalary: "₹12–25 LPA" },
                    { role: "Treasury Solutions Specialist", avgSalary: "₹15–32 LPA" },
                ],
            },
            {
                id: "product-management",
                title: "Product Management & Corporate Strategy",
                emoji: "🎯",
                description: "Lead tech-enabled products from ideation and user wireframing to GTM and multi-million user scaling.",
                skills: [
                    { name: "Product Lifecycle Management (PLM)", type: "technical" },
                    { name: "Figma Wireframing & UX Audits", type: "technical" },
                    { name: "A/B Testing & Mixpanel Analytics", type: "technical" },
                    { name: "Agile Scrum & Jira Sprint Planning", type: "technical" },
                    { name: "Stakeholder Management", type: "soft" },
                    { name: "Data-Backed Decision Making", type: "soft" },
                ],
                certifications: [
                    { name: "Certified Scrum Product Owner (CSPO)", provider: "Scrum Alliance", level: "intermediate" },
                    { name: "Product Management Certificate", provider: "Product School", level: "intermediate" },
                    { name: "Google Project Management Professional", provider: "Google", level: "beginner" },
                ],
                companies: [
                    { name: "Swiggy / Zomato", sector: "Consumer Tech" },
                    { name: "MakeMyTrip", sector: "Travel Tech" },
                    { name: "Jio Platforms", sector: "Telecom & Digital" },
                    { name: "Microsoft India", sector: "Enterprise Tech" },
                    { name: "Uber India", sector: "Mobility Tech" },
                ],
                careerPaths: [
                    { role: "Associate Product Manager (APM)", avgSalary: "₹12–22 LPA" },
                    { role: "Product Manager (PM)", avgSalary: "₹18–36 LPA" },
                    { role: "Senior Director of Product", avgSalary: "₹40–80+ LPA" },
                ],
            },
            {
                id: "international-business",
                title: "International Business & Global Trade",
                emoji: "🌐",
                description: "Master cross-border trade compliance, EXIM documentation, currency hedging, and multinational logistics.",
                skills: [
                    { name: "Incoterms & Export-Import Regulations", type: "technical" },
                    { name: "Foreign Exchange (Forex) Risk Hedging", type: "technical" },
                    { name: "International Supply Chain Routing", type: "technical" },
                    { name: "Cross-Cultural Negotiations", type: "soft" },
                    { name: "Global Geopolitical Analysis", type: "soft" },
                ],
                certifications: [
                    { name: "Certified International Trade Professional (CITP)", provider: "FITT", level: "advanced" },
                    { name: "Export Import Management Diploma", provider: "IIFT New Delhi", level: "intermediate" },
                ],
                companies: [
                    { name: "Maersk Line", sector: "Global Shipping" },
                    { name: "Adani Ports & SEZ", sector: "Port Logistics" },
                    { name: "Tata International", sector: "Global Trading" },
                    { name: "Cargill India", sector: "Agri-Commodities" },
                ],
                careerPaths: [
                    { role: "International Business Development Manager", avgSalary: "₹12–28 LPA" },
                    { role: "Global Trade Compliance Officer", avgSalary: "₹10–22 LPA" },
                    { role: "Forex & Commodity Trader", avgSalary: "₹15–35 LPA" },
                ],
            }
        ],
    },

    // ── 3. BBA ────────────────────────────────────────────────────────────
    {
        id: "bba",
        title: "BBA (Bachelor of Business Administration)",
        shortName: "BBA",
        badge: "Undergraduate • 3-4 Years",
        level: "Undergraduate",
        emoji: "📈",
        description: "Build foundational business competencies in entrepreneurship, digital commerce, banking, and general management.",
        specializations: [
            {
                id: "bba-digital-marketing",
                title: "Digital Marketing & Social Commerce",
                emoji: "📱",
                description: "Master social media campaigns, influencer strategy, content creation, and search engine marketing.",
                skills: [
                    { name: "Meta Ads & Google Ads Management", type: "technical" },
                    { name: "SEO & Keyword Research (Semrush/Ahrefs)", type: "technical" },
                    { name: "Canva & Basic Video Editing", type: "technical" },
                    { name: "Copywriting & Storytelling", type: "soft" },
                    { name: "Campaign Creativity", type: "soft" },
                ],
                certifications: [
                    { name: "Google Ads Search Certification", provider: "Google Skillshop", level: "beginner" },
                    { name: "HubSpot Social Media Certification", provider: "HubSpot", level: "beginner" },
                ],
                companies: [
                    { name: "Dentsu India", sector: "Advertising" },
                    { name: "Nykaa", sector: "E-Commerce" },
                    { name: "Schbang", sector: "Digital Agency" },
                    { name: "Zomato", sector: "Social Marketing" },
                ],
                careerPaths: [
                    { role: "Digital Marketing Executive", avgSalary: "₹4.5–8 LPA" },
                    { role: "Social Media Strategist", avgSalary: "₹4–7.5 LPA" },
                    { role: "Content Marketing Lead", avgSalary: "₹6–12 LPA" },
                ],
            },
            {
                id: "bba-finance",
                title: "Banking & Financial Services",
                emoji: "🏦",
                description: "Learn retail banking, credit cards, equity basics, and personal wealth advisory.",
                skills: [
                    { name: "Financial Accounting & Ratio Analysis", type: "technical" },
                    { name: "Advanced MS Excel", type: "technical" },
                    { name: "Mutual Funds & Insurance Products", type: "technical" },
                    { name: "Customer Relationship Management", type: "soft" },
                ],
                certifications: [
                    { name: "NISM Series V-A: Mutual Fund Distributor", provider: "NISM", level: "beginner" },
                    { name: "Corporate Finance Foundations", provider: "LinkedIn Learning", level: "beginner" },
                ],
                companies: [
                    { name: "ICICI Bank", sector: "Banking" },
                    { name: "HDFC Life", sector: "Insurance" },
                    { name: "Bajaj Finserv", sector: "NBFC" },
                    { name: "Motilal Oswal", sector: "Broking" },
                ],
                careerPaths: [
                    { role: "Relationship Manager (Banking)", avgSalary: "₹4.5–9 LPA" },
                    { role: "Financial Advisor Associate", avgSalary: "₹4–8 LPA" },
                    { role: "Credit Processing Executive", avgSalary: "₹3.8–7 LPA" },
                ],
            }
        ],
    },

    // ── 4. BTECH ──────────────────────────────────────────────────────────
    {
        id: "btech",
        title: "B.Tech (Bachelor of Technology)",
        shortName: "B.Tech",
        badge: "Engineering • 4 Years",
        level: "Undergraduate",
        emoji: "💻",
        description: "Master modern software engineering, artificial intelligence, electronics, robotics, and cyber defense.",
        specializations: [
            {
                id: "cse-aiml",
                title: "Computer Science & AI / ML",
                emoji: "🤖",
                description: "Build neural networks, deep learning models, generative AI applications, and distributed software systems.",
                skills: [
                    { name: "Data Structures & Algorithms (C++/Java)", type: "technical" },
                    { name: "Python, PyTorch & TensorFlow", type: "technical" },
                    { name: "Large Language Models & LangChain", type: "technical" },
                    { name: "System Design & Microservices", type: "technical" },
                    { name: "Docker & Kubernetes Basics", type: "technical" },
                    { name: "Algorithmic Problem Solving", type: "soft" },
                    { name: "Technical Documentation", type: "soft" },
                ],
                certifications: [
                    { name: "AWS Certified Solutions Architect", provider: "Amazon Web Services", level: "intermediate" },
                    { name: "TensorFlow Developer Certificate", provider: "Google", level: "intermediate" },
                    { name: "Deep Learning Specialization", provider: "Andrew Ng / Deeplearning.ai", level: "advanced" },
                ],
                companies: [
                    { name: "Google India", sector: "Product Tech" },
                    { name: "Microsoft", sector: "Product Tech" },
                    { name: "Amazon AWS", sector: "Cloud & AI" },
                    { name: "Adobe Systems", sector: "Enterprise Software" },
                    { name: "NVIDIA India", sector: "Hardware & AI" },
                    { name: "Flipkart", sector: "E-Commerce Tech" },
                ],
                careerPaths: [
                    { role: "Software Development Engineer (SDE-1)", avgSalary: "₹14–35 LPA" },
                    { role: "AI / ML Research Engineer", avgSalary: "₹16–42 LPA" },
                    { role: "Backend Systems Engineer", avgSalary: "₹12–28 LPA" },
                    { role: "Principal Architect", avgSalary: "₹45–95+ LPA" },
                ],
            },
            {
                id: "btech-cybersecurity",
                title: "Cyber Security & Cloud Defense",
                emoji: "🛡️",
                description: "Specialize in ethical hacking, penetration testing, SIEM operations, and cloud security architecture.",
                skills: [
                    { name: "Network Protocols & Packet Analysis (Wireshark)", type: "technical" },
                    { name: "Penetration Testing (Metasploit, Burp Suite)", type: "technical" },
                    { name: "Linux Administration & Bash Scripting", type: "technical" },
                    { name: "AWS / Azure Cloud Security", type: "technical" },
                    { name: "Critical Incident Response", type: "soft" },
                ],
                certifications: [
                    { name: "CompTIA Security+", provider: "CompTIA", level: "beginner" },
                    { name: "Certified Ethical Hacker (CEH)", provider: "EC-Council", level: "intermediate" },
                    { name: "OSCP (Offensive Security Certified Professional)", provider: "OffSec", level: "advanced" },
                ],
                companies: [
                    { name: "Palo Alto Networks", sector: "Cyber Security" },
                    { name: "CrowdStrike India", sector: "Endpoint Security" },
                    { name: "Cisco Systems", sector: "Networking & Security" },
                    { name: "KPMG Cyber Advisory", sector: "Consulting" },
                ],
                careerPaths: [
                    { role: "SOC Security Analyst", avgSalary: "₹7–16 LPA" },
                    { role: "Penetration Tester / Ethical Hacker", avgSalary: "₹9–22 LPA" },
                    { role: "Cloud Security Architect", avgSalary: "₹18–40 LPA" },
                ],
            },
            {
                id: "btech-ece",
                title: "Electronics & VLSI Chip Design",
                emoji: "⚡",
                description: "Design integrated circuits (IC), semiconductor layouts, FPGA systems, and embedded microcontrollers.",
                skills: [
                    { name: "Verilog / VHDL Hardware Description", type: "technical" },
                    { name: "Cadence & Synopsys EDA Tools", type: "technical" },
                    { name: "Embedded C & RTOS", type: "technical" },
                    { name: "FPGA Prototyping (Xilinx)", type: "technical" },
                ],
                certifications: [
                    { name: "VLSI Design Methodology Certification", provider: "Maven Silicon", level: "intermediate" },
                    { name: "ARM Embedded Systems Design", provider: "ARM", level: "intermediate" },
                ],
                companies: [
                    { name: "Qualcomm India", sector: "Semiconductors" },
                    { name: "Intel Corporation", sector: "Chip Design" },
                    { name: "Texas Instruments", sector: "Semiconductors" },
                    { name: "Broadcom", sector: "Networking Silicon" },
                ],
                careerPaths: [
                    { role: "VLSI Design Engineer", avgSalary: "₹12–28 LPA" },
                    { role: "Embedded Systems Engineer", avgSalary: "₹8–18 LPA" },
                    { role: "Physical Design Engineer", avgSalary: "₹14–32 LPA" },
                ],
            }
        ],
    },

    // ── 5. BCOM ───────────────────────────────────────────────────────────
    {
        id: "bcom",
        title: "B.Com (Bachelor of Commerce)",
        shortName: "B.Com",
        badge: "Undergraduate Commerce • 3 Years",
        level: "Undergraduate",
        emoji: "📊",
        description: "Master financial accounting, Indian taxation (GST/TDS), audit procedures, and corporate law.",
        specializations: [
            {
                id: "accounting-taxation",
                title: "Accounting & Indian Taxation",
                emoji: "📑",
                description: "Specialized expertise in corporate GST filing, Income Tax returns, Tally Prime, and financial audits.",
                skills: [
                    { name: "Tally Prime & ERP 9 with GST", type: "technical" },
                    { name: "Direct & Indirect Tax Returns (ITR / GSTR)", type: "technical" },
                    { name: "Statutory Financial Statement Prep", type: "technical" },
                    { name: "TDS / TCS Compliance", type: "technical" },
                    { name: "Attention to Detail & Accuracy", type: "soft" },
                ],
                certifications: [
                    { name: "Certified Tally Professional (TallyPrime)", provider: "Tally Education", level: "beginner" },
                    { name: "Certificate in GST Practitioner", provider: "ICAI / MSME", level: "intermediate" },
                    { name: "Advanced Excel for Accounts", provider: "Corporate Finance Institute", level: "beginner" },
                ],
                companies: [
                    { name: "Big 4 (Deloitte, EY, PwC, KPMG)", sector: "Audit & Tax Advisory" },
                    { name: "Grant Thornton", sector: "Accounting & Tax" },
                    { name: "BDO India", sector: "Statutory Audit" },
                    { name: "Genpact", sector: "Finance Operations" },
                ],
                careerPaths: [
                    { role: "Tax Consultant Associate", avgSalary: "₹4.5–9 LPA" },
                    { role: "Statutory Auditor", avgSalary: "₹5–11 LPA" },
                    { role: "Senior Accountant", avgSalary: "₹4–8 LPA" },
                ],
            },
            {
                id: "corporate-finance-bcom",
                title: "Corporate Finance & Capital Markets",
                emoji: "📈",
                description: "Analyze public stocks, derivative markets, mutual fund portfolios, and corporate capital structures.",
                skills: [
                    { name: "Financial Ratio Analysis", type: "technical" },
                    { name: "Excel Financial Modeling", type: "technical" },
                    { name: "Stock Valuation & Technical Analysis", type: "technical" },
                    { name: "Commercial Banking Basics", type: "technical" },
                ],
                certifications: [
                    { name: "NISM Series VIII: Equity Derivatives", provider: "NISM", level: "beginner" },
                    { name: "NISM Series X-A: Investment Adviser", provider: "SEBI / NISM", level: "intermediate" },
                ],
                companies: [
                    { name: "HDFC Securities", sector: "Stock Broking" },
                    { name: "Sharekhan / Angel One", sector: "Broking & Fintech" },
                    { name: "Axis Bank", sector: "Commercial Banking" },
                ],
                careerPaths: [
                    { role: "Equity Dealer / Broker", avgSalary: "₹4–8.5 LPA" },
                    { role: "Financial Planning Associate", avgSalary: "₹4.5–9 LPA" },
                    { role: "Junior Credit Analyst", avgSalary: "₹4.8–10 LPA" },
                ],
            }
        ],
    },

    // ── 6. BCA ────────────────────────────────────────────────────────────
    {
        id: "bca",
        title: "BCA (Bachelor of Computer Applications)",
        shortName: "BCA",
        badge: "Undergraduate IT • 3 Years",
        level: "Undergraduate",
        emoji: "🚀",
        description: "Master modern application development, full stack programming, cloud databases, and IT systems.",
        specializations: [
            {
                id: "fullstack-bca",
                title: "Full Stack Web Development (MERN)",
                emoji: "💻",
                description: "Build modern scalable web applications using MongoDB, Express, React, and Node.js.",
                skills: [
                    { name: "JavaScript / TypeScript", type: "technical" },
                    { name: "React.js & Next.js", type: "technical" },
                    { name: "Node.js & Express.js", type: "technical" },
                    { name: "PostgreSQL & MongoDB", type: "technical" },
                    { name: "RESTful APIs & Git/GitHub", type: "technical" },
                    { name: "Problem Solving", type: "soft" },
                ],
                certifications: [
                    { name: "Meta Front-End Developer Certificate", provider: "Meta / Coursera", level: "intermediate" },
                    { name: "Node.js Application Developer (JSNAD)", provider: "Linux Foundation", level: "advanced" },
                ],
                companies: [
                    { name: "Zoho Corporation", sector: "SaaS Product" },
                    { name: "TCS / Wipro", sector: "IT Services" },
                    { name: "Cognizant", sector: "Technology Services" },
                    { name: "Paytm / Zomato", sector: "Tech Startups" },
                ],
                careerPaths: [
                    { role: "Full Stack Developer", avgSalary: "₹5–14 LPA" },
                    { role: "Frontend Engineer", avgSalary: "₹4.5–10 LPA" },
                    { role: "Backend Engineer", avgSalary: "₹5–12 LPA" },
                ],
            },
            {
                id: "cloud-devops-bca",
                title: "Cloud Computing & DevOps",
                emoji: "☁️",
                description: "Automate software deployments, configure cloud servers, and manage CI/CD pipelines.",
                skills: [
                    { name: "Linux Server Administration", type: "technical" },
                    { name: "AWS Core Services (EC2, S3, RDS)", type: "technical" },
                    { name: "Docker Containerization", type: "technical" },
                    { name: "GitHub Actions & CI/CD", type: "technical" },
                ],
                certifications: [
                    { name: "AWS Certified Cloud Practitioner", provider: "AWS", level: "beginner" },
                    { name: "Microsoft Certified: Azure Fundamentals", provider: "Microsoft", level: "beginner" },
                ],
                companies: [
                    { name: "Red Hat India", sector: "Open Source Tech" },
                    { name: "Infosys Cloud Practice", sector: "IT Services" },
                    { name: "HCL Technologies", sector: "Infrastructure Services" },
                ],
                careerPaths: [
                    { role: "Cloud Support Associate", avgSalary: "₹4.5–9 LPA" },
                    { role: "Junior DevOps Engineer", avgSalary: "₹6–14 LPA" },
                ],
            }
        ],
    },

    // ── 7. MCA ────────────────────────────────────────────────────────────
    {
        id: "mca",
        title: "MCA (Master of Computer Applications)",
        shortName: "MCA",
        badge: "Post-Graduate IT • 2 Years",
        level: "Post-Graduate",
        emoji: "🤖",
        description: "Advanced computing degree covering enterprise software architecture, big data, machine learning, and cloud infrastructure.",
        specializations: [
            {
                id: "enterprise-architecture",
                title: "Enterprise Software Architecture & Distributed Systems",
                emoji: "🏛️",
                description: "Architect mission-critical high-throughput systems using microservices, Kafka, Redis, and cloud infrastructure.",
                skills: [
                    { name: "Java Spring Boot Microservices", type: "technical" },
                    { name: "Apache Kafka & Event-Driven Architecture", type: "technical" },
                    { name: "Kubernetes & Cloud Orchestration", type: "technical" },
                    { name: "System Design (Scalability, Fault Tolerance)", type: "technical" },
                    { name: "Technical Team Mentorship", type: "soft" },
                ],
                certifications: [
                    { name: "Certified Kubernetes Administrator (CKA)", provider: "CNCF / Linux Foundation", level: "advanced" },
                    { name: "AWS Solutions Architect Professional", provider: "AWS", level: "advanced" },
                ],
                companies: [
                    { name: "Oracle India", sector: "Enterprise Cloud" },
                    { name: "SAP Labs India", sector: "ERP Systems" },
                    { name: "Walmart Global Tech", sector: "Retail Tech" },
                    { name: "Morgan Stanley Tech", sector: "FinTech" },
                ],
                careerPaths: [
                    { role: "Senior Software Engineer", avgSalary: "₹14–30 LPA" },
                    { role: "Enterprise Solutions Architect", avgSalary: "₹25–55 LPA" },
                    { role: "Engineering Lead", avgSalary: "₹22–45 LPA" },
                ],
            },
            {
                id: "mca-data-engineering",
                title: "Big Data & AI Pipeline Engineering",
                emoji: "💾",
                description: "Build large-scale data lakes, ETL pipelines, and streaming analytics engines for modern enterprises.",
                skills: [
                    { name: "Apache Spark & PySpark", type: "technical" },
                    { name: "Databricks & Snowflake", type: "technical" },
                    { name: "SQL & Data Warehousing", type: "technical" },
                    { name: "Airflow Pipeline Orchestration", type: "technical" },
                ],
                certifications: [
                    { name: "Databricks Certified Data Engineer Associate", provider: "Databricks", level: "intermediate" },
                    { name: "SnowPro Core Certification", provider: "Snowflake", level: "intermediate" },
                ],
                companies: [
                    { name: "Thoughtworks", sector: "Software Consulting" },
                    { name: "Fractal Analytics", sector: "AI/Data" },
                    { name: "Jio Platforms", sector: "Big Data" },
                ],
                careerPaths: [
                    { role: "Data Engineer", avgSalary: "₹10–24 LPA" },
                    { role: "Senior Big Data Architect", avgSalary: "₹22–48 LPA" },
                ],
            }
        ],
    },

    // ── 8. BA ─────────────────────────────────────────────────────────────
    {
        id: "ba",
        title: "BA (Bachelor of Arts)",
        shortName: "BA",
        badge: "Undergraduate Humanities • 3 Years",
        level: "Undergraduate",
        emoji: "📚",
        description: "Develop critical analytical thinking, policy research, mass media communication, and governance expertise.",
        specializations: [
            {
                id: "ba-economics",
                title: "Economics & Public Policy Analysis",
                emoji: "📊",
                description: "Analyze macro-economic trends, developmental policies, econometrics, and government budgetary impact.",
                skills: [
                    { name: "Econometric Modeling (STATA, R)", type: "technical" },
                    { name: "Policy Impact Evaluation", type: "technical" },
                    { name: "Data Visualization & Research Writing", type: "technical" },
                    { name: "Critical Thinking & Debate", type: "soft" },
                ],
                certifications: [
                    { name: "Data Analysis for Social Scientists", provider: "MITx / edX", level: "intermediate" },
                    { name: "Public Policy Foundations", provider: "Harvard Kennedy Online", level: "intermediate" },
                ],
                companies: [
                    { name: "NITI Aayog (Young Professionals)", sector: "Public Policy" },
                    { name: "Centre for Policy Research (CPR)", sector: "Think Tank" },
                    { name: "World Bank / Asian Development Bank", sector: "Development Finance" },
                    { name: "CRISIL", sector: "Economic Research" },
                ],
                careerPaths: [
                    { role: "Policy Research Analyst", avgSalary: "₹5–12 LPA" },
                    { role: "Economic Consultant", avgSalary: "₹6–15 LPA" },
                    { role: "Civil Services Officer (UPSC Track)", avgSalary: "₹10–20 LPA" },
                ],
            },
            {
                id: "ba-journalism",
                title: "Journalism, PR & Digital Media",
                emoji: "🎙️",
                description: "Report investigative news, craft corporate communications, manage media relations, and publish digital podcasts.",
                skills: [
                    { name: "Investigative Journalism & Fact-Checking", type: "technical" },
                    { name: "SEO Content Writing & Digital Publishing", type: "technical" },
                    { name: "Crisis PR & Press Releases", type: "technical" },
                    { name: "Podcast & Video Production", type: "technical" },
                ],
                certifications: [
                    { name: "Digital Journalism Certification", provider: "Reuters / Meta", level: "beginner" },
                    { name: "Public Relations Foundations", provider: "PRCAI", level: "beginner" },
                ],
                companies: [
                    { name: "NDTV / The Indian Express", sector: "News Media" },
                    { name: "Adfactors PR", sector: "Public Relations" },
                    { name: "Edelman India", sector: "Strategic Communications" },
                ],
                careerPaths: [
                    { role: "Digital Media Journalist", avgSalary: "₹4–9 LPA" },
                    { role: "Corporate Communications Lead", avgSalary: "₹6–14 LPA" },
                    { role: "PR Account Manager", avgSalary: "₹5–11 LPA" },
                ],
            }
        ],
    },

    // ── 9. MA ─────────────────────────────────────────────────────────────
    {
        id: "ma",
        title: "MA (Master of Arts)",
        shortName: "MA",
        badge: "Post-Graduate Humanities • 2 Years",
        level: "Post-Graduate",
        emoji: "🌐",
        description: "Specialized postgraduate research in international diplomacy, clinical psychology, applied economics, and media governance.",
        specializations: [
            {
                id: "ma-psychology",
                title: "Clinical & Industrial Psychology",
                emoji: "🧠",
                description: "Conduct psychological evaluations, cognitive counseling, behavioral assessments, and corporate workplace wellness.",
                skills: [
                    { name: "Psychometric Testing & Evaluation", type: "technical" },
                    { name: "Cognitive Behavioral Therapy (CBT) Frameworks", type: "technical" },
                    { name: "Corporate Employee Assistance Programs (EAP)", type: "technical" },
                    { name: "Empathic Listening & Patient Rapport", type: "soft" },
                ],
                certifications: [
                    { name: "RCI Licensed Clinical Psychologist Track", provider: "Rehabilitation Council of India", level: "advanced" },
                    { name: "Certified CBT Practitioner", provider: "Beck Institute", level: "intermediate" },
                ],
                companies: [
                    { name: "Fortis Healthcare / Apollo Hospitals", sector: "Healthcare" },
                    { name: "1to1help / YourDOST", sector: "Mental Health Tech" },
                    { name: "Corporate HR Wellness Practices", sector: "Corporate MNCs" },
                ],
                careerPaths: [
                    { role: "Clinical Psychologist", avgSalary: "₹6–16 LPA" },
                    { role: "Organizational Behavioral Consultant", avgSalary: "₹8–18 LPA" },
                    { role: "Student Counselor", avgSalary: "₹5–10 LPA" },
                ],
            },
            {
                id: "ma-international-relations",
                title: "International Relations & Strategic Diplomacy",
                emoji: "🌍",
                description: "Analyze global treaties, bilateral foreign diplomacy, conflict resolution, and international NGO initiatives.",
                skills: [
                    { name: "Multilateral Diplomatic Protocol", type: "technical" },
                    { name: "Foreign Policy Drafting", type: "technical" },
                    { name: "Geopolitical Risk Intelligence", type: "technical" },
                    { name: "Cross-Cultural Dialogue", type: "soft" },
                ],
                certifications: [
                    { name: "UN Diplomacy & Peacebuilding", provider: "UNITAR", level: "intermediate" },
                    { name: "Global Security & Geopolitics", provider: "Chatham House", level: "advanced" },
                ],
                companies: [
                    { name: "United Nations (UNICEF, UNDP)", sector: "International Bodies" },
                    { name: "Observer Research Foundation (ORF)", sector: "Think Tank" },
                    { name: "Ministry of External Affairs (MEA)", sector: "Government" },
                ],
                careerPaths: [
                    { role: "Foreign Affairs Analyst", avgSalary: "₹8–18 LPA" },
                    { role: "International NGO Director", avgSalary: "₹10–25 LPA" },
                    { role: "Geopolitical Risk Consultant", avgSalary: "₹12–26 LPA" },
                ],
            }
        ],
    },

    // ── 10. LLB ───────────────────────────────────────────────────────────
    {
        id: "llb",
        title: "LLB (Bachelor of Laws)",
        shortName: "LLB",
        badge: "Professional Law • 3 or 5 Years",
        level: "Professional Law",
        emoji: "⚖️",
        description: "Earn accredited legal credentials for corporate contracts, court litigation, intellectual property, and criminal advocacy.",
        specializations: [
            {
                id: "corporate-law-llb",
                title: "Corporate, M&A & Commercial Law",
                emoji: "🏢",
                description: "Draft commercial agreements, manage shareholder agreements, advise on Companies Act, and negotiate cross-border M&A.",
                skills: [
                    { name: "Contract Drafting & Redlining", type: "technical" },
                    { name: "Companies Act 2013 & SEBI Regulations", type: "technical" },
                    { name: "Legal Due Diligence", type: "technical" },
                    { name: "Insolvency & Bankruptcy Code (IBC)", type: "technical" },
                    { name: "Rigorous Analytical Reasoning", type: "soft" },
                    { name: "Client Negotiation", type: "soft" },
                ],
                certifications: [
                    { name: "All India Bar Examination (AIBE)", provider: "Bar Council of India", level: "beginner" },
                    { name: "Corporate Contract Drafting & Negotiation", provider: "NLSIU / LawSikho", level: "intermediate" },
                    { name: "SEBI & Securities Law Specialist", provider: "NISM / ICSI", level: "intermediate" },
                ],
                companies: [
                    { name: "Shardul Amarchand Mangaldas", sector: "Tier-1 Law Firm" },
                    { name: "Cyril Amarchand Mangaldas", sector: "Tier-1 Law Firm" },
                    { name: "AZB & Partners", sector: "Tier-1 Law Firm" },
                    { name: "Khaitan & Co", sector: "Tier-1 Law Firm" },
                    { name: "Trilegal", sector: "Tier-1 Law Firm" },
                    { name: "Reliance / Tata Sons (In-House Legal)", sector: "Corporate MNCs" },
                ],
                careerPaths: [
                    { role: "Corporate Associate (Tier-1 Law Firm)", avgSalary: "₹14–22 LPA" },
                    { role: "In-House Legal Counsel", avgSalary: "₹10–24 LPA" },
                    { role: "Commercial Contract Specialist", avgSalary: "₹8–18 LPA" },
                    { role: "Law Firm Partner", avgSalary: "₹45–1.2 Cr+ LPA" },
                ],
            },
            {
                id: "ipr-cyber-law-llb",
                title: "Intellectual Property (IPR) & Cyber Law",
                emoji: "💡",
                description: "Protect technological patents, trademarks, software copyright, and defend corporate data privacy compliance (DPDP Act).",
                skills: [
                    { name: "Patent Drafting & Prior Art Search", type: "technical" },
                    { name: "Trademark Registration & Opposition", type: "technical" },
                    { name: "DPDP Act 2023 & GDPR Compliance", type: "technical" },
                    { name: "Cyber Crime Trial Evidence Admissibility", type: "technical" },
                ],
                certifications: [
                    { name: "Patent Agent Examination", provider: "Indian Patent Office (CGPDTM)", level: "advanced" },
                    { name: "WIPO Intellectual Property Certification", provider: "WIPO Academy", level: "intermediate" },
                    { name: "Certified Data Privacy Professional (CIPP/E)", provider: "IAPP", level: "advanced" },
                ],
                companies: [
                    { name: "Anand and Anand", sector: "Premier IP Law Firm" },
                    { name: "Remfry & Sagar", sector: "IP Law Firm" },
                    { name: "Infosys / Wipro (IP Legal)", sector: "Tech Legal" },
                    { name: "Google India (Privacy Legal)", sector: "Big Tech Legal" },
                ],
                careerPaths: [
                    { role: "Patent Attorney", avgSalary: "₹12–26 LPA" },
                    { role: "Data Protection Officer (DPO)", avgSalary: "₹15–35 LPA" },
                    { role: "IPR Associate", avgSalary: "₹9–20 LPA" },
                ],
            },
            {
                id: "criminal-litigation-llb",
                title: "Litigation & Trial Court Advocacy",
                emoji: "⚖️",
                description: "Practice before High Courts, District Courts, and Supreme Court of India in civil, criminal, and constitutional matters.",
                skills: [
                    { name: "Courtroom Advocacy & Cross-Examination", type: "technical" },
                    { name: "Bail Applications & Writ Petitions Drafting", type: "technical" },
                    { name: "Bharatiya Nyaya Sanhita (BNS) & Criminal Procedure", type: "technical" },
                    { name: "Persuasive Public Oratory", type: "soft" },
                ],
                certifications: [
                    { name: "All India Bar Examination (AIBE)", provider: "Bar Council of India", level: "beginner" },
                    { name: "Supreme Court Advocate-on-Record (AoR)", provider: "Supreme Court of India", level: "advanced" },
                ],
                companies: [
                    { name: "Senior Advocates Chambers (Supreme Court / High Court)", sector: "Litigation Chambers" },
                    { name: "Karanjawala & Co", sector: "Dispute Resolution" },
                    { name: "Public Prosecutor Office", sector: "State Judiciary" },
                ],
                careerPaths: [
                    { role: "Litigation Associate", avgSalary: "₹6–15 LPA" },
                    { role: "Independent High Court Counsel", avgSalary: "₹15–50+ LPA" },
                    { role: "Judicial Magistrate / Judge (PCS-J)", avgSalary: "₹12–22 LPA" },
                ],
            }
        ],
    },

    // ── 11. LLM ───────────────────────────────────────────────────────────
    {
        id: "llm",
        title: "LLM (Master of Laws)",
        shortName: "LLM",
        badge: "Post-Graduate Law • 1 or 2 Years",
        level: "Professional Law",
        emoji: "🏛️",
        description: "Master level legal specialization in international commercial arbitration, cross-border investments, competition law, and AI regulations.",
        specializations: [
            {
                id: "international-arbitration",
                title: "International Commercial Arbitration & ADR",
                emoji: "🌍",
                description: "Resolve multi-jurisdictional business disputes under SIAC, LCIA, ICC, and UNCITRAL international rules.",
                skills: [
                    { name: "Arbitral Tribunal Pleadings & Briefs", type: "technical" },
                    { name: "New York Convention Enforcement Procedures", type: "technical" },
                    { name: "Cross-Border Bilateral Investment Treaties (BITs)", type: "technical" },
                    { name: "High-Stakes Diplomatic Tact", type: "soft" },
                ],
                certifications: [
                    { name: "Fellow of Chartered Institute of Arbitrators (FCIArb)", provider: "CIArb London", level: "advanced" },
                    { name: "SIAC Commercial Arbitration Specialist", provider: "SIAC", level: "intermediate" },
                ],
                companies: [
                    { name: "Clifford Chance", sector: "Global Magic Circle" },
                    { name: "Allen & Overy", sector: "International Law Firm" },
                    { name: "Phoenix Legal", sector: "Dispute Law" },
                    { name: "Delhi International Arbitration Centre (DIAC)", sector: "Arbitration Centre" },
                ],
                careerPaths: [
                    { role: "International Arbitration Counsel", avgSalary: "₹20–45 LPA" },
                    { role: "Arbitration Tribunal Secretary", avgSalary: "₹15–30 LPA" },
                    { role: "Global Dispute Partner", avgSalary: "₹50–1.5 Cr+ LPA" },
                ],
            },
            {
                id: "tech-ai-law",
                title: "Technology Law, AI Governance & Competition",
                emoji: "🤖",
                description: "Advise governments, AI labs, and tech giants on algorithmic bias, antitrust regulations, and digital markets.",
                skills: [
                    { name: "EU AI Act & Global Regulatory Frameworks", type: "technical" },
                    { name: "Antitrust & Digital Competition Law (CCI)", type: "technical" },
                    { name: "FinTech & Crypto Asset Regulatory Compliance", type: "technical" },
                    { name: "Technology Licensing & Intellectual Property", type: "technical" },
                ],
                certifications: [
                    { name: "AI Ethics & Legal Governance", provider: "Oxford University Online", level: "advanced" },
                    { name: "Competition Law in Digital Markets", provider: "College of Europe", level: "advanced" },
                ],
                companies: [
                    { name: "Google / Meta Regulatory Affairs", sector: "Big Tech Policy" },
                    { name: "Competition Commission of India (CCI)", sector: "Statutory Regulator" },
                    { name: "Trilegal TMT Practice", sector: "Top Law Firm" },
                    { name: "Shardul Amarchand Mangaldas (TMT)", sector: "Top Law Firm" },
                ],
                careerPaths: [
                    { role: "Technology Legal Counsel", avgSalary: "₹18–38 LPA" },
                    { role: "Global Antitrust & Competition Counsel", avgSalary: "₹22–48 LPA" },
                    { role: "Head of Legal & Government Affairs", avgSalary: "₹45–90+ LPA" },
                ],
            }
        ],
    },
];
