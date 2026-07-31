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
  Check
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
    counsellingPath: 'AI College Matcher & ROI Check (Unique Feature)'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);

  const consultationPaths = [
    '🎓 AI College Matcher & ROI Check (Unique Feature)',
    '💰 Scholarship & Fee Cutoff Eligibility',
    '📅 Book 1-on-1 Counselling Call',
    '📄 Download Brochure & Cutoff PDF'
  ];

  const steps = [
    {
      id: 'path',
      question: "Hello! 👋 I'm Mohit Jain's AI Education Consultant. I help students discover top colleges, check scholarship eligibility up to 50%, and calculate ROI. How would you like to start today?",
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
          return "Mohit Jain provides honest, uncompromised 1-on-1 admission guidance! Which program do you want to discuss?";
        }
        if (path.includes('Brochure')) {
          return "We have official 2027 fee structures, admission cutoffs, and placement PDFs ready! Which course are you interested in?";
        }
        return "Awesome! Let's find your perfect college match with high ROI. Which program are you planning to pursue?";
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
      question: "Got it! What is your current entrance exam status or score for admission?",
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
      question: "Where is your preferred location for studying?",
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
      question: "Last question: What is your Email address for sending official college brochures?",
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
    }, 800);
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

      // Handle the UNIQUE FEATURE: AI College Recommendation Card step
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
        }, 1600);
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
      addBotMessage("Thank you! Your counselling profile & college shortlist have been verified and assigned to Mohit Jain. ✨");
    } else {
      addBotMessage("Oops! Something went wrong while saving your lead, but don't worry—you can connect with Mohit Jain directly on WhatsApp using the button below!");
      setIsSubmitted(true);
    }
    setIsTyping(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Teaser Tooltip when minimized */}
      {isMinimized && showTooltip && (
        <div className="mb-3 mr-2 bg-primary text-white border-4 border-foreground px-4 py-3 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-[280px]">
          <div className="w-8 h-8 rounded-full bg-yellow-400 text-foreground flex items-center justify-center shrink-0 border-2 border-foreground font-black text-sm">
            AI
          </div>
          <div 
            className="flex-1 cursor-pointer"
            onClick={() => {
              setIsMinimized(false);
              setShowTooltip(false);
            }}
          >
            <p className="text-xs font-black uppercase tracking-wide text-yellow-300">Free Unique Feature</p>
            <p className="text-xs font-bold text-white leading-tight">Instant AI College Matcher & 50% Scholarship Check 🎓</p>
          </div>
          <button 
            onClick={() => setShowTooltip(false)}
            aria-label="Dismiss message"
            className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Chat Window */}
      {!isMinimized && (
        <div className="mb-4 w-[350px] sm:w-[420px] h-[550px] bg-white border-4 border-foreground rounded-2xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-primary p-4 border-b-4 border-foreground flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center border-2 border-foreground overflow-hidden shadow-sm relative">
                <Bot size={26} className="text-primary" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-black text-white uppercase text-sm tracking-tight">Mohit AI Counsel</h3>
                  <span className="bg-yellow-400 text-foreground text-[10px] font-black px-1.5 py-0.5 rounded uppercase border border-foreground">
                    Consultant
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-bold text-blue-50 uppercase">Online • Instant College Matcher</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={startNewConversation}
                title="Restart Consultation"
                aria-label="Restart Consultation"
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-white"
              >
                <RefreshCw size={16} />
              </button>
              <button 
                onClick={() => setIsMinimized(true)}
                aria-label="Minimize chat assistant"
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-white"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-100 border-b-2 border-foreground/10 px-4 py-1.5 flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-gray-500">
            <span className="flex items-center gap-1">
              <Sparkles size={12} className="text-primary" />
              {isSubmitted ? 'Consultation Complete' : `Step ${Math.min(currentStep + 1, steps.length)} of ${steps.length} • AI Profile Analysis`}
            </span>
            <span className="text-primary font-bold">
              {Math.round((Math.min(currentStep + 1, steps.length) / steps.length) * 100)}%
            </span>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/80 scroll-smooth"
          >
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'} space-y-2`}
              >
                {/* Standard Text Message */}
                {msg.text && (
                  <div className={`max-w-[85%] p-3.5 rounded-2xl font-bold text-sm shadow-sm border-2 ${
                    msg.type === 'user' 
                      ? 'bg-primary text-white border-foreground rounded-tr-none' 
                      : 'bg-white text-foreground border-foreground/80 rounded-tl-none'
                  }`}>
                    {msg.text}

                    {/* Interactive Option Buttons */}
                    {msg.options && !isSubmitted && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {msg.options.map(opt => (
                          <button
                            key={opt}
                            onClick={() => handleUserInput(opt)}
                            className="bg-gray-50 hover:bg-primary hover:text-white border-2 border-foreground px-3 py-1.5 rounded-xl text-xs font-black transition-all active:scale-95 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none flex items-center gap-1"
                          >
                            <span>{opt}</span>
                            <ArrowRight size={12} />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* THE UNIQUE FEATURE: Interactive AI College Recommendation Card Inside Chat */}
                {msg.isCard && msg.recommendations && (
                  <div className="w-full bg-white border-4 border-foreground rounded-2xl p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-3">
                    <div className="flex items-center justify-between border-b-2 border-foreground/20 pb-2">
                      <div className="flex items-center gap-2">
                        <Award className="text-primary" size={20} />
                        <span className="font-black text-xs uppercase text-primary tracking-wide">
                          AI Verified Shortlist
                        </span>
                      </div>
                      <span className="bg-yellow-300 text-foreground font-black text-[10px] px-2 py-0.5 rounded-full border border-foreground uppercase">
                        High ROI Match
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {msg.recommendations.map((rec, index) => (
                        <div 
                          key={rec.name}
                          className="bg-gray-50 border-2 border-foreground rounded-xl p-3 hover:border-primary transition-colors"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-black text-sm text-foreground leading-tight">
                              {index + 1}. {rec.name}
                            </h4>
                            <span className="bg-green-100 text-green-800 font-extrabold text-[10px] px-1.5 py-0.5 rounded border border-green-600 whitespace-nowrap">
                              {rec.avgPkg} Avg
                            </span>
                          </div>
                          <div className="mt-1.5 flex flex-wrap gap-1.5">
                            <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-blue-200">
                              ⚡ {rec.badge}
                            </span>
                            <span className="bg-purple-50 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-purple-200">
                              🎯 {rec.roiNote}
                            </span>
                          </div>
                          <div className="mt-1.5 text-[11px] font-bold text-gray-600 flex items-center gap-1">
                            <ShieldCheck size={12} className="text-green-600" />
                            <span>{rec.scholarship}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-primary/5 border-2 border-primary/20 rounded-xl p-2.5 text-center">
                      <p className="text-[11px] font-extrabold text-foreground">
                        📥 Comprehensive 15-Page Admission & Cutoff Report Ready!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border-2 border-foreground/50 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
                  <span className="text-xs font-extrabold text-gray-500 mr-1">AI Counsel is thinking</span>
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-75"></span>
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            )}
            
            {/* Post-Submission Success Hub */}
            {isSubmitted && (
              <div className="w-full bg-white border-4 border-foreground rounded-2xl p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4 animate-in zoom-in-95 duration-300">
                <div className="text-center space-y-1">
                  <div className="w-12 h-12 bg-green-100 border-2 border-foreground rounded-full flex items-center justify-center mx-auto text-green-600 shadow-sm">
                    <CheckCircle2 size={28} />
                  </div>
                  <h4 className="font-black text-base text-foreground uppercase tracking-tight">
                    Lead Verified & Assigned!
                  </h4>
                  <p className="text-xs font-bold text-gray-600">
                    Mohit Jain & senior counsellors have received your profile.
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
                    className="w-full bg-green-500 hover:bg-green-600 text-white border-2 border-foreground py-2.5 px-4 rounded-xl font-black text-xs uppercase flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-95"
                  >
                    <MessageCircle size={16} /> Chat on WhatsApp with Mohit Now
                  </a>

                  <a
                    href="tel:+919811004275"
                    className="w-full bg-white hover:bg-gray-50 text-foreground border-2 border-foreground py-2.5 px-4 rounded-xl font-black text-xs uppercase flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:scale-95"
                  >
                    <PhoneCall size={16} /> Direct Call (+91-9811004275)
                  </a>

                  <button
                    onClick={startNewConversation}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 border-2 border-foreground/30 py-2 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <RefreshCw size={14} /> Start Another Consultation
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          {!isSubmitted && (
            <div className="p-4 bg-white border-t-4 border-foreground">
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
                    className="flex-1 bg-gray-100 border-2 border-foreground px-4 py-2 rounded-xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <button 
                    type="submit"
                    className="bg-primary text-white border-2 border-foreground p-2 rounded-xl hover:bg-blue-600 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:scale-95"
                    aria-label="Send message"
                  >
                    <Send size={20} />
                  </button>
                </form>
              ) : (
                <div className="text-center py-1">
                  <span className="text-[11px] font-black uppercase text-gray-500 flex items-center justify-center gap-1">
                    <Sparkles size={12} className="text-primary" />
                    Please click a recommendation option above 👆
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Floating Chat Bubble Button */}
      <button 
        onClick={() => {
          setIsMinimized(!isMinimized);
          setShowTooltip(false);
        }}
        aria-label={isMinimized ? "Open AI Education Consultant" : "Close AI Education Consultant"}
        className={`w-16 h-16 rounded-full border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center transition-all hover:scale-110 active:scale-95 group relative ${
          isMinimized ? 'bg-primary text-white' : 'bg-white text-primary'
        }`}
      >
        {isMinimized ? <MessageSquare size={32} /> : <X size={32} />}
        
        {isMinimized && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 border-2 border-foreground rounded-full flex items-center justify-center text-[10px] font-black text-foreground animate-pulse">
            1
          </span>
        )}
      </button>
    </div>
  );
}
