"use client";

import React, { useState } from 'react';
import { Share2, Check, Copy, Linkedin, MessageCircle } from 'lucide-react';

interface SocialShareButtonsProps {
  url: string;
  title: string;
  imageUrl?: string;
  description?: string;
}

export function SocialShareButtons({
  url,
  title,
  imageUrl = "https://careerwithmohit.online/og-image.webp",
  description = "Check out this guide by Mohit Jain (Career Counselling & MBA Admissions Strategist)."
}: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedMedia = encodeURIComponent(imageUrl);
  const encodedDesc = encodeURIComponent(description ? `${title} - ${description}` : title);

  const shareLinks = {
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedMedia}&description=${encodedDesc}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title}\n\nRead more: ${url}`)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } catch {
        // Ignored if cancelled
      }
    }
  };

  return (
    <div className="my-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900/90 via-blue-950/40 to-slate-900/90 border border-blue-500/20 shadow-xl backdrop-blur-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-400/20 text-blue-400">
            <Share2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Share or Save this Guide</h4>
            <p className="text-xs text-slate-400">Help fellow MBA & college aspirants</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Pinterest Save */}
          <a
            href={shareLinks.pinterest}
            target="_blank"
            rel="noopener noreferrer"
            data-pin-do="buttonBookmark"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600/10 hover:bg-red-600 border border-red-500/30 hover:border-transparent text-red-400 hover:text-white text-xs font-semibold transition-all duration-200 shadow-sm group"
            title="Save to Pinterest"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
              <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.357-.053.224-.174.271-.403.164-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
            </svg>
            <span>Pin It</span>
          </a>

          {/* WhatsApp */}
          <a
            href={shareLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-600 border border-emerald-500/30 hover:border-transparent text-emerald-400 hover:text-white text-xs font-semibold transition-all duration-200 shadow-sm"
            title="Share via WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          {/* LinkedIn */}
          <a
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/10 hover:bg-blue-600 border border-blue-500/30 hover:border-transparent text-blue-400 hover:text-white text-xs font-semibold transition-all duration-200 shadow-sm"
            title="Share on LinkedIn"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>

          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all duration-200 shadow-sm"
            title="Copy Article Link"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
