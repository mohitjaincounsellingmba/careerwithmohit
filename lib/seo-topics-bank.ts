export interface BlogTopicSuggestion {
  id: string;
  title: string;
  category: "CAT & Entrance Exams" | "Direct MBA & PGDM" | "Profile & GD-PI Prep" | "Executive & Online MBA" | "Specializations & ROI";
  searchVolume: string;
  keywordDifficulty: "Low" | "Medium" | "High";
  primaryKeyword: string;
  secondaryKeywords: string[];
  competitorGap: string;
  targetAudience: string;
  suggestedOutline: string[];
  aiPrompt: string;
}

export const SEO_TOPICS_BANK: BlogTopicSuggestion[] = [
  {
    id: "topic-1",
    title: "CAT 2027 Preparation Roadmap: Month-by-Month Strategy for 99+ Percentile",
    category: "CAT & Entrance Exams",
    searchVolume: "45,000 / mo",
    keywordDifficulty: "Medium",
    primaryKeyword: "CAT 2027 preparation strategy",
    secondaryKeywords: ["CAT 2027 syllabus PDF", "how to prepare for CAT 2027 from scratch", "CAT 2027 exam date"],
    competitorGap: "Shiksha & Careers360 provide generic theory. Mohit Jain can provide section-wise VARC/DILR/QA month-by-month targets with free mock test links.",
    targetAudience: "CAT 2027 aspirants, college students in pre-final year",
    suggestedOutline: [
      "Introduction: Why early prep for CAT 2027 guarantees top IIM calls",
      "Month 1-3: Foundations in Quant & VARC Vocabulary",
      "Month 4-6: Advanced DILR Puzzles & Speed Techniques",
      "Month 7-9: Full-length Mock Tests & Percentile Analytics",
      "Mohit's Expert Advice: Common mistakes to avoid during CAT prep"
    ],
    aiPrompt: "Write a comprehensive 1500-word SEO blog post titled 'CAT 2027 Preparation Roadmap: Month-by-Month Strategy for 99+ Percentile'. Include actionable VARC, DILR, QA strategies, mock test tracking advice, and structured H2 headers."
  },
  {
    id: "topic-2",
    title: "Top 15 PGDM Colleges in Delhi NCR Accepting 70-80 Percentile in CAT / MAT (2027-29)",
    category: "Direct MBA & PGDM",
    searchVolume: "38,000 / mo",
    keywordDifficulty: "Low",
    primaryKeyword: "top pgdm colleges delhi ncr 70 percentile",
    secondaryKeywords: ["mba colleges accepting 70 percentile cat delhi ncr", "best pgdm colleges low fees delhi", "direct pgdm admission delhi ncr"],
    competitorGap: "Collegedunia lists outdated fees. This post details exact 2027 fee structures, AICTE approval status, average placement packages, and direct admission routes.",
    targetAudience: "Students with 60-80 percentile in CAT/MAT seeking high ROI B-schools in Noida, Gurgaon, Delhi",
    suggestedOutline: [
      "Why Delhi NCR is the top corporate hub for PGDM admissions 2027",
      "Detailed List of 15 B-Schools: Fees, Placements & Highest CTC",
      "AICTE vs UGC Approved PGDM: What parents & students must check",
      "Direct Admission & Management Quota Guidelines 2027",
      "Book 1-on-1 Profile Evaluation with Mohit Jain"
    ],
    aiPrompt: "Write a 1800-word SEO blog post titled 'Top 15 PGDM Colleges in Delhi NCR Accepting 70-80 Percentile in CAT / MAT (2027-29)'. List fees, placement averages (6-12 LPA), cutoffs, and direct application advice."
  },
  {
    id: "topic-3",
    title: "XAT 2027 Decision Making & Verbal Ability Mastery Guide: Crack XLRI Calls",
    category: "CAT & Entrance Exams",
    searchVolume: "28,000 / mo",
    keywordDifficulty: "Medium",
    primaryKeyword: "XAT 2027 decision making preparation",
    secondaryKeywords: ["XAT decision making previous year questions PDF", "XLRI Jamshedpur cutoff 2027", "XAT 2027 exam pattern"],
    competitorGap: "Competitor posts lack solved case study examples. Mohit Jain can break down 5 real Decision Making scenarios step-by-step.",
    targetAudience: "XAT 2027 aspirants targeting XLRI Jamshedpur, XLRI Delhi, XIMB, IMT Ghaziabad",
    suggestedOutline: [
      "Why Decision Making (DM) is the game-changer in XAT exam",
      "The 4 Golden Rules to solve Ethics & Business DM Case Studies",
      "VALR Section (Verbal & Logical Reasoning) High-yield topics",
      "XAT Cutoff Matrix for XLRI BM vs HRM programs",
      "Final 30-Day XAT Sprint Checklist by Mohit Jain"
    ],
    aiPrompt: "Write a detailed 1600-word SEO post titled 'XAT 2027 Decision Making & Verbal Ability Mastery Guide: Crack XLRI Calls'. Detail ethics principles, business case scenarios, and cutoff expectations."
  },
  {
    id: "topic-4",
    title: "NMAT 2026-27 Attempt Strategy: Maximizing Scores Across 3 Retakes for NMIMS Mumbai",
    category: "CAT & Entrance Exams",
    searchVolume: "32,000 / mo",
    keywordDifficulty: "Low",
    primaryKeyword: "NMAT by GMAC 3 attempts strategy",
    secondaryKeywords: ["NMIMS Mumbai NMAT cutoff 2027", "NMAT exam slot booking tips", "NMAT adaptive score calculation"],
    competitorGap: "Legacy portals fail to explain the adaptive scoring algorithm of GMAC. Explain windowing, section order strategy, and target 235+ score breakdown.",
    targetAudience: "NMIMS aspirants, NMAT test takers aiming for Mumbai, Bangalore, Hyderabad campuses",
    suggestedOutline: [
      "Understanding NMAT Computer Adaptive Test (CAT) Algorithm",
      "Attempt 1 vs Attempt 2 vs Attempt 3: Optimal scheduling gap",
      "Section Order Choice: Quant vs Language vs Logical Reasoning first?",
      "NMIMS Mumbai Cutoff (235+) vs Off-campus Cutoffs (210+)",
      "Take Free NMAT Mock Test on CareerWithMohit"
    ],
    aiPrompt: "Write a 1500-word SEO article titled 'NMAT 2026-27 Attempt Strategy: Maximizing Scores Across 3 Retakes for NMIMS Mumbai'. Explain adaptive scoring, time management per question, and NMIMS score targets."
  },
  {
    id: "topic-5",
    title: "SNAP 2026-27 Speed & Accuracy Blueprint: Crack SIBM Pune & SCMHRD in 60 Minutes",
    category: "CAT & Entrance Exams",
    searchVolume: "35,000 / mo",
    keywordDifficulty: "Medium",
    primaryKeyword: "SNAP exam speed strategy SIBM Pune",
    secondaryKeywords: ["SNAP 2026 cutoff SIBM Pune", "SNAP 60 questions 60 minutes strategy", "SNAP test 1 vs test 2 vs test 3"],
    competitorGap: "Most blogs focus only on syllabus. Provide a 60-minute time-boxing breakdown (General English 12 mins, Analytical & LR 25 mins, QA-DI-DS 23 mins).",
    targetAudience: "SNAP 2026 aspirants targeting SIBM Pune, SCMHRD, SIIB, SICS",
    suggestedOutline: [
      "Why SNAP is India's fastest entrance exam (60 Qs in 60 Mins)",
      "Ideal Sectional Time Split for Maximum Score",
      "High-Frequency Topics in General English & Puzzles",
      "SIBM Pune (98.5 percentile) vs SCMHRD (97 percentile) Cutoffs",
      "Mohit Jain's SNAP Mock Test Strategy"
    ],
    aiPrompt: "Write a 1400-word SEO guide titled 'SNAP 2026-27 Speed & Accuracy Blueprint: Crack SIBM Pune & SCMHRD in 60 Minutes'. Detail question selection strategy, negative marking avoidance, and SIBM cutoffs."
  },
  {
    id: "topic-6",
    title: "How to Build an Unbeatable Profile for IIM & Top B-School Interviews (2027 Admissions)",
    category: "Profile & GD-PI Prep",
    searchVolume: "22,000 / mo",
    keywordDifficulty: "Low",
    primaryKeyword: "MBA profile building for IIM interview",
    secondaryKeywords: ["certifications for MBA resume", "how to improve profile for IIM call", "MBA profile evaluation free"],
    competitorGap: "Competitor guides give vague advice like 'do sports'. This post gives specific certifications (Financial Modeling, Analytics, Six Sigma), internships, and NGO work that add real weightage to IIM composite scores.",
    targetAudience: "Engineering & Non-engineering graduates preparing for MBA admissions 2027",
    suggestedOutline: [
      "What is Academic Diversity & Composite Score Weightage in IIMs?",
      "Top 5 Certifications That Boost Your MBA Resume (Excel, Analytics, Digital)",
      "How Work Experience vs Fresher Extra-Curriculars are Evaluated",
      "Writing a Winning SOP (Statement of Purpose) for B-School Interviews",
      "Get a Free Profile Audit with Mohit Jain"
    ],
    aiPrompt: "Write a comprehensive 1700-word SEO post titled 'How to Build an Unbeatable Profile for IIM & Top B-School Interviews (2027 Admissions)'. Detail certification recommendations, work ex impact, and SOP structure."
  },
  {
    id: "topic-7",
    title: "Direct MBA Admission in Pune Under 8 Lakhs Budget: Top Colleges & Placement ROI (2027)",
    category: "Direct MBA & PGDM",
    searchVolume: "30,000 / mo",
    keywordDifficulty: "Low",
    primaryKeyword: "direct mba admission pune low fees",
    secondaryKeywords: ["mba colleges in pune under 5 lakhs", "best pgdm colleges in pune placement roi", "direct admission in Pune management quota"],
    competitorGap: "Presents clear ROI calculation (Fees vs Average Package) for Pune B-schools like Lexicon, Akemi, RIIM, ISMS, ASM, Suryadatta.",
    targetAudience: "Students from Maharashtra, MP, UP, Bihar looking for budget-friendly MBA in Pune",
    suggestedOutline: [
      "Why Pune is the Oxford of the East for MBA & Industry Placements",
      "Top 10 Colleges Under 8 Lakhs Total Fees: Detailed Breakdown",
      "Average Package vs Fee Comparison (ROI Analysis)",
      "MHT-CET vs Management Quota Admission Rules 2027",
      "Connect with Mohit Jain for Direct Seat Allotment"
    ],
    aiPrompt: "Write an 1800-word SEO guide titled 'Direct MBA Admission in Pune Under 8 Lakhs Budget: Top Colleges & Placement ROI (2027)'. Include college fees, placement averages, hostel costs, and application advice."
  },
  {
    id: "topic-8",
    title: "MBA Business Analytics vs Data Science: Scope, Fees, & Salary Comparison 2027",
    category: "Specializations & ROI",
    searchVolume: "26,000 / mo",
    keywordDifficulty: "Medium",
    primaryKeyword: "MBA Business Analytics vs Data Analytics",
    secondaryKeywords: ["scope of mba in business analytics india", "highest package mba business analytics", "best colleges for mba business analytics"],
    competitorGap: "Differentiates technical Data Science from management-oriented Business Analytics with concrete career paths (Product Manager, Analytics Consultant, Data Strategist).",
    targetAudience: "B.Tech, BCA, B.Sc, and Commerce graduates choosing specializations",
    suggestedOutline: [
      "Understanding MBA Business Analytics vs M.Tech/M.Sc Data Science",
      "Top B-Schools Offering Specialized Analytics Programs (IIM B, IIM C, SCIT, SCMHRD)",
      "Core Tools You Will Learn: Python, SQL, Tableau, Power BI, Advanced Excel",
      "Salary Packages & Recruiter Roles in Tier-1 & Tier-2 Colleges",
      "Mohit's Verdict: Which course should you choose?"
    ],
    aiPrompt: "Write a 1600-word SEO post titled 'MBA Business Analytics vs Data Science: Scope, Fees, & Salary Comparison 2027'. Compare tools, course curriculum, salary packages, and top colleges."
  },
  {
    id: "topic-9",
    title: "Executive MBA for Working Professionals (2027): UGC Entitled vs Online Degrees Guide",
    category: "Executive & Online MBA",
    searchVolume: "29,000 / mo",
    keywordDifficulty: "Low",
    primaryKeyword: "Executive MBA for working professionals UGC approved",
    secondaryKeywords: ["1 year online mba india valid for jobs", "iim executive mba 1 year fees", "best online mba programs india 2027"],
    competitorGap: "Clears confusion around 1-year Executive MBA vs 2-year Online MBA vs Distance MBA with government validity rules (UGC-DEB, AICTE, AIU).",
    targetAudience: "Working professionals with 2-10 years experience looking for career promotion or domain switch",
    suggestedOutline: [
      "Difference Between 1-Year Executive PGP, 2-Year Online MBA & Distance Degree",
      "UGC-DEB & AICTE Entitlement Checklist for Employers",
      "Top IIM & University Executive MBA Options (IIM A PGPX, IIM B EPGP, NMIMS, Amity, LPU)",
      "Salary Hikes & ROI: Is an Executive MBA worth the investment?",
      "Free Executive Resume Assessment with Mohit Jain"
    ],
    aiPrompt: "Write a 1700-word SEO post titled 'Executive MBA for Working Professionals (2027): UGC Entitled vs Online Degrees Guide'. Clarify government approvals, fee structures, and career elevation."
  },
  {
    id: "topic-10",
    title: "MAH MBA CET 2027 Cutoffs & CAP Round Counselling Guide: JBIMS, SIMSREE, PUMBA",
    category: "CAT & Entrance Exams",
    searchVolume: "40,000 / mo",
    keywordDifficulty: "Medium",
    primaryKeyword: "MAH MBA CET 2027 cutoff JBIMS SIMSREE",
    secondaryKeywords: ["MAH CET cap round registration date 2027", "outside maharashtra candidate OMS cutoff", "mhcet mba top 10 colleges list"],
    competitorGap: "Explains Maharashtra State (HU/OHU) vs Outside Maharashtra Candidate (OMS) quota cutoffs clearly with raw score vs percentile breakdown.",
    targetAudience: "Maharashtra & PAN India aspirants seeking low-fee government B-Schools in Mumbai & Pune",
    suggestedOutline: [
      "Why MAH MBA CET is the most cost-effective MBA entrance in India",
      "JBIMS Mumbai (99.99%), SIMSREE (99.8%), PUMBA (99.2%) Cutoffs",
      "Understanding CAP Round 1, 2, & 3 Seat Allotment Process",
      "OMS (Outside Maharashtra) Quota vs State Seats Comparison",
      "Counselling Assistance with Mohit Jain"
    ],
    aiPrompt: "Write a 1600-word SEO guide titled 'MAH MBA CET 2027 Cutoffs & CAP Round Counselling Guide: JBIMS, SIMSREE, PUMBA'. Detail score vs percentile, CAP registration, and OMS quota rules."
  }
];

// Function to select 5 deterministic daily topics based on current date
export function getDailyBlogSuggestions(count = 5): BlogTopicSuggestion[] {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  
  const totalAvailable = SEO_TOPICS_BANK.length;
  const selected: BlogTopicSuggestion[] = [];

  for (let i = 0; i < count; i++) {
    const index = (dayOfYear * 2 + i * 3) % totalAvailable;
    selected.push(SEO_TOPICS_BANK[index]);
  }

  return selected;
}
