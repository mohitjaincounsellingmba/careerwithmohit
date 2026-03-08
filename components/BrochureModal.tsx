"use client";

import { useState } from 'react';
import { X, Send, CheckCircle2, FileDown } from 'lucide-react';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  collegeName: string;
  brochureUrl: string;
}

export function BrochureModal({ isOpen, onClose, collegeName, brochureUrl }: BrochureModalProps) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call to save lead
    setTimeout(() => {
      setLoading(false);
      setStep('success');
      
      // Trigger actual download after a short delay
      window.open(brochureUrl, '_blank');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-2 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {step === 'form' ? (
          <div className="p-8 sm:p-10">
            <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <FileDown className="w-8 h-8 text-blue-600" />
            </div>
            
            <h2 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">
              Download {collegeName.split(',')[0]} Brochure
            </h2>
            <p className="text-slate-500 font-medium mb-8">
              Please provide your details to receive the latest 2025-26 admission brochure and fee structure.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input 
                  type="text" 
                  required
                  placeholder="Your Full Name" 
                  className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 focus:ring-2 focus:ring-blue-500 text-slate-900 font-medium transition-all"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  required
                  placeholder="Email Address" 
                  className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 focus:ring-2 focus:ring-blue-500 text-slate-900 font-medium transition-all"
                />
              </div>
              <div>
                <input 
                  type="tel" 
                  required
                  placeholder="WhatsApp Number" 
                  className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 focus:ring-2 focus:ring-blue-500 text-slate-900 font-medium transition-all"
                />
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all mt-4 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Brochure & Download
                  </>
                )}
              </button>
            </form>
            
            <p className="text-[10px] text-slate-400 text-center mt-6 uppercase font-bold tracking-widest">
              100% Privacy Protected • No Spam Guarantee
            </p>
          </div>
        ) : (
          <div className="p-10 text-center">
            <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">
              Success!
            </h2>
            <p className="text-slate-600 font-medium mb-8">
              Your brochure is being downloaded. We've also sent a copy to your email for future reference.
            </p>
            <button 
              onClick={onClose}
              className="w-full bg-slate-900 text-white font-bold py-4 px-8 rounded-xl hover:bg-slate-800 transition-all"
            >
              Back to College
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
