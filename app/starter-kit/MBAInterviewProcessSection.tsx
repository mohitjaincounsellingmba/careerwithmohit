"use client";

import React, { useState } from 'react';
import { 
  Building2, 
  Briefcase, 
  CheckCircle2, 
  Download, 
  FileText, 
  GraduationCap, 
  HelpCircle, 
  Layers, 
  Lightbulb, 
  Lock, 
  Search, 
  Sparkles, 
  Target, 
  TrendingUp, 
  Users, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Compass, 
  BookOpen, 
  Award, 
  ArrowRight,
  ShieldCheck,
  Zap,
  BarChart3,
  DollarSign
} from 'lucide-react';
import StarterKitForm from './StarterKitForm';

export interface InterviewRound {
  roundNumber: string;
  roundName: string;
  badgeStyle: string;
  description: string;
  questions: string[];
  tips?: string;
  sampleFramework?: string;
}

export interface RecruiterGroup {
  id: string;
  companyName: string;
  category: 'consulting' | 'bfsi' | 'fmcg' | 'tech';
  categoryLabel: string;
  categoryBadgeBg: string;
  categoryBadgeText: string;
  roles: string;
  accentColor: string;
  borderColor: string;
  rounds: InterviewRound[];
}

export const RECRUITER_DATA: RecruiterGroup[] = [
  // BIG 4 & CONSULTING
  {
    id: "ey",
    companyName: "EY (Ernst & Young)",
    category: "consulting",
    categoryLabel: "Big 4 Consulting",
    categoryBadgeBg: "bg-amber-100",
    categoryBadgeText: "text-amber-800",
    roles: "Business Consulting, Assurance, Valuation, Tax Advisory",
    accentColor: "from-amber-500/10 via-amber-500/5 to-transparent",
    borderColor: "border-amber-200 hover:border-amber-400",
    rounds: [
      {
        roundNumber: "Round 1",
        roundName: "Online Aptitude & Case Assessment",
        badgeStyle: "bg-blue-100 text-blue-800 border-blue-200",
        description: "Numerical reasoning, verbal ability, logical puzzles aur short business scenario questions. Time management critical hota hai.",
        questions: [
          "Data interpretation graphs based on revenue/expenses.",
          "Logical deduction & syllogism questions.",
          "Scenario-based ethical judgement questions."
        ],
        tips: "Practice speed calculation without calculator. Focus on quick elimination in DI questions.",
        sampleFramework: "MECE (Mutually Exclusive, Collectively Exhaustive) for scenario prioritization."
      },
      {
        roundNumber: "Round 2",
        roundName: "Group Discussion / Case Study GD",
        badgeStyle: "bg-purple-100 text-purple-800 border-purple-200",
        description: "8-10 students ka group. Ek business case snippet ya current economic issue diya jata hai (10 mins reading + 15 mins discussion).",
        questions: [
          "Should Indian companies focus on EV transition right now?",
          "Case: A retail firm facing 15% revenue drop—suggest turn-around strategy."
        ],
        tips: "Give structure to the discussion in the first 2 minutes. Focus on 2-3 structured interventions rather than shouting.",
        sampleFramework: "Retail Turnaround: 1. Revenue (Footfall x Basket Size x Pricing) + 2. Costs (COGS, Rent, Marketing)."
      },
      {
        roundNumber: "Round 3",
        roundName: "Technical Interview",
        badgeStyle: "bg-emerald-100 text-emerald-800 border-emerald-200",
        description: "Domain knowledge check. Finance/Consulting frameworks, accounting standards aur guesstimates par focus.",
        questions: [
          "Walk me through the 3 Financial Statements and how they connect.",
          "How do you value a tech startup with negative cash flows?",
          "Guesstimate: Estimate the market size of coffee shops in Gurgaon."
        ],
        tips: "Always state your assumptions out loud during guesstimates. Break calculation into clear age/income brackets.",
        sampleFramework: "Coffee Shop Guesstimate: Total Pop (15L) -> Target Age 18-50 (60%) -> Income Tier (Mid/High 40%) -> Daily/Weekly cups -> Market Size."
      },
      {
        roundNumber: "Round 4",
        roundName: "Partner / HR Round",
        badgeStyle: "bg-amber-100 text-amber-800 border-amber-200",
        description: "Fitment test, long-term alignment, stress handling aur CV verification. Partner directly interviewer hote hain.",
        questions: [
          "Why EY and why Consulting over industry roles?",
          "Tell me about a time you managed a conflict in a team project.",
          "Are you comfortable with extensive client travel and 60+ hr work weeks?"
        ],
        tips: "Demonstrate high energy, client-facing maturity, and genuine understanding of EY's sector practices.",
        sampleFramework: "STAR Method: Situation -> Task -> Action -> Result (with metrics)."
      }
    ]
  },
  {
    id: "deloitte",
    companyName: "Deloitte",
    category: "consulting",
    categoryLabel: "Strategy & Advisory",
    categoryBadgeBg: "bg-emerald-100",
    categoryBadgeText: "text-emerald-800",
    roles: "Advisory, Strategy & Operations, Financial Risk",
    accentColor: "from-emerald-500/10 via-emerald-500/5 to-transparent",
    borderColor: "border-emerald-200 hover:border-emerald-400",
    rounds: [
      {
        roundNumber: "Round 1",
        roundName: "AMCAT / Online Assessment",
        badgeStyle: "bg-blue-100 text-blue-800 border-blue-200",
        description: "Quants, Logical Reasoning, English Comprehension aur Personality test (Versant test for communication in some profiles).",
        questions: [
          "Speed-distance-time, probability, profit & loss.",
          "Email writing/correction and situational behavior scenarios."
        ],
        tips: "Ensure clean audio for Versant voice assessment. Focus on neutral tone and clear enunciation."
      },
      {
        roundNumber: "Round 2",
        roundName: "Jam Session / GD",
        badgeStyle: "bg-purple-100 text-purple-800 border-purple-200",
        description: "Just-a-Minute (JAM) or case discussion. Quick thinking, structured speech aur clear pronunciation evaluate hota hai.",
        questions: [
          "Impact of AI on mid-level management jobs.",
          "Gig economy vs Traditional employment."
        ],
        tips: "JAM rule: 15s to structure (Introduction, 2 Core Points with data, 1 Summary Conclusion)."
      },
      {
        roundNumber: "Round 3",
        roundName: "Technical & Case Interview",
        badgeStyle: "bg-emerald-100 text-emerald-800 border-emerald-200",
        description: "Live case solving + resume deep dive. Business framework (MECE, 4P, SWOT) apply karne ki capacity dekhte hain.",
        questions: [
          "Our client is a telecom operator losing market share to Jio. Framework batayein strategy ka.",
          "Explain WACC and NPV in simple terms.",
          "What was your role in your MBA internship project?"
        ],
        tips: "Telecom case framework: Market Landscape -> Competitive Offering (Pricing/Data) -> Network Quality -> Customer Retention."
      },
      {
        roundNumber: "Round 4",
        roundName: "Director / HR Round",
        badgeStyle: "bg-amber-100 text-amber-800 border-amber-200",
        description: "Cultural fit, behavioral questions aur career goals discussion.",
        questions: [
          "Where do you see yourself 3 years after joining Deloitte?",
          "Describe a situation where you had to work with a difficult manager."
        ],
        tips: "Showcase emotional intelligence, adaptability, and high coachability."
      }
    ]
  },
  {
    id: "pwc-kpmg",
    companyName: "PwC & KPMG",
    category: "consulting",
    categoryLabel: "Deals & Governance",
    categoryBadgeBg: "bg-indigo-100",
    categoryBadgeText: "text-indigo-800",
    roles: "Deals Advisory, Management Consulting, Risk & Governance",
    accentColor: "from-indigo-500/10 via-indigo-500/5 to-transparent",
    borderColor: "border-indigo-200 hover:border-indigo-400",
    rounds: [
      {
        roundNumber: "Round 1",
        roundName: "Cognitive Test",
        badgeStyle: "bg-blue-100 text-blue-800 border-blue-200",
        description: "Aptitude test including data interpretation and business communication exercises.",
        questions: [
          "Financial ratio calculations based on sample tables."
        ],
        tips: "Revise DuPont analysis, Quick Ratio, Debt-Equity, and Interest Coverage calculations."
      },
      {
        roundNumber: "Round 2",
        roundName: "Technical & Domain Round",
        badgeStyle: "bg-emerald-100 text-emerald-800 border-emerald-200",
        description: "In-depth domain questions, balance sheet analysis, valuation techniques and industry macro trends.",
        questions: [
          "What is Enterprise Value vs Equity Value?",
          "How does working capital impact company cash flows?",
          "Explain the impact of RBI repo rate hike on banking sector."
        ],
        tips: "EV = Equity Value + Total Debt - Cash & Cash Equivalents. W/C changes flow through Operating Cash Flow."
      },
      {
        roundNumber: "Round 3",
        roundName: "Partner / Senior Director HR",
        badgeStyle: "bg-amber-100 text-amber-800 border-amber-200",
        description: "Behavioral assessment, ethical dilemma tests and commitment evaluation.",
        questions: [
          "If a client demands an unethical adjustment in report, how will you handle it?",
          "Why did you choose your specific MBA specialization?"
        ],
        tips: "Uncompromising integrity is the primary evaluation factor in Big 4 advisory/assurance rounds."
      }
    ]
  },

  // BANKING & FINANCIAL SERVICES
  {
    id: "jpmorgan-goldman",
    companyName: "JP Morgan Chase & Co. / Goldman Sachs",
    category: "bfsi",
    categoryLabel: "Investment Banking & Risk",
    categoryBadgeBg: "bg-blue-100",
    categoryBadgeText: "text-blue-800",
    roles: "Investment Banking Analyst, Wealth Management, Risk",
    accentColor: "from-blue-500/10 via-blue-500/5 to-transparent",
    borderColor: "border-blue-200 hover:border-blue-400",
    rounds: [
      {
        roundNumber: "Round 1",
        roundName: "Online HireVue / Technical Test",
        badgeStyle: "bg-blue-100 text-blue-800 border-blue-200",
        description: "Video interview + online financial modeling / quantitative aptitude test.",
        questions: [
          "Recorded video questions on motivation and business awareness.",
          "Advanced quants, statistics, and financial math."
        ],
        tips: "Look into camera, structure responses using 3 concise points, maintain professional executive presence."
      },
      {
        roundNumber: "Round 2",
        roundName: "Technical Interview (Round 1 & 2)",
        badgeStyle: "bg-emerald-100 text-emerald-800 border-emerald-200",
        description: "Heavy financial concepts, DCF modeling, LBO basics, corporate finance principles.",
        questions: [
          "Walk me through a DCF model step-by-step.",
          "If Depreciation increases by $10, how does it affect 3 financial statements?",
          "What are the main drivers of M&A success?"
        ],
        tips: "Depreciation ($10): Net Income drops by $10*(1-T). Cash from Ops adds back $10 dep -> net cash rises by $10*T."
      },
      {
        roundNumber: "Round 3",
        roundName: "Fitment & Senior Leadership",
        badgeStyle: "bg-amber-100 text-amber-800 border-amber-200",
        description: "High-pressure culture fit test, attention to detail and market orientation.",
        questions: [
          "What is happening in global bond markets today?",
          "Pitch me a stock or company that is currently undervalued."
        ],
        tips: "Always keep 1 Long pitch and 1 Short pitch ready with valuation multiple comparison."
      }
    ]
  },
  {
    id: "commercial-banks",
    companyName: "Indian Commercial Banks (ICICI, HDFC, Axis)",
    category: "bfsi",
    categoryLabel: "Retail & Corporate Banking",
    categoryBadgeBg: "bg-cyan-100",
    categoryBadgeText: "text-cyan-800",
    roles: "Relationship Manager, Corporate Banking, Product Manager",
    accentColor: "from-cyan-500/10 via-cyan-500/5 to-transparent",
    borderColor: "border-cyan-200 hover:border-cyan-400",
    rounds: [
      {
        roundNumber: "Round 1",
        roundName: "Online Psychometric & Aptitude",
        badgeStyle: "bg-blue-100 text-blue-800 border-blue-200",
        description: "Sales aptitude, customer orientation, logical reasoning and numerical speed test.",
        questions: [
          "Basic financial calculations, interest rates, currency conversions."
        ],
        tips: "Highlight customer-centricity and resilience in psychometric personality questions."
      },
      {
        roundNumber: "Round 2",
        roundName: "Group Discussion (GD)",
        badgeStyle: "bg-purple-100 text-purple-800 border-purple-200",
        description: "Caselet on customer acquisition or financial products selling strategy.",
        questions: [
          "Digital Banking vs Branch Banking: Future of Retail Banking.",
          "How to sell insurance products to rural population?"
        ],
        tips: "Balance physical trust with digital efficiency (Phygital model)."
      },
      {
        roundNumber: "Round 3",
        roundName: "Personal Interview (PI)",
        badgeStyle: "bg-emerald-100 text-emerald-800 border-emerald-200",
        description: "Sales orientation, product knowledge, stress handling, location flexibility.",
        questions: [
          "Sell this credit card / mutual fund product to me in 2 minutes.",
          "What is NPA, CRR, SLR, and Repo Rate?",
          "Are you comfortable with aggressive sales targets?"
        ],
        tips: "Sell on benefits, not features: identify client pain point first, then position the card/loan product."
      }
    ]
  },

  // FMCG & MARKETING
  {
    id: "fmcg-giants",
    companyName: "FMCG & Retail Giants (HUL, P&G, Asian Paints, Marico)",
    category: "fmcg",
    categoryLabel: "FMCG & Brand Management",
    categoryBadgeBg: "bg-rose-100",
    categoryBadgeText: "text-rose-800",
    roles: "Area Sales Manager (ASM), Brand Manager",
    accentColor: "from-rose-500/10 via-rose-500/5 to-transparent",
    borderColor: "border-rose-200 hover:border-rose-400",
    rounds: [
      {
        roundNumber: "Round 1",
        roundName: "Shortlisting / Online Simulation",
        badgeStyle: "bg-blue-100 text-blue-800 border-blue-200",
        description: "CV shortlisting based on marketing projects, live brand games / interactive simulations.",
        questions: [
          "Brand budget allocation games & decision-making tests."
        ],
        tips: "Optimize for long-term customer equity rather than short-term discounting."
      },
      {
        roundNumber: "Round 2",
        roundName: "Group Activity / Live Simulation",
        badgeStyle: "bg-purple-100 text-purple-800 border-purple-200",
        description: "Group is given a new product launch challenge (Pricing, Distribution channel, Promotion strategy).",
        questions: [
          "Design a marketing strategy to launch organic tea in Tier-2 Indian cities.",
          "How will you handle distributor conflicts in trade channels?"
        ],
        tips: "Focus on distribution depth (Kirana stores vs modern trade) and hyper-local vernacular messaging."
      },
      {
        roundNumber: "Round 3",
        roundName: "Technical Marketing PI",
        badgeStyle: "bg-emerald-100 text-emerald-800 border-emerald-200",
        description: "Deep-dive into 4Ps, STP framework, digital marketing metrics and summer internship project.",
        questions: [
          "Explain your Summer Internship Project (SIP) - what was the exact ROI?",
          "Difference between Trade Marketing and Brand Marketing?",
          "What is CAC, LTV, ROAS, and Conversion Funnel in Digital Ads?"
        ],
        tips: "Know every single metric of your SIP. If you improved sales by 12%, know the base volume and sample size."
      },
      {
        roundNumber: "Round 4",
        roundName: "Leadership Fitment",
        badgeStyle: "bg-amber-100 text-amber-800 border-amber-200",
        description: "Field readiness check, willingness to work in rural/tier-3 regions for channel sales.",
        questions: [
          "Why do you want to work in sales when you have an MBA degree?",
          "How will you manage a team of distributors older than you?"
        ],
        tips: "Answer with humility: sales is the foundational ground reality to become a future CMO/CEO."
      }
    ]
  },

  // E-COMMERCE & TECH SALES
  {
    id: "ecommerce-tech",
    companyName: "E-Commerce & Tech Sales (Amazon, Flipkart, PhonePe)",
    category: "tech",
    categoryLabel: "Product & Category Management",
    categoryBadgeBg: "bg-violet-100",
    categoryBadgeText: "text-violet-800",
    roles: "Program Manager, Category Manager, Business Development",
    accentColor: "from-violet-500/10 via-violet-500/5 to-transparent",
    borderColor: "border-violet-200 hover:border-violet-400",
    rounds: [
      {
        roundNumber: "Round 1",
        roundName: "Online Analytical & Writing Test",
        badgeStyle: "bg-blue-100 text-blue-800 border-blue-200",
        description: "Case analysis, data interpretation and short essay writing (Amazon Leadership Principles alignment).",
        questions: [
          "Analytical questions based on Excel datasets.",
          "Situational essay on 'Customer Obsession' and 'Ownership'."
        ],
        tips: "Write structured essays: Problem statement -> Root cause analysis -> Proposed action -> Long-term customer benefit."
      },
      {
        roundNumber: "Round 2 & 3",
        roundName: "Loop Interviews (Technical + Behavioral)",
        badgeStyle: "bg-emerald-100 text-emerald-800 border-emerald-200",
        description: "Rigorous behavioral interview using STAR method + Category growth case studies.",
        questions: [
          "Give an example where you took a decision based on data vs intuition.",
          "How would you grow the Electronics category revenue by 25% on Festive Sale?",
          "Tell me about a time you failed and what you learned."
        ],
        tips: "Align every behavioral answer with Amazon's 16 Leadership Principles (Bias for Action, Dive Deep, Customer Obsession)."
      }
    ]
  }
];

export const PLACEMENT_PROCESS_STEPS = [
  {
    step: "Stage 01",
    title: "Pre-Placement Prep & CV Freeze",
    subtitle: "Master 1-Page Resume & PlaceCom Point Audit",
    icon: FileText,
    color: "bg-blue-500",
    description: "Strict 1-page CV formatting, point validation by Placement Committee (PlaceCom), academic verification, and domain alignment (Consulting, Finance, Marketing, ProdMan)."
  },
  {
    step: "Stage 02",
    title: "Pre-Placement Talks (PPTs)",
    subtitle: "Company Pitch, CTC Breakdown & Q&A",
    icon: Building2,
    color: "bg-indigo-500",
    description: "Top recruiters present job profiles, growth path, work culture, and detailed CTC breakdown (Fixed Base vs Variable vs ESOPs vs Joining Bonus). Critical for smart application."
  },
  {
    step: "Stage 03",
    title: "Application & Profiling",
    subtitle: "Academic Cutoffs & Shortlisting",
    icon: Compass,
    color: "bg-purple-500",
    description: "Companies filter candidates based on 10th/12th/Graduation/MBA grades, work experience duration, undergraduate tier, and specialized certifications (CFA, Six Sigma, Digital Marketing)."
  },
  {
    step: "Stage 04",
    title: "Online Assessments & Versant",
    subtitle: "Aptitude, Domain Quants & Communication",
    icon: Zap,
    color: "bg-emerald-500",
    description: "Timed numerical reasoning, logical puzzles, financial modeling tests, Excel caselets, and AI-powered voice tests (Versant/HireVue) for corporate communication."
  },
  {
    step: "Stage 05",
    title: "Group Discussions & Caselets",
    subtitle: "JAM, Live Simulation & Group Tasks",
    icon: Users,
    color: "bg-amber-500",
    description: "8-10 candidates evaluated on structured thought, leadership, non-aggressive articulation, MECE frameworks, and consensus-building on live business problems."
  },
  {
    step: "Stage 06",
    title: "Technical, Domain & Case PI",
    subtitle: "Deep-Dive into SIP, Valuation & 4Ps",
    icon: Briefcase,
    color: "bg-rose-500",
    description: "Rigorous 30-45 min technical interviews covering Summer Internship Projects (SIP), financial statement linkage, market entry frameworks, guesstimates, and stress testing."
  },
  {
    step: "Stage 07",
    title: "Partner / HR Round & Offer Rollout",
    subtitle: "Cultural Fit, Spot Offers & PPO Conversion",
    icon: Award,
    color: "bg-teal-500",
    description: "Final fitment check with Managing Directors/Partners, institutional placement policy compliance (One-Offer / Dream rules), and final offer letter release."
  }
];

export const TOP_5_RULES = [
  {
    number: "1",
    title: "Master Your SIP (Summer Internship Project)",
    rule: "80% of technical questions in PI revolve around your 8-week internship project. Know numbers, ROI, sample size, and methodology by heart.",
    icon: GraduationCap,
    bgColor: "bg-blue-50 border-blue-200 text-blue-900"
  },
  {
    number: "2",
    title: "Crack Guesstimates & Frameworks",
    rule: "Practice MECE, 4P, 3C, and Porter's 5 Forces. Practice 2-3 guesstimates daily out loud with clear demographic and income segmentation.",
    icon: BarChart3,
    bgColor: "bg-purple-50 border-purple-200 text-purple-900"
  },
  {
    number: "3",
    title: "Prepare STAR Stories",
    rule: "Keep 5 structured stories ready using (Situation, Task, Action, Result) for behavioral rounds (Leadership, Conflict, Failure, Overachieving).",
    icon: Target,
    bgColor: "bg-emerald-50 border-emerald-200 text-emerald-900"
  },
  {
    number: "4",
    title: "Read Business Headlines Daily",
    rule: "Stay updated with RBI repo policies, Big Tech trends, M&As, PE/VC funding climate, and Union Budget sector allocations.",
    icon: TrendingUp,
    bgColor: "bg-amber-50 border-amber-200 text-amber-900"
  },
  {
    number: "5",
    title: "Perfect your 'Tell Me About Yourself'",
    rule: "Pitch yourself in 90 seconds connecting your past background + MBA learning + future aspirations with the target job role.",
    icon: Sparkles,
    bgColor: "bg-rose-50 border-rose-200 text-rose-900"
  }
];

export default function MBAInterviewProcessSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedRecruiter, setExpandedRecruiter] = useState<string | null>('ey');
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'interview_qa' | 'complete_process' | 'top_rules'>('interview_qa');

  const filteredRecruiters = RECRUITER_DATA.filter(recruiter => {
    const matchesCategory = activeCategory === 'all' || recruiter.category === activeCategory;
    const matchesSearch = !searchQuery || 
      recruiter.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recruiter.roles.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recruiter.rounds.some(r => 
        r.roundName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.questions.some(q => q.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    return matchesCategory && matchesSearch;
  });

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      const isSubmitted = localStorage.getItem('starter_kit_submitted');
      if (isSubmitted === 'true') {
        window.open('/downloads/mba-campus-placement-interview-guide.pdf', '_blank');
      } else {
        setModalOpen(true);
      }
    }
  };

  const handleFormSuccess = () => {
    setModalOpen(false);
    if (typeof window !== 'undefined') {
      window.open('/downloads/mba-campus-placement-interview-guide.pdf', '_blank');
    }
  };

  return (
    <section id="interview-process-guide" className="mt-20 mb-16 pt-8 border-t border-slate-200/80">
      
      {/* Header Banner */}
      <div className="text-center max-w-4xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-extrabold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>MBA Campus Placement Master Toolkit 2026-27</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
          MBA Campus Placement <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600">Selection Process & Questions</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
          Top Recruiters Selection Rounds, Industry Expectations, Frameworks & Real Interview Questions for <span className="font-bold text-slate-900">Big 4, BFSI, FMCG, Tech & Consulting</span> campus placement.
        </p>

        {/* Master PDF Download Button */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleDownloadClick}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/25 transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <Download className="w-4 h-4" /> Download Official 4-Page Placement Guide (PDF)
          </button>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl text-xs font-semibold text-slate-700 border border-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verified by IIM / Top B-School Alumni</span>
          </div>
        </div>
      </div>

      {/* Main Section Navigation Tabs */}
      <div className="flex items-center justify-center mb-8">
        <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200 max-w-full overflow-x-auto">
          <button
            onClick={() => setActiveTab('interview_qa')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'interview_qa'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Interview Q&A by Recruiter</span>
          </button>

          <button
            onClick={() => setActiveTab('complete_process')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'complete_process'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Complete 7-Stage Process</span>
          </button>

          <button
            onClick={() => setActiveTab('top_rules')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'top_rules'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>Top 5 Golden Rules</span>
          </button>
        </div>
      </div>

      {/* TAB 1: RECRUITER INTERVIEW Q&A */}
      {activeTab === 'interview_qa' && (
        <div className="space-y-6">
          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">Filter Domain:</span>
              {[
                { id: 'all', label: 'All Companies' },
                { id: 'consulting', label: 'Big 4 & Consulting' },
                { id: 'bfsi', label: 'BFSI & Banking' },
                { id: 'fmcg', label: 'FMCG & Marketing' },
                { id: 'tech', label: 'E-Commerce & Tech' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search company or questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          {/* Recruiter Accordion Cards */}
          <div className="space-y-4">
            {filteredRecruiters.map((recruiter) => {
              const isExpanded = expandedRecruiter === recruiter.id;
              return (
                <div
                  key={recruiter.id}
                  className={`bg-white rounded-2xl border ${recruiter.borderColor} shadow-xs transition-all overflow-hidden`}
                >
                  {/* Header */}
                  <div
                    onClick={() => setExpandedRecruiter(isExpanded ? null : recruiter.id)}
                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer bg-gradient-to-r hover:bg-slate-50/80 transition-all select-none"
                  >
                    <div className="flex items-start sm:items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-sm flex-shrink-0 shadow-xs">
                        {recruiter.companyName.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-lg font-bold text-slate-900">{recruiter.companyName}</h3>
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${recruiter.categoryBadgeBg} ${recruiter.categoryBadgeText}`}>
                            {recruiter.categoryLabel}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 font-medium">
                          <span className="font-bold text-slate-700">Key Roles:</span> {recruiter.roles}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                        {recruiter.rounds.length} Selection Rounds
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Content Table */}
                  {isExpanded && (
                    <div className="border-t border-slate-100 p-4 sm:p-6 bg-slate-50/50">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse bg-white rounded-xl shadow-xs overflow-hidden border border-slate-200">
                          <thead>
                            <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 text-xs font-extrabold uppercase tracking-wider">
                              <th className="py-3 px-4 w-1/4">Selection Round</th>
                              <th className="py-3 px-4 w-2/5">Round Description & Process</th>
                              <th className="py-3 px-4 w-1/3">Frequently Asked Questions / Topics</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-xs">
                            {recruiter.rounds.map((round, rIdx) => (
                              <tr key={rIdx} className="hover:bg-slate-50/60 transition-colors">
                                {/* Round Name */}
                                <td className="py-4 px-4 align-top">
                                  <span className={`inline-block px-2 py-0.5 rounded-md font-extrabold text-[10px] uppercase tracking-wider mb-1.5 border ${round.badgeStyle}`}>
                                    {round.roundNumber}
                                  </span>
                                  <div className="font-bold text-slate-900 text-sm">{round.roundName}</div>
                                  {round.sampleFramework && (
                                    <div className="mt-2 p-2 bg-indigo-50/80 rounded-lg border border-indigo-100 text-[11px] text-indigo-900">
                                      <span className="font-bold block text-indigo-700">💡 Recommended Framework:</span>
                                      {round.sampleFramework}
                                    </div>
                                  )}
                                </td>

                                {/* Description */}
                                <td className="py-4 px-4 align-top text-slate-700 leading-relaxed">
                                  <p className="font-medium">{round.description}</p>
                                  {round.tips && (
                                    <div className="mt-2 text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                                      <span className="font-bold">🎯 Pro Tip: </span>
                                      {round.tips}
                                    </div>
                                  )}
                                </td>

                                {/* Questions */}
                                <td className="py-4 px-4 align-top">
                                  <ul className="space-y-2">
                                    {round.questions.map((q, qIdx) => (
                                      <li key={qIdx} className="flex items-start gap-2 text-slate-900 font-semibold leading-snug">
                                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 flex-shrink-0"></span>
                                        <span>{q}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: COMPLETE 7-STAGE PROCESS FLOW */}
      {activeTab === 'complete_process' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl shadow-slate-100">
          <div className="max-w-3xl mb-8">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Complete MBA Campus Placement Process (Step-by-Step)
            </h3>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">
              Understand the standard end-to-end recruitment lifecycle followed at top IIMs, XLRI, SPJIMR, FMS, and reputed B-Schools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLACEMENT_PROCESS_STEPS.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <div 
                  key={idx}
                  className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
                        {step.step}
                      </span>
                      <div className={`w-8 h-8 rounded-xl ${step.color} text-white flex items-center justify-center shadow-xs`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-xs font-semibold text-slate-500 mb-2">{step.subtitle}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                    <span>Key Evaluation Point</span>
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summer Internships vs Final Placements comparison */}
          <div className="mt-10 p-6 bg-linear-to-r from-slate-900 to-indigo-950 rounded-2xl text-white">
            <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              Summer Internship Placements (SIP) vs Final Placements (PPO Conversion)
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Over 50% to 65% of premier consulting and banking roles at Tier-1 MBA institutes are filled directly through Pre-Placement Offers (PPOs) earned during 8-week summer internships.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-white/10 p-3.5 rounded-xl border border-white/10">
                <span className="font-bold text-amber-300 block mb-1">Summer Placements (Term 1-2):</span>
                CV shortlisting primarily based on past academics, graduation background, and online tests. Focus is on potential and communication.
              </div>
              <div className="bg-white/10 p-3.5 rounded-xl border border-white/10">
                <span className="font-bold text-emerald-300 block mb-1">Final Placements (Term 5-6):</span>
                Heavy focus on Summer Internship deliverable ROI, live client impact, MBA elective depth, and advanced domain problem-solving.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TOP 5 PREPARATION RULES */}
      {activeTab === 'top_rules' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl shadow-slate-100">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-200">
              <Lightbulb className="w-3.5 h-3.5" /> High-Impact Advice
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Top 5 Preparation Rules for MBA Placements
            </h3>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">
              Curated by career mentors & recruiters to maximize shortlist-to-offer conversion rates in campus placement interviews.
            </p>
          </div>

          <div className="space-y-4">
            {TOP_5_RULES.map((rule, idx) => {
              const IconComp = rule.icon;
              return (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border ${rule.bgColor} transition-all hover:shadow-md flex flex-col sm:flex-row items-start gap-4`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white shadow-xs flex items-center justify-center font-black text-lg text-slate-900 flex-shrink-0 border border-black/5">
                    {rule.number}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-extrabold mb-1 flex items-center gap-2">
                      <IconComp className="w-4 h-4 text-indigo-600" />
                      {rule.title}
                    </h4>
                    <p className="text-xs sm:text-sm leading-relaxed font-medium">
                      {rule.rule}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Cheat Sheet Trigger */}
          <div className="mt-8 p-6 bg-indigo-50/80 rounded-2xl border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-indigo-950">Want the Complete 4-Page Placement Guide in PDF?</h4>
              <p className="text-xs text-indigo-700 mt-0.5">Includes all company tables, questions, interview frameworks, and guesstimate solutions.</p>
            </div>
            <button
              onClick={handleDownloadClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all whitespace-nowrap cursor-pointer"
            >
              <Download className="w-4 h-4" /> Download Full PDF (Free)
            </button>
          </div>
        </div>
      )}

      {/* Modal for PDF Download */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            >
              ✕
            </button>

            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-extrabold uppercase tracking-wider mb-2">
                <Lock className="w-3.5 h-3.5" /> Instant Free PDF Access
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Download MBA Placement Guide</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Fill the quick form below to download <span className="font-bold text-indigo-600">MBA Campus Placement Selection Process & Questions (PDF)</span>.
              </p>
            </div>

            <StarterKitForm
              formSource="MBA Campus Placement Process & Interview Guide"
              onSuccessCallback={handleFormSuccess}
            />
          </div>
        </div>
      )}

    </section>
  );
}
