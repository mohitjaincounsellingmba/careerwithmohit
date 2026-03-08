'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { InquiryForm } from './InquiryForm';

export function InquiryPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the popup in this session
    const hasSeenPopup = sessionStorage.getItem('hasSeenInquiryPopup');
    
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('hasSeenInquiryPopup', 'true');
      }, 5000); // Show after 5 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-[32px_32px_0px_0px_rgba(0,0,0,1)] border-8 border-foreground">
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-[110] bg-white border-4 border-foreground p-2 rounded-md hover:bg-rose-50 hover:text-rose-600 transition-colors"
          aria-label="Close Pop-up"
        >
          <X className="h-6 w-6 stroke-[3px]" />
        </button>

        <div className="bg-white">
          <div className="bg-primary p-8 text-center border-b-8 border-foreground">
            <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">
              Ready to Level Up?
            </h2>
            <p className="text-blue-50 font-bold mt-2">
              Share your details and let our experts guide your career journey.
            </p>
          </div>
          
          <div className="p-4 md:p-8">
            <InquiryForm />
          </div>
        </div>
      </div>

      {/* Backdrop Click to Close */}
      <div 
        className="absolute inset-0 -z-10" 
        onClick={() => setIsOpen(false)} 
      />
    </div>
  );
}
