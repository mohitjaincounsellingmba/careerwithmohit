"use client";

import { useState } from "react";
import { 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Mail, 
  Phone, 
  User, 
  Sparkles, 
  BookOpen, 
  MapPin, 
  ShieldCheck, 
  ArrowLeft,
  MessageSquare
} from "lucide-react";

export default function AuthClient() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");
  
  // Login form states
  const [loginPhone, setLoginPhone] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginOtp, setLoginOtp] = useState("");
  const [showLoginOtp, setShowLoginOtp] = useState(false);
  const [isLoginOtpSending, setIsLoginOtpSending] = useState(false);

  // Sign up form states
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupCourse, setSignupCourse] = useState("");
  const [signupState, setSignupState] = useState("");
  const [signupOtp, setSignupOtp] = useState("");
  const [showSignupOtp, setShowSignupOtp] = useState(false);
  const [isSignupOtpSending, setIsSignupOtpSending] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // Status states
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<any>(null);

  // Constants
  const COURSES = [
    "MBA / PGDM",
    "B.Tech / BE",
    "BBA / BMS",
    "BCA",
    "Study Abroad (MBA/MS)",
    "Executive MBA"
  ];

  const STATES = [
    "Delhi NCR",
    "Maharashtra (Pune/Mumbai)",
    "Karnataka (Bangalore)",
    "Uttar Pradesh (Noida/Greater Noida)",
    "Haryana (Gurugram)",
    "Tamil Nadu",
    "West Bengal",
    "Other"
  ];

  const resetStates = () => {
    setError("");
    setSuccess("");
    setShowLoginOtp(false);
    setShowSignupOtp(false);
    setLoginOtp("");
    setSignupOtp("");
  };

  const handleTabChange = (tab: "login" | "signup") => {
    setActiveTab(tab);
    resetStates();
  };

  const handleSendLoginOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!loginPhone || loginPhone.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    
    setIsLoginOtpSending(true);
    // Simulate sending OTP
    setTimeout(() => {
      setIsLoginOtpSending(false);
      setShowLoginOtp(true);
      setSuccess("Mock OTP sent successfully to +91 " + loginPhone + " (Use code: 123456)");
    }, 800);
  };

  const handleVerifyLoginOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (loginOtp !== "123456") {
      setError("Invalid OTP. Please use code 123456 for verification.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
      setLoggedInUser({
        name: "Valued Candidate",
        email: "candidate@careerwithmohit.online",
        phone: loginPhone
      });
      setSuccess("Logged in successfully!");
    }, 1000);
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!loginEmail || !loginPassword) {
      setError("Please fill in all email and password fields.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
      setLoggedInUser({
        name: loginEmail.split("@")[0],
        email: loginEmail,
        phone: "9999999999"
      });
      setSuccess("Logged in successfully!");
    }, 1000);
  };

  const handleSendSignupOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!signupName.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!signupEmail.trim() || !signupEmail.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!signupPhone || signupPhone.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!signupCourse) {
      setError("Please select a course.");
      return;
    }
    if (!signupState) {
      setError("Please select a state.");
      return;
    }
    if (!agreed) {
      setError("You must agree to the Terms of Service & Privacy Policy.");
      return;
    }

    setIsSignupOtpSending(true);
    setTimeout(() => {
      setIsSignupOtpSending(false);
      setShowSignupOtp(true);
      setSuccess("Mock OTP sent to +91 " + signupPhone + " (Use code: 123456)");
    }, 800);
  };

  const handleVerifySignupOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (signupOtp !== "123456") {
      setError("Invalid OTP. Please use code 123456 for verification.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
      setLoggedInUser({
        name: signupName,
        email: signupEmail,
        phone: signupPhone,
        course: signupCourse,
        state: signupState
      });
      setSuccess("Account registered & logged in successfully!");
    }, 1000);
  };

  const handleSocialLogin = () => {
    setError("");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
      setLoggedInUser({
        name: "Google User",
        email: "google.user@gmail.com",
        phone: "9876543210"
      });
      setSuccess("Authenticated via Google successfully!");
    }, 800);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedInUser(null);
    resetStates();
  };

  if (isLoggedIn) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 sm:p-12 bg-emerald-50 border-4 border-foreground rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-secondary border-4 border-foreground mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <ShieldCheck className="h-10 w-10 text-white" strokeWidth={3} />
        </div>
        <h2 className="font-display text-4xl font-extrabold text-foreground uppercase tracking-tight mb-2">
          Welcome back!
        </h2>
        <p className="text-lg font-bold text-gray-700 mb-6 italic">
          {loggedInUser?.name}
        </p>

        <div className="bg-white border-2 border-foreground p-6 rounded-xl text-left mb-8 space-y-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="font-bold text-gray-500 uppercase text-xs">Email</span>
            <span className="font-extrabold text-foreground">{loggedInUser?.email}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="font-bold text-gray-500 uppercase text-xs">Mobile</span>
            <span className="font-extrabold text-foreground">+91 {loggedInUser?.phone}</span>
          </div>
          {loggedInUser?.course && (
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="font-bold text-gray-500 uppercase text-xs">Course</span>
              <span className="font-extrabold text-foreground">{loggedInUser?.course}</span>
            </div>
          )}
          {loggedInUser?.state && (
            <div className="flex justify-between">
              <span className="font-bold text-gray-500 uppercase text-xs">Preferred State</span>
              <span className="font-extrabold text-foreground">{loggedInUser?.state}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="rounded-md bg-primary text-white border-4 border-foreground px-6 py-3 font-bold hover:bg-blue-600 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:scale-105 inline-block"
          >
            Go to Home
          </a>
          <button
            onClick={handleLogout}
            className="rounded-md bg-white text-foreground border-4 border-foreground px-6 py-3 font-bold hover:bg-gray-100 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:scale-105"
          >
            Log Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white max-w-6xl mx-auto my-8 overflow-hidden rounded-2xl">
      {/* LEFT COLUMN: BRANDING & BENEFITS */}
      <div className="lg:col-span-5 bg-primary text-white p-8 sm:p-12 flex flex-col justify-between border-b-4 lg:border-b-0 lg:border-r-4 border-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-white/10" />
        
        <div>
          <div className="inline-flex items-center gap-2 bg-accent text-foreground px-4 py-1.5 border-2 border-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-black uppercase text-xs tracking-wider mb-8 -rotate-1">
            <Sparkles className="w-4 h-4 fill-foreground" /> Admission Hub 2026
          </div>
          
          <h2 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tight leading-none mb-6">
            Get Admission <br />
            <span className="bg-white text-foreground px-2 inline-block my-2 border-2 border-foreground -rotate-1">
              Consulting
            </span> <br />
            With Experts
          </h2>
          
          <p className="text-blue-100 font-bold mb-10 text-base">
            Create an account to track applications, calculate cutoff scores, and receive custom PGDM/B.Tech recommendation list.
          </p>

          <ul className="space-y-5">
            {[
              "Profile evaluation for top Tier-1 & Tier-2 B-Schools",
              "Exclusive admission notifications & cutoff updates",
              "Direct WhatsApp support from Mohit Jain",
              "Comprehensive scholarship alerts up to 100%"
            ].map((benefit, index) => (
              <li key={index} className="flex items-start gap-3 text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5 fill-foreground stroke-white" strokeWidth={3} />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Brand Trust Metrics */}
        <div className="mt-12 pt-8 border-t-2 border-white/20 grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-2xl font-black text-accent">15K+</p>
            <p className="text-[10px] font-black uppercase tracking-wider text-blue-200">Students</p>
          </div>
          <div>
            <p className="text-2xl font-black text-accent">150+</p>
            <p className="text-[10px] font-black uppercase tracking-wider text-blue-200">Colleges</p>
          </div>
          <div>
            <p className="text-2xl font-black text-accent">98%</p>
            <p className="text-[10px] font-black uppercase tracking-wider text-blue-200">ROI Success</p>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: CORE FORMS */}
      <div className="lg:col-span-7 p-6 sm:p-12 flex flex-col justify-center bg-gray-50">
        
        {/* Alerts for visual feedback */}
        {error && (
          <div className="mb-6 p-4 bg-rose-100 border-2 border-rose-400 text-rose-800 font-bold text-sm rounded-md flex items-center gap-2">
            <span className="inline-block bg-rose-500 text-white rounded-full w-5 h-5 flex items-center justify-center font-black text-xs">!</span>
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-emerald-100 border-2 border-emerald-400 text-emerald-800 font-bold text-sm rounded-md flex items-center gap-2">
            <span className="inline-block bg-emerald-500 text-white rounded-full w-5 h-5 flex items-center justify-center font-black text-xs">✓</span>
            {success}
          </div>
        )}

        {/* Tab Toggle buttons */}
        <div className="flex border-4 border-foreground rounded-lg p-1 bg-white mb-8 max-w-sm">
          <button
            onClick={() => handleTabChange("login")}
            className={`flex-1 py-2.5 text-center font-black uppercase text-sm rounded-md transition-all ${
              activeTab === "login"
                ? "bg-foreground text-white scale-[1.02]"
                : "text-foreground hover:bg-slate-100"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => handleTabChange("signup")}
            className={`flex-1 py-2.5 text-center font-black uppercase text-sm rounded-md transition-all ${
              activeTab === "signup"
                ? "bg-foreground text-white scale-[1.02]"
                : "text-foreground hover:bg-slate-100"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* FORM RENDER CONTAINER */}
        <div className="bg-white border-4 border-foreground p-6 sm:p-8 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {activeTab === "login" ? (
            /* ================= LOGIN FORM ================= */
            <div>
              <div className="mb-6 flex justify-between items-center border-b-2 border-gray-100 pb-3">
                <h3 className="font-display text-2xl font-black text-foreground uppercase tracking-tight">
                  {showLoginOtp ? "Verify OTP" : "Sign In to Portal"}
                </h3>
                {!showLoginOtp && (
                  <div className="flex gap-2 text-xs font-bold">
                    <button
                      onClick={() => { resetStates(); setLoginMethod("phone"); }}
                      className={`px-3 py-1 rounded border-2 border-foreground ${loginMethod === "phone" ? "bg-accent text-foreground" : "bg-white"}`}
                    >
                      OTP Login
                    </button>
                    <button
                      onClick={() => { resetStates(); setLoginMethod("email"); }}
                      className={`px-3 py-1 rounded border-2 border-foreground ${loginMethod === "email" ? "bg-accent text-foreground" : "bg-white"}`}
                    >
                      Email/Pass
                    </button>
                  </div>
                )}
              </div>

              {showLoginOtp ? (
                /* OTP Verification View */
                <form onSubmit={handleVerifyLoginOtp} className="space-y-5">
                  <div className="space-y-2">
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-500">
                      Enter OTP Code
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="Enter 6-digit OTP (123456)"
                        value={loginOtp}
                        onChange={(e) => setLoginOtp(e.target.value)}
                        className="w-full rounded-md border-2 border-foreground bg-white py-3 pl-10 pr-4 font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:bg-slate-50 transition-all text-lg tracking-widest"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex h-14 items-center justify-center gap-2 rounded-md bg-foreground px-6 py-2 text-lg font-bold text-white transition-all hover:bg-gray-800 hover:scale-105 border-4 border-foreground shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]"
                  >
                    {isLoading ? "Verifying..." : "Verify & Continue"}
                    <ArrowRight className="h-5 w-5 text-primary" strokeWidth={3} />
                  </button>

                  <button
                    type="button"
                    onClick={() => { setShowLoginOtp(false); setError(""); }}
                    className="text-xs font-bold text-gray-500 hover:text-foreground flex items-center gap-1 mt-2"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to edit mobile number
                  </button>
                </form>
              ) : (
                /* Main Login Fields View */
                <div className="space-y-6">
                  {loginMethod === "phone" ? (
                    <form onSubmit={handleSendLoginOtp} className="space-y-5">
                      <div className="space-y-2">
                        <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-500">
                          Mobile Number
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3.5 font-black text-gray-400 text-sm">
                            +91
                          </span>
                          <input
                            type="tel"
                            maxLength={10}
                            placeholder="Enter 10-digit mobile number"
                            value={loginPhone}
                            onChange={(e) => setLoginPhone(e.target.value.replace(/\D/g, ""))}
                            className="w-full rounded-md border-2 border-foreground bg-white py-3 pl-14 pr-4 font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:bg-slate-50 transition-all"
                          />
                        </div>
                        <p className="text-[11px] font-bold text-gray-400">
                          We will send a 6-digit verification code to this number.
                        </p>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoginOtpSending}
                        className="w-full flex h-14 items-center justify-center gap-2 rounded-md bg-foreground px-6 py-2 text-lg font-bold text-white transition-all hover:bg-gray-800 hover:scale-105 border-4 border-foreground"
                      >
                        {isLoginOtpSending ? "Sending OTP..." : "Get OTP to Login"}
                        <ArrowRight className="h-5 w-5 text-accent" strokeWidth={3} />
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleEmailLogin} className="space-y-5">
                      <div className="space-y-2">
                        <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-500">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                          <input
                            type="email"
                            placeholder="name@example.com"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            className="w-full rounded-md border-2 border-foreground bg-white py-3 pl-10 pr-4 font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:bg-slate-50 transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-500">
                            Password
                          </label>
                          <a href="#" className="text-xs font-bold text-primary hover:underline">
                            Forgot password?
                          </a>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                          <input
                            type="password"
                            placeholder="Enter password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            className="w-full rounded-md border-2 border-foreground bg-white py-3 pl-10 pr-4 font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:bg-slate-50 transition-all"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex h-14 items-center justify-center gap-2 rounded-md bg-foreground px-6 py-2 text-lg font-bold text-white transition-all hover:bg-gray-800 hover:scale-105 border-4 border-foreground"
                      >
                        {isLoading ? "Signing In..." : "Sign In with Password"}
                        <ArrowRight className="h-5 w-5 text-accent" strokeWidth={3} />
                      </button>
                    </form>
                  )}

                  {/* Social Google Login */}
                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-xs font-black uppercase">Or login with</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>

                  <button
                    onClick={handleSocialLogin}
                    type="button"
                    className="w-full flex h-12 items-center justify-center gap-2 rounded-md bg-white border-2 border-foreground px-6 py-2 text-sm font-extrabold text-foreground transition-all hover:bg-slate-50 hover:scale-[1.01] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* ================= SIGN UP FORM ================= */
            <div>
              <div className="mb-6 flex justify-between items-center border-b-2 border-gray-100 pb-3">
                <h3 className="font-display text-2xl font-black text-foreground uppercase tracking-tight">
                  {showSignupOtp ? "Verify Mobile OTP" : "Register with Counselling"}
                </h3>
              </div>

              {showSignupOtp ? (
                /* Sign Up OTP View */
                <form onSubmit={handleVerifySignupOtp} className="space-y-5">
                  <div className="space-y-2">
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-500">
                      Enter OTP Code
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="Enter 6-digit OTP (123456)"
                        value={signupOtp}
                        onChange={(e) => setSignupOtp(e.target.value)}
                        className="w-full rounded-md border-2 border-foreground bg-white py-3 pl-10 pr-4 font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:bg-slate-50 transition-all text-lg tracking-widest"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex h-14 items-center justify-center gap-2 rounded-md bg-foreground px-6 py-2 text-lg font-bold text-white transition-all hover:bg-gray-800 hover:scale-105 border-4 border-foreground"
                  >
                    {isLoading ? "Verifying..." : "Verify & Create Account"}
                    <ArrowRight className="h-5 w-5 text-primary" strokeWidth={3} />
                  </button>

                  <button
                    type="button"
                    onClick={() => { setShowSignupOtp(false); setError(""); }}
                    className="text-xs font-bold text-gray-500 hover:text-foreground flex items-center gap-1 mt-2"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to registration details
                  </button>
                </form>
              ) : (
                /* Registration Details Fields View */
                <form onSubmit={handleSendSignupOtp} className="space-y-5">
                  <div className="space-y-2">
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-500">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        className="w-full rounded-md border-2 border-foreground bg-white py-3 pl-10 pr-4 font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:bg-slate-50 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-500">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          placeholder="name@example.com"
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          className="w-full rounded-md border-2 border-foreground bg-white py-3 pl-10 pr-4 font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:bg-slate-50 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-500">
                        Mobile Number
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3.5 font-black text-gray-400 text-sm">
                          +91
                        </span>
                        <input
                          type="tel"
                          maxLength={10}
                          placeholder="10-digit number"
                          value={signupPhone}
                          onChange={(e) => setSignupPhone(e.target.value.replace(/\D/g, ""))}
                          className="w-full rounded-md border-2 border-foreground bg-white py-3 pl-14 pr-4 font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:bg-slate-50 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-500">
                        Interested Course
                      </label>
                      <div className="relative">
                        <BookOpen className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
                        <select
                          value={signupCourse}
                          onChange={(e) => setSignupCourse(e.target.value)}
                          className="w-full rounded-md border-2 border-foreground bg-white py-3 pl-10 pr-8 font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:bg-slate-50 transition-all appearance-none cursor-pointer"
                        >
                          <option value="">Select Course</option>
                          {COURSES.map((course, idx) => (
                            <option key={idx} value={course}>{course}</option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-4 pointer-events-none text-gray-500 font-extrabold">
                          ▼
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-500">
                        Target/Current State
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
                        <select
                          value={signupState}
                          onChange={(e) => setSignupState(e.target.value)}
                          className="w-full rounded-md border-2 border-foreground bg-white py-3 pl-10 pr-8 font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:bg-slate-50 transition-all appearance-none cursor-pointer"
                        >
                          <option value="">Select State</option>
                          {STATES.map((st, idx) => (
                            <option key={idx} value={st}>{st}</option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-4 pointer-events-none text-gray-500 font-extrabold">
                          ▼
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="agreed-check"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="w-5 h-5 mt-0.5 border-2 border-foreground rounded text-primary focus:ring-0 cursor-pointer accent-primary shrink-0"
                    />
                    <label htmlFor="agreed-check" className="text-xs font-bold text-gray-600 cursor-pointer select-none">
                      I agree to the <a href="/terms" className="text-primary hover:underline">Terms of Service</a> & <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>, and consent to receiving counseling updates on WhatsApp.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSignupOtpSending}
                    className="w-full flex h-14 items-center justify-center gap-2 rounded-md bg-foreground px-6 py-2 text-lg font-bold text-white transition-all hover:bg-gray-800 hover:scale-105 border-4 border-foreground"
                  >
                    {isSignupOtpSending ? "Sending OTP..." : "Verify & Register"}
                    <ArrowRight className="h-5 w-5 text-accent" strokeWidth={3} />
                  </button>

                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-xs font-black uppercase">Or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>

                  <button
                    onClick={handleSocialLogin}
                    type="button"
                    className="w-full flex h-12 items-center justify-center gap-2 rounded-md bg-white border-2 border-foreground px-6 py-2 text-sm font-extrabold text-foreground transition-all hover:bg-slate-50 hover:scale-[1.01] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Register with Google
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
