'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  Video, 
  CheckCircle2, 
  ArrowRight, 
  User, 
  Phone, 
  Mail, 
  MapPin,
  Loader2, 
  Calendar, 
  Edit3, 
  Sparkles,
  ShieldCheck,
  Check,
  Flame,
  AlertCircle,
  MessageCircle,
  ExternalLink,
  RefreshCw,
  HelpCircle
} from 'lucide-react';
import { submitLead } from '@/lib/leads';

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement | null;
        prefill?: {
          name?: string;
          email?: string;
          customAnswers?: Record<string, string>;
        };
        pageSettings?: {
          backgroundColor?: string;
          hideEventTypeDetails?: boolean;
          hideLandingPageDetails?: boolean;
          primaryColor?: string;
          textColor?: string;
        };
        utm?: Record<string, string>;
      }) => void;
      showPopupWidget?: (url: string) => void;
      closePopupWidget?: () => void;
    };
  }
}

interface CalendlyBookingWidgetProps {
  url?: string;
  className?: string;
  onBookingSuccess?: () => void;
}

const COURSES = [
  { id: 'mba-pgdm', label: 'MBA / PGDM' },
  { id: 'btech-bba-bca', label: 'B.Tech / BBA / BCA' },
  { id: 'mca-mtech', label: 'MCA / MTech' },
  { id: 'online-degree', label: 'Online MBA / Online MCA / Online BBA' },
];

const TARGET_EXAMS = [
  'CAT', 
  'XAT', 
  'CMAT', 
  'MAT', 
  'NMAT', 
  'SNAP', 
  'Direct / Non-CAT'
];

const BUDGET_RANGES = [
  'Under ₹10 Lakhs', 
  '₹10 - 15 Lakhs', 
  '₹15 - 25 Lakhs', 
  '₹25 Lakhs+'
];

export function CalendlyBookingWidget({
  url = 'https://calendly.com/careerwithmohit-jain',
  className = '',
}: CalendlyBookingWidgetProps) {
  // Step 1 Form States
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<string>('MBA / PGDM');
  const [selectedExam, setSelectedExam] = useState<string>('CAT');
  const [selectedBudget, setSelectedBudget] = useState<string>('₹10 - 15 Lakhs');
  const [parentJoining, setParentJoining] = useState<boolean>(true);
  
  // Validation & Submission States
  const [formError, setFormError] = useState<string>('');
  const [isSubmittingLead, setIsSubmittingLead] = useState<boolean>(false);
  const [isStepConfirmed, setIsStepConfirmed] = useState<boolean>(false);
  const [isScheduledSuccess, setIsScheduledSuccess] = useState<boolean>(false);

  // Calendly Widget States
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadTimedOut, setLoadTimedOut] = useState<boolean>(false);
  const [scriptBlocked, setScriptBlocked] = useState<boolean>(false);
  const calendarContainerRef = useRef<HTMLDivElement>(null);
  const scrollTargetRef = useRef<HTMLDivElement>(null);

  // Construct direct prefilled URL for Calendly
  const buildPrefilledUrl = (
    studentName = name, 
    studentEmail = email, 
    course = selectedCourse, 
    exam = selectedExam,
    budget = selectedBudget,
    city = location
  ) => {
    const summaryAnswers = [
      `Course: ${course}`,
      `Exam: ${exam}`,
      `Budget: ${budget}`,
      city ? `City: ${city}` : null,
      parentJoining ? `Parents Attending: Yes` : `Parents Attending: No`
    ].filter(Boolean).join(' | ');

    try {
      const u = new URL(url);
      u.searchParams.set('hide_landing_page_details', '1');
      u.searchParams.set('hide_gdpr_banner', '1');
      u.searchParams.set('primary_color', '4f46e5');
      u.searchParams.set('text_color', '1e293b');
      u.searchParams.set('background_color', 'ffffff');
      
      if (studentName.trim()) {
        u.searchParams.set('name', studentName.trim());
      }
      if (studentEmail.trim()) {
        u.searchParams.set('email', studentEmail.trim());
      }
      if (course.trim()) {
        u.searchParams.set('a1', course.trim());
      }
      if (summaryAnswers) {
        u.searchParams.set('a2', summaryAnswers);
      }
      return u.toString();
    } catch {
      let base = `${url}?hide_landing_page_details=1&hide_gdpr_banner=1&primary_color=4f46e5&text_color=1e293b&background_color=ffffff`;
      if (studentName.trim()) base += `&name=${encodeURIComponent(studentName.trim())}`;
      if (studentEmail.trim()) base += `&email=${encodeURIComponent(studentEmail.trim())}`;
      base += `&a1=${encodeURIComponent(course)}`;
      if (summaryAnswers) {
        base += `&a2=${encodeURIComponent(summaryAnswers)}`;
      }
      return base;
    }
  };

  // Express WhatsApp Booking with pre-filled text
  const getWhatsAppMessage = () => {
    const student = name.trim() || 'Aspirant';
    return encodeURIComponent(
      `Hi Mohit Sir, my name is ${student}. I want to book a free 1-on-1 MBA counselling video session.\n\n` +
      `📌 *My Profile & Preferences:*\n` +
      `• Interested Course: ${selectedCourse}\n` +
      `• Target Exam: ${selectedExam}\n` +
      `• Preferred Budget: ${selectedBudget}\n` +
      (location ? `• Current City: ${location}\n` : '') +
      `• WhatsApp Number: ${phone || 'This Number'}\n` +
      `• Parents Joining: ${parentJoining ? 'Yes' : 'No'}\n\n` +
      `Please let me know your next open Google Meet slot today!`
    );
  };

  // Initialize official Calendly Widget when Step 2 is active
  useEffect(() => {
    if (!isStepConfirmed) return;

    setIsLoading(true);
    setLoadTimedOut(false);
    setScriptBlocked(false);

    // Timeout fallback trigger if embed takes longer than 4.5s
    const timer = setTimeout(() => {
      setLoadTimedOut(true);
      setIsLoading(false);
    }, 4500);

    const initWidget = () => {
      if (typeof window === 'undefined' || !calendarContainerRef.current) return;

      try {
        if (window.Calendly && typeof window.Calendly.initInlineWidget === 'function') {
          calendarContainerRef.current.innerHTML = '';
          const targetUrl = buildPrefilledUrl(name, email, selectedCourse, selectedExam, selectedBudget, location);

          window.Calendly.initInlineWidget({
            url: targetUrl,
            parentElement: calendarContainerRef.current,
            prefill: {
              name: name.trim(),
              email: email.trim(),
              customAnswers: {
                a1: selectedCourse,
                a2: [
                  `Course: ${selectedCourse}`,
                  `Exam: ${selectedExam}`,
                  `Budget: ${selectedBudget}`,
                  location ? `City: ${location}` : '',
                  `Parents: ${parentJoining ? 'Yes' : 'No'}`
                ].filter(Boolean).join(' | ')
              }
            },
            pageSettings: {
              backgroundColor: 'ffffff',
              hideEventTypeDetails: false,
              hideLandingPageDetails: true,
              primaryColor: '4f46e5',
              textColor: '1e293b'
            }
          });

          // Wait brief moment for container injection
          setTimeout(() => {
            setIsLoading(false);
          }, 800);
        }
      } catch (err) {
        console.warn('Calendly init warning:', err);
        setScriptBlocked(true);
        setIsLoading(false);
      }
    };

    // Load Calendly CSS if not present
    if (!document.querySelector('link[href*="calendly.com/assets/external/widget.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      document.head.appendChild(link);
    }

    // Load Calendly Script if not present
    if (window.Calendly) {
      initWidget();
    } else {
      const existingScript = document.querySelector('script[src*="calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        existingScript.addEventListener('load', initWidget);
      } else {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        script.onload = () => {
          initWidget();
        };
        script.onerror = () => {
          setScriptBlocked(true);
          setIsLoading(false);
        };
        document.body.appendChild(script);
      }
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isStepConfirmed, name, email, selectedCourse, selectedExam, selectedBudget, location, parentJoining]);

  // Listen to Calendly messages (scheduled event confirmation)
  useEffect(() => {
    const handleCalendlyMessage = (e: MessageEvent) => {
      // Calendly scheduled event confirmation
      if (e.data && e.data.event === 'calendly.event_scheduled') {
        setIsScheduledSuccess(true);
        submitLead({
          name: name.trim() || 'Student (Calendly Confirmed)',
          number: phone.trim() || 'N/A',
          phone: phone.trim() || 'N/A',
          email: email.trim(),
          course: selectedCourse,
          program: selectedCourse,
          budget: selectedBudget,
          targetExam: selectedExam,
          location: location.trim() || 'Online',
          message: `[Confirmed Scheduled Booking on Calendly] Course: ${selectedCourse} | Exam: ${selectedExam} | Budget: ${selectedBudget} | City: ${location}${parentJoining ? ' | Parents Joining: Yes' : ''}`,
          source: 'Google Meet Counselling (Calendly Confirmed)',
          category: 'booking',
          details: {
            status: 'Confirmed Scheduled Slot',
            course: selectedCourse,
            targetExam: selectedExam,
            budget: selectedBudget,
            location: location.trim(),
            parentJoining: parentJoining ? 'Yes' : 'No'
          }
        }).catch(err => console.error('Calendly scheduled event submission error:', err));
      }
    };

    window.addEventListener('message', handleCalendlyMessage);

    return () => {
      window.removeEventListener('message', handleCalendlyMessage);
    };
  }, [name, phone, email, selectedCourse, selectedExam, selectedBudget, location, parentJoining]);

  // Handle Step 1 Confirmation & Lead Logging
  const handleConfirmStep = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const cleanName = name.trim();
    const rawDigits = phone.trim().replace(/\D/g, '');
    const cleanPhone = rawDigits.length >= 10 ? rawDigits.slice(-10) : rawDigits;

    if (!cleanName) {
      setFormError('Please enter your full name so Mohit knows who he is mentoring.');
      return;
    }

    if (!cleanPhone || cleanPhone.length !== 10) {
      setFormError('Please enter a valid 10-digit WhatsApp mobile number to receive your Google Meet link.');
      return;
    }

    setIsSubmittingLead(true);

    try {
      // 1. Immediately log lead into Firebase / Activepieces webhook
      await submitLead({
        name: cleanName,
        number: cleanPhone,
        phone: cleanPhone,
        email: email.trim(),
        location: location.trim() || 'Online',
        preferredLocation: location.trim() || 'Online',
        budget: selectedBudget,
        targetExam: selectedExam,
        course: selectedCourse,
        program: selectedCourse,
        category: 'booking',
        message: `Course: ${selectedCourse} | Exam: ${selectedExam} | Budget: ${selectedBudget} | City: ${location.trim()}${parentJoining ? ' | Parents Attending: Yes' : ''}`,
        source: 'Inquiry - Face-to-Face Google Meet Booking',
        details: {
          sessionType: '1-on-1 Face-to-Face Video (30 Mins)',
          course: selectedCourse,
          targetExam: selectedExam,
          budget: selectedBudget,
          location: location.trim(),
          parentsAttending: parentJoining ? 'Yes' : 'No',
        }
      });

      setIsStepConfirmed(true);

      // Smooth scroll to the slot calendar
      setTimeout(() => {
        scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);

    } catch (err: any) {
      console.warn('Lead submission warning:', err);
      setIsStepConfirmed(true);
      setTimeout(() => {
        scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } finally {
      setIsSubmittingLead(false);
    }
  };

  // Direct Jump to calendar view
  const handleDirectCalendarView = () => {
    setIsStepConfirmed(true);
    setTimeout(() => {
      scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  const directCalendlyLink = buildPrefilledUrl(name, email, selectedCourse, selectedExam, selectedBudget, location);

  return (
    <div className={`space-y-4 ${className}`} id="booking-widget-container">
      
      {/* Wizard Progress Header Bar */}
      <div className="bg-white rounded-2xl p-3 sm:p-3.5 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between gap-2">
          
          {/* Steps Indicator Tabs */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (isStepConfirmed) setIsStepConfirmed(false);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-left transition-all ${
                !isStepConfirmed 
                  ? 'bg-indigo-600 text-white shadow-xs font-bold ring-2 ring-indigo-200' 
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 font-semibold cursor-pointer'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black shrink-0 ${
                !isStepConfirmed ? 'bg-white text-indigo-700' : 'bg-emerald-600 text-white'
              }`}>
                {isStepConfirmed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '1'}
              </span>
              <span className="text-xs">
                {isStepConfirmed ? 'Details Saved' : '1. Profile Details'}
              </span>
            </button>

            <span className="text-slate-300 font-bold">➔</span>

            <button
              type="button"
              onClick={() => {
                if (!isStepConfirmed) handleDirectCalendarView();
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-left transition-all cursor-pointer ${
                isStepConfirmed 
                  ? 'bg-indigo-600 text-white shadow-xs font-bold ring-2 ring-indigo-200' 
                  : 'bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 font-medium border border-slate-200'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black shrink-0 ${
                isStepConfirmed ? 'bg-white text-indigo-700' : 'bg-slate-300 text-slate-700'
              }`}>
                2
              </span>
              <span className="text-xs">2. Select Meet Slot</span>
            </button>
          </div>

          {/* Quick Badges */}
          <div className="hidden sm:flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 text-[11px]">
              <Flame className="w-3.5 h-3.5 text-emerald-600" />
              <span>~20s</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200 text-[11px]">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>100% Free</span>
            </span>
          </div>

        </div>
      </div>

      {/* STEP 1: Student Core Details & Preferences Form */}
      {!isStepConfirmed ? (
        <form 
          onSubmit={handleConfirmStep} 
          className="bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/60 overflow-hidden transition-all"
        >
          {/* Card Top Title Banner */}
          <div className="bg-gradient-to-r from-indigo-50/90 via-blue-50/70 to-slate-50/90 p-5 sm:p-6 border-b border-slate-200/70">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100/80 text-indigo-900 text-xs font-bold border border-indigo-200/60">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Step 1 of 2: Fill Your Preferences</span>
              </span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Mentorship</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Tell Mohit About Your Background &amp; Goals
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              Mohit will prepare your customized cutoff sheet and fee audit before your 1-on-1 Google Meet begins.
            </p>
          </div>

          <div className="p-5 sm:p-7 space-y-5">
            
            {/* 1. Core Contact Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50/60 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all placeholder:text-slate-400 text-slate-900 font-medium"
                  />
                </div>
              </div>

              {/* WhatsApp Mobile Number */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  WhatsApp Mobile Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-slate-700 text-xs font-bold select-none">
                    🇮🇳 +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50/60 border border-slate-200 rounded-r-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all placeholder:text-slate-400 text-slate-900 font-semibold"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Email Address <span className="text-slate-400 font-normal">(For Google Calendar Invite)</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="email"
                    placeholder="e.g. rahul.sharma@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50/60 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all placeholder:text-slate-400 text-slate-900 font-medium"
                  />
                </div>
              </div>

              {/* Current Location / City */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Current Location / City <span className="text-slate-400 font-normal">(e.g. Delhi, Jaipur, Mumbai)</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="e.g. Delhi NCR, Jaipur, Pune"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50/60 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all placeholder:text-slate-400 text-slate-900 font-medium"
                  />
                </div>
              </div>

            </div>

            {/* 2. Interested Course Selector */}
            <div>
              <label className="block text-xs font-black text-slate-800 uppercase tracking-wide mb-2">
                Interested Course <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {COURSES.map((c) => {
                  const isSelected = selectedCourse === c.label;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCourse(c.label)}
                      className={`px-3.5 py-2.5 rounded-xl text-xs font-bold text-left transition-all border flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-50/90 border-indigo-500 text-indigo-900 shadow-xs ring-2 ring-indigo-200'
                          : 'bg-slate-50/60 hover:bg-slate-100/80 border-slate-200 text-slate-700'
                      }`}
                    >
                      <span className="truncate">{c.label}</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Target Entrance Exam Selector */}
            <div>
              <label className="block text-xs font-black text-slate-800 uppercase tracking-wide mb-2">
                Target Entrance Exam
              </label>
              <div className="flex flex-wrap gap-1.5">
                {TARGET_EXAMS.map((exam) => {
                  const isSelected = selectedExam === exam;
                  return (
                    <button
                      key={exam}
                      type="button"
                      onClick={() => setSelectedExam(exam)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs ring-2 ring-indigo-200'
                          : 'bg-slate-50/80 hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      {exam}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Preferred Total Budget (Fees + Living) */}
            <div>
              <label className="block text-xs font-black text-slate-800 uppercase tracking-wide mb-2">
                Preferred Total Budget (Fees + Living)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {BUDGET_RANGES.map((b) => {
                  const isSelected = selectedBudget === b;
                  return (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setSelectedBudget(b)}
                      className={`p-2.5 rounded-xl text-xs font-bold text-center transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-xs ring-2 ring-emerald-200'
                          : 'bg-slate-50/80 hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      {b}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Parent Attendance Checkbox */}
            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={parentJoining}
                  onChange={(e) => setParentJoining(e.target.checked)}
                  className="w-4 h-4 rounded border-amber-300 text-indigo-600 focus:ring-indigo-500 mt-0.5 cursor-pointer"
                />
                <span className="text-xs text-amber-950 font-semibold leading-snug">
                  👨‍👩‍👦 <strong>My parents / guardian will also join the Google Meet video call.</strong>
                  <span className="block text-[11px] text-amber-800 font-normal mt-0.5">
                    (Strongly recommended to discuss education loans, hostel safety &amp; installment plans directly with Mohit)
                  </span>
                </span>
              </label>
            </div>

            {/* Error Message */}
            {formError && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{formError}</span>
              </div>
            )}

            {/* Main Submit & Action Bar */}
            <div className="pt-2 space-y-3">
              <button
                type="submit"
                disabled={isSubmittingLead}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-600 hover:from-indigo-700 hover:to-blue-700 active:scale-[0.99] text-white text-base font-black transition-all shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-75"
              >
                {isSubmittingLead ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Preparing Your Slot...</span>
                  </>
                ) : (
                  <>
                    <span>Continue to Select Slot</span>
                    <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                  </>
                )}
              </button>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-1 text-xs">
                {/* 1-Tap WhatsApp Express Option */}
                <a
                  href={`https://wa.me/919560020771?text=${getWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-center px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>⚡ Prefer WhatsApp? Book in 1-Tap</span>
                </a>

                {/* Direct Jump to Calendar Link */}
                <button
                  type="button"
                  onClick={handleDirectCalendarView}
                  className="text-slate-500 hover:text-indigo-600 hover:underline font-medium cursor-pointer"
                >
                  Skip directly to calendar ➔
                </button>
              </div>

            </div>

          </div>
        </form>
      ) : (
        /* STEP 2: Live Calendly / Google Meet Slot Booking Card */
        <div 
          id="live-calendly-picker" 
          ref={scrollTargetRef} 
          className="relative w-full bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/60 overflow-hidden scroll-mt-20 transition-all"
        >
          {/* Step 2 Header Banner */}
          <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-slate-50 p-5 sm:p-6 border-b border-slate-200/80">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Google Meet Slots</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsStepConfirmed(false)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 border border-slate-200 shadow-xs transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Edit Details</span>
                </button>
                <a
                  href={directCalendlyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-xs font-bold text-indigo-700 border border-indigo-200 transition-colors shadow-xs"
                >
                  <span>Open in Full Screen</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Select Your Free 30-Minute Google Meet Slot with Mohit Jain ⚡
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              Choose a date and time that works for you and your parents. Instant WhatsApp confirmation &amp; calendar invite will be triggered automatically.
            </p>
          </div>

          {/* Student Profile Snapshot Strip */}
          <div className="bg-slate-50 px-4 sm:px-6 py-3 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-700">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-indigo-700">Booking for:</span>
              <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-xs">{name || 'Aspirant'}</span>
              <span className="text-slate-300">•</span>
              <span className="font-semibold text-slate-800">{selectedCourse}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600">{selectedBudget}</span>
              {phone && (
                <>
                  <span className="text-slate-300">•</span>
                  <span className="text-emerald-700 font-bold">WhatsApp: +91 {phone}</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-lg border border-emerald-200">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>30 Mins (₹0 Fee)</span>
            </div>
          </div>

          {/* Calendly Scheduled Success Banner */}
          {isScheduledSuccess && (
            <div className="p-4 bg-emerald-600 text-white flex flex-wrap items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" />
                <div>
                  <div className="text-xs font-bold">🎉 Your Slot Has Been Booked Successfully!</div>
                  <div className="text-[11px] text-emerald-100">Check your email &amp; WhatsApp for your Google Meet joining link.</div>
                </div>
              </div>
              <a
                href="https://wa.me/919560020771?text=Hi%20Mohit%2C%20I%20just%20scheduled%20my%20Google%20Meet%20slot%20and%20wanted%20to%20confirm!"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 bg-white text-emerald-800 rounded-xl text-xs font-bold shrink-0 hover:bg-emerald-50 transition-all shadow-xs"
              >
                Say Hi on WhatsApp
              </a>
            </div>
          )}

          {/* Quick Fallback Action Notice if embed takes time or browser blocks it */}
          {(loadTimedOut || scriptBlocked) && (
            <div className="m-4 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-3">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-amber-900">
                    If the calendar widget takes longer to load on your device:
                  </div>
                  <div className="text-xs text-amber-800 mt-0.5">
                    You can pick your slot directly on Calendly in a new tab, or book instantly via WhatsApp.
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <a
                  href={directCalendlyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all inline-flex items-center gap-2 shadow-md shadow-indigo-600/20"
                >
                  <span>🚀 Open Slot Picker in New Tab</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={`https://wa.me/919560020771?text=${getWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all inline-flex items-center gap-2 shadow-md shadow-emerald-600/20"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>💬 Confirm Slot via WhatsApp (+91 9560020771)</span>
                </a>
              </div>
            </div>
          )}

          {/* Calendly Inline Widget Container */}
          <div className="relative w-full bg-white p-2 sm:p-4 min-h-[660px]">
            {isLoading && (
              <div className="absolute inset-0 bg-white/95 z-10 flex flex-col items-center justify-center p-6 text-center">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-3" />
                <div className="text-sm font-bold text-slate-800">
                  Loading Available Google Meet Slots...
                </div>
                <div className="text-xs text-slate-500 mt-1 max-w-xs">
                  Fetching open calendar dates for Mohit Jain. Takes just a moment.
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <a
                    href={directCalendlyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-indigo-600 hover:underline font-bold inline-flex items-center gap-1"
                  >
                    <span>Open directly in new tab ↗</span>
                  </a>
                </div>
              </div>
            )}

            {/* Target DOM Element for window.Calendly.initInlineWidget */}
            <div 
              ref={calendarContainerRef}
              className="calendly-inline-widget w-full rounded-2xl overflow-hidden" 
              style={{ minWidth: '320px', height: '680px' }}
            />
          </div>

          {/* Bottom Security & Direct Contact Footer */}
          <div className="bg-slate-50 px-4 sm:px-6 py-3.5 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1.5 text-slate-600 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Google Meet Encrypted • 100% Privacy • No Spam</span>
            </span>

            <div className="flex items-center gap-3 flex-wrap">
              <a
                href={directCalendlyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 font-bold inline-flex items-center gap-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in New Window</span>
              </a>

              <span className="text-slate-300">•</span>

              <a
                href={`https://wa.me/919560020771?text=${getWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:text-emerald-900 font-bold inline-flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
