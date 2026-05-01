'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, User, Bot, CheckCircle2 } from 'lucide-react';
import { COURSE_OPTIONS, BUDGET_OPTIONS } from '@/lib/constants';

type Message = {
  id: string;
  type: 'bot' | 'user';
  text: string;
  options?: string[];
  field?: string;
};

export function BotInquiryPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      question: "Hi there! 👋 I'm Mohit's assistant. What's your name?",
      field: 'name',
      type: 'text'
    },
    {
      question: (name: string) => `Nice to meet you, ${name}! Which course are you interested in?`,
      field: 'course',
      type: 'select',
      options: COURSE_OPTIONS
    },
    {
      question: "Great choice! Could you share your WhatsApp number so we can send you the details?",
      field: 'number',
      type: 'tel'
    },
    {
      question: "And your email address?",
      field: 'email',
      type: 'email'
    },
    {
      question: "Where are you currently located?",
      field: 'location',
      type: 'text'
    },
    {
      question: "Where would you like to study? (Preferred Location)",
      field: 'preferredLocation',
      type: 'text'
    },
    {
      question: "Last question: What's your budget range for the course?",
      field: 'budget',
      type: 'select',
      options: BUDGET_OPTIONS
    }
  ];

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        const initialQuestion = steps[0].question;
        addBotMessage(typeof initialQuestion === 'function' ? initialQuestion('') : initialQuestion);
      }, 10000); // Show after 10 seconds
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const addBotMessage = (text: string, options?: string[], field?: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        text,
        options,
        field
      };
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleUserInput = async (value: string) => {
    if (!value.trim()) return;

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
      const question = typeof nextStepData.question === 'function' 
        ? nextStepData.question(newFormData.name || '') 
        : nextStepData.question;
      
      addBotMessage(question, nextStepData.options, nextStepData.field);
    } else {
      // Final Step: Submit
      submitLeads(newFormData);
    }
  };

  const submitLeads = async (data: any) => {
    setIsTyping(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          source: `Bot Inquiry (${data.course})`,
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        addBotMessage("Thank you! Your inquiry has been submitted. Our team will get back to you shortly. ✨");
      } else {
        addBotMessage("Oops! Something went wrong. Please try again or use the main contact form.");
      }
    } catch (e) {
      addBotMessage("Connection error. Please try again later.");
    }
    setIsTyping(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      {!isMinimized && (
        <div className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white border-4 border-foreground rounded-2xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-primary p-4 border-b-4 border-foreground flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-foreground overflow-hidden">
                <Bot size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-black text-white uppercase text-sm tracking-tight">Mohit's Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-bold text-blue-50 uppercase">Online</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsMinimized(true)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <X size={20} className="text-white" />
            </button>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scroll-smooth"
          >
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-3 rounded-2xl font-bold text-sm shadow-sm border-2 ${
                  msg.type === 'user' 
                    ? 'bg-primary text-white border-foreground rounded-tr-none' 
                    : 'bg-white text-foreground border-gray-200 rounded-tl-none'
                }`}>
                  {msg.text}
                  
                  {msg.options && !isSubmitted && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {msg.options.map(opt => (
                        <button
                          key={opt}
                          onClick={() => handleUserInput(opt)}
                          className="bg-gray-100 hover:bg-primary hover:text-white border-2 border-foreground px-3 py-1 rounded-lg text-xs transition-all active:scale-95"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border-2 border-gray-200 p-3 rounded-2xl rounded-tl-none flex gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            )}
            
            {isSubmitted && (
              <div className="flex justify-center py-4">
                <div className="bg-green-100 text-green-800 border-2 border-green-500 px-4 py-2 rounded-full flex items-center gap-2 text-xs font-black uppercase">
                  <CheckCircle2 size={16} /> Inquiry Submitted
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
                    type={steps[currentStep].type}
                    placeholder="Type your answer..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 bg-gray-100 border-2 border-foreground px-4 py-2 rounded-xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <button 
                    type="submit"
                    className="bg-primary text-white border-2 border-foreground p-2 rounded-xl hover:bg-blue-600 transition-colors"
                  >
                    <Send size={20} />
                  </button>
                </form>
              ) : (
                <div className="text-center py-2">
                  <span className="text-[10px] font-black uppercase text-gray-400 italic">Please select an option above 👆</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Bubble Icon */}
      <button 
        onClick={() => setIsMinimized(!isMinimized)}
        className={`w-16 h-16 rounded-full border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center transition-all hover:scale-110 active:scale-95 group relative ${
          isMinimized ? 'bg-primary text-white' : 'bg-white text-primary'
        }`}
      >
        {isMinimized ? <MessageSquare size={32} /> : <X size={32} />}
        
        {isMinimized && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent border-2 border-foreground rounded-full flex items-center justify-center text-[10px] font-black text-foreground">
            1
          </span>
        )}
        
        {/* Tooltip */}
        {isMinimized && (
          <div className="absolute right-20 bg-white border-4 border-foreground px-4 py-2 rounded-xl whitespace-nowrap shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <span className="text-sm font-black uppercase italic text-foreground">Need Help? Ask me!</span>
          </div>
        )}
      </button>
    </div>
  );
}
