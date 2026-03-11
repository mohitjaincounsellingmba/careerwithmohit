'use client';

import { useState } from 'react';
import { X, Send, Download, CheckCircle2 } from 'lucide-react';

interface LeadGenFormProps {
    resourceName: string;
    onSuccess: () => void;
    onClose?: () => void;
}

export function LeadGenForm({ resourceName, onSuccess, onClose }: LeadGenFormProps) {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        number: '',
        email: '',
        location: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        // Direct Activepieces Webhook Call
        try {
            fetch('https://cloud.activepieces.com/api/v1/webhooks/5RBKTlNE1jXtKEfs7IMK4', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    number: formData.number,
                    email: formData.email,
                    location: formData.location,
                    source: `Resource Download: ${resourceName}`,
                    timestamp: new Date().toISOString()
                }),
            }).catch(err => console.error('Webhook error:', err));
        } catch (e: any) {
            console.error('Webhook Error:', e);
        }

        setStatus('success');
        setTimeout(() => {
            onSuccess();
        }, 1500);
    };

    if (status === 'success') {
        return (
            <div className="bg-white border-4 border-foreground p-8 text-center shadow-[8px_8px_0px_0px_rgba(34,197,94,1)]">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-black uppercase italic mb-2">Details Verified!</h2>
                <p className="font-bold text-slate-600">Your download is starting now...</p>
            </div>
        );
    }

    return (
        <div className="bg-white border-4 border-foreground p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
            {onClose && (
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-foreground">
                    <X className="w-6 h-6" />
                </button>
            )}

            <div className="mb-8">
                <h2 className="text-2xl font-black uppercase leading-tight mb-2">
                    Unlock <span className="text-primary italic">Free</span> Download
                </h2>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                    {resourceName}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-slate-400">Full Name</label>
                    <input
                        required
                        type="text"
                        placeholder="Mohit Jain"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-12 bg-slate-50 border-2 border-slate-200 px-4 font-bold focus:border-foreground focus:outline-none transition-all"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-slate-400">WhatsApp Number</label>
                        <input
                            required
                            type="tel"
                            placeholder="+91 9999999999"
                            value={formData.number}
                            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                            className="w-full h-12 bg-slate-50 border-2 border-slate-200 px-4 font-bold focus:border-foreground focus:outline-none transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-slate-400">Location</label>
                        <input
                            required
                            type="text"
                            placeholder="e.g. Delhi"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full h-12 bg-slate-50 border-2 border-slate-200 px-4 font-bold focus:border-foreground focus:outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-slate-400">Email Address</label>
                    <input
                        required
                        type="email"
                        placeholder="mohit@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-12 bg-slate-50 border-2 border-slate-200 px-4 font-bold focus:border-foreground focus:outline-none transition-all"
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full h-14 bg-foreground text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-primary transition-all active:translate-y-1 disabled:opacity-50"
                >
                    {status === 'submitting' ? (
                        'Processing...'
                    ) : (
                        <>
                            Access Download <Send className="w-5 h-5" />
                        </>
                    )}
                </button>
            </form>

            <p className="mt-6 text-[10px] font-bold text-slate-400 text-center uppercase leading-relaxed">
                By clicking, you agree to receive career updates via WhatsApp. <br />
                Secure & SPAM-FREE.
            </p>
        </div>
    );
}
