'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Clock, 
  Video, 
  CheckCircle2, 
  ShieldAlert, 
  ArrowUpRight, 
  MessageCircle, 
  ShieldCheck, 
  Monitor, 
  Users, 
  Check, 
  Sparkles,
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
  ChevronRight
} from 'lucide-react';
import { submitLead } from '@/lib/leads';

interface CalendlyBookingWidgetProps {
  url?: string;
  className?: string;
}

const GOALS = [
  { 
    id: 'mba-pgdm', 
    label: 'MBA / PGDM 2027-29 Admission', 
    hint: 'Top B-school selection & cutoff strategy',
    badge: 'Most Popular'
  },
  { 
    id: 'shortlist-backup', 
    label: 'College Shortlist & Backup Options', 
    hint: 'Dream, Target & Safe colleges for your score',
    badge: 'Recommended'
  },
  { 
    id: 'direct-quota', 
    label: 'Direct Admission & Management Quota', 
    hint: 'Seat matrix, eligibility & official fees',
    badge: 'High Intent'
  },
  { 
    id: 'fees-roi', 
    label: 'Fee vs. Real Placement ROI Check', 
    hint: 'Verify actual median packages & internships'
  },
  { 
    id: 'cat-xat-prep', 
    label: 'CAT, XAT, CMAT & NMAT Strategy', 
    hint: 'Target percentiles and exam roadmap'
  },
  { 
    id: 'other-advisory', 
    label: 'Online MBA / Abroad / General Guidance', 
    hint: 'Work-ex profiles, executive & global options'
  },
];

export function CalendlyBookingWidget({
  url = 'https://calendly.com/careerwithmohit-jain/30min',
  className = '',
}: CalendlyBookingWidgetProps) {
  // Step 1 Form States
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [selectedGoal, setSelectedGoal] = useState<string>(GOALS[0].label);
  const [targetColleges, setTargetColleges] = useState<string>('');
  
  // Validation & Submission States
  const [formError, setFormError] = useState<string>('');
  const [isSubmittingLead, setIsSubmittingLead] = useState<boolean>(false);
  const [isStepConfirmed, setIsStepConfirmed] = useState<boolean>(false);

  // Calendly Widget States
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [iframeHeight, setIframeHeight] = useState<string>('720px');
  const calendarRef = useRef<HTMLDivElement>(null);

  // Construct embed URL with prefilled student name, email, and answers
  const buildEmbedUrl = (
    studentName = name, 
    studentEmail = email, 
    goal = selectedGoal, 
    colleges = targetColleges
  ) => {
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
      if (colleges.trim()) {
        u.searchParams.set('a2', `Target Colleges: ${colleges.trim()}`);
      }
      return u.toString();
    } catch {
      let base = `${url}?hide_landing_page_details=1&hide_gdpr_banner=1&primary_color=2563eb`;
      if (studentName.trim()) base += `&name=${encodeURIComponent(studentName.trim())}`;
      if (studentEmail.trim()) base += `&email=${encodeURIComponent(studentEmail.trim())}`;
      base += `&a1=${encodeURIComponent(goal)}`;
      if (colleges.trim()) {
        base += `&a2=${encodeURIComponent(`Target Colleges: ${colleges.trim()}`)}`;
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
        submitLead({
          name: name.trim() || 'Student (Calendly Confirmed)',
          number: phone.trim() || 'N/A',
          phone: phone.trim() || 'N/A',
          email: email.trim(),
          course: selectedGoal,
          program: selectedGoal,
          message: `[Confirmed Scheduled Booking on Calendly] Goal: ${selectedGoal}${targetColleges ? ` | Colleges: ${targetColleges}` : ''}`,
          source: 'Google Meet Counselling (Calendly Confirmed)',
          details: {
            status: 'Confirmed Scheduled Slot',
            goal: selectedGoal,
            targetColleges,
          }
        }).catch(err => console.error('Calendly scheduled event submission error:', err));
      }
    };

    window.addEventListener('message', handleCalendlyMessage);

    return () => {
      window.removeEventListener('message', handleCalendlyMessage);
    };
  }, [name, phone, email, selectedGoal, targetColleges]);

  // Handle Step 1 Confirmation & Lead Logging
  const handleConfirmStep = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const cleanName = name.trim();
    const rawDigits = phone.trim().replace(/\D/g, '');
    const cleanPhone = rawDigits.length >= 10 ? rawDigits.slice(-10) : rawDigits;

    if (!cleanName) {
      setFormError('Please enter your full name so Mohit knows who he is speaking with.');
      return;
    }

    if (!cleanPhone || cleanPhone.length !== 10) {
      setFormError('Please enter a valid 10-digit WhatsApp number to receive your Google Meet link.');
      return;
    }

    setIsSubmittingLead(true);

    try {
      // 1. Immediately log lead into Google Sheets / Activepieces webhook
      await submitLead({
        name: cleanName,
        number: cleanPhone,
        phone: cleanPhone,
        email: email.trim(),
        location: 'Online Google Meet',
        preferredLocation: 'Online Consultation',
        budget: 'Not Specified',
        course: selectedGoal,
        program: selectedGoal,
        message: `Goal: ${selectedGoal}${targetColleges ? ` | Target Colleges: ${targetColleges}` : ''}`,
        source: 'Inquiry - Face-to-Face Google Meet Booking',
        details: {
          sessionType: '1-on-1 Face-to-Face Video (30 Mins)',
          targetGoal: selectedGoal,
          targetColleges: targetColleges.trim(),
        }
      });

      // 2. Update Calendly prefill URL with the verified student details
      const newUrl = buildEmbedUrl(cleanName, email, selectedGoal, targetColleges);
      setEmbedUrl(newUrl);
      setIsLoading(true);
      setIsStepConfirmed(true);

      // 3. Smooth scroll to the Calendly slot calendar
      setTimeout(() => {
        calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);

    } catch (err: any) {
      console.warn('Lead submission warning:', err);
      // Still allow student to proceed to Calendly calendar even if network glitched
      const fallbackUrl = buildEmbedUrl(cleanName, email, selectedGoal, targetColleges);
      setEmbedUrl(fallbackUrl);
      setIsLoading(true);
      setIsStepConfirmed(true);
      calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } finally {
      setIsSubmittingLead(false);
    }
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
      
      {/* Progress & Step Navigation Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm">
        <div className="flex items-center justify-between gap-2">
          
          {/* Step 1 Pill */}
          <button
            type="button"
            onClick={() => {
              if (isStepConfirmed) setIsStepConfirmed(false);
            }}
            className={`flex-1 flex items-center justify-center sm:justify-start gap-2.5 px-3 py-2 rounded-xl text-left transition-all ${
              !isStepConfirmed 
                ? 'bg-blue-50 text-blue-900 border border-blue-200/90 font-bold' 
                : 'text-slate-600 hover:bg-slate-50 cursor-pointer font-medium'
            }`}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
              !isStepConfirmed ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'
            }`}>
              {isStepConfirmed ? <Check className="w-3.5 h-3.5" /> : '1'}
            </span>
            <div className="hidden sm:block leading-tight">
              <div className="text-xs">Step 1</div>
              <div className="text-[11px] text-slate-500 font-normal">
                {isStepConfirmed ? 'Details Saved' : 'Your Goal & Details'}
              </div>
            </div>
            <span className="sm:hidden text-xs font-bold">1. Details</span>
          </button>

          <ArrowRight className="w-4 h-4 text-slate-300 shrink-0" />

          {/* Step 2 Pill */}
          <button
            type="button"
            onClick={() => {
              if (!isStepConfirmed) handleDirectCalendarView();
            }}
            className={`flex-1 flex items-center justify-center sm:justify-start gap-2.5 px-3 py-2 rounded-xl text-left transition-all cursor-pointer ${
              isStepConfirmed 
                ? 'bg-blue-50 text-blue-900 border border-blue-200/90 font-bold' 
                : 'bg-slate-50/70 text-slate-500 hover:bg-slate-100/80 border border-slate-100 font-medium'
            }`}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
              isStepConfirmed ? 'bg-blue-600 text-white' : 'bg-slate-300 text-slate-700'
            }`}>
              2
            </span>
            <div className="hidden sm:block leading-tight">
              <div className="text-xs">Step 2</div>
              <div className="text-[11px] text-slate-500 font-normal">Pick Date &amp; Time</div>
            </div>
            <span className="sm:hidden text-xs font-bold">2. Select Slot</span>
          </button>

        </div>
      </div>

      {/* STEP 1: Goal & Contact Form */}
      {!isStepConfirmed ? (
        <form onSubmit={handleConfirmStep} className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden transition-all">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#0B192C] via-[#1E3E62] to-[#0B192C] text-white p-5 sm:p-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Step 1: Choose Your Counselling Focus</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              What do you want to discuss with Mohit?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
              Select what is most important for you right now so Mohit can prepare relevant cutoff data and fee reports before the call.
            </p>
          </div>

          <div className="p-5 sm:p-6 space-y-6">
            
            {/* 1. Goals Grid */}
            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                Select Your Primary Objective:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {GOALS.map((goal) => {
                  const isSelected = selectedGoal === goal.label;
                  return (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => setSelectedGoal(goal.label)}
                      className={`relative flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50/90 border-blue-600 shadow-sm ring-2 ring-blue-500/20 text-slate-900'
                          : 'bg-slate-50/70 hover:bg-slate-100/80 border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isSelected 
                          ? 'bg-blue-600 border-blue-600 text-white' 
                          : 'border-slate-300 bg-white'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>

                      <div className="flex-1 pr-2">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-xs font-bold leading-tight ${isSelected ? 'text-blue-950' : 'text-slate-800'}`}>
                            {goal.label}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                          {goal.hint}
                        </p>
                        {goal.badge && (
                          <span className="inline-block mt-1.5 text-[9px] font-extrabold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200/80">
                            {goal.badge}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Contact Details Card */}
            <div className="bg-slate-50/90 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Where Should We Send Your Google Meet Link?
                </span>
                <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  🔒 100% Private
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
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
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15 outline-none transition-all placeholder:text-slate-400 text-slate-900 font-medium"
                    />
                  </div>
                </div>

                {/* WhatsApp Mobile */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    WhatsApp Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-slate-700 text-xs font-bold">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-r-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15 outline-none transition-all placeholder:text-slate-400 text-slate-900 font-medium"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Google Meet video link &amp; reminders will be sent to this WhatsApp number.
                  </p>
                </div>

                {/* Optional Email */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-slate-400 font-normal">(Optional, for Google Calendar invite)</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      type="email"
                      placeholder="e.g. rahul.sharma@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15 outline-none transition-all placeholder:text-slate-400 text-slate-900"
                    />
                  </div>
                </div>

                {/* Optional Target Colleges */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Target Colleges or Exams <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <School className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="e.g. SIBM, NMIMS, TAPMI, Great Lakes, or CAT/XAT score..."
                      value={targetColleges}
                      onChange={(e) => setTargetColleges(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-blue-600 focus:ring-2 focus:ring-blue-500/15 outline-none transition-all placeholder:text-slate-400 text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold flex items-center gap-2">
                  <span>⚠️</span>
                  <span>{formError}</span>
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleDirectCalendarView}
                className="text-xs text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 font-semibold cursor-pointer order-2 sm:order-1"
              >
                <span>Or view available calendar slots directly</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="submit"
                disabled={isSubmittingLead}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white text-sm font-bold transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-75 order-1 sm:order-2"
              >
                {isSubmittingLead ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving your details...</span>
                  </>
                ) : (
                  <>
                    <span>Continue to Pick Free Time Slot</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
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
          <div className="bg-gradient-to-r from-[#0B192C] via-[#1E3E62] to-[#0B192C] text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-400/30 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Google Meet Slots</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Step 2: Choose a Date &amp; Time That Suits You
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setIsStepConfirmed(false)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer border border-white/15"
            >
              <Edit3 className="w-3.5 h-3.5 text-blue-300" />
              <span>Edit Details</span>
            </button>
          </div>

          {/* Student Details Summary Strip */}
          <div className="bg-blue-50/80 border-b border-blue-100/90 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-2 text-xs text-blue-900">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-blue-800">Booking for:</span>
              <span className="font-semibold text-slate-800">{name || 'MBA Aspirant'}</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-700">{selectedGoal}</span>
              {phone && (
                <>
                  <span className="text-slate-400">•</span>
                  <span className="text-emerald-700 font-medium">+91 {phone}</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-md border border-emerald-200">
              <Clock className="w-3.5 h-3.5" />
              <span>30 Mins Free</span>
            </div>
          </div>

          {/* Main Embed Area with Loading State */}
          <div className="relative w-full bg-white" style={{ minHeight: '700px' }}>
            {/* Loading Spinner */}
            {isLoading && (
              <div className="absolute inset-0 bg-white/95 z-10 flex flex-col items-center justify-center p-8 text-center">
                <div className="relative flex items-center justify-center mb-4">
                  <div className="w-12 h-12 rounded-2xl border-3 border-blue-600 border-t-transparent animate-spin" />
                  <Video className="w-5 h-5 text-blue-600 absolute" />
                </div>
                <h4 className="text-sm font-bold text-slate-800">Loading Mohit&apos;s Open Calendar Slots...</h4>
                <p className="text-xs text-slate-500 mt-1">Fetching real-time Google Meet availability</p>
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
          <div className="border-t border-slate-100 bg-slate-50/80 px-5 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
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
          <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Direct with Mohit</h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
              No telecallers or marketing middlemen. You speak 1-on-1 with Mohit Jain.
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">
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
          <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Parents Welcome</h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
              Parents are encouraged to join the call to clear budget, hostel &amp; ROI doubts.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
