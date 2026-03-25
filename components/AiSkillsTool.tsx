"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  BarChart2, 
  PieChart, 
  Database, 
  Activity, 
  Cloud, 
  ShieldCheck, 
  Server, 
  Table,
  Bot,
  PlayCircle,
  FileCheck,
  Award,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Download,
  CheckCircle2,
  XCircle
} from "lucide-react";

type Skill = {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  color: string;
  modules: string[];
  questions: { q: string; options: string[]; answer: number }[];
};

const SKILLS: Skill[] = [
  {
    id: "powerbi",
    title: "Power BI",
    icon: BarChart2,
    color: "bg-yellow-500",
    description: "Master data visualization, DAX, and business intelligence reporting.",
    modules: ["Introduction to Power BI", "Data Modeling & DAX", "Creating Interactive Dashboards"],
    questions: [
      { q: "What does DAX stand for?", options: ["Data Analysis Expressions", "Data Assessment XML", "Dynamic Analytical X"], answer: 0 },
      { q: "Which tool allows you to transform data in Power BI?", options: ["Power Transform", "Power Query", "Power Automate"], answer: 1 }
    ]
  },
  {
    id: "tableau",
    title: "Tableau",
    icon: PieChart,
    color: "bg-blue-600",
    description: "Learn visual analytics, data blending, and creating intuitive dashboards.",
    modules: ["Connecting Data Sources", "Building Worksheets", "Interactive Dashboards & Stories"],
    questions: [
      { q: "What is a 'Story' in Tableau?", options: ["A sequence of visualizations", "A database connection", "A calculated field"], answer: 0 },
      { q: "Which of the following is not a valid Tableau file type?", options: [".twb", ".tdg", ".twbx"], answer: 1 }
    ]
  },
  {
    id: "sql",
    title: "SQL",
    icon: Database,
    color: "bg-indigo-500",
    description: "Query databases, write complex joins, and manage massive datasets.",
    modules: ["Basic CRUD Operations", "Joins and Subqueries", "Window Functions & Optimization"],
    questions: [
      { q: "Which clause is used to filter records?", options: ["WHERE", "FILTER", "CHOOSE"], answer: 0 },
      { q: "What does SQL stand for?", options: ["Structured Query Language", "Strong Question Language", "Sequential Query Logic"], answer: 0 }
    ]
  },
  {
    id: "sixsigma",
    title: "Six Sigma",
    icon: Activity,
    color: "bg-purple-600",
    description: "Process improvement methodologies to reduce defects and optimize business operations.",
    modules: ["Define & Measure", "Analyze & Improve", "Control & Certification"],
    questions: [
      { q: "What does DMAIC stand for?", options: ["Define, Measure, Analyze, Improve, Control", "Data, Metrics, Analytics, Insights, Cost"], answer: 0 },
      { q: "At what defect rate does a process achieve Six Sigma?", options: ["3.4 DPMO", "1.5 DPMO", "Zero defects"], answer: 0 }
    ]
  },
  {
    id: "cloudcomputing",
    title: "Cloud Computing",
    icon: Cloud,
    color: "bg-sky-500",
    description: "Understand IaaS, PaaS, SaaS models, cloud security, and architecture.",
    modules: ["Cloud Deployment Models", "Virtualization & Containers", "Cloud Security"],
    questions: [
      { q: "Which of these is a cloud service model?", options: ["Software as a Service (SaaS)", "Network as a Platform (NaaP)", "Hardware as a Service (HaaS)"], answer: 0 },
      { q: "Which characteristic is key to cloud computing?", options: ["On-demand self-service", "Manual scaling", "Local hosting only"], answer: 0 }
    ]
  },
  {
    id: "cybersecurity",
    title: "Cyber Security",
    icon: ShieldCheck,
    color: "bg-red-500",
    description: "Protect systems, networks, and programs from digital attacks.",
    modules: ["Threats & Vulnerabilities", "Network Security", "Cryptography & Risk Management"],
    questions: [
      { q: "What is the primary goal of phishing?", options: ["Stealing sensitive information", "Increasing network speed", "Encrypting files"], answer: 0 },
      { q: "What does VPN stand for?", options: ["Virtual Private Network", "Visual Processing Node", "Verified Public Network"], answer: 0 }
    ]
  },
  {
    id: "aws",
    title: "AWS",
    icon: Server,
    color: "bg-orange-500",
    description: "Deploy, manage, and scale cloud applications on Amazon Web Services.",
    modules: ["EC2 & S3 Basics", "IAM & Security", "Serverless Computing & DBs"],
    questions: [
      { q: "What service is used for object storage in AWS?", options: ["Amazon EC2", "Amazon S3", "Amazon RDS"], answer: 1 },
      { q: "What is Amazon EC2 primarily used for?", options: ["Database management", "Virtual servers in the cloud", "Domain name registration"], answer: 1 }
    ]
  },
  {
    id: "excel",
    title: "Advanced Excel",
    icon: Table,
    color: "bg-emerald-600",
    description: "Master VLOOKUP, Pivot Tables, Macros, and advanced data modeling algorithms.",
    modules: ["Advanced Formulas", "Pivot Tables & Charts", "Macros & VBA Basics"],
    questions: [
      { q: "Which function searches for a value in the first column of a table array?", options: ["HLOOKUP", "VLOOKUP", "MATCH"], answer: 1 },
      { q: "What is a major feature used to summarize large amounts of data in Excel?", options: ["Pivot Tables", "Conditional Formatting", "Data Validation"], answer: 0 }
    ]
  }
];

export default function AiSkillsTool() {
  const [view, setView] = useState<"LIST" | "TRAINING" | "TEST" | "CERTIFIED">("LIST");
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  
  // Training state
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  
  // Test state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const startTraining = (skill: Skill) => {
    setActiveSkill(skill);
    setCurrentModuleIndex(0);
    setView("TRAINING");
    triggerAiTyping();
  };

  const triggerAiTyping = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1500);
  };

  const nextModule = () => {
    if (activeSkill && currentModuleIndex < activeSkill.modules.length - 1) {
      setCurrentModuleIndex((prev) => prev + 1);
      triggerAiTyping();
    } else {
      startTest();
    }
  };

  const startTest = () => {
    setView("TEST");
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    
    if (activeSkill && index === activeSkill.questions[currentQuestionIndex].answer) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (activeSkill && currentQuestionIndex < activeSkill.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Finished test
      if (activeSkill && score + (selectedAnswer === activeSkill.questions[currentQuestionIndex].answer ? 1 : 0) >= activeSkill.questions.length / 2) {
        setView("CERTIFIED");
      } else {
        // Failed -> Go back to training
        alert("You need a higher score to pass. Let's review the materials!");
        setView("TRAINING");
        setCurrentModuleIndex(0);
      }
    }
  };

  const handleDownloadCertificate = () => {
    alert(`Downloading ${activeSkill?.title} Certification! (Simulated)`);
  };

  return (
    <div className="w-full">
      {view === "LIST" && (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose a Skill to Master</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Equip yourself with the tools required in top MBA programs and Engineering careers. Our proprietary AI tutor will guide you step by step.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 bg-transparent lg:grid-cols-4 gap-6">
            {SKILLS.map((skill) => {
              const Icon = skill.icon;
              return (
                <div 
                  key={skill.id}
                  onClick={() => startTraining(skill)}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 p-6 flex flex-col items-start cursor-pointer transition-all hover:-translate-y-1 group"
                >
                  <div className={`p-4 rounded-xl text-white ${skill.color} mb-5 shadow-lg shadow-${skill.color}/30 transform group-hover:scale-110 transition-transform`}>
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{skill.title}</h3>
                  <p className="text-gray-600 text-sm flex-grow mb-6 line-clamp-3">
                    {skill.description}
                  </p>
                  <div className="mt-auto w-full flex items-center justify-between text-primary font-semibold text-sm">
                    <span className="flex items-center gap-1.5"><PlayCircle size={16} /> Start Module</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {view === "TRAINING" && activeSkill && (
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button 
            onClick={() => setView("LIST")}
            className="flex items-center gap-2 text-gray-500 hover:text-primary mb-6 transition-colors font-medium"
          >
            <ArrowLeft size={18} /> Back to Curriculum
          </button>
          
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className={`${activeSkill.color} p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6`}>
              <div className="flex items-center gap-5">
                <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm shadow-inner">
                  <activeSkill.icon size={40} className="text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-1">{activeSkill.title} Masterclass</h2>
                  <div className="flex items-center gap-2 text-white/80 font-medium">
                    <Bot size={16} /> AI Tutor Active
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold uppercase tracking-wider text-white/70 mb-1">Progress</div>
                <div className="text-2xl font-black">{currentModuleIndex + 1} / {activeSkill.modules.length}</div>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-8 md:p-12 min-h-[400px] flex flex-col">
              {/* Progress Bar */}
              <div className="flex items-center gap-2 mb-10 w-full max-w-sm mx-auto">
                {activeSkill.modules.map((m, i) => (
                  <div key={i} className="flex-1 h-3 rounded-full bg-gray-100 overflow-hidden relative">
                    <div 
                      className={`absolute top-0 left-0 h-full ${activeSkill.color} transition-all duration-1000 ease-out`}
                      style={{ width: i < currentModuleIndex ? '100%' : (i === currentModuleIndex ? '100%' : '0%') }}
                    />
                  </div>
                ))}
              </div>

              {/* AI Chat Layout */}
              <div className="flex gap-6 relative">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 animate-bounce cursor-default border-2 border-green-500 shadow-md">
                   <Bot size={24} className="text-green-600" />
                </div>
                
                <div className="bg-gray-50 p-6 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${activeSkill.color} animate-pulse`} />
                    {activeSkill.modules[currentModuleIndex]}
                  </h3>
                  
                  {isTyping ? (
                    <div className="flex gap-1.5 items-center py-4 text-gray-400">
                      <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  ) : (
                    <div className="prose prose-gray animate-in fade-in duration-500">
                      <p className="text-gray-700 leading-relaxed text-lg mb-6">
                        Welcome to the <strong>{activeSkill.modules[currentModuleIndex]}</strong> session. 
                        In this module, you are learning the core patterns and foundational principles required to master {activeSkill.title}. 
                      </p>
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-md">
                        <p className="text-sm text-yellow-800 m-0 font-medium">
                          💡 <strong>Pro Tip:</strong> Ensure that you pay attention to the fundamental theories discussed here, as they will appear in the final certification exam.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-auto pt-10 flex justify-end">
                <button
                  onClick={nextModule}
                  disabled={isTyping}
                  className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all
                    ${isTyping ? 'bg-gray-300 cursor-not-allowed' : `${activeSkill.color} hover:shadow-lg hover:-translate-y-1 transform`}
                  `}
                >
                  {currentModuleIndex === activeSkill.modules.length - 1 ? (
                    <>Take Certification Exam <FileCheck size={20} /></>
                  ) : (
                    <>Next Module <ChevronRight size={20} /></>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {view === "TEST" && activeSkill && (
        <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gray-900 text-white p-6 text-center border-b-4" style={{ borderColor: activeSkill.color }}>
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-white/10 mb-4">
                <FileCheck size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">{activeSkill.title} Certification Exam</h2>
              <p className="text-gray-400 text-sm font-medium">
                Question {currentQuestionIndex + 1} of {activeSkill.questions.length}
              </p>
            </div>
            
            <div className="p-8 md:p-12">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-8 leading-relaxed">
                {activeSkill.questions[currentQuestionIndex].q}
              </h3>
              
              <div className="space-y-4">
                {activeSkill.questions[currentQuestionIndex].options.map((opt, idx) => {
                  const isCorrectAnswer = activeSkill.questions[currentQuestionIndex].answer === idx;
                  const isSelected = selectedAnswer === idx;
                  
                  let buttonStyle = "border-gray-200 hover:border-primary hover:bg-gray-50";
                  let icon = null;
                  
                  if (showResult) {
                    if (isCorrectAnswer) {
                      buttonStyle = "border-green-500 bg-green-50 text-green-800 font-bold";
                      icon = <CheckCircle2 size={24} className="text-green-500 ml-auto" />;
                    } else if (isSelected) {
                      buttonStyle = "border-red-500 bg-red-50 text-red-800";
                      icon = <XCircle size={24} className="text-red-500 ml-auto" />;
                    } else {
                      buttonStyle = "border-gray-200 opacity-50";
                    }
                  } else if (isSelected) {
                    buttonStyle = "border-primary bg-primary/5";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      disabled={showResult}
                      className={`w-full p-5 rounded-xl border-2 text-left flex items-center transition-all bg-white text-gray-800 font-medium text-lg ${buttonStyle}`}
                    >
                      <span className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center font-bold mr-4 text-sm shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      {opt}
                      {icon}
                    </button>
                  );
                })}
              </div>
              
              {showResult && (
                <div className="mt-10 flex justify-end animate-in fade-in run-in-1">
                  <button
                    onClick={nextQuestion}
                    className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-xl font-bold transition-transform hover:-translate-y-1 shadow-lg"
                  >
                    {currentQuestionIndex === activeSkill.questions.length - 1 ? 'View Result' : 'Next Question'} 
                    <ArrowRight size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {view === "CERTIFIED" && activeSkill && (
        <div className="max-w-2xl mx-auto text-center animate-in zoom-in-95 duration-500">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 relative">
             <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20" style={{ backgroundImage: `linear-gradient(135deg, ${activeSkill.color} 0%, transparent 100%)`}} />
            
            <div className="p-12 relative z-10 flex flex-col items-center">
              <div className="relative mb-8 group">
                <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-yellow-300 to-yellow-600 w-32 h-32 flex items-center justify-center rounded-full shadow-2xl border-4 border-white mb-2">
                  <Award size={64} className="text-white drop-shadow-lg" />
                </div>
              </div>
              
              <div className="bg-green-100 text-green-800 px-4 py-1 rounded-full font-bold text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
                <CheckCircle2 size={16} /> Exam Passed
              </div>

              <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-2">You're Certified!</h2>
              <p className="text-xl text-gray-500 mb-8 font-medium">
                Congratulations on completing the <strong className={`text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 border-b-2 border-dashed border-gray-300 pb-1`}>{activeSkill.title}</strong> masterclass.
              </p>
              
              <div className="border border-gray-200 rounded-xl p-6 bg-gray-50 w-full mb-10 shadow-inner">
                 <p className="text-sm text-gray-400 font-semibold tracking-widest uppercase mb-2">Official Credential</p>
                 <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm font-mono text-gray-800 font-medium">
                   <span>ID: CWM-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                   <span className="text-green-600 font-bold bg-green-50 px-2 py-1 rounded">VERIFIED</span>
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <button
                  onClick={handleDownloadCertificate}
                  className="flex-1 flex justify-center items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold transition-all hover:shadow-lg shadow-primary/30"
                >
                  <Download size={20} /> Download Certificate
                </button>
                <button
                  onClick={() => setView("LIST")}
                  className="flex-1 flex justify-center items-center gap-2 bg-white border-2 border-gray-200 hover:border-gray-900 text-gray-900 px-8 py-4 rounded-xl font-bold transition-colors"
                >
                  Learn Another Skill
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
