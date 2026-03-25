"use client";

import React, { useState } from "react";
import { 
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
import { SKILLS, Skill } from "@/lib/skillsData";

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
    }, 1200);
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
      if (activeSkill && score + (selectedAnswer === activeSkill.questions[currentQuestionIndex].answer ? 1 : 0) >= activeSkill.questions.length * 0.7) {
        setView("CERTIFIED");
      } else if (activeSkill) {
        // Failed -> Go back to training
        alert(`You scored ${score} out of ${activeSkill.questions.length}. You need at least 70% to pass. Let's review the materials!`);
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
              Equip yourself with the tools required in top MBA programs and Engineering careers. Our proprietary AI tutor will guide you step by step through complete curriculum tracks.
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
                    <span className="flex items-center gap-1.5"><PlayCircle size={16} /> Start Course</span>
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
                <div className="text-sm font-bold uppercase tracking-wider text-white/70 mb-1">Module</div>
                <div className="text-2xl font-black">{currentModuleIndex + 1} / {activeSkill.modules.length}</div>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-8 md:p-12 min-h-[400px] flex flex-col">
              {/* Progress Bar */}
              <div className="flex items-center gap-2 mb-10 w-full max-w-sm mx-auto">
                {activeSkill.modules.map((m, i) => (
                  <div key={i} className="flex-1 h-3 rounded-full bg-gray-100 overflow-hidden relative" title={m.title}>
                    <div 
                      className={`absolute top-0 left-0 h-full ${activeSkill.color} transition-all duration-1000 ease-out`}
                      style={{ width: i < currentModuleIndex ? '100%' : (i === currentModuleIndex ? '100%' : '0%') }}
                    />
                  </div>
                ))}
              </div>

              {/* AI Chat Layout */}
              <div className="flex gap-6 relative">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 cursor-default border-2 border-green-500 shadow-sm mt-2">
                   <Bot size={24} className="text-green-600" />
                </div>
                
                <div className="bg-gray-50 p-6 md:p-8 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex-grow">
                  {isTyping ? (
                    <div className="flex gap-1.5 items-center py-4 text-gray-400">
                      <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  ) : (
                    <div className="prose prose-gray max-w-none animate-in fade-in duration-500">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        {activeSkill.modules[currentModuleIndex].title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-lg mb-6">
                        {activeSkill.modules[currentModuleIndex].content}
                      </p>
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-md mt-6">
                        <p className="text-sm text-yellow-800 m-0 font-medium tracking-wide">
                          💡 <strong>Pro Tip:</strong> Master the concepts discussed in this module, as they are crucial for passing the 20-question certification exam.
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
                    <>Take 20-Question Exam <FileCheck size={20} /></>
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
                Question {currentQuestionIndex + 1} of {activeSkill.questions.length} • 70% Required to Pass
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
                <CheckCircle2 size={16} /> Exam Passed ({score}/{activeSkill.questions.length})
              </div>

              <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-2">You're Certified!</h2>
              <p className="text-xl text-gray-500 mb-8 font-medium">
                Congratulations on completing the <strong className={`text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 border-b-2 border-dashed border-gray-300 pb-1`}>{activeSkill.title}</strong> master curriculum.
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
