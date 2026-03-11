"use client";

import { useState } from 'react';
import { Mail, MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export function SubscribeForm() {
  const [method, setMethod] = useState<'email' | 'whatsapp'>('email');
  const [value, setValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorObj, setErrorObj] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value) return;

    setIsSubmitting(true);
    setErrorObj(null);

    try {
      // Direct Activepieces Webhook Call
      await fetch('https://cloud.activepieces.com/api/v1/webhooks/wjKhP0jGALa4bmUVYcw5F', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Blog Subscriber',
          value: value,
          method: method,
          source: `Blog Subscription (${method})`,
          timestamp: new Date().toISOString()
        }),
      });

      setIsSuccess(true);
      setValue('');

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);

    } catch (err: any) {
      console.error(err);
      setErrorObj(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="my-12 rounded-2xl border-2 border-gray-200 bg-white p-6 sm:p-10 shadow-sm transition-all hover:shadow-md">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

        {/* Left Side: Text */}
        <div className="md:w-1/2">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#f4f7fe] px-3 py-1 text-sm font-bold text-primary mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Never Miss an Update
          </div>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground mb-3">
            Follow Our Blog
          </h3>
          <p className="text-gray-600 font-medium">
            Get the latest insights on MBAs, colleges, and career growth delivered directly to you.
          </p>

          {!isSuccess && (
            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={() => setMethod('email')}
                className={`flex items-center gap-2 rounded-md px-4 py-2 font-bold text-sm transition-all ${method === 'email'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-foreground'
                  }`}
              >
                <Mail className="h-4 w-4" />
                Email
              </button>
              <button
                onClick={() => setMethod('whatsapp')}
                className={`flex items-center gap-2 rounded-md px-4 py-2 font-bold text-sm transition-all ${method === 'whatsapp'
                  ? 'bg-[#25D366] text-white shadow-md'
                  : 'bg-gray-100 text-gray-500 hover:bg-[#25D366]/20 hover:text-[#25D366]'
                  }`}
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 flex items-center justify-center">
          {isSuccess ? (
            <div className="w-full flex flex-col items-center justify-center text-center p-6 bg-green-50 rounded-xl border-2 border-green-200 animate-in fade-in zoom-in duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-green-400 opacity-10 animate-pulse"></div>
              <CheckCircle2 className="h-12 w-12 text-green-500 mb-2 relative z-10" />
              <h4 className="font-bold text-green-800 text-lg relative z-10">You're on the list!</h4>
              <p className="text-sm font-medium text-green-600 mt-1 relative z-10">We'll notify you when a new post drops.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full relative">
              <div className="relative flex items-center justify-between p-1 bg-white border-2 border-gray-200 rounded-lg shadow-sm focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all group">

                <div className="pl-4 pr-2 text-gray-400">
                  {method === 'email' ? <Mail className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
                </div>

                <input
                  type={method === 'email' ? 'email' : 'tel'}
                  placeholder={method === 'email' ? 'Enter your email address' : 'Enter WhatsApp number'}
                  className="w-full flex-1 appearance-none bg-transparent py-3 px-2 text-foreground font-medium outline-none placeholder:text-gray-400 placeholder:font-normal"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  required
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex h-12 w-32 items-center justify-center rounded-md font-bold text-white transition-all hover:scale-105 active:scale-95 disabled:scale-100 disabled:opacity-70 ${method === 'whatsapp' ? 'bg-[#25D366] hover:bg-[#128C7E]' : 'bg-foreground hover:bg-gray-800'
                    }`}
                >
                  {isSubmitting ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      Follow <ArrowRight className="ml-1 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-3 font-medium text-center">
                We respect your privacy. No spam, ever.
              </p>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
