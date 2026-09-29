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
  Loader2, 
  Calendar, 
  Edit3, 
  HelpCircle, 
  School, 
  ExternalLink, 
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Monitor,
  Users,
  Check,
  Target,
  Building2,
  TrendingUp,
  Globe,
  Award,
  Zap,
  MessageCircle,
  CalendarCheck,
  Flame,
  AlertCircle
} from 'lucide-react';
import { submitLead } from '@/lib/leads';

interface CalendlyBookingWidgetProps {
  url?: string;
  className?: string;
  onBookingSuccess?: () => void;
}

const GOALS = [
  { 
    id: 'mba-pgdm', 
    label: 'MBA / PGDM 2027 Admissions', 
    hint: 'Top B-school selection, cutoffs & exam strategy',
    badge: 'Most Popular',
    icon: Target,
    color: 'blue'
  },
  { 
    id: 'shortlist-backup', 
    label: 'College Shortlist & Backup Options', 
    hint: 'Dream, Target & Safe colleges matching your score',
    badge: 'Recommended',
    icon: Building2,
    color: 'emerald'
  },
  { 
    id: 'direct-quota', 
    label: 'Direct Admission & Management Quota', 
    hint: 'Seat matrix, institutional rounds & official fees',
    badge: 'High Intent',
    icon: ShieldCheck,
    color: 'amber'
  },
  { 
    id: 'fees-roi', 
    label: 'Tuition Fee vs. Real Placement ROI', 
    hint: 'Verified median salaries & return on investment',
    badge: 'Verified Data',
    icon: TrendingUp,
    color: 'indigo'
  },
  { 
    id: 'cat-xat-prep', 
    label: 'CAT, XAT, CMAT & NMAT Strategy', 
    hint: 'Target percentiles, timeline & exam roadmap',
    badge: 'Exam Prep',
    icon: Award,
    color: 'purple'
  },
  { 
    id: 'other-advisory', 
    label: 'Online MBA / Executive / Study Abroad', 
    hint: 'Work-ex profiles, executive & global options',
    badge: 'Global / Online',
    icon: Globe,
    color: 'cyan'
  },
];

const INTAKE_YEARS = ['2027 Intake (Upcoming)', '2026 (Immediate)', '2028+ (Planning)'];
const TARGET_EXAMS = ['CAT', 'XAT', 'CMAT', 'MAT', 'NMAT', 'SNAP', 'ATMA', 'Direct / Non-CAT'];
const BUDGET_RANGES = ['Under ₹10 Lakhs', '₹10 - 15 Lakhs', '₹15 - 25 Lakhs', '₹25 Lakhs+', 'Flexible / ROI First'];
const PREFERRED_REGIONS = ['Delhi NCR', 'Pune', 'Mumbai', 'Bangalore', 'Hyderabad', 'Any Good Tier-1/2', 'Abroad'];

export function CalendlyBookingWidget({
  url = 'https://calendly.com/careerwithmohit-jain/30min',
  className = '',
}: CalendlyBookingWidgetProps) {
  // Step 1 Form States
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [selectedGoal, setSelectedGoal] = useState<string>(GOALS[0].label);
  const [intakeYear, setIntakeYear] = useState<string>(INTAKE_YEARS[0]);
  const [selectedExam, setSelectedExam] = useState<string>('CAT');
  const [selectedBudget, setSelectedBudget] = useState<string>('₹10 - 15 Lakhs');
  const [selectedRegion, setSelectedRegion] = useState<string>('Delhi NCR');
  const [targetColleges, setTargetColleges] = useState<string>('');
  const [parentJoining, setParentJoining] = useState<boolean>(false);
  
  // Validation & Submission States
  const [formError, setFormError] = useState<string>('');
  const [isSubmittingLead, setIsSubmittingLead] = useState<boolean>(false);
  const [isStepConfirmed, setIsStepConfirmed] = useState<boolean>(false);
  const [isScheduledSuccess, setIsScheduledSuccess] = useState<boolean>(false);

  // Calendly Widget States
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [iframeHeight, setIframeHeight] = useState<string>('720px');
  const calendarRef = useRef<HTMLDivElement>(null);

  // Construct embed URL with prefilled student name, email, and answers
  const buildEmbedUrl = (
    studentName = name, 
    studentEmail = email, 
    goal = selectedGoal, 
    colleges = targetColleges,
    budget = selectedBudget,
    exam = selectedExam
  ) => {
    const summaryAnswers = [
      `Goal: ${goal}`,
      `Exam: ${exam}`,
      `Budget: ${budget}`,
      colleges ? `Colleges: ${colleges}` : null,
      parentJoining ? `Parents Attending: Yes` : null
    ].filter(Boolean).join(' | ');

    try {
      const u = new URL(url);
      u.searchParams.set('embed_domain', typeof window !== 'undefined' ? window.location.hostname : 'careerwithmohit.online');
      u.searchParams.set('embed_type', 'Inline');
      u.searchParams.set('hide_landing_page_details', '1');
      u.searchParams.set('hide_gdpr_banner', '1');
      u.searchParams.set('primary_color', '2563eb');
      
      if (studentName.trim()) {
        u.searchParams.set('name', studentName.trim());
      }
      if (studentEmail.trim()) {
        u.searchParams.set('email', studentEmail.trim());
      }
      if (goal.trim()) {
        u.searchParams.set('a1', goal.trim());
      }
      if (summaryAnswers) {
        u.searchParams.set('a2', summaryAnswers);
      }
      return u.toString();
    } catch {
      let base = `${url}?hide_landing_page_details=1&hide_gdpr_banner=1&primary_color=2563eb`;
      if (studentName.trim()) base += `&name=${encodeURIComponent(studentName.trim())}`;
      if (studentEmail.trim()) base += `&email=${encodeURIComponent(studentEmail.trim())}`;
      base += `&a1=${encodeURIComponent(goal)}`;
      if (summaryAnswers) {
        base += `&a2=${encodeURIComponent(summaryAnswers)}`;
      }
      return base;
    }
  };

  const [embedUrl, setEmbedUrl] = useState<string>(() => buildEmbedUrl());

  // Listen to Calendly messages (auto-resize height & log completed booking)
  useEffect(() => {
    const handleCalendlyMessage = (e: MessageEvent) => {
      // Calendly height resize event
      if (e.data && e.data.event === 'calendly.page_height' && e.data.payload?.height) {
        const h = parseInt(e.data.payload.height, 10);
        if (!isNaN(h) && h > 450) {
          setIframeHeight(`${h}px`);
        }
      }

      // Calendly scheduled event confirmation
      if (e.data && e.data.event === 'calendly.event_scheduled') {
        setIsScheduledSuccess(true);
        submitLead({
          name: name.trim() || 'Student (Calendly Confirmed)',
          number: phone.trim() || 'N/A',
          phone: phone.trim() || 'N/A',
          email: email.trim(),
          course: selectedGoal,
          program: selectedGoal,
          budget: selectedBudget,
          targetExam: selectedExam,
          location: selectedRegion,
          message: `[Confirmed Scheduled Booking on Calendly] Focus: ${selectedGoal} | Exam: ${selectedExam} | Budget: ${selectedBudget} | Region: ${selectedRegion}${targetColleges ? ` | Colleges: ${targetColleges}` : ''}${parentJoining ? ' | Parents Joining: Yes' : ''}`,
          source: 'Google Meet Counselling (Calendly Confirmed)',
          category: 'booking',
          details: {
            status: 'Confirmed Scheduled Slot',
            goal: selectedGoal,
            targetExam: selectedExam,
            budget: selectedBudget,
            region: selectedRegion,
            targetColleges,
            parentJoining: parentJoining ? 'Yes' : 'No'
          }
        }).catch(err => console.error('Calendly scheduled event submission error:', err));
      }
    };

    window.addEventListener('message', handleCalendlyMessage);

    return () => {
      window.removeEventListener('message', handleCalendlyMessage);
    };
  }, [name, phone, email, selectedGoal, selectedExam, selectedBudget, selectedRegion, targetColleges, parentJoining]);

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
      setFormError('Please enter a valid 10-digit WhatsApp mobile number to receive your Google Meet video link.');
      return;
    }

    setIsSubmittingLead(true);

    try {
      // 1. Immediately log lead into Firebase / Activepieces webhook / Google Sheets
      await submitLead({
        name: cleanName,
        number: cleanPhone,
        phone: cleanPhone,
        email: email.trim(),
        location: selectedRegion,
        preferredLocation: selectedRegion,
        budget: selectedBudget,
        targetExam: selectedExam,
        course: selectedGoal,
        program: selectedGoal,
        category: 'booking',
        message: `Focus: ${selectedGoal} | Intake: ${intakeYear} | Exam: ${selectedExam} | Budget: ${selectedBudget} | Location: ${selectedRegion}${targetColleges ? ` | Target: ${targetColleges}` : ''}${parentJoining ? ' | Parents Attending: Yes' : ''}`,
        source: 'Inquiry - Face-to-Face Google Meet Booking',
        details: {
          sessionType: '1-on-1 Face-to-Face Video (30 Mins)',
          targetGoal: selectedGoal,
          intakeYear,
          targetExam: selectedExam,
          budget: selectedBudget,
          preferredRegion: selectedRegion,
          targetColleges: targetColleges.trim(),
          parentsAttending: parentJoining ? 'Yes' : 'No',
        }
      });

      // 2. Update Calendly prefill URL with the student details
      const newUrl = buildEmbedUrl(cleanName, email, selectedGoal, targetColleges, selectedBudget, selectedExam);
      setEmbedUrl(newUrl);
      setIsLoading(true);
      setIsStepConfirmed(true);

      // 3. Smooth scroll to the Calendly slot calendar
      setTimeout(() => {
        calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);

    } catch (err: any) {
      console.warn('Lead submission warning:', err);
      // Still allow student to proceed to Calendly calendar
      const fallbackUrl = buildEmbedUrl(cleanName, email, selectedGoal, targetColleges, selectedBudget, selectedExam);
      setEmbedUrl(fallbackUrl);
      setIsLoading(true);
      setIsStepConfirmed(true);
      calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } finally {
      setIsSubmittingLead(false);
    }
  };

  // Express WhatsApp Booking with pre-filled text
  const getWhatsAppMessage = () => {
    const student = name.trim() || 'Aspirant';
    return encodeURIComponent(
      `Hi Mohit Sir, my name is ${student}. I want to book a free 1-on-1 MBA counselling video session.\n\n` +
      `📌 *My Profile & Goal:*\n` +
      `• Focus: ${selectedGoal}\n` +
      `• Target Intake: ${intakeYear}\n` +
      `• Exam: ${selectedExam}\n` +
      `• Budget: ${selectedBudget}\n` +
      `• Preferred City: ${selectedRegion}\n` +
      (targetColleges ? `• Target Colleges: ${targetColleges}\n` : '') +
      `• WhatsApp Number: ${phone || 'This Number'}\n\n` +
      `Please let me know your next open Google Meet slot today!`
    );
  };

  // Skip straight to calendar view
  const handleDirectCalendarView = () => {
    setIsLoading(true);
    setIsStepConfirmed(true);
    setTimeout(() => {
      calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  return (
    <div className={`space-y-6 ${className}`} id="booking-widget-container">
      
      {/* Visual Step Tracker & Estimated Time Badge */}
      <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/90 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Steps Progress Tabs */}
          <div className="w-full sm:w-auto flex items-center gap-2">
            {/* Step 1 Button */}
            <button
              type="button"
              onClick={() => {
                if (isStepConfirmed) setIsStepConfirmed(false);
              }}
              className={`flex-1 sm:flex-none flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-all ${
                !isStepConfirmed 
                  ? 'bg-blue-600 text-white shadow-sm font-bold ring-2 ring-blue-500/20' 
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100/70 font-semibold cursor-pointer'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black shrink-0 ${
                !isStepConfirmed ? 'bg-white text-blue-600' : 'bg-emerald-600 text-white'
              }`}>
                {isStepConfirmed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '1'}
              </span>
              <span className="text-xs">
                {isStepConfirmed ? 'Profile Saved' : '1. Your Profile & Goals'}
              </span>
            </button>

            <ChevronRight className="w-4 h-4 text-slate-300 shrink-0 hidden sm:block" />

            {/* Step 2 Button */}
            <button
              type="button"
              onClick={() => {
                if (!isStepConfirmed) handleDirectCalendarView();
              }}
              className={`flex-1 sm:flex-none flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-all cursor-pointer ${
                isStepConfirmed 
                  ? 'bg-blue-600 text-white shadow-sm font-bold ring-2 ring-blue-500/20' 
                  : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 font-medium'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black shrink-0 ${
                isStepConfirmed ? 'bg-white text-blue-600' : 'bg-slate-300 text-slate-700'
              }`}>
                2
              </span>
              <span className="text-xs">2. Select Meet Slot</span>
            </button>
          </div>

          {/* Time & Cost Guarantee Pill */}
          <div className="flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 text-[11px]">
              <Flame className="w-3.5 h-3.5 text-emerald-600" />
              <span>Takes ~30 Seconds</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200 text-[11px]">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>100% Free</span>
            </span>
          </div>

        </div>
      </div>

      {/* STEP 1: Interactive Goal & Profile Builder */}
      {!isStepConfirmed ? (
        <form onSubmit={handleConfirmStep} className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden transition-all">
          
          {/* Card Header */}
          <div className="bg-gradient-to-r from-[#071326] via-[#0D254C] to-[#071326] text-white p-5 sm:p-7 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold mb-2 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Step 1: Tell Mohit What You Need</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                What is your main focus for this counselling session?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed max-w-2xl">
                Select your primary goal below. Mohit will pre-load verified college cutoff sheets, median placement audits, and fee breakdown tools for your call.
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-7 space-y-6">
            
            {/* 1. Interactive Focus / Goal Cards */}
            <div>
              <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-2.5">
                1. Select Counselling Objective <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {GOALS.map((goal) => {
                  const isSelected = selectedGoal === goal.label;
                  const Icon = goal.icon;
                  return (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => setSelectedGoal(goal.label)}
                      className={`relative flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all cursor-pointer group ${
                        isSelected
                          ? 'bg-blue-50/90 border-blue-600 shadow-md ring-2 ring-blue-500/25 text-slate-900'
                          : 'bg-slate-50/70 hover:bg-slate-100/90 border-slate-200/90 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                        isSelected 
                          ? 'bg-blue-600 text-white shadow-sm scale-105' 
                          : 'bg-white border border-slate-200 text-slate-500 group-hover:text-blue-600'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="flex-1 min-w-0 pr-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className={`text-xs font-bold leading-tight ${isSelected ? 'text-blue-950 font-black' : 'text-slate-800'}`}>
                            {goal.label}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                          {goal.hint}
                        </p>
                        {goal.badge && (
                          <span className={`inline-block mt-1.5 text-[9px] font-extrabold px-2 py-0.5 rounded-md ${
                            isSelected 
                              ? 'bg-blue-200/70 text-blue-900' 
                              : 'bg-amber-100 text-amber-900 border border-amber-200/80'
                          }`}>
                            {goal.badge}
                          </span>
                        )}
                      </div>

                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                        isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Interactive Profile Chips (Fast 1-Click Pickers) */}
            <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200/90 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-blue-600" />
                  <span>2. Quick Profile Snapshot (Helps Mohit Prepare)</span>
                </span>
                <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                  Instant 1-Click
                </span>
              </div>

              {/* Target Intake Year */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
                  Target Admission Year:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {INTAKE_YEARS.map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setIntakeYear(yr)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        intakeYear === yr
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {yr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Exam */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
                  Primary Target Exam / Status:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {TARGET_EXAMS.map((ex) => (
                    <button
                      key={ex}
                      type="button"
                      onClick={() => setSelectedExam(ex)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        selectedExam === ex
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Range */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
                  Preferred Total MBA Budget (Fees + Living):
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {BUDGET_RANGES.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setSelectedBudget(b)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        selectedBudget === b
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Region */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
                  Preferred College Location / City:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {PREFERRED_REGIONS.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setSelectedRegion(r)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        selectedRegion === r
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Contact Details Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  <span>3. Where Should We Send Your Google Meet Link?</span>
                </span>
                <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>100% Spam-Free</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Your Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15 outline-none transition-all placeholder:text-slate-400 text-slate-900 font-medium"
                    />
                  </div>
                </div>

                {/* WhatsApp Mobile */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    WhatsApp Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-slate-700 text-xs font-bold">
                      🇮🇳 +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50/70 border border-slate-200 rounded-r-xl focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15 outline-none transition-all placeholder:text-slate-400 text-slate-900 font-medium"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Your video link, calendar invite &amp; reminders will be sent to WhatsApp.
                  </p>
                </div>

                {/* Optional Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Email Address <span className="text-slate-400 font-normal">(For Google Calendar)</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      type="email"
                      placeholder="e.g. rahul.sharma@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15 outline-none transition-all placeholder:text-slate-400 text-slate-900"
                    />
                  </div>
                </div>

                {/* Target Colleges / Specific Queries */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Target Colleges or Doubts <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <School className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="e.g. SIBM, TAPMI, Great Lakes, or Direct Quota query"
                      value={targetColleges}
                      onChange={(e) => setTargetColleges(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15 outline-none transition-all placeholder:text-slate-400 text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Parents Participation Checkbox */}
              <label className="flex items-center gap-2.5 pt-1 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={parentJoining}
                  onChange={(e) => setParentJoining(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs text-slate-700 font-medium">
                  👨‍👩‍👦 My parents / guardian will also join the video call (Strongly recommended for fee &amp; hostel discussions)
                </span>
              </label>

              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold flex items-center gap-2 animate-shake">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{formError}</span>
                </div>
              )}
            </div>

            {/* Action Bar & Express WhatsApp Options */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Express 1-Tap WhatsApp Booking Option */}
              <a
                href={`https://wa.me/919560020771?text=${getWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer order-2 sm:order-1"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600/20" />
                <span>⚡ Express WhatsApp Booking (1-Tap)</span>
              </a>

              {/* Main Continue Button */}
              <button
                type="submit"
                disabled={isSubmittingLead}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-700 hover:to-indigo-700 active:scale-98 text-white text-sm font-black transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-75 order-1 sm:order-2"
              >
                {isSubmittingLead ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Preparing Your Slot...</span>
                  </>
                ) : (
                  <>
                    <span>Proceed to Pick Free Meet Slot</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handleDirectCalendarView}
                className="text-xs text-slate-500 hover:text-blue-700 hover:underline inline-flex items-center gap-1 font-medium cursor-pointer"
              >
                <span>Or jump straight to Google Meet slot calendar view</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </form>
      ) : (
        /* STEP 2: Live Calendly Scheduling Widget Container */
        <div 
          id="live-calendly-picker" 
          ref={calendarRef} 
          className="relative w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden scroll-mt-20 transition-all"
        >
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-[#071326] via-[#0D254C] to-[#071326] text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-400/30 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Google Meet Calendar</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white">
                Step 2: Select a Convenient Date &amp; Time
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setIsStepConfirmed(false)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer border border-white/15"
            >
              <Edit3 className="w-3.5 h-3.5 text-blue-300" />
              <span>Edit Profile Details</span>
            </button>
          </div>

          {/* Student Profile Snapshot Strip */}
          <div className="bg-blue-50/90 border-b border-blue-100 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-2 text-xs text-blue-950">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-blue-800">Booking for:</span>
              <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-blue-200">{name || 'MBA Aspirant'}</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-700 font-semibold">{selectedGoal}</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-600">{selectedBudget}</span>
              {phone && (
                <>
                  <span className="text-slate-400">•</span>
                  <span className="text-emerald-700 font-bold">WhatsApp: +91 {phone}</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-800 bg-emerald-100/90 px-2.5 py-1 rounded-lg border border-emerald-200">
              <Clock className="w-3.5 h-3.5 text-emerald-700" />
              <span>30 Mins Video Call (₹0)</span>
            </div>
          </div>

          {/* Confirmation Success Banner if Calendly confirmed */}
          {isScheduledSuccess && (
            <div className="p-4 bg-emerald-600 text-white flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" />
                <div>
                  <div className="text-xs font-bold">🎉 Your Slot Has Been Booked Successfully!</div>
                  <div className="text-[11px] text-emerald-100">Check your email &amp; WhatsApp for the Google Meet joining link.</div>
                </div>
              </div>
              <a
                href="https://wa.me/919560020771?text=Hi%20Mohit%2C%20I%20just%20scheduled%20my%20Google%20Meet%20slot%20and%20wanted%20to%20confirm!"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-white text-emerald-800 rounded-lg text-xs font-bold shrink-0 hover:bg-emerald-50 transition-all"
              >
                Say Hi on WhatsApp
              </a>
            </div>
          )}

          {/* Calendly Iframe Area with Custom Loading Skeleton */}
          <div className="relative w-full bg-white" style={{ minHeight: '700px' }}>
            {/* Loading Skeleton */}
            {isLoading && (
              <div className="absolute inset-0 bg-white/95 z-10 flex flex-col items-center justify-center p-8 text-center">
                <div className="relative flex items-center justify-center mb-4">
                  <div className="w-14 h-14 rounded-2xl border-4 border-blue-600 border-t-transparent animate-spin" />
                  <Video className="w-6 h-6 text-blue-600 absolute" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Loading Mohit&apos;s Live Calendar Slots...</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">
                  Connecting to Google Meet calendar. If slots don&apos;t load in a moment, use the fullscreen button or WhatsApp express option below.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <a
                    href={embedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold hover:bg-blue-100 transition-all"
                  >
                    Open Fullscreen Calendar
                  </a>
                </div>
              </div>
            )}

            {/* Direct Calendly Iframe Embed */}
            <iframe
              src={embedUrl}
              width="100%"
              height={iframeHeight}
              style={{ minHeight: '700px', height: iframeHeight }}
              frameBorder="0"
              title="Select a Date & Time with Mohit Jain"
              className="w-full border-0 bg-transparent transition-opacity duration-300"
              onLoad={() => setIsLoading(false)}
            />
          </div>

          {/* Post-embed Helper Notes */}
          <div className="border-t border-slate-100 bg-slate-50/90 px-5 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Google Meet link is emailed &amp; sent on WhatsApp immediately after picking your slot.</span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={embedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-700 hover:text-blue-900 font-bold shrink-0 hover:underline"
              >
                <span>Open Fullscreen</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-slate-300">•</span>
              <a
                href={`https://wa.me/919560020771?text=Hi%20Mohit%2C%20I%20have%20an%20urgent%20MBA%20counselling%20query%20regarding%20${encodeURIComponent(selectedGoal)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-bold shrink-0 hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Urgent? WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Trust Mini-Cards for Student Peace of Mind */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Direct with Mohit</h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
              No telecallers or marketing middlemen. You speak 1-on-1 directly with Mohit Jain.
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">
            <Monitor className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Live Screen Sharing</h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
              See real cutoff sheets, fee structures &amp; placement reports live on your screen.
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Parents Warmly Welcome</h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
              Parents can join to discuss budget, loan approvals, hostel safety, and placement ROI.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
