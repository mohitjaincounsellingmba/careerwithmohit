'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  CheckCircle2, 
  Sparkles, 
  Award, 
  GraduationCap, 
  DollarSign, 
  MapPin, 
  PhoneCall, 
  FileText, 
  RefreshCw, 
  ArrowRight, 
  MessageCircle,
  TrendingUp,
  ShieldCheck,
  Building2,
  Check,
  Zap
} from 'lucide-react';
import { COURSE_OPTIONS, BUDGET_OPTIONS } from '@/lib/constants';
import { submitLead } from '@/lib/leads';

type CollegeRec = {
  name: string;
  badge: string;
  avgPkg: string;
  roiNote: string;
  scholarship: string;
};

type Message = {
  id: string;
  type: 'bot' | 'user';
  text: string;
  options?: string[];
  field?: string;
  isCard?: boolean;
  recommendations?: CollegeRec[];
  counsellingPath?: string;
};

function getCollegeRecommendations(course: string, location: string): CollegeRec[] {
  const cLower = course.toLowerCase();
  const lLower = location.toLowerCase();

  if (cLower.includes('btech') || cLower.includes('engineering') || cLower.includes('m.tech')) {
    if (lLower.includes('delhi') || lLower.includes('ncr') || lLower.includes('noida')) {
      return [
        { 
          name: 'JIIT Jaypee Noida / MAIT Delhi', 
          badge: 'Tier 1 Tech • High ROI', 
          avgPkg: '11.5 LPA', 
          roiNote: 'Top IT Placements & 85% Delhi Quota Available',
          scholarship: 'Up to 30% Merit Scholarship'
        },
        { 
          name: 'Amity University / GL Bajaj NCR', 
          badge: 'Direct & Merit Option', 
          avgPkg: '7.8 LPA', 
          roiNote: 'Fast-Track Counseling & Global Alumni Network',
          scholarship: 'Up to 50% on 12th / JEE Score'
        },
        { 
          name: 'SRM Sonepat / KIET Ghaziabad', 
          badge: 'NAAC A+ Accredited', 
          avgPkg: '8.2 LPA', 
          roiNote: 'Excellent Infrastructure & Corporate Tie-ups',
          scholarship: 'Merit-based Fee Waiver'
        }
      ];
    }
    return [
      { 
        name: 'BITS Pilani / VIT Vellore / Manipal', 
        badge: 'Premier All-India Tech', 
        avgPkg: '12.5 LPA', 
        roiNote: 'Tier-1 Tech Placements & Global Recognition',
        scholarship: 'Scholarship on Entrance Rank'
      },
      { 
        name: 'Thapar Patiala / Pune MIT-WPU', 
        badge: 'Top Private University', 
        avgPkg: '9.8 LPA', 
        roiNote: 'Excellent R&D & Industry Immersion',
        scholarship: 'Up to 40% Academic Scholarship'
      },
      { 
        name: 'Amity / LPU / SRM University', 
        badge: 'Direct Admission Available', 
        avgPkg: '7.5 LPA', 
        roiNote: 'Guaranteed Placement Assistance & Modern Campus',
        scholarship: 'Merit Scholarship Eligible'
      }
    ];
  }

  if (cLower.includes('online')) {
    return [
      { 
        name: 'Amity University Online', 
        badge: 'UGC & NAAC A+ Accredited', 
        avgPkg: '8.5 LPA', 
        roiNote: '100% Online • WES Approved & Placement Support',
        scholarship: 'Special Early Bird Fee Offer'
      },
      { 
        name: 'Manipal University Online', 
        badge: 'Top Ranked Online Degree', 
        avgPkg: '9.0 LPA', 
        roiNote: '0% EMI Fee Available & Live Mentor Support',
        scholarship: 'Up to 20% Scholarship for Professionals'
      },
      { 
        name: 'NMIMS / Jain University Online', 
        badge: 'Industry Recognized', 
        avgPkg: '8.2 LPA', 
        roiNote: 'Flexible Examinations & Corporate Alumni Network',
        scholarship: 'Merit Discount Available'
      }
    ];
  }

  if (cLower.includes('abroad')) {
    return [
      { 
        name: 'Top USA / UK STEM Universities', 
        badge: '2-Year Post-Study Visa', 
        avgPkg: '$75,000+', 
        roiNote: 'IELTS / GRE Waiver & Assistantship Guidance',
        scholarship: 'Up to $15,000 Bursary Available'
      },
      { 
        name: 'Germany & Ireland Universities', 
        badge: 'Low Tuition • Fast PR Track', 
        avgPkg: '€60,000+', 
        roiNote: 'Strong Engineering & Tech Job Market',
        scholarship: 'Public / Merit Scholarship Support'
      },
      { 
        name: 'Canada & Australia Premier Unis', 
        badge: 'Global PR Opportunity', 
        avgPkg: '$65,000+', 
        roiNote: 'High ROI & Part-time Work Rights',
        scholarship: '20%-30% International Student Discount'
      }
    ];
  }

  // Default MBA / PGDM / BBA / Other
  if (lLower.includes('pune')) {
    return [
      { 
        name: 'SIBM Pune / SCMHRD', 
        badge: 'Symbiosis Premier B-School', 
        avgPkg: '23.0 LPA', 
        roiNote: 'Top 10 Indian B-School • Legacy Alumni Network',
        scholarship: 'Top SNAP Ranker Scholarship'
      },
      { 
        name: 'BIMM Balaji / Indira Group (ISBS)', 
        badge: 'Best ROI in Pune Region', 
        avgPkg: '11.5 LPA', 
        roiNote: '100% Placement Support & Strong Industry Connect',
        scholarship: 'Up to 25% Merit Fee Waiver'
      },
      { 
        name: 'MIT-WPU / PUMBA Pune', 
        badge: 'Top Accredited Campus', 
        avgPkg: '9.5 LPA', 
        roiNote: 'Direct Guidance & Comprehensive Specializations',
        scholarship: 'Merit Scholarship Available'
      }
    ];
  }

  if (lLower.includes('delhi') || lLower.includes('ncr') || lLower.includes('noida') || lLower.includes('gurgaon')) {
    return [
      { 
        name: 'IMT Ghaziabad / BIMTECH NCR', 
        badge: 'Tier 1 Legacy PGDM', 
        avgPkg: '14.5 LPA', 
        roiNote: 'Uncompromised Corporate Placements & High ROI',
        scholarship: 'Merit-based Scholarship up to 20%'
      },
      { 
        name: 'FORE School / LBSIM Delhi', 
        badge: '100% Placement Record', 
        avgPkg: '14.0 LPA', 
        roiNote: 'Strong Finance & Marketing Corporate Tie-ups',
        scholarship: 'Academic Excellence Waiver'
      },
      { 
        name: 'Amity Noida / GL Bajaj / IILM NCR', 
        badge: 'Direct & Merit Option', 
        avgPkg: '9.5 LPA', 
        roiNote: 'Fast-Track Admissions & Excellent Infrastructure',
        scholarship: 'Up to 50% Scholarship on Entrance Score'
      }
    ];
  }

  return [
    { 
      name: 'BIMTECH / IMT Ghaziabad', 
      badge: 'Top Ranked Accredited PGDM', 
      avgPkg: '13.5 LPA', 
      roiNote: 'High Average Salary & Multi-City Campus Access',
      scholarship: 'Up to 25% Merit Waiver'
    },
    { 
      name: 'BIMM Pune / FORE School Delhi', 
      badge: 'Excellent ROI • Top Recruiters', 
      avgPkg: '12.0 LPA', 
      roiNote: '100% Placement Track Record & Industry Immersion',
      scholarship: 'Scholarship Available for High Percentile'
    },
    { 
      name: 'Amity University / Alliance / Christ', 
      badge: 'Direct Admission & Merit Campus', 
      avgPkg: '9.2 LPA', 
      roiNote: 'Guaranteed Interview Calls & Global Accreditations',
      scholarship: 'Up to 50% Academic Scholarship'
    }
  ];
}

export function BotInquiryPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({
    counsellingPath: 'AI College Matcher & ROI Check (2026-2027)'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);

  const consultationPaths = [
    '🎓 AI College Matcher & ROI Check (2026-2027)',
    '💰 Scholarship & Fee Cutoff Eligibility',
    '📅 Book 1-on-1 Strategy Call with Mohit Jain',
    '📄 Download Brochure & Cutoff PDF'
  ];

  const steps = [
    {
      id: 'path',
      question: "Hello! 👋 I'm Mohit Jain's AI Admissions Advisor for 2026-2027. I help you evaluate colleges, check scholarship eligibility up to 50%, and calculate true ROI. How would you like to start today?",
      field: 'counsellingPath',
      type: 'select',
      options: consultationPaths
    },
    {
      id: 'course',
      question: (path: string) => {
        if (path.includes('Scholarship')) {
          return "Great! We help students secure up to 30%-50% merit scholarships in top partner colleges. Which program are you applying for?";
        }
        if (path.includes('Call')) {
          return "Mohit Jain provides uncompromised 1-on-1 admission guidance! Which program do you want to evaluate?";
        }
        if (path.includes('Brochure')) {
          return "We have verified 2026-2027 fee structures, admission cutoffs, and placement PDFs ready! Which course are you interested in?";
        }
        return "Awesome! Let's find your best college match with top ROI. Which program are you planning to pursue?";
      },
      field: 'course',
      type: 'select',
      options: [
        'MBA',
        'PGDM',
        'BTech',
        'BBA',
        'Online MBA',
        'Abroad Education',
        'BCA',
        'MCA',
        'MBBS',
        'LLB',
        'M.Tech'
      ]
    },
    {
      id: 'exam',
      question: "Got it! What is your current entrance exam status or expected percentile?",
      field: 'entranceExam',
      type: 'select',
      options: [
        'CAT / XAT / NMAT',
        'JEE / CUET',
        'MAT / CMAT / ATMA',
        'Direct Merit / Without Exam',
        'Not Yet Appeared'
      ]
    },
    {
      id: 'location',
      question: "What is your preferred location for studying?",
      field: 'location',
      type: 'select',
      options: [
        'Delhi NCR',
        'Pune',
        'Mumbai / Bangalore',
        'Online Degree',
        'Study Abroad',
        'Any All India'
      ]
    },
    {
      id: 'budget',
      question: "What is your expected tuition fee budget range?",
      field: 'budget',
      type: 'select',
      options: BUDGET_OPTIONS
    },
    {
      id: 'ai_recommendation',
      question: "✨ Analysing 120+ accredited institutions against your profile... Here is your Instant AI Consultant Shortlist & ROI Analysis:",
      field: 'aiCard',
      type: 'card'
    },
    {
      id: 'name',
      question: "To send your personalized 15-page Admission Report & unlock your Free 1-on-1 Counselling Call with Mohit Jain, what is your Full Name?",
      field: 'name',
      type: 'text'
    },
    {
      id: 'number',
      question: (name: string) => `Pleasure to meet you, ${name}! 🤝 What is your WhatsApp number? (We will send your college PDF report & counselling invite here immediately)`,
      field: 'number',
      type: 'tel'
    },
    {
      id: 'email',
      question: "Last step: What is your Email address for sending official college brochures?",
      field: 'email',
      type: 'email'
    }
  ];

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        startNewConversation();
      }, 7000); // Show after 7 seconds
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const startNewConversation = () => {
    setMessages([]);
    setCurrentStep(0);
    setFormData({
      counsellingPath: consultationPaths[0]
    });
    setIsSubmitted(false);
    
    const initialQuestion = steps[0].question as string;
    addBotMessage(initialQuestion, steps[0].options, steps[0].field);
  };

  const addBotMessage = (
    text: string, 
    options?: string[], 
    field?: string, 
    isCard?: boolean, 
    recommendations?: CollegeRec[],
    counsellingPath?: string
  ) => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString() + Math.random().toString(),
        type: 'bot',
        text,
        options,
        field,
        isCard,
        recommendations,
        counsellingPath
      };
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 650);
  };

  const handleUserInput = async (value: string) => {
    if (!value.trim()) return;

    // Validate phone number at number step
    if (steps[currentStep].field === 'number') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length < 10) {
        addBotMessage("Please enter a valid 10-digit WhatsApp phone number so we can send your report.");
        return;
      }
    }

    const currentStepData = steps[currentStep];
    const newFormData = { ...formData, [currentStepData.field]: value };
    setFormData(newFormData);

    const userMsg: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: value
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    const nextStep = currentStep + 1;
    if (nextStep < steps.length) {
      setCurrentStep(nextStep);
      const nextStepData = steps[nextStep];

      // Handle the AI College Recommendation Card step
      if (nextStepData.id === 'ai_recommendation') {
        const courseSelected = newFormData.course || 'MBA';
        const locationSelected = newFormData.location || 'Delhi NCR';
        const recs = getCollegeRecommendations(courseSelected, locationSelected);
        
        // Add the intro text
        addBotMessage(
          `✨ Analysing 120+ accredited institutions for ${courseSelected} in ${locationSelected}... Here is your Instant AI Consultant Shortlist & ROI Analysis:`,
          undefined,
          undefined,
          true,
          recs,
          newFormData.counsellingPath
        );

        // Advance to the name step right after showing the card
        const nameStepIndex = nextStep + 1;
        setCurrentStep(nameStepIndex);
        setTimeout(() => {
          const nameStepData = steps[nameStepIndex];
          addBotMessage(
            nameStepData.question as string,
            nameStepData.options,
            nameStepData.field
          );
        }, 1400);
        return;
      }

      const question = typeof nextStepData.question === 'function' 
        ? nextStepData.question(newFormData.name || newFormData.counsellingPath || '') 
        : nextStepData.question;
      
      addBotMessage(question, nextStepData.options, nextStepData.field);
    } else {
      // Final Step: Submit
      submitLeads(newFormData);
    }
  };

  const submitLeads = async (data: any) => {
    setIsTyping(true);
    const courseSelected = data.course || 'MBA';
    const locationSelected = data.location || 'Delhi NCR';
    const recs = getCollegeRecommendations(courseSelected, locationSelected);

    const result = await submitLead({
      name: data.name,
      number: data.number,
      phone: data.number,
      email: data.email,
      course: courseSelected,
      location: locationSelected,
      budget: data.budget,
      source: `AI Education Consultant Bot (${data.counsellingPath || 'College Matcher'}: ${courseSelected})`,
      details: {
        counsellingPath: data.counsellingPath,
        entranceExam: data.entranceExam,
        preferredLocation: locationSelected,
        budget: data.budget,
        recommendedColleges: recs.map(r => r.name).join(' | '),
        scholarshipEligibility: "Up to 30-50% Merit Eligible",
        timestamp: new Date().toISOString()
      }
    });

    if (result.success) {
      setIsSubmitted(true);
      addBotMessage("Thank you! Your profile & college shortlist have been verified and assigned to Mohit Jain. ✨");
    } else {
      addBotMessage("Your profile has been received! You can also connect directly with Mohit Jain on WhatsApp below:");
      setIsSubmitted(true);
    }
    setIsTyping(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* ── Modern Sleek Teaser Tooltip when minimized ── */}
      {isMinimized && showTooltip && (
        <div className="mb-3 mr-1 bg-gradient-to-br from-[#0A192F] via-[#0D2342] to-[#123058] text-white border border-amber-400/40 p-4 rounded-3xl shadow-2xl shadow-blue-950/40 flex items-center gap-3.5 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-[310px] backdrop-blur-xl relative overflow-hidden group">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center shrink-0 font-black shadow-md shadow-amber-500/20">
            <Bot size={22} className="text-slate-950" />
          </div>

          <div 
            className="flex-1 cursor-pointer"
            onClick={() => {
              setIsMinimized(false);
              setShowTooltip(false);
            }}
          >
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="bg-amber-400 text-slate-950 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles size={10} className="fill-slate-950" /> AI Advisor 2026-27
              </span>
            </div>
            <p className="text-xs font-bold text-slate-100 leading-snug">
              Instant College Matcher & 50% Scholarship Check
            </p>
          </div>

          <button 
            onClick={() => setShowTooltip(false)}
            aria-label="Dismiss message"
            className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* ── Chat Window (EdTech Discovery UI) ── */}
      {!isMinimized && (
        <div className="mb-4 w-[350px] sm:w-[420px] h-[580px] max-h-[85vh] bg-white border border-slate-200/90 rounded-3xl shadow-2xl shadow-slate-950/30 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          
          {/* ── Modern Midnight Navy Header ── */}
          <div className="relative bg-gradient-to-r from-[#0A192F] via-[#0D2342] to-[#123058] p-4 border-b border-white/10 flex items-center justify-between text-white overflow-hidden shrink-0">
            {/* Ambient Lighting Orbs */}
            <div className="absolute -top-6 -right-6 w-28 h-28 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-[#123058] to-[#0A192F] rounded-2xl flex items-center justify-center border border-amber-400/50 shadow-md shadow-amber-500/10 relative">
                <Bot size={24} className="text-amber-300" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#0A192F] rounded-full"></span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-white text-sm tracking-tight">Mohit Jain AI Counselor</h3>
                  <span className="bg-amber-400/20 text-amber-300 text-[9px] font-black px-2 py-0.5 rounded-full border border-amber-400/30 uppercase tracking-wider">
                    2026–27 Desk
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                  <span className="text-[11px] font-medium text-slate-300">
                    Online • Real-Time College & ROI Matcher
                  </span>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center gap-1">
              <button
                onClick={startNewConversation}
                title="Restart Consultation"
                aria-label="Restart Consultation"
                className="p-2 hover:bg-white/10 rounded-xl transition-colors text-slate-300 hover:text-white"
              >
                <RefreshCw size={15} />
              </button>
              <button 
                onClick={() => setIsMinimized(true)}
                aria-label="Minimize chat assistant"
                className="p-2 hover:bg-white/10 rounded-xl transition-colors text-slate-300 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* ── Progress Tracker ── */}
          <div className="bg-slate-50 border-b border-slate-200/80 px-4 py-2 flex items-center justify-between text-[11px] font-bold text-slate-500 shrink-0">
            <span className="flex items-center gap-1.5">
              <Sparkles size={12} className="text-amber-500" />
              {isSubmitted ? 'Consultation Complete' : `Step ${Math.min(currentStep + 1, steps.length)} of ${steps.length} • Admissions Profiler`}
            </span>
            <span className="text-amber-600 font-extrabold">
              {Math.round((Math.min(currentStep + 1, steps.length) / steps.length) * 100)}%
            </span>
          </div>

          {/* ── Messages Area ── */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/60 scroll-smooth"
          >
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'} space-y-2`}
              >
                {/* Standard Text Message Bubble */}
                {msg.text && (
                  <div className={`max-w-[88%] p-3.5 rounded-2xl text-xs sm:text-sm font-medium leading-relaxed shadow-sm ${
                    msg.type === 'user' 
                      ? 'bg-gradient-to-r from-[#0A192F] to-[#1E3A8A] text-white rounded-tr-sm border border-white/10 shadow-md' 
                      : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-sm shadow-sm'
                  }`}>
                    {msg.text}

                    {/* Interactive Option Pills */}
                    {msg.options && !isSubmitted && (
                      <div className="mt-3.5 flex flex-wrap gap-1.5">
                        {msg.options.map(opt => (
                          <button
                            key={opt}
                            onClick={() => handleUserInput(opt)}
                            className="bg-slate-50 hover:bg-slate-950 hover:text-white border border-slate-200/90 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 transition-all active:scale-95 shadow-sm hover:shadow-md flex items-center gap-1.5 cursor-pointer"
                          >
                            <span>{opt}</span>
                            <ArrowRight size={12} className="opacity-60" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* ── THE UNIQUE FEATURE: Interactive AI College Recommendation Card ── */}
                {msg.isCard && msg.recommendations && (
                  <div className="w-full bg-white border border-slate-200 rounded-2xl p-4 shadow-lg shadow-slate-900/5 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                      <div className="flex items-center gap-2">
                        <Award className="text-amber-500" size={18} />
                        <span className="font-black text-xs uppercase text-slate-900 tracking-wider">
                          AI Verified Match
                        </span>
                      </div>
                      <span className="bg-amber-50 text-amber-800 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full border border-amber-200 uppercase">
                        High ROI Stream
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {msg.recommendations.map((rec, index) => (
                        <div 
                          key={rec.name}
                          className="bg-slate-50/90 border border-slate-200/80 rounded-xl p-3 hover:border-amber-400 hover:bg-white transition-all shadow-xs"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-snug">
                              {index + 1}. {rec.name}
                            </h4>
                            <span className="bg-emerald-50 text-emerald-800 font-black text-[10px] px-2 py-0.5 rounded-md border border-emerald-200 whitespace-nowrap">
                              {rec.avgPkg} Avg
                            </span>
                          </div>
                          <div className="mt-1.5 flex flex-wrap gap-1.5">
                            <span className="bg-blue-50 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-md border border-blue-200">
                              ⚡ {rec.badge}
                            </span>
                            <span className="bg-purple-50 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-md border border-purple-200">
                              🎯 {rec.roiNote}
                            </span>
                          </div>
                          <div className="mt-1.5 text-[11px] font-medium text-slate-600 flex items-center gap-1.5">
                            <ShieldCheck size={12} className="text-emerald-600 shrink-0" />
                            <span>{rec.scholarship}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-2.5 text-center">
                      <p className="text-[11px] font-bold text-amber-900">
                        📥 Comprehensive 15-Page 2027 Admission & Cutoff Report Ready!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-sm flex gap-1.5 items-center shadow-xs">
                  <span className="text-xs font-semibold text-slate-500 mr-1">AI Counselor is analysing</span>
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce delay-75"></span>
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            )}
            
            {/* Post-Submission Success Hub */}
            {isSubmitted && (
              <div className="w-full bg-white border border-slate-200 rounded-2xl p-5 shadow-lg space-y-4 animate-in zoom-in-95 duration-300">
                <div className="text-center space-y-1">
                  <div className="w-12 h-12 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
                    <CheckCircle2 size={26} />
                  </div>
                  <h4 className="font-black text-sm text-slate-900 uppercase tracking-tight pt-1">
                    Profile Verified & Assigned!
                  </h4>
                  <p className="text-xs text-slate-600 font-medium">
                    Mohit Jain & the admissions desk have received your profile for review.
                  </p>
                </div>

                {/* Instant Action CTA Buttons */}
                <div className="space-y-2 pt-1">
                  <a
                    href={`https://wa.me/919811004275?text=${encodeURIComponent(
                      `Hi Mohit Sir, I just used your AI Education Consultant Bot for ${formData.course || 'MBA'} counselling. My name is ${formData.name || ''} and I want to check my admission chances & get the college report!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all active:scale-95"
                  >
                    <MessageCircle size={16} /> Chat on WhatsApp with Mohit Now
                  </a>

                  <a
                    href="tel:+919811004275"
                    className="w-full bg-slate-950 hover:bg-slate-800 text-white py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wide flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
                  >
                    <PhoneCall size={15} /> Direct Call (+91-9811004275)
                  </a>

                  <button
                    onClick={startNewConversation}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-4 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RefreshCw size={13} /> Start Another Consultation
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── Input Bar ── */}
          {!isSubmitted && (
            <div className="p-3.5 bg-white border-t border-slate-200/90 shrink-0">
              {steps[currentStep].type !== 'select' ? (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUserInput(inputValue);
                  }}
                  className="flex gap-2"
                >
                  <input 
                    type={steps[currentStep].type === 'tel' ? 'tel' : steps[currentStep].type === 'email' ? 'email' : 'text'}
                    placeholder={
                      steps[currentStep].field === 'number' 
                        ? 'Enter 10-digit WhatsApp number...' 
                        : steps[currentStep].field === 'email'
                        ? 'Enter email address...'
                        : 'Type your answer here...'
                    }
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all"
                  />
                  <button 
                    type="submit"
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 p-2.5 rounded-xl transition-all shadow-md shadow-amber-500/20 active:scale-95 flex items-center justify-center cursor-pointer"
                    aria-label="Send message"
                  >
                    <Send size={18} />
                  </button>
                </form>
              ) : (
                <div className="text-center py-1">
                  <span className="text-[11px] font-bold text-slate-400 flex items-center justify-center gap-1.5">
                    <Sparkles size={12} className="text-amber-500" />
                    Please select an option above to proceed 👆
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Modern Floating Bot Launcher Orb ── */}
      <button 
        onClick={() => {
          setIsMinimized(!isMinimized);
          setShowTooltip(false);
        }}
        aria-label={isMinimized ? "Open Mohit Jain AI Education Counselor" : "Close AI Counselor"}
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 group relative shadow-2xl ${
          isMinimized 
            ? 'bg-gradient-to-br from-[#0A192F] via-[#0D2342] to-[#1E3A8A] text-white border-2 border-amber-400/50 shadow-blue-950/50' 
            : 'bg-white text-slate-900 border-2 border-slate-300 shadow-slate-950/20'
        }`}
      >
        {/* Glowing Halo when Minimized */}
        {isMinimized && (
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400/40 via-blue-500/20 to-amber-500/40 blur-sm group-hover:opacity-100 opacity-60 transition-opacity -z-10 animate-pulse"></span>
        )}

        {isMinimized ? (
          <div className="flex items-center justify-center relative">
            <Bot size={28} className="text-amber-300 group-hover:scale-110 transition-transform" />
            <Sparkles size={14} className="absolute -top-1.5 -right-1 text-amber-400 fill-amber-400 animate-spin duration-3000" />
          </div>
        ) : (
          <X size={26} className="text-slate-800" />
        )}
        
        {/* Live Notification Indicator Badge */}
        {isMinimized && (
          <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 rounded-full flex items-center justify-center text-[9px] font-black tracking-wider border border-white shadow-sm uppercase">
            AI
          </span>
        )}
      </button>
    </div>
  );
}
